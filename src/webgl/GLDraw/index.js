import GLC from '../GLCleaner';
import { makePerspective } from '../utils/glUtils';
import { Matrix, $V } from '../utils/sylvester'

export default (gl, programInfo, buffers) => {
    GLC.init(gl);
    GLC.clear(1.0, 0.0, 0.0, 1.0);

    var perspectiveMatrix = makePerspective(45, 640.0 / 480.0, 0.1, 100.0);

    loadIdentity();
    mvTranslate([-0.0, 0.0, -6.0]);

    gl.vertexAttribPointer(
        programInfo.attribLocations.vertexPosition,
        3,
        gl.FLOAT,
        false,
        0,
        0);
    setMatrixUniforms(gl, perspectiveMatrix);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
}

function loadIdentity(m) {
    mvMatrix = Matrix.I(4);
}

function multMatrix(m) {
    mvMatrix = mvMatrix.x(m);
}

function mvTranslate(v) {
    multMatrix(Matrix.Translation($V([v[0], v[1], v[2]])).ensure4x4());
}

function setMatrixUniforms(gl, perspectiveMatrix) {
    var pUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
    gl.uniformMatrix4fv(pUniform, false, new Float32Array(perspectiveMatrix.flatten()));

    var mvUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
    gl.uniformMatrix4fv(mvUniform, false, new Float32Array(mvMatrix.flatten()));
}