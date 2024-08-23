import { useState } from 'react'
import './App.css'
import Login from './pages/Login'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <div className='app'>
      <Login />
     </div>
    </>
  )
}

export default App
