$.get('https://raw.githubusercontent.com/catnoodle/517/master/project2/data/map.geojson', function (usaJson) {

   
    var domChartLeftTop = document.getElementById('leftTop');
    var myChartLT = echarts.init(domChartLeftTop);

    var domChartLeftButtom = document.getElementById('leftButtom');
    var myChartLB = echarts.init(domChartLeftButtom);

    var domMap = document.getElementById('map');
    var myChartM = echarts.init(domMap);

    var year = document.getElementById('year').value;
    var trade = document.getElementById('trade').value;
    

    var HSCode = [
        {from:01, to:05, name: 'Animal & Animal Products'},
        {from:06, to:15, name: 'Vegetable Products'},
        {from:16, to:24, name: 'Foodstuffs'},
        {from:25, to:27, name: 'Mineral Products'},
        {from:28, to:38, name: 'Chemicals & Allied Industries'},
        {from:39, to:40, name: 'Plastics/Rubbers'},
        {from:41, to:43, name: 'Raw Hides,Skins,Leather,&Furs'},
        {from:44, to:49, name: 'Wood&Wood Products'},
        {from:50, to:63, name: 'Textiles'},
        {from:64, to:67, name: 'Footwear/Headgear'},
        {from:68, to:71, name: 'Stone/Glass'},
        {from:72, to:83, name: 'Metals'},
        {from:84, to:85, name: 'Machinery/Electrical'},
        {from:86, to:89, name: 'Transportation'},
        {from:90, to:97, name: 'Miscellaneous'}
    ];
 

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

Array.prototype.contains = function (needle, select) {
    if(!select){
        for (i in this) {
            if (this[i] == needle) return true;
        }
        return false;  
    }
    else{
        for (i in this) {
            if (this[i].name == needle) return true;
        }
        return false;  
    }
  }

//导出国家名字和位置
var allCTCoor = function(data, year){
    var res = [];
    var i = 0;
    if(year == 2013){
        data.forEach(function(dataItem,i){
            if (dataItem.countryd == "World") {
                res.push({
                    name: dataItem.statename,
                    value:dataItem.coor1,
                    symbolSize: dataItem.val2013/25000 +2.5,
                    val:dataItem.val2013,       
                });
                i++;
            }
            else{
                if(dataItem.coor2){
                    var cName = dataItem.countryd;
                    if(!res.contains(cName,1)){    
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
    }
    else if(year == 2014){
        data.forEach(function(dataItem,i){
            if (dataItem.countryd == "World") {
                res.push({
                    name: dataItem.statename,
                    value:dataItem.coor1,
                    symbolSize: dataItem.val2014/25000 +2.5,
                    val:dataItem.val2014,       
                });
                i++;
            }
            else{
                if(dataItem.coor2){
                    var cName = dataItem.countryd;
                    if(!res.contains(cName,1)){    
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
    }
    else if(year == 2015){
        data.forEach(function(dataItem,i){
            if (dataItem.countryd == "World") {
                res.push({
                    name: dataItem.statename,
                    value:dataItem.coor1,
                    symbolSize: dataItem.val2015/25000 +2.5,
                    val:dataItem.val2015,       
                });
                i++;
            }
            else{
                if(dataItem.coor2){
                    var cName = dataItem.countryd;
                    if(!res.contains(cName,1)){    
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
    }
    else if(year == 2016){
        data.forEach(function(dataItem,i){
            if (dataItem.countryd == "World") {
                res.push({
                    name: dataItem.statename,
                    value:dataItem.coor1,
                    symbolSize: dataItem.val2016/25000 +2.5,
                    val:dataItem.val2016,       
                });
                i++;
            }
            else{
                if(dataItem.coor2){
                    var cName = dataItem.countryd;
                    if(!res.contains(cName,1)){    
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
    }
    
    
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
        if(!res.contains(element.countryd,0)&& element.countryd != 'World' && element.countryd !='Top 25'){
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
};
//出口商品分类
var exportCom = function(data){
    var res = [];
    data.forEach(function(dataItem){
        
    });
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
        data:[]
    }]
};
myChartLT.setOption(optionLT);


$.getJSON('https://raw.githubusercontent.com/catnoodle/517/master/project2/data/exportStateHS.json',function(exportHSData){
    var optionLB = {
        title: {
            text: 'Export Commodities',
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
            data:[]
        }]
    };
    myChartLB.setOption(optionLB);
});




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
        selectedMode:'single',
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
            name: 'Export',
            type: 'scatter',
            coordinateSystem: 'geo',
            zlevel: 2,
            
            
          //  silent:true,
            hoverAnimation: true,
            tooltip: {
                emphasis:{
                    show: true,
                    position: 'right',
                    
                }
            },
            
            itemStyle: {
                normal: {
                    
                    color: '#d8e6ff',

                }
            },
            //data: allCTCoor(exportCTData)
            data:[]
            
        }
    ]
    
}
myChartM.setOption(optionMap);



$.getJSON('https://raw.githubusercontent.com/catnoodle/517/master/project2/data/exportStateCT.json',function(exportCTData) {

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
                name:'Export',
                data: allCTCoor(exportCTData,year)
            }]
        });

});

$('input[type=radio][name=year]').on('change',function(){
    year = $(this).val();
    $.getJSON('https://raw.githubusercontent.com/catnoodle/517/master/project2/data/exportStateCT.json').done(function(exportCTData) {
      console.log(allCTCoor(exportCTData,year));
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
                name:'Export',
                data: allCTCoor(exportCTData,year)
            }]
        });
    });
});

$('input[type=radio][name=trade]').on('change',function(){
    trade = $(this).val();
    
});

});
