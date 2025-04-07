import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  registerUser,
  selectAuthError,
  selectAuthLoading,
} from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/auth/AuthForm";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector(selectAuthError);
  const loading = useSelector(selectAuthLoading);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "", // optional for role select
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(registerUser(formData));
    if (result.meta.requestStatus === "fulfilled") {
      navigate("/profile");
    }
  };

  return (
    <div className="auth-page">
      <h2>Register</h2>
      <AuthForm
        type="register"
        showRole={true}
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        loading={loading}
        error={error}
      />
    </div>
  );
}