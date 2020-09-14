class GLCleaner {
    init(gl) {
        this.gl = gl;
    }

    clear = (r, g, b, a) => {
        this.gl.clearColor(r, g, b, a);                                      // установить в качестве цвета очистки буфера цвета черный, полная непрозрачность
        this.gl.clearDepth(1.0);                                             // Clear everything
        this.gl.enable(this.gl.DEPTH_TEST);                                  // включает использование буфера глубины
        this.gl.depthFunc(this.gl.LEQUAL);                                   // определяет работу буфера глубины: более ближние объекты перекрывают дальние
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);  // очистить буфер цвета и буфер глубины.
    }
}

const GLC = new GLCleaner();

export default GLC;