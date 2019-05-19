import React from "react";

export class Block extends React.Component {
  render() {
    return (
      <div
        className="block"
        style={{
          left: 10 + 35 * this.props.xPos + "px",
          top: 10 + 35 * this.props.yPos + "px"
        }}
      />
    );
  }
}

export default Block;
