import { fontColor, backgroundColor, backgroundActive } from '../../style/color.js';
import styled from 'styled-components';
import useMobilePress from '../../hooks/useMobilePress';
import React from "react";

const paddingMinusBorder = (base, borderWidth) => base - borderWidth;
    
const padding = (baseX, baseY) => {
    return `${paddingMinusBorder(baseX, 0.1)}rem ${paddingMinusBorder(baseY, 0.1)}rem`;
};

export const hoverTransform = `transform:scale(1.05, 1.05)`;

const hover = (props) => !props.active ? `
    @media (hover: hover) and (pointer: fine) {
      &:hover {
        ${hoverTransform}
      }
    }
  ` : "";

const StyledButtonWithoutMobileSupport = styled.button`
    border-radius: 50%;
    padding: ${padding(0.4, 0.5)};
    border: 0.1vmax solid ${fontColor};
    box-sizing: border-box;
    &:focus {
        outline:none !important;
    };
    -webkit-user-select: none; /* Safari */        
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* IE10+/Edge */
    user-select: none; /* Standard */
    position: relative;
    color: ${fontColor};
    ${props => hover(props)}
    ${props => props.active ? "transform:scale(0.95, 0.95);" : ""}
    background: ${props => props.active ? backgroundActive : backgroundColor};
    transition: ${props => `background ${props.active ? 0 : 0.25}s linear;`};
    ${props => props.absolute ? `position: absolute;` : ""};
    ${props => props.top ? `top: ${props.top}%;` : ""}
    ${props => props.right ? `right: ${props.right}%;` : ""}
    ${props => props.floating ? `z-index: 5000;` : ""};
`;

const StyledButton = (props) => {

  const press = useMobilePress(props);
  
  return <StyledButtonWithoutMobileSupport {...props} {...press}/>;
};

export default StyledButton;
