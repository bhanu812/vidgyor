import React, { Component, PropTypes } from 'react';
import app from "./base";

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchValue:""
        }
  }
  logout = (event) => {
    event.preventDefault();
    console.log(this)
    app.auth().signOut()
      .then(function () {
        console.log(this)
        console.log("asdjsakdaks")
        //this.props.history.push("/login");
        // Sign-out successful.
      })
      .catch(function (error) {
        //this.props.history.push("/login");
        console.log("asljdsalkdkasncmnczcnm")
        // An error happened
      });
  }
  
  writeInput(e) {
        let k = {}
        k[e.currentTarget.name]=e.currentTarget.value
        this.setState(k)
        this.props.showVideo(e.currentTarget.value)
    }
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{marginBottom:"25px"}}>
                <a className="navbar-brand" href="#">VIDGYOR</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item" >
                      <a className="nav-link"  onClick={(event)=>this.logout(event)}>Logout</a>
                    </li>
                    </ul>
                    <form className="form-inline my-2 my-lg-0">
                        <input className="form-control mr-sm-2" name="searchValue" type="search" placeholder="Search" aria-label="Search" value={this.state.searchValue} onChange={ (event) => this.writeInput(event) } />     
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form>
                </div>
            </nav>
    );
  }
}