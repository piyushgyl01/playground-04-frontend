import { useParams } from "react-router";
import useFetch from "../useFetch";
import { useState } from "react";

export default function InventoryDetails() {
  //STATES
  const [editedData, setEditedData] = useState({
    itemName: "",
    quantity: 1,
    category: "",
  });
  const [showEdit, setShowEdit] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  //GETTING ID FROM URL THROUGH USE PARAMS
  const { itemID } = useParams();

  //DATA FETCH
  const { data, loading, error, refetch } = useFetch(
    "https://playground-04-backend.vercel.app/api/get-inventory"
  );

  //FINDING THE ITEM THROUGH ID
  const foundItem = data?.find((data) => data._id === itemID);

  //EDIT HANDLER FUNCTION
  const handleEdit = async () => {
    try {
      const response = await fetch(
        `https://playground-04-backend.vercel.app/api/update-inventory/${itemID}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedData),
        }
      );

      if (response.ok) {
        refetch();
        setShowToast(true);
        setToastMessage("Item edited successfully");
        setTimeout(() => setToast(false), 3000);
        setEditedData({
          name: "",
          title: "",
          department: "",
        });
        setShowEdit(false);
      } else {
        setShowToast(true);
        setToastMessage("Failed to edit the item");
        setTimeout(() => setToast(false), 3000);
        throw new Error();
      }
    } catch (error) {
      console.log("UNABLE TO EDIT THE ITEM", error);
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

      <main className="container my-5">
        <h1 className="text-center py-3">Inventory Details</h1>
        {/* LOADING AND ERROR STATES */}
        {loading && <p className="text-center">Loading...</p>}
        {error && <p className="text-center">Error...</p>}

        {/* ITEMS DISPLAY */}
        {data && (
          <div className="card p-4">
            <h2 className="h4 mb-3">{foundItem?.itemName}</h2>
            <p className="fs-5 mb-2">
              Quantity: <span>{foundItem?.quantity}</span>
            </p>
            <p className="fs-5">
              Category:{" "}
              <span className="badge bg-secondary">{foundItem?.category}</span>
            </p>
            <button
              className="btn btn-primary"
              onClick={() => setShowEdit(!showEdit)}
            >
              {showEdit ? "Cancel" : `Edit ${foundItem?.itemName}`}
            </button>
          </div>
        )}

        {/* EDIT FORM */}
        {showEdit && (
          <>
            <h1 className="text-center my-4">Add Inventory Details</h1>
            <div className="my-3">
              <label htmlFor="itemNameInput" className="form-label">
                Item Name:
              </label>
              <input
                value={editedData.itemName}
                onChange={(e) =>
                  setEditedData({ ...editedData, itemName: e.target.value })
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
                value={editedData.quantity}
                onChange={(e) =>
                  setEditedData({ ...editedData, quantity: e.target.value })
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
                value={editedData.category}
                onChange={(e) =>
                  setEditedData({ ...editedData, category: e.target.value })
                }
                id="categorySelect"
                className="form-select"
              >
                <option value="None Selected">None Selected</option>
                <option value="Perishable">Perishable</option>
                <option value="Non-Perishable">Non-Perishable</option>
              </select>
            </div>

            <button
              className="btn btn-primary mt-3"
              onClick={() => handleEdit()}
            >
              Save Changes
            </button>
          </>
        )}
      </main>
    </>
  );
}
