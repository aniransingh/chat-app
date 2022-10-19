import { useContext } from 'react';
import { ChatContext } from '../context/ChatContext';

import Messages from './Messages';
import Input from './Input';

const Chat = () => {
    const { data } = useContext(ChatContext);

    return (
        <div className='chat'>
            <div className='chat-info'>
                <h2>{data.user?.displayName}</h2>
            </div>
            {Object.keys(data.user).length === 0 ? (
                <div className='chat-init'>Select a user to start conversation</div>
            ) : (
                <>
                    <Messages />
                    <Input />
                </>
            )}
        </div>
    );
};

export default Chat;
