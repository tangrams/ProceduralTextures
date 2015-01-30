# Procedural Textures

The [Tangrams](https://github.com/tangrams) teams ([web](https://github.com/tangrams/tangram) and [native](https://github.com/tangrams/tangram-es)) are excited about the possibilities of using the OpenGL Shading Language to render maps. As Brett and Peter describe in [this article](https://mapzen.com/blog/tangram-a-mapping-library), we use them for everything from geometry extrusion to lighting effects. That’s what makes Tangram’s map engine fast, powerful and highly flexible. 

Another use of GLSL Shaders is for generating procedural textures in real time. This allows mappers to make interesting patterns programmatically and apply them to different geometries using custom rules.

This [repository](http://github.com/tangrams/ProceduralTextures) and [on-line gallery](http://tangrams.github.io/ProceduralTextures/) show a small collection of examples to inspire mapmakers to use, code and share generative textures for maps.

## How to install this gallery on your local machine?

* Clone this repository locally and run a Python HTTP Server.

```
git clone https://github.com/tangrams/ProceduralTextures
cd ProceduralTextures
python -m SimpleHTTPServer 8000
```

Note: in case you have Python 3.x as your default version you should use ```python -m http.server 8000``` instead.

* Then open your web browser to [http://localhost:8000/](http://localhost:8000).