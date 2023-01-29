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


function makeRoom(){
  postData('/moyora/room/create')
  .then((r)=>{
    chooseWaySelectDestination(r.roomNo);
  })
}

function chooseWaySelectDestination(roomNo){
  console.log(roomNo);
  const startModal = document.getElementById('start_modal');
  startModal.innerHTML='';
  const wrapper = document.createElement('div');
  const designateTarget = document.createElement('button');
  designateTarget.type = 'button';
  designateTarget.innerHTML = '직접지정';
  designateTarget.addEventListener('click', targetSetMode);
  const findAddressTarget = document.createElement('button');
  findAddressTarget.type = 'button';
  findAddressTarget.innerHTML = '주소지정';
  designateTarget.addEventListener('click', findTargetAddress);
  wrapper.append(findAddressTarget);
  wrapper.append(designateTarget);
  startModal.append(wrapper);
}

function findTargetAddress(){}


function targetSetMode() {
  const startModal = document.getElementById('start_modal');
  startModal.style.display = 'none';
  console.log('targetSetMode');

  const imgSrc = '/image/pngwing.com.png';
  const feature = new ol.Feature({
    geometry: new ol.geom.Point([0,0])
  });

  feature.setStyle(
      new ol.style.Style({
        image: new ol.style.Icon({
          anchor: [0.5, 0.3],
          anchorOrigin : 'bottom-left',
          anchorXUnits: 'fraction',
          anchorYUnits: 'pixels',
          src: imgSrc
        })
      })
  );
  const startAddPoiMoveEvent = function(e){
    var featureGeom = feature.getGeometry();
    featureGeom.setCoordinates(e.coordinate);
  }
  vectorSource.addFeature(feature);
  map.on('pointermove', startAddPoiMoveEvent);

  const startAddPoiClickEvent = function(e){
    map.un('pointermove', startAddPoiMoveEvent);
    var featureGeom = feature.getGeometry();
    featureGeom.setCoordinates(e.coordinate);
    map.un('singleclick', startAddPoiClickEvent);
    map.on('singleclick', callOverLay);
  };
  map.on('singleclick', startAddPoiClickEvent);
}

async function postData(url = '', data = {}) {
  // 옵션 기본 값은 *로 강조
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE 등
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body의 데이터 유형은 반드시 "Content-Type" 헤더와 일치해야 함
  });
  return response.json(); // JSON 응답을 네이티브 JavaScript 객체로 파싱
}
