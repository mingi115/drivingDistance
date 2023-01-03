function showLodingImg(){
  const lImg = document.getElementById('loading');
  lImg.style.display = 'flex';
}

function hideLodingImg(){
  const lImg = document.getElementById('loading');
  lImg.style.display = 'none';
}
const vectorSource = new ol.source.Vector()
const vertorLayer = new ol.layer.Vector({
  source : vectorSource,
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
  setPointInfo(targetCoord);
})

const wktFormatter = new ol.format.WKT();
function reqDrivingDistance(coord){
  const selectedId = document.querySelector('#feature-list ol .active').id;
  const startPoint = new ol.geom.Point(coord);
  const wktPoint =wktFormatter.writeGeometry(startPoint);
  const range = Number(rangeInput.value) * 1000;
  if(range === 0) {
    // vectorSource.clear();
    deleteFeature(selectedId);
    return;
  }
  showLodingImg();
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
    deleteFeature(selectedId);
    const geom = jsonData.ddgeom;
    if(geom){
      const feature = new ol.Feature({
        geometry:wktFormatter.readFeature(geom).getGeometry(),
        labelPoint:startPoint
      });
      feature.setId(selectedId + 'Polygon');
      feature.setStyle(getPolygonStyle());
      // vectorSource.clear();
      vectorSource.addFeature(feature);
      map.getView().fit(
          feature.getGeometry().getExtent(),
          {
            maxZoom:12,
            duration:1000,
          });
    }
    hideLodingImg();
  });
}

const listShowBtn = document.getElementById('feature-list-btn');
const featureList = document.getElementById('feature-list');
listShowBtn.addEventListener('click',function (){
  if(listShowBtn.innerText === '△'){
    listShowBtn.innerText = '▽';
  }else{
    listShowBtn.innerText = '△';
  }

  if(featureList.classList.contains('show')){
    featureList.classList.remove('show');
  }else{
    featureList.classList.add('show');
  }
});

function getSelectedColor(){
  const fl = document.getElementById('feature-list');
  const hexColor = fl.querySelector('.active input[type=color]').value;
  return hexColor;
}

function getPolygonStyle(){
  const color = getSelectedColor();
  return new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: color,
      width: 4
    }),
    fill: new ol.style.Fill({
      color: color+'4d',
    })
  })
}

function deleteFeature(id){
  const polygonFeature = vectorSource.getFeatureById(id+'Polygon');
  vectorSource.removeFeature(polygonFeature);
}

const liArr = document.querySelectorAll('#feature-list ol li');
liArr.forEach((li) => li.addEventListener('click', changeActiveLi));
function changeActiveLi(){
  liArr.forEach((li)=>li.classList.remove('active'));
  this.classList.add('active');
}

function setPointInfo(point){
  const activeNode = document.querySelector('#feature-list ol .active');
  const inputX = activeNode.querySelector('.x');
  inputX.value = point[0];
  const inputY = activeNode.querySelector('.y');
  inputY.value = point[1];
}
