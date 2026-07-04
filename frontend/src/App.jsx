import { useState } from 'react'
import RouterApp from './routes/routerpp'
import Navbar from './components/Navbar'
import { Footer } from './components/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>

     <Navbar/>
    <RouterApp/>
    <Footer className="d-flex flex-column min-vh-100"/>
    </>
  )
}

export default App
