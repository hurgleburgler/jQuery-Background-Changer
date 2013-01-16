// the widget definition, where 'custom' is the namespace,
// 'bgchanger' the widget name
$.widget( 'custom.bgchanger', {
  // default options
  options: {
    url_path: '',
    images: [],
    width: 255,
    height: 200,
    current: '',
    apply_to: 'body',
    ui: true,
    next_ui: true,
    previous_ui: true,
    drop_down: true,

    //// callbacks
    //change: null,
    //randomize: null,
    //previous: null,
    //next: null,
  },

  // the constructor
  _create: function() {
    this_element = this;
    $this_element = this.element;

    if (this.options.current === '') {
      this.options.current = this.options.images[0];
    }

    this.element
      // add a class for theming
      .addClass( 'custom-bgchanger' )
      .disableSelection();

    if (this.options.previous_ui) {
      this.prev_changer = $( '<button>', {
        text: 'Previous',
        'class': 'custom-bgchanger-changer-prev'
      })
      .appendTo( this.element )
      .button({
        icons: {
          primary: 'ui-icon-carat-1-w'
        },
        text: false
      });
    }

    this.this_button = $( '<button>', {
      text: this.options.current,
      'class': 'custom-bgchanger-button'
    });

    if (this.options.drop_down) {
      this.keep_focus = false;

      this.hide_menu = function() {
        if (!this_element.keep_focus) {
          this_element.this_menu.hide();
        }
      };

      this.this_button.button({
        icons: {
          secondary: 'ui-icon-triangle-1-s'
        },
      })
      .click(function(e) {
        this_element.this_menu.show();
      });

      this.this_menu = $( '<ul />' )
        .css({
          width: this.options.width,
          height: this.options.height,
          overflow: 'auto',
        })
        .hide();

      for (ii in this.options.images) {
        $( '<a />', {
          text: this.options.images[ii],
          href: '#',
        })
        .appendTo( $( '<li />' )
          .appendTo(this.this_menu)
        );
      }

      this.this_menu
        .menu({
          select: function(e, u) {
            $this_element.bgchanger('option', 'current', u.item.find('a').text());
            this_element.this_menu.hide();
          },
          focus: function(e) {
            this_element.keep_focus = true;
          },
          blur: function(e) {
            this_element.keep_focus = false;
            setTimeout(this_element.hide_menu, 200);
          },
        })
        .appendTo( this.element.parent() );

    } else {
      this.this_button.button()
      this._on( this.this_button, {
        // _on won't call randomize when widget is disabled
        click: 'randomize'
      });
    }
    this.this_button
      .css('width', this.options.width)
      .appendTo( this.element );

    if (this.options.previous_ui) {
      this.next_changer = $( '<button>', {
        text: 'Next',
        'class': 'custom-bgchanger-changer-next'
      })
      .appendTo( this.element )
      .button({
        icons: {
          primary: 'ui-icon-carat-1-e'
        },
        text: false
      });
    }

    this.element.buttonset();

    // bind click events on the changer button to the randomize method
    this._on( this.prev_changer, {
      // _on won't call randomize when widget is disabled
      click: 'previous'
    });

    this._on( this.next_changer, {
      // _on won't call random when widget is disabled
      click: 'next'
    });

    if (this.options.random) {
      this.randomize();
    } else {
      this._refresh();
    }

    if (!this.options.ui) {
      this.element.hide();
    }
  },

  // called when created, and later when changing options
  _refresh: function() {

    $(this.options.apply_to).css( 'background-image', 'url(' +
      this.options.url_path + 
      '/' + 
      this.options.current + 
      ')'
    );

    // trigger a callback/event
    this._trigger( 'change' );
  },

  // a public method to change the color to a random value
  // can be called directly via .bgchanger( 'randomize' )
  previous: function( event ) {
    var this_current = this.options.current;
    var this_ndx = this.options.images.indexOf(this_current) - 1;

    if (this_ndx < 0) {
      this_ndx = this.options.images.length - 1;
    }

    var this_image = this.options.images[this_ndx];

    // trigger an event, check if it's canceled
    if ( this._trigger( 'previous', event, this_image ) !== false ) {
      this.option( 'current', this_image );
    }
  },

  randomize: function( event ) {
    var random_ndx = Math.floor( Math.random() * this.options.images.length);
    var this_image = this.options.images[random_ndx];
      
    // trigger an event, check if it's canceled
    if ( this._trigger( 'randomize', event, this_image ) !== false ) {
      this.option( 'current', this_image );
    }
  },

  // a public method to change the color to a random value
  // can be called directly via .bgchanger( 'randomize' )
  next: function( event ) {
    var this_current = this.options.current;
    var this_ndx = this.options.images.indexOf(this_current);

    if (this_ndx === this.options.images.length) {
      this_ndx = -1;
    }

    var this_image = this.options.images[this_ndx + 1];

    // trigger an event, check if it's canceled
    if ( this._trigger( 'next', event, this_image ) !== false ) {
      this.option( 'current', this_image );
    }
  },

  // events bound via _on are removed automatically
  // revert other modifications here
  _destroy: function() {
    // remove generated elements
    this.this_button.remove();
    this.prev_changer.remove();
    this.next_changer.remove();

    this
      .removeClass( 'custom-bgchanger' )
      .enableSelection();

    $(this.options.apply_to)
      .css( 'background-image', 'none' );
  },

  // _setOptions is called with a hash of all options that are changing
  // always refresh when changing options
  _setOptions: function() {
    // _super and _superApply handle keeping the right this-context
    this._superApply( arguments );
    this._refresh();
  },

  // _setOption is called for each individual option that is changing
  _setOption: function( key, value ) {
    // prevent invalid color values
    //if ( /red|green|blue/.test(key) && (value < 0 || value > 255) ) {
    //  return;
    //}
    if (key === 'current') {
      this.this_button.button('option', 'label', value);
    }

    this._super( key, value );
  }
});
