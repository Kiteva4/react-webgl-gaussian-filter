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
        alignSelf: 'center',
        height: '100%',
        width:  '100%',
        border: "1px solid black",
        overflow: 'hidden',
      }}></canvas>
    );
  }
}
