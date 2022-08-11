import "./profileUd.css";
import React, { useState, useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Spinner from "../../../components/spinner/spinner";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Profile() {
  const [open, setOpen] = React.useState(false);
  const [msg, setMsg] = useState("");
  const [requestSuccess, setRequestSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(null);
  const [formData, setFormData] = useState({
    first_name: "",
    second_name: "",
    email: "",
    phone_number: "",
    country: "",
    government: "",
    city: "",
  });

  useEffect(() => {
    setIsLoading(true);
    fetchData();
    setIsLoading(false);
  }, []);

  const fetchData = async () => {
    try {
      const data = await fetch(
        "http://websitebuild.herokuapp.com/api/auth-shop-owner/profile",
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
    } catch (e) {
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  async function ProfileUp() {
    let result = await fetch(
      "http://websitebuild.herokuapp.com/api/shop-owner/update-info",
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
    setRequestSuccess(true);
    if (result.msg.includes("required")) {
      setRequestSuccess(false);
    }
    setOpen(true);
    setMsg(result);
  }

  return (
    <div className="profileo">
      <h1 className="txtP2o">Welcome To Profile</h1>
      <div className="profo">
        <div className="profile2o">
          <h2 className="txto2">Profile Edit</h2>
          <p className="info2">
            First Name :{" "}
            <input
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
              name="first_name"
              className="typ"
              type="text"
              placeholder={formData?.first_name}
              required
            />
          </p>
          <p className="info2">
            Secound Name :{" "}
            <input
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
              name="second_name"
              className="typ"
              required
              type="text"
              placeholder={formData?.second_name}
            />
          </p>
          <p className="info2">
            Email :{" "}
            <input
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
              name="email"
              className="typ"
              type="text"
              placeholder={formData?.email}
              required
            />
          </p>
          <p className="info2">
            Phone Number :{" "}
            <input
              type="text"
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
              name="phone_number"
              className="typ"
              placeholder={formData?.phone_number}
              required
            />
          </p>
        </div>
        <div className="dv">
          <div className="profile9">
            <h2 className="txto2">Address Edit</h2>
            <p className="info2">
              Country :{" "}
              <input
                type="text"
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
                name="country"
                className="typ"
                placeholder={formData?.country}
                required
              />
            </p>
            <p className="info2">
              Government :{" "}
              <input
                type="text"
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
                name="government"
                className="typ"
                placeholder={formData?.government}
                required
              />
            </p>
            <p className="info2">
              City :{" "}
              <input
                type="text"
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
                name="city"
                className="typ"
                placeholder={formData?.city}
                required
              />
            </p>
          </div>
        </div>
      </div>
      <div className="profile-mrg">
        <button className="noselect2" onClick={ProfileUp}>
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
      </div>
    </div>
  );
}
