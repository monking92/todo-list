<template>
    <svg viewBox="0 0 280 200" xmlns="http://www.w3.org/2000/svg">
        <!-- <defs>
        <g id="rect">
            <rect width="120" height="30" fill="#f3667c" />
            <text x="60" y="10" font-size="6" text-anchor="middle" dominant-baseline="middle" fill="white">意向订单量</text>
            <text x="60" y="20" font-size="8" text-anchor="middle" dominant-baseline="middle" fill="white">123</text>
        </g>
        </defs>

        <use width="300" height="150" y="55" xlink:href="#rect" />
        <use width="260" height="150" y="20" xlink:href="#rect" /> -->
        <g v-for="(row, index) of dataList" :key="row.color">
            <rect :x="(280 - maxWidth) / 2 + indent * index" :y="index * (height + gap)" :width="maxWidth - index * indent * 2" :height="height" :fill="row.color" />
            <text x="140" :y="index * (height + gap) + 10" font-size="6" text-anchor="middle" dominant-baseline="middle" fill="white">{{ row.name }}</text>
            <text x="140" :y="index * (height + gap) + 20" font-size="8" text-anchor="middle" dominant-baseline="middle" fill="white">{{ row.count }}</text>
        </g>
        <g v-for="(row, index) of dataList" :key="row.color + '1'">
          <path
              v-if="index < dataList.length - 1"
              :d="'M' + ((280 - maxWidth) / 2 + indent * (index + 0.5)) + ' ' + ((index + 0.5) * height + (index + 1) * gap) + 
                ' h' + -indent + 
                ' v' + (height - 5) +
                ' H' + ((280 - maxWidth) / 2 + indent * (index + 1.5))"
              stroke="#999"
              fill="transparent"
            />
        </g>
    </svg>
</template>

<script>
export default {
    name: 'FunnelCharts',
    data () {
        return {
            height: 30,
            maxWidth: 180,
            indent: 15,
            gap: 5,
            dataList: [
                {
                    name: '意向订单量',
                    count: 67933,
                    color: '#5acb74'
                }, {
                    name: '定金订单量',
                    count: 41505,
                    color: '#fed066'
                }, {
                    name: '签约订单量',
                    count: 6363,
                    color: '#ff7c41'
                }, {
                    name: '开工订单量',
                    count: 6062,
                    color: '#48a1ff'
                }, {
                    name: '支付订单量',
                    count: 4027,
                    color: '#f3667c'
                }
            ]
        }
    }
}
</script>
