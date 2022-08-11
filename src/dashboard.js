import Home from "./pages/New/home/Home";
import { Routes, Route, useLocation } from "react-router-dom";
import UserList from "./pages/List/userList/UserList";
import User from "./pages/New/newUser/NewUser";
import Upuser from "./pages/Update/upUser/upUser";
import NewUser from "./pages/New/newUser/NewUser";
import ProductList from "./pages/List/productList/ProductList";
import Product from "./pages/Update/product/Product";
import NewProduct from "./pages/New/newProduct/NewProduct";
import NewVar from "./pages/New/newProduct/variant";
import UpOption from "./pages/Update/product/option";
import UpVariant from "./pages/Update/product/variant";
import NewOption from "./pages/New/newProduct/options";
import Ship from "./pages/List/ship/shipping";
import Discount from "./pages/New/discount/Discount";
import Shipping from "./pages/New/newShipping/newShipping";
import UpOrders from "./pages/Update/upOrders/upOrder";
import OrderList from "./pages/List/orderList/orderList";
import Category from "./pages/New/categories/category";
import Upcategory from "./pages/Update/upCategory/upCategory";
import UpShipping from "./pages/Update/upShipping/upShipping";
import Profile from "./pages/New/profile/profile";
import ProfileUp from "./pages/Update/upProfile/profileUd";
import Plan from "./pages/New/plan/plan";
import Store from "./pages/New/store/store";
import CategoryL from "./pages/List/categoriesList/categoriesList";
import DiscountL from "./pages/List/discountList/discountList";
import UpDiscount from "./pages/Update/upDiscount/upDiscount";
import Refund from "./pages/List/refund/refund";
import UpRefund from "./pages/Update/upRefund/uprefund";
import UpStore from "./pages/Update/upStore/upStore";
import ThemeF from "./pages/themes/Theme_first"

export default function Dashboard() {
  const location = useLocation();
  return (
    
    <Routes location={location} key={location.pathname}>
      <Route path="/home" element={<Home />} />
      <Route path="/users" element={<UserList />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/nvar" element={<NewVar />} />
      <Route path="/noption" element={<NewOption />} />
      <Route path="/plan" element={<Plan />} />
      <Route path="/themef" element={<ThemeF />} />
      <Route path="/store" element={<Store />} />
      <Route path="/upstore" element={<UpStore />} />
      <Route path="/ctgL" element={<CategoryL />} />
      <Route path="/userup/:userId" element={<Upuser />} />
      <Route path="/disL" element={<DiscountL />} />
      <Route path="/profileup" element={<ProfileUp />} />
      <Route path="/refund" element={<Refund />} />
      <Route path="/upoption" element={<UpOption />} />
      <Route path="/upvariant" element={<UpVariant />} />
      <Route path="/ship/:testId" element={<UpShipping />} />
      <Route path="/user/:userId" element={<User />} />
      <Route path="/uprefund/:refundId" element={<UpRefund />} />
      <Route path="/ctg/:ctgId" element={<Upcategory />} />
      <Route path="/uporder/:ordId" element={<UpOrders />} />
      <Route path="/newUser" element={<NewUser />} />
      <Route path="/products" element={<ProductList />} />
      <Route path="/product/:productId" element={<Product />} />
      <Route path="/newproduct" element={<NewProduct />} />
      <Route path="/discount" element={<Discount />} />
      <Route path="/discount/:disId" element={<UpDiscount />} />
      <Route path="/newShipping" element={<Shipping />} />
      <Route path="/shipping" element={<Ship />} />
      <Route path="/orderList" element={<OrderList />} />
      <Route path="/category" element={<Category />} />
    </Routes>
  );
}
