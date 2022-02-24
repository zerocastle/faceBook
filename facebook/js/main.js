window.addEventListener('DOMContentLoaded', function () {

    const bell = document.querySelector('.bell');
    const leftBox = document.querySelector('.left_box');
    const rightBox = document.querySelector('.right_box');
    const feed = document.querySelector('#contents_container');

    console.log(bell);

    function notification() {

        console.log('bell 클릭');
        this.classList.toggle('on');
    }

    function callMoreAjax(paperValue){

        $.ajax({
                type: 'GET',
                data: paperValue,
                url: 'data/post.html',
                dataType: 'html',
                success: (response) => {
                    feed.insertAdjacentHTML('beforeend', response);
                }
            })

    }

    function scrollFunc() {

        // 문서에 높이 값을 가지고옴
        let documentHeight = document.body.scrollHeight;
        // 내가 보여진 기준점이 0 이여서 그부분을 뺀다  + 내가 보여지는 화면 크기를 더한다.
        let scrollHeight = window.pageYOffset + window.innerHeight;

        if (scrollHeight >= documentHeight) {

            let paper = document.querySelector('#page');
            let paperValue = document.querySelector('#page').value;
            
            paper.value = parseInt(paperValue) + 1;

            console.log('end');
            

            callMoreAjax(paperValue);

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

    function delegation(e) {
        let elem = e.target;
        console.log(elem);
        let elemName = elem.getAttribute('data-name');
        console.log(elemName);

        while (!elem.getAttribute('data-name')) {
            elem = elem.parentNode;
            if (elem.nodeName == 'BODY') {
                elem = null;
                return;
            }
        }

        if (elem.matches('[data-name="like"]')) {
            console.log('좋아요 !');
            elem.classList.toggle('active');
            let pk = elem.getAttribute('data-name');

            $.ajax({
                type: 'GET',
                url: 'data/like.json',
                data: { pk },
                dataType: 'json',
                success: (response) => {
                    let counter = document.querySelector('#like-count-37');
                    counter.innerHTML = response.like_count;
                }
            })

        } else if (elem.matches('[data-name="more"]')) {
            console.log('모어어');
            elem.classList.toggle('active');
        } else if (elem.matches('[data-name="send"]')) {
            console.log('send');
            let pk = elem.getAttribute('data-name');

            /*
                
                insertAdjacentElement => insertAdjacentHTML
            */
            $.ajax({
                type: 'GET',
                url: 'data/comment.html',
                data: { pk },
                dataType: 'html',

                success: (response) => {
                    document.querySelector('#comment_container').insertAdjacentHTML('beforeend', response);
                },
                error: (error) => {
                    console.log(error);
                }
            });

        } else if (elem.matches('[data-name="delete"]')) {
            let pk = elem.getAttribute('data-name');

            if (confirm('정말 삭제 하시겠습니까?') === true) {
                $.ajax({
                    type: 'GET',
                    url: 'data/delete.json',
                    data: { pk },
                    dataType: 'json',
                    success: (response) => {
                        if (response.status == "success") {
                            let deleteDom = document.querySelector('.comment-57');
                            deleteDom.remove();
                            alert(response.message);
                        }
                    }
                })
            }

        }

    }

    bell.addEventListener('click', notification);
    feed.addEventListener('click', delegation);

    window.addEventListener('scroll', scrollFunc);
    window.addEventListener('resize', resizeFunc);

});