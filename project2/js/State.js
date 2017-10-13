$.get('https://raw.githubusercontent.com/catnoodle/517/master/project2/data/map.geojson', function (usaJson) {

   
    var domChartLeftTop = document.getElementById('leftTop');
    var myChartLT = echarts.init(domChartLeftTop);

    var domChartLeftButtom = document.getElementById('leftButtom');
    var myChartLB = echarts.init(domChartLeftButtom);

    var domMap = document.getElementById('map');
    var myChartM = echarts.init(domMap);

    var year = document.getElementById('year');
    var trade = document.getElementById('trade');
    

    
    
       
    $.getJSON('https://raw.githubusercontent.com/catnoodle/517/master/project2/data/exportStateHS.json', function(exportHSData){
       
    });

//注册地图
    echarts.registerMap('USA', usaJson, {});

//筛选年份
    var countCTVal  = function(data, year){
        var res=[];
        if(year == '2013'){
            data.forEach(function(element) {
                res.push({
                    name:element.statename,
                    fromCoor:element.coor1,
                    toCount:element.countryd,
                    toCoor:element.coor2,
                    value:element.val2013,
                    share:element.share13

                });
            });
        }
        else if(year == '2014'){
            data.forEach(function(element) {
                res.push({
                    name:element.statename,
                    fromCoor:element.coor1,
                    toCount:element.countryd,
                    toCoor:element.coor2,
                    value:element.val2014,
                    share:element.share14

                });
            });
        }
        else if(year == '2015'){
            data.forEach(function(element) {
                res.push({
                    name:element.statename,
                    fromCoor:element.coor1,
                    toCount:element.countryd,
                    toCoor:element.coor2,
                    value:element.val2015,
                    share:element.share15

                });
            });
        }
        else if(year == '2016'){
            data.forEach(function(element) {
                res.push({
                    name:element.statename,
                    fromCoor:element.coor1,
                    toCount:element.countryd,
                    toCoor:element.coor2,
                    value:element.val2016,
                    share:element.share16

                });
            });
        }
        return res;
    };

//筛选是否有该名字
Array.prototype.contains = function (needle) {
    for (i in this) {
      if (this[i] == needle) return true;
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
/*
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
*/
//只输出贸易国家名字
var CTNameforAxis = function(dataItem){
    var res = [];
    dataItem.forEach(function(element){
        if(!res.contains(element.countryd)&& element.countryd != 'World' && element.countryd !='Top 25'){
            res.push(element.countryd);
        };     
    });
    return res;
};
//输出贸易国家总额
var exportCTVal = function(dataItem, year){
    var CTname = CTNameforAxis(dataItem);
    var res = [];
    if(year == 2013){
        CTname.forEach(function(element){
            var count = 0;
            dataItem.forEach(function(data){
                if(data.countryd == element){
                    count += data.val2013; 
                }
            });
            res.push({
                name:element,
                value:count.toFixed(2)
            });
        });
    } 
    else if(year == 2014){
        CTname.forEach(function(element){
            var count = 0;
            dataItem.forEach(function(data){
                if(data.countryd == element){
                    count += data.val2014; 
                }
            });
            res.push({
                name:element,
                value:count.toFixed(2)
            });
        });
    }   
    else if(year == 2015){
        CTname.forEach(function(element){
            var count = 0;
            dataItem.forEach(function(data){
                if(data.countryd == element){
                    count += data.val2015; 
                }
            });
            res.push({
                name:element,
                value:count.toFixed(2)
            });
        });
    }  
    else if(year == 2016){
        CTname.forEach(function(element){
            var count = 0;
            dataItem.forEach(function(data){
                if(data.countryd == element){
                    count += data.val2016; 
                }
            });
            res.push({
                name:element,
                value:count.toFixed(2)
            });
        });
    }  
    return res;
}




var optionLT = {
    title: {
        text: 'Export Countries',
        left: 'center',
        textStyle : {
            color: '#000'
        }
    },
    tooltip: {},
    xAxis: {
        axisTick:{
            alignWithLabel: true,
        },
      //  data: CTNameforAxis(exportCTData)
      data:[]
    },
    yAxis: {},
    grid:{x:'15%', y:'15%', width:'75%', top:'10%' },
    dataZoom: [
        {
            type: 'slider',
            xAxisIndex: 0,
            start: 0,
            end: 100
        },
        {
            type: 'inside',
            xAxisIndex: 0,
            start: 0,
            end: 100,
            filterMode: 'none'
        
        },
        {
            type: 'slider',
            yAxisIndex: 0,
            start: 0,
            end: 100
        },
    ],
    series: [{
        name: 'Export',
        type: 'bar',
        //data: exportCTVal(exportCTData,2013)
        data:[]
    }]
};
myChartLT.setOption(optionLT);

var path = 'arrow';
var optionMap = {
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
        }
    },
    series:[
    
        {
            name: 'point',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            zlevel: 2,
            rippleEffect: {//涟漪特效
                brushType: 'stroke', //波纹绘制方式 stroke, fill
            }, 
            
          //  silent:true,
            hoverAnimation: true,
            tooltip: {
                emphasis:{
                    show: true,
                    position: 'right',
                    formatter: function(params){
                        return params.data.name+':'+params.data.val2013;
                    }
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
            //data: allCTCoor(exportCTData)
            data:[]
            
        }
    ]
    
}
myChartM.setOption(optionMap);

$.getJSON('https://raw.githubusercontent.com/catnoodle/517/master/project2/data/exportStateCT.json').done(function(exportCTData) {
    
        myChartLT.setOption({
            xAxis: {
                 data: CTNameforAxis(exportCTData)
            },
            series: [{
                name: 'Export',
                data: exportCTVal(exportCTData,year)
            }]
        });

        myChartM.setOption({
            series:[{
                name:'point',
                data: allCTCoor(exportCTData)
            }]
        });
});

$('input[type=radio][name=year]').on('change',function(){
    year = $(this).val();
    $.getJSON('https://raw.githubusercontent.com/catnoodle/517/master/project2/data/exportStateCT.json').done(function(exportCTData) {
        myChartLT.setOption({
            xAxis: {
                 data: CTNameforAxis(exportCTData)
            },
            series: [{
                name: 'Export',
                data: exportCTVal(exportCTData,year)
            }]
        });
        myChartM.setOption({
            series:[{
                name:'point',
                data: allCTCoor(exportCTData)
            }]
        });
    });
});

$('input[type=radio][name=trade]').on('change',function(){
    trade = $(this).val();
    
});

});
