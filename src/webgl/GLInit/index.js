// import GLC from '../old_GLCleaner';

export default () => {
    const canvas = document.querySelector('#webgl');

    if (!canvas) {
        return;
    }

    var gl = initWebGL(canvas);      // инициализация контекста GL

    gl.clearColor(0.0, 0.0, 0.0, 1.0);                    // установить в качестве цвета очистки буфера цвета черный, полная непрозрачность
    gl.clearDepth(1.0);                                   // Clear everything
    gl.enable(gl.DEPTH_TEST);                             // включает использование буфера глубины
    gl.depthFunc(gl.LEQUAL);                              // определяет работу буфера глубины: более ближние объекты перекрывают дальние
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);  // очистить буфер цвета и буфер глубины.
    
    return gl;
}

function initWebGL(canvas) {
    var gl = null;
    var glContextAttributes = { preserveDrawingBuffer: true };

    try {
        // Попытаться получить стандартный контекст. Если не получится, попробовать получить экспериментальный.
        gl = canvas.getContext("webgl", glContextAttributes) || canvas.getContext("experimental-webgl", glContextAttributes);
    }
    catch (e) { }

    // Если мы не получили контекст GL, завершить работу
    if (!gl) {
        alert("Unable to initialize WebGL. Your browser may not support it.");
        gl = null;
    }

    return gl;
}