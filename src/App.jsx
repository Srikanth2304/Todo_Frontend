import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Todo from './Todo'
import Todo_Filter from './Todo_Filter'
import Todo_axios from './Todo_axios'
import Todo_prod from './Todo_prod'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <Todo/> */}
      {/* <Todo_Filter/> */}
      {/* <Todo_axios/> */}
      <Todo_prod/>
    </>
  )
}

export default App
