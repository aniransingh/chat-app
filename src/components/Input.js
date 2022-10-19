import { useState, useContext } from 'react';

import { ChatContext } from '../context/ChatContext';
import { AuthContext } from '../context/AuthContext';

import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore';
import { db, storage } from '../firebase';

import { v4 as uuid } from 'uuid';

import { FiSend } from 'react-icons/fi';
import { ImAttachment } from 'react-icons/im';

const Input = () => {
    const [text, setText] = useState('');
    const [img, setImg] = useState();
    const [err, setErr] = useState(false);

    const { currentUser } = useContext(AuthContext);
    const { data } = useContext(ChatContext);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (img) {
            const storageRef = ref(storage, uuid());

            uploadBytesResumable(storageRef, img).then(() => {
                getDownloadURL(storageRef).then(async (downloadURL) => {
                    try {
                        await updateDoc(doc(db, 'chats', data.chatId), {
                            messages: arrayUnion({
                                id: uuid(),
                                text,
                                senderId: currentUser.uid,
                                date: Timestamp.now(),
                                img: downloadURL,
                            }),
                        });
                    } catch (err) {
                        console.log(err);
                        setErr(true);
                    }
                });
            });
        } else {
            await updateDoc(doc(db, 'chats', data.chatId), {
                messages: arrayUnion({
                    id: uuid(),
                    text,
                    senderId: currentUser.uid,
                    date: Timestamp.now(),
                }),
            });
        }

        await updateDoc(doc(db, 'userChats', currentUser.uid), {
            [data.chatId + '.lastMessage']: {
                text,
            },
            [data.chatId + '.data']: serverTimestamp(),
        });

        await updateDoc(doc(db, 'userChats', data.user.uid), {
            [data.chatId + '.lastMessage']: {
                text,
            },
            [data.chatId + '.data']: serverTimestamp(),
        });

        setText('');
        setImg();
    };

    return (
        <form className='input' onSubmit={handleSubmit}>
            <input
                type='file'
                id='attach'
                onChange={(e) => setImg(e.target.files[0])}

            />
            <label htmlFor='attach' className='input-btn' id='attach'>
                <ImAttachment />
            </label>
            <input
                type='text'
                placeholder='Message'
                onChange={(e) => setText(e.target.value)}
                value={text}
            />
            <button className='input-btn' id='send'>
                <FiSend />
            </button>
        </form>
    );
};

export default Input;
