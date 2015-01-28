#define PI 3.14159265358979323846
#define TWO_PI 6.28318530717958647693
#define PHI 1.618033988749894848204586834

vec2 radialTile(vec2 _st, vec2 _vel, float _zoom){
  vec2 toExtreme = vec2(0.5)-_st;
  vec2 polar = vec2( (PI+atan(toExtreme.y,toExtreme.x))/TWO_PI,   // Angle
                      log(length(toExtreme))*PHI*0.1);            // Radius
  polar *= _zoom;

  polar.y += _vel.y;
  if (fract( polar.y * 0.5) > 0.5){
    polar.x += _vel.x;
  } else {
    polar.x -= _vel.x;
  }

  return fract(polar);
}

float circle(vec2 _st, float _radius){
  vec2 pos = vec2(0.5)-_st;
  return smoothstep(1.0-_radius,1.0-_radius+_radius*0.2,1.-dot(pos,pos)*3.14);
}

vec2 rotate2D(vec2 _st, float _angle){
  _st -= 0.5;
  _st =  mat2(cos(_angle),-sin(_angle),
              sin(_angle),cos(_angle)) * _st;
  _st += 0.5;
  return _st;
}

vec2 tile(vec2 _st, float _zoom){
  _st *= _zoom;
  return fract(_st);
}

vec2 brickTile(vec2 _st, float _zoom){
    _st *= _zoom;
    if (fract(_st.y * 0.5) > 0.5){
        _st.x += 0.5;
    }
    return fract(_st);
}

float box(vec2 _st, vec2 _size, float _smoothEdges){
  _size = vec2(0.5)-_size*0.5;
  vec2 aa = vec2(_smoothEdges*0.5);
  vec2 uv = smoothstep(_size,_size+aa,_st);
  uv *= smoothstep(_size,_size+aa,vec2(1.0)-_st);
  return uv.x*uv.y;
}

vec2 offset(vec2 _st, vec2 _offset){
  vec2 uv;
  if(_st.x>0.5){
    uv.x = _st.x - 0.5;
  } else {
    uv.x = _st.x + 0.5;
  } 
  if(_st.y>0.5){
    uv.y = _st.y - 0.5;
  }else {
    uv.y = _st.y + 0.5;
  } 
  return uv;
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

void main(void){
  vec2 st = v_texcoord;
  st = rotate2D(st,PI*fract(u_time*0.1));
  // st = brickTile(st,3.);
  st = radialTile(st,vec2(fract(u_time*0.5)),8.);
  st = radialTile(st,vec2(-fract(u_time),0.0),5.);

  vec3 color = vec3( box(st,vec2(0.8,0.2),0.01) );

  gl_FragColor = vec4(color,1.0);    
}