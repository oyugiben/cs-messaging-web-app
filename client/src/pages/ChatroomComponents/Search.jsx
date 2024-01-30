import React, { useContext, useState } from "react";
import { AuthContext } from '../../context/AuthContext';
import Parse from '../../ParseInitialize';

const Search = () => {
    const [username, setUsername] = useState("");
    const [customer, setCustomer] = useState(null);
    const [err, setErr] = useState(false);

    const { currentAgent } = useContext(AuthContext);

    const handleSearch = async () => {
        try {
            const customer = await Parse.Cloud.run('gerCustomerByUsername', { username });
            if (!customer) {
                throw new Error('No messages from custromer, '+ username)
            } else setCustomer(customer)
        } catch (error) {
            setErr(true);
        }
    };

    const handleKey = (e) => {
        e.code === "Enter" && handleSearch();
      };

    const handleSelect = async () => {
        const chatRoomId = currentAgent.get('chatrooms').map((chatroom) => {
            const customerId = chatroom.get('customer').chatRoomId
            return customerId
        });
        console.log("🚀 ~ chatRoomId ~ chatRoomId:", chatRoomId)

        try {
            const chatRoom = await Parse.Cloud.run('getChatRoom', customer);
            console.log("🚀 ~ handleSelect ~ chatRoom:", chatRoom)

        } catch (err) {
            setCustomer(null);
            setUsername('');
        }
    }
    
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
          <img src={customer.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{customer.get('username')}</span>
          </div>
        </div>
      )}
    </div>
  );
    
}

export default Search;