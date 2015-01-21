#define PI 3.14159265358979323846

mat2 rotate2DMatrix(float _r){
	return mat2(cos(_r),-sin(_r),
				sin(_r),cos(_r));
}

vec2 rotate2D(vec2 _st, float _angle){
    _st -= 0.5;
	_st = rotate2DMatrix(_angle) * _st;
	_st += 0.5;
    return _st;
}

vec2 tile(vec2 _st, float _zoom){
    _st *= _zoom;
    if (fract(_st.y * 0.5) > 0.5){
        _st.x += 0.5;
    }
    return fract(_st);
}

vec2 movingTiles(vec2 _st, float _zoom, float _speed){
    _st *= _zoom;
    float time = u_time*_speed;
    if( fract(time)>0.5 ){
        if (fract( _st.y * 0.5) > 0.5){
            _st.x += fract(time)*2.0;
        } else {
            _st.x -= fract(time)*2.0;
        } 
    } else {
        if (fract( _st.x * 0.5) > 0.5){
            _st.y += fract(time)*2.0;
        } else {
            _st.y -= fract(time)*2.0;
        } 
    }
    return fract(_st);
}

float circle(vec2 _st, float _radius){
	vec2 pos = vec2(0.5)-_st;
	return smoothstep(1.0-_radius,1.0-_radius+_radius*0.2,1.-dot(pos,pos)*3.14);
}

float box(vec2 _st, vec2 _size, float _smoothEdges){
	_size = vec2(0.5)-_size*0.5;
	vec2 aa = vec2(_smoothEdges*0.5);
	vec2 uv = smoothstep(_size,_size+aa,_st);
    uv *= smoothstep(_size,_size+aa,vec2(1.0)-_st);
	return uv.x*uv.y;
}

void main(void){
    vec2 st = v_texcoord;
    st = movingTiles(st,4.,0.25);
    st = rotate2D(st,PI* (1.+cos(u_time*0.5))*0.5 );
    vec3 color = vec3(box(st,vec2( (1.0+cos(u_time*0.5)*0.7)*0.5 ),0.01));
    gl_FragColor = vec4(color,1.0);    
}