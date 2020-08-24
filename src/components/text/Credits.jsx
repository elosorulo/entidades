import styled from 'styled-components';
import {fontColor} from '../../style/color';

const Credits = styled.h1`
    margin-top: 5vh;
    font-size: ${props => props.mobileHorizontal === true ?  "1rem" : "1.5em"};
    color: ${fontColor};
`;

export default Credits;
