import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../App';
import Button from '../../components/Button/Button';
import EditModal from '../../components/EditModal/EditModal'
import { urls } from '../../variables/urls';

export default function EditOutlayModal({ outlay, setEditModalActive }) {
  const [materials, setMaterials] = useState([]);
  const [outlayTypes, setOutlayTypes] = useState([]);
  const user = useContext(UserContext);
  useEffect(() => {
    getOutlayTypes();
    getMaterials();
  }, []);
  async function getOutlayTypes() {
    setOutlayTypes(await urls.fetch("GET", urls.base + urls.outlayTypes.index, undefined, user.token))
  }
  async function getMaterials() {
    setMaterials(await urls.fetch("GET", urls.base + urls.material.index, undefined, user.token))
  }

  function closeModal() {
    setEditModalActive(false);
    document.body.classList.remove("modal-active");
  }

  async function formSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const data = await urls.fetch("POST", urls.base + urls.outlays.edit,
      {
        "id": parseInt(outlay.id, 10),
        "materialId": parseInt(form.material.value, 10),
        "outlayTypeId": parseInt(form["outlay-type"].value, 10),
        "userId": parseInt(user.id, 10),
        "description": form.description.value,
        "price": parseFloat(form.price.value),
        "date": form.date.value
      }, user.token);
    closeModal();
  }
  return (
    <EditModal title="Edit Outlay" setEditModalActive={setEditModalActive}>
      <form onSubmit={formSubmit}>
        <div className="form-group">
          <label htmlFor="material">Material</label>
          <select name="material" id="material" required>
            {materials.map((material) =>
              <option key={material.name} value={material.id}
                selected={outlay.materialId == material.id}>
                {material.name}
              </option>
            )}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="outlay-type">Outlay Type</label>
          <select name="outlay-type" id="outlay-type" required>
            {outlayTypes.map((outlayType) =>
              <option key={outlayType.name} value={outlayType.id}
                selected={outlay.outlayTypeId == outlayType.id}
              >{outlayType.name}</option>
            )}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea name="description" id="description" cols="30" rows="5"
            defaultValue={outlay.description}
            required></textarea>
        </div>
        <div className="flex-row gap-5">
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input type="number" id="price" name="price" defaultValue={outlay.price} min="0"
              autoComplete='off' />
          </div>
          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input type="date" id="date" name="date" defaultValue={
              (new Date(outlay.date)).toLocaleDateString('en-CA')
            }
              required />
          </div>
        </div>

        <div className="form-group options">
          <Button bgcolor={"primary"} scRadius="5" type="submit">
            Change Outlay
          </Button>
        </div>
      </form>
    </EditModal >
  )
}
