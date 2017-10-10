
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
                    value:dataItem.coor1,
                    symbolSize: dataItem.val2013/50000 +2.5,
                    val2013:dataItem.val2013,       
                });
                i++;
            }
            else{
                if(dataItem.coor2){
                    var cName = dataItem.countryd;
                    if(!res.contains(cName)){    
                        res.push({
                            name: dataItem.countryd,
                            value: dataItem.coor2,
                            symbolSize: 3,
                            itemStyle:{
                                normal:{
                                    color: '#0fb3ff',
                                }}
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
                    symbolSize: dataItem.val2013/50000 +3,
                    val2013:dataItem.val2013,
 
                })
            }
            })
            
            return res;
        };

  

//航线图数据
var path = 'arrow';
var series = [];
    series.push(

    {
        name: 'Trade Lines',
        type: 'lines',
        zlevel: 2,
        silent: true,
        effect: {
            show: true,
            period: 7,
            color: '#69c8ff',
            trailLength: 0.01,
            opacity: 0.05,
            symbol:path,
            symbolSize: 4
        },
              blendMode:'lighter',

        lineStyle: {
            normal: {
                color: '#69c8ff',
                width: 0.05,
                opacity: 0.1,
                curveness: 0.1
            }
        },
        data: convertData(exportCTData)
    },
    {
        name: 'point',
        type: 'effectScatter',
        coordinateSystem: 'geo',
        rippleEffect: {//涟漪特效
            brushType: 'stroke', //波纹绘制方式 stroke, fill
        }, 
        zlevel: 2,
      //  silent:true,
        hoverAnimation: true,
        label: {
            emphasis:{
                show: true,
                position: 'right',
                formatter: '{b}'
            }
        },
showEffectOn:'render',
        itemStyle: {
            normal: {
                color: '#d8e6ff',
                shadowBlur:2,
                shadowColor:'#fff'
            }
        },
        data: allCTCoor(exportCTData)
        
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
    geo: {
        map: 'USA',
        selectedMode:'multiple',
        label: {
            emphasis: {
                show: false
            },

            normal:{
                color:'white',
                position:'right'
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
        }/*
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
        ]   */     
    },
    series: series
};;
if (option && typeof option === "object") {
    myChart.setOption(option, true);
};

myChart.on('click', function (params) {
    if (params.componentType === 'series') {
           
       }
     $(function() {
       $( "#dialog" ).dialog();
     })
           var myChart = echarts.init(document.getElementById('dialog'));
           myChart.setOption({
           title:{
           text: 'Death Percentage in Age Groups',
           textStyle:{
           fontSize: 12,
           fontWeight:'normal',
           fontFamily:'sans-serif',
           color: '#000'
         },
           x:'center',
           y:'bottom'
         },
           tooltip : {
           trigger: 'item',
           formatter: "{a} <br/>{b} : {c} ({d}%)"
           },
           series : [
           {
               type: 'pie',
               radius : '65%',
               center: ['50%', '50%'],
               selectedMode: 'single',
               data:[
                   {value:143,name: '0-10',},
                   {value:48, name: '11-20'},
                   {value:58, name: '21-40'},
                   {value:58, name: '41-60'},
                   {value:91, name: '61-80'},
                   {value:174, name: '>80'}
               ],
           }
       ]
   });
   
   });

});
});