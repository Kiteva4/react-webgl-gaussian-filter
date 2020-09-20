export var vertexShaderSource = `
attribute vec2 a_position;
attribute vec2 a_texCoord;

uniform vec2 u_resolution_vert;

varying vec2 v_texCoord;

void main() {
   // convert the rectangle from pixels to 0.0 to 1.0
   vec2 zeroToOne = a_position / u_resolution_vert;

   // convert from 0->1 to 0->2
   vec2 zeroToTwo = zeroToOne * 2.0;

   // convert from 0->2 to -1->+1 (clipspace)
   vec2 clipSpace = zeroToTwo - 1.0;

   gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);

   // pass the texCoord to the fragment shader
   // The GPU will interpolate this value between points.
   v_texCoord = a_texCoord;
}
`;

export var fragmentShaderSource = `
precision mediump float;

uniform sampler2D u_image;
varying vec2 v_texCoord;

uniform float u_filterPower;
uniform vec2 u_resolution_frag;

void main() {
   vec3 pixel_color;

   float step = u_filterPower * 4.0;

   pixel_color += ( 1.0 / 256.0) * texture2D(u_image, v_texCoord + step * vec2(-2, -2) / u_resolution_frag).rgb;
   pixel_color += ( 4.0 / 256.0) * texture2D(u_image, v_texCoord + step * vec2(-2, -1) / u_resolution_frag).rgb;
   pixel_color += ( 6.0 / 256.0) * texture2D(u_image, v_texCoord + step * vec2(-2,  0) / u_resolution_frag).rgb;
   pixel_color += ( 4.0 / 256.0) * texture2D(u_image, v_texCoord + step * vec2(-2,  1) / u_resolution_frag).rgb;
   pixel_color += ( 1.0 / 256.0) * texture2D(u_image, v_texCoord + step * vec2(-2,  2) / u_resolution_frag).rgb;
   pixel_color += ( 4.0 / 256.0) * texture2D(u_image, v_texCoord + step * vec2(-1, -2) / u_resolution_frag).rgb;
   pixel_color += (16.0 / 256.0) * texture2D(u_image, v_texCoord + step * vec2(-1, -1) / u_resolution_frag).rgb;
   pixel_color += (24.0 / 256.0) * texture2D(u_image, v_texCoord + step * vec2(-1,  0) / u_resolution_frag).rgb;
   pixel_color += (16.0 / 256.0) * texture2D(u_image, v_texCoord + step * vec2(-1,  1) / u_resolution_frag).rgb;
   pixel_color += ( 4.0 / 256.0) * texture2D(u_image, v_texCoord + step * vec2(-1,  2) / u_resolution_frag).rgb;
   pixel_color += ( 6.0 / 256.0) * texture2D(u_image, v_texCoord + step * vec2( 0, -2) / u_resolution_frag).rgb;
   pixel_color += (24.0 / 256.0) * texture2D(u_image, v_texCoord + step * vec2( 0, -1) / u_resolution_frag).rgb;
   pixel_color += (36.0 / 256.0) * texture2D(u_image, v_texCoord + step * vec2( 0,  0) / u_resolution_frag).rgb;
   pixel_color += (24.0 / 256.0) * texture2D(u_image, v_texCoord + step * vec2( 0,  1) / u_resolution_frag).rgb;
   pixel_color += ( 6.0 / 256.0) * texture2D(u_image, v_texCoord + step * vec2( 0,  2) / u_resolution_frag).rgb;
   pixel_color += ( 4.0 / 256.0) * texture2D(u_image, v_texCoord + step * vec2( 1, -2) / u_resolution_frag).rgb;
   pixel_color += (16.0 / 256.0) * texture2D(u_image, v_texCoord + step * vec2( 1, -1) / u_resolution_frag).rgb;
   pixel_color += (24.0 / 256.0) * texture2D(u_image, v_texCoord + step * vec2( 1,  0) / u_resolution_frag).rgb;
   pixel_color += (16.0 / 256.0) * texture2D(u_image, v_texCoord + step * vec2( 1,  1) / u_resolution_frag).rgb;
   pixel_color += ( 4.0 / 256.0) * texture2D(u_image, v_texCoord + step * vec2( 1,  2) / u_resolution_frag).rgb;
   pixel_color += ( 1.0 / 256.0) * texture2D(u_image, v_texCoord + step * vec2( 2, -2) / u_resolution_frag).rgb;
   pixel_color += ( 4.0 / 256.0) * texture2D(u_image, v_texCoord + step * vec2( 2, -1) / u_resolution_frag).rgb;
   pixel_color += ( 6.0 / 256.0) * texture2D(u_image, v_texCoord + step * vec2( 2,  0) / u_resolution_frag).rgb;
   pixel_color += ( 4.0 / 256.0) * texture2D(u_image, v_texCoord + step * vec2( 2,  1) / u_resolution_frag).rgb;
   pixel_color += ( 1.0 / 256.0) * texture2D(u_image, v_texCoord + step * vec2( 2,  2) / u_resolution_frag).rgb;
     
   gl_FragColor = vec4(pixel_color, 1.0);
}
`;