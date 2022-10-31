import React, { useContext} from 'react'
import { UserContext } from '../../App';
import Button from '../../components/Button/Button';
import EditModal from '../../components/EditModal/EditModal'
import { urls } from '../../variables/urls';

export default function EditOutlayTypeModal({ outlayType, setEditModalActive }) {
    const user = useContext(UserContext);

    function closeModal() {
        setEditModalActive(false);
        document.body.classList.remove("modal-active");
    }

    async function formSubmit(e) {
        e.preventDefault();
        const form = e.target;
        await urls.fetch("POST", urls.base + urls.outlayTypes.edit,
            {
                "id": parseInt(outlayType.id, 10),
                "name": form.name.value,
                "description": form.description.value,
            }, user.token);
        closeModal();
    }
    return (
        <EditModal title="Edit Outlay Type" setEditModalActive={setEditModalActive}>
            <form onSubmit={formSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="name" defaultValue={outlayType.name} required />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea name="description" id="description" cols="30" rows="5"
                        defaultValue={outlayType.description}
                        required></textarea>
                </div>
                <div className="form-group options">
                    <Button bgcolor={"primary"} scRadius="5" type="submit">
                        Change Outlay Type
                    </Button>
                </div>
            </form>
        </EditModal >
    )
}
