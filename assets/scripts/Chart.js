const salesChart = new Chart(
    document.getElementById('acquisitions'),
    {
      type: 'bar',
      options: {
        animation: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            enabled: false
          }
        }
      },
      data: {
        labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        datasets: [
          {
            label: 'Sales per Month 2024',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          }
        ]
      }
    }
  );

  function updateChart(chart) {
    let salesList = loadSales();
  
    for(let i = 0; i < salesList.length; i++) {
        let item = salesList[i];
        let price = Number(item.price);
        let date = item.dateSold;
        let monthIndex = Number(date.split("/")[0]-1);
        chart.data.datasets[0].data[monthIndex] += price;
    }
    chart.update();
  }
  updateChart(salesChart);