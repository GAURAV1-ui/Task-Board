import './App.css'
import Navbar from './components/Navbar/index.jsx'
import Login from './Pages/Login/index.jsx'
import Signup from './Pages/SignUp/index.jsx'
import MyWorkBoard from './Pages/MyWorkBoard/index.jsx'
import AddWork from './components/AddWork.jsx'
import CreateBoard from './Pages/CreateBoard/index.jsx'
import TaskBoard from './Pages/TaskBoard/index.jsx'

function App() {

  return (
    <>
      <Navbar/>
      {/* <MyWorkBoard/> */}
      <CreateBoard/>
      {/* <TaskBoard/> */}
    </>
  )
}

export default App
