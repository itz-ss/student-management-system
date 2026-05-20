const initialStudents = [
  {
    id: "1",
    name: "Eleanor Pena",
    email: "eleanor.pena@example.com",
    course: "Computer Science 101",
    status: "Active",
    enrolledAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Guy Hawkins",
    email: "guy.hawkins@example.com",
    course: "Advanced Mathematics",
    status: "Inactive",
    enrolledAt: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Bessie Cooper",
    email: "bessie.cooper@example.com",
    course: "Modern Literature",
    status: "Active",
    enrolledAt: new Date().toISOString(),
  },
  {
    id: "4",
    name: "Jane Cooper",
    email: "jane.cooper@example.com",
    course: "Data Structures",
    status: "Active",
    enrolledAt: new Date().toISOString(),
  },
];

let studentStore = [...initialStudents];

export function getAllStudents() {
  return [...studentStore];
}

export function getStudentById(id) {
  return studentStore.find((student) => student.id === id) || null;
}

export function createStudent(record) {
  const newStudent = {
    id: String(Date.now()),
    enrolledAt: new Date().toISOString(),
    ...record,
  };
  studentStore = [newStudent, ...studentStore];
  return newStudent;
}

export function updateStudent(id, patch) {
  const index = studentStore.findIndex((student) => student.id === id);
  if (index === -1) return null;
  studentStore[index] = { ...studentStore[index], ...patch };
  return studentStore[index];
}

export function deleteStudent(id) {
  const student = getStudentById(id);
  if (!student) return null;
  studentStore = studentStore.filter((item) => item.id !== id);
  return student;
}
