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
          },
          customCanvasBackgroundColoer: {
            color: 'white'
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
    chart.data.datasets[0].data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
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

  // Plugins

  const plugin = {
    id: 'customCanvasBackgroundColor',
    beforeDraw: (chart, args, options) => {
      const {ctx} = chart;
      ctx.save();
      ctx.globalCompositeOperation = 'destination-over';
      ctx.fillStyle = options.color || '#99ffff';
      ctx.fillRect(0, 0, chart.width, chart.height);
      ctx.restore();
    }
  };