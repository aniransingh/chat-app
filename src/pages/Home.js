import Sidebar from '../components/Sidebar';
import Chat from '../components/Chat';

const Home = () => {
    return (
        <div className='home'>
            <div className='home-wrapper'>
                <Sidebar />
                <Chat />
            </div>
            <div className="ball home-ball-1"></div>
            <div className="ball home-ball-2"></div>
            <div className="ball home-ball-3"></div>
        </div>
    );
};

export default Home;
