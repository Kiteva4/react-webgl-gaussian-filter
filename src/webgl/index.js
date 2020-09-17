import * as React from "react";
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
// var image
export default class WebGL extends React.Component {

  /*Init*/
  componentDidMount() {

    gl = GLInit();

    shaderProgram = GLShaders(gl, vertexShaderSource, fragmentShaderSource);

    src_info = GLTexture(gl, 'logo512.png');

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

    
    buffers = GLBuffers(gl, {width: 512, height: 512});
  }

  /* Draw*/
  componentDidUpdate() {
    
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
      <>
        <canvas
          id="webgl"
          style={{
            width: '100%',
            height: '100%',
            border: "1px solid black"
          }}>
        </canvas>
      </>
    );
  }
}