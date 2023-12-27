/*
1. 자릿수가 중복되지 않는 랜덤한 숫자 가져오기
2. strike 가 되는지 비교
3. ball 이 되는지 비교
4. 둘 다 아니라면 out
5. 비교 결과 document 에 출력
*/
document.addEventListener("DOMContentLoaded", function(){

    const Baseball = document.querySelector('#baseball');
    const InputNumber = Baseball.querySelector('#inputNumber');
    const FormBaseball = Baseball.querySelector('form');
    const AnswerArea = Baseball.querySelector('.answerArea');
    const BtnReset = Baseball.querySelector('.btnReset');

    let answerNumber;

    makeNumberNotOverLapped();

    InputNumber.addEventListener("input", function(){
        maxLengthCheck(InputNumber);
    });

    FormBaseball.addEventListener("submit", function(e){
        e.preventDefault();
        submitNumber();
    });

    BtnReset.addEventListener("click", function(){
        removeAllChildNodes(AnswerArea);
        makeNumberNotOverLapped();
        InputNumber.value = '';
    })

    function makeNumberNotOverLapped() {

        let Random_1 = Math.random();
        let Random_2 = Math.random();
        let Random_3 = Math.random();
        let Random_4 = Math.random();
        let randomNumber_1 = Math.floor(Random_1 * 10);
        let randomNumber_2 = Math.floor(Random_2 * 10);
        let randomNumber_3 = Math.floor(Random_3 * 10);
        let randomNumber_4 = Math.floor(Random_4 * 10);
        let logicNotOverLapped = randomNumber_1 == randomNumber_2 || randomNumber_2 == randomNumber_3 || randomNumber_3 == randomNumber_4 || randomNumber_4 == randomNumber_1 || randomNumber_1 == randomNumber_3 || randomNumber_2 == randomNumber_4;

        while(logicNotOverLapped) { // 각각 자릿 수 중복 제거

            if(randomNumber_1 == randomNumber_2 || randomNumber_1 == randomNumber_3 || randomNumber_1 == randomNumber_4) {
                Random_1 = Math.random();
                randomNumber_1 = Math.floor(Random_1 * 10);
            }else if(randomNumber_2 == randomNumber_1 || randomNumber_2 == randomNumber_3 || randomNumber_2 == randomNumber_4) {
                Random_2 = Math.random();
                randomNumber_2 = Math.floor(Random_2 * 10);
            }else if(randomNumber_3 == randomNumber_1 || randomNumber_3 == randomNumber_2 || randomNumber_3 == randomNumber_4) {
                Random_3 = Math.random();
                randomNumber_3 = Math.floor(Random_3 * 10);
            }else if(randomNumber_4 == randomNumber_1 || randomNumber_4 == randomNumber_2 || randomNumber_4 == randomNumber_3) {
                Random_4 = Math.random();
                randomNumber_4 = Math.floor(Random_4 * 10);
            }
            
            logicNotOverLapped = randomNumber_1 == randomNumber_2 || randomNumber_2 == randomNumber_3 || randomNumber_3 == randomNumber_4 || randomNumber_4 == randomNumber_1 || randomNumber_1 == randomNumber_3 || randomNumber_2 == randomNumber_4;
    
        }

        answerNumber = `${randomNumber_1}${randomNumber_2}${randomNumber_3}${randomNumber_4}`; // 정답 데이터
        console.log(answerNumber)
    }

    function submitNumber() {
        if(InputNumber.value.length == 4) {
            if(answerNumber == InputNumber.value) { // 정답

                correctAction();

            }else { // 오답

                makeRecord();

            }

            InputNumber.value = '';
        }else {
            let tagP = document.createElement('p');
            tagP.textContent = '4자리 숫자를 입력하세요.';
            let warnMessages = FormBaseball.appendChild(tagP);
            warnMessages.style.cssText = "position: absolute; bottom: -70px; left: 50%; transform: translateX(-50%); width: 100%; text-align: center; color: red;";
            setTimeout(function(){
                FormBaseball.removeChild(tagP);
            },2000)
        }

    }

    function correctAction() {

        let tagP = document.createElement('p');
        tagP.textContent = `${InputNumber.value} : 정답입니다~`;
        AnswerArea.prepend(tagP);

    }

    function makeRecord() {

        let strikeNum = checkStrike();
        let ballNum = checkBall();
        let tagP = document.createElement('p');

        if(strikeNum == 0 && ballNum == 0) {
            
            tagP.textContent = `${InputNumber.value} : Out~`;
            AnswerArea.prepend(tagP);

        }else {

            tagP.textContent = `${InputNumber.value} : ${strikeNum} strike ${ballNum} ball`;
            AnswerArea.prepend(tagP);

        }
        
    }

    function checkStrike() {
        
        let strikeCnt = 0;

        if(answerNumber[0] == InputNumber.value[0]) {
            strikeCnt++;
        }
        if(answerNumber[1] == InputNumber.value[1]) {
            strikeCnt++;
        }
        if(answerNumber[2] == InputNumber.value[2]) {
            strikeCnt++;
        }
        if(answerNumber[3] == InputNumber.value[3]) {
            strikeCnt++;
        }

        return strikeCnt;

    }

    function checkBall() {

        let ballCnt = 0;

        if(answerNumber[0] == InputNumber.value[1]) {
            ballCnt++;
        }else if(answerNumber[0] == InputNumber.value[2]) {
            ballCnt++;
        }else if(answerNumber[0] == InputNumber.value[3]) {
            ballCnt++;
        }

        if(answerNumber[1] == InputNumber.value[0]) {
            ballCnt++;
        }else if(answerNumber[1] == InputNumber.value[2]) {
            ballCnt++;
        }else if(answerNumber[1] == InputNumber.value[3]) {
            ballCnt++;
        }

        if(answerNumber[2] == InputNumber.value[0]) {
            ballCnt++;
        }else if(answerNumber[2] == InputNumber.value[1]) {
            ballCnt++;
        }else if(answerNumber[2] == InputNumber.value[3]) {
            ballCnt++;
        }

        if(answerNumber[3] == InputNumber.value[0]) {
            ballCnt++;
        }else if(answerNumber[3] == InputNumber.value[1]) {
            ballCnt++;
        }else if(answerNumber[3] == InputNumber.value[2]) {
            ballCnt++;
        }

        return ballCnt;

    }

    function maxLengthCheck(obj) {

        if(obj.value.length > obj.maxLength) {
            obj.value = obj.value.slice(0, obj.maxLength);
        }

    }

    function removeAllChildNodes(parent) {

        while(parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }

    }

})