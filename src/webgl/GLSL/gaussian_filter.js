export var vertexShaderSource = `
    attribute vec4 aVertexPosition;
    attribute vec4 aVertexColor;
  
    uniform mat4 uMVMatrix;
    uniform mat4 uPMatrix;
    
    varying lowp vec4 vColor;
  
    void main(void) {
      gl_Position = uPMatrix * uMVMatrix * aVertexPosition;
      vColor = aVertexColor;
    }
  `;

export var fragmentShaderSource = `
  varying lowp vec4 vColor;
  uniform float foo;

  void main(void) {
    gl_FragColor = vColor*foo;
  }
  `;
