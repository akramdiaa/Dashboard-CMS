import React, { useState, useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export default function NewProduct() {
  const [product_id, setProduct] = useState("");
  const [show_p, setShow] = useState([]);
  const [option_name, setName] = useState("");
  const [open, setOpen] = React.useState(false);
  const [msg, setMsg] = useState("");
  let navigate = useNavigate();

  const [requestSuccess, setRequestSuccess] = useState("");
  async function addOption() {
    let item = {
      option_name,
      product_id,
    };
    

    let result = await fetch(
      "http://websitebuild.herokuapp.com/api/shop-owner/add-option",
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
    setOpen(true);
    setMsg(result);
  }

  useEffect(() => {
    fetchData();
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



  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle2">Add Option</h1>
      <div className="addProductForm2">
        <div className="cont-pro2">
          <p className="txt-for">Option Name</p>
          <input
            type="text"
            placeholder="Name .."
            className="txt-ed"
            value={option_name}
            onChange={(e) => setName(e.target.value)}
            required
            maxLength={60}
          />
        </div>
        <div className="apb4">
          <button className="vbn8" onClick={addOption}>
            Add
          </button>
          <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
          <Alert severity={requestSuccess?'success': 'error'} onClose={handleClose} sx={{ width: "100%" }}>
            {msg.msg}
          </Alert>
          </Snackbar>
            <button className="vbn7" onClick={() => navigate(-1)}>Back</button>
        </div>
      </div>
    </div>
  );
}
