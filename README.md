# Procedural Textures Repository

This repository is an [on-line gallery](http://tangrams.github.io/ProceduralTextures/) for generative textures creaded completely with GLSL Shader code.

## Install in local host

* Clone this repository locally and run a Python Simple HTTP Server.

```
git clone https://github.com/tangrams/ProceduralTextures
cd ProceduralTextures
python -m SimpleHTTPServer
```

* Then open your WebBrowser on the address it said, usually at [http://localhost:8000/](http://localhost:8000)

## Content

#### Shapes

<canvas onclick="viewShader('shapes/box.frag');" src="shapes/box.frag"></canvas>
<canvas onclick="viewShader('shapes/circle.frag');" src="shapes/circle.frag"></canvas>
<canvas onclick="viewShader('shapes/cross.frag');"  src="shapes/cross.frag"></canvas>

#### Patterns

<canvas onclick="viewShader('patterns/grid.frag');" src="patterns/grid.frag"></canvas>
<canvas onclick="viewShader('patterns/bricks.frag');" src="patterns/bricks.frag"></canvas>
<canvas onclick="viewShader('patterns/sidegrid.frag');" src="patterns/sidegrid.frag"></canvas>
<canvas onclick="viewShader('patterns/checks.frag');" src="patterns/checks.frag"></canvas>
<canvas onclick="viewShader('patterns/diamond.frag');" src="patterns/diamond.frag"></canvas>
<canvas onclick="viewShader('patterns/nuts.frag');" src="patterns/nuts.frag"></canvas>


#### Animations

<canvas onclick="viewShader('animations/beatingdots.frag');" src="animations/beatingdots.frag"></canvas>
<canvas onclick="viewShader('animations/movingdots.frag');" src="animations/movingdots.frag"></canvas>
<canvas onclick="viewShader('animations/polardots.frag');" src="animations/polardots.frag"></canvas>
<canvas onclick="viewShader('animations/rotatingdots.frag');" src="animations/rotatingdots.frag"></canvas>
<canvas onclick="viewShader('animations/marchingboxes.frag');" src="animations/marchingboxes.frag"></canvas>
