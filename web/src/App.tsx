import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Chatpage from './pages/chat/Chatpage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/chat" element={<Chatpage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
