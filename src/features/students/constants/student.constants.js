export const API_STUDENTS = "/api/students";

export const STUDENT_STATUS_OPTIONS = [
  { value: "Active", label: "Active" },
  { value: "Inactive", label: "Inactive" },
];

export const STUDENT_COURSE_OPTIONS = [
  { value: "Computer Science 101", label: "Computer Science 101" },
  { value: "Advanced Mathematics", label: "Advanced Mathematics" },
  { value: "Modern Literature", label: "Modern Literature" },
  { value: "Data Structures", label: "Data Structures" },
];

export const STUDENT_FORM_DEFAULT_VALUES = {
  name: "",
  email: "",
  course: "Computer Science 101",
  status: "Active",
};
