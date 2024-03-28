export default class Accueil{

    get10Champions(indice){
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

    async render(){
        return `
        <li>
            <div id="divImgChamp">
                <img src="${json[i]["icon"]}" alt="${json[i]["id"]}">
            </div>
            <p>${json[i]["id"]}</p>
        </li>
        `;
    }

}