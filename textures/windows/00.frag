
vec2 u_windowSize = vec2(0.6);

float u_frequency = 10.0;

vec3 brick(vec2 _uv, float _zoom, vec3 _brickColor, vec3 _mortarColor){
	vec2 pos = _uv/((vec2(2.15,0.65))/(2.15*_zoom));
	if (fract(pos.y * 0.5) > 0.5){
		pos.x += 0.5;
	}
	pos = fract(pos);
	vec2 isBrick = step(pos,vec2(0.95,0.89));
	return mix( _mortarColor, _brickColor, isBrick.x * isBrick.y);
}

void main(){
	vec2 st = v_texcoord - vec2(0.25)/u_frequency;
	vec3 color = vec3(0.0);

	vec2 windowsMask = step(fract(st*u_frequency), u_windowSize );

	if (windowsMask.x * windowsMask.y <= 0.5) {
		color.rgb = brick(st,1.5*u_frequency,vec3(0.5),vec3(0.0));
	} else {
		color.rgb = vec3(1.0);
	}

	gl_FragColor = vec4(color,1.0);
}