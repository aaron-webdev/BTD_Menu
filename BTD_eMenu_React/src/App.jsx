import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import MenuPage from './pages/menuMainPage';
import AddItemPage from './pages/addItemPage';

const DEFAULT_MENU = [
  { id: 1, name: 'Honey Oat', price: '7.00', category: 'Breads', soldOut: false },
  { id: 2, name: 'Whole Wheat', price: '7.00', category: 'Breads', soldOut: false },
  { id: 3, name: 'Classic', price: '8.00', category: 'Sourdough', soldOut: false },
  { id: 4, name: 'Cranberry Rosemary', price: '8.00', category: 'Sourdough', soldOut: false },
  { id: 9, name: 'Jalapeno Cheddar', price: '8.00', category: 'Sourdough', soldOut: false },
  { id: 5, name: 'Chocolate Chunk', price: '2.50', category: 'Cookies', soldOut: false },
  { id: 6, name: 'Chocolate Chocolate Chunk', price: '2.50', category: 'Cookies', soldOut: false },
  { id: 7, name: 'Buttermilk Biscuit', price: '4.00', category: 'Biscuits', soldOut: false },
  { id: 8, name: 'Cheddar Chive Biscuit', price: '4.00', category: 'Biscuits', soldOut: false },
];

const STORAGE_KEY = 'btd_menu_items';

function loadItems() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch (e) {
    console.error('Failed to load menu from localStorage:', e);
  }
  return DEFAULT_MENU;
}

function saveItems(items) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (e) {
    console.error('Failed to save menu to localStorage:', e);
  }
}

export default function App() {
  const [items, setItems] = useState(() => loadItems());

  // Persist every time items changes
  useEffect(() => {
    saveItems(items);
  }, [items]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MenuPage items={items} setItems={setItems} />} />
        <Route path="/add-item" element={<AddItemPage items={items} setItems={setItems} />} />
      </Routes>
    </BrowserRouter>
  );
}