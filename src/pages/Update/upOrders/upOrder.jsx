import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import "./orders.css";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function User() {
  const [allData, setData] = useState([]);
  const [product, setProduct] = useState([]);
  const ord = useParams();
  const [requestSuccess, setRequestSuccess] = useState("");
  const [status, setStatus] = useState("");
  const [open, setOpen] = React.useState(false);
  const [msg, setMsg] = useState("");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  async function addOrder() {
    let items = { status };
    let result = await fetch(
      "https://websitebuild.herokuapp.com/api/shop-owner/update_order/" +
        ord.ordId,
      {
        method: "POST",
        body: JSON.stringify(items),
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
          Accept: "application/json",
          "auth-token": localStorage.getItem("user-info"),
        },
      }
    );
    result = await result.json();
    setRequestSuccess(true);
    if (result.msg.includes("required")) {
      setRequestSuccess(false);
    }
    setOpen(true);
    setMsg(result);
  }
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const data = await fetch(
      "https://websitebuild.herokuapp.com/api/shop-owner/show-order/" +
        ord.ordId,
      {
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
          Accept: "application/json",
          "auth-token": localStorage.getItem("user-info"),
        },
      }
    );
    const result = await data.json();
    setData(result.data);
    setProduct(result.data.Products);
  };

  const total =
    allData.subtotal_price + allData.discounts + allData.shipping_price;

  const handleSelect = (e) => {
    const value = e.target.value;
    setStatus(
      {
        [e.target.name]: value,
      }.status
    );
  };

  return (
    <div className="user1">
      <div className="userTitleContainer1">
        <h1 className="userTitle1">Update Order</h1>
      </div>
      <div className="userContainer1">
        <div className="flex">
          <div className="userUpdate2">
            <div className="userUpdateTitle">ORDER</div>
            <div className="userUpdateForm">
              <div className="userUpdateLeft">
                <div className="userUpdateItem1">
                  <h5 className="prd">Products</h5>
                  <div>
                    <button className="btn2" onClick={addOrder}>
                      + Update Order
                    </button>
                    <Snackbar
                      open={open}
                      autoHideDuration={2000}
                      onClose={handleClose}
                    >
                      <Alert
                        severity={requestSuccess ? "success" : "error"}
                        onClose={handleClose}
                        sx={{ width: "100%" }}
                      >
                        {msg.msg}
                      </Alert>
                    </Snackbar>
                  </div>
                </div>
                <div>
                  {product.map((item) => (
                    <p className="prd-nm">{item?.name}</p>
                  ))}
                </div>
                <div>
                  {product.map((item) => (
                    <h5 className="">{item?.option1}</h5>
                  ))}
                  {product.map((item) => (
                    <p>{item?.variant1}</p>
                  ))}
                </div>
                <div>
                  {product.map((item) => (
                    <h5>{item?.option2}</h5>
                  ))}
                  {product.map((item) => (
                    <p>{item?.variant2}</p>
                  ))}
                </div>
                <div className="userUpdateItem">
                  <h5>Quantity</h5>
                  {product.map((item) => (
                    <p>{item?.quantity}</p>
                  ))}
                </div>
                <div className="topbarIconContainer2">
                  <FormControl sx={{ m: 1, minWidth: 100 }}>
                    <InputLabel id="demo-simple-select-autowidth-label">
                      STATUS
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-autowidth-label"
                      id="demo-simple-select-autowidth"
                      name="status"
                      onChange={handleSelect}
                      autoWidth
                      label="Status"
                    >
                      <MenuItem>
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value="Pending">Pending</MenuItem>
                      <MenuItem value="Packing">Packing</MenuItem>
                      <MenuItem value="Delivering">Delivering</MenuItem>
                      <MenuItem value="Deliverd">Deliverd </MenuItem>
                      <MenuItem value="Cancelled">Cancelled</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
            </div>
          </div>
          <div className="userUpdate2">
            <div>
              <div className="userShowTitle3">Payment</div>
              <div className="flex2">
                <h5>Subtotal</h5>
                <h5 className="end">{allData.subtotal_price} EGP</h5>
              </div>
              <div className="flex2">
                <h5>Add shipping</h5>
                <h5 className="end">{allData.shipping_price} EGP</h5>
              </div>
              <div className="flex2">
                <h5>Add discound</h5>
                <h5 className="end">{allData.discounts} EGP</h5>
              </div>
              <div className="flex2">
                <h3 className="txt-tot">Total</h3>
                <h3 className="end-s">{total} EGP</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="userShow1">
          <div>
            <div className="userShowTopTitle1">
              <div className="userShowTitle1">Customer Email</div>
              <p>{allData.User}</p>
              <div className="userShowTitle12">NOTE</div>
              <p>{allData.note}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
