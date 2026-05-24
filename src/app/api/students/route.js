import { NextResponse } from "next/server";
import { studentService } from "../../../lib/studentService";
import { studentFormSchema } from "../../../features/students/schemas/student.schema";

export async function GET() {
  try {
    const students = await studentService.getAllStudents();
    return NextResponse.json({ data: students }, { status: 200 });
  } catch (error) {
    console.error("GET /api/students error:", error);
    // Map transient database connectivity errors to 503 Service Unavailable
    if (error?.code === 'P1001' || String(error).includes('DatabaseNotReachable') || String(error).includes('DriverAdapterError')) {
      return NextResponse.json({ error: "Database temporarily unavailable. Please try again soon." }, { status: 503 });
    }
    const message = error?.message ?? String(error) ?? "Internal Server Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const payload = await request.json();
    const studentPayload = studentFormSchema.parse(payload);
    const result = await studentService.createStudent(studentPayload);
    return NextResponse.json({ data: result }, { status: 201 });
  } catch (error) {
    console.error("POST /api/students error:", error);
    return NextResponse.json({ error: error?.message || String(error) || "Invalid student payload." }, { status: 400 });
  }
}
