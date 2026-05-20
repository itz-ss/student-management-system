"use client";

import React from "react";
import { Modal } from "../../../components/ui/Modal";
import { Button } from "../../../components/ui/Button";

export function DeleteConfirmDialog({ open, onConfirm, onCancel, studentName }) {
  if (!open) return null;

  return (
    <Modal open={open} onClose={onCancel}>
      <div className="confirm-dialog">
        <h3>Delete student</h3>
        <p>Are you sure you want to remove <strong>{studentName}</strong> from the directory?</p>
        <div className="confirm-actions">
          <Button type="button" className="button-secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="button" className="danger" onClick={onConfirm}>
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
}
