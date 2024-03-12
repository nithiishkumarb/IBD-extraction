import React from 'react';
import {NavLink, useNavigate} from "react-router-dom"
import styled from "styled-components";
import Person2Icon from '@mui/icons-material/Person2';
import FolderIcon from '@mui/icons-material/Folder';
import UploadIcon from '@mui/icons-material/Upload';
import LogoutIcon from '@mui/icons-material/Logout';
import { useContext } from 'react';
import { AuthContext } from "../../context/AuthContext.js";

const SidebarContainer = styled.div`
  background-color: rgba(237, 237, 237,0.7);
  width: 200px;
  height: 90vh;
  display:flex;
  flex-direction:column;
  align-items:center;
  position: absolute;
  top: 50px;
  font-family: Roboto;
  transition: transform 300ms ease-in;
  @media (max-width: 768px) {
    width: 80px;
  }
`;

const Iconsize = { 
  fontSize: '20px',
  paddingRight:'5px'
};

const ActiveLinkStyle = {
  backgroundColor: 'rgb(50, 4, 199)',
  color: 'white',
};

const Links=styled(NavLink)`
  width: 150px;
  height: 35px;
  background-color: rgba(220, 220, 220,0.5);
  display: flex;
  align-items: center;
  padding-left:15px;
  text-decoration:none;
  margin-top: 15px;
  border-radius: 15px;
  cursor: pointer;
  font-size:14px;
  color:rgb(41, 41, 41);
  &:hover{
    background-color: rgb(50, 4, 199);
    color:white;
  }
  &.active {
    ${ActiveLinkStyle}
  }
  @media (max-width: 768px) {
    width: 80px;
    justify-content: center;
    padding: 0;
  }
`
const Sidebar = () => {
  const { dispatch } = useContext(AuthContext);
  const navigate=useNavigate();
  const handleLogout = () => {
  const islogout=window.confirm("Press ok to logout");
  if(islogout){
  dispatch({ type: 'LOGIN_START' });
  navigate.push('/login');
  }else{
    window.location.reload();
  }}
  return(
    <SidebarContainer>
      {/* <Links to="/"><HomeIcon style={Iconsize}/>Home</Links> */}
      <Links to="/" activeclass="active" ><UploadIcon style={Iconsize}/>Upload</Links>
      <Links to="/folders" activeclass="active" ><FolderIcon style={Iconsize}/>Folders</Links>
      <Links to="/profile" activeclass="active" ><Person2Icon style={Iconsize}/>Profile</Links>
      <Links  to="/login" activeclass="active" onClick={handleLogout}><LogoutIcon style={Iconsize}/>Logout</Links>
    </SidebarContainer>
  );
}
export default Sidebar;
