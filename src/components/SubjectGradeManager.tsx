import React, { useState } from "react";

interface Subject {
  id: number;
  name: string;
  grade: string;
}

const gradePoints: { [key: string]: number } = {
  A: 4.0,
  "B+": 3.5,
  B: 3.0,
  "C+": 2.5,
  C: 2.0,
  "D+": 1.5,
  D: 1.0,
  F: 0.0,
  W: 0.0, // ถอน ไม่คิดเกรด
};

const SubjectGradeManager: React.FC = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [subjectName, setSubjectName] = useState("");
  const [grade, setGrade] = useState("A");
  const [gpa, setGpa] = useState<number | null>(null);

  const addSubject = () => {
    if (!subjectName) return;
    const newSubject: Subject = {
      id: Date.now(),
      name: subjectName,
      grade,
    };
    setSubjects([...subjects, newSubject]);
    setSubjectName("");
    setGrade("A");
  };

  const removeSubject = (id: number) => {
    setSubjects(subjects.filter((s) => s.id !== id));
  };

  const calculateGPA = () => {
    const validSubjects = subjects.filter((s) => s.grade !== "W");
    if (validSubjects.length === 0) {
      setGpa(0);
      return;
    }
    const total = validSubjects.reduce(
      (sum, s) => sum + (gradePoints[s.grade] || 0),
      0
    );
    setGpa(total / validSubjects.length);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>เพิ่มรายวิชา</h2>
      <input
        type="text"
        placeholder="ชื่อวิชา"
        value={subjectName}
        onChange={(e) => setSubjectName(e.target.value)}
        style={{ marginRight: "10px" }}
      />
      <select value={grade} onChange={(e) => setGrade(e.target.value)}>
        {Object.keys(gradePoints).map((g) => (
          <option key={g} value={g}>
            {g}
          </option>
        ))}
      </select>
      <button onClick={addSubject} style={{ marginLeft: "10px" }}>
        เพิ่มวิชา
      </button>

      <h3 style={{ marginTop: "20px" }}>รายวิชาที่เพิ่มแล้ว</h3>
      <ul>
        {subjects.map((s) => (
          <li key={s.id}>
            <span style={{ color: s.grade === "F" ? "red" : "black" }}>
              {s.name} - {s.grade}
            </span>
            <button
              onClick={() => removeSubject(s.id)}
              style={{ marginLeft: "10px" }}
            >
              ลบ
            </button>
          </li>
        ))}
      </ul>

      <button onClick={calculateGPA} style={{ marginTop: "10px" }}>
        คำนวณ GPA
      </button>

      {gpa !== null && (
        <h3 style={{ marginTop: "10px" }}>GPA: {gpa.toFixed(2)}</h3>
      )}
    </div>
  );
};

export default SubjectGradeManager;
