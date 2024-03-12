import {useContext} from "react";
import Login from "./Pages/Login/Login.jsx"
import Uploadfile from "./Pages/Upload/Upload.jsx"
import Profile from "./Pages/Profile/Profile.jsx"
import Folders from "./Pages/Folders/Folders.jsx"
import Forgotpassword from "./Pages/Forgotpassword/Forgotpassword.jsx"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext.js";
import { ThemeProvider, createTheme } from '@mui/material/styles';
const theme = createTheme();
const App = () => {
  const {user}=useContext(AuthContext);
  return(
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element= {user ? <Navigate to={"/"}/> : <Login/> }/>
          <Route path="/" exact element= {user ? <Uploadfile/> : <Login/>}/>
          <Route path="/folders" element= {user ? <Folders/> : <Login/>}/>
          <Route path="/profile" element= {user ? <Profile/> : <Login/>}/>
          <Route path="/forgotpassword" element= {user ? <Navigate to="/upload" />: <Forgotpassword/>}/>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}
export default App;