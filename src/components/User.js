import { Button } from '@mui/material';
import React from 'react';


const User = (props)=> {
  const {user,isAdmin} = props

  return (
        <tr key={user.uname}>
        <td>{user.uname}</td>
        <td>{user.name}</td>
            <td>{user.password}</td>
            <td>{user.phone}</td>
            {isAdmin && <td>
              <Button variant="contained" onClick={()=>{
                props.captureEdit(user);
                props.changeEditState(user);
              }}>Edit</Button>
              </td>}
        </tr>
  )
}
export default User;