import Note from './note.js';

const listChampions = document.getElementById('liste-champions');
const buttonVoirPrec = document.getElementById('voir-prec');
const buttonVoirSuiv = document.getElementById('voir-suiv');
let idStartChamp = 0;


buttonVoirPrec.disabled = true; 

function get10Champions(indice){
    fetch('http://localhost:3000/champions', {
        method : 'GET'
    })
    .then((response) => response.json())
    .then((json) => {
        while (listChampions.firstChild) {
            listChampions.removeChild(listChampions.firstChild);
        }
        for(let i = indice; i < indice + 10; i++){
            
            const viewChampion = document.createElement('li'); 
            viewChampion.addEventListener('click',getDetailChampion.bind(null, json[i]["id"]));

            const divImgChampion = document.createElement('div');
            divImgChampion.id = 'divImgChamp';
            const imgChampion = document.createElement('img');
            imgChampion.id = 'imgChamp';
            imgChampion.src = json[i]["icon"];
            imgChampion.alt = json[i]["id"];

            divImgChampion.appendChild(imgChampion);

            const nomChampion = document.createElement('p');
            nomChampion.textContent = json[i]["id"];
            
            viewChampion.appendChild(divImgChampion); 
            viewChampion.appendChild(nomChampion); 

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
        get10Champions(idStartChamp);
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
        if (idStartChamp - 10 >= 0){
            idStartChamp -= 10;
            if(idStartChamp == 0){
                buttonVoirPrec.disabled = true;
            }
        }

        
        get10Champions(idStartChamp);
        
        });
};
async function getDetailChampion(id){
    fetch('http://localhost:3000/champions/'+id, {
        method : 'GET'
    })
    .then((response) => response.json())
    .then(async (json) => {
        while (listChampions.firstChild) {
            listChampions.removeChild(listChampions.firstChild);
        }
        for(const [key, value] of Object.entries(json)){
            const detail = document.createElement('p'); 
            detail.textContent = key + " : " + value;
            listChampions.appendChild(detail);
        }
        const selectNote = document.createElement('select');
        for (let i = 1; i <= 5; i++) {
            const optionElement = document.createElement('option');
            optionElement.value = i;
            optionElement.textContent = i;
            selectNote.appendChild(optionElement);
        }
        selectNote.id = "select-note";
        listChampions.appendChild(selectNote);
        const valid = document.createElement('button'); 
        valid.textContent = "Ajoutez votre note";
        valid.id = "valider-note";
        valid.addEventListener('click', ajouterNote.bind(null, id));
        listChampions.appendChild(valid);
        const detail = document.createElement('p'); 
        getNote(id).then(note => {
            detail.textContent = "Note du champion : " + note;
        });
        listChampions.appendChild(detail);
    });
};


function ajouterNote(idC){
    const note = new Note(document.getElementById("select-note").value, idC);
    fetch('http://localhost:3000/notes/', {
        method : "POST",
        body: JSON.stringify(note),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then((response) => response.json())
    .then((json) => {
        getDetailChampion(idC);
    })
    .catch((error) => {
    });
}


async function getNote(idC){
    const response = await fetch('http://localhost:3000/notes/', {
        method : "GET"
    });
    const json = await response.json();
    for(let note of json){
        if (note["idChampion"] === idC){
            return note['notation'];
        }
    }
    return 0; // Retourner une valeur par défaut si aucune note n'est trouvée
}


get10Champions(0);
buttonVoirPrec.addEventListener('click', getPrecChampions);
buttonVoirSuiv.addEventListener('click', getNextChampions);