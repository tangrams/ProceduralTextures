var timeLoad = (new Date()).getTime();

var fragShaderURL = window.location.hash.substr(1);
var canvas = document.getElementById("canvas");
var gl = getWebGLContext(canvas);
var program;

window.addEventListener("hashchange", function () {
	fragShaderURL = window.location.hash.substr(1);
	loadShader();
}, false);

window.onload = function () { loadShader(), renderShader() };

function fetchHTTP(url, methood){
	var request = new XMLHttpRequest(), response;

	request.onreadystatechange = function () {
		if (request.readyState === 4 && request.status === 200) {
			response = request.responseText;
		}
	}
	request.open(methood ? methood : 'GET', url, false);
	request.send();
	return response;
}

function createShader(url, type) {
	var source = fetchHTTP(url);
	var shader = gl.createShader(type);
	gl.shaderSource(shader, source);
	gl.compileShader(shader);
	var compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  	
  	if (!compiled) {
    	// Something went wrong during compilation; get the error
    	lastError = gl.getShaderInfoLog(shader);
    	console.error("*** Error compiling shader '" + shader + "':" + lastError);
    	gl.deleteShader(shader);
    	return null;
  	}
  	return shader;
}

function loadShader() {
	// setup GLSL program
	var vertexShader = createShader("src/default.vert",gl.VERTEX_SHADER);
	var fragmentShader = createShader(fragShaderURL,gl.FRAGMENT_SHADER);
	program = createProgram(gl, [vertexShader, fragmentShader]);
	gl.useProgram(program);
}

function renderShader() {
	// Get A WebGL context

	if (!gl) {
		return;
	}

	// look up where the vertex data needs to go.
  	var positionLocation = gl.getAttribLocation(program, "a_position");
  	var texCoordLocation = gl.getAttribLocation(program, "a_texcoord");

  	// provide texture coordinates for the rectangle.
  	var texCoordBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
		0.0,  0.0,
		1.0,  0.0,
		0.0,  1.0,
		0.0,  1.0,
		1.0,  0.0,
		1.0,  1.0]), gl.STATIC_DRAW);
	gl.enableVertexAttribArray(texCoordLocation);
	gl.vertexAttribPointer(texCoordLocation, 2, gl.FLOAT, false, 0, 0);

	// set the resolution uniform
	var resolutionLocation = gl.getUniformLocation(program, "u_resolution");
	gl.uniform2f(resolutionLocation, canvas.width, canvas.height);

	// set the time uniform
	var timeFrame = (new Date()).getTime();
	var time = (timeFrame-timeLoad) / 1000;
	var timeLocation = gl.getUniformLocation(program, "u_time");
	gl.uniform1f(timeLocation, time);

	// Vertex buffer
  	var buffer = gl.createBuffer();
  	gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
  		-1.0, -1.0,
  		1.0, -1.0,
  		-1.0,  1.0,
  		-1.0,  1.0,
  		1.0, -1.0,
  		1.0,  1.0]), gl.STATIC_DRAW);
  	gl.enableVertexAttribArray(positionLocation);
  	gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

  	// Draw the rectangle.
  	gl.drawArrays(gl.TRIANGLES, 0, 6);

  	window.requestAnimationFrame(renderShader);
}