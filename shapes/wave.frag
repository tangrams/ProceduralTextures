#define PI 3.14159265358979323846

float plotX(vec2 _st, float _pct,float _antia){
  return  smoothstep( _pct-_antia, _pct, _st.x) - 
          smoothstep( _pct, _pct+_antia, _st.x);
}

float plotY(vec2 _st, float _pct,float _antia){
  return  smoothstep( _pct-_antia, _pct, _st.y) - 
          smoothstep( _pct, _pct+_antia, _st.y);
}

float fillX(vec2 _st, float _pct,float _antia){
  return  smoothstep( _pct-_antia, _pct, _st.x);
}

float fillY(vec2 _st, float _pct,float _antia){
  return  smoothstep( _pct-_antia, _pct, _st.y);
}

vec2 tile(vec2 _st, float _zoom){
  _st *= _zoom;
  return fract(_st);
}

vec2 mirrorTile(vec2 _st, float _zoom){
    _st *= _zoom;
    if (fract(_st.y * 0.5) > 0.5){
        _st.y = 1.0-_st.y;
    }
    return fract(_st);
}

void main(){
  vec2 st = v_texcoord;
  st = mirrorTile(st,5.0);

  vec3 color = vec3(fillY(st,0.5+sin(st.x*PI*2.0)*0.45,0.02));

  gl_FragColor = vec4( color, 1.0 );
}