import React from 'react'
import Checkbox from './Checkbox';
import { StyledInput } from './Input.styled'
import PasswordInput from './PasswordInput';
import TextArea from './TextArea';
import TextInput from './TextInput';

export default function Input({ scType, scName, scRequired, defaultValue }) {
    let body = null;
    const inputProperties = {
        scLabel: getDisplayedName(),
        scName: scName,
        defaultValue: defaultValue,
        scRequired: scRequired,
    }

    function getDisplayedName() {
        const words = scName.split("-");
        for (let i = 0; i < words.length; i++) {
            words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
        }
        return words.join(" ");
    }

    if (scType === "text") {
        body = <TextInput {...inputProperties}/>
    }
    else if (scType === "checkbox") {
        body = <Checkbox {...inputProperties}/>
    }
    else if (scType === "password") {
        body = <PasswordInput {...inputProperties}/>
    }
    else if (scType === "textarea") {
        body = <TextArea {...inputProperties}   />
    }
    return (
        <StyledInput>
            {body}
        </StyledInput>
    )
}
