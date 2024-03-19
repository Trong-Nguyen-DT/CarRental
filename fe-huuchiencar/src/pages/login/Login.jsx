import React, { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import { login } from '../../services/AuthService';

const LoginPage = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        
        if (username != null && password != null) {
          setIsLoading(true);
          try {
            const response = await login(username, password);
            toast.success('Logged in successfully!');
            localStorage.setItem("jwtToken", response.token);
            localStorage.setItem("user", JSON.stringify(response.data));
            
            navigate("/customers")
        
          } catch (error) {
            for (let i = 0; i < error.response.data.message.length; i++) {
              toast.error(error.response.data.message[i].defaultMessage + '. Please try again.');
            }
          } finally {
            setIsLoading(false);
          }
        }
        
    };

  return (
    <>
        <ToastContainer/>
        <div className={styles.login_container}>
            <div className={styles.general}>
                <div className={styles.wrapper}>
                    <form onSubmit={handleLogin}>  
                        <h1>Đăng nhập</h1>
                        <div className={styles.input_box}>
                            <input
                                type="text"
                                placeholder="Tên đăng nhập"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <i className='bx bxs-user'></i>
                        </div>
                        <div className={styles.input_box}>
                            <input
                                type="password"
                                placeholder="Mật khẩu"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                  
                        </div>
                        <button type="submit" className={styles.btn} disabled={isLoading}>
                            {isLoading ? 'Loading...' : 'Đăng nhập'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </>
);
}

export default LoginPage;