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

let ws;

checkMyRoom();
function checkMyRoom(){
  const startModal = document.getElementById('start_modal');
  postData('/moyora/room/check').then((r)=>{
    const roomNo = r.roomNo;
    if(roomNo || roomNo === 0){
      connectSocket(roomNo);

      loggingLocation();
    }else{
      startModal.style.display = 'flex';
    }
  })
}


function connectSocket(roomNo){

  ws = new WebSocket(`ws://${location.host}/moyora/socket/${roomNo}`);

  ws.onopen = function(e){ // 연결 시 실행
    console.log("info : connection opened.");
  }

  ws.onmessage = function(e){ // 서버로부터 메세지를 받았을 때 실행
    console.log(e.data); //전달 받은 메세지 = e
  }

  ws.onclose = function(e){ // 연결 종료 시 실행
    console.log("info : connection closed");
  };

  ws.onerror = function(e){
    console.log("error")
  };
}

function makeRoom(){
  postData('/moyora/room/create')
  .then((r)=>{
    chooseWaySelectDestination();
  })
}

function chooseWaySelectDestination(){
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

function getDestinationFeature(coord){
  const imgSrc = '/image/marker.png';
  const feature = new ol.Feature({
    geometry: new ol.geom.Point(coord)
  });
  feature.setId('dest');
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
  return feature;
}

function setDestinateion(coord){
  const feature = getDestinationFeature([0,0]);
  vectorSource.addFeature(feature);
}

function targetSetMode() {
  const startModal = document.getElementById('start_modal');
  startModal.style.display = 'none';

  const feature = getDestinationFeature([0,0]);
  vectorSource.addFeature(feature);
  const startAddPoiMoveEvent = function(e){
    const featureGeom = feature.getGeometry();
    featureGeom.setCoordinates(e.coordinate);
  }

  map.on('pointermove', startAddPoiMoveEvent);

  const startAddPoiClickEvent = function(e){
    map.un('pointermove', startAddPoiMoveEvent);
    const featureGeom = feature.getGeometry();
    featureGeom.setCoordinates(e.coordinate);
    if(confirm("해당 위치를 목적지로 설정하시겠습니까?")) {
      map.un('singleclick', startAddPoiClickEvent);
      map.on('singleclick', setDestinationOnRoom(e.coordinate));
    }else{
      map.on('pointermove', startAddPoiMoveEvent);
    }
  };
  map.on('singleclick', startAddPoiClickEvent);
}

function setDestinationOnRoom(coordinate){
  const url = "/moyora/room/setDestination";
  const param = {coordinate};
  postData(url, param)
  .then((res)=>{
    const room = res.room;
    const startModal = document.getElementById('start_modal');
    startModal.style.display = 'none';
    connectSocket(room.roomNo);
    loggingLocation();
  })
}

let watchID;
function loggingLocation() {
  const options = {
    enableHighAccuracy: true,
    maximumAge: 30000,
    timeout: 27000
  };
  function success(position) {
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;

    console.log(latitude, longitude);
  }

  function error() {
    alert('위치 액세스에 허용하지 않으면 해당 서비스를 사용할 수 없습니다.');
  }

  if(!navigator.geolocation) {
    loggingLocation();
  } else {
    watchID = navigator.geolocation.watchPosition(success, error, options);
    //navigator.geolocation.getCurrentPosition(success, error);
  }
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
