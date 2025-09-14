import { useCourseStore } from '../store/CourseStore'

const DropButton = ({ courseId }: { courseId: string }) => {
  const dropCourse = useCourseStore((state) => state.dropCourse)

  return <button onClick={() => dropCourse(courseId)}>ถอน</button>
}

export default DropButton
