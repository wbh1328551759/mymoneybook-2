import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'index.scss';
import qrcode from './qrcode.png';

if (document.documentElement.clientWidth > 500) {
  window.alert('请使用手机打开本页面，以保证预览效果！');
  const img = document.createElement('img');
  img.src = qrcode;
  img.style.position = 'fixed';
  img.style.left = '50%';
  img.style.top = '50%';
  img.style.transform = 'translate(-50%,-50%)';
  img.style.boxShadow = '0 0 10px rgba(0,0,0,0.45)';
  const p = document.createElement('p');
  p.innerText = '点击关闭二维码';
  p.style.position = 'fixed';
  p.style.left = '50%';
  p.style.top = '30%';
  p.style.transform = 'translate(-50%,-50%)';
  p.style.fontSize = '20px';
  p.style.fontWeight = 'bold';
  p.style.color = "red";
  p.addEventListener('click',()=>{
    p.style.display = "none"
    img.style.display = "none"
  })
  img.addEventListener('click',()=>{
    p.style.display = "none"
    img.style.display = "none"
  })
  const body = document.querySelector('body');
  if (body) {
    body.appendChild(img);
    body.appendChild(p);
  }
}

ReactDOM.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
  document.getElementById('root')
);


