import React, { Component } from "react";
import styles from "./index.module.scss";
import logo from "../../images/HeaderNavLogoRunner.png";

class Login extends Component {
  //On Login, get Username / Password,
  //Generate random 8 digit key
  //Send Username and key to local storage
  onSubmit = e => {
    e.preventDefault();
    let username = document.getElementById(styles.emailfield).value;
    let key = Math.floor(Math.random() * 100000000);
    let user = { username: username, key: key };
    localStorage.setItem("username", JSON.stringify(user));

    this.props.history.replace("/");
  };

  render() {
    return (
      <div className={styles.main}>
        <img src={logo} className={styles.logo} alt="Runner Logo" />
        <form onSubmit={this.onSubmit}>
          <div className={styles.inputsbox}>
            <div id={styles.emailbox}>
              <label> Email </label>
              <input type="email" id={styles.emailfield} required />
            </div>
            <div id={styles.passwordbox}>
              <label> Password </label>
              <input type="password" id={styles.passwordfield} required />
            </div>
          </div>
          <div className={styles.itext}>
            <div className={styles.rememberme}>
              <input type="checkbox" className={styles.checkbox} />
              <p>Remember me</p>
            </div>
            <p>Forgot password?</p>
          </div>
          <input type="submit" className={styles.lbutton} value="Login" />
        </form>
      </div>
    );
  }
}

export default Login;
