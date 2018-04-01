# CanvasSky

### `Usage`
1) Download the File canvasSky.js from releases. You don't need the source code, only the compiled file.
2) Copy the file to your project folder and include it into your html file.
3) Create a canvas and give it an id.
4) Create a new instance of canvasSky. You can either provide a settings.json file or use the default configuration.

Because canvasSky needs to load a config file it must be served from a http-server!

**Create instance**<br>
`window.onload = () => {
      new canvasSky([id], [path to settings file]);
    };`
    
### `Options`

key | description / notes | options | example
----|---------|------|----
`size` | Defines the size of the canvas | "fullpage" or size, width in % | size: {width: "100%", height: "50%"}
`mode` | "responsive" will register an eventlistenter on the resize-event so the canvas is redrawn whenever the window is resized | "responsive", "static" | "mode": "responsive"
`colors` | Array of colors (hex-values) for the background | | "colors": ["#100046","#b2541e"]
`stars.count` | How many stars to be drawn | int values | "count": 288
`stars.minSize` | The min size of the stars | int values | "minSize": 1
`stars.maxSize` | The max size of the stars | int values | "maxSize": 3
`stars.color` | The color of the stars | hex color values | "color": "#ffffff"
