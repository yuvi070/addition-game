import { Component } from "react";
import "./index.css";

class Addition extends Component {
  state = {
    num1: Math.floor(Math.random() * 10),
    num2: Math.floor(Math.random() * 10),
    score: 0,
    answer: "",
    seconds: 60,
    isActive: true,
  };

  componentDidMount() {
    clearInterval(this.timerId);
    this.timerId = setInterval(this.tick, 1000);
  }

  tick = () => {
    const { seconds } = this.state;
    if (seconds === 0) {
      clearInterval(this.timerId);
      this.setState({ seconds: 60, isActive: false });
    } else {
      this.setState((prev) => ({ seconds: prev.seconds - 1 }));
    }
  };

  onClickSubmit = () => {
    const { num1, num2, answer } = this.state;
    // this.timerId = setInterval(this.tick, 1000);
    const answer1 = num1 + num2;
    if (answer === answer1) {
      console.log("Correct Answer");
      this.setState((prev) => ({
        score: prev.score + 1,
        num1: Math.floor(Math.random() * 10),
        num2: Math.floor(Math.random() * 10),
        answer: "",
      }));
    } else {
      clearInterval(this.timerId);
      this.setState({ isActive: false, seconds: 60 });
    }
    // this.setState({ num1: ram1, num2: ram2 });
  };

  onChangeInput = (event) => {
    this.setState({ answer: Number(event.target.value) });
  };

  playAgain = () => {
    clearInterval(this.timerId);
    this.timerId = setInterval(this.tick, 1000);
    this.setState({ isActive: true, answer: "" });
  };

  render() {
    // const randomNumbers = this.randomFunc();
    const { num1, num2, answer, score, seconds, isActive } = this.state;
    console.log(typeof answer);
    console.log(num1);

    return (
      <div className="home oswald-newfont">
        {isActive && (
          <div className="card">
          <h1>Addition Game</h1>
            <h1>{seconds}</h1>
            <h1 className="main-heading">
              {num1} + {num2} = ?
            </h1>
            <input
              type="text"
              onChange={this.onChangeInput}
              placeholder="Answer"
              value={answer}
              className="input"
            />
            <br />
            <button type="button" className="button" onClick={this.onClickSubmit}>
              Submit
            </button>
            <h1>Top Score: {score}</h1>
          </div>
        )}
        {!isActive && (
          <div className="card">
            <h1>Game Over</h1>
            <h3>Your Score: {score}</h3>
            <button type="button" onClick={this.playAgain}>
              Play Again
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default Addition;
