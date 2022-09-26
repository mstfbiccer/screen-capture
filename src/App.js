import './App.css';
import ScreenOutput from './components/ScreenOutput';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ClientPage from './components/ClientPage';

const App = () => {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ScreenOutput />}/>
          <Route path="/client" element={<ClientPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;