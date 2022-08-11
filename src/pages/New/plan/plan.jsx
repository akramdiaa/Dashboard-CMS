import "./plan.css";
import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function Plan() {
  const [plan_id, setPlan] = useState("");
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = useState(null);
  const [payment, setPay] = useState("");
  const [status, setStatus] = useState("");
  const [paymentS, setPays] = useState("");
  const handleClose = () => {
    setOpen(false);
  };


  async function addPlan() {
    let items = { plan_id };
    let result = await fetch(
      "http://websitebuild.herokuapp.com/api/shop-owner/choose-plan",
      {
        method: "POST",
        body: JSON.stringify(items),
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
          Accept: "application/json",
          "auth-token": localStorage.getItem("user-info"),
        },
      }
    );
    let status = result.status;
    result = await result.json();
    console.log(result.data)
    if (status === 200) {
      window.open(result.data);
      setOpen(true)

    }
  }

  useEffect(() => {
    setIsLoading(true);
    fetchData();
    setIsLoading(false);
  }, []);
  const fetchData = async () => {
    let result = await fetch(
      "https://websitebuild.herokuapp.com/api/auth-shop-owner/profile",
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
    setPay(result.data.payment_status);
    if (result.data.is_active == 0) {
      setPays("Pending");
    } else if (result.data.is_active == 1) setPays("Paid Successfully");
    if (result.data.plan_id == 1) {
      setStatus("For Basic Plan With 150EGP/Mounth");
    } else if (result.data.plan_id == 2) {
      setStatus("For Medium Plan With 270EGP/Mounth");
    } else if (result.data.plan_id == 3) {
      setStatus("For Advanced Plan With 400EGP/Mounth");
    }
  };
  const handleRefresh = () => {
    fetchData()
  };


  return (
    <div className="plan">
      <div className="facilities">
        <h1>Pricing Plans</h1>
        <p>Choose your plan</p>
        <div className="row">
          <div className="facilities-col">
            <h1>Basic</h1>
            <h4>150EGP/MO</h4>
            <br />
            <br />
            <h3 className="h3-plane">Basic</h3>
            <p className="p-plane">
              best for new ecommerce businesses
              <br /> with occasional person sales
            </p>
          </div>
          <div className="facilities-col">
            <h1>Medium</h1>
            <h4>270EGP/MO</h4>
            <br />
            <br />
            <h3 className="h3-plane">Medium</h3>
            <p className="p-plane">
              Best for growing businesses <br />
              selling online or in store
            </p>
          </div>
          <div className="facilities-col">
            <h1>Advanced</h1>
            <h4>400EGP/MO</h4>
            <br />
            <br />
            <h3 className="h3-plane">Advanced</h3>
            <p className="p-plane">
              Best for scalling businesses that
              <br /> required Advanced reporting
            </p>
          </div>
        </div>
        <div>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            className="radio"
          >
            <FormControlLabel
              value="1"
              control={<Radio />}
              onChange={(e) => setPlan(e.target.value)}
              color="error"
            />
            <FormControlLabel
              value="2"
              control={<Radio />}
              onChange={(e) => setPlan(e.target.value)}
            />
            <FormControlLabel
              value="3"
              control={<Radio />}
              onChange={(e) => setPlan(e.target.value)}
            />
          </RadioGroup>
        </div>

        <button onClick={addPlan} className="visit-us-btn red-btn">
          Submit Plan
        </button>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>
            {"Payment Is"} {paymentS}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              {status}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Continue</Button>
            <Button onClick={handleRefresh}>Refresh</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}
