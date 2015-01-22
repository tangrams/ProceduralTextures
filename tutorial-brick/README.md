<style>
    p {
        font-size: 120%;
    }
    canvas {
        border-radius: 10px;
    }

    pre code {
        width: 100%;
        font-size: 100%;
        border-radius: 5px;
    }

</style>

## How to make a brick wall?


<p>
We start mapping directly the values of the UVs on X and Y to the red and green colors. This will give us a better understanding of what's going on.
</p>

<p>
Is important to have in mind that most of GLSL values are _'normalized'_. That usually means that goes between from 0 to 1 ( although there are some cases where they go from -1 to 1 ).
</p>

<div style="position: absolute; right: 10px;">
    <canvas src="tutorial-brick/00.frag" style="width: 250px; height: 250px;"></canvas>
</div>
<div style="margin-right:15px">
<pre><code src="tutorial-brick/00.frag" class="glsl lineNumbers"></code></pre>
</div>

<p>
After reading the above code we can tell that the ```vec2(0.0,0.0)``` corner the lower-left. Why? just becuase the color values are black.
While the top-right is the ```vec2(1.0,1.0)``` because the yellow color tell that the RED and GREEN channel are both at the maximum values (1.0).
</p>

<p>
Another thing we will notice is how all values are expressively defined as floats by adding thet ```.0``` to it. That's because the GLSL compiler don't have automatic casting. So if we instead of writing ```0.0``` or ```1.0``` we wrote ```0``` or ```1``` the compilation of the shader will give an error thinking that you are trying to pass an integer to a float.  
</p>


