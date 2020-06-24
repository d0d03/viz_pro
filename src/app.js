function changeColor() {
    let chosenOne = document.getElementById("cpalette").value;
    switch (chosenOne) {
        case "Rainbow":
            colors = d3.scaleSequential().interpolator(d3.interpolateRainbow).domain([0,n]);
            break;
        case "Inferno":
            colors = d3.scaleSequential().interpolator(d3.interpolateInferno).domain([0,n]);
            break;
        case "Cool":
            colors = d3.scaleSequential().interpolator(d3.interpolateCool).domain([0,n]);
            break;
        case "Viridis":
            colors = d3.scaleSequential().interpolator(d3.interpolateViridis).domain([0,n]);
            break;
    }
    line.attr("stroke",function(d){ return colors(d); });
}

function randomize(){
    stop = false;
    data = [];
    line.data(data).exit().remove();

    data = d3.shuffle(d3.range(n));
    line = svg.selectAll("line").data(data)
        .enter()
        .append("line")
        .attr("x1",0)
        .attr("y1",0)
        .attr("x2",0)
        .attr("y2", function(d){ return y(d); })
        .attr("class", function(d){ return "line" + d; })
        .attr("stroke",function(d){ return colors(d); })
        .attr("transform",function(d,i){ return "translate(" + x(i) + ")"; });
}

async function changeAlgorithm(){
    let chosenOne = document.getElementById('sAlg').value;
    switch (chosenOne) {
        case "Select":

            await selectSort(data);
            break;
        case"DoubleSelect":
            await doubleSelectSort(data);
            break;
        case "Insert":
            await insertSort(data);
            break;
        case "Gnome":
            await gnomeSort(data);
            break;
        case "Odd-Even":
            await oddEvenSort(data);
            break;
        case "Cocktail":
            await cocktailSort(data);
            break;
        case "Merge":
            await mergeSort(data,0,(data.length-1));
            toggleButtons();
            break;
        default:
            await bubbSort(data);
            break;
    }
}

function toggleButtons(){
    var btns = document.getElementsByClassName("btn-primary");
    for (let btn of btns) {
        if(btn.disabled){
            btn.disabled = false;
        }else{ btn.disabled = true; }
    }
    if(stop){randomize();}
}