google.charts.load('45', { packages: ['corechart', 'table', 'geochart','line','scatter'] });

google.charts.setOnLoadCallback(drawTable);
google.charts.setOnLoadCallback(drawLineStyles);
google.charts.setOnLoadCallback(drawChart);


      function drawChart(){
        $.ajax({
            url: "/exanak",
            dataType: "json",
            success : function(jsonData){
                var data = new google.visualization.DataTable();
                data.addColumn('string', 'Time of Day');
                data.addColumn('number', 'Wheather');
                
                for (var i = 0; i < jsonData.length; i++) {
                data.addRow(
                [Date(jsonData[i].or + "/" + jsonData[i].amis + "/" +  jsonData[i].tari), (jsonData[i].aravot + jsonData[i].gisher)/2]
                );
            }
            var options = {
          width: 2000,
          height: 1500,
          chart: {
            title: 'Students\' Final Grades',
            subtitle: 'based on hours studied'
          },
          hAxis: {title: 'Hours Studied'},
          vAxis: {title: 'Grade'}
        };

        var chart = new google.charts.Scatter(document.getElementById('scatterchart_material'));

        chart.draw(data, google.charts.Scatter.convertOptions(options));
            }
            
        });
}
 


function drawLineStyles() {
        $.ajax({
            url: "/exanak",
            dataType: "json",
            success : function(jsonData){
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'X');
            data.addColumn('number', 'Weather');
                for (var i = 0; i < jsonData.length; i++) {
                data.addRow(
                [jsonData[i].or + "/" + jsonData[i].amis + "/" + jsonData[i].tari,(jsonData[i].aravot + jsonData[i].gisher)/2]
                );
            }
        var options = {
            paddung:0,
            margin:0,
            width: 2100,
          height: 1500,
        hAxis: {
          title: ''
        },
        vAxis: {
          title: ''
        },
        colors: ['#a52714', '#097138'],
        series: {
          0: {
            lineWidth: 1.5,
            lineDashStyle: [5, 1, 5]
          },
          1: {
            lineWidth: 10,
            lineDashStyle: [7, 2, 4, 3]
          }
        }
      };

      var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
      chart.draw(data, options);

            }
        });
      }



function drawTable() {
    $.ajax({
        url: "/exanak",
        dataType: "json",
        success: function (jsonData) {
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'or/amis/tari');
            data.addColumn('number', 'aravot');
            data.addColumn('number', 'gisher');

            for (var i = 0; i < jsonData.length; i++) {
                data.addRow([
                    jsonData[i].or + "/"+ jsonData[i].amis + "/" +  jsonData[i].tari,
                    jsonData[i].aravot,
                    jsonData[i].gisher
                ]);
            }

            var options = {
                allowHtml: true,
                showRowNumber: true,
                width: '50%',
                height: '50%'
            };

            var table = new google.visualization.Table(document.getElementById('barformat_div'));
            var formatter = new google.visualization.BarFormat({ width: 50 });
            table.draw(data, options);
        }
    });
}


$(window).resize(function () {
    drawLineStyles();
    drawTable();
    drawChart();
});