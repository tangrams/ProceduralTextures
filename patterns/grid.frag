
vec2 tile(vec2 _st, float _zoom){
  _st *= _zoom;
  return fract(_st);
}

float box(vec2 _st, vec2 _size){
  _size = vec2(0.5)-_size*0.5;
  vec2 uv = smoothstep(_size,_size+vec2(0.0001),_st);
  uv *= smoothstep(_size,_size+vec2(0.0001),vec2(1.0)-_st);
  return uv.x*uv.y;
}

void main(void){
  vec2 st = v_texcoord;
  st = tile(st,10.0);
  
  vec3 color = vec3(box(st,vec2(0.9)));

  gl_FragColor = vec4(color,1.0);    
}