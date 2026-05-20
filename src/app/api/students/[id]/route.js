import { NextResponse } from "next/server";
import { studentService } from "../../../../lib/studentService";
import { studentFormSchema } from "../../../../features/students/schemas/student.schema";

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const student = await studentService.getStudentById(id);
    if (!student) {
      return NextResponse.json({ error: "Student not found." }, { status: 404 });
    }
    return NextResponse.json({ data: student }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    const payload = await request.json();
    const studentPayload = studentFormSchema.parse(payload);
    const updated = await studentService.updateStudent(id, studentPayload);
    return NextResponse.json({ data: updated }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error?.message || "Invalid update payload." }, { status: 400 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const removed = await studentService.deleteStudent(id);
    return NextResponse.json({ data: removed }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
