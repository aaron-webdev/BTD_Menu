import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddItemPage from './pages/addItemPage';

import MenuPage from './pages/menuMain'; 

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/*Menu Main Page*/}
        <Route path="/" element={<MenuPage />} />
        
        {/*Add Items Page*/}
        <Route path="/add-item" element={<AddItemPage />} />
      </Routes>
    </BrowserRouter>
  );
}