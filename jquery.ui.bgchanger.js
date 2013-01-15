// the widget definition, where 'custom' is the namespace,
// 'bgchanger' the widget name
$.widget( 'custom.bgchanger', {
  // default options
  options: {
    url_path: '/static/images/bg/light',
    images: [
      'arab_tile.png',
      'bright_squares.png',
      'brushed_alu_dark.png',
      'cardboard.png',
      'chruch.png',
      'climpek.png',
      'concrete_wall_2.png',
      'concrete_wall_3.png',
      'diamond_upholstery.png',
      'exclusive_paper.png',
      'fabric_plaid.png',
      'felt.png',
      'frenchstucco.png',
      'furley_bg.png',
      'gplaypattern.png',
      'graphy.png',
      'greyfloral.png',
      'grey.png',
      'grey_sandbag.png',
      'grunge_wall.png',
      'handmadepaper.png',
      'hexellence.png',
      'husk.png',
      'light_honeycomb.png',
      'lightpaperfibers.png',
      'light_toast.png',
      'light_wool.png',
      'little_pluses.png',
      'mirrored_squares.png',
      'natural_paper.png',
      'norwegian_rose.png',
      'old_mathematics.png',
      'paper_2.png',
      'project_papper.png',
      'ravenna.png',
      'retro_intro.png',
      'ricepaper.png',
      'rockywall.png',
      'scribble_light.png',
      'shattered.png',
      'snow.png',
      'soft_wallpaper.png',
      'solid.png',
      'square_bg.png',
      'strange_bullseyes.png',
      'straws.png',
      'swirl.png',
      'texturetastic_gray.png',
      'vintage_speckles.png',
      'wall4.png',
      'white_texture.png',
      'whitey.png',
      'xv.png',
    ],
    label_width: 255,
    current: '',
    apply_to: 'body',
    ui: true,
    random: false,

    // callbacks
    change: null,
    randomize: null,
    previous: null,
    next: null,
    create: null,
  },

  // the constructor
  _create: function() {
    if (this.options.current === '') {
      this.options.current = this.options.images[0];
    }

    this.element
      // add a class for theming
      .addClass( 'custom-bgchanger' )
      .disableSelection();

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

    this.rand_changer = $( '<button>', {
      text: this.options.current,
      'class': 'custom-bgchanger-changer-rand'
    })
    .appendTo( this.element )
    .button()
    .css('width', this.options.label_width);

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

    this.element.buttonset();

    // bind click events on the changer button to the randomize method
    this._on( this.prev_changer, {
      // _on won't call randomize when widget is disabled
      click: 'previous'
    });

    this._on( this.rand_changer, {
      // _on won't call randomize when widget is disabled
      click: 'randomize'
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
    this.rand_changer.remove();
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
      this.rand_changer.button('option', 'label', value);
    }

    this._super( key, value );
  }
});
