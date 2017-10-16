$.get('https://raw.githubusercontent.com/catnoodle/517/master/project2/data/map.geojson', function (usaJson) {

    $.get('https://raw.githubusercontent.com/catnoodle/517/master/project2/data/USA.json', function (USAJson) {
    
        echarts.registerMap('usa', USAJson, {
            Alaska: {              // 把阿拉斯加移到美国主大陆左下方
                left: -131,
                top: 25,
                width: 15
            },
            Hawaii: {
                left: -110,        // 夏威夷
                top: 28,
                width: 5
            },
            'Puerto Rico': {       // 波多黎各
                left: -76,
                top: 26,
                width: 2
            }
        });

   
    var domChartLeftTop = document.getElementById('leftTop');
    var myChartLT = echarts.init(domChartLeftTop);

    var domChartLeftButtom = document.getElementById('leftButtom');
    var myChartLB = echarts.init(domChartLeftButtom);

    var domMap = document.getElementById('mapUp');
    var myChartM = echarts.init(domMap);

    var domMapDown = document.getElementById('mapDown');
    var myChartMD = echarts.init(domMapDown);

    var domChartRightTop = document.getElementById('rightTop');
    var myChartRT = echarts.init(domChartRightTop);

    var domChartRightButtom = document.getElementById('rightButtom');
    var myChartRB = echarts.init(domChartRightButtom);

    var year = document.getElementById('year').value;
    var trade = document.getElementById('trade').value;
    
    $.ajaxSettings.async=false;
    var CTData,HSData,chartTitleName;
    $.getJSON('https://raw.githubusercontent.com/catnoodle/517/master/project2/data/exportStateHS.json',function(exportHSData){
        HSData = exportHSData;
    });   
    $.getJSON('https://raw.githubusercontent.com/catnoodle/517/master/project2/data/exportStateCT.json',function(exportCTData){
        CTData = exportCTData;
    });
    chartTitleName = "Export";

    var HSCode = [
        {from:1, to:5, name: 'Animal & Animal Products'},
        {from:6, to:15, name: 'Vegetable Products'},
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
Array.prototype.contains = function (needle, select) {
    if(select == 0){
        for (i in this) {
            if (this[i] == needle) return true;
        }
        return false;  
    }
    else if(select == 1){
        for (i in this) {
            if (this[i].name == needle) return true;
        }
        return false;  
    }
    else if(select == 2){
        for (i in this) {
            if (this[i].statename == needle) return true;
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
//只输出贸易商品名称
var HSNameforAxis = function(dataItem,select){
    var res = [];
    if(!select){
        dataItem.forEach(function(element){
            res.push(element.name);
        });
    }
    else{
        dataItem.forEach(function(element){
            if(element.rank != 0){
                res.push(element.abbreviatn);
            }
        });
    }
    return res;
}

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
//取数字前两位
var cutNumber = function(data){
    var number = data.toString();
    if(number.length < 6){
        number = number.slice(0,1);
    }
    else {
        number = number.slice(0,2);
    }
    return parseInt(number);
}
//进出口商品分类
var exportCom = function(data,year,select){
    var res = [];
    if(!select){
        if(year == 2013){
            HSCode.forEach(function(dataItem){
                var count = 0;
                data.forEach(function(element){
                    if(dataItem.rank != 0){
                        var number = cutNumber(element.hs6);
                    // var number = parseInt(element.hs6.toString().slice(0,2));
                        if(dataItem.from <= number && number<= dataItem.to){
                            count = count + element.val2013;
                        }
                        
                    }
                }); 
                res.push({
                    name:dataItem.name,
                    value:count.toFixed(2)
                });
        });
        }
        else if(year == 2014){
            HSCode.forEach(function(dataItem){
                var count = 0;
                data.forEach(function(element){
                    if(dataItem.rank != 0){
                        var number = cutNumber(element.hs6);
                    // var number = parseInt(element.hs6.toString().slice(0,2));
                        if(dataItem.from <= number && number<= dataItem.to){
                            count = count + element.val2014;
                        }
                        
                    }
                }); 
                res.push({
                    name:dataItem.name,
                    value:count.toFixed(2)
                });
        });
        }
        else if(year == 2015){
            HSCode.forEach(function(dataItem){
                var count = 0;
                data.forEach(function(element){
                    if(dataItem.rank != 0){
                        var number = cutNumber(element.hs6);
                    // var number = parseInt(element.hs6.toString().slice(0,2));
                        if(dataItem.from <= number && number<= dataItem.to){
                            count = count + element.val2015;
                        }
                        
                    }
                }); 
                res.push({
                    name:dataItem.name,
                    value:count.toFixed(2)
                });
        });
        }
        else if(year == 2016){
            HSCode.forEach(function(dataItem){
                var count = 0;
                data.forEach(function(element){
                    if(dataItem.rank != 0){
                        var number = cutNumber(element.hs6);
                    // var number = parseInt(element.hs6.toString().slice(0,2));
                        if(dataItem.from <= number && number<= dataItem.to){
                            count = count + element.val2016;
                        }
                        
                    }
                }); 
                res.push({
                    name:dataItem.name,
                    value:count.toFixed(2)
                });
        });
        }
    }
    else {
        if(year == 2013){
            data.forEach(function(element){
                if(element.rank != 0){
                    res.push({
                        name:element.abbreviatnname,
                        value:element.val2013
                    });
                }
            }); 
        }
        else if(year == 2014){
            data.forEach(function(element){
                if(element.rank != 0){
                    res.push({
                        name:element.abbreviatnname,
                        value:element.val2014
                    });
                }
            }); 
        }
        else if(year == 2015){
            data.forEach(function(element){
                if(element.rank != 0){
                    res.push({
                        name:element.abbreviatnname,
                        value:element.val2015
                    });
                }
            }); 
        }
        else if(year == 2016){
            data.forEach(function(element){
                if(element.rank != 0){
                    res.push({
                        name:element.abbreviatnname,
                        value:element.val2016
                    });
                }
            }); 
        }
    }
    return res;
}
//地域颜色
var areaColorValue = function(data,year){
    var res = [];
    if(year == 2013){
        data.forEach(function(dataItem){
            if(dataItem.countryd == "World"){
                res.push({
                    name:dataItem.statename,
                    value:dataItem.val2013
                });
            }
        });
    }
    else if(year == 2014){
        data.forEach(function(dataItem){
            if(dataItem.countryd == "World"){
                res.push({
                    name:dataItem.statename,
                    value:dataItem.val2014
                });
            }
        });
    }
    else if(year == 2015){
        data.forEach(function(dataItem){
            if(dataItem.countryd == "World"){
                res.push({
                    name:dataItem.statename,
                    value:dataItem.val2015
                });
            }
        });
    }
    else if(year == 2016){
        data.forEach(function(dataItem){
            if(dataItem.countryd == "World"){
                res.push({
                    name:dataItem.statename,
                    value:dataItem.val2016
                });
            }
        });
    }
    return res;
}


//左上overview
var optionLT = {
    title: {
        text: chartTitleName+'('+ year +')'+' Countries',
        left: 'center',
        textStyle : {
            color: '#000'
        }
    },
    tooltip: {
        formatter : function (params) {
            return "US "+params.seriesName+"("+year+")" +' Countries'+ '<br/>' + params.name + ' : $' + params.value+'M';
        }
    },
    xAxis: {
        axisTick:{
            alignWithLabel: true,
        },
      data:CTNameforAxis(CTData)
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
        name: chartTitleName,
        type: 'bar',
        data:exportCTVal(CTData,year)
    }]
};
myChartLT.setOption(optionLT);

//左下overview
var optionLB = {
        title: {
            text: chartTitleName+'('+ year +')'+' Commodities',
            left: 'center',
            textStyle : {
                color: '#000'
            }
        },
        tooltip: {  
            position: function (pos, params, dom, rect, size) {
                // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
                console.log(pos);
                var obj = {top:pos[1]};
                obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
                return obj;
            },
            formatter : function (params) {
                return "US "+params.seriesName+"("+year+")"+ ' Commodities' + '<br/>' + params.name + ' : $' + params.value+'M';
            }
        },
        xAxis: {
            axisTick:{
                alignWithLabel: true,
            },
          data:HSNameforAxis(HSCode,0)
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
            name: chartTitleName,
            type: 'bar',
            data:exportCom(HSData,year,0)
        }]
    };
myChartLB.setOption(optionLB);

//画出地图

var optionMap = {
    backgroundColor: '#404a59',
    title : { 
        text: 'Trade Route Map',
        left: 'right',
        textStyle : {
            color: '#fff',
            fontSize:12
        }
    },
    toolbox: {
        show : true,
        orient : 'vertical',
        left: 'right',
        top: 'center',
        feature : {
            mark : {show: true},
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    tooltip : {
        trigger: 'item',
        formatter : function (params) {
            return params.name;
        }
    },  
    geo: {
        map: 'USA',
        roam: true,
        selectedMode:'single',
        center:[0,15],
        zoom:0,
        scaleLimit:{
            min:1.2,
            max:100
        },
        //silent: true,  
        itemStyle:{
            normal:{
                areaColor: '#323c48',
                borderColor: '#404a59'
            },
            emphasis:{
                borderColor: '#fff',
                //color:'rgba(128, 128, 128, 1)',
                areaColor: '#323c48',
                opacity:'0.5',
                label:{show:true}
            }
        },
    },
    series:[
        {
            name: chartTitleName + ' effect',
            type: 'lines',
            zlevel: 1,
            effect: {
                show: true,
                period: 6,
                trailLength: 0.7,
                color: '#fff',
                symbolSize: 3
            },
            lineStyle: {
                normal: {
                    color: 'red',
                    width: 0,
                    curveness: 0.2
                }
            },
            data:[]
        },
        {
            name: chartTitleName + ' partners',
            type: 'lines',
            zlevel: 2,
            symbol: ['none', 'arrow'],
            symbolSize: 10,
            effect: {
                show: true,
                period: 6,
                trailLength: 0,
                //symbol: planePath,
                symbolSize: 15
            },
            lineStyle: {
                normal: {
                    color: 'red',
                    width: 1,
                    opacity: 0.6,
                    curveness: 0.2
                }
            },
            data: []
        },

    ]  
}
myChartM.setOption(optionMap);

var path = 'arrow';
var optionMD = {
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
    visualMap: {
        left: 'left',
        min: 0,
        max: 300000,
        inRange: {
            color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
        },
        text:['High','Low'],
        textStyle:{
            color:"red"
        },           // 文本，默认为数值文本
        calculable: true   
    },
    toolbox: {
        show : true,
        orient : 'vertical',
        left: 'right',
        top: 'center',
        feature : {
            mark : {show: true},
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    tooltip : {
        trigger: 'item',
        formatter : function (params) {
            return "US "+params.seriesName+"("+year+")" +' States' + '<br/>' + params.name + ' : $' + params.value+'M';
        }
    },  
    geo: {
        map: 'usa',
        roam: true,
        selectedMode:'single',
        center:[-100,39],
        zoom:0,
        scaleLimit:{
            min:-1,
            max:4
        },
        itemStyle:{
            normal:{
                areaColor: '#323c48',
                borderColor: '#404a59',
                borderWidth: 1
            },
            emphasis:{
                borderColor: '#fff',
                areaColor: '#323c48',
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowBlur: 20,
                opacity:'0.5',
                label:{show:false}
            }
        },
        label:false
    },
    series:[
        {
            name: chartTitleName,
            type: 'map',
            geoIndex: 0,
            data:areaColorValue(CTData,year)
        }
    ]
};
myChartMD.setOption(optionMD);


var mapClickFunction = function(params){ 
    console.log(params.name);
    var CTres = CTData.filter(function(data){return data.statename == params.name});
    var HSres = HSData.filter(function(data){return data.statename == params.name});

    var optionRT = {
        title: {
            text: params.name+" Top25 "+chartTitleName+'('+ year +')'+' Countries',
            left: 'center',
            textStyle : {
                color: '#000',
                fontSize: 12
            }
        },
        tooltip: {
            formatter : function (params2) {
                return params.name+" "+params2.seriesName+"("+year+")" +' Countries'+ '<br/>' + params2.name + ' : $' + params2.value+'M';
            }
        },
        xAxis: {
            axisTick:{
                alignWithLabel: true,
            },
          data:CTNameforAxis(CTres)
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
            name: chartTitleName,
            type: 'bar',
            data:exportCTVal(CTres,year)
        }]
    }
    myChartRT.setOption(optionRT);

    var optionRB = {
        title: {
            text: params.name+" Top25 "+chartTitleName+'('+ year +')'+' Commodities',
            left: 'center',
            textStyle : {
                color: '#000',
                fontSize: 12
            }
        },
        tooltip: {  
            position: function (pos, params, dom, rect, size) {
                // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
                console.log(pos);
                var obj = {top:pos[1]};
                obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
                return obj;
            },
            formatter : function (params2) {
                return params.name+" "+params2.seriesName+"("+year+")"+ ' Commodities' + '<br/>' + params2.name + ' : $' + params2.value+'M';
            }
        },
        xAxis: {
            axisTick:{
                alignWithLabel: true,
            },
          data:HSNameforAxis(HSres,1)
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
            name: chartTitleName,
            type: 'bar',
            data:exportCom(HSres,year,1)
        }]
    }
    myChartRB.setOption(optionRB);

    myChartM.setOption({
        geo:{
            center:[0,15],
            zoom:0,
            scaleLimit:{
                min:1.2,
                max:100
            }
        },

        series:[
        {
            name: chartTitleName + ' effect',
            data: convertData(CTData.filter(function(d){return d.statename==params.name;}))
        },
        {
            name: chartTitleName + ' partners',
            data: convertData(CTData.filter(function(d){return d.statename==params.name;}))
        }
    ]
    });
    console.log(convertData(CTData.filter(function(d){return d.statename==params.name;})));
};

var mapClick = function(){
    myChartMD.on('click',function(params){
       return mapClickFunction(params);
    });
};

mapClick();

var setUpCharts = function(){
    myChartLT.setOption({
        title: {
            text: chartTitleName+'('+ year +')'+' Countries',
        },
        xAxis: {
            data: CTNameforAxis(CTData)
        },
        series: [{
            name: chartTitleName,
            data: exportCTVal(CTData,year)
        }]
    });
         
    myChartMD.setOption({
        series:[{
            name:chartTitleName,
            data: areaColorValue(CTData,year)
        }]
    });
    
    myChartLB.setOption({
        title: {
            text: chartTitleName+'('+ year +')'+' Commodities',
        },
        xAxis: {
            
            data:HSNameforAxis(HSCode,0)
        },
        series: [{
            name: chartTitleName,
            type: 'bar',
            data:exportCom(HSData,year,0)
        }]
    });
};


$('input[type=radio][name=trade]').on('change',function(){
    trade = $(this).val();
    if(trade == "Export"){
        $.getJSON('https://raw.githubusercontent.com/catnoodle/517/master/project2/data/exportStateHS.json',function(exportHSData){
            HSData = exportHSData;
        });   
        $.getJSON('https://raw.githubusercontent.com/catnoodle/517/master/project2/data/exportStateCT.json',function(exportCTData){
            CTData = exportCTData;
        });
        chartTitleName = "Export";
    }
    else if(trade == "Import"){
        $.getJSON('https://raw.githubusercontent.com/catnoodle/517/master/project2/data/importStateHS.json',function(importHSData){
            HSData = importHSData;
        });   
        $.getJSON('https://raw.githubusercontent.com/catnoodle/517/master/project2/data/importStateCT.json',function(importCTData){
            CTData = importCTData;
        });
        chartTitleName = "Import";
    }
    setUpCharts();
    mapClick();
});
  
$('input[type=radio][name=year]').on('change',function(){
    year = $(this).val();
    setUpCharts();
    mapClick();
});




});
});
