import React, { Component } from 'react';

export default class Header extends Component {
    
    render (){
        return (
          <nav className="navbar navbar-default">
           
            <div className="container-fluid">
              <div className="navbar-header">
                <a className="navbar-brand" href="#">
                  LabCode
                </a>
              </div>

              <p className="navbar-text">ToDo List</p>

              <ul className="nav navbar-nav navbar-right">
                <li><a href="#">Logout</a></li>
              </ul>

            </div>
          
          </nav>
        );
    }
}