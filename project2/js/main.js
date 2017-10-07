
$.get('https://raw.githubusercontent.com/catnoodle/517/master/project2/data/map.geojson', function (usaJson) {
$.getJSON('https://raw.githubusercontent.com/catnoodle/517/master/project2/data/exportStateCT.json', function(exportCTData) {
    var dom = document.getElementById('container');
    var myChart = echarts.init(dom);
    var myChart2 = echarts.init(dom);
    var app = {};


    echarts.registerMap('USA', usaJson, {});

    var convertData = function (data) {
        var res = [];
        data.forEach(function(dataItem){
            if (dataItem.coor2 != 0) {
                res.push({
                    fromName: dataItem.statename,
                    toName: dataItem.countryd,
                    coords: [dataItem.coor1, dataItem.coor2]
                });
            }
        });
        return res;
        };
        
   // console.log(convertData(exportCTData));


var path = 'arrow';
var series = [];
    series.push(


    {
        name: {function(param){
            return param.statename+ " to " +param.countryd;
        }},
        type: 'lines',
        zlevel: 2,
        effect: {
            show: true,
            period: 15,
            color: '#9CE6FE',
            trailLength: 0.01,
            symbol:path,
            symbolSize: 0
        },
        lineStyle: {
            normal: {
                color: 'red',
                width: 0.5,
                opacity: 0.01,
                curveness: 0.1
            }
        },
        blendMode:'lighter',
        data: convertData(exportCTData)
    },
    {
        name:{function(param){
            return param.statename+ " to " +param.countryd;
        }},
        type: 'effectScatter',
        coordinateSystem: 'geo',
        zlevel: 2,
        rippleEffect: {
            brushType: 'stroke'
        },
        label: {
            normal: {
                show: true,
                position: 'right',
                formatter: '{b}'
            }
        },
        
        itemStyle: {
            normal: {
                color: 'red',
                opacity: 0.1
            }
        },
        data: exportCTData.map(function (dataItem) {
            return {
                name: dataItem.statename,
                value: dataItem.val2013
            };
        })
    });


option = {
    backgroundColor: '#404a59',
    title : {
        text: '模拟迁徙',
        subtext: '数据纯属虚构',
        left: 'center',
        textStyle : {
            color: '#fff'
        }
    },
    tooltip : {
        trigger: 'item'
    },
    legend: {
        orient: 'vertical',
        top: 'bottom',
        left: 'right',
        data:['北京 Top10', '上海 Top10', '广州 Top10'],
        textStyle: {
            color: '#fff'
        },
        selectedMode: 'single'
    },
    geo: {
        map: 'USA',
        label: {
            emphasis: {
                show: false
            }
        },
        roam: true,
        itemStyle: {
            normal: {
                areaColor: '#323c48',
                borderColor: '#404a59'
            },
            emphasis: {
                areaColor: '#2a333d'
            }
        },
        regions:[
            {
                name: 'Alabama',
                itemStyle: {
                    normal: {
                        areaColor: 'red',
                        color: 'red'
                    }
                }
            }
        ]        
    },
    series: series
};;
if (option && typeof option === "object") {
    myChart.setOption(option, true);
};


});
});
