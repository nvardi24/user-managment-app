import React from 'react'
import { Button,TextField } from '@mui/material';
function EditUser(props) {
    let {uname, name, password, phone} = props.editForm;
    
    function handleEditForm(e) {
        e.preventDefault();
        props.handleUserUpdate(props.editForm);   
    }

    return (
        <div>
            <h4>Edit User</h4>
            <form onSubmit={handleEditForm}>
                <label>Username: {uname} </label>
                <TextField label="Name" name='name' value={name} variant="filled" onChange={props.handleChange}/>
            <TextField label="Password" name='password' value={password} variant="filled" onChange={props.handleChange}/>
            <TextField label="Phone" name='phone' variant="filled" value={phone} onChange={props.handleChange}/>
           
                <Button variant="contained" type="submit">Submit Changes</Button>
                <Button variant="contained" onClick={()=>{
                    props.onDelete(props.editForm);
                  }}>Delete</Button>
            </form>
        </div>
    )
}
export default EditUser;