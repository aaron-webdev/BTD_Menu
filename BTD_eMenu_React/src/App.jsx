import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import MenuPage from './pages/menuMainPage';
import AddItemPage from './pages/addItemPage';

export const DEFAULT_MENU = [
  // Breads
  { id: 1,  name: 'Whole Wheat',             price: '7.00',  category: 'Breads',        flavor: 'savory', handheld: false, soldOut: false },
  { id: 2,  name: 'Honey Oat',               price: '7.00',  category: 'Breads',        flavor: 'savory', handheld: false, soldOut: false },
  // Sourdough
  { id: 3,  name: 'Classic',                 price: '8.00',  category: 'Sourdough',     flavor: 'savory', handheld: false, soldOut: false },
  { id: 4,  name: 'Garlic and Herb',         price: '8.00',  category: 'Sourdough',     flavor: 'savory', handheld: false, soldOut: false },
  { id: 5,  name: 'Cheddar Jalapeno',        price: '8.00',  category: 'Sourdough',     flavor: 'savory', handheld: false, soldOut: false },
  // Biscuits
  { id: 6,  name: 'Classic Buttermilk',      price: '5.00',  category: 'Biscuits',      flavor: 'savory', handheld: true,  soldOut: false },
  { id: 7,  name: 'Goat Cheese and Herb',    price: '5.00',  category: 'Biscuits',      flavor: 'savory', handheld: true,  soldOut: false },
  { id: 8,  name: 'Cheddar Chive',           price: '5.00',  category: 'Biscuits',      flavor: 'savory', handheld: true,  soldOut: false },
  // Hand Pies
  { id: 9,  name: 'Blueberry Orange',        price: '5.00',  category: 'Hand Pies',     flavor: 'sweet',  handheld: true,  soldOut: false },
  { id: 10, name: 'Mixed Berry',             price: '5.00',  category: 'Hand Pies',     flavor: 'sweet',  handheld: true,  soldOut: false },
  { id: 11, name: 'Apple',                   price: '5.00',  category: 'Hand Pies',     flavor: 'sweet',  handheld: true,  soldOut: false },
  { id: 12, name: 'Ham and Cheddar',         price: '5.00',  category: 'Hand Pies',     flavor: 'savory', handheld: true,  soldOut: false },
  { id: 13, name: 'Spinach Feta',            price: '5.00',  category: 'Hand Pies',     flavor: 'savory', handheld: true,  soldOut: false },
  // Cookies
  { id: 14, name: 'Chocolate Chip',          price: '4.00',  category: 'Cookies',       flavor: 'sweet',  handheld: true,  soldOut: false },
  { id: 15, name: 'Double Chocolate Chip',   price: '4.00',  category: 'Cookies',       flavor: 'sweet',  handheld: true,  soldOut: false },
  // Scones
  { id: 16, name: 'Blueberry Lemon',         price: '5.00',  category: 'Scones',        flavor: 'sweet',  handheld: true,  soldOut: false },
  { id: 17, name: 'Savory',                  price: '5.00',  category: 'Scones',        flavor: 'savory', handheld: true,  soldOut: false },
  // Take and Bake
  { id: 18, name: 'Quiche',                  price: '20.00', category: 'Take and Bake', flavor: 'savory', handheld: false, soldOut: false },
  { id: 19, name: 'Biscuits (4 pack)',       price: '12.00', category: 'Take and Bake', flavor: 'savory', handheld: false, soldOut: false },
  { id: 20, name: 'Cinnamon Rolls (6 pack)', price: '18.00', category: 'Take and Bake', flavor: 'sweet',  handheld: false, soldOut: false },
];

const DISPLAY_ORDER = ['Hand Pies', 'Scones', 'Cookies', 'Breads', 'Sourdough', 'Biscuits', 'Take and Bake'];

export function sortMenuItems(items) {
  return [...items].sort((a, b) => {
    const aIndex = DISPLAY_ORDER.indexOf(a.category);
    const bIndex = DISPLAY_ORDER.indexOf(b.category);
    const aOrder = aIndex === -1 ? DISPLAY_ORDER.length : aIndex;
    const bOrder = bIndex === -1 ? DISPLAY_ORDER.length : bIndex;
    return aOrder - bOrder;
  });
}

const STORAGE_KEY = 'btd_menu_items';

function loadItems() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      const needsMigration = parsed.some(item => !item.flavor || item.handheld === undefined);
      if (needsMigration) {
        console.log('Menu data missing required fields — resetting to defaults.');
        return sortMenuItems(DEFAULT_MENU);
      }
      return sortMenuItems(parsed);
    }
  } catch (e) {
    console.error('Failed to load menu from localStorage:', e);
  }
  return sortMenuItems(DEFAULT_MENU);
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

  useEffect(() => {
    saveItems(items);
  }, [items]);

  function setSortedItems(updater) {
    setItems(prev => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      return sortMenuItems(next);
    });
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MenuPage items={items} setItems={setSortedItems} />} />
        <Route path="/add-item" element={<AddItemPage items={items} setItems={setSortedItems} />} />
      </Routes>
    </BrowserRouter>
  );
}