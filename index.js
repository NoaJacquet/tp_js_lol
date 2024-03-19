const listChampions = document.getElementById('liste-champions');

function getChampions(){
    fetch('http://localhost:3000/champions', {
        method : 'GET'
    })
    .then((response) => response.json())
    .then((json) => {
        console.log("hello");
        console.log((json)[0]["id"]);
        for(let champion of json){
            const viewChampion = document.createElement('li'); 
            viewChampion.textContent = champion["id"];
            listChampions.appendChild(viewChampion);
        }
        });
};

getChampions();