import React, { useContext, useEffect, useRef, useState } from 'react'
import styled from 'styled-components';
import DataTable from '../components/DataTable/DataTable';
import PageTitle from '../components/PageTitle/PageTitle';
import { urls } from '../variables/urls';
import Button from '../components/Button/Button';
import FormCard from '../components/FormCard/FormCard'
import FormCardHeader from '../components/FormCard/FormCardHeader'
import FormCardBody from '../components/FormCard/FormCardBody'
import { Navigate } from 'react-router-dom';
import { LoadingCounterContext, UserContext } from '../App';
import EditMaterialModal from './Modals/EditMaterialModal';
import { successMessage } from '../utilities/notifications';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import Input from "../components/Input/Input"

const StyledMaterialsPage = styled.div`
    padding: 2rem 5rem;
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 4rem;
    .form-add-material {
        align-self: center;
    }
`;

export default function MaterialsPage() {

    const [materials, setMaterials] = useState([]);
    const [addMaterialFormDisplay, setAddMaterialsFormDisplay] = useState(false);
    const [editMaterial, setEditMaterial] = useState();
    const [editModalActive, setEditModalActive] = useState(false);
    const user = useContext(UserContext);
    const loadingCounter = useContext(LoadingCounterContext);

    useEffect(() => {
        fetchMaterials();
    }, []);

    async function fetchMaterials() {
        loadingCounter.loadingStart();
        setMaterials(await urls.fetch("GET", urls.base + urls.material.index, undefined, user.token))
        loadingCounter.loadingFinished();
    }

    async function deleteMaterial(id) {
        loadingCounter.loadingStart();
        await urls.fetch("DELETE", urls.base + urls.material.delete + `?id= ${id}`,
            undefined, user.token);
        loadingCounter.loadingFinished();
        successMessage("Material deleted successfully");
        fetchMaterials();
    }
    function displayAddMaterialForm(flag) {
        setAddMaterialsFormDisplay(flag);
    }
    async function addMaterialFormSubmit(e) {
        e.preventDefault();
        const form = e.target;
        loadingCounter.loadingStart();
        await urls.fetch("POST", urls.base + urls.material.store,
            {
                "name": form.name.value,
                "description": form.description.value,
                "isService": form["service"].checked
            },
            user.token);
        loadingCounter.loadingFinished();
        successMessage("Material added successfully");
        displayAddMaterialForm(false)
        fetchMaterials();
    }

    function editMaterialClicked(outlay) {
        setEditModalActive(true);
        setEditMaterial(outlay);
    }

    useEffect(() => {
        if (!editModalActive) {
            setEditMaterial(null);
            fetchMaterials();
        }
    }, [editModalActive]);

    if (!useContext(UserContext).token) {
        return <Navigate replace to="/login" />
    }
    return (
        <>
            {editModalActive && editMaterial && <EditMaterialModal material={editMaterial} setEditModalActive={setEditModalActive} />}

            <StyledMaterialsPage>
                <PageTitle>
                    Materials
                </PageTitle>
                <DataTable headers={["Name", "Description", "Service", "Edit", "Delete"]}>
                    {materials.map((material, ind) => {
                        return (
                            <tr key={ind}>
                                <td>{ind + 1}</td>
                                <td>{material.name}</td>
                                <td>{material.description}</td>
                                <td>
                                    {
                                        material.isService ?
                                            <img src={require("../img/small-check-mark-icon.svg").default} alt="" />
                                            :
                                            <img src={require("../img/cross-icon.svg").default} alt="" />
                                    }
                                </td>
                                <td>
                                    <div className="flex-center">
                                        <Button bgcolor={"primary"} scRadius="5" size="tiny" type="button"
                                            callback={() => { editMaterialClicked(material) }}>
                                            <FontAwesomeIcon icon={solid('pen-to-square')} />
                                        </Button>
                                    </div>
                                </td>
                                <td>
                                    <div className="flex-center">
                                        <Button bgcolor={"danger"} scRadius="5" size="tiny" type="button"
                                            callback={() => { deleteMaterial(material.id) }}>
                                            <FontAwesomeIcon icon={solid('trash')} />
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        )
                    })}
                </DataTable>
                {!addMaterialFormDisplay && <Button bgcolor="primary" scRadius="5" callback={() => { displayAddMaterialForm(true) }}>
                    Add Material
                </Button>}
                {addMaterialFormDisplay && <FormCard className="form-add-material">
                    <FormCardHeader title="Add Material" />
                    <FormCardBody>
                        <form onSubmit={addMaterialFormSubmit}>
                            <Input scType="text" scName="name" scRequired={true} />
                            <Input scType="textarea" scName="description" scRequired={true} />
                            <Input scType="checkbox" scName="service" />
                            <div className="form-group options">
                                <Button bgcolor={"danger"} scRadius="5" type="button"
                                    callback={() => { displayAddMaterialForm(false) }}>
                                    Cancel
                                </Button>
                                <Button bgcolor={"primary"} scRadius="5" type="submit">
                                    Add Material
                                </Button>
                            </div>
                        </form>
                    </FormCardBody>
                </FormCard>}
            </StyledMaterialsPage>
        </>
    )
}
