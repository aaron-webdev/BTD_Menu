import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CATEGORY_ORDER = ['Breads', 'Sourdough', 'Hand Pies', 'Cookies', 'Biscuits', 'Pastries', 'Take and Bake'];

const DEFAULT_MENU = [
  { id: 1, name: 'Classic White', price: '3.50', category: 'Breads', soldOut: false },
  { id: 2, name: 'Whole Wheat', price: '3.75', category: 'Breads', soldOut: false },
  { id: 3, name: 'Country Sourdough', price: '8.00', category: 'Sourdough', soldOut: false },
  { id: 4, name: 'Rosemary Sourdough', price: '9.00', category: 'Sourdough', soldOut: false },
  { id: 5, name: 'Chocolate Chip', price: '2.50', category: 'Cookies', soldOut: false },
  { id: 6, name: 'Snickerdoodle', price: '2.50', category: 'Cookies', soldOut: false },
  { id: 7, name: 'Buttermilk Biscuit', price: '2.00', category: 'Biscuits', soldOut: false },
  { id: 8, name: 'Cheddar Biscuit', price: '2.50', category: 'Biscuits', soldOut: false },
];

export default function AddItemPage({ items, setItems }) {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Pastries');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newId = Date.now();
    setItems([...items, { id: newId, name, price, category, soldOut: false }]);
    setName('');
    setPrice('');
    setCategory('Pastries');
  };

  function handleRemove(id) {
    if (window.confirm('Remove this item from the menu?')) {
      setItems(prev => prev.filter(item => item.id !== id));
    }
  }

  function handleReset() {
    if (window.confirm('Reset menu to defaults? This will remove all custom items and restore the original menu.')) {
      setItems(DEFAULT_MENU);
    }
  }

  // Group existing items for display
  const grouped = CATEGORY_ORDER.reduce((acc, cat) => {
    const catItems = items.filter(item => item.category === cat);
    if (catItems.length > 0) acc[cat] = catItems;
    return acc;
  }, {});

  items.forEach(item => {
    if (!CATEGORY_ORDER.includes(item.category)) {
      if (!grouped[item.category]) grouped[item.category] = [];
      if (!grouped[item.category].find(i => i.id === item.id)) {
        grouped[item.category].push(item);
      }
    }
  });

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow-sm border p-4 mb-5">
            <h2 className="mb-4 fw-bold text-secondary">Edit Menu</h2>

            <form onSubmit={handleSubmit}>
              {/* Item Name */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Item Name</label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="e.g., Biscuits, Sourdough..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              {/* Price Field */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Price ($)</label>
                <div className="input-group">
                  <span className="input-group-text">$</span>
                  <input
                    type="number"
                    step="0.01"
                    className="form-control form-control-lg"
                    placeholder="0.00"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Category Dropdown */}
              <div className="mb-4">
                <label className="form-label fw-semibold">Category</label>
                <select
                  className="form-select form-select-lg"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {CATEGORY_ORDER.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Action Buttons */}
              <div className="d-flex gap-2">
                <button type="submit" className="btn btn-success btn-lg flex-grow-1">
                  Save Item
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary btn-lg"
                  onClick={() => navigate('/')}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>

          {/* Current Menu Items with Remove buttons */}
          <div className="card shadow-sm border p-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="fw-bold text-secondary mb-0">Current Menu Items</h5>
              <button
                type="button"
                className="btn btn-outline-danger btn-sm"
                onClick={handleReset}
              >
                Reset Menu
              </button>
            </div>

            {items.length === 0 ? (
              <p className="text-muted">No items yet.</p>
            ) : (
              Object.entries(grouped).map(([category, catItems]) => (
                <div key={category} className="mb-3">
                  <h6 className="fw-bold text-uppercase text-muted border-bottom pb-1 mb-2">
                    {category}
                  </h6>
                  {catItems.map(item => (
                    <div
                      key={item.id}
                      className="d-flex justify-content-between align-items-center py-1"
                    >
                      <div>
                        <span className={`me-2 ${item.soldOut ? 'text-muted text-decoration-line-through' : ''}`}>
                          {item.name}
                        </span>
                        <span className="text-success fw-bold">
                          ${parseFloat(item.price).toFixed(2)}
                        </span>
                      </div>
                      <button
                        type="button"
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => handleRemove(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              ))
            )}
          </div>

          {/* Back button */}
          <div className="d-flex justify-content-end mt-3">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate('/')}
            >
              ← Back to Menu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}