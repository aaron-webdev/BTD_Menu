import { Link } from 'react-router-dom';

export default function MenuPage() {
  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom">
        <h1 className="fw-bold text-dark">Bake That Dough Menu</h1>
        
        {/* Bootstrap styled primary action button */}
        <Link to="/add-item" className="btn btn-primary btn-lg shadow-sm">
          Add New Item
        </Link>
      </div>

      <div className="row">
        {/* Placeholder row for your bakery item listings */}
        <div className="col text-center text-muted py-5 bg-light rounded border">
          <p className="mb-0 fs-5">No bakery items added yet. Click the button above to get started!</p>
        </div>
      </div>
    </div>
  );
}
