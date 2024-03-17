import styles from './Login.module.css';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);




    return (
        <>
            <ToastContainer />
            <div className={styles.login_container}>
                <div className={styles.general}>
                    <div className={styles.wrapper}>
                        <form  >
                            <h1>Login</h1>
                            <div className={styles.input_box}>
                                <input
                                    type="text"
                                    placeholder="Username"
                                    required
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                                <i className='bx bxs-user'></i>
                            </div>
                            <div className={styles.input_box}>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <i className='bx bxs-lock-alt'></i>
                            </div>
                            <button type="submit" className={styles.btn} disabled={isLoading}>
                                {isLoading ? 'Loading...' : 'Login'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LoginPage;