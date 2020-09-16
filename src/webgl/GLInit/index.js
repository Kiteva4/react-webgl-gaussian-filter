import GLC from '../GLCleaner';

export default () => {
    const canvas = document.getElementById("webgl");

    if (!canvas) {
        return;
    }

    var gl = initWebGL(canvas);      // инициализация контекста GL

    GLC.init(gl);
    GLC.clear(1.0, 1.0, 1.0, 1.0,);
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