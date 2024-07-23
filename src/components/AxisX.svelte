<script>
    export let xScale;
    export let height;
    export let xTicks;
</script>
    
    <g class='axis x' transform="translate(0 {height})">
    {#each xTicks as tick, index }
    <g class='tick' transform="translate({xScale(tick)} 0)">
    <line x1="0" y1="0" x2="0" y2="6" stroke="hsla(212, 10%, 53%, 1)"/>
    <text x={0}
          y={6}
          dx={-12}
          dy={12}
          dominant-baseline="middle"
          text-anchor={ index===0 ? "start" : "middle"}
          >{tick}</text>
    </g> 
    {/each}
    </g>
    
    <style>
    
    </style>