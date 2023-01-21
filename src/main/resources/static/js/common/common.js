function showLodingImg(){
  const loadingDiv = document.createElement('div');
  loadingDiv.id = 'loading';
  loadingDiv.style.display = 'flex';
  const loadingImg = document.createElement('img');
  loadingImg.id = 'loading-img';
  loadingImg.src = '/image/diable_loading.gif';
  loadingImg.alt = '로딩이미지';
  loadingDiv.append(loadingImg);

  document.querySelector('body').append(loadingDiv);
}

function hideLodingImg(){
  document.getElementById('loading').remove();
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
