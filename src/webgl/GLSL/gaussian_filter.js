var vertCode =
    'attribute vec3 coordinates;' +

    'void main(void) {' +
    ' gl_Position = vec4(coordinates, 1.0);' +
    '}';

var fragCode =
    'void main(void) {' +
    ' gl_FragColor = vec4(0, 0.8, 0, 1);' +
    '}';

export default () => {

    getVertexShaderCode() = () => vertCode;
    getFragmentShaderCode() = () => fragCode;
}