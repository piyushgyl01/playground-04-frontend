import { useState } from "react";
import { useNavigate } from "react-router";

export default function AddInventory() {
  //NAVIGATE
  const navigate = useNavigate();

  //STATES
  const [postedData, setPostedData] = useState({})
  return (
    <>
      <main className="container my-5">
        <h1 className="text-center">Add Inventory</h1>
        <div className="my-3">
          <label htmlFor="itemNameInput" className="form-label">
            Item Name:
          </label>
          <input type="text" className="form-control" id="itemNameInput" />
        </div>
        <div className="mt-3">
          <label htmlFor="itemQuantityInput" className="form-label">
            Quantity:
          </label>
          <input
            type="number"
            className="form-control"
            id="itemQuantityInput"
          />
        </div>
        <div className="mt-3">
          <label htmlFor="categorySelect" className="form-label">
            Category:
          </label>
          <select id="categorySelect" className="form-select">
            <option value="None Selected">None Selected</option>
            <option value="Perishable">Perishable</option>
            <option value="Non-Perishable">Non-Perishable</option>
          </select>
        </div>
        <button className="btn btn-primary mt-3">Add to Inventory</button>
      </main>
    </>
  );
}
