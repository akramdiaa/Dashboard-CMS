import React from 'react';
import "./home-css101.css"

class Pricing extends React.Component{
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
            <h1>Pricing plans</h1>
        </section>

    {/*<!------about us content--------->*/}
    <section className="facilities">
            <h1>Pricing Plans</h1>
            <p>Choose your plan</p>
            <div className="row">
                <div className="facilities-col">
                    <h1>Basic</h1>
                    <br/>
                    <h4>150EGP/MO</h4>
                    <br/>
                    <br/>
                    <ul>
                        <li>Online store </li>
                        <li>Number of Categories: 5</li>
                        <li>Image per Proudct: 3</li>
                        <li>Limited products: 50</li>
                        <li>Transaction fees: 2%</li>
                    </ul>
                </div>
                <div className="facilities-col">
                    <h1>Medium</h1>
                    <br/>
                    <h4>270EGP/MO</h4>
                    <br/>
                    <br/>
                    <ul>
                        <li>Online store </li>
                        <li>Number of Categories: 10</li>
                        <li>Image per Proudct: 5</li>
                        <li>Limited products: 150</li>
                        <li>Transaction fees: 1%</li>
                    </ul>
                </div>
                <div className="facilities-col">
                    <h1>Advanced</h1>
                    <br/>
                    <h4>400EGP/MO</h4>
                    <br/>
                    <br/>
                    <ul>
                        <li>Online store </li>
                        <li>Unlimited Categories</li>
                        <li>Unlimited products</li>
                        <li>Unlimited Image per Proudct</li>
                        <li>Discount code</li>
                        <li>Transaction fees: 0.5%</li>
                    </ul>
                    </div>
                
            </div>
            <a href="/reg" className="visit-us-btn red-btn">Register now </a>
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
export default Pricing