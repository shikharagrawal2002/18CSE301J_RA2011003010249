// Script for Tableau

var divElement = document.getElementById("viz1677572241242");
var vizElement = divElement.getElementsByTagName("object")[0];
vizElement.style.width = "1000px";
vizElement.style.height = "827px";
var scriptElement = document.createElement("script");
scriptElement.src = "https://public.tableau.com/javascripts/api/viz_v1.js";
vizElement.parentNode.insertBefore(scriptElement, vizElement);

function onClick() {
  document.getElementById("tableau").style.display = "flex";
  document.getElementById("d3").style.display = "none";
  document.getElementById("plotly").style.display = "none";
  document.getElementById("home").style.display="none";
}

function onClick2() {
  document.getElementById("tableau").style.display = "none";
  document.getElementById("plotly").style.display = "none";
  document.getElementById("d3").style.display = "flex";
  document.getElementById("home").style.display="none";
}

function onClick3() {
  document.getElementById("tableau").style.display = "none";
  document.getElementById("plotly").style.display = "flex";
  document.getElementById("d3").style.display = "none";
  document.getElementById("home").style.display="none";
}

function onClick4() {
  document.getElementById("tableau").style.display = "none";
  document.getElementById("plotly").style.display = "none";
  document.getElementById("d3").style.display = "none";
  document.getElementById("home").style.display="flex";
}

// Script for D3
var svg = d3
    .select("#AllYears")
    .append("svg")
    .attr("width", 1200)
    .attr("height", 600),
  margin = 200,
  width = svg.attr("width") - margin,
  height = svg.attr("height") - margin;

var g = svg.append("g").attr("transform", "translate(" + 100 + "," + 100 + ")");

var xScale = d3.scaleBand().range([0, width]).padding(0.4),
  yScale = d3.scaleLinear().range([height, 0]);

d3.csv("Motor.csv", function (error, data) {
  if (error) {
    throw error;
  }

  xScale.domain(
    data.map(function (d) {
      return d.Country;
    })
  );

  var max_Year = d3.max(
    data.map(function (d) {
      return Number(
        Number(d.Year1) + Number(d.Year2) + Number(d.Year3) + Number(d.Year4)
      );
    })
  );

  var min_Year = d3.min(
    data.map(function (d) {
      return Number(
        Number(d.Year1) + Number(d.Year2) + Number(d.Year3) + Number(d.Year4)
      );
    })
  );

  yScale.domain([min_Year, max_Year]);

  g.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(xScale))
    .append("text")
    .attr("y", height / 8)
    .attr("x", width / 2)
    // .attr("text-anchor", "middle")
    .attr("stroke", "black")
    .text("Country");

  g.append("g")
    .call(
      d3
        .axisLeft(yScale)
        .tickFormat(function (d) {
          return d;
        })
        .ticks(10)
    )
    .append("text")
    .attr("class", "texty")
    .attr("y", height / 2)
    .attr("x", -50)
    .attr("text-anchor", "middle")
    .attr("stroke", "black")
    .text("All Years");

  g.selectAll(".bar")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", function (d) {
      return xScale(d.Country);
    })
    .attr("y", function (d) {
      return yScale(
        Number(d.Year1) + Number(d.Year2) + Number(d.Year3) + Number(d.Year4)
      );
    })
    .attr("width", xScale.bandwidth())
    .attr("height", function (d) {
      console.log(height);
      return Math.abs(
        height -
          yScale(
            Number(d.Year1) +
              Number(d.Year2) +
              Number(d.Year3) +
              Number(d.Year4)
          )
      );
    });

  console.log(data);
});
