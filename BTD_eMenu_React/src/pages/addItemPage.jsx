import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddItemPage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Pastries');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ name, price, category });
    navigate('/'); // Returns to the home page after the item is added
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow-sm border p-4">
            <h2 className="mb-4 fw-bold text-secondary">Add Bakery Item</h2>
            
            <form onSubmit={handleSubmit}>
              {/* Item Name Field */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Item Name</label>
                <input 
                  type="text" 
                  className="form-control form-control-lg" 
                  placeholder="e.g., Croissant, Sourdough..." 
                  value={name} 
                  onChange={e => setName(e.target.value)} 
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
                    onChange={e => setPrice(e.target.value)} 
                    required 
                  />
                </div>
              </div>

              {/* Category Dropdown Selection */}
              <div className="mb-4">
                <label className="form-label fw-semibold">Category</label>
                <select 
                  className="form-select form-select-lg" 
                  value={category} 
                  onChange={e => setCategory(e.target.value)}
                >
                  <option value="Pastries">Pastries</option>
                  <option value="Breads">Breads</option>
                  <option value="Sourdough">Sourdough</option>
                  <option value="Hand_Pies">Hand Pies</option>
                  <option value="Cookies">Cookies</option>
                  <option value="Take_and_Bake">Take and Bake</option>
                </select>
              </div>

              {/* Action Trigger Buttons */}
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
        </div>
      </div>
    </div>
  );
}