import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {Toaster} from 'react-hot-toast'
import EditorPage from './pages/editorPage';
import Home from './pages/home';

function App() {
  return (
    <>
    <div>
      <Toaster
        position = "top-right" 
        toastOptions={{
          success: {
            theme : {
              primary: '#4aed88',
            },
          },
        }}
      ></Toaster>
    </div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/editor" element={<EditorPage />} />
          <Route path="/editor/:roomId" element={<EditorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
