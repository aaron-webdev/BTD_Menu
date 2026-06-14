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
    { name: "Garlic and Herbs", price: "8.00", category: "Sourdough" },
    { name: "Chocolate Chunk", price: "4.00", category: "Cookies" },
    { name: "Chocolate Chocolate Chunk", price: "4.00", category: "Cookies" },
    { name: "Goat Cheese and Herbes de Provence", price: "5.00", category: "Biscuits" },
    { name: "Cheddar Cheese and Chive", price: "5.00", category: "Biscuits" },
    { name: "Blueberry Lemon", price: "5.00", category: "Scones" },
    { name: "Savoury", price: "5.00", category: "Scones" }
    // add hand pies : Mixed Berry, Blue Berry Orange, Apple, Spinach Feta, Ham and Cheddar $5.00
    // add the mix and match 5 for 20 (excludes breads)
    // make pastries a main category with sub categories 
    // make bread sub categories by shape ie Sandwich bread and sourdough 
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