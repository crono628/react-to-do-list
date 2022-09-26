import React from 'react';
import styled from 'styled-components';
import bars3 from '../../assets/bars3.svg';
import './navigation.css';

const Wrapper = styled.div`
  display: flex;
`;

const Nav = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: yellow;
  position: relative;
  font-size: 2rem;
  min-height: 30px;
`;

const Icon = styled.img`
  width: auto;
  height: 100%;
  margin: 0 15px;
  left: 0;
  position: absolute;
`;

const SlideTray = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: red;
  position: relative;
  font-size: 2rem;
  min-height: 30px;
`;

const StyledBurger = styled.div`
  width: auto;
  height: 100%;
  position: absolute;
  left: 20px;
  z-index: 20;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  div {
    width: 2.35rem;
    height: 0.25rem;
    background-color: ${({ open }) => (open ? '#ccc' : '#333')};
    border-radius: 10px;
    transform-origin: 1px;
    transition: all 0.3s linear;
    &:nth-child(1) {
      transform: ${({ open }) => (open ? 'rotate(45deg)' : 'rotate(0)')};
    }
    &:nth-child(2) {
      transform: ${({ open }) =>
        open ? 'translateX(-100%)' : 'translateX(0)'};
      opacity: ${({ open }) => (open ? 0 : 1)};
    }
    &:nth-child(3) {
      transform: ${({ open }) => (open ? 'rotate(-45deg)' : 'rotate(0)')};
    }
  }
`;

const Navigation = ({
  lists,
  currentList,
  getCurrentList,
  todos,
  handleDeleteList,
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Wrapper>
      <Nav>
        <StyledBurger open={open} onClick={() => setOpen(!open)}>
          <div />
          <div />
          <div />
        </StyledBurger>
        {/* <Icon src={bars3} alt="bars3" /> */}
        <div>Nav</div>
      </Nav>
    </Wrapper>
  );
};

export default Navigation;
