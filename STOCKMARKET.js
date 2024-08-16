
  
  let webpageName = document.querySelector('#webpage-name'); // header and body
  let webLogo = document.querySelector('#web-logo');
  let bodyElement = document.querySelector('body');

  let chartCanvas = document.querySelector('#chart-canvas'); console.log('canvas height', chartCanvas.height); console.log('canvas width', chartCanvas.width);
  let chartSection = document.querySelector('#chart-section'); // chart section
  var customTooltip = document.getElementById('custom-tooltip');
  let timeTick = document.querySelector('#time-tick');
  let chart; // defining globally

  let loadingStocksText = document.querySelector('#loading-stocks'); // list section
  let listContainer = document.querySelector('#list-container');

  let timeStamps = [1533096000, 1535774400, 1538366400, 1541044800, 1543640400, 1546318800, 1548997200, 1551416400, 1554091200, 1556683200, 1559361600, 1561953600, 1564632000, 1567310400, 1569902400, 1572580800, 1575176400, 1577854800, 1580533200, 1583038800, 1585713600, 1588305600, 1590984000, 1593576000, 1596254400, 1598932800, 1601524800, 1604203200, 1606798800, 1609477200, 1612155600, 1614574800, 1617249600, 1619841600, 1622520000, 1625112000, 1627790400, 1630468800, 1633060800, 1635739200, 1638334800, 1641013200, 1643691600, 1646110800, 1648785600, 1651377600, 1654056000, 1656648000, 1659326400, 1662004800, 1664596800, 1667275200, 1669870800, 1672549200, 1675227600, 1677646800, 1680321600, 1682913600, 1685592000, 1688184000, 1689962125];

function makeChart() {
    var canvas = chartCanvas;
    var ctx = canvas.getContext('2d');

    data = {
        label: 'My Dataset',
        data: [54.3850975036621, 54.122688293457, 52.4731559753418, 42.8157539367676, 37.9511871337891, 40.0443496704102, 41.6587219238281, 45.8966979980469, 48.4869194030762, 42.3013191223145, 48.0066108703613, 51.6740570068359, 50.6310691833496, 54.5315933227539, 60.5673942565918, 65.0692825317383, 71.7117538452148, 75.5848922729492, 66.7567520141602, 62.2470817565918, 71.9186630249023, 77.8278198242188, 89.5403213500977, 104.326263427734, 126.691688537598, 113.907455444336, 107.071640014648, 117.094230651855, 130.735321044922, 130.016098022461, 119.473693847656, 120.530433654785, 129.717010498047, 122.957817077637, 135.373626708984, 144.170532226563, 150.071380615234, 140.070602416992, 148.286743164063, 163.630142211914, 176.032745361328, 173.266876220703, 163.690505981445, 173.318908691406, 156.484298706055, 147.739440917969, 135.908462524414, 161.545364379883, 156.286773681641, 137.570495605469, 152.641525268555, 147.355728149414, 129.552719116211, 143.871017456055, 146.981979370117, 164.672225952148, 169.445617675781, 177.005172729492, 193.970001220703, 193.130004882813, 192.990005493164],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'hsla(347.31, 100%, 69.41%, 1)',//'rgba(255, 99, 132, 1)',
        borderWidth: 2,
        pointRadius: 0,
        tension: 0
    };

    const minValue =  Math.min(...data.data); console.log(minValue);
    const maxValue = Math.max(...data.data); console.log(maxValue);

    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: timeStamps.map(function(curretTimeStamp) {
                return new Date(curretTimeStamp * 1000).toLocaleDateString();
            }),
            datasets: [data]
        },
        options: {
            animation: false,
            scales: {
                x: {
                    ticks: {
                        maxRotation: 0,
                        display: 0
                    },
                    grid: {
                        color: 'rgba(58, 84, 100, 0.1)'
                    }
                },
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(58, 84, 100, 0.1)'
                    },
                    // min: minValue,
                    // max: maxValue
                }
            },
            plugins: {
                tooltip: {
                    enabled: false
                },
                legend: {
                    display: false
                },
                annotation: {
                    annotations: {
                        verticalLine: {
                            type: 'line',
                            mode: 'vertical',
                            scaleID: 'x',
                            value: 0,
                            borderColor: 'rgba(0,180,50,0.5)',
                            borderWidth: 1,
                            label: {
                                backgroundColor: 'red',
                                content: 'Hover Line',
                                enabled: false
                            }
                        }
                    }
                }
            },
            maintainAspectRatio: false,
            responsive: true,
            padding: 30,
            layout: {
                padding: {
                    left: 10,
                    bottom: 5,
                    right: 10,
                    top: 10
                }
            }
        }
    });

    function updateAnnotationPosition(xValue) {     // Function to update the position of the vertical line
        chart.options.plugins.annotation.annotations.verticalLine.value = xValue;
        chart.update();
    }
   
    // canvas.addEventListener('mousemove', function(event) {
    //     var canvasRect = canvas.getBoundingClientRect();
    //     var mouseX = event.clientX - canvasRect.left;
    //     var mouseY = event.clientY - canvasRect.top;
    //     var chartX = chart.scales.x.getValueForPixel(mouseX);
    
    //     // Update annotation position
    //     updateAnnotationPosition(chartX);
    
    //     // Update tooltip position and content
    //     customTooltip.style.left = `${mouseX}px`;
    //     customTooltip.style.top = `${mouseY}px`;
    //     customTooltip.style.display = 'block';

    //     var elements = chart.getElementsAtEventForMode(event, 'nearest', { intersect: false }, false);
    //     if (elements.length > 0) {
    //         let element = elements[0];
    //         let dataIndex = element.index;
    //         let dataPoint = chart.data.datasets[0].data[dataIndex];
    //         console.log(dataPoint);
    //         customTooltip.innerHTML = `APPL: $${dataPoint}`
    //     }
    // });
    
    // canvas.addEventListener('mouseout', function() {  // mouseout event listener to hide the line when the mouse leaves the canvas
    //     chart.options.plugins.annotation.annotations.verticalLine.value = null;
    //     chart.update();
    // });
    
    // this is imp
    // canvas.addEventListener('mousemove', function(event) {
    //     var canvasRect = canvas.getBoundingClientRect();
    //     var mouseX = event.clientX - canvasRect.left;
    //     var chartX = chart.scales.x.getValueForPixel(mouseX);
        
    //     // Find the closest data point based on the x-axis value
    //     let closestIndex = null;
    //     let closestDistance = Infinity;
    
    //     chart.data.labels.forEach((label, index) => {
    //         let labelValue = chart.scales.x.getPixelForValue(label);
    //         let distance = Math.abs(mouseX - labelValue);
            
    //         if (distance < closestDistance) {
    //             closestDistance = distance;
    //             closestIndex = index;
    //         }
    //     });
    
    //     if (closestIndex !== null) {
    //         let dataPoint = chart.data.datasets[0].data[closestIndex];
    //         customTooltip.innerHTML = `APPL: $${dataPoint.toFixed(2)}`;
    //         customTooltip.style.left = `${mouseX}px`;
    //         customTooltip.style.top = `${event.clientY - canvasRect.top}px`;
    //         customTooltip.style.display = 'block';

    //         let label = chart.data.labels[closestIndex];
    //         timeTick.innerHTML = label;
    //         timeTick.style.left = `${mouseX}px`;
    //         timeTick.style.bottom = `0px`; console.log(canvas.height);
    //         timeTick.style.display = 'block';
    
    //         // Update annotation position to the closest index
    //         updateAnnotationPosition(chart.data.labels[closestIndex]);
    //     }
    // });
    canvas.addEventListener('mousemove', function(event) {
        var canvasRect = canvas.getBoundingClientRect();
        var mouseX = event.clientX - canvasRect.left;
        var chartX = chart.scales.x.getValueForPixel(mouseX);
        
        // Find the closest data point based on the x-axis value
        let closestIndex = null;
        let closestDistance = Infinity;
    
        chart.data.labels.forEach((label, index) => {
            let labelValue = chart.scales.x.getPixelForValue(label);
            let distance = Math.abs(mouseX - labelValue);
    
            if (distance < closestDistance) {
                closestDistance = distance;
                closestIndex = index;
            }
        });
    
        // Reset all point radius and colors before highlighting the closest one
        chart.data.datasets[0].pointRadius = chart.data.datasets[0].data.map(() => 0);
        chart.data.datasets[0].pointBackgroundColor = chart.data.datasets[0].data.map(() => 'rgba(255, 99, 132, 0.1)');
        chart.data.datasets[0].pointBorderWidth = chart.data.datasets[0].data.map(() => 1);
    
        if (closestIndex !== null) {
            // Highlight the nearest point by changing its radius and color
            chart.data.datasets[0].pointRadius[closestIndex] = 4;
            chart.data.datasets[0].pointBackgroundColor[closestIndex] = 'rgba(100,255,100,0.6)';//'rgba(255, 99, 132, 1)'; // Green color for the highlighted point
            chart.data.datasets[0].pointBorderWidth[closestIndex] = 0;
    
            let dataPoint = chart.data.datasets[0].data[closestIndex];
            customTooltip.innerHTML = `APPL: $${dataPoint.toFixed(2)}`;
            customTooltip.style.left = `${mouseX}px`;
            customTooltip.style.top = `${event.clientY - canvasRect.top}px`;
            customTooltip.style.display = 'block';
            customTooltip.style.opacity = '1';
    
            let label = chart.data.labels[closestIndex];
            timeTick.innerHTML = label;
            let widthOfTimeTick = timeTick.getBoundingClientRect().width;
            let offsetToCenterTheTick = (mouseX - (parseFloat(widthOfTimeTick)/2));
            timeTick.style.left = `${offsetToCenterTheTick}px`;
            timeTick.style.top = `${canvasRect.bottom - window.innerHeight*0.01}px`; // Aligns the `timeTick` just below the canvas
            timeTick.style.display = 'inline-block';
    
            // Update annotation position to the closest index
            updateAnnotationPosition(chart.data.labels[closestIndex]);
        }
    
        // Update the chart to reflect the changes
        chart.update();
    });

    canvas.addEventListener('mouseout', function() {
        chart.options.plugins.annotation.annotations.verticalLine.value = null;
        chart.data.datasets[0].pointRadius = chart.data.datasets[0].data.map(() => 0);  // Reset radius
        chart.data.datasets[0].pointBackgroundColor = chart.data.datasets[0].data.map(() => 'rgba(255, 99, 132, 1)'); // Reset color
        chart.update();
        customTooltip.style.display = 'none';
        timeTick.style.display = 'none';
    });
    
    // this is important
    // canvas.addEventListener('mouseout', function() {
    //     chart.options.plugins.annotation.annotations.verticalLine.value = null;
    //     chart.update();
    //     customTooltip.style.display = 'none';
    // });
}

  function intro() {                              // Animation at the intro
      let opacityAnimation = new Promise(function(res,rej){
          setTimeout(function(){
              webpageName.style.opacity = '1';
              webLogo.style.opacity = '1';
              return res('opacity 1');
          },100);                                  // 100 milliseconds to unsure that the whole page is loaded. Could have used 'window.onload' event too.
      });
      opacityAnimation.then(function(resString){
          return new Promise((res,rej)=>{
              setTimeout(function(){
                  webpageName.style.transform = 'translateY(1vh)';
                  webLogo.style.transform = 'translateY(1vh)';
                  res('');
              },1500);
          }).then(function(res){
              setTimeout(function(){
                  chartSection.style.opacity = '1';
                  makeChart();
              },1000)
          }).catch(function(err){
              alert('Error encountered while executing animations '+err.message);
          });
      });
  }

  function generateRandomColor(){  // generates random color for the stocks
    let randomNumber = Math.random();
    let r = Math.floor(randomNumber*360);
    return `hsla(${r},90.2%,38.7%,0.2)`;
  }
  function renderStockList(stocksListObject){
    let stockObject = stocksListObject.stocksStatsData[0]; console.log(stockObject);
    for(let stock in stockObject){
        if(stock === '_id'){
            let stockElements = document.querySelectorAll('.stock');
            stockElements.forEach((stockElement)=>{
                stockElement.style.opacity = '1';
            });
            continue;
        }else{
            console.log(stock);
            let stockElement = document.createElement('div');
            listContainer.appendChild(stockElement);
            stockElement.className = 'stock';
            let stockNameDiv = document.createElement('div');
            stockNameDiv.className = 'stock-name-div';
            stockNameDiv.style.backgroundColor = generateRandomColor();
            stockNameDiv.innerHTML = stock.toString();
            stockElement.appendChild(stockNameDiv);
            let stockBookValueDiv = document.createElement('div');
            stockBookValueDiv.className = 'stock-book-value-div';
            stockBookValueDiv.innerHTML ='$'+stockObject[stock].bookValue.toFixed(3);
            stockElement.appendChild(stockBookValueDiv);
            let stockProfitDiv = document.createElement('div');
            stockProfitDiv.className = 'stock-profit-div';
            stockProfitDiv.innerHTML = '$'+stockObject[stock].profit.toFixed(3);
            stockElement.appendChild(stockProfitDiv);
        }
    };
  }

  function fetchStocksList() {                        // loads the list of stocks to be displayed on the right container
    const listUrl = 'https://stocksapi-uhe1.onrender.com/api/stocks/getstockstatsdata';
    let listPromise = fetch(listUrl , {method:'GET'});
    listPromise.then((response)=>{
        return response.json();
    }).then((stocksListObject)=>{
        console.log(stocksListObject);
        loadingStocksText.style.display = 'none';
        listContainer.innerHTML = `
        <div id="column-names">
                    <div class="column-name" id="stocks">
                        Stock
                    </div>
                    <div class="column-name" id="book-value">
                        Book Value
                    </div>
                    <div class="column-name" id="profit">
                        Profit
                    </div>
                </div>`;
        renderStockList(stocksListObject);
    }).catch((err)=>{
        console.log('Could Not Fetch Stocks List', err);
    });
  }

  function main() {                              // Main Function, the entry point of the code
      window.onload = intro;
      fetchStocksList();

  }
  main();