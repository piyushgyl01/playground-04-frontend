import { Link } from "react-router";

export default function App() {
  return (
    <>
      <main className="container">
        <section className="p-4 my-5 rounded bg-success text-light">
          <h1>Welcome to Inventory Management</h1>
          <p>
            Efficiently manage your invetory with our simple inventory
            management system.
          </p>
          <hr />
          <p>Explore the features using the navigation links above.</p>
        </section>
        <section className="my-5 px-4">
          <h1>Inventory List</h1>
          <p>View and manage the list of items in your system.</p>
          <Link to="/inventory" className="btn btn-success">
            Inventory List
          </Link>
        </section>
        <section className="my-5 px-4">
          <h1>Add Items</h1>
          <p>Add a new item to the system with necessary details.</p>
          <Link to="add-inventory" className="btn btn-success">
            Add Inventory Iteme
          </Link>
        </section>
      </main>
    </>
  );
}
