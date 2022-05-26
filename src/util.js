const loadUsers = async ()=>{
    const response = await fetch('http://localhost:4000/get');
    if(!response.ok){
      return "ERROR!!!";
    }
    const responseData = await response.json();
    return responseData.users;
  };

  const updatedUser = async (updUser)=>{
    const response = await fetch('http://localhost:4000/update',{
        method:'PATCH',
        headers: { "Content-Type": "application/json" }
        ,body: JSON.stringify(updUser)
        });
        const responseData = await response.json();
        return responseData.users;
  };

  const addUser = async (user)=>{
  const response = await fetch('http://localhost:4000/create',{
      method:'POST',
      headers: { "Content-Type": "application/json" }
      ,body: JSON.stringify(user)
      });
      const responseData = await response.json();
      if(responseData.msg !== 'OK'){
        return responseData;
      }
};

const deleteUser = async (user)=>{
    const response = await fetch('http://localhost:4000/delete',{
        method:'DELETE',
        headers: { "Content-Type": "application/json" }
        ,body: JSON.stringify(user)
        });

    const responseData = await response.json();
    return responseData;

  };

  const getToken = async (user)=>{
    const response = await fetch('http://localhost:4000/login',{
        method:'POST',
        headers: { "Content-Type": "application/json" }
        ,body: JSON.stringify(user)
        });
    const responseData = response.json();
    return responseData;
  };

  export {loadUsers, updatedUser, addUser,deleteUser,getToken};