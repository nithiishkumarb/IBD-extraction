import React,{useState} from 'react'
import styled from "styled-components"
import MenuIcon from '@mui/icons-material/Menu';
import DateTime from "./DateTime"
import Sidebar from "../Sidebar/Sidebar"
const TopBarContainer = styled.div`
  width: 100%;
  height: 50px;
  background-color: rgb(50, 4, 199);
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
  position: sticky;
  top: 0;
  z-index: 10;
`;

const Menuicons = styled.span`
  margin-left: 20px;
  cursor: pointer;
`;

// const Title = styled.h1`
//   font-size: 28px;
//   font-family: Roboto;
//   font-weight: bold;
// `;

const DateAndTime = styled.span`
  margin-right: 20px;
  font-family: Roboto;
`;

// Adding a media query for smaller screens
const MediaTopBarContainer = styled(TopBarContainer)`
  @media (max-width: 768px) {
    justify-content: space-between;
    padding: 5px;
    text-align: center;
  }
`;

const Topbar = () => {
  const [Visible,setVisible]=useState(true);
  const HandleMenu=()=>{
    setVisible(!Visible);
  }
  return (
    <div>
    <MediaTopBarContainer>
      <Menuicons>
        <MenuIcon onClick={HandleMenu}/>
      </Menuicons>
      {/* <Title>Netcon</Title> */}
      <DateAndTime>
        <DateTime/>
      </DateAndTime>
    </MediaTopBarContainer>
    { Visible && <Sidebar/>}
    </div>
  );
};

export default Topbar;
