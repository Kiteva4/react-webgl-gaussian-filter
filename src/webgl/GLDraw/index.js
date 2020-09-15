import GLC from "../GLCleaner";
import { makePerspective } from "../utils/glUtils";
import { Matrix, $V } from "../utils/sylvester";

var mvMatrix;

export default (gl, programInfo, buffers, texture) => {
    // GLC.init(gl);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    GLC.clear(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    var perspectiveMatrix = makePerspective(45, 640.0 / 480.0, 0.1, 100.0);

    loadIdentity();
    
    // const modelViewMatrix = mat4.create();

    mvTranslate([-0.0, 0.0, -6.0]);

    // Tell WebGL which indices to use to index the vertices
    // gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices);
  
    gl.useProgram(programInfo.program);

    setMatrixUniforms(gl, perspectiveMatrix, programInfo);
    
    // Tell WebGL we want to affect texture unit 0
    gl.activeTexture(gl.TEXTURE0);
      // Bind the texture to texture unit 0
    gl.bindTexture(gl.TEXTURE_2D, texture);

    // gl.uniform1i(programInfo.uniformLocations.uSampler, 0);
    gl.uniform2f(programInfo.uniformLocations.resolution, gl.canvas.width, gl.canvas.height);
  
    // const vertexCount = 6;
    // const type = gl.UNSIGNED_SHORT;
    // const offset = 0;
    gl.drawArrays(gl.TRIANGLES, 0, 6);    
    // gl.uniformMatrix4fv(
    //     programInfo.uniformLocations.projectionMatrix,
    //     false,
    //     projectionMatrix);
    // gl.uniformMatrix4fv(
    //     programInfo.uniformLocations.modelViewMatrix,
    //     false,
    //     modelViewMatrix);
    
    // // Draw the rectangle.
    // var primitiveType = gl.TRIANGLES;
    // var offset = 0;
    // var count = 6;
    // gl.drawArrays(primitiveType, offset, count);
};

function loadIdentity() {
  mvMatrix = Matrix.I(4);
}

function multMatrix(m) {
  mvMatrix = mvMatrix.x(m);
}

function mvTranslate(v) {
  multMatrix(Matrix.Translation($V([v[0], v[1], v[2]])).ensure4x4());
}

function setMatrixUniforms(gl, perspectiveMatrix, programInfo) {
  var pUniform = gl.getUniformLocation(programInfo.program, "uPMatrix");
  gl.uniformMatrix4fv(
    pUniform,
    false,
    new Float32Array(perspectiveMatrix.flatten())
  );

  var mvUniform = gl.getUniformLocation(programInfo.program, "uMVMatrix");
  gl.uniformMatrix4fv(mvUniform, false, new Float32Array(mvMatrix.flatten()));
}
