import axios from "axios";
import { format } from 'date-fns'
export const loginCall = async (userCredential, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try{
    const res = await axios.post("/auth/login", userCredential);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      return res.data;
  } catch(err){
      dispatch({ type: "LOGIN_FAILURE", payload: err });
  }
}
export const uploadcall= (formData)=>{
  try{
    axios.post("/upload", formData)
        .then((response) => {
          alert("File uploaded successfully")
          window.location.reload();
        })
        .catch((error) => {
          alert("Error uploading file");
          window.location.reload();
        });
  }catch(err){
    console.log(err)
  }
}
export const listFileCall=(userId)=>{
  return axios.get(`/filelist/${userId}`)
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((error) => {
      console.error('Error fetching user files:', error);
      throw error;
    });
}

export const downloadcall = (userId) => {
  return new Promise((resolve, reject) => {
    const apiUrl = `/download/data/${userId}`;
    axios.get(apiUrl, { responseType: 'blob' })
      .then((response) => {
        const timestamp= format(new Date(), 'dd-MM-yyyy');
        const blob = new Blob([response.data], { type: 'application/zip' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `_${timestamp}.zip`;
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        resolve();
      })
      .catch((error) => {
        console.error('Error downloading files:', error);
        reject(error);
      });
  });
};

export const ResetPasswordcall=async(email)=>{
  try {
    const response = await axios.post('/user/resetPassword', { email });
    return response.data;
  }catch (error) {
    console.error('Error sending reset request:', error);
    throw error;
  }
}

export const Changepasswordcall=async(userId,oldpassword,newpassword)=>{
  try{
    const response=await axios.put('/user/changepassword',{userId, oldpassword, newpassword});
    return response.data;
  }
  catch(error){
    console.log('Error sending change password',error);
    throw error;
  }
}