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
            const detail = document.createElement('p'); 
            detail.textContent = key + " : " + value;
            listChampions.appendChild(detail);
        }
        const detail = document.createElement('p'); 
        console.log(getMoyenneNoteByChampion(id));
        detail.textContent = "note : " +  getMoyenneNoteByChampion(id);
        listChampions.appendChild(detail);
        });
};

function getMoyenneNoteByChampion(idC){
    fetch('http://localhost:3000/notes/', {
        method : 'GET'
    })
    .then((response) => response.json())
    .then((json) => {
        let somme = 0;
        let cpt = 0;
        for (let note of json){
            if (note['idChampion'] === idC) {
                somme += note['notation'];
                cpt += 1;
            }
        }
        console.log(somme /cpt);
        return somme / cpt;
    });
}

get10Champions();
buttonVoirPrec.addEventListener('click', getPrecChampions);
buttonVoirSuiv.addEventListener('click', getNextChampions);

