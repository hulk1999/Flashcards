$(document).ready(function() {

    $('#button-learned').html(`Learned (${learned.length})`);
    $('#button-learning').html(`Learning (${learning.length})`);
    $('#button-all').html(`All (${chars.length})`);
    $('#button-learned').click(function() { generateCards($(this).attr('id')); });
    $('#button-learning').click(function() { generateCards($(this).attr('id')); });
    $('#button-all').click(function() { generateCards($(this).attr('id')); });

    generateCards('button-learning');
});


let progressBar = $('#progress-bar');

function generateCards(buttonId){

    let inputChars = '';
    if (buttonId == 'button-learned') inputChars = learned;
    else if (buttonId == 'button-learning') inputChars = learning;

    let container = $('#cards-container');
    container.html('');
    shuffle(chars);
    let count = 0, finishedCount = 0;
    for (let i = 0; i < chars.length; i++){
        let charInfo = chars[i].split('@');
        if (inputChars.length == 0 || inputChars.includes(charInfo[0])){
            container.append(`
                <div class="card">
                    <div class="char">${charInfo[0]}</div>
                    <div class="card-back" style="background-image: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('./assets/${Math.floor(Math.random()*8)+1}.jpg'); background-position-y: ${Math.floor(Math.random()*101)}%;">
                      <p>
                        <span class="original-char"><b>${charInfo[0]}</b> </span>
                        <span class="spelling">${charInfo[1]}</span><br>
                        <span class="meaning">${charInfo[2]}</span>
                      </p>
                    </div>
                </div>
            `);
            count++;
        }
    }

    $('.card').click(function() {
        if ($(this).find('.char').length){
            navigator.clipboard.writeText($(this).find('.char').html());
            $(this).css('transform', 'rotateY(180deg)');
            $(this).find('.char').remove();
            $(this).find('.card-back').css('display', 'flex');
        } else{
            let lastCard = $('.card').last();
            if ($(this).is(lastCard)) $(this).remove();
            else $(this).replaceWith(lastCard);
            finishedCount++;
            progressBar.html(`${finishedCount} / ${count} - ${Math.floor(finishedCount/count*100)}%`);
        }
    });

    progressBar.html(`0 / ${count} - 0%`);
}


function shuffle(array) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
}