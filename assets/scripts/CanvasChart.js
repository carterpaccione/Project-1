window.onload = function () {
    var chart = new CanvasJS.Chart("chartContainer",
    {
      title:{
        text: "Sales - per month (2024)"
      },
      data: [

      {
        type: "column",

        dataPoints: [
        { x: 1, y: 1, label: "January"},
        { x: 2, y: 1,  label: "February" },
        { x: 3, y: 1,  label: "March" },
        { x: 4, y: 1,  label: "April"},
        { x: 5, y: 1,  label: "May"},
        { x: 6, y: 1,  label: "June"},
        { x: 7, y: 1, label: "July"},
        { x: 8, y: 1,  label: "August"},
        { x: 9, y: 1,  label: "September"},
        { x: 10, y: 1,  label: "October"},
        { x: 11, y: 1,  label: "November"},
        { x: 12, y: 1,  label: "December"}
        ]
      }
      ]
    });
    getDates(chart);
    chart.render();
  }

function getDates(chart) {
    let salesList = loadSales();

    for(let i = 0; i < salesList.length; i++) {
        let item = salesList[i];
        let price = Number(item.price);
        let date = item.dateSold;
        let monthIndex = Number(date.split("/")[0]-1);
        // let day = date.split("/")[1];
        // let year = date.split("/")[2];
        chart.data.dataPoints[monthIndex].y += price;
        
    }
};
// TESTS

// window.onload = function () {
//     var chart = new CanvasJS.Chart("chartContainer",
//     {
//       title:{
//         text: "Sales - per month (2024)"
//       },
//       data: [

//       {
//         type: "column",

//         dataPoints: [
//         { x: new Date("2024", "00", "31"), y: 1, label: "January"},
//         { x: new Date("2024", "01", "29"), y: 1,  label: "February" },
//         { x: new Date("2024", "02", "31"), y: 1,  label: "March" },
//         { x: new Date("2024", "03", "30"), y: 1,  label: "April"},
//         { x: new Date("2024", "04", "31"), y: 1,  label: "May"},
//         { x: new Date("2024", "05", "30"), y: 1,  label: "June"},
//         { x: new Date("2024", "06", "31"), y: 1, label: "July"},
//         { x: new Date("2024", "07", "31"), y: 1,  label: "August"},
//         { x: new Date("2024", "08", "30"), y: 1,  label: "September"},
//         { x: new Date("2024", "09", "31"), y: 1,  label: "October"},
//         { x: new Date("2024", "10", "30"), y: 1,  label: "November"},
//         { x: new Date("2024", "11", "31"), y: 1,  label: "December"}
//         ]
//       }
//       ]
//     });
//     // getDates(chart);
//     chart.render();
//   }



//   function getDates() {
//     let dataPoints = [];
//     let salesList = loadSales();
    
//     for(let i = 0; i < salesList.length; i++) {
//         let item = salesList[i];
//         let price = Number(item.price);
//         let date = item.dateSold;
//         let month = date.split("/")[0];
//         let day = date.split("/")[1];
//         let year = date.split("/")[2];
//         dataPoints.push({ x: new Date(year, month, day), y: price });
//     }
//     return dataPoints;
//   }