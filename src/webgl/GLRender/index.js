import GLShaders from "../GLShaders";
import { fragmentShaderSource, vertexShaderSource } from "../GLSL/gaussian_filter";
import GLBuffers from "../GLBuffers";
import GLTexture from "../GLTexture";
import GLDraw from "../GLDraw";

export default (gl, filterValue) => {

    var shaderProgram = GLShaders(gl, vertexShaderSource, fragmentShaderSource, filterValue);

    const programInfo = {
        program: shaderProgram,
        attribLocations: {
            vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
            // vertexColor:    gl.getAttribLocation(shaderProgram, "aVertexColor"),
            textureCoord: gl.getAttribLocation(shaderProgram, "aTextureCoord"),
        },
        uniformLocations: {
            projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
            modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
            uSampler: gl.getUniformLocation(shaderProgram, 'uSampler'),
            resolution: gl.getUniformLocation(shaderProgram, 'u_resolution')
            // filterPower: gl.getUniformLocation(shaderProgram, "u_filterPower"),
        },
    };

    // var offsetLoc = gl.getUniformLocation(shaderProgram, "u_offset");
    // gl.uniform4fv(programInfo.uniformLocations.offsetLoc, [2.0 * filterValue, 0, 0, 0]);

    var src_info = GLTexture(gl, 'logo512.png');

    var buffer = GLBuffers(gl, src_info.img);

    gl.vertexAttribPointer(programInfo.attribLocations.vertexPosition, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);

    gl.vertexAttribPointer(programInfo.attribLocations.textureCoord, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(programInfo.attribLocations.textureCoord);

    GLDraw(gl, programInfo, buffer, src_info.textr);
};
