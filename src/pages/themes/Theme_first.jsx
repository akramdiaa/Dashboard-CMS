import "./theme_first.css";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import React, { useState, useEffect } from "react";
import Button from "../../components/button/button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Spinner from "../../components/spinner/spinner";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export default function Themes() {
  const [requestSuccess, setRequestSuccess] = useState("");
  const [name, setName] = useState("");
  const [font, setFont] = useState(
    "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
  );
  const [primary_color, setPrim] = useState("#000000");
  const [secondary_color, setSec] = useState("#FFC0CB");
  const [open, setOpen] = React.useState(false);
  const [msg, setMsg] = useState("");
  const [isLoading, setIsLoading] = useState(null);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  async function newTheme() {
    let item = {
      name,
      font,
      primary_color,
      secondary_color,
    };
    let result = await fetch(
      "http://websitebuild.herokuapp.com/api/shop-owner/update",
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
      "http://websitebuild.herokuapp.com/api/shop-owner/show-theme-info" ,
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
    setName(result.data.name);
  };
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div className="theme_first">
      <section className="theme_first_sec">
        <h1 className="h1_theme">Choose Your Theme</h1>
        <div className="btn-lft">
          <Button link="/category" text={"Next Page"} />
        </div>
        <div className="row_theme">
          <div className="theme-col">
            <h1>First Theme</h1>
            <img
              className="img"
              src="asstes/theme1.jpeg"
              alt="jknj"
              width="480"
              height="230"
            />

          </div>
          <div className="theme-col">
            <h1>Second Theme</h1>
            <img
              className="img"
              src="asstes/theme2.jpeg"
              alt="jknj"
              width="480"
              height="230"
            />
          </div>
        </div>
      </section>
      <div>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          className="radio1"
          required
        >
          <FormControlLabel
            value="theme 1"
            control={<Radio />}
            onChange={(e) => setName(e.target.value)}
          />
          <FormControlLabel
            value="theme 2"
            control={<Radio />}
            onChange={(e) => setName(e.target.value)}
          />
        </RadioGroup>
      </div>
      <section className="about-us">
        <h1 className="h1_theme1">
          Professionally Designed <br /> Website Templates
        </h1>
        <div className="row1">
          <div className="about-col-theme">
            <h3 className="h3-theme1">Please Choose The Name of The Font</h3>
            <div className="addtheme">
              <select
                name="font"
                style={{ fontFamily: font }}
                className="select"
                onChange={(e) => setFont(e.target.value)}
              >
                <option>Select Font</option>
                <option
                  style={{
                    fontFamily:
                      "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                  }}
                  value="'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
                >
                  Segoe UI
                </option>
                <option
                  style={{ fontFamily: "'Courier New', Courier, monospace" }}
                  value="'Courier New', Courier, monospace"
                >
                  Courier New
                </option>
                <option
                  style={{
                    fontFamily:
                      "'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif",
                  }}
                  value="'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif"
                >
                  Franklin Gothic Medium
                </option>
                <option
                  style={{
                    fontFamily:
                      "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
                  }}
                  value="'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif"
                >
                  Gill Sans
                </option>
                <option
                  style={{
                    fontFamily:
                      "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif",
                  }}
                  value="'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif"
                >
                  Lucida Sans
                </option>
                <option
                  style={{ fontFamily: "'Times New Roman', Times, serif" }}
                  value="'Times New Roman', Times, serif"
                >
                  Times New Roman
                </option>
                <option
                  style={{
                    fontFamily:
                      "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif",
                  }}
                  value="'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif"
                >
                  Trebuchet MS
                </option>
                <option
                  style={{
                    fontFamily:
                      "Cambria, Cochin, Georgia, Times, 'Times New Roman', serif",
                  }}
                  value="Cambria, Cochin, Georgia, Times, 'Times New Roman', serif"
                >
                  Julius Sans One
                </option>
                <option
                  style={{
                    fontFamily:
                      "Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif",
                  }}
                  value="Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif"
                >
                  Haettenschweiler
                </option>
                <option
                  style={{ fontFamily: "Verdana, Geneva, Tahoma, sans-serif" }}
                  value="Verdana, Geneva, Tahoma, sans-serif"
                >
                  Verdana
                </option>
                <option
                  style={{
                    fontFamily:
                      "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
                  }}
                  value="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
                >
                  BlinkMacSystemFont
                </option>
                <option style={{ fontFamily: "monospace" }} value="monospace">
                  Monospace
                </option>
                <option style={{ fontFamily: "cursive" }} value="cursive">
                  Cursive
                </option>
              </select>
            </div>
            <h3 className="h3-theme1">
              Please Choose The Main Color of Your Store{" "}
            </h3>
            <div className="addtheme">
              <input
                type="color"
                placeholder="Primary Color"
                value={primary_color}
                onChange={(e) => setPrim(e.target.value)}
                required
              />
              <div
                style={{ backgroundColor: primary_color, color: "white" }}
                className="color-s"
              >
                Primary
              </div>
            </div>
            <h3 className="h3-theme1">
              Please Choose The Secondry Color of Your Store{" "}
            </h3>
            <div className="addtheme">
              <input
                type="color"
                placeholder="Secondry Color"
                value={secondary_color}
                onChange={(e) => setSec(e.target.value)}
                required
              />
              <div
                style={{ backgroundColor: secondary_color }}
                className="color-s"
              >
                Secondary
              </div>
            </div>
          </div>
          <div className="about-col-theme">
            <img
              className="img1"
              src="asstes/theme2.jpeg"
              alt="Theme"
              width="480"
              height="400"
            />
          </div>
        </div>
        <div className="activate-btn101">
          <button className="activate-btn1-theme" onClick={newTheme}>
            Save Theme
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
      </section>
    </div>
  );
}
