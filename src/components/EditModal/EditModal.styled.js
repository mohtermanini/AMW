import styled from "styled-components";

export const StyledEditModal = styled.div`
    position: fixed;
    width:100%;
    height: 100%;
    top:0;
    left: 0;
    background-color: rgba(0,0,0,0.7);
    z-index: 1000;
    .modal {
        position: absolute;
        left:50%;
        top: 50%;
        transform: translate(-50%, -50%);
        max-height: 80vh;
        display: flex;
        flex-direction: column;
    }
    .modal-body {
        overflow: auto;
    }
`;