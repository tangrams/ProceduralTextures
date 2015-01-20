vec3 sphere(vec2 uv) {
	uv = fract(uv)*2.0-1.0; 
	vec3 ret;
	ret.xy = sqrt(uv * uv) * sign(uv);
	ret.z = sqrt(abs(1.0 - dot(ret.xy,ret.xy)));
	ret = ret * 0.5 + 0.5;    
	return mix(vec3(1.0,1.0,1.0), ret, smoothstep(1.0,0.98,dot(uv,uv)) );
}

void main(){
    vec2 st = v_texcoord;
	vec3 color = sphere(st);
    gl_FragColor = vec4(color, 1.0);
}