import { useState } from 'react'
import { useCourseStore } from '../store/CourseStore'

const CourseForm = () => {
  const addCourse = useCourseStore((state) => state.addCourse)
  const [form, setForm] = useState({
    id: '',
    nameTH: '',
    nameEN: '',
    credit: 0,
    instructor: '',
    grade: '',
  })

  const handleSubmit = () => {
    if (form.id && form.nameTH && form.credit > 0) {
      addCourse(form)
      setForm({ id: '', nameTH: '', nameEN: '', credit: 0, instructor: '', grade: '' })
    }
  }

  return (
    <div>
      <input placeholder="รหัสวิชา" value={form.id} onChange={(e) => setForm({ ...form, id: e.target.value })} />
      <input placeholder="ชื่อวิชา (ไทย)" value={form.nameTH} onChange={(e) => setForm({ ...form, nameTH: e.target.value })} />
      <input placeholder="ชื่อวิชา (อังกฤษ)" value={form.nameEN} onChange={(e) => setForm({ ...form, nameEN: e.target.value })} />
      <input type="number" placeholder="หน่วยกิต" value={form.credit} onChange={(e) => setForm({ ...form, credit: +e.target.value })} />
      <input placeholder="อาจารย์ผู้สอน" value={form.instructor} onChange={(e) => setForm({ ...form, instructor: e.target.value })} />
      <input placeholder="เกรด" value={form.grade} onChange={(e) => setForm({ ...form, grade: e.target.value })} />
      <button onClick={handleSubmit}>เพิ่มรายวิชา</button>
    </div>
  )
}

export default CourseForm
