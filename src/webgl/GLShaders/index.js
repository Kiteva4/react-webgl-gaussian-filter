export default (gl, GLSLShader, shaderProgram) => {
    var fragmentShader = getVertexShader(gl, GLSLShader.vertexShaderCode);
    var vertexShader = getFragmentShader(gl, GLSLShader.fragmentShaderCode);

    // создать шейдерную программу
    shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    // Если создать шейдерную программу не удалось, вывести предупреждение

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert("Unable to initialize the shader program.");
    }

    gl.useProgram(shaderProgram);
}

function getFragmentShader(gl, shaderCode) {
    getShaderFromCode(gl, shaderCode, gl.FRAGMENT_SHADER)
}

function getVertexShader(gl, shaderCode) {
    getShaderFromCode(gl, shaderCode, gl.VERTEX_SHADER)
}

// Получение шейдера на основе кода, написанного на языке шейдеров
function getShaderFromCode(gl, shaderCode, shaderType) {

    var shader;

    //код шейдера невалидный
    if (!shaderCode) {
        return null;
    }

    // неизвестный тип шейдера
    if (shaderType != gl.VERTEX_SHADER && shaderType != gl.FRAGMENT_SHADER) {
        return null;
    }

    shader = gl.createShader(shaderType);
    gl.shaderSource(shader, shaderCode);

    // скомпилировать шейдерную программу
    gl.compileShader(shader);

    // Проверить успешное завершение компиляции
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert("Ошибка при компиляции шейдера: " + gl.getShaderInfoLog(shader));
        return null;
    }

    return shader;
}

// Получение шейдера из HTML
function getShaderFromHTML(gl, id) {
    var shaderScript, theSource, currentChild, shader;

    shaderScript = document.getElementById(id);

    if (!shaderScript) {
        return null;
    }

    theSource = "";
    currentChild = shaderScript.firstChild;

    while (currentChild) {
        if (currentChild.nodeType == currentChild.TEXT_NODE) {
            theSource += currentChild.textContent;
        }

        currentChild = currentChild.nextSibling;
    }

    if (shaderScript.type == "x-shader/x-fragment") {
        shader = gl.createShader(gl.FRAGMENT_SHADER);
    } else if (shaderScript.type == "x-shader/x-vertex") {
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
        alert("An error occurred compiling the shaders: " + gl.getShaderInfoLog(shader));
        return null;
    }

    return shader;
}