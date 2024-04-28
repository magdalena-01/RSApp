import './App.css'
import AddEmployeeComponent from './componenets/AddEmployeeComponent'
import FooterComponent from './componenets/FooterComponent'
import HeaderComponent from './componenets/HeaderComponent'
import ListEmployeeComponent from './componenets/ListEmployeeComponent'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {

  return (
    <>
    <BrowserRouter>
      <HeaderComponent />
        <Routes>
          {/* http://localhost:3000/ */}
          <Route path='/' element = {<ListEmployeeComponent />}></Route>
          {/* http://localhost:3000/employees */}
          <Route path='/employees' element = {<ListEmployeeComponent />}></Route>
          {/* http://localhost:3000/add-employee */}
          <Route path='/add-employee' element = {<AddEmployeeComponent />}></Route>
          {/* http://localhost:3000/update-employee/{id} */}
          <Route path='/update-employee/:id' element = {<AddEmployeeComponent />}></Route>
        </Routes>
      <FooterComponent />
    </BrowserRouter>
    </>
  )
}

export default App
