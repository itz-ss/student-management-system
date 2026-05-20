import { prisma } from "./prisma";

/**
 * StudentService handles all database operations for students.
 * This class provides a modular and scalable way to manage student data.
 */
export class StudentService {
  /**
   * Retrieves all students from the database.
   * @returns {Promise<Array>} A list of students.
   */
  async getAllStudents() {
    try {
      return await prisma.student.findMany({
        orderBy: { enrolledAt: "desc" },
      });
    } catch (error) {
      console.error("Failed to fetch students:", error);
      throw new Error("Could not retrieve students.");
    }
  }

  /**
   * Retrieves a single student by ID.
   * @param {string} id - The student ID.
   * @returns {Promise<Object|null>} The student object or null.
   */
  async getStudentById(id) {
    if (!id) return null;
    try {
      return await prisma.student.findUnique({
        where: { id },
      });
    } catch (error) {
      console.error(`Failed to fetch student with ID ${id}:`, error);
      throw new Error("Could not retrieve student.");
    }
  }

  /**
   * Creates a new student record.
   * @param {Object} data - The student data (name, email, course, status).
   * @returns {Promise<Object>} The created student record.
   */
  async createStudent(data) {
    try {
      return await prisma.student.create({
        data: {
          name: data.name,
          email: data.email,
          course: data.course,
          status: data.status,
        },
      });
    } catch (error) {
      console.error("Failed to create student:", error);
      if (error.code === 'P2002') {
        throw new Error("A student with this email already exists.");
      }
      throw new Error("Could not create student.");
    }
  }

  /**
   * Updates an existing student record.
   * @param {string} id - The student ID.
   * @param {Object} data - The partial student data to update.
   * @returns {Promise<Object>} The updated student record.
   */
  async updateStudent(id, data) {
    try {
      return await prisma.student.update({
        where: { id },
        data,
      });
    } catch (error) {
      console.error(`Failed to update student with ID ${id}:`, error);
      throw new Error("Could not update student.");
    }
  }

  /**
   * Deletes a student record.
   * @param {string} id - The student ID.
   * @returns {Promise<Object>} The deleted student record.
   */
  async deleteStudent(id) {
    try {
      return await prisma.student.delete({
        where: { id },
      });
    } catch (error) {
      console.error(`Failed to delete student with ID ${id}:`, error);
      throw new Error("Could not delete student.");
    }
  }
}

// Export a singleton instance of the service
export const studentService = new StudentService();
