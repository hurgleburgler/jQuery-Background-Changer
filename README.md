Background Changer is a jQuery Widget Factory plugin with Themeroller support.

### Example:
    $('#bg-changer').bgchanger({
      url_path: '/static/images/backgrounds/,
      images: ['bg1.png', 'bg2.png', 'bg3.png'],
      current: 'bg1.png',
      ui: true,
      random: false,
      next_ui: false,
      previous_ui: false,
    });

### Options
 
 * **url_path**: **Default: ''**, the URL path to append to each image listed in images
 * **images**: **Default: []**, list of images located at **url_path** 
 * **label_width**: **Default: 250**, width to make the UI element
 * **current**: **Default: ''**, specify the first image to load if random is not true
 * **apply_to**: **Default: 'body'**, jQuery selector to append background to
 * **ui**: **Default: true**, show UI element
 * **random**: **Default: false**, start out with a random bg selected from **images**
 * **next_ui**: **Default: true**, add the next ui element button to the buttonset
 * **previous_ui**: **Default: true**, add the previous ui element button to the buttonset

Demo located [here](http://htmlpreview.github.com/?https://raw.github.com/bubasti/jQuery-Background-Changer/master/example.html)
