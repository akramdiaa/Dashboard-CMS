import React from "react";
import "./home-css101.css";
class Home extends React.Component {
  render() {
    return (
      <div>
        <section className="header">
          <nav>
            <a href="home101.html">
              <img src="asstes/logo.png" alt="" />
            </a>
            <div className="nav-links" id="navLinks">
              <i className="fa fa-times" onClick="hideMenu()"></i>
              <ul>
                <li>
                  <a href="/homepage">Home</a>
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
            <div className="nav-links2">
              <i className="fa fa-times" onClick="hideMenu()"></i>
              <ul>
                <li>
                  <a href="/">Login</a>
                </li>
                <li>
                  <a href="/reg">Register</a>
                </li>
              </ul>
            </div>
            <i className="fa fa-bars" onClick="showMenu()"></i>
          </nav>
          <div className="text-box">
            <h1>Create a website you're proud of</h1>
            <p>
              Discover the platform that gives you the freedom to create,
              design, manage and develop <br /> your web presence exactly the
              way you want.
            </p>
            <a href="/" className="visit-us-btn">
              Get Started
            </a>
          </div>
        </section>
        {/*<!----------campus---------->*/}
        <div className="campus">
          <h1>
            Professionally Designed <br /> Website Templates
          </h1>
          <p>
            Choose from our customizable website templates <br /> that are built
            to meet your business needs.
          </p>
          <div className="row">
            <div className="campus-col">
              <img src="asstes/theme1.jpeg" alt="jkn2j" />
              <div className="layer">
                <h3>Personal Store</h3>
              </div>
            </div>
            <div className="campus-col">
              <img src="asstes/theme2.jpeg" alt="jknj" />
              <div className="layer">
                <h3>Dark Themed</h3>
              </div>
            </div>
          </div>
        </div>
        {/*<!----------facilities-->*/}
        <section className="facilities">
          <h1>Pricing Plans</h1>
          <p>Choose your plan</p>
          <div className="row">
            <div className="facilities-col">
              <h1>Basic</h1>
              <h4>150EGP/MO</h4>
              <br />
              <br />
              <h3>Basic</h3>
              <p>
                best for new ecommerce businesses
                <br /> with occasional person sales
              </p>
            </div>
            <div className="facilities-col">
              <h1>Medium</h1>
              <h4>270EGP/MO</h4>
              <br />
              <br />
              <h3>Medium</h3>
              <p>
                Best for growing businesses <br />
                selling online or in store
              </p>
            </div>
            <div className="facilities-col">
              <h1>Advanced</h1>
              <h4>400EGP/MO</h4>
              <br />
              <br />
              <h3>Advanced</h3>
              <p>
                Best for scalling businesses that
                <br /> required Advanced reporting
              </p>
            </div>
          </div>
        </section>
        {/*<!-----------testimonials--------->*/}
        <section className="testimonials">
          <h1>Customer Reviews </h1>
          <p>Based on personal Emails</p>
          <div className="row">
            <div className="testimonials-col">
              <img src="asstes/user1.jpeg" alt="jknj" />
              <div>
                <p>
                  This is a great app and I had very good service.
                  <br /> I had some initial issues getting it set up{" "}
                </p>
                <h3>Remon Wagdy</h3>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star-half-o"></i>
              </div>
            </div>

            <div className="testimonials-col">
              <img src="asstes/user2.jpeg" alt="jknj" />
              <div>
                <p>
                  Great website i really love itI but I can't figure ou
                  <br />t how to upgrade to premium version.
                </p>
                <h3>Gamal Ashraf</h3>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star-o" aria-hidden="true"></i>
              </div>
            </div>
          </div>
        </section>
        {/*<!-----call to action------>*/}
        <section className="cta">
          <h1>
            Make your own website and get built-in tools
            <br /> to grow your business online.
          </h1>
          <a href="/" className="visit-us-btn">
            Get Started
          </a>
        </section>
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
      </div>
    );
  }
}
export default Home;
