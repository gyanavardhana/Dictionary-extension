localStorage.setItem("searchedvalues",JSON.stringify([]));
const searchbar = document.getElementById("searchbar");
const searchbutton = document.getElementById("search");
const historybutton = document.getElementById("history");
const clearbutton = document.getElementById("clear");







historybutton.addEventListener("click", () => {
  display();
});



clearbutton.addEventListener("click", () => {
  localStorage.setItem("searchedvalues",JSON.stringify([]));
  const hislist = document.getElementById("historylist");
  hislist.innerHTML = "";
});




searchbutton.addEventListener("click", () => {
  const searchValue = searchbar.value;
  const resultbox = document.getElementById("results");
  resultbox.innerHTML = "";
  displaymeaning(searchValue);
});


function displayloder(){
  const loader = document.getElementById("results");
  loader.innerHTML = `
  <div id="loader" >
        <img style="width: 80%; height:80%" src="load-gif.gif" alt="" />
      </div>
  `;
}
function hideloder(){
  const loader = document.getElementById("results");
  loader.innerHTML = ``;
}

function displaymeaning(searchValue) {
  displayloder();
  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchValue}`)
    .then((response) => response.json())
    .then((data) => {
      hideloder();
      const word = data[0].word;
      const audio = data[0].phonetics[0].audio;
      const resultdiv = document.createElement("div");
      resultdiv.innerHTML = `
        <h2 class="word">${word}</h2>
        `;
      if (audio) {
        resultdiv.innerHTML += `
            <audio controls>
                <source src="${audio}" type="audio/mpeg">
            </audio>
            `;
      } else {
        resultdiv.innerHTML += `
            <p>Audio not available</p>
            `;
      }
      for (let i = 0; i < data[0].meanings.length; i++) {
        const partofspeech = data[0].meanings[i].partOfSpeech;
        const definition = data[0].meanings[i].definitions[0].definition;
        const example = data[0].meanings[i].definitions[0].example;
        resultdiv.innerHTML += `
            <h3 class="partofspeech">${partofspeech}</h3>
            <p class="definition">${definition}</p>
            <p class="example">${example}</p>
            `;
        const resultbox = document.getElementById("results");
        resultbox.appendChild(resultdiv);
      }
      store(searchValue);
    })
    .catch((error) => {
        console.log(error);
        const resultbox = document.getElementById("results");
        resultbox.innerHTML = `
            <h2 class="word">No results found</h2>
        `;
    });
    
}



function store(value){
    ﻿const values = JSON.parse(localStorage.getItem("searchedvalues"));
     values.push(value);
     localStorage.setItem("searchedvalues",JSON.stringify(values));
}



function display(){
    const hislist = document.getElementById("historylist");
    const values = JSON.parse(localStorage.getItem("searchedvalues"));
    for(let i=0;i<values.length;i++){
        hislist.innerHTML += `
        <li>${values[i]}</li>
        `;
    }
}
