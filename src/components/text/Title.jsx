import styled from 'styled-components';
import {fontColor} from '../../style/color';

const Title = styled.h1`
    ${props => props.noMarginTop ? "" : "margin-top: 15vh;"}
    font-size: ${props => props.mobileHorizontal === true ? "3.5em" : "5em"};
    color: ${fontColor};
`;

export default Title;
