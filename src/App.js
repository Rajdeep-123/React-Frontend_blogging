import React from 'react';
import {BrowserRouter} from "react-router-dom";
import Mainrouter from './Mainrouter';

const App = () =>{
  return(
    <div>
  <BrowserRouter>
    <Mainrouter />
  </BrowserRouter>
</div>
  )
}
export default App
