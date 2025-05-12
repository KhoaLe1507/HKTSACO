import React, { useState } from "react";

const ContactUsPage = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    subject: "",
    message: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Your message has been sent!");
    setForm({ name: "", phone: "", subject: "", message: "" });
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 bg-white text-black">
      <h2 className="text-3xl font-bold text-center mb-10">📩 Contact Us</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Info */}
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <i className="fas fa-map-marker-alt text-blue-600"></i>
            </div>
            <p>Da Nang City</p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <i className="fas fa-phone text-blue-600"></i>
            </div>
            <p>0934 807 226</p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <i className="fas fa-envelope text-blue-600"></i>
            </div>
            <p>tunghbdtsc@gmail.com</p>
          </div>
        </div>

        {/* Message Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-base font-semibold mb-1">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="Full Name *"
                value={form.name}
                onChange={handleChange}
                required
                title="Full Name"
                className="border px-4 py-2 rounded w-full"
              />
            </div>
            <div>
              <label htmlFor="name" className="block text-base font-semibold mb-1">
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                name="phone"
                placeholder="Phone Number *"
                value={form.phone}
                onChange={handleChange}
                required
                title="Phone Number"
                className="border px-4 py-2 rounded w-full"
              />
            </div>
          </div>

          <div>
            <label htmlFor="name" className="block text-base font-semibold mb-1">
              Subject
            </label>
            <input
              id="subject"
              type="text"
              name="subject"
              placeholder="Subject"
              value={form.subject}
              onChange={handleChange}
              title="Subject"
              className="border px-4 py-2 rounded w-full"
            />
          </div>

          <div>
            <label htmlFor="name" className="block text-base font-semibold mb-1">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              placeholder="Message"
              rows={5}
              value={form.message}
              onChange={handleChange}
              required
              title="Message"
              className="border px-4 py-2 rounded w-full"
            />
          </div>

          <button
            type="submit"
            title="Send Message"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded font-semibold"
          >
            Send Message
          </button>
        </form>

      </div>
    </div>
  );
};

export default ContactUsPage;
