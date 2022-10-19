import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';

import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

const UserChats = () => {
    const [chats, setChats] = useState([]);
    const { currentUser } = useContext(AuthContext);
    const { dispatch } = useContext(ChatContext);

    useEffect(() => {
        const getChats = () => {
            const unsub = onSnapshot(doc(db, 'userChats', currentUser.uid), (doc) => {
                setChats(doc.data());
            });

            return () => {
                unsub();
            };
        };

        currentUser.uid && getChats();
    }, [currentUser.uid]);

    const handleSelect = (u) => {
        dispatch({ type: 'CHANGE_USER', payload: u });
    };


    return (
        <div className='user-chats'>
            {Object.entries(chats)
                ?.sort((a, b) => b[1].date - a[1].date)
                .map((chat) => (
                    <div
                        className='user-chat'
                        key={chat[0]}
                        onClick={() => handleSelect(chat[1].userInfo)}
                    >
                        <img src={chat[1].userInfo.photoURL} alt='' />
                        <div className='user-chat-info'>
                            <h3>{chat[1].userInfo.displayName}</h3>
                            <p>{chat[1].lastMessage?.text}</p>
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default UserChats;
