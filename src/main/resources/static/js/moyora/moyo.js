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

const routeDictionary = {};
let myId;
let ws;

checkMyRoom();
function checkMyRoom(){
  postData('/moyora/room/check').then((r)=>{
    const roomNo = r.roomNo;
    const destination = r.destination;
    myId = r.guestNo;

    if(!roomNo &&  roomNo !== 0){
      returnToStart();
    }else if(!destination){
      document.getElementById('roomInfo').innerText ='방번호 : ' + roomNo;
      chooseWaySelectDestination();
    }else{
      const startModal = document.getElementById('start_modal');
      startModal.style.display = 'none';
      document.getElementById('roomInfo').innerText = '방번호 : ' + roomNo;
      routeDictionary[myId] = [];
      setDestinateion([destination.x, destination.y]);
      connectSocket(roomNo);
      const guestList = r.guestList;
      if(guestList) addGuestsInfo(guestList);
    }
  })
}

function returnToStart(){
  document.getElementById('roomInfo').innerText = '';
  const startModal = document.getElementById('start_modal');
  startModal.innerHTML = '';
  startModal.style.display = 'flex';
  const wrapperDiv = document.createElement('div');
  const startButton = document.createElement('button');
  startButton.innerText = '방 만들기';
  startButton.addEventListener('click', ()=>setRoomNoInput('생성하기'));
  const participateButton = document.createElement('button');
  participateButton.innerText = '방 참여하기';
  participateButton.addEventListener('click', ()=>setRoomNoInput('참여하기'));
  wrapperDiv.append(startButton);
  wrapperDiv.append(participateButton);
  startModal.append(wrapperDiv);
  getOutMyRoom();
}

function getOutMyRoom(){
  postData('/moyora/room/out')
  .then((r)=>{console.log(r)});
}
function setRoomNoInput(btnStr){
  const startModal = document.getElementById('start_modal');
  startModal.innerHTML = '';
  startModal.style.display = 'flex';
  const wrapperDiv = document.createElement('div');
  wrapperDiv.style.textAlign = 'center';
  const br1 = document.createElement('br');
  const pwLabel = document.createElement('label');
  pwLabel.innerText = '비밀번호';
  const pwInput = document.createElement('input');
  pwInput.type = 'password';
  pwInput.id = 'pwInput';
  const br2 = document.createElement('br');
  const participateButton = document.createElement('button');
  participateButton.innerText = btnStr;

  if(btnStr === '참여하기' ) {
    const inputLabel = document.createElement('label');
    inputLabel.innerText = '방 번호';
    const roomNoInput = document.createElement('input');
    roomNoInput.type = 'text';
    roomNoInput.id = 'roomNoInput';
    participateButton.addEventListener('click', participateTheRoom);
    wrapperDiv.append(inputLabel);
    wrapperDiv.append(roomNoInput);
  }else if(btnStr === '생성하기' ){
    participateButton.addEventListener('click', makeRoom);
  }

  wrapperDiv.append(br1);
  wrapperDiv.append(pwLabel);
  wrapperDiv.append(pwInput);
  wrapperDiv.append(br2);
  wrapperDiv.append(participateButton);
  startModal.append(wrapperDiv);
  addReturnButton();
}
function participateTheRoom(){
  const roomNo = document.getElementById('roomNoInput').value;
  const pwInput = document.getElementById('pwInput').value;
  if(!roomNo) {
    return;
  }
  postData('/moyora/room/participate', {roomNo, pw:pwInput})
  .then((r)=> {
    if(r.code){
      checkMyRoom();
    }
    alert(r.message);
  });
}
function addReturnButton(){
  const startModal = document.getElementById('start_modal');
  const returnButton = document.createElement('button');
  returnButton.addEventListener('click', returnToStart);
  returnButton.innerText = '되돌아가기';
  startModal.append(returnButton);
}

function addGuestsInfo(guestList){
  guestList.forEach((guest)=> {
    routeDictionary[guest.guestNo] = guest.movingLog.map(({x, y}) => [x, y]);
    setLineString(guest.guestNo);
    setGuestInfoDom(guest);
  })
}

function setGuestInfoDom(guest){

}

function connectSocket(roomNo){
  ws = new WebSocket(`wss://${location.host}/moyora/socket/${roomNo}`);

  ws.onopen = function(e){ // 연결 시 실행
    console.log("info : connection opened.");
    loggingLocation();
  }

  ws.onmessage = function(e){ // 서버로부터 메세지를 받았을 때 실행
    const message = JSON.parse(e.data);
    const callerId = message.id;

    if(!routeDictionary[callerId]) routeDictionary[callerId] = [];
    routeDictionary[callerId].push([message.longitude, message.latitude]);
    appendPointOnMapFeature(callerId, message.longitude, message.latitude);
    if(!document.getElementById('li')) {
      postData('/moyora/guest/getInfo', {roomNo, guestId : callerId})
      .then((r)=>{
        console.log(r);
        setGuestInfoDom(r.guestInfo);
      })
    }
    //
  }

  ws.onclose = function(e){ // 연결 종료 시 실행
    console.log(e);
    console.log("info : connection closed");
  };

  ws.onerror = function(e){
    console.log("error");
  };
}

function makeRoom(){
  const pwInput = document.getElementById('pwInput').value;
  if(!pwInput) {
    alert('비밀번호를 입력 해주세요');
    return;
  }
  postData('/moyora/room/create', { pw: pwInput})
  .then((r)=>{
    const code = r.code;
    if(code){
      document.getElementById('roomInfo').innerText = '방번호 : ' + r.roomNo;
      chooseWaySelectDestination();
    }else{
      alert(r.message);
    }
  })
}

function roomValidate(roomNoInput, pwInput){
  if(!roomNoInput) {
    alert('방 번호를 입력해주세요');
    return false;
  }
  if(!pwInput) {
    alert('비밀번호를 입력해주세요');
    return false;
  }
  const regex = /^[0-9]+$/;
  if(!regex.test(roomNoInput)) {
    alert('방 번호는 글자를 포함할 수 없습니다');
    const tmpInput = document.getElementById('roomNoInput');
    tmpInput.value = null;
    return false;
  }
  return true;
}


function chooseWaySelectDestination(){
  const startModal = document.getElementById('start_modal');
  startModal.innerHTML='';
  startModal.style.display = 'flex';
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
  addReturnButton();
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
  const feature = getDestinationFeature(coord);
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
    myId = room.newGuestNo;
    routeDictionary[myId] = [];
  })
}

let watchID;

function appendPointOnMapFeature(id, longitude, latitude){
  const myFeature = vectorSource.getFeatureById(id);
  if(myFeature){
    myFeature.getGeometry().appendCoordinate([longitude, latitude]);
  }else{
    setLineString(id);
  }
}
function loggingLocation() {
  const options = {
    enableHighAccuracy: true,
    maximumAge: 30000,
    timeout: 27000
  };
  function success(position) {
    const longitude = position.coords.longitude;
    const latitude  = position.coords.latitude;

    routeDictionary[myId].push([longitude, latitude]) ;
    appendPointOnMapFeature(myId, longitude, latitude);

    const data = {
      id : myId,
      longitude : longitude,
      latitude : latitude
    }
    if(ws.readyState === 1){
      ws.send(JSON.stringify(data));
      appendPointOnServer(longitude, latitude);
    }
  }

  function error(e) {
    console.log(e);
    const code = e.code;
    if(code === 3){
      navigator.geolocation.clearWatch(watchID);
      watchID = navigator.geolocation.watchPosition(success, error, options);
    }else{
      alert('위치 액세스에 허용하지 않으면 해당 서비스를 사용할 수 없습니다.');
    }
  }

  if(!navigator.geolocation) {
    loggingLocation();
  } else {
    watchID = navigator.geolocation.watchPosition(success, error, options);
  }
}

function appendPointOnServer(longitude, latitude){
  const data = {longitude, latitude};
  postData("/moyora/guest/addCoordinate", data)
  .then((r) => {console.log(r)});
}


function setLineString(id) {
  const line = new ol.geom.LineString(routeDictionary[id]);
  const feature = new ol.Feature({
    geometry: line,
  });
  feature.setStyle(getLineStringStyle());
  feature.setId(id);
  vectorSource.addFeature(feature);
}
function getLineStringStyle(){
  const color = generateRandomColor();
  return [
    new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: color,
        width: 10 + 2,
      }),
    }),
    new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: color,
        width: 10,
      }),
    }),
  ];
}
function generateRandomColor(){
  let maxVal = 0xFFFFFF; // 16777215
  let randomNumber = Math.random() * maxVal;
  randomNumber = Math.floor(randomNumber);
  randomNumber = randomNumber.toString(16);
  let randColor = randomNumber.padStart(6, 0);
  return `#${randColor.toUpperCase()}`
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
