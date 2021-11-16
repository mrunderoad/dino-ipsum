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

function checkWin(currentWordArray) {
  if (currentWordArray.includes("_ ")){
  return false;
  } else {
    return true;
  }
}


$(document).ready(function () {
  let promise = DinoGenerator.getDino();
  promise.then(function (response) {
    const body = JSON.parse(response);
    const dinoWord = body[0][0].toLowerCase();
    console.log(dinoWord);
    const dinoWordArray = dinoWord.split('');
    const currentWordArray = [];
    let wrongLetter = 0;
    dinoWordArray.forEach(function () {
      currentWordArray.push("_ ");
    });
    $('#hangmanWord').text(currentWordArray.join(''));
    $('#formOne').submit(function (event) {
      event.preventDefault();
      const input = $("#letter").val();
      if (dinoWordArray.includes(input)) {
        dinoWordArray.forEach(function (letter, index) {
          if (input === letter) {
            currentWordArray[index] = letter;
          }
        });
        if (checkWin(currentWordArray)) {
        $('#game').hide();
        $('#win').show();
        }
      } else {
        $('#guessedLetters').append(input);
        wrongLetter++;
        if (checkLoss(wrongLetter)) {
          $('#game').hide();
          $('#loss').show();
        }
        $('.hangman').hide();
        switch(wrongLetter) {
          case (1):
            $('.1st').show();
            break;
          case (2):
            $('.2nd').show();
            break;
          case (3):
            $('.3rd').show();
            break;
          case (4):
            $('.4th').show();
            break;
          case (5):
            $('.5th').show();
            break;
          case (6):
            $('.6th').show();
            break;
          case (7):
            $('.7th').show();
            break;
          case (8):
            $('.8th').show();
            break;
          case (9):
            $('.9th').show();
            break;
        }
      }
      $('#hangmanWord').text(currentWordArray.join(''));
      $('#letter').val("");
    });
  },
    function (error) {
      $('.showErrors').text(`There was an error processing your request: ${error}`);
    });
});