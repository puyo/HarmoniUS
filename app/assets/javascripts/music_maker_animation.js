$(document).ready(function() {

  if ($('.showBalls').length > 0){

    var startBallAnimation = function() {
    $('.ballsShow').remove();

    var $number = 3;
    var inputKey = ($('#inputKey').val()).toLowerCase();
    var octave = $('#selectedOctave').val()
    var frequency = (teoria.note(inputKey + octave)).fq();
    $number = Math.floor(frequency)

    // var $number = Math.floor($('#selectedKey').val());

    var width = 1200,
      height = 800,
      padding = 1.5, // separation between same-color circles
      clusterPadding = 6, // separation between different-color circles
      maxRadius = 12;

    var n = $number, // total number of circles
      m = 10; // number of distinct clusters

    var color = d3.scale.category20()
      .domain(d3.range(m));

    // The largest node for each cluster.
    var clusters = new Array(m);
    var nodes = d3.range(n).map(function() {


      var i = Math.floor(Math.random() * m),
        r = Math.sqrt((i + 3) / m * -Math.log(Math.random())) * maxRadius,
        d = {
          cluster: i,
          radius: r
        };
      if (!clusters[i] || (r > clusters[i].radius)) clusters[i] = d;
      return d;
    });

    var force = d3.layout.force()
      .nodes(nodes)
      .size([width, height])
      .gravity(0)
      .charge(0)
      .on("tick", tick)
      .start();

    var svg = d3.select(".showBalls").append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("class", "ballsShow");

    var circle = svg.selectAll("circle")
      .data(nodes)
      .enter().append("circle")
      .attr("r", function(d) {
        return d.radius;
      })
      .style("fill", function(d) {
        return color(d.cluster);
      })
      .call(force.drag);

    function tick(e) {
      circle
        .each(cluster(10 * e.alpha * e.alpha))
        .each(collide(.5))
        .attr("cx", function(d) {
          return d.x;
        })
        .attr("cy", function(d) {
          return d.y;
        });
    }

    // Move d to be adjacent to the cluster node.
    function cluster(alpha) {
      return function(d) {
        var cluster = clusters[d.cluster],
          k = 1;

        // For cluster nodes, apply custom gravity.
        if (cluster === d) {
          cluster = {
            x: width / 2,
            y: height / 2,
            radius: -d.radius
          };
          k = .1 * Math.sqrt(d.radius);
        }

        var x = d.x - cluster.x,
          y = d.y - cluster.y,
          l = Math.sqrt(x * x + y * y),
          r = d.radius + cluster.radius;
        if (l != r) {
          l = (l - r) / l * alpha * k;
          d.x -= x *= l;
          d.y -= y *= l;
          cluster.x += x;
          cluster.y += y;
        }
      };
    }

    // Resolves collisions between d and all other circles.
    function collide(alpha) {
      var quadtree = d3.geom.quadtree(nodes);
      return function(d) {
        var r = d.radius + maxRadius + Math.max(padding, clusterPadding),
          nx1 = d.x - r,
          nx2 = d.x + r,
          ny1 = d.y - r,
          ny2 = d.y + r;
        quadtree.visit(function(quad, x1, y1, x2, y2) {
          if (quad.point && (quad.point !== d)) {
            var x = d.x - quad.point.x,
              y = d.y - quad.point.y,
              l = Math.sqrt(x * x + y * y),
              r = d.radius + quad.point.radius + (d.cluster === quad.point.cluster ? padding : clusterPadding);
            if (l < r) {
              l = (l - r) / l * alpha;
              d.x -= x *= l;
              d.y -= y *= l;
              quad.point.x += x;
              quad.point.y += y;
            }
          }
          return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
        });
      };
    }
  }

  //animates when single notes are played
  $('#playKey').on('mousedown', function(){

    var inputKey = ($('#inputKey').val()).toLowerCase();
    var octave = $('#selectedOctave').val()
    var frequency = (teoria.note(inputKey + octave)).fq();
    numberOfBalls = Math.floor(frequency)/100
    startBallAnimation(numberOfBalls);
  });

  //animates when scales are played
  $('#playScale').on('mousedown', function(){
    // debugger;
    var inputKey = ($('#inputKey').val()).toLowerCase();
    var octave = $('#selectedOctave').val()
    frequency = (teoria.note(inputKey + octave)).fq();
    var numberOfBalls = Math.floor(frequency)/10
    startBallAnimation(numberOfBalls);
  });

  //animates when triads are played
  $('#playTriad').on('mousedown', function(){
    // debugger;
    var inputKey = ($('#inputKey').val()).toLowerCase();
    var octave = $('#selectedOctave').val()
    frequency = (teoria.note(inputKey + octave)).fq();
    var numberOfBalls = Math.floor(frequency)/100
    startBallAnimation(numberOfBalls);
  });

  $('#playCompTriad').on('mousedown', function(){
    // debugger;
    var inputKey = ($('#inputKey').val()).toLowerCase();
    var octave = $('#selectedOctave').val()
    frequency = (teoria.note(inputKey + octave)).fq();
    var numberOfBalls = Math.floor(frequency)/100
    startBallAnimation(numberOfBalls);
  });

  $('#playCompTriad2').on('mousedown', function(){
    // debugger;
    var inputKey = ($('#inputKey').val()).toLowerCase();
    var octave = $('#selectedOctave').val()
    frequency = (teoria.note(inputKey + octave)).fq();
    var numberOfBalls = Math.floor(frequency)/100
    startBallAnimation(numberOfBalls);
  });

  $('#playCompTriad3').on('mousedown', function(){
    // debugger;
    var inputKey = ($('#inputKey').val()).toLowerCase();
    var octave = $('#selectedOctave').val()
    frequency = (teoria.note(inputKey + octave)).fq();
    var numberOfBalls = Math.floor(frequency)/100
    startBallAnimation(numberOfBalls);
  });




  };

});
