$.get('https://raw.githubusercontent.com/catnoodle/517/master/project2/data/map.geojson', function (usaJson) {
$.get('https://raw.githubusercontent.com/catnoodle/517/master/project2/data/USA.json', function (USAJson) {
       
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

    var domWorldMap = document.getElementById('worldMap');
    var myChartWM = echarts.init(domWorldMap);

    var domUSMap = document.getElementById('USMap');
    var myChartUSM = echarts.init(domUSMap);

    var domUSChart = document.getElementById('USChart');
    var myChartUSC = echarts.init(domUSChart);

    var year = document.getElementById('year').value;
    var trade = document.getElementById('trade').value;

    var yearB = document.getElementById('yearB').value;
    var tradeB = document.getElementById('tradeB').value;
    
    $.ajaxSettings.async=false;
    var CTData,HSData,chartTitleName,mapChange,mapChangeforWorldMap,CTDataB,chartTitleNameB;
    var exportCTData,exportHSData,importCTData,importHSData;
    $.getJSON('https://raw.githubusercontent.com/catnoodle/517/master/project2/data/exportStateHS.json',function(data){
        exportHSData = data;
    });   
    $.getJSON('https://raw.githubusercontent.com/catnoodle/517/master/project2/data/exportStateCT.json',function(data){
        exportCTData = data;
    });
    $.getJSON('https://raw.githubusercontent.com/catnoodle/517/master/project2/data/importStateHS.json',function(data){
        importHSData = data;
    });   
    $.getJSON('https://raw.githubusercontent.com/catnoodle/517/master/project2/data/importStateCT.json',function(data){
        importCTData = data;
    });
    chartTitleName = "Export";
    chartTitleNameB = "Export";
    CTData = exportCTData;
    HSData = exportHSData;
    CTDataB = importCTData;

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
    echarts.registerMap('usa', USAJson, {
        Alaska: {              // 把阿拉斯加移到美国主大陆左下方
            left: -131,
            top: 25,
            width: 15
        },
        Hawaii: {
            left: -110,        // 夏威夷
            top: 26,
            width: 5
        },
        'Puerto Rico': {       // 波多黎各
            left: -76,
            top: 26,
            width: 2
        },
        'Virgin Islands': {
            left: -73,
            top: 25,
            width: 1
        }
    });

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
//筛选进出口的起始点
var convertData = function (data,select,year) {
    var res = [];
    if(select == "Export"){
        if(year == 2013){
            data.forEach(function(dataItem){
                if (dataItem.coor2) {
                    res.push({
                        fromName: dataItem.statename,
                        toName: dataItem.countryd,
                        coords: [dataItem.coor1, dataItem.coor2],
                        lineStyle:{
                            normal:{
                                width:0//dataItem.val2013/1000+1,
                            }
                        }
                    });
                }
            });
        }
        else if(year == 2014){
            data.forEach(function(dataItem){
                if (dataItem.coor2) {
                    res.push({
                        fromName: dataItem.statename,
                        toName: dataItem.countryd,
                        coords: [dataItem.coor1, dataItem.coor2],
                        lineStyle:{
                            normal:{
                                width:0//dataItem.val2014/1000+1,
                            }
                        }
                    });
                }
            });
        }
        else if(year == 2015){
            data.forEach(function(dataItem){
                if (dataItem.coor2) {
                    res.push({
                        fromName: dataItem.statename,
                        toName: dataItem.countryd,
                        coords: [dataItem.coor1, dataItem.coor2],
                        lineStyle:{
                            normal:{
                                width:0//dataItem.val2015/1000+1,
                            }
                        }
                    });
                }
            });
        }
        else if(year == 2016){
            data.forEach(function(dataItem){
                if (dataItem.coor2) {
                    res.push({
                        fromName: dataItem.statename,
                        toName: dataItem.countryd,
                        coords: [dataItem.coor1, dataItem.coor2],
                        lineStyle:{
                            normal:{
                                width:0//dataItem.val2016/1000+1,
                            }
                        }
                    });
                }
            });
        }
    }
    else if(select == "Import"){
        if(year == 2013){
            data.forEach(function(dataItem){
                if (dataItem.coor2) {
                    res.push({
                        fromName: dataItem.countryd,
                        toName: dataItem.statename,
                        coords: [dataItem.coor2, dataItem.coor1],
                        lineStyle:{
                            normal:{
                                width:0,
                            }
                        }
                    });
                }
            });
        }
        else if(year == 2014){
            data.forEach(function(dataItem){
                if (dataItem.coor2) {
                    res.push({
                        fromName: dataItem.countryd,
                        toName: dataItem.statename,
                        coords: [dataItem.coor2, dataItem.coor1],
                        lineStyle:{
                            normal:{
                                width:0,
                            }
                        }
                    });
                }
            });
        }
        else if(year == 2015){
            data.forEach(function(dataItem){
                if (dataItem.coor2) {
                    res.push({
                        fromName: dataItem.countryd,
                        toName: dataItem.statename,
                        coords: [dataItem.coor2, dataItem.coor1],
                        lineStyle:{
                            normal:{
                                width:0,
                            }
                        }
                    });
                }
            });
        }
        else if(year == 2016){
            data.forEach(function(dataItem){
                if (dataItem.coor2) {
                    res.push({
                        fromName: dataItem.countryd,
                        toName: dataItem.statename,
                        coords: [dataItem.coor2, dataItem.coor1],
                        lineStyle:{
                            normal:{
                                width:0,
                            }
                        }
                    });
                }
            });
        }
        
    }
    
    return res;
};
//筛选要显示的点
var pointData = function(data,year){
    var res=[];
    if(year == 2013){
        data.forEach(function (dataItem) {
            if(dataItem.rank != 0){
                res.push({
                    name:dataItem.countryd,
                    value:dataItem.coor2,
                    symbolSize: dataItem.val2013/5000 +6,
                    tradeValue: dataItem.val2013,
                    itemStyle: {
                        normal:{
                            color:'#00b4ff',
                            borderColor:'#68d3ff',
                            borderWidth:1
                        }
                    }
                })
            }
        })
    }
    else if(year == 2014){
        data.forEach(function (dataItem) {
            if(dataItem.rank != 0){
                res.push({
                    name:dataItem.countryd,
                    value:dataItem.coor2,
                    symbolSize: dataItem.val2014/5000 +6,
                    tradeValue: dataItem.val2014,
                    itemStyle: {
                        normal:{
                            color:'#00b4ff',
                            borderColor:'#68d3ff',
                            borderWidth:1
                        }
                    }
                })
            }
        })
    }
    else if(year == 2015){
        data.forEach(function (dataItem) {
            if(dataItem.rank != 0){
                res.push({
                    name:dataItem.countryd,
                    value:dataItem.coor2,
                    symbolSize: dataItem.val2015/5000 +6,
                    tradeValue: dataItem.val2015,
                    itemStyle: {
                        normal:{
                            color:'#00b4ff',
                            borderColor:'#68d3ff',
                            borderWidth:1
                        }
                    }
                })
            }
        })
    }
    else if(year == 2016){
        data.forEach(function (dataItem) {
            if(dataItem.rank != 0){
                res.push({
                    name:dataItem.countryd,
                    value:dataItem.coor2,
                    symbolSize: dataItem.val2016/5000 +6,
                    tradeValue: dataItem.val2016,
                    itemStyle: {
                        normal:{
                            color:'#00b4ff',
                            borderColor:'#68d3ff',
                            borderWidth:1
                        }
                    }
                })
            }
        })
    }
    return res;
};

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

//输出贸易国家总额 & 世界区域颜色
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
            if(count.toFixed(2) != 0){
                res.push({
                    name:element,
                    value:count.toFixed(2)
                });
            }
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
            if(count.toFixed(2) != 0){
                res.push({
                    name:element,
                    value:count.toFixed(2)
                });
            }
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
            if(count.toFixed(2) != 0){
                res.push({
                    name:element,
                    value:count.toFixed(2)
                });
            }
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
            if(count.toFixed(2) != 0){
                res.push({
                    name:element,
                    value:count.toFixed(2)
                });
            }
            
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

//输出HScode单一目录下的各项总值
var HSCount = function(data,year){
    var res = HSCode.filter(function(d){return d.name == data});
    var count = 0;
    var res2 = [];
    if(year == 2013){
        HSData.forEach(function(d){
            var number = cutNumber(d.hs6);
            if(res[0].from<=number&&number<=res[0].to){
                if(!res2.contains(d.abbreviatn,1)){
                    res2.push({
                        name:d.abbreviatn,
                        value:d.val2013,
                        state:d.statename,
                        HS6:d.hs6
                    });
                }
                else {
                    res2.forEach(function(d2){
                        if(d2.name == d.abbreviatn){
                            d2.value = parseFloat(parseFloat(d2.value + d.val2013).toFixed(2));
                            d2.state = d2.state +',' + d.statename;
                        }
                    });
                }
            }
            
        });
    }
    else if(year == 2014){
        HSData.forEach(function(d){
            var number = cutNumber(d.hs6);
            if(res[0].from<=number&&number<=res[0].to){
                if(!res2.contains(d.abbreviatn,1)){
                    res2.push({
                        name:d.abbreviatn,
                        value:d.val2014,
                        state:d.statename,
                        HS6:d.hs6
                    });
                }
                else {
                    res2.forEach(function(d2){
                        if(d2.name == d.abbreviatn){
                            d2.value = parseFloat(parseFloat(d2.value + d.val2014).toFixed(2));
                            d2.state = d2.state +',' + d.statename;
                        }
                    });
                }
            }
            
        });
    }
    else if(year == 2015){
        HSData.forEach(function(d){
            var number = cutNumber(d.hs6);
            if(res[0].from<=number&&number<=res[0].to){
                if(!res2.contains(d.abbreviatn,1)){
                    res2.push({
                        name:d.abbreviatn,
                        value:d.val2015,
                        state:d.statename,
                        HS6:d.hs6
                    });
                }
                else {
                    res2.forEach(function(d2){
                        if(d2.name == d.abbreviatn){
                            d2.value = parseFloat(parseFloat(d2.value + d.val2015).toFixed(2));
                            d2.state = d2.state +',' + d.statename;
                        }
                    });
                }
            }
            
        });
    }
    else if(year == 2016){
        HSData.forEach(function(d){
            var number = cutNumber(d.hs6);
            if(res[0].from<=number&&number<=res[0].to){
                if(!res2.contains(d.abbreviatn,1)){
                    res2.push({
                        name:d.abbreviatn,
                        value:d.val2016,
                        state:d.statename,
                        HS6:d.hs6
                    });
                }
                else {
                    res2.forEach(function(d2){
                        if(d2.name == d.abbreviatn){
                            d2.value = parseFloat(parseFloat(d2.value + d.val2016).toFixed(2));
                            d2.state = d2.state +',' + d.statename;
                        }
                    });
                }
            }
        });
    }
    return res2;
}
//要高亮的地图是哪些
var mapSelect = function(data,select){
    var res = [];
    if(select == 'all'){
        var dataGroup = HSCount(data,year);
        dataGroup.forEach(function(dataItem){
            var res2 = dataItem.state.split(',');
            res2.forEach(function(element){
                if(!res.contains(element,1)){
                    res.push({
                        name:element,
                        itemStyle: {
                            normal: {
                               
                                    borderColor: '#fff',
                                    areaColor: '#323c48',
                                    shadowOffsetX: 0,
                                    shadowOffsetY: 0,
                                    shadowBlur: 20,
                                    opacity:'0.6',
                                    label:{show:false}
                                
                            }
                        }
                    });
                }
            });
        });
    }
    else{
        HSData.forEach(function(dataItem){
            if(dataItem.abbreviatn == data)
            res.push({
                hsName:data,
                name:dataItem.statename,
                itemStyle: {
                    normal: {
                        borderColor: '#fff',
                        areaColor: '#323c48',
                        shadowOffsetX: 0,
                        shadowOffsetY: 0,
                        shadowBlur: 20,
                        opacity:'0.6',
                        label:{show:false}
                    }
                }
            }); 
        });
    }
    
    return res;
}
//只输出跟某国有贸易的美国州数据
var CTStateforChart = function(data){
    var CTName = CTStateforAxis(data);
    var res =[];
    if(yearB == 2013){
        CTName.forEach(function(element){
            data.forEach(function(dataItem){
                if(dataItem.statename==element && dataItem.val2013 != 0){
                    res.push({
                        name: dataItem.statename,
                        value:dataItem.val2013
                    });
                } 
            }); 
        });
    }
    else if(yearB == 2014){
        CTName.forEach(function(element){
            data.forEach(function(dataItem){
                if(dataItem.statename==element && dataItem.val2014 != 0){
                    res.push({
                        name: dataItem.statename,
                        value:dataItem.val2014
                    });
                } 
            }); 
        });
    }
    else if(yearB == 2015){
        CTName.forEach(function(element){
            data.forEach(function(dataItem){
                if(dataItem.statename==element && dataItem.val2015 != 0){
                    res.push({
                        name: dataItem.statename,
                        value:dataItem.val2015
                    });
                } 
            }); 
        });
    }
    else if(yearB == 2016){
        CTName.forEach(function(element){
            data.forEach(function(dataItem){
                if(dataItem.statename==element && dataItem.val2016 != 0){
                    res.push({
                        name: dataItem.statename,
                        value:dataItem.val2016
                    });
                } 
            }); 
        });
    }
    return res;
}
//只输出跟某国有贸易的美国州名字
var CTStateforAxis = function(dataItem){
    var res = [];
    if(yearB == 2013){
        dataItem.forEach(function(element){
            if(!res.contains(element.countryd,0) && element.val2013 != 0){
                res.push(element.statename);
            };     
        });
    }
    else if(yearB == 2014){
        dataItem.forEach(function(element){
            if(!res.contains(element.countryd,0) && element.val2014 != 0){
                res.push(element.statename);
            };     
        });
    }
    else if(yearB == 2015){
        dataItem.forEach(function(element){
            if(!res.contains(element.countryd,0) && element.val2015 != 0){
                res.push(element.statename);
            };     
        });
    }
    else if(yearB == 2016){
        dataItem.forEach(function(element){
            if(!res.contains(element.countryd,0) && element.val2016 != 0){
                res.push(element.statename);
            };     
        });
    }
    return res;
};
//高亮跟某国有贸易的美国州
var stateSelect = function(data){
    var res = [];
    if(yearB == 2013){
        data.forEach(function(dataItem){
            if(dataItem.val2013 != 0){
                res.push({
                    name:dataItem.statename,
                    itemStyle: {
                        normal: {
                            borderColor: '#fff',
                            shadowOffsetX: 0,
                            shadowOffsetY: 0,
                            shadowBlur: 10,
                            opacity:'0.5',
                            label:{show:false}
                        }
                    }
                });
            }
        });
    }
    else if(yearB == 2014){
        data.forEach(function(dataItem){
            if(dataItem.val2014 != 0){
                res.push({
                    name:dataItem.statename,
                    itemStyle: {
                        normal: {
                            borderColor: '#fff',
                            shadowOffsetX: 0,
                            shadowOffsetY: 0,
                            shadowBlur: 10,
                            opacity:'0.5',
                            label:{show:false}
                        }
                    }
                });
            }
        });
    }
    else if(yearB == 2015){
        data.forEach(function(dataItem){
            if(dataItem.val2015 != 0){
                res.push({
                    name:dataItem.statename,
                    itemStyle: {
                        normal: {
                            borderColor: '#fff',
                            shadowOffsetX: 0,
                            shadowOffsetY: 0,
                            shadowBlur: 10,
                            opacity:'0.5',
                            label:{show:false}
                        }
                    }
                });
            }
        });
    }
    else if(yearB == 2016){
        data.forEach(function(dataItem){
            if(dataItem.val2016 != 0){
                res.push({
                    name:dataItem.statename,
                    itemStyle: {
                        normal: {
                            borderColor: '#fff',
                            shadowOffsetX: 0,
                            shadowOffsetY: 0,
                            shadowBlur: 10,
                            opacity:'0.5',
                            label:{show:false}
                        }
                    }
                });
            }
        });
    }
    
    return res;
}
//输出某国贸易的美国州颜色
var areaColorValueforForeign = function(data){
    var res = [];
    if(yearB == 2013){
        data.forEach(function(dataItem){
            if(dataItem.val2013 != 0){
                res.push({
                    name:dataItem.statename,
                    value:dataItem.val2013
                });
            }
        });
    }
    else if(yearB == 2014){
        data.forEach(function(dataItem){
            if(dataItem.val2014 != 0){
                res.push({
                    name:dataItem.statename,
                    value:dataItem.val2014
                });
            }
        });
    }
    else if(yearB == 2015){
        data.forEach(function(dataItem){
            if(dataItem.val2015 != 0){
                res.push({
                    name:dataItem.statename,
                    value:dataItem.val2015
                });
            }
        });
    }
    else if(yearB == 2016){
        data.forEach(function(dataItem){
            if(dataItem.val2016 != 0){
                res.push({
                    name:dataItem.statename,
                    value:dataItem.val2016
                });
            }
        });
    }
    return res;
}
//高亮跟这个州有贸易的国家
var countrySelect = function(data){
    var res = pointData(CTData.filter(function(d){return d.statename==mapChange.name;}),year);
    res.forEach(function(dataItem){
        
        if(dataItem.name == data){
            console.log(dataItem);
            dataItem.itemStyle.normal.color = '#ff1e00';
            dataItem.itemStyle.normal.borderColor = '#ff1e00';
            dataItem.itemStyle.normal.borderWidth = 6;
            dataItem.itemStyle.normal.opacity = 0.6;

        }
    });
    return res;
}

//左上overview
var optionLT = {
    
    title: {
        itemGap:70,

        subtext:' '+year,
        subtextStyle:{ 
        color: '#f2f2f2',
        fontSize: 70,
        fontWeight:'bold',
        fontFamily:'sans-serif',
        },

        z:1,
        text: 'The U.S. '+chartTitleName+ ' Statistics',
        left: 'center',
        textStyle : {
            color: '#000000',
            fontSize: 12,
            fontWeight:'normal',
            fontFamily:'sans-serif',
          
        },
        x:'center',
        y:'top'
    },
    toolbox: {
        show : true,
        itemSize:12,
        //orient : 'vertical',
        right: 4,
        top: 'top',
        feature : {
            saveAsImage:{show:true, title:"Save View"},
            restore : {show: true,title:"Reset"},
        },
        iconStyle:{
        normal:{opacity:0.5},
        emphasis:{opacity:1}
        }
    },
    tooltip: {
      
        position: function (pos, params, dom, rect, size) {
            // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
            var obj = {top:pos[1]};
            obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
            return obj;
        },
        formatter : function (params) {
            return "U.S. "+params.seriesName+'('+year+')'+' with ' + '<br/>' + params.name + ': $' + params.value+'M';
        }
    },
    xAxis: {
       
        axisTick:{
            alignWithLabel: true,
        },
      data:CTNameforAxis(CTData)
    },
    yAxis: {z:2},
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
        itemStyle:{
            emphasis:{
                color:'#eb5a5a'
            }
        },
        cursor:'default',
        z:2,
        data:exportCTVal(CTData,year)
    }]
};
myChartLT.setOption(optionLT);

//左下overview
var optionLB = {
        title: {
            z:1,
            itemGap:70,
            
                    subtext:' '+year,
                    subtextStyle:{ 
                    color: '#f2f2f2',
                    fontSize: 70,
                    fontWeight:'bold',
                    fontFamily:'sans-serif',
                    },

            text: 'Commodities '+chartTitleName + ' Statistics',
            left: 'center',
            textStyle : {
                fontSize:12,
                color: '#000'
            }
        },
        toolbox: {
            show : true,
            itemSize:12,
            //orient : 'vertical',
            right: 4,
            top: 'top',
            iconStyle:{
                normal:{opacity:0.5},
                emphasis:{opacity:1}
                },
            feature : {
                myTool1: {
                    show: false,
                    title: 'Back',
                    icon: 'path://M547 1652 l-547 -547 552 -552 c439 -439 555 -550 566 -541 11 9 -94 119 -515 540 l-528 528 1548 0 c1540 0 1547 0 1547 20 0 20 -7 20 -1547 20 l-1548 0 528 528 c416 416 525 530 515 540 -6 6 -14 12 -18 12 -3 0 -252 -246 -553 -548z',
                    onclick: function(){
                        myChartLB.setOption({
                            title: {
                                text: 'Commodities '+chartTitleName+ ' Statistics',
                                subtext:' '+year,
                            },
                            toolbox: {
                                feature : {
                                    myTool1 : {show: false},
                                }
                            },
                            xAxis: {
                                
                                data:HSNameforAxis(HSCode,0)
                            },
                            series: [
                                {
                                    name: chartTitleName,
                                    type: 'bar',
                                    data:exportCom(HSData,year,0)
                                },
                                {
                                    name:chartTitleName+"details",
                                    type: 'bar',
                                    itemStyle:{
                                        normal:{
                                            color:'#eb8223'
                                        },
                                        emphasis:{
                                            color:'#ff9637'
                                        }
                                    },
                                    data:[]
                                    
                                }
                            ]
                        });
                        myChartMD.setOption({
                            geo:{
                                regions: []
                            }  
                        }); 
                    }
                },
                saveAsImage:{show:true, title:"Save View"},
                restore : {show: true,title:"Reset"}
            }
        },
        tooltip: {  
            position: function (pos, params, dom, rect, size) {
                // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
                var obj = {top:pos[1]+8};
                obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
                return obj;
            },
            formatter : function (params) {
                return "U.S. "+params.seriesName+"("+year+")"+ ' Commodities' + '<br/>' +' of '+ params.name + ' :' + '<br/>'+'$'+ params.value+'M';
            }
        },
        xAxis: {
            axisTick:{
                alignWithLabel: true,
            },
          data:HSNameforAxis(HSCode,0)
        },
        yAxis: {z:2},
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
            z:2,
            name: chartTitleName,
            type: 'bar',
            itemStyle:{
                emphasis:{
                    color:'#eb5a5a'
                }
            },
            data:exportCom(HSData,year,0)
        },{
            name: chartTitleName+"details",
            type:'bar',
            itemStyle:{
                normal:{
                    color:'#eb8223'
                },
                emphasis:{
                    color:'#ff9637'
                }
            },
            data:[]
        }
        ]
    };
myChartLB.setOption(optionLB);

//世界地图
var planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';
var optionMap = {
    backgroundColor: '#475160',
    title : { 
        text: 'Trade Route Map',
        left: 'left',
        textStyle : {
            color: '#fff',
            fontSize:12
        }
    },
    toolbox: {
        show : true,
        itemStyle:12,
       // orient : 'vertical',
        left: 'right',
        top: 'top',
        iconStyle:{
            normal:{borderColor:'#969696',opacity:1},
            emphasis:{opacity:1}
        },
        feature : {
            saveAsImage : {show: false, title:"Save View"},
            restore : {show: true,title:"Reset"}
        }
    },
    tooltip : {
        show: true,
        trigger: 'item',
        formatter : function (params) {
            return params.name;
        }
       
    },  
    geo: {
        map: 'USA',
        roam: true,
        center:[0,15],
        zoom:0,
        scaleLimit:{
            min:1.2,
            max:100
        },
        //silent: true,
        label:{
        emphasis:{color:'#ffffff'}
        }, 
        itemStyle:{
            normal:{
                areaColor: '#323c48',
                borderColor: '#4f5968'
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
    },
    series:[
        {
            name: chartTitleName + ' effect',
            type: 'lines',
            zlevel: 1,
            effect: {
                show: true,
                period: 7,
                trailLength: 0.2,
                symbolSize: 2
            },
            lineStyle: {
                normal: {
                    color: '#67d2ff',
                    width: 0,
                    curveness: 0.1
                }
            },
            data:[]
        },
        {
            name: chartTitleName + ' partners',
            type: 'lines',
            zlevel: 2,
            symbolSize: 3,
            effect: {
                symbol:planePath,
                show: true,
                period: 7,
                trailLength: 0,
                symbolSize: 10
            },
            lineStyle: {
                normal: {
                    color: '#ebfaff',
                    width: 0,
                    opacity: 0.6,
                    curveness: 0.1
                }
            },
            data: []
        },
        {
            name: chartTitleName + ' points',
            type: 'scatter',
            coordinateSystem: 'geo',
            zlevel: 2,
            label: {
                normal: {
                    show: false
                },
                emphasis: {
                    show: false
                }
            },
            tooltip : {
                show: true,
                trigger: 'item',
                formatter : function (params) {
                    return mapChange.name+" "+chartTitleName+"("+year+")"+ ' with' + '<br/>' + params.name + ': ' +'$'+ params.data.tradeValue+'M';
                }
            },
            itemStyle: {
                emphasis: {
                    borderColor: '#fff',
                    color:'#ff1e00',
                    borderWidth: 1
                }
            },
            data: []
        },

    ]  
}
myChartM.setOption(optionMap);

//美国地图
var path = 'arrow';
var optionMD = {
    backgroundColor: '#475160',
    title : { 
        text: 'The U.S. Census Foreign Trade Statistics',
        subtext: 'Source: U.S. Cencus',
        sublink: 'https://www.census.gov/foreign-trade/statistics/state/data/index.html',
        left: 'left',
        itemGap:6,
        textStyle : {
            color: '#fff',
            fontSize:12
        }
    },
    visualMap: {
        left: 'left',
        min: 0,
        max: 300000,
        inRange: {
            color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#c73730', '#a50026']
        },
        text:['High','Low'],
        textStyle:{
            color:"#fff"
        },         
        calculable: true   
    },
    toolbox: {
        show : true,
        itemStyle:12,
       // orient : 'vertical',
        left: 'right',
        top: 'top',
        iconStyle:{
            normal:{borderColor:'#969696',opacity:1},
            emphasis:{opacity:1}
        },
        feature : {
            saveAsImage : {show: true, title:"Save View"},
            restore : {show: true,title:"Reset"}
        }
    },
    tooltip : {
        trigger: 'item',
        formatter : function (params) {
            return params.name + ' ' +params.seriesName+"("+year+")"+ '<br/>'+'$' + params.value+'M';
        }
    },  
    geo: {
        map: 'usa',
        roam: true,
        selectedMode:'single',
        center:[-105,38.5],
        zoom:0,
        scaleLimit:{
            min:-1,
            max:30
        },

        itemStyle:{
            normal:{
                borderColor: '#222c3c',
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
        regions: [],
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

//世界地图2
var optionWorldMap = {
    backgroundColor: '#475160',
    title : { 
        text: 'World Trade with U.S. Statistics',
        itemGap:6,
        subtext: 'Source: U.S. Cencus',
        sublink: 'https://www.census.gov/foreign-trade/statistics/state/data/index.html',
        left: 'left',
        textStyle : {
            color: '#fff',
            fontSize:12
        }
    },
    visualMap: {
        left: 'left',
        min: 0,
        max: 300000,
        inRange: {
            color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#c73730', '#a50026']
        },
        text:['High','Low'],
        textStyle:{
            color:"#fff"
        },         
        calculable: true   
    },
    toolbox: {
        show : true,
        itemStyle:12,
       // orient : 'vertical',
        left: 'right',
        top: 'top',
        iconStyle:{
            normal:{borderColor:'#969696',opacity:1},
            emphasis:{opacity:1}
        },
        feature : {
            saveAsImage : {show: true, title:"Save View"},
            restore : {
                show: true,
                title:"Reset",
                restore : {
                    show: true,
                    title:"Reset",
                    onclick:function(){
                        mapChangeforWorldMap = null;
                        myChartUSM.setOption({
                            geo:{
                                regions: []
                            },
                            series:[
                                {
                                    name: chartTitleNameB,
                                    data:[]
                                }
                            ]
                        });
                    }
                },
        },
      
        }
    },
    tooltip : {
        trigger: 'item',
        formatter : function (params) {
            if(params.value){
                return params.name +' '+params.seriesName+'('+yearB+')'+ '<br/>' +  '$' + params.value+'M';
            }
            else{
                return  params.name + ' is not a partner'+ '<br/>' +' of U.S. in this trade' ;
            }
        }
    },  
    geo: {
        map: 'USA',
        roam: true,
        selectedMode:'single',
        center:[0,20],
        zoom:0,
        scaleLimit:{
            min:1.2,
            max:100
        },
        //silent: true,  
        itemStyle:{
            normal:{
                areaColor: '#323c48',
                borderColor: '#353a43'
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
            name: chartTitleNameB,
            type: 'map',
            geoIndex: 0,
            data:exportCTVal(CTDataB,yearB)
        }
    ]
}
myChartWM.setOption(optionWorldMap);

//美国地图2
var optionUSMap = {
    backgroundColor: '#475160',
    title : { 
        text: 'Foreign Country Trade with U.S. Statistics',
        subtext: 'Source: U.S. Cencus',
        sublink: 'https://www.census.gov/foreign-trade/statistics/state/data/index.html',
        left: 'left',
        itemGap:6,
        textStyle : {
            color: '#fff',
            fontSize:12
        }
    },
    visualMap: {
        left: 'left',
        min: 0,
        max: 100000,
        inRange: {
            color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#c73730', '#a50026']
        },
        text:['High','Low'],
        textStyle:{
            color:"#fff"
        },         
        calculable: true   
    },
    toolbox: {
        show : true,
        itemStyle:12,
       // orient : 'vertical',
        left: 'right',
        top: 'top',
        iconStyle:{
            normal:{borderColor:'#969696',opacity:1},
            emphasis:{opacity:1}
        },
        feature : {
            saveAsImage : {show: true, title:"Save View"},
            restore : {show: true,title:"Reset"}
        }
    },
    tooltip : {
        trigger: 'item',
        formatter : function (params) {
            return params.seriesName+"("+yearB+") with "+'<br/>' + params.name +': $' + params.value+'M';
        }
    },  
    geo: {
        map: 'usa',
        roam: true,
        center:[-103,38],
        zoom:1.1,
        scaleLimit:{
            min:-1,
            max:30
        },
        itemStyle:{
            normal:{
                areaColor: '#323c48',
                borderColor: '#222c3c',
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
        regions: [],
        label:false
    },
    series:[
        {
            name: chartTitleNameB,
            type: 'map',
            geoIndex: 0,
            data:[]
        }
    ]
};
myChartUSM.setOption(optionUSMap);

//第二页表

var worldMapClickFunction = function(params){ 
    var CTres = CTDataB.filter(function(data){return data.countryd == params.name});
    var optionUSChart = {
        title: {
            z:1,
            itemGap:70,
            
                    subtext:' '+yearB,
                    subtextStyle:{ 
                    color: '#f2f2f2',
                    fontSize: 70,
                    fontWeight:'bold',
                    fontFamily:'sans-serif',
                    },        
            text: params.name+" "+chartTitleNameB+'('+ yearB +')'+' with U.S.',
            left: 'center',
            textStyle : {
                color: '#000',
                fontSize: 12
            }
        },
        toolbox: {
            show : true,
            itemSize:12,
            //orient : 'vertical',
            right: 4,
            top: 'top',
            feature : {
                saveAsImage:{show:true, title:"Save View"},
                restore : {show: true,title:"Reset"},
            },
            iconStyle:{
            normal:{opacity:0.5},
            emphasis:{opacity:1}
            }
        },
        tooltip: {
            formatter : function (params2) {
                return params.name+" "+params2.seriesName+"("+yearB+")" +' with'+ '<br/>' + params2.name + ' : $' + params2.value+'M';
            }
        },
        xAxis: {
            axisTick:{
                alignWithLabel: true,
            },
          data:CTStateforAxis(CTres)
        },
        yAxis: {z:2},
        grid:{x:'10%', y:'20%', width:'80%', top:'10%' },
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
            z:2,
            itemStyle:{
                emphasis:{
                    color:'#eb5a5a'
                }
            },
            name: chartTitleNameB,
            type: 'bar',
            cursor:'default',
            data:CTStateforChart(CTres)
        }]
    }
    myChartUSC.setOption(optionUSChart);

    myChartUSM.setOption({
        title : { 
            text: params.name + ' Trade with U.S. Statistics',
        },
        geo:{
            regions: []
        } ,
        series:[
            {
                name: chartTitleNameB,
                type: 'map',
                geoIndex: 0,
                data:areaColorValueforForeign(CTres)
            }
        ]
    });
};

//Right top

var mapClickFunction = function(params){ 
    var CTres = CTData.filter(function(data){return data.statename == params.name});
    var HSres = HSData.filter(function(data){return data.statename == params.name});
    
    var optionRT = {
        title: {
            itemGap:70,
            
            subtext:' '+year,
            subtextStyle:{ 
            color: '#f2f2f2',
            fontSize: 70,
            fontWeight:'bold',
            fontFamily:'sans-serif',
            },
            z:1,
            text: params.name+" Top25 "+chartTitleName+' Countries',
            left: 'center',
            textStyle : {
                color: '#000',
                fontSize: 12
            }
        },
        toolbox: {
            show : true,
            itemSize:12,
            //orient : 'vertical',
            right: 4,
            top: 'top',
            feature : {
                saveAsImage:{show:true, title:"Save View"},
                restore : {show: true,title:"Reset"},
            },
            iconStyle:{
            normal:{opacity:0.5},
            emphasis:{opacity:1}
            }
        },
        tooltip: {
            formatter : function (params2) {
                return params.name+" "+params2.seriesName+'('+year+')' +' with'+ '<br/>' + params2.name + ': $' + params2.value+'M';
            }
        },
        xAxis: {
            axisTick:{
                alignWithLabel: true,
            },
          data:CTNameforAxis(CTres)
        },
        yAxis: {z:2},
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
            z:2,
            name: chartTitleName,
            type: 'bar',
            cursor:'default',
            itemStyle:{
                normal:{
                    color:'#327dc3'
                },
                emphasis:{
                    color:'#5aa5eb'
                }
            },
            data:exportCTVal(CTres,year)
        }]
    }
    myChartRT.setOption(optionRT);

//Right bottom

    var optionRB = {
        title: {
            itemGap:70,
            
            subtext:' '+year,
            subtextStyle:{ 
            color: '#f2f2f2',
            fontSize: 70,
            fontWeight:'bold',
            fontFamily:'sans-serif',
            },
            z:1,
            text: params.name+" Top25 "+chartTitleName+' Commodities',
            left: 'center',
            textStyle : {
                color: '#000',
                fontSize: 12
            }
        },
        toolbox: {
            show : true,
            itemSize:12,
            //orient : 'vertical',
            right: 4,
            top: 'top',
            feature : {
                saveAsImage:{show:true, title:"Save View"},
                restore : {show: true,title:"Reset"},
            },
            iconStyle:{
            normal:{opacity:0.5},
            emphasis:{opacity:1}
            }
        },
        tooltip: {  
            position: function (pos, params, dom, rect, size) {
                // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
                var obj = {top:pos[1]};
                obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
                return obj;
            },
            formatter : function (params2) {
                return params.name+" "+params2.seriesName+"("+year+")"+ ' Commodities of' + '<br/>' + params2.name + ':' + '<br/>'+'$'+ params2.value+'M';
            }
        },
        xAxis: {
            axisTick:{
                alignWithLabel: true,
            },
          data:HSNameforAxis(HSres,1)
        },
        yAxis: {z:2},
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
            z:2,
            name: chartTitleName,
            type: 'bar',
            cursor:'default',
            itemStyle:{
                normal:{
                    color:'#327dc3'
                },
                emphasis:{
                    color:'#5aa5eb'
                }
            },
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
            data: convertData(CTData.filter(function(d){return d.statename==params.name;}),chartTitleName,year)
        },
        {
            name: chartTitleName + ' partners',
            data: convertData(CTData.filter(function(d){return d.statename==params.name;}),chartTitleName,year)
        },
        {
            name: chartTitleName + ' points',
            data: pointData(CTData.filter(function(d){return d.statename==params.name;}),year)
        }
    ]
    });
};

var mapClick = function(){
    myChartMD.on('click',function(params){
        mapChange = params;
       return mapClickFunction(mapChange);
    });
};
mapClick();

var worldMapClick = function(){
    myChartWM.on('click',function(params){
        mapChangeforWorldMap = params;
       return worldMapClickFunction(mapChangeforWorldMap);
    });
};
worldMapClick();

var chartLBFunction = function(){
    myChartLB.on('click', function(params){    
        if(HSCode.contains(params.name,1)){
            myChartLB.setOption({
                title: {
                    text:params.name+' '+chartTitleName,
                    subtext: ' '+year,
                    subtextStyle:{ 
                    color: '#f2f2f2',
                    fontSize: 70,
                    fontWeight:'bold',
                    fontFamily:'sans-serif',
                    },
                },
                toolbox: {
                    feature : {
                        myTool1 : {show: true},
                    }
                },
                xAxis: {
                    data:HSNameforAxis(HSCount(params.name,year),0)
                },
                series: [
                    {
                        name: chartTitleName,
                        type: 'bar',
                        data:[]
                    },
                    {
                        name:chartTitleName+"details",
                        type: 'bar',
                        data:HSCount(params.name,year)
                        
                    }
                ]
            });
            myChartMD.setOption({
                geo:{
                    regions: mapSelect(params.name,'all')
                }  
            });  
        }
        else{
            myChartMD.setOption({
                geo:{
                    regions: mapSelect(params.name)
                }  
            }); 
            
        }
    });
}

chartLBFunction();

myChartRT.on('mouseover', function(params){
    myChartM.setOption({
        series:[
            {
                name: chartTitleName + ' points',
                data: countrySelect(params.name)
            }
        ]
    });
});

myChartRT.on('mouseout', function(){
    myChartM.setOption({
        series:[
            {
                name: chartTitleName + ' points',
                data: pointData(CTData.filter(function(d){return d.statename==mapChange.name;}),year)
            }
        ]
    });
});

var setUpCharts = function(){
    myChartLT.setOption({
        title: {
        subtext:' '+year,
        text: 'The U.S. '+chartTitleName+ ' Statistics',
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
            text: 'Commodities '+chartTitleName+ ' Statistics',
            subtext:' '+year,
        },
        xAxis: {
            
            data:HSNameforAxis(HSCode,0)
        },
        series: [
            {
                name: chartTitleName,
                type: 'bar',
                data:exportCom(HSData,year,0)
            },
            {
                name:chartTitleName+"details",
                type: 'bar',
                data:[]
                
            }
        ]
    });

    myChartM.setOption({
        series:[
        {
            name: chartTitleName + ' effect',
            data: []
        },
        {
            name: chartTitleName + ' partners',
            data: []
        }
    ]
    });

};

var setUpChartsB = function(){       
    myChartWM.setOption({
        series:[{
            name:chartTitleNameB,
            data: exportCTVal(CTDataB,yearB)
        }]
    });

};


$('input[type=radio][name=trade]').on('change',function(){
    trade = $(this).val();
    if(trade == "Export"){ 
        HSData = exportHSData;  
        CTData = exportCTData;
        chartTitleName = "Export";
    }
    else if(trade == "Import"){
            HSData = importHSData;  
            CTData = importCTData;    
        chartTitleName = "Import";
    }
    setUpCharts();
    mapClickFunction(mapChange);
    mapClick();
    
});
  
$('input[type=radio][name=year]').on('change',function(){
    year = $(this).val();
    setUpCharts();
    mapClickFunction(mapChange);
    mapClick();
});

$('input[type=radio][name=tradeB]').on('change',function(){
    tradeB = $(this).val();
    if(tradeB == "Export"){ 
        CTDataB = importCTData;
        chartTitleNameB = "Export";
    }
    else if(tradeB == "Import"){
        CTDataB = exportCTData;    
        chartTitleNameB = "Import";
    }
    setUpChartsB();
    worldMapClickFunction(mapChangeforWorldMap);
    worldMapClick();
    
});
  
$('input[type=radio][name=yearB]').on('change',function(){
    yearB = $(this).val();  
    setUpChartsB();
    worldMapClickFunction(mapChangeforWorldMap);
    worldMapClick();
});


});
});
