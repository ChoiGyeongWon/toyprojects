document.addEventListener('DOMContentLoaded', function(){

    let Rock = document.querySelector('.rock');
    let Scissors = document.querySelector('.scissors');
    let Paper = document.querySelector('.paper');
    let Iteration1 = document.querySelector('.iteration_1');
    let Iteration2 = document.querySelector('.iteration_2');
    let ComScore = document.querySelector('#comScore');
    let HumanScore = document.querySelector('#humanScore');
    let Button = document.querySelectorAll('.type_2');
    let ResetButton = document.querySelector('.reset_button');
    let scoreSave = document.querySelector('.score_save');
    let scoreSearch = document.querySelector('.score_search');
    let Modal = document.querySelector('.modal');
    let modalClose = document.querySelector('.modal_close');
    let modalBg = document.querySelector('.modal_bg');
    let modalBody = document.querySelector('.modal_body');
    let randNum = '';
    let humanNum = '';
    let computerNum = '';
    let comScore = 0;
    let humScore = 0;
    let tBody = document.querySelector('tbody');
    let trContainer = [];
    let makeTr = '';
    let deleteBtn = document.querySelector('.delete_btn');
    
    readScore();
    let checkBox = document.querySelectorAll('input[type="checkbox"]');
    deleteBtn.addEventListener('click', function(){
        for(let i = 0; i < checkBox.length ; i++){
            if(checkBox[i].checked){
                localStorage.removeItem(localStorage.key(i));
            }
        }
    })
    
    function readScore() {
        for(let i = 0 ; i < localStorage.length ; i++){
            trContainer[i] = `<tr><td>${JSON.parse(localStorage.getItem(localStorage.key(i))).id}</td><td>${JSON.parse(localStorage.getItem(localStorage.key(i))).com}</td><td>${JSON.parse(localStorage.getItem(localStorage.key(i))).human}</td><td><input class="checkbox${i}" type="checkbox"></td></tr>`;
            tBody.innerHTML += trContainer[i];
        }
    }

    scoreSave.addEventListener ( "click", function() {

        let id = prompt('ID를 입력하세요.','Unknown');

        if(id !== null){
            let list = {'id':id,'com':comScore,'human':humScore};
        
            localStorage.setItem(id,JSON.stringify(list));

        }
    });

    ResetButton.addEventListener ( "click", function () {
        comScore = 0;
        humScore = 0;

        ComScore.innerText = comScore;
        HumanScore.innerText = humScore;
    });

    Rock.addEventListener ( "click", function () {
        
        humanNum = 1;
        
        playGames();

        Iteration2.classList.add('stop');
        Iteration2.classList.add('rock');
        Iteration1.classList.add('stop');

        for(let i = 0; i < Button.length ; i++){
            Button[i].classList.add('untouch');
        }

        setTimeout(removeUnTouch,2000);

        setTimeout(removeRock,2000);

        if(computerNum == 1) {
            Iteration1.classList.add('rock');
            setTimeout(removeStopRock,2000);
        }else if(computerNum == 2) {
            Iteration1.classList.add('scissors');
            setTimeout(removeStopScissors,2000);

            humScore += 1;
            HumanScore.innerText = humScore;
        }else {
            Iteration1.classList.add('paper');
            setTimeout(removeStopPaper,2000);

            comScore += 1;
            ComScore.innerText = comScore;
        }
    });

    Scissors.addEventListener ( "click", function () {
        
        humanNum = 2;
        
        playGames();

        Iteration2.classList.add('stop');
        Iteration2.classList.add('scissors');
        Iteration1.classList.add('stop');

        for(let i = 0; i < Button.length ; i++){
            Button[i].classList.add('untouch');
        }

        setTimeout(removeUnTouch,2000);

        setTimeout(removeScissors,2000);

        if(computerNum == 1) {
            Iteration1.classList.add('rock');
            setTimeout(removeStopRock,2000);

            comScore += 1;
            ComScore.innerText = comScore;
        }else if(computerNum == 2) {
            Iteration1.classList.add('scissors');
            setTimeout(removeStopScissors,2000);
        }else {
            Iteration1.classList.add('paper');
            setTimeout(removeStopPaper,2000);

            humScore += 1;
            HumanScore.innerText = humScore;
        }
    });

    Paper.addEventListener ( "click", function () {
        
        humanNum = 1;
        
        playGames();

        Iteration2.classList.add('stop');
        Iteration2.classList.add('paper');
        Iteration1.classList.add('stop');

        for(let i = 0; i < Button.length ; i++){
            Button[i].classList.add('untouch');
        }

        setTimeout(removeUnTouch,2000);

        setTimeout(removePaper,2000);

        if(computerNum == 1) {
            Iteration1.classList.add('rock');
            setTimeout(removeStopRock,2000);

            humScore += 1;
            HumanScore.innerText = humScore;
        }else if(computerNum == 2) {
            Iteration1.classList.add('scissors');
            setTimeout(removeStopScissors,2000);

            comScore += 1;
            ComScore.innerText = comScore;
        }else {
            Iteration1.classList.add('paper');
            setTimeout(removeStopPaper,2000);
        }
    });

    function removeUnTouch () {
        for(let i = 0; i < Button.length ; i++){
            Button[i].classList.remove('untouch');
        }
    }

    function removeStopRock () {
        Iteration1.classList.remove('stop');
        Iteration1.classList.remove('rock');
    }
    function removeStopScissors () {
        Iteration1.classList.remove('stop');
        Iteration1.classList.remove('scissors');
    }
    function removeStopPaper () {
        Iteration1.classList.remove('stop');
        Iteration1.classList.remove('paper');
    }
    function removeRock () {
        Iteration2.classList.remove('stop');
        Iteration2.classList.remove('rock');
    }
    function removeScissors () {
        Iteration2.classList.remove('stop');
        Iteration2.classList.remove('scissors');
    }
    function removePaper () {
        Iteration2.classList.remove('stop');
        Iteration2.classList.remove('paper');
    }

    function randomNum (min, max) {
        randNum = Math.floor ( Math.random() * (max - min + 1)) + min;
        return randNum;
    }

    function playGames () {
        computerNum = randomNum(1,3);
        return computerNum;
    }

    scoreSearch.addEventListener("click", function(){
        Modal.classList.remove('hide');
    });
    modalBg.addEventListener("click", function(){
        Modal.classList.add('hide');
    });
    modalClose.addEventListener("click", function(){
        Modal.classList.add('hide');
    });
});