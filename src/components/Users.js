import React, { useState } from "react";
import AddUser from "./AddUser";
import EditUser from "./EditUser";
import User from "./User";
import { deleteUser, addUser, loadUsers,updatedUser } from "../util";
import {useNavigate} from 'react-router-dom';
import { Button } from "@mui/material";
const Users = (props) => {
	const { setUsers } = props;
    let navigate = useNavigate();
	// state for conditional render of edit form
	const [isEditing, setIsEditing] = useState(false);
    const [error,setError] = useState();
	// state for edit form inputs
	const [editForm, setEditForm] = useState({
		uname: "",
		password: "",
		name: "",
		phone: "",
		isAdmin: false,
	});
	const [addForm, setAddForm] = useState({
		uname: "",
		password: "",
		name: "",
		phone: "",
		isAdmin: false,
	});

	// auto-hides the form, pushes changes to display
	const handleUserUpdate = async (updUser) => {
		setIsEditing(false);

            await updatedUser(updUser); 
            const response = loadUsers();
            if(response === 'ERROR!!!'){
              console.log('ERROR1')
            }
            response.then(data=>setUsers(data));
            
        };
	
    const logoutHandler = () => {
            localStorage.clear();
            //props.setisLoggedIn({user:{}, state: false})
            navigate('/');
    };
	// capture user input in edit form inputs
	const handleChange = (e) => {
		setEditForm({
			...editForm,
			[e.target.name]: e.target.value,
		});
	}

	// needed logic for conditional rendering of the form - shows the user you want when you want them, and hides it when you don't
	const changeEditState = (user) => {
		if (user.uname === editForm.uname) {
			setIsEditing((isEditing) => !isEditing); // hides the form
		} else if (isEditing === false) {
			setIsEditing((isEditing) => !isEditing); // shows the form
		}
	}

	// capture the user you wish to edit, set to state
	const captureEdit = (clickedUser) => {
		let filtered = props.users.filter(
			(user) => user.uname === clickedUser.uname,
		);
		setEditForm(filtered[0]);
	}

	const addHandleChange = (e) => {
		setAddForm({
			...addForm,
			[e.target.name]: e.target.value,
		});
        setError();
	};

	const onDelete = async (user) => {
		await deleteUser(user);
		const response = loadUsers();
		if (response === "ERROR!!!") {
			console.log("ERROR1");
		}
		response.then((data) => setUsers(data));
	};
    
	const onAddUser = (user) => {
		addUser(user).then(response=>{
            console.log(response)
            if(response){
                setError(response.msg);
            }})
		const response = loadUsers();
		if (response === "ERROR!!!") {
			console.log("ERROR1");
		}
		response.then((data) => setUsers(data));
	};
    
	return (
		<div>
			<h1>Welcome {props.user.uname}</h1>
			<table>
				<thead>
					<tr>
						<th>Username</th>
						<th>Name</th>
						<th>Password</th>
						<th>Phone</th>
						{props.user.isAdmin && <th>Edit</th>}
					</tr>
				</thead>
				<tbody>
					{props.users.map((user) => (
						<User
							key={user.uname}
							user={user}
							captureEdit={captureEdit}
							changeEditState={changeEditState}
							isAdmin={props.user.isAdmin}
						/>
					))}
				</tbody>
			</table>
			{isEditing ? (
				<EditUser
					editForm={editForm}
					handleChange={handleChange}
					handleUserUpdate={handleUserUpdate}
					onDelete={onDelete}
				/>
			) : null}
			{error&&<p>{error}</p>}
            {props.user.isAdmin && (
				<AddUser
					addForm={addForm}
					handleChange={addHandleChange}
					onAddUser={onAddUser}
				/>
			)}
            
            <Button variant='contained' onClick={logoutHandler}>Logout</Button>
		</div>
	);
};

export default Users;
