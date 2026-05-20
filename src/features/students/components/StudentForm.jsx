"use client";

import React, { useState } from "react";
import { studentFormSchema } from "../schemas/student.schema";
import { STUDENT_COURSE_OPTIONS, STUDENT_STATUS_OPTIONS } from "../constants/student.constants";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";
import { Select } from "../../../components/ui/Select";

export function StudentForm({ initialData = {}, onSubmit, submitLabel = "Save student" }) {
  const [name, setName] = useState(initialData.name || "");
  const [email, setEmail] = useState(initialData.email || "");
  const [course, setCourse] = useState(initialData.course || STUDENT_COURSE_OPTIONS[0].value);
  const [status, setStatus] = useState(initialData.status || STUDENT_STATUS_OPTIONS[0].value);
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    const result = studentFormSchema.safeParse({ name, email, course, status });
    if (!result.success) {
      setError(result.error.errors[0]?.message || "Please complete all fields.");
      return;
    }

    onSubmit(result.data);
  };

  return (
    <form className="student-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label className="form-label">
          Name
          <Input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Student name"
          />
        </label>

        <label className="form-label">
          Email
          <Input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            placeholder="student@example.com"
          />
        </label>
      </div>

      <div className="form-row">
        <label className="form-label">
          Course
          <Select value={course} onChange={(event) => setCourse(event.target.value)}>
            {STUDENT_COURSE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </label>

        <label className="form-label">
          Status
          <Select value={status} onChange={(event) => setStatus(event.target.value)}>
            {STUDENT_STATUS_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </label>
      </div>

      {error ? <p className="form-error">{error}</p> : null}

      <div className="form-actions">
        <Button type="submit" className="button-primary">
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}
