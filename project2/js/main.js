
$(function () {

    var exportStateCT = {
        category:[],
        series:[]
    };

    // Load the data from a Google Spreadsheet
    // https://docs.google.com/a/highsoft.com/spreadsheet/pub?hl=en_GB&hl=en_GB&key=0AoIaUO7wH1HwdDFXSlpjN2J4aGg5MkVHWVhsYmtyVWc&output=html
    Highcharts.data({
        googleSpreadsheetKey: '0AoIaUO7wH1HwdDFXSlpjN2J4aGg5MkVHWVhsYmtyVWc',
        // custom handler for columns
        
        parsed: function (columns) {
            /**
             * Event handler for clicking points. Use jQuery UI to pop up
             * a pie chart showing the details for each state.
             */
            function pointClick() {
                var row = this.options.row,
                    $div = $('<div></div>')
                .dialog({
                    title: this.name,
                    width: 400,
                    height: 300
                });
                window.chart = new Highcharts.Chart({
                    chart: {
                        renderTo: $div[0],
                        type: 'pie',
                        width: 370,
                        height: 240
                    },
                    title: {
                        text: null
                    },
                    series: [{
                        name: 'Votes',
                        data: [{
                            name: 'Obama',
                            color: '#0200D0',
                            y: parseInt(columns[3][row], 10)
                        }, {
                            name: 'Romney',
                            color: '#C40401',
                            y: parseInt(columns[4][row], 10)
                        }],
                        dataLabels: {
                            format: '<b>{point.name}</b> {point.percentage:.1f}%'
                        }
                    }]
                });
            }
            // Make the columns easier to read
            var keys = columns[0],
                names = columns[1],
                percent = columns[7],
                // Build the chart options
                options = {
                    chart: {
                        renderTo: 'container',
                        type: 'map',
                        borderWidth: 1
                    },
                    credits:{
                        enabled:false // 禁用版权信息
                   },
                    title: {
                        text: 'US presidential election 2012 results'
                    },
                    subtitle: {
                        text: 'Source: <a href="https://www.census.gov/foreign-trade/statistics/state/data/index.html"> US Census</a>'
                    },
                    legend: {
                        align: 'right',
                        verticalAlign: 'top',
                        x: -100,
                        y: 70,
                        floating: true,
                        layout: 'vertical',
                        valueDecimals: 0,
                        backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || 'rgba(255, 255, 255, 0.85)'
                    },
                    mapNavigation: {
                        enabled: true,
                        enableButtons: true
                    },
                    /*
                    colorAxis: {
                        dataClasses: [{
                            from: -100,
                            to: 0,
                            color: '#C40401',
                            name: 'Romney'
                        }, {
                            from: 0,
                            to: 100,
                            color: '#0200D0',
                            name: 'Obama'
                        }]
                    },
                    */
                    series: [{
                        data: [],
                        mapData: Highcharts.maps['countries/us/us-all'],
                        joinBy: 'postal-code',
                        dataLabels: {
                            enabled: true,
                            color: '#FFFFFF',
                            format: '{point.postal-code}',
                            style: {
                                textTransform: 'uppercase'
                            }
                        },
                        name: 'Democrats margin',
                        point: {
                            events: {
                                click: pointClick
                            }
                        },
                        tooltip: {
                            ySuffix: ' %'
                        },
                        cursor: 'pointer'
                    }]
                };
            keys = keys.map(function (key) {
                return key.toUpperCase();
            });
            Highcharts.each(options.series[0].mapData.features, function (mapPoint) {
                if (mapPoint.properties['postal-code']) {
                    var postalCode = mapPoint.properties['postal-code'],
                        i = $.inArray(postalCode, keys);
                    options.series[0].data.push(Highcharts.extend({
                        value: parseFloat(percent[i]),
                        name: names[i],
                        'postal-code': postalCode,
                        row: i
                    }, mapPoint));
                }
            });
            // Initiate the chart
            window.chart = new Highcharts.Map(options);
           
        },
        error: function () {
            $('#container').html('<div class="loading">' +
                                 '<i class="icon-frown icon-large"></i> ' +
                                 '<p>Error loading data from Google Spreadsheets</p>' +
                                 '</div>');
        }
    });


    // 请求 data.csv 数据
$.get('https://raw.githubusercontent.com/catnoodle/517/master/project2/data/exportStateCT.csv', function(data) {
 

// 分隔每一行
     var lines = data.split('\n');

    // 遍历每一行
    $.each(lines, function(lineNo, line) {
        var items = line.split(',');  
        // 处理第一行，即分类
        if (lineNo == 0) {
            $.each(items, function(itemNo, item) {
                if (itemNo >= 0) {
                   exportStateCT.category.push(item);   
                }
            });
        }
        // 处理其他的每一行
        else {
            var series = {
                name:[],
                data: []
            };
            $.each(items, function(itemNo, item) {
                if (itemNo == 0) {
                    series.name = item;   // 数据列的名字
                } else {
                    series.data.push(item); // 数据，记得转换成数值类型
                }
            });
            // 最后将数据 push 到数据列配置里
           exportStateCT.series.push(series);
        }  /* */
    });console.log(exportStateCT.series[0].name); 
/* 
    // 创建图表
    //var chart = new Highcharts.Chart(options);
*/
    
});

});

