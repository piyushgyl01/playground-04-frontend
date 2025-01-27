import { useState } from "react";
import { useNavigate } from "react-router";

export default function AddInventory() {
  //NAVIGATE
  const navigate = useNavigate();

  //STATES
  const [postedData, setPostedData] = useState({
    itemName: "",
    quantity: 1,
    category: "",
  });
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  //POST CALL HANDLING FUNCTION
  const handleCreate = async () => {
    if (!postedData.itemName || !postedData.quantity || !postedData.category) {
      setToastMessage("All fields are required");
      setShowToast(true);
      return;
    }

    try {
      const response = await fetch(
        "https://playground-04-backend.vercel.app/api/post-inventory",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postedData),
        }
      );

      if (response.ok) {
        setPostedData({
          itemName: "",
          quantity: "",
          category: "",
        });
        setToastMessage("Item added successfully");
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 3000);
        navigate("/inventory")
      } else {
        setToastMessage("Item added successfully");
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        });
        throw new Error();
      }
    } catch (error) {
      console.log("UNABLE TO ADD THE ITEM");
    }
  };
  return (
    <>
      {/* NOTIFICATION COMPONENT */}
      {showToast && (
        <div
          className="position-fixed top-0 end-0 p-3"
          style={{ zIndex: 1050 }}
        >
          <div
            className="toast show"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
          >
            <div className="toast-header">
              <strong className="me-auto">Notification</strong>
              <button
                type="button"
                className="btn-close"
                onClick={() => setShowToast(false)}
              ></button>
            </div>
            <div className="toast-body">{toastMessage}</div>
          </div>
        </div>
      )}

      {/* ADD ITEMS FORMS */}
      <main className="container my-5">
        <h1 className="text-center">Add Inventory</h1>
        <div className="my-3">
          <label htmlFor="itemNameInput" className="form-label">
            Item Name:
          </label>
          <input
            value={postedData.itemName}
            onChange={(e) =>
              setPostedData({ ...postedData, itemName: e.target.value })
            }
            type="text"
            className="form-control"
            id="itemNameInput"
          />
        </div>
        <div className="mt-3">
          <label htmlFor="itemQuantityInput" className="form-label">
            Quantity:
          </label>
          <input
            value={postedData.quantity}
            onChange={(e) =>
              setPostedData({ ...postedData, quantity: e.target.value })
            }
            type="number"
            className="form-control"
            id="itemQuantityInput"
          />
        </div>
        <div className="mt-3">
          <label htmlFor="categorySelect" className="form-label">
            Category:
          </label>
          <select
            value={postedData.category}
            onChange={(e) =>
              setPostedData({ ...postedData, category: e.target.value })
            }
            id="categorySelect"
            className="form-select"
          >
            <option value="None Selected">None Selected</option>
            <option value="Perishable">Perishable</option>
            <option value="Non-Perishable">Non-Perishable</option>
          </select>
        </div>
        <button onClick={() => handleCreate()} className="btn btn-primary mt-3">
          Add to Inventory
        </button>
      </main>
    </>
  );
}
