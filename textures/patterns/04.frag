#define PI 3.14159265358979323846

float rows = 10.0;

vec2 tile(vec2 _st, float _zoom){
    _st *= _zoom;
    if (fract(_st.y * 0.5) > 0.5){
        _st.x += 0.5;
    }
    return fract(_st);
}

vec2 rotate2D(vec2 _st, float _angle){
    _st -= 0.5;
	_st =  mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle)) * _st;
	_st += 0.5;
    return _st;
}

void main(){

	vec2 st = v_texcoord;

	st = tile(st,rows);

	st *= 2.0;
	st.x -= 1.0;
	st.y -= 1.3;
	float pct = smoothstep( 0.9,1.0, pow( st.x*6., st.y*0.7 ) );

	vec3 color = vec3( pct );

	gl_FragColor = vec4(color,1.0);
}