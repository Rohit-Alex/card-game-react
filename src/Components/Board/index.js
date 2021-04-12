import React, { Component } from "react";
import Card from "../card";

import "./style.css";
export default class Board extends Component {
  constructor(props) {
    super(props);
    const emojis = [
      "🤕",
      "🤑",
      "🤠",
      "🤩",
      "🥳",
      "😏",
      "🤕",
      "🤑",
      "🤠",
      "🤩",
      "🥳",
      "😏",
    ];
    const emojiToShow = emojis
      .sort(() => Math.random() - 0.5)
      .map((elem) => {
        return {
          content: elem,
          faceUp: false,
        };
      });

    this.state = {
      emojiToShow: emojiToShow,
      firstClickId: null,
      total: emojis.length / 2,
      score: 1,
      counter: 0,
      timer: null,
      onOff: false,
    };
  }

  startCounter() {
    this.setState({ onOff: !this.state.onOff });
    this.state.timer = setInterval(() => {
      this.setState({ counter: this.state.counter + 1 });
    }, 1000);
  }

  actualFlipping(idx, faceUp) {
    this.setState({
      emojiToShow: this.state.emojiToShow.map((elem, i) => {
        if (i === idx) {
          return {
            content: elem.content,
            faceUp: !elem.faceUp,
          };
        } else {
          return elem;
        }
      }),
    });
    // console.log("id and faceUp", idx, faceUp);
  }

  flip(idx, faceUp) {
    if (this.state.onOff === true) {
      console.log("clicked on", idx);
      if (this.state.firstClickId === null) {
        this.setState({ firstClickId: idx });
      } else {
        const firstCardData = this.state.emojiToShow[this.state.firstClickId]
          .content;
        const secondCardData = this.state.emojiToShow[idx].content;
        // console.log(`first data: ${firstCardData} second data ${secondCardData}`);
        if (firstCardData === secondCardData) {
          this.setState({ firstClickId: null, score: this.state.score + 1 });
          if (this.state.total === this.state.score) {
            clearInterval(this.state.timer);
            alert(
              `Congratulations! you have solved this in ${this.state.counter}s`
            );
          }
        } else {
          setTimeout(() => {
            // console.log("firstClickId", this.state.firstClickId);
            this.actualFlipping(this.state.firstClickId);
            this.actualFlipping(idx);
            this.setState({ firstClickId: null });
          }, 2000);
        }
      }
      // console.log("firstClickId", this.state.firstClickId);
      this.actualFlipping(idx, !this.state.emojiToShow[idx].faceUp);
    }
  }

  render() {
    return (
      <div>
        <h1>Card Memory Game</h1>
        <div className="d-flex justify-content-center mt-5">
          <div className="card-container  mt-4">
            {this.state.emojiToShow.map((elem, i) => {
              return (
                <Card
                  key={i}
                  status={elem.content}
                  faceUp={elem.faceUp}
                  flip={() => {
                    this.flip(i, elem.faceUp);
                  }}
                />
              );
            })}
          </div>
        </div>
        <h4 className="mt-3">{this.state.counter}s</h4>
        <button
          className="btn  mt-2"
          onClick={() => {
            this.startCounter();
          }}
        >
          Start Game
        </button>
      </div>
    );
  }
}
