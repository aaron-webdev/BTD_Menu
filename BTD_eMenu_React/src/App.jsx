import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import MenuPage from './pages/menuMainPage';
import AddItemPage from './pages/addItemPage';

export default function App() {
  // Hardcoded default menu items from your layout screenshot
  const defaultItems = [
    { name: "Honey Oat", price: "7.00", category: "Breads" },
    { name: "Whole Wheat", price: "7.00", category: "Breads" },
    { name: "Classic", price: "8.00", category: "Sourdough" },
    { name: "Cranberry Rosemary", price: "8.00", category: "Sourdough" },
    { name: "Jalapeno Cheddar", price: "8.00", category: "Sourdough" },
    { name: "Chocolate Chunk", price: "4.00", category: "Cookies" },
    { name: "Chocolate Chocolate Chunk", price: "4.00", category: "Cookies" },
    { name: "Buttermilk Biscuit", price: "4.00", category: "Biscuits" },
    { name: "Cheddar Chive Biscuit", price: "4.00", category: "Biscuits" }
  ];

  // Initialize the state with the default items
  const [items, setItems] = useState(defaultItems);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MenuPage items={items} />} />
        <Route path="/add-item" element={<AddItemPage items={items} setItems={setItems} defaultItems={defaultItems} />} />
      </Routes>
    </BrowserRouter>
  );
}