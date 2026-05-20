"use client";

import { useMemo, useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { StudentTable } from "./components/StudentTable";
import { StudentFormModal } from "./components/StudentFormModal";
import { DeleteConfirmDialog } from "./components/DeleteConfirmDialog";
import { LoadingSpinner } from "./components/LoadingSpinner";
import { EmptyState } from "./components/EmptyState";
import { ErrorState } from "./components/ErrorState";
import { useStudents } from "./hooks/useStudents";
import { studentFormDefaults } from "./schemas/student.schema";

export default function StudentsPage() {
  const {
    students,
    loading,
    error,
    createStudent,
    updateStudent,
    deleteStudent,
  } = useStudents();

  const [search, setSearch] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [mode, setMode] = useState("create");

  const filteredStudents = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return students;
    return students.filter((student) => {
      return [student.name, student.email, student.course]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(query));
    });
  }, [search, students]);

  const handleOpenCreate = () => {
    setMode("create");
    setSelectedStudent(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (student) => {
    setMode("edit");
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const handleSubmit = async (payload) => {
    if (mode === "edit" && selectedStudent) {
      await updateStudent(selectedStudent.id, payload);
    } else {
      await createStudent(payload);
    }
    setIsModalOpen(false);
    setSelectedStudent(null);
  };

  const handleOpenDelete = (student) => {
    setSelectedStudent(student);
    setIsDeleteOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedStudent) return;
    await deleteStudent(selectedStudent.id);
    setIsDeleteOpen(false);
    setSelectedStudent(null);
  };

  return (
    <div className="dashboard-shell">
      <Sidebar 
        isOpen={isSidebarOpen} 
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)} 
        currentPath="students"
      />

      <main className="dashboard-main">
        <header className="dashboard-header">
          <div>
            <p className="eyebrow">Student Directory</p>
            <h1>Manage enrolled students</h1>
          </div>
          <button className="button button-primary" type="button" onClick={handleOpenCreate}>
            + Add New Student
          </button>
        </header>

        <section className="panel-card">
          <div className="panel-actions">
            <div className="search-field">
              <span className="sr-only">Search students</span>
              <input
                type="search"
                className="input"
                placeholder="Search by name, email or course..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>
            <span className="result-count">
              Showing <strong>{filteredStudents.length}</strong> of {students.length} students
            </span>
          </div>

          <div className="table-container">
            {loading && <LoadingSpinner />}
            {error && <ErrorState message={error} />}
            {!loading && !error && (
              <>
                {filteredStudents.length ? (
                  <StudentTable
                    students={filteredStudents}
                    onEdit={handleOpenEdit}
                    onDelete={handleOpenDelete}
                  />
                ) : (
                  <EmptyState message="No students match your search." />
                )}
              </>
            )}
          </div>
        </section>
      </main>

      <StudentFormModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={selectedStudent || { ...studentFormDefaults }}
        onSubmit={handleSubmit}
        title={mode === "edit" ? "Edit Student Details" : "Register New Student"}
      />

      <DeleteConfirmDialog
        open={isDeleteOpen}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setIsDeleteOpen(false)}
        studentName={selectedStudent?.name}
      />
    </div>
  );
}
