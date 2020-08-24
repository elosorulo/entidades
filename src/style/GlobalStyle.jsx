import { createGlobalStyle } from "styled-components";
import {fontColor, backgroundColor, backgroundActive} from './color';

const GlobalStyle = createGlobalStyle`
    background-color: ${backgroundColor};

    ::-webkit-scrollbar {
    width: 0.6rem;
    }
    
    ::-webkit-scrollbar-track {
    background-color: ${backgroundColor};
    border-left: 0.05rem solid ${fontColor};
    border-right: 0.05rem solid ${fontColor};
    }

    ::-webkit-scrollbar-thumb {
    background-color: ${fontColor};
    }

`;

export default GlobalStyle;
