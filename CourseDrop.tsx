import { useCourseStore } from '../store/CourseStore'

const CourseDrop = () => {
  const droppedCourses = useCourseStore((state) => state.droppedCourses)

  return (
    <div>
      <h2>🗂️ รายวิชาที่ถอน</h2>
      <ul>
        {droppedCourses.map((course) => (
          <li key={course.id}>
            {course.id} - {course.nameTH} ({course.credit} หน่วยกิต)
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CourseDrop
