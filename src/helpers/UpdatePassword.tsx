import { useState } from "react";
import { changePassword } from "./api";

export const UpdatePassword = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChangePassword = async () => {
        setLoading(true);
        try {
            const response = await changePassword(oldPassword, newPassword);
            
            if (response.status === 'ok') {
                setMessage('Password updated successfully!');
            } else {
                setMessage(response.message || 'Failed to update password.');
            }
        } catch (error) {
            console.error('Error updating password:', error);
            setMessage('An error occurred while updating the password.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <h2>Update Password</h2>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleChangePassword();
                }}
            >
                <div className="mb-3">
                    <label htmlFor="oldPassword" className="form-label">
                        Old Password:
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="oldPassword"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="newPassword" className="form-label">
                        New Password:
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Updating...' : 'Update Password'}
                </button>
            </form>
            {message && <div className="mt-3 alert alert-info">{message}</div>}
        </div>
    );
};
