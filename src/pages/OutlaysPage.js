import React, { useContext, useEffect, useState } from 'react'
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
import EditOutlayModal from './Modals/EditOutlayModal';
import { successMessage } from '../utilities/notifications';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'

const StyledOutlaysPage = styled.div`
    padding: 2rem 5rem;
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 4rem;
    .form-add-outlay {
        align-self: center;
        .flex-row {
            gap: 5rem;
        }
    }
`;

export default function OutlaysPage() {

    const [materials, setMaterials] = useState([]);
    const [outlayTypes, setOutlayTypes] = useState([]);
    const [outlays, setOutlays] = useState([]);
    const [addOutlayFormDisplay, setAddOutlaysFormDisplay] = useState(false);
    const [editOutlay, setEditOutlay] = useState();
    const [editModalActive, setEditModalActive] = useState(false);
    const user = useContext(UserContext);
    const loadingCounter = useContext(LoadingCounterContext);

    useEffect(() => {
        getOutlays();
        getOutlayTypes();
        getMaterials();
    }, []);
    async function getOutlays() {
        loadingCounter.loadingStart();
        if (user.accoutnType == 0) {
            setOutlays(await urls.fetch("GET", urls.base + urls.outlays.index, undefined, user.token))
        } else {
            setOutlays(await urls.fetch("GET", urls.base + urls.outlays.show + `?userId=${user.id}`,
                undefined, user.token));
        }
        loadingCounter.loadingFinished();
    }
    async function getOutlayTypes() {
        loadingCounter.loadingStart();
        setOutlayTypes(await urls.fetch("GET", urls.base + urls.outlayTypes.index, undefined, user.token))
        loadingCounter.loadingFinished();
    }
    async function getMaterials() {
        loadingCounter.loadingStart();
        setMaterials(await urls.fetch("GET", urls.base + urls.material.index, undefined, user.token))
        loadingCounter.loadingFinished();
    }

    async function deleteOutlay(id) {
        loadingCounter.loadingStart();
        await urls.fetch("DELETE", urls.base + urls.outlays.delete + `?id= ${id}`,
            undefined, user.token);
        loadingCounter.loadingFinished();
        successMessage("Outlay deleted successfully");
        getOutlays();
    }
    function displayAddOutlayForm(flag) {
        setAddOutlaysFormDisplay(flag);
    }
    async function addOutlayFormSubmit(e) {
        e.preventDefault();
        const form = e.target;
        loadingCounter.loadingStart();
        await urls.fetch("POST", urls.base + urls.outlays.store,
            {
                "userId": parseInt(user.id, 10),
                "materialId": parseInt(form.material.value, 10),
                "outlayTypeId": parseInt(form["outlay-type"].value, 10),
                "description": form.description.value,
                "price": parseFloat(form.price.value),
                "date": form.date.value
            },
            user.token);
        loadingCounter.loadingFinished();
        successMessage("Outlay added successfully");
        displayAddOutlayForm(false)
        getOutlays();
    }

    function editOutlayClicked(outlay) {
        setEditModalActive(true);
        setEditOutlay(outlay);
    }

    useEffect(() => {
        if (!editModalActive) {
            setEditOutlay(null);
            getOutlays();
        }
    }, [editModalActive]);

    if (!useContext(UserContext).token) {
        return <Navigate replace to="/login" />
    }
    return (
        <>
            {editModalActive && editOutlay && <EditOutlayModal outlay={editOutlay} setEditModalActive={setEditModalActive} />}
            <StyledOutlaysPage>
                <PageTitle>
                    Outlays
                </PageTitle>
                <DataTable headers={["User", "Type", "Material", "Description", "Price", "Date", "Edit", "Delete"]}>
                    {outlays.map((outlay, ind) => {
                        return (
                            <tr key={ind}>
                                <td>{ind + 1}</td>
                                <td>{outlay.user.name}</td>
                                <td>{outlay.outlayTypeDto.name}</td>
                                <td>{outlay.material.name}</td>
                                <td>{outlay.description}</td>
                                <td>{outlay.price}$</td>
                                <td>{new Date(outlay.date).toLocaleDateString()}</td>
                                <td>
                                    <div className="flex-center">
                                        <Button bgcolor={"primary"} scRadius="5" size="tiny" type="button"
                                            callback={() => { editOutlayClicked(outlay) }}>
                                            <FontAwesomeIcon icon={solid('pen-to-square')} />
                                        </Button>
                                    </div>
                                </td>
                                <td>
                                    <div className="flex-center">
                                        <Button bgcolor={"danger"} scRadius="5" size="tiny" type="button"
                                            callback={() => { deleteOutlay(outlay.id) }}>
                                            <FontAwesomeIcon icon={solid('trash')} />
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        )
                    })}
                </DataTable>
                {!addOutlayFormDisplay && <Button bgcolor="primary" scRadius="5" callback={() => { displayAddOutlayForm(true) }}>
                    Add Outlay
                </Button>}
                {addOutlayFormDisplay && <FormCard className="form-add-outlay">
                    <FormCardHeader title="Add Outlay" />
                    <FormCardBody>
                        <form onSubmit={addOutlayFormSubmit}>
                            <div className="form-group">
                                <label htmlFor="material">Material</label>
                                <select name="material" id="material" required>
                                    {materials.map((material) =>
                                        <option key={material.name} value={material.id}>{material.name}</option>
                                    )}
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="outlay-type">Outlay Type</label>
                                <select name="outlay-type" id="outlay-type" required>
                                    {outlayTypes.map((outlayType) =>
                                        <option key={outlayType.name} value={outlayType.id}>{outlayType.name}</option>
                                    )}
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <textarea name="description" id="description" cols="30" rows="5" required></textarea>
                            </div>
                            <div className="flex-row">
                                <div className="form-group">
                                    <label htmlFor="date">Date</label>
                                    <input type="date" id="date" name="date"
                                        defaultValue={new Date().toLocaleDateString("en-CA")}
                                        required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="price">Price</label>
                                    <input type="number" id="price" name="price" defaultValue="0" min="0"
                                        autoComplete='off' step="any"/>
                                </div>
                            </div>

                            <div className="form-group options">
                                <Button bgcolor={"danger"} scRadius="5" type="button"
                                    callback={() => { displayAddOutlayForm(false) }}>
                                    Cancel
                                </Button>
                                <Button bgcolor={"primary"} scRadius="5" type="submit">
                                    Add Outlay
                                </Button>
                            </div>
                        </form>
                    </FormCardBody>
                </FormCard>}
            </StyledOutlaysPage>
        </>
    )
}
