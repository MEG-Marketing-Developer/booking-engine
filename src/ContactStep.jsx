import React, { useState } from "react";

function ContactStep({onInputChange }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    notes: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
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
      <form className="space-y-10">
      <div>
        <input
        className="bg-[#E4ECEF] w-[70%] p-4 rounded-xl border border-[#577186] border-solid"
        placeholder="Full Name"
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <input
        className="bg-[#E4ECEF] w-[70%] p-4 rounded-xl border border-[#577186] border-solid"
        placeholder="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <input
        className="bg-[#E4ECEF] w-[70%] p-4 rounded-xl border border-[#577186] border-solid"
        placeholder="Phone"
          type="tel"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <textarea
        className="bg-[#E4ECEF] w-[70%] p-5 rounded-xl border border-[#577186] border-solid"
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
