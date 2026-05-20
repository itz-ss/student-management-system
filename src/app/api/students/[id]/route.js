import { NextResponse } from "next/server";
import { studentService } from "../../../../lib/studentService";
import { studentFormSchema } from "../../../../features/students/schemas/student.schema";

export async function GET(request, { params }) {
  try {
    const { id } = params;
    const student = await studentService.getStudentById(id);
    if (!student) {
      return NextResponse.json({ error: "Student not found." }, { status: 404 });
    }
    return NextResponse.json({ data: student }, { status: 200 });
  } catch (error) {
    console.error("GET /api/students/[id] error:", error);
    const message = error?.message ?? String(error) ?? "Internal Server Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PATCH(request, { params }) {
  try {
    const { id } = params;
    const payload = await request.json();
    const studentPayload = studentFormSchema.parse(payload);
    const updated = await studentService.updateStudent(id, studentPayload);
    return NextResponse.json({ data: updated }, { status: 200 });
  } catch (error) {
    console.error("PATCH /api/students/[id] error:", error);
    return NextResponse.json({ error: error?.message || String(error) || "Invalid update payload." }, { status: 400 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    const removed = await studentService.deleteStudent(id);
    return NextResponse.json({ data: removed }, { status: 200 });
  } catch (error) {
    console.error("DELETE /api/students/[id] error:", error);
    const message = error?.message ?? String(error) ?? "Internal Server Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
