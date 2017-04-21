var score = 0;
var letterContainer = [];
var letters = [];
var active_letters = [];
var word_list = [];
var word_count = [];
var count = 60;

//random letter generator
function randomLetters() {
  var num = Math.floor(Math.random() * 26);
  var letter = String.fromCharCode(num + 65);
  return letter;
}
//displays letters 
function display_letters() {
  $('#letter-container').html(active_letters.join(''));
}
// score updates
function update_score(add_me) {
  var $score = $('#totalScore');
  $score.html(parseInt($score.html()) + add_me);
}
//correct word counter
function update_word_count() {
  var $count = $('#wordCount');
  word_count.push($count);
  $count.html(word_count.length);
}
// Reset Board
//function reset_game() {
//  active_letters.length = 0;
//  display_letters();
//  $('.flex-item.box').removeClass('box-disabled');
//}
$(function () {
  $('.flex-item.box').on('click', function (e) {
    if ($(this).hasClass('box-disabled')) return;
    //If the jquery wrapped object that this element
    active_letters.push(this.innerHTML);
    console.log(active_letters);
    display_letters();
    $(this).addClass('box-disabled');
  }).each(function (i, item) {
    var $this = $(item),
      letter = randomLetters();
    //this function handles the initial setup.
    while (letters.indexOf(letter) != -1) {
      letter = randomLetters();
    }
    letters.push(letter);
    $this.html(letter);
  });
});

for (var i = 0; i < $('.flex-item').length; i++) {
  item = $('.flex-item')[i];
}

//clear and un disable the previously chosen letters
$(function () {
  $('.btn-danger').on('click', function () {
    active_letters.length = 0;
    display_letters();
    console.log(active_letters);
    $('.flex-item.box').removeClass('box-disabled');
  });
});


//the submit button does a whole lot of stuff.
//first it un disables all the disabled letter boxes
$(function () {
  $('.btn-primary').on('click', function (e) {
    var word = active_letters.join('').toLowerCase();
    console.log(word, isBasicWord(word));
    var wordUp = word.toUpperCase();
    var checkDouble = word_list.indexOf(wordUp)
    $('.flex-item.box').removeClass('box-disabled');
    // then it checks if there is a word submitted
    if (word <= 0) {
      active_letters.length = [];
      display_letters();
      //checks to see if the submitted word is listed already and if listed will receive no points
    } else if (checkDouble >= 0) {
      active_letters.length = [];
      display_letters();
      word_list.unshift(wordUp);
      var score = 0;
      var new_items = $('<div class="col-7">' + wordUp + '</div><div class="col-5">' + score + '</div>');
      $('#current-words').prepend(new_items);
      update_score(score);
      // checks if the word is "I" because "I" is in the dictionary provided but not "i"
    } else if (wordUp == "I") {
      active_letters.length = [];
      display_letters();
      word_list.unshift(wordUp);
      var score = 9;
      var new_items = $('<div class="col-7">' + wordUp + '</div><div class="col-5">' + score + '</div>');
      $('#current-words').prepend(new_items);
      update_score(score);
      update_word_count();
      // checks against extremely limited dictionary
    } else if (isBasicWord(word)) {
      active_letters.length = [];
      display_letters();
      word_list.unshift(wordUp);
      var score = 9 * word.length;
      var new_items = $('<div class="col-7">' + wordUp + '</div><div class="col-5">' + score + '</div>');
      $('#current-words').prepend(new_items);
      update_score(score);
      update_word_count();
      // if it doesnt pass anything before this it isnt a word and needs to get out of my face
    } else {
      active_letters.length = [];
      display_letters();
      word_list.unshift(wordUp);
      var score = 0;
      var new_items = $('<div class="col-7">' + wordUp + '</div><div class="col-5">' + score + '</div>');
      $('#current-words').prepend(new_items);
      update_score(score);
    }
  });
});


//update count down display
$("#counter").text(count);


timer = setTimeout(update, 1000);

//timer function to disable  all buttons except the reset game button
function update() {
  if (count > 0) {
    $("#counter").text(--count);
    timer = setTimeout(update, 1000);
  } else {
    alert("Game Over Meow");
    active_letters.length = 0;
    display_letters();
    $('.flex-item.box').addClass('box-disabled');
    $('#Button').prop('disabled', true);
    $('#button').prop('disabled', true);
  }
}

//function to reset game
$('.btn-warning').on('click', function () {
  $('#Button').prop('disabled', false);
  $('#button').prop('disabled', false);
  score = 0;
  letterContainer = [];
  letters = [];
  word_list = [];
  word_count = [];
  count = 60;
  active_letters.length = 0;
  display_letters();
  $('.flex-item.box').removeClass('box-disabled');
});
