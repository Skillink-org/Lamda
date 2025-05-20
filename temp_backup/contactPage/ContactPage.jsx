import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Loader2 } from "lucide-react";
import { sendDataOfContactPage } from '../../services/api.js';

const schema = yup.object().shape({
  fullName: yup.string().required("Full Name is required"),
  email: yup.string().email("Invalid email address").required("Email is required"),
  subject: yup.string().required("Subject is required"),
  message: yup.string().required("Message is required"),
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
      setStatusMessage("An unexpected error occurred. Please try again later.");    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="contactPageContainer">
      <h2 className="title">Contact Form</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="contactFormContainer">
        <div className='fullNameContainer'>
          <input placeholder="Full Name" {...register("fullName")} className='fullNameInput' />
          {errors.fullName && <p className="text-red-500">{errors.fullName.message}</p>}
        </div>

        <div className='emailContainer'>
          <input type="email" placeholder="Email" {...register("email")} className='emailInput' />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        </div>

        <div className='contentSubjectContainer'>
          <input placeholder="Subject" {...register("subject")} className='contentSubjectInput' />
          {errors.subject && <p className="text-red-500">{errors.subject.message}</p>}
        </div>

        <div className='contentContextContainer'>
          <textarea placeholder="Message" {...register("message")} className='contentContextArea' />
          {errors.message && <p className="text-red-500">{errors.message.message}</p>}
        </div>

        <div className="submitBtnContainer">
          <button type="submit" disabled={loading} className="sendBtn">
            {loading ? <Loader2 className="animate-spin" /> : "Send"}
          </button>
        </div>
      </form>

      {statusMessage && (
        <p className={`mt-4 ${statusType === "success" ? "text-green-600" : "text-red-600"}`}>
          {statusMessage}
        </p>
      )}
    </div>
  );
};

export default ContactPage;