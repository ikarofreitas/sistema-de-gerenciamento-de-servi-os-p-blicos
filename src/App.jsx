import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import Services from "./pages/Services"
import Organizations from "./pages/Organizations"


function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Services />}></Route>
        <Route path='/organizations' element={<Organizations />}></Route>
      </Routes>
      </Router>
      
    </>
  )
}

export default App
