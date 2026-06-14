import { Link } from 'react-router-dom';
import GreetingBlock from './greetingBlock'; 

export default function MenuPage({ items }) {

  const categories = ["Breads", "Sourdough", "Cookies", "Biscuits", "Pastries", "Hand Pies", "Take and Bake", "Scones"];

  return (
    <div className="container my-5">
      <GreetingBlock />

      {/* Menu Display Field */}
      <div className="row mt-4">
        <div className="col px-3">
          {items.length === 0 ? (
            <div className="text-muted">
              <p className="fs-5">No bakery items added yet. Click the button below to get started!</p>
            </div>
          ) : (
            <div>
              {categories.map((category) => {
                // Filter items by category
                const filteredItems = items.filter(item => item.category === category);
                
                // Only show categories with items
                if (filteredItems.length === 0) return null;

                return (
                  <div key={category} className="mb-4">
                    {/* Category Header*/}
                    <h5 className="text-uppercase fw-bold border-bottom pb-2 mb-3 letter-spacing">
                      {category}
                    </h5>
                    
                    {/*Items in category*/}
                    <div className="mb-2">
                      {filteredItems.map((item, index) => (
                        <div key={index} className="py-2 d-flex justify-content-between align-items-center border-bottom border-light">
                          <span className="text-dark fw-semibold fs-5">{item.name}</span>
                          <span className="fw-bold text-success fs-5">${parseFloat(item.price).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Edit Menu Button */}
      <div className="d-flex justify-content-end mt-4 fixed-bottom text-end px-2 py-2">
        <Link to="/add-item" className="btn btn-success btn-sm">
          Edit Menu
        </Link>
      </div>
    </div>
  );
}
