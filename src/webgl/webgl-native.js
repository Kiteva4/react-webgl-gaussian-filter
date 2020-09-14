// var gl; // глобальная переменная для контекста WebGL

// function start() {
//     var canvas = document.getElementById("glcanvas");

//     gl = initWebGL(canvas);      // инициализация контекста GL

//     // продолжать только если WebGL доступен и работает

//     if (gl) {
//         gl.clearColor(0.0, 0.0, 0.0, 1.0);                      // установить в качестве цвета очистки буфера цвета черный, полная непрозрачность
//         gl.enable(gl.DEPTH_TEST);                               // включает использование буфера глубины
//         gl.depthFunc(gl.LEQUAL);                                // определяет работу буфера глубины: более ближние объекты перекрывают дальние
//         gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);    // очистить буфер цвета и буфер глубины.
//     }
// }

// function initWebGL(canvas) {
//     gl = null;

//     try {
//         // Попытаться получить стандартный контекст. Если не получится, попробовать получить экспериментальный.
//         gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
//     }
//     catch (e) { }

//     // Если мы не получили контекст GL, завершить работу
//     if (!gl) {
//         alert("Unable to initialize WebGL. Your browser may not support it.");
//         gl = null;
//     }

//     return gl;
// }

// function initShaders() {
//     var fragmentShader = getShader(gl, "shader-fs");
//     var vertexShader = getShader(gl, "shader-vs");

//     // создать шейдерную программу

//     shaderProgram = gl.createProgram();
//     gl.attachShader(shaderProgram, vertexShader);
//     gl.attachShader(shaderProgram, fragmentShader);
//     gl.linkProgram(shaderProgram);

//     // Если создать шейдерную программу не удалось, вывести предупреждение

//     if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
//         alert("Unable to initialize the shader program.");
//     }

//     gl.useProgram(shaderProgram);

//     vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
//     gl.enableVertexAttribArray(vertexPositionAttribute);
// }

// function getShader(gl, id) {
//     var shaderScript, theSource, currentChild, shader;

//     shaderScript = document.getElementById(id);

//     if (!shaderScript) {
//         return null;
//     }

//     theSource = "";
//     currentChild = shaderScript.firstChild;

//     while (currentChild) {
//         if (currentChild.nodeType == currentChild.TEXT_NODE) {
//             theSource += currentChild.textContent;
//         }

//         currentChild = currentChild.nextSibling;
//     }

//     if (shaderScript.type == "x-shader/x-fragment") {
//         shader = gl.createShader(gl.FRAGMENT_SHADER);
//     } else if (shaderScript.type == "x-shader/x-vertex") {
//         shader = gl.createShader(gl.VERTEX_SHADER);
//     } else {
//         // неизвестный тип шейдера
//         return null;
//     }

//     gl.shaderSource(shader, theSource);

//     // скомпилировать шейдерную программу
//     gl.compileShader(shader);

//     // Проверить успешное завершение компиляции
//     if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
//         alert("An error occurred compiling the shaders: " + gl.getShaderInfoLog(shader));
//         return null;
//     }

//     return shader;
// }

// var horizAspect = 480.0 / 640.0;

// function initBuffers() {
//     squareVerticesBuffer = gl.createBuffer();
//     gl.bindBuffer(gl.ARRAY_BUFFER, squareVerticesBuffer);

//     var vertices = [
//         1.0, 1.0, 0.0,
//         -1.0, 1.0, 0.0,
//         1.0, -1.0, 0.0,
//         -1.0, -1.0, 0.0
//     ];

//     gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
// }

// function drawScene() {
//     gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    
//     perspectiveMatrix = makePerspective(45, 640.0/480.0, 0.1, 100.0);
    
//     loadIdentity();
//     mvTranslate([-0.0, 0.0, -6.0]);
    
//     gl.bindBuffer(gl.ARRAY_BUFFER, squareVerticesBuffer);
//     gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
//     setMatrixUniforms();
//     gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
//   }