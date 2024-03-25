import React from 'react';
import { Spinner } from '@zendeskgarden/react-loaders';
import styled from "styled-components";
import { Tooltip } from '@zendeskgarden/react-tooltips';

const StyledButton = styled.button`
    background-color: #106ebe;
    color: #fff;
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    &:disabled {
        opacity: 0.7;
        cursor: no-drop;
    }
`;

const CustomButton = ({ loading, title, tooltipProps, ...rest }) => {

    const button = (
        <StyledButton {...rest} disabled={loading ? true : rest.disabled}>{
        loading ? <Spinner size='small' />
            : rest.children}
        </StyledButton>
    );

    return (
        title ? <Tooltip content={title} {...tooltipProps}>
            <div>{button}</div>
        </Tooltip> : button
    );
};

export default CustomButton;