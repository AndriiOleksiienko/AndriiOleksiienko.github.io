const header = document.querySelector("header")
const section = document.querySelector("section")



function populateHeader(data){
    while (header.hasChildNodes()) {
        header.removeChild(header.firstChild);
    }
    const h1 = document.createElement("h1")
    h1.textContent = data.squadName
    const p = document.createElement("p")
    p.textContent = `${data.ht}: ${data.homeTown} // ${data.fm} ${data.formed}`
    header.appendChild(h1)
    header.appendChild(p)
}

function showHeroes(data){
    while (section.hasChildNodes()) {
        section.removeChild(section.firstChild);
    }
    data.members.forEach((member) => {
        const article = document.createElement("article")
        
        const h2 = document.createElement("h2")
        h2.textContent = member.name

        const secretIdentity = document.createElement("p")
        secretIdentity.textContent = `${data.si}: ${member.secretIdentity}`
        
        const age = document.createElement("p")
        age.textContent = `${data.ag}: ${member.age}`
        
        const powers = document.createElement("p")
        powers.textContent = `${data.sp}:`
        
        const ul = document.createElement("ul")
        member.powers.forEach((power) => {
            const li = document.createElement("li")
            li.textContent = power
            ul.appendChild(li)
        })

        article.appendChild(h2)
        article.appendChild(secretIdentity)
        article.appendChild(age)
        article.appendChild(powers)
        article.appendChild(ul)
        section.appendChild(article)
    })
}

let translations = {}

async function loadLanguage(lang) {
    try {
        const response = await fetch(`./locales/${lang}.json`)
        translations = await response.json()
        updateText()
    } catch(error){
        console.error('Error loading translation: ',error)
    }
}

function updateText(){
    populateHeader(translations)
    showHeroes(translations)
}

document.getElementById('language-selector').addEventListener("change", function() {
    const selectedLanguage = this.value;
    loadLanguage(selectedLanguage)
})

loadLanguage("en")
