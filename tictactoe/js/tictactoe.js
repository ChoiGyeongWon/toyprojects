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