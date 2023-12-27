// 규칙
// - , + 를 제외하곤 먼저 눌려선 안됨. ( 0 이 default 라면 괜찮을 듯 )
// 연산이 연속으로 나오면 안됨. ( 안나오게 하던가 안된다고 알리던가 )
// 한 수에서 point가 여러 개 나오면 안됨.
// 정수의 첫 수로 0 출력 X, 소수의 첫 수로 0 출력 하나만 O
// c -> clear ( default 를 0 으로 출력 )
// = -> 결과
// 수 입력하고 출력해 줄 때 , 나타내기
// 식 출력, 결과 출력, 식과 결과 localStorage 에 저장하여 출력, localStorage 지우는 버튼 추가

document.addEventListener("DOMContentLoaded", function(){

    const calculator = document.querySelector('.calculator');
    const operators = calculator.querySelectorAll('.items[data-name="operator"]');
    const inputArea = document.querySelector('.inputArea');
    let display = '';
    let operator = '';
   
    calculator.addEventListener("click", function(e){

        const operatorsActive = calculator.querySelectorAll('.items.active[data-name="operator"]');
       
        if(e.target.classList.contains('items') && (e.target.dataset.name == 'number')) { // 숫자 클릭할 때

            display += e.target.textContent.trim();
            inputArea.textContent = display;

            operators.forEach(key =>{
                key.classList.remove('active');
            });

        }else if( (e.target.classList.contains('items')) && (e.target.dataset.name == 'operator') && (operatorsActive.length > 0) ) { // 연산 버튼 중복해서 누를 때

            operators.forEach(key =>{
                key.classList.remove('active');
            });

            e.target.classList.add('active');

            operator = e.target.textContent.trim();
            display = display.slice(0,-1);
            display += operator;
            inputArea.textContent = display;


        }else if( (e.target.classList.contains('items')) && (e.target.dataset.name == 'operator') ) { // 연산 버튼 처음 누를 때

            e.target.classList.add('active');
            operator = e.target.textContent.trim();
            display += operator;
            inputArea.textContent = display;

        }else if( (e.target.classList.contains('items')) && (e.target.dataset.name == 'equal') ) { // 등호 누늘 때

            display = display.replaceAll('%','/');
            display = display.replaceAll('+','+');
            display = display.replaceAll('-','-');
            display = display.replaceAll('×','*');

            console.log(display);
        }
    });
    
    let str = '5-9*4/2'; // -13
    calc_result(str);

    function calc_result(el) {
        
    }

    function calc_sum (a,b) {
        return a + b;
    }
    function calc_minus (a,b) {
        return a - b;
    }
    function calc_multiply (a,b) {
        return a * b;
    }
    function calc_divide (a,b) {
        return a / b;
    }

})