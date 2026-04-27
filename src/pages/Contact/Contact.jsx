import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  const handleBack = () => {
    navigate("/dashboard");
  };

  return (
    <div className="contact-container">
      {!submitted ? (
        <>
          <h1 className="contact-title">Contact Us</h1>
          <p className="contact-desc">
            Have a question, suggestion, or business inquiry? Send us a message
            and the BudgetBee team will get back to you soon.
          </p>

          <form className="contact-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />

            <textarea
              name="message"
              placeholder="Write your message here..."
              value={formData.message}
              onChange={handleChange}
              required
            />

            <div className="contact-actions">
              <button type="submit" className="contact-btn">
                Send Message
              </button>

              <button
                type="button"
                className="back-to-dashboard-btn"
                onClick={handleBack}
              >
                ← Back to Dashboard
              </button>
            </div>
          </form>
        </>
      ) : (
        <div className="contact-success">
          <h2>Message sent!</h2>
          <p>Thanks for reaching out. We'll get back to you as soon as possible.</p>
          <button
            className="back-to-dashboard-btn success-version"
            onClick={handleBack}
          >
            ← Back to Dashboard
          </button>
        </div>
      )}
    </div>
  );
};

export default Contact;