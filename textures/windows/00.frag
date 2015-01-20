
vec2 u_windowSize = vec2(0.5);
vec3 u_windowColor = vec3(1.0, 1.0, 0.9);
vec3 u_buildingColor = vec3(0.309,0.326,0.422);
vec3 u_mortarColor = vec3(0.172,0.172,0.208);

float u_frequency = 10.0;

vec4 v_mod289(vec4 x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
vec4 perm(vec4 x){return v_mod289(((x * 34.0) + 1.0) * x);}
float noise(vec3 p){
	vec3 a = floor(p);
	vec3 d = p - a;
	d = d * d * (3.0 - 2.0 * d);
	vec4 b = a.xxyy + vec4(0.0, 1.0, 0.0, 1.0);
	vec4 k1 = perm(b.xyxy);
	vec4 k2 = perm(k1.xyxy + b.zzww);
	vec4 c = k2 + a.zzzz;
	vec4 k3 = perm(c);
	vec4 k4 = perm(c + 1.0);
	vec4 o1 = fract(k3 * (1.0 / 41.0));
	vec4 o2 = fract(k4 * (1.0 / 41.0));
	vec4 o3 = o2 * d.z + o1 * (1.0 - d.z);
	vec2 o4 = o3.yw * d.x + o3.xz * (1.0 - d.x);
	return o4.y * d.y + o4.x * (1.0 - d.y);
}

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
		color.rgb = brick(st,1.5*u_frequency,u_buildingColor,u_mortarColor);
	} else {
		float noiseColor = 2.0 * noise( vec3(st.x*2.0, st.y*u_frequency*2.0,1.0+sin(u_time*0.2)) );
		color.rgb = u_windowColor * noiseColor;
	}

	gl_FragColor = vec4(color,1.0);
}