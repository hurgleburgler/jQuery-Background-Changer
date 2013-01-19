// the widget definition, where 'custom' is the namespace,
// 'bgchanger' the widget name
$.widget( 'custom.bgchanger', $.custom.dropdownbrowser, {
  // default options
  options: {
    url_path: '',
    apply_to: 'body',

    //Events
    onRefresh: null,
  },

  // called when created, and later when changing options
  _refresh: function() {

    if (this.options.url_path[this.options.url_path.length -1] != '/') {
      this.options.url_path = this.options.url_path + '/';
    }

    $(this.options.apply_to).css( 'background-image', 'url(' +
      this.options.url_path + 
      this.options.selected + 
      ')'
    );

    // trigger a callback/event
    this._trigger( 'onRefresh' );
  },

  randomize: function( event ) {
    var random_ndx = Math.floor( Math.random() * this.options.data.length);
    var this_image = this.options.data[random_ndx];
      
    // trigger an event, check if it's canceled
    if ( this._trigger( 'randomize', event, this_image ) !== false ) {
      this.option( 'selected', this_image );
    }
  },

});
