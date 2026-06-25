import React from "react";
import{ BrowserRouter, BrowserRouter as Router,} from "react-router-dom";
import{LoginPage} from "./Routes.js";

const App=()=>{
    return(
        <BrowserRouter>
        <Routes>
            <Routepath="/login" element={<LoginPage/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App;