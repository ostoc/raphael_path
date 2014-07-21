Raphael.fn.connection = function (obj1, obj2, line, bg) {
    if (obj1.line && obj1.from && obj1.to) {
        line = obj1;
        obj1 = line.from;
        obj2 = line.to;
    }
    var bb1 = obj1.getBBox(),
        bb2 = obj2.getBBox(),
        p = [{x: bb1.x + bb1.width / 2, y: bb1.y - 1},
        {x: bb1.x + bb1.width / 2, y: bb1.y + bb1.height + 1},
        {x: bb1.x - 1, y: bb1.y + bb1.height / 2},
        {x: bb1.x + bb1.width + 1, y: bb1.y + bb1.height / 2},
        {x: bb2.x + bb2.width / 2, y: bb2.y - 1},
        {x: bb2.x + bb2.width / 2, y: bb2.y + bb2.height + 1},
        {x: bb2.x - 1, y: bb2.y + bb2.height / 2},
        {x: bb2.x + bb2.width + 1, y: bb2.y + bb2.height / 2}],
        d = {}, dis = [];
    for (var i = 0; i < 4; i++) {
        for (var j = 4; j < 8; j++) {
            var dx = Math.abs(p[i].x - p[j].x),
                dy = Math.abs(p[i].y - p[j].y);
            if ((i == j - 4) || (((i != 3 && j != 6) || p[i].x < p[j].x) && ((i != 2 && j != 7) || p[i].x > p[j].x) && ((i != 0 && j != 5) || p[i].y > p[j].y) && ((i != 1 && j != 4) || p[i].y < p[j].y))) {
                dis.push(dx + dy);
                d[dis[dis.length - 1]] = [i, j];
            }
        }
    }
    if (dis.length == 0) {
        var res = [0, 4];
    } else {
        res = d[Math.min.apply(Math, dis)];
    }
    var x1 = p[res[0]].x,
        y1 = p[res[0]].y,
        x4 = p[res[1]].x,
        y4 = p[res[1]].y;
    dx = Math.max(Math.abs(x1 - x4) / 2, 10);
    dy = Math.max(Math.abs(y1 - y4) / 2, 10);
    var x2 = [x1, x1, x1 - dx, x1 + dx][res[0]].toFixed(3),
        y2 = [y1 - dy, y1 + dy, y1, y1][res[0]].toFixed(3),
        x3 = [0, 0, 0, 0, x4, x4, x4 - dx, x4 + dx][res[1]].toFixed(3),
        y3 = [0, 0, 0, 0, y1 + dy, y1 - dy, y4, y4][res[1]].toFixed(3);
    var path = ["M", x1.toFixed(3), y1.toFixed(3), "C", x2, y2, x3, y3, x4.toFixed(3), y4.toFixed(3)].join(",");
    if (line && line.line) {
        line.bg && line.bg.attr({path: path});
        line.line.attr({path: path});
    } else {
        var color = typeof line == "string" ? line : "#fff";
        return {
            bg: bg && bg.split && this.path(path).attr({stroke: bg.split("|")[0], fill: "none", "stroke-width": bg.split("|")[1] || 3}),
            line: this.path(path).attr({stroke: color, fill: "none"}),
            from: obj1,
            to: obj2
        };
    }
};

var el;
window.onload = function () {
    var opt = "Nubisave36484221 directory8143066 Nubisave36484211 directory8142066 Nubisave36484211 directory8142056 Nubisave36484211 directory8142766 Nubisave36484211 directory8142166";
    var components = opt.split(" "); 
    var dragger = function () {
        this.ox = this.type == "rect" || "image"  ? this.attr("x") : this.attr("cx");
        this.oy = this.type == "rect" || "image" ? this.attr("y") : this.attr("cy");
        this.animate({"fill-opacity": 100}, 500);
    },
        move = function (dx, dy) {
            var att = this.type == "rect" || "image" ? {x: this.ox + dx, y: this.oy + dy} : {cx: this.ox + dx, cy: this.oy + dy};
            this.attr(att);
            for (var i = connections.length; i--;) {
                r.connection(connections[i]);
            }
            r.safari();
        },
        up = function () {
            this.animate({"fill-opacity": 100}, 500);
        },
        r = Raphael("holder", 640, 480),


        connections = [];
        shapes = [];
        nodes = [];
        connect_nodes = [];
        str = "Nubisave"; 
        chy = 0;
        chx = 0;
        startx = 30;
        starty = 90;
        for (var i = 0; i < components.length; i++){
            nodes[i] = components [i];
        };
       // nodes = components;


        for (var i = 0; i < nodes.length ; i++) {
            console.log("i",i);
       
            for (var j = i+1 ; j< nodes.length ; j++){
                  console.log("j",j);
                if (nodes[i] == nodes[j]){
                    nodes.splice(j,1);
                    console.log("splice at",j)
                }

        

        };
            
           
           
     };

     for (var i = 0; i < nodes.length; i++){
        connect_nodes[i] = nodes [i];
     };

     console.log (nodes);
     console.log (components);






    // define the shape of components; 
   for (var i = 0; i < nodes.length; i++) {
        var color = Raphael.getColor();
      // i = 2;

        if (nodes[i] = nodes[i].match(str)) {

                    chx = 20;
                    chy = i * 50;
                    shapes[i] = r.image("demo/nubisave.png", startx + chx , starty + chy + 100, 60 , 40, 10);
                    console.log("i:",shapes[i]);

        } else{
            chx = 200;
            chy = i * 50; 
            shapes[i] = r.image("demo/dir.png", startx + chx, starty + chy, 60, 40), r.text(startx + chx + 80, starty + chy, "good");
        };
        
    };



    //provider drager for  components
    for (var i = 0 ; i < nodes.length;i++){
        shapes[i].attr({fill: color, stroke: color, "fill-opacity": 100, "stroke-width": 2, cursor: "move"});
        shapes[i].drag(move, dragger, up);
    };

    console.log("this is connect node ",connect_nodes);
    console.log("this is components", components);

   // var f = 0;
    //var t = 0;
// connection 
    for (var i = 0; i < components.length; i++){
    
        console.log("!!!!!compare components:" , components[i] + i);

        for (var j = 0 , ii = i; j < connect_nodes.length; j++){
            console.log("first loop",j);
            console.log("search", components[ii]);
            if (components[ii] == connect_nodes[j]){                
                console.log("match",connect_nodes[j] , "search next");
                ii++; 
                console.log(ii);
                for (var  k = 0 , m = j; k < connect_nodes.length; k++){
                    if (components[ii] == connect_nodes[k] ) {
                      //  var k = t;
                        console.log ("to",connect_nodes[k]);
                        console.log ("from:",connect_nodes[m]);
                        //console.log ("i in k", components[i]);
                        connections.push(r.connection(shapes[m], shapes[k], "#fff"));
                    } else {j++;};
                } ;
                
        };
        };
       i++;


    };




};
    





/*

    for (var i = 0; i < components.length; i++) {
        connections.push(r.connection(shapes[i], shapes[i+1], "#fff")); 
        i++;              
    };
    
    //connections.push(r.connection(shapes[0], shapes[3], "#fff", "#fff|5"));
    //connections.push(r.connection(shapes[0], shapes[2], "#000", "#fff"));
};*/
