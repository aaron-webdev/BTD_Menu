import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import MenuPage from './pages/menuMainPage';
import AddItemPage from './pages/addItemPage';

export default function App() {
  // Central array to store your bakery items
  const [items, setItems] = useState([]);

  return (
    <BrowserRouter>
      <Routes>
        {/* Passes the items list to your menu screen */}
        <Route path="/" element={<MenuPage items={items} />} />
        
        {/* Passes the list and the updater function to your form screen */}
        <Route path="/add-item" element={<AddItemPage items={items} setItems={setItems} />} />
      </Routes>
    </BrowserRouter>
  );
}