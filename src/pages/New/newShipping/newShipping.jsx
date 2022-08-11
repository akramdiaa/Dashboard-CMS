import "./newShipping.css";
import React, { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Button from "../../../components/button/button"

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function NewUser() {
  const [government, setGov] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [open, setOpen] = React.useState(false);
  const [requestSuccess, setRequestSuccess] = useState("");
  const [msg, setMsg] = useState("");

  async function newShipping() {
    let item = { price, duration, government };
   

    let result = await fetch(
      "https://websitebuild.herokuapp.com/api/shop-owner/shipping-add",
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
    setRequestSuccess(true);
    if (result.msg.includes("required")) {
      setRequestSuccess(false);
    }
    else if(result.msg.includes("been taken"))
    {
      setRequestSuccess(false)
    }
    else if(result.msg.includes("greater than"))
    {
      setRequestSuccess(false)
    }
    setOpen(true);
    setMsg(result);

  }
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  return (
    <div className="newUser">
      <h1 className="newUserTitle">Shipping</h1>
      <div className="btn-lft">
      <Button link="/plan" text={"Go To Plan"}/>
      </div>
      <div className="newshipForm">
        <div>
          <div className="newUserItem">
            <label className="ship-lbl">State</label>
            <input
              placeholder="Government"
              type="text"
              value={government}
              onChange={(e) => setGov(e.target.value)}
              required
            />
          </div>
          <div className="newUserItem">
            <label>Price</label>
            <input
              placeholder="Price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <div className="newUserItem">
            <label>Shipping Days</label>
            <input
              placeholder="Duration"
              type="text"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              required
            />
          </div>
          <div className="knm">
            <br />
            <br />
          <button className="newshipButton" onClick={newShipping}>
            + Add
          </button>
          <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
          <Alert severity={requestSuccess?'success': 'error'} onClose={handleClose} sx={{ width: "100%" }}>
            {msg.msg}
          </Alert>
          </Snackbar>
        </div>
        </div>
        
      </div>
    </div>
  );
}
