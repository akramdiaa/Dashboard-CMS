import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import Spinner from "../../../components/spinner/spinner";
import './upShipping.css'

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function NewUser() {
  const [open, setOpen] = React.useState(false);
  const [msg, setMsg] = useState("");
  const [isLoading, setIsLoading] = useState(null);
  const [formData, setFormData] = useState({
    government: "",
    price: "",
    duration: "",
  });

  const test = useParams();
  const navigate = useNavigate();
  const [requestSuccess, setRequestSuccess] = useState("");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    setIsLoading(true);
    fetchData();
    setIsLoading(false);
  }, []);

    const fetchData =async () => {
    let result = await fetch(
      "https://websitebuild.herokuapp.com/api/shop-owner/shipping-showid/" +
        test.testId,
      {
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
    setFormData(result.data);
    }
  
  async function delShipping() {
    let result = await fetch(
      "https://websitebuild.herokuapp.com/api/shop-owner/shipping-delete/" +
        test.testId,
      {
        method: "POST",
        body: JSON.stringify(),
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
    navigate("/shipping");
  }

  async function upShipping() {
    let result = await fetch(
      "https://websitebuild.herokuapp.com/api/shop-owner/shipping-update/" +
        test.testId,
      {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
          Accept: "application/json",
          "auth-token": localStorage.getItem("user-info"),
        },
      }
    );
    result = await result.json();
    setFormData(result.data);
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
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div className="newUser">
      <h1 className="newUserTitle">Shipping</h1>
      <div className="newUserForm1">
        <div>
          <div className="newUserItem">
            <label>State</label>
            <input
              placeholder={formData?.government}
              type="text"
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
              name="government"
              required
            />
          </div>
          <div className="newUserItem">
            <label>Price</label>
            <input
              placeholder={formData?.price}
              type="number"
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
              name="price"
              required
            />
          </div>
          <div className="newUserItem">
            <label>Shipping Days</label>
            <input
              placeholder={formData?.duration}
              type="text"
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
              name="duration"
              required
            />
          </div>
          <div className="knm">
          <button className="noselect2" onClick={upShipping}>
          <span className="text">Update</span>
          <span className="icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path d="M438.6 105.4C451.1 117.9 451.1 138.1 438.6 150.6L182.6 406.6C170.1 419.1 149.9 419.1 137.4 406.6L9.372 278.6C-3.124 266.1-3.124 245.9 9.372 233.4C21.87 220.9 42.13 220.9 54.63 233.4L159.1 338.7L393.4 105.4C405.9 92.88 426.1 92.88 438.6 105.4H438.6z" />
            </svg>
          </span>
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
        <button className="noselect"  onClick={delShipping}>
        <span className="text">Delete</span>
        <span className="icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z" />
          </svg>
        </span>
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
