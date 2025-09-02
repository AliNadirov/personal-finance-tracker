import { useState } from "react";
import { useNavigate } from "react-router-dom";
import backBtn from "../../assets/icons/baseline-arrow-back.png";
import CustomSelect from "./CustomSelect/CustomSelect";
import "./Transaction.css";

const Transaction = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        category: "Food",
        amount: "",
        date: ""
    });

    const categories = [
        "Food", "Shopping", "Pet", "Leisure",
        "Gifts", "Kids Clothes", "Groceries", "Utilities", "Books",
        "Courses", "Workshops", "Flights", "Transport", "Hotel",
        "Car", "Gym", "Supplements", "Medical", "Other"
    ];

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formData);
        alert("Transaction Added!");
        setFormData({ category: "Food", amount: "", date: "" });
    };

    const handleBack = () => {
        navigate("/dashboard");
    };

    return (
        <div className="transaction-container">
            <div className="transaction-header">
                <button className="back-btn" onClick={handleBack}>
                    <img src={backBtn} alt="Back" />
                </button>
                <h2>Add Transaction</h2>
            </div>
            <form className="transaction-form" onSubmit={handleSubmit}>
                <label>Category</label>
                <CustomSelect
                    value={formData.category}
                    onChange={(cat) => setFormData(prev => ({ ...prev, category: cat }))}
                    options={categories}
                />

                <label>Amount</label>
                <input
                    type="number"
                    name="amount"
                    placeholder="$0.00"
                    value={formData.amount}
                    onChange={handleChange}
                />

                <label>Date</label>
                <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                />

                <div className="button-wrapper">
                    <button type="submit" className="done-btn">
                        Done
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Transaction;