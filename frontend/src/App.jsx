import { Routes,Route } from "react-router-dom";
import Signup from "./components/Signup";
import Table from "./components/Tablepage";

function App(){
  
  return(
    <Routes>
      <Route path="/" element={<Signup/>}></Route>
      <Route path="/table" element={<Table/>}></Route>
    </Routes>
  )
}

export default App;