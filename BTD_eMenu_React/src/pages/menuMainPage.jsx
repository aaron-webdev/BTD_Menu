import { Link } from 'react-router-dom';
import GreetingBlock from './greetingBlock'; 

export default function MenuPage({ items }) {
  return (
    <div className="container my-5">
      {/* Greeting block header element */}
      <GreetingBlock />

      {/* Menu Display Field */}
      <div className="row">
        <div className="col text-center text-muted py-5 bg-light rounded border">
          {items.length === 0 ? (
            <p className="mb-0 fs-5">No bakery items added yet. Click the button below to get started!</p>
          ) : (
            <div className="text-start px-3">
              {items.map((item, index) => (
                <div key={index} className="border-bottom py-2 d-flex justify-content-between align-items-center">
                  <span><strong>{item.name}</strong> <span className="text-secondary">({item.category})</span></span>
                  <span className="fw-bold text-success">${item.price}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Add Item Button pinned to the bottom right area of the screen */}
      <div className="d-flex justify-content-end mt-4 fixed-bottom text-end px-2 py-2">
        <Link to="/add-item" className="btn btn-success btn-sm">
          Add New Item
        </Link>
      </div>
    </div>
  );
}