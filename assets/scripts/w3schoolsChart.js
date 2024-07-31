const xArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let yArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

let data = [{
  x:xArray,
  y:yArray,
  type:"bar"
}];

const layout = {title:"Sales Per Month - 2024"};

Plotly.newPlot("myPlot", data, layout);

//

function updateChart(data) {
    let salesList = loadSales();

    for(let i = 0; i < salesList.length; i++) {
        let item = salesList[i];
        let price = Number(item.price);
        let date = item.dateSold;
        let monthIndex = Number(date.split("/")[0]-1);
        data.y[monthIndex] += price;
    }
    Plotly.newPlot("myPlot", data, layout);
};