import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setCpass] = useState("");
  const navigate = useNavigate();

  async function Reset_Pass() {
    let item = { code, password, password_confirmation };
    let result = await fetch(
      "http://websitebuild.herokuapp.com/api/reset-password",
      {
        method: "POST",
        body: JSON.stringify(item),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    let status = result.status;
    localStorage.setItem("status", status);
    if (status === 200) {
      navigate("/");
    }
    result = await result.json();
  }
  return (
    <div>
      <section className="sub-header">
        <nav>
          <a href="home101.html">
            <img src="asstes/logo.png" alt="" />
          </a>
          <div className="nav-links" id="navLinks">
            <i className="fa fa-times"></i>
            <ul>
              <li>
                <a href="/home">Home</a>
              </li>
              <li>
                <a href="/tutorial">Tutorial</a>
              </li>
              <li>
                <a href="/price">Pricing</a>
              </li>
              <li>
                <a href="/about">About</a>
              </li>
            </ul>
          </div>
          <i className="fa fa-bars"></i>
        </nav>
        <h1>Reset Password</h1>
      </section>

      {/*<!------Login--------->*/}
      <div className="form-boxx2">
        <div className="social-icons">
          <img src="fb.png" alt="" />
          <img src="tw.png" alt="" />
          <img src="gp.png" alt="" />
        </div>
        <div id="login" className="input-group2">
          <input
            type="text"
            className="inpit-feild2"
            placeholder="Enter The Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
          <input
            type="password"
            className="inpit-feild2"
            placeholder=" Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            className="inpit-feild2"
            placeholder=" Password Confirm"
            value={password_confirmation}
            onChange={(e) => setCpass(e.target.value)}
            required
          />
          <button className="submit-btn2" onClick={Reset_Pass}>
            Reset
          </button>
        </div>
      </div>
      {/*<!-----Footer-------->*/}
      <section className="footer">
        <h4>About us</h4>
        <p>
          We make it easy for everyone to create a beautiful,
          <br /> professional web presence.
        </p>
        <div className="icons">
          <i className="fa fa-facebook"></i>
          <i className="fa fa-twitter"></i>
          <i className="fa fa-instagram"></i>
          <i className="fa fa-linkedin"></i>
        </div>
        <p>
          {" "}
          <i className="fa fa-heart-o"></i> Deloped by swifter
        </p>
      </section>
      <button></button>
    </div>
  );
}
