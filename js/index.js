import $ from 'jquery'

$(function(){
    // $('#box02').css('background-color','pink') 연결 됐는지 확인 차
    let windowW = $(window).width();
    if(windowW >= 1160){
        nav()
        submenu()
        top()
    }
    else if(windowW < 1160 && windowW >=980){
        nav()
        submenu()
        top()
    }
    else if(windowW < 980 && windowW >= 580){
        tNav()
    }
    else if(windowW < 580){
        tNav()
    }
    // 공통

    // reset
})

// web용 nav
function nav(){
    $('nav li>a').on('click',function(e){
        let navA = $(this).attr('href')
        let aPos = $(navA).offset().top;
        let headerH = $('header').innerHeight();  // height 은 padding댐에 정확한 높이 나오지 않음
        $('html,body').animate({scrollTop: aPos - headerH},400)
        return false;
    })
}
// tablet,mobile용 nav
function tNav(){
    let navW = $('nav').width();

    // .btn click
    $('header .btn').on('click',function(e){
        $(this).hide();
        $('nav').animate({left:0},400)
    })
    // scroll
    $('nav li>a').on('click',function(e){
        let navA = $(this).attr('href')
        let aPos = $(navA).offset().top;
        let headerH = $('header').innerHeight();  // height 은 padding댐에 정확한 높이 나오지 않음
        $('html,body').animate({scrollTop: aPos - headerH},400)
        $('nav').css('left','-'+navW+'px')
        $('header .btn').show();
        return false;
    })
    // close
    $('nav .close').on('click',function(e){
        $('nav').css('left','-'+navW+'px');
    })
}

function submenu(){
    // html 연결
    $('#submenu li>a').on('click',function(e){
        let subA = $(this).attr('href')
        let aPos = $(subA).offset().top;
        $('html,body').animate({scrollTop:aPos},400)
        return false
    })
    // jquery
}

function top(){
    $('#top>a').on('click',function(e){
        let topA = $(this).attr('href')
        let aPos = $(topA).offset().top;
        $('html,body').animate({scrollTop:aPos},400)
        return false 
    })
}













// DOM object
const h4 = document.querySelector('#modal h4');
const img = document.querySelector('#modal figure>img');
const day = document.querySelector('#modal dl .year');
const pro = document.querySelector('#modal dl .program');
const url = document.querySelector('#modal dl .linl>a');
const content = document.querySelector('#modal dl .text');
// 객체 생성자 함수 (Modal) title,pic,year,program,href,text

function Modal(title,pic,year,program,href,text){
   this.title = title;
   this.pic = pic;
   this.year = year;
   this.program  = program;
   this.href = href;
   this.text = text;
}
// console.log(img); 내가 잘했는지 못했는지 넣어보기
// 메서드
Modal.prototype.action = function(){

h4.innerHTML = this.title;
img.setAttribute('src',this.pic);
day.innerHTML = this.year;
pro.innerHTML = this.program;
url.setAttribute('href',this.href);
url.innerHTML = this.href;
content.innerHTML = this.text;

}
// 인스턴스(6개)
let myModal = [
    new Modal('title1','./images/pic01.png','2022','프로그램1','http://aaa1.com','내용1'),
    new Modal('title2','./images/pic02.png','2022','프로그램2','http://aaa2.com','내용2'),
    new Modal('title3','./images/pic03.png','2022','프로그램3','http://aaa3.com','내용3'),
    new Modal('title4','./images/pic04.png','2022','프로그램4','http://aaa4.com','내용4'),
    new Modal('title5','./images/pic01.png','2022','프로그램5','http://aaa5.com','내용5'),
    new Modal('title6','./images/pic02.png','2022','프로그램6','http://aaa6.com','내용6')
]

// event => 작업 -> click -> figure>img, #modal>.close 

const open = document.querySelectorAll('#all>figure'); // figure여러개 -> all]
// console.log(open); 확인을 하기위한 부분이라 주석처리
const close = document.querySelector('#modal>.close');
// console.log(close);
const modal = document.querySelector('#modal');
// open.onclick => 첫번쨰만 적용되서 안됨.
open.forEach(function(item,index){
    item.onclick = function(){
        modal.style.display = 'block'; // 1. block
        myModal[index].action();       // 2. 값을 변경
    }
},0)
close.onclick = function(){
    modal.style.display = 'none';
} // 하나니까 그냥 onclick