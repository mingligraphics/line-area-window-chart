<script>
  import data from "./data/difference.json";
  import { scaleLinear } from 'd3-scale';
  import AxisX from "/components/AxisX.svelte";
  import AxisY from "/components/AxisY.svelte";
  import Steps from "/components/Steps.svelte";
  import {draw} from 'svelte/transition';
  import { fade } from 'svelte/transition';

  let initialData = data.filter(d => d.Year < 2052 && d.Year > 1967);;
  const window_C_start_A = 1972;
  const window_C_end_A = 2015;
  const window_C_start_B = 2025;
  const window_C_end_B = 2029;
  const window_O_start = 1975;
  const window_O_end = 2047;
  let data_window_China_A = initialData.filter(d => d.Year < (window_C_end_A + 1) && d.Year > (window_C_start_A - 1));
  let data_window_China_B = initialData.filter(d => d.Year < (window_C_end_B + 1) && d.Year > (window_C_start_B - 1));
  let data_window_Others = initialData.filter(d => d.Year < (window_O_end + 1) && d.Year > (window_O_start - 1));

  let width = 700;
  let height = 550;
  
  $: console.log(outerHeight);

  const margin = {
        top: 54,
        right: 10,
        bottom: 60,
        left: 10
    }
  $: innerWidth = width - margin.left - margin.right;
  let innerHeight = height - margin.top - margin.bottom;

  let xTicks = [1975, 2000, 2025, 2050, 2075, 2100];
  let yTicks = [-0.03, -0.02, -0.01, 0, 0.01, 0.02, 0.03, 0.04, 0.05];
	

  $: xScale = scaleLinear()
		.domain([minX, maxX])
		.range([0, innerWidth]);

	$: yScale = scaleLinear()
		.domain([Math.min.apply(null, yTicks), Math.max.apply(null, yTicks)])
		.range([innerHeight, 0]);

    $: minX = initialData[0].Year;
	  $: maxX = initialData[initialData.length - 1].Year;
	  $: path_China = `M${initialData.map((p) => `${xScale(p.Year)},${yScale(p.China)}`).join('L')}`;
	  $: area_China = `${path_China}L${xScale(maxX)},${yScale(0)}L${xScale(minX)},${yScale(0)}Z`;
    $: path_Others = `M${initialData.map((p) => `${xScale(p.Year)},${yScale(p.Others)}`).join('L')}`;
    $: area_Others = `${path_Others}L${xScale(maxX)},${yScale(0)}L${xScale(minX)},${yScale(0)}Z`;
    $: path_window_C_A = `M${data_window_China_A.map((p) => `${xScale(p.Year)},${yScale(p.China)}`).join('L')}`;
    $: area_window_C_A = `${path_window_C_A}L${xScale(window_C_end_A)},${yScale(0)}L${xScale(window_C_start_A)},${yScale(0)}Z`;
    $: path_window_C_B = `M${data_window_China_B.map((p) => `${xScale(p.Year)},${yScale(p.China)}`).join('L')}`;
    $: area_window_C_B = `${path_window_C_B}L${xScale(window_C_end_B)},${yScale(0)}L${xScale(window_C_start_A)},${yScale(0)}Z`;
    $: path_window_O = `M${data_window_Others.map((p) => `${xScale(p.Year)},${yScale(p.Others)}`).join('L')}`;
    $: area_window_O = `${path_window_O}L${xScale(window_O_end)},${yScale(0)}L${xScale(window_O_start)},${yScale(0)}Z`;

    $:console.log(yScale(0))
let currentStep;

$: outerWidth = 0
$: outerHeight = 0
</script>

<svelte:window bind:outerWidth bind:outerHeight />

<main>
  <section>
<div class="sticky">
<!-- <h1>Difference in growth rate of those of working age compared with the rest of the population, three-year rolling average</h1> -->
<div class="chart-container" bind:clientWidth={width}>
  <svg {width} {height}>
    <g class='inner-chart' transform="translate({margin.left}, {margin.top})">
      <rect
      x="0"
      y={yScale(0)}
      width={innerWidth}
      height={yScale(-0.03) - yScale(0)}
      fill="#EEEFF0"/>
  <AxisX {xScale} width = {innerWidth} height = {innerHeight} {xTicks}/>
  <AxisY {yScale} width = {innerWidth} {yTicks}/>
  {#if currentStep == 3}
    <path class="path-area"
     fill="#F5EEDA"
     opacity=0.5
     d={area_window_O} />
  {/if}
    {#if currentStep == 1}
    <path 
    class="path-area" 
    fill="#C6E8EB"
    opacity=0.5
    d={area_window_C_A} />
    {/if}
    {#if currentStep > 0}
    <path 
    class="path-line"
    fill="none" 
    stroke={"#5AC5C2"}
    stroke-width={2}
    d={path_China} />
    {/if}
    {#if currentStep == 0}
    <path transition:draw={{duration: 1500}}
    class="path-line"
    fill="none" 
    stroke={"#5AC5C2"}
    stroke-width={currentStep == 2 || currentStep == 3? 1.5:2}
    d={path_China} />
    {/if}
    {#if currentStep > 1}
    <path transition:draw={{duration: 1500}}
    class="path-line"
    fill="none"
    stroke="#DFC462"
    stroke-width=2
    d={path_Others} />
    {/if}
    <text
    class = "callouts"
    style="text-transform: uppercase"
    fill="#5AC5C2"
    text-anchor="right"
    x={xScale(1988)}
    y={yScale(0.042)}>
    China
    </text>
    {#if currentStep == 1}
    <text 
    class = "callouts"
    fill="#5AC5C2"
    text-anchor="right"
    x={xScale(1988)}
    y={yScale(0.004)}>
    Demographic window
    </text>
    {/if}
    {#if currentStep > 1}
    <text
    class = "callouts"
    style="text-transform: uppercase"
    fill="#DFC462"
    text-anchor="right"
    x={xScale(2030)}
    y={yScale(0.0095)}>
    Others†
    </text>
    {/if}
    {#if currentStep == 3}
    <text 
    class = "callouts"
    fill="#DFC462"
    text-anchor="right"
    x={xScale(1988)}
    y={yScale(0.004)}>
    Demographic window
    </text>
    {/if}
    <text
    class = "axis-title"
    text-anchor="start"
    x={xScale(1977)}
    y={yScale(-0.018)}>
    *Difference in growth rate of those of working age
    </text>
    <text
    class = "axis-title"
    text-anchor="start"
    x={xScale(1977) + 3}
    y={yScale(-0.021)}>
     compared with the rest of the population,
    </text>
    <text
    class = "axis-title"
    text-anchor="start"
    x={xScale(1977) + 3}
    y={yScale(-0.024)}>
    three-year rolling average
    </text>
    {#if currentStep > 1}
    <text
    class = "axis-title"
    text-anchor="start"
    x={xScale(1977)}
    y={yScale(-0.028)}>
    †Less developed countries excluding China
    </text>
    {/if}
    {#if currentStep == 4}
    <path 
    class="path-area" 
    fill="#C6E8EB"
    opacity=0.5
    d={area_window_C_B} />
    {/if}
    </g>
  </svg>
</div>
</div>
<Steps bind:currentStep/>
</section>
</main>

<style>
    .chart-container {
    height:100%;
    width:100%;
    max-width: 700px;
    display: flex;
    align-items: center;
  }
  .sticky {
    position: sticky;
    z-index: 1;
    height:90vh;
    top:5vh;
    margin-bottom: 1rem;
    display: flex;
    align-items: left;
    justify-content: left;
    /* the three lines above is how a parent center its children */
}
section {
      position: relative;
  }
  
    main {
      max-width: 1200px;
      margin:0 auto;
      /* background-color:#EFEFF0; */
  }
  	.path-line {
		stroke-linejoin: round;
		stroke-linecap: round;
	}
  :global(.tick text, .axis-title){
      fill: #666;
      text-anchor: start;
      font-family: RetinaNarrowLight,  sans-serif;
      font-size: 13px;
      line-height: 15.6px;
    }

  .callouts {
  font-family: Retina, sans-serif;
  font-weight: 500;
  font-size: 18px;
}

/* .title{
  display: flex;
    align-items: start;
} */

/* h1{ 
      color: #333333;
      font-family: Retina, sans-serif;
      font-size: 15px;
      font-weight: 500;
      line-height: 20px;
      margin-bottom: 10px;
      margin-left: 0px;
    } */

    /* .footnote{
    color: #727272;
    font-weight: 300;
    font-family: Retina, sans-serif;
    font-size: 13px;
    line-height: 17px;
    margin-top:10px;
  } */
</style>