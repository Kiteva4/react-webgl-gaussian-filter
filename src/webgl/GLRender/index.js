import GLBuffers from '../GLBuffers'
import GLDraw from '../GLDraw'
import glsl from '../GLSL'
import GLShaders from '../GLShaders'

export default (gl) => {

    var shaderProgram;

    GLShaders(
        gl,
        {
            vertexShaderCode: glsl.getVertexShader(),
            fragmentShaderCode: glsl.getFragmentShader()
        },
        shaderProgram
    )

    const programInfo = {
        program: shaderProgram,
        attribLocations: {
            vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
        },
        uniformLocations: {
            projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
            modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
        },
    };

    gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);

    const buffers = initBuffers(gl);

    GLDraw(gl, programInfo, buffers);
}