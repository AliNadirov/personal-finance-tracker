import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Trash2, X } from "lucide-react";
import {
  getCurrentUser,
  setCurrentUser,
  getUsers,
  saveUsers,
  clearCurrentUser,
} from "../../../services/storage";
import CurrencySelect from "./components/CurrencySelect";
import "./ProfileSettings.css";

const currencies = [
  { code: "USD", name: "US Dollar", flag: "us" },
  { code: "EUR", name: "Euro", flag: "eu" },
  { code: "GBP", name: "British Pound", flag: "gb" },
  { code: "JPY", name: "Japanese Yen", flag: "jp" },
  { code: "CNY", name: "Chinese Yuan", flag: "cn" },
  { code: "KRW", name: "South Korean Won", flag: "kr" },
  { code: "CAD", name: "Canadian Dollar", flag: "ca" },
  { code: "AUD", name: "Australian Dollar", flag: "au" },
  { code: "CHF", name: "Swiss Franc", flag: "ch" },
  { code: "HKD", name: "Hong Kong Dollar", flag: "hk" },
  { code: "SGD", name: "Singapore Dollar", flag: "sg" },
  { code: "NZD", name: "New Zealand Dollar", flag: "nz" },
  { code: "SEK", name: "Swedish Krona", flag: "se" },
  { code: "NOK", name: "Norwegian Krone", flag: "no" },
  { code: "DKK", name: "Danish Krone", flag: "dk" },
  { code: "PLN", name: "Polish Zloty", flag: "pl" },
  { code: "CZK", name: "Czech Koruna", flag: "cz" },
  { code: "HUF", name: "Hungarian Forint", flag: "hu" },
  { code: "RON", name: "Romanian Leu", flag: "ro" },
  { code: "BGN", name: "Bulgarian Lev", flag: "bg" },
  { code: "TRY", name: "Turkish Lira", flag: "tr" },
  { code: "AZN", name: "Azerbaijani Manat", flag: "az" },
  { code: "AED", name: "UAE Dirham", flag: "ae" },
  { code: "SAR", name: "Saudi Riyal", flag: "sa" },
  { code: "QAR", name: "Qatari Riyal", flag: "qa" },
  { code: "KWD", name: "Kuwaiti Dinar", flag: "kw" },
  { code: "ILS", name: "Israeli Shekel", flag: "il" },
  { code: "INR", name: "Indian Rupee", flag: "in" },
  { code: "PKR", name: "Pakistani Rupee", flag: "pk" },
  { code: "BDT", name: "Bangladeshi Taka", flag: "bd" },
  { code: "IDR", name: "Indonesian Rupiah", flag: "id" },
  { code: "MYR", name: "Malaysian Ringgit", flag: "my" },
  { code: "THB", name: "Thai Baht", flag: "th" },
  { code: "PHP", name: "Philippine Peso", flag: "ph" },
  { code: "VND", name: "Vietnamese Dong", flag: "vn" },
  { code: "TWD", name: "Taiwan Dollar", flag: "tw" },
  { code: "BRL", name: "Brazilian Real", flag: "br" },
  { code: "MXN", name: "Mexican Peso", flag: "mx" },
  { code: "ARS", name: "Argentine Peso", flag: "ar" },
  { code: "CLP", name: "Chilean Peso", flag: "cl" },
  { code: "COP", name: "Colombian Peso", flag: "co" },
  { code: "PEN", name: "Peruvian Sol", flag: "pe" },
  { code: "ZAR", name: "South African Rand", flag: "za" },
  { code: "EGP", name: "Egyptian Pound", flag: "eg" },
  { code: "NGN", name: "Nigerian Naira", flag: "ng" },
  { code: "KES", name: "Kenyan Shilling", flag: "ke" },
  { code: "MAD", name: "Moroccan Dirham", flag: "ma" },
  { code: "UAH", name: "Ukrainian Hryvnia", flag: "ua" },
  { code: "GEL", name: "Georgian Lari", flag: "ge" },
  { code: "KZT", name: "Kazakhstani Tenge", flag: "kz" },
];

function ProfileSettings() {
  const navigate = useNavigate();

  const [originalEmail, setOriginalEmail] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    currency: "USD",
  });

  useEffect(() => {
    const user = getCurrentUser();

    if (user) {
      setOriginalEmail(user.email || "");
      setFormData({
        name: user.name || "",
        email: user.email || "",
        currency: user.currency || "USD",
      });
    }
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async (event) => {
    event.preventDefault();

    const users = await getUsers();

    const updatedUser = {
      ...getCurrentUser(),
      name: formData.name.trim(),
      email: formData.email.trim(),
      currency: formData.currency,
    };

    const updatedUsers = users.map((user) =>
      user.email === originalEmail ? updatedUser : user
    );

    saveUsers(updatedUsers);
    setCurrentUser(updatedUser);
    setOriginalEmail(updatedUser.email);
  };

  const handleDelete = async () => {
    const users = await getUsers();

    const updatedUsers = users.filter(
      (user) => user.email !== originalEmail
    );

    saveUsers(updatedUsers);
    clearCurrentUser();
    navigate("/login");
  };

  return (
    <main className="profile-page">
      <section className="profile-shell">
        <button
          type="button"
          className="profile-back-btn"
          onClick={() => navigate("/dashboard")}
        >
          <ArrowLeft size={18} />
          <span>Back to Dashboard</span>
        </button>

        <div className="profile-card">
          <header className="profile-header">
            <p>BudgetBee Account</p>
            <h1>Your Profile</h1>
            <span>
              Manage your identity and preferred currency for cleaner financial
              tracking.
            </span>
          </header>

          <form className="profile-form" onSubmit={handleSave}>
            <label className="profile-field">
              <span>Full Name</span>
              <input
                className="profile-input"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </label>

            <label className="profile-field">
              <span>Email Address</span>
              <input
                className="profile-input"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </label>

            <CurrencySelect
              label="Currency"
              value={formData.currency}
              options={currencies}
              onChange={(currency) =>
                setFormData((prev) => ({
                  ...prev,
                  currency,
                }))
              }
            />

            <button type="submit" className="profile-save-btn">
              Save Changes
            </button>
          </form>

          <div className="danger-zone">
            <div className="danger-icon">
              <Trash2 size={18} />
            </div>

            <div className="danger-content">
              <h2>Delete BudgetBee Profile</h2>
              <p>
                Delete this profile permanently and clear its saved workspace
                data.
              </p>
            </div>

            <button
              type="button"
              className="delete-btn"
              onClick={() => setShowDeleteModal(true)}
            >
              <Trash2 size={16} />
              Delete Profile
            </button>
          </div>
        </div>
      </section>

      {showDeleteModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowDeleteModal(false)}
        >
          <div className="modal-box" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className="modal-close"
              onClick={() => setShowDeleteModal(false)}
            >
              <X size={18} />
            </button>

            <h3>Delete this profile?</h3>
            <p>
              This will permanently remove your BudgetBee profile from this
              browser. This action cannot be undone.
            </p>

            <div className="modal-actions">
              <button
                type="button"
                className="confirm-delete"
                onClick={handleDelete}
              >
                Yes, Delete
              </button>

              <button
                type="button"
                className="cancel-delete"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default ProfileSettings;