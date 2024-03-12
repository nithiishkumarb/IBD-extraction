import React, { useState, useContext } from 'react';
import { AuthContext } from "../../context/AuthContext";
import Topbar from '../../Components/Topbar/Topbar';
import styled from 'styled-components';
import Changepassword from '../../Components/Changepassword/Changepassword';
const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
  height: auto;
  font-family: 'Kanit', sans-serif;
  font-family: 'Roboto', sans-serif;
`;

const Heading = styled.h2`
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
  letter-spacing: 3px;
`;

const Details = styled.div`
  width: 80%;
  max-width: 500px;
  background-color: rgba(220, 220, 220, 0.5);
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const Detail = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.span`
  font-weight: bold;
  letter-spacing: 1.5px;
`;

const Value = styled.span`
  margin-left: 10px;
`;

const PasswordChangeTrigger = styled.button`
  display: ${props => (props.visible ? 'none' : 'flex')};
  align-items: center;
  justify-content: center;
  width: 30%;
  padding: 10px 10px;
  background-color: rgb(50, 4, 199);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgb(50, 5, 163);
  }

  @media (max-width: 600px) {
    width: 50%;
    padding: 20px;
  }
`;

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [visible, setVisible] = useState(false);
  const [userDetails,setUserDetails] = useState(user || {});

  const handleVisible = () => {
    setVisible(!visible);
  }
  return (
    <div>
      <Topbar/>
      <ProfileContainer>
        <Heading>Profile</Heading>
        <Details>
          <Detail>
            <Label>Employee Code:</Label>
            <Value>{userDetails.empcode}</Value>
          </Detail>
          <Detail>
            <Label>Name:</Label>
            <Value>{userDetails.name}</Value>
          </Detail>
          <Detail>
            <Label>Email:</Label>
            <Value>{userDetails.email}</Value>
          </Detail>
          <PasswordChangeTrigger onClick={handleVisible}>Change Password</PasswordChangeTrigger>
          {visible && <Changepassword/>}
        </Details>
      </ProfileContainer>
    </div>
  );
};
export default Profile;
