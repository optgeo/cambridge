# cambridge
OS Open Zoomstack on Misora

# background

# usage
## 1. download OS Open Zoomstack
Download OS Open Zoomstack from [Ordnance Survey](https://www.ordnancesurvey.co.uk/opendatadownload/products.html#ZMSTCK). Move the downloaded file at `src/OS_Open_Zoomstack.mbtiles`.

## 2. extract vector tiles
```zsh
rake build:tiles
```

## 3. build style.json
```zsh
rake build:style
```

## 4. start the server
```zsh
rake host
```

## 5. next step: see what is possible
```zsh
rake -T
```

# directories
- `src` is for source files
- `zxy` is for tiles
- `fonts` is for fonts
- `sprites` is for sprites

# acknowledgement
`style.json`, `fonts`, and `sprites` are from [gh:OrdnanceSurvey/OS-OpenZoomstack-Stylesheets](https://github.com/OrdnanceSurvey/OS-Open-Zoomstack-Stylesheets/tree/master/Vector%20Tiles/Mapbox%20GL%20Styles).

Contains public sector information licensed under the Open Government Licence v3.0.
