const key = "7aff05df3190158623733a01dc3ec90a";
const form = document.querySelector('.search');

const horas = document.getElementById('horas');
const minutos = document.getElementById('minutos');
const segundos = document.getElementById('segundos');

setInterval(function relogio(){
    
    let date = new Date();
    let hr = date.getHours();
    let min = date.getMinutes();
    let sec = date.getSeconds();

    function formatTime(time){
        return time < 10 ? '0' + time : time;
    }

    horas.innerHTML = `${formatTime(hr)}`
    minutos.innerHTML = `${formatTime(min)}`
    segundos.innerHTML = `${formatTime(sec)}`

},1000);

async function buscarCidade(cidade) {
    try {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${key}&lang=pt_br&units=metric`;
        let response = await fetch(url);
        let dados = await response.json();   
        mapearDados(dados);
    } catch (error) {
        console.log(error);
    }
}

function mapearDados(dados){
    document.getElementById('cidade').innerHTML = "Tempo agora em " + dados.name;
    document.getElementById('temperatura').innerHTML = "Temperatura: " + Math.floor(dados.main.temp) + "ºC";
    document.getElementById('umidade').innerHTML = "Umidade: " + dados.main.humidity + "%"; 
    document.getElementById('description').innerHTML = dados.weather[0].description;
    document.querySelector('.icone').src = "https://openweathermap.org/img/wn/" + dados.weather[0].icon + ".png";
}

form.addEventListener('submit', e => {
    e.preventDefault();

    const cidade = document.querySelector('.inputSearch').value;
    buscarCidade(cidade);
    document.querySelector('.inputSearch').value = '';
});

