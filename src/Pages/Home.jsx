import React, { Component } from "react";
import Controls from "../Components/Controls";
import Content from "../Components/Content";


export default class laning_page extends Component {
  render() {
    return (
      <section className="HomePage">
        <Controls />
        <Content />
      </section>
    );
  }
}
