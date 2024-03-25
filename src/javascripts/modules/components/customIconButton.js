import React from 'react';
import { IconButton } from "@zendeskgarden/react-buttons";
import { Tooltip } from "@zendeskgarden/react-tooltips";

const CustomIconButton = ({ title, iconName, iconComponent, ...rest }) => {
    const iconButton = (
        <IconButton aria-label={iconName} {...rest}>
            {iconComponent}
        </IconButton>
    );
    return (
        <Tooltip content={title}>
            {title ? <div>{iconButton}</div> : iconButton}
        </Tooltip>
    )
}

export default CustomIconButton;
