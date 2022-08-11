import "./discount.css";
import React, { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Button from "../../../components/button/button";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Discount() {
  const [code, setCode] = useState("");
  const [type, setType] = useState("fixed");
  const [value, setValue] = useState("");
  const [starts_at, setSdate] = useState("");
  const [ends_at, setEdate] = useState("");
  const [open, setOpen] = React.useState(false);
  const [requestSuccess, setRequestSuccess] = useState("");
  const [msg, setMsg] = useState("");
  async function newDiscound() {
    let item = {
      code,
      type,
      value,
      starts_at,
      ends_at,
    };
    let result = await fetch(
      "https://websitebuild.herokuapp.com/api/shop-owner/add-discountcode",
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
    if (result.msg.includes("required" | "been taken")) {
      setRequestSuccess(false);
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
    <div className="discount">
      <section className="campus">
        <h1 className="h1">Generate your discount Now </h1>
        <br />
        <p className="p">
          Now you can add your voucher code with the time you want
        </p>
        <br />
        <Button link="/newShipping" text={"Next Page"} />
        <div className="discount-box">
          <div className="addProductItem">
            <label>Code</label>
            <input
              type="text"
              placeholder="Cs50"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
              maxLength={15}
            />
          </div>
          <div className="addProductItem">
            <label>Type</label>
            <select
              name="category_id"
              className="select2"
              onChange={(e) => setType(e.target.value)}
            >
              <option>Select Type</option>
              <option value="fixed">Fixed</option>
              <option value="perecentage">Perecentage</option>
            </select>
          </div>
          <div className="addProductItem">
            <label>Value</label>
            <input
              type="number"
              placeholder="15$"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              required
              min="10"
              max="1000"
            />
          </div>
          <div className="addProductItem">
            <label>Start at</label>
            <input
              type="date"
              min="2022-6-27"
              max="2025-12-31"
              value={starts_at}
              onChange={(e) => setSdate(e.target.value)}
              required
            />
          </div>
          <div className="addProductItem">
            <label>Ends at</label>
            <input
              type="date"
              min="2022-7-5"
              max="2025-12-31"
              value={ends_at}
              onChange={(e) => setEdate(e.target.value)}
              required
            />
          </div>
        </div>
        <br />
        <div>
          <button className="activate-btn" onClick={newDiscound}>
            Activate Code
          </button>
          <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
            <Alert
              severity={requestSuccess ? "success" : "error"}
              onClose={handleClose}
              sx={{ width: "100%" }}
            >
              {msg.msg}
            </Alert>
          </Snackbar>
        </div>
        <br />
        <br />
      </section>
    </div>
  );
}
