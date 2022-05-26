import React from 'react'
import { Button, TextField } from '@mui/material';
function AddUser(props) {
    
    
    function handleAddForm(e) {
        e.preventDefault();
        props.onAddUser(props.addForm);   
    }

    return (
        <div>
            <h4>Add User</h4>
            <form onSubmit={handleAddForm}>
            <TextField label="Username" name='uname' variant="filled" onChange={props.handleChange}/>
            <TextField label="Name" name='name' variant="filled" onChange={props.handleChange}/>
            <TextField label="Password" name='password' variant="filled" onChange={props.handleChange}/>
            <TextField label="Phone" name='phone' variant="filled" onChange={props.handleChange}/>
            <Button variant="contained" type="submit">Add User</Button>
            </form>
        </div>
    )
}
export default AddUser;