import { Routes, Route } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { NotFound } from './components/NotFound'
import { Home, Map } from './pages'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/map/:location" element={<Map />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Navbar />
    </>
  )
}

export default App
