export default (gl, vertexShaderCode, fragmentShaderCode, filterValue) => {

  var vertexShader = getVertexShader(gl, vertexShaderCode);
  var fragmentShader = getFragmentShader(gl, fragmentShaderCode);

  // создать шейдерную программу
  var shaderProgram = gl.createProgram();

  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  // Если создать шейдерную программу не удалось, вывести предупреждение

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    alert("Unable to initialize the shader program.");
  }

  gl.useProgram(shaderProgram);

  return shaderProgram;
};

function getFragmentShader(gl, shaderCode) {
  return getShaderFromCode(gl, shaderCode, gl.FRAGMENT_SHADER);
}

function getVertexShader(gl, shaderCode) {
  return getShaderFromCode(gl, shaderCode, gl.VERTEX_SHADER);
}

// Получение шейдера на основе кода, написанного на языке шейдеров
function getShaderFromCode(gl, shaderCode, shaderType) {
  var shader;

  //код шейдера невалидный
  if (!shaderCode) {
    return null;
  }

  // неизвестный тип шейдера
  if (shaderType !== gl.VERTEX_SHADER && shaderType !== gl.FRAGMENT_SHADER) {
    return null;
  }

  //Скомпилировать и получить шейдерную программу of type gl.VERTEX_SHADER or gl.FRAGMENT_SHADER
  shader = createShader(gl, shaderCode, shaderType);

  return shader;
}

function createShader(gl, sourceCode, type) {

  var shader = gl.createShader(type);
  gl.shaderSource(shader, sourceCode);
  gl.compileShader(shader);

  // Проверить успешное завершение компиляции
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    var info = gl.getShaderInfoLog(shader);
    throw new Error(`Не удалось скомпилировать WebGL программу. \n\n #${info}`);
  }

  return shader;
}

// Получение шейдера из HTML
export function getShaderFromHTML(gl, id) {
  var shaderScript, theSource, currentChild, shader;

  shaderScript = document.getElementById(id);

  if (!shaderScript) {
    return null;
  }

  theSource = "";
  currentChild = shaderScript.firstChild;

  while (currentChild) {
    if (currentChild.nodeType === currentChild.TEXT_NODE) {
      theSource += currentChild.textContent;
    }

    currentChild = currentChild.nextSibling;
  }

  if (shaderScript.type === "x-shader/x-fragment") {
    shader = gl.createShader(gl.FRAGMENT_SHADER);
  } else if (shaderScript.type === "x-shader/x-vertex") {
    shader = gl.createShader(gl.VERTEX_SHADER);
  } else {
    // неизвестный тип шейдера
    return null;
  }

  gl.shaderSource(shader, theSource);

  // скомпилировать шейдерную программу
  gl.compileShader(shader);

  // Проверить успешное завершение компиляции
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert(
      "An error occurred compiling the shaders: " + gl.getShaderInfoLog(shader)
    );
    return null;
  }

  return shader;
}
