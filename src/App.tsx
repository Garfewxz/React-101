// src/App.tsx
import { useState } from "react";

interface Subject {
  id: number;
  name: string;
  grade: string;
}

// ตารางแปลงเกรดเป็นค่า Grade Point
const gradePoints: Record<string, number | null> = {
  "A": 4.0,
  "B+": 3.5,
  "B": 3.0,
  "C+": 2.5,
  "C": 2.0,
  "D+": 1.5,
  "D": 1.0,
  "F": 0.0,
  "W": null, // ไม่คิดเกรด
};

export default function SubjectGradeManager() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [subjectName, setSubjectName] = useState("");
  const [grade, setGrade] = useState("A");
  const [gpa, setGpa] = useState<number | null>(null);

  // เพิ่มรายวิชา
  const addSubject = () => {
    if (subjectName.trim() === "") return;
    const newSubject: Subject = {
      id: Date.now(),
      name: subjectName,
      grade,
    };
    setSubjects([...subjects, newSubject]);
    setSubjectName("");
    setGrade("A");
  };

  // ลบรายวิชา
  const removeSubject = (id: number) => {
    setSubjects(subjects.filter((s) => s.id !== id));
  };

  // คำนวณ GPA
  const calculateGPA = () => {
    const validSubjects = subjects.filter((s) => gradePoints[s.grade] !== null);
    if (validSubjects.length === 0) {
      setGpa(null);
      return;
    }

    const totalPoints = validSubjects.reduce((sum, s) => {
      return sum + (gradePoints[s.grade] || 0);
    }, 0);

    setGpa(totalPoints / validSubjects.length);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>ระบบจัดการเกรดนักเรียน</h2>

      <div style={{ marginBottom: "15px" }}>
        <input
          type="text"
          placeholder="ชื่อวิชา"
          value={subjectName}
          onChange={(e) => setSubjectName(e.target.value)}
          style={{ marginRight: "10px", padding: "5px" }}
        />
        <select
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          style={{ marginRight: "10px", padding: "5px" }}
        >
          {Object.keys(gradePoints).map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
        <button onClick={addSubject}>เพิ่มรายวิชา</button>
      </div>

      <table border={1} cellPadding={10} style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>วิชา</th>
            <th>เกรด</th>
            <th>ลบ</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map((s) => (
            <tr key={s.id}>
              <td style={{ color: s.grade === "F" ? "red" : "black" }}>{s.name}</td>
              <td style={{ color: s.grade === "F" ? "red" : "black" }}>{s.grade}</td>
              <td>
                <button onClick={() => removeSubject(s.id)}>ลบ</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: "15px" }}>
        <button onClick={calculateGPA}>คำนวณ GPA</button>
      </div>

      {gpa !== null && <h3 style={{ marginTop: "10px" }}>GPA: {gpa.toFixed(2)}</h3>}
    </div>
  );
}
