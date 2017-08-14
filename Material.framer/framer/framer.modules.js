require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"icon":[function(require,module,exports){
var Icon, icons,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

icons = JSON.parse(Utils.domLoadDataSync("modules/icons.json"));

exports.Icon = Icon = (function(superClass) {
  extend(Icon, superClass);

  function Icon(options) {
    var ref, ref1, ref2;
    if (options == null) {
      options = {};
    }
    this._icon = (ref = options.icon) != null ? ref : 'menu';
    this._color = (ref1 = options.color) != null ? ref1 : '#00000';
    this._backgroundColor = (ref2 = options.backgroundColor) != null ? ref2 : null;
    Icon.__super__.constructor.call(this, _.defaults(options, {
      name: '.',
      height: 24,
      width: 24,
      backgroundColor: this._backgroundColor
    }));
  }

  Icon.define("icon", {
    get: function() {
      return this._icon;
    },
    set: function(name) {
      var svg;
      this._icon = name;
      svg = (function() {
        if (icons[this._icon]) {
          return "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path d='" + icons[this._icon] + "' fill='" + this._color + "'/></svg>";
        } else {
          throw "Error: icon '" + name + "' was not found. See https://materialdesignicons.com/ for full list of icons.";
        }
      }).call(this);
      return this.html = svg;
    }
  });

  Icon.define("color", {
    get: function() {
      return this._color;
    },
    set: function(color) {
      var svg;
      this._color = new Color(color);
      svg = (function() {
        if (icons[this._icon]) {
          return "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path d='" + icons[this._icon] + "' fill='" + this._color + "'/></svg>";
        } else {
          throw "Error: icon '" + name + "' was not found. See https://materialdesignicons.com/ for full list of icons.";
        }
      }).call(this);
      return this.html = svg;
    }
  });

  return Icon;

})(Layer);


},{}],"md":[function(require,module,exports){
var ActionButton, App, Body1, Body2, BottomNav, Button, Caption, CheckBox, Checkbox, Dialog, DialogAction, Divider, GridList, Header, Headline, Icon, MenuButton, MenuOverlay, Notification, Page, Radiobox, Regular, RowItem, Slider, Snackbar, StatusBar, Subhead, Switch, Tile, Title, View, app, icons, ripple, theme, type,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

ripple = require('ripple').ripple;

theme = require('theme').theme;

Icon = require('icon').Icon;

type = require('type');

icons = JSON.parse(Utils.domLoadDataSync("modules/icons.json"));

Framer.Extras.Hints.disable();

Framer.Extras.Preloader.enable();

exports.theme = theme;

exports.Title = Title = type.Title;

exports.Headline = Headline = type.Headline;

exports.Subhead = Subhead = type.Subhead;

exports.Regular = Regular = type.Regular;

exports.Body2 = Body2 = type.Body2;

exports.Body1 = Body1 = type.Body1;

exports.Caption = Caption = type.Caption;

exports.DialogAction = DialogAction = type.DialogAction;

app = void 0;

exports.App = App = (function(superClass) {
  extend(App, superClass);

  function App(options) {
    var i, j, len, ref, ref1, ref2, ref3, ref4, ref5, ref6, view;
    if (options == null) {
      options = {};
    }
    this._bottomNav = (ref = options.bottomNav) != null ? ref : void 0;
    this._menuOverlay = (ref1 = options.menuOverlay) != null ? ref1 : void 0;
    this.theme = theme;
    this.views = (ref2 = options.views) != null ? ref2 : [];
    this.current = {
      i: 0
    };
    this.notifications = [];
    this.actionButton = void 0;
    this.snackbar = void 0;
    App.__super__.constructor.call(this, _.defaults(options, {
      name: 'App',
      size: Screen.size,
      backgroundColor: null,
      index: 1
    }));
    app = this;
    this.header = new Header({
      theme: theme,
      index: 999
    });
    this.footer = new Layer({
      name: 'Footer',
      width: Screen.width,
      height: 48,
      image: 'images/nav_bar.png',
      index: 999,
      y: Align.bottom()
    });
    if (this._bottomNav) {
      this.bottomNav = new BottomNav({
        name: 'Bottom Nav',
        destinations: (ref3 = this._bottomNav.links) != null ? ref3 : "md.app.bottomNav needs an array of links. Example: [{title: 'Home', icon: 'home', action: -> view.linkTo(home)}]",
        y: this.footer != null ? Align.bottom(-this.footer.height) : Align.bottom(),
        index: 998
      });
    }
    if (this._menuOverlay) {
      this.menuOverlay = new MenuOverlay({
        name: 'Menu Overlay',
        title: (function() {
          if ((ref4 = this._menuOverlay.title) != null) {
            return ref4;
          } else {
            throw 'md.app.menuOverlay needs a title.';
          }
        }).call(this),
        links: (function() {
          if ((ref5 = this._menuOverlay.links) != null) {
            return ref5;
          } else {
            throw "md.app.menuOverlay needs an array of links. Example: [{title: 'Home', icon: 'home', action: -> view.linkTo(home)}]";
          }
        }).call(this)
      });
    }
    this.keyboard = new Layer({
      name: 'Keyboard',
      y: this.maxY,
      image: theme.keyboard.image,
      width: this.width,
      height: 222,
      index: 1000,
      animationOptions: {
        time: .25
      }
    });
    this.keyboard.onTap((function(_this) {
      return function() {
        return _this.hideKeyboard();
      };
    })(this));
    ref6 = this.views;
    for (i = j = 0, len = ref6.length; j < len; i = ++j) {
      view = ref6[i];
      this.addView(view, i);
    }
    this.changeView(this.views[0]);
  }

  App.prototype.showKeyboard = function() {
    this.keyboard.animate({
      y: Align.bottom()
    });
    return this.keyboard.bringToFront();
  };

  App.prototype.hideKeyboard = function() {
    return this.keyboard.animate({
      y: this.maxY
    });
  };

  App.prototype.addView = function(view, i) {
    view.i = i;
    view.parent = this;
    view.y = this.header.maxY;
    view.height = Screen.height - this.header.height - this.footer.height;
    view.home = view.newPage({
      name: 'home',
      header: {
        title: view._title,
        icon: view._icon,
        iconAction: view._iconAction
      }
    });
    return view.showNext(view.home);
  };

  App.prototype.changeView = function(view) {
    var ref, ref1, ref2, ref3, ref4, ref5, ref6, ref7;
    if (view === this.current) {
      return;
    }
    this.header.title = (ref = (ref1 = view.current._header) != null ? ref1.title : void 0) != null ? ref : 'Default';
    this.header.icon = (ref2 = (ref3 = view.current._header) != null ? ref3.icon : void 0) != null ? ref2 : 'menu';
    this.header.iconAction = (ref4 = (ref5 = view.current._header) != null ? ref5.iconAction : void 0) != null ? ref4 : function() {
      return app.showMenu();
    };
    this.header.visible = (ref6 = (ref7 = view.current._header) != null ? ref7.visible : void 0) != null ? ref6 : true;
    if (view.i > this.current.i) {
      view.x = Screen.width;
      this.current.animate({
        x: -Screen.width
      });
    } else if (view.i < this.current.i) {
      view.x = -Screen.width;
      this.current.animate({
        x: Screen.width
      });
    }
    view.animate({
      x: 0
    });
    view.bringToFront();
    return this.current = view;
  };

  App.prototype.showMenu = function() {
    return this.menuOverlay.show();
  };

  App.prototype.hideMenu = function() {
    return this.menuOverlay.hide();
  };

  App.prototype.changePage = function(page) {
    this.header.title = page._header.title;
    this.header.icon = page._header.icon;
    this.header.iconAction = page._header.iconAction;
    this.header.visible = page._header.visible;
    return page._onLoad();
  };

  return App;

})(Layer);

exports.View = View = (function(superClass) {
  extend(View, superClass);

  function View(options) {
    var ref, ref1, ref2;
    if (options == null) {
      options = {};
    }
    this._title = (ref = options.title) != null ? ref : 'Home';
    this._icon = (ref1 = options.icon) != null ? ref1 : 'menu';
    this._iconAction = (ref2 = options.iconAction) != null ? ref2 : function() {
      return app.menuOverlay.show();
    };
    View.__super__.constructor.call(this, _.defaults(options, {
      name: 'View',
      animationOptions: {
        curve: "spring(300, 35, 0)"
      },
      shadowSpread: 2,
      shadowColor: 'rgba(0,0,0,.1)',
      shadowBlur: 6
    }));
    this.onTransitionStart(function(current, next, direction) {
      return app.changePage(next);
    });
  }

  View.prototype.newPage = function(options) {
    var page;
    if (options == null) {
      options = {};
    }
    page = new Page(_.defaults(options, {
      size: this.size
    }));
    return page;
  };

  View.prototype.linkTo = function(page) {
    if ((page != null) && this.current !== page) {
      return this.showNext(page);
    }
  };

  return View;

})(FlowComponent);

exports.StatusBar = StatusBar = (function(superClass) {
  extend(StatusBar, superClass);

  function StatusBar(options) {
    if (options == null) {
      options = {};
    }
    StatusBar.__super__.constructor.call(this, _.defaults(options, {
      name: '.',
      width: Screen.width,
      height: 24,
      backgroundColor: theme.statusBar.backgroundColor
    }));
    this.items = new Layer({
      name: '.',
      parent: this,
      size: this.size,
      image: theme.statusBar.image,
      invert: theme.statusBar.invert
    });
  }

  return StatusBar;

})(Layer);

exports.Header = Header = (function(superClass) {
  extend(Header, superClass);

  function Header(options) {
    var ref, ref1, ref2, ref3;
    if (options == null) {
      options = {};
    }
    this._title = void 0;
    this._icon = void 0;
    this._iconAction = (ref = options.iconAction) != null ? ref : function() {
      return null;
    };
    Header.__super__.constructor.call(this, _.defaults(options, {
      name: 'Header',
      width: Screen.width,
      height: 80,
      shadowY: 2,
      shadowBlur: 3,
      shadowColor: 'rgba(0,0,0,.24)',
      backgroundColor: theme.header.backgroundColor
    }));
    this.titleLayer = new type.Title({
      name: '.',
      parent: this,
      x: 72,
      y: Align.bottom(-14),
      color: theme.header.title,
      text: (ref1 = this.title) != null ? ref1 : "No title"
    });
    this.title = (ref2 = options.title) != null ? ref2 : 'Default Header';
    this.iconLayer = new Icon({
      name: '.',
      parent: this,
      x: 12,
      y: Align.center(12),
      icon: 'menu',
      color: theme.header.icon.color
    });
    this.icon = (ref3 = options.icon) != null ? ref3 : 'menu';
    this.statusBar = new StatusBar({
      name: '.',
      parent: this
    });
    this.iconLayer.onTap((function(_this) {
      return function() {
        return _this._iconAction();
      };
    })(this));
    this.iconLayer.onTouchStart((function(_this) {
      return function(event) {
        return ripple(_this, event.point, _this.titleLayer);
      };
    })(this));
  }

  Header.define("title", {
    get: function() {
      return this._title;
    },
    set: function(titleText) {
      this._title = titleText;
      return this.titleLayer.textReplace(this.titleLayer.text, this._title);
    }
  });

  Header.define("icon", {
    get: function() {
      return this._icon;
    },
    set: function(iconName) {
      this._icon = iconName;
      return this.iconLayer.icon = iconName;
    }
  });

  Header.define("iconColor", {
    get: function() {
      return this._icon.color;
    },
    set: function(color) {
      return this.iconLayer.color = color;
    }
  });

  Header.define("iconAction", {
    get: function() {
      return this._iconAction;
    },
    set: function(action) {
      return this._iconAction = action;
    }
  });

  return Header;

})(Layer);

exports.BottomNav = BottomNav = (function(superClass) {
  extend(BottomNav, superClass);

  function BottomNav(options) {
    var destination, i, item, j, len, ref, ref1, ref2, ref3;
    if (options == null) {
      options = {};
    }
    this._destinations = (function() {
      if ((ref = options.destinations) != null) {
        return ref;
      } else {
        throw 'Needs at least one destination.';
      }
    })();
    this._items = [];
    this._initialDestination = (ref1 = options.initialDestination) != null ? ref1 : void 0;
    this._activeDestination = (ref2 = this._initialDestination) != null ? ref2 : this._items[0];
    BottomNav.__super__.constructor.call(this, _.defaults(options, {
      name: 'Bottom Nav',
      y: Align.bottom,
      width: Screen.width,
      height: 56,
      backgroundColor: theme.bottomNav.backgroundColor,
      shadowY: theme.bottomNav.shadowY,
      shadowBlur: theme.bottomNav.shadowBlur,
      shadowColor: theme.bottomNav.shadowColor,
      clip: true
    }));
    ref3 = this._destinations;
    for (i = j = 0, len = ref3.length; j < len; i = ++j) {
      destination = ref3[i];
      item = new Layer({
        name: '.',
        parent: this,
        x: this.width / this._destinations.length * i,
        width: this.width / this._destinations.length,
        height: this.height,
        backgroundColor: null
      });
      item.disk = new Layer({
        name: '.',
        parent: item,
        x: Align.center,
        y: Align.center,
        height: this.height * 1.5,
        width: this.height * 1.5,
        borderRadius: this.height,
        backgroundColor: null
      });
      item.iconLayer = new Icon({
        name: '.',
        parent: item.disk,
        x: Align.center,
        y: Align.center(-8),
        icon: destination.icon,
        animationOptions: {
          time: .15
        }
      });
      item.labelLayer = new type.Caption({
        name: '.',
        parent: item.disk,
        x: Align.center,
        y: Align.center(14),
        width: this.width,
        textAlign: 'center',
        text: destination.title,
        animationOptions: {
          time: .15
        }
      });
      item.action = destination.action;
      item.disk.onTouchStart(function(event) {
        return ripple(this, event.point, this.parent.iconLayer, new Color(theme.primary).alpha(.3));
      });
      item.onTap(function() {
        return this.parent.activeDestination = this;
      });
      this._items.push(item);
      this.showActive(this._items[0]);
    }
  }

  BottomNav.define("activeDestination", {
    get: function() {
      return this._activeDestination;
    },
    set: function(destination) {
      if (destination === this._activeDestination) {
        return;
      }
      this._activeDestination = destination;
      this._activeDestination.action();
      return this.showActive(this._activeDestination);
    }
  });

  BottomNav.prototype.showActive = function(item) {
    var j, len, ref, results, sib;
    item.labelLayer.animate({
      color: theme.primary,
      opacity: 1
    });
    item.iconLayer.color = theme.primary;
    ref = item.siblings;
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      sib = ref[j];
      sib.labelLayer.animate({
        color: '#777'
      });
      results.push(sib.iconLayer.color = '#777');
    }
    return results;
  };

  return BottomNav;

})(Layer);

exports.Page = Page = (function(superClass) {
  extend(Page, superClass);

  function Page(options) {
    var ref, ref1, ref2, ref3, ref4, ref5, ref6, ref7, ref8, ref9;
    if (options == null) {
      options = {};
    }
    this._header = {};
    this._header.title = (ref = (ref1 = options.header) != null ? ref1.title : void 0) != null ? ref : 'New Page';
    this._header.visible = (ref2 = (ref3 = options.header) != null ? ref3.visible : void 0) != null ? ref2 : true;
    this._header.icon = (ref4 = (ref5 = options.header) != null ? ref5.icon : void 0) != null ? ref4 : 'menu';
    this._header.iconAction = (ref6 = (ref7 = options.header) != null ? ref7.iconAction : void 0) != null ? ref6 : function() {
      return null;
    };
    this._template = options.template;
    this._templateOpacity = (ref8 = options.templateOpacity) != null ? ref8 : .5;
    this._onLoad = (ref9 = options.onLoad) != null ? ref9 : function() {
      return null;
    };
    if (this._header.iconAction) {
      this._header.iconAction = _.bind(this._header.iconAction, this);
    }
    if (this._onLoad) {
      this._onLoad = _.bind(this._onLoad, this);
    }
    Page.__super__.constructor.call(this, _.defaults(options, {
      name: 'Page',
      size: Screen.size,
      scrollHorizontal: false,
      backgroundColor: theme.page.primary.backgroundColor
    }));
    this.contentInset = {
      top: 0,
      bottom: 160
    };
    this.content.backgroundColor = null;
    if (this._template != null) {
      this._template.props = {
        parent: this,
        opacity: this._templateOpacity
      };
    }
    this.sendToBack();
  }

  Page.prototype.update = function() {
    return null;
  };

  return Page;

})(ScrollComponent);

exports.RowItem = RowItem = (function(superClass) {
  extend(RowItem, superClass);

  function RowItem(options) {
    var ref, ref1, ref2;
    if (options == null) {
      options = {};
    }
    this._icon = options.icon;
    this._iconBackgroundColor = (ref = options.iconBackgroundColor) != null ? ref : '#777';
    this._text = (ref1 = options.text) != null ? ref1 : 'Row item';
    this._row = (ref2 = options.row) != null ? ref2 : 0;
    this._y = 32 + (this._row * 48);
    RowItem.__super__.constructor.call(this, _.defaults(options, {
      width: Screen.width,
      y: this._y,
      height: 48,
      backgroundColor: null
    }));
    this.icon = new Layer({
      name: '.',
      parent: this,
      x: 16,
      y: Align.center,
      height: 32,
      width: 32,
      borderRadius: 16,
      backgroundColor: this._iconBackgroundColor,
      image: this._icon
    });
    this.labelLayer = new type.Regular({
      name: '.',
      parent: this,
      x: this.icon.maxX + 16,
      y: Align.center,
      color: theme.text.text,
      text: this._text
    });
  }

  return RowItem;

})(Layer);

MenuButton = (function(superClass) {
  extend(MenuButton, superClass);

  function MenuButton(options) {
    var ref, ref1, ref2;
    if (options == null) {
      options = {};
    }
    this._icon = (ref = options.icon) != null ? ref : 'home';
    this._text = (ref1 = options.text) != null ? ref1 : 'Default';
    this._action = (ref2 = options.action) != null ? ref2 : function() {
      return null;
    };
    MenuButton.__super__.constructor.call(this, _.defaults(options, {
      height: 48,
      width: 304,
      backgroundColor: null
    }));
    this.iconLayer = new Icon({
      name: '.',
      parent: this,
      y: Align.center,
      icon: this._icon,
      color: theme.menuOverlay.text
    });
    this.labelLayer = new type.Regular({
      name: 'label',
      parent: this,
      x: this.iconLayer.maxX + 16,
      y: Align.center(),
      color: theme.menuOverlay.text,
      text: this._text
    });
    this.onTap(this._action);
    this.onTap(function() {
      return Utils.delay(.25, (function(_this) {
        return function() {
          return _this.parent.hide();
        };
      })(this));
    });
  }

  return MenuButton;

})(Layer);

exports.MenuOverlay = MenuOverlay = (function(superClass) {
  extend(MenuOverlay, superClass);

  function MenuOverlay(options) {
    var i, j, len, link, links, ref, ref1, ref2, ref3;
    if (options == null) {
      options = {};
    }
    this._links = (ref = options.links) != null ? ref : [
      {
        title: 'Home',
        icon: 'home',
        action: function() {
          return null;
        }
      }
    ];
    this._title = (ref1 = options.title) != null ? ref1 : 'Menu';
    this._image = (ref2 = options.image) != null ? ref2 : null;
    MenuOverlay.__super__.constructor.call(this, _.defaults(options, {
      height: Screen.height,
      width: 304,
      visible: false,
      backgroundColor: theme.menuOverlay.backgroundColor,
      animationOptions: {
        curve: "spring(300, 35, 0)"
      }
    }));
    this.scrim = new Layer({
      name: '.',
      size: Screen.size,
      backgroundColor: 'rgba(0,0,0,.6)',
      opacity: 0,
      visible: false,
      animationOptions: {
        time: .25
      }
    });
    this.scrim.onTap((function(_this) {
      return function() {
        return _this.hide();
      };
    })(this));
    this.onSwipeLeftEnd((function(_this) {
      return function() {
        return _this.hide();
      };
    })(this));
    this.header = new Layer({
      name: '.',
      parent: this,
      width: this.width,
      height: 173,
      image: theme.user.image,
      backgroundColor: theme.menuOverlay.header.backgroundColor
    });
    this.titleIcon = new Layer({
      name: '.',
      parent: this.header,
      x: 16,
      y: 40,
      height: 64,
      width: 64,
      borderRadius: 32,
      backgroundColor: theme.menuOverlay.header.icon
    });
    this.subheaderExpand = new Icon({
      name: '.',
      parent: this.header,
      x: Align.right(-16),
      y: Align.bottom(-16),
      icon: 'menu-down',
      color: theme.menuOverlay.subheader.icon
    });
    this.subheader = new type.Body1({
      name: '.',
      parent: this.header,
      width: this.width,
      x: 16,
      y: Align.bottom(-18),
      text: this._title,
      color: theme.menuOverlay.subheader.text
    });
    links = [];
    ref3 = this._links;
    for (i = j = 0, len = ref3.length; j < len; i = ++j) {
      link = ref3[i];
      links[i] = new MenuButton({
        name: '.',
        parent: this,
        x: 16,
        y: 189 + (48 * i),
        text: link.title,
        icon: link.icon,
        action: link.action
      });
    }
  }

  MenuOverlay.prototype.show = function() {
    this.bringToFront();
    this.visible = true;
    this.x = -Screen.width;
    this.animate({
      x: 0
    });
    this.scrim.placeBehind(this);
    this.scrim.visible = true;
    return this.scrim.animate({
      opacity: 1
    });
  };

  MenuOverlay.prototype.hide = function() {
    this.animate({
      x: -Screen.width
    });
    this.scrim.animate({
      opacity: 0
    });
    return Utils.delay(.3, (function(_this) {
      return function() {
        _this.visible = false;
        _this.scrim.visible = false;
        _this.sendToBack();
        return _this.scrim.sendToBack();
      };
    })(this));
  };

  return MenuOverlay;

})(Layer);

exports.Dialog = Dialog = (function(superClass) {
  extend(Dialog, superClass);

  function Dialog(options) {
    var button, buttonsY, j, len, ref, ref1, ref2, ref3, ref4, ref5, ref6, ref7;
    if (options == null) {
      options = {};
    }
    this.close = bind(this.close, this);
    this.open = bind(this.open, this);
    Dialog.__super__.constructor.call(this, _.defaults(options, {
      name: '.',
      parent: app,
      size: Screen.size,
      backgroundColor: 'rgba(0, 0, 0, .5)',
      opacity: 0
    }));
    this._title = (ref = options.title) != null ? ref : 'Default Title';
    this._body = (ref1 = options.body) != null ? ref1 : 'Body text goes here.';
    this._acceptText = (ref2 = options.acceptText) != null ? ref2 : 'confirm';
    this._acceptAction = (ref3 = options.acceptAction) != null ? ref3 : function() {
      return null;
    };
    this._declineText = (ref4 = options.declineText) != null ? ref4 : '';
    this._declineAction = (ref5 = options.declineAction) != null ? ref5 : function() {
      return null;
    };
    this.on(Events.Tap, function(event) {
      return event.stopPropagation();
    });
    this.container = new Layer({
      name: 'container',
      parent: this,
      x: Align.center,
      height: 128,
      width: Screen.width - 80,
      backgroundColor: theme.dialog.backgroundColor,
      shadowX: 0,
      shadowY: 7,
      shadowBlur: 30,
      opacity: 0,
      shadowColor: 'rgba(0,0,0,.3)'
    });
    this.title = new type.Title({
      name: '.',
      parent: this.container,
      x: 24,
      y: 20,
      fontSize: 16,
      fontWeight: 500,
      color: theme.text.title,
      text: this._title
    });
    this.body = new type.Subhead({
      name: 'body',
      parent: this.container,
      x: 24,
      y: 52,
      width: this.container.width - 42,
      text: this._body
    });
    buttonsY = this._body === '' ? 128 : this.body.maxY + 16;
    this.accept = new Button({
      name: '.',
      parent: this.container,
      x: Align.right(-16),
      y: buttonsY,
      text: this._acceptText.toUpperCase(),
      action: this._acceptAction
    });
    if (this._declineText !== '') {
      this.decline = new Button({
        name: '.',
        parent: this.container,
        x: 0,
        y: buttonsY,
        text: this._declineText.toUpperCase(),
        action: this._declineAction
      });
    }
    this.container.height = this.accept.maxY + 12;
    if ((ref6 = this.decline) != null) {
      ref6.maxX = this.accept.x - 16;
    }
    this.container.y = Align.center(16);
    ref7 = [this.accept, this.decline];
    for (j = 0, len = ref7.length; j < len; j++) {
      button = ref7[j];
      if (button != null) {
        button.onTap(this.close);
      }
    }
    this.open();
  }

  Dialog.prototype.open = function() {
    this.animate({
      opacity: 1,
      options: {
        time: .25
      }
    });
    return this.container.animate({
      opacity: 1,
      options: {
        time: .25,
        delay: .05
      }
    });
  };

  Dialog.prototype.close = function() {
    this.container.animate({
      opacity: 0,
      options: {
        time: .25
      }
    });
    this.animate({
      opacity: 0,
      options: {
        time: .25
      }
    });
    return Utils.delay(.5, (function(_this) {
      return function() {
        return _this.destroy();
      };
    })(this));
  };

  return Dialog;

})(Layer);

exports.Button = Button = Button = (function(superClass) {
  extend(Button, superClass);

  function Button(options) {
    var ref, ref1, ref2;
    if (options == null) {
      options = {};
    }
    this._raised = (ref = options.raised) != null ? ref : false;
    this._type = this._raised ? 'raised' : 'flat';
    this._action = (ref1 = options.action) != null ? ref1 : function() {
      return null;
    };
    Button.__super__.constructor.call(this, _.defaults(options, {
      name: '.',
      width: 0,
      height: 36,
      borderRadius: 2,
      backgroundColor: theme.button[this._type].backgroundColor,
      shadowY: theme.button[this._type].shadowY,
      shadowBlur: theme.button[this._type].shadowBlur,
      shadowColor: theme.button[this._type].shadowColor,
      animationOptions: {
        time: .15
      }
    }));
    this.labelLayer = new type.Button({
      name: '.',
      parent: this,
      color: theme.button[this._type].color,
      text: (ref2 = options.text) != null ? ref2 : 'button',
      textTransform: 'uppercase',
      textAlign: 'center',
      animationOptions: {
        time: .15
      },
      padding: {
        left: 16.5,
        right: 16.5,
        top: 9,
        bottom: 11
      }
    });
    this.size = this.labelLayer.size;
    this.x = options.x;
    this.onTouchStart(function(event) {
      this.showTouched();
      return Utils.delay(1, (function(_this) {
        return function() {
          return _this.reset();
        };
      })(this));
    });
    this.onTouchEnd(function(event) {
      this._action();
      return this.reset();
    });
  }

  Button.prototype.showTouched = function() {
    this.labelLayer.animate({
      brightness: 110,
      saturate: 110
    });
    switch (this._type) {
      case 'flat':
        return this.animate({
          backgroundColor: 'rgba(0,0,0,.05)'
        });
      case 'raised':
        ripple(this, event.point, this.labelLayer);
        return this.animate({
          shadowY: 3,
          shadowSpread: 1
        });
    }
  };

  Button.prototype.reset = function() {
    this.labelLayer.animate({
      brightness: 100,
      saturate: 100
    });
    this.backgroundColor = theme.button[this._type].backgroundColor;
    return this.animate({
      shadowY: theme.button[this._type].shadowY,
      shadowSpread: 0
    });
  };

  return Button;

})(Layer);

exports.ActionButton = ActionButton = ActionButton = (function(superClass) {
  extend(ActionButton, superClass);

  function ActionButton(options) {
    var ref, ref1, ref2;
    if (options == null) {
      options = {};
    }
    this._raised = (ref = options.raised) != null ? ref : false;
    this._action = (ref1 = options.action) != null ? ref1 : function() {
      return null;
    };
    this._icon = (ref2 = options.icon) != null ? ref2 : 'plus';
    ActionButton.__super__.constructor.call(this, _.defaults(options, {
      name: '.',
      x: Align.right(-16),
      y: Align.bottom(-17),
      width: 64,
      height: 64,
      borderRadius: 32,
      backgroundColor: theme.fab.backgroundColor,
      shadowY: 2,
      shadowBlur: 3,
      shadowColor: 'rgba(0,0,0,.25)',
      animationOptions: {
        time: .15
      }
    }));
    if (app.bottomNav != null) {
      this.y -= app.bottomNav.height;
    }
    this.iconLayer = new Icon({
      name: '.',
      parent: this,
      x: Align.center,
      y: Align.center,
      icon: this._icon,
      color: theme.fab.color
    });
    this.onTouchStart(function(event) {
      this.showTouched();
      return Utils.delay(1, (function(_this) {
        return function() {
          return _this.reset();
        };
      })(this));
    });
    this.onTouchEnd(function(event) {
      this._action();
      return this.reset();
    });
    app.actionButton = this;
  }

  ActionButton.prototype.showTouched = function() {
    ripple(this, event.point, this.iconLayer);
    return this.animate({
      shadowY: 3,
      shadowSpread: 1
    });
  };

  ActionButton.prototype.reset = function() {
    return this.animate({
      shadowY: 2,
      shadowSpread: 0
    });
  };

  return ActionButton;

})(Layer);

exports.GridList = GridList = GridList = (function(superClass) {
  extend(GridList, superClass);

  function GridList(options) {
    var ref, ref1;
    if (options == null) {
      options = {};
    }
    this._columns = (ref = options.columns) != null ? ref : 2;
    GridList.__super__.constructor.call(this, _.defaults(options, {
      name: '.',
      width: Screen.width,
      backgroundColor: null
    }));
    this.tiles = [];
    this.tileWidth = (this.width - 24) / this._columns;
    this.tileHeight = (ref1 = options.tileHeight) != null ? ref1 : Screen.width / this._columns;
  }

  GridList.prototype.addTile = function(tile) {
    var ref, ref1;
    tile.i = this.tiles.length;
    this.tiles.push(tile);
    tile.x = 8 + (this.tileWidth + 8) * (tile.i % this._columns);
    tile.y = 8 + (this.tileHeight + 8) * Math.floor(tile.i / this._columns);
    this.height = _.last(this.tiles).maxY;
    if (((ref = this.parent) != null ? (ref1 = ref.parent) != null ? ref1.content : void 0 : void 0) != null) {
      return this.parent.parent.updateContent();
    }
  };

  GridList.prototype.removeTile = function(tile) {
    _.pull(this.tiles, tile);
    tile.destroy();
    return this.repositionTiles();
  };

  GridList.prototype.repositionTiles = function() {
    var i, j, len, ref, ref1, ref2, tile;
    ref = this.tiles;
    for (i = j = 0, len = ref.length; j < len; i = ++j) {
      tile = ref[i];
      tile.i = i;
      tile.animate({
        x: 8 + (this.tileWidth + 8) * (tile.i % this._columns),
        y: 8 + (this.tileHeight + 8) * Math.floor(tile.i / this._columns)
      });
    }
    this.height = _.last(this.tiles).maxY;
    if (((ref1 = this.parent) != null ? (ref2 = ref1.parent) != null ? ref2.content : void 0 : void 0) != null) {
      return this.parent.parent.updateContent();
    }
  };

  return GridList;

})(Layer);

exports.Tile = Tile = Tile = (function(superClass) {
  extend(Tile, superClass);

  function Tile(options) {
    var ref, ref1, ref2, ref3, ref4, ref5, ref6, ref7, ref8;
    if (options == null) {
      options = {};
    }
    this._header = (ref = options.header) != null ? ref : false;
    this._footer = (ref1 = options.footer) != null ? ref1 : false;
    this._action = (ref2 = options.action) != null ? ref2 : function() {
      return null;
    };
    this._headerAction = (ref3 = options.headerAction) != null ? ref3 : function() {
      return null;
    };
    this._footerAction = (ref4 = options.footerAction) != null ? ref4 : function() {
      return null;
    };
    if (this._header && this._footer) {
      throw 'Tile cannot have both a header and a footer.';
    }
    this._icon = options.icon;
    this.gridList = (function() {
      if ((ref5 = options.gridList) != null) {
        return ref5;
      } else {
        throw 'Tile needs a grid property.';
      }
    })();
    Tile.__super__.constructor.call(this, _.defaults(options, {
      name: '.',
      parent: this.gridList,
      width: this.gridList.tileWidth,
      height: this.gridList.tileHeight,
      animationOptions: {
        time: .3
      }
    }));
    this.onTouchStart(function(event) {
      var ref10, ref6, ref7, ref8, ref9;
      if (((ref6 = this.gridList.parent) != null ? (ref7 = ref6.parent) != null ? ref7.content : void 0 : void 0) && ((ref8 = this.gridList.parent) != null ? (ref9 = ref8.parent) != null ? ref9.isMoving : void 0 : void 0) === false) {
        return ripple(this, event.point, this.header, (ref10 = options.rippleColor) != null ? ref10 : 'rgba(0,0,0,.1)');
      }
    });
    this.onTap(this._action);
    this.onTap(function(event) {
      return event.stopPropagation();
    });
    if (this._header || this._footer) {
      this.header = new Layer({
        name: '.',
        parent: this,
        y: this._footer ? Align.bottom() : void 0,
        width: this.width,
        height: options.support ? 68 : 48,
        backgroundColor: (ref6 = options.backgroundColor) != null ? ref6 : 'rgba(0,0,0,.5)'
      });
      this.header.onTouchStart(function(event) {
        return ripple(this, event.point, this.title);
      });
      if (this._footer) {
        this.header.onTap(this._footerAction);
      } else {
        this.header.onTap(this._headerAction);
      }
      this.header.onTap(function(event) {
        return event.stopPropagation();
      });
      if (options.title) {
        this.header.title = new type.Regular({
          name: '.',
          parent: this.header,
          x: 8,
          y: options.support ? 12 : Align.center(),
          color: this.color,
          text: (ref7 = options.title) != null ? ref7 : 'Two Line'
        });
        if (options.support) {
          this.header.support = new TextLayer({
            name: '.',
            parent: this.header,
            x: 8,
            y: 35,
            fontSize: 12,
            fontFamily: 'Roboto',
            color: this.color,
            text: (ref8 = options.support) != null ? ref8 : 'Support text'
          });
        }
      }
      if (options.icon) {
        this.header.icon = new Icon({
          name: '.',
          parent: this.header,
          x: Align.right(-12),
          y: options.support ? 20 : Align.center(),
          icon: options.icon,
          color: this.color
        });
      }
    }
    this.i = void 0;
    this.gridList.addTile(this);
  }

  return Tile;

})(Layer);

exports.Snackbar = Snackbar = Snackbar = (function(superClass) {
  extend(Snackbar, superClass);

  function Snackbar(options) {
    var ref, ref1, ref2, ref3, ref4, titleWidth;
    if (options == null) {
      options = {};
    }
    this.hide = bind(this.hide, this);
    this.show = bind(this.show, this);
    this._title = (ref = options.title) != null ? ref : 'Snackbar';
    this._timeout = (ref1 = options.timeout) != null ? ref1 : 4;
    this._action = options.action;
    Snackbar.__super__.constructor.call(this, _.defaults(options, {
      name: '.',
      width: app.width,
      clip: true,
      backgroundColor: theme.snackbar.backgroundColor,
      animationOptions: {
        time: .25
      }
    }));
    titleWidth = this.width - 48;
    if (this._action != null) {
      this.action = new Button({
        parent: this,
        x: Align.right(-8),
        y: 4,
        color: (ref2 = this._action.color) != null ? ref2 : theme.colors.primary.light,
        text: this._action.title.toUpperCase(),
        action: this._action.action
      });
      this.action.onTap(this.hide);
      titleWidth = this.action.x - 8 - 24;
    }
    this.textLabel = new type.Body1({
      name: 'Title',
      parent: this,
      x: 24,
      y: 14,
      width: titleWidth,
      text: this._title,
      color: theme.snackbar.color
    });
    this.height = this.textLabel.maxY + 14;
    if ((ref3 = this.action) != null) {
      ref3.y = Align.center;
    }
    this.y = app.bottomNav != null ? (ref4 = Align.bottom(-app.bottomNav.height + this.height)) != null ? ref4 : Align.bottom(this.height) : void 0;
    Utils.delay(this._timeout, this.hide);
    this.show();
  }

  Snackbar.prototype.show = function() {
    var ref;
    if (app.snackbar != null) {
      app.snackbar.hide();
      Utils.delay(1, this.show);
    } else {
      app.snackbar = this;
      if ((ref = app.actionButton) != null) {
        ref.animate({
          y: app.actionButton.y - this.height,
          options: this.animationOptions
        });
      }
      return this.animate({
        y: this.y - this.height
      });
    }
  };

  Snackbar.prototype.hide = function() {
    var ref;
    app.snackbar = void 0;
    if ((ref = app.actionButton) != null) {
      ref.animate({
        y: app.actionButton.y + this.height,
        options: this.animationOptions
      });
    }
    this.animate({
      height: 0,
      y: this.y + this.height
    });
    return Utils.delay(.5, (function(_this) {
      return function() {
        return _this.destroy();
      };
    })(this));
  };

  return Snackbar;

})(Layer);

exports.Notification = Notification = Notification = (function(superClass) {
  extend(Notification, superClass);

  function Notification(options) {
    var divider, ref, ref1, ref2, ref3, ref4, ref5, ref6, ref7;
    if (options == null) {
      options = {};
    }
    this.close = bind(this.close, this);
    this.open = bind(this.open, this);
    this._title = (ref = options.title) != null ? ref : 'Notification';
    this._body = (ref1 = options.body) != null ? ref1 : 'This is a notification.';
    this._icon = (ref2 = options.icon) != null ? ref2 : void 0;
    this._iconColor = (ref3 = options.iconColor) != null ? ref3 : theme.text.secondary;
    this._iconBackgroundColor = (ref4 = options.iconBackgroundColor) != null ? ref4 : theme.secondary;
    this._time = (ref5 = options.time) != null ? ref5 : new Date();
    this._action1 = options.action1;
    this._action2 = options.action2;
    this._timeout = (ref6 = options.timeout) != null ? ref6 : 5;
    Notification.__super__.constructor.call(this, _.defaults(options, {
      name: (ref7 = options.name) != null ? ref7 : '.',
      parent: app,
      width: 344,
      borderRadius: 2,
      x: Align.center,
      y: app.notifications.length > 0 ? _.last(app.notifications).maxY + 8 : app.header.maxY + 4,
      backgroundColor: theme.dialog.backgroundColor,
      shadowX: 0,
      shadowY: 2,
      shadowBlur: 3,
      opacity: 0,
      shadowColor: 'rgba(0,0,0,.3)',
      animationOptions: {
        time: .25
      }
    }));
    app.notifications.push(this);
    this.iconLayer = new Layer({
      name: 'Icon Container',
      parent: this,
      x: 12,
      y: 12,
      height: 40,
      width: 40,
      borderRadius: 20,
      backgroundColor: this._iconBackgroundColor
    });
    if (this._icon) {
      this.icon = new Icon({
        name: 'Icon',
        parent: this.iconLayer,
        x: Align.center,
        y: Align.center,
        color: this._iconColor,
        icon: this._icon
      });
    }
    this.title = new type.Subhead({
      name: 'Title',
      parent: this,
      x: 64,
      y: 8,
      width: this.width - 72,
      color: 'rgba(0,0,0,.87)',
      text: this._title
    });
    this.body = new type.Body1({
      name: 'Body',
      parent: this,
      x: 64,
      y: this.title.maxY,
      width: this.width - 72,
      text: this._body
    });
    this.date = new type.Caption({
      name: 'Date',
      parent: this,
      x: Align.right(-9),
      y: 15,
      text: this._time.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit"
      })
    });
    this.height = _.clamp(this.body.maxY + 13, 64, 2e308);
    if (this._action1 != null) {
      divider = new Divider({
        name: 'Divider',
        parent: this,
        x: 64,
        y: this.body.maxY + 11,
        width: this.width - 64
      });
      if (this._action1 != null) {
        this.action1 = new Layer({
          name: 'Action 1',
          parent: this,
          x: 64,
          y: divider.maxY + 11,
          width: 80,
          height: 24,
          backgroundColor: null
        });
        this.action1.icon = new Icon({
          name: 'Icon',
          parent: this.action1,
          icon: this._action1.icon,
          width: 18,
          height: 18,
          color: 'rgba(0,0,0,.54)'
        });
        this.action1.label = new type.Caption({
          name: 'Label',
          parent: this.action1,
          x: this.action1.icon.maxX + 8,
          fontSize: 13,
          text: this._action1.title.toUpperCase()
        });
        this.action1.width = this.action1.label.maxX;
        this.action1.onTap(this.close);
        if (this._action1.action) {
          this.action1.onTap((function(_this) {
            return function() {
              return Utils.delay(.25, _.bind(_this._action1.action, _this));
            };
          })(this));
        }
        if (this._action2 != null) {
          this.action2 = new Layer({
            name: 'Action 2',
            parent: this,
            x: this.action1.maxX + 45,
            y: divider.maxY + 11,
            width: 80,
            height: 24,
            backgroundColor: null
          });
          this.action2.icon = new Icon({
            name: 'Icon',
            parent: this.action2,
            icon: this._action2.icon,
            width: 18,
            height: 18,
            color: 'rgba(0,0,0,.54)'
          });
          this.action2.label = new type.Caption({
            name: 'Label',
            parent: this.action2,
            x: this.action2.icon.maxX + 8,
            fontSize: 13,
            text: this._action2.title.toUpperCase()
          });
          this.action2.width = this.action2.label.maxX;
          this.action2.onTap(this.close);
          if (this._action2.action) {
            this.action2.onTap((function(_this) {
              return function() {
                return Utils.delay(.25, _.bind(_this._action2.action, _this));
              };
            })(this));
          }
        }
        this.height = divider.maxY + 47;
      }
    }
    this.open();
    this.onSwipeLeftEnd((function(_this) {
      return function() {
        return _this.close('left');
      };
    })(this));
    this.onSwipeRightEnd((function(_this) {
      return function() {
        return _this.close('right');
      };
    })(this));
    Utils.delay(this._timeout, (function(_this) {
      return function() {
        if (!_this.closed) {
          return _this.close('right');
        }
      };
    })(this));
  }

  Notification.prototype.open = function() {
    return this.animate({
      opacity: 1
    });
  };

  Notification.prototype.close = function(direction) {
    var j, len, notification, ref;
    _.pull(app.notifications, this);
    this.animate({
      x: direction === 'left' ? -Screen.width : Screen.width,
      opacity: 0
    });
    ref = app.notifications;
    for (j = 0, len = ref.length; j < len; j++) {
      notification = ref[j];
      if (notification.y > this.maxY) {
        notification.animate({
          y: notification.y - this.height
        });
      }
    }
    this.closed = true;
    return Utils.delay(.5, (function(_this) {
      return function() {
        return _this.destroy();
      };
    })(this));
  };

  return Notification;

})(Layer);

exports.Divider = Divider = Divider = (function(superClass) {
  extend(Divider, superClass);

  function Divider(options) {
    if (options == null) {
      options = {};
    }
    Divider.__super__.constructor.call(this, _.defaults(options, {
      name: '.',
      width: 200,
      height: 1,
      backgroundColor: theme.divider.backgroundColor
    }));
  }

  return Divider;

})(Layer);

exports.Switch = Switch = Switch = (function(superClass) {
  extend(Switch, superClass);

  function Switch(options) {
    var ref;
    if (options == null) {
      options = {};
    }
    this._isOn = void 0;
    Switch.__super__.constructor.call(this, _.defaults(options, {
      name: '.',
      width: 34,
      height: 14,
      borderRadius: 7,
      backgroundColor: 'rgba(34, 31, 31, .26)',
      animationOptions: {
        time: .15
      }
    }));
    this.knob = new Layer({
      name: '.',
      parent: this,
      x: 0,
      y: Align.center,
      width: 20,
      height: 20,
      borderRadius: 10,
      backgroundColor: 'F1F1F1',
      shadowY: 2,
      shadowBlur: 3,
      animationOptions: {
        time: .15
      }
    });
    this.isOn = (ref = options.isOn) != null ? ref : false;
    this.onTap(function() {
      return this.isOn = !this.isOn;
    });
  }

  Switch.define("isOn", {
    get: function() {
      return this._isOn;
    },
    set: function(bool) {
      if (bool === this._isOn) {
        return;
      }
      this._isOn = bool;
      this.emit("change:isOn", this._isOn, this);
      return this.update();
    }
  });

  Switch.prototype.update = function() {
    if (this._isOn) {
      this.knob.animate({
        x: Align.right(),
        backgroundColor: theme.colors.primary.main
      });
      return this.animate({
        backgroundColor: theme.colors.primary.light
      });
    } else {
      this.knob.animate({
        x: 0,
        backgroundColor: 'F1F1F1'
      });
      return this.animate({
        backgroundColor: 'rgba(34, 31, 31, .26)'
      });
    }
  };

  return Switch;

})(Layer);

exports.Checkbox = CheckBox = Checkbox = (function(superClass) {
  extend(Checkbox, superClass);

  function Checkbox(options) {
    var ref;
    if (options == null) {
      options = {};
    }
    this._isOn = void 0;
    Checkbox.__super__.constructor.call(this, _.defaults(options, {
      name: '.',
      animationOptions: {
        time: .15
      },
      icon: 'checkbox-blank-outline',
      color: 'rgba(0,0,0,.54)'
    }));
    this.isOn = (ref = options.isOn) != null ? ref : false;
    this.onTap(function() {
      return this.isOn = !this.isOn;
    });
  }

  Checkbox.define("isOn", {
    get: function() {
      return this._isOn;
    },
    set: function(bool) {
      if (bool === this._isOn) {
        return;
      }
      this._isOn = bool;
      this.emit("change:isOn", this._isOn, this);
      return this.update();
    }
  });

  Checkbox.prototype.update = function() {
    if (this._isOn) {
      this.icon = 'checkbox-marked';
      return this.color = theme.colors.primary.main;
    } else {
      this.icon = 'checkbox-blank-outline';
      return this.color = 'rgba(0,0,0,.54)';
    }
  };

  return Checkbox;

})(Icon);

exports.Radiobox = Radiobox = Radiobox = (function(superClass) {
  extend(Radiobox, superClass);

  function Radiobox(options) {
    var ref, ref1;
    if (options == null) {
      options = {};
    }
    this._isOn = void 0;
    this._group = (ref = options.group) != null ? ref : [];
    Radiobox.__super__.constructor.call(this, _.defaults(options, {
      name: '.',
      animationOptions: {
        time: .15
      },
      icon: 'radiobox-blank',
      color: 'rgba(0,0,0,.54)'
    }));
    this.isOn = (ref1 = options.isOn) != null ? ref1 : false;
    this.onTap(function() {
      if (this.isOn === false) {
        return this.isOn = true;
      }
    });
    this._group.push(this);
  }

  Radiobox.define("isOn", {
    get: function() {
      return this._isOn;
    },
    set: function(bool) {
      if (bool === this._isOn) {
        return;
      }
      this._isOn = bool;
      this.emit("change:isOn", this._isOn, this);
      return this.update();
    }
  });

  Radiobox.prototype.update = function() {
    var j, len, radiobox, ref, results;
    if (this._isOn) {
      this.icon = 'radiobox-marked';
      this.color = theme.colors.primary.main;
      ref = _.without(this._group, this);
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        radiobox = ref[j];
        results.push(radiobox.isOn = false);
      }
      return results;
    } else {
      this.icon = 'radiobox-blank';
      return this.color = 'rgba(0,0,0,.54)';
    }
  };

  return Radiobox;

})(Icon);

exports.Slider = Slider = Slider = (function(superClass) {
  extend(Slider, superClass);

  function Slider(options) {
    var i, j, notch, ref, ref1, round;
    if (options == null) {
      options = {};
    }
    this._notched = (ref = options.notched) != null ? ref : false;
    Slider.__super__.constructor.call(this, _.defaults(options, {
      height: 2,
      backgroundColor: 'rgba(0,0,0,.26)',
      min: 1,
      max: 10
    }));
    this.fill.backgroundColor = theme.colors.primary.main;
    this.knob.props = {
      backgroundColor: null,
      shadowX: 0,
      shadowY: 0,
      shadowBlur: 0
    };
    this.thumb = new Layer({
      name: '.',
      parent: this.knob,
      x: Align.center,
      y: Align.center,
      height: 12,
      width: 12,
      borderRadius: 12,
      backgroundColor: theme.colors.primary.main,
      animationOptions: {
        time: .15
      }
    });
    if (this._notched) {
      for (i = j = 0, ref1 = this.max - this.min; 0 <= ref1 ? j < ref1 : j > ref1; i = 0 <= ref1 ? ++j : --j) {
        notch = new Layer({
          name: '.',
          parent: this,
          x: i * this.width / (this.max - this.min),
          width: 2,
          height: 2,
          borderRadius: 2,
          backgroundColor: theme.colors.primary.text
        });
      }
      this.tip = new Layer({
        parent: this.knob,
        x: Align.center,
        y: -24,
        width: 26,
        height: 32,
        html: '<svg width="26px" height="32px" viewBox="0 0 26 32"><path d="M13,0.1 C20.2,0.1 26,6 26,13.3 C26,17 24,20.9 18.7,26.2 L13,32 L7.2,26.2 C2,20.8 0,16.9 0,13.3 C-3.55271368e-15,6 5.8,0.1 13,0.1 L13,0.1 Z" fill="' + theme.colors.primary.main + '"></path></svg>',
        backgroundColor: null,
        opacity: 0,
        animationOptions: {
          time: .15
        }
      });
      this.tipValue = new TextLayer({
        name: 'Tip Value',
        parent: this.tip,
        y: 5,
        width: 26,
        color: theme.colors.primary.text,
        fontSize: 12,
        fontFamily: 'Roboto',
        textAlign: 'center',
        text: "{value}"
      });
      this.tipValue.template = {
        value: this.value
      };
      this.knob.onTouchStart((function(_this) {
        return function() {
          _this.thumb.animate({
            opacity: 0
          });
          return _this.tip.animate({
            opacity: 1
          });
        };
      })(this));
      this.onTouchEnd(function() {
        this.thumb.animate({
          opacity: 1
        });
        return this.tip.animate({
          opacity: 0
        });
      });
      round = function(number, nearest) {
        return Math.round(number / nearest) * nearest;
      };
      this.knob.draggable.updatePosition = (function(_this) {
        return function(point) {
          point.x = round(point.x, _this.width / (_this.max - _this.min)) - (_this.knob.width / 2);
          return point;
        };
      })(this);
      this.onValueChange(function() {
        return this.tipValue.template = Math.round(this.value);
      });
    } else {
      this.knob.onTouchStart((function(_this) {
        return function() {
          return _this.thumb.animate({
            width: 18,
            height: 18,
            x: 6,
            y: 6
          });
        };
      })(this));
      this.knob.onTouchEnd((function(_this) {
        return function() {
          return _this.thumb.animate({
            width: 12,
            height: 12,
            x: 9,
            y: 9
          });
        };
      })(this));
    }
  }

  return Slider;

})(SliderComponent);


},{"icon":"icon","ripple":"ripple","theme":"theme","type":"type"}],"ripple":[function(require,module,exports){
var ripple;

ripple = function(layer, point, placeBehind, color) {
  var longSide, mask, rippleCircle;
  if (layer == null) {
    throw 'Ripple requires a Layer. Try myLayer.onTouchStart (event) -> ripple(@, event.point)';
  }
  if (point == null) {
    throw 'Ripple requires a point. Try myLayer.onTouchStart (event) -> ripple(@, event.point)';
  }
  mask = new Layer({
    name: '.',
    parent: layer,
    size: layer.size,
    borderRadius: layer.borderRadius,
    backgroundColor: null,
    clip: true,
    opacity: 0,
    animationOptions: {
      time: .15
    }
  });
  if (placeBehind) {
    mask.placeBehind(placeBehind);
  }
  longSide = layer.width > layer.height ? layer.width : layer.height;
  rippleCircle = new Layer({
    name: '.',
    parent: mask,
    x: point.x - 16,
    y: point.y - 16,
    width: 32,
    height: 32,
    borderRadius: longSide
  });
  if (color != null) {
    rippleCircle.props = {
      backgroundColor: color
    };
  } else {
    rippleCircle.props = {
      backgroundColor: layer.backgroundColor,
      saturate: 120,
      brightness: 120,
      opacity: .5
    };
  }
  mask.animate({
    opacity: 1,
    options: {
      time: .15
    }
  });
  rippleCircle.animate({
    x: rippleCircle.x - longSide * 1.3,
    y: rippleCircle.y - longSide * 1.3,
    width: longSide * 2.6,
    height: longSide * 2.6,
    options: {
      time: .5
    }
  });
  Utils.delay(2, function() {
    mask.animate({
      opacity: 0
    });
    return mask.onAnimationEnd(mask.destroy);
  });
  return layer.onTouchEnd(function() {
    mask.animate({
      opacity: 0
    });
    return mask.onAnimationEnd(mask.destroy);
  });
};

exports.ripple = ripple;


},{}],"theme":[function(require,module,exports){
var menuColor, menuInvert, menuTextColor, modifyColor, primaryColor, primaryInvert, secondaryColor, source, theme;

modifyColor = function(color, h, s, l) {
  var clip, newColor;
  clip = _.replace(_.replace(color.toHslString().slice(4, -1), '%', ''), '%', '').split(', ');
  newColor = new Color({
    h: _.parseInt(clip[0]) + h,
    s: (_.parseInt(clip[1]) + s) / 100,
    l: (_.parseInt(clip[2]) + l) / 100,
    a: 1
  });
  return newColor;
};

primaryColor = primary_color.backgroundColor;

primaryInvert = 100 - (primary_invert.opacity * 100);

secondaryColor = secondary_color.backgroundColor;

menuColor = menu_color.backgroundColor;

menuTextColor = menu_text_color.color;

menuInvert = 100 - (menu_invert.opacity * 100);

source = {
  colors: {
    primary: {
      main: primaryColor,
      light: modifyColor(primaryColor, 13, -5, 15),
      dark: modifyColor(primaryColor, -1, -7, -12),
      text: primary_text_color.color,
      invert: primaryInvert
    },
    secondary: {
      main: secondaryColor,
      light: modifyColor(secondaryColor, 13, -5, 15),
      dark: modifyColor(secondaryColor, -1, -7, -12),
      text: secondary_text_color.color
    },
    menu: {
      light: menuColor,
      text: menuTextColor,
      invert: menuInvert
    }
  }
};

theme = {
  tint: source.colors.secondary.main,
  primary: source.colors.primary.main,
  secondary: source.colors.secondary.main,
  menu: source.colors.menu.light,
  colors: source.colors,
  user: {
    image: void 0
  },
  header: {
    backgroundColor: source.colors.primary.main,
    title: source.colors.primary.text,
    invert: primaryInvert,
    icon: {
      color: source.colors.primary.text
    },
    tabs: {
      backgroundColor: source.colors.primary.light,
      color: source.colors.primary.text,
      selector: source.colors.secondary.main
    }
  },
  statusBar: {
    image: 'images/status_bar.png',
    backgroundColor: source.colors.primary.dark,
    invert: primaryInvert
  },
  bottomNav: {
    backgroundColor: '#FFFFFF',
    shadowY: -2,
    shadowBlur: 6,
    shadowColor: 'rgba(0,0,0,.1)'
  },
  page: {
    primary: {
      backgroundColor: '#E1E2E1'
    },
    secondary: {
      backgroundColor: '#F5F5F6'
    }
  },
  menuOverlay: {
    header: {
      backgroundColor: source.colors.secondary.main,
      icon: source.colors.secondary.light,
      text: source.colors.secondary.text
    },
    subheader: {
      color: source.colors.menu.text,
      text: source.colors.secondary.text,
      icon: source.colors.secondary.text
    },
    backgroundColor: source.colors.menu.light,
    text: source.colors.menu.text,
    slider: {
      knob: source.colors.secondary.light,
      fill: source.colors.secondary.dark
    },
    invert: source.colors.menu.invert
  },
  button: {
    flat: {
      backgroundColor: null,
      color: source.colors.secondary.main,
      shadowY: 0,
      shadowColor: 'rgba(0,0,0,.18)',
      shadowBlur: 0
    },
    raised: {
      backgroundColor: source.colors.secondary.main,
      color: source.colors.secondary.text,
      shadowY: 2,
      shadowColor: 'rgba(0,0,0,.18)',
      shadowBlur: 6
    }
  },
  fab: {
    backgroundColor: source.colors.secondary.main,
    color: source.colors.secondary.text,
    invert: primaryInvert
  },
  dialog: {
    backgroundColor: '#FAFAFA'
  },
  divider: {
    backgroundColor: 'rgba(0,0,0,.12)'
  },
  text: {
    primary: source.colors.primary.text,
    secondary: source.colors.secondary.text
  },
  table: {
    backgroundColor: '#FFFFFF',
    text: source.colors.primary.text,
    checkBox: {
      backgroundColor: null,
      borderColor: '#D3D3D3'
    },
    selected: {
      backgroundColor: source.colors.secondary.main,
      text: source.colors.primary.text,
      checkBox: {
        backgroundColor: source.colors.secondary.dark,
        borderColor: null
      }
    }
  },
  snackbar: {
    backgroundColor: 'rgba(51, 51, 51, 1)',
    color: 'rgba(255, 255, 255, 1)'
  },
  slider: {
    knob: source.colors.primary.light,
    fill: source.colors.primary.dark
  },
  card: {
    header: source.colors.secondary.dark
  },
  navBar: {
    backgroundColor: '#000000'
  },
  keyboard: {
    image: 'images/keyboard.png'
  }
};

color_pallete.destroy();

exports.theme = theme;


},{}],"type":[function(require,module,exports){
var theme,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

theme = require('theme');

Utils.insertCSS("@font-face {\n  font-family: \"Roboto\";\n  src: url(\"fonts/Roboto-Regular.ttf\");");

exports.Headline = (function(superClass) {
  extend(Headline, superClass);

  function Headline(options) {
    Headline.__super__.constructor.call(this, _.defaults(options, {
      name: '.',
      fontFamily: 'Roboto',
      fontSize: 24,
      fontWeight: 400,
      lineHeight: 1.3,
      color: 'rgba(0,0,0,.87)'
    }));
  }

  return Headline;

})(TextLayer);

exports.Subhead = (function(superClass) {
  extend(Subhead, superClass);

  function Subhead(options) {
    Subhead.__super__.constructor.call(this, _.defaults(options, {
      name: '.',
      fontFamily: 'Roboto',
      fontSize: 16,
      fontWeight: 400,
      lineHeight: 1.5,
      color: 'rgba(0,0,0,.54)'
    }));
  }

  return Subhead;

})(TextLayer);

exports.Title = (function(superClass) {
  extend(Title, superClass);

  function Title(options) {
    Title.__super__.constructor.call(this, _.defaults(options, {
      name: '.',
      fontFamily: 'Roboto',
      fontSize: 20,
      fontWeight: 500,
      lineHeight: 1.3,
      color: 'rgba(0,0,0,.87)'
    }));
  }

  return Title;

})(TextLayer);

exports.Regular = (function(superClass) {
  extend(Regular, superClass);

  function Regular(options) {
    Regular.__super__.constructor.call(this, _.defaults(options, {
      name: '.',
      fontFamily: 'Roboto',
      fontSize: 16,
      fontWeight: 400,
      lineHeight: 1.3,
      color: 'rgba(0,0,0,.87)'
    }));
  }

  return Regular;

})(TextLayer);

exports.Body2 = (function(superClass) {
  extend(Body2, superClass);

  function Body2(options) {
    Body2.__super__.constructor.call(this, _.defaults(options, {
      name: '.',
      fontFamily: 'Roboto',
      fontSize: 14,
      fontWeight: 500,
      lineHeight: 1.3,
      color: 'rgba(0,0,0,.87)'
    }));
  }

  return Body2;

})(TextLayer);

exports.Menu = (function(superClass) {
  extend(Menu, superClass);

  function Menu(options) {
    Menu.__super__.constructor.call(this, _.defaults(options, {
      name: '.',
      fontFamily: 'Roboto',
      fontSize: 14,
      fontWeight: 500,
      lineHeight: 1.7,
      color: 'rgba(0,0,0,.87)'
    }));
  }

  return Menu;

})(TextLayer);

exports.Body1 = (function(superClass) {
  extend(Body1, superClass);

  function Body1(options) {
    Body1.__super__.constructor.call(this, _.defaults(options, {
      name: '.',
      fontFamily: 'Roboto',
      fontSize: 14,
      fontWeight: 400,
      lineHeight: 1.4,
      color: 'rgba(0,0,0,.87)'
    }));
  }

  return Body1;

})(TextLayer);

exports.Caption = (function(superClass) {
  extend(Caption, superClass);

  function Caption(options) {
    Caption.__super__.constructor.call(this, _.defaults(options, {
      name: '.',
      fontFamily: 'Roboto',
      fontSize: 12,
      fontWeight: 400,
      lineHeight: 1.3,
      color: 'rgba(0,0,0,.54)'
    }));
  }

  return Caption;

})(TextLayer);

exports.Button = (function(superClass) {
  extend(Button, superClass);

  function Button(options) {
    Button.__super__.constructor.call(this, _.defaults(options, {
      name: '.',
      fontFamily: 'Roboto',
      fontSize: 14,
      fontWeight: 500,
      lineHeight: 1.3,
      color: '#009688',
      letterSpacing: 0.5,
      padding: {
        left: 4,
        right: 4,
        top: 8,
        bottom: 0
      }
    }));
  }

  return Button;

})(TextLayer);


},{"theme":"theme"}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3N0ZXZlcnVpei9MaWJyYXJ5L01vYmlsZSBEb2N1bWVudHMvY29tfmFwcGxlfkNsb3VkRG9jcy9HaXRIdWIvZnJhbWVyLW1kL01hdGVyaWFsLmZyYW1lci9tb2R1bGVzL3R5cGUuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvc3RldmVydWl6L0xpYnJhcnkvTW9iaWxlIERvY3VtZW50cy9jb21+YXBwbGV+Q2xvdWREb2NzL0dpdEh1Yi9mcmFtZXItbWQvTWF0ZXJpYWwuZnJhbWVyL21vZHVsZXMvdGhlbWUuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvc3RldmVydWl6L0xpYnJhcnkvTW9iaWxlIERvY3VtZW50cy9jb21+YXBwbGV+Q2xvdWREb2NzL0dpdEh1Yi9mcmFtZXItbWQvTWF0ZXJpYWwuZnJhbWVyL21vZHVsZXMvcmlwcGxlLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3N0ZXZlcnVpei9MaWJyYXJ5L01vYmlsZSBEb2N1bWVudHMvY29tfmFwcGxlfkNsb3VkRG9jcy9HaXRIdWIvZnJhbWVyLW1kL01hdGVyaWFsLmZyYW1lci9tb2R1bGVzL21kLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3N0ZXZlcnVpei9MaWJyYXJ5L01vYmlsZSBEb2N1bWVudHMvY29tfmFwcGxlfkNsb3VkRG9jcy9HaXRIdWIvZnJhbWVyLW1kL01hdGVyaWFsLmZyYW1lci9tb2R1bGVzL2ljb24uY29mZmVlIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJ0aGVtZSA9IHJlcXVpcmUgJ3RoZW1lJ1xuXG4jIFx0ZDg4ODg4OFAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZFBcbiMgXHQgICA4OCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA4OFxuIyBcdCAgIDg4ICAgIGRQICAgIGRQIDg4ZDg4OGIuIC5kODg4OGIuIC5kODg4OGIuIDg4ZDg4OGIuIC5kODg4OGIuIDg4ZDg4OGIuIDg4ZDg4OGIuIGRQICAgIGRQXG4jIFx0ICAgODggICAgODggICAgODggODgnICBgODggODgnICBgODggODgnICBgODggODgnICBgODggODgnICBgODggODgnICBgODggODgnICBgODggODggICAgODhcbiMgXHQgICA4OCAgICA4OC4gIC44OCA4OC4gIC44OCA4OC4gIC44OCA4OC4gIC44OCA4OCAgICAgICA4OC4gIC44OCA4OC4gIC44OCA4OCAgICA4OCA4OC4gIC44OFxuIyBcdCAgIGRQICAgIGA4ODg4UDg4IDg4WTg4OFAnIGA4ODg4OFAnIGA4ODg4UDg4IGRQICAgICAgIGA4ODg4OFA4IDg4WTg4OFAnIGRQICAgIGRQIGA4ODg4UDg4XG4jIFx0ICAgICAgICAgICAgICAuODggODggICAgICAgICAgICAgICAgICAgICAuODggICAgICAgICAgICAgICAgICAgODggICAgICAgICAgICAgICAgICAgICAuODhcbiMgXHQgICAgICAgICAgZDg4ODhQICBkUCAgICAgICAgICAgICAgICAgZDg4ODhQICAgICAgICAgICAgICAgICAgICBkUCAgICAgICAgICAgICAgICAgZDg4ODhQXG5cblV0aWxzLmluc2VydENTUyhcblx0XCJcIlwiXG4gICAgQGZvbnQtZmFjZSB7XG4gICAgICBmb250LWZhbWlseTogXCJSb2JvdG9cIjtcbiAgICAgIHNyYzogdXJsKFwiZm9udHMvUm9ib3RvLVJlZ3VsYXIudHRmXCIpO1xuICAgIFwiXCJcIilcblxuY2xhc3MgZXhwb3J0cy5IZWFkbGluZSBleHRlbmRzIFRleHRMYXllclxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMpIC0+XG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0bmFtZTogJy4nXG5cdFx0XHRmb250RmFtaWx5OiAnUm9ib3RvJ1xuXHRcdFx0Zm9udFNpemU6IDI0XG5cdFx0XHRmb250V2VpZ2h0OiA0MDBcblx0XHRcdGxpbmVIZWlnaHQ6IDEuM1xuXHRcdFx0Y29sb3I6ICdyZ2JhKDAsMCwwLC44NyknXG5cbmNsYXNzIGV4cG9ydHMuU3ViaGVhZCBleHRlbmRzIFRleHRMYXllclxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMpIC0+XG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0bmFtZTogJy4nXG5cdFx0XHRmb250RmFtaWx5OiAnUm9ib3RvJ1xuXHRcdFx0Zm9udFNpemU6IDE2XG5cdFx0XHRmb250V2VpZ2h0OiA0MDAsIFxuXHRcdFx0bGluZUhlaWdodDogMS41LFxuXHRcdFx0Y29sb3I6ICdyZ2JhKDAsMCwwLC41NCknXG5cbmNsYXNzIGV4cG9ydHMuVGl0bGUgZXh0ZW5kcyBUZXh0TGF5ZXJcblx0Y29uc3RydWN0b3I6IChvcHRpb25zKSAtPlxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdG5hbWU6ICcuJ1xuXHRcdFx0Zm9udEZhbWlseTogJ1JvYm90bydcblx0XHRcdGZvbnRTaXplOiAyMFxuXHRcdFx0Zm9udFdlaWdodDogNTAwXG5cdFx0XHRsaW5lSGVpZ2h0OiAxLjNcblx0XHRcdGNvbG9yOiAncmdiYSgwLDAsMCwuODcpJ1xuY2xhc3MgZXhwb3J0cy5SZWd1bGFyIGV4dGVuZHMgVGV4dExheWVyXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucykgLT5cblx0XHRzdXBlciBfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRuYW1lOiAnLidcblx0XHRcdGZvbnRGYW1pbHk6ICdSb2JvdG8nXG5cdFx0XHRmb250U2l6ZTogMTZcblx0XHRcdGZvbnRXZWlnaHQ6IDQwMFxuXHRcdFx0bGluZUhlaWdodDogMS4zXG5cdFx0XHRjb2xvcjogJ3JnYmEoMCwwLDAsLjg3KSdcbmNsYXNzIGV4cG9ydHMuQm9keTIgZXh0ZW5kcyBUZXh0TGF5ZXJcblx0Y29uc3RydWN0b3I6IChvcHRpb25zKSAtPlxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdG5hbWU6ICcuJ1xuXHRcdFx0Zm9udEZhbWlseTogJ1JvYm90bydcblx0XHRcdGZvbnRTaXplOiAxNFxuXHRcdFx0Zm9udFdlaWdodDogNTAwXG5cdFx0XHRsaW5lSGVpZ2h0OiAxLjNcblx0XHRcdGNvbG9yOiAncmdiYSgwLDAsMCwuODcpJ1xuY2xhc3MgZXhwb3J0cy5NZW51IGV4dGVuZHMgVGV4dExheWVyXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucykgLT5cblx0XHRzdXBlciBfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRuYW1lOiAnLidcblx0XHRcdGZvbnRGYW1pbHk6ICdSb2JvdG8nXG5cdFx0XHRmb250U2l6ZTogMTRcblx0XHRcdGZvbnRXZWlnaHQ6IDUwMFxuXHRcdFx0bGluZUhlaWdodDogMS43XG5cdFx0XHRjb2xvcjogJ3JnYmEoMCwwLDAsLjg3KSdcbmNsYXNzIGV4cG9ydHMuQm9keTEgZXh0ZW5kcyBUZXh0TGF5ZXJcblx0Y29uc3RydWN0b3I6IChvcHRpb25zKSAtPlxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdG5hbWU6ICcuJ1xuXHRcdFx0Zm9udEZhbWlseTogJ1JvYm90bydcblx0XHRcdGZvbnRTaXplOiAxNFxuXHRcdFx0Zm9udFdlaWdodDogNDAwXG5cdFx0XHRsaW5lSGVpZ2h0OiAxLjRcblx0XHRcdGNvbG9yOiAncmdiYSgwLDAsMCwuODcpJ1xuY2xhc3MgZXhwb3J0cy5DYXB0aW9uIGV4dGVuZHMgVGV4dExheWVyXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucykgLT5cblx0XHRzdXBlciBfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRuYW1lOiAnLidcblx0XHRcdGZvbnRGYW1pbHk6ICdSb2JvdG8nXG5cdFx0XHRmb250U2l6ZTogMTJcblx0XHRcdGZvbnRXZWlnaHQ6IDQwMFxuXHRcdFx0bGluZUhlaWdodDogMS4zXG5cdFx0XHRjb2xvcjogJ3JnYmEoMCwwLDAsLjU0KSdcbmNsYXNzIGV4cG9ydHMuQnV0dG9uIGV4dGVuZHMgVGV4dExheWVyXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucykgLT5cblx0XHRzdXBlciBfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRuYW1lOiAnLidcblx0XHRcdGZvbnRGYW1pbHk6ICdSb2JvdG8nXG5cdFx0XHRmb250U2l6ZTogMTRcblx0XHRcdGZvbnRXZWlnaHQ6IDUwMFxuXHRcdFx0bGluZUhlaWdodDogMS4zXG5cdFx0XHRjb2xvcjogJyMwMDk2ODgnXG5cdFx0XHRsZXR0ZXJTcGFjaW5nOiAwLjVcblx0XHRcdHBhZGRpbmc6IHtsZWZ0OiA0LCByaWdodDogNCwgdG9wOiA4LCBib3R0b206IDB9LCIsIlxuIyAgIGRQICAgZFAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuIyAgIDg4ICAgODggICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuIyBkODg4OFAgODhkODg4Yi4gLmQ4ODg4Yi4gODhkOGIuZDhiLiAuZDg4ODhiLiAuZDg4ODhiLlxuIyAgIDg4ICAgODgnICBgODggODhvb29vZDggODgnYDg4J2A4OCA4OG9vb29kOCBZOG9vb29vLlxuIyAgIDg4ICAgODggICAgODggODguICAuLi4gODggIDg4ICA4OCA4OC4gIC4uLiAgICAgICA4OFxuIyAgIGRQICAgZFAgICAgZFAgYDg4ODg4UCcgZFAgIGRQICBkUCBgODg4ODhQJyBgODg4ODhQJ1xuXG4jIFdoZW4gbG9hZGVkLCB0aGlzIG1vZHVsZSB3aWxsIGF0dGVtcHQgdG8gY3JlYXRlIGEgbmV3IHRoZW1lIGJhc2VkIG9uIFxuIyB0aGUgRGVzaWduIE1vZGUgdGVtcGxhdGUuIEl0cyBkZWZhdWx0IHZhbHVlcyB3aWxsIGJlIGZvciBhIFwiTGlnaHRcIiB0aGVtZS5cblxubW9kaWZ5Q29sb3IgPSAoY29sb3IsIGgsIHMsIGwpIC0+XG5cdGNsaXAgPSBfLnJlcGxhY2UoXy5yZXBsYWNlKGNvbG9yLnRvSHNsU3RyaW5nKCkuc2xpY2UoNCwgLTEpLCAnJScsICcnKSwgJyUnLCAnJykgLnNwbGl0KCcsICcpXG5cblx0bmV3Q29sb3IgPSBuZXcgQ29sb3IoXG5cdFx0aDogXy5wYXJzZUludChjbGlwWzBdKSArIGgsIFxuXHRcdHM6IChfLnBhcnNlSW50KGNsaXBbMV0pICsgcykvMTAwLCBcblx0XHRsOiAoXy5wYXJzZUludChjbGlwWzJdKSArIGwpLzEwMCwgXG5cdFx0YTogMSlcblx0XG5cdHJldHVybiBuZXdDb2xvclxuXG5wcmltYXJ5Q29sb3IgPSBwcmltYXJ5X2NvbG9yLmJhY2tncm91bmRDb2xvclxucHJpbWFyeUludmVydCA9IDEwMCAtIChwcmltYXJ5X2ludmVydC5vcGFjaXR5ICogMTAwKVxuc2Vjb25kYXJ5Q29sb3IgPSBzZWNvbmRhcnlfY29sb3IuYmFja2dyb3VuZENvbG9yXG5tZW51Q29sb3IgPSBtZW51X2NvbG9yLmJhY2tncm91bmRDb2xvclxubWVudVRleHRDb2xvciA9IG1lbnVfdGV4dF9jb2xvci5jb2xvclxubWVudUludmVydCA9IDEwMCAtIChtZW51X2ludmVydC5vcGFjaXR5ICogMTAwKVxuXG5cbnNvdXJjZSA9XG5cdGNvbG9yczpcblx0XHRwcmltYXJ5OlxuXHRcdFx0bWFpbjogcHJpbWFyeUNvbG9yXG5cdFx0XHRsaWdodDogbW9kaWZ5Q29sb3IocHJpbWFyeUNvbG9yLCAxMywgLTUsIDE1KVxuXHRcdFx0ZGFyazogbW9kaWZ5Q29sb3IocHJpbWFyeUNvbG9yLCAtMSwgLTcsIC0xMilcblx0XHRcdHRleHQ6IHByaW1hcnlfdGV4dF9jb2xvci5jb2xvclxuXHRcdFx0aW52ZXJ0OiBwcmltYXJ5SW52ZXJ0XG5cdFx0c2Vjb25kYXJ5OlxuXHRcdFx0bWFpbjogc2Vjb25kYXJ5Q29sb3Jcblx0XHRcdGxpZ2h0OiBtb2RpZnlDb2xvcihzZWNvbmRhcnlDb2xvciwgMTMsIC01LCAxNSlcblx0XHRcdGRhcms6IG1vZGlmeUNvbG9yKHNlY29uZGFyeUNvbG9yLCAtMSwgLTcsIC0xMilcblx0XHRcdHRleHQ6IHNlY29uZGFyeV90ZXh0X2NvbG9yLmNvbG9yXG5cdFx0bWVudTpcblx0XHRcdGxpZ2h0OiBtZW51Q29sb3Jcblx0XHRcdHRleHQ6IG1lbnVUZXh0Q29sb3Jcblx0XHRcdGludmVydDogbWVudUludmVydFxuXG50aGVtZSA9IFxuXHR0aW50OiBzb3VyY2UuY29sb3JzLnNlY29uZGFyeS5tYWluXG5cdHByaW1hcnk6IHNvdXJjZS5jb2xvcnMucHJpbWFyeS5tYWluXG5cdHNlY29uZGFyeTogc291cmNlLmNvbG9ycy5zZWNvbmRhcnkubWFpblxuXHRtZW51OiBzb3VyY2UuY29sb3JzLm1lbnUubGlnaHRcblx0Y29sb3JzOiBzb3VyY2UuY29sb3JzXG5cblx0dXNlcjpcblx0XHRpbWFnZTogdW5kZWZpbmVkXG5cblx0aGVhZGVyOiBcblx0XHRiYWNrZ3JvdW5kQ29sb3I6IHNvdXJjZS5jb2xvcnMucHJpbWFyeS5tYWluXG5cdFx0dGl0bGU6IHNvdXJjZS5jb2xvcnMucHJpbWFyeS50ZXh0XG5cdFx0aW52ZXJ0OiBwcmltYXJ5SW52ZXJ0XG5cdFx0aWNvbjpcblx0XHRcdGNvbG9yOiBzb3VyY2UuY29sb3JzLnByaW1hcnkudGV4dFxuXHRcdHRhYnM6XG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IHNvdXJjZS5jb2xvcnMucHJpbWFyeS5saWdodFxuXHRcdFx0Y29sb3I6IHNvdXJjZS5jb2xvcnMucHJpbWFyeS50ZXh0XG5cdFx0XHRzZWxlY3Rvcjogc291cmNlLmNvbG9ycy5zZWNvbmRhcnkubWFpblxuXHRcblx0c3RhdHVzQmFyOiBcblx0XHRpbWFnZTogJ2ltYWdlcy9zdGF0dXNfYmFyLnBuZydcblx0XHRiYWNrZ3JvdW5kQ29sb3I6IHNvdXJjZS5jb2xvcnMucHJpbWFyeS5kYXJrXG5cdFx0aW52ZXJ0OiBwcmltYXJ5SW52ZXJ0XG5cdFxuXHRib3R0b21OYXY6XG5cdFx0YmFja2dyb3VuZENvbG9yOiAnI0ZGRkZGRidcblx0XHRzaGFkb3dZOiAtMlxuXHRcdHNoYWRvd0JsdXI6IDZcblx0XHRzaGFkb3dDb2xvcjogJ3JnYmEoMCwwLDAsLjEpJ1xuXG5cdHBhZ2U6XG5cdFx0cHJpbWFyeTpcblx0XHRcdGJhY2tncm91bmRDb2xvcjogJyNFMUUyRTEnXG5cdFx0c2Vjb25kYXJ5OlxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiAnI0Y1RjVGNidcblxuXHRtZW51T3ZlcmxheTpcblx0XHRoZWFkZXI6XG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IHNvdXJjZS5jb2xvcnMuc2Vjb25kYXJ5Lm1haW5cblx0XHRcdGljb246IHNvdXJjZS5jb2xvcnMuc2Vjb25kYXJ5LmxpZ2h0XG5cdFx0XHR0ZXh0OiBzb3VyY2UuY29sb3JzLnNlY29uZGFyeS50ZXh0XG5cdFx0c3ViaGVhZGVyOlxuXHRcdFx0Y29sb3I6IHNvdXJjZS5jb2xvcnMubWVudS50ZXh0XG5cdFx0XHR0ZXh0OiBzb3VyY2UuY29sb3JzLnNlY29uZGFyeS50ZXh0XG5cdFx0XHRpY29uOiBzb3VyY2UuY29sb3JzLnNlY29uZGFyeS50ZXh0XG5cdFx0YmFja2dyb3VuZENvbG9yOiBzb3VyY2UuY29sb3JzLm1lbnUubGlnaHRcblx0XHR0ZXh0OiBzb3VyY2UuY29sb3JzLm1lbnUudGV4dFxuXHRcdHNsaWRlcjogXG5cdFx0XHRrbm9iOiBzb3VyY2UuY29sb3JzLnNlY29uZGFyeS5saWdodFxuXHRcdFx0ZmlsbDogc291cmNlLmNvbG9ycy5zZWNvbmRhcnkuZGFya1xuXHRcdGludmVydDogc291cmNlLmNvbG9ycy5tZW51LmludmVydFxuXG5cdGJ1dHRvbjpcblx0XHRmbGF0OlxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHRjb2xvcjogc291cmNlLmNvbG9ycy5zZWNvbmRhcnkubWFpblxuXHRcdFx0c2hhZG93WTogMFxuXHRcdFx0c2hhZG93Q29sb3I6ICdyZ2JhKDAsMCwwLC4xOCknXG5cdFx0XHRzaGFkb3dCbHVyOiAwXG5cblx0XHRyYWlzZWQ6XG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IHNvdXJjZS5jb2xvcnMuc2Vjb25kYXJ5Lm1haW5cblx0XHRcdGNvbG9yOiBzb3VyY2UuY29sb3JzLnNlY29uZGFyeS50ZXh0XG5cdFx0XHRzaGFkb3dZOiAyXG5cdFx0XHRzaGFkb3dDb2xvcjogJ3JnYmEoMCwwLDAsLjE4KSdcblx0XHRcdHNoYWRvd0JsdXI6IDZcblxuXHRmYWI6XG5cdFx0YmFja2dyb3VuZENvbG9yOiBzb3VyY2UuY29sb3JzLnNlY29uZGFyeS5tYWluXG5cdFx0Y29sb3I6IHNvdXJjZS5jb2xvcnMuc2Vjb25kYXJ5LnRleHRcblx0XHRpbnZlcnQ6IHByaW1hcnlJbnZlcnRcblxuXHRkaWFsb2c6IFxuXHRcdGJhY2tncm91bmRDb2xvcjonI0ZBRkFGQSdcblx0XG5cdGRpdmlkZXI6XG5cdFx0YmFja2dyb3VuZENvbG9yOiAncmdiYSgwLDAsMCwuMTIpJ1xuXG5cdHRleHQ6IFxuXHRcdHByaW1hcnk6IHNvdXJjZS5jb2xvcnMucHJpbWFyeS50ZXh0XG5cdFx0c2Vjb25kYXJ5OiBzb3VyY2UuY29sb3JzLnNlY29uZGFyeS50ZXh0XG5cdFxuXHR0YWJsZTpcblx0XHRiYWNrZ3JvdW5kQ29sb3I6ICcjRkZGRkZGJ1xuXHRcdHRleHQ6IHNvdXJjZS5jb2xvcnMucHJpbWFyeS50ZXh0XG5cdFx0Y2hlY2tCb3g6XG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcdGJvcmRlckNvbG9yOiAnI0QzRDNEMydcblx0XHRzZWxlY3RlZDpcblx0XHRcdGJhY2tncm91bmRDb2xvcjogc291cmNlLmNvbG9ycy5zZWNvbmRhcnkubWFpblxuXHRcdFx0dGV4dDogc291cmNlLmNvbG9ycy5wcmltYXJ5LnRleHRcblx0XHRcdGNoZWNrQm94OlxuXHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IHNvdXJjZS5jb2xvcnMuc2Vjb25kYXJ5LmRhcmtcblx0XHRcdFx0Ym9yZGVyQ29sb3I6IG51bGxcblxuXHRzbmFja2Jhcjpcblx0XHRiYWNrZ3JvdW5kQ29sb3I6ICdyZ2JhKDUxLCA1MSwgNTEsIDEpJ1xuXHRcdGNvbG9yOiAncmdiYSgyNTUsIDI1NSwgMjU1LCAxKSdcblxuXHRzbGlkZXI6XG5cdFx0a25vYjogc291cmNlLmNvbG9ycy5wcmltYXJ5LmxpZ2h0XG5cdFx0ZmlsbDogc291cmNlLmNvbG9ycy5wcmltYXJ5LmRhcmtcblxuXHRjYXJkOlxuXHRcdGhlYWRlcjogc291cmNlLmNvbG9ycy5zZWNvbmRhcnkuZGFya1xuXHRcblx0bmF2QmFyOlxuXHRcdGJhY2tncm91bmRDb2xvcjogJyMwMDAwMDAnXG5cdFxuXHRrZXlib2FyZDpcblx0XHRpbWFnZTogJ2ltYWdlcy9rZXlib2FyZC5wbmcnXG5cbmNvbG9yX3BhbGxldGUuZGVzdHJveSgpXG5cbmV4cG9ydHMudGhlbWUgPSB0aGVtZVxuIiwiIyBcdCA4ODg4ODhiYSAgb28gICAgICAgICAgICAgICAgICAgZFBcbiMgXHQgODggICAgYDhiICAgICAgICAgICAgICAgICAgICAgIDg4XG4jIFx0YTg4YWFhYThQJyBkUCA4OGQ4ODhiLiA4OGQ4ODhiLiA4OCAuZDg4ODhiLlxuIyBcdCA4OCAgIGA4Yi4gODggODgnICBgODggODgnICBgODggODggODhvb29vZDhcbiMgXHQgODggICAgIDg4IDg4IDg4LiAgLjg4IDg4LiAgLjg4IDg4IDg4LiAgLi4uXG4jIFx0IGRQICAgICBkUCBkUCA4OFk4ODhQJyA4OFk4ODhQJyBkUCBgODg4ODhQJ1xuIyBcdCAgICAgICAgICAgICAgODggICAgICAgODhcbiMgXHQgICAgICAgICAgICAgIGRQICAgICAgIGRQXG5cbiNcdEJ5IGRlZmF1bHQsIHNob3dzIGFuIGV4cGFuZGluZyBjaXJjbGUgb3ZlciBhIGxheWVyLCBjbGlwcGVkIHRvIGl0cyBmcmFtZS5cbiNcdE9uIHRoZSBsYXllcidzIHRvdWNoRW5kIGV2ZW50LCB0aGUgY2lyY2xlIGFuZCBpdHMgbWFzayB3aWxsIGRpc2FwcGVhci5cblxuI1x0cmVxdWlyZWQ6XG4jXHRsYXllciAoTGF5ZXIpLCB0aGUgbGF5ZXIgb3ZlciB3aGljaCB0byBzaG93IHRoZSByaXBwbGUgZWZmZWN0XG4jXHRwb2ludCAob2JqZWN0KSwgdGhlIHJpcHBsZSBvcmlnaW4gcG9pbnQsIHVzdWFsbHkgYSBvblRvdWNoU3RhcnQncyBldmVudC5wb2ludFxuXG4jXHRvcHRpb25hbDpcbiNcdHBsYWNlQmVoaW5kIChMYXllciksIGEgY2hpbGQgb2YgbGF5ZXIgYmVoaW5kIHdoaWNoIHRoZSByaXBwbGUgc2hvdWxkIGFwcGVhclxuI1x0Y29sb3IgKHN0cmluZyBvciBjb2xvciBvYmplY3QpLCBhIGN1c3RvbSBjb2xvciBmb3IgdGhlIHJpcHBsZVxuXG5yaXBwbGUgPSAobGF5ZXIsIHBvaW50LCBwbGFjZUJlaGluZCwgY29sb3IpIC0+XG5cdFxuXHRpZiAhbGF5ZXI/IHRoZW4gdGhyb3cgJ1JpcHBsZSByZXF1aXJlcyBhIExheWVyLiBUcnkgbXlMYXllci5vblRvdWNoU3RhcnQgKGV2ZW50KSAtPiByaXBwbGUoQCwgZXZlbnQucG9pbnQpJ1xuXHRpZiAhcG9pbnQ/IHRoZW4gdGhyb3cgJ1JpcHBsZSByZXF1aXJlcyBhIHBvaW50LiBUcnkgbXlMYXllci5vblRvdWNoU3RhcnQgKGV2ZW50KSAtPiByaXBwbGUoQCwgZXZlbnQucG9pbnQpJ1xuXG5cdG1hc2sgPSBuZXcgTGF5ZXJcblx0XHRuYW1lOiAnLidcblx0XHRwYXJlbnQ6IGxheWVyXG5cdFx0c2l6ZTogbGF5ZXIuc2l6ZVxuXHRcdGJvcmRlclJhZGl1czogbGF5ZXIuYm9yZGVyUmFkaXVzXG5cdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0Y2xpcDogdHJ1ZVxuXHRcdG9wYWNpdHk6IDBcblx0XHRhbmltYXRpb25PcHRpb25zOiB7dGltZTogLjE1fVxuXHRcblx0aWYgcGxhY2VCZWhpbmQgdGhlbiBtYXNrLnBsYWNlQmVoaW5kKHBsYWNlQmVoaW5kKVxuXHRcblx0IyBSSVBQTEUgQ0lSQ0xFXG5cdFxuXHRsb25nU2lkZSA9IGlmIGxheWVyLndpZHRoID4gbGF5ZXIuaGVpZ2h0IHRoZW4gbGF5ZXIud2lkdGggZWxzZSBsYXllci5oZWlnaHRcblxuXHRyaXBwbGVDaXJjbGUgPSBuZXcgTGF5ZXJcblx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBtYXNrXG5cdFx0XHR4OiBwb2ludC54IC0gMTZcblx0XHRcdHk6IHBvaW50LnkgLSAxNlxuXHRcdFx0d2lkdGg6IDMyLCBoZWlnaHQ6IDMyLCBcblx0XHRcdGJvcmRlclJhZGl1czogbG9uZ1NpZGVcblx0XHRcdFxuXHRpZiBjb2xvcj9cblx0XHRyaXBwbGVDaXJjbGUucHJvcHMgPVxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBjb2xvclxuXHRlbHNlIFxuXHRcdHJpcHBsZUNpcmNsZS5wcm9wcyA9IFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBsYXllci5iYWNrZ3JvdW5kQ29sb3Jcblx0XHRcdHNhdHVyYXRlOiAxMjBcblx0XHRcdGJyaWdodG5lc3M6IDEyMFxuXHRcdFx0b3BhY2l0eTogLjVcblx0XG5cdCMgQU5JTUFUSU9OUyBDSVJDTEVcblx0XG5cdG1hc2suYW5pbWF0ZVxuXHRcdG9wYWNpdHk6IDFcblx0XHRvcHRpb25zOiB7dGltZTogLjE1fVxuXHRcblx0cmlwcGxlQ2lyY2xlLmFuaW1hdGVcblx0XHR4OiByaXBwbGVDaXJjbGUueCAtIGxvbmdTaWRlICogMS4zXG5cdFx0eTogcmlwcGxlQ2lyY2xlLnkgLSBsb25nU2lkZSAqIDEuM1xuXHRcdHdpZHRoOiBsb25nU2lkZSAqIDIuNlxuXHRcdGhlaWdodDogbG9uZ1NpZGUgKiAyLjZcblx0XHRvcHRpb25zOiB7dGltZTogLjV9XG5cdFxuXHRVdGlscy5kZWxheSAyLCAtPiBcblx0XHRtYXNrLmFuaW1hdGVcblx0XHRcdG9wYWNpdHk6IDBcblx0XHRtYXNrLm9uQW5pbWF0aW9uRW5kIG1hc2suZGVzdHJveVxuXG5cdCMgVE9VQ0ggRU5EXG5cdFxuXHRsYXllci5vblRvdWNoRW5kIC0+IFxuXHRcdG1hc2suYW5pbWF0ZVxuXHRcdFx0b3BhY2l0eTogMFxuXHRcdG1hc2sub25BbmltYXRpb25FbmQgbWFzay5kZXN0cm95XG5cbmV4cG9ydHMucmlwcGxlID0gcmlwcGxlIiwie3JpcHBsZX0gPSByZXF1aXJlICdyaXBwbGUnXG57dGhlbWV9ID0gcmVxdWlyZSAndGhlbWUnXG57SWNvbn0gPSByZXF1aXJlICdpY29uJ1xudHlwZSA9IHJlcXVpcmUgJ3R5cGUnXG5pY29ucyA9IEpTT04ucGFyc2UgVXRpbHMuZG9tTG9hZERhdGFTeW5jIFwibW9kdWxlcy9pY29ucy5qc29uXCJcblxuRnJhbWVyLkV4dHJhcy5IaW50cy5kaXNhYmxlKClcbkZyYW1lci5FeHRyYXMuUHJlbG9hZGVyLmVuYWJsZSgpXG5cbiMgVE9ETzogQ2hhbmdlIEFwcCBmcm9tIG1hc3RlciBmbG93IGNvbXBvbmVudCB0byBTY3JlZW4gbWFuYWdlci5cbiMgQXBwIHNob3VsZG4ndCBkaXJlY3RseSBtYW5hZ2UgcGFnZXM6IGEgbmV3IGNsYXNzLCAnc2NyZWVuJyB3aWxsIG1hbmFnZSBQYWdlcy5cbiMgVGFicyBhbGxvdyBuYXZpZ2F0aW9uIGJldHdlZW4gU2NyZWVucy4gQ29udGVudCBpcyBzdGlsbCBhZGRlZCB0byBQYWdlcy5cblxuXG4jIE91ciBnb2FsIGlzIHRvIHJlcXVpcmUgb25seSBvbmUgcmVxdWlyZSBpbiBGcmFtZXIgcHJvamVjdCwgc28gdGhpcyBcbiMgaXMgYSBjbHVua3kgd2F5IG9mIGxldHRpbmcgdXNlciBjcmVhdGUgdGV4dCB1c2luZyBtZC5UaXRsZSwgZXRjLlxuXG5leHBvcnRzLnRoZW1lID0gdGhlbWVcbmV4cG9ydHMuVGl0bGUgPSBUaXRsZSA9IHR5cGUuVGl0bGVcbmV4cG9ydHMuSGVhZGxpbmUgPSBIZWFkbGluZSA9IHR5cGUuSGVhZGxpbmVcbmV4cG9ydHMuU3ViaGVhZCA9IFN1YmhlYWQgPSB0eXBlLlN1YmhlYWRcbmV4cG9ydHMuUmVndWxhciA9IFJlZ3VsYXIgPSB0eXBlLlJlZ3VsYXJcbmV4cG9ydHMuQm9keTIgPSBCb2R5MiA9IHR5cGUuQm9keTJcbmV4cG9ydHMuQm9keTEgPSBCb2R5MSA9IHR5cGUuQm9keTFcbmV4cG9ydHMuQ2FwdGlvbiA9IENhcHRpb24gPSB0eXBlLkNhcHRpb25cbmV4cG9ydHMuRGlhbG9nQWN0aW9uID0gRGlhbG9nQWN0aW9uID0gdHlwZS5EaWFsb2dBY3Rpb25cblxuYXBwID0gdW5kZWZpbmVkXG5cblxuXG5cblxuXG5cblxuIyBcdCAuZDg4ODg4OFxuIyBcdGQ4JyAgICA4OFxuIyBcdDg4YWFhYWE4OGEgODhkODg4Yi4gODhkODg4Yi5cbiMgXHQ4OCAgICAgODggIDg4JyAgYDg4IDg4JyAgYDg4XG4jIFx0ODggICAgIDg4ICA4OC4gIC44OCA4OC4gIC44OFxuIyBcdDg4ICAgICA4OCAgODhZODg4UCcgODhZODg4UCdcbiMgXHQgICAgICAgICAgIDg4ICAgICAgIDg4XG4jIFx0ICAgICAgICAgICBkUCAgICAgICBkUFxuXG5cblxuZXhwb3J0cy5BcHAgPSBjbGFzcyBBcHAgZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblxuXHRcdEBfYm90dG9tTmF2ID0gb3B0aW9ucy5ib3R0b21OYXYgPyB1bmRlZmluZWRcblx0XHRAX21lbnVPdmVybGF5ID0gb3B0aW9ucy5tZW51T3ZlcmxheSA/IHVuZGVmaW5lZFxuXHRcdFxuXHRcdEB0aGVtZSA9IHRoZW1lXG5cdFx0QHZpZXdzID0gb3B0aW9ucy52aWV3cyA/IFtdXG5cdFx0QGN1cnJlbnQgPSB7aTogMH1cblx0XHRAbm90aWZpY2F0aW9ucyA9IFtdXG5cdFx0QGFjdGlvbkJ1dHRvbiA9IHVuZGVmaW5lZFxuXHRcdEBzbmFja2JhciA9IHVuZGVmaW5lZFxuXG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0bmFtZTogJ0FwcCdcblx0XHRcdHNpemU6IFNjcmVlbi5zaXplXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcdGluZGV4OiAxXG5cdFx0XG5cdFx0YXBwID0gQFxuXG5cdFx0IyBIRUFERVJcblxuXHRcdEBoZWFkZXIgPSBuZXcgSGVhZGVyXG5cdFx0XHR0aGVtZTogdGhlbWVcblx0XHRcdGluZGV4OiA5OTlcblxuXHRcdCMgRk9PVEVSXG5cblx0XHRAZm9vdGVyID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiAnRm9vdGVyJ1xuXHRcdFx0d2lkdGg6IFNjcmVlbi53aWR0aCwgaGVpZ2h0OiA0OFxuXHRcdFx0aW1hZ2U6ICdpbWFnZXMvbmF2X2Jhci5wbmcnXG5cdFx0XHRpbmRleDogOTk5XG5cdFx0XHR5OiBBbGlnbi5ib3R0b20oKVxuXG5cdFx0aWYgQF9ib3R0b21OYXZcblx0XHRcdEBib3R0b21OYXYgPSBuZXcgQm90dG9tTmF2XG5cdFx0XHRcdG5hbWU6ICdCb3R0b20gTmF2J1xuXHRcdFx0XHRkZXN0aW5hdGlvbnM6IEBfYm90dG9tTmF2LmxpbmtzID8gXCJtZC5hcHAuYm90dG9tTmF2IG5lZWRzIGFuIGFycmF5IG9mIGxpbmtzLiBFeGFtcGxlOiBbe3RpdGxlOiAnSG9tZScsIGljb246ICdob21lJywgYWN0aW9uOiAtPiB2aWV3LmxpbmtUbyhob21lKX1dXCJcblx0XHRcdFx0eTogaWYgQGZvb3Rlcj8gdGhlbiBBbGlnbi5ib3R0b20oLUBmb290ZXIuaGVpZ2h0KSBlbHNlIEFsaWduLmJvdHRvbSgpXG5cdFx0XHRcdGluZGV4OiA5OThcblxuXHRcdCMgTUVOVSBPVkVSTEFZXG5cdFx0aWYgQF9tZW51T3ZlcmxheVxuXHRcdFx0QG1lbnVPdmVybGF5ID0gbmV3IE1lbnVPdmVybGF5XG5cdFx0XHRcdG5hbWU6ICdNZW51IE92ZXJsYXknXG5cdFx0XHRcdHRpdGxlOiBAX21lbnVPdmVybGF5LnRpdGxlID8gdGhyb3cgJ21kLmFwcC5tZW51T3ZlcmxheSBuZWVkcyBhIHRpdGxlLidcblx0XHRcdFx0bGlua3M6IEBfbWVudU92ZXJsYXkubGlua3MgPyB0aHJvdyBcIm1kLmFwcC5tZW51T3ZlcmxheSBuZWVkcyBhbiBhcnJheSBvZiBsaW5rcy4gRXhhbXBsZTogW3t0aXRsZTogJ0hvbWUnLCBpY29uOiAnaG9tZScsIGFjdGlvbjogLT4gdmlldy5saW5rVG8oaG9tZSl9XVwiXG5cblxuXHRcdCMgS0VZQk9BUkRcblxuXHRcdEBrZXlib2FyZCA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogJ0tleWJvYXJkJ1xuXHRcdFx0eTogQG1heFksIGltYWdlOiB0aGVtZS5rZXlib2FyZC5pbWFnZVxuXHRcdFx0d2lkdGg6IEB3aWR0aCwgaGVpZ2h0OiAyMjJcblx0XHRcdGluZGV4OiAxMDAwXG5cdFx0XHRhbmltYXRpb25PcHRpb25zOlxuXHRcdFx0XHR0aW1lOiAuMjVcblxuXHRcdEBrZXlib2FyZC5vblRhcCA9PiBAaGlkZUtleWJvYXJkKClcblxuXHRcdGZvciB2aWV3LCBpIGluIEB2aWV3c1xuXHRcdFx0QGFkZFZpZXcodmlldywgaSlcblxuXHRcdEBjaGFuZ2VWaWV3KEB2aWV3c1swXSlcblxuXHRzaG93S2V5Ym9hcmQ6IC0+XG5cdFx0QGtleWJvYXJkLmFuaW1hdGVcblx0XHRcdHk6IEFsaWduLmJvdHRvbSgpXG5cdFx0QGtleWJvYXJkLmJyaW5nVG9Gcm9udCgpXG5cblx0aGlkZUtleWJvYXJkOiAtPlxuXHRcdEBrZXlib2FyZC5hbmltYXRlXG5cdFx0XHR5OiBAbWF4WVxuXG5cdGFkZFZpZXc6ICh2aWV3LCBpKSAtPlxuXHRcdHZpZXcuaSA9IGlcblx0XHR2aWV3LnBhcmVudCA9IEBcblx0XHR2aWV3LnkgPSBAaGVhZGVyLm1heFlcblx0XHR2aWV3LmhlaWdodCA9IFNjcmVlbi5oZWlnaHQgLSBAaGVhZGVyLmhlaWdodCAtIEBmb290ZXIuaGVpZ2h0XG5cblx0XHR2aWV3LmhvbWUgPSB2aWV3Lm5ld1BhZ2Vcblx0XHQgXHRuYW1lOiAnaG9tZSdcblx0XHQgXHRoZWFkZXI6XG5cdFx0XHQgXHR0aXRsZTogdmlldy5fdGl0bGVcblx0XHRcdCBcdGljb246IHZpZXcuX2ljb25cblx0XHRcdCBcdGljb25BY3Rpb246IHZpZXcuX2ljb25BY3Rpb25cblxuXHRcdHZpZXcuc2hvd05leHQodmlldy5ob21lKVxuXG5cdGNoYW5nZVZpZXc6ICh2aWV3KSAtPlxuXHRcdHJldHVybiBpZiB2aWV3IGlzIEBjdXJyZW50XG5cblx0XHRAaGVhZGVyLnRpdGxlID0gdmlldy5jdXJyZW50Ll9oZWFkZXI/LnRpdGxlID8gJ0RlZmF1bHQnXG5cdFx0QGhlYWRlci5pY29uID0gdmlldy5jdXJyZW50Ll9oZWFkZXI/Lmljb24gPyAnbWVudSdcblx0XHRAaGVhZGVyLmljb25BY3Rpb24gPSB2aWV3LmN1cnJlbnQuX2hlYWRlcj8uaWNvbkFjdGlvbiA/IC0+IGFwcC5zaG93TWVudSgpXG5cdFx0QGhlYWRlci52aXNpYmxlID0gdmlldy5jdXJyZW50Ll9oZWFkZXI/LnZpc2libGUgPyB0cnVlXG5cblx0XHRpZiB2aWV3LmkgPiBAY3VycmVudC5pXG5cdFx0XHR2aWV3LnggPSBTY3JlZW4ud2lkdGggXG5cdFx0XHRAY3VycmVudC5hbmltYXRlIHt4OiAtU2NyZWVuLndpZHRofVxuXHRcdGVsc2UgaWYgdmlldy5pIDwgQGN1cnJlbnQuaVxuXHRcdFx0dmlldy54ID0gLVNjcmVlbi53aWR0aFxuXHRcdFx0QGN1cnJlbnQuYW5pbWF0ZSB7eDogU2NyZWVuLndpZHRofVxuXG5cdFx0dmlldy5hbmltYXRlIHt4OiAwfVxuXHRcdHZpZXcuYnJpbmdUb0Zyb250KClcblx0XHRAY3VycmVudCA9IHZpZXdcblxuXHRzaG93TWVudTogLT5cblx0XHRAbWVudU92ZXJsYXkuc2hvdygpXG5cblx0aGlkZU1lbnU6IC0+XG5cdFx0QG1lbnVPdmVybGF5LmhpZGUoKVxuXG5cdGNoYW5nZVBhZ2U6IChwYWdlKSAtPlxuXHRcdEBoZWFkZXIudGl0bGUgPSBwYWdlLl9oZWFkZXIudGl0bGVcblx0XHRAaGVhZGVyLmljb24gPSBwYWdlLl9oZWFkZXIuaWNvblxuXHRcdEBoZWFkZXIuaWNvbkFjdGlvbiA9IHBhZ2UuX2hlYWRlci5pY29uQWN0aW9uXG5cdFx0QGhlYWRlci52aXNpYmxlID0gcGFnZS5faGVhZGVyLnZpc2libGVcblx0XHRwYWdlLl9vbkxvYWQoKVxuXG5cblxuXG5cbiMgXHRkUCAgICAgZFAgb29cbiMgXHQ4OCAgICAgODhcbiMgXHQ4OCAgICAuOFAgZFAgLmQ4ODg4Yi4gZFAgIGRQICBkUFxuIyBcdDg4ICAgIGQ4JyA4OCA4OG9vb29kOCA4OCAgODggIDg4XG4jIFx0ODggIC5kOFAgIDg4IDg4LiAgLi4uIDg4Ljg4Yi44OCdcbiMgXHQ4ODg4ODgnICAgZFAgYDg4ODg4UCcgODg4OFAgWThQXG5cblxuXG5leHBvcnRzLlZpZXcgPSBjbGFzcyBWaWV3IGV4dGVuZHMgRmxvd0NvbXBvbmVudFxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblxuXHRcdEBfdGl0bGUgPSBvcHRpb25zLnRpdGxlID8gJ0hvbWUnXG5cdFx0QF9pY29uID0gb3B0aW9ucy5pY29uID8gJ21lbnUnXG5cdFx0QF9pY29uQWN0aW9uID0gb3B0aW9ucy5pY29uQWN0aW9uID8gLT4gYXBwLm1lbnVPdmVybGF5LnNob3coKSBcblxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdG5hbWU6ICdWaWV3J1xuXHRcdFx0YW5pbWF0aW9uT3B0aW9uczoge2N1cnZlOiBcInNwcmluZygzMDAsIDM1LCAwKVwifVxuXHRcdFx0c2hhZG93U3ByZWFkOiAyLCBzaGFkb3dDb2xvcjogJ3JnYmEoMCwwLDAsLjEpJywgc2hhZG93Qmx1cjogNlxuXG5cdFx0QG9uVHJhbnNpdGlvblN0YXJ0IChjdXJyZW50LCBuZXh0LCBkaXJlY3Rpb24pIC0+IGFwcC5jaGFuZ2VQYWdlKG5leHQpXG5cblx0bmV3UGFnZTogKG9wdGlvbnMgPSB7fSkgLT5cblx0XHRwYWdlID0gbmV3IFBhZ2UgXy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0c2l6ZTogQHNpemVcblx0XHRyZXR1cm4gcGFnZSBcblxuXHRsaW5rVG86IChwYWdlKSAtPlxuXHRcdGlmIHBhZ2U/IGFuZCBAY3VycmVudCBpc250IHBhZ2Vcblx0XHRcdEBzaG93TmV4dChwYWdlKVxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cbiMgLmQ4ODg4OGIgICAgZFAgICAgICAgICAgICAgIGRQICAgICAgICAgICAgICAgICAgICAgIDg4ODg4OGJhICAgICAgICAgICAgICAgICAgIFxuIyA4OC4gICAgXCInICAgODggICAgICAgICAgICAgIDg4ICAgICAgICAgICAgICAgICAgICAgIDg4ICAgIGA4YiAgICAgICAgICAgICAgICAgIFxuIyBgWTg4ODg4Yi4gZDg4ODhQIC5kODg4OGIuIGQ4ODg4UCBkUCAgICBkUCAuZDg4ODhiLiBhODhhYWFhOFAnIC5kODg4OGIuIDg4ZDg4OGIuXG4jICAgICAgIGA4YiAgIDg4ICAgODgnICBgODggICA4OCAgIDg4ICAgIDg4IFk4b29vb28uICA4OCAgIGA4Yi4gODgnICBgODggODgnICBgODhcbiMgZDgnICAgLjhQICAgODggICA4OC4gIC44OCAgIDg4ICAgODguICAuODggICAgICAgODggIDg4ICAgIC44OCA4OC4gIC44OCA4OCAgICAgIFxuIyAgWTg4ODg4UCAgICBkUCAgIGA4ODg4OFA4ICAgZFAgICBgODg4ODhQJyBgODg4ODhQJyAgODg4ODg4ODhQIGA4ODg4OFA4IGRQICBcblxuXG5cbmV4cG9ydHMuU3RhdHVzQmFyID0gY2xhc3MgU3RhdHVzQmFyIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cblx0XHRzdXBlciBfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRuYW1lOiAnLidcblx0XHRcdHdpZHRoOiBTY3JlZW4ud2lkdGgsIGhlaWdodDogMjRcblx0XHRcdGJhY2tncm91bmRDb2xvcjogdGhlbWUuc3RhdHVzQmFyLmJhY2tncm91bmRDb2xvclxuXG5cdFx0QGl0ZW1zID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQFxuXHRcdFx0c2l6ZTogQHNpemVcblx0XHRcdGltYWdlOiB0aGVtZS5zdGF0dXNCYXIuaW1hZ2Vcblx0XHRcdGludmVydDogdGhlbWUuc3RhdHVzQmFyLmludmVydFxuXG5cblxuXG5cblxuXG5cbiMgZFAgICAgIGRQICAgICAgICAgICAgICAgICAgICAgICAgICBkUCAgICAgICAgICAgICAgICAgIFxuIyA4OCAgICAgODggICAgICAgICAgICAgICAgICAgICAgICAgIDg4ICAgICAgICAgICAgICAgICAgXG4jIDg4YWFhYWE4OGEgLmQ4ODg4Yi4gLmQ4ODg4Yi4gLmQ4ODhiODggLmQ4ODg4Yi4gODhkODg4Yi5cbiMgODggICAgIDg4ICA4OG9vb29kOCA4OCcgIGA4OCA4OCcgIGA4OCA4OG9vb29kOCA4OCcgIGA4OFxuIyA4OCAgICAgODggIDg4LiAgLi4uIDg4LiAgLjg4IDg4LiAgLjg4IDg4LiAgLi4uIDg4ICAgICAgXG4jIGRQICAgICBkUCAgYDg4ODg4UCcgYDg4ODg4UDggYDg4ODg4UDggYDg4ODg4UCcgZFAgICAgXG5cblxuXG5leHBvcnRzLkhlYWRlciA9IGNsYXNzIEhlYWRlciBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXHRcdFxuXHRcdEBfdGl0bGUgPSB1bmRlZmluZWRcblx0XHRAX2ljb24gPSB1bmRlZmluZWRcblx0XHRAX2ljb25BY3Rpb24gPSBvcHRpb25zLmljb25BY3Rpb24gPyAtPiBudWxsXG5cblx0XHRzdXBlciBfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRuYW1lOiAnSGVhZGVyJywgXG5cdFx0XHR3aWR0aDogU2NyZWVuLndpZHRoLCBoZWlnaHQ6IDgwXG5cdFx0XHRzaGFkb3dZOiAyLCBzaGFkb3dCbHVyOiAzLCBzaGFkb3dDb2xvcjogJ3JnYmEoMCwwLDAsLjI0KSdcblx0XHRcdGJhY2tncm91bmRDb2xvcjogdGhlbWUuaGVhZGVyLmJhY2tncm91bmRDb2xvclxuXG5cdFx0IyBUT0RPOiBpZiBvcHRpb25zLmljb24gaXMgZmFsc2UgdGhlbiBubyBpY29uTGF5ZXIsIG1vdmUgdGl0bGUgbGVmdFxuXG5cdFx0QHRpdGxlTGF5ZXIgPSBuZXcgdHlwZS5UaXRsZVxuXHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEBcblx0XHRcdHg6IDcyLCB5OiBBbGlnbi5ib3R0b20oLTE0KVxuXHRcdFx0Y29sb3I6IHRoZW1lLmhlYWRlci50aXRsZVxuXHRcdFx0dGV4dDogQHRpdGxlID8gXCJObyB0aXRsZVwiXG5cblx0XHRAdGl0bGUgPSBvcHRpb25zLnRpdGxlID8gJ0RlZmF1bHQgSGVhZGVyJ1xuXG5cdFx0QGljb25MYXllciA9IG5ldyBJY29uXG5cdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQCwgXG5cdFx0XHR4OiAxMiwgeTogQWxpZ24uY2VudGVyKDEyKVxuXHRcdFx0aWNvbjogJ21lbnUnLCBjb2xvcjogdGhlbWUuaGVhZGVyLmljb24uY29sb3JcblxuXHRcdEBpY29uID0gb3B0aW9ucy5pY29uID8gJ21lbnUnXG5cblx0XHRAc3RhdHVzQmFyID0gbmV3IFN0YXR1c0JhclxuXHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEBcblxuXHRcdEBpY29uTGF5ZXIub25UYXAgPT4gQF9pY29uQWN0aW9uKClcblx0XHRAaWNvbkxheWVyLm9uVG91Y2hTdGFydCAoZXZlbnQpID0+IHJpcHBsZShALCBldmVudC5wb2ludCwgQHRpdGxlTGF5ZXIpXG5cblxuXHRAZGVmaW5lIFwidGl0bGVcIixcblx0XHRnZXQ6IC0+IHJldHVybiBAX3RpdGxlXG5cdFx0c2V0OiAodGl0bGVUZXh0KSAtPlxuXHRcdFx0QF90aXRsZSA9IHRpdGxlVGV4dFxuXHRcdFx0QHRpdGxlTGF5ZXIudGV4dFJlcGxhY2UoQHRpdGxlTGF5ZXIudGV4dCwgQF90aXRsZSlcblxuXHRAZGVmaW5lIFwiaWNvblwiLFxuXHRcdGdldDogLT4gcmV0dXJuIEBfaWNvblxuXHRcdHNldDogKGljb25OYW1lKSAtPiBcblx0XHRcdEBfaWNvbiA9IGljb25OYW1lXG5cdFx0XHRAaWNvbkxheWVyLmljb24gPSBpY29uTmFtZVxuXG5cdEBkZWZpbmUgXCJpY29uQ29sb3JcIixcblx0XHRnZXQ6IC0+IHJldHVybiBAX2ljb24uY29sb3Jcblx0XHRzZXQ6IChjb2xvcikgLT4gXG5cdFx0XHRAaWNvbkxheWVyLmNvbG9yID0gY29sb3JcblxuXHRAZGVmaW5lIFwiaWNvbkFjdGlvblwiLFxuXHRcdGdldDogLT4gcmV0dXJuIEBfaWNvbkFjdGlvblxuXHRcdHNldDogKGFjdGlvbikgLT5cblx0XHRcdEBfaWNvbkFjdGlvbiA9IGFjdGlvblxuXG5cblxuXG5cblxuXG4jIFx0IDg4ODg4OGJhICAgICAgICAgICAgIGRQICAgICBkUCAgICAgICAgICAgICAgICAgICAgICAgODg4ODg4YmFcbiMgXHQgODggICAgYDhiICAgICAgICAgICAgODggICAgIDg4ICAgICAgICAgICAgICAgICAgICAgICA4OCAgICBgOGJcbiMgXHRhODhhYWFhOFAnIC5kODg4OGIuIGQ4ODg4UCBkODg4OFAgLmQ4ODg4Yi4gODhkOGIuZDhiLiA4OCAgICAgODggLmQ4ODg4Yi4gZFAgICAuZFBcbiMgXHQgODggICBgOGIuIDg4JyAgYDg4ICAgODggICAgIDg4ICAgODgnICBgODggODgnYDg4J2A4OCA4OCAgICAgODggODgnICBgODggODggICBkOCdcbiMgXHQgODggICAgLjg4IDg4LiAgLjg4ICAgODggICAgIDg4ICAgODguICAuODggODggIDg4ICA4OCA4OCAgICAgODggODguICAuODggODggLjg4J1xuIyBcdCA4ODg4ODg4OFAgYDg4ODg4UCcgICBkUCAgICAgZFAgICBgODg4ODhQJyBkUCAgZFAgIGRQIGRQICAgICBkUCBgODg4ODhQOCA4ODg4UCdcblxuXG5cbmV4cG9ydHMuQm90dG9tTmF2ID0gY2xhc3MgQm90dG9tTmF2IGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cdFx0XG5cdFx0QF9kZXN0aW5hdGlvbnMgPSBvcHRpb25zLmRlc3RpbmF0aW9ucyA/IHRocm93ICdOZWVkcyBhdCBsZWFzdCBvbmUgZGVzdGluYXRpb24uJ1xuXHRcdEBfaXRlbXMgPSBbXVxuXHRcdEBfaW5pdGlhbERlc3RpbmF0aW9uID0gb3B0aW9ucy5pbml0aWFsRGVzdGluYXRpb24gPyB1bmRlZmluZWRcblx0XHQjIGRlc3RpbmF0aW9uIHNob3VsZCBiZTogW3tuYW1lOiBzdHJpbmcsIGljb246IGljb25TdHJpbmcsIGFjdGlvbjogZnVuY3Rpb259XVxuXHRcdEBfYWN0aXZlRGVzdGluYXRpb24gPSBAX2luaXRpYWxEZXN0aW5hdGlvbiA/IEBfaXRlbXNbMF1cblxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdG5hbWU6ICdCb3R0b20gTmF2J1xuXHRcdFx0eTogQWxpZ24uYm90dG9tXG5cdFx0XHR3aWR0aDogU2NyZWVuLndpZHRoLCBoZWlnaHQ6IDU2XG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IHRoZW1lLmJvdHRvbU5hdi5iYWNrZ3JvdW5kQ29sb3Jcblx0XHRcdHNoYWRvd1k6IHRoZW1lLmJvdHRvbU5hdi5zaGFkb3dZXG5cdFx0XHRzaGFkb3dCbHVyOiB0aGVtZS5ib3R0b21OYXYuc2hhZG93Qmx1clxuXHRcdFx0c2hhZG93Q29sb3I6IHRoZW1lLmJvdHRvbU5hdi5zaGFkb3dDb2xvclxuXHRcdFx0Y2xpcDogdHJ1ZVxuXG5cblx0XHRmb3IgZGVzdGluYXRpb24sIGkgaW4gQF9kZXN0aW5hdGlvbnNcblx0XHRcdGl0ZW0gPSBuZXcgTGF5ZXJcblx0XHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEBcblx0XHRcdFx0eDogQHdpZHRoL0BfZGVzdGluYXRpb25zLmxlbmd0aCAqIGlcblx0XHRcdFx0d2lkdGg6IEB3aWR0aC9AX2Rlc3RpbmF0aW9ucy5sZW5ndGgsIGhlaWdodDogQGhlaWdodFxuXHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblxuXHRcdFx0aXRlbS5kaXNrID0gbmV3IExheWVyXG5cdFx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBpdGVtXG5cdFx0XHRcdHg6IEFsaWduLmNlbnRlciwgeTogQWxpZ24uY2VudGVyXG5cdFx0XHRcdGhlaWdodDogQGhlaWdodCAqIDEuNSwgd2lkdGg6IEBoZWlnaHQgKiAxLjUsIGJvcmRlclJhZGl1czogQGhlaWdodFxuXHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblxuXHRcdFx0aXRlbS5pY29uTGF5ZXIgPSBuZXcgSWNvblxuXHRcdFx0XHRuYW1lOiAnLicsIHBhcmVudDogaXRlbS5kaXNrXG5cdFx0XHRcdHg6IEFsaWduLmNlbnRlciwgeTogQWxpZ24uY2VudGVyKC04KVxuXHRcdFx0XHRpY29uOiBkZXN0aW5hdGlvbi5pY29uXG5cdFx0XHRcdGFuaW1hdGlvbk9wdGlvbnM6IHt0aW1lOiAuMTV9XG5cblx0XHRcdGl0ZW0ubGFiZWxMYXllciA9IG5ldyB0eXBlLkNhcHRpb25cblx0XHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IGl0ZW0uZGlza1xuXHRcdFx0XHR4OiBBbGlnbi5jZW50ZXIsIHk6IEFsaWduLmNlbnRlcigxNClcblx0XHRcdFx0d2lkdGg6IEB3aWR0aCwgdGV4dEFsaWduOiAnY2VudGVyJ1xuXHRcdFx0XHR0ZXh0OiBkZXN0aW5hdGlvbi50aXRsZVxuXHRcdFx0XHRhbmltYXRpb25PcHRpb25zOiB7dGltZTogLjE1fVxuXG5cdFx0XHRpdGVtLmFjdGlvbiA9IGRlc3RpbmF0aW9uLmFjdGlvblxuXG5cdFx0XHRpdGVtLmRpc2sub25Ub3VjaFN0YXJ0IChldmVudCkgLT4gXG5cdFx0XHRcdHJpcHBsZShALCBldmVudC5wb2ludCwgQHBhcmVudC5pY29uTGF5ZXIsIG5ldyBDb2xvcih0aGVtZS5wcmltYXJ5KS5hbHBoYSguMykpXG5cblx0XHRcdGl0ZW0ub25UYXAgLT4gQHBhcmVudC5hY3RpdmVEZXN0aW5hdGlvbiA9IEBcblxuXHRcdFx0QF9pdGVtcy5wdXNoKGl0ZW0pXG5cblx0XHRcdEBzaG93QWN0aXZlKEBfaXRlbXNbMF0pXG5cblx0XHRcblxuXHRAZGVmaW5lIFwiYWN0aXZlRGVzdGluYXRpb25cIixcblx0XHRnZXQ6IC0+IHJldHVybiBAX2FjdGl2ZURlc3RpbmF0aW9uXG5cdFx0c2V0OiAoZGVzdGluYXRpb24pIC0+XG5cdFx0XHRyZXR1cm4gaWYgZGVzdGluYXRpb24gaXMgQF9hY3RpdmVEZXN0aW5hdGlvblxuXHRcdFx0QF9hY3RpdmVEZXN0aW5hdGlvbiA9IGRlc3RpbmF0aW9uXG5cblx0XHRcdEBfYWN0aXZlRGVzdGluYXRpb24uYWN0aW9uKClcblx0XHRcdEBzaG93QWN0aXZlKEBfYWN0aXZlRGVzdGluYXRpb24pXG5cblx0c2hvd0FjdGl2ZTogKGl0ZW0pIC0+XG5cdFx0aXRlbS5sYWJlbExheWVyLmFuaW1hdGUge2NvbG9yOiB0aGVtZS5wcmltYXJ5LCBvcGFjaXR5OiAxfVxuXHRcdGl0ZW0uaWNvbkxheWVyLmNvbG9yID0gdGhlbWUucHJpbWFyeVxuXHRcdFxuXG5cdFx0Zm9yIHNpYiBpbiBpdGVtLnNpYmxpbmdzXG5cdFx0XHRzaWIubGFiZWxMYXllci5hbmltYXRlIHtjb2xvcjogJyM3NzcnfVxuXHRcdFx0c2liLmljb25MYXllci5jb2xvciA9ICcjNzc3J1xuXG5cblxuXG4jICA4ODg4ODhiYSAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiMgIDg4ICAgIGA4YiAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuIyBhODhhYWFhOFAnIC5kODg4OGIuIC5kODg4OGIuIC5kODg4OGIuXG4jICA4OCAgICAgICAgODgnICBgODggODgnICBgODggODhvb29vZDhcbiMgIDg4ICAgICAgICA4OC4gIC44OCA4OC4gIC44OCA4OC4gIC4uLlxuIyAgZFAgICAgICAgIGA4ODg4OFA4IGA4ODg4UDg4IGA4ODg4OFAnXG4jICAgICAgICAgICAgICAgICAgICAgICAgICAuODggICAgICAgICBcbiMgICAgICAgICAgICAgICAgICAgICAgZDg4ODhQICAgICAgICAgIFxuXG5cblxuZXhwb3J0cy5QYWdlID0gY2xhc3MgUGFnZSBleHRlbmRzIFNjcm9sbENvbXBvbmVudFxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblx0XHRcblx0XHRAX2hlYWRlciA9IHt9XG5cdFx0QF9oZWFkZXIudGl0bGUgPSBvcHRpb25zLmhlYWRlcj8udGl0bGUgPyAnTmV3IFBhZ2UnXG5cdFx0QF9oZWFkZXIudmlzaWJsZSA9IG9wdGlvbnMuaGVhZGVyPy52aXNpYmxlID8gdHJ1ZVxuXHRcdEBfaGVhZGVyLmljb24gPSBvcHRpb25zLmhlYWRlcj8uaWNvbiA/ICdtZW51J1xuXHRcdEBfaGVhZGVyLmljb25BY3Rpb24gPSBvcHRpb25zLmhlYWRlcj8uaWNvbkFjdGlvbiA/IC0+IG51bGxcblxuXHRcdEBfdGVtcGxhdGUgPSBvcHRpb25zLnRlbXBsYXRlXG5cdFx0QF90ZW1wbGF0ZU9wYWNpdHkgPSBvcHRpb25zLnRlbXBsYXRlT3BhY2l0eSA/IC41XG5cdFx0QF9vbkxvYWQgPSBvcHRpb25zLm9uTG9hZCA/IC0+IG51bGxcblxuXHRcdGlmIEBfaGVhZGVyLmljb25BY3Rpb24gdGhlbiBAX2hlYWRlci5pY29uQWN0aW9uID0gXy5iaW5kKEBfaGVhZGVyLmljb25BY3Rpb24sIEApXG5cdFx0aWYgQF9vbkxvYWQgdGhlbiBAX29uTG9hZCA9IF8uYmluZChAX29uTG9hZCwgQClcblxuXG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0bmFtZTogJ1BhZ2UnXG5cdFx0XHRzaXplOiBTY3JlZW4uc2l6ZVxuXHRcdFx0c2Nyb2xsSG9yaXpvbnRhbDogZmFsc2Vcblx0XHRcdGJhY2tncm91bmRDb2xvcjogdGhlbWUucGFnZS5wcmltYXJ5LmJhY2tncm91bmRDb2xvclxuXHRcdFxuXHRcdEBjb250ZW50SW5zZXQgPVxuXHRcdFx0dG9wOiAwLCBib3R0b206IDE2MFxuXG5cdFx0QGNvbnRlbnQuYmFja2dyb3VuZENvbG9yID0gbnVsbFxuXG5cdFx0aWYgQF90ZW1wbGF0ZT9cblx0XHRcdEBfdGVtcGxhdGUucHJvcHMgPVxuXHRcdFx0XHRwYXJlbnQ6IEBcblx0XHRcdFx0b3BhY2l0eTogQF90ZW1wbGF0ZU9wYWNpdHlcblxuXHRcdEBzZW5kVG9CYWNrKClcblxuXG5cdHVwZGF0ZTogLT4gcmV0dXJuIG51bGxcblxuXG5cblxuXG5cblxuXG4jICA4ODg4ODhiYSAgICAgICAgICAgICAgICAgICAgICBkUCAgIGRQICAgICAgICAgICAgICAgICAgICAgIFxuIyAgODggICAgYDhiICAgICAgICAgICAgICAgICAgICAgODggICA4OCAgICAgICAgICAgICAgICAgICAgICBcbiMgYTg4YWFhYThQJyAuZDg4ODhiLiBkUCAgZFAgIGRQIDg4IGQ4ODg4UCAuZDg4ODhiLiA4OGQ4Yi5kOGIuXG4jICA4OCAgIGA4Yi4gODgnICBgODggODggIDg4ICA4OCA4OCAgIDg4ICAgODhvb29vZDggODgnYDg4J2A4OFxuIyAgODggICAgIDg4IDg4LiAgLjg4IDg4Ljg4Yi44OCcgODggICA4OCAgIDg4LiAgLi4uIDg4ICA4OCAgODhcbiMgIGRQICAgICBkUCBgODg4ODhQJyA4ODg4UCBZOFAgIGRQICAgZFAgICBgODg4ODhQJyBkUCAgZFAgIGRQXG5cblxuXG5leHBvcnRzLlJvd0l0ZW0gPSBjbGFzcyBSb3dJdGVtIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cblx0XHRAX2ljb24gPSBvcHRpb25zLmljb25cblx0XHRAX2ljb25CYWNrZ3JvdW5kQ29sb3IgPSBvcHRpb25zLmljb25CYWNrZ3JvdW5kQ29sb3IgPyAnIzc3Nydcblx0XHRAX3RleHQgPSBvcHRpb25zLnRleHQgPyAnUm93IGl0ZW0nXG5cdFx0QF9yb3cgPSBvcHRpb25zLnJvdyA/IDBcblx0XHRAX3kgPSAzMiArIChAX3JvdyAqIDQ4KSBcblxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdHdpZHRoOiBTY3JlZW4ud2lkdGhcblx0XHRcdHk6IEBfeVxuXHRcdFx0aGVpZ2h0OiA0OFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cblx0XHRAaWNvbiA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEBcblx0XHRcdHg6IDE2LCB5OiBBbGlnbi5jZW50ZXJcblx0XHRcdGhlaWdodDogMzIsIHdpZHRoOiAzMiwgYm9yZGVyUmFkaXVzOiAxNlxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBAX2ljb25CYWNrZ3JvdW5kQ29sb3Jcblx0XHRcdGltYWdlOiBAX2ljb25cblxuXHRcdEBsYWJlbExheWVyID0gbmV3IHR5cGUuUmVndWxhclxuXHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEBcblx0XHRcdHg6IEBpY29uLm1heFggKyAxNiwgeTogQWxpZ24uY2VudGVyXG5cdFx0XHRjb2xvcjogdGhlbWUudGV4dC50ZXh0XG5cdFx0XHR0ZXh0OiBAX3RleHRcblxuXG5cblxuXG5cblxuXG4jIFx0ODg4OGJhLjg4YmEgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA4ODg4ODhiYSAgICAgICAgICAgICBkUCAgICAgZFBcbiMgXHQ4OCAgYDhiICBgOGIgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDg4ICAgIGA4YiAgICAgICAgICAgIDg4ICAgICA4OFxuIyBcdDg4ICAgODggICA4OCAuZDg4ODhiLiA4OGQ4ODhiLiBkUCAgICBkUCBhODhhYWFhOFAnIGRQICAgIGRQIGQ4ODg4UCBkODg4OFAgLmQ4ODg4Yi4gODhkODg4Yi5cbiMgXHQ4OCAgIDg4ICAgODggODhvb29vZDggODgnICBgODggODggICAgODggIDg4ICAgYDhiLiA4OCAgICA4OCAgIDg4ICAgICA4OCAgIDg4JyAgYDg4IDg4JyAgYDg4XG4jIFx0ODggICA4OCAgIDg4IDg4LiAgLi4uIDg4ICAgIDg4IDg4LiAgLjg4ICA4OCAgICAuODggODguICAuODggICA4OCAgICAgODggICA4OC4gIC44OCA4OCAgICA4OFxuIyBcdGRQICAgZFAgICBkUCBgODg4ODhQJyBkUCAgICBkUCBgODg4ODhQJyAgODg4ODg4ODhQIGA4ODg4OFAnICAgZFAgICAgIGRQICAgYDg4ODg4UCcgZFAgICAgZFBcblxuXG5cbmNsYXNzIE1lbnVCdXR0b24gZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblx0XHRcblx0XHRAX2ljb24gPSBvcHRpb25zLmljb24gPyAnaG9tZSdcblx0XHRAX3RleHQgPSBvcHRpb25zLnRleHQgPyAnRGVmYXVsdCdcblx0XHRAX2FjdGlvbiA9IG9wdGlvbnMuYWN0aW9uID8gLT4gbnVsbFxuXG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0aGVpZ2h0OiA0OCwgd2lkdGg6IDMwNFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cblx0XHRAaWNvbkxheWVyID0gbmV3IEljb25cblx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBAXG5cdFx0XHR5OiBBbGlnbi5jZW50ZXJcblx0XHRcdGljb246IEBfaWNvbiwgY29sb3I6IHRoZW1lLm1lbnVPdmVybGF5LnRleHRcblxuXHRcdEBsYWJlbExheWVyID0gbmV3IHR5cGUuUmVndWxhclxuXHRcdFx0bmFtZTogJ2xhYmVsJywgcGFyZW50OiBAXG5cdFx0XHR4OiBAaWNvbkxheWVyLm1heFggKyAxNlxuXHRcdFx0eTogQWxpZ24uY2VudGVyKClcblx0XHRcdGNvbG9yOiB0aGVtZS5tZW51T3ZlcmxheS50ZXh0XG5cdFx0XHR0ZXh0OiBAX3RleHRcblxuXHRcdEBvblRhcCBAX2FjdGlvblxuXHRcdEBvblRhcCAtPiBcblx0XHRcdFV0aWxzLmRlbGF5IC4yNSwgPT4gQHBhcmVudC5oaWRlKClcblxuXG5cblxuXG5cblxuXG4jIFx0ODg4OGJhLjg4YmEgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuODg4ODguICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkUCAgICAgICAgICAgICAgICAgIFxuIyBcdDg4ICBgOGIgIGA4YiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkOCcgICBgOGIgICAgICAgICAgICAgICAgICAgICAgICAgICAgODggICAgICAgICAgICAgICAgICBcbiMgXHQ4OCAgIDg4ICAgODggLmQ4ODg4Yi4gODhkODg4Yi4gZFAgICAgZFAgODggICAgIDg4IGRQICAgLmRQIC5kODg4OGIuIDg4ZDg4OGIuIDg4IC5kODg4OGIuIGRQICAgIGRQXG4jIFx0ODggICA4OCAgIDg4IDg4b29vb2Q4IDg4JyAgYDg4IDg4ICAgIDg4IDg4ICAgICA4OCA4OCAgIGQ4JyA4OG9vb29kOCA4OCcgIGA4OCA4OCA4OCcgIGA4OCA4OCAgICA4OFxuIyBcdDg4ICAgODggICA4OCA4OC4gIC4uLiA4OCAgICA4OCA4OC4gIC44OCBZOC4gICAuOFAgODggLjg4JyAgODguICAuLi4gODggICAgICAgODggODguICAuODggODguICAuODhcbiMgXHRkUCAgIGRQICAgZFAgYDg4ODg4UCcgZFAgICAgZFAgYDg4ODg4UCcgIGA4ODg4UCcgIDg4ODhQJyAgIGA4ODg4OFAnIGRQICAgICAgIGRQIGA4ODg4OFA4IGA4ODg4UDg4XG4jICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuODhcbiMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZDg4ODhQIFxuXG5cblxuZXhwb3J0cy5NZW51T3ZlcmxheSA9IGNsYXNzIE1lbnVPdmVybGF5IGV4dGVuZHMgTGF5ZXJcblx0XG5cdFxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblxuXHRcdEBfbGlua3MgPSBvcHRpb25zLmxpbmtzID8gW3t0aXRsZTogJ0hvbWUnLCBpY29uOiAnaG9tZScsIGFjdGlvbjogLT4gbnVsbH1dXG5cdFx0QF90aXRsZSA9IG9wdGlvbnMudGl0bGUgPyAnTWVudSdcblx0XHRAX2ltYWdlID0gb3B0aW9ucy5pbWFnZSA/IG51bGxcblxuXG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0aGVpZ2h0OiBTY3JlZW4uaGVpZ2h0XG5cdFx0XHR3aWR0aDogMzA0XG5cdFx0XHR2aXNpYmxlOiBmYWxzZVxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiB0aGVtZS5tZW51T3ZlcmxheS5iYWNrZ3JvdW5kQ29sb3Jcblx0XHRcdGFuaW1hdGlvbk9wdGlvbnM6IHtjdXJ2ZTogXCJzcHJpbmcoMzAwLCAzNSwgMClcIn1cblxuXG5cdFx0QHNjcmltID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiAnLicsIFxuXHRcdFx0c2l6ZTogU2NyZWVuLnNpemVcblx0XHRcdGJhY2tncm91bmRDb2xvcjogJ3JnYmEoMCwwLDAsLjYpJ1xuXHRcdFx0b3BhY2l0eTogMFxuXHRcdFx0dmlzaWJsZTogZmFsc2Vcblx0XHRcdGFuaW1hdGlvbk9wdGlvbnM6XG5cdFx0XHRcdHRpbWU6IC4yNVxuXG5cdFx0QHNjcmltLm9uVGFwID0+IEBoaWRlKClcblx0XHRAb25Td2lwZUxlZnRFbmQgPT4gQGhpZGUoKVxuXG5cdFx0QGhlYWRlciA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEBcblx0XHRcdHdpZHRoOiBAd2lkdGgsIGhlaWdodDogMTczXG5cdFx0XHRpbWFnZTogdGhlbWUudXNlci5pbWFnZVxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiB0aGVtZS5tZW51T3ZlcmxheS5oZWFkZXIuYmFja2dyb3VuZENvbG9yXG5cblx0XHRAdGl0bGVJY29uID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQGhlYWRlclxuXHRcdFx0eDogMTYsIHk6IDQwXG5cdFx0XHRoZWlnaHQ6IDY0LCB3aWR0aDogNjRcblx0XHRcdGJvcmRlclJhZGl1czogMzJcblx0XHRcdGJhY2tncm91bmRDb2xvcjogdGhlbWUubWVudU92ZXJsYXkuaGVhZGVyLmljb25cblxuXHRcdEBzdWJoZWFkZXJFeHBhbmQgPSBuZXcgSWNvblxuXHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEBoZWFkZXJcblx0XHRcdHg6IEFsaWduLnJpZ2h0KC0xNilcblx0XHRcdHk6IEFsaWduLmJvdHRvbSgtMTYpXG5cdFx0XHRpY29uOiAnbWVudS1kb3duJ1xuXHRcdFx0Y29sb3I6IHRoZW1lLm1lbnVPdmVybGF5LnN1YmhlYWRlci5pY29uXG5cblx0XHRAc3ViaGVhZGVyID0gbmV3IHR5cGUuQm9keTFcblx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBAaGVhZGVyXG5cdFx0XHR3aWR0aDogQHdpZHRoXG5cdFx0XHR4OiAxNiwgeTogQWxpZ24uYm90dG9tKC0xOClcblx0XHRcdHRleHQ6IEBfdGl0bGVcblx0XHRcdGNvbG9yOiB0aGVtZS5tZW51T3ZlcmxheS5zdWJoZWFkZXIudGV4dFxuXG5cdFx0bGlua3MgPSBbXVxuXG5cdFx0Zm9yIGxpbmssIGkgaW4gQF9saW5rc1xuXHRcdFx0bGlua3NbaV0gPSBuZXcgTWVudUJ1dHRvblxuXHRcdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQFxuXHRcdFx0XHR4OiAxNiwgeTogMTg5ICsgKDQ4ICogaSlcblx0XHRcdFx0dGV4dDogbGluay50aXRsZVxuXHRcdFx0XHRpY29uOiBsaW5rLmljb25cblx0XHRcdFx0YWN0aW9uOiBsaW5rLmFjdGlvblxuXG5cdHNob3c6IC0+XG5cdFx0QGJyaW5nVG9Gcm9udCgpXG5cdFx0QHZpc2libGUgPSB0cnVlXG5cdFx0QHggPSAtU2NyZWVuLndpZHRoXG5cdFx0QGFuaW1hdGVcblx0XHRcdHg6IDBcblxuXHRcdEBzY3JpbS5wbGFjZUJlaGluZChAKVxuXHRcdEBzY3JpbS52aXNpYmxlID0gdHJ1ZVxuXHRcdEBzY3JpbS5hbmltYXRlXG5cdFx0XHRvcGFjaXR5OiAxXG5cblx0aGlkZTogLT5cblx0XHRAYW5pbWF0ZVxuXHRcdFx0eDogLVNjcmVlbi53aWR0aFxuXG5cdFx0QHNjcmltLmFuaW1hdGVcblx0XHRcdG9wYWNpdHk6IDBcblxuXHRcdFV0aWxzLmRlbGF5IC4zLCA9PlxuXHRcdFx0QHZpc2libGUgPSBmYWxzZVxuXHRcdFx0QHNjcmltLnZpc2libGUgPSBmYWxzZVxuXHRcdFx0QHNlbmRUb0JhY2soKVxuXHRcdFx0QHNjcmltLnNlbmRUb0JhY2soKVxuXG5cblxuXG5cblxuXG5cbiMgXHQ4ODg4ODhiYSAgb28gICAgICAgICAgZFBcbiMgXHQ4OCAgICBgOGIgICAgICAgICAgICAgODhcbiMgXHQ4OCAgICAgODggZFAgLmQ4ODg4Yi4gODggLmQ4ODg4Yi4gLmQ4ODg4Yi5cbiMgXHQ4OCAgICAgODggODggODgnICBgODggODggODgnICBgODggODgnICBgODhcbiMgXHQ4OCAgICAuOFAgODggODguICAuODggODggODguICAuODggODguICAuODhcbiMgXHQ4ODg4ODg4UCAgZFAgYDg4ODg4UDggZFAgYDg4ODg4UCcgYDg4ODhQODhcbiMgXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuODhcbiMgXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGQ4ODg4UFxuXG5cblxuZXhwb3J0cy5EaWFsb2cgPSBjbGFzcyBEaWFsb2cgZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBhcHBcblx0XHRcdHNpemU6IFNjcmVlbi5zaXplXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6ICdyZ2JhKDAsIDAsIDAsIC41KSdcblx0XHRcdG9wYWNpdHk6IDBcblx0XHRcdFxuXHRcdEBfdGl0bGUgPSBvcHRpb25zLnRpdGxlID8gJ0RlZmF1bHQgVGl0bGUnXG5cdFx0QF9ib2R5ID0gb3B0aW9ucy5ib2R5ID8gJ0JvZHkgdGV4dCBnb2VzIGhlcmUuJ1xuXHRcdEBfYWNjZXB0VGV4dCA9IG9wdGlvbnMuYWNjZXB0VGV4dCA/ICdjb25maXJtJ1xuXHRcdEBfYWNjZXB0QWN0aW9uID0gb3B0aW9ucy5hY2NlcHRBY3Rpb24gPyAtPiBudWxsXG5cdFx0QF9kZWNsaW5lVGV4dCA9IG9wdGlvbnMuZGVjbGluZVRleHQgPyAnJ1xuXHRcdEBfZGVjbGluZUFjdGlvbiA9IG9wdGlvbnMuZGVjbGluZUFjdGlvbiA/IC0+IG51bGxcblx0XHRcblx0XHRAb24gRXZlbnRzLlRhcCwgKGV2ZW50KSAtPiBldmVudC5zdG9wUHJvcGFnYXRpb24oKVxuXHRcdFxuXHRcdEBjb250YWluZXIgPSBuZXcgTGF5ZXJcblx0XHRcdG5hbWU6ICdjb250YWluZXInLCBwYXJlbnQ6IEBcblx0XHRcdHg6IEFsaWduLmNlbnRlclxuXHRcdFx0aGVpZ2h0OiAxMjgsIHdpZHRoOiBTY3JlZW4ud2lkdGggLSA4MFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiB0aGVtZS5kaWFsb2cuYmFja2dyb3VuZENvbG9yXG5cdFx0XHRzaGFkb3dYOiAwLCBzaGFkb3dZOiA3LCBzaGFkb3dCbHVyOiAzMFxuXHRcdFx0b3BhY2l0eTogMFxuXHRcdFx0c2hhZG93Q29sb3I6ICdyZ2JhKDAsMCwwLC4zKSdcblx0XHRcblx0XHRAdGl0bGUgPSBuZXcgdHlwZS5UaXRsZVxuXHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEBjb250YWluZXJcblx0XHRcdHg6IDI0LCB5OiAyMFxuXHRcdFx0Zm9udFNpemU6IDE2LCBmb250V2VpZ2h0OiA1MDAsIGNvbG9yOiB0aGVtZS50ZXh0LnRpdGxlXG5cdFx0XHR0ZXh0OiBAX3RpdGxlXG5cdFx0XG5cdFx0QGJvZHkgPSBuZXcgdHlwZS5TdWJoZWFkXG5cdFx0XHRuYW1lOiAnYm9keScsIHBhcmVudDogQGNvbnRhaW5lclxuXHRcdFx0eDogMjQsIHk6IDUyXG5cdFx0XHR3aWR0aDogQGNvbnRhaW5lci53aWR0aCAtIDQyXG5cdFx0XHR0ZXh0OiBAX2JvZHlcblx0XHRcblx0XHRidXR0b25zWSA9IGlmIEBfYm9keSBpcyAnJyB0aGVuIDEyOCBlbHNlIEBib2R5Lm1heFkgKyAxNlxuXHRcdFxuXHRcdEBhY2NlcHQgPSBuZXcgQnV0dG9uXG5cdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQGNvbnRhaW5lclxuXHRcdFx0eDogQWxpZ24ucmlnaHQoLTE2KSwgeTogYnV0dG9uc1lcblx0XHRcdHRleHQ6IEBfYWNjZXB0VGV4dC50b1VwcGVyQ2FzZSgpXG5cdFx0XHRhY3Rpb246IEBfYWNjZXB0QWN0aW9uXG5cdFx0XG5cdFx0aWYgQF9kZWNsaW5lVGV4dCBpc250ICcnXG5cdFx0XHRAZGVjbGluZSA9IG5ldyBCdXR0b25cblx0XHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEBjb250YWluZXJcblx0XHRcdFx0eDogMCwgeTogYnV0dG9uc1lcblx0XHRcdFx0dGV4dDogQF9kZWNsaW5lVGV4dC50b1VwcGVyQ2FzZSgpXG5cdFx0XHRcdGFjdGlvbjogQF9kZWNsaW5lQWN0aW9uXG5cblx0XHQjIHNldCBwb3NpdGlvbnNcblx0XHRAY29udGFpbmVyLmhlaWdodCA9IEBhY2NlcHQubWF4WSArIDEyXG5cdFx0QGRlY2xpbmU/Lm1heFggPSBAYWNjZXB0LnggLSAxNlxuXHRcdEBjb250YWluZXIueSA9IEFsaWduLmNlbnRlcigxNilcblx0XHRcblx0XHQjIGFkZCBjbG9zZSBhY3Rpb25zIHRvIGNvbmZpcm0gYW5kIGNhbmNlbFxuXHRcdGZvciBidXR0b24gaW4gW0BhY2NlcHQsIEBkZWNsaW5lXVxuXHRcdFx0YnV0dG9uPy5vblRhcCBAY2xvc2Vcblx0XHRcblx0XHQjIE9OIExPQURcblx0XHRAb3BlbigpXG5cdFxuXHRvcGVuOiA9PlxuXHRcdEBhbmltYXRlXG5cdFx0XHRvcGFjaXR5OiAxXG5cdFx0XHRvcHRpb25zOiBcblx0XHRcdFx0dGltZTogLjI1XG5cdFx0XG5cdFx0QGNvbnRhaW5lci5hbmltYXRlXG5cdFx0XHRvcGFjaXR5OiAxXG5cdFx0XHRvcHRpb25zOlxuXHRcdFx0XHR0aW1lOiAuMjVcblx0XHRcdFx0ZGVsYXk6IC4wNVxuXG5cdGNsb3NlOiA9PlxuXHRcdEBjb250YWluZXIuYW5pbWF0ZVxuXHRcdFx0b3BhY2l0eTogMFxuXHRcdFx0b3B0aW9uczpcblx0XHRcdFx0dGltZTogLjI1XG5cdFx0XG5cdFx0QGFuaW1hdGVcblx0XHRcdG9wYWNpdHk6IDBcblx0XHRcdG9wdGlvbnM6XG5cdFx0XHRcdHRpbWU6IC4yNVxuXHRcdFxuXHRcdFV0aWxzLmRlbGF5IC41LCA9PiBAZGVzdHJveSgpXG5cblxuXG5cblxuXG5cblxuIyBcdCA4ODg4ODhiYSAgICAgICAgICAgICBkUCAgICAgZFBcbiMgXHQgODggICAgYDhiICAgICAgICAgICAgODggICAgIDg4XG4jIFx0YTg4YWFhYThQJyBkUCAgICBkUCBkODg4OFAgZDg4ODhQIC5kODg4OGIuIDg4ZDg4OGIuXG4jIFx0IDg4ICAgYDhiLiA4OCAgICA4OCAgIDg4ICAgICA4OCAgIDg4JyAgYDg4IDg4JyAgYDg4XG4jIFx0IDg4ICAgIC44OCA4OC4gIC44OCAgIDg4ICAgICA4OCAgIDg4LiAgLjg4IDg4ICAgIDg4XG4jIFx0IDg4ODg4ODg4UCBgODg4ODhQJyAgIGRQICAgICBkUCAgIGA4ODg4OFAnIGRQICAgIGRQXG5cblxuXG5leHBvcnRzLkJ1dHRvbiA9IEJ1dHRvbiA9IGNsYXNzIEJ1dHRvbiBleHRlbmRzIExheWVyIFxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblxuXHRcdEBfcmFpc2VkID0gb3B0aW9ucy5yYWlzZWQgPyBmYWxzZVxuXHRcdEBfdHlwZSA9IGlmIEBfcmFpc2VkIHRoZW4gJ3JhaXNlZCcgZWxzZSAnZmxhdCdcblx0XHRAX2FjdGlvbiA9IG9wdGlvbnMuYWN0aW9uID8gLT4gbnVsbFxuXG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0bmFtZTogJy4nXG5cdFx0XHR3aWR0aDogMCwgaGVpZ2h0OiAzNlxuXHRcdFx0Ym9yZGVyUmFkaXVzOiAyXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IHRoZW1lLmJ1dHRvbltAX3R5cGVdLmJhY2tncm91bmRDb2xvclxuXHRcdFx0c2hhZG93WTogdGhlbWUuYnV0dG9uW0BfdHlwZV0uc2hhZG93WVxuXHRcdFx0c2hhZG93Qmx1cjogdGhlbWUuYnV0dG9uW0BfdHlwZV0uc2hhZG93Qmx1clxuXHRcdFx0c2hhZG93Q29sb3I6IHRoZW1lLmJ1dHRvbltAX3R5cGVdLnNoYWRvd0NvbG9yXG5cdFx0XHRhbmltYXRpb25PcHRpb25zOiB7dGltZTogLjE1fVxuXG5cdFx0QGxhYmVsTGF5ZXIgPSBuZXcgdHlwZS5CdXR0b25cblx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBAXG5cdFx0XHRjb2xvcjogdGhlbWUuYnV0dG9uW0BfdHlwZV0uY29sb3Jcblx0XHRcdHRleHQ6IG9wdGlvbnMudGV4dCA/ICdidXR0b24nXG5cdFx0XHR0ZXh0VHJhbnNmb3JtOiAndXBwZXJjYXNlJ1xuXHRcdFx0dGV4dEFsaWduOiAnY2VudGVyJ1xuXHRcdFx0YW5pbWF0aW9uT3B0aW9uczoge3RpbWU6IC4xNX1cblx0XHRcdHBhZGRpbmc6IFxuXHRcdFx0XHRsZWZ0OiAxNi41LCByaWdodDogMTYuNVxuXHRcdFx0XHR0b3A6IDksIGJvdHRvbTogMTFcblxuXHRcdEBzaXplID0gQGxhYmVsTGF5ZXIuc2l6ZVxuXHRcdEB4ID0gb3B0aW9ucy54XG5cblx0XHRAb25Ub3VjaFN0YXJ0IChldmVudCkgLT4gXG5cdFx0XHRAc2hvd1RvdWNoZWQoKVxuXHRcdFx0VXRpbHMuZGVsYXkgMSwgPT4gQHJlc2V0KClcblx0XHRcblx0XHRAb25Ub3VjaEVuZCAoZXZlbnQpIC0+IFxuXHRcdFx0QF9hY3Rpb24oKVxuXHRcdFx0QHJlc2V0KClcblxuXG5cdHNob3dUb3VjaGVkOiAtPiBcblx0XHRAbGFiZWxMYXllci5hbmltYXRlIHticmlnaHRuZXNzOiAxMTAsIHNhdHVyYXRlOiAxMTB9XG5cdFx0XG5cdFx0c3dpdGNoIEBfdHlwZVxuXHRcdFx0d2hlbiAnZmxhdCcgdGhlbiBAYW5pbWF0ZSB7YmFja2dyb3VuZENvbG9yOiAncmdiYSgwLDAsMCwuMDUpJ31cblx0XHRcdHdoZW4gJ3JhaXNlZCdcblx0XHRcdFx0cmlwcGxlKEAsIGV2ZW50LnBvaW50LCBAbGFiZWxMYXllcilcblx0XHRcdFx0QGFuaW1hdGUge3NoYWRvd1k6IDMsIHNoYWRvd1NwcmVhZDogMX1cblxuXHRyZXNldDogLT5cblx0XHRAbGFiZWxMYXllci5hbmltYXRlIHticmlnaHRuZXNzOiAxMDAsIHNhdHVyYXRlOiAxMDB9XG5cdFx0QGJhY2tncm91bmRDb2xvciA9IHRoZW1lLmJ1dHRvbltAX3R5cGVdLmJhY2tncm91bmRDb2xvclxuXHRcdEBhbmltYXRlIFxuXHRcdFx0c2hhZG93WTogdGhlbWUuYnV0dG9uW0BfdHlwZV0uc2hhZG93WVxuXHRcdFx0c2hhZG93U3ByZWFkOiAwXG5cblxuXG5cblxuXG5cbiMgXHQgLmQ4ODg4ODggICAgICAgICAgICAgZFAgICBvbyAgICAgICAgICAgICAgICAgICAgODg4ODg4YmEgICAgICAgICAgICAgZFAgICAgIGRQXG4jIFx0ZDgnICAgIDg4ICAgICAgICAgICAgIDg4ICAgICAgICAgICAgICAgICAgICAgICAgIDg4ICAgIGA4YiAgICAgICAgICAgIDg4ICAgICA4OFxuIyBcdDg4YWFhYWE4OGEgLmQ4ODg4Yi4gZDg4ODhQIGRQIC5kODg4OGIuIDg4ZDg4OGIuIGE4OGFhYWE4UCcgZFAgICAgZFAgZDg4ODhQIGQ4ODg4UCAuZDg4ODhiLiA4OGQ4ODhiLlxuIyBcdDg4ICAgICA4OCAgODgnICBgXCJcIiAgIDg4ICAgODggODgnICBgODggODgnICBgODggIDg4ICAgYDhiLiA4OCAgICA4OCAgIDg4ICAgICA4OCAgIDg4JyAgYDg4IDg4JyAgYDg4XG4jIFx0ODggICAgIDg4ICA4OC4gIC4uLiAgIDg4ICAgODggODguICAuODggODggICAgODggIDg4ICAgIC44OCA4OC4gIC44OCAgIDg4ICAgICA4OCAgIDg4LiAgLjg4IDg4ICAgIDg4XG4jIFx0ODggICAgIDg4ICBgODg4ODhQJyAgIGRQICAgZFAgYDg4ODg4UCcgZFAgICAgZFAgIDg4ODg4ODg4UCBgODg4ODhQJyAgIGRQICAgICBkUCAgIGA4ODg4OFAnIGRQICAgIGRQXG5cblxuZXhwb3J0cy5BY3Rpb25CdXR0b24gPSBBY3Rpb25CdXR0b24gPSBjbGFzcyBBY3Rpb25CdXR0b24gZXh0ZW5kcyBMYXllciBcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cblx0XHRAX3JhaXNlZCA9IG9wdGlvbnMucmFpc2VkID8gZmFsc2Vcblx0XHRAX2FjdGlvbiA9IG9wdGlvbnMuYWN0aW9uID8gLT4gbnVsbFxuXHRcdEBfaWNvbiA9IG9wdGlvbnMuaWNvbiA/ICdwbHVzJ1xuXG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0bmFtZTogJy4nXG5cdFx0XHR4OiBBbGlnbi5yaWdodCgtMTYpLCB5OiBBbGlnbi5ib3R0b20oLTE3KVxuXHRcdFx0d2lkdGg6IDY0LCBoZWlnaHQ6IDY0LCBib3JkZXJSYWRpdXM6IDMyXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IHRoZW1lLmZhYi5iYWNrZ3JvdW5kQ29sb3Jcblx0XHRcdHNoYWRvd1k6IDIsIHNoYWRvd0JsdXI6IDNcblx0XHRcdHNoYWRvd0NvbG9yOiAncmdiYSgwLDAsMCwuMjUpJ1xuXHRcdFx0YW5pbWF0aW9uT3B0aW9uczoge3RpbWU6IC4xNX1cblxuXHRcdGlmIGFwcC5ib3R0b21OYXY/IHRoZW4gQHkgLT0gYXBwLmJvdHRvbU5hdi5oZWlnaHRcblxuXHRcdEBpY29uTGF5ZXIgPSBuZXcgSWNvblxuXHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEBcblx0XHRcdHg6IEFsaWduLmNlbnRlciwgeTogQWxpZ24uY2VudGVyXG5cdFx0XHRpY29uOiBAX2ljb24sIGNvbG9yOiB0aGVtZS5mYWIuY29sb3JcblxuXHRcdEBvblRvdWNoU3RhcnQgKGV2ZW50KSAtPiBcblx0XHRcdEBzaG93VG91Y2hlZCgpXG5cdFx0XHRVdGlscy5kZWxheSAxLCA9PiBAcmVzZXQoKVxuXHRcdFxuXHRcdEBvblRvdWNoRW5kIChldmVudCkgLT4gXG5cdFx0XHRAX2FjdGlvbigpXG5cdFx0XHRAcmVzZXQoKVxuXG5cdFx0YXBwLmFjdGlvbkJ1dHRvbiA9IEBcblxuXG5cdHNob3dUb3VjaGVkOiAtPiBcblx0XHRyaXBwbGUoQCwgZXZlbnQucG9pbnQsIEBpY29uTGF5ZXIpXG5cdFx0QGFuaW1hdGUge3NoYWRvd1k6IDMsIHNoYWRvd1NwcmVhZDogMX1cblxuXHRyZXNldDogLT5cblx0XHRAYW5pbWF0ZSBcblx0XHRcdHNoYWRvd1k6IDJcblx0XHRcdHNoYWRvd1NwcmVhZDogMFxuXG5cblxuXG5cblxuXG5cblxuIyBcdCAuODg4ODguICAgICAgICAgICBvbyAgICAgICBkUCBkUCAgICAgICAgb28gICAgICAgICAgICBkUFxuIyBcdGQ4JyAgIGA4OCAgICAgICAgICAgICAgICAgICA4OCA4OCAgICAgICAgICAgICAgICAgICAgICA4OFxuIyBcdDg4ICAgICAgICA4OGQ4ODhiLiBkUCAuZDg4OGI4OCA4OCAgICAgICAgZFAgLmQ4ODg4Yi4gZDg4ODhQXG4jIFx0ODggICBZUDg4IDg4JyAgYDg4IDg4IDg4JyAgYDg4IDg4ICAgICAgICA4OCBZOG9vb29vLiAgIDg4XG4jIFx0WTguICAgLjg4IDg4ICAgICAgIDg4IDg4LiAgLjg4IDg4ICAgICAgICA4OCAgICAgICA4OCAgIDg4XG4jIFx0IGA4ODg4OCcgIGRQICAgICAgIGRQIGA4ODg4OFA4IDg4ODg4ODg4UCBkUCBgODg4ODhQJyAgIGRQXG5cbmV4cG9ydHMuR3JpZExpc3QgPSBHcmlkTGlzdCA9IGNsYXNzIEdyaWRMaXN0IGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cdFx0XG5cdFx0QF9jb2x1bW5zID0gb3B0aW9ucy5jb2x1bW5zID8gMlxuXHRcdFxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdG5hbWU6ICcuJ1xuXHRcdFx0d2lkdGg6IFNjcmVlbi53aWR0aFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XG5cdFx0QHRpbGVzID0gW11cblx0XHRAdGlsZVdpZHRoID0gKEB3aWR0aCAtIDI0KSAvIEBfY29sdW1uc1xuXHRcdEB0aWxlSGVpZ2h0ID0gb3B0aW9ucy50aWxlSGVpZ2h0ID8gU2NyZWVuLndpZHRoIC8gQF9jb2x1bW5zXG5cdFx0XG5cdGFkZFRpbGU6ICh0aWxlKSAtPlxuXHRcdHRpbGUuaSA9IEB0aWxlcy5sZW5ndGhcblx0XHRAdGlsZXMucHVzaCh0aWxlKVxuXHRcdFxuXHRcdHRpbGUueCA9IDggKyAoQHRpbGVXaWR0aCArIDgpICogKHRpbGUuaSAlIEBfY29sdW1ucylcblx0XHR0aWxlLnkgPSA4ICsgKEB0aWxlSGVpZ2h0ICsgOCkgKiBNYXRoLmZsb29yKHRpbGUuaSAvIEBfY29sdW1ucylcblxuXHRcdEBoZWlnaHQgPSBfLmxhc3QoQHRpbGVzKS5tYXhZXG5cblx0XHRpZiBAcGFyZW50Py5wYXJlbnQ/LmNvbnRlbnQ/IHRoZW4gQHBhcmVudC5wYXJlbnQudXBkYXRlQ29udGVudCgpXG5cdFxuXHRyZW1vdmVUaWxlOiAodGlsZSkgLT5cblx0XHRfLnB1bGwoQHRpbGVzLCB0aWxlKVxuXHRcdHRpbGUuZGVzdHJveSgpXG5cdFx0QHJlcG9zaXRpb25UaWxlcygpXG5cblx0cmVwb3NpdGlvblRpbGVzOiAtPlxuXHRcdGZvciB0aWxlLCBpIGluIEB0aWxlc1xuXHRcdFx0dGlsZS5pID0gaVxuXHRcdFx0dGlsZS5hbmltYXRlXG5cdFx0XHRcdHg6IDggKyAoQHRpbGVXaWR0aCArIDgpICogKHRpbGUuaSAlIEBfY29sdW1ucylcblx0XHRcdFx0eTogOCArIChAdGlsZUhlaWdodCArIDgpICogTWF0aC5mbG9vcih0aWxlLmkgLyBAX2NvbHVtbnMpXG5cdFx0QGhlaWdodCA9IF8ubGFzdChAdGlsZXMpLm1heFlcblxuXHRcdGlmIEBwYXJlbnQ/LnBhcmVudD8uY29udGVudD8gdGhlbiBAcGFyZW50LnBhcmVudC51cGRhdGVDb250ZW50KClcblxuXG5cblxuXG5cblxuXG5cblxuIyBcdGQ4ODg4ODhQIG9vIGRQXG4jIFx0ICAgODggICAgICAgODhcbiMgXHQgICA4OCAgICBkUCA4OCAuZDg4ODhiLlxuIyBcdCAgIDg4ICAgIDg4IDg4IDg4b29vb2Q4XG4jIFx0ICAgODggICAgODggODggODguICAuLi5cbiMgXHQgICBkUCAgICBkUCBkUCBgODg4ODhQJ1xuXG5cbmV4cG9ydHMuVGlsZSA9IFRpbGUgPSBjbGFzcyBUaWxlIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cdFx0XG5cdFx0QF9oZWFkZXIgPSBvcHRpb25zLmhlYWRlciA/IGZhbHNlXG5cdFx0QF9mb290ZXIgPSBvcHRpb25zLmZvb3RlciA/IGZhbHNlXG5cdFx0QF9hY3Rpb24gPSBvcHRpb25zLmFjdGlvbiA/IC0+IG51bGxcblx0XHRAX2hlYWRlckFjdGlvbiA9IG9wdGlvbnMuaGVhZGVyQWN0aW9uID8gLT4gbnVsbFxuXHRcdEBfZm9vdGVyQWN0aW9uID0gb3B0aW9ucy5mb290ZXJBY3Rpb24gPyAtPiBudWxsXG5cdFx0XG5cdFx0aWYgQF9oZWFkZXIgYW5kIEBfZm9vdGVyIHRoZW4gdGhyb3cgJ1RpbGUgY2Fubm90IGhhdmUgYm90aCBhIGhlYWRlciBhbmQgYSBmb290ZXIuJ1xuXHRcdFxuXHRcdEBfaWNvbiA9IG9wdGlvbnMuaWNvblxuXHRcdEBncmlkTGlzdCA9IG9wdGlvbnMuZ3JpZExpc3QgPyB0aHJvdyAnVGlsZSBuZWVkcyBhIGdyaWQgcHJvcGVydHkuJ1xuXHRcdFxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBAZ3JpZExpc3Rcblx0XHRcdHdpZHRoOiBAZ3JpZExpc3QudGlsZVdpZHRoXG5cdFx0XHRoZWlnaHQ6IEBncmlkTGlzdC50aWxlSGVpZ2h0XG5cdFx0XHRhbmltYXRpb25PcHRpb25zOiB7dGltZTogLjN9XG5cdFx0XG5cdFx0QG9uVG91Y2hTdGFydCAoZXZlbnQpIC0+IFxuXHRcdFx0aWYgQGdyaWRMaXN0LnBhcmVudD8ucGFyZW50Py5jb250ZW50IGFuZCBAZ3JpZExpc3QucGFyZW50Py5wYXJlbnQ/LmlzTW92aW5nIGlzIGZhbHNlXG5cdFx0XHRcdHJpcHBsZShALCBldmVudC5wb2ludCwgQGhlYWRlciwgb3B0aW9ucy5yaXBwbGVDb2xvciA/ICdyZ2JhKDAsMCwwLC4xKScpXG5cdFx0XG5cdFx0QG9uVGFwIEBfYWN0aW9uXG5cdFx0QG9uVGFwIChldmVudCkgLT4gZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcblxuXHRcdGlmIEBfaGVhZGVyIG9yIEBfZm9vdGVyXG5cdFx0XHRAaGVhZGVyID0gbmV3IExheWVyXG5cdFx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBAXG5cdFx0XHRcdHk6IGlmIEBfZm9vdGVyIHRoZW4gQWxpZ24uYm90dG9tKClcblx0XHRcdFx0d2lkdGg6IEB3aWR0aFxuXHRcdFx0XHRoZWlnaHQ6IGlmIG9wdGlvbnMuc3VwcG9ydCB0aGVuIDY4IGVsc2UgNDhcblx0XHRcdFx0YmFja2dyb3VuZENvbG9yOiBvcHRpb25zLmJhY2tncm91bmRDb2xvciA/ICdyZ2JhKDAsMCwwLC41KSdcblx0XHRcdFxuXHRcdFx0QGhlYWRlci5vblRvdWNoU3RhcnQgKGV2ZW50KSAtPiByaXBwbGUoQCwgZXZlbnQucG9pbnQsIEB0aXRsZSlcblx0XHRcdFxuXHRcdFx0aWYgQF9mb290ZXIgdGhlbiBAaGVhZGVyLm9uVGFwIEBfZm9vdGVyQWN0aW9uXG5cdFx0XHRlbHNlIEBoZWFkZXIub25UYXAgQF9oZWFkZXJBY3Rpb25cblxuXHRcdFx0QGhlYWRlci5vblRhcCAoZXZlbnQpIC0+IGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXG5cblx0XHRcdGlmIG9wdGlvbnMudGl0bGVcblx0XHRcdFx0QGhlYWRlci50aXRsZSA9IG5ldyB0eXBlLlJlZ3VsYXJcblx0XHRcdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQGhlYWRlclxuXHRcdFx0XHRcdHg6IDgsIHk6IGlmIG9wdGlvbnMuc3VwcG9ydCB0aGVuIDEyIGVsc2UgQWxpZ24uY2VudGVyKClcblx0XHRcdFx0XHRjb2xvcjogQGNvbG9yXG5cdFx0XHRcdFx0dGV4dDogb3B0aW9ucy50aXRsZSA/ICdUd28gTGluZSdcblx0XHRcdFxuXHRcdFx0XHRpZiBvcHRpb25zLnN1cHBvcnRcblx0XHRcdFx0XHRAaGVhZGVyLnN1cHBvcnQgPSBuZXcgVGV4dExheWVyXG5cdFx0XHRcdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQGhlYWRlclxuXHRcdFx0XHRcdFx0eDogOCwgeTogMzVcblx0XHRcdFx0XHRcdGZvbnRTaXplOiAxMlxuXHRcdFx0XHRcdFx0Zm9udEZhbWlseTogJ1JvYm90bydcblx0XHRcdFx0XHRcdGNvbG9yOiBAY29sb3Jcblx0XHRcdFx0XHRcdHRleHQ6IG9wdGlvbnMuc3VwcG9ydCA/ICdTdXBwb3J0IHRleHQnXG5cdFx0XHRcblx0XHRcdGlmIG9wdGlvbnMuaWNvblxuXHRcdFx0XHRAaGVhZGVyLmljb24gPSBuZXcgSWNvblxuXHRcdFx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBAaGVhZGVyXG5cdFx0XHRcdFx0eDogQWxpZ24ucmlnaHQoLTEyKSwgeTogaWYgb3B0aW9ucy5zdXBwb3J0IHRoZW4gMjAgZWxzZSBBbGlnbi5jZW50ZXIoKVxuXHRcdFx0XHRcdGljb246IG9wdGlvbnMuaWNvblxuXHRcdFx0XHRcdGNvbG9yOiBAY29sb3JcblxuXHRcdEBpID0gdW5kZWZpbmVkXG5cdFx0QGdyaWRMaXN0LmFkZFRpbGUoQClcblxuXG5cblxuIyBcdC5kODg4ODhiICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkUCAgICAgICBkUFxuIyBcdDg4LiAgICBcIicgICAgICAgICAgICAgICAgICAgICAgICAgICAgODggICAgICAgODhcbiMgXHRgWTg4ODg4Yi4gODhkODg4Yi4gLmQ4ODg4Yi4gLmQ4ODg4Yi4gODggIC5kUCAgODhkODg4Yi4gLmQ4ODg4Yi4gODhkODg4Yi5cbiMgXHQgICAgICBgOGIgODgnICBgODggODgnICBgODggODgnICBgXCJcIiA4ODg4OFwiICAgODgnICBgODggODgnICBgODggODgnICBgODhcbiMgXHRkOCcgICAuOFAgODggICAgODggODguICAuODggODguICAuLi4gODggIGA4Yi4gODguICAuODggODguICAuODggODhcbiMgXHQgWTg4ODg4UCAgZFAgICAgZFAgYDg4ODg4UDggYDg4ODg4UCcgZFAgICBgWVAgODhZODg4OCcgYDg4ODg4UDggZFBcblxuZXhwb3J0cy5TbmFja2JhciA9IFNuYWNrYmFyID0gY2xhc3MgU25hY2tiYXIgZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblxuXHRcdEBfdGl0bGUgPSBvcHRpb25zLnRpdGxlID8gJ1NuYWNrYmFyJ1xuXHRcdEBfdGltZW91dCA9IG9wdGlvbnMudGltZW91dCA/IDRcblx0XHRAX2FjdGlvbiA9IG9wdGlvbnMuYWN0aW9uXG5cblx0XHRzdXBlciBfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRuYW1lOiAnLidcblx0XHRcdHdpZHRoOiBhcHAud2lkdGhcblx0XHRcdGNsaXA6IHRydWVcblx0XHRcdGJhY2tncm91bmRDb2xvcjogdGhlbWUuc25hY2tiYXIuYmFja2dyb3VuZENvbG9yXG5cdFx0XHRhbmltYXRpb25PcHRpb25zOiB7dGltZTogLjI1fVxuXG5cdFx0dGl0bGVXaWR0aCA9IEB3aWR0aCAtIDQ4XG5cblx0XHRpZiBAX2FjdGlvbj9cblx0XHRcdEBhY3Rpb24gPSBuZXcgQnV0dG9uXG5cdFx0XHRcdHBhcmVudDogQFxuXHRcdFx0XHR4OiBBbGlnbi5yaWdodCgtOCksIHk6IDRcblx0XHRcdFx0Y29sb3I6IEBfYWN0aW9uLmNvbG9yID8gdGhlbWUuY29sb3JzLnByaW1hcnkubGlnaHRcblx0XHRcdFx0dGV4dDogQF9hY3Rpb24udGl0bGUudG9VcHBlckNhc2UoKVxuXHRcdFx0XHRhY3Rpb246IEBfYWN0aW9uLmFjdGlvblxuXG5cdFx0XHRAYWN0aW9uLm9uVGFwIEBoaWRlXG5cdFx0XHR0aXRsZVdpZHRoID0gQGFjdGlvbi54IC0gOCAtIDI0XG5cblx0XHRAdGV4dExhYmVsID0gbmV3IHR5cGUuQm9keTFcblx0XHRcdG5hbWU6ICdUaXRsZScsIHBhcmVudDogQFxuXHRcdFx0eDogMjQsIHk6IDE0XG5cdFx0XHR3aWR0aDogdGl0bGVXaWR0aFxuXHRcdFx0dGV4dDogQF90aXRsZVxuXHRcdFx0Y29sb3I6IHRoZW1lLnNuYWNrYmFyLmNvbG9yXG5cblx0XHRAaGVpZ2h0ID0gQHRleHRMYWJlbC5tYXhZICsgMTRcblx0XHRAYWN0aW9uPy55ID0gQWxpZ24uY2VudGVyXG5cdFx0QHkgPSBpZiBhcHAuYm90dG9tTmF2PyB0aGVuIEFsaWduLmJvdHRvbSgtYXBwLmJvdHRvbU5hdi5oZWlnaHQgKyBAaGVpZ2h0KSA/IEFsaWduLmJvdHRvbShAaGVpZ2h0KVxuXG5cdFx0VXRpbHMuZGVsYXkgQF90aW1lb3V0LCBAaGlkZVxuXG5cdFx0QHNob3coKVxuXG5cdHNob3c6ID0+XG5cdFx0aWYgYXBwLnNuYWNrYmFyPyBcblx0XHRcdGFwcC5zbmFja2Jhci5oaWRlKClcblx0XHRcdFV0aWxzLmRlbGF5IDEsIEBzaG93XG5cdFx0XHRyZXR1cm5cblx0XHRlbHNlXG5cdFx0XHRhcHAuc25hY2tiYXIgPSBAXG5cdFx0XHRhcHAuYWN0aW9uQnV0dG9uPy5hbmltYXRlIHt5OiBhcHAuYWN0aW9uQnV0dG9uLnkgLSBAaGVpZ2h0LCBvcHRpb25zOiBAYW5pbWF0aW9uT3B0aW9uc31cblx0XHRcdEBhbmltYXRlIHt5OiBAeSAtIEBoZWlnaHR9XG5cblx0aGlkZTogPT4gXG5cdFx0YXBwLnNuYWNrYmFyID0gdW5kZWZpbmVkXG5cdFx0YXBwLmFjdGlvbkJ1dHRvbj8uYW5pbWF0ZSB7eTogYXBwLmFjdGlvbkJ1dHRvbi55ICsgQGhlaWdodCwgb3B0aW9uczogQGFuaW1hdGlvbk9wdGlvbnN9XG5cdFx0QGFuaW1hdGUge2hlaWdodDogMCwgeTogQHkgKyBAaGVpZ2h0fVxuXHRcdFV0aWxzLmRlbGF5IC41LCA9PiBAZGVzdHJveSgpXG5cblxuXG5cblxuIyBcdDg4ODg4OGJhICAgICAgICAgICAgIGRQICAgb28gLjg4ODhiIG9vICAgICAgICAgICAgICAgICAgICAgZFAgICBvb1xuIyBcdDg4ICAgIGA4YiAgICAgICAgICAgIDg4ICAgICAgODggICBcIiAgICAgICAgICAgICAgICAgICAgICAgIDg4XG4jIFx0ODggICAgIDg4IC5kODg4OGIuIGQ4ODg4UCBkUCA4OGFhYSAgZFAgLmQ4ODg4Yi4gLmQ4ODg4Yi4gZDg4ODhQIGRQIC5kODg4OGIuIDg4ZDg4OGIuXG4jIFx0ODggICAgIDg4IDg4JyAgYDg4ICAgODggICA4OCA4OCAgICAgODggODgnICBgXCJcIiA4OCcgIGA4OCAgIDg4ICAgODggODgnICBgODggODgnICBgODhcbiMgXHQ4OCAgICAgODggODguICAuODggICA4OCAgIDg4IDg4ICAgICA4OCA4OC4gIC4uLiA4OC4gIC44OCAgIDg4ICAgODggODguICAuODggODggICAgODhcbiMgXHRkUCAgICAgZFAgYDg4ODg4UCcgICBkUCAgIGRQIGRQICAgICBkUCBgODg4ODhQJyBgODg4ODhQOCAgIGRQICAgZFAgYDg4ODg4UCcgZFAgICAgZFBcblxuXG5cbmV4cG9ydHMuTm90aWZpY2F0aW9uID0gTm90aWZpY2F0aW9uID0gY2xhc3MgTm90aWZpY2F0aW9uIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cdFx0XG5cdFx0QF90aXRsZSA9IG9wdGlvbnMudGl0bGUgPyAnTm90aWZpY2F0aW9uJ1xuXHRcdEBfYm9keSA9IG9wdGlvbnMuYm9keSA/ICdUaGlzIGlzIGEgbm90aWZpY2F0aW9uLidcblx0XHRAX2ljb24gPSBvcHRpb25zLmljb24gPyB1bmRlZmluZWRcblx0XHRAX2ljb25Db2xvciA9IG9wdGlvbnMuaWNvbkNvbG9yID8gdGhlbWUudGV4dC5zZWNvbmRhcnlcblx0XHRAX2ljb25CYWNrZ3JvdW5kQ29sb3IgPSBvcHRpb25zLmljb25CYWNrZ3JvdW5kQ29sb3IgPyB0aGVtZS5zZWNvbmRhcnlcblx0XHRAX3RpbWUgPSBvcHRpb25zLnRpbWUgPyBuZXcgRGF0ZSgpXG5cdFx0I1RPRE86IHJlcGxhY2UgYWN0aW9uMSAvIGFjdGlvbjIgd2l0aCBAYWN0aW9ucyAoYXJyYXkpXG5cdFx0QF9hY3Rpb24xID0gb3B0aW9ucy5hY3Rpb24xXG5cdFx0QF9hY3Rpb24yID0gb3B0aW9ucy5hY3Rpb24yXG5cdFx0QF90aW1lb3V0ID0gb3B0aW9ucy50aW1lb3V0ID8gNVxuXG5cdFx0IyBhY3Rpb25zIHNob3VsZCBiZSB7dGl0bGU6ICdhcmNoaXZlJywgaWNvbjogJ2FyY2hpdmUnfVxuXHRcdFxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdG5hbWU6IG9wdGlvbnMubmFtZSA/ICcuJywgcGFyZW50OiBhcHBcblx0XHRcdHdpZHRoOiAzNDQsIGJvcmRlclJhZGl1czogMlxuXHRcdFx0eDogQWxpZ24uY2VudGVyLCB5OiBpZiBhcHAubm90aWZpY2F0aW9ucy5sZW5ndGggPiAwIHRoZW4gXy5sYXN0KGFwcC5ub3RpZmljYXRpb25zKS5tYXhZICsgOCBlbHNlIGFwcC5oZWFkZXIubWF4WSArIDRcblx0XHRcdGJhY2tncm91bmRDb2xvcjogdGhlbWUuZGlhbG9nLmJhY2tncm91bmRDb2xvclxuXHRcdFx0c2hhZG93WDogMCwgc2hhZG93WTogMiwgc2hhZG93Qmx1cjogM1xuXHRcdFx0b3BhY2l0eTogMCwgc2hhZG93Q29sb3I6ICdyZ2JhKDAsMCwwLC4zKSdcblx0XHRcdGFuaW1hdGlvbk9wdGlvbnM6IHt0aW1lOiAuMjV9XG5cblx0XHRhcHAubm90aWZpY2F0aW9ucy5wdXNoKEApXG5cblx0XHRAaWNvbkxheWVyID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiAnSWNvbiBDb250YWluZXInXG5cdFx0XHRwYXJlbnQ6IEBcblx0XHRcdHg6IDEyLCB5OiAxMlxuXHRcdFx0aGVpZ2h0OiA0MCwgd2lkdGg6IDQwLCBib3JkZXJSYWRpdXM6IDIwXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IEBfaWNvbkJhY2tncm91bmRDb2xvclxuXG5cdFx0aWYgQF9pY29uXG5cdFx0XHRAaWNvbiA9IG5ldyBJY29uXG5cdFx0XHRcdG5hbWU6ICdJY29uJ1xuXHRcdFx0XHRwYXJlbnQ6IEBpY29uTGF5ZXJcblx0XHRcdFx0eDogQWxpZ24uY2VudGVyLCB5OiBBbGlnbi5jZW50ZXJcblx0XHRcdFx0Y29sb3I6IEBfaWNvbkNvbG9yXG5cdFx0XHRcdGljb246IEBfaWNvblxuXG5cdFx0QHRpdGxlID0gbmV3IHR5cGUuU3ViaGVhZFxuXHRcdFx0bmFtZTogJ1RpdGxlJ1xuXHRcdFx0cGFyZW50OiBAIFxuXHRcdFx0eDogNjQsIHk6IDhcblx0XHRcdHdpZHRoOiBAd2lkdGggLSA3MlxuXHRcdFx0Y29sb3I6ICdyZ2JhKDAsMCwwLC44NyknXG5cdFx0XHR0ZXh0OiBAX3RpdGxlXG5cblx0XHRAYm9keSA9IG5ldyB0eXBlLkJvZHkxXG5cdFx0XHRuYW1lOiAnQm9keSdcblx0XHRcdHBhcmVudDogQFxuXHRcdFx0eDogNjQsIHk6IEB0aXRsZS5tYXhZXG5cdFx0XHR3aWR0aDogQHdpZHRoIC0gNzJcblx0XHRcdHRleHQ6IEBfYm9keVxuXG5cdFx0QGRhdGUgPSBuZXcgdHlwZS5DYXB0aW9uXG5cdFx0XHRuYW1lOiAnRGF0ZSdcblx0XHRcdHBhcmVudDogQFxuXHRcdFx0eDogQWxpZ24ucmlnaHQoLTkpLCB5OiAxNVxuXHRcdFx0dGV4dDogQF90aW1lLnRvTG9jYWxlVGltZVN0cmluZyhbXSwgaG91cjogXCJudW1lcmljXCIsIG1pbnV0ZTogXCIyLWRpZ2l0XCIpXG5cblx0XHRAaGVpZ2h0ID0gXy5jbGFtcChAYm9keS5tYXhZICsgMTMsIDY0LCBJbmZpbml0eSlcblxuXHRcdGlmIEBfYWN0aW9uMT9cblxuXHRcdFx0ZGl2aWRlciA9IG5ldyBEaXZpZGVyXG5cdFx0XHRcdG5hbWU6ICdEaXZpZGVyJ1xuXHRcdFx0XHRwYXJlbnQ6IEBcblx0XHRcdFx0eDogNjQsIHk6IEBib2R5Lm1heFkgKyAxMVxuXHRcdFx0XHR3aWR0aDogQHdpZHRoIC0gNjRcblxuXHRcdFx0aWYgQF9hY3Rpb24xP1xuXHRcdFx0XHRAYWN0aW9uMSA9IG5ldyBMYXllclxuXHRcdFx0XHRcdG5hbWU6ICdBY3Rpb24gMScsIHBhcmVudDogQFxuXHRcdFx0XHRcdHg6IDY0LCB5OiBkaXZpZGVyLm1heFkgKyAxMVxuXHRcdFx0XHRcdHdpZHRoOiA4MCwgaGVpZ2h0OiAyNCwgYmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHRcdFxuXHRcdFx0XHRAYWN0aW9uMS5pY29uID0gbmV3IEljb25cblx0XHRcdFx0XHRuYW1lOiAnSWNvbicsIHBhcmVudDogQGFjdGlvbjFcblx0XHRcdFx0XHRpY29uOiBAX2FjdGlvbjEuaWNvblxuXHRcdFx0XHRcdHdpZHRoOiAxOCwgaGVpZ2h0OiAxOFxuXHRcdFx0XHRcdGNvbG9yOiAncmdiYSgwLDAsMCwuNTQpJ1xuXHRcdFx0XHRcblx0XHRcdFx0QGFjdGlvbjEubGFiZWwgPSBuZXcgdHlwZS5DYXB0aW9uXG5cdFx0XHRcdFx0bmFtZTogJ0xhYmVsJywgcGFyZW50OiBAYWN0aW9uMVxuXHRcdFx0XHRcdHg6IEBhY3Rpb24xLmljb24ubWF4WCArIDhcblx0XHRcdFx0XHRmb250U2l6ZTogMTNcblx0XHRcdFx0XHR0ZXh0OiBAX2FjdGlvbjEudGl0bGUudG9VcHBlckNhc2UoKVxuXG5cdFx0XHRcdEBhY3Rpb24xLndpZHRoID0gQGFjdGlvbjEubGFiZWwubWF4WFxuXG5cdFx0XHRcdCNAYWN0aW9uMS5vblRvdWNoU3RhcnQgKGV2ZW50KSAtPiByaXBwbGUoQCwgZXZlbnQucG9pbnQsIEBpY29uLCBuZXcgQ29sb3IodGhlbWUuc2Vjb25kYXJ5KS5hbHBoYSguMykpXG5cdFx0XHRcdEBhY3Rpb24xLm9uVGFwIEBjbG9zZVxuXHRcdFx0XHRpZiBAX2FjdGlvbjEuYWN0aW9uIHRoZW4gQGFjdGlvbjEub25UYXAgPT4gVXRpbHMuZGVsYXkgLjI1LCBfLmJpbmQoQF9hY3Rpb24xLmFjdGlvbiwgQClcblx0XHRcdFx0XG5cblx0XHRcdFx0aWYgQF9hY3Rpb24yP1xuXHRcdFx0XHRcdEBhY3Rpb24yID0gbmV3IExheWVyXG5cdFx0XHRcdFx0XHRuYW1lOiAnQWN0aW9uIDInLCBwYXJlbnQ6IEBcblx0XHRcdFx0XHRcdHg6IEBhY3Rpb24xLm1heFggKyA0NSwgeTogZGl2aWRlci5tYXhZICsgMTFcblx0XHRcdFx0XHRcdHdpZHRoOiA4MCwgaGVpZ2h0OiAyNCwgYmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0QGFjdGlvbjIuaWNvbiA9IG5ldyBJY29uXG5cdFx0XHRcdFx0XHRuYW1lOiAnSWNvbicsIHBhcmVudDogQGFjdGlvbjJcblx0XHRcdFx0XHRcdGljb246IEBfYWN0aW9uMi5pY29uXG5cdFx0XHRcdFx0XHR3aWR0aDogMTgsIGhlaWdodDogMThcblx0XHRcdFx0XHRcdGNvbG9yOiAncmdiYSgwLDAsMCwuNTQpJ1xuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdEBhY3Rpb24yLmxhYmVsID0gbmV3IHR5cGUuQ2FwdGlvblxuXHRcdFx0XHRcdFx0bmFtZTogJ0xhYmVsJywgcGFyZW50OiBAYWN0aW9uMlxuXHRcdFx0XHRcdFx0eDogQGFjdGlvbjIuaWNvbi5tYXhYICsgOFxuXHRcdFx0XHRcdFx0Zm9udFNpemU6IDEzXG5cdFx0XHRcdFx0XHR0ZXh0OiBAX2FjdGlvbjIudGl0bGUudG9VcHBlckNhc2UoKVxuXG5cdFx0XHRcdFx0QGFjdGlvbjIud2lkdGggPSBAYWN0aW9uMi5sYWJlbC5tYXhYXG5cblx0XHRcdFx0XHQjQGFjdGlvbjIub25Ub3VjaFN0YXJ0IChldmVudCkgLT4gcmlwcGxlKEAsIGV2ZW50LnBvaW50LCBAaWNvbiwgbmV3IENvbG9yKHRoZW1lLnNlY29uZGFyeSkuYWxwaGEoLjMpKVxuXHRcdFx0XHRcdEBhY3Rpb24yLm9uVGFwIEBjbG9zZVxuXHRcdFx0XHRcdGlmIEBfYWN0aW9uMi5hY3Rpb24gdGhlbiBAYWN0aW9uMi5vblRhcCA9PiBVdGlscy5kZWxheSAuMjUsIF8uYmluZChAX2FjdGlvbjIuYWN0aW9uLCBAKVxuXHRcdFx0XHRcdFxuXG5cdFx0XHRcdEBoZWlnaHQgPSBkaXZpZGVyLm1heFkgKyA0N1xuXG5cdFx0QG9wZW4oKVxuXG5cdFx0QG9uU3dpcGVMZWZ0RW5kID0+IEBjbG9zZSgnbGVmdCcpXG5cdFx0QG9uU3dpcGVSaWdodEVuZCA9PiBAY2xvc2UoJ3JpZ2h0Jylcblx0XHRVdGlscy5kZWxheSBAX3RpbWVvdXQsID0+IGlmIG5vdCBAY2xvc2VkIHRoZW4gQGNsb3NlKCdyaWdodCcpXG5cblx0b3BlbjogPT4gXG5cdFx0QGFuaW1hdGUge29wYWNpdHk6IDF9XG5cblx0Y2xvc2U6IChkaXJlY3Rpb24pID0+XG5cdFx0Xy5wdWxsKGFwcC5ub3RpZmljYXRpb25zLCBAKVxuXG5cdFx0QGFuaW1hdGVcblx0XHRcdHg6IGlmIGRpcmVjdGlvbiBpcyAnbGVmdCcgdGhlbiAtU2NyZWVuLndpZHRoIGVsc2UgU2NyZWVuLndpZHRoXG5cdFx0XHRvcGFjaXR5OiAwXG5cblx0XHRmb3Igbm90aWZpY2F0aW9uIGluIGFwcC5ub3RpZmljYXRpb25zXG5cdFx0XHRpZiBub3RpZmljYXRpb24ueSA+IEBtYXhZXG5cdFx0XHRcdG5vdGlmaWNhdGlvbi5hbmltYXRlIHt5OiBub3RpZmljYXRpb24ueSAtIEBoZWlnaHR9XG5cdFx0XG5cdFx0QGNsb3NlZCA9IHRydWVcblxuXHRcdFV0aWxzLmRlbGF5IC41LCA9PiBAZGVzdHJveSgpXG5cblxuXG5cbiMgXHQ4ODg4ODhiYSAgb28gICAgICAgICAgb28gICAgICAgZFBcbiMgXHQ4OCAgICBgOGIgICAgICAgICAgICAgICAgICAgICAgODhcbiMgXHQ4OCAgICAgODggZFAgZFAgICAuZFAgZFAgLmQ4ODhiODggLmQ4ODg4Yi4gODhkODg4Yi5cbiMgXHQ4OCAgICAgODggODggODggICBkOCcgODggODgnICBgODggODhvb29vZDggODgnICBgODhcbiMgXHQ4OCAgICAuOFAgODggODggLjg4JyAgODggODguICAuODggODguICAuLi4gODhcbiMgXHQ4ODg4ODg4UCAgZFAgODg4OFAnICAgZFAgYDg4ODg4UDggYDg4ODg4UCcgZFBcblxuXG5leHBvcnRzLkRpdmlkZXIgPSBEaXZpZGVyID0gY2xhc3MgRGl2aWRlciBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdG5hbWU6ICcuJ1xuXHRcdFx0d2lkdGg6IDIwMCwgaGVpZ2h0OiAxLFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiB0aGVtZS5kaXZpZGVyLmJhY2tncm91bmRDb2xvclxuXG5cblxuXG5cblxuIyBcdC5kODg4ODhiICAgICAgICAgICAgIG9vICAgZFAgICAgICAgICAgICBkUFxuIyBcdDg4LiAgICBcIicgICAgICAgICAgICAgICAgIDg4ICAgICAgICAgICAgODhcbiMgXHRgWTg4ODg4Yi4gZFAgIGRQICBkUCBkUCBkODg4OFAgLmQ4ODg4Yi4gODhkODg4Yi5cbiMgXHQgICAgICBgOGIgODggIDg4ICA4OCA4OCAgIDg4ICAgODgnICBgXCJcIiA4OCcgIGA4OFxuIyBcdGQ4JyAgIC44UCA4OC44OGIuODgnIDg4ICAgODggICA4OC4gIC4uLiA4OCAgICA4OFxuIyBcdCBZODg4ODhQICA4ODg4UCBZOFAgIGRQICAgZFAgICBgODg4ODhQJyBkUCAgICBkUFxuXG5cbmV4cG9ydHMuU3dpdGNoID0gU3dpdGNoID0gY2xhc3MgU3dpdGNoIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cblx0XHRAX2lzT24gPSB1bmRlZmluZWRcblxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdG5hbWU6ICcuJ1xuXHRcdFx0d2lkdGg6IDM0LCBoZWlnaHQ6IDE0LCBib3JkZXJSYWRpdXM6IDdcblx0XHRcdGJhY2tncm91bmRDb2xvcjogJ3JnYmEoMzQsIDMxLCAzMSwgLjI2KSdcblx0XHRcdGFuaW1hdGlvbk9wdGlvbnM6IHt0aW1lOiAuMTV9XG5cblx0XHRAa25vYiA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEBcblx0XHRcdHg6IDAsIHk6IEFsaWduLmNlbnRlclxuXHRcdFx0d2lkdGg6IDIwLCBoZWlnaHQ6IDIwLCBib3JkZXJSYWRpdXM6IDEwXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6ICdGMUYxRjEnXG5cdFx0XHRzaGFkb3dZOiAyLCBzaGFkb3dCbHVyOiAzXG5cdFx0XHRhbmltYXRpb25PcHRpb25zOiB7dGltZTogLjE1fVxuXG5cdFx0QGlzT24gPSBvcHRpb25zLmlzT24gPyBmYWxzZVxuXHRcdEBvblRhcCAtPiBAaXNPbiA9ICFAaXNPblxuXG5cdEBkZWZpbmUgXCJpc09uXCIsXG5cdFx0Z2V0OiAtPiByZXR1cm4gQF9pc09uXG5cdFx0c2V0OiAoYm9vbCkgLT5cblx0XHRcdHJldHVybiBpZiBib29sIGlzIEBfaXNPblxuXHRcdFx0XG5cdFx0XHRAX2lzT24gPSBib29sXG5cdFx0XHRAZW1pdChcImNoYW5nZTppc09uXCIsIEBfaXNPbiwgQClcblx0XHRcdEB1cGRhdGUoKVxuXG5cdHVwZGF0ZTogLT5cblx0XHRpZiBAX2lzT25cblx0XHRcdEBrbm9iLmFuaW1hdGUge3g6IEFsaWduLnJpZ2h0KCksIGJhY2tncm91bmRDb2xvcjogdGhlbWUuY29sb3JzLnByaW1hcnkubWFpbn1cblx0XHRcdEBhbmltYXRlIHtiYWNrZ3JvdW5kQ29sb3I6IHRoZW1lLmNvbG9ycy5wcmltYXJ5LmxpZ2h0fVxuXHRcdGVsc2UgXG5cdFx0XHRAa25vYi5hbmltYXRlIHt4OiAwLCBiYWNrZ3JvdW5kQ29sb3I6ICdGMUYxRjEnfVxuXHRcdFx0QGFuaW1hdGUge2JhY2tncm91bmRDb2xvcjogJ3JnYmEoMzQsIDMxLCAzMSwgLjI2KSd9XG5cblxuXG5cblxuIyBcdCBhODg4ODhiLiBkUCAgICAgICAgICAgICAgICAgICAgICAgICBkUCAgICAgICBkUFxuIyBcdGQ4JyAgIGA4OCA4OCAgICAgICAgICAgICAgICAgICAgICAgICA4OCAgICAgICA4OFxuIyBcdDg4ICAgICAgICA4OGQ4ODhiLiAuZDg4ODhiLiAuZDg4ODhiLiA4OCAgLmRQICA4OGQ4ODhiLiAuZDg4ODhiLiBkUC4gIC5kUFxuIyBcdDg4ICAgICAgICA4OCcgIGA4OCA4OG9vb29kOCA4OCcgIGBcIlwiIDg4ODg4XCIgICA4OCcgIGA4OCA4OCcgIGA4OCAgYDhiZDgnXG4jIFx0WTguICAgLjg4IDg4ICAgIDg4IDg4LiAgLi4uIDg4LiAgLi4uIDg4ICBgOGIuIDg4LiAgLjg4IDg4LiAgLjg4ICAuZDg4Yi5cbiMgXHQgWTg4ODg4UCcgZFAgICAgZFAgYDg4ODg4UCcgYDg4ODg4UCcgZFAgICBgWVAgODhZODg4OCcgYDg4ODg4UCcgZFAnICBgZFBcblxuXG5cbmV4cG9ydHMuQ2hlY2tib3ggPSBDaGVja0JveCA9IGNsYXNzIENoZWNrYm94IGV4dGVuZHMgSWNvblxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblxuXHRcdEBfaXNPbiA9IHVuZGVmaW5lZFxuXG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0bmFtZTogJy4nXG5cdFx0XHRhbmltYXRpb25PcHRpb25zOiB7dGltZTogLjE1fVxuXHRcdFx0aWNvbjogJ2NoZWNrYm94LWJsYW5rLW91dGxpbmUnXG5cdFx0XHRjb2xvcjogJ3JnYmEoMCwwLDAsLjU0KSdcblxuXHRcdEBpc09uID0gb3B0aW9ucy5pc09uID8gZmFsc2Vcblx0XHRAb25UYXAgLT4gQGlzT24gPSAhQGlzT25cblxuXHRAZGVmaW5lIFwiaXNPblwiLFxuXHRcdGdldDogLT4gcmV0dXJuIEBfaXNPblxuXHRcdHNldDogKGJvb2wpIC0+XG5cdFx0XHRyZXR1cm4gaWYgYm9vbCBpcyBAX2lzT25cblx0XHRcdFxuXHRcdFx0QF9pc09uID0gYm9vbFxuXHRcdFx0QGVtaXQoXCJjaGFuZ2U6aXNPblwiLCBAX2lzT24sIEApXG5cdFx0XHRAdXBkYXRlKClcblxuXHR1cGRhdGU6IC0+XG5cdFx0aWYgQF9pc09uXG5cdFx0XHRAaWNvbiA9ICdjaGVja2JveC1tYXJrZWQnXG5cdFx0XHRAY29sb3IgPSB0aGVtZS5jb2xvcnMucHJpbWFyeS5tYWluXG5cdFx0ZWxzZSBcblx0XHRcdEBpY29uID0gJ2NoZWNrYm94LWJsYW5rLW91dGxpbmUnXG5cdFx0XHRAY29sb3IgPSAncmdiYSgwLDAsMCwuNTQpJ1xuXG5cblxuXG5cblxuIyBcdCA4ODg4ODhiYSAgICAgICAgICAgICAgICAgZFAgb28gICAgICAgICAgIDg4ODg4OGJhICAgICAgICAgICAgIGRQICAgICBkUFxuIyBcdCA4OCAgICBgOGIgICAgICAgICAgICAgICAgODggICAgICAgICAgICAgIDg4ICAgIGA4YiAgICAgICAgICAgIDg4ICAgICA4OFxuIyBcdGE4OGFhYWE4UCcgLmQ4ODg4Yi4gLmQ4ODhiODggZFAgLmQ4ODg4Yi4gYTg4YWFhYThQJyBkUCAgICBkUCBkODg4OFAgZDg4ODhQIC5kODg4OGIuIDg4ZDg4OGIuXG4jIFx0IDg4ICAgYDhiLiA4OCcgIGA4OCA4OCcgIGA4OCA4OCA4OCcgIGA4OCAgODggICBgOGIuIDg4ICAgIDg4ICAgODggICAgIDg4ICAgODgnICBgODggODgnICBgODhcbiMgXHQgODggICAgIDg4IDg4LiAgLjg4IDg4LiAgLjg4IDg4IDg4LiAgLjg4ICA4OCAgICAuODggODguICAuODggICA4OCAgICAgODggICA4OC4gIC44OCA4OCAgICA4OFxuIyBcdCBkUCAgICAgZFAgYDg4ODg4UDggYDg4ODg4UDggZFAgYDg4ODg4UCcgIDg4ODg4ODg4UCBgODg4ODhQJyAgIGRQICAgICBkUCAgIGA4ODg4OFAnIGRQICAgIGRQXG4jIFx0XG4jIFx0XG5cblxuZXhwb3J0cy5SYWRpb2JveCA9IFJhZGlvYm94ID0gY2xhc3MgUmFkaW9ib3ggZXh0ZW5kcyBJY29uXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXG5cdFx0QF9pc09uID0gdW5kZWZpbmVkXG5cdFx0QF9ncm91cCA9IG9wdGlvbnMuZ3JvdXAgPyBbXVxuXG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0bmFtZTogJy4nXG5cdFx0XHRhbmltYXRpb25PcHRpb25zOiB7dGltZTogLjE1fVxuXHRcdFx0aWNvbjogJ3JhZGlvYm94LWJsYW5rJ1xuXHRcdFx0Y29sb3I6ICdyZ2JhKDAsMCwwLC41NCknXG5cblx0XHRAaXNPbiA9IG9wdGlvbnMuaXNPbiA/IGZhbHNlXG5cdFx0QG9uVGFwIC0+IGlmIEBpc09uIGlzIGZhbHNlIHRoZW4gQGlzT24gPSB0cnVlXG5cblx0XHRAX2dyb3VwLnB1c2goQClcblxuXHRAZGVmaW5lIFwiaXNPblwiLFxuXHRcdGdldDogLT4gcmV0dXJuIEBfaXNPblxuXHRcdHNldDogKGJvb2wpIC0+XG5cdFx0XHRyZXR1cm4gaWYgYm9vbCBpcyBAX2lzT25cblx0XHRcdFxuXHRcdFx0QF9pc09uID0gYm9vbFxuXHRcdFx0QGVtaXQoXCJjaGFuZ2U6aXNPblwiLCBAX2lzT24sIEApXG5cdFx0XHRAdXBkYXRlKClcblxuXHR1cGRhdGU6IC0+XG5cdFx0aWYgQF9pc09uXG5cdFx0XHRAaWNvbiA9ICdyYWRpb2JveC1tYXJrZWQnXG5cdFx0XHRAY29sb3IgPSB0aGVtZS5jb2xvcnMucHJpbWFyeS5tYWluXG5cblx0XHRcdHJhZGlvYm94LmlzT24gPSBmYWxzZSBmb3IgcmFkaW9ib3ggaW4gXy53aXRob3V0KEBfZ3JvdXAsIEApXG5cdFx0ZWxzZSBcblx0XHRcdEBpY29uID0gJ3JhZGlvYm94LWJsYW5rJ1xuXHRcdFx0QGNvbG9yID0gJ3JnYmEoMCwwLDAsLjU0KSdcblxuXG5cbiMgXHQuZDg4ODg4YiAgZFAgb28gICAgICAgZFBcbiMgXHQ4OC4gICAgXCInIDg4ICAgICAgICAgIDg4XG4jIFx0YFk4ODg4OGIuIDg4IGRQIC5kODg4Yjg4IC5kODg4OGIuIDg4ZDg4OGIuXG4jIFx0ICAgICAgYDhiIDg4IDg4IDg4JyAgYDg4IDg4b29vb2Q4IDg4JyAgYDg4XG4jIFx0ZDgnICAgLjhQIDg4IDg4IDg4LiAgLjg4IDg4LiAgLi4uIDg4XG4jIFx0IFk4ODg4OFAgIGRQIGRQIGA4ODg4OFA4IGA4ODg4OFAnIGRQXG5cblxuZXhwb3J0cy5TbGlkZXIgPSBTbGlkZXIgPSBjbGFzcyBTbGlkZXIgZXh0ZW5kcyBTbGlkZXJDb21wb25lbnRcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cblx0XHRAX25vdGNoZWQgPSBvcHRpb25zLm5vdGNoZWQgPyBmYWxzZVxuXG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0aGVpZ2h0OiAyXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6ICdyZ2JhKDAsMCwwLC4yNiknXG5cdFx0XHRtaW46IDEsIG1heDogMTBcblx0XHRcblx0XHRAZmlsbC5iYWNrZ3JvdW5kQ29sb3IgPSB0aGVtZS5jb2xvcnMucHJpbWFyeS5tYWluXG5cblx0XHRAa25vYi5wcm9wcyA9XG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcdHNoYWRvd1g6IDBcblx0XHRcdHNoYWRvd1k6IDBcblx0XHRcdHNoYWRvd0JsdXI6IDBcblxuXHRcdEB0aHVtYiA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEBrbm9iXG5cdFx0XHR4OiBBbGlnbi5jZW50ZXIsIHk6IEFsaWduLmNlbnRlclxuXHRcdFx0aGVpZ2h0OiAxMiwgd2lkdGg6IDEyLCBib3JkZXJSYWRpdXM6IDEyXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IHRoZW1lLmNvbG9ycy5wcmltYXJ5Lm1haW5cblx0XHRcdGFuaW1hdGlvbk9wdGlvbnM6IHt0aW1lOiAuMTV9XG5cblx0XHRpZiBAX25vdGNoZWRcblxuXHRcdFx0Zm9yIGkgaW4gWzAuLi5AbWF4LUBtaW5dXG5cdFx0XHRcdG5vdGNoID0gbmV3IExheWVyXG5cdFx0XHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEBcblx0XHRcdFx0XHR4OiBpICogQHdpZHRoLyhAbWF4LUBtaW4pXG5cdFx0XHRcdFx0d2lkdGg6IDIsIGhlaWdodDogMiwgYm9yZGVyUmFkaXVzOiAyLFxuXHRcdFx0XHRcdGJhY2tncm91bmRDb2xvcjogdGhlbWUuY29sb3JzLnByaW1hcnkudGV4dFxuXG5cdFx0XHRAdGlwID0gbmV3IExheWVyXG5cdFx0XHRcdHBhcmVudDogQGtub2Jcblx0XHRcdFx0eDogQWxpZ24uY2VudGVyLCB5OiAtMjRcblx0XHRcdFx0d2lkdGg6IDI2LCBoZWlnaHQ6IDMyXG5cdFx0XHRcdGh0bWw6ICc8c3ZnIHdpZHRoPVwiMjZweFwiIGhlaWdodD1cIjMycHhcIiB2aWV3Qm94PVwiMCAwIDI2IDMyXCI+PHBhdGggZD1cIk0xMywwLjEgQzIwLjIsMC4xIDI2LDYgMjYsMTMuMyBDMjYsMTcgMjQsMjAuOSAxOC43LDI2LjIgTDEzLDMyIEw3LjIsMjYuMiBDMiwyMC44IDAsMTYuOSAwLDEzLjMgQy0zLjU1MjcxMzY4ZS0xNSw2IDUuOCwwLjEgMTMsMC4xIEwxMywwLjEgWlwiIGZpbGw9XCInICsgdGhlbWUuY29sb3JzLnByaW1hcnkubWFpbiArICdcIj48L3BhdGg+PC9zdmc+J1xuXHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IG51bGwsIG9wYWNpdHk6IDBcblx0XHRcdFx0YW5pbWF0aW9uT3B0aW9uczoge3RpbWU6IC4xNX1cblxuXHRcdFx0QHRpcFZhbHVlID0gbmV3IFRleHRMYXllclxuXHRcdFx0XHRuYW1lOiAnVGlwIFZhbHVlJywgcGFyZW50OiBAdGlwXG5cdFx0XHRcdHk6IDUsIHdpZHRoOiAyNlxuXHRcdFx0XHRjb2xvcjogdGhlbWUuY29sb3JzLnByaW1hcnkudGV4dFxuXHRcdFx0XHRmb250U2l6ZTogMTIsIGZvbnRGYW1pbHk6ICdSb2JvdG8nLCB0ZXh0QWxpZ246ICdjZW50ZXInXG5cdFx0XHRcdHRleHQ6IFwie3ZhbHVlfVwiXG5cblx0XHRcdEB0aXBWYWx1ZS50ZW1wbGF0ZSA9XG5cdFx0XHRcdHZhbHVlOiBAdmFsdWVcblxuXHRcdFx0QGtub2Iub25Ub3VjaFN0YXJ0ID0+IFxuXHRcdFx0XHRAdGh1bWIuYW5pbWF0ZSB7b3BhY2l0eTogMH1cblx0XHRcdFx0QHRpcC5hbmltYXRlIHtvcGFjaXR5OiAxfVxuXG5cdFx0XHRAb25Ub3VjaEVuZCAtPlxuXHRcdFx0XHRAdGh1bWIuYW5pbWF0ZSB7b3BhY2l0eTogMX1cblx0XHRcdFx0QHRpcC5hbmltYXRlIHtvcGFjaXR5OiAwfVxuXG5cdFx0XHRyb3VuZCA9IChudW1iZXIsIG5lYXJlc3QpIC0+XG5cdFx0XHQgICAgTWF0aC5yb3VuZChudW1iZXIgLyBuZWFyZXN0KSAqIG5lYXJlc3Rcblx0XHRcdCBcblx0XHRcdEBrbm9iLmRyYWdnYWJsZS51cGRhdGVQb3NpdGlvbiA9IChwb2ludCkgPT5cblx0XHRcdCAgICBwb2ludC54ID0gcm91bmQocG9pbnQueCwgQHdpZHRoIC8gKEBtYXgtQG1pbikgKSAtIChAa25vYi53aWR0aCAvIDIpXG5cdFx0XHQgICAgcmV0dXJuIHBvaW50XG5cblx0XHRcdEBvblZhbHVlQ2hhbmdlIC0+IFxuXHRcdFx0XHRAdGlwVmFsdWUudGVtcGxhdGUgPSBNYXRoLnJvdW5kKEB2YWx1ZSlcblxuXHRcdGVsc2UgXG5cdFx0XHRAa25vYi5vblRvdWNoU3RhcnQgPT4gXG5cdFx0XHRcdEB0aHVtYi5hbmltYXRlIHt3aWR0aDogMTgsIGhlaWdodDogMTgsIHg6IDYsIHk6IDZ9XG5cdFx0XHRAa25vYi5vblRvdWNoRW5kID0+IFxuXHRcdFx0XHRAdGh1bWIuYW5pbWF0ZSB7d2lkdGg6IDEyLCBoZWlnaHQ6IDEyLCB4OiA5LCB5OiA5fVxuXHRcdFxuXG5cblxuXG5cblxuXG4iLCJpY29ucyA9IEpTT04ucGFyc2UgVXRpbHMuZG9tTG9hZERhdGFTeW5jIFwibW9kdWxlcy9pY29ucy5qc29uXCJcblxuIyBcdGRQXG4jIFx0ODhcbiMgXHQ4OCAuZDg4ODhiLiAuZDg4ODhiLiA4OGQ4ODhiLlxuIyBcdDg4IDg4JyAgYFwiXCIgODgnICBgODggODgnICBgODhcbiMgXHQ4OCA4OC4gIC4uLiA4OC4gIC44OCA4OCAgICA4OFxuIyBcdGRQIGA4ODg4OFAnIGA4ODg4OFAnIGRQICAgIGRQXG4jIFx0XG4jIFx0XG4jLS0gQHN0ZXZlcnVpem9rXG4jXHRBIGNsYXNzIGZvciBjcmVhdGluZyBNYXRlcmlhbCBEZXNpZ24gaWNvbnMsIHdpdGggYWNjZXNzIHRvIDE2MDAgaWNvbnMgYXMgU1ZHcy5cbiNcdEFkYXB0ZWQgZnJvbSBtYXJjYmFjaG1hbm4ncyBodHRwczovL3d3dy5ucG1qcy5jb20vcGFja2FnZS9tYXRlcmlhbC1kZXNpZ24taWNvbnMtc3ZnLlxuI1x0XG4jXG4jLS0gSW5zdGFsbGF0aW9uOlxuI1x0RG93bmxvYWQgYW5kIHBsYWNlIGljb24uY29mZmVlIGFuZCBpY29ucy5qc29uIGluIHlvdXIgcHJvamVjdCdzIG1vZHVsZXMgZm9sZGVyLlxuI1x0QXQgdGhlIHRvcCBvZiB5b3VyIHByb2plY3QsIHR5cGU6IFwie0ljb259ID0gcmVxdWlyZSBcImljb25cIlxuI1xuI1xuIy0tXHRVc2FnZTpcbiNcdFRvIGNyZWF0ZSBhbiBpY29uLCB0eXBlOlxuI1xuI1x0XHRteUljb24gPSBuZXcgSWNvblxuI1x0XHRcbiNcdFlvdSBjYW4gc2V0IHRoZSBpY29uIGFuZCB0aGUgaWNvbidzIGZpbGwgY29sb3IuXG4jXG4jXHRcdG15SWNvbiA9IG5ldyBJY29uXG4jXHRcdFx0aWNvbjogJ2Nvb2tpZSdcbiNcdFx0XHRjb2xvcjogJyM5NDUyMDAnXG4jXG4jXHRZb3UgY2FuIGNoYW5nZSBhbiBleGlzdGluZyBpY29uJ3MgZmlsbCBvciBpY29uLlxuI1xuIyBcdFx0bXlJY29uLmNvbG9yID0gJ3JlZCcgXG4jXHRcdG15SWNvbi5pY29uID0gJ2N1cCdcbiNcbiNcdEFwYXJ0IGZyb20gdGhhdCwgeW91IGNhbiB1c2UgdGhlIEljb24gaW5zdGFuY2UganVzdCBsaWtlIGFueSBvdGhlciBMYXllciBpbnN0YW5jZS5cbiNcbiNcdEVuam95ISBAc3RldmVydWlva1xuXG5cblxuZXhwb3J0cy5JY29uID0gY2xhc3MgSWNvbiBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXG5cdFx0QF9pY29uID0gb3B0aW9ucy5pY29uID8gJ21lbnUnXG5cdFx0QF9jb2xvciA9IG9wdGlvbnMuY29sb3IgPyAnIzAwMDAwJ1xuXHRcdEBfYmFja2dyb3VuZENvbG9yID0gb3B0aW9ucy5iYWNrZ3JvdW5kQ29sb3IgPyBudWxsXG5cblx0XHRzdXBlciBfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRuYW1lOiAnLidcblx0XHRcdGhlaWdodDogMjQsIHdpZHRoOiAyNFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBAX2JhY2tncm91bmRDb2xvclxuXG5cdEBkZWZpbmUgXCJpY29uXCIsXG5cdFx0Z2V0OiAtPiByZXR1cm4gQF9pY29uXG5cdFx0c2V0OiAobmFtZSkgLT5cblx0XHRcdEBfaWNvbiA9IG5hbWVcblxuXHRcdFx0c3ZnID0gaWYgaWNvbnNbQF9pY29uXSB0aGVuIFwiPHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAyNCAyNCc+PHBhdGggZD0nI3tpY29uc1tAX2ljb25dfScgZmlsbD0nI3tAX2NvbG9yfScvPjwvc3ZnPlwiXG5cdFx0XHRlbHNlIHRocm93IFwiRXJyb3I6IGljb24gJyN7bmFtZX0nIHdhcyBub3QgZm91bmQuIFNlZSBodHRwczovL21hdGVyaWFsZGVzaWduaWNvbnMuY29tLyBmb3IgZnVsbCBsaXN0IG9mIGljb25zLlwiXG5cblx0XHRcdEBodG1sID0gc3ZnXG5cblx0QGRlZmluZSBcImNvbG9yXCIsXG5cdFx0Z2V0OiAtPiByZXR1cm4gQF9jb2xvclxuXHRcdHNldDogKGNvbG9yKSAtPlxuXHRcdFx0QF9jb2xvciA9IG5ldyBDb2xvcihjb2xvcilcblxuXHRcdFx0c3ZnID0gaWYgaWNvbnNbQF9pY29uXSB0aGVuIFwiPHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAyNCAyNCc+PHBhdGggZD0nI3tpY29uc1tAX2ljb25dfScgZmlsbD0nI3tAX2NvbG9yfScvPjwvc3ZnPlwiXG5cdFx0XHRlbHNlIHRocm93IFwiRXJyb3I6IGljb24gJyN7bmFtZX0nIHdhcyBub3QgZm91bmQuIFNlZSBodHRwczovL21hdGVyaWFsZGVzaWduaWNvbnMuY29tLyBmb3IgZnVsbCBsaXN0IG9mIGljb25zLlwiXG5cblx0XHRcdEBodG1sID0gc3ZnIiwiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFLQUE7QURBQSxJQUFBLFdBQUE7RUFBQTs7O0FBQUEsS0FBQSxHQUFRLElBQUksQ0FBQyxLQUFMLENBQVcsS0FBSyxDQUFDLGVBQU4sQ0FBc0Isb0JBQXRCLENBQVg7O0FBMENSLE9BQU8sQ0FBQyxJQUFSLEdBQXFCOzs7RUFDUCxjQUFDLE9BQUQ7QUFFWixRQUFBOztNQUZhLFVBQVU7O0lBRXZCLElBQUMsQ0FBQSxLQUFELHdDQUF3QjtJQUN4QixJQUFDLENBQUEsTUFBRCwyQ0FBMEI7SUFDMUIsSUFBQyxDQUFBLGdCQUFELHFEQUE4QztJQUU5QyxzQ0FBTSxDQUFDLENBQUMsUUFBRixDQUFXLE9BQVgsRUFDTDtNQUFBLElBQUEsRUFBTSxHQUFOO01BQ0EsTUFBQSxFQUFRLEVBRFI7TUFDWSxLQUFBLEVBQU8sRUFEbkI7TUFFQSxlQUFBLEVBQWlCLElBQUMsQ0FBQSxnQkFGbEI7S0FESyxDQUFOO0VBTlk7O0VBV2IsSUFBQyxDQUFBLE1BQUQsQ0FBUSxNQUFSLEVBQ0M7SUFBQSxHQUFBLEVBQUssU0FBQTtBQUFHLGFBQU8sSUFBQyxDQUFBO0lBQVgsQ0FBTDtJQUNBLEdBQUEsRUFBSyxTQUFDLElBQUQ7QUFDSixVQUFBO01BQUEsSUFBQyxDQUFBLEtBQUQsR0FBUztNQUVULEdBQUE7UUFBTSxJQUFHLEtBQU0sQ0FBQSxJQUFDLENBQUEsS0FBRCxDQUFUO2lCQUFzQix1RUFBQSxHQUF3RSxLQUFNLENBQUEsSUFBQyxDQUFBLEtBQUQsQ0FBOUUsR0FBc0YsVUFBdEYsR0FBZ0cs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
