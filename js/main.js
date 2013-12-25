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
    GraphBuilder.prototype.getColor = function( index ) {
        var colors = [
            '#7FFFD4', // Aquamarine 
            '#A52A2A', // Brown
            '#5F9EA0', // CadetBlue
            '#6495ED', // CornflowerBlue
            '#DC143C', // Crimson
            '#006400', // DarkGreen
            '#FF8C00', // DarkOrange
            '#E9967A', // DarkSalmon
            '#B22222', // FireBrick
            '#4B0082', // Indigo
            '#20B2AA', // LightSeaGreen
            '#BA55D3', // MediumOrchid
            '#808000', // Olive
            '#DDA0DD', // Plum
            '#FF6347', // Tomato
            '#9ACD32'  // YellowGreen
        ];
        
        return colors[ index ];
    };
    GraphBuilder.prototype.draw = function( values, labels ) {
        var data = [],
            index;
        
        if ( !values && this.toggles.length ) {
            values = this.toggles[ 0 ].values;
            labels = this.toggles[ 0 ].labels;
        }
        
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
                        fillColor : 'rgba(46,139,87,0.5)',
                        strokeColor : 'rgb(46,139,87)',
                        pointColor : 'rgb(220,220,220)',
                        pointStrokeColor : 'rgb(255, 255, 255)',
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
                        fillColor: 'rgba(255,165,0,0.5)',
                        strokeColor: 'rgb(255,165,0)',
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
