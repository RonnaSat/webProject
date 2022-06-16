function onLoad() {

    fetch('https://api.jikan.moe/v4/seasons/now').then(response => {
        return response.json()
    })
        .then(incomeData => {
            defaultHide()
            console.log(incomeData.data)
            addAnimeList(incomeData.data)
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
    hideAll()
    defaultPage.style.display = 'block'
    
})
document.getElementById('interestedBtn').addEventListener('click', function () {
    hideAll()
    interestedPage.style.display = 'block'

})
// document.getElementById('detailPage').addEventListener('click', function () {
//     hideAll()
//     detailPage.style.display = 'block'

// })


function addAnimeList(aniList) {
    let counter = 1;
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
        addStudentToDiv(counter++, ani)
    }
}
function addStudentToDiv(index,data){
    let divBody = document.getElementById('contentCard')
    let card = document.createElement('div')
    card.classList.add('card')
    card.classList.add('m-2')
    card.style.width = "12rem";
    card.style.height = "16rem"
    let image = document.createElement('img')
    image.src = `${data.images.jpg.image_url} `
    image.classList.add('card-img-top')
    card.appendChild(image)
    
    divBody.appendChild(card)
}