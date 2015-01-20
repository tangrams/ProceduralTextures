vec2 brickSize = (vec2(2.15,0.65))/(2.15*3.0);

void main() {
	vec2 pos = v_texcoord/brickSize;
	
	//	Make an offset on X each every row 
	//
	if (fract(pos.y * 0.5) > 0.5){
		pos.x += 0.5;
	}

	pos = fract(pos);

	gl_FragColor = vec4(pos.x,pos.y,0.0,1.0);
}