import React, { Component } from "react";
import styles from "./index.module.scss";
import logo from "../../images/HeaderNavLogoRunner.png";

class Post extends Component {
  //converts every first letter to upper case
  toUpper(str) {
    let split = str.toLowerCase().split(" ");
    for (let i = 0; i < split.length; i++) {
      split[i] = split[i].charAt(0).toUpperCase() + split[i].substring(1);
    }
    return split.join(" ");
  }

  //splices body string at random position,
  //splices string back together with raptors string
  raptorize(str) {
    let raptors = "The Toronto Raptors are going to win the finals";
    let random = Math.random() * str.length;
    let newString = [str.slice(0, random), raptors, str.slice(random)].join(
      " "
    );
    return newString;
  }
  render() {
    const { post } = this.props;
    return (
      <div className={styles.postsbody__post} key={post.id}>
        <h2>{this.toUpper(post.title)}</h2>
        <p>{this.raptorize(post.body)}</p>
        <div className={styles.postIds}>
          <p>UserID: {post.userId}</p>
          <p>PostID: {post.id}</p>
        </div>
      </div>
    );
  }
}

class posts extends Component {
  state = {
    data: {},
    isLoading: true
  };

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then(response => response.json())
      .catch(e => {
        console.log(e);
      })
      .then(data => {
        this.setState({ data, isLoading: false });
      });
  }

  //Logout, removes 'username' token from local storage
  //refreshes the page taking user back to login
  logout = () => {
    localStorage.removeItem("username");
    this.props.history.push("/login");
  };

  render() {
    return (
      <div className={styles.postspage}>
        {this.state.isLoading ? (
          "..Loading"
        ) : (
          <>
            <div className={styles.header}>
              <img src={logo} className={styles.logo} alt="Runner Logo" />
              <a href="#" onClick={this.logout}>
                <h2>Logout</h2>
              </a>
            </div>

            <div className={styles.postsbody}>
              {this.state.data.map(post => (
                <Post post={post} key={post.id} />
              ))}
            </div>
          </>
        )}
      </div>
    );
  }
}

export default posts;
