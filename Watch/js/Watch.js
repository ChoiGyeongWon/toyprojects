document.addEventListener("DOMContentLoaded", function(){

    const Watch = document.querySelector('#Watch');
    const Time = Watch.querySelector('.time');
    const Day = Watch.querySelector('.date');

    function runningWatch() {

        let date = new Date();
        
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        let years = date.getFullYear();
        let months = date.getMonth() + 1;
        let days = date.getDate();

        let AMorPM = '';

        if(hours < 12) {
            AMorPM = 'AM';
        }else if(hours == 12){
            AMorPM = 'PM';
        }else {
            AMorPM = 'PM';
            hours = '0' + (hours - 12);
        }

        if(seconds < 10) {
            seconds = `0${seconds}`;
        }

        if(minutes < 10) {
            minutes = `0${minutes}`;
        }

        if(months < 10) {
            months = `0${months}`;
        }

        if(days < 10) {
            days = `0${days}`;
        }

        Time.textContent = `${hours} : ${minutes} : ${seconds} ${AMorPM}`;
        Day.textContent = `${years}년 ${months}월 ${days}일`;

    }

    setInterval(runningWatch);

})