window.addEventListener('DOMContentLoaded', function () {

    const bell = document.querySelector('.bell');
    const leftBox = document.querySelector('.left_box');
    const rightBox = document.querySelector('.right_box');
    const feed = document.querySelector('#content_container');

    console.log(bell);

    function notification() {

        console.log('bell 클릭');
        this.classList.toggle('on');
    }

    function scrollFunc() {

        // 문서에 높이 값을 가지고옴
        let documentHeight = document.body.scrollHeight;
        // 내가 보여진 기준점이 0 이여서 그부분을 뺀다  + 내가 보여지는 화면 크기를 더한다.
        let scrollHeight = window.pageYOffset + window.innerHeight;

        if (scrollHeight >= documentHeight) {
            console.log('end');
        }

        console.log(window.pageYOffset);

    }

    // 로드 될 때 셋팅 되어 있는 위치
    leftBox.style.right = `${innerWidth * 0.5 + 430}px`;
    rightBox.style.left = `${innerWidth * 0.5 + 90}px`;

    function resizeFunc() {

        console.log(innerHeight);
        console.log(innerWidth);

        leftBox.style.right = `${innerWidth * 0.5 + 430}px`;
        rightBox.style.left = `${innerWidth * 0.5 + 90}px`;

        console.log('resize');
    }

    function delegation(e){
        let elem = e.target;

        console.log(elem);

        // if(elem)

    }

    bell.addEventListener('click', notification);
    feed.addEventListener('click' , delegation)

    window.addEventListener('scroll', scrollFunc);
    window.addEventListener('resize', resizeFunc);

});