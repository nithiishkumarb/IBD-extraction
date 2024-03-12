import React, { useState,useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import styled from "styled-components";
import Topbar from "../../Components/Topbar/Topbar.jsx";
import ClearIcon from '@mui/icons-material/Clear';
import { uploadcall } from "../../apicalls.js";
const UploadContainer = styled.form`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const DragDropbox = styled.div`
  width: 500px;
  height: 250px;
  border: 2px dashed rgb(160, 113, 255);
  background-color: rgb(239, 239, 239);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    border: 2px dashed rgb(79, 4, 199);
    background-color: rgb(228, 227, 228);
  }

  @media (max-width: 768px) {
    width: 80%;
    height: 200px;
    font-size: 16px;
  }
`;

const Svg = styled.svg`
  width: 100px;
  height: 100px;
  fill: rgb(50, 4, 199);
  opacity:0.5
`;

const DropboxText = styled.span`
  font-family: Roboto;
  font-size: 14px;
  color: rgb(50, 4, 199);
  opacity:0.5
`;

const Files = styled.div`
  display: ${props => (props.visible === true ? 'flex' : 'none')};
  display:flex;
  background-color: rgb(232, 232, 232);
  margin-top: 30px;
  width: 450px;
  height: 40px;
  align-items: center;
  justify-content: space-between;
  border-radius: 5px;
`;

const Filename = styled.span`
  margin-left: 10px;
  font-family: 'Roboto';
`;

const Buttons = styled.button`
  margin-top: 50px;
  width: 150px;
  height: 40px;
  border: none;
  border-radius: 5px;
  background-color: rgb(50, 4, 199);
  color: white;
  cursor: pointer;
  &:hover {
    background-color: rgb(70, 4, 199);
  }
`;

const Uploadfile = () => {
  const [fileName, setFileName] = useState(null);
  const [visible, setVisible] = useState(false);
  const [setIsDragging] = useState(false)
  const [fileInput, setFileInput] = useState(null);
  const { user } = useContext(AuthContext);
  const handleDragEnter = (e) => {
  e.preventDefault();
  setIsDragging(true);
  };

  const handleDragOver = (e) => {
      e.preventDefault();
      setIsDragging(true);
  };

  const handleDragLeave = () => {
      setIsDragging(false);
  };

  const handleDrop = (e) => {
      e.preventDefault();
      setIsDragging(false);
      handleFileInputChange(e.dataTransfer.files);
  };

  const handleClick = () => {
      fileInput.click();
  };

  const handleFileInputChange = (files) => {
    files.preventDefault();
    const selectedFile = files.target.files[0];
    if (selectedFile) {
      setFileName(selectedFile.name);
      setVisible(true);
  }
  };

  const CancelFile = () => {
    setFileName(null);
    setVisible(false);
  };

  const handleupload=(file)=>{
    file.preventDefault();
    if (fileName && user) {
      const formData = new FormData();
      formData.append("file", fileInput.files[0]);
      formData.append("userId", user._id);
      const isconfirm=window.confirm("Press ok to upload");

      if(isconfirm){
        uploadcall(formData);
      } else{
        window.location.reload();
      }
    }else{
      window.alert("Please insert a file")
    }
  }
  return (
    <div>
      <Topbar/>
      <UploadContainer onSubmit={handleupload}>
        <DragDropbox
          onClick={handleClick}
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}>
          <input type="file" ref={(input) => setFileInput(input)} style={{ display: 'none' }} accept=".xls, .xlsx" onChange={handleFileInputChange}/>
          <Svg viewBox="0 -960 960 960">
          <path d="M440-320v-326L336-542l-56-58 200-200 200 200-56 58-104-104v326h-80ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z" />
          </Svg>
          <DropboxText><b>Choose a file</b> or Drag it here </DropboxText>
        </DragDropbox>
        {visible && (
          <Files>
            <Filename>{fileName}</Filename>
            <ClearIcon style={{ marginRight: "10px", color: "red", cursor: "pointer" }} onClick={CancelFile} />
          </Files>
        )}
        <Buttons>Submit</Buttons>
      </UploadContainer>
    </div>
  );
}
export default Uploadfile;
