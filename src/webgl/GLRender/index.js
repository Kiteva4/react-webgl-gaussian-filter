import GLBuffers from "../GLBuffers";
import GLDraw from "../GLDraw";
import { fragmentShaderSource, vertexShaderSource } from "../GLSL/gaussian_filter";
import GLShaders from "../GLShaders";

export default (gl, filterValue) => {

var shaderProgram = GLShaders(gl, vertexShaderSource, fragmentShaderSource, filterValue);

    const programInfo = {
        program: shaderProgram,
        attribLocations: {
            vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
            vertexColor: gl.getAttribLocation(shaderProgram, "aVertexColor"),
        },
        uniformLocations: {
            projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
            modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
        },
    };

    gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
    gl.enableVertexAttribArray(programInfo.attribLocations.vertexColor);

    var buffer = GLBuffers(gl);

    GLDraw(gl, programInfo, buffer);
};
