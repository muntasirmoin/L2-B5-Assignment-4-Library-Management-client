import { Outlet } from "react-router-dom";
import "./App.css";
import Footer from "./components/layout/shared/Footer";
import Navbar from "./components/layout/shared/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
