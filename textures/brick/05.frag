vec2 brickSize = (vec2(2.15,0.65))/(2.15*3.0);

void main() {
	vec2 pos = v_texcoord/brickSize;
	
	//	Make an offset on X each every row 
	if (fract(pos.y * 0.5) > 0.5){
		pos.x += 0.5;
	}
	
	pos = fract(pos);

	vec2 edges = vec2(0.04,0.09);

	// Smooth transition between 0 and 1 
	vec2 isBrick = smoothstep(vec2(0.0),edges,pos);
	isBrick *= 1.0-smoothstep(vec2(1.0)-edges,vec2(1.0),pos);
	vec3 color = mix(vec3(0.0), vec3(1.0), isBrick.x * isBrick.y); // mix the color

	gl_FragColor = vec4(color,1.0);
}