export default (gl, img) => {

    // const positions = [
    //     // Front face
    //     -1.0, -1.0, 1.0,
    //     1.0, -1.0, 1.0,
    //     1.0, 1.0, 1.0,
    //     -1.0, 1.0, 1.0,

    //     // {    // // Back face
    //     //     // -1.0, -1.0, -1.0,
    //     //     // -1.0,  1.0, -1.0,
    //     //     //  1.0,  1.0, -1.0,
    //     //     //  1.0, -1.0, -1.0,

    //     //     // // Top face
    //     //     // -1.0,  1.0, -1.0,
    //     //     // -1.0,  1.0,  1.0,
    //     //     //  1.0,  1.0,  1.0,
    //     //     //  1.0,  1.0, -1.0,

    //     //     // // Bottom face
    //     //     // -1.0, -1.0, -1.0,
    //     //     //  1.0, -1.0, -1.0,
    //     //     //  1.0, -1.0,  1.0,
    //     //     // -1.0, -1.0,  1.0,

    //     //     // // Right face
    //     //     //  1.0, -1.0, -1.0,
    //     //     //  1.0,  1.0, -1.0,
    //     //     //  1.0,  1.0,  1.0,
    //     //     //  1.0, -1.0,  1.0,

    //     //     // // Left face
    //     //     //  -1.0, -1.0, -1.0,
    //     //     //  -1.0, -1.0,  1.0,
    //     //     //  -1.0,  1.0,  1.0,
    //     //     //  -1.0,  1.0, -1.0,
    //     // }
    // ];

    //Создание буфера для расположения прямоугольника
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    setRectangle(gl, 0, 0, img.width, img.height);
    // gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    /*--------------------------------------------------------------------------------------------*/

    var textureCoordinates = [
        0.0, 0.0,
        1.0, 0.0,
        0.0, 1.0,
        0.0, 1.0,
        1.0, 0.0,
        1.0, 1.0,
    ];

    const textureCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates), gl.STATIC_DRAW);

    /*--------------------------------------------------------------------------------------------*/

    // const indices = [
    //     0, 1, 2, 0, 2, 3,    // front
    //     // 4,  5,  6,      4,  6,  7,    // back
    //     // 8,  9,  10,     8,  10, 11,   // top
    //     // 12, 13, 14,     12, 14, 15,   // bottom
    //     // 16, 17, 18,     16, 18, 19,   // right
    //     // 20, 21, 22,     20, 22, 23,   // left
    // ];
    // const indexBuffer = gl.createBuffer();
    // gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

    // gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

    return {
        position: positionBuffer,
        textureCoord: textureCoordBuffer,
        // indices: indexBuffer,
    };
}

function setRectangle(gl, x, y, width, height) {
    var x1 = x;
    var x2 = x + width;
    var y1 = y;
    var y2 = y + height;
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
        x1, y1,
        x2, y1,
        x1, y2,
        x1, y2,
        x2, y1,
        x2, y2,
    ]), gl.STATIC_DRAW);
}