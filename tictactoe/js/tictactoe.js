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
const gatePage = document.querySelector(".c-gate");
const startBtns = document.querySelectorAll(".c-gate__btnStart");
const gamePage = document.querySelector(".c-game");
const restartBtn = document.querySelector(".c-game__btnRestart");
const toGateBtn = document.querySelector(".c-game__btnPrev");
const cellArea = document.querySelector(".c-game__areaCells");

let gameController;

init();

startBtns.forEach(btn => {
    btn.addEventListener("click", startBtnsClickHandler);
});

restartBtn.addEventListener("click", restartBtnClickHandler);

toGateBtn.addEventListener("click", toGateBtnClickHandler);

/**
 * 게임 시작 버튼
 */
function startBtnsClickHandler() {
    const cellNum = Number(this.dataset.cell);
    const playerNum = Number(this.dataset.player);
    const playerO = createPlayer('Player O', 'O');
    const playerX = createPlayer('Player X', 'X');
    gameController = createGameController(playerX, playerO, playerNum ,cellNum);

    makeBoard(cellNum,playerNum);
    gatePage.classList.add("c-gate--hide");
    gamePage.classList.remove("c-game--hide");
}
/**
 * 재시작 버튼
 */
function restartBtnClickHandler() {
    gameController.restartGame();
}
/**
 * 게이트로 이동 버튼
 */
function toGateBtnClickHandler() {
    removeBoard();
    gamePage.classList.add("c-game--hide");
    gatePage.classList.remove("c-gate--hide");
}
/**
 * 초기 세팅
 */
function init() {
    gamePage.classList.add("c-game--hide");
}
/**
 * 보드 생성
 */
function makeBoard(cell,players) {
    let cellNum = cell*cell;

    let tagUL = document.createElement("ul");
    tagUL.classList.add("c-game__listWrap");
    cell == 3 ? tagUL.classList.add("c-game__listWrap--cellType1") : tagUL.classList.add("c-game__listWrap--cellType2");

    for(let i = 0; i < cellNum ; i++) {
        let tagLI = document.createElement("li");
        let tagBUTTON = document.createElement("button");
        tagBUTTON.classList.add("c-game__btnCell");
        tagBUTTON.setAttribute("type","button");
        tagBUTTON.textContent = "말판";
        tagLI.insertAdjacentElement("beforeend",tagBUTTON);
        tagLI.classList.add("c-game--list");
        tagUL.insertAdjacentElement("beforeend",tagLI);

        tagBUTTON.addEventListener("click", () => {
            tagBUTTONClickHandler(i);
        });
    }
    cellArea.insertAdjacentElement("beforeend",tagUL);

    function tagBUTTONClickHandler(idx) {
        if(players == 1) {
            gameController.makeMove(idx); // user
            const currentBoard = gameController.getBoard().board;
            const cellBtns = tagUL.querySelectorAll(".c-game__btnCell");
            let computerIdx;
            let isComputerDefensed = false;

            for (let i = 0; i < 3; i++) {
                // 가로 확인
                if (currentBoard[i * 3] === currentBoard[i * 3 + 1] && currentBoard[i * 3 + 1] !== null && currentBoard[i * 3 + 2] === null) {
                    computerIdx = i * 3 + 2;
                    isComputerDefensed = true;
                }
                // 가로 확인
                if (currentBoard[i * 3 + 1] === currentBoard[i * 3 + 2] && currentBoard[i * 3 + 2] !== null && currentBoard[i * 3] === null) {
                    computerIdx = i * 3;
                    isComputerDefensed = true;
                }
                // 가로 확인
                if (currentBoard[i * 3] === currentBoard[i * 3 + 2] && currentBoard[i * 3 + 2] !== null && currentBoard[i * 3 + 1] === null) {
                    computerIdx = i * 3 + 1;
                    isComputerDefensed = true;
                }
                // 세로 확인
                if (currentBoard[i] === currentBoard[i + 3] && currentBoard[i * 3] !== null && currentBoard[i + 6] === null) {
                    computerIdx = i + 6;
                    isComputerDefensed = true;
                }
                // 세로 확인
                if (currentBoard[i] === currentBoard[i + 6] && currentBoard[i * 6] !== null && currentBoard[i + 3] === null) {
                    computerIdx = i + 3;
                    isComputerDefensed = true;
                }
                // 세로 확인
                if (currentBoard[i + 3] === currentBoard[i + 6] && currentBoard[i * 6] !== null && currentBoard[i] === null) {
                    computerIdx = i;
                    isComputerDefensed = true;
                }
            }
            // 대각선 확인
            if (currentBoard[0] === currentBoard[4] && currentBoard[4] !== null && currentBoard[8] !== null) {
                computerIdx = 8;
                isComputerDefensed = true;
            }
            if (currentBoard[0] === currentBoard[8] && currentBoard[8] !== null && currentBoard[4] !== null) {
                computerIdx = 4;
                isComputerDefensed = true;
            }
            if (currentBoard[4] === currentBoard[8] && currentBoard[8] !== null && currentBoard[0] !== null) {
                computerIdx = 0;
                isComputerDefensed = true;
            }

            // 대각선 확인
            if (currentBoard[2] === currentBoard[4] && currentBoard[4] !== null && currentBoard[6] !== null) {
                computerIdx = 6;
                isComputerDefensed = true;
            }
            // 대각선 확인
            if (currentBoard[2] === currentBoard[6] && currentBoard[6] !== null && currentBoard[4] !== null) {
                computerIdx = 4;
                isComputerDefensed = true;
            }
            // 대각선 확인
            if (currentBoard[4] === currentBoard[6] && currentBoard[6] !== null && currentBoard[2] !== null) {
                computerIdx = 2;
                isComputerDefensed = true;
            }
            // computer
            let currentBoardReplaced = currentBoard.map(el => el === null);
            let arr = [];
            currentBoardReplaced.forEach((el,idx) => {
                if(el == true) arr.push(idx);
            });
            arr.sort(() => Math.random() - 0.5);
            console.log(arr) // arr 수정해야함
            if(isComputerDefensed) {
                gameController.makeMove(computerIdx);
            }else {
                gameController.makeMove(arr[0]);
            }

            for(let i = 0; i < currentBoard.length; i++) {
                if(currentBoard[i] == "X") {
                    cellBtns[i].classList.add("c-game__btnCell--mark2");
                }else if(currentBoard[i] == "O") {
                    cellBtns[i].classList.add("c-game__btnCell--mark1");
                }
            }
        }else if(players == 2) {
            gameController.makeMove(idx);
            const currentBoard = gameController.getBoard().board;
            const cellBtns = tagUL.querySelectorAll(".c-game__btnCell");

            for(let i = 0; i < currentBoard.length; i++) {
                if(currentBoard[i] == "X") {
                    cellBtns[i].classList.add("c-game__btnCell--mark2");
                }else if(currentBoard[i] == "O") {
                    cellBtns[i].classList.add("c-game__btnCell--mark1");
                }
            }
        }
    }
}
/**
 * 보드 제거
 */
function removeBoard() {
    while(cellArea.firstChild) {
        cellArea.removeChild(cellArea.firstChild);
    }
}
// 팩토리 함수: 게임 보드 생성
function createGameBoard(cellNum) {
    return {
        board: cellNum == 3 ? Array(9).fill(null) : Array(25).fill(null),
        markCell: function (index, playerMark) {
            if (this.board[index] === null) {
                this.board[index] = playerMark;
                return true; // 성공적으로 마크가 추가됨
            }
            return false; // 이미 사용된 위치
        },
        checkWinner: function () {
            if(cellNum == 3) {
                for (let i = 0; i < 3; i++) {
                    // 가로 확인
                    if (this.board[i * 3] === this.board[i * 3 + 1] && this.board[i * 3 + 1] === this.board[i * 3 + 2] && this.board[i * 3] !== null) {
                      return this.board[i * 3];
                    }
                    // 세로 확인
                    if (this.board[i] === this.board[i + 3] && this.board[i + 3] === this.board[i + 6] && this.board[i] !== null) {
                      return this.board[i];
                    }
                }
                
                // 대각선 확인
                if (this.board[0] === this.board[4] && this.board[4] === this.board[8] && this.board[0] !== null) {
                    return this.board[0];
                }
                if (this.board[2] === this.board[4] && this.board[4] === this.board[6] && this.board[2] !== null) {
                    return this.board[2];
                }
            }else if(cellNum == 5) {
                for (let i = 0; i < 5; i++) {
                    // 가로 확인
                    if (this.board[i * 5] === this.board[i * 5 + 1] && this.board[i * 5 + 1] === this.board[i * 5 + 2] && this.board[i * 5 + 2] === this.board[i * 5 + 3] && this.board[i * 5 + 3] === this.board[i * 5 + 4] && this.board[i * 5] !== null) {
                        return this.board[i * 5];
                    }
                    // 세로 확인
                    if (this.board[i] === this.board[i + 5] && this.board[i + 5] === this.board[i + 10] && this.board[i + 10] === this.board[i + 15] && this.board[i + 15] === this.board[i + 20] && this.board[i] !== null) {
                        return this.board[i];
                    }
                }
            
                // 대각선 확인
                if (this.board[0] === this.board[6] && this.board[6] === this.board[12] && this.board[12] === this.board[18] && this.board[18] === this.board[24] && this.board[0] !== null) {
                    return this.board[0];
                }
                if (this.board[4] === this.board[8] && this.board[8] === this.board[12] && this.board[12] === this.board[16] && this.board[16] === this.board[20] && this.board[4] !== null) {
                    return this.board[4];
                }
            }
            
            return null;  // 아직 승리자가 없음
        },
        checkDraw: function () {
            if(cellNum == 3) {
                // 보드 전체를 확인하여 무승부 여부를 검사합니다.
                for (let cell of this.board) {
                    if (cell === null) {
                        return false;  // 아직 빈 칸이 있음
                    }
                }
            }else if(cellNum == 5) {
                for (let i = 0; i < 5; i++) {
                    for (let j = 0; j < 5; j++) {
                        if (this.board[i * 5 + j] === null) {
                            return false;  // 아직 빈 칸이 있음
                        }
                    }
                }
            }

            return true;  // 더 이상 빈 칸이 없으므로 무승부
        },
        resetBoard: function () {
            this.board = cellNum == 3 ? Array(9).fill(null) : Array(25).fill(null);
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
function createGameController(player1, player2, playerNum, cellNum) {
    const gameBoard = createGameBoard(cellNum);
    let currentPlayer = player1;
    return {
        getBoard: function() {
            return gameBoard;
        },
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
            const cellBtns = cellArea.querySelectorAll(".c-game__btnCell");
            gameBoard.resetBoard();
            currentPlayer = player1;
            
            cellBtns.forEach(btn => {
                btn.classList.remove("c-game__btnCell--mark1");
                btn.classList.remove("c-game__btnCell--mark2");
            });
        }
    };
}