export default (gl, url, imageLoadHandler) => {

    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);

    // Так как изображение будет загружено из интернета,
    // может потребоваться время для полной загрузки.
    // Поэтому сначала мы помещаем в текстуру единственный пиксель, чтобы
    // её можно было использовать сразу. После завершения загрузки
    // изображения мы обновим текстуру.
    const level = 0;
    const internalFormat = gl.RGBA;
    const width = 1;
    const height = 1;
    const border = 0;
    const srcFormat = gl.RGBA;
    const srcType = gl.UNSIGNED_BYTE;
    const pixel = new Uint8Array([0, 0, 255, 255]);  // непрозрачный синий

    gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
        width, height, border, srcFormat, srcType,
        pixel);

    const image = new Image();
    image.crossOrigin = "anonymous";
    image.src = url;

    image.onload = function () {
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
            srcFormat, srcType, image);

        // У WebGL1 иные требования к изображениям, имеющим размер степени 2,
        // и к не имеющим размер степени 2, поэтому проверяем, что изображение
        // имеет размер степени 2 в обеих измерениях.
        if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
            // Размер соответствует степени 2. Создаем MIP'ы.
            gl.generateMipmap(gl.TEXTURE_2D);
        } else {
            // Размер не соответствует степени 2.
            // Отключаем MIP'ы и устанавливаем натяжение по краям
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        }

        imageLoadHandler(image.width, image.height);
    };

    return {
        txtr: texture,
        img: image,
    };
}

function isPowerOf2(value) {
    return (value & (value - 1)) === 0;
}