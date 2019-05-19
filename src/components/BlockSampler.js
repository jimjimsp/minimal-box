import React from "react";
import Block from "./Block.js";
import Player from "./Player.js";
import Menu from "./Menu.js";

export class BlockSampler extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      in_game: false,
      blocks: [
        [Math.floor(Math.random() * 5), 0],
        [Math.floor(Math.random() * 5), 1],
        [Math.floor(Math.random() * 5), 2],
        [Math.floor(Math.random() * 5), 3],
        [Math.floor(Math.random() * 5), 4],
        [Math.floor(Math.random() * 5), 5]
      ],
      player: [0, 9],
      score: 0,
      level: 1,
      new_high_score: true
    };
  }

  _handleKeyDown = event => {
    switch (event.keyCode) {
      // Left Right
      case 39:
        if (this.state.player[0] < 4) {
          this.movePlayer(1);
          break;
        } else {
          break;
        }
      // Move Left
      case 37:
        if (this.state.player[0] > 0) {
          this.movePlayer(-1);
          break;
        } else {
          break;
        }
      case 40:
        if (this.state.in_game) {
          this.movePlayer(0);
          break;
        } else {
          this.setState({
            in_game: true
          });
          this.newGame();
        }

      default:
        break;
    }
  };

  componentDidMount() {
    document.addEventListener("click", this._handleDocumentClick, false);
    document.addEventListener("keydown", this._handleKeyDown);
  }

  componentWillMount() {
    document.addEventListener("click", this._handleDocumentClick, false);
    document.addEventListener("keydown", this._handleKeyDown);
  }

  render() {
    if (this.state.in_game) {
      return (
        <div className="sampler">
          {this.state.blocks.map(block => (
            <Block xPos={block[0]} yPos={block[1]} />
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
            <div className="level" />
          </div>
        </div>
      );
    } else if (!this.state.in_game) {
      return (
        <div>
          <Menu
            new_high_score={this.state.new_high_score}
            high_score={this.getHighScore()}
            curr_score={this.state.score}
          />
        </div>
      );
    }
  }

  movePlayer(direction) {
    this.setState({
      player: [this.state.player[0] + direction, this.state.player[1]]
    });
    this.setNextStage();
  }

  setNextStage() {
    for (var i = 0; i < this.state.blocks.length; i++) {
      this.state.blocks[i][1] += 1;
    }
    this.setState({
      score: this.state.score + 1
    });
    this.checkLevelUp();
    this.checkOutOfBounds();
    this.addEnemy();
    this.checkCollision();
    this.forceUpdate();
  }

  checkOutOfBounds() {
    this.setState({
      blocks: this.state.blocks.filter(function(value, index, arr) {
        return value[1] <= 9;
      })
    });
  }

  checkCollision() {
    for (var i = 0; i < this.state.blocks.length; i++) {
      if (
        this.state.blocks[i][0] === this.state.player[0] &&
        this.state.blocks[i][1] === 9
      ) {
        this.gameOver(this.state.score);
      }
    }
  }

  addEnemy() {
    if (this.state.level === 1) {
      this.oneRand();
    } else if (this.state.level === 2) {
      if (this.state.score % 2 == 0) {
        this.oneRand();
      } else {
        this.twoRand();
      }
    } else if (this.state.level === 3) {
      if (this.state.score % 2 == 0) {
        this.oneRand();
      } else if (this.state.score % 3 == 0) {
        this.twoRand();
      } else {
        this.threeRand();
      }
    } else if (this.state.level === 4) {
      if (this.state.score % 2 == 0) {
        this.oneRand();
      } else {
        this.threeRand();
      }
    } else if (this.state.level === 5) {
      if (this.state.score % 2 == 0) {
        this.oneRand();
      } else {
        this.twoAdj();
      }
    } else if (this.state.level === 6) {
      if (this.state.score % 2 == 0 || this.state.score % 3 == 0) {
        this.oneRand();
      } else {
        this.threeAdj();
      }
    } else if (this.state.level === 7) {
      if (this.state.score % 2 == 0) {
        this.twoRand();
      } else if (this.state.score % 3 == 0) {
        this.oneRand();
      } else if (this.state.score % 5 == 0) {
        this.twoAdj();
      } else if (this.state.score % 7 == 0) {
        this.threeAdj();
      } else {
        this.oneRand();
      }
    } else if (this.state.level === 8) {
      if (this.state.score % 4 == 0) {
        this.fourRand();
      } else if (this.state.score % 4 == 1) {
        this.noneRand();
      } else {
        this.oneRand();
      }
    } else if (this.state.level === 9) {
      if (this.state.score % 3 == 0) {
        this.threeAdj();
      } else if (this.state.score % 3 == 1) {
        this.noneRand();
      } else if (this.state.score % 5 == 0) {
        this.fourRand();
      } else if (this.state.score % 5 == 1) {
        this.noneRand();
      } else {
        this.oneRand();
      }
    } else if (this.state.level >= 10) {
      if (this.state.score % 3 == 0) {
        this.twoRand();
      } else if (this.state.score % 5 == 0) {
        this.threeAdj();
      } else if (this.state.score % 5 == 1) {
        this.oneRand();
      } else if (this.state.score % 7 == 0) {
        this.fourRand();
      } else if (this.state.score % 7 == 1) {
        this.noneRand();
      } else {
        this.oneRand();
      }
    }
  }

  checkLevelUp() {
    this.setState({
      level: Math.floor(this.state.score / 50) + 1
    });
  }

  // High Score System

  gameOver(score) {
    this.setHighScore(score);
    this.setState({
      in_game: false,
      blocks: [],
      player: [],
      level: 1
    });
  }

  getHighScore() {
    var high_score = localStorage.getItem("hc");
    return high_score;
  }

  setHighScore(score) {
    if (score > this.getHighScore()) {
      localStorage.setItem("hc", JSON.stringify(score));
      this.setState({
        new_high_score: true
      });
    }
  }

  newGame() {
    this.setState({
      player: [2, 9],
      score: 0,
      blocks: [
        [Math.floor(Math.random() * 5), 0],
        [Math.floor(Math.random() * 5), 1],
        [Math.floor(Math.random() * 5), 2],
        [Math.floor(Math.random() * 5), 3],
        [Math.floor(Math.random() * 5), 4],
        [Math.floor(Math.random() * 5), 5]
      ],
      new_high_score: false
    });
  }

  // Spawning tactics

  noneRand() {
    this.setState({
      blocks: [...this.state.blocks]
    });
  }

  oneRand() {
    this.setState({
      blocks: [...this.state.blocks, [Math.floor(Math.random() * 5), 0]]
    });
  }

  twoRand() {
    this.setState({
      blocks: [
        ...this.state.blocks,
        [Math.floor(Math.random() * 5), 0],
        [Math.floor(Math.random() * 5), 0]
      ]
    });
  }

  threeRand() {
    this.setState({
      blocks: [
        ...this.state.blocks,
        [Math.floor(Math.random() * 5), 0],
        [Math.floor(Math.random() * 5), 0],
        [Math.floor(Math.random() * 5), 0]
      ]
    });
  }

  fourRand() {
    this.setState({
      blocks: [
        ...this.state.blocks,
        [Math.floor(Math.random() * 5), 0],
        [Math.floor(Math.random() * 5), 0],
        [Math.floor(Math.random() * 5), 0],
        [Math.floor(Math.random() * 5), 0]
      ]
    });
  }

  twoAdj() {
    var int = Math.floor(Math.random() * 4);
    this.setState({
      blocks: [...this.state.blocks, [int, 0], [int + 1, 0]]
    });
  }

  threeAdj() {
    var int = Math.floor(Math.random() * 3);
    this.setState({
      blocks: [...this.state.blocks, [int, 0], [int + 1, 0], [int + 2, 0]]
    });
  }
}

export default BlockSampler;
