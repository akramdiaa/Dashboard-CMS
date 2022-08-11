import React, { useState, useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useParams, useNavigate } from "react-router-dom";
import Spinner from "../../../components/spinner/spinner";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function NewUser() {
  const [open, setOpen] = React.useState(false);
  const [msg, setMsg] = useState("");
  const [isLoading, setIsLoading] = useState(null);
  const [formData, setFormData] = useState({
    first_name: "",
    second_name: "",
    email: "",
    phone_number: "",
    country: "",
    government: "",
    city: "",
    password: "",
    address: "",
    password_confirmation: "",
    balance: "",
  });

  const navigate = useNavigate();
  const id = useParams();
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchData = async () => {
    let result = await fetch(
      "https://websitebuild.herokuapp.com/api/shop-owner/show-customer/" +
        id.userId,
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
    else if(result.msg.includes("password"))
    {
      setRequestSuccess(false)
    }
    setFormData(result.data);
  };

  async function upUser() {
    let result = await fetch(
      "https://websitebuild.herokuapp.com/api/shop-owner/update-customer/" +
        id.userId,
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
    setOpen(true);
    setMsg(result);
  }

  async function delUser() {
    let result = await fetch(
      "https://websitebuild.herokuapp.com/api/shop-owner/delete-customer/" +
        id.userId,
      {
        headers: {
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
    navigate("/users");
  }

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div className="newUser">
      <h1 className="newUserTitle">Edit User</h1>
      <div className="newUserForm3">
        <div className="newUserItem">
          <h1 className="usernm">First Name</h1>
          <input
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }))
            }
            name="first_name"
            type="text"
            placeholder={formData?.first_name}
            required
          />
        </div>
        <div className="newUserItem">
          <h1 className="usernm">Last Name</h1>
          <input
            type="text"
            placeholder={formData?.second_name}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }))
            }
            name="second_name"
            required
          />
        </div>
        <div className="newUserItem">
          <h1 className="usernm">Email</h1>
          <input
            type="email"
            placeholder={formData?.email}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }))
            }
            name="email"
            required
          />
        </div>
        <div className="newUserItem">
          <h1 className="usernm">Password</h1>
          <input
            type="password"
            placeholder="password"
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }))
            }
            name="password"
            required
          />
        </div>
        <div className="newUserItem">
          <h1 className="usernm">Password Confirmation</h1>
          <input
            type="password"
            placeholder="password confirm"
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }))
            }
            name="password_confirmation"
            required
          />
        </div>
        <div className="newUserItem">
          <h1 className="usernm">Phone</h1>
          <input
            type="number"
            placeholder={formData?.phone_number}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }))
            }
            name="phone_number"
            required
          />
        </div>
        <div className="newUserItem">
          <h1 className="usernm">Address</h1>
          <input
            type="text"
            placeholder={formData?.address}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }))
            }
            name="address"
            required
          />
        </div>
        <div className="newUserItem">
          <h1 className="usernm">City</h1>
          <input
            type="text"
            placeholder={formData?.city}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }))
            }
            name="city"
            required
          />
        </div>{" "}
        <div className="newUserItem">
          <h1 className="usernm">Balance</h1>
          <input
            type="text"
            placeholder={formData?.balance}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }))
            }
            name="balance"
            required
          />
        </div>
        <div className="btn-botm">
          <button className="noselect2" onClick={upUser}>
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
          <button className="noselect" onClick={delUser}>
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
    </div>
  );
}
