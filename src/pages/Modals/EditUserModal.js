import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../App';
import Button from '../../components/Button/Button';
import EditModal from '../../components/EditModal/EditModal'
import { urls } from '../../variables/urls';

export default function EditUserModal({ editedUser, setEditModalActive }) {
    const user = useContext(UserContext);

    function closeModal() {
        setEditModalActive(false);
        document.body.classList.remove("modal-active");
    }

    async function formSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const data = await urls.fetch("POST", urls.base + urls.users.edit,
            {
                "id": parseInt(editedUser.id, 10),
                "name": form.name.value,
            }, user.token);
        closeModal();
    }
    return (
        <EditModal title="Edit User" setEditModalActive={setEditModalActive}>
            <form onSubmit={formSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="name" defaultValue={editedUser.name} required />
                </div>
                <div className="form-group options">
                    <Button bgcolor={"primary"} scRadius="5" type="submit">
                        Change User
                    </Button>
                </div>
            </form>
        </EditModal >
    )
}
