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

	// st = tile(st,rows);
	// float angle = PI*0.25*cos(u_time*0.5);
	// if (fract(v_texcoord.y * 0.5 * rows) > 0.5){
 //        angle *= -1.0;
 //    }
	// st = rotate2D(st,angle);

	st *= 2.0;
	float pct = smoothstep( 0.9,0.91, pow( (st.x-1.0)*3.,st.y) );

	vec3 color = vec3( pct );

	gl_FragColor = vec4(color,1.0);
}