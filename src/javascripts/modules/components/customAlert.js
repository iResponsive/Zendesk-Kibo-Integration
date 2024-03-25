import React, { useState } from "react";
import styled from "styled-components";
import CustomIconButton from "./customIconButton";
import CloseIcon from "./icons/close";

const AlertWrapper = styled.div`
    z-index: 10;
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;
    background-color: rgba(23, 24, 26, 0.661);
    overflow: auto;
`;

const AlertBody = styled.div`
    padding: 10px;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 0 10px 0 lightgrey;
    min-width: 50%;
    max-width: 90%;
    max-height: 90%;
    overflow: auto;
`;

const AlertContent = styled.div`
    padding: 10px;
`;

const AlertHeader = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    position: sticky;
    bottom: 0;
`;

const CustomAlert = ({ trigger= null, content, alertTitle, onOpen, onClose }) => {

    const [showAlert, setShowAlert] = useState(false);
    
    const handleOpen = () => {
        setShowAlert(true);
        if (onOpen) {
            onOpen()
        }
    }

    const handleClose = () => {
        setShowAlert(false);
        if (onClose) {
            onClose();
        }
    }

    let Content = content || (() => <></>);

    return (
        <>
            <div onClick={handleOpen}>
                {trigger}
            </div>
            {showAlert && <AlertWrapper>
                <AlertBody>
                    <AlertHeader>
                    <p style={{
                        fontSize: '15px',
                        fontWeight: 'bold'
                    }}>{alertTitle}</p>
                        <CustomIconButton
                            onClick={handleClose}
                            title="Close"
                            isDanger
                            isPill
                            size='small'
                            iconName='close'
                            iconComponent={<CloseIcon />}
                        />
                    </AlertHeader>
                    <AlertContent>
                        <Content closeModal={handleClose} />
                    </AlertContent>
                </AlertBody>
            </AlertWrapper>}
        </>
    )
}

export default CustomAlert