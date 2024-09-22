import React, { useState } from "react";

function ContactStep({ onInputChange, radioSelection }) {
  const [selectedOption, setSelectedOption] = useState("");
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

  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
    radioSelection(event.target.value);
  };

  return (
    <>
      <h1 className="text-base sm:text-3xl my-8 text-[#1D506A] font-bold text-center font-alexandria uppercase py-10">
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
        <div className=" border w-full md:w-[70%] mx-auto rounded-xl border-[#577186] border-solid bg-[#E4ECEF] p-10 space-y-10">
          <div className="text-[#1D506A] font-bold text-center font-alexandria uppercase">
            <h2>How Do you Want to Connect?</h2>
          </div>
          <div className="flex gap-4 w-full mx-auto justify-evenly ">
            <label
              className={`p-4 border rounded-lg cursor-pointer w-[200px] ${
                selectedOption === "Whats App"
                  ? "bg-[#eafff5] text-[#1d506a]"
                  : "bg-white"
              }`}
            >
              <input
                type="radio"
                value="Whats App"
                checked={selectedOption === "Whats App"}
                onChange={handleRadioChange}
                className="hidden"
              />
              Whats App
            </label>
            <label
              className={`p-4 border rounded-lg cursor-pointer w-[200px] ${
                selectedOption === "Email"
                  ? "bg-[#eafff5] text-[#1d506a]"
                  : "bg-white"
              }`}
            >
              <input
                type="radio"
                value="Email"
                checked={selectedOption === "Email"}
                onChange={handleRadioChange}
                className="hidden"
              />
              Email
            </label>
          </div>
        </div>
      </form>
    </>
  );
}

export default ContactStep;
