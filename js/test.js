function Index(node) {
    this.node = node;
    this.init();
};
Index.prototype.init = function () {
    var self = this;
    this.nodes = [];
    Array.prototype.slice.call(self.node, 0).forEach(function (item, index) {  //item指数组的元素，index指数组元素的序列，arr指数组本身
        self.nodes.push(self.update(item));
        self.bindEvents(item, index);
    });
    console.log(Array.prototype.slice.call(self.node, 0));
    console.log(this.nodes);
};
Index.prototype.update = function (item) {
    return {
        w: item.offsetWidth,
        h: item.offsetHeight,
        l: item.offsetLeft,
        t: item.offsetTop
        
    }
};
Index.prototype.bindEvents = function (item, index) {
    var self = this;
    $(item).on('mouseenter', function (e) {
        console.log("x:"+e.pageX);
        console.log("y:"+e.pageY);
        self.addClass(e, item, 'in', index);
        return false;
        
    })
    $(item).on('mouseleave', function (e) {
        self.addClass(e, item, 'out', index);
        return false;
    })
};
Index.prototype.addClass = function (e, item, state, index) {
    var direction = this.getDirection(e, index);
    console.log(direction);
    var class_suffix = '';
    switch (direction) {
        case 0:
            class_suffix = '-top'; 
            break;
        case 1:
            class_suffix = '-right'; 
            break;
        case 2:
            class_suffix = '-bottom';
            break;
        case 3:
            class_suffix = '-left'; 
            break;
    }
    item.className = '';
    item.classList.add(state + class_suffix);   //例添加一个class=“in-top”
};
Index.prototype.getDirection = function (e, index) {
    var w = this.nodes[index].w,
        h = this.nodes[index].h,
        x = e.pageX - this.nodes[index].l - w / 2 ,
        y = e.pageY - this.nodes[index].t - h / 2 ;
        d=(Math.round(((Math.atan2(y, x) * (180 / Math.PI)) + 180) / 90)+3) % 4; 
        //atan2()计算点（x,y）与坐标系原点形成的线段与X轴的夹角 取值(-π，π)
        //乘以（180/Math.PI）是将弧度装换成角度
        //加上180是消除负值对结果的影响
        //除以90是为了判断当前鼠标在哪个象限
        //加3对4取模 是为了把象限转化成合适的顺时针方向

    
    return d;//d的数值用于判断方向上下左右。

};
new Index($('li')); 