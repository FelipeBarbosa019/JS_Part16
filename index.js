const CEP = document.querySelector ('#CEP')
const btnConsult = document.querySelector ('#consult')
const mapBtn = document.querySelector ('#map')
const googleMaps = document.querySelector('#googleMaps')
let lat;
let lng;

document.addEventListener("keydown", function(event) {
    let tamanho = CEP.value.length
    if (event.key === "Backspace"){
        return
    }
    if(tamanho==8){
        btnConsult.style.display = "block"
        return
    }
    if (tamanho >= 9){
        event.preventDefault ();
        return
    }
    if (event.key >= 0 && event.key <= 9){
        if (tamanho === 5){
            CEP.value += "-"
        }
        return
    }
})

btnConsult. addEventListener("click", function(){
    googleMaps.style.display = "none"
    const cepNumber = CEP.value.replace('-','')
    const url = `https://cep.awesomeapi.com.br/json/${cepNumber}`
    fetch(`${url}`)
    .then(response => {
        document.querySelector("body").style.cursor = "wait";
        if (response.status===200){
            document.querySelector("body").style.cursor = "auto";
            return response.json();
        }
    }) 
    .then(data => {
        console.log(data)
        document.querySelector("#error").innerHTML = ''
        document.querySelector("#address").innerHTML = `Endereço: ${data.address}`
        document.querySelector("#district").innerHTML = `Bairro: ${data.district}`
        document.querySelector("#city").innerHTML = `Cidade: ${data.city}`
        document.querySelector("#state").innerHTML = `Estado: ${data.state}`
        document.querySelector("#latitude").innerHTML = `Latitude: ${data.lat}`
        document.querySelector("#longitude").innerHTML = `Longitude: ${data.lng}`
        mapBtn.style.display = "block"
        lat = data.lat
        lng = data.lng
    })
    .catch((error) => {
        console.log(error)
        document.querySelector("#error").innerHTML = 'CEP inválido!'
        mapBtn.style.display = "none"
        googleMaps.style.display = "none"
        document.querySelector("body").style.cursor = "auto";
        document.querySelector("#address").innerHTML = ``
        document.querySelector("#district").innerHTML = ``
        document.querySelector("#city").innerHTML = ``
        document.querySelector("#state").innerHTML = ``
        document.querySelector("#latitude").innerHTML = ``
        document.querySelector("#longitude").innerHTML = ``
    })  
})

mapBtn.addEventListener("click", function(){
    console.log(lat)
    console.log(lng)
    const googleMaps = document.querySelector('#googleMaps')
    googleMaps.src = `https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d14713.595064253397!2d${lng}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1spt-BR!2sbr!4v1657141703121!5m2!1spt-BR!2sbr" width="800" height="600" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade`;
    googleMaps.style.display = "block"
})