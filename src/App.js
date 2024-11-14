import "./App.css";
import { HashRouter as Router, Route, Routes } from "react-router-dom";

import ErrorNotification from "./Components/ErrorNotification"; 

import Dashboard from "./pages/dashboard/Dashboard";
import PrivateRoute from "./utils/PrivateRoute";
import Login from "./pages/login/Login";

import DisplayUser from "./pages/user/DisplayUser";
import AddUser from "./pages/user/AddUser";

import BannerList from "./pages/banner/List.js";
import BannerAdd from "./pages/banner/Add.js";
import BannerEdit from "./pages/banner/Edit.js";

import TermsAndConditions from "./pages/pages/TermsAndConditions";
import PrivacyPolicy from "./pages/pages/PrivacyPolicy";

import ProductCategoryList from "./pages/products/category/List.js";
import ProductCategoryAdd from "./pages/products/category/Add.js";
import ProductCategoryEdit from "./pages/products/category/Edit.js";

import ProductList from "./pages/products/ProductList";
import ProductAdd from "./pages/products/AddProduct.js";
import EditProduct from "./pages/products/EditProduct.js";

// restaurant
import PartnersList from "./pages/partners/List.js";
import PartnersAdd from "./pages/partners/Add.js";
import EditPartners from "./pages/partners/Edit.js";
import ViewPartners from "./pages/partners/View.js";

// tags
import TagList from "./pages/tags/List.js";
import TagAdd from "./pages/tags/Add.js";
import EditTag from "./pages/tags/Edit.js";

function App() {
  return (
    <Router>
      <ErrorNotification />
      <Routes>
        <Route path="/" exact element={<PrivateRoute />}>
          <Route index element={<Dashboard />} />
          <Route path="*" element={<> Not Ready</>} />

          {/* Dashboard Route */}
          <Route path="/dashboard" element={<Dashboard />} /> {/* Added Dashboard Route */}

          {/* User Routes */}
          <Route path="/users" element={<DisplayUser />} />
          <Route path="/AddUser" element={<AddUser />} />

          {/* Product tags Routes */}
          <Route path="/tags" element={<TagList />} />
          <Route path="/tags/add" element={<TagAdd />} />
          <Route path="/tags/edit/:id" element={<EditTag />} />

          {/* Product Category Routes */}
          <Route path="/category" element={<ProductCategoryList />} />
          <Route path="/category/add" element={<ProductCategoryAdd />} />
          <Route path="/category/edit/:id" element={<ProductCategoryEdit />} />

          {/* Product Routes */}
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/add" element={<ProductAdd />} />
          <Route path="/products/edit/:id" element={<EditProduct />} />

          {/* Partners Routes */}
          <Route path="/partners" element={<PartnersList />} />
          <Route path="/partners/add" element={<PartnersAdd />} />
          <Route path="/partners/edit/:id" element={<EditPartners />} />
          <Route path="/partners/views/:id" element={<ViewPartners />} />

          {/* Banner Routes */}
          <Route path="/banner" element={<BannerList />} />
          <Route path="/banner/add" element={<BannerAdd />} />
          <Route path="/banner/edit/:id" element={<BannerEdit />} />

          {/* Pages Routes */}
          <Route path="/displayTermsAndConditions" element={<TermsAndConditions />} />
          <Route path="/displayPrivacyPolicy" element={<PrivacyPolicy />} />
        </Route>

        {/* Login Route */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
