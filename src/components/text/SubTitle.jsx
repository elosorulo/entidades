import styled from 'styled-components';
import {fontColor} from '../../style/color';

const SubTitle = styled.h1`
    margin-top: 5vh;
    font-size: ${props => props.mobileHorizontal === true ? "2.5rem" : "3em"};
    color: ${fontColor};
`;

export default SubTitle;

