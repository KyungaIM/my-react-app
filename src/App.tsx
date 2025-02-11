import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MainPage from './pages/main.tsx'
import EditPage from './pages/edit.tsx'
import ContentPage from './pages/content.tsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/edit" element={<EditPage />} />
        <Route path="/edit/:id" element={<EditPage />} />
        <Route path="/content/:id" element={<ContentPage />} />
      </Routes>
    </Router>
  )
}

export default App
