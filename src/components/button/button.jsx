import "./button.css";
import React from "react";
import "react-slideshow-image/dist/styles.css";

function NextButton({ link , text }) {
  return (
    <a className="nkk" href={link}>
      <ul className="share-icons">
        {text}
        <li className="share-icons__block">
          <div className="share-icons__block-left">
            <i className="fas fa-share text-primary"></i>
          </div>
          <div className="share-icons__block-right">
            <i className="fas fa-share text-primary"></i>
          </div>
        </li>
      </ul>
    </a>
  );
}
export default NextButton;
