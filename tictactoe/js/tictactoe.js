/**
 * 필요한 객체
 * 1. 게임보드
 * 2. 플레이어
 * 3. 게임 흐름 제어
 * 목표1 : 적은 전역 코드 ( 팩토리 이용 -> 게임보드 and 게임 흐름 제어 -> 추가 인스턴스 생성X )
 * 목표2 : 게임이 끝났을 때를 확인하는 로직을 포함하여 3목 승리 및 무승부를 모두 확인해야 함.
 * 방법
 * 1. 콘솔에서 작동하게 만들기 (html,css,DOM 생각 X)
 * 2. 화면 표시, DOM 로직 처리 객체 만들기
 * 3. 게임보드 배열의 내용을 웹페이지에 렌더링 하는 함수 만들기
 * 4. 특정 위치에 마크를 추가하는 함수 만들기
 * 5. 이미 사용한 위치의 재사용불가 로직
 * 6. 플레이어 이름입력, 게임시작, 재시작, 결과 인터페이스
*/

// 팩토리 함수: 게임 보드 생성
function createGameBoard() {
    return {
        board: Array(9).fill(null),
        markCell: function (index, playerMark) {
            if (this.board[index] === null) {
                this.board[index] = playerMark;
                return true; // 성공적으로 마크가 추가됨
            }
            return false; // 이미 사용된 위치
        },
        checkWinner: function () {
            // 3목 승리 룰을 확인하는 로직
            // ... (구현 필요)
        },
        checkDraw: function () {
            // 무승부 확인 로직
            // ... (구현 필요)
        },
        resetBoard: function () {
            this.board = Array(9).fill(null);
        }
    };
}

// 팩토리 함수: 플레이어 생성
function createPlayer(name, mark) {
    return {
        name: name,
        mark: mark
    };
}

// 팩토리 함수: 게임 흐름 제어 생성
function createGameController(player1, player2) {
    const gameBoard = createGameBoard();
    let currentPlayer = player1;

    return {
        switchPlayer: function () {
            currentPlayer = currentPlayer === player1 ? player2 : player1;
        },
        getCurrentPlayer: function () {
            return currentPlayer;
        },
        makeMove: function (index) {
            if (gameBoard.markCell(index, currentPlayer.mark)) {
                // 마크 추가 성공
                if (gameBoard.checkWinner()) {
                    console.log(`${currentPlayer.name} wins!`);
                } else if (gameBoard.checkDraw()) {
                    console.log('It\'s a draw!');
                } else {
                    this.switchPlayer();
                }
                return true;
            } else {
                console.log('Cell already marked. Try again.');
                return false;
            }
        },
        restartGame: function () {
            gameBoard.resetBoard();
            currentPlayer = player1;
        }
    };
}

// 게임 시작
const playerX = createPlayer('Player X', 'X');
const playerO = createPlayer('Player O', 'O');
const gameController = createGameController(playerX, playerO);

// 예시: 플레이어 이름 입력 및 게임 시작
// const playerNameX = prompt('Enter Player X\'s name:');
// const playerNameO = prompt('Enter Player O\'s name:');
// playerX.name = playerNameX || 'Player X';
// playerO.name = playerNameO || 'Player O';

// 게임 보드 렌더링 함수 (콘솔에 출력)
function renderBoard() {
    console.log(gameController.getCurrentPlayer().name + "'s turn");
    for (let i = 0; i < 9; i += 3) {
        console.log(gameController.makeMove(i), gameController.makeMove(i + 1), gameController.makeMove(i + 2));
    }
}

// 테스트: 게임 진행
renderBoard();
gameController.makeMove(0); // 예시로 첫 번째 셀에 마크 추가
renderBoard();
// ... 계속해서 게임을 진행할 수 있습니다.