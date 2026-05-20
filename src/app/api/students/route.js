import { NextResponse } from "next/server";
import { studentService } from "../../../lib/studentService";
import { studentFormSchema } from "../../../features/students/schemas/student.schema";

export async function GET() {
  try {
    const students = await studentService.getAllStudents();
    return NextResponse.json({ data: students }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const payload = await request.json();
    const studentPayload = studentFormSchema.parse(payload);
    const result = await studentService.createStudent(studentPayload);
    return NextResponse.json({ data: result }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error?.message || "Invalid student payload." }, { status: 400 });
  }
}
