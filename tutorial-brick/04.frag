vec2 brickSize = (vec2(2.15,0.65))/(2.15*3.0);

void main() {
	vec2 pos = v_texcoord/brickSize;

	if (fract(pos.y * 0.5) > 0.5){
		pos.x += 0.5;
	}

	pos = fract(pos);

	vec2 isBrick = step(pos,vec2(0.96,0.91)); // Everything under this numbers is going to be 0, the rest 1
	vec3 color = mix(vec3(0.0), vec3(1.0), isBrick.x * isBrick.y); // mix the color

	gl_FragColor = vec4(color,1.0);
}