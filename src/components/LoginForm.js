import { useState } from "react";
import FirebaseAuthService from "../FirebaseAuthService";

function LoginForm ({ existingUser }){
    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");

    async function handleSubmit(event){
        event.preventDefault();

        try {
            await FirebaseAuthService.loginUser(username, password);
            setUsername("");
            setPassword("");
        } catch (error) {
            alert(error.message);
        }
    }

    function handleLogout() {
        FirebaseAuthService.logoutUser();
    }

    async function handleSendResetPasswordEmail() {
        if(!username){
            alert('Missing Username!');
            return;
        }

        try {
            await FirebaseAuthService.sendPasswordResetEmail(username);
            alert("Send the password reset email!");
        } catch (error) {
            alert(error.message);      
        }
    }
    // Dont use Login With Google, use mostly email and password login
    async function handleLoginWithGoogle(){
        try {
            await FirebaseAuthService.loginWithGoogle();
        } catch (error) {
            alert(error.message);
        }
    }


    return (
        <div className="login-form-container">
        {
            existingUser ? (<div className="row">
                <h3>Welcome, {existingUser.email}</h3>
                <button type="button" className="primary-button" onClick={handleLogout}>
                Logout
                </button>
            </div>) : (<form onSubmit={handleSubmit} className="login-form">
                <label className="input-label login-label">
                    Username (email):
                    <input
                    type="email"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="input-text"
                    />
                </label>
                <label className="input-label login-label">
                    Password:
                    <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-text"
                    />
                </label>
                <div className="button-box">
                    <button className="primary-button" type="submit">Login</button>
                    <button type="button" onClick={handleSendResetPasswordEmail} className="primary-button">Reset Password</button>
                    <button type="button" onClick={handleLoginWithGoogle} className="primary-button">Login With Google</button>
                </div>
            </form>)}
            </div>

    )
}

export default LoginForm;