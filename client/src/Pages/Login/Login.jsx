import styled from 'styled-components';
import Authentication from '../../Components/Authentication/Authentication.jsx';

const Loginpage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background-color: rgb(50, 4, 199);
  position: relative;
`;
const CircleBackground = styled.div`
  position: absolute;
  top: -50px;
  left: -50px;
  width: 200px;
  height: 200px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
`;
const Login = () => {
  return (
    <Loginpage>
      <CircleBackground />
      <CircleBackground style={{ top: '100px', left: '60%' }} />
      <CircleBackground style={{ top: '60%', left: '10%' }} />
      <Authentication />
    </Loginpage>
  );
};
export default Login;

