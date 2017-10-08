
$.get('https://raw.githubusercontent.com/catnoodle/517/master/project2/data/map.geojson', function (usaJson) {
$.getJSON('https://raw.githubusercontent.com/catnoodle/517/master/project2/data/exportStateCT.json', function(exportCTData) {
    var dom = document.getElementById('container');
    var myChart = echarts.init(dom);
    var myChart2 = echarts.init(dom);
    var app = {};

//注册地图 echarts
    echarts.registerMap('USA', usaJson, {}); 

//筛选是否有该名字
    Array.prototype.contains = function ( needle ) {
        for (i in this) {
          if (this[i].name == needle) return true;
        }
        return false;
      }
//导出国家名字和位置
    var allCTCoor = function(data){
        var res = [];
        var i = 0;
        data.forEach(function(dataItem,i){
            if (dataItem.countryd == "World") {
                res.push({
                    name: dataItem.statename,
                    coords: dataItem.coor1        
                });
                i++;
            }
            else{
                if(dataItem.coor2){
                    var cName = dataItem.countryd;
                    if(!res.contains(cName)){    
                        res.push({
                            name: dataItem.countryd,
                            coords: dataItem.coor2
                        })
                        i++;
                    }  
                }
            }
        });
        return res;
    };
//筛选出口的起始点
    var convertData = function (data) {
        var res = [];
        data.forEach(function(dataItem){
            if (dataItem.coor2) {
                res.push({
                    fromName: dataItem.statename,
                    toName: dataItem.countryd,
                    coords: [dataItem.coor1, dataItem.coor2]
                });
            }
        });
        return res;
        };

//筛选要显示的点
    var pointData = function(data){
            var res=[];
            data.forEach(function (dataItem) {
            if(dataItem.countryd == "World"){
                res.push({

                    name:dataItem.statename,
                    value:dataItem.coor1,
                    symbolSize: dataItem.val2013/100000 +5,
                    coords:dataItem.coor1,
 
                })
            }
            })
            return res;
        };
console.log(pointData(exportCTData));
  

//航线图数据
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
        name: {function(param){
            return param.statename+ " to " +param.countryd;
        }},
        type: 'effectScatter',
        coordinateSystem: 'geo',
        zlevel: 3,
        rippleEffect: {
            brushType: 'stroke'
        },
        label: {
            normal: {
                show: false,
                position: 'right',
                formatter: '{b}'
            
            }
        },
        symbolSize: function (val) {
            return val / 100000 + 2;
        },
        itemStyle: {
            normal: {
                color: '#fff',
                shadowBlur:10,
                shadowColor:'#333'
            }
        },
        data: pointData(exportCTData)
        
    }
);

//创建地图
option = {
    backgroundColor: '#404a59',
    title : {
        text: 'US Census Foreign Trade statistics',
        subtext: 'Source: US Cencus',
        sublink: 'http://www.census.gov/popest/data/datasets.html',
        left: 'right',
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
        data:['Export', 'Import'],
        textStyle: {
            color: '#fff'
        },
        selectedMode: 'single'
    },
/*    visualMap: {
        left: 'left',
        textColor:'#fff',
        min: 0,
        max: 3000000,
        inRange: {
            color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
        },
        text:['High','Low'],           // 文本，默认为数值文本
        calculable: true
    },

*/
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
