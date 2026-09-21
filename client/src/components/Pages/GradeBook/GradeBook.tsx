
import { useEffect, useState } from "react";
import Header from "../../Header/Header";
import classes from "./GradeBook.module.scss";

interface ClassData {
    id: string;
    title: string;
}

interface Subject {
    id: string;
    title: string;
}

interface Student {
    username: string;
    value: number;
    date: string;
    id: number;
}

const weekStart = new Date(2026, 8, 21);

export default function GradeBook() {
    const [weekOffset, setWeekOffset] = useState(0);

    const [classSelected, setSelClass] = useState<string>("1");
    const [subjectSelected, setSelSubject] = useState<string>("1");

    const [students, setStudents] = useState<Student[]>([]);
    const [classesData, setClasses] = useState<ClassData[]>([]);
    const [subject, setSubject] = useState<Subject[]>([]);

    const [addingGrade, setAddingGrade] = useState<{
        username: string;
        date: string;
    } | null>(null);

    const [editingGrade, setEditingGrade] = useState<number | null>(null);

    const [gradeValue, setGradeValue] = useState("");

    const currentWeekStart = new Date(weekStart);

    currentWeekStart.setDate(
        currentWeekStart.getDate() + weekOffset * 7
    );

    const days = Array.from({ length: 5 }, (_, index) => {
        const date = new Date(currentWeekStart);

        date.setDate(date.getDate() + index);

        return {
            name: ["Пн", "Вт", "Ср", "Чт", "Пт"][index],
            date
        };
    });

    const formatDate = (date: Date) => {
        return date.toLocaleDateString("uk-UA", {
            day: "2-digit",
            month: "2-digit"
        });
    };

    const formatWeek = () => {
        const start = days[0].date;
        const end = days[4].date;

        return `${formatDate(start)} - ${formatDate(end)}`;
    };

    async function ChangeGrade(id: number, value: number) {
        await fetch(
            "http://localhost:5000/gradebook",
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    id,
                    value
                })
            }
        );

        setStudents((prev) =>
            prev.map((student) =>
                student.id === id
                    ? {
                        ...student,
                        value
                    }
                    : student
            )
        );

        setEditingGrade(null);
        setGradeValue("");
    }

    async function AddGrade(
        username: string,
        date: Date,
        value: number
    ) {
        await fetch(
            "http://localhost:5000/gradebook",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    username,
                    date: date.toISOString(),
                    value,
                    classId: classSelected,
                    subjectId: subjectSelected
                })
            }
        );

        setAddingGrade(null);
        setGradeValue("");

        await GetData();
    }

    async function GetHeaderData() {
        const response = await fetch(
            "http://localhost:5000/gradebook/header",
            {
                credentials: "include"
            }
        );

        const result = await response.json();

        setClasses(result.class);
        setSubject(result.subjects);

        if (result.class.length > 0) {
            setSelClass(result.class[0].id);
        }

        if (result.subjects.length > 0) {
            setSelSubject(result.subjects[0].id);
        }
    }

    async function GetData() {
        const week = days[0].date
            .toISOString()
            .split("T")[0];

        const response = await fetch(
            `http://localhost:5000/gradebook/?class=${classSelected}&subject=${subjectSelected}&week=${week}`,
            {
                credentials: "include"
            }
        );

        const result = await response.json();

        setStudents(result);
    }

    useEffect(() => {
        GetHeaderData();
    }, []);

    useEffect(() => {
        if (classSelected && subjectSelected) {
            GetData();
        }
    }, [classSelected, subjectSelected, weekOffset]);

    const uniqueStudents = Array.from(
        new Map(
            students.map((student) => [
                student.username,
                student
            ])
        ).values()
    );

    const getGrades = (
        username: string,
        date: Date
    ) => {
        return students.filter((student) => {
            const studentDate = new Date(student.date);

            return (
                student.username === username &&
                studentDate.toDateString() === date.toDateString()
            );
        });
    };

    const startAddingGrade = (
        username: string,
        date: Date
    ) => {
        setEditingGrade(null);

        setAddingGrade({
            username,
            date: date.toDateString()
        });

        setGradeValue("");
    };

    const startEditingGrade = (
        grade: Student
    ) => {
        setAddingGrade(null);

        setEditingGrade(grade.id);

        setGradeValue(String(grade.value));
    };

    const submitGrade = (
        username: string,
        date: Date
    ) => {
        const value = Number(gradeValue);

        if (value < 1 || value > 12) {
            return;
        }

        AddGrade(
            username,
            date,
            value
        );
    };

    const submitChangedGrade = (
        id: number
    ) => {
        const value = Number(gradeValue);

        if (value < 1 || value > 12) {
            return;
        }

        ChangeGrade(
            id,
            value
        );
    };

    return (
        <>
            <Header />

            <main className={classes.gradeBook}>

                <h1>Журнал</h1>

                <div className={classes.options}>

                    <select
                        value={classSelected}
                        onChange={(e) =>
                            setSelClass(e.target.value)
                        }
                    >
                        {classesData.map((classData) => (
                            <option
                                key={classData.id}
                                value={classData.id}
                            >
                                {classData.title}
                            </option>
                        ))}
                    </select>

                    <select
                        value={subjectSelected}
                        onChange={(e) =>
                            setSelSubject(e.target.value)
                        }
                    >
                        {subject.map((data) => (
                            <option
                                key={data.id}
                                value={data.id}
                            >
                                {data.title}
                            </option>
                        ))}
                    </select>

                </div>

                <div className={classes.weekNavigation}>

                    {weekOffset > 0 && (
                        <button
                            onClick={() =>
                                setWeekOffset(
                                    (prev) => prev - 1
                                )
                            }
                        >
                            ←
                        </button>
                    )}

                    <span>
                        {formatWeek()}
                    </span>

                    <button
                        onClick={() =>
                            setWeekOffset(
                                (prev) => prev + 1
                            )
                        }
                    >
                        →
                    </button>

                </div>

                <div className={classes.tableWrapper}>

                    <table>

                        <thead>

                            <tr>

                                <th className={classes.student}>
                                    Учень
                                </th>

                                {days.map((day) => (
                                    <th
                                        key={day.date.toISOString()}
                                    >
                                        <div>
                                            {day.name}
                                        </div>

                                        <small>
                                            {formatDate(day.date)}
                                        </small>
                                    </th>
                                ))}

                            </tr>

                        </thead>

                        <tbody>

                            {uniqueStudents.map((student) => (

                                <tr key={student.username}>

                                    <td
                                        className={
                                            classes.studentName
                                        }
                                    >
                                        {student.username}
                                    </td>

                                    {days.map((day) => {

                                        const grades =
                                            getGrades(
                                                student.username,
                                                day.date
                                            );

                                        const isAdding =
                                            addingGrade?.username ===
                                                student.username &&
                                            addingGrade?.date ===
                                                day.date.toDateString();

                                        return (
                                            <td
                                                key={day.date.toISOString()}
                                            >

                                                <div
                                                    className={
                                                        classes.grades
                                                    }
                                                >

                                                    {grades.map(
                                                        (grade) => {

                                                            if (
                                                                editingGrade ===
                                                                grade.id
                                                            ) {
                                                                return (
                                                                    <input
                                                                        key={
                                                                            grade.id
                                                                        }
                                                                        autoFocus
                                                                        type="number"
                                                                        min="1"
                                                                        max="12"
                                                                        value={
                                                                            gradeValue
                                                                        }
                                                                        onChange={(e) =>
                                                                            setGradeValue(
                                                                                e.target.value
                                                                            )
                                                                        }
                                                                        onKeyDown={(e) => {

                                                                            if (
                                                                                e.key ===
                                                                                "Enter"
                                                                            ) {
                                                                                submitChangedGrade(
                                                                                    grade.id
                                                                                );
                                                                            }

                                                                            if (
                                                                                e.key ===
                                                                                "Escape"
                                                                            ) {
                                                                                setEditingGrade(
                                                                                    null
                                                                                );

                                                                                setGradeValue(
                                                                                    ""
                                                                                );
                                                                            }

                                                                        }}
                                                                    />
                                                                );
                                                            }

                                                            return (
                                                                <span
                                                                    key={
                                                                        grade.id
                                                                    }
                                                                    className={
                                                                        grade.value < 6
                                                                            ? classes.low
                                                                            : grade.value < 9
                                                                                ? classes.medium
                                                                                : classes.high
                                                                    }
                                                                    onClick={() =>
                                                                        startEditingGrade(
                                                                            grade
                                                                        )
                                                                    }
                                                                >
                                                                    {
                                                                        grade.value
                                                                    }
                                                                </span>
                                                            );
                                                        }
                                                    )}

                                                    {isAdding ? (

                                                        <input
                                                            autoFocus
                                                            type="number"
                                                            min="1"
                                                            max="12"
                                                            value={
                                                                gradeValue
                                                            }
                                                            onChange={(e) =>
                                                                setGradeValue(
                                                                    e.target.value
                                                                )
                                                            }
                                                            onKeyDown={(e) => {

                                                                if (
                                                                    e.key ===
                                                                    "Enter"
                                                                ) {
                                                                    submitGrade(
                                                                        student.username,
                                                                        day.date
                                                                    );
                                                                }

                                                                if (
                                                                    e.key ===
                                                                    "Escape"
                                                                ) {
                                                                    setAddingGrade(
                                                                        null
                                                                    );

                                                                    setGradeValue(
                                                                        ""
                                                                    );
                                                                }

                                                            }}
                                                        />

                                                    ) : (

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                startAddingGrade(
                                                                    student.username,
                                                                    day.date
                                                                )
                                                            }
                                                        >
                                                            +
                                                        </button>

                                                    )}

                                                </div>

                                            </td>
                                        );
                                    })}

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </main>
        </>
    );
}
