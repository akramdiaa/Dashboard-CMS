import "./upstore.css";
import React, { useState, useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Spinner from "../../../components/spinner/spinner";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function UpStore() {
  const [open, setOpen] = React.useState(false);
  const [msg, setMsg] = useState("");
  const [isLoading, setIsLoading] = useState(null);
  const [formData, setFormData] = useState({
    slogan: "",
    description: "",
    email: "",
    instagram: "",
    facebook: "",
    name: "",
    address: "",
    shop_phone_number: ""
  });
  const [requestSuccess, setRequestSuccess] = useState("");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };



  async function upStore() {
    console.log("1",formData)
    let result = await fetch(
      "http://websitebuild.herokuapp.com/api/shop-owner/update-details",
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
    console.log("2",result)
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

  useEffect(() => {
    setIsLoading(true);
    fetchData();
    setIsLoading(false);
  }, []);
  // eslint-disable-next-line react-hooks/exhaustive-deps
 const fetchData = async () => {
    let result = await fetch(
      "https://websitebuild.herokuapp.com/api/shop-owner/show-detailsdb",
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
    setFormData(result.data);
  
}
if (isLoading) {
  return <Spinner />;
}
  return (
    <div className="store">
      <section className="about-us">
        <div className="row">
          <div className="about-col-st">
            <h1 className="h1">Update your Data</h1>
            <h3 className="h3-store">Edit Your Shop Email</h3>
            <div className="addtheme">
              <input
                type="text"
                placeholder={formData?.email}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
                name="email"
                multiple
                required
              />
            </div>
            <h3 className="h3-store">Edit Your Name of Store</h3>
            <div className="addtheme">
              <input
                type="text"
                placeholder={formData?.name}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
                name="name"
                required
              />
            </div>
            <h3 className="h3-store">Edit Your Shop Number</h3>
            <div className="addtheme">
              <input
                type="number"
                placeholder={formData?.shop_phone_number}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
                name="shop_phone_number"
                multiple
                required
              />
            </div>
            <h3 className="h3-store">Edit Your Slogan </h3>
            <div className="addtheme">
              <input
                type="text"
                placeholder={formData?.slogan}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
                name="slogan"
                required
              />
            </div>
            <h3 className="h3-store">Edit Your Descriptions of Store</h3>
            <div className="addtheme">
              <input
                type="text"
                placeholder={formData?.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
                name="description"
                required
              />
            </div>
            <h3 className="h3-store">Edit Your Address of Store</h3>
            <div className="addtheme">
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
            <div className="activate-btn101">
              <button className="activate-btn1" onClick={upStore}>
                Submit update
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
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
