/**
 * SIP Visualizer Application Script
 * Computes compound growth curves and renders an interactive HTML5 Canvas graph.
 */

(function () {
  'use strict';

  // DOM Elements
  const monthlySlider = document.getElementById('monthly-slider');
  const rateSlider = document.getElementById('rate-slider');
  const yearsSlider = document.getElementById('years-slider');

  const monthlyDisplay = document.getElementById('monthly-display');
  const rateDisplay = document.getElementById('rate-display');
  const yearsDisplay = document.getElementById('years-display');

  const metricInvested = document.getElementById('metric-invested');
  const metricReturns = document.getElementById('metric-returns');
  const metricTotal = document.getElementById('metric-total');

  const ratioInvested = document.getElementById('ratio-invested');
  const ratioReturns = document.getElementById('ratio-returns');
  const pctInvested = document.getElementById('pct-invested');
  const pctReturns = document.getElementById('pct-returns');

  const milestonesRow = document.getElementById('milestones-row');
  const chartCanvas = document.getElementById('sip-chart');
  const chartContainer = document.getElementById('chart-container');
  const tooltip = document.getElementById('chart-tooltip');
  const tooltipYear = document.getElementById('tooltip-year');
  const tooltipInvested = document.getElementById('tooltip-invested');
  const tooltipWealth = document.getElementById('tooltip-wealth');

  let currentHoverYear = null;

  /**
   * Format numbers to Indian Rupee notation (e.g., ₹ 1,50,000)
   */
  function formatINR(val) {
    const rounded = Math.round(val);
    return '₹ ' + rounded.toLocaleString('en-IN');
  }

  /**
   * Calculate SIP wealth growth for a given duration
   * Formula: M = P * (( (1 + i)^n - 1 ) / i) * (1 + i)
   */
  function calculateSIP(monthly, annualRate, years) {
    const months = years * 12;
    const i = annualRate / 12 / 100;
    const invested = monthly * months;

    let total = 0;
    if (i === 0) {
      total = invested;
    } else {
      total = monthly * ((Math.pow(1 + i, months) - 1) / i) * (1 + i);
    }

    const returns = Math.max(0, total - invested);
    return { invested, returns, total };
  }

  /**
   * Generate yearly time-series points
   */
  function generateTimeSeries(monthly, annualRate, maxYears) {
    const points = [];
    for (let yr = 0; yr <= maxYears; yr++) {
      if (yr === 0) {
        points.push({ year: 0, invested: 0, total: 0 });
      } else {
        const res = calculateSIP(monthly, annualRate, yr);
        points.push({ year: yr, invested: res.invested, total: res.total });
      }
    }
    return points;
  }

  /**
   * Draw the interactive Canvas graph
   */
  function drawChart(timeSeries, hoverYear) {
    if (!chartCanvas) return;

    const ctx = chartCanvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = chartContainer.getBoundingClientRect();

    chartCanvas.width = rect.width * dpr;
    chartCanvas.height = rect.height * dpr;

    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = rect.height;

    // Padding for axes
    const padLeft = 65;
    const padRight = 20;
    const padTop = 25;
    const padBottom = 35;

    const plotW = w - padLeft - padRight;
    const plotH = h - padTop - padBottom;

    ctx.clearRect(0, 0, w, h);

    if (timeSeries.length < 2) return;

    const maxYear = timeSeries[timeSeries.length - 1].year;
    const maxVal = timeSeries[timeSeries.length - 1].total * 1.08;

    // Horizontal grid lines
    const gridLines = 4;
    ctx.strokeStyle = '#262626';
    ctx.lineWidth = 1;
    ctx.fillStyle = '#737373';
    ctx.font = '11px monospace';
    ctx.textAlign = 'right';

    for (let g = 0; g <= gridLines; g++) {
      const val = (maxVal / gridLines) * g;
      const y = padTop + plotH - (val / maxVal) * plotH;

      ctx.beginPath();
      ctx.moveTo(padLeft, y);
      ctx.lineTo(w - padRight, y);
      ctx.stroke();

      // Label in Lakhs / Crores
      let label = '';
      if (val >= 10000000) {
        label = (val / 10000000).toFixed(1) + ' Cr';
      } else if (val >= 100000) {
        label = (val / 100000).toFixed(1) + ' L';
      } else {
        label = (val / 1000).toFixed(0) + ' k';
      }
      ctx.fillText(label, padLeft - 8, y + 4);
    }

    // X Axis labels
    ctx.textAlign = 'center';
    const xStep = Math.max(1, Math.round(maxYear / 6));
    for (let yr = 0; yr <= maxYear; yr += xStep) {
      const x = padLeft + (yr / maxYear) * plotW;
      ctx.fillText('Y' + yr, x, h - 12);
    }

    // Coordinates helpers
    const getX = (yr) => padLeft + (yr / maxYear) * plotW;
    const getY = (val) => padTop + plotH - (val / maxVal) * plotH;

    // 1. Draw Total Wealth Area Fill (White/Accent Gradient)
    const wealthGrad = ctx.createLinearGradient(0, padTop, 0, padTop + plotH);
    wealthGrad.addColorStop(0, 'rgba(255, 255, 255, 0.22)');
    wealthGrad.addColorStop(1, 'rgba(255, 255, 255, 0.01)');

    ctx.beginPath();
    ctx.moveTo(getX(0), getY(0));
    timeSeries.forEach((pt) => ctx.lineTo(getX(pt.year), getY(pt.total)));
    ctx.lineTo(getX(maxYear), padTop + plotH);
    ctx.lineTo(getX(0), padTop + plotH);
    ctx.closePath();
    ctx.fillStyle = wealthGrad;
    ctx.fill();

    // 2. Draw Invested Area Fill (Subtle Slate Gradient)
    const investGrad = ctx.createLinearGradient(0, padTop, 0, padTop + plotH);
    investGrad.addColorStop(0, 'rgba(82, 82, 82, 0.4)');
    investGrad.addColorStop(1, 'rgba(82, 82, 82, 0.05)');

    ctx.beginPath();
    ctx.moveTo(getX(0), getY(0));
    timeSeries.forEach((pt) => ctx.lineTo(getX(pt.year), getY(pt.invested)));
    ctx.lineTo(getX(maxYear), padTop + plotH);
    ctx.lineTo(getX(0), padTop + plotH);
    ctx.closePath();
    ctx.fillStyle = investGrad;
    ctx.fill();

    // 3. Draw Invested Capital Line
    ctx.beginPath();
    ctx.strokeStyle = '#525252';
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 4]);
    timeSeries.forEach((pt, idx) => {
      const x = getX(pt.year);
      const y = getY(pt.invested);
      if (idx === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();
    ctx.setLineDash([]);

    // 4. Draw Total Wealth Line
    ctx.beginPath();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2.5;
    timeSeries.forEach((pt, idx) => {
      const x = getX(pt.year);
      const y = getY(pt.total);
      if (idx === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    // 5. Draw Interactive Hover Scrubber
    if (hoverYear !== null && hoverYear >= 0 && hoverYear <= maxYear) {
      const pt = timeSeries[hoverYear];
      if (pt) {
        const hoverX = getX(pt.year);
        const wealthY = getY(pt.total);
        const investedY = getY(pt.invested);

        // Vertical scrubber line
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.lineWidth = 1;
        ctx.moveTo(hoverX, padTop);
        ctx.lineTo(hoverX, padTop + plotH);
        ctx.stroke();

        // Highlight dot for invested
        ctx.beginPath();
        ctx.fillStyle = '#a1a1a1';
        ctx.arc(hoverX, investedY, 4, 0, Math.PI * 2);
        ctx.fill();

        // Highlight dot for total wealth
        ctx.beginPath();
        ctx.fillStyle = '#ffffff';
        ctx.arc(hoverX, wealthY, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#000000';
        ctx.stroke();
      }
    }
  }

  /**
   * Render milestone summary cards (e.g. Year 1, 3, 5, 10, End)
   */
  function renderMilestones(timeSeries) {
    if (!milestonesRow) return;
    milestonesRow.innerHTML = '';

    const maxYear = timeSeries[timeSeries.length - 1].year;
    const intervals = [1, 3, 5, 10, 15, 20, 25, 30, 35].filter((y) => y <= maxYear);
    if (!intervals.includes(maxYear) && maxYear > 0) {
      intervals.push(maxYear);
    }

    intervals.forEach((yr) => {
      const pt = timeSeries[yr];
      if (!pt) return;

      const pill = document.createElement('div');
      pill.className = 'milestone-pill';
      pill.innerHTML = `
        <div class="milestone-year">Year ${yr}</div>
        <div class="milestone-value">${formatINR(pt.total)}</div>
      `;
      milestonesRow.appendChild(pill);
    });
  }

  /**
   * Update calculation and refresh interface
   */
  function updateVisualizer() {
    const monthly = parseFloat(monthlySlider.value);
    const rate = parseFloat(rateSlider.value);
    const years = parseInt(yearsSlider.value, 10);

    // Update displays
    monthlyDisplay.textContent = formatINR(monthly);
    rateDisplay.textContent = rate + '%';
    yearsDisplay.textContent = years + (years === 1 ? ' Year' : ' Years');

    // Run core calculation
    const result = calculateSIP(monthly, rate, years);

    metricInvested.textContent = formatINR(result.invested);
    metricReturns.textContent = formatINR(result.returns);
    metricTotal.textContent = formatINR(result.total);

    // Update ratio bar
    const total = result.total > 0 ? result.total : 1;
    const investedPct = Math.min(100, Math.max(0, Math.round((result.invested / total) * 100)));
    const returnsPct = 100 - investedPct;

    ratioInvested.style.width = investedPct + '%';
    ratioReturns.style.width = returnsPct + '%';
    pctInvested.textContent = investedPct + '%';
    pctReturns.textContent = returnsPct + '%';

    // Time-series and chart
    const series = generateTimeSeries(monthly, rate, years);
    drawChart(series, currentHoverYear);
    renderMilestones(series);
  }

  /**
   * Handle mouse hover / touch events on canvas
   */
  function handleChartHover(e) {
    const rect = chartContainer.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const x = clientX - rect.left;
    const padLeft = 65;
    const padRight = 20;
    const plotW = rect.width - padLeft - padRight;

    const years = parseInt(yearsSlider.value, 10);
    const monthly = parseFloat(monthlySlider.value);
    const rate = parseFloat(rateSlider.value);

    if (x < padLeft || x > rect.width - padRight) {
      hideTooltip();
      return;
    }

    const relX = Math.max(0, Math.min(1, (x - padLeft) / plotW));
    const closestYear = Math.round(relX * years);

    currentHoverYear = closestYear;
    const series = generateTimeSeries(monthly, rate, years);
    drawChart(series, currentHoverYear);

    const pt = series[closestYear];
    if (pt) {
      tooltip.hidden = false;
      tooltipYear.textContent = 'Year ' + pt.year;
      tooltipInvested.textContent = formatINR(pt.invested);
      tooltipWealth.textContent = formatINR(pt.total);

      // Position tooltip clamped within container
      const tipX = Math.max(60, Math.min(rect.width - 60, x));
      tooltip.style.left = tipX + 'px';
      tooltip.style.top = Math.max(30, clientY - rect.top - 10) + 'px';
    }
  }

  function hideTooltip() {
    tooltip.hidden = true;
    currentHoverYear = null;
    const monthly = parseFloat(monthlySlider.value);
    const rate = parseFloat(rateSlider.value);
    const years = parseInt(yearsSlider.value, 10);
    const series = generateTimeSeries(monthly, rate, years);
    drawChart(series, null);
  }

  // Event Listeners
  [monthlySlider, rateSlider, yearsSlider].forEach((slider) => {
    slider.addEventListener('input', updateVisualizer);
    slider.addEventListener('change', updateVisualizer);
  });

  chartContainer.addEventListener('mousemove', handleChartHover);
  chartContainer.addEventListener('mouseleave', hideTooltip);

  chartContainer.addEventListener('touchstart', handleChartHover, { passive: true });
  chartContainer.addEventListener('touchmove', handleChartHover, { passive: true });
  chartContainer.addEventListener('touchend', hideTooltip);

  window.addEventListener('resize', () => {
    const monthly = parseFloat(monthlySlider.value);
    const rate = parseFloat(rateSlider.value);
    const years = parseInt(yearsSlider.value, 10);
    const series = generateTimeSeries(monthly, rate, years);
    drawChart(series, currentHoverYear);
  });

  // Initial calculation
  updateVisualizer();
})();
