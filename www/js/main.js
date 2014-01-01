(function(){
    'use strict';
    
    Reveal.initialize({
        controls: true,
        progress: false,
        history: false,
        center: true,
        theme: '2013',
        transition: 'linear',
        transitionSpeed: 'fast'
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
                labels = jelement.data('labels').split(','),
                details = $('#' + jelement.data('details') );
            
            this.toggles[ index ] = {
                values: values,
                labels: labels,
                details: details
            };
            
            jelement.click(function( ev ) {
                var li = $( ev.currentTarget ).parent(),
                    lis = li.siblings();
                
                ev.preventDefault();
                
                this.draw( values, labels, details );
                lis.removeClass('active');
                li.addClass('active');
            }.bind( this ));
            
        }.bind( this ));
    };
    GraphBuilder.prototype.getColor = function( index ) {
        var colors = [
        // Red
            '#FF6347', // Tomato
            '#B22222', // FireBrick
        // Orange and Yellow
            '#FF8C00', // DarkOrange
            '#E9967A', // DarkSalmon
        // Green
            '#9ACD32', // YellowGreen
            '#006400', // DarkGreen
        // Blue
            '#7FFFD4', // Aquamarine
            '#6495ED', // CornflowerBlue
            '#5F9EA0', // CadetBlue
        // Violet
            '#DDA0DD', // Plum
            '#BA55D3', // MediumOrchid
            '#4B0082'  // Indigo
        ];
        
        return colors[ index ];
    };
    GraphBuilder.prototype.draw = function( values, labels, details ) {
        var data = [],
            index;
        
        if ( !values && this.toggles.length ) {
            values = this.toggles[ 0 ].values;
            labels = this.toggles[ 0 ].labels;
            details = this.toggles[ 0 ].details;
        }
        
        $('.details').hide();
        details.show();
        
        switch( this.chartType ) {
        case 'pie':
            for ( index in values ) {
                data.push({
                    value: parseInt( values[ index ], 10 ),
                    color: this.getColor( index )
                });
            }
            this.chart = new Chart( this.ctx ).Pie( data );
            break;
            
        case 'polar':
            for ( index in values ) {
                data.push({
                    value: parseInt( values[ index ], 10 ),
                    color: this.getColor( index )
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
                        fillColor : 'rgba( 255, 214, 50, 0.5 )',
                        strokeColor : '#FFD632',
                        pointColor : '#ffffff',
                        pointStrokeColor : '#ffffff',
                        data: data
                    }
                ]
            });
            break;
            
        case 'bar':
            data = values;
            this.chart = new Chart( this.ctx ).Bar({
                labels: labels,
                datasets: [
                    {
                        fillColor: 'rgba( 255, 214, 50, 0.5 )',
                        strokeColor: '#FFD632',
                        data: data
                    }
                ]
            });
            break;
        }
    };
    
    Reveal.addEventListener( 'slidechanged', function( ev ) {
        var slideGraph;
        
        switch( ev.currentSlide.id ) {
        case 'averageAgeSlide':
            slideGraph = new GraphBuilder( 'averageAgeChart', 'bar' );
            slideGraph.setToggles();
            slideGraph.draw();
            break;
        case 'entertainmentSlide':
            slideGraph = new GraphBuilder( 'entertainment', 'pie' );
            slideGraph.setToggles();
            slideGraph.draw();
            break;
        case 'workSlide':
            slideGraph = new GraphBuilder( 'work', 'polar' );
            slideGraph.setToggles();
            slideGraph.draw();
            break;
        case 'upgradeSlide':
            slideGraph = new GraphBuilder( 'upgrade', 'line' );
            slideGraph.setToggles();
            slideGraph.draw();
            break;
        }
    });
}());
