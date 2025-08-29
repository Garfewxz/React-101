import React, { useState } from 'react';

type Subject = {
  id: number;
  name: string;
  grade: string;
};

const SubjectGradeList: React.FC = () => {
  const [subjects, setSubjects] = useState<Subject[]>([
    { id: 1, name: 'คณิตศาสตร์', grade: 'A' },
    { id: 2, name: 'วิทยาศาสตร์', grade: 'B+' },
  ]);

  const addSubject = (name: string, grade: string) => {
    const newSubject: Subject = {
      id: subjects.length + 1,
      name,
      grade,
    };
    setSubjects([...subjects, newSubject]);
  };

  return (
    <div>
      <h2>📚 รายชื่อวิชาและเกรด</h2>
      <ul>
        {subjects.map((subject) => (
          <li key={subject.id}>
            {subject.name} — เกรด: {subject.grade}
          </li>
        ))}
      </ul>
      <button onClick={() => addSubject('ภาษาอังกฤษ', 'A-')}>เพิ่มวิชา</button>
    </div>
  );
};

export default SubjectGradeList;
import React, { useState } from 'react';

type Subject = {
  id: number;
  name: string;
  grade: string;
};

const gradeOptions = ['A', 'B+', 'B', 'C+', 'C', 'D+', 'D', 'F', 'W'];

const SubjectGradeManager: React.FC = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [nameInput, setNameInput] = useState('');
  const [gradeInput, setGradeInput] = useState('A');

  const addSubject = () => {
    if (!nameInput.trim()) return;

    const newSubject: Subject = {
      id: Date.now(),
      name: nameInput.trim(),
      grade: gradeInput,
    };
    setSubjects([...subjects, newSubject]);
    setNameInput('');
    setGradeInput('A');
  };

  const removeSubject = (id: number) => {
    setSubjects(subjects.filter((subject) => subject.id !== id));
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto' }}>
      <h2>📚 จัดการรายชื่อวิชาและเกรด</h2>

      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="ชื่อวิชา"
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
          style={{ width: '60%', marginRight: '0.5rem' }}
        />
        <select
          value={gradeInput}
          onChange={(e) => setGradeInput(e.target.value)}
        >
          {gradeOptions.map((grade) => (
            <option key={grade} value={grade}>
              {grade}
            </option>
          ))}
        </select>
        <button onClick={addSubject} style={{ marginLeft: '0.5rem' }}>
          ➕ เพิ่ม
        </button>
      </div>

      <ul>
        {subjects.map((subject) => (
          <li key={subject.id} style={{ marginBottom: '0.5rem' }}>
            {subject.name} — เกรด: {subject.grade}
            <button
              onClick={() => removeSubject(subject.id)}
              style={{ marginLeft: '1rem', color: 'red' }}
            >
              ❌ ลบ
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubjectGradeManager;
import React, { useState } from 'react';

type Subject = {
  id: number;
  name: string;
  grade: string;
};

const gradeOptions = ['A', 'B+', 'B', 'C+', 'C', 'D+', 'D', 'F', 'W'];

const gradeToPoint: Record<string, number> = {
  'A': 4.0,
  'B+': 3.5,
  'B': 3.0,
  'C+': 2.5,
  'C': 2.0,
  'D+': 1.5,
  'D': 1.0,
  'F': 0.0,
  'W': -1, // ใช้ -1 เพื่อกรองออกจากการคำนวณ
};

const SubjectGradeManager: React.FC = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [nameInput, setNameInput] = useState('');
  const [gradeInput, setGradeInput] = useState('A');
  const [gpa, setGpa] = useState<number | null>(null);

  const addSubject = () => {
    if (!nameInput.trim()) return;

    const newSubject: Subject = {
      id: Date.now(),
      name: nameInput.trim(),
      grade: gradeInput,
    };
    setSubjects([...subjects, newSubject]);
    setNameInput('');
    setGradeInput('A');
    setGpa(null); // reset GPA เมื่อมีการเพิ่มวิชาใหม่
  };

  const removeSubject = (id: number) => {
    setSubjects(subjects.filter((subject) => subject.id !== id));
    setGpa(null); // reset GPA เมื่อมีการลบวิชา
  };

  const calculateGPA = () => {
    const validSubjects = subjects.filter((s) => gradeToPoint[s.grade] >= 0);
    if (validSubjects.length === 0) {
      setGpa(0);
      return;
    }

    const totalPoints = validSubjects.reduce(
      (sum, s) => sum + gradeToPoint[s.grade],
      0
    );
    const gpaValue = totalPoints / validSubjects.length;
    setGpa(parseFloat(gpaValue.toFixed(2)));
  };

  return (
    <div style={{ maxWidth: '500px', margin: 'auto' }}>
      <h2>📚 จัดการรายวิชาและเกรด</h2>

      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="ชื่อวิชา"
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
          style={{ width: '60%', marginRight: '0.5rem' }}
        />
        <select
          value={gradeInput}
          onChange={(e) => setGradeInput(e.target.value)}
        >
          {gradeOptions.map((grade) => (
            <option key={grade} value={grade}>
              {grade}
            </option>
          ))}
        </select>
        <button onClick={addSubject} style={{ marginLeft: '0.5rem' }}>
          ➕ เพิ่ม
        </button>
      </div>

      <ul>
        {subjects.map((subject) => (
          <li key={subject.id} style={{ marginBottom: '0.5rem' }}>
            <span
              style={{
                color: subject.grade === 'F' ? 'red' : 'black',
                fontWeight: subject.grade === 'F' ? 'bold' : 'normal',
              }}
            >
              {subject.name}
            </span>{' '}
            — เกรด: {subject.grade}
            <button
              onClick={() => removeSubject(subject.id)}
              style={{ marginLeft: '1rem', color: 'red' }}
            >
              ❌ ลบ
            </button>
          </li>
        ))}
      </ul>

      <button onClick={calculateGPA} style={{ marginTop: '1rem' }}>
        📊 คำนวณ GPA
      </button>

      {gpa !== null && (
        <div style={{ marginTop: '1rem', fontWeight: 'bold' }}>
          🎓 GPA ของคุณคือ: {gpa}
        </div>
      )}
    </div>
  );
};

export default SubjectGradeManager;
