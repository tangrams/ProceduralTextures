precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;
varying vec2 v_texcoord;

void main() {
	vec2 st = gl_FragCoord.xy/u_resolution;
	gl_FragColor = vec4(abs(cos(u_time)),st.y,abs(sin(u_time)),1.0);
}