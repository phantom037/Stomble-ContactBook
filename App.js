import React, { useState, Fragment } from "react";
import "./app.css";
import data from "./data.json";
import ReadOnlyRow from "./ReadOnlyRow";
import EditableRow from "./EditableRow";

export default function App() {

  const [contacts, setContacts] = useState(data);

  const [addFormData, setAddFormData] = useState({
    fullName: "",
    phoneNumber: ""
  });

  const [editFormData, setEditFormData] = useState({
    fullName: "",
    phoneNumber: ""
  });

  const [editContactId, setEditContactId] = useState(null);

  /*
    handleAddFormChange: Keep track every detail enter by user
    when create a new contact
  */
  const handleAddFormChange = (event) =>{
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = {...addFormData};
    newFormData[fieldName] = fieldValue;
    setAddFormData(newFormData);
  };

  /*
    handleAddFormSubmit: Add the new contact detail
  */
  const handleAddFormSubmit = (event) =>{
    event.preventDefault();
    const newContact = {
      id: require("uuid").v4(),
      fullName: addFormData.fullName,
      phoneNumber: addFormData.phoneNumber,
    };

    const newContacts = [...contacts, newContact];
    setContacts(newContacts);
  };

  /*
    handleEditClick: Allow user to edit data of exiting contact 
  */
  const handleEditClick = (event, contact)=> {
    event.preventDefault();
    setEditContactId(contact.id);
    const formValue = {
      fullName : contact.fullName,
      phoneNumber: contact.phoneNumber
    }
    setEditFormData(formValue);
  };

  /*
    handleEditFormChange: Keep track every detail enter by user
    when edit an exiting contact
  */
  const handleEditFormChange = (event) =>{
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = {...editFormData};
    newFormData[fieldName] = fieldValue;
    setEditFormData(newFormData);
  };

  /*
    handleEditFormSubmit: Update an exiting contact detail  
  */
  const handleEditFormSubmit = (event) => {
    event.preventDefault();
    const editedContact = {
      id: editContactId,
      fullName: editFormData.fullName,
      phoneNumber: editFormData.phoneNumber
    };

    const newContacts = [...contacts];
    const index = contacts.findIndex((contact)=> contact.id === editContactId);
    newContacts[index] = editedContact;
    setContacts(newContacts);
    setEditContactId(null);
  };

  /*
    handleCancelClick: Exit the edit mode  
  */
  const handleCancelClick = () =>{
    setEditContactId(null);
  }

  /*
    handleDeleteClick: Delete exiting user
  */
  const handleDeleteClick = (contactId) => {
    const newContacts = [...contacts];
    const index = contacts.findIndex((contact)=> contact.id === contactId);

    newContacts.splice(index, 1);
    setContacts(newContacts);
  };

  return (
    <div className="app-container">
    <form onSubmit={handleEditFormSubmit}>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Phone Number</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {contacts.map((contact) => (
            <Fragment>
              {editContactId === contact.id ? 
              <EditableRow editFormData={editFormData} 
              handleEditFormChange={handleEditFormChange} 
              handleCancelClick={handleCancelClick}/> 
              : <ReadOnlyRow contact={contact} 
              handleEditClick={handleEditClick}
              handleDeleteClick={handleDeleteClick}/>}
            </Fragment>
        ))}
      </tbody>
    </table>
    </form>

    <h2>Add New Contact</h2>
    <form onSubmit={handleAddFormSubmit}>
      <input
        type="text"
        name="fullName"
        required="required"
        placeholder="Enter contact name"
        onChange={handleAddFormChange}
      />
      <input
        type="text"
        name="phoneNumber"
        required="required"
        placeholder="Enter contact number"
        onChange={handleAddFormChange}
      />
      <button type="submit">Add</button>
    </form>

    <h2>Search Contact</h2>
    <form>
      <input
        type="text"
        name="fullName"
        required="required"
        placeholder="Search by name"
      />
      <button type="submit">Search</button>
    </form>
  </div>
  );
}

