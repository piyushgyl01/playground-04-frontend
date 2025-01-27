import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.jsx";
import Navbar from "./components/Navbar.jsx";
import Inventory from "./pages/Inventory.jsx";
import InventoryDetails from "./pages/InventoryDetails.jsx";
import AddInventory from "./pages/AddInventory.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: "/inventory",
        element: <Inventory />,
      },
      {
        path: "/inventory/:itemName/:itemID",
        element: <InventoryDetails />,
      },
      {
        path: "/add-inventory",
        element: <AddInventory />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
