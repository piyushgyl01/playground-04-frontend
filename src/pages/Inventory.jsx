import { useState } from "react";
import useFetch from "../useFetch";
import { Link } from "react-router";

export default function Inventory() {
  //STATE
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  //DATA FETCH
  const { data, loading, error, refetch } = useFetch(
    "https://playground-04-backend.vercel.app/api/get-inventory"
  );

  //FILTERING FUNCTION
  const filteredData =
    categoryFilter === "All"
      ? data
      : data.filter((item) => item.category === categoryFilter);

  //HANDLE DELETE FUNCTION
  const handleDelete = async (id) => {
    if (!editedData.name || !editedData.title || !editedData.department) {
      setToastMessage("All fields are required");
      setToast(true);
      return;
    }

    try {
      const response = await fetch(
        `https://playground-04-backend.vercel.app/api/delete-inventory/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setToastMessage("Item Deleted Successfully");
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 3000);
        refetch();
      } else {
        setToastMessage("Failed to delete item");
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 3000);
        throw new Error();
      }
    } catch (error) {
      console.log("UNABLE TO DELETE ITEM");
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

      <main className="my-5 container">
        <h1 className="text-center">Item List</h1>

        {/* LOADING AND ERROR STATES */}
        {loading && <p className="text-center">Loading...</p>}
        {error && <p className="text-center">Error...</p>}

        {/* FILTER SELECT TAG */}
        <div className="my-4">
          <label htmlFor="categorySelect" className="form-label">
            Filter By Category:
          </label>
          <select
            onChange={(e) => setCategoryFilter(e.target.value)}
            id="categorySelect"
            className="form-select"
            value={categoryFilter}
          >
            <option value="All">All</option>
            <option value="Perishable">Perishable</option>
            <option value="Non-Perishable">Non-Perishable</option>
          </select>
        </div>

        {/* ITEMS UNORDERED LIST */}
        {filteredData && (
          <ul className="list-group">
            {filteredData?.map((item) => (
              <li key={item._id} className="list-group-item">
                <Link
                  style={{ cursor: "pointer" }}
                  to={`/inventory/${item.itemName}/${item._id}`}
                  className="text-decoration-none text-dark"
                >
                  {item.itemName} - Quanity: {item.quantity} - Category:{" "}
                  {item.category}
                </Link>
                <button
                  className="btn btn-danger float-end"
                  onClick={() => handleDelete(item._id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </main>
    </>
  );
}
