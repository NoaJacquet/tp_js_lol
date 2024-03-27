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
            if (i>=json.length){
                return
            }
            
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
        buttonVoirPrec.style.display = 'inline-block';
        if (idStartChamp + 10 < json.length){
            idStartChamp += 10;
            if(idStartChamp+10 > json.length){
                buttonVoirSuiv.disabled = true;
                buttonVoirSuiv.style.display = 'none';
            }
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
        buttonVoirSuiv.style.display = 'inline-block';
        if (idStartChamp - 10 >= 0){
            idStartChamp -= 10;
            if(idStartChamp == 0){
                buttonVoirPrec.disabled = true;
                buttonVoirPrec.style.display = 'none';
            }
        }

        
        get10Champions(idStartChamp);
        
        });
};

function getType(){
    fetch('http://localhost:3000/champions', {
        method : 'GET'
    })
    .then((response) => response.json())
    .then((json) => {
        const typeList = document.getElementById('type'); // Sélection de la liste ul avec l'ID "type"
        typeList.innerHTML = ''; // Effacer le contenu précédent de la liste
        
        const listeType = [];
        
        // Ajout du type "Tout"
        const allListItem = document.createElement('li'); // Créer un nouvel élément li
        allListItem.textContent = "Tout"; // Définir le texte de l'élément li comme "Tout"
        typeList.appendChild(allListItem); // Ajouter l'élément li à la liste ul

        // Parcours des types de champions
        for(let i = 0; i < json.length ; i++){
            for(let type of json[i]['tags']){
                if(!listeType.includes(type)){
                    listeType.push(type);
                    const listItem = document.createElement('li'); // Créer un nouvel élément li
                    listItem.textContent = type; // Définir le texte de l'élément li comme le type
                    typeList.appendChild(listItem); // Ajouter l'élément li à la liste ul
                }
            }
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

get10Champions(0);
getType();
buttonVoirPrec.addEventListener('click', getPrecChampions);
buttonVoirSuiv.addEventListener('click', getNextChampions);

