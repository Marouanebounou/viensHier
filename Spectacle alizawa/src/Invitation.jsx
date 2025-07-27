import { useState } from "react";
import api from "./api/axios";

const Invitation = () => {
  const [FormData, setFormData] = useState({
    fullName: "",
    email: "",
    number: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const res = api.post("/", FormData);
      console.log(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1></h1>
        <div>
          <h1>Get your ticket now</h1>
          <p>Subscribe - fill the form and get your invitation</p>
        </div>
        <div>
          <input
            type="text"
            name="fullName"
            value={FormData.fullName}
            onChange={handleChange}
            placeholder="Your full name"
          />
          <input
            type="email"
            name="email"
            value={FormData.email}
            onChange={handleChange}
            placeholder="Your email"
          />
          <input
            type="number"
            name="number"
            value={FormData.number}
            onChange={handleChange}
            placeholder="Your phone number"
          />
        </div>
        <button type="submit">Subscribe</button>
      </form>
    </>
  );
};

export default Invitation;
