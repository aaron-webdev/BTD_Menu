import { Link } from 'react-router-dom';
import GreetingBlock from './greetingBlock';

const CATEGORY_ORDER = ['Breads', 'Sourdough', 'Hand Pies', 'Cookies', 'Biscuits', 'Pastries', 'Take and Bake', 'Scones'];

export default function MenuPage({ items, setItems }) {

  function toggleSoldOut(id) {
    setItems(prev =>
      prev.map(item => item.id === id ? { ...item, soldOut: !item.soldOut } : item)
    );
  }

  // Build grouped categories, ordered by CATEGORY_ORDER
  function buildGroups(flavorFilter) {
    const grouped = [];

    CATEGORY_ORDER.forEach(cat => {
      const catItems = items.filter(i => i.category === cat && i.flavor === flavorFilter);
      if (catItems.length > 0) grouped.push({ category: cat, catItems });
    });

    // Catch custom categories not in CATEGORY_ORDER
    items.forEach(item => {
      if (!CATEGORY_ORDER.includes(item.category) && item.flavor === flavorFilter) {
        const existing = grouped.find(g => g.category === item.category);
        if (existing) {
          if (!existing.catItems.find(i => i.id === item.id)) existing.catItems.push(item);
        } else {
          grouped.push({ category: item.category, catItems: [item] });
        }
      }
    });

    return grouped;
  }

  const sweetGroups  = buildGroups('sweet');
  const savoryGroups = buildGroups('savory');

  function renderColumn(groups, columnLabel) {
    return (
      <div className="card border shadow-sm h-100">
        <div className="card-body px-4 py-3">
          {/* Column Header */}
          <h2 className="text-center fw-bold text-uppercase border-bottom pb-2 mb-4"
            style={{ letterSpacing: '0.08em', fontSize: '2rem' }}>
            {columnLabel}
          </h2>

          {groups.length === 0 ? (
            <p className="text-muted text-center">No items yet.</p>
          ) : (
            groups.map(({ category, catItems }) => (
              <div key={category} className="mb-4">
                {/* Category Title */}
                <h5 className="fw-bold text-uppercase border-bottom pb-1 mb-2 text-secondary"
                  style={{ letterSpacing: '0.05em', fontSize: '1.1rem' }}>
                  {category}
                </h5>

                {/* Items */}
                {catItems.map(item => (
                  <div
                    key={item.id}
                    onClick={() => toggleSoldOut(item.id)}
                    className="d-flex justify-content-between align-items-center border-bottom py-2"
                    style={{ cursor: 'pointer' }}
                  >
                    <span style={{
                      fontSize: '1.2rem',
                      fontWeight: '500',
                      color: item.soldOut ? '#aaa' : '#212529',
                      textDecoration: item.soldOut ? 'line-through' : 'none',
                    }}>
                      {item.name}
                    </span>
                    <span style={{
                      fontSize: '1.2rem',
                      fontWeight: '700',
                      color: item.soldOut ? '#aaa' : '#198754',
                      marginLeft: '1rem',
                      whiteSpace: 'nowrap',
                    }}>
                      ${parseFloat(item.price).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            ))
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid px-4 py-4">

      {/* Greeting Section */}
      <div className="card border mb-4 px-4 py-3">
        <GreetingBlock />
      </div>

      {items.length === 0 && (
        <div className="text-center text-muted fs-4 mt-5">
          No bakery items added yet. Click Edit Menu to get started!
        </div>
      )}

      {/* Sweet | Savory two-column layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        {renderColumn(sweetGroups,  'Sweets')}
        {renderColumn(savoryGroups, 'Savory')}
      </div>

      {/* Edit Menu button */}
      <div style={{ position: 'fixed', bottom: '0.5rem', right: '0.5rem' }}>
        <Link to="/add-item" className="btn btn-success">
          Edit Menu
        </Link>
      </div>
    </div>
  );
}