import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./EditModal.module.scss";


const initializeFormState = (fields) => {
  return fields.reduce((acc, field) => {
    acc[field.name] = "";
    return acc;
  }, {});
};

const EditModal = ({ isOpen, onClose, title, fields, onSave }) => {

  const [formData, setFormData] = useState(() => initializeFormState(fields));

  useEffect(() => {
    if (isOpen && Array.isArray(fields)) {
      setFormData(initializeFormState(fields));
    }
  }, [isOpen, fields]);




  const handleChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    // filter empty fields
    const updatedData = Object.fromEntries(
      Object.entries(formData).filter(([, value]) => value.trim() !== "")
    );

    if (Object.keys(updatedData).length === 0) {
      alert("לא ניתן לשמור ללא ערכים מעודכנים.");
      return;
    }

    onSave(updatedData);
    setFormData(initializeFormState);
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
              <label htmlFor={field.name}>{field.label}</label>
              <input
                id={field.name}
                type={field.type || "text"}
                name={field.name}
                value={formData[field.name] || ""}
                onChange={handleChange}
              />
            </div>
          ))}
        </form>
        <div className={styles.buttonGroup}>
          <button type="submit" onClick={handleSubmit} className={styles.saveButton}>שמור</button>
          <button onClick={onClose} className={styles.cancelButton}>ביטול</button>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default EditModal;
