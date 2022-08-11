import "./store.css";
import React, { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/button/button";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Store() {
  const [slogan, setLog] = useState("");
  const [description, setDescription] = useState("");
  const [instagram, setValue] = useState("");
  const [facebook, setPrice] = useState("");
  const [shop_email, setSdate] = useState("");
  const [open, setOpen] = React.useState(false);
  const [msg, setMsg] = useState("");
  const [shop_phone_number, setPhone] = useState("");
  const navigate = useNavigate();
  const [requestSuccess, setRequestSuccess] = useState("");
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  async function newStore() {
    let item = {
      slogan,
      description,
      facebook,
      instagram,
      shop_email,
      shop_phone_number,
    };
    let result = await fetch(
      "http://websitebuild.herokuapp.com/api/shop-owner/add-details",
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
    if (result.msg.includes("unique")) {
      setRequestSuccess(false);
    } else if (result.msg.includes("been taken")) {
      setRequestSuccess(false);
    } else if (result.msg.includes("greater than")) {
      setRequestSuccess(false);
    }
    setOpen(true);
    setMsg(result);
  }

  function nav() {
    navigate("/upstore");
  }
  return (
    <div className="store">
      <section className="about-us">
        <div className="row">
          <div className="about-col-st">
            <h1 className="h1-footer">Footer Data Of Your Website</h1>
            <div className="btn-lft">
              <Button link="/themef" text={"Next Page"} />
            </div>
            <h3 className="h3-store">Please Enter Your Shop Email</h3>
            <div className="addtheme">
              <input
                type="email"
                placeholder="Email .."
                value={shop_email}
                onChange={(e) => setSdate(e.target.value)}
                multiple
                required
                pattern="^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$"
              />
            </div>
            <h3 className="h3-store">Please Enter Your Shop Number</h3>
            <div className="addtheme">
              <input
                type="number"
                placeholder="Number .."
                value={shop_phone_number}
                onChange={(e) => setPhone(e.target.value)}
                multiple
                required
                min="01000000000"
                max="019999999999"
              />
            </div>
            <h3 className="h3-store">Please Enter Your Slogan </h3>
            <div className="addtheme">
              <input
                type="text"
                placeholder="Slogan"
                value={slogan}
                onChange={(e) => setLog(e.target.value)}
                required
                maxLength={255}
              />
            </div>

            <h3 className="h3-store">
              Please Enter Your Descriptions of Store
            </h3>
            <div className="addtheme">
              <input
                type="text"
                placeholder="Descripe"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                multiple
                maxLength={255}
              />
            </div>
            <div className="activate-btn101">
              <button className="activate-btn1" onClick={newStore}>
                Submit Store details Now
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
              <button className="activate-btn2" onClick={nav}>
                Update
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
