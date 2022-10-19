import { useState } from 'react';

import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, storage, db } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';

import { MdAddPhotoAlternate } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const [err, setErr] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        let file = e.target[3].files[0];

        console.log('img', e.target[3].files[0], file);

        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);

            const storageRef = ref(storage, displayName);

            uploadBytesResumable(storageRef, file).then(() => {
                getDownloadURL(storageRef).then(async (downloadURL) => {
                    try {
                        await updateProfile(res.user, {
                            displayName,
                            photoURL: downloadURL,
                        });

                        await setDoc(doc(db, 'users', res.user.uid), {
                            uid: res.user.uid,
                            displayName,
                            email,
                            photoURL: downloadURL,
                        });

                        await setDoc(doc(db, 'userChats', res.user.uid), {});

                        navigate('/login');
                    } catch (err) {
                        console.log(err);
                        setErr(true);
                    }
                });
            });

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
                        <h1>Register</h1>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <input type='text' placeholder='Display Name' />
                        <input type='email' placeholder='Email' />
                        <input type='password' placeholder='Password' />
                        <input type='file' id='file' />
                        <label htmlFor='file' className='custom-file-input'>
                            <span>
                                <MdAddPhotoAlternate />
                            </span>
                            Add an avatar
                        </label>
                        <button className='submit-btn'>Sign up</button>
                        {err && <span>Something went wrong</span>}
                    </form>
                    <div className='form-footer'>
                        <p>Already have an account?</p>
                        <Link to='/login' className='link'>Login</Link>
                    </div>
                </div>
            </div>
            <div className='ball ball-1'></div>
            <div className='ball ball-2'></div>
        </div>
    );
};

export default Register;
