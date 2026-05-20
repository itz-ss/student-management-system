import { API_STUDENTS } from "../constants/student.constants";

async function parseResponse(response) {
  const result = await response.json();
  if (!response.ok) throw new Error(result?.error || "Student API request failed.");
  return result.data;
}

export async function fetchStudents() {
  const response = await fetch(API_STUDENTS, { cache: "no-store" });
  return parseResponse(response);
}

export async function createStudent(payload) {
  const response = await fetch(API_STUDENTS, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return parseResponse(response);
}

export async function updateStudent(id, payload) {
  const response = await fetch(`${API_STUDENTS}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return parseResponse(response);
}

export async function deleteStudent(id) {
  const response = await fetch(`${API_STUDENTS}/${id}`, {
    method: "DELETE",
  });
  return parseResponse(response);
}
