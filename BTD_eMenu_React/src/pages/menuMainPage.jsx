import { Link } from 'react-router-dom';
import GreetingBlock from './greetingBlock';

// Defines the display order for categories
const CATEGORY_ORDER = ['Breads', 'Sourdough', 'Hand Pies', 'Cookies', 'Biscuits', 'Pastries', 'Take and Bake'];

export default function MenuPage({ items, setItems }) {
  // Toggle sold-out status for a single item
  function toggleSoldOut(id) {
    setItems(prev =>
      prev.map(item => item.id === id ? { ...item, soldOut: !item.soldOut } : item)
    );
  }

  // Group items by category, preserving CATEGORY_ORDER sort
  const grouped = CATEGORY_ORDER.reduce((acc, cat) => {
    const catItems = items.filter(item => item.category === cat);
    if (catItems.length > 0) acc[cat] = catItems;
    return acc;
  }, {});

  // Catch any categories not in CATEGORY_ORDER (user-added custom ones)
  items.forEach(item => {
    if (!CATEGORY_ORDER.includes(item.category)) {
      if (!grouped[item.category]) grouped[item.category] = [];
      if (!grouped[item.category].find(i => i.id === item.id)) {
        grouped[item.category].push(item);
      }
    }
  });

  const hasItems = items.length > 0;

  return (
    <div className="container my-5">
      <GreetingBlock />

      {!hasItems ? (
        <div className="col text-center text-muted py-5 bg-light rounded border">
          <p className="mb-0 fs-5">No bakery items added yet. Click the button below to get started!</p>
        </div>
      ) : (
        <div>
          {Object.entries(grouped).map(([category, catItems]) => (
            <div key={category} className="mb-4">
              {/* Category Header */}
              <h5 className="fw-bold text-uppercase text-secondary border-bottom pb-1 mb-2 ls-wide">
                {category}
              </h5>

              {catItems.map(item => (
                <div
                  key={item.id}
                  className="d-flex justify-content-between align-items-center border-bottom py-2 px-1"
                  onClick={() => toggleSoldOut(item.id)}
                  style={{ cursor: 'pointer' }}
                  title={item.soldOut ? 'Click to mark in stock' : 'Click to mark sold out'}
                >
                  <span
                    className={`fs-5 ${item.soldOut ? 'text-muted text-decoration-line-through' : 'text-dark fw-medium'}`}
                  >
                    {item.name}
                    {item.soldOut && (
                      <span className="ms-2 badge bg-secondary fw-normal" style={{ fontSize: '0.65rem' }}>
                        Sold Out
                      </span>
                    )}
                  </span>
                  <span className={`fw-bold fs-5 ${item.soldOut ? 'text-muted' : 'text-success'}`}>
                    ${parseFloat(item.price).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* Add Item button pinned bottom-right */}
      <div className="d-flex justify-content-end mt-4 fixed-bottom text-end px-2 py-2">
        <Link to="/add-item" className="btn btn-success btn-sm">
          Add New Item
        </Link>
      </div>
    </div>
  );
}