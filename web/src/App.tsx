import './App.css'
import {Routes,Route} from 'react-router-dom'
import Chatpage from './pages/chat/Chatpage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Chatpage />} />
    </Routes>
  )
}

export default App;
