# Procedural Textures
by [Patricio Gonzalez Vivo](https://github.com/patriciogonzalezvivo)

Here at Mapzen, the [Tangrams](https://github.com/tangrams) teams ([web](https://github.com/tangrams/tangram) and [native](https://github.com/tangrams/tangram-es) ) are excited on the possibilities of using OpenGL Shading Language for rendering maps. We use them for everything in ours engines, from extrude OpenStreetMap polygons into 3D buildings, to apply different effects like light calculations and environmental maps. 

Another powerful use of GLSL Shaders is to create procedural textures on the fly. This allow mappers to make interesting patterns programmatically and apply them on different geometry (like buildings, roads, parks, etc) using their own rules.

This is a small collection of examples designed to inspire and help map makers to design and craft their own maps. [Here you can find the complete gallery](http://tangrams.github.io/ProceduralTextures/) ( and [source code of it](http://github.com/tangrams/ProceduralTextures) ) in case you want to contribute with your own designs.

## How to install this gallery in your local machine?

* Clone this repository locally and run a Python Simple HTTP Server.

```
git clone https://github.com/tangrams/ProceduralTextures
cd ProceduralTextures
python -m SimpleHTTPServer
```

* Then open your WebBrowser on the address it said, usually at [http://localhost:8000/](http://localhost:8000)

## Gallery

#### [Shapes](http://tangrams.github.io/ProceduralTextures/)

<canvas onclick="viewShader('shapes/box.frag');" src="shapes/box.frag"></canvas>
<canvas onclick="viewShader('shapes/circle.frag');" src="shapes/circle.frag"></canvas>
<canvas onclick="viewShader('shapes/cross.frag');"  src="shapes/cross.frag"></canvas>

#### [Patterns](http://tangrams.github.io/ProceduralTextures/)

<canvas onclick="viewShader('patterns/grid.frag');" src="patterns/grid.frag"></canvas>
<canvas onclick="viewShader('patterns/bricks.frag');" src="patterns/bricks.frag"></canvas>
<canvas onclick="viewShader('patterns/sidegrid.frag');" src="patterns/sidegrid.frag"></canvas>
<canvas onclick="viewShader('patterns/checks.frag');" src="patterns/checks.frag"></canvas>
<canvas onclick="viewShader('patterns/diamond.frag');" src="patterns/diamond.frag"></canvas>
<canvas onclick="viewShader('patterns/nuts.frag');" src="patterns/nuts.frag"></canvas>


#### [Animations](http://tangrams.github.io/ProceduralTextures/)

<canvas onclick="viewShader('animations/beatingdots.frag');" src="animations/beatingdots.frag"></canvas>
<canvas onclick="viewShader('animations/movingdots.frag');" src="animations/movingdots.frag"></canvas>
<canvas onclick="viewShader('animations/polardots.frag');" src="animations/polardots.frag"></canvas>
<canvas onclick="viewShader('animations/rotatingdots.frag');" src="animations/rotatingdots.frag"></canvas>
<canvas onclick="viewShader('animations/marchingboxes.frag');" src="animations/marchingboxes.frag"></canvas>
