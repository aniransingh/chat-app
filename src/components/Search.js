import {
    collection,
    query,
    where,
    getDocs,
    getDoc,
    setDoc,
    updateDoc,
    serverTimestamp,
    doc,
} from 'firebase/firestore';
import { db } from '../firebase';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

import { FiSearch } from 'react-icons/fi';

const Search = () => {
    const [username, setUsername] = useState('');
    const [user, setUser] = useState(null);
    const [notFound, setNotFound] = useState(false);
    const [err, setErr] = useState(false);

    const { currentUser } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setUser(null);
        const q = query(collection(db, 'users'), where('displayName', '==', username));

        try {
            const querySnapshot = await getDocs(q);

            querySnapshot.forEach((doc) => {
                setUser(doc.data());
            });

            if (querySnapshot.empty) setNotFound(true);
            else setNotFound(false);
        } catch (err) {
            console.log(err);
            setErr(err);
        }
    };

    const handleSelect = async () => {
        const combinedId =
            currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;
        try {
            const res = await getDoc(doc(db, 'chats', combinedId));

            if (!res.exists()) {
                await setDoc(doc(db, 'chats', combinedId), { messages: [] });

                await updateDoc(doc(db, 'userChats', currentUser.uid), {
                    [combinedId + '.userInfo']: {
                        uid: user.uid,
                        displayName: user.displayName,
                        photoURL: user.photoURL,
                    },
                    [combinedId + '.date']: serverTimestamp(),
                });

                await updateDoc(doc(db, 'userChats', user.uid), {
                    [combinedId + '.userInfo']: {
                        uid: currentUser.uid,
                        displayName: currentUser.displayName,
                        photoURL: currentUser.photoURL,
                    },
                    [combinedId + '.date']: serverTimestamp(),
                });
            }
        } catch (err) {}

        setUser(null);
        setUsername('');
    };

    return (
        <div className='search'>
            <form className='search-form' onSubmit={handleSubmit}>
                <input
                    type='text'
                    placeholder='Find a user'
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                />
                <button className='search-btn'>
                    <FiSearch />
                </button>
            </form>
            {err && <span>Something went wrong</span>}
            {notFound && <span>No users found</span>}
            {user && (
                <div className='user-chat' onClick={handleSelect}>
                    <img src={user.photoURL} alt='' />
                    <div className='user-chat-info'>
                        <h3>{user.displayName}</h3>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Search;
