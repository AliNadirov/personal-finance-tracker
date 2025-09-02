import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, setCurrentUser, getUsers, saveUsers } from '../../../services/storage.js';
import backIcon from '../../../assets/icons/baseline-arrow-back.png';
import './profilesettings.css';

const ProfileSettings = () => {
    const navigate = useNavigate();
    const [currentUser, setCurrentUserState] = useState({
        name: '',
        email: '',
        currency: 'AZN',
        workType: '',
        budget: ''
    });
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    useEffect(() => {
        const storedUser = getCurrentUser();
        if (storedUser) {
            setCurrentUserState({
                name: storedUser.name || '',
                email: storedUser.email || '',
                currency: storedUser.currency || 'AZN',
                workType: storedUser.workType || '',
                budget: storedUser.budget || ''
            });
        }
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCurrentUserState(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const users = await getUsers();
        const updatedUsers = users.map(storedUser =>
            storedUser.email === currentUser.email
                ? { ...storedUser, ...currentUser, budget: Number(currentUser.budget) } // <- convert budget to number
                : storedUser
        );

        saveUsers(updatedUsers);
        setCurrentUser({ ...currentUser, budget: Number(currentUser.budget) });
        setShowModal(true);
        setTimeout(() => setShowModal(false), 2000);
    };

    const handleDeleteAccount = () => {
        setShowDeleteModal(true);
    };

    const confirmDeleteAccount = async () => {
        const users = await getUsers();
        const updatedUsers = users.filter(storedUser => storedUser.email !== currentUser.email);
        saveUsers(updatedUsers);
        localStorage.removeItem('currentUser');
        navigate('/login');
    };

    const handleBack = () => {
        navigate("/dashboard");
    };

    return (
        <div className="settings-page-wrapper">
            <button className="back-button" onClick={handleBack}>
                <img src={backIcon} alt="Back" />
            </button>
            <div className="settings-container">
                <h2 className="settings-title">Settings</h2>

                <form className="settings-form" onSubmit={handleSubmit}>
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        value={currentUser.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                    />

                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={currentUser.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                    />

                    <label>Currency</label>
                    <select name="currency" value={currentUser.currency} onChange={handleChange}>
                        <option value="AZN">AZN</option>
                        <option value="USD">USD</option>
                    </select>

                    <label>Work Type</label>
                    <input
                        type="text"
                        name="workType"
                        value={currentUser.workType}
                        onChange={handleChange}
                        placeholder="Enter work type"
                    />


                    <label>Add budget limit</label>
                    <input
                        type="number"
                        name="budget"
                        value={currentUser.budget}
                        onChange={handleChange}
                        placeholder="Enter budget limit"
                    />

                    <button type="submit" className="continue-button">Continue</button>
                </form>

                <button className="delete-button" onClick={handleDeleteAccount}>
                    Delete Account
                </button>
            </div>

            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-toast" onClick={(event) => event.stopPropagation()}>
                        Profile updated successfully!
                    </div>
                </div>
            )}

            {showDeleteModal && (
                <div className="modal-overlay" onClick={() => setShowDeleteModal(false)}>
                    <div className="modal-confirm" onClick={(event) => event.stopPropagation()}>
                        <h3>Delete Account</h3>
                        <p>Are you sure you want to delete your account ? This action cannot be undone.</p>
                        <div className="modal-actions">
                            <button className="confirm-btn" onClick={confirmDeleteAccount}>
                                Yes, Delete
                            </button>
                            <button className="cancel-btn" onClick={() => setShowDeleteModal(false)}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfileSettings;