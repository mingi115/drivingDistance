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
