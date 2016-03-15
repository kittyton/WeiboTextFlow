var LYPwidth = 650,
    LYPheight = 500;

var nodewidth = 50,
    nodeheight = 20,
    LYPfontsize = 17,
    linkoriganlength = 60;

var ctr_i = 0;

var LYPsvg = d3.select("#wordsDisplay").append("svg")
    .attr("width", LYPwidth)
    .attr("height", LYPheight);

var nodestep = 2;
var nodeorigansize = 14;

// init force layout
var force = d3.layout.force()
    .size([LYPwidth, LYPheight])
//        .nodes([{}]) // initialize with a single node
    .linkDistance(linkoriganlength)
    .gravity(0.03);

// get layout properties
var nodes = force.nodes(),
    links = force.links(),
    node = LYPsvg.selectAll(".node"),
    link = LYPsvg.selectAll(".link"),
    node_text = LYPsvg.selectAll(".node_text");

var forcecharge = d3.scale.linear()
    .range([0, -300])
    .domain([9, 40]);

d3.csv("data/lyp.csv", function(data){
    var nodesObj = {};
    var node1 = {},
        node2 = {},
        node3 = {},
        node4 = {},
        node5 = {};


    nodes = d3.values(nodesObj);

    // Create the link lines.
    link = LYPsvg.selectAll(".link")
        .data(links)
        .enter().append("line")
        .attr("class", "link")
        .attr("stroke-width", function(d){
            return 2*d.weight;
        });

    // Create the node circles.
    node = LYPsvg.selectAll(".node")
        .data(nodes)
        .enter().append("rect")
        .attr("class", "node")
        .attr("width", 0)
        .attr("height", 0)
        .call(force.drag);

    // Start the force layout.
    force   .on("tick", tick)
        .nodes(nodes)
        .links(links);
//            .start();

    function tick() {
        link.attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });

        node
            .attr("x", function(d) { return d.x- d.nodewidth/2; })
            .attr("y", function(d) { return d.y- d.nodeheight/2; });

        node_text.attr("x", function(d){return d.x});
        node_text.attr("y", function(d){return d.y});
    }

    node_text = LYPsvg.selectAll("text")
        .data(nodes)
        .enter()
        .append("text")
        .attr("fill","#34495E")
        .attr("font-family","SimHei")
        .attr("text-anchor", "middle")
        .attr("dx", 0)
        .attr("dy", LYPfontsize/2 - 1)
        .attr("font-size", LYPfontsize)
        .text(function(d){return d.name});


    function redraw(){
        specialedSize();

        link = link.data(links);

        link.enter().insert("line", ".node")
            .attr("class", "link");

        link.exit().remove();

        node = node.data(nodes);

        node.enter().append("rect")
            .attr("class", "node");
        /*                .attr("height", function(d){return d.nodeheight})
         .attr("width", function(d){return d.nodewidth});*/
        /*                .attr("x", function(d) { return d.x-nodewidth/2; })
         .attr("y", function(d) { return d.y-nodeheight/2; })*/
        /*                .transition()
         .duration(1500)
         .ease("elastic")
         .attr("r", 6.5);*/

        node.exit()
            .remove();

        node.attr("height", function(d){return d.nodeheight;})
            .attr("width", function(d){return d.nodewidth;});
        link.attr("stroke-width", function(d){
            return 2*d.weight;
        });

        node_text.remove();
        node_text = LYPsvg.selectAll("text")
            .data(nodes)
            .enter()
            .append("text")
            .attr("fill","#34495E")
            .attr("font-family","SimHei")
            .attr("text-anchor", "middle")
            .attr("dx", 0)
            .attr("dy", function(d){return d.size/2-2;})
            .attr("font-size", function(d){return d.size})
            .text(function(d){return d.name;});

        /*        node_text = node_text.data(nodes);

         node_text.enter().append("text")
         .attr("text-anchor", "middle")
         .attr("dx", 0)
         .attr("dy", LYPfontsize/2 - 1)
         .attr("font-size", LYPfontsize)
         .text(function(d){return d.name});*/

        force.linkDistance(function(d){return d.linklength;})
            .charge(function(d){return forcecharge(d.size);});
        force
            .nodes(nodes)
            .links(links)
            .start();

    }

    setInterval(function(){
        nodes.forEach(function(d){
            d.size -= 0.3;
            if(d.size < 11)spliceNode(d);
        });
        links.forEach(function(d){
            if(d.weight > 1)d.weight -= 0.1;
        });
        redraw();

    }, 500);

    setInterval(function(){
        insertNode(data[ctr_i]);
        ctr_i ++;
        insertNode(data[ctr_i]);
        ctr_i ++;
        insertNode(data[ctr_i]);
        ctr_i ++;
        insertNode(data[ctr_i]);
        ctr_i ++;
        insertNode(data[ctr_i]);
        ctr_i ++;
        nodes = d3.values(nodesObj);
        redraw();
    }, 2000);

    d3.select("p").on("click",function(){
        insertNode(data[ctr_i]);
        ctr_i ++;
        redraw();
    });

    function nodeByName(name) {
        if(nodesObj[name])
        {
            nodesObj[name].size += nodestep;
            return nodesObj[name];
        }
        else
        {
            return (nodesObj[name] = {name: name, size: nodeorigansize, nodewidth: 0, nodeheight: 0, nodesp: 1});
        }
//        return nodesObj[name] || (nodesObj[name] = {name: name});
    }

    function insertLink(node1, node2){
        var isHas = false;
        links.forEach(function(e){
            if((e.source === node1 && e.target === node2) || (e.source === node2 && e.target === node1))
            {
                if(e.weight < 7)e.weight ++;
                isHas = true;
            }
        });
        if(!isHas)
        {
            links.push({source: node1, target: node2, weight: 1, linklength: linkoriganlength});
        }
    }

    function insertNode(a){
        if(a.term1 == "")return;
        node1 = nodeByName(a.term1);
        if(a.term2 == "")return;
        node2 = nodeByName(a.term2);
        insertLink(node1, node2);
        if(a.term3 == "")return;
        node3 = nodeByName(a.term3);
        insertLink(node2, node3);
        if(a.term4 == "")return;
        node4 = nodeByName(a.term4);
        insertLink(node3, node4);
        if(a.term5 == "")return;
        node5 = nodeByName(a.term5);
        insertLink(node4, node5);
    }

    function spliceLinksForNode(node) {
        toSplice = links.filter(
            function(l) {
                return (l.source === node) || (l.target === node); });
        toSplice.map(
            function(l) {
                links.splice(links.indexOf(l), 1); });
    }

    function spliceNode(node)
    {
        spliceLinksForNode(node);
        delete (nodesObj[node.name]);
        nodes = d3.values(nodesObj);
    }

    function specialedSize()
    {
        nodes.forEach(function(n){
            n.nodeheight = n.size + 4;
            n.nodewidth = n.name.length * n.size+10;
        });
        links.forEach(function(l){
            l.linklength = (l.source.size + l.target.size)*1.5;
        });
    }
});
