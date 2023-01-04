import React, { Component } from "react";
import LeftSide from "../Components/LeftSide";
import googleicon from "../assets/Images/google-icon.png";
import github from "../assets/Images/github.png";
import linkedin from "../assets/Images/linkedin.png";
import twitter from "../assets/Images/twitter.png";
import eye from "../assets/Images/eye.png";
import * as yup from "yup";
import swal from "sweetalert";
import { Link } from "react-router-dom";

const regularExpression =
  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

const defaults = {
  email: "",
  password: "",
};

const Backend = {
  email: "rafeeqissa319@gmail.com",
  password: "20201507***",
};

export default class SignIn extends Component {
  state = {
    email: "",
    password: "",
    dataToBeSent: Backend,
    passwordtype: "password",
  };

  schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup
      .string()
      .min(8, "Password should be more than 8 characters")
      .matches(
        regularExpression,
        "Password should be strong (numbers,capital and small letters ,sympol"
      )
      .required(),
  });

  componentDidMount() {
    this.setState((prevState) => ({
      email: prevState.dataToBeSent.email,
      password: prevState.dataToBeSent.password,
    }));
  }

  handleChangeInput = (e) => {
    const { value, id } = e.target;
    this.setState({ [id]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    this.schema
      .validate(
        {
          email: this.state.email,
          password: this.state.password,
        },
        { abortEarly: true }
      )
      .then(() => {
        console.log("valid");
        swal({
          title: "نجاح العملة!",
          text: "تم تسجيل الدخول بناج",
          icon: "success",
          timer: 3000,
          button: false,
        });
        this.setState((prevState) => ({
          dataToBeSent: {
            email: prevState.email,
            password: prevState.password,
          },
          ...defaults,
        }));

      })
      .catch((e) => {
        console.log(e.errors);
        swal({
          title: "Error!",
          text: `${e.errors}`,
          icon: "error",
          button: false,
        });
      });
  };

  showpassword = () => {
    this.setState((prevState) => ({
      passwordtype: prevState.passwordtype === "text" ? "password" : "text",
    }));
  };



  render() {
    return (
      <div className="The-Page">
        <LeftSide page="sign-in" />
        <div className="right-side-signin">
          <div className="form-box">
            <h1>Join the game!</h1>
            <p>Go inside the best gamers social network! </p>
            <ul>
              <li>
                <a href="https">
                  <img src={googleicon} alt="googleicon" />
                </a>
              </li>

              <li>
                <a href="https">
                  <img src={twitter} alt="twitter" />
                </a>
              </li>
              <li>
                <a href="https">
                  <img src={linkedin} alt="linkedin" />
                </a>
              </li>
              <li>
                <a href="https">
                  <img src={github} alt="github" />
                </a>
              </li>
            </ul>
            <div className="or">Or</div>
            <form onSubmit={this.handleSubmit}>
              <div className="input-box">
                <label htmlFor="email">Your email</label>
                <input
                  value={this.state.email}
                  onChange={this.handleChangeInput}
                  id="email"
                  type="text"
                  placeholder="Write your email"
                />
              </div>
              <div style={{ position: "relative" }} className="input-box">
                <img
                  style={{
                    position: "absolute",
                    top: "50px",
                    right: "20px",
                    cursor: "pointer",
                  }}
                  src={eye}
                  alt="eye"
                  onClick={this.showpassword}
                />
                <label htmlFor="password">Enter your password</label>
                <input
                  value={this.state.password}
                  onChange={this.handleChangeInput}
                  id="password"
                  type={this.state.passwordtype}
                  placeholder="•••••••••"
                />
              </div>

              <div className="input-box">
                <input type="submit" value="Login" />
              </div>

              <Link to="/Sign-up">
                Don’t have an account?
                <span style={{ color: "blue" }}> Register</span>
              </Link>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
