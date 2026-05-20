import React from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";

export function StudentTable({ students, onEdit, onDelete }) {
  if (!students?.length) {
    return <p>No students found.</p>;
  }

  return (
    <div className="table-card">
      <table className="student-table">
        <thead>
          <tr>
            <th>Student name</th>
            <th>Email</th>
            <th>Enrolled course</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => {
            const status = student.status || "Active";
            return (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.course || "General Studies"}</td>
                <td>
                  <span className={`status-pill ${status === "Active" ? "status-active" : "status-inactive"}`}>
                    {status}
                  </span>
                </td>
                <td className="table-actions">
                  <button className="action-button" type="button" onClick={() => onEdit(student)}>
                    <FiEdit />
                  </button>
                  <button className="action-button danger" type="button" onClick={() => onDelete(student)}>
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
