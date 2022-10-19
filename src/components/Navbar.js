import { signOut } from 'firebase/auth';
import { useContext } from 'react';

import { ChatContext } from '../context/ChatContext';

import { FiLogOut, FiUser } from 'react-icons/fi';
import { AuthContext } from '../context/AuthContext';
import { auth } from '../firebase';

const Navbar = () => {
    const {currentUser} = useContext(AuthContext)
    const { dispatch } = useContext(ChatContext);

    return (
        <nav className='navbar'>
            <div className='user'>
                {/* <span className='user-avatar'><FiUser /></span> */}
                <img src={currentUser.photoURL} alt='' />
                <h2>{currentUser.displayName}</h2>
            </div>
            <button className='logout-btn' onClick={() => {
                dispatch({type: "INIT"})
                signOut(auth)
                }}>
                <span>
                    <FiLogOut />
                </span>
                Logout
            </button>
        </nav>
    );
};

export default Navbar;
