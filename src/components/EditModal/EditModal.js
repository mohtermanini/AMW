import React, { useEffect } from 'react'
import FormCard from '../FormCard/FormCard'
import FormCardBody from '../FormCard/FormCardBody'
import ClosableFormCardHeader from '../FormCard/ClosableFormCardHeader'
import { StyledEditModal } from './EditModal.styled'

export default function EditModal({ title, setEditModalActive, children }) {
    useEffect(() => {
        document.body.classList.add("modal-active");
    }, []);
    // function bgClicked(e) {if (!e.target.closest(".modal")) {closeModal();}}
    function closeButtonClicked() {
        closeModal();
    }
    function closeModal() {
        setEditModalActive(false);
        document.body.classList.remove("modal-active");
    }
    return (
        <StyledEditModal>
            <FormCard className={"modal"}>
                <ClosableFormCardHeader title={title} closeButtonCallback={closeButtonClicked} />
                <FormCardBody className="modal-body">
                    {children}
                </FormCardBody>
            </FormCard>
        </StyledEditModal>
    )
}
