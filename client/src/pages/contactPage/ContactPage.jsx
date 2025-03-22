import './ContactPage.module.scss'

import React from 'react';
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Loader2 } from "lucide-react";

const schema = yup.object().shape({
  fullName: yup.string().required("שם מלא הוא שדה חובה"),
  email: yup.string().email("כתובת אימייל לא תקינה").required("אימייל הוא שדה חובה"),
  subject: yup.string().required("נושא הפנייה הוא שדה חובה"),
  message: yup.string().required("תוכן הפנייה הוא שדה חובה"),
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
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (response.ok) {
        setStatusType("success");
        setStatusMessage("הטופס נשלח בהצלחה!");
        reset();
      } else {
        throw new Error(result.message || "שגיאה בשליחת הטופס");
      }
    } catch (error) {
      console.log(error);
      setStatusType("error");
      setStatusMessage(error.message);
    }
    setLoading(false);
  };

  return (
<div className="contactPageContainer">
              {console.log("enter to contract page")}
                      <h2 className="title">טופס יצירת קשר</h2>
                      <form onSubmit={handleSubmit(onSubmit)} className="contactFormContainer">
                      <div className='fullNameContainer'>
                          <input placeholder="שם מלא" {...register("fullName")} className='fullNameInput'/>
                          {errors.fullName && <p className="text-red-500">{errors.fullName.message}</p>}
                        </div>
                        <div className='emailContainer'>
                          <input type="email" placeholder="אימייל" {...register("email")} className='emailInput'/>
                          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                        </div>
                        <div className='contentSubjectContainer'>
                          <input placeholder="נושא הפנייה" {...register("subject")} className='contentSubjectInput'/>
                          {errors.subject && <p className="text-red-500">{errors.subject.message}</p>}
                        </div>
                        <div className='contentContextContainer'>
                          <textarea placeholder="תוכן הפנייה" {...register("message")} className='contentContextArea'/>
                          {errors.message && <p className="text-red-500">{errors.message.message}</p>}
                        </div>
                        <div className="submitBtnContainer">
                          <button type="submit" disabled={loading} className="sendBtn">
                            {loading ? <Loader2 className="animate-spin" /> : "שלח"}
                          </button>
                        </div>
                      </form>
                        
                      
                      
                        
                        
                    
                
                      {statusMessage && (
                        <p className={`mt-4 ${statusType === "success" ? "text-green-600" : "text-red-600"}`}>
                          {statusMessage}
                        </p>
                      )}

                      {/* <div className="viewDetailes">
                          <h3 className="text-lg font-semibold">יצירת קשר ישירה</h3>
                          <p>📞 טלפון: 03-1234567</p>
                          <p>📧 אימייל: contact@example.com</p>
                        </CardContent>
                      </div>  */}
      </div>
  );
};

export default ContactPage;
