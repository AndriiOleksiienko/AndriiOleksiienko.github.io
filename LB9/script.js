


const card_list = document.getElementsByClassName("card-list")[0];

function changeText(data){
    while (card_list.hasChildNodes()) {
        card_list.removeChild(card_list.firstChild);
    }
    data.products.forEach( (product) => {
        const slide = document.createElement("div")
        slide.setAttribute("class", "card swiper-slide")
        const content = document.createElement("div")
        content.setAttribute("class", "card-content")

        const category = document.createElement("div")
        category.setAttribute("class", "category")
        const h3 = document.createElement("h3")
        h3.textContent = product.category
        category.appendChild(h3)
        
        const productWrap = document.createElement("div")
        productWrap.setAttribute("class", "product")

        const productImg = document.createElement("div")
        productImg.setAttribute("class", "product-img")
        const img = document.createElement("img")
        img.setAttribute("src", `./images/${product.img}`)
        productImg.appendChild(img)

        const productTitle = document.createElement("div")
        productTitle.setAttribute("class", "product-title")
        const title = document.createElement("h3")
        title.textContent = product.title
        productTitle.appendChild(title)


        const productPrice = document.createElement("div")
        productPrice.setAttribute("class", "product-price")
        if(product.oldPrice !== ""){
            const oldPrice = document.createElement("span")
            oldPrice.textContent = product.oldPrice
            productPrice.appendChild(oldPrice)
        }
        const price = document.createElement("p")
        price.textContent = product.price
        productPrice.appendChild(price)

        const productButton = document.createElement("div")
        productButton.setAttribute("class", "product-button")
        const button = document.createElement("button")
        if (product.buttonActive){
            button.setAttribute("class", "active-button")
            button.textContent = data.inCart
        }else{
            button.setAttribute("class", "inactive-button")
            button.textContent = data.soon
        }
        productButton.appendChild(button)

        
        if (product.markType != "none"){
            const mark = document.createElement("div")
            if(product.markType == "hit"){
                mark.setAttribute("class", "mark hit")
                mark.textContent = data.hit
            }
            else if (product.markType == "new"){
                mark.setAttribute("class", "mark new")
                mark.textContent = data.new
            }
            productWrap.appendChild(mark)
        }
            
            
            


        productWrap.appendChild(productImg)
        productWrap.appendChild(productTitle)
        productWrap.appendChild(productPrice)
        productWrap.appendChild(productButton)
        content.appendChild(category)
        content.appendChild(productWrap)
        slide.appendChild(content)
        card_list.appendChild(slide)
    }   

    

    )
}


let translations = {}

async function loadLanguage(lang) {
    try {
        const response = await fetch(`./locales/${lang}.json`)
        translations = await response.json()
        changeText(translations)
    } catch (error) {
        console.error('Error loading translation: ', error)
    }
    swiper.update()
}

document.getElementById('language-selector').addEventListener("change", function () {
    const selectedLanguage = this.value;
    loadLanguage(selectedLanguage)
})

loadLanguage("uk")

var swiper = new Swiper(".swiper", {
    grabCursor: true,
    loop: true,
    breakpoints: {
        0: {
            slidesPerView: 1
        },
        450: {
            slidesPerView: 2
        },
        650: {
            slidesPerView: 3
        },
        850: {
            slidesPerView: 4
        }
    },
    navigation: {
        nextEl: '#swipe-right',
        prevEl: '#swipe-left',
    },
});