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
      <canvas
        id="webgl"
        style={{ height: "100%", border: "1px solid black" }}
      ></canvas>
    );
  }
}
