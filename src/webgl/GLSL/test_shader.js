// export var vertexShaderSource = `
//     attribute vec4 aVertexPosition;
//     attribute vec4 aVertexColor;
  
//     uniform mat4 uMVMatrix;
//     uniform mat4 uPMatrix;

//     uniform vec4 u_offset;

//     varying highp vec2 vTextureCoord;

//     void main(void) {
//       gl_Position = uPMatrix * uMVMatrix * aVertexPosition + u_offset;
//       vColor = vTextureCoord;
//     }
//   `;

// export var fragmentShaderSource = `
//   varying lowp vec4 vColor;

//   void main(void) {
//     gl_FragColor = vColor;
//   }
//   `;
