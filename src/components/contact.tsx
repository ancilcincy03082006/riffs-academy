import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    mobile: "",
    course: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to send inquiry");
      }

      alert("Inquiry sent successfully!");

      setFormData({
        full_name: "",
        email: "",
        mobile: "",
        course: "",
        message: "",
      });
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : "Failed to send inquiry");
    }
  };

  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto">
        <h2 className="text-3xl font-bold text-white text-center">
          Contact Us
        </h2>

        <p className="mt-4 text-slate-300 text-center">
          Riffs Academy of Music
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">

          <input
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full p-3 rounded"
          />

          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            className="w-full p-3 rounded"
          />

          <input
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            placeholder="Mobile Number"
            className="w-full p-3 rounded"
          />

          <input
            name="course"
            value={formData.course}
            onChange={handleChange}
            placeholder="Course Interested In"
            className="w-full p-3 rounded"
          />

          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Message"
            className="w-full p-3 rounded"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded"
          >
            Send Inquiry
          </button>

        </form>
      </div>
    </section>
  );
}