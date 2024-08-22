# StockMarketAnalysis

This front-end project utilizes the Chart.js library to create an interactive stock market analysis tool. It fetches stock data from a public API and provides several features for visualizing stock trends.

## Features

- **Responsiveness**: 
  - The webpage is designed to be fully responsive and functional on both desktop and mobile screens.

- **Intro Animations**: 
  - Uses JavaScript's `setTimeout()` function to handle fade-in and fade-out transitions for a smooth user experience.

- **Stock Chart Interactivity**: 
  - **Vertical Line Annotation**: A vertical line highlights the nearest data point to the cursor when hovering over the chart.
  - **Custom Tooltip**: Displays the stock value at the cursor's position with a customized tooltip.

- **Time-Span Options**: 
  - Allows users to select different time spans for the stock chart: 1 month, 3 months, 1 year, and 5 years.

- **Styling**: 
  - The webpage is styled to be visually appealing, with a carefully chosen color scheme for elements and backgrounds.

- **Random Colors for Stock List**: 
  - Assigns random colors (within a specific hue, saturation, and lightness range) to the stock names' backgrounds each time the page loads.

- **Peak and Trough Values**: 
  - Displays the peak and trough values at the bottom of each chart.

- **Profit/Loss Color Coding**: 
  - Background colors for profit values are styled with a reddish hue if the value is less than or equal to 0, and with a greenish hue if positive.
 
## How to use

**Note:** After opening the application, please wait for the data to load. At times, this can take upto 30 seconds
- **Choosing stocks**: Simply click / tap on a stock in the list on the right side (for desktop screens) or at the bottom (for mobile screens). On choosing a stock, the chart and summary would update accordingly.
- **Analysing Chart**: Hover the pointer over the chart to know the value of the selected stock at that point in time. The value is showed in the tooltip. The peak and trough values are present at the bottom of the chart.
- **Choosing Time Span of the Chart**: For desktop screens, the options to choose the time-span would appear below the bottom right corner of the chart. And for mobile screens, the options would appear in the center below the chart. Clicking on any option would update the chart with a fade-out and fade-in transition.
 
  ## Technologies Used

- **HTML**: Used for structuring the content of the webpage.
- **CSS**: Stylesheet used for designing and styling the visual appearance of the webpage.
- **JavaScript**: Used for adding interactivity and dynamic functionality to the webpage.
- **Chart.js**: JavaScript library for creating interactive and customizable charts and graphs.
