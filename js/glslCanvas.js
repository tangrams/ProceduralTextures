var timeLoad = (new Date()).getTime();

var billboards = []; 

function loadShaders( _url ) {
	var list = document.getElementsByTagName("canvas");

	// Load canvas and WebGLContexta
	for(var i = 0; i < list.length; i++){
		var shaderURL = "";

		if ( _url ){
			shaderURL = _url;
		} else if( list[i].hasAttribute("src") ){
			shaderURL = list[i].getAttribute('src');
		} else if( list[i].hasAttribute("glsl-frag") ){
			shaderURL = list[i].getAttribute('glsl-frag');
		}

		var c = list[i];
		var g = setupWebGL(list[i]);
		var p = loadShader(g,shaderURL);

		// UVS buffer
		var texCoordLocation = g.getAttribLocation(p, "a_texcoord");
		var u = g.createBuffer();
		g.bindBuffer( g.ARRAY_BUFFER, u);
		g.bufferData( g.ARRAY_BUFFER, new Float32Array([0.0,  0.0,
														1.0,  0.0,
														0.0,  1.0,
														0.0,  1.0,
														1.0,  0.0,
														1.0,  1.0]), g.STATIC_DRAW);
		g.enableVertexAttribArray( texCoordLocation );
		g.vertexAttribPointer( texCoordLocation, 2, g.FLOAT, false, 0, 0);

		// Vertex buffer
		var positionLocation = g.getAttribLocation(p, "a_position");
		var v = g.createBuffer();
		g.bindBuffer( g.ARRAY_BUFFER, v);
		g.bufferData( g.ARRAY_BUFFER, new Float32Array([-1.0, -1.0,
														1.0, -1.0,
														-1.0,  1.0,
														-1.0,  1.0,
														1.0, -1.0,
														1.0,  1.0]), g.STATIC_DRAW);
		g.enableVertexAttribArray( positionLocation );
		g.vertexAttribPointer( positionLocation , 2, g.FLOAT, false, 0, 0);

		billboards[i] = {	canvas: c , 
							gl: g, 
							program: p,
							uvs: u,
							vertices: v };
	}
}

function renderShaders(){
	for(var i = 0; i < billboards.length; i++){
		renderShader( billboards[i] );
	}
	window.requestAnimationFrame(renderShaders);
}

/**
 * Creates the HTLM for a failure message
 * @param {string} canvasContainerId id of container of th
 *        canvas.
 * @return {string} The html.
 */
var makeFailHTML = function(msg) {
  return '' +
	'<table style="background-color: #8CE; width: 100%; height: 100%;"><tr>' +
	'<td align="center">' +
	'<div style="display: table-cell; vertical-align: middle;">' +
	'<div style="">' + msg + '</div>' +
	'</div>' +
	'</td></tr></table>';
};

/**
 * Mesasge for getting a webgl browser
 * @type {string}
 */
var GET_A_WEBGL_BROWSER = '' +
  'This page requires a browser that supports WebGL.<br/>' +
  '<a href="http://get.webgl.org">Click here to upgrade your browser.</a>';

/**
 * Mesasge for need better hardware
 * @type {string}
 */
var OTHER_PROBLEM = '' +
  "It doesn't appear your computer can support WebGL.<br/>" +
  '<a href="http://get.webgl.org/troubleshooting/">Click here for more information.</a>';

/**
 * Creates a webgl context. If creation fails it will
 * change the contents of the container of the <canvas>
 * tag to an error message with the correct links for WebGL.
 * @param {Element} canvas. The canvas element to create a
 *     context from.
 * @param {WebGLContextCreationAttirbutes} opt_attribs Any
 *     creation attributes you want to pass in.
 * @return {WebGLRenderingContext} The created context.
 */
function setupWebGL (_canvas, _opt_attribs) {

  function showLink(str) {
	var container = _canvas.parentNode;
	if (container) {
	  container.innerHTML = makeFailHTML(str);
	}
  };

  if (!window.WebGLRenderingContext) {
	showLink(GET_A_WEBGL_BROWSER);
	return null;
  }

  var context = create3DContext(_canvas, _opt_attribs);
  if (!context) {
	showLink(OTHER_PROBLEM);
  }
  return context;
};

/**
 * Creates a webgl context.
 * @param {!Canvas} canvas The canvas tag to get context
 *     from. If one is not passed in one will be created.
 * @return {!WebGLContext} The created context.
 */
function create3DContext(canvas, opt_attribs) {
  var names = ["webgl", "experimental-webgl"];
  var context = null;
  for (var ii = 0; ii < names.length; ++ii) {
	try {
	  context = canvas.getContext(names[ii], opt_attribs);
	} catch(e) {}
	if (context) {
	  break;
	}
  }
  return context;
}

/**
 * Loads a shader.
 * @param {!WebGLContext} gl The WebGLContext to use.
 * @param {string} shaderSource The shader source.
 * @param {number} shaderType The type of shader.
 * @param {function(string): void) opt_errorCallback callback for errors.
 * @return {!WebGLShader} The created shader.
 */
function createProgram(gl, shaders, opt_attribs, opt_locations) {
  var program = gl.createProgram();
  for (var ii = 0; ii < shaders.length; ++ii) {
	gl.attachShader(program, shaders[ii]);
  }
  if (opt_attribs) {
	for (var ii = 0; ii < opt_attribs.length; ++ii) {
	  gl.bindAttribLocation(
		  program,
		  opt_locations ? opt_locations[ii] : ii,
		  opt_attribs[ii]);
	}
  }
  gl.linkProgram(program);

  // Check the link status
  var linked = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (!linked) {
	  // something went wrong with the link
	  lastError = gl.getProgramInfoLog (program);
	  error("Error in program linking:" + lastError);

	  gl.deleteProgram(program);
	  return null;
  }
  return program;
};

/*
 *	Fetch for files
 */
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

/*
 *	Create a Vertex of a specific type (gl.VERTEX_SHADER/)
 */
function createShader( _gl, _source, _type) {
	var shader = _gl.createShader( _type );
	_gl.shaderSource(shader, _source);
	_gl.compileShader(shader);
	var compiled = _gl.getShaderParameter(shader, _gl.COMPILE_STATUS);
	
	if (!compiled) {
		// Something went wrong during compilation; get the error
		lastError = _gl.getShaderInfoLog(shader);
		console.error("*** Error compiling shader '" + shader + "':" + lastError);
		_gl.deleteShader(shader);
		return null;
	}
	return shader;
}

/*
 *	Loads the vert/frag Shaders
 */
function loadShader( _gl, _fragShaderURL ) {
	var vertexShader = createShader(_gl, fetchHTTP("js/default.vert"), _gl.VERTEX_SHADER);

	var fragmentSource = fetchHTTP( _fragShaderURL );
	var fragmentHeader = "precision mediump float;\n\
\n\
uniform vec2 u_resolution;\n\
uniform float u_time;\n\
varying vec2 v_texcoord;\n";
	var fragmentShader = createShader(_gl, fragmentHeader + fragmentSource, _gl.FRAGMENT_SHADER);

	var program = createProgram( _gl, [vertexShader, fragmentShader]);
	_gl.useProgram(program);

	return program;
}

/*
 *	Render loop of shader in a canvas
 */
function renderShader( _billboard ) {
	if (!_billboard.gl) {
		return;
	}

	// set the time uniform
	var timeFrame = (new Date()).getTime();
	var time = (timeFrame-timeLoad) / 1000;
	var timeLocation = _billboard.gl.getUniformLocation( _billboard.program, "u_time");
	_billboard.gl.uniform1f(timeLocation, time);

	// set the resolution uniform
	var resolutionLocation = _billboard.gl.getUniformLocation( _billboard.program, "u_resolution");
	_billboard.gl.uniform2f(resolutionLocation, _billboard.canvas.width, _billboard.canvas.height);

	// Draw the rectangle.
	_billboard.gl.drawArrays(_billboard.gl.TRIANGLES, 0, 6);
}

