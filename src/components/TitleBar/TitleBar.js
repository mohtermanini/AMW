import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';
import { StyledButton } from '../Button/Button.styled'
import { StyeldTitleBar } from './TitleBar.styled'

export default function TitleBar({ setUser }) {
  const user = useContext(UserContext);
  const navigate = useNavigate();
  function logoutClicked() {
    setUser(null);
    navigate("/login");
  }
  return (
    <StyeldTitleBar>
      <h1>Captain Car</h1>
      {user &&
        <StyledButton layout="gradient" bgcolor="secondary" scRadius="10" size="tall" onClick={logoutClicked}>
          Logout
        </StyledButton>
      }
    </StyeldTitleBar>
  )
}
