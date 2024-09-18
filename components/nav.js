const template = document.createElement("template");
template.innerHTML = `
    <link rel="stylesheet" href="./styles/reset.css">
    <link rel="stylesheet" href="./styles/components.css">
    <link rel="stylesheet" href="./styles/style.css">
    <link rel="stylesheet" href="./styles/responsive.css">
    <link rel="stylesheet" href="./styles/grid.css">



    <div class="mobile-menu">
        <svg class="close-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 class="mobile-menu__logo logo-pink"><a href="./index.html">سایتینو</a></h3>
        <ul class="mobile-menu__list">
            <li class="mobile-menu__items"><a class="mobile-menu__items-link" href="../index.html">خانه</a></li>
            <li class="mobile-menu__items"><a class="mobile-menu__items-link" href="../resume.html">نمونه کارها</a></li>
            <li class="mobile-menu__items"><a class="mobile-menu__items-link" href="../guide.html">راهنما</a></li>
            <li class="mobile-menu__items"><a class="mobile-menu__items-link" href="../contact-us.html">ارتباط با ما</a></li>
            <li class="mobile-menu__items"><a class="mobile-menu__items-link" href="../about-us.html">درباره ما</a></li>
            <li class="mobile-menu__items"><a class="mobile-menu__items-link" href="../sign.html">مشاوره رایگان</a></li>
        </ul>
    </div>



    <nav class="nav">
        <div class="container">
            <div class="nav-children">

                <div class="menu-btn">
                    <span class="menu-btn__line"></span>
                </div>


                <h3 class="logo"><a href="./index.html">سایتینو</a></h3>


                <div class="menu-holder">
                    <ul class="menu-holder__list">
                        <li class="menu-holder__items"><a href="./index.html">خانه</a></li>
                        <li class="menu-holder__items"><a href="./resume.html">نمونه کارها</a></li>
                        <li class="menu-holder__items"><a href="./guide.html">راهنما</a></li>
                        <li class="menu-holder__items"><a href="./contact-us.html">ارتباط با ما</a></li>
                        <li class="menu-holder__items"><a href="./about-us.html">درباره ما</a></li>
                    </ul>
                    <a class="counseling-btn btn" href="./sign.html">مشاوره رایگان</a>
                    <a class="sign-btn" href="../sign.html">
                        <svg class="sign-btn__icon" xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-person-fill-exclamation" viewBox="0 0 16 16">
                            <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm-9 8c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Z"/>
                            <path d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm-3.5-2a.5.5 0 0 0-.5.5v1.5a.5.5 0 0 0 1 0V11a.5.5 0 0 0-.5-.5Zm0 4a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1Z"/>
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    </nav>
`;

class nav extends HTMLElement{
    constructor(){
        super();

        this.attachShadow({mode: "open"});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
    connectedCallback(){
        const selectHamCloseBtn = this.shadowRoot.querySelector(".close-icon");
        const selectHamMenu = this.shadowRoot.querySelector(".mobile-menu");
        const selectHamMenuBtn = this.shadowRoot.querySelector(".menu-btn");

        selectHamMenuBtn.onclick = ()=>{
            selectHamMenu.classList.add("mobile-menu--active");
        }
        selectHamCloseBtn.onclick = ()=>{
            selectHamMenu.classList.remove("mobile-menu--active");
        }

        const scrollHandler = () => {
            if(document.documentElement.scrollTop > 0){
                this.shadowRoot.querySelector(".nav").classList.add("onScroll");
            }
            else{
                this.shadowRoot.querySelector(".nav").classList.remove("onScroll");
            }
        }
        window.onscroll = scrollHandler;
        window.onload = scrollHandler;
    }
}
export{nav}