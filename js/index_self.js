// DOM object
const h4 = document.querySelector('#modal h4');
const img = document.querySelector('#modal figure>img');
const day = document.querySelector('#modal dl .year');
const pro = document.querySelector('#modal dl .program');
const url = document.querySelector('#modal dl .link>a');
const content = document.querySelector('#modal dl .text');

// 객체 생성자 함수 (Modal) title,pic,year,program,href,text
function Modal(title,pic,year,program,href,text){
    this.title = title;
    this.pic = pic;
    this.year = year;
    this.program = program;
    this.href = href;
    this.text = text;
}
// 메서드
Modal.prototype.action = function(){
    h4.innerHTML = this.title;
    img.setAttribute('src',this.pic);
    day.innerHTML = this.year;
    pro.innerHTML = this.program;
    url.setAttribute('href',this.href);
    content.innerHTML = this.text;
}

// 인스턴스(6개)
let myModal = [
    new Modal('work01','./images/pic01.png','2001','program1','',''),
    new Modal('work01','./images/pic01.png','2001','program1','',''),
    new Modal('work01','./images/pic01.png','2001','program1','',''),
    new Modal('work01','./images/pic01.png','2001','program1','',''),
    new Modal('work01','./images/pic01.png','2001','program1','',''),
    new Modal('work01','./images/pic01.png','2001','program1','','')
];

// event => 작업 -> click -> figure>img, #modal>.close 
const open = document.querySelectorAll('#all>figure');
const modal = document.querySelector('#modal');
const close = document.querySelector('#modal .close');
// console.log(close);
open.forEach(function(item,index){
    item.onclick = function(){
        modal.style.display = 'block';
        myModal[index].action();
    }
});
close.onclick = function(){
    modal.style.display = 'none';
}
// open.onclick => 첫번쨰만 적용되서 안됨.