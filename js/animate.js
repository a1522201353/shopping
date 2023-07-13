function animate(obj, target, callback) {
    clearTimeout(obj.sume);
    obj.sume = setInterval(function () {
        // 把我们的步长值改为整数，不要出现小数的问题
        // var step = Math.ceil((target - obj.offsetLeft) / 10);
        var step = (target - obj.offsetLeft) / 10;
        if (step > 0) {
            step = Math.ceil(step);
        }
        else {
            step = Math.floor(step);
        }
        if (obj.offsetLeft == target) {
            clearTimeout(obj.sume);
            // 回调函数写到定时器结束里面
            // 如果有函数功能转进来就调用
            if (callback) {
                // 调用函数
                callback();
            }
        }
        obj.style.left = obj.offsetLeft + step + "px";
    }, 30)
}