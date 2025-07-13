import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Mail, MessageSquare, Phone, Loader2 } from 'lucide-react';
import { sendDataOfContactPage } from '../../services/api.js';
import styles from './ContactPage.module.scss';

const schema = yup.object().shape({
  fullName: yup.string().required("שם מלא חובה"),
  email: yup.string().email("כתובת דוא״ל לא תקינה").required("דוא״ל חובה"),
  subject: yup.string().required("נושא הפנייה חובה"),
  message: yup.string().required("תוכן הפנייה חובה"),
});

const ContactPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState("");

  const onSubmit = async (data) => {
    setLoading(true);
    setStatusMessage("");
  
    try {
      const result = await sendDataOfContactPage(data);
  
      if (result.success) {
        setStatusType("success");
        setStatusMessage(result.message);
        reset();
      } else {
        setStatusType("error");
        setStatusMessage(result.message);
      }
    } catch (error) {
      console.error("Unexpected error:", error); 
      setStatusType("error");
      setStatusMessage("שגיאה לא צפויה. אנא נסה שוב מאוחר יותר.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.contactPage}>
      <main className={styles.mainContent}>
        <div className={styles.contactLayout}>
          {/* Contact Form */}
          <div className={styles.formContainer}>
            <div className={styles.formCard}>
              <div className={styles.pageHeader}>
                <h2 className={styles.pageTitle}>
                  יצירת קשר
                </h2>
                <div className={styles.titleUnderline}></div>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className={styles.contactForm}>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>
                      שם מלא
                    </label>
                    <input 
                      type="text"
                      className={styles.formInput}
                      placeholder="הכנס את שמך המלא"
                      {...register("fullName")}
                    />
                    {errors.fullName && <p className={styles.errorMessage}>{errors.fullName.message}</p>}
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>
                      דוא״ל
                    </label>
                    <input 
                      type="email"
                      className={styles.formInput}
                      placeholder="הכנס את כתובת הדוא״ל שלך"
                      {...register("email")}
                    />
                    {errors.email && <p className={styles.errorMessage}>{errors.email.message}</p>}
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>
                    נושא הפנייה
                  </label>
                  <select className={styles.formSelect} {...register("subject")}>
                    <option value="">בחר נושא</option>
                    <option value="technical">תמיכה טכנית</option>
                    <option value="feedback">משוב על המערכת</option>
                    <option value="suggestion">הצעות לשיפור</option>
                    <option value="other">אחר</option>
                  </select>
                  {errors.subject && <p className={styles.errorMessage}>{errors.subject.message}</p>}
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>
                    תוכן הפנייה
                  </label>
                  <textarea 
                    className={styles.formTextarea}
                    rows="5"
                    placeholder="כתוב את תוכן פנייתך כאן"
                    {...register("message")}
                  ></textarea>
                  {errors.message && <p className={styles.errorMessage}>{errors.message.message}</p>}
                </div>

                <button 
                  type="submit"
                  className={styles.submitButton}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className={styles.loadingIcon} />
                      שולח...
                    </>
                  ) : (
                    "שליחת הפנייה"
                  )}
                </button>
              </form>

              {statusMessage && (
                <div className={`${styles.statusMessage} ${styles[statusType]}`}>
                  {statusMessage}
                </div>
              )}
            </div>
          </div>

          {/* Contact Info */}
          <div className={styles.infoContainer}>
            <div className={styles.infoCard}>
              <h3 className={styles.infoTitle}>
                דרכי התקשרות נוספות
              </h3>

              <div className={styles.contactMethods}>
                <div className={styles.contactMethod}>
                  <Mail className={styles.methodIcon} />
                  <div className={styles.methodDetails}>
                    <h4 className={styles.methodTitle}>דוא״ל</h4>
                    <p className={styles.methodText}>contact@lamda-test.com</p>
                  </div>
                </div>

                <div className={styles.contactMethod}>
                  <Phone className={styles.methodIcon} />
                  <div className={styles.methodDetails}>
                    <h4 className={styles.methodTitle}>טלפון</h4>
                    <p className={styles.methodText}>02-1234567</p>
                  </div>
                </div>

                <div className={styles.contactMethod}>
                  <MessageSquare className={styles.methodIcon} />
                  <div className={styles.methodDetails}>
                    <h4 className={styles.methodTitle}>שעות מענה</h4>
                    <p className={styles.methodText}>ימים א׳-ה׳: 9:00-17:00</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContactPage;