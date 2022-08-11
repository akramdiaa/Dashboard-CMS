import "./category.css";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Spinner from "../../../components/spinner/spinner";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function NewUser() {
  const [name, setCN] = useState("");
  const [description, setCD] = useState("");
  const [extra_shipping, setShip] = useState("");
  const [ctg, setCtg] = useState("");
  const [open, setOpen] = React.useState(false);
  const [msg, setMsg] = useState("");
  const categorey = useParams();
  const [requestSuccess, setRequestSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(null);

  const navigate = useNavigate();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  async function delCtg() {
    let result = await fetch(
      "https://websitebuild.herokuapp.com/api/shop-owner/delete-category/" +
        categorey.ctgId,
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
    navigate("/ctgL");
  }

  async function upCtg() {
    let item = { name, description, extra_shipping };

    let result = await fetch(
      "https://websitebuild.herokuapp.com/api/shop-owner/update-category/" +
        categorey.ctgId,
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
    setOpen(true);
    setMsg(result);
  }

  useEffect(() => {
    setIsLoading(true);
    fetchData();
    setIsLoading(false);
  }, []);
  const fetchData = async () => {
    let result = await fetch(
      "http://websitebuild.herokuapp.com/api/shop-owner/show-cat-id/" +
        categorey.ctgId,
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
    setCtg(result.data);
    setShip(result.data.extra_shipping)
    setCD(result.data.description)
    setCN(result.data.name)
  };
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="cate1">
      <h1 className="newUserTitle1">Categories</h1>

      <div className="cat-box">
        <div className="cat-box1">
          <h2 className="new-cat2">Edit Category</h2>
          <div className="cate-cont1">
            <h2 className="txt-name1">Category Name</h2>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { width: 600, maxWidth: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="outlined-multiline-flexible"
                placeholder={ctg.name}
                multiline="true"
                maxRows={10}
                value={name}
                onChange={(e) => setCN(e.target.value)}
                required
              />
            </Box>
          </div>
          <div className="cate-cont1">
            <h2 className="txt-name2">Description</h2>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { width: 500, maxWidth: "30ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                placeholder={ctg.description}
                multiline="true"
                maxRows={5}
                value={description}
                onChange={(e) => setCD(e.target.value)}
                required
              />
            </Box>
          </div>
          <div className="cate-cont1">
            <h2 className="txt-name1">Extra Shipping</h2>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { width: 500, maxWidth: "30ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                placeholder={ctg.extra_shipping}
                multiline="true"
                maxRows={10}
                type='number'
                value={extra_shipping}
                onChange={(e) => setShip(e.target.value)}
                required
              />
            </Box>
          </div>
          <div className="btn-cont1">
            <button className="noselect2" onClick={upCtg}>
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
            <button className="noselect" onClick={delCtg}>
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
    </div>
  );
}
