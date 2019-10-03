import React, { Component } from "react";
import Block from "./Block.js";
import Player from "./Player.js";
import Menu from "./Menu.js";

export default class BlockSampler extends Component {
  constructor(props) {
    super(props);
    var initBlocks = this.generateStartBlocks();
    this.state = {
      in_game: true,
      blocks: initBlocks,
      player: [2, 9],
      score: 0,
      level: 1,
      new_high_score: false
    };
  }

  _handleKeyDown = event => {
    switch (event.keyCode) {
      case 39: // press right
        if (this.state.player[0] < 4) {
          this.nextLine(1);
          break;
        } else {
          break;
        }
      case 37: // press left
        if (this.state.player[0] > 0) {
          this.nextLine(-1);
          break;
        } else {
          break;
        }
      case 40: // press down
        if (this.state.in_game) {
          this.nextLine(0);
          break;
        } else {
          this.setState({
            in_game: true,
            player: [2, 9],
            score: 0,
            blocks: this.generateStartBlocks(),
            new_high_score: false
          });
          break;
        }
      default:
        break;
    }
  };

  componentDidMount() {
    document.addEventListener("click", this._handleDocumentClick, false);
    document.addEventListener("keydown", this._handleKeyDown);
  }

  render() {
    if (this.state.in_game) {
      return (
        <div className="sampler">
          {this.state.blocks.map((block, i) => (
            <Block key={i} xPos={block[0]} yPos={block[1]} />
          ))}
          <Player xPos={this.state.player[0]} yPos={this.state.player[1]} />
          <div className="sampler-info">
            <div className="text">
              <span className="score">
                <span className="accent">Score:</span> {this.state.score}{" "}
              </span>
              <span className="level">
                <span className="accent">Level:</span> {this.state.level}
              </span>
            </div>
          </div>
        </div>
      );
    } else if (!this.state.in_game) {
      return (
        <div>
          <Menu
            new_high_score={this.state.new_high_score}
            high_score={localStorage.getItem("hc")}
            curr_score={this.state.score}
          />
        </div>
      );
    }
  }

  // Load next event when player move
  nextLine(direction) {
    // Move player
    this.setState({
      player: [this.state.player[0] + direction, this.state.player[1]]
    });
    // Check for game over
    for (var i = 0; i < this.state.blocks.length; i++) {
      this.state.blocks[i][1] += 1;
      if (
        this.state.blocks[i][0] === this.state.player[0] &&
        this.state.blocks[i][1] === 9
      ) {
        //Game over
        if (this.state.score > localStorage.getItem("hc")) {
          localStorage.setItem("hc", JSON.stringify(this.state.score));
          this.setState({
            new_high_score: true
          });
        }
        this.setState({
          in_game: false,
          blocks: [],
          player: [],
          level: 1
        });
      }
    }
    // update score & level
    this.setState({
      score: this.state.score + 1,
      level: Math.floor(this.state.score / 50) + 1,
      blocks: this.state.blocks.filter(function(value) {
        return value[1] <= 9;
      })
    });
    // spawn next line depending on lvl
    if (this.state.score % 2 === 1) {
      this.setState({
        blocks: [...this.state.blocks, [Math.floor(Math.random() * 5), 0]]
      });
    } else {
      var numOfBlocks = (Math.floor(this.state.level / 2) + 1) % 5;
      var n = numOfBlocks === 0 ? 3 : numOfBlocks;

      for (var i = 0; i < n; i++) {
        this.setState({
          blocks: [...this.state.blocks, [Math.floor(Math.random() * 5), 0]]
        });
      }
    }
    this.forceUpdate();
  }

  generateStartBlocks() {
    var blocks = [];
    for (var i = 0; i < 6; i++) {
      blocks.push([Math.floor(Math.random() * 5), i]);
    }
    return blocks;
  }
}
