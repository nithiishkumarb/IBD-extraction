import React, { useState } from 'react';
import styled from 'styled-components';
import {ResetPasswordcall} from "../../apicalls";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { useNavigate } from 'react-router-dom';
const Forgotpasswords = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
`;

const Forgotpasswrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 300px;
  height: 300px;
  padding: 20px;
  background-color: white;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
`;

const Svg = styled.svg`
  width: 80px;
  height: 80px;
  padding-bottom:10px;
  fill: rgb(50, 4, 199);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Header=styled.div`
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
`

const Heading = styled.span`
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  letter-spacing: 1.5px;
`;

const InputField=styled.div`
  display:flex;
  align-items:center;
  justify-content:center;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding:10px;
`

const Input = styled.input`
    border: none;
    outline: none;
    flex: 1;
    margin-left: 10px;
    font-size: 14px;
    width: 60%;
`;
const Warningmsg=styled.p`
    color:red;
`

const ResetButton = styled.button`
  padding: 10px 20px;
  background-color: rgb(50, 5, 163);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgb(56, 3, 123);
  }

  @media (max-width: 600px) {
    width: 50%;
    padding: 20px;
  }
`;

const Forgotpassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate=useNavigate();
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setMessage('');
  };

  const handleResetPassword = () => {
    if (email.length===0) {
      setMessage('* Email is required.');
      return;
    }
    ResetPasswordcall(email)
    .then((response)=>{
      if(response.isValid){
        alert("Your New password is First 4 digit of name and employee code")
        navigate("/login");
      } else{
        setMessage(" * Email is not valid.")
      }
    })
    .catch((error)=>{
      console.log(error)
    })
  };

  return (
    <Forgotpasswords>
      <Forgotpasswrapper>
        <Header>
          <Svg viewBox="0 -960 960 960">
            <path d="M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm-40-160h80v-240h-80v240Zm40 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
          </Svg>
          <Heading>Forgot Password</Heading>
        </Header>
        <InputField>
          <label>
            <MailOutlineIcon />
          </label>
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            required
            onChange={handleEmailChange}
          />
        </InputField>
        <div>
          <Warningmsg>{message}</Warningmsg>
        </div>
        <ResetButton onClick={handleResetPassword}>Reset</ResetButton>
      </Forgotpasswrapper>
    </Forgotpasswords>
  );
};

export default Forgotpassword;
