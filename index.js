const listChampions = document.getElementById('liste-champions');
const buttonVoirPrec = document.getElementById('voir-prec');
const buttonVoirSuiv = document.getElementById('voir-suiv');
let idStartChamp = 0;


buttonVoirPrec.disabled = true; 

function get10Champions(){
    fetch('http://localhost:3000/champions', {
        method : 'GET'
    })
    .then((response) => response.json())
    .then((json) => {
        while (listChampions.firstChild) {
            listChampions.removeChild(listChampions.firstChild);
        }
        for(let i = 0; i < 10; i++){
            const viewChampion = document.createElement('li'); 
            viewChampion.textContent = json[i]["id"];
            viewChampion.addEventListener('click',getDetailChampion.bind(null, json[i]["id"]));
            listChampions.appendChild(viewChampion);
        }
        });
};

function getNextChampions(){
    fetch('http://localhost:3000/champions', {
        method : 'GET'
    })
    .then((response) => response.json())
    .then((json) => {
        while (listChampions.firstChild) {
            listChampions.removeChild(listChampions.firstChild);
        }
        buttonVoirPrec.disabled = false; 
        if (idStartChamp + 10 < json.length){
            idStartChamp += 10;
        }
        else{
            buttonVoirSuiv.disabled = true;
        }
        for(let i = idStartChamp; i < idStartChamp + 10; i++){
            const viewChampion = document.createElement('li'); 
            viewChampion.textContent = json[i]["id"];
            viewChampion.addEventListener('click',getDetailChampion.bind(null, json[i]["id"]));
            listChampions.appendChild(viewChampion);
        }
        });
};

function getPrecChampions(){
    fetch('http://localhost:3000/champions', {
        method : 'GET'
    })
    .then((response) => response.json())
    .then((json) => {
        while (listChampions.firstChild) {
            listChampions.removeChild(listChampions.firstChild);
        }
        buttonVoirSuiv.disabled = false; 
        if (idStartChamp - 10 > 0){
            idStartChamp -= 10;
        }
        else{
            buttonVoirPrec.disabled = true;
        }
        for(let i = idStartChamp; i < idStartChamp +10; i++){
            const viewChampion = document.createElement('li'); 
            viewChampion.textContent = json[i]["id"];
            viewChampion.addEventListener('click',getDetailChampion.bind(null, json[i]["id"]));
            listChampions.appendChild(viewChampion);
        }
        });
};

function getDetailChampion(id){
    fetch('http://localhost:3000/champions/'+id, {
        method : 'GET'
    })
    .then((response) => response.json())
    .then((json) => {
        while (listChampions.firstChild) {
            listChampions.removeChild(listChampions.firstChild);
        }
        for(const [key, value] of Object.entries(json)){
            const viewChampion = document.createElement('p'); 
            viewChampion.textContent = key + " : " + value;
            listChampions.appendChild(viewChampion);
        }
        });
};


get10Champions();
buttonVoirPrec.addEventListener('click', getPrecChampions);
buttonVoirSuiv.addEventListener('click', getNextChampions);

