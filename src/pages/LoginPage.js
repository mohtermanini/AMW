import React, { useContext, useRef } from 'react'
import styled from 'styled-components';
import FormCard from '../components/FormCard/FormCard'
import FormCardHeader from '../components/FormCard/FormCardHeader'
import FormCardBody from '../components/FormCard/FormCardBody'
import Button from '../components/Button/Button';
import { urls } from '../variables/urls';
import { useNavigate } from 'react-router-dom';
import Input from '../components/Input/Input';
import { LoadingCounterContext } from '../App';

const StyledLoginPage = styled.div`
    margin-top: 5rem;
    display: flex;
    flex-direction:column;
    align-items: center;
`;

export default function LoginPage({ setUser }) {
    const navigate = useNavigate();
    const loadingCounter = useContext(LoadingCounterContext);
    async function formSubmit(e) {
        try {
            e.preventDefault();
            const form = e.target;
            loadingCounter.loadingStart();
            const data = await urls.fetch("POST", urls.base + urls.users.login, {
                "name": form.username.value,
                "password": form.password.value
            })
            loadingCounter.loadingFinished();
            const isAdmin = !data.accoutnType;
            setUser(data);
            if (isAdmin) {
                navigate("/reports");
            } else {
                navigate("/outlays");
            }
        }
        catch (error) {

        }
    }
    return (
        <StyledLoginPage>
            <FormCard>
                <FormCardHeader title="Login" />
                <FormCardBody>
                    <form action="" onSubmit={formSubmit}>
                        <Input scType="text" scName="username" scRequired={true} defaultValue="admin" />
                        <Input scType="password" scName="password" scRequired={true} defaultValue="admin" />
                        <div className="form-group options">
                            <Button bgcolor={"primary"} scRadius="5" type="submit">
                                Login
                            </Button>
                        </div>
                    </form>
                </FormCardBody>
            </FormCard>
        </StyledLoginPage>
    )
}
