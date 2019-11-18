import React from "react";

const LogInView = ({ onSubmit }) => {
  return (
    <div>
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Login</h1>
              <p className="lead text-center"></p>
              <form onSubmit={onSubmit}>
                <div className="form-group">
                  <label for="exampleInputEmail1">Email address</label>
                  <input type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                  <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                  <div className="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" name="password"  className="form-control" id="exampleInputPassword1" placeholder="Password"/>
                  </div>
                  <div className="form-group form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" for="exampleCheck1">Check me out</label>
                </div>
              <button type="submit">Log in</button>
              <button type="submit"><a href="/Signup" >Signup</a></button>
            </form>
                </div>
          </div>
        </div>
    </div>
  );
};

export default LogInView;
