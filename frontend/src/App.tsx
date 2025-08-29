import { Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './pages/Home'
import Mission from './pages/Mission'
import Demo from './pages/Demo'
import Waitlist from './pages/Waitlist'
import Ambassador from './pages/Ambassador'
import Sponsor from './pages/Sponsor'

export default function App(){
  return (
    <main className="min-h-dvh bg-ink text-white">
      <Nav />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/mission" element={<Mission/>} />
        <Route path="/demo" element={<Demo/>} />
        <Route path="/waitlist" element={<Waitlist/>} />
        <Route path="/ambassador" element={<Ambassador/>} />
        <Route path="/sponsor" element={<Sponsor/>} />
      </Routes>
      <Footer />
    </main>
  )
}
