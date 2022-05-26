import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Users from "./components/Users";
import{loadUsers} from "./util";


function App() {
  const [isLoggedIn , setIsLoggedIn] = useState({
    state: false,
    user: {}
  });
  const [users, setUsers] = useState([]);

  useEffect(()=>{
    const response = loadUsers();
    if(response === 'ERROR!!!'){
      alert('ERROR')
    }
    response.then(data=>setUsers(data))

    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setIsLoggedIn({user:foundUser.user, state: true});
    }
  },[])

 
  return <div>
  <Routes>
  <Route  path='/' element={<Login setIsLoggedIn ={setIsLoggedIn} database={users}/>} />
  <Route  path='users' element={<Users setUsers = {setUsers} setIsLoggedIn ={setIsLoggedIn} user={isLoggedIn.user} users={users} />} />
  
  
  </Routes>
  
  </div>
}

export default App;
