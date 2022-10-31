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
import EditOutlayTypeModal from './Modals/EditOutlayTypeModal';
import { successMessage } from '../utilities/notifications';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import Input from '../components/Input/Input';

const StyledOutlayTypesPage = styled.div`
    padding: 2rem 5rem;
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 4rem;
    .form-add-outlay-type {
        align-self: center;
    }
`;

export default function OutlayTypesPage() {

    const [outlayTypes, setOutlayTypes] = useState([]);
    const [addOutlayTypeFormDisplay, setAddOutlayTypesFormDisplay] = useState(false);
    const [editOutlayType, setEditOutlayType] = useState();
    const [editModalActive, setEditModalActive] = useState(false);
    const user = useContext(UserContext);
    const loadingCounter = useContext(LoadingCounterContext);

    useEffect(() => {
        fetchOutlayTypes();
    }, []);

    async function fetchOutlayTypes() {
        loadingCounter.loadingStart();
        setOutlayTypes(await urls.fetch("GET", urls.base + urls.outlayTypes.index, undefined, user.token))
        loadingCounter.loadingFinished();
    }

    async function deleteOutlayType(id) {
        loadingCounter.loadingStart();
        await urls.fetch("DELETE", urls.base + urls.outlayTypes.delete + `?id= ${id}`,
            undefined, user.token);
        loadingCounter.loadingFinished();
        successMessage("Outlay Type deleted successfully");
        fetchOutlayTypes();
    }
    function displayAddOutlayTypeForm(flag) {
        setAddOutlayTypesFormDisplay(flag);
    }
    async function addOutlayTypeFormSubmit(e) {
        e.preventDefault();
        const form = e.target;
        loadingCounter.loadingStart();
        await urls.fetch("POST", urls.base + urls.outlayTypes.store,
            {
                "name": form.name.value,
                "description": form.description.value
            },
            user.token);
        loadingCounter.loadingFinished();
        successMessage("Outlay Type added successfully");
        displayAddOutlayTypeForm(false)
        fetchOutlayTypes();
    }

    function editOutlayTypeClicked(outlay) {
        setEditModalActive(true);
        setEditOutlayType(outlay);
    }

    useEffect(() => {
        if (!editModalActive) {
            setEditOutlayType(null);
            fetchOutlayTypes();
        }
    }, [editModalActive]);

    if (!useContext(UserContext).token) {
        return <Navigate replace to="/login" />
    }
    return (
        <>
            {editModalActive && editOutlayType && <EditOutlayTypeModal outlayType={editOutlayType} setEditModalActive={setEditModalActive} />}

            <StyledOutlayTypesPage>
                <PageTitle>
                    Outlay Types
                </PageTitle>
                <DataTable headers={["Name", "Description", "Edit", "Delete"]}>
                    {outlayTypes.map((outlayType, ind) => {
                        return (
                            <tr key={ind}>
                                <td>{ind + 1}</td>
                                <td>{outlayType.name}</td>
                                <td>{outlayType.description}</td>
                                <td>
                                    <div className="flex-center">
                                        <Button bgcolor={"primary"} scRadius="5" size="tiny" type="button"
                                            callback={() => { editOutlayTypeClicked(outlayType) }}>
                                            <FontAwesomeIcon icon={solid('pen-to-square')} />
                                        </Button>
                                    </div>
                                </td>
                                <td>
                                    <div className="flex-center">
                                        <Button bgcolor={"danger"} scRadius="5" size="tiny" type="button"
                                            callback={() => { deleteOutlayType(outlayType.id) }}>
                                            <FontAwesomeIcon icon={solid('trash')} />
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        )
                    })}
                </DataTable>
                {!addOutlayTypeFormDisplay && <Button bgcolor="primary" scRadius="5" callback={() => { displayAddOutlayTypeForm(true) }}>
                    Add Outlay Type
                </Button>}
                {addOutlayTypeFormDisplay && <FormCard className="form-add-outlay-type">
                    <FormCardHeader title="Add OutlayType" />
                    <FormCardBody>
                        <form onSubmit={addOutlayTypeFormSubmit}>
                            <Input scType="text" scName="name" scRequired={true} />
                            <Input scType="textarea" scName="description" scRequired={true} />
                            <div className="form-group options">
                                <Button bgcolor={"danger"} scRadius="5" type="button"
                                    callback={() => { displayAddOutlayTypeForm(false) }}>
                                    Cancel
                                </Button>
                                <Button bgcolor={"primary"} scRadius="5" type="submit">
                                    Add OutlayType
                                </Button>
                            </div>
                        </form>
                    </FormCardBody>
                </FormCard>}
            </StyledOutlayTypesPage>
        </>
    )
}
