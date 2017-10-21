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
            top: 28,
            width: 5
        },
        'Puerto Rico': {       // 波多黎各
            left: -76,
            top: 26,
            width: 2
        },
        'Virgin Islands': {
            left: -99,
            top: 30,
            width: 15
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
                                width:dataItem.val2013/1000+1,
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
                                width:dataItem.val2014/1000+1,
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
                                width:dataItem.val2015/1000+1,
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
                                width:dataItem.val2016/1000+1,
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
                                width:dataItem.val2013/1000+1,
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
                                width:dataItem.val2014/1000+1,
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
                                width:dataItem.val2015/1000+1,
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
                                width:dataItem.val2016/1000+1,
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
                    symbolSize: dataItem.val2013/50000 +5
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
                    symbolSize: dataItem.val2014/50000 +5
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
                    symbolSize: dataItem.val2015/50000 +5
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
                    symbolSize: dataItem.val2016/50000 +5
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
                        shadowOffsetX: 0,
                        shadowOffsetY: 0,
                        shadowBlur: 10,
                        opacity:'0.5',
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
    var res =[];
    if(yearB == 2013){
        data.forEach(function(dataItem){
            if(data.val2013 != 0){
                res.push({
                    name: dataItem.statename,
                    value:dataItem.val2013
                });
            } 
        }); 
    }
    else if(yearB == 2014){
        data.forEach(function(dataItem){
            if(data.val2014 != 0){
                res.push({
                    name: dataItem.statename,
                    value:dataItem.val2014
                });
            } 
        }); 
    }
    else if(yearB == 2015){
        data.forEach(function(dataItem){
            if(data.val2015 != 0){
                res.push({
                    name: dataItem.statename,
                    value:dataItem.val2015
                });
            } 
        }); 
    }
    else if(yearB == 2016){
        data.forEach(function(dataItem){
            if(data.val2016 != 0){
                res.push({
                    name: dataItem.statename,
                    value:dataItem.val2016
                });
            } 
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

//左上overview
var optionLT = {
    title: {
        text: chartTitleName+'('+ year +')'+' Countries',
        left: 'center',
        textStyle : {
            color: '#000'
        }
    },
    toolbox: {
        show : true,
        //orient : 'vertical',
        left: 'right',
        top: 'top',
        feature : {
            mark : {show: true},
            restore : {show: true,title:"Reset"},
            saveAsImage : {show: false}
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
        toolbox: {
            show : true,
            //orient : 'vertical',
            left: 'right',
            top: 'top',
            feature : {
                mark : {show: true},
                restore : {show: true,title:"Reset"},
                saveAsImage : {show: false},
                myTool1: {
                    show: false,
                    title: 'Back',
                    icon: 'path://M11.3,0c0.1,0.7,0.3,1.3,0.6,1.9c0.6,1.2,1.2,2.4,2,3.6c1.4,2.1,2.7,4.3,4.1,6.4c1,1.5,1.9,3.1,2.6,4.7c0.8,1.5,1.3,3.1,1.5,4.8c0.7,4.2-1.1,8.4-4.6,10.7c-2,1.4-4.5,2-6.9,1.8c-1.6,0-3.1-0.4-4.5-1.2c-3.1-1.6-5.2-4.5-5.7-7.9c-0.3-2-0.1-4.1,0.7-6.1c0.7-1.9,1.6-3.8,2.7-5.5C5.3,11,6.7,8.7,8.2,6.4c1-1.5,1.9-3.2,2.6-4.9C11,1,11.1,0.6,11.3,0.1L11.3,0zM9.9,31.1h0.4c0.5,0,0.9-0.5,0.9-1c0-0.1,0-0.1,0-0.2c-0.1-0.4-0.5-0.7-1-0.7c-3-0.1-5.4-2.5-5.4-5.6c0-0.5-0.4-0.9-0.9-0.9c0,0,0,0-0.1,0c-0.5,0-0.9,0.4-0.9,1l0,0c0,0.3,0,0.6,0,0.9C3.3,28.2,6.3,30.9,9.9,31.1z',
                    onclick: function(){
                        myChartLB.setOption({
                            title: {
                                text: chartTitleName+'('+ year +')'+' Commodities',
                                subtext:null
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
                return "US "+params.seriesName+"("+year+")"+ ' Commodities' + '<br/>' + params.name + ' :' + '<br/>'+'$'+ params.value+'M';
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
        },{
            name: chartTitleName+"details",
            type:'bar',
            data:[]
        }
        ]
    };
myChartLB.setOption(optionLB);

//世界地图
var optionMap = {
    backgroundColor: '#404a59',
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
       // orient : 'vertical',
        left: 'right',
        top: 'top',
        feature : {
            mark : {show: true},
            restore : {show: true,title:"Reset"},
            saveAsImage : {show: false}
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
                symbolSize: 3
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
            itemStyle: {
                emphasis: {
                    borderColor: '#fff',
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
    backgroundColor: '#404a59',
    title : { 
        text: 'US Census Foreign Trade Statistics',
        subtext: 'Source: US Cencus',
        sublink: 'http://www.census.gov/popest/data/datasets.html',
        left: 'left',
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
            color:"#fff"
        },         
        calculable: true   
    },
    toolbox: {
        show : true,
        //orient : 'vertical',
        left: 'right',
        top: 'top',
        feature : {
            mark : {show: true},
            restore : {
                show: true,
                title:"Reset"
            },
            saveAsImage : {show: false}
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
        center:[-105,39],
        zoom:0,
        scaleLimit:{
            min:-1,
            max:30
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
    backgroundColor: '#404a59',
    title : { 
        text: 'World Trade Statistics',
        subtext: 'Source: US Cencus',
        sublink: 'http://www.census.gov/popest/data/datasets.html',
        left: 'left',
        textStyle : {
            color: '#fff',
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
            color:"#fff"
        },         
        calculable: true   
    },
    toolbox: {
        show : true,
       // orient : 'vertical',
        left: 'right',
        top: 'top',
        feature : {
            mark : {show: true},
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
                            } 
                        });
                    }
                },
        },
            saveAsImage : {show: false}
        }
    },
    tooltip : {
        trigger: 'item',
        formatter : function (params) {
            if(params.value){
                return "US "+ params.seriesName+"("+yearB+")" +" partners "+ '<br/>' + params.name + ' : $' + params.value+'M';
            }
            else{
                return  "US "+ params.seriesName+"("+yearB+")" +" partners "+ '<br/>' + params.name + ' : No data';
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
    backgroundColor: '#404a59',
    title : { 
        text: 'US Trade States',
        subtext: 'Source: US Cencus',
        sublink: 'http://www.census.gov/popest/data/datasets.html',
        left: 'left',
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
            color:"#fff"
        },         
        calculable: true   
    },
    toolbox: {
        show : true,
        //orient : 'vertical',
        left: 'right',
        top: 'top',
        feature : {
            mark : {show: true},
            restore : {show: true,title:"Reset"},
            saveAsImage : {show: false}
        }
    },
    tooltip : {
        trigger: 'item',
        formatter : function (params) {
            return "US "+params.seriesName+"("+yearB+")" +' States' + '<br/>' + params.name + ' : $' + params.value+'M';
        }
    },  
    geo: {
        map: 'usa',
        roam: true,
        selectedMode:'single',
        center:[-105,39],
        zoom:0,
        scaleLimit:{
            min:-1,
            max:30
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
        regions: [],
        label:false
    },
    series:[
        {
            name: chartTitleNameB,
            type: 'map',
            geoIndex: 0,
            data:areaColorValue(CTDataB,yearB)
        }
    ]
};
myChartUSM.setOption(optionUSMap);

var worldMapClickFunction = function(params){ 
    var CTres = CTDataB.filter(function(data){return data.countryd == params.name});
    var optionUSChart = {
        title: {
            text: params.name+" "+chartTitleNameB+'('+ yearB +')'+' US States',
            left: 'center',
            textStyle : {
                color: '#000',
                fontSize: 12
            }
        },
        toolbox: {
            show : true,
            //orient : 'vertical',
            left: 'right',
            top: 'top',
            feature : {
                mark : {show: true},
                restore : {show: true,title:"Reset"},
                saveAsImage : {show: false}
            }
        },
        tooltip: {
            formatter : function (params2) {
                return params.name+" "+params2.seriesName+"("+yearB+")" +' US States'+ '<br/>' + params2.name + ' : $' + params2.value+'M';
            }
        },
        xAxis: {
            axisTick:{
                alignWithLabel: true,
            },
          data:CTStateforAxis(CTres,yearB)
        },
        yAxis: {},
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
            name: chartTitleNameB,
            type: 'bar',
            data:CTStateforChart(CTres)
        }]
    }
    myChartUSC.setOption(optionUSChart);

    myChartUSM.setOption({
        geo:{
            regions: stateSelect(CTres)
        } 
    });
};


var mapClickFunction = function(params){ 
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
        toolbox: {
            show : true,
            //orient : 'vertical',
            left: 'right',
            top: 'top',
            feature : {
                mark : {show: true},
                restore : {show: true,title:"Reset"},
                saveAsImage : {show: false}
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
        toolbox: {
            show : true,
            //orient : 'vertical',
            left: 'right',
            top: 'top',
            feature : {
                mark : {show: true},
                restore : {show: true,title:"Reset"},
                saveAsImage : {show: false}
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
                return params.name+" "+params2.seriesName+"("+year+")"+ ' Commodities' + '<br/>' + params2.name + ' :' + '<br/>'+'$'+ params2.value+'M';
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
                    subtext: params.name+'('+ year +')'+' Details',
                    subtextStyle:{
                        color:"#000",
                        fontStyle:"bold",
                        fontSize:12
                    }
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
            subtext:null
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
    myChartMD.setOption({
        geo:{
            regions: []
        }  
    });  
    setUpCharts();
    mapClickFunction(mapChange);
    mapClick();
    
});
  
$('input[type=radio][name=year]').on('change',function(){
    year = $(this).val();
    myChartMD.setOption({
        geo:{
            regions: []
        }  
    });  
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
    myChartWM.setOption({
        geo:{
            regions: []
        }  
    });  
    setUpChartsB();
    worldMapClickFunction(mapChangeforWorldMap);
    worldMapClick();
    
});
  
$('input[type=radio][name=yearB]').on('change',function(){
    yearB = $(this).val();
    myChartWM.setOption({
        geo:{
            regions: []
        }  
    });  
    setUpChartsB();
    worldMapClickFunction(mapChangeforWorldMap);
    worldMapClick();
});


});
});
