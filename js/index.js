import $ from 'jquery'

$(function(){
    // $('#box02').css('background-color','pink') 연결 됐는지 확인 차
    let windowW = $(window).width();
    console.log(windowW)
    if(windowW >= 1160){
        nav()
        submenu()
        top()
        // header()
        slide()
    }
    else if(windowW < 1160 && windowW >=980){
        nav()
        submenu()
        top()
        header()
        slide()
    }
    else if(windowW < 980 && windowW >= 580){
        tNav()
        submenu()
        gallery()
        slide()
    }
    else if(windowW < 580){
        tNav()
        gallery()
        formData()
        slide()
    }
    // 공통

    // reset : 포폴용 
    $(window).on('resize',function(e){
        window.location.reload();
    })


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
        $('header .btn').show();
    })
}

function submenu(){
    // html 연결
    $('#submenu li>a').on('click',function(e){
        let subA = $(this).attr('href')
        let aPos = $(subA).offset().top;
        let hdTop = $('header').innerHeight();
        $('html,body').animate({scrollTop:aPos - hdTop},400)
        return false // 낮은버전에 문제 생길까바 해주는
    })
    $('#submenu li>a').on('mousedown',function(e){
        $(this).css('background-color','rgba(82, 82, 236, 0.688)')
    }).on('mouseup',function(e){
        $(this).css('background-color','#fff')
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

function gallery(){
    // 1. 준비하기 figure 가로사이즈
    const figureW = $('#box03 #all figure').width();
    $('#all figure:last').prependTo('#all')
    $('#all').css('margin-left','-'+figureW+'px')
    // 2. prev click -> figure 1개씩 animate <- 방향(이동,스타일변경)
    $('.next').on('click',function(e){
        $('#all').animate({marginLeft:'-='+figureW+'px'},400,function(){
            $('#all figure:first').appendTo('#all');
            $('#all').css('margin-left','-'+figureW+'px');
            
        })
    })
    // 3. next click -> figure 1개씩 animate -> 방향(이동,스타일변경)
    $('.prev').on('click',function(e){
        $('#all').animate({marginLeft:'+='+figureW+'px'},400,function(){
            $('#all figure:last').prependTo('#all');
            $('#all').css('margin-left','-'+figureW+'px');
        })
    })
}

function slide(){
    let ulWidth = $('.page').width();
    $('.page:last').prependTo('#skillView')
    $('#skillView').css('margin-left','-'+ulWidth+'px')
    let srt;

    $('#next').on('click',function(e){
        $('#prev,#next').hide();
      $('#skillView').animate({marginLeft:'-='+ulWidth+'px'},
      function(){
        $('.page:first').appendTo('#skillView')
        $('#skillView').css('margin-left','-'+ulWidth+'px')
        $('#prev,#next').show();
      }
      )
    })
    $('#prev').on('click',function(e){
        $('#prev,#next').hide();
      $('#skillView').animate({marginLeft:'+='+ulWidth+'px'},
      function(){
        $('.page:first').appendTo('#skillView')
        $('#skillView').css('margin-left','-'+ulWidth+'px')
        $('#prev,#next').show();
      }
      )
    })
}

function formData(){
    // 모바일 설정. 
    // placeholder
    // 선언 liform 선택자 두개넣기
    const liForm = $('#box04 li>input,#box04 li>textarea');
    $(liForm).removeAttr('placeholder');
    $(liForm).on('focus',function(e){
        $(this).prev('label').fadeOut(300)
    })
    $(liForm).on('blur',function(e){
        
        let str = $(liForm).val();
        if(str === ''){
            $(this).prev('label').fadeIn(300)
        }
    })
    // 값이 있느냐 없느냐에 따라서 fadeIn str 선언
   
    // 조건문(str 값이 없으면 -> label fadeIn)
    // val() === ''
}

function header(){
    
    $(window).on('scroll',function(e){
        let scrValue = $(this).scrollTop();
        // console.log(scrValue);
        let headerH = $('header').outerHeight();
        if(scrValue>headerH){
            $('header').css('display','none')}
            else{
                    $('header').css('display','block')
                }

    })
}




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
    new Modal('title1','./images/java.png','2022','프로그램1','https://jisoo-portfolio-webtoon.s3.ap-northeast-2.amazonaws.com/index.html','내용1'),
    new Modal('title2','./images/intelliJ.png','2022','프로그램2','http://jisoo-game-dice.s3-website.ap-northeast-2.amazonaws.com','내용2'),
    new Modal('title3','./images/springboot.png','2022','프로그램3','http://jisoo-portfolio-booking.s3-website.ap-northeast-2.amazonaws.com','내용3'),
    new Modal('title4','./images/react','2022','프로그램4','http://jisoo-portfolio-tway.s3-website.ap-northeast-2.amazonaws.com','내용4'),
    new Modal('title5','./images/nodeJs.png','2022','프로그램5','http://jisoo-portfolio-kurly.s3-website.ap-northeast-2.amazonaws.com','내용5'),
    new Modal('title6','./images/vsc.png','2022','프로그램6','http://aaa6.com','내용6')
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