import styled from 'styled-components';

const Button = styled.button`
 color: Salmon;
 display: block;
 border: none;
 border-radius: 5px;
 font-size: 18px;
 background-color: azure;
 cursor: pointer;

 :hover {
     opacity: 0.8
 }

 :active {
     background-color: orange;
 }
`;

export default Button;