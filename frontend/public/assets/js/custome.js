
new RollingNum('percent', '1.00');
// new RollingNum('countTest2','12340','slide');


function RollingNum(id, number, type) {
    var $cntBox = document.getElementById(id);
    var $cntNum = number;
    var $cntLen = $cntNum.length;
    var $numArr = $cntNum.split('');
    var delay = 300;
    var speed = 100;


    // 카운트
    for (var i = 0; i < $cntLen; i++) {
        var bckI = ($cntLen - i * 1) - 1;
        var num = document.createElement('span');
        num.classList.add('num', 'idx' + bckI);
        num.setAttribute('data-num', $numArr[i]);

        $cntBox.append(num);
        setNum(num, i);
    }
    //,처리
    if ($cntLen > 3) {
        for (var i = 1; i <= Math.floor($cntLen / 3); i++) {
            var idx3n = $cntBox.querySelector('.idx' + i * 3);
            var pointEl = document.createElement('span');
            pointEl.classList.add('point');
            idx3n.after(pointEl);
        }
        setTimeout(function () {
            var point = $cntBox.querySelectorAll('.point');
            point.forEach(el => {
                el.innerText = ''
            });
        }, (speed * 10) + ($cntLen * delay) + speed);
    };

    function setNum(el, n) {
        if (type == 'slide') {
            setTimeout(function () {
                var no = 0;
                var numHeight = 30;
                // style 추가
                var style = document.createElement('style');
                style.innerHTML =
                    ".num, .point {display: inline-block;vertical-align: middle;}\
					.num {overflow: hidden;}\
					.numList {display: inline-block;margin-top:0;text-align: center;transition: all "+ (speed / 3000) + "s;}"
                document.body.appendChild(style);

                var numbersDiv = document.createElement('span');
                var numbers = '0\n1\n2\n3\n4\n5\n6\n7\n8\n9';
                el.style = 'height:' + numHeight + 'px;line-height:' + numHeight + 'px;';
                numbersDiv.classList.add('numList');
                numbersDiv.innerText = numbers;
                el.append(numbersDiv);

                var intervalNo = setInterval(function () {
                    no++;
                    numbersDiv.style = 'margin-top:' + (no * numHeight * -1) + 'px;';
                    if (no == 10) {
                        clearInterval(intervalNo);
                        numbersDiv.style = 'margin-top:' + (el.getAttribute('data-num') * numHeight * -1) + 'px';
                    }
                }, speed);
            }, delay * i);
        } else {
            setTimeout(function () {
                var no = 0;
                var intervalNo = setInterval(function () {
                    el.innerText = no++;
                    if (no == 10) {
                        clearInterval(intervalNo);
                        el.innerText = el.getAttribute('data-num');
                    }
                }, speed);
            }, delay * i);
        }
    }
}
$(document).ready(function () {

    $('.clear').click(function () {
        $('#enterAmount').val("");
    });

});
