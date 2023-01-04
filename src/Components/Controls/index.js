import React, { Component } from 'react'
import "./style.css"
import move from "../../assets/Images/controls.png";
import like from "../../assets/Images/heart.png";
import setting from "../../assets/Images/setting.png";
import puzzle from "../../assets/Images/puzzle.png";
import sun from "../../assets/Images/sun.png";
import moon from "../../assets/Images/moon.png";

export default class Controls extends Component {
  render() {
    return (
      <div className="controls">
        <img src={move} alt="move keys" />
        <div className="settings">
          <img src={like} alt="like" />
          <img src={setting} alt="setting" />
          <img src={puzzle} alt="puzzle" />
        </div>
        <div className="theme">
          <img src={moon} alt="moon" />
          <img src={sun} alt="sun" />
        </div>
        <div className='line'></div>
      </div>
    );
  }
}
