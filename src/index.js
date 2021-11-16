import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import $ from 'jquery';
import DinoGenerator from './dino.js';

function checkLoss(wrongLetter) {
  if (wrongLetter === 10) {
    return true;
  } else {
    return false;
  }
}


$(document).ready(function(){
  let promise = DinoGenerator.getDino();
  promise.then(function(response) {
    const body = JSON.parse(response);
    const dinoWord = body[0][0].toLowerCase();
    console.log(dinoWord);
    const dinoWordArray = dinoWord.split('');
    const currentWordArray = [];
    let wrongLetter = 0;
    dinoWordArray.forEach(function(){
    currentWordArray.push("_ ");
    });
    $('#hangmanWord').text(currentWordArray.join(''));
    $('#formOne').submit(function(event) {
      event.preventDefault();
      const input = $("#letter").val(); 
      if (dinoWordArray.includes(input)) {
        dinoWordArray.forEach(function(letter, index){
          if (input === letter) {
            currentWordArray[index] = letter;
          } 
        });
      } else {
        $('#guessedLetters').append(input);
        wrongLetter ++;
        if (checkLoss(wrongLetter)){
          $('#game').hide();
          $('#loss').show();

        }
      }
      $('#hangmanWord').text(currentWordArray.join(''));
      $('#letter').val("");
    });
  },
  function(error) {
  $('.showErrors').text(`There was an error processing your request: ${error}`);
  });
});