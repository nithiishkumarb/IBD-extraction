import React, { useEffect, useState, useContext } from 'react';
import Topbar from '../../Components/Topbar/Topbar';
import styled from 'styled-components';
import { AuthContext } from '../../context/AuthContext';
import {downloadcall,listFileCall} from "../../apicalls"

const FolderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  font-family: Roboto;
`;

const Heading = styled.h3`
  font-weight: bold;
  letter-spacing: 3px;
  font-family: Roboto;
  font-weight: bold;
`;

const Table = styled.table`
  border-collapse: collapse;
  width: 40%;
  margin: 20px auto;
  border-radius: 5px;
`;

const TableHeader = styled.th`
  background-color: rgb(10, 4, 199);
  color: #fff;
  padding: 10px;
  text-align: center;
  border: 1px solid #ddd;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

const TableCell = styled.td`
  text-align: center;
  padding: 10px;
  border: 1px solid #ddd;
`;

const Buttons = styled.button`
  cursor: pointer;
  margin-top: 10px;
  background-color: green;
  width: 150px;
  height: 40px;
  color: white;
  border: none;
  border-radius: 5px;
  background-color: rgb(10, 4, 199);
  cursor: pointer;
  &:hover {
    background-color: rgb(50, 4, 199);
  }
`;

const Folders = () => {
  const [fileList, setFileList] = useState({});
  const [response, setresponse] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      listFileCall(user._id)
        .then((response) => {
          setFileList(response.entryNames)
        })
        .catch((error) => {
          // console.error('Error downloading data:', error);
          // console.log('Error response:', error.response.status);
          if(error.response.status===404){
            setresponse(!response);
          }
        });
    }
  }, [user]);

const handleDownloadAllClick = () => {
  if (user){
    downloadcall(user._id)
      .then(() => {
        console.log("Sucessfully downloaded")
      })
      .catch((error) => {
        console.error('Error downloading data:', error);
        if(error.response.status===404){
          alert("There is no data to download")
          window.location.reload();
        }
      });
  }
};
  return (
    <div>
      <Topbar />
      <FolderContainer>
        <Heading>List of files</Heading>
        <Table>
          <thead>
            <tr>
              <TableHeader>S.No</TableHeader>
              <TableHeader>IBD NO</TableHeader>
              <TableHeader>Created</TableHeader>  
            </tr>
          </thead>
          <tbody>

            {Object.keys(fileList).map((entryKey, index) => (
            <TableRow key={entryKey}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{fileList[entryKey].entryName}</TableCell>
              <TableCell>{fileList[entryKey].createdAt}</TableCell>
            </TableRow>
            ))}

          </tbody>
        </Table>
        {response &&
          <p>No data</p>
        }

        <Buttons onClick={handleDownloadAllClick}>Download All</Buttons>
      </FolderContainer>
    </div>
  );
};

export default Folders;
