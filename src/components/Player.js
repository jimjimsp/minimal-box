import React from "react";

export class Player extends React.Component {
  render() {
    return (
      <div
        className="block player"
        style={{
          left: 10 + 35 * this.props.xPos + "px",
          top: 10 + 35 * this.props.yPos + "px"
        }}
      />
    );
  }
}

export default Player;
