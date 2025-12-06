import { useState } from "react";
import "./Support.css";

const Support = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  const handleBack = () => {
    window.location.href = "/dashboard";
  };

  return (
    <div className="support-container">
      {!submitted ? (
        <>
          <h1 className="support-title">Support Center</h1>
          <p className="support-desc">
            Need help with your BudgetBee account? Fill out the form below and our team will reach out soon.
          </p>

          <form className="support-form" onSubmit={handleSubmit}>
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
            <textarea
              name="message"
              placeholder="Describe your issue or question..."
              value={formData.message}
              onChange={handleChange}
              required
            />
            <div className="support-actions">
              <button type="submit" className="support-btn">Send Message</button>
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
        <div className="support-success">
          <h2>Thank you!</h2>
          <p>We've received your message and will get back to you soon.</p>
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

export default Support;