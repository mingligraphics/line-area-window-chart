<script>
    export let yScale;
    export let width;
    export let yTicks;
    
</script>
    
    <g class='axis y' transform="translate(0 0)">
        {#each yTicks as tick, index }
        <g class='tick' transform="translate(0 {yScale(tick)})">
        <line 
        x1="0" 
        y1="0" 
        x2={width} 
        y2="0" 
        stroke={index === 3 ? "#8f8f8f" : "#e5e7eb"}/>
        <text x={index > 2 ? 6 : 3} y={-5}>{tick * 100}
        {index === yTicks.length - 1 ? " percentage points*" : ""}</text>
        </g> 
        {/each}
        </g>
        
        <style>
        
        </style>