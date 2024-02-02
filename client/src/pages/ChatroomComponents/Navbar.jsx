import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Parse from '../../ParseInitialize';
import { AuthContext } from '../../context/AuthContext';
import DefaultAgent from '../img/default_agent.png'
import DefaultCustomer from '../img/default_customer.png'

const Navbar = () => {
    const navigate = useNavigate();
    const { currentAgent, updateCurrentAgent } = useContext(AuthContext);
    console.log("🚀 ~ Navbar ~ currentAgent:", currentAgent)
    
    return (
        <div className='navbar'>
            <span className='logo'>Branch</span>
            <div className='agent'>
                <img src={DefaultAgent} alt=''/>
                <span>{currentAgent.get('username')}</span>
                <button onClick={() => {
                    Parse.User.logOut();
                    updateCurrentAgent();
                    navigate('/');
                    }}>logout</button>
            </div>
        </div>
    )
}

export default Navbar;