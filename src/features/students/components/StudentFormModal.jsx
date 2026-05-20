"use client";

import React from "react";
import { Modal } from "../../../components/ui/Modal";
import { StudentForm } from "./StudentForm";

export function StudentFormModal({ open, onClose, onSubmit, initialData, title }) {
  return (
    <Modal open={open} onClose={onClose}>
      <div className="modal-header">
        <h2>{title}</h2>
        <button className="modal-close" type="button" onClick={onClose}>
          Close
        </button>
      </div>
      <StudentForm initialData={initialData} onSubmit={onSubmit} submitLabel={title} />
    </Modal>
  );
}
