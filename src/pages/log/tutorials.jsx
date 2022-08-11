import React from 'react';
import "./home-css101.css"

class Tutorials extends React.Component{
    render(){
        return(
        <div>
             <section className="sub-header">
            <nav>
                <a href="home101.html"><img src="asstes/logo.png" alt=""/></a>
                <div className="nav-links" id="navLinks">
                    <i className="fa fa-times" onClick="hideMenu()" ></i>
                    <ul>
                    <li><a href="/homepage">Home</a></li>
                    <li><a href="/tutorial">Tutorial</a></li>
                    <li><a href="/price">Pricing</a></li>
                    <li><a href="/about">About</a></li>
                    </ul>
                </div>
                <div className="nav-links2" >
                    <i className="fa fa-times" onClick="hideMenu()" ></i>
                    <ul>
                        <li><a href="/">Login</a></li>
                        <li><a href="/reg">Register</a></li>
                    </ul>    
                </div>
                <i className="fa fa-bars"  onClick="showMenu()"></i>
            </nav>
            <h1>Tutorials</h1>
        </section>

    {/*<!------about us content--------->*/}
    <section className="about-us">
        <div className="row">
            <div className="about-col">
                <video src="asstes/pricing.mp4" controls></video>
            </div>
            <div className="about-col2">
            <h1>Making commerce better for everyone</h1>
            <p>We help people achieve independence by making it easier to start,run,<br/>
                   and grow a business. We believe the future of commerce has more<br/>
                   voices, not fewer, so we’re reducing the barriers to business ownership<br/>
                   to make commerce better for everyone.</p>
            </div>
        </div>
    </section>
    <section className="about-us">
        <div className="row">
            <div className="about-col">
                <h1>Making commerce better for everyone</h1>
                <p>We help people achieve independence by making it easier to start,run,<br/>
                    and grow a business. We believe the future of commerce has more<br/>
                    voices, not fewer, so we’re reducing the barriers to business ownership<br/>
                    to make commerce better for everyone.</p>
                    
            </div>
            <div className="about-col">
                <video src="asstes/pricing.mp4" controls></video>
            </div>
            
        </div>
    </section>
    <section className="about-us">
        <div className="row">
            <div className="about-col">
                <video src="asstes/pricing.mp4" controls></video>
            </div>
            <div className="about-col2">
            <h1>Making commerce better for everyone</h1>
            <p>We help people achieve independence by making it easier to start,run,<br/>
                   and grow a business. We believe the future of commerce has more<br/>
                   voices, not fewer, so we’re reducing the barriers to business ownership<br/>
                   to make commerce better for everyone.</p>
            </div>
        </div>
    </section>
        
        {/*<!-----Footer-------->*/}
        <section className="footer">
           <h4>
               About us 
           </h4>
           <p>We make it easy for everyone to create a beautiful,<br/> professional web presence.</p>
           <div className="icons">
              <i className="fa fa-facebook" ></i>
              <i className="fa fa-twitter" ></i>
              <i className="fa fa-instagram" ></i>
              <i className="fa fa-linkedin" ></i>
           </div>
           <p> <i className="fa fa-heart-o"></i> Deloped by swifter</p> 
        </section>
        </div>
        );
    }
}
export default Tutorials