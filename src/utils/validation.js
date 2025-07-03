// src/utils/registerValidation.js

export const validateRegisterForm = (formData) => {
  const errors = {};

  if (!formData.name.trim()) {
    errors.name = "Name is required";
  }

  if (!formData.username.trim()) {
    errors.username = "Username is required";
  }

  if (!formData.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = "Invalid email format";
  }

  if (!formData.password.trim()) {
    errors.password = "Password is required";
  }

  if (formData.contact && !/^\d{10}$/.test(formData.contact)) {
    errors.contact = "Contact must be 10 digits";
  }

  return errors;
};

export const validateLoginForm = (formData) => {
  const errors = {};

  if (!formData.usernameOrEmail.trim()) {
    errors.usernameOrEmail = "Username or Email is required";
  }

  if (!formData.password.trim()) {
    errors.password = "Password is required";
  }

  if (!formData.userCaptcha.trim()) {
    errors.userCaptcha = "CAPTCHA is required";
  }

  return errors;
};

export const validateTaskForm = (formData) => {
  const errors = {};

  if (!formData.name.trim()) {
    errors.name = "Task name is required";
  }

  if (!formData.priority) {
    errors.priority = "Priority must be selected";
  }

  if (!formData.deadline) {
    errors.deadline = "Deadline is required";
  }

  return errors;
};