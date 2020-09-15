// Vertex shader program

//   const vsSource = `
//     attribute vec4 aVertexPosition;
//     attribute vec2 aTextureCoord;
//     uniform mat4 uModelViewMatrix;
//     uniform mat4 uProjectionMatrix;
//     varying highp vec2 vTextureCoord;
//     void main(void) {
//       gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
//       vTextureCoord = aTextureCoord;
//     }
//   `;

//   // Fragment shader program

//   const fsSource = `
//     varying highp vec2 vTextureCoord;
//     uniform sampler2D uSampler;
//     void main(void) {
//       gl_FragColor = texture2D(uSampler, vTextureCoord);
//     }
//   `;
export var vertexShaderSource = `
    attribute vec2 aVertexPosition;
    attribute vec2 aTextureCoord;

    uniform vec2 u_resolution;

    varying vec2 v_texCoord;

    void main() {
        // convert the rectangle from pixels to 0.0 to 1.0
        vec2 zeroToOne = aVertexPosition / u_resolution;

        // convert from 0->1 to 0->2
        vec2 zeroToTwo = zeroToOne * 2.0;

        // convert from 0->2 to -1->+1 (clipspace)
        vec2 clipSpace = zeroToTwo - 1.0;

        gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);

        // pass the texCoord to the fragment shader
        // The GPU will interpolate this value between points.
        v_texCoord = aTextureCoord;
    }
`;

export var fragmentShaderSource  = `
precision mediump float;

// our texture
uniform sampler2D uSampler;

// the texCoords passed in from the vertex shader.
varying vec2 v_texCoord;

void main() {
   gl_FragColor = texture2D(uSampler, v_texCoord);
}
`;


/*-------------------------------------------------*/
// export var vertexShaderSource = `
//     attribute vec4 aVertexPosition;
//     attribute vec2 aTextureCoord;
//     uniform mat4 uModelViewMatrix;
//     uniform mat4 uProjectionMatrix;
//     varying highp vec2 vTextureCoord;

//     void main(void) {
//         gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
//         vTextureCoord = aTextureCoord;
//     }
// `;


// export var fragmentShaderSource  = `
//     varying highp vec2 vTextureCoord;
//     uniform sampler2D uSampler;
//     void main(void) {
//         gl_FragColor = texture2D(uSampler, vTextureCoord);
//     }
// `;

// export var fragmentShaderSource = `
// #define GLSLIFY 1

// // Common uniforms
// uniform vec2 u_resolution;
// // uniform float u_filterPower;

// // Texture uniforms
// uniform sampler2D u_texture;

// // Texture varyings
// varying vec2 vTextureCoord;

// /*
//  * The main program
//  */
// void main() {
//     // Calculate the pixel color based on the mouse position
//         vec3 pixel_color;

//         // float step = 1.0 + 2.0;
//         // pixel_color += ( 1.0 / 256.0) * texture2D(u_texture, vTextureCoord + step * vec2(-2, -2) / u_resolution).rgb;
//         // pixel_color += ( 4.0 / 256.0) * texture2D(u_texture, vTextureCoord + step * vec2(-2, -1) / u_resolution).rgb;
//         // pixel_color += ( 6.0 / 256.0) * texture2D(u_texture, vTextureCoord + step * vec2(-2,  0) / u_resolution).rgb;
//         // pixel_color += ( 4.0 / 256.0) * texture2D(u_texture, vTextureCoord + step * vec2(-2,  1) / u_resolution).rgb;
//         // pixel_color += ( 1.0 / 256.0) * texture2D(u_texture, vTextureCoord + step * vec2(-2,  2) / u_resolution).rgb;
//         // pixel_color += ( 4.0 / 256.0) * texture2D(u_texture, vTextureCoord + step * vec2(-1, -2) / u_resolution).rgb;
//         // pixel_color += (16.0 / 256.0) * texture2D(u_texture, vTextureCoord + step * vec2(-1, -1) / u_resolution).rgb;
//         // pixel_color += (24.0 / 256.0) * texture2D(u_texture, vTextureCoord + step * vec2(-1,  0) / u_resolution).rgb;
//         // pixel_color += (16.0 / 256.0) * texture2D(u_texture, vTextureCoord + step * vec2(-1,  1) / u_resolution).rgb;
//         // pixel_color += ( 4.0 / 256.0) * texture2D(u_texture, vTextureCoord + step * vec2(-1,  2) / u_resolution).rgb;
//         // pixel_color += ( 6.0 / 256.0) * texture2D(u_texture, vTextureCoord + step * vec2( 0, -2) / u_resolution).rgb;
//         // pixel_color += (24.0 / 256.0) * texture2D(u_texture, vTextureCoord + step * vec2( 0, -1) / u_resolution).rgb;
//         // pixel_color += (36.0 / 256.0) * texture2D(u_texture, vTextureCoord + step * vec2( 0,  0) / u_resolution).rgb;
//         // pixel_color += (24.0 / 256.0) * texture2D(u_texture, vTextureCoord + step * vec2( 0,  1) / u_resolution).rgb;
//         // pixel_color += ( 6.0 / 256.0) * texture2D(u_texture, vTextureCoord + step * vec2( 0,  2) / u_resolution).rgb;
//         // pixel_color += ( 4.0 / 256.0) * texture2D(u_texture, vTextureCoord + step * vec2( 1, -2) / u_resolution).rgb;
//         // pixel_color += (16.0 / 256.0) * texture2D(u_texture, vTextureCoord + step * vec2( 1, -1) / u_resolution).rgb;
//         // pixel_color += (24.0 / 256.0) * texture2D(u_texture, vTextureCoord + step * vec2( 1,  0) / u_resolution).rgb;
//         // pixel_color += (16.0 / 256.0) * texture2D(u_texture, vTextureCoord + step * vec2( 1,  1) / u_resolution).rgb;
//         // pixel_color += ( 4.0 / 256.0) * texture2D(u_texture, vTextureCoord + step * vec2( 1,  2) / u_resolution).rgb;
//         // pixel_color += ( 1.0 / 256.0) * texture2D(u_texture, vTextureCoord + step * vec2( 2, -2) / u_resolution).rgb;
//         // pixel_color += ( 4.0 / 256.0) * texture2D(u_texture, vTextureCoord + step * vec2( 2, -1) / u_resolution).rgb;
//         // pixel_color += ( 6.0 / 256.0) * texture2D(u_texture, vTextureCoord + step * vec2( 2,  0) / u_resolution).rgb;
//         // pixel_color += ( 4.0 / 256.0) * texture2D(u_texture, vTextureCoord + step * vec2( 2,  1) / u_resolution).rgb;
//         // pixel_color += ( 1.0 / 256.0) * texture2D(u_texture, vTextureCoord + step * vec2( 2,  2) / u_resolution).rgb;

//     // Use the original image pixel color
//     pixel_color = texture2D(u_texture, vTextureCoord).rgb;

// // Fragment shader output
//     gl_FragColor = vec4(pixel_color, 1.0);
// }
//   `;
