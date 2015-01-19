void main() {
	vec2 pos = v_texcoord;
	
	gl_FragColor = vec4(pos.x,pos.y,0.0,1.0);
}