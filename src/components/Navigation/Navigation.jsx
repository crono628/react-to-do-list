import React, { useState } from 'react';
import styled from 'styled-components';
import bars3 from '../../assets/bars3.svg';
import './navigation.css';
import Burger from './StyledBurger';
import Menu from './StyledMenu';

const Wrapper = styled.div`
  position: relative;
  height: 50px;
`;

const OverflowContainer = styled.div`
  overflow: hidden;
  height: 100vh;
  position: relative;
`;

const Navigation = ({
  lists,
  currentList,
  getCurrentList,
  todos,
  handleDeleteList,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Wrapper>
        <Burger open={open} setOpen={setOpen} />
        <OverflowContainer>
          <Menu open={open} setOpen={setOpen} />
        </OverflowContainer>
      </Wrapper>
    </>
  );
};

export default Navigation;
