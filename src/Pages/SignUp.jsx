import React, { Component } from "react";
import LeftSide from "../Components/LeftSide";
import GoogleIcon from "../assets/Images/google-icon.png";
import * as yup from "yup";
import swal from "sweetalert";
import { Link } from "react-router-dom";
import Input from "../Components/Input";

const regularExpression =
  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

const defaults = {
  email: "",
  password: "",
  passwordRepeat: "",
  checkbox: false,
  strength: "0",
};

const Backend = {
  email: "",
  password: "",
  checkbox: false,
};

export default class SignUp extends Component {
  state = {
    email: "",
    password: "",
    passwordRepeat: "",
    checkbox: false,
    dataToBeSent: Backend,
    strength: "0",
  };

  schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup
      .string()
      .min(8)
      .matches(
        regularExpression,
        "يجب أن تحتوي كلمة المرور على أحرف صغيرة وأحرف كبيرة وأرقام وشارات خاصة        "
      )
      .required(),
    passwordRepeat: yup
      .string()
      .oneOf([yup.ref("password"), null])
      .required(),
    checkbox: yup
      .boolean()
      .oneOf([true], "يجب عليك تحديد خانة الاختيار ")
      .required(),
  });

  checkPasswordStrength = (password) => {
    let strengthValue = 0;
    if (password.length >= 8) {
      strengthValue = strengthValue + 1;
    }
      if (password.match(/[a-z]/g) ) {
        strengthValue = strengthValue + 1;
      }
      if (password.match(/[A-Z]/g)) {
        strengthValue = strengthValue + 1;
      }
      if (password.match(/[0-9]/g)) {
        strengthValue = strengthValue + 1;
      }

      // Check if it contains Sympols 
      if (password.match(/[^0-9a-zA-Z\s]/g)) {
        strengthValue = strengthValue + 1;
      }
    this.setState({ strength: strengthValue.toString() });
  };

  handleChangeInput = (e) => {
    const { value, id } = e.target;
    this.setState({ [id]: value });

    if (e.target.id === "password") {
      this.checkPasswordStrength(e.target.value);
    }
  };

  handleChangeCheckbox = (e) => {
    const { checked } = e.target;
    this.setState({ checkbox: checked });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    this.schema
      .validate({
        email: this.state.email,
        password: this.state.password,
        passwordRepeat: this.state.passwordRepeat,
        checkbox: this.state.checkbox,
      })
      .then(() => {
        console.log("valid");
        swal({
          title: "نجاح العملية!",
          text: "تم التسجيل بنجاح ",
          icon: "success",
          timer: 2000,
          button: false,
        });
        this.setState((prevState) => ({
          dataToBeSent: {
            email: prevState.email,
            password: prevState.password,
            checkbox: prevState.checkbox,
          },
          ...defaults,
        }));
      })
      .catch((e) => {
         swal({
          title: "خطأ!",
          text: `${e.errors}`,
          icon: "error",
          button: false,
        });
      });
  };

  render() {
    return (
      <div className="The-Page">
        <LeftSide page="sign-up" />
        <div className="right-side">
          <Link to="/Sign-in">
            <span> &lt; </span> Back
          </Link>

          <div className="form-box">
            <h1>Register Individual Account!</h1>
            <p>
              For the purpose of gamers regulation, your details are required.
            </p>
            <form>
              <Input
                label="Email address*"
                id="email"
                type="text"
                placeholder="Enter email address"
                value={this.state.email}
                onChange={this.handleChangeInput}
              />

              <Input
                label="Create password*"
                id="password"
                type="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.handleChangeInput}
                passwordMessage={true}
                strength={this.state.strength}
              />
              <Input
                label="Repeat password*"
                id="passwordRepeat"
                type="password"
                placeholder="Repeat password"
                value={this.state.passwordRepeat}
                onChange={this.handleChangeInput}
              />

              <div
                style={{ display: "flex", alignItems: "center", gap: "5px" }}
                className="input-box"
              >
                <input
                  style={{ display: "inline", marginTop: "-5px" }}
                  id="checkbox"
                  type="checkbox"
                  onChange={this.handleChangeCheckbox}
                  checked={this.state.checkbox}
                />
                <label style={{ display: "inline" }} htmlFor="terms">
                  I agree to terms & conditions
                </label>
              </div>

              <div className="input-box">
                <input
                  onClick={this.handleSubmit}
                  type="submit"
                  value="Register Account"
                />
              </div>
              <span>or</span>
              <div className="input-box">
                <Link to="/Sign-in">
                  <button type="submit">
                    <img src={GoogleIcon} alt="google-icon" />
                    login
                  </button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
