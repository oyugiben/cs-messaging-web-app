import React, { useContext, useState } from "react";
import { AuthContext } from '../../context/AuthContext';
import Parse from '../../ParseInitialize';
import DefaultCustomer from '../img/default_customer.png'

const Search = () => {
    const [username, setUsername] = useState("");
    const [customer, setCustomer] = useState(null);
    const [err, setErr] = useState(false);

    const { currentAgent } = useContext(AuthContext);

    const handleSearch = async () => {
        try {
          const agentId = currentAgent.id;
          const customerUsername = username
            const customer = await Parse.Cloud.run('getCustomerByUsername', { customerUsername, agentId });
            if (!customer) {
                throw new Error('No messages from custromer, '+ username)
            } else {
              setCustomer(customer);
              setErr(false);
            }
        } catch (error) {
            console.log("🚀 ~ handleSearch ~ error:", error)
            setErr(true);
        }
    };

    const handleKey = (e) => {
        e.code === "Enter" && handleSearch();
      };

    const handleSelect = async () => {
          setCustomer(null);
          setUsername('');
    };
    
    return (
        <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Find a customer"
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </div>
      {err && <span>Customer not found!</span>}
      {customer && (
        <div className="userChat" onClick={handleSelect}>
          <img src={DefaultCustomer} alt="" />
          <div className="userChatInfo">
            <span>{customer.get('username')}</span>
          </div>
        </div>
      )}
    </div>
  );
    
}

export default Search;