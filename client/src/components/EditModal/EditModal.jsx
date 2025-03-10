import React, { useState } from "react";
import ReactDOM from "react-dom";
import styles from "./EditModal.module.scss";

const EditModal = ({ isOpen, onClose, title, fields, onSave }) => {
  const initialFormState = fields.reduce((acc, field) => {
    acc[field.name] = "";
    return acc;
  }, {});


  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSave(formData);
    setFormData(initialFormState);
    onClose();
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>{title}</h2>
        <form>
          {fields.map((field) => (
            <div key={field.name} className={styles.formGroup}>
              <label>{field.label}</label>
              <input
                type={field.type || "text"}
                name={field.name}
                value={formData[field.name] || ""}
                onChange={handleChange}
              />
            </div>
          ))}
        </form>
        <div className={styles.buttonGroup}>
          <button onClick={handleSubmit} className={styles.saveButton}>שמור</button>
          <button onClick={onClose} className={styles.cancelButton}>ביטול</button>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default EditModal;
