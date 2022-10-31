import React, { useContext} from 'react'
import { UserContext } from '../../App';
import Button from '../../components/Button/Button';
import EditModal from '../../components/EditModal/EditModal'
import { urls } from '../../variables/urls';

export default function EditMaterialModal({ material, setEditModalActive }) {
    const user = useContext(UserContext);

    function closeModal() {
        setEditModalActive(false);
        document.body.classList.remove("modal-active");
    }

    async function formSubmit(e) {
        e.preventDefault();
        const form = e.target;
         await urls.fetch("POST", urls.base + urls.material.edit,
            {
                "id": parseInt(material.id, 10),
                "name": form.name.value,
                "description": form.description.value,
                "isService": form["is-service"].checked
            }, user.token);
        closeModal();
    }
    return (
        <EditModal title="Edit Material" setEditModalActive={setEditModalActive}>
            <form onSubmit={formSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="name" defaultValue={material.name} required />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea name="description" id="description" cols="30" rows="5"
                        defaultValue={material.description}
                        required></textarea>
                </div>
                <div className="form-group">
                    <div className="flex-row gap-1">
                        <input type="checkbox" id="is-service" name="is-service"
                         defaultChecked={material.isService}/>
                        <label htmlFor="is-service">Service</label>
                    </div>
                </div>

                <div className="form-group options">
                    <Button bgcolor={"primary"} scRadius="5" type="submit">
                        Change Material
                    </Button>
                </div>
            </form>
        </EditModal >
    )
}
