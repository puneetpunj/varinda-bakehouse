import styled from "styled-components";
import defaultImg from "../images/product-1.jpeg";
const StyledHero = styled.header`
  min-height: 30vh;
  /* background: url(${defaultImg}); */
  background: url(${props => (props.img ? props.img : defaultImg)});
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default StyledHero;
