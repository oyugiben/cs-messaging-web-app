import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Parse from '../../ParseInitialize';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
    const navigate = useNavigate();
    const { currentAgent } = useContext(AuthContext);
    console.log("🚀 ~ Navbar ~ currentAgent:", currentAgent)
    
    return (
        <div className='navbar'>
            <span className='logo'>Branch</span>
            <div className='agent'>
                <img src='' alt=''/>
                <span>{currentAgent.get('username')}</span>
                <button onClick={() => {
                    Parse.User.logOut();
                    navigate('/');
                    }}>logout</button>
            </div>
        </div>
    )
}

export default Navbar;