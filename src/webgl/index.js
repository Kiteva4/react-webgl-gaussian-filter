import React from "react";
import GLInit from "./GLInit";
import GLDrawImage from "./GLDrawImage";
import GLShaders from "./GLShaders";
import { fragmentShaderSource, vertexShaderSource } from "./GLSL/image_shader_2";
import GLBuffers from "./GLBuffers";
import GLTexture from "./GLTexture";

// import webglUtils from "./utils/webgl-utils"

var gl
var shaderProgram
var programInfo
var buffers
var src_info

export default class WebGL extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      image_url: this.props.image_url,
    }
  }
  /*Init*/
  componentDidMount() {

    gl = GLInit();

    shaderProgram = GLShaders(gl, vertexShaderSource, fragmentShaderSource);

    src_info = GLTexture(gl, this.state.image_url);

    programInfo = {
      program: shaderProgram,
      attribLocations: {
        vertexPosition: gl.getAttribLocation(shaderProgram, 'a_position'),
        textureCoord: gl.getAttribLocation(shaderProgram, 'a_texCoord'),
      },
      uniformLocations: {
        projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
        modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
        uSampler: gl.getUniformLocation(shaderProgram, 'uSampler'),
        resolution: gl.getUniformLocation(shaderProgram, 'u_resolution'),
      }
    };

    buffers = GLBuffers(gl, { width: 512, height: 512 });
  }

   /* Draw*/
  componentDidUpdate() {

    if (this.state.image_url !== this.props.image_url) {
      this.setState({ image_url: this.props.image_url })
    }

    GLDrawImage(
      gl,
      buffers,
      programInfo,
      src_info,
      this.props.filterValue,
    );
  }

  render() {
    return (
      <canvas id="webgl"
        style={{
          alignSelf: 'center',
          height: '100%',
          width: '100%',
          border: "1px solid black",
          overflow: 'hidden',
        }}
      >
      </canvas>
    );
  }
}