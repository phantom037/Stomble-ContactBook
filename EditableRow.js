import React from "react";

const EditableRow = ({editFormData, handleEditFormChange, handleCancelClick}) =>{
    return(
        <tr>
            <td>
                <input
                 type="text"
                 required="required"
                 placeholder="Enter New Name"
                 name="fullName"
                 value={editFormData.fullName}
                 onChange={handleEditFormChange}
                 />
            </td>
            <td>
                <input
                 type="text"
                 required="required"
                 placeholder="Enter New Number"
                 name="phoneNumber"
                 value={editFormData.phoneNumber}
                 onChange={handleEditFormChange}
                 />
            </td>
            <td>
                <button type="submit">Save</button>
                <button type="button" onClick={handleCancelClick}>Cancel</button>
            </td>
        </tr>
    );
};

export default EditableRow;