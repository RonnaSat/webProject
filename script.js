function onLoad() {

    fetch('https://api.jikan.moe/v4/seasons/now').then(response => {
        return response.json()
    })
        .then(incomeData => {
            defaultHide()
            console.log(incomeData.data)
            addAnimeList(incomeData.data,0)
        }
        )
}


var defaultPage = document.getElementById('defaultPage')
var interestedPage = document.getElementById('interestedPage')
var detailPage = document.getElementById('detailPage')
function defaultHide(){
    interestedPage.style.display = 'none'
    detailPage.style.display = 'none'
}
function hideAll() {
    defaultPage.style.display = 'none'
    interestedPage.style.display = 'none'
    detailPage.style.display = 'none'
}
document.getElementById('homeBtn').addEventListener('click', function () {
    onLoad()
    
})
document.getElementById('interestedBtn').addEventListener('click', function () {
    hideAll()
    interestedPage.style.display = 'block'

})
// document.getElementById('detailPage').addEventListener('click', function () {
//     hideAll()
//     detailPage.style.display = 'block'

// })


function addAnimeList(aniList,status) {
    
    let divBody = document.getElementById('defaultPage')
    divBody.innerHTML = ""
    let text = document.createElement('h2')
    text.innerHTML = 'Anime List'
    divBody.appendChild(text)
    let contentDiv = document.createElement('div')
    contentDiv.id = 'contentCard'
    contentDiv.classList.add('container')
    contentDiv.classList.add('d-flex')
    contentDiv.classList.add('flex-wrap')
    divBody.appendChild(contentDiv)
    for (ani of aniList) {
        addStudentToDiv(status, ani)
    }
}
function addStudentToDiv(status,data){
    let divBody = document.getElementById('contentCard')
    let card = document.createElement('div')
    card.classList.add('card')
    card.classList.add('mx-2')
    card.classList.add('my-5')
    card.style.width = "15rem"
    card.style.height = "25rem"
    card.style.minWidth = '15rem'
    card.classList.add('btn')
    
    let image = document.createElement('img')
    if (status == 0){
        image.src = `${data.images.jpg.image_url} `
    }else if (status == 1){
        image.src = `${data.image_url} `
    }
    
    image.classList.add('card-img-top')
    image.style.height = '22rem'
    let cardBody = document.createElement('div')
    cardBody.classList.add('card-body')
    let infoText = document.createElement('p')
    infoText.classList.add('card-text')
    infoText.classList.add('w-75')
    infoText.classList.add('d-inline-block')
    infoText.classList.add('text-truncate')
    infoText.innerText = `${data.title} `
    cardBody.appendChild(infoText)
    card.appendChild(image)
    card.appendChild(cardBody)
    card.addEventListener('dblclick', function () {
        showAnimeDetail(data)
    })
    divBody.appendChild(card)
}

document.getElementById('searchBtn').addEventListener('click', function () {
    let searchText = document.getElementById('searchInput').value
    hideAll()
    defaultPage.style.display = 'block'
    fetch(`https://api.jikan.moe/v3/search/anime?q=${searchText}`).then(response => {
        return response.json()
    })
        .then(incomeData => {
            defaultHide()
            
            console.log(incomeData.results)
            addAnimeList(incomeData.results,1)
        }
        )
})

