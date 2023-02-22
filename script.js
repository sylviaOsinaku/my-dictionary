'use strict';

const searchBtn = document.querySelector('.search-button');
const container = document.querySelector('.container');
const inputText = document.querySelector('.input--text');

const displayDictionary = function (defWord = 'Word') {
  container.innerHTML = '';
  const html = `<div class="text-container">
      <div>
        <h1 class="word">${defWord.word}</h1>
        <span class="phonetics_text">${defWord.phonetic || ''}</span>
      </div>
      <div><i class="fa fa-play-circle"></i></div>

    </div>


    <section class="first-part-of-speech-container">
      <div class="speech-container">
        <i class="first-part-of-speech">${defWord.meanings[0].partOfSpeech}</i>
        <hr class="line-1">
      </div>


      <div class="first-meaning-container">
        <h2 class="meaning">Meaning</h2>
        <ul class="list-container">

        ${defWord.meanings[0].definitions.map(def => {
          return `<li class="meaning-1 list">${def.definition}</li>`;
        })}
          

        </ul>
      </div>
    </section>
    <div class="synonym-container">
      <p class="synonym">Synonym</p> <span class="synonym-word">${
        defWord?.meanings[1]?.synonyms[0] || 'Synonym not available'
      }</span>
    </div>


    <section class="second-part-of-speech-container">
      <div class="speech-container">
        <i class="verb">${defWord?.meanings[1]?.partOfSpeech || ''}</i>
        <hr class="line-1">
        </hr>
      </div>

      <div>
        <h2 class="meaning">Meaning</h2>
        <ul class="list-container">
          ${defWord?.meanings[1]?.definitions
            ?.map(def => {
              `<li class="meaning-1 list">${def.definition}</li>`;
            })
            .join('')}
          
        </ul>
      </div>
    </section>
    <a class="source" href="${defWord.sourceUrls}">${defWord.sourceUrls}</a>`;
  container.classList.add('animate__animated', 'animate__zoomIn');
  container.insertAdjacentHTML('beforeend', html);
};

const dictionary = function (word) {
  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then(response => {
      console.log(response);
      if (!response.ok)
        throw new Error(`Unable to fetch word ${response.status}`);
      return response.json();
    })
    .then(data => {
      const [defWord] = data;
      return displayDictionary(defWord);
    })
    .catch(err => console.log(err));
};

searchBtn.addEventListener('click', function () {
  dictionary(inputText.value);
  inputText.value = '';
});

container.addEventListener('click', function (e) {
  const clicked = e.target.classList.contains('fa-play-circle');
  if (clicked) {
    const text = document.querySelector('.word').textContent;
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  }
});

document.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    dictionary(inputText.value);
    inputText.value = '';
  }
});

function getSelectedValue() {
  const selectValue = document.getElementById('fonts').value;
  const bodyDoc = document.querySelector('body');

  if (selectValue === 'Montserrat') bodyDoc.style.fontFamily = 'Montserrat';
  else if (selectValue === 'Poppins') bodyDoc.style.fontFamily = 'Poppins';
  else if (selectValue === 'cursive') bodyDoc.style.fontFamily = 'cursive';
  else if (selectValue === 'serif') bodyDoc.style.fontFamily = 'serif';
  else bodyDoc.style.fontFamily = 'sans-serif';
}

document.getElementById('fonts').addEventListener('change', function () {
  getSelectedValue();
});

const toggleBtn = document.querySelector('.toggle-button');
toggleBtn.addEventListener('click', function () {
  document.querySelector('body').classList.toggle('dark-background');
  inputText.classList.toggle('dark-color');
  document.getElementById('fonts').classList.toggle('dark-background');
  document.querySelector('.mood').classList.toggle('fa-moon-o');
});
