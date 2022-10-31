import React, { useRef, useState } from 'react'
import styled from 'styled-components';
import Button from '../Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'

const StyledPasswordInput = styled.div`
display: flex;
flex-direction: column;
gap: 2rem;
.form-control {
    position: relative;
    input {
        width: 100%;
        border-radius: 0 1rem  1rem 0;
    }
    .btn-eye {
        position: absolute;
        right:0;
        display: inline-block;
        border-radius: 0 1rem  1rem 0;
        height: 100%;
        color: #000;
    }
}
`;

export default function PasswordInput({ scLabel, scName, scRequired, defaultValue }) {
    const [showPassword, setShowPassword] = useState(false);
    const passwordRef = useRef();

    function eyeButtonClicked() {
        let toggledType = "password";
        if (passwordRef.current.getAttribute("type") === "password") {
            toggledType = "text";
        }
        setShowPassword(!showPassword);
        passwordRef.current.setAttribute("type", toggledType);
    }

    return (
        <StyledPasswordInput>
            <label htmlFor={scName}>{scLabel}</label>
            <div className="form-control">
                <input type="password" name={scName} id={scName} required ={scRequired} ref={passwordRef} 
                    defaultValue={defaultValue}/>
                <Button bgcolor="light-grey" size="tiny" className="btn-eye" callback={eyeButtonClicked}
                    type="button">
                    {!showPassword ?
                        <FontAwesomeIcon icon={solid("eye")} />
                        :
                        <FontAwesomeIcon icon={solid("eye-slash")} />
                    }
                </Button>
            </div>
        </StyledPasswordInput>
    )
}
