  import  { useContext, useState,useRef } from 'react';
  import styled from 'styled-components';
  import {loginCall} from "../../apicalls.js";
  import { AuthContext } from "../../context/AuthContext";
  import {Link} from "react-router-dom"
  import Person2Icon from '@mui/icons-material/Person2';
  import LockIcon from '@mui/icons-material/Lock';
  import VisibilityIcon from '@mui/icons-material/Visibility';
  import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
  import CircularProgress from '@mui/material/CircularProgress';

  const Authenticate = styled.form`
    width: 400px;
    height: 400px;
    background-color: white;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    transition: box-shadow 0.3s ease;

    &:hover {
      box-shadow: 0px 0px 18px 11px rgba(0, 0, 0, 0.47);
    }

    @media (max-width: 600px) {
      width: 100%;
      padding: 20px;
    }
  `;

  const Svg = styled.svg`
    width: 100px;
    height: 100px;
    fill: rgb(50, 5, 163);
    display: flex;
    align-items: center;
    justify-content: center;
  `;

  const InputContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    padding: 10px;
    width: 60%;
  `;

  const Input = styled.input`
    border: none;
    outline: none;
    flex: 1;
    margin-left: 10px;
    font-size: 14px;
    width: 100%;
  `;

  const PasswordToggle = styled.span`
    cursor: pointer;
  `;

  const Forgotpasstab = styled.div`
    display: flex;
    width: 260px;
    justify-content: flex-end; 
  `;

  const Links = styled(Link)`
    color: #777;
    text-decoration: underline;
    cursor: pointer;
    &:hover {
      color: blue;
    }
  `;

  const LoginButton = styled.button`
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
      width: 100%;
      padding: 20px;
    }
  `;

const Authentication = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { isFetching, dispatch, } = useContext(AuthContext);
  // const {setId}=useContext(AuthContext)
  const handlePassword = () => {
    setShowPassword(!showPassword);
  }
  const email = useRef();
  const password = useRef();
  const handleClick = async(e) => {
    e.preventDefault();
    try{
      const res = await loginCall({
        email: email.current.value,
        password: password.current.value,
      }, dispatch);
      if(res===undefined){
        alert("Enter a correct email or password")
        window.location.reload();
      }else{
        dispatch({ type: 'LOGIN_SUCCESS', payload: res });
      }
    }catch (error){
        console.error("Error during login:", error);
    }
  }
  return (
      <Authenticate onSubmit={handleClick}>
        <Svg viewBox="0 0 24 24">
          <path d="M10 2c-4.42 0-8 3.58-8 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 3.5c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 11c-2.05 0-3.87-.95-5.07-2.44 1.45-.98 3.19-1.56 5.07-1.56s3.62.58 5.07 1.56c-1.2 1.49-3.02 2.44-5.07 2.44z" />
        </Svg>
        <InputContainer>
          <Person2Icon />
          <Input type="email" 
            placeholder="Email" 
            required ref={email} />
        </InputContainer>
        <InputContainer>
          <LockIcon />
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            required
            ref={password}
            minLength="6"
          />
          <PasswordToggle onClick={handlePassword}>
            {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
          </PasswordToggle>
        </InputContainer>
        <Forgotpasstab>
          <Links to="/forgotpassword">Reset Password?</Links>
        </Forgotpasstab>
        <LoginButton type="submit" disabled={isFetching}>
          {isFetching ? <CircularProgress/> : "Login"}
        </LoginButton>
      </Authenticate>
    );
  };
export default Authentication;
