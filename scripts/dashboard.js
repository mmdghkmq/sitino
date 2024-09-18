// Buttons //
const selectCloseBtn = document.querySelector(".log-out");

// Username Section //
const userNameSection = document.querySelector(".account-info__value");
const settingUsername = document.querySelector("#setting-username");
const settingEmail = document.querySelector("#setting-email");
const settingPassword = document.querySelector("#setting-password");

// Options Item //
const navItems = document.querySelectorAll(".nav-item");
let itemCounter = 0;

// Error Window //
const reportError = document.querySelector(".error-report");
const errorWindow = document.querySelector(".error-report-window");
const sendErrorBtn = document.querySelector(".send-btn");
const errorTextBox = document.querySelector(".error-report__text");

// Factor Window //
const factorBtn = document.querySelector(".factor-btn");
const factorWindow = document.querySelector(".factor-window");
const closeWindow = document.querySelectorAll(".popup__close");
const table = document.querySelector(".factor-table");
const purchaseBtn = document.querySelector(".purchase-btn");

// Chat Menu //
const chatMenuIcon = document.querySelector(".chat-menu-icon");
const chatMenu = document.querySelector(".chat-menu");

// Chat Bar //
const chatBox = document.querySelector(".chat-box");
const sendBtn = document.querySelector(".send-message");
const chatBody = document.querySelector(".chat-body");

// Select order type //
const webType = document.querySelectorAll(".site-types__item");
const domainPrefix = document.querySelectorAll(".domain-selection__item");
const hostVolume = document.querySelectorAll(".host-selection__item");
const totalCost = document.querySelector(".total-cost__price");
const confirmBtn = document.querySelector(".total-cost-confirm");
const domainName = document.querySelector(".name-selection__input");
const itemsPrices = [
    {id: 1, price: 0},
    {id: 2, price: 0},
    {id: 3, price: 0}
];

// News letter btn//
const toggleButtons = document.querySelectorAll(".toggle-btn");
const getNewsBtn = document.querySelector(".get-news");
const getMessagesBtn = document.querySelector(".get-messages");
const newsSlider = document.querySelector(".news-slider");
const messagesSlider = document.querySelector(".messages-slider");

// Add to subscription
const subscriptionTableBody = document.querySelector(".table__body");
let productsNumber = 0;

// ======================================================= Close btn config ===========================================================//
selectCloseBtn.onclick = ()=>{
    window.location.href = "./sign.html";
    localStorage.clear();
};

// ======================================================= List items config ===========================================================//
navItems.forEach((item)=>{
    item.onclick = ()=>{
        document.querySelector(".welcome").style.display = "none";
        if(document.querySelector(".nav-item--active")){
            document.querySelector(".nav-item--active").classList.remove("nav-item--active");

            let selectActiveBody = document.querySelector(".active-body");
            selectActiveBody.classList.remove("active-body");
            selectActiveBody.style.display = "none";
        }
        item.classList.add("nav-item--active");
        const selectRelatedBody = document.querySelector(`.${item.id}`);
        selectRelatedBody.classList.add("active-body");
        selectRelatedBody.style.display = "block";
        ++itemCounter;
    }
});

// ========================================================= Chat Menu Config ============================================================//
chatMenuIcon.onclick = ()=>{
    chatMenu.classList.toggle("chat-menu--active");
}
document.onclick = (event)=>{
    if(!chatMenuIcon.contains(event.target)){
        chatMenu.classList.remove("chat-menu--active");
    }
}
// ======================================================= Chat config ===========================================================//

let chatConfig = ()=>{
    if(!(chatBox.value === "")){
        const messageText = chatBox.value;
        const message = document.createElement("div");
        message.innerHTML = messageText;
        message.classList.add("user-message");
        chatBody.append(message);
        chatBox.value = "";
    }
}
sendBtn.onclick = chatConfig;

// ======================================================= Order config ===========================================================//
function itemActivator(item, activeItemClass){
    if(document.querySelector(`.${activeItemClass}`)){
        const selectActiveItem = document.querySelector(`.${activeItemClass}`);
        selectActiveItem.classList.remove(activeItemClass);
    }
    item.classList.add(activeItemClass);
}

function setItemPrices(item,index){
    const getItemCost = item.getAttribute("cost").replace(/\,/g,'');
    itemsPrices[index].price = Number(getItemCost);
}

function siteCostCalculation(){
    let sum = 0;
    itemsPrices.forEach((obj)=>{
        sum += obj.price;
    });
    totalCost.innerHTML = sum.toLocaleString("en-us") + " تومان";
}

webType.forEach((item)=>{
    item.onclick = ()=>{
        itemActivator(item,"site-types__item--active")
        setItemPrices(item,0);
        siteCostCalculation();
    };
});

domainPrefix.forEach((item)=>{
    item.onclick = ()=>{
        itemActivator(item,"domain-selection__item--active")
        setItemPrices(item,1);
        siteCostCalculation();
    };
});

hostVolume.forEach((item)=>{
    item.onclick = ()=>{
        itemActivator(item,"host-selection__item--active")
        setItemPrices(item,2);
        siteCostCalculation();
    };
});

confirmBtn.onclick = ()=>{
    if(document.querySelector(".default-row")){
        document.querySelector(".default-row").remove();
    };

    let webType = document.querySelector(".site-types__item--active .site-types__name");
    let webName = domainName.value;
    let domain =  document.querySelector(".domain-selection__item--active");
    let host = document.querySelector(".host-selection__item--active");
    if(webType && webName && domain && host){
        let subScriptionInfo = {
            typeName: webType.innerHTML,
            name: webName,
            domain: domain.innerHTML,
            host: host.innerHTML,
            total: `${totalCost.innerHTML}`
        };
        createProduct(subScriptionInfo);
        addToSubscription(subScriptionInfo);
    }
};

function createProduct(product){
    let createProduct = document.createElement("tr");
    createProduct.classList.add("factor-table__body");
    createProduct.innerHTML = `
        <td class="product-cell">پروژه ${product.typeName}(${product.name})</td>
        <td class="product-cell domain-cell">${product.domain}</td>
        <td class="product-cell">${product.host}</td>
        <td class="product-cell">${product.total}</td>
        <td class="product-cell trash-cell">
            <svg class="product-delete-btn" onclick="deleteOrder()" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
            </svg>
        </td>
    `;
    table.append(createProduct);
    resetBasket();
}

function resetBasket(){
    // console.log(document.querySelector(".site-types__item--active"));
    // console.log(document.querySelector(".site-types__item--active").classList.remove("site-types__item--active"));
    document.querySelector(".site-types__item--active").classList.remove("site-types__item--active");
    document.querySelector(".domain-selection__item--active").classList.remove("domain-selection__item--active");
    document.querySelector(".host-selection__item--active").classList.remove("host-selection__item--active");
    domainName.value = "";
    sum = 0;
    itemsPrices.forEach((item)=>{
        item.price = 0;
    });
    totalCost.innerHTML = "صفر";
}

function deleteOrder(){
    document.querySelector(".product-delete-btn").parentElement.parentElement.remove();
};

purchaseBtn.onclick = ()=>{
    if(document.querySelector(".product-cell")){
        location.reload();
    };
};

// ======================================================= Toggle Btn ===========================================================//
toggleButtons.forEach((item)=>{
    item.onclick = ()=>{
        item.classList.toggle("toggle-btn--active");
    };
});

// ======================================================= Tooltips config ===========================================================//
const emailSetting = ()=>{
    let getEmail = localStorage.key("email");
    let getPassword = localStorage.getItem(getEmail);
    userNameSection.innerHTML = getEmail;
    settingUsername.value = getEmail;
    settingEmail.value = getEmail;
    settingPassword.value = getPassword;
}
window.addEventListener("load",()=>{
    emailSetting();
});

// =================================================== Error Report and Factor ======================================================//
closeWindow.forEach((btn)=>{
    btn.onclick = ()=>{
        btn.parentElement.classList.remove("popup-window--show");
    };
});
reportError.onclick = ()=>{
    errorWindow.classList.add("popup-window--show");
};
factorBtn.onclick = ()=>{
    factorWindow.classList.add("popup-window--show");
};
sendErrorBtn.onclick = ()=>{
    if(!(errorTextBox.value === "")){
        location.reload();
    }
};

// ==================================================== Add to subscription =======================================================//
function addToSubscription(product){
    if(document.querySelector(".default-row")){
        document.querySelector(".default-row").remove();
    }

    let createTr = document.createElement("tr");
    createTr.classList.add("table__body__row");

    let createDate = new Date().toLocaleDateString("fa-IR");

    createTr.innerHTML = `
        <td class="table__body__cell">
            ${++productsNumber}
        </td>
        <td class="table__body__cell">
            ${product.name}
        </td>
        <td class="table__body__cell">
            ${createDate}
        </td>
        <td class="table__body__cell">
            ${192601357}
        </td>
        <td class="table__body__cell">
            ${product.host}
        </td>
        <td class="table__body__cell">
            ${product.host}
        </td>
        <td class="table__body__cell">
            <svg class="online-status" xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" class="bi bi-circle-fill" viewBox="0 0 16 16">
                <circle cx="8" cy="8" r="8"/>
            </svg>
            آنلاین
        </td>
    `;

    subscriptionTableBody.append(createTr);
    // resetBasket();
}