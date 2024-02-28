import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import Routes
import Admin from "./components/admin";
import AddNewProduct from "./components/addNewProduct";

function App() {
  return (
    <>
      <Router>
        <Routes> {/* Wrap Routes around Route components */}
          <Route path="/" element={<Admin />} /> {/* Use element prop */}
          <Route path="/addProduct" element={<AddNewProduct />} /> {/* Use element prop */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
