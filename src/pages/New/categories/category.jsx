import "./category.css";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import React, { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Button from "../../../components/button/button"

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export default function NewUser() {
  const [name, setCN] = useState("");
  const [description, setCD] = useState("");
  const [extra_shipping, setShip] = useState("0");
  const [open, setOpen] = React.useState(false);
  const [msg, setMsg] = useState("");
  const [requestSuccess, setRequestSuccess] = useState("");
  const handleClose = (event, reason) => {
    if (reason === "clickaway") 
    {
      return;
    }

    setOpen(false);
  };
  async function newCategory() {
    let item = { description, name,extra_shipping };
    

    let result = await fetch(
      "https://websitebuild.herokuapp.com/api/shop-owner/add-category",
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
    setRequestSuccess(true)
    if(result.msg.includes("required"||"been taken")){
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
  return (
    
    <div className="cate1">
      <h1 className="newUserTitle">Categories</h1>
      <div className="btn-lft">
      <Button link="/newproduct" text={"Next Page"} />
      </div>
      <div className="cat-box">
      <div className="cat-box1">
      <h2 className="new-cat2" >New Category</h2>
      <div className="cate-cont1">
      <h2 className="txt-name1">Category Name</h2>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { width: 500, maxWidth: "28ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-multiline-flexible"
            placeholder="Category"
            multiline="true"
            maxRows={1}
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
            "& .MuiTextField-root": { width: 400, maxWidth: "30ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-multiline-flexible"
            placeholder="Descripe .."
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
        component="number"
        sx={{
          "& .MuiTextField-root": { width: 500,maxWidth: "30ch"  },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          placeholder="Optional .."
          multiline="true"
          type='number'
          value={extra_shipping}
          defaultValu={0}
          onChange={(e) => setShip(e.target.value)}
          required
        />
      </Box>
    </div>
      <div className="btn-cont1">
        <button className="btn-sub1" onClick={newCategory}>
          ADD
        </button>
        <Snackbar open={open} autoHideDuration={2000} onClose={handleClose} >
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
