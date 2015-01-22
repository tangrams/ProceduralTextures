
void main() {

	//	v_texcoord is a varying variable that contains the normalize position 
	//
	vec2 st = v_texcoord;

	//	In this case v_texcoor is the same as the fragment coordinate ( also
	//	know as gl_FragCoord that goes between 0-200 in each axis ) 
	//	devided by the resolution ( 200, 200 ) given by the uniform u_resolution
	//	
	//	st = gl_FragCoord.xy/u_resolution.xy;
	
	gl_FragColor = vec4(st.x,st.y,0.0,1.0);

}