import { useState } from "react";
import { changeLogin } from "./api";

export const UpdateLogin = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChangeLogin = async () => {
        setLoading(true);
        try {
            const response = await changeLogin(login, password);

            console.log(response)
            
            if (response.status === 'ok') {
                setMessage('Login details updated successfully!');
            } else {
                setMessage('Failed to update login details.');
            }
        } catch (error) {
            console.error('Error updating login:', error);
            setMessage('An error occurred while updating login.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <h2>Update Login</h2>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleChangeLogin();
                }}
            >
                <div className="mb-3">
                    <label htmlFor="login" className="form-label">
                        New login:
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="login"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                        Password:
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Updating...' : 'Update Login'}
                </button>
            </form>
            {message && <div className="mt-3 alert alert-info">{message}</div>}
        </div>
    );
};
