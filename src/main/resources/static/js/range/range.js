const vectorSource = new ol.source.Vector()
const vertorLayer = new ol.layer.Vector({
  source : vectorSource,
  style : [
    new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: 'red',
        width: 5
      }),
      fill: new ol.style.Fill({
        color: '#FF00004d',
      })
    })
  ]
})
const map = new ol.Map({
  view: new ol.View({
    projection : 'EPSG:4326',
    center: [126.99299692909582, 37.48238435140724],
    extent : [125.01266399672463, 32.26999548234554, 132.32723839911958, 39.69721733446938],
    zoom: 7,
  }),
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM({
        attributions : false
      }),
    }),
    vertorLayer
  ],
  target: 'map',
});

const rangeInput = document.getElementById('range-input');
let targetCoord;
rangeInput.addEventListener('change',function(){
  if(!targetCoord) return;
  reqDrivingDistance(targetCoord);
})
map.on('click', function(e){
  targetCoord = e.coordinate;
  reqDrivingDistance(targetCoord);
})

const wktFormatter = new ol.format.WKT();
function reqDrivingDistance(coord){

  const startPoint = new ol.geom.Point(coord);
  const wktPoint =wktFormatter.writeGeometry(startPoint);
  const range = Number(rangeInput.value) * 1000;
  if(range === 0) {
    vectorSource.clear();
    return;
  }
  fetch("/range/reqDrivingDistance", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      wktPoint: wktPoint,
      range: range,
    }),
  }).then((response) => response.json())
  .then((jsonData)=>{
    const geom = jsonData.ddgeom
    const feature = wktFormatter.readFeature(geom);
    vectorSource.clear();
    vectorSource.addFeature(feature);
    map.getView().fit(
        feature.getGeometry().getExtent(),
        {
          maxZoom:12,
          duration:1000,
        });
  });
}

