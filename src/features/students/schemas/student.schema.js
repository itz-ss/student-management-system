import { z } from "zod";

/**
 * The core student shape used in the application.
 * Includes all fields persisted by the API.
 */
export const studentSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Name is required."),
  email: z.string().email("Enter a valid email."),
  course: z.string().min(1, "Course selection is required."),
  status: z.enum(["Active", "Inactive"]),
  enrolledAt: z.string().optional(),
});

/**
 * The form schema validates the fields exposed in the student form.
 * This keeps UI validation aligned with the API contract.
 */
export const studentFormSchema = studentSchema.pick({
  name: true,
  email: true,
  course: true,
  status: true,
});

export const studentFormDefaults = {
  name: "",
  email: "",
  course: "Computer Science 101",
  status: "Active",
};
