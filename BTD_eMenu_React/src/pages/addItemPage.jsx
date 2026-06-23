import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DEFAULT_MENU } from '../App';

const CATEGORY_ORDER = ['Breads', 'Sourdough', 'Hand Pies', 'Cookies', 'Biscuits', 'Pastries', 'Take and Bake', 'Scones'];

const ALWAYS_SWEET  = ['Cookies', 'Pastries'];
const ALWAYS_SAVORY = ['Breads', 'Sourdough', 'Biscuits'];

function getAutoFlavor(category) {
  if (ALWAYS_SWEET.includes(category))  return 'sweet';
  if (ALWAYS_SAVORY.includes(category)) return 'savory';
  return null;
}

export default function AddItemPage({ items, setItems }) {
  const navigate = useNavigate();
  const [name, setName]         = useState('');
  const [price, setPrice]       = useState('');
  const [category, setCategory] = useState('Breads');
  const [flavor, setFlavor]     = useState('savory');

  function handleCategoryChange(newCat) {
    setCategory(newCat);
    const auto = getAutoFlavor(newCat);
    if (auto) setFlavor(auto);
  }

  const autoFlavor     = getAutoFlavor(category);
  const showFlavorPick = autoFlavor === null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const resolvedFlavor = autoFlavor ?? flavor;
    setItems([...items, { id: Date.now(), name, price, category, flavor: resolvedFlavor, soldOut: false }]);
    setName('');
    setPrice('');
    setCategory('Breads');
    setFlavor('savory');
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

  function toggleSoldOut(id) {
    setItems(prev =>
      prev.map(item => item.id === id ? { ...item, soldOut: !item.soldOut } : item)
    );
  }

  // Group items by category for both panels
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

          {/* ── Add Item Form ── */}
          <div className="card shadow-sm border p-4 mb-4">
            <h2 className="mb-4 fw-bold text-secondary">Edit Menu</h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-semibold">Item Name</label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="e.g., Cheddar Biscuit, Lemon Scone..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

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

              <div className="mb-3">
                <label className="form-label fw-semibold">Category</label>
                <select
                  className="form-select form-select-lg"
                  value={category}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                >
                  {CATEGORY_ORDER.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {showFlavorPick && (
                <div className="mb-4">
                  <label className="form-label fw-semibold">Flavor</label>
                  <div className="d-flex gap-4">
                    <div className="form-check">
                      <input className="form-check-input" type="radio" id="flavorSweet"
                        value="sweet" checked={flavor === 'sweet'} onChange={() => setFlavor('sweet')} />
                      <label className="form-check-label fs-5" htmlFor="flavorSweet">Sweet</label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="radio" id="flavorSavory"
                        value="savory" checked={flavor === 'savory'} onChange={() => setFlavor('savory')} />
                      <label className="form-check-label fs-5" htmlFor="flavorSavory">Savory</label>
                    </div>
                  </div>
                </div>
              )}

              <div className="d-flex gap-2">
                <button type="submit" className="btn btn-success btn-lg flex-grow-1">Save Item</button>
                <button type="button" className="btn btn-outline-secondary btn-lg"
                  onClick={() => navigate('/')}>Cancel</button>
              </div>
            </form>
          </div>

          {/* ── Sold Out / In Stock Toggle Panel ── */}
          <div className="card shadow-sm border p-4 mb-4">
            <h5 className="fw-bold text-secondary mb-3">Availability</h5>
            <p className="text-muted small mb-3">Toggle items between In Stock and Sold Out.</p>

            {items.length === 0 ? (
              <p className="text-muted">No items yet.</p>
            ) : (
              Object.entries(grouped).map(([cat, catItems]) => (
                <div key={cat} className="mb-3">
                  <h6 className="fw-bold text-uppercase text-muted border-bottom pb-1 mb-2">{cat}</h6>
                  {catItems.map(item => (
                    <div key={item.id}
                      className="d-flex justify-content-between align-items-center py-2 border-bottom">
                      <span className={item.soldOut ? 'text-muted text-decoration-line-through' : 'text-dark'}>
                        {item.name}
                      </span>
                      <button
                        type="button"
                        onClick={() => toggleSoldOut(item.id)}
                        className={`btn btn-sm ${item.soldOut ? 'btn-secondary' : 'btn-success'}`}
                        style={{ minWidth: '90px' }}
                      >
                        {item.soldOut ? 'Sold Out' : 'In Stock'}
                      </button>
                    </div>
                  ))}
                </div>
              ))
            )}
          </div>

          {/* ── Remove Items Panel ── */}
          <div className="card shadow-sm border p-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="fw-bold text-secondary mb-0">Remove Items</h5>
              <button type="button" className="btn btn-outline-danger btn-sm" onClick={handleReset}>
                Reset Menu
              </button>
            </div>

            {items.length === 0 ? (
              <p className="text-muted">No items yet.</p>
            ) : (
              Object.entries(grouped).map(([cat, catItems]) => (
                <div key={cat} className="mb-3">
                  <h6 className="fw-bold text-uppercase text-muted border-bottom pb-1 mb-2">{cat}</h6>
                  {catItems.map(item => (
                    <div key={item.id} className="d-flex justify-content-between align-items-center py-1">
                      <div>
                        <span className={`me-2 ${item.soldOut ? 'text-muted text-decoration-line-through' : ''}`}>
                          {item.name}
                        </span>
                        <span className="text-success fw-bold">${parseFloat(item.price).toFixed(2)}</span>
                        <span className="ms-2 badge bg-light text-secondary border" style={{ fontSize: '0.7rem' }}>
                          {item.flavor}
                        </span>
                      </div>
                      <button type="button" className="btn btn-outline-danger btn-sm"
                        onClick={() => handleRemove(item.id)}>
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              ))
            )}
          </div>

          <div className="d-flex justify-content-end mt-3">
            <button type="button" className="btn btn-secondary" onClick={() => navigate('/')}>
              ← Back to Menu
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}