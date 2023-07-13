// 当页面全部加载完毕才执行
window.addEventListener("load", function () {
    // 1.获取元素
    var lef = document.querySelector(".lef");
    var rig = document.querySelector(".rig");
    var focus = document.querySelector(".focus");
    focus.addEventListener("mouseenter", function () {
        lef.style.display = "block";
        rig.style.display = "block";
        // 鼠标经过停止定时器
        clearInterval(timer);
        timer = null;
    })
    focus.addEventListener("mouseleave", function () {
        lef.style.display = "none";
        rig.style.display = "none";
        // 开启定时器
        timer = setInterval(function () {
            // 手动调用点击事件
            rig.click();
        }, 5000)
    })
    var lk = document.querySelector(".focus").querySelector(".ik");
    var ul = focus.querySelector("ul");
    var focusWidth = focus.offsetWidth;
    var num = 0;
    // circle控制小圆圈的播放
    var circle = 0;
    // flag节流阀
    var flag = true;
    for (var i = 0; i < ul.children.length; i++) {
        //创建一个小li
        var li = document.createElement("li");
        // 记录当前小圆圈的索引号 通过自定义属性来做
        li.setAttribute("index", i);
        // 把小li插入到ul里面
        lk.appendChild(li);
        // 4.小圆圈的排他思想，我们可以直接在生成小圆圈的同时直接绑定点击事件
        li.addEventListener("click", function () {
            // 干掉所有人 留下我自己
            for (var i = 0; i < lk.children.length; i++) {
                lk.children[i].className = "";
            }
            this.className = "current";
            // 5.点击小圆圈，移动图片 当然移动的ul
            // ul的移动距离 小圆圈的索引号乘以图片的宽度，注意是负值
            // 获取图片的宽度
            // 当我们点击了某个小li 就拿到当前的小li的索引号
            var index = this.getAttribute("index");
            // 当我们点击了某个小li 就要把这个li的索引号给num
            num = index;
            circle = index;
            console.log(focusWidth);
            console.log(index);
            animate(ul, -(index * focusWidth));
        })
        // 6.点击右侧按钮 图片滚动一张


    }
    lk.children[0].className = "current";
    // 克隆第一张图片放到ul最后面
    // 深克隆
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);

    // circle控制小圆圈的播放


    // 6.点击右侧按钮 图片滚动一张
    rig.addEventListener("click", function () {
        // 如果走到最后复制的一张图片，此时 我们的ul要快速复原left 改为0
        if (flag) {
            flag = false; //关闭节流阀
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul, -(num * focusWidth), function () {
                flag = true; //打开节流阀
            });
            // 点击右侧按钮，小圆圈跟着一起变化，可以在声明一个变量来控制小圆圈的播放
            circle++;
            if (circle == lk.children.length) {
                circle = 0;
            }
            // 先清楚其余小圆圈的current类名
            for (var i = 0; i < lk.children.length; i++) {
                lk.children[i].className = "";
            }
            lk.children[circle].className = "current";
        }

    });
    // 左侧按钮

    lef.addEventListener("click", function () {
        if (flag) {
            flag = false;
            // 如果走到最后复制的一张图片，此时 我们的ul要快速复原left 改为0
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * focusWidth + "px";
            }
            num--;
            animate(ul, -num * focusWidth, function () {
                flag = true;
            });
            // 点击右侧按钮，小圆圈跟着一起变化，可以在声明一个变量来控制小圆圈的播放
            circle--;
            if (circle < 0) {
                circle = lk.children.length - 1;
            }
            // 先清楚其余小圆圈的current类名
            for (var i = 0; i < lk.children.length; i++) {
                lk.children[i].className = "";
            }
            lk.children[circle].className = "current";
        }
    });

    // 10.自动播放轮播图
    var timer = this.setInterval(function () {
        // 手动调用点击事件
        rig.click();
    }, 5000)
})