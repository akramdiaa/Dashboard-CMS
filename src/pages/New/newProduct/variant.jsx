import "./newProduct.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function NewProduct() {
  const [product_id, setProduct] = useState([]);
  const [option_id, setSo] = useState([]);
  const [show_p, setShow] = useState([]);
  const [show_p2, setShow2] = useState([]);
  const [value, setName] = useState("");
  const [quantity, setQnt] = useState("");
  const [msg, setMsg] = useState("");
  const [requestSuccess, setRequestSuccess] = useState("");

  const [open2, setOpen2] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen2(false);
  };
  async function addVariant() {
    let item = {
      value,
      product_id,
      quantity,
      option_id,
    };
    

    let result = await fetch(
      "http://websitebuild.herokuapp.com/api/shop-owner/add-variant",
      {
        method: "POST",
        body: JSON.stringify(item),
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
          Accept: "application/json",
          "auth-token": localStorage.getItem("user-info"),
        },
      }
    );
    result = await result.json();
    setRequestSuccess(true)
    if(result.msg.includes("required")){
      setRequestSuccess(false)
    }
    else if(result.msg.includes("been taken"))
    {
      setRequestSuccess(false)
    }
    else if(result.msg.includes("greater than"))
    {
      setRequestSuccess(false)
    }
    setOpen2(true);
    setMsg(result);
  }

  useEffect(() => {
    fetchData();
    fetchData2();
  }, []);
  const fetchData = async () => {
    const data = await fetch(
      "https://websitebuild.herokuapp.com/api/shop-owner/show-product/" +
        localStorage.getItem("Product_id"),
      {
        headers: {
          "auth-token": localStorage.getItem("user-info"),
        },
      }
    );
    const result = await data.json();
    setProduct(result?.data.product.id)
    setShow(result?.data.product);
  };

  const fetchData2 = async () => {
    const data = await fetch(
      "https://websitebuild.herokuapp.com/api/shop-owner/option-product/" +
        localStorage.getItem("Product_id"),
      {
        headers: {
          "auth-token": localStorage.getItem("user-info"),
        },
      }
    );
    const result = await data.json();
    setShow2(result.data);
  };

  const handleSelect2 = (e) => {
    const value = e?.target?.value;
    setSo(
      {
        [e.target.name]: value,
      }.option_id
    );
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle2">New Product</h1>
      <div className="addProductForm2">
        <h2 className="addProductTitle5">Last Step For Variants ..</h2>
        <div className="cont-pro3">
          <p className="txt-for">Option</p>
          <select className="select" onClick={handleSelect2} name="option_id">
            <option>Select Option</option>
            {show_p2.map((item) => (
              <option value={item?.id}>{item?.name}</option>
            ))}{" "}
          </select>
        </div>
        <div className="cont-pro3">
          <p className="txt-for">Variant Name</p>
          <input
            type="text"
            placeholder="Name .."
            className="txt-ed"
            value={value}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="cont-pro3">
          <p className="txt-for">Quantity</p>
          <input
            type="number"
            placeholder="Number .."
            className="txt-ed"
            value={quantity}
            onChange={(e) => setQnt(e.target.value)}
            required
          />
        </div>
        <div className="apb4">
        <button className="vbn0" onClick={addVariant}>
          Add
        </button>
        <Snackbar open={open2} autoHideDuration={3000} onClose={handleClose} >
          <Alert severity={requestSuccess?'success': 'error'} onClose={handleClose} sx={{ width: "100%" }}>
            {msg.msg}
          </Alert>
          
        </Snackbar>
        <Link className="apb5" to="/products">
        <button className="vbn9">Apply Product</button>
      </Link>
      </div>
      </div>
      
      
    </div>
  );
}
