(function(){
    // Full list of configuration options available here:
    // https://github.com/hakimel/reveal.js#configuration
    Reveal.initialize({
        controls: false,
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
        this.ctx = this.obj.getContext('2d');
        
        this.chartType = chartType;
        this.labels = $( this.obj ).data('labels').split(',');
    };
    GraphBuilder.prototype.draw = function() {
        switch( this.chartType ) {
            case 'bar':
            default:
                this.chart = new Chart( this.ctx ).Bar({
                    labels: this.labels,
                    datasets: [
                        {
                            fillColor : "rgba(220,220,220,0.5)",
                            strokeColor : "rgba(220,220,220,1)",
                            data : [29, 26, 2, 0]
                        }
                    ]
                });
                break;
        }
    };
    
    var averageAge = new GraphBuilder( 'averageAgeChart', 'bar' );
    averageAge.draw();
}());
