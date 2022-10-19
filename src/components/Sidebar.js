import Navbar from '../components/Navbar';
import Search from '../components/Search';
import UserChats from './UserChats';

const Sidebar = () => {
    return (
        <div className='sidebar'>
            <Search />
            <UserChats />
            <Navbar />
            {/* <div className='ball ball-3'></div>
            <div className='ball ball-4'></div> */}
        </div>
    );
};

export default Sidebar;
