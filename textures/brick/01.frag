void main() {
	vec2 pos = v_texcoord;
	
	//	Fract compute the fractional part of the argument
	//	Because the position is multiply by 10.0 will produce a grid
	//	that repeats the patter 10 times
	// 
	pos = fract(pos*vec2(10.));

	gl_FragColor = vec4(pos.x,pos.y,0.0,1.0);
}