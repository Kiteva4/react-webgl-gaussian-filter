export default (gl, image_width, image_height) => {

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    normilizeImageSizeToRectangle(gl, image_width, image_height)    

    /*----------------------------------------------------------------------*/

    const textureCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);

    const textureCoordinates = [
        0.0, 0.0,
        1.0, 0.0,
        0.0, 1.0,
        0.0, 1.0,
        1.0, 0.0,
        1.0, 1.0,
    ];

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates),
        gl.STATIC_DRAW);

    return {
        position: positionBuffer,
        textureCoord: textureCoordBuffer,
    };
}


function normilizeImageSizeToRectangle(gl, _image_width, _image_height) {

    if (_image_width / gl.drawingBufferWidth > 1 && _image_width / gl.drawingBufferWidth > _image_height / gl.drawingBufferHeight) {
        let scale_koef = _image_width / gl.drawingBufferWidth;
        setRectangle(gl, _image_width / scale_koef, _image_height / scale_koef);
    }
    else if (_image_height / gl.drawingBufferHeight > 1 && _image_height / gl.drawingBufferHeight > _image_width / gl.drawingBufferWidth) {
        let scale_koef = _image_height / gl.drawingBufferHeight;
        setRectangle(gl, _image_width / scale_koef, _image_height / scale_koef);
    }
    else {
        setRectangle(gl, _image_width, _image_height);
    }
}

function setRectangle(gl, width, height) {

    var x1 = gl.drawingBufferWidth * 0.5 - width * 0.5;
    var x2 = x1 + width;
    var y1 = gl.drawingBufferHeight * 0.5 - height * 0.5;
    var y2 = y1 + height;

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
        x1, y1,
        x2, y1,
        x1, y2,
        x1, y2,
        x2, y1,
        x2, y2,
    ]), gl.STATIC_DRAW);
}