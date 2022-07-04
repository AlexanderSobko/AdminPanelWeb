import React, {useState} from 'react';
import './Login.css';
import ApiDataService from '../../api/ApiDataService';

export default function Login() {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const token = ApiDataService.useToken();

    const handleSubmit = async e => {
        e.preventDefault();
        console.log(password + '-' + username);
        ApiDataService.login(username, password)
            .then(resp => {
                token.saveToken(resp.data.access_token)
                console.log(resp);
                window.location.reload();
            })
            .catch(exc => console.log(exc));
    }

    return (
        <div>
            <div className={false ? ' ' : ' hidden'}>
                Successfully logged in...
            </div>
            <div className={"lContainer" + (false ? ' hidden' : ' ')}>
                <div className="lItem">
                    <div className="loginImage">
                        <img src='/login.png' width="300" style={{position: 'relative'}} alt="login"/>
                    </div>
                    <div className="loginForm">
                        <h2>Admin Panel</h2>
                        <form onSubmit={handleSubmit} className="login-form">
                            <div className="newUserItem">
                                <input
                                    type="text"
                                    className='login-form'
                                    placeholder='Username'
                                    onChange={(event) => setUsername(event.target.value)}
                                    value={username}
                                />
                            </div>
                            <div className="newUserItem">
                                <input
                                    type="password"
                                    placeholder='Password'
                                    className='login-form'
                                    onChange={(event) => setPassword(event.target.value)}
                                    value={password}
                                />
                            </div>
                            <div className="loginButton"></div>
                            <button
                                type="primary"
                                htmlType="submit"
                                className="login-form-button"
                            >
                                Log in
                            </button>
                        </form>
                    </div>
                </div>
                <div className="footer">
                    <a href="src/pages/login/Login" target="_blank" rel="noopener noreferrer" className="footerLink">Powered
                        by React</a>
                </div>
            </div>
        </div>
    );
};