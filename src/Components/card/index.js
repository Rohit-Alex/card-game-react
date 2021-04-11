import React from "react";
import "./style.css";

class Card extends React.Component {
  render() {
    let status;
    if (this.props.faceUp) {
      status = this.props.status;
    } else {
      status = "";
    }
    return (
      <div
        onClick={this.props.flip}
        className={`card ${this.props.faceUp ? "face-up" : ""}`}
      >
        {status}
      </div>
    );
  }
}

export default Card;
