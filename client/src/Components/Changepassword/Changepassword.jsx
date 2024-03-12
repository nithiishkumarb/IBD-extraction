import {useState, useContext, useRef} from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import styled from 'styled-components';
import { AuthContext } from "../../context/AuthContext";
import {Changepasswordcall} from "../../apicalls.js"
const ChangePasswordBtn = styled.button`
    display: flex;
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

const ChangePasswordContainer = styled.form`
    padding-top: 20px;
    width: 80%;
    max-width: 500px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`;

const PasswordChange = styled.div`
    display: flex;
    padding-bottom:10px;
    align-items: center;
    font-weight: bold;
    letter-spacing: 1.5px;
    margin-bottom: 10px;
`;

const Input=styled.input`
    border-Bottom: '1px solid black';
    background: none;
    border-Left: none;
    border-Top: none;
    border-Right: none;
    outline:none;
`
const PasswordToggle = styled.span`
    cursor: pointer;
`;
const Imp = styled.span`
    color: rgb(220, 0, 0);
`;

const Changepassword = () => {
    const [oldpassvisible,setoldpassvisible]=useState(false);
    const [newpassvisible,setnewpassvisible]=useState(false);
    const [confirmpassvisible,setconfirmpassvisible]=useState(false);
    const {user}=useContext(AuthContext);
    const oldpassword=useRef();
    const newpassword=useRef();
    const confirmpassword=useRef();
    const handleoldpassvisible=()=>{
        setoldpassvisible(!oldpassvisible)
    }
    const handlenewpassvisible=()=>{
        setnewpassvisible(!newpassvisible)
    }

    const handleconfirmpassvisible=()=>{
        setconfirmpassvisible(!confirmpassvisible)
    }

    const handlechangepassword=(e)=>{
        e.preventDefault();
        if(newpassword.current.value===confirmpassword.current.value){
            if(newpassword.current.value!==oldpassword.current.value){
                Changepasswordcall(
                    user._id, 
                    oldpassword.current.value, 
                    newpassword.current.value
                )
                .then((response)=>{
                    if(response==="Invalid"){
                        alert("Please enter a correct old password")
                    }else{
                        alert("Password is updated Successfully");
                        window.location.reload();
                    }
                })
                .catch((error)=>{
                    console.log(`Error`,error)
                })
            }else{
                alert(`Old password & New password must not be same`)
                window.location.reload();
            }
        }else{
            alert(`New password & confirm password must be same`)
            window.location.reload();
        }
    }
    return (
        <ChangePasswordContainer onSubmit={handlechangepassword}>
            <PasswordChange>
                <label>Old Password <Imp>*</Imp> : </label>
                <Input type={oldpassvisible ? 'text': 'password'} ref={oldpassword} required minLength="6"/>
                <PasswordToggle onClick={handleoldpassvisible}>
                    {oldpassvisible ? <VisibilityIcon/> : <VisibilityOffIcon/>}
                </PasswordToggle>
            </PasswordChange>
            <PasswordChange>
                <label>New Password <Imp>*</Imp> : </label>
                <Input type={newpassvisible ?'text' : 'password'} ref={newpassword} required minLength="6"/>
                <PasswordToggle onClick={handlenewpassvisible}>
                    {newpassvisible ? <VisibilityIcon/> : <VisibilityOffIcon/>}
                </PasswordToggle>
            </PasswordChange>
            <PasswordChange>
                <label>Confirm Password <Imp>*</Imp> : </label>
                <Input type={confirmpassvisible ? 'text' : 'password'} ref={confirmpassword} required minLength="6"/>
                <PasswordToggle onClick={handleconfirmpassvisible}>
                    {confirmpassvisible ? <VisibilityIcon/> : <VisibilityOffIcon/>}
                </PasswordToggle>
            </PasswordChange>
            <ChangePasswordBtn>Change</ChangePasswordBtn>
        </ChangePasswordContainer>
    )
}
export default Changepassword;