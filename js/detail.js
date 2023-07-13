// 当页面全部加载完后我在执行里面的代码

window.addEventListener("load", function () {
    var img1 = document.querySelector(".content-img");
    var mask = document.querySelector(".mask");
    var big = document.querySelector(".big");
    // 1.当我们鼠标经过 就显示和隐藏mask遮挡层 和big大盒子
    img1.addEventListener("mouseover", function () {
        mask.style.display = "block";
        big.style.display = "block";
        console.log(img1.offsetWidth);
    })
    // 鼠标离开
    img1.addEventListener("mouseout", function () {
        mask.style.display = "none";
        big.style.display = "none";
    })
    img1.addEventListener("mousemove", function (e) {
        //1.先计算出鼠标在盒子内的坐标
        var x = e.pageX - this.offsetLeft;
        var y = e.pageY - this.offsetTop;

        // 把坐标给黄色盒子
        //(2)这里减去150是往上走高度的一半 往左走高度的一半
        // (3)我们mask移动的距离
        var maskx = x - mask.offsetWidth / 2;
        var masky = y - mask.offsetHeight / 2;
        var maskMax = img1.offsetWidth - mask.offsetWidth;
        var maskhightmax = img1.offsetHeight - mask.offsetHeight;
        if (maskx <= 0) {
            maskx = 0;
        }
        else if (maskx >= maskMax) {
            maskx = maskMax;
        }
        if (masky <= 0) {
            masky = 0;
        }
        else if (masky >= maskhightmax) {
            maskx = maskhightmax;
        }
        mask.style.left = maskx + "px";
        mask.style.top = masky + "px";
        //大图片的移动距离 = 遮挡层移动距离+大图片最大移动距离/遮挡层的最大移动距离
        // 大图
        var bigimg = document.querySelector(".bigimg");
        // 大图片最大移动距离
        var bigMax = bigimg.offsetWidth - big.offsetWidth;
        //大图片的移动距离
        var bigX = (maskx + bigMax) / maskMax;
        var bigY = (masky + bigMax) / maskhightmax;
        bigimg.style.left = -bigX + "px";
        bigimg.style.top = -bigY + "px";
    })
})