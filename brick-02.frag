
// "Modern metric brick of 215mm x 102.5mm x 65mm" 
//	by http://www.jaharrison.me.uk/Brickwork/Sizes.html
//
float columnNumber = 5.0;
vec2 brickSize = (vec2(2.15,0.65))/(2.15*columnNumber);

void main() {

	//	We can use the same trick shown in the previus exampe to 
	//	create un squared grids. In this case keeping the ratio
	//	of modern bricks
	//
	vec2 pos = v_texcoord/brickSize;
	pos = fract(pos);

	gl_FragColor = vec4(pos.x,pos.y,0.0,1.0);
}