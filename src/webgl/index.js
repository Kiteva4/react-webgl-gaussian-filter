import * as React from "react";
import GLInit from "./GLInit";
import GLRender from "./GLRender";

var gl;

export default class WebGL extends React.Component {
  componentDidUpdate() {
    GLRender(gl, this.props.filterValue);
  }

  componentDidMount() {
    gl = GLInit();
  }

  render() {
    return (
      <canvas id="webgl" style={{
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        border: "1px solid black"
      }}></canvas>
    );
  }
}
