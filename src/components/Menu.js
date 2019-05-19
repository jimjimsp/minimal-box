import React from "react";

export class Menu extends React.Component {
  render() {
    if (this.props.new_high_score) {
      return (
        <div className="menu">
          <h1 className="accent">GAME OVER</h1>
          <p>Press down to play again...</p>

          <div className="highscore">
            <h3 className="scoreset">New!</h3>
            <p className="accent">High Score</p>
            <p>{this.props.high_score}</p>
          </div>
        </div>
      );
    } else {
      return (
        <div className="menu">
          <h1 className="accent">GAME OVER</h1>
          <p>Press down to play again...</p>

          <div className="highscore">
            <p className="accent">High Score</p>
            <p>{this.props.high_score}</p>
          </div>
          <div className="currscore">
            <p className="accent">Your Score</p>
            <p>{this.props.curr_score}</p>
          </div>
        </div>
      );
    }
  }
}

export default Menu;
