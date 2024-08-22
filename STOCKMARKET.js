
  let webpageName = document.querySelector('#webpage-name'); // header of the page and body
  let webLogo = document.querySelector('#web-logo');
  let bodyElement = document.querySelector('body');

  let chartCanvas = document.querySelector('#chart-canvas');
  let chartSection = document.querySelector('#chart-section'); // chart section
  var customTooltip = document.getElementById('custom-tooltip');
  let timeTick = document.querySelector('#time-tick');
  let oneMonthBtn = document.querySelector('#one-month'); // time span buttons
  let threeMonthsBtn = document.querySelector('#three-months');
  let oneYearBtn = document.querySelector('#one-year');
  let fiveYearsBtn = document.querySelector('#five-years');
  let timeSpanOptionsDiv = document.querySelector('#timespan-options');
  let peakAndTrough = document.querySelector('#peak-and-trough');

  let summBodyElement = document.querySelector('#sum-body p'); // summary section
  let summHeaderDiv = document.querySelector('#summary-header');
  let stockNameOnDisplay = document.querySelector('#sum-stock-name'); // summary header
  let stockBookValueOnDisplay = document.querySelector('#sum-book-value');
  let stockProfitValueOnDisplay = document.querySelector('#sum-profit');
  let summSection = document.querySelector('#summary-section');

  let chart; // defining globally
  let context;
  let currentStockName = 'AAPL';  // the initial data shown is of 'AAPL' stock
  let chartData;
  let summaryData;
  let stockListData;
  let listData;

  let loadingStocksText = document.querySelector('#loading-stocks'); // list section
  let listContainer = document.querySelector('#list-container');
  let listSection = document.querySelector('#list-section');

function makeChart(stockName, timeSpan) {    // renders chart of a given stock and timespan from the chart.js library
    var canvas = chartCanvas;
    var ctx = canvas.getContext('2d');
    context = ctx;

    var data = chartData.stocksData[0][stockName][timeSpan].value;
    

    var timeStamps = chartData.stocksData[0][stockName][timeSpan].timeStamp;
    

    var minValue =  Math.min(...data);
    var maxValue = Math.max(...data);

    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: timeStamps.map(function(curretTimeStamp) {
                return new Date(curretTimeStamp * 1000).toLocaleDateString();
            }),
            datasets: [{
                label: '',
                data: data,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'hsla(347.31, 100%, 69.41%, 1)',//'rgba(255, 99, 132, 1)',
                borderWidth: 2,
                pointRadius: 0,
                tension: 0
            }]
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
                    min: minValue,
                    max: maxValue
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

    function moveEvent(){
        var canvasRect = canvas.getBoundingClientRect();
        var mouseX = event.clientX - canvasRect.left;
        var chartX = chart.scales.x.getValueForPixel(mouseX);
        
        // Finds the closest data point based on the x-axis value
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
    
        // Resets all point radius and colors before highlighting the closest one
        chart.data.datasets[0].pointRadius = chart.data.datasets[0].data.map(() => 0);
        chart.data.datasets[0].pointBackgroundColor = chart.data.datasets[0].data.map(() => 'rgba(255, 99, 132, 0.1)');
        chart.data.datasets[0].pointBorderWidth = chart.data.datasets[0].data.map(() => 1);
    
        if (closestIndex !== null) {
            // Highlights the nearest point by changing its radius and color
            chart.data.datasets[0].pointRadius[closestIndex] = 4;
            chart.data.datasets[0].pointBackgroundColor[closestIndex] = 'rgba(100,255,100,0.6)'; // Green color for the highlighted point
            chart.data.datasets[0].pointBorderWidth[closestIndex] = 0;
    
            let dataPoint = chart.data.datasets[0].data[closestIndex];
            customTooltip.innerHTML = `${currentStockName}: $${dataPoint.toFixed(2)}`;
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
    }
    canvas.addEventListener('mousemove', moveEvent);

    function outEvent(){
        chart.options.plugins.annotation.annotations.verticalLine.value = null;
        chart.data.datasets[0].pointRadius = chart.data.datasets[0].data.map(() => 0);  // Reset radius
        chart.data.datasets[0].pointBackgroundColor = chart.data.datasets[0].data.map(() => 'rgba(255, 99, 132, 1)'); // Reset color
        chart.update();
        customTooltip.style.display = 'none';
        timeTick.style.display = 'none';
    }
    canvas.addEventListener('mouseout', outEvent);

    let peak = maxValue;
    let trough = minValue;
    updatePeakAndTrough(peak, trough);
}

function updatePeakAndTrough(peak, trough){
    peakAndTrough.style.opacity = 0;
    peakAndTrough.innerHTML = '';
    peakAndTrough.innerHTML = `Peak: $${peak.toFixed(2)} &nbsp Trough: $${trough.toFixed(2)}`;
    peakAndTrough.style.opacity = '1'
}
    function updateChart(stockName, timeSpan) {   // this function is essentially to improve performance by not rendering the chart from scratch and just updating the necessary values / parameters
        if (chart) {
            let data = chartData.stocksData[0][stockName][timeSpan].value;
            let timeStamps = chartData.stocksData[0][stockName][timeSpan].timeStamp;
    
            const minValue = Math.min(...data);
            const maxValue = Math.max(...data);
    
            chart.data.labels = timeStamps.map(function(currentTimeStamp) {
                return new Date(currentTimeStamp * 1000).toLocaleDateString();
            });
            chart.data.datasets[0].data = data;
            chart.options.scales.y.min = minValue;
            chart.options.scales.y.max = maxValue;
    
            chart.update(); // Update the chart instead of recreating it

            let peak = maxValue;
            let trough = minValue;
            updatePeakAndTrough(peak, trough);
        } else {
            let loadingScreenCanvas = document.querySelector('#loading-canvas');
            loadingScreenCanvas.remove();
            makeChart(stockName, timeSpan);
        }
    }
    

    function addEventListenerToTimeSpanBtns() {  // adds click event listener to the time span buttons
        function oneMonthBtnClicked(){
            chartCanvas.style.opacity = '0';
            
            let activeTimeSpan = document.querySelector('.active');
            activeTimeSpan.classList.remove('active');
            oneMonthBtn.classList.add('active');

            setTimeout(()=>{
                updateChart(currentStockName, '1mo');
                chartCanvas.style.opacity = '1';
            },510);
        }
        FastClick.attach(oneMonthBtn);
        oneMonthBtn.addEventListener('click', oneMonthBtnClicked);

        FastClick.attach(threeMonthsBtn);
        function threeMonthsBtnClicked(){
            chartCanvas.style.opacity = '0';

            let activeTimeSpan = document.querySelector('.active');
            activeTimeSpan.classList.remove('active');
            threeMonthsBtn.classList.add('active');

            setTimeout(()=>{
                updateChart(currentStockName, '3mo');
                chartCanvas.style.opacity = '1';
            },510);
        }
        threeMonthsBtn.addEventListener('click',threeMonthsBtnClicked);

        FastClick.attach(oneYearBtn);
        function oneYearBtnClicked(){
            chartCanvas.style.opacity = '0';

            let activeTimeSpan = document.querySelector('.active');
            activeTimeSpan.classList.remove('active');
            oneYearBtn.classList.add('active');

            setTimeout(()=>{
                updateChart(currentStockName, '1y')
                chartCanvas.style.opacity = '1';
            },510);
        }
        oneYearBtn.addEventListener('click', oneYearBtnClicked);

        FastClick.attach(fiveYearsBtn);
        function fiveYearsBtnClicked(){
            chartCanvas.style.opacity = '0';
            
            let activeTimeSpan = document.querySelector('.active');
            activeTimeSpan.classList.remove('active');
            fiveYearsBtn.classList.add('active');

            setTimeout(()=>{
                updateChart(currentStockName, '5y');
                chartCanvas.style.opacity = '1';
            },510);
        }
        fiveYearsBtn.addEventListener('click',fiveYearsBtnClicked);
    }

    function updateSummary(stockName) {    // updates the summary content based on the stock selected
        summBodyElement.style.opacity = '0';
        
        setTimeout(() => {
          let loadingScreenSummary = document.querySelector("#loading-summary");
          if(loadingScreenSummary){
            loadingScreenSummary.remove();
          }
          summBodyElement.innerHTML == "";
          let summ = summaryData.stocksProfileData[0][stockName].summary;
          summBodyElement.innerHTML = summ;
          summBodyElement.style.opacity = '1';
        }, 510);
        
    }

  function fetchAllData(){                // fetches all the data including the list of all stocks, chart data for various timespans and summary data for the stocks
    let chartDataPromise = fetch('https://stocksapi-uhe1.onrender.com/api/stocks/getstocksdata',{method: 'GET'});
    let summaryDataPromise = fetch('https://stocksapi-uhe1.onrender.com/api/stocks/getstocksprofiledata',{method:'GET'});
    let listDataPromise = fetch('https://stocksapi-uhe1.onrender.com/api/stocks/getstockstatsdata' , {method:'GET'});

    chartDataPromise.then((res)=>{
        return res.json();
    }).then((receivedData)=>{
        chartData = receivedData;
        timeSpanOptionsDiv.style.opacity = '1';
        updateChart('AAPL', '5y');
        addEventListenerToTimeSpanBtns();
    }).catch((err)=>{
        console.log('Could Not Fetch Chart Data');
        console.error(err);
    });

    listDataPromise.then((res)=>{
        return res.json();
    }).then((receivedData)=>{
        listData = receivedData;
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
        renderStockList(listData);
    }).catch((err)=>{
        console.log('Could Not Fetch List Data');
        console.error(err);
    });

    summaryDataPromise.then((res)=>{
        return res.json();
    }).then((receivedData)=>{
        summaryData = receivedData;
        summHeaderDiv.style.opacity = '1';
        updateSummary(currentStockName);
    }).catch((err)=>{
        console.log('Could not fetch summary data');
        console.error(err);
    });
  }

  function intro() {                              // Animation at the intro
      let opacityAnimation = new Promise(function(res,rej){
          setTimeout(function(){
              webpageName.style.opacity = '1';
              webLogo.style.opacity = '1';
              return res('opacity 1');
          },100);                                  // 100 milliseconds to ensure that the whole page is loaded. Could have used 'window.onload' event too.
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
                  summSection.style.opacity = '1';
                  listSection.style.opacity = '1';
                  fetchAllData();                       // finally after finishing the intro animations / transitions, the function to fetch data is called
              },1000)
          }).catch(function(err){
              alert('Error encountered while executing animations '+err.message);
          });
      });
  }

  function generateRandomColor(){  // generates random color for the stocks in the stocks' list
    let randomNumber = Math.random();
    let r = Math.floor(randomNumber*360);
    return `hsla(${r},90.2%,38.7%,0.2)`;
  }

  function renderStockList(stocksListObject){
    let stockObject = stocksListObject.stocksStatsData[0];
    for(let stock in stockObject){
        if(stock === '_id'){
            let stockElements = document.querySelectorAll('.stock');
            stockElements.forEach((stockElement)=>{
                stockElement.style.opacity = '1';
            });
            continue;
        }else{
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
            if(stockObject[stock].profit <= 0){
                
                stockProfitDiv.style.backgroundColor = 'rgba(200,30,0,0.09)';
            }
            stockElement.appendChild(stockProfitDiv);

            function stockElementClicked(){
                currentStockName = stockNameDiv.innerHTML;
                updateChart(currentStockName, '5y');
                updateSummary(currentStockName);

                let activeTimeSpanElement = document.querySelector('.active');
                activeTimeSpanElement.classList.remove('active');
                fiveYearsBtn.classList.add('active');

                stockNameOnDisplay.innerHTML = '';                      // update stock name, book value and profit on the summary header according to the stock clicked from the list
                stockNameOnDisplay.innerHTML = currentStockName;
                stockBookValueOnDisplay.innerHTML = '';
                stockBookValueOnDisplay.innerHTML = '$'+stockObject[stock].bookValue.toFixed(3);
                stockProfitValueOnDisplay.innerHTML = '';
                stockProfitValueOnDisplay.innerHTML = '$'+stockObject[stock].profit.toFixed(3);
                if(stockObject[stock].profit == 0){
                    stockProfitValueOnDisplay.style.color = 'rgba(255,0,0,0.76)';
                }else{
                    stockProfitValueOnDisplay.style.color = 'rgba(30,255,30,0.65)';
                }
            }
            FastClick.attach(stockElement);
            stockElement.addEventListener('click', stockElementClicked);
        }
    };
  }

  function main() {                              // Main Function, the entry point of the code
      alert('Please wait for the data to load. At times, this can take upto 30 seconds.');
      window.onload = intro;
  }
  main();