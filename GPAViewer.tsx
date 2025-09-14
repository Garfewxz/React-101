import { useCourseStore } from '../store/CourseStore'

const GPAViewer = () => {
  const gpa = useCourseStore((state) => state.calculateGPA())

  return <h3>🎓 GPA รวม: {gpa.toFixed(2)}</h3>
}

export default GPAViewer
