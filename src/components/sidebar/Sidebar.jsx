import "./sidebar.css";
import {
  LocalShipping,
  Pages,
  AttachMoney,
  LineStyle,
  PermIdentity,
  Storefront,
  LocalOffer,
} from "@material-ui/icons";
import LogoutIcon from "@mui/icons-material/Logout";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import { Link, useNavigate } from "react-router-dom";
import CategoryIcon from "@mui/icons-material/Category";

export default function Sidebar() {
  const navigate = useNavigate();

  async function Logout() {
     await fetch(
      "https://websitebuild.herokuapp.com/api/auth-shop-owner/logout",
      {
        method: "POST",
        headers: {
          "auth-token": localStorage.getItem("user-info"),
        },
      }
    );
    navigate("/");
  }
  if (
    window.location.pathname === "/" ||
    window.location.pathname === "/homepage" ||
    window.location.pathname === "/price" ||
    window.location.pathname === "/dash" ||
    window.location.pathname === "/reg" ||
    window.location.pathname === "/tutorial" ||
    window.location.pathname === "/about" ||
    window.location.pathname === "/forgot"
  ) {
    return null;
  } else
    return (
      <div className="sidebar">
        <div className="sidebarWrapper">
          <div className="sidebarMenu">
            <h3 className="sidebarTitle">Dashboard</h3>
            <ul className="sidebarList">
              <Link to="/home" className="link">
                <li className="sidebarListItem">
                  <LineStyle className="sidebarIcon" />
                  Home
                </li>
              </Link>
              <Link to="/themef" className="link">
                <li
                  className="sidebarListItem"
                  onClick={"sidebarListItem active"}
                >
                  <Pages className="sidebarIcon" />
                  Themes
                </li>
              </Link>
              <Link to="/ctgL" className="link">
                <li className="sidebarListItem">
                  <CategoryIcon className="sidebarIcon" />
                  Categories
                </li>
              </Link>
              <Link to="/products" className="link">
                <li className="sidebarListItem">
                  <Storefront className="sidebarIcon" />
                  Products
                </li>
              </Link>
              <Link to="/disL" className="link">
                <li className="sidebarListItem">
                  <LocalOffer className="sidebarIcon" />
                  Discount
                </li>
              </Link>
              <Link to="/shipping" className="link">
                <li className="sidebarListItem">
                  <LocalShipping className="sidebarIcon" />
                  Shipping
                </li>
              </Link>
              <Link to="/users" className="link">
                <li className="sidebarListItem">
                  <PermIdentity className="sidebarIcon" />
                  Customers
                </li>
              </Link>
              <Link to="/orderList" className="link">
                <li className="sidebarListItem">
                  <AttachMoney className="sidebarIcon" />
                  Orders
                </li>
              </Link>
              <Link to="/refund" className="link">
                <li className="sidebarListItem">
                  <CurrencyExchangeIcon className="sidebarIcon" />
                  Refund
                </li>
              </Link>
            </ul>
          </div>
        </div>
        <button className="sidebarListItem2" onClick={Logout}>
          Log Out
          <LogoutIcon className="sidebarIcon2" />
        </button>
      </div>
    );
}
