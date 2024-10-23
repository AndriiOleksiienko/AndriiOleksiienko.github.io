const header = document.querySelector("header")
const section = document.querySelector("section")
const requestURL = "https://semegenkep.github.io/json/example.json"

const request = new XMLHttpRequest()
request.open("GET", requestURL)

request.responseType = "json"
request.send()

request.onload = function() {
    const superHeroes = request.response
    populateHeader(superHeroes)
    showHeroes(superHeroes)
}

function populateHeader(data){
    const h1 = document.createElement("h1")
    h1.textContent = data.squadName
    const p = document.createElement("p")
    p.textContent = `Hometown: ${data.homeTown} // Formed ${data.formed}`
    header.appendChild(h1)
    header.appendChild(p)
}

function showHeroes(data){
    data.members.forEach((member) => {
        const article = document.createElement("article")
        
        const h2 = document.createElement("h2")
        h2.textContent = member.name

        const secretIdentity = document.createElement("p")
        secretIdentity.textContent = `Secret Identity: ${member.secretIdentity}`
        
        const age = document.createElement("p")
        age.textContent = `Age: ${member.age}`
        
        const powers = document.createElement("p")
        powers.textContent = `Superpowers:`
        
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