

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
  const selectedId = document.querySelector('#feature-list ol .active').id;
  reqDrivingDistance(targetCoord, selectedId);
  setPointInfo(targetCoord);
})

const wktFormatter = new ol.format.WKT();

function fetchDrivengDistance(wktPoint, range){
  return fetch("/range/reqDrivingDistance", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      wktPoint: wktPoint,
      range: range,
    })
  }).then((response) => response.json());
}
async function reqDrivingDistance(coord, id, allAtOnce){
  if(!id) return;
  const startPoint = new ol.geom.Point(coord);
  const wktPoint = wktFormatter.writeGeometry(startPoint);
  const range = Number(rangeInput.value) * 1000;
  if(range === 0) {
    deleteFeature(id);
    return;
  }
  showLodingImg();
  await fetchDrivengDistance(wktPoint, range)
  .then((jsonData)=>{
    deleteFeature(id);
    const geom = jsonData.ddgeom;
    if(geom){
      const feature = new ol.Feature({
        geometry:wktFormatter.readFeature(geom).getGeometry(),
        labelPoint:startPoint
      });
      feature.setId(id + 'Polygon');
      feature.setStyle(getSelectedColor(id));
      vectorSource.addFeature(feature);
      map.getView().fit(
          feature.getGeometry().getExtent(),
          {
            maxZoom:12,
            duration:1000,
          });
    }else{
      alert('결과가 없습니다 다른지역에서 다시시도 해주세요');
    }
    hideLodingImg();
  }).then((e)=>{
    if(!allAtOnce) getInterSetcion();
  }).catch((e)=>{
    console.log(e);
    hideLodingImg();
    alert('다시 시도해주세요');
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

function getSelectedColor(id){
  const fl = document.getElementById(id);
  const color = fl.querySelector('input[type=color]').value;
  return getPolygonStyle(color);
}

function getPolygonStyle(color){
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


const colorInput =featureList.querySelectorAll('input[type=color]');
colorInput.forEach((i) => {
  i.addEventListener('change',function (){
    const targetId = document.querySelector('#feature-list ol .active').id;
    const targetFeature = vectorSource.getFeatureById(targetId + 'Polygon');
    if(targetFeature){
      targetFeature.setStyle(getPolygonStyle());
    }
  })
});

rangeInput.addEventListener('change',  async function(){
  const liList = featureList.querySelectorAll('ol li');
  for await (const node of liList){
    const id = node.id;
    const x = Number(node.querySelector('div .x').value);
    const y = Number(node.querySelector('div .y').value);
    if(id && x && y){
      const coord = [x,y];
      await reqDrivingDistance(coord , id, true);
    }
  }
  getInterSetcion();
})

function getInterSetcion(){

  deleteFeature('intersection');
  const ddList = vectorSource.getFeatures();
  const jstsOl = new jsts.io.OL3Parser();
  if(ddList.length > 1){
    const stdFeatureGeom = ddList.pop().getGeometry();
    let result = jstsOl.read(stdFeatureGeom);
    ddList.forEach((dd)=>{
      const compareJstsObj = jstsOl.read(dd.getGeometry());
      result = result.intersection(compareJstsObj);
    })

    if(result){
      const resultFeature = new ol.Feature(jstsOl.write(result));
      resultFeature.setId('intersectionPolygon');
      resultFeature.setStyle(getPolygonStyle('#ffffff'));
      vectorSource.addFeature(resultFeature);
    }
  }

}
