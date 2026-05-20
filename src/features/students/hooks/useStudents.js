"use client";

import { useCallback, useEffect, useState } from "react";
import {
  fetchStudents,
  createStudent,
  updateStudent,
  deleteStudent as removeStudent,
} from "../services/student.service";

export function useStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadStudents = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchStudents();
      setStudents(data);
    } catch (err) {
      setError(err?.message ?? "Unable to load students.");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleCreateStudent = useCallback(async (payload) => {
    setError(null);
    try {
      const created = await createStudent(payload);
      setStudents((current) => [created, ...current]);
      return created;
    } catch (err) {
      setError(err?.message ?? "Unable to create student.");
      throw err;
    }
  }, []);

  const handleUpdateStudent = useCallback(async (id, payload) => {
    setError(null);
    try {
      const updated = await updateStudent(id, payload);
      setStudents((current) => current.map((student) => (student.id === id ? updated : student)));
      return updated;
    } catch (err) {
      setError(err?.message ?? "Unable to update student.");
      throw err;
    }
  }, []);

  const handleDeleteStudent = useCallback(async (id) => {
    setError(null);
    try {
      await removeStudent(id);
      setStudents((current) => current.filter((student) => student.id !== id));
    } catch (err) {
      setError(err?.message ?? "Unable to delete student.");
      throw err;
    }
  }, []);

  useEffect(() => {
    loadStudents();
  }, [loadStudents]);

  return {
    students,
    loading,
    error,
    reload: loadStudents,
    createStudent: handleCreateStudent,
    updateStudent: handleUpdateStudent,
    deleteStudent: handleDeleteStudent,
  };
}
