import { Route, Routes } from "react-router-dom";
import Products from "./pages/Products";
import Product from "./componants/Product";

const App = () => {
  return (
    <main>
      <Routes>
        <Route index path="/products" element={<Products />} />
        <Route path="/products/:productId" element={<Product />} />
      </Routes>
    </main>
  );
};

export default App;
