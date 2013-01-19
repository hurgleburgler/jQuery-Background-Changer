Background Changer is a jQuery Widget Factory plugin with Themeroller support using my jQuery-Drop-Down-Browser.

### Example:
    $('#bg-changer').bgchanger({
      url_path: '/static/data/backgrounds/,
      data: ['bg1.png', 'bg2.png', 'bg3.png'],
      current: 'bg1.png',
      ui: true,
      random: false,
      next_ui: false,
      previous_ui: false,
    });

### Options
 
 * **url_path**: **Default: ''**, the URL path to append to each image listed in data
 * **apply_to**: **Default: 'body'**, jQuery selector to append background to
 * **Other options are inherited from my [jQuery-Drop-Down-Browser](https://github.com/bubasti/jQuery-Drop-Down-Browser)

Demo located [here](http://htmlpreview.github.com/?https://raw.github.com/bubasti/jQuery-Background-Changer/master/example.html)
