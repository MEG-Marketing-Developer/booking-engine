import React, { useState } from "react";

function ContactStep({ onInputChange }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    notes: "",
  });

  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
  });

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "fullName":
        if (!value) {
          error = "Full Name is required";
        } else if (value.length < 3) {
          error = "Full Name must be at least 3 characters long";
        }
        break;
      case "email":
        if (!value) {
          error = "Email is required";
        } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
          error = "Invalid email address";
        }
        break;
      case "phoneNumber":
        if (!value) {
          error = "Phone Number is required";
        } else if (!/^\d+$/.test(value)) {
          error = "Phone Number must be a number";
        }
        break;
      default:
        break;
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validate the field and update errors
    const error = validateField(name, value);
    setErrors({
      ...errors,
      [name]: error,
    });

    const updatedFormData = {
      ...formData,
      [name]: value,
    };

    setFormData(updatedFormData);
    onInputChange(updatedFormData);
  };

  return (
    <>
      <h1 className="text-base sm:text-3xl my-8 text-[#1D506A] font-bold text-center font-segoe uppercase py-10">
        CONTACT DETAILS
      </h1>
      <form className="space-y-10 pb-16">
        <div>
          <input
            className="bg-[#E4ECEF] w-full md:w-[70%] p-4 rounded-xl border border-[#577186] border-solid"
            placeholder="Full Name"
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
          {errors.fullName && <p className="text-red-500">{errors.fullName}</p>}
        </div>
        <div>
          <input
            className="bg-[#E4ECEF] w-full md:w-[70%] p-4 rounded-xl border border-[#577186] border-solid"
            placeholder="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <p className="text-red-500">{errors.email}</p>}
        </div>
        <div>
          <input
            className="bg-[#E4ECEF] w-full md:w-[70%] p-4 rounded-xl border border-[#577186] border-solid"
            placeholder="Phone"
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
          {errors.phoneNumber && (
            <p className="text-red-500">{errors.phoneNumber}</p>
          )}
        </div>
        <div>
          <textarea
            className="bg-[#E4ECEF] w-full md:w-[70%] p-5 rounded-xl border border-[#577186] border-solid"
            placeholder="Notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
          />
        </div>
      </form>
    </>
  );
}

export default ContactStep;
