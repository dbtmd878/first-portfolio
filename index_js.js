'use strict';

// Make Navabar transparent when it is on the top
const navbar = document.querySelector("#navbar"); // Navbar의 값을 가져온다.
const navbarHeight = navbar.getBoundingClientRect().height; // navbar의 Css를 포함한 엘리멘트의 크기를 찾는다.

document.addEventListener('scroll',()=> {
    // console.log(navbarHeight);
    // console.log(window.scrollY); 윈도우에서 스크롤했을때 스크롤의 위치를 픽셀단위로 제공  
    if(window.scrollY>navbarHeight){
        navbar.classList.add(`navbar--dark`);
    } else {
        navbar.classList.remove(`navbar--dark`);
    }
});

// Handle scrolling when tapping on the navbar
const navbarMenu = document.querySelector(".navbar__menu");
navbarMenu.addEventListener("click", (e)=>{
    const target = e.target;
    const link = target.dataset.link;
    if(link == null){
        return;
    }else{
        // console.log(e.target.dataset.link); 
        const move = document.querySelector(link);
        navbarMenu.classList.remove("open");
        // scrollIntoView(link);
        const top = move.offsetTop - navbarHeight < 0 ? 0:move.offsetTop-navbarHeight; // y축
        const left = 0; // x축 
        window.scrollTo({
            top:top,
            left:left,
            behavior:`smooth`
        });
    }
});

// Navbar toggle button for small screen
const navbarToggleBtn = document.querySelector('.navbar__toggle-btn');
navbarToggleBtn.addEventListener('click', () => {
    navbarMenu.classList.toggle('open');
});

// Handle click on "contact me" button on home
const contact_btn = document.querySelector(".home__contact");
contact_btn.addEventListener("click", ()=>{
    scrollIntoView("#contact");
});

// 마우스가 들어왔을 때 opactiy 1
contact_btn.addEventListener("mouseenter",()=>{
    contact_btn.style.opacity = 1;
});
// 마우스가 나갔을 때 opactiy 0
contact_btn.addEventListener("mouseleave",()=>{
    contact_btn.style.opacity = 1-(window.scrollY / homeHeight);
});


//  Make home style fade to transparent as the window scrolls down
const home = document.querySelector(".home__container");
const homeHeight = home.getBoundingClientRect().height;
const contact_btn_Height = contact_btn.getBoundingClientRect().height;
document.addEventListener('scroll', ()=>{
    home.style.opacity = 1 - (window.scrollY / homeHeight);
    contact_btn.style.opacity = 1 - (window.scrollY / homeHeight);
});

//arrow up button
const arrowUp = document.querySelector(".arrow-up");
arrowUp.addEventListener("click",()=>{
    scrollIntoView("#home");
});

// Show "arrow up" button when scrolling down
document.addEventListener("scroll",()=>{
    if(window.scrollY>homeHeight/2){
        arrowUp.classList.add("visible");
    }else{
        arrowUp.classList.remove("visible");
    }
});

// Projects
const workCategoriesBtn = document.querySelector(".work__categories"); // 카테고리 버튼 내용
const workProjects = document.querySelector(".work__projects"); // 프로젝트 다 갖고옴
const projects = document.querySelectorAll(".project"); // 프로젝트 내용을 배열로 갖고옴
workCategoriesBtn.addEventListener("click",(e)=>{
    const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter; // 필터링 된 내용을 변수에 저장
    if(filter == null){
        return;
    }

    // Remove selection from the previous item and select the new one
    const active = document.querySelector(".category__btn.selected");
    active.classList.remove("selected");
    const target = e.target.nodeName === "BUTTON" ? e.target : e.target.parentNode;
    target.classList.add("selected");

    // const active = document.querySelector('.category__btn.selected');
    // if (active != null) {
    //     active.classList.remove('selected');
    // }
    // e.target.classList.add('selected');


    workProjects.classList.add("anim-out"); // workprojects에 anim-out의 클래스를 추가한다.

    setTimeout(()=>{ // setTimeout 함수 실행
        projects.forEach((e)=>{ // project 배열을 foreach로 각각 실행
            if(filter === "*" || filter ===e.dataset.type){ // 
                e.classList.remove("invisible");
            }else{
                e.classList.add("invisible");
            }
        });
        workProjects.classList.remove("anim-out");
    },300);
});

    // for(let project of projects){
    //  같은 방법
    // }

    // let project;
    // for(let i=0;i<projects.length;i++){
    //  project = projects[i];
    //  같은 방법
    // }    

function scrollIntoView(selector){
    const move = document.querySelector(selector);
    move.scrollIntoView({behavior:"smooth"});
}
