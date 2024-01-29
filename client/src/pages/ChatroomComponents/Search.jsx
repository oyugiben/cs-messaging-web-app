import React, { useState } from "react";

const Search = () => {

    const [username, setUsername] = useState("");
    const [customer, setCustomer] = useState(null);
    const[err, setErr] = useState(null);
    
    return (
        <div>Search</div>
    )
}

export default Search;