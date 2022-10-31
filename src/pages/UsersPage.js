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
import EditUserModal from './Modals/EditUserModal';
import { successMessage } from '../utilities/notifications';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import Input from '../components/Input/Input';

const StyledUsersPage = styled.div`
    padding: 2rem 5rem;
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 4rem;
    .form-add-user-type {
        align-self: center;
    }
`;

export default function UsersPage() {

    const [users, setUsers] = useState([]);
    const [addUserFormDisplay, setAddUsersFormDisplay] = useState(false);
    const [editUser, setEditUser] = useState();
    const [editModalActive, setEditModalActive] = useState(false);
    const user = useContext(UserContext);
    const loadingCounter = useContext(LoadingCounterContext);

    useEffect(() => {
        fetchUsers();
    }, []);

    async function fetchUsers() {
        loadingCounter.loadingStart();
        setUsers(await urls.fetch("GET", urls.base + urls.users.index, undefined, user.token))
        loadingCounter.loadingFinished();
    }

    async function deleteUser(id) {
        loadingCounter.loadingStart();
        await urls.fetch("DELETE", urls.base + urls.users.delete + `?id= ${id}`,
            undefined, user.token);
        loadingCounter.loadingFinished();
        successMessage("User deleted successfully");
        fetchUsers();
    }
    function displayAddUserForm(flag) {
        setAddUsersFormDisplay(flag);
    }
    async function addUserFormSubmit(e) {
        e.preventDefault();
        const form = e.target;
        loadingCounter.loadingStart();
        await urls.fetch("POST", urls.base + urls.users.store,
            {   
                "name": form.name.value,
                "password": form.password.value,
                "accoutnType": 1
            },
            user.token);
        loadingCounter.loadingFinished();
        successMessage("User added successfully");
        displayAddUserForm(false)
        fetchUsers();
    }

    function editUserClicked(editedUser) {
        setEditModalActive(true);
        setEditUser(editedUser);
    }

    useEffect(() => {
        if (!editModalActive) {
            setEditUser(null);
            fetchUsers();
        }
    }, [editModalActive]);

    if (!useContext(UserContext).token) {
        return <Navigate replace to="/login" />
    }
    return (
        <>
            {editModalActive && editUser && <EditUserModal editedUser={editUser} setEditModalActive={setEditModalActive} />}

            <StyledUsersPage>
                <PageTitle>
                    Outlay Types
                </PageTitle>
                <DataTable headers={["Name", "Edit", "Delete"]}>
                    {users.map((user, ind) => {
                        return (
                            <tr key={ind}>
                                <td>{ind + 1}</td>
                                <td>{user.name}</td>
                                <td>
                                    <div className="flex-center">
                                        <Button bgcolor={"primary"} scRadius="5" size="tiny" type="button"
                                            callback={() => { editUserClicked(user) }}>
                                            <FontAwesomeIcon icon={solid('pen-to-square')} />
                                        </Button>
                                    </div>
                                </td>
                                <td>
                                    <div className="flex-center">
                                        <Button bgcolor={"danger"} scRadius="5" size="tiny" type="button"
                                            callback={() => { deleteUser(user.id) }}>
                                            <FontAwesomeIcon icon={solid('trash')} />
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        )
                    })}
                </DataTable>
                {!addUserFormDisplay && <Button bgcolor="primary" scRadius="5" callback={() => { displayAddUserForm(true) }}>
                    Add User
                </Button>}
                {addUserFormDisplay && <FormCard className="form-add-user-type">
                    <FormCardHeader title="Add User" />
                    <FormCardBody>
                        <form onSubmit={addUserFormSubmit}>
                            <Input scType="text" scName="name" scRequired={true} />
                            <Input scType="password" scName="password" scRequired={true} />
                            <div className="form-group options">
                                <Button bgcolor={"danger"} scRadius="5" type="button"
                                    callback={() => { displayAddUserForm(false) }}>
                                    Cancel
                                </Button>
                                <Button bgcolor={"primary"} scRadius="5" type="submit">
                                    Add User
                                </Button>
                            </div>
                        </form>
                    </FormCardBody>
                </FormCard>}
            </StyledUsersPage>
        </>
    )
}
