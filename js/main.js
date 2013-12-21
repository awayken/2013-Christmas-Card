(function(){
    'use strict';

    Reveal.initialize({
        controls: true,
        progress: false,
	history: false,
        center: true,
    
        // Parallax scrolling
        // parallaxBackgroundImage: 'https://s3.amazonaws.com/hakim-static/reveal-js/reveal-parallax-1.jpg',
        // parallaxBackgroundSize: '2100px 900px',

	theme: 'default', // available themes are in /css/theme
	transition: 'linear', // default/cube/page/concave/zoom/linear/fade/none
	transitionSpeed: 'fast' // default/fast/slow
    });
    
    var GraphBuilder = function( id, chartType ) {
        this.id = id;
        this.obj = document.getElementById( this.id );
        this.jobj = $( this.obj );
        this.slide = this.jobj.parents('section');
        this.ctx = this.obj.getContext('2d');
        
        this.toggles = [];
        this.chartType = chartType;
    };
    GraphBuilder.prototype.setToggles = function() {
        this.slide.find('a[href="#' + this.id + '"]').each(function( index, element ) {
            var jelement = $( element ),
                values = jelement.data('values').split(','),
                labels = jelement.data('labels').split(',');
            
            this.toggles[ index ] = {
                values: values,
                labels: labels
            };
            
            jelement.click(function( ev ) {
                ev.preventDefault();
                this.draw( values, labels );
            }.bind( this ));
            
        }.bind( this ));
    };
    GraphBuilder.prototype.draw = function( values, labels ) {
        var data = [];
        
        if ( !values && this.toggles.length ) {
            values = this.toggles[ 0 ].values;
            labels = this.toggles[ 0 ].labels;
        }
        
        switch( this.chartType ) {
            case 'pie':
                for ( var index in values ) {
                    data.push({
                        value: parseInt( values[ index ], 10 ),
                        color: '#FF00FF' // get random color
                    });
                }
                this.chart = new Chart( this.ctx ).Pie( data );
                break;
                
            case 'polar':
                for ( var index in values ) {
                    data.push({
                        value: parseInt( values[ index ], 10 ),
                        color: '#00FF00' // get random color
                    });
                }
                this.chart = new Chart( this.ctx ).PolarArea( data );
                break;
                
            case 'line':
                data = values;
                this.chart = new Chart( this.ctx ).Line({
                    labels: labels,
                    datasets: [
                        {
                            fillColor : "rgba(220,220,220,0.5)",
                            strokeColor : "rgba(220,220,220,1)",
                            pointColor : "rgba(220,220,220,1)",
                            pointStrokeColor : "#fff",
                            data: data
                        }
                    ]
                });
                break;
                
            case 'bar':
            default:
                data = values;
                this.chart = new Chart( this.ctx ).Bar({
                    labels: labels,
                    datasets: [
                        {
                            fillColor: "rgba(220,220,220,0.5)",
                            strokeColor: "rgba(220,220,220,1)",
                            data: data
                        }
                    ]
                });
                break;
        }
    };
    
    var averageAge = new GraphBuilder( 'averageAgeChart', 'bar' );
    averageAge.setToggles();
    averageAge.draw();
    
    var entertainment = new GraphBuilder( 'entertainment', 'pie' );
    entertainment.setToggles();
    entertainment.draw();
    
    var work = new GraphBuilder( 'work', 'polar' );
    work.setToggles();
    work.draw();
    
    var upgrade = new GraphBuilder( 'upgrade', 'line' );
    upgrade.setToggles();
    upgrade.draw();
}());
