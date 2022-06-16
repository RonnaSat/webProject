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
    for (ani of aniList) {
        addStudentToDiv(counter++, ani)
    }
}
function addStudentToDiv(index,data){

}