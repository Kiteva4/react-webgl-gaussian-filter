import React from "react";
import { View } from 'react-native'
import GLInit from "./GLInit";
import GLDrawImage from "./GLDrawImage";
import GLShaders from "./GLShaders";
import { fragmentShaderSource, vertexShaderSource } from "./GLSL/gaussian_filter_shader";
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
      view_width: 0,
      view_height: 0,
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.onUpdateDimensions, false);
    window.addEventListener('load', this.onUpdateDimensions, false)

    this.GLInits();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onUpdateDimensions, false);
    window.removeEventListener('load', this.onUpdateDimensions, false);
  }

  componentDidUpdate() {
    if (src_info.img.src !== this.props.image_url) {
      this.GLInits();
    }

    this.Draw();
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <canvas id="webgl"
          style={{
            alignSelf: 'center',
            height: '100%',
            width: '100%',
            // border: "1px solid black",
            overflow: 'hidden',
          }}
        >
        </canvas>
      </View>
    );
  }

  GLInits() {
    gl = GLInit();

    shaderProgram = GLShaders(gl, vertexShaderSource, fragmentShaderSource);

    src_info = GLTexture(gl, this.props.image_url, this.onImageLoadedHandler);

    programInfo = {
      program: shaderProgram,
      attribLocations: {
        vertexPosition: gl.getAttribLocation(shaderProgram, 'a_position'),
        textureCoord: gl.getAttribLocation(shaderProgram, 'a_texCoord'),
      },
      uniformLocations: {
        vResolution: gl.getUniformLocation(shaderProgram, 'u_resolution_vert'),
        fResolution: gl.getUniformLocation(shaderProgram, 'u_resolution_frag'),
        filterPower: gl.getUniformLocation(shaderProgram, 'u_filterPower'),
      }
    };
  }

  Draw() {
    GLDrawImage(
      gl,
      buffers,
      programInfo,
      src_info,
      this.props.filterValue
    );
  }

  onUpdateDimensions = () => {
    buffers = GLBuffers(gl, src_info.img.width, src_info.img.height);
    this.setState({ view_width: gl.drawingBufferWidth, view_height: gl.drawingBufferHeight });
  };

  onImageLoadedHandler = (_width, _height) => {
    buffers = GLBuffers(gl, _width, _height);
    this.setState({ view_height: gl.drawingBufferHeight, view_width: gl.drawingBufferWidth })
  }
}