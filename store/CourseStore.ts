// store/CourseStore.ts
import { create } from 'zustand'

type Course = {
  id: string
  nameTH: string
  nameEN: string
  credit: number
  instructor: string
  grade: string // เช่น 'A', 'B+', 'W', 'F'
}

type CourseStore = {
  courses: Course[]
  droppedCourses: Course[]
  addCourse: (course: Course) => void
  dropCourse: (id: string) => void
  calculateGPA: () => number
}

const gradePointMap: Record<string, number> = {
  'A': 4.0,
  'B+': 3.5,
  'B': 3.0,
  'C+': 2.5,
  'C': 2.0,
  'D+': 1.5,
  'D': 1.0,
  'F': 0.0,
  'W': 0.0, // ถอน ไม่คิดเกรด
}

export const useCourseStore = create<CourseStore>((set, get) => ({
  courses: [],
  droppedCourses: [],
  addCourse: (course) =>
    set((state) => ({
      courses: [...state.courses, course],
    })),
  dropCourse: (id) =>
    set((state) => {
      const course = state.courses.find((c) => c.id === id)
      return course
        ? {
            courses: state.courses.filter((c) => c.id !== id),
            droppedCourses: [...state.droppedCourses, course],
          }
        : state
    }),
  calculateGPA: () => {
    const validCourses = get().courses.filter((c) => gradePointMap[c.grade] !== undefined)
    const totalCredits = validCourses.reduce((sum, c) => sum + c.credit, 0)
    const totalPoints = validCourses.reduce((sum, c) => sum + c.credit * gradePointMap[c.grade], 0)
    return totalCredits > 0 ? totalPoints / totalCredits : 0
  },
}))
