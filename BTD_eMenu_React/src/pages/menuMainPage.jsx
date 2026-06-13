import { Link } from 'react-router-dom';
import GreetingBlock from './greetingBlock'; 

export default function MenuPage({ items }) {
  // Define the exact list of categories to display as headers on the menu
  const categories = ["Breads", "Sourdough", "Cookies", "Biscuits", "Pastries", "Hand Pies", "Take and Bake"];

  return (
    <div className="container my-5">
      {/* Greeting block header element */}
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
                // Filter items that belong strictly to the current category loop
                const filteredItems = items.filter(item => item.category === category);
                
                // If a category has no items added yet, don't show the header section
                if (filteredItems.length === 0) return null;

                return (
                  <div key={category} className="mb-4">
                    {/* Category Header Section with uppercase styling and bottom border */}
                    <h6 className="text-uppercase text-muted fw-bold border-bottom pb-2 mb-3 letter-spacing">
                      {category}
                    </h6>
                    
                    {/* List of items inside this specific category */}
                    <div className="mb-2">
                      {filteredItems.map((item, index) => (
                        <div key={index} className="py-2 d-flex justify-content-between align-items-center border-bottom border-light">
                          <span className="text-dark fw-semibold">{item.name}</span>
                          <span className="fw-bold text-success">${parseFloat(item.price).toFixed(2)}</span>
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

      {/* Edit Menu Button pinned to the bottom right area of the screen */}
      <div className="d-flex justify-content-end mt-4 fixed-bottom text-end px-2 py-2">
        <Link to="/add-item" className="btn btn-success btn-sm">
          Edit Menu
        </Link>
      </div>
    </div>
  );
}
