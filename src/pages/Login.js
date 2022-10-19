import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const Login = () => {
    const [err, setErr] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/');

            console.log('success');
        } catch (err) {
            console.log(err);
            setErr(true);
        }
    };

    return (
        <div className='auth-container'>
            <div className='auth-wrapper'>
                <div className='form-container'>
                    <div className='form-header'>
                        <h1>Login</h1>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <input type='email' placeholder='Email' />
                        <input type='password' placeholder='Password' />
                        <button className='submit-btn'>Sign in</button>
                        {err && <span>Something went wrong</span>}
                    </form>
                    <div className='form-footer'>
                        <p>Don't have an account?</p>
                        <Link to='/register' className='link'>
                            Register
                        </Link>
                    </div>
                </div>
            </div>
            <div className='ball ball-1'></div>
            <div className='ball ball-2'></div>
        </div>
    );
};

export default Login;
