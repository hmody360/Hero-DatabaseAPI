const heroName = document.getElementById("heroName")
const heroImage = document.getElementById("heroImage")
const heroPowerStats = document.getElementById("heroPowerStats")
const idInput = document.getElementById("idInput")
const idSearchBtn = document.getElementById("idSearchBtn")
const getRandomHero = document.getElementById("getRandomHero")
const error = document.getElementById("error")
const byID = document.getElementById("byID")
const byName = document.getElementById("byName")

const BASE_URL = `https://superheroapi.com/api.php/6256718971094917`
let fetchVal = ""
const statIcons = {
    intelligence: `<i class="fa-solid fa-brain"></i>`,
    strength: `<i class="fa-solid fa-dumbbell"></i>`,
    speed: `<i class="fa-solid fa-bolt-lightning"></i>`,
    durability: `<i class="fa-solid fa-umbrella"></i>`,
    power: `<i class="fa-solid fa-battery-full"></i>`,
    combat: `<i class="fa-solid fa-hand-fist"></i>`
}
const getStatsHTML = (character) => {
    const stats = Object.keys(character.powerstats).map(stat => {
       return `<p>${statIcons[stat]} ${stat}: ${character.powerstats[stat]}</p>`
    })
    console.log(stats);
    return stats.join('')
}
const fetchInfo = (ID) => {
    fetch(`${BASE_URL}/${ID}`)
            .then(response => response.json())
            .then(json => {
                console.log(json);
                heroName.innerText = json.name
                heroImage.innerHTML = `<img src="${json.image.url}"/>`
                heroPowerStats.innerHTML = `${getStatsHTML(json)}`
                // `Combat: ${json.powerstats.combat} <br>
                // Power: ${json.powerstats.power} <br>
                // Durability: ${json.powerstats.durability} <br>
                // Speed: ${json.powerstats.speed} <br>
                // Strength: ${json.powerstats.strength} <br>
                // Intelligence: ${json.powerstats.intelligence}`
            })
}
const Search = (Input) => {
    if (idInput.value == "") {
        error.style.display = "block"
    } else {
    error.style.display = "none"
    if (byID.checked){
        fetchInfo(Input)
    } else {
        fetchVal = `${BASE_URL}/search/${Input}`
        fetch(fetchVal)
        .then(response => response.json())
        .then(json => {
            const ID = json.results[0].id
            fetchInfo(ID)
        })
    }
    
}
}
const RandomHero = () => {
    const ID = Math.floor(Math.random() * 730) + 1
    fetchInfo(ID)
}

idSearchBtn.onclick = () => {
    Search(idInput.value)
}
getRandomHero.onclick = () => {
    RandomHero()
}
