(function(){
    // Full list of configuration options available here:
    // https://github.com/hakimel/reveal.js#configuration
    Reveal.initialize({
        controls: true,
        progress: false,
        history: true,
        center: true,
    
        theme: 'default', // available themes are in /css/theme
        transition: 'default', // default/cube/page/concave/zoom/linear/fade/none
    
        // Parallax scrolling
        // parallaxBackgroundImage: 'https://s3.amazonaws.com/hakim-static/reveal-js/reveal-parallax-1.jpg',
        // parallaxBackgroundSize: '2100px 900px',
    
        // Optional libraries used to extend on reveal.js
        dependencies: [
            { src: 'bower_components/reveal.js/lib/js/classList.js', condition: function() { return !document.body.classList; } },
            { src: 'bower_components/reveal.js/plugin/markdown/marked.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
            { src: 'bower_components/reveal.js/plugin/markdown/markdown.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
            { src: 'bower_components/reveal.js/plugin/highlight/highlight.js', async: true, callback: function() { hljs.initHighlightingOnLoad(); } },
            { src: 'bower_components/reveal.js/plugin/zoom-js/zoom.js', async: true, condition: function() { return !!document.body.classList; } },
            { src: 'bower_components/reveal.js/plugin/notes/notes.js', async: true, condition: function() { return !!document.body.classList; } }
        ]
    });
    
    var GraphBuilder = function( id, chartType ) {
        this.id = id;
        this.obj = document.getElementById( this.id );
        this.jobj = $( this.obj );
        this.slide = this.jobj.parents('section');
        this.ctx = this.obj.getContext('2d');
        
        this.toggles = [];
        this.chartType = chartType;
        this.labels = this.jobj.data('labels').split(',');
    };
    GraphBuilder.prototype.setToggles = function() {
        this.slide.find('a[href="#' + this.id + '"]').each(function( index, element ) {
            var jelement = $( element ),
                values = jelement.data('values').split(',');
            
            this.toggles[ index ] = values;
            
            jelement.click(function( ev ) {
                ev.preventDefault();
                this.draw( values );
            }.bind( this ));
            
        }.bind( this ));
    };
    GraphBuilder.prototype.draw = function( values ) {
        var data = [];
        
        if ( !values && this.toggles.length ) {
            values = this.toggles[ 0 ];
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
                
            case 'bar':
            default:
                data = values;
                this.chart = new Chart( this.ctx ).Bar({
                    labels: this.labels,
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
}());
