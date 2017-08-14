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
    var i, j, knobColor, notch, ref, ref1, round, trackColor;
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
    if (options.custom) {
      trackColor = sliderRegularHightlight.backgroundColor;
      knobColor = sliderRegularKnob.backgroundColor;
    } else {
      trackColor = theme.colors.primary.main;
      knobColor = theme.colors.primary.main;
    }
    this.fill.backgroundColor = trackColor;
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
      backgroundColor: knobColor,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1VzZXJzL21hbWV6aXRvL2RldmVsb3BtZW50L2dpdGh1Yi9mcmFtZXItbWQvc2xpZGVyLmZyYW1lci9tb2R1bGVzL3R5cGUuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvbWFtZXppdG8vZGV2ZWxvcG1lbnQvZ2l0aHViL2ZyYW1lci1tZC9zbGlkZXIuZnJhbWVyL21vZHVsZXMvdGhlbWUuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvbWFtZXppdG8vZGV2ZWxvcG1lbnQvZ2l0aHViL2ZyYW1lci1tZC9zbGlkZXIuZnJhbWVyL21vZHVsZXMvcmlwcGxlLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL21hbWV6aXRvL2RldmVsb3BtZW50L2dpdGh1Yi9mcmFtZXItbWQvc2xpZGVyLmZyYW1lci9tb2R1bGVzL21kLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL21hbWV6aXRvL2RldmVsb3BtZW50L2dpdGh1Yi9mcmFtZXItbWQvc2xpZGVyLmZyYW1lci9tb2R1bGVzL2ljb24uY29mZmVlIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJ0aGVtZSA9IHJlcXVpcmUgJ3RoZW1lJ1xuXG4jIFx0ZDg4ODg4OFAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZFBcbiMgXHQgICA4OCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA4OFxuIyBcdCAgIDg4ICAgIGRQICAgIGRQIDg4ZDg4OGIuIC5kODg4OGIuIC5kODg4OGIuIDg4ZDg4OGIuIC5kODg4OGIuIDg4ZDg4OGIuIDg4ZDg4OGIuIGRQICAgIGRQXG4jIFx0ICAgODggICAgODggICAgODggODgnICBgODggODgnICBgODggODgnICBgODggODgnICBgODggODgnICBgODggODgnICBgODggODgnICBgODggODggICAgODhcbiMgXHQgICA4OCAgICA4OC4gIC44OCA4OC4gIC44OCA4OC4gIC44OCA4OC4gIC44OCA4OCAgICAgICA4OC4gIC44OCA4OC4gIC44OCA4OCAgICA4OCA4OC4gIC44OFxuIyBcdCAgIGRQICAgIGA4ODg4UDg4IDg4WTg4OFAnIGA4ODg4OFAnIGA4ODg4UDg4IGRQICAgICAgIGA4ODg4OFA4IDg4WTg4OFAnIGRQICAgIGRQIGA4ODg4UDg4XG4jIFx0ICAgICAgICAgICAgICAuODggODggICAgICAgICAgICAgICAgICAgICAuODggICAgICAgICAgICAgICAgICAgODggICAgICAgICAgICAgICAgICAgICAuODhcbiMgXHQgICAgICAgICAgZDg4ODhQICBkUCAgICAgICAgICAgICAgICAgZDg4ODhQICAgICAgICAgICAgICAgICAgICBkUCAgICAgICAgICAgICAgICAgZDg4ODhQXG5cblV0aWxzLmluc2VydENTUyhcblx0XCJcIlwiXG4gICAgQGZvbnQtZmFjZSB7XG4gICAgICBmb250LWZhbWlseTogXCJSb2JvdG9cIjtcbiAgICAgIHNyYzogdXJsKFwiZm9udHMvUm9ib3RvLVJlZ3VsYXIudHRmXCIpO1xuICAgIFwiXCJcIilcblxuY2xhc3MgZXhwb3J0cy5IZWFkbGluZSBleHRlbmRzIFRleHRMYXllclxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMpIC0+XG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0bmFtZTogJy4nXG5cdFx0XHRmb250RmFtaWx5OiAnUm9ib3RvJ1xuXHRcdFx0Zm9udFNpemU6IDI0XG5cdFx0XHRmb250V2VpZ2h0OiA0MDBcblx0XHRcdGxpbmVIZWlnaHQ6IDEuM1xuXHRcdFx0Y29sb3I6ICdyZ2JhKDAsMCwwLC44NyknXG5cbmNsYXNzIGV4cG9ydHMuU3ViaGVhZCBleHRlbmRzIFRleHRMYXllclxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMpIC0+XG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0bmFtZTogJy4nXG5cdFx0XHRmb250RmFtaWx5OiAnUm9ib3RvJ1xuXHRcdFx0Zm9udFNpemU6IDE2XG5cdFx0XHRmb250V2VpZ2h0OiA0MDAsIFxuXHRcdFx0bGluZUhlaWdodDogMS41LFxuXHRcdFx0Y29sb3I6ICdyZ2JhKDAsMCwwLC41NCknXG5cbmNsYXNzIGV4cG9ydHMuVGl0bGUgZXh0ZW5kcyBUZXh0TGF5ZXJcblx0Y29uc3RydWN0b3I6IChvcHRpb25zKSAtPlxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdG5hbWU6ICcuJ1xuXHRcdFx0Zm9udEZhbWlseTogJ1JvYm90bydcblx0XHRcdGZvbnRTaXplOiAyMFxuXHRcdFx0Zm9udFdlaWdodDogNTAwXG5cdFx0XHRsaW5lSGVpZ2h0OiAxLjNcblx0XHRcdGNvbG9yOiAncmdiYSgwLDAsMCwuODcpJ1xuY2xhc3MgZXhwb3J0cy5SZWd1bGFyIGV4dGVuZHMgVGV4dExheWVyXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucykgLT5cblx0XHRzdXBlciBfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRuYW1lOiAnLidcblx0XHRcdGZvbnRGYW1pbHk6ICdSb2JvdG8nXG5cdFx0XHRmb250U2l6ZTogMTZcblx0XHRcdGZvbnRXZWlnaHQ6IDQwMFxuXHRcdFx0bGluZUhlaWdodDogMS4zXG5cdFx0XHRjb2xvcjogJ3JnYmEoMCwwLDAsLjg3KSdcbmNsYXNzIGV4cG9ydHMuQm9keTIgZXh0ZW5kcyBUZXh0TGF5ZXJcblx0Y29uc3RydWN0b3I6IChvcHRpb25zKSAtPlxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdG5hbWU6ICcuJ1xuXHRcdFx0Zm9udEZhbWlseTogJ1JvYm90bydcblx0XHRcdGZvbnRTaXplOiAxNFxuXHRcdFx0Zm9udFdlaWdodDogNTAwXG5cdFx0XHRsaW5lSGVpZ2h0OiAxLjNcblx0XHRcdGNvbG9yOiAncmdiYSgwLDAsMCwuODcpJ1xuY2xhc3MgZXhwb3J0cy5NZW51IGV4dGVuZHMgVGV4dExheWVyXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucykgLT5cblx0XHRzdXBlciBfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRuYW1lOiAnLidcblx0XHRcdGZvbnRGYW1pbHk6ICdSb2JvdG8nXG5cdFx0XHRmb250U2l6ZTogMTRcblx0XHRcdGZvbnRXZWlnaHQ6IDUwMFxuXHRcdFx0bGluZUhlaWdodDogMS43XG5cdFx0XHRjb2xvcjogJ3JnYmEoMCwwLDAsLjg3KSdcbmNsYXNzIGV4cG9ydHMuQm9keTEgZXh0ZW5kcyBUZXh0TGF5ZXJcblx0Y29uc3RydWN0b3I6IChvcHRpb25zKSAtPlxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdG5hbWU6ICcuJ1xuXHRcdFx0Zm9udEZhbWlseTogJ1JvYm90bydcblx0XHRcdGZvbnRTaXplOiAxNFxuXHRcdFx0Zm9udFdlaWdodDogNDAwXG5cdFx0XHRsaW5lSGVpZ2h0OiAxLjRcblx0XHRcdGNvbG9yOiAncmdiYSgwLDAsMCwuODcpJ1xuY2xhc3MgZXhwb3J0cy5DYXB0aW9uIGV4dGVuZHMgVGV4dExheWVyXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucykgLT5cblx0XHRzdXBlciBfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRuYW1lOiAnLidcblx0XHRcdGZvbnRGYW1pbHk6ICdSb2JvdG8nXG5cdFx0XHRmb250U2l6ZTogMTJcblx0XHRcdGZvbnRXZWlnaHQ6IDQwMFxuXHRcdFx0bGluZUhlaWdodDogMS4zXG5cdFx0XHRjb2xvcjogJ3JnYmEoMCwwLDAsLjU0KSdcbmNsYXNzIGV4cG9ydHMuQnV0dG9uIGV4dGVuZHMgVGV4dExheWVyXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucykgLT5cblx0XHRzdXBlciBfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRuYW1lOiAnLidcblx0XHRcdGZvbnRGYW1pbHk6ICdSb2JvdG8nXG5cdFx0XHRmb250U2l6ZTogMTRcblx0XHRcdGZvbnRXZWlnaHQ6IDUwMFxuXHRcdFx0bGluZUhlaWdodDogMS4zXG5cdFx0XHRjb2xvcjogJyMwMDk2ODgnXG5cdFx0XHRsZXR0ZXJTcGFjaW5nOiAwLjVcblx0XHRcdHBhZGRpbmc6IHtsZWZ0OiA0LCByaWdodDogNCwgdG9wOiA4LCBib3R0b206IDB9LCIsIlxuIyAgIGRQICAgZFBcbiMgICA4OCAgIDg4XG4jIGQ4ODg4UCA4OGQ4ODhiLiAuZDg4ODhiLiA4OGQ4Yi5kOGIuIC5kODg4OGIuIC5kODg4OGIuXG4jICAgODggICA4OCcgIGA4OCA4OG9vb29kOCA4OCdgODgnYDg4IDg4b29vb2Q4IFk4b29vb28uXG4jICAgODggICA4OCAgICA4OCA4OC4gIC4uLiA4OCAgODggIDg4IDg4LiAgLi4uICAgICAgIDg4XG4jICAgZFAgICBkUCAgICBkUCBgODg4ODhQJyBkUCAgZFAgIGRQIGA4ODg4OFAnIGA4ODg4OFAnXG5cbiMgV2hlbiBsb2FkZWQsIHRoaXMgbW9kdWxlIHdpbGwgYXR0ZW1wdCB0byBjcmVhdGUgYSBuZXcgdGhlbWUgYmFzZWQgb25cbiMgdGhlIERlc2lnbiBNb2RlIHRlbXBsYXRlLiBJdHMgZGVmYXVsdCB2YWx1ZXMgd2lsbCBiZSBmb3IgYSBcIkxpZ2h0XCIgdGhlbWUuXG5cbm1vZGlmeUNvbG9yID0gKGNvbG9yLCBoLCBzLCBsKSAtPlxuXHRjbGlwID0gXy5yZXBsYWNlKF8ucmVwbGFjZShjb2xvci50b0hzbFN0cmluZygpLnNsaWNlKDQsIC0xKSwgJyUnLCAnJyksICclJywgJycpIC5zcGxpdCgnLCAnKVxuXG5cdG5ld0NvbG9yID0gbmV3IENvbG9yKFxuXHRcdGg6IF8ucGFyc2VJbnQoY2xpcFswXSkgKyBoLFxuXHRcdHM6IChfLnBhcnNlSW50KGNsaXBbMV0pICsgcykvMTAwLFxuXHRcdGw6IChfLnBhcnNlSW50KGNsaXBbMl0pICsgbCkvMTAwLFxuXHRcdGE6IDEpXG5cblx0cmV0dXJuIG5ld0NvbG9yXG5cbnByaW1hcnlDb2xvciA9IHByaW1hcnlfY29sb3IuYmFja2dyb3VuZENvbG9yXG5wcmltYXJ5SW52ZXJ0ID0gMTAwIC0gKHByaW1hcnlfaW52ZXJ0Lm9wYWNpdHkgKiAxMDApXG5zZWNvbmRhcnlDb2xvciA9IHNlY29uZGFyeV9jb2xvci5iYWNrZ3JvdW5kQ29sb3Jcbm1lbnVDb2xvciA9IG1lbnVfY29sb3IuYmFja2dyb3VuZENvbG9yXG5tZW51VGV4dENvbG9yID0gbWVudV90ZXh0X2NvbG9yLmNvbG9yXG5tZW51SW52ZXJ0ID0gMTAwIC0gKG1lbnVfaW52ZXJ0Lm9wYWNpdHkgKiAxMDApXG5cblxuc291cmNlID1cblx0Y29sb3JzOlxuXHRcdHByaW1hcnk6XG5cdFx0XHRtYWluOiBwcmltYXJ5Q29sb3Jcblx0XHRcdGxpZ2h0OiBtb2RpZnlDb2xvcihwcmltYXJ5Q29sb3IsIDEzLCAtNSwgMTUpXG5cdFx0XHRkYXJrOiBtb2RpZnlDb2xvcihwcmltYXJ5Q29sb3IsIC0xLCAtNywgLTEyKVxuXHRcdFx0dGV4dDogcHJpbWFyeV90ZXh0X2NvbG9yLmNvbG9yXG5cdFx0XHRpbnZlcnQ6IHByaW1hcnlJbnZlcnRcblx0XHRzZWNvbmRhcnk6XG5cdFx0XHRtYWluOiBzZWNvbmRhcnlDb2xvclxuXHRcdFx0bGlnaHQ6IG1vZGlmeUNvbG9yKHNlY29uZGFyeUNvbG9yLCAxMywgLTUsIDE1KVxuXHRcdFx0ZGFyazogbW9kaWZ5Q29sb3Ioc2Vjb25kYXJ5Q29sb3IsIC0xLCAtNywgLTEyKVxuXHRcdFx0dGV4dDogc2Vjb25kYXJ5X3RleHRfY29sb3IuY29sb3Jcblx0XHRtZW51OlxuXHRcdFx0bGlnaHQ6IG1lbnVDb2xvclxuXHRcdFx0dGV4dDogbWVudVRleHRDb2xvclxuXHRcdFx0aW52ZXJ0OiBtZW51SW52ZXJ0XG5cbnRoZW1lID1cblx0dGludDogc291cmNlLmNvbG9ycy5zZWNvbmRhcnkubWFpblxuXHRwcmltYXJ5OiBzb3VyY2UuY29sb3JzLnByaW1hcnkubWFpblxuXHRzZWNvbmRhcnk6IHNvdXJjZS5jb2xvcnMuc2Vjb25kYXJ5Lm1haW5cblx0bWVudTogc291cmNlLmNvbG9ycy5tZW51LmxpZ2h0XG5cdGNvbG9yczogc291cmNlLmNvbG9yc1xuXG5cdHVzZXI6XG5cdFx0aW1hZ2U6IHVuZGVmaW5lZFxuXG5cdGhlYWRlcjpcblx0XHRiYWNrZ3JvdW5kQ29sb3I6IHNvdXJjZS5jb2xvcnMucHJpbWFyeS5tYWluXG5cdFx0dGl0bGU6IHNvdXJjZS5jb2xvcnMucHJpbWFyeS50ZXh0XG5cdFx0aW52ZXJ0OiBwcmltYXJ5SW52ZXJ0XG5cdFx0aWNvbjpcblx0XHRcdGNvbG9yOiBzb3VyY2UuY29sb3JzLnByaW1hcnkudGV4dFxuXHRcdHRhYnM6XG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IHNvdXJjZS5jb2xvcnMucHJpbWFyeS5saWdodFxuXHRcdFx0Y29sb3I6IHNvdXJjZS5jb2xvcnMucHJpbWFyeS50ZXh0XG5cdFx0XHRzZWxlY3Rvcjogc291cmNlLmNvbG9ycy5zZWNvbmRhcnkubWFpblxuXG5cdHN0YXR1c0Jhcjpcblx0XHRpbWFnZTogJ2ltYWdlcy9zdGF0dXNfYmFyLnBuZydcblx0XHRiYWNrZ3JvdW5kQ29sb3I6IHNvdXJjZS5jb2xvcnMucHJpbWFyeS5kYXJrXG5cdFx0aW52ZXJ0OiBwcmltYXJ5SW52ZXJ0XG5cblx0Ym90dG9tTmF2OlxuXHRcdGJhY2tncm91bmRDb2xvcjogJyNGRkZGRkYnXG5cdFx0c2hhZG93WTogLTJcblx0XHRzaGFkb3dCbHVyOiA2XG5cdFx0c2hhZG93Q29sb3I6ICdyZ2JhKDAsMCwwLC4xKSdcblxuXHRwYWdlOlxuXHRcdHByaW1hcnk6XG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6ICcjRTFFMkUxJ1xuXHRcdHNlY29uZGFyeTpcblx0XHRcdGJhY2tncm91bmRDb2xvcjogJyNGNUY1RjYnXG5cblx0bWVudU92ZXJsYXk6XG5cdFx0aGVhZGVyOlxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBzb3VyY2UuY29sb3JzLnNlY29uZGFyeS5tYWluXG5cdFx0XHRpY29uOiBzb3VyY2UuY29sb3JzLnNlY29uZGFyeS5saWdodFxuXHRcdFx0dGV4dDogc291cmNlLmNvbG9ycy5zZWNvbmRhcnkudGV4dFxuXHRcdHN1YmhlYWRlcjpcblx0XHRcdGNvbG9yOiBzb3VyY2UuY29sb3JzLm1lbnUudGV4dFxuXHRcdFx0dGV4dDogc291cmNlLmNvbG9ycy5zZWNvbmRhcnkudGV4dFxuXHRcdFx0aWNvbjogc291cmNlLmNvbG9ycy5zZWNvbmRhcnkudGV4dFxuXHRcdGJhY2tncm91bmRDb2xvcjogc291cmNlLmNvbG9ycy5tZW51LmxpZ2h0XG5cdFx0dGV4dDogc291cmNlLmNvbG9ycy5tZW51LnRleHRcblxuXHRcdHNsaWRlcjpcblx0XHRcdCMga25vYjogc291cmNlLmNvbG9ycy5zZWNvbmRhcnkubGlnaHRcblx0XHRcdGZpbGw6IHNvdXJjZS5jb2xvcnMuc2Vjb25kYXJ5LmRhcmtcblx0XHRpbnZlcnQ6IHNvdXJjZS5jb2xvcnMubWVudS5pbnZlcnRcblxuXHRidXR0b246XG5cdFx0ZmxhdDpcblx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFx0Y29sb3I6IHNvdXJjZS5jb2xvcnMuc2Vjb25kYXJ5Lm1haW5cblx0XHRcdHNoYWRvd1k6IDBcblx0XHRcdHNoYWRvd0NvbG9yOiAncmdiYSgwLDAsMCwuMTgpJ1xuXHRcdFx0c2hhZG93Qmx1cjogMFxuXG5cdFx0cmFpc2VkOlxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBzb3VyY2UuY29sb3JzLnNlY29uZGFyeS5tYWluXG5cdFx0XHRjb2xvcjogc291cmNlLmNvbG9ycy5zZWNvbmRhcnkudGV4dFxuXHRcdFx0c2hhZG93WTogMlxuXHRcdFx0c2hhZG93Q29sb3I6ICdyZ2JhKDAsMCwwLC4xOCknXG5cdFx0XHRzaGFkb3dCbHVyOiA2XG5cblx0ZmFiOlxuXHRcdGJhY2tncm91bmRDb2xvcjogc291cmNlLmNvbG9ycy5zZWNvbmRhcnkubWFpblxuXHRcdGNvbG9yOiBzb3VyY2UuY29sb3JzLnNlY29uZGFyeS50ZXh0XG5cdFx0aW52ZXJ0OiBwcmltYXJ5SW52ZXJ0XG5cblx0ZGlhbG9nOlxuXHRcdGJhY2tncm91bmRDb2xvcjonI0ZBRkFGQSdcblxuXHRkaXZpZGVyOlxuXHRcdGJhY2tncm91bmRDb2xvcjogJ3JnYmEoMCwwLDAsLjEyKSdcblxuXHR0ZXh0OlxuXHRcdHByaW1hcnk6IHNvdXJjZS5jb2xvcnMucHJpbWFyeS50ZXh0XG5cdFx0c2Vjb25kYXJ5OiBzb3VyY2UuY29sb3JzLnNlY29uZGFyeS50ZXh0XG5cblx0dGFibGU6XG5cdFx0YmFja2dyb3VuZENvbG9yOiAnI0ZGRkZGRidcblx0XHR0ZXh0OiBzb3VyY2UuY29sb3JzLnByaW1hcnkudGV4dFxuXHRcdGNoZWNrQm94OlxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHRib3JkZXJDb2xvcjogJyNEM0QzRDMnXG5cdFx0c2VsZWN0ZWQ6XG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IHNvdXJjZS5jb2xvcnMuc2Vjb25kYXJ5Lm1haW5cblx0XHRcdHRleHQ6IHNvdXJjZS5jb2xvcnMucHJpbWFyeS50ZXh0XG5cdFx0XHRjaGVja0JveDpcblx0XHRcdFx0YmFja2dyb3VuZENvbG9yOiBzb3VyY2UuY29sb3JzLnNlY29uZGFyeS5kYXJrXG5cdFx0XHRcdGJvcmRlckNvbG9yOiBudWxsXG5cblx0c25hY2tiYXI6XG5cdFx0YmFja2dyb3VuZENvbG9yOiAncmdiYSg1MSwgNTEsIDUxLCAxKSdcblx0XHRjb2xvcjogJ3JnYmEoMjU1LCAyNTUsIDI1NSwgMSknXG5cblx0c2xpZGVyOlxuXHRcdGtub2I6IHNvdXJjZS5jb2xvcnMucHJpbWFyeS5saWdodFxuXHRcdGZpbGw6IHNvdXJjZS5jb2xvcnMucHJpbWFyeS5kYXJrXG5cblx0Y2FyZDpcblx0XHRoZWFkZXI6IHNvdXJjZS5jb2xvcnMuc2Vjb25kYXJ5LmRhcmtcblxuXHRuYXZCYXI6XG5cdFx0YmFja2dyb3VuZENvbG9yOiAnIzAwMDAwMCdcblxuXHRrZXlib2FyZDpcblx0XHRpbWFnZTogJ2ltYWdlcy9rZXlib2FyZC5wbmcnXG5cbmNvbG9yX3BhbGxldGUuZGVzdHJveSgpXG5cbmV4cG9ydHMudGhlbWUgPSB0aGVtZVxuIiwiIyBcdCA4ODg4ODhiYSAgb28gICAgICAgICAgICAgICAgICAgZFBcbiMgXHQgODggICAgYDhiICAgICAgICAgICAgICAgICAgICAgIDg4XG4jIFx0YTg4YWFhYThQJyBkUCA4OGQ4ODhiLiA4OGQ4ODhiLiA4OCAuZDg4ODhiLlxuIyBcdCA4OCAgIGA4Yi4gODggODgnICBgODggODgnICBgODggODggODhvb29vZDhcbiMgXHQgODggICAgIDg4IDg4IDg4LiAgLjg4IDg4LiAgLjg4IDg4IDg4LiAgLi4uXG4jIFx0IGRQICAgICBkUCBkUCA4OFk4ODhQJyA4OFk4ODhQJyBkUCBgODg4ODhQJ1xuIyBcdCAgICAgICAgICAgICAgODggICAgICAgODhcbiMgXHQgICAgICAgICAgICAgIGRQICAgICAgIGRQXG5cbiNcdEJ5IGRlZmF1bHQsIHNob3dzIGFuIGV4cGFuZGluZyBjaXJjbGUgb3ZlciBhIGxheWVyLCBjbGlwcGVkIHRvIGl0cyBmcmFtZS5cbiNcdE9uIHRoZSBsYXllcidzIHRvdWNoRW5kIGV2ZW50LCB0aGUgY2lyY2xlIGFuZCBpdHMgbWFzayB3aWxsIGRpc2FwcGVhci5cblxuI1x0cmVxdWlyZWQ6XG4jXHRsYXllciAoTGF5ZXIpLCB0aGUgbGF5ZXIgb3ZlciB3aGljaCB0byBzaG93IHRoZSByaXBwbGUgZWZmZWN0XG4jXHRwb2ludCAob2JqZWN0KSwgdGhlIHJpcHBsZSBvcmlnaW4gcG9pbnQsIHVzdWFsbHkgYSBvblRvdWNoU3RhcnQncyBldmVudC5wb2ludFxuXG4jXHRvcHRpb25hbDpcbiNcdHBsYWNlQmVoaW5kIChMYXllciksIGEgY2hpbGQgb2YgbGF5ZXIgYmVoaW5kIHdoaWNoIHRoZSByaXBwbGUgc2hvdWxkIGFwcGVhclxuI1x0Y29sb3IgKHN0cmluZyBvciBjb2xvciBvYmplY3QpLCBhIGN1c3RvbSBjb2xvciBmb3IgdGhlIHJpcHBsZVxuXG5yaXBwbGUgPSAobGF5ZXIsIHBvaW50LCBwbGFjZUJlaGluZCwgY29sb3IpIC0+XG5cdFxuXHRpZiAhbGF5ZXI/IHRoZW4gdGhyb3cgJ1JpcHBsZSByZXF1aXJlcyBhIExheWVyLiBUcnkgbXlMYXllci5vblRvdWNoU3RhcnQgKGV2ZW50KSAtPiByaXBwbGUoQCwgZXZlbnQucG9pbnQpJ1xuXHRpZiAhcG9pbnQ/IHRoZW4gdGhyb3cgJ1JpcHBsZSByZXF1aXJlcyBhIHBvaW50LiBUcnkgbXlMYXllci5vblRvdWNoU3RhcnQgKGV2ZW50KSAtPiByaXBwbGUoQCwgZXZlbnQucG9pbnQpJ1xuXG5cdG1hc2sgPSBuZXcgTGF5ZXJcblx0XHRuYW1lOiAnLidcblx0XHRwYXJlbnQ6IGxheWVyXG5cdFx0c2l6ZTogbGF5ZXIuc2l6ZVxuXHRcdGJvcmRlclJhZGl1czogbGF5ZXIuYm9yZGVyUmFkaXVzXG5cdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0Y2xpcDogdHJ1ZVxuXHRcdG9wYWNpdHk6IDBcblx0XHRhbmltYXRpb25PcHRpb25zOiB7dGltZTogLjE1fVxuXHRcblx0aWYgcGxhY2VCZWhpbmQgdGhlbiBtYXNrLnBsYWNlQmVoaW5kKHBsYWNlQmVoaW5kKVxuXHRcblx0IyBSSVBQTEUgQ0lSQ0xFXG5cdFxuXHRsb25nU2lkZSA9IGlmIGxheWVyLndpZHRoID4gbGF5ZXIuaGVpZ2h0IHRoZW4gbGF5ZXIud2lkdGggZWxzZSBsYXllci5oZWlnaHRcblxuXHRyaXBwbGVDaXJjbGUgPSBuZXcgTGF5ZXJcblx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBtYXNrXG5cdFx0XHR4OiBwb2ludC54IC0gMTZcblx0XHRcdHk6IHBvaW50LnkgLSAxNlxuXHRcdFx0d2lkdGg6IDMyLCBoZWlnaHQ6IDMyLCBcblx0XHRcdGJvcmRlclJhZGl1czogbG9uZ1NpZGVcblx0XHRcdFxuXHRpZiBjb2xvcj9cblx0XHRyaXBwbGVDaXJjbGUucHJvcHMgPVxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBjb2xvclxuXHRlbHNlIFxuXHRcdHJpcHBsZUNpcmNsZS5wcm9wcyA9IFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBsYXllci5iYWNrZ3JvdW5kQ29sb3Jcblx0XHRcdHNhdHVyYXRlOiAxMjBcblx0XHRcdGJyaWdodG5lc3M6IDEyMFxuXHRcdFx0b3BhY2l0eTogLjVcblx0XG5cdCMgQU5JTUFUSU9OUyBDSVJDTEVcblx0XG5cdG1hc2suYW5pbWF0ZVxuXHRcdG9wYWNpdHk6IDFcblx0XHRvcHRpb25zOiB7dGltZTogLjE1fVxuXHRcblx0cmlwcGxlQ2lyY2xlLmFuaW1hdGVcblx0XHR4OiByaXBwbGVDaXJjbGUueCAtIGxvbmdTaWRlICogMS4zXG5cdFx0eTogcmlwcGxlQ2lyY2xlLnkgLSBsb25nU2lkZSAqIDEuM1xuXHRcdHdpZHRoOiBsb25nU2lkZSAqIDIuNlxuXHRcdGhlaWdodDogbG9uZ1NpZGUgKiAyLjZcblx0XHRvcHRpb25zOiB7dGltZTogLjV9XG5cdFxuXHRVdGlscy5kZWxheSAyLCAtPiBcblx0XHRtYXNrLmFuaW1hdGVcblx0XHRcdG9wYWNpdHk6IDBcblx0XHRtYXNrLm9uQW5pbWF0aW9uRW5kIG1hc2suZGVzdHJveVxuXG5cdCMgVE9VQ0ggRU5EXG5cdFxuXHRsYXllci5vblRvdWNoRW5kIC0+IFxuXHRcdG1hc2suYW5pbWF0ZVxuXHRcdFx0b3BhY2l0eTogMFxuXHRcdG1hc2sub25BbmltYXRpb25FbmQgbWFzay5kZXN0cm95XG5cbmV4cG9ydHMucmlwcGxlID0gcmlwcGxlIiwie3JpcHBsZX0gPSByZXF1aXJlICdyaXBwbGUnXG57dGhlbWV9ID0gcmVxdWlyZSAndGhlbWUnXG57SWNvbn0gPSByZXF1aXJlICdpY29uJ1xudHlwZSA9IHJlcXVpcmUgJ3R5cGUnXG5pY29ucyA9IEpTT04ucGFyc2UgVXRpbHMuZG9tTG9hZERhdGFTeW5jIFwibW9kdWxlcy9pY29ucy5qc29uXCJcblxuRnJhbWVyLkV4dHJhcy5IaW50cy5kaXNhYmxlKClcbkZyYW1lci5FeHRyYXMuUHJlbG9hZGVyLmVuYWJsZSgpXG5cbiMgVE9ETzogQ2hhbmdlIEFwcCBmcm9tIG1hc3RlciBmbG93IGNvbXBvbmVudCB0byBTY3JlZW4gbWFuYWdlci5cbiMgQXBwIHNob3VsZG4ndCBkaXJlY3RseSBtYW5hZ2UgcGFnZXM6IGEgbmV3IGNsYXNzLCAnc2NyZWVuJyB3aWxsIG1hbmFnZSBQYWdlcy5cbiMgVGFicyBhbGxvdyBuYXZpZ2F0aW9uIGJldHdlZW4gU2NyZWVucy4gQ29udGVudCBpcyBzdGlsbCBhZGRlZCB0byBQYWdlcy5cblxuXG4jIE91ciBnb2FsIGlzIHRvIHJlcXVpcmUgb25seSBvbmUgcmVxdWlyZSBpbiBGcmFtZXIgcHJvamVjdCwgc28gdGhpc1xuIyBpcyBhIGNsdW5reSB3YXkgb2YgbGV0dGluZyB1c2VyIGNyZWF0ZSB0ZXh0IHVzaW5nIG1kLlRpdGxlLCBldGMuXG5cbmV4cG9ydHMudGhlbWUgPSB0aGVtZVxuZXhwb3J0cy5UaXRsZSA9IFRpdGxlID0gdHlwZS5UaXRsZVxuZXhwb3J0cy5IZWFkbGluZSA9IEhlYWRsaW5lID0gdHlwZS5IZWFkbGluZVxuZXhwb3J0cy5TdWJoZWFkID0gU3ViaGVhZCA9IHR5cGUuU3ViaGVhZFxuZXhwb3J0cy5SZWd1bGFyID0gUmVndWxhciA9IHR5cGUuUmVndWxhclxuZXhwb3J0cy5Cb2R5MiA9IEJvZHkyID0gdHlwZS5Cb2R5MlxuZXhwb3J0cy5Cb2R5MSA9IEJvZHkxID0gdHlwZS5Cb2R5MVxuZXhwb3J0cy5DYXB0aW9uID0gQ2FwdGlvbiA9IHR5cGUuQ2FwdGlvblxuZXhwb3J0cy5EaWFsb2dBY3Rpb24gPSBEaWFsb2dBY3Rpb24gPSB0eXBlLkRpYWxvZ0FjdGlvblxuXG5hcHAgPSB1bmRlZmluZWRcblxuXG5cblxuXG5cblxuXG4jIFx0IC5kODg4ODg4XG4jIFx0ZDgnICAgIDg4XG4jIFx0ODhhYWFhYTg4YSA4OGQ4ODhiLiA4OGQ4ODhiLlxuIyBcdDg4ICAgICA4OCAgODgnICBgODggODgnICBgODhcbiMgXHQ4OCAgICAgODggIDg4LiAgLjg4IDg4LiAgLjg4XG4jIFx0ODggICAgIDg4ICA4OFk4ODhQJyA4OFk4ODhQJ1xuIyBcdCAgICAgICAgICAgODggICAgICAgODhcbiMgXHQgICAgICAgICAgIGRQICAgICAgIGRQXG5cblxuXG5leHBvcnRzLkFwcCA9IGNsYXNzIEFwcCBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXG5cdFx0QF9ib3R0b21OYXYgPSBvcHRpb25zLmJvdHRvbU5hdiA/IHVuZGVmaW5lZFxuXHRcdEBfbWVudU92ZXJsYXkgPSBvcHRpb25zLm1lbnVPdmVybGF5ID8gdW5kZWZpbmVkXG5cblx0XHRAdGhlbWUgPSB0aGVtZVxuXHRcdEB2aWV3cyA9IG9wdGlvbnMudmlld3MgPyBbXVxuXHRcdEBjdXJyZW50ID0ge2k6IDB9XG5cdFx0QG5vdGlmaWNhdGlvbnMgPSBbXVxuXHRcdEBhY3Rpb25CdXR0b24gPSB1bmRlZmluZWRcblx0XHRAc25hY2tiYXIgPSB1bmRlZmluZWRcblxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdG5hbWU6ICdBcHAnXG5cdFx0XHRzaXplOiBTY3JlZW4uc2l6ZVxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHRpbmRleDogMVxuXG5cdFx0YXBwID0gQFxuXG5cdFx0IyBIRUFERVJcblxuXHRcdEBoZWFkZXIgPSBuZXcgSGVhZGVyXG5cdFx0XHR0aGVtZTogdGhlbWVcblx0XHRcdGluZGV4OiA5OTlcblxuXHRcdCMgRk9PVEVSXG5cblx0XHRAZm9vdGVyID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiAnRm9vdGVyJ1xuXHRcdFx0d2lkdGg6IFNjcmVlbi53aWR0aCwgaGVpZ2h0OiA0OFxuXHRcdFx0aW1hZ2U6ICdpbWFnZXMvbmF2X2Jhci5wbmcnXG5cdFx0XHRpbmRleDogOTk5XG5cdFx0XHR5OiBBbGlnbi5ib3R0b20oKVxuXG5cdFx0aWYgQF9ib3R0b21OYXZcblx0XHRcdEBib3R0b21OYXYgPSBuZXcgQm90dG9tTmF2XG5cdFx0XHRcdG5hbWU6ICdCb3R0b20gTmF2J1xuXHRcdFx0XHRkZXN0aW5hdGlvbnM6IEBfYm90dG9tTmF2LmxpbmtzID8gXCJtZC5hcHAuYm90dG9tTmF2IG5lZWRzIGFuIGFycmF5IG9mIGxpbmtzLiBFeGFtcGxlOiBbe3RpdGxlOiAnSG9tZScsIGljb246ICdob21lJywgYWN0aW9uOiAtPiB2aWV3LmxpbmtUbyhob21lKX1dXCJcblx0XHRcdFx0eTogaWYgQGZvb3Rlcj8gdGhlbiBBbGlnbi5ib3R0b20oLUBmb290ZXIuaGVpZ2h0KSBlbHNlIEFsaWduLmJvdHRvbSgpXG5cdFx0XHRcdGluZGV4OiA5OThcblxuXHRcdCMgTUVOVSBPVkVSTEFZXG5cdFx0aWYgQF9tZW51T3ZlcmxheVxuXHRcdFx0QG1lbnVPdmVybGF5ID0gbmV3IE1lbnVPdmVybGF5XG5cdFx0XHRcdG5hbWU6ICdNZW51IE92ZXJsYXknXG5cdFx0XHRcdHRpdGxlOiBAX21lbnVPdmVybGF5LnRpdGxlID8gdGhyb3cgJ21kLmFwcC5tZW51T3ZlcmxheSBuZWVkcyBhIHRpdGxlLidcblx0XHRcdFx0bGlua3M6IEBfbWVudU92ZXJsYXkubGlua3MgPyB0aHJvdyBcIm1kLmFwcC5tZW51T3ZlcmxheSBuZWVkcyBhbiBhcnJheSBvZiBsaW5rcy4gRXhhbXBsZTogW3t0aXRsZTogJ0hvbWUnLCBpY29uOiAnaG9tZScsIGFjdGlvbjogLT4gdmlldy5saW5rVG8oaG9tZSl9XVwiXG5cblxuXHRcdCMgS0VZQk9BUkRcblxuXHRcdEBrZXlib2FyZCA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogJ0tleWJvYXJkJ1xuXHRcdFx0eTogQG1heFksIGltYWdlOiB0aGVtZS5rZXlib2FyZC5pbWFnZVxuXHRcdFx0d2lkdGg6IEB3aWR0aCwgaGVpZ2h0OiAyMjJcblx0XHRcdGluZGV4OiAxMDAwXG5cdFx0XHRhbmltYXRpb25PcHRpb25zOlxuXHRcdFx0XHR0aW1lOiAuMjVcblxuXHRcdEBrZXlib2FyZC5vblRhcCA9PiBAaGlkZUtleWJvYXJkKClcblxuXHRcdGZvciB2aWV3LCBpIGluIEB2aWV3c1xuXHRcdFx0QGFkZFZpZXcodmlldywgaSlcblxuXHRcdEBjaGFuZ2VWaWV3KEB2aWV3c1swXSlcblxuXHRzaG93S2V5Ym9hcmQ6IC0+XG5cdFx0QGtleWJvYXJkLmFuaW1hdGVcblx0XHRcdHk6IEFsaWduLmJvdHRvbSgpXG5cdFx0QGtleWJvYXJkLmJyaW5nVG9Gcm9udCgpXG5cblx0aGlkZUtleWJvYXJkOiAtPlxuXHRcdEBrZXlib2FyZC5hbmltYXRlXG5cdFx0XHR5OiBAbWF4WVxuXG5cdGFkZFZpZXc6ICh2aWV3LCBpKSAtPlxuXHRcdHZpZXcuaSA9IGlcblx0XHR2aWV3LnBhcmVudCA9IEBcblx0XHR2aWV3LnkgPSBAaGVhZGVyLm1heFlcblx0XHR2aWV3LmhlaWdodCA9IFNjcmVlbi5oZWlnaHQgLSBAaGVhZGVyLmhlaWdodCAtIEBmb290ZXIuaGVpZ2h0XG5cblx0XHR2aWV3LmhvbWUgPSB2aWV3Lm5ld1BhZ2Vcblx0XHQgXHRuYW1lOiAnaG9tZSdcblx0XHQgXHRoZWFkZXI6XG5cdFx0XHQgXHR0aXRsZTogdmlldy5fdGl0bGVcblx0XHRcdCBcdGljb246IHZpZXcuX2ljb25cblx0XHRcdCBcdGljb25BY3Rpb246IHZpZXcuX2ljb25BY3Rpb25cblxuXHRcdHZpZXcuc2hvd05leHQodmlldy5ob21lKVxuXG5cdGNoYW5nZVZpZXc6ICh2aWV3KSAtPlxuXHRcdHJldHVybiBpZiB2aWV3IGlzIEBjdXJyZW50XG5cblx0XHRAaGVhZGVyLnRpdGxlID0gdmlldy5jdXJyZW50Ll9oZWFkZXI/LnRpdGxlID8gJ0RlZmF1bHQnXG5cdFx0QGhlYWRlci5pY29uID0gdmlldy5jdXJyZW50Ll9oZWFkZXI/Lmljb24gPyAnbWVudSdcblx0XHRAaGVhZGVyLmljb25BY3Rpb24gPSB2aWV3LmN1cnJlbnQuX2hlYWRlcj8uaWNvbkFjdGlvbiA/IC0+IGFwcC5zaG93TWVudSgpXG5cdFx0QGhlYWRlci52aXNpYmxlID0gdmlldy5jdXJyZW50Ll9oZWFkZXI/LnZpc2libGUgPyB0cnVlXG5cblx0XHRpZiB2aWV3LmkgPiBAY3VycmVudC5pXG5cdFx0XHR2aWV3LnggPSBTY3JlZW4ud2lkdGhcblx0XHRcdEBjdXJyZW50LmFuaW1hdGUge3g6IC1TY3JlZW4ud2lkdGh9XG5cdFx0ZWxzZSBpZiB2aWV3LmkgPCBAY3VycmVudC5pXG5cdFx0XHR2aWV3LnggPSAtU2NyZWVuLndpZHRoXG5cdFx0XHRAY3VycmVudC5hbmltYXRlIHt4OiBTY3JlZW4ud2lkdGh9XG5cblx0XHR2aWV3LmFuaW1hdGUge3g6IDB9XG5cdFx0dmlldy5icmluZ1RvRnJvbnQoKVxuXHRcdEBjdXJyZW50ID0gdmlld1xuXG5cdHNob3dNZW51OiAtPlxuXHRcdEBtZW51T3ZlcmxheS5zaG93KClcblxuXHRoaWRlTWVudTogLT5cblx0XHRAbWVudU92ZXJsYXkuaGlkZSgpXG5cblx0Y2hhbmdlUGFnZTogKHBhZ2UpIC0+XG5cdFx0QGhlYWRlci50aXRsZSA9IHBhZ2UuX2hlYWRlci50aXRsZVxuXHRcdEBoZWFkZXIuaWNvbiA9IHBhZ2UuX2hlYWRlci5pY29uXG5cdFx0QGhlYWRlci5pY29uQWN0aW9uID0gcGFnZS5faGVhZGVyLmljb25BY3Rpb25cblx0XHRAaGVhZGVyLnZpc2libGUgPSBwYWdlLl9oZWFkZXIudmlzaWJsZVxuXHRcdHBhZ2UuX29uTG9hZCgpXG5cblxuXG5cblxuIyBcdGRQICAgICBkUCBvb1xuIyBcdDg4ICAgICA4OFxuIyBcdDg4ICAgIC44UCBkUCAuZDg4ODhiLiBkUCAgZFAgIGRQXG4jIFx0ODggICAgZDgnIDg4IDg4b29vb2Q4IDg4ICA4OCAgODhcbiMgXHQ4OCAgLmQ4UCAgODggODguICAuLi4gODguODhiLjg4J1xuIyBcdDg4ODg4OCcgICBkUCBgODg4ODhQJyA4ODg4UCBZOFBcblxuXG5cbmV4cG9ydHMuVmlldyA9IGNsYXNzIFZpZXcgZXh0ZW5kcyBGbG93Q29tcG9uZW50XG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXG5cdFx0QF90aXRsZSA9IG9wdGlvbnMudGl0bGUgPyAnSG9tZSdcblx0XHRAX2ljb24gPSBvcHRpb25zLmljb24gPyAnbWVudSdcblx0XHRAX2ljb25BY3Rpb24gPSBvcHRpb25zLmljb25BY3Rpb24gPyAtPiBhcHAubWVudU92ZXJsYXkuc2hvdygpXG5cblx0XHRzdXBlciBfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRuYW1lOiAnVmlldydcblx0XHRcdGFuaW1hdGlvbk9wdGlvbnM6IHtjdXJ2ZTogXCJzcHJpbmcoMzAwLCAzNSwgMClcIn1cblx0XHRcdHNoYWRvd1NwcmVhZDogMiwgc2hhZG93Q29sb3I6ICdyZ2JhKDAsMCwwLC4xKScsIHNoYWRvd0JsdXI6IDZcblxuXHRcdEBvblRyYW5zaXRpb25TdGFydCAoY3VycmVudCwgbmV4dCwgZGlyZWN0aW9uKSAtPiBhcHAuY2hhbmdlUGFnZShuZXh0KVxuXG5cdG5ld1BhZ2U6IChvcHRpb25zID0ge30pIC0+XG5cdFx0cGFnZSA9IG5ldyBQYWdlIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdHNpemU6IEBzaXplXG5cdFx0cmV0dXJuIHBhZ2VcblxuXHRsaW5rVG86IChwYWdlKSAtPlxuXHRcdGlmIHBhZ2U/IGFuZCBAY3VycmVudCBpc250IHBhZ2Vcblx0XHRcdEBzaG93TmV4dChwYWdlKVxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cbiMgLmQ4ODg4OGIgICAgZFAgICAgICAgICAgICAgIGRQICAgICAgICAgICAgICAgICAgICAgIDg4ODg4OGJhXG4jIDg4LiAgICBcIicgICA4OCAgICAgICAgICAgICAgODggICAgICAgICAgICAgICAgICAgICAgODggICAgYDhiXG4jIGBZODg4ODhiLiBkODg4OFAgLmQ4ODg4Yi4gZDg4ODhQIGRQICAgIGRQIC5kODg4OGIuIGE4OGFhYWE4UCcgLmQ4ODg4Yi4gODhkODg4Yi5cbiMgICAgICAgYDhiICAgODggICA4OCcgIGA4OCAgIDg4ICAgODggICAgODggWThvb29vby4gIDg4ICAgYDhiLiA4OCcgIGA4OCA4OCcgIGA4OFxuIyBkOCcgICAuOFAgICA4OCAgIDg4LiAgLjg4ICAgODggICA4OC4gIC44OCAgICAgICA4OCAgODggICAgLjg4IDg4LiAgLjg4IDg4XG4jICBZODg4ODhQICAgIGRQICAgYDg4ODg4UDggICBkUCAgIGA4ODg4OFAnIGA4ODg4OFAnICA4ODg4ODg4OFAgYDg4ODg4UDggZFBcblxuXG5cbmV4cG9ydHMuU3RhdHVzQmFyID0gY2xhc3MgU3RhdHVzQmFyIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cblx0XHRzdXBlciBfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRuYW1lOiAnLidcblx0XHRcdHdpZHRoOiBTY3JlZW4ud2lkdGgsIGhlaWdodDogMjRcblx0XHRcdGJhY2tncm91bmRDb2xvcjogdGhlbWUuc3RhdHVzQmFyLmJhY2tncm91bmRDb2xvclxuXG5cdFx0QGl0ZW1zID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQFxuXHRcdFx0c2l6ZTogQHNpemVcblx0XHRcdGltYWdlOiB0aGVtZS5zdGF0dXNCYXIuaW1hZ2Vcblx0XHRcdGludmVydDogdGhlbWUuc3RhdHVzQmFyLmludmVydFxuXG5cblxuXG5cblxuXG5cbiMgZFAgICAgIGRQICAgICAgICAgICAgICAgICAgICAgICAgICBkUFxuIyA4OCAgICAgODggICAgICAgICAgICAgICAgICAgICAgICAgIDg4XG4jIDg4YWFhYWE4OGEgLmQ4ODg4Yi4gLmQ4ODg4Yi4gLmQ4ODhiODggLmQ4ODg4Yi4gODhkODg4Yi5cbiMgODggICAgIDg4ICA4OG9vb29kOCA4OCcgIGA4OCA4OCcgIGA4OCA4OG9vb29kOCA4OCcgIGA4OFxuIyA4OCAgICAgODggIDg4LiAgLi4uIDg4LiAgLjg4IDg4LiAgLjg4IDg4LiAgLi4uIDg4XG4jIGRQICAgICBkUCAgYDg4ODg4UCcgYDg4ODg4UDggYDg4ODg4UDggYDg4ODg4UCcgZFBcblxuXG5cbmV4cG9ydHMuSGVhZGVyID0gY2xhc3MgSGVhZGVyIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cblx0XHRAX3RpdGxlID0gdW5kZWZpbmVkXG5cdFx0QF9pY29uID0gdW5kZWZpbmVkXG5cdFx0QF9pY29uQWN0aW9uID0gb3B0aW9ucy5pY29uQWN0aW9uID8gLT4gbnVsbFxuXG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0bmFtZTogJ0hlYWRlcicsXG5cdFx0XHR3aWR0aDogU2NyZWVuLndpZHRoLCBoZWlnaHQ6IDgwXG5cdFx0XHRzaGFkb3dZOiAyLCBzaGFkb3dCbHVyOiAzLCBzaGFkb3dDb2xvcjogJ3JnYmEoMCwwLDAsLjI0KSdcblx0XHRcdGJhY2tncm91bmRDb2xvcjogdGhlbWUuaGVhZGVyLmJhY2tncm91bmRDb2xvclxuXG5cdFx0IyBUT0RPOiBpZiBvcHRpb25zLmljb24gaXMgZmFsc2UgdGhlbiBubyBpY29uTGF5ZXIsIG1vdmUgdGl0bGUgbGVmdFxuXG5cdFx0QHRpdGxlTGF5ZXIgPSBuZXcgdHlwZS5UaXRsZVxuXHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEBcblx0XHRcdHg6IDcyLCB5OiBBbGlnbi5ib3R0b20oLTE0KVxuXHRcdFx0Y29sb3I6IHRoZW1lLmhlYWRlci50aXRsZVxuXHRcdFx0dGV4dDogQHRpdGxlID8gXCJObyB0aXRsZVwiXG5cblx0XHRAdGl0bGUgPSBvcHRpb25zLnRpdGxlID8gJ0RlZmF1bHQgSGVhZGVyJ1xuXG5cdFx0QGljb25MYXllciA9IG5ldyBJY29uXG5cdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQCxcblx0XHRcdHg6IDEyLCB5OiBBbGlnbi5jZW50ZXIoMTIpXG5cdFx0XHRpY29uOiAnbWVudScsIGNvbG9yOiB0aGVtZS5oZWFkZXIuaWNvbi5jb2xvclxuXG5cdFx0QGljb24gPSBvcHRpb25zLmljb24gPyAnbWVudSdcblxuXHRcdEBzdGF0dXNCYXIgPSBuZXcgU3RhdHVzQmFyXG5cdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQFxuXG5cdFx0QGljb25MYXllci5vblRhcCA9PiBAX2ljb25BY3Rpb24oKVxuXHRcdEBpY29uTGF5ZXIub25Ub3VjaFN0YXJ0IChldmVudCkgPT4gcmlwcGxlKEAsIGV2ZW50LnBvaW50LCBAdGl0bGVMYXllcilcblxuXG5cdEBkZWZpbmUgXCJ0aXRsZVwiLFxuXHRcdGdldDogLT4gcmV0dXJuIEBfdGl0bGVcblx0XHRzZXQ6ICh0aXRsZVRleHQpIC0+XG5cdFx0XHRAX3RpdGxlID0gdGl0bGVUZXh0XG5cdFx0XHRAdGl0bGVMYXllci50ZXh0UmVwbGFjZShAdGl0bGVMYXllci50ZXh0LCBAX3RpdGxlKVxuXG5cdEBkZWZpbmUgXCJpY29uXCIsXG5cdFx0Z2V0OiAtPiByZXR1cm4gQF9pY29uXG5cdFx0c2V0OiAoaWNvbk5hbWUpIC0+XG5cdFx0XHRAX2ljb24gPSBpY29uTmFtZVxuXHRcdFx0QGljb25MYXllci5pY29uID0gaWNvbk5hbWVcblxuXHRAZGVmaW5lIFwiaWNvbkNvbG9yXCIsXG5cdFx0Z2V0OiAtPiByZXR1cm4gQF9pY29uLmNvbG9yXG5cdFx0c2V0OiAoY29sb3IpIC0+XG5cdFx0XHRAaWNvbkxheWVyLmNvbG9yID0gY29sb3JcblxuXHRAZGVmaW5lIFwiaWNvbkFjdGlvblwiLFxuXHRcdGdldDogLT4gcmV0dXJuIEBfaWNvbkFjdGlvblxuXHRcdHNldDogKGFjdGlvbikgLT5cblx0XHRcdEBfaWNvbkFjdGlvbiA9IGFjdGlvblxuXG5cblxuXG5cblxuXG4jIFx0IDg4ODg4OGJhICAgICAgICAgICAgIGRQICAgICBkUCAgICAgICAgICAgICAgICAgICAgICAgODg4ODg4YmFcbiMgXHQgODggICAgYDhiICAgICAgICAgICAgODggICAgIDg4ICAgICAgICAgICAgICAgICAgICAgICA4OCAgICBgOGJcbiMgXHRhODhhYWFhOFAnIC5kODg4OGIuIGQ4ODg4UCBkODg4OFAgLmQ4ODg4Yi4gODhkOGIuZDhiLiA4OCAgICAgODggLmQ4ODg4Yi4gZFAgICAuZFBcbiMgXHQgODggICBgOGIuIDg4JyAgYDg4ICAgODggICAgIDg4ICAgODgnICBgODggODgnYDg4J2A4OCA4OCAgICAgODggODgnICBgODggODggICBkOCdcbiMgXHQgODggICAgLjg4IDg4LiAgLjg4ICAgODggICAgIDg4ICAgODguICAuODggODggIDg4ICA4OCA4OCAgICAgODggODguICAuODggODggLjg4J1xuIyBcdCA4ODg4ODg4OFAgYDg4ODg4UCcgICBkUCAgICAgZFAgICBgODg4ODhQJyBkUCAgZFAgIGRQIGRQICAgICBkUCBgODg4ODhQOCA4ODg4UCdcblxuXG5cbmV4cG9ydHMuQm90dG9tTmF2ID0gY2xhc3MgQm90dG9tTmF2IGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cblx0XHRAX2Rlc3RpbmF0aW9ucyA9IG9wdGlvbnMuZGVzdGluYXRpb25zID8gdGhyb3cgJ05lZWRzIGF0IGxlYXN0IG9uZSBkZXN0aW5hdGlvbi4nXG5cdFx0QF9pdGVtcyA9IFtdXG5cdFx0QF9pbml0aWFsRGVzdGluYXRpb24gPSBvcHRpb25zLmluaXRpYWxEZXN0aW5hdGlvbiA/IHVuZGVmaW5lZFxuXHRcdCMgZGVzdGluYXRpb24gc2hvdWxkIGJlOiBbe25hbWU6IHN0cmluZywgaWNvbjogaWNvblN0cmluZywgYWN0aW9uOiBmdW5jdGlvbn1dXG5cdFx0QF9hY3RpdmVEZXN0aW5hdGlvbiA9IEBfaW5pdGlhbERlc3RpbmF0aW9uID8gQF9pdGVtc1swXVxuXG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0bmFtZTogJ0JvdHRvbSBOYXYnXG5cdFx0XHR5OiBBbGlnbi5ib3R0b21cblx0XHRcdHdpZHRoOiBTY3JlZW4ud2lkdGgsIGhlaWdodDogNTZcblx0XHRcdGJhY2tncm91bmRDb2xvcjogdGhlbWUuYm90dG9tTmF2LmJhY2tncm91bmRDb2xvclxuXHRcdFx0c2hhZG93WTogdGhlbWUuYm90dG9tTmF2LnNoYWRvd1lcblx0XHRcdHNoYWRvd0JsdXI6IHRoZW1lLmJvdHRvbU5hdi5zaGFkb3dCbHVyXG5cdFx0XHRzaGFkb3dDb2xvcjogdGhlbWUuYm90dG9tTmF2LnNoYWRvd0NvbG9yXG5cdFx0XHRjbGlwOiB0cnVlXG5cblxuXHRcdGZvciBkZXN0aW5hdGlvbiwgaSBpbiBAX2Rlc3RpbmF0aW9uc1xuXHRcdFx0aXRlbSA9IG5ldyBMYXllclxuXHRcdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQFxuXHRcdFx0XHR4OiBAd2lkdGgvQF9kZXN0aW5hdGlvbnMubGVuZ3RoICogaVxuXHRcdFx0XHR3aWR0aDogQHdpZHRoL0BfZGVzdGluYXRpb25zLmxlbmd0aCwgaGVpZ2h0OiBAaGVpZ2h0XG5cdFx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXG5cdFx0XHRpdGVtLmRpc2sgPSBuZXcgTGF5ZXJcblx0XHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IGl0ZW1cblx0XHRcdFx0eDogQWxpZ24uY2VudGVyLCB5OiBBbGlnbi5jZW50ZXJcblx0XHRcdFx0aGVpZ2h0OiBAaGVpZ2h0ICogMS41LCB3aWR0aDogQGhlaWdodCAqIDEuNSwgYm9yZGVyUmFkaXVzOiBAaGVpZ2h0XG5cdFx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXG5cdFx0XHRpdGVtLmljb25MYXllciA9IG5ldyBJY29uXG5cdFx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBpdGVtLmRpc2tcblx0XHRcdFx0eDogQWxpZ24uY2VudGVyLCB5OiBBbGlnbi5jZW50ZXIoLTgpXG5cdFx0XHRcdGljb246IGRlc3RpbmF0aW9uLmljb25cblx0XHRcdFx0YW5pbWF0aW9uT3B0aW9uczoge3RpbWU6IC4xNX1cblxuXHRcdFx0aXRlbS5sYWJlbExheWVyID0gbmV3IHR5cGUuQ2FwdGlvblxuXHRcdFx0XHRuYW1lOiAnLicsIHBhcmVudDogaXRlbS5kaXNrXG5cdFx0XHRcdHg6IEFsaWduLmNlbnRlciwgeTogQWxpZ24uY2VudGVyKDE0KVxuXHRcdFx0XHR3aWR0aDogQHdpZHRoLCB0ZXh0QWxpZ246ICdjZW50ZXInXG5cdFx0XHRcdHRleHQ6IGRlc3RpbmF0aW9uLnRpdGxlXG5cdFx0XHRcdGFuaW1hdGlvbk9wdGlvbnM6IHt0aW1lOiAuMTV9XG5cblx0XHRcdGl0ZW0uYWN0aW9uID0gZGVzdGluYXRpb24uYWN0aW9uXG5cblx0XHRcdGl0ZW0uZGlzay5vblRvdWNoU3RhcnQgKGV2ZW50KSAtPlxuXHRcdFx0XHRyaXBwbGUoQCwgZXZlbnQucG9pbnQsIEBwYXJlbnQuaWNvbkxheWVyLCBuZXcgQ29sb3IodGhlbWUucHJpbWFyeSkuYWxwaGEoLjMpKVxuXG5cdFx0XHRpdGVtLm9uVGFwIC0+IEBwYXJlbnQuYWN0aXZlRGVzdGluYXRpb24gPSBAXG5cblx0XHRcdEBfaXRlbXMucHVzaChpdGVtKVxuXG5cdFx0XHRAc2hvd0FjdGl2ZShAX2l0ZW1zWzBdKVxuXG5cblxuXHRAZGVmaW5lIFwiYWN0aXZlRGVzdGluYXRpb25cIixcblx0XHRnZXQ6IC0+IHJldHVybiBAX2FjdGl2ZURlc3RpbmF0aW9uXG5cdFx0c2V0OiAoZGVzdGluYXRpb24pIC0+XG5cdFx0XHRyZXR1cm4gaWYgZGVzdGluYXRpb24gaXMgQF9hY3RpdmVEZXN0aW5hdGlvblxuXHRcdFx0QF9hY3RpdmVEZXN0aW5hdGlvbiA9IGRlc3RpbmF0aW9uXG5cblx0XHRcdEBfYWN0aXZlRGVzdGluYXRpb24uYWN0aW9uKClcblx0XHRcdEBzaG93QWN0aXZlKEBfYWN0aXZlRGVzdGluYXRpb24pXG5cblx0c2hvd0FjdGl2ZTogKGl0ZW0pIC0+XG5cdFx0aXRlbS5sYWJlbExheWVyLmFuaW1hdGUge2NvbG9yOiB0aGVtZS5wcmltYXJ5LCBvcGFjaXR5OiAxfVxuXHRcdGl0ZW0uaWNvbkxheWVyLmNvbG9yID0gdGhlbWUucHJpbWFyeVxuXG5cblx0XHRmb3Igc2liIGluIGl0ZW0uc2libGluZ3Ncblx0XHRcdHNpYi5sYWJlbExheWVyLmFuaW1hdGUge2NvbG9yOiAnIzc3Nyd9XG5cdFx0XHRzaWIuaWNvbkxheWVyLmNvbG9yID0gJyM3NzcnXG5cblxuXG5cbiMgIDg4ODg4OGJhXG4jICA4OCAgICBgOGJcbiMgYTg4YWFhYThQJyAuZDg4ODhiLiAuZDg4ODhiLiAuZDg4ODhiLlxuIyAgODggICAgICAgIDg4JyAgYDg4IDg4JyAgYDg4IDg4b29vb2Q4XG4jICA4OCAgICAgICAgODguICAuODggODguICAuODggODguICAuLi5cbiMgIGRQICAgICAgICBgODg4ODhQOCBgODg4OFA4OCBgODg4ODhQJ1xuIyAgICAgICAgICAgICAgICAgICAgICAgICAgLjg4XG4jICAgICAgICAgICAgICAgICAgICAgIGQ4ODg4UFxuXG5cblxuZXhwb3J0cy5QYWdlID0gY2xhc3MgUGFnZSBleHRlbmRzIFNjcm9sbENvbXBvbmVudFxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblxuXHRcdEBfaGVhZGVyID0ge31cblx0XHRAX2hlYWRlci50aXRsZSA9IG9wdGlvbnMuaGVhZGVyPy50aXRsZSA/ICdOZXcgUGFnZSdcblx0XHRAX2hlYWRlci52aXNpYmxlID0gb3B0aW9ucy5oZWFkZXI/LnZpc2libGUgPyB0cnVlXG5cdFx0QF9oZWFkZXIuaWNvbiA9IG9wdGlvbnMuaGVhZGVyPy5pY29uID8gJ21lbnUnXG5cdFx0QF9oZWFkZXIuaWNvbkFjdGlvbiA9IG9wdGlvbnMuaGVhZGVyPy5pY29uQWN0aW9uID8gLT4gbnVsbFxuXG5cdFx0QF90ZW1wbGF0ZSA9IG9wdGlvbnMudGVtcGxhdGVcblx0XHRAX3RlbXBsYXRlT3BhY2l0eSA9IG9wdGlvbnMudGVtcGxhdGVPcGFjaXR5ID8gLjVcblx0XHRAX29uTG9hZCA9IG9wdGlvbnMub25Mb2FkID8gLT4gbnVsbFxuXG5cdFx0aWYgQF9oZWFkZXIuaWNvbkFjdGlvbiB0aGVuIEBfaGVhZGVyLmljb25BY3Rpb24gPSBfLmJpbmQoQF9oZWFkZXIuaWNvbkFjdGlvbiwgQClcblx0XHRpZiBAX29uTG9hZCB0aGVuIEBfb25Mb2FkID0gXy5iaW5kKEBfb25Mb2FkLCBAKVxuXG5cblx0XHRzdXBlciBfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRuYW1lOiAnUGFnZSdcblx0XHRcdHNpemU6IFNjcmVlbi5zaXplXG5cdFx0XHRzY3JvbGxIb3Jpem9udGFsOiBmYWxzZVxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiB0aGVtZS5wYWdlLnByaW1hcnkuYmFja2dyb3VuZENvbG9yXG5cblx0XHRAY29udGVudEluc2V0ID1cblx0XHRcdHRvcDogMCwgYm90dG9tOiAxNjBcblxuXHRcdEBjb250ZW50LmJhY2tncm91bmRDb2xvciA9IG51bGxcblxuXHRcdGlmIEBfdGVtcGxhdGU/XG5cdFx0XHRAX3RlbXBsYXRlLnByb3BzID1cblx0XHRcdFx0cGFyZW50OiBAXG5cdFx0XHRcdG9wYWNpdHk6IEBfdGVtcGxhdGVPcGFjaXR5XG5cblx0XHRAc2VuZFRvQmFjaygpXG5cblxuXHR1cGRhdGU6IC0+IHJldHVybiBudWxsXG5cblxuXG5cblxuXG5cblxuIyAgODg4ODg4YmEgICAgICAgICAgICAgICAgICAgICAgZFAgICBkUFxuIyAgODggICAgYDhiICAgICAgICAgICAgICAgICAgICAgODggICA4OFxuIyBhODhhYWFhOFAnIC5kODg4OGIuIGRQICBkUCAgZFAgODggZDg4ODhQIC5kODg4OGIuIDg4ZDhiLmQ4Yi5cbiMgIDg4ICAgYDhiLiA4OCcgIGA4OCA4OCAgODggIDg4IDg4ICAgODggICA4OG9vb29kOCA4OCdgODgnYDg4XG4jICA4OCAgICAgODggODguICAuODggODguODhiLjg4JyA4OCAgIDg4ICAgODguICAuLi4gODggIDg4ICA4OFxuIyAgZFAgICAgIGRQIGA4ODg4OFAnIDg4ODhQIFk4UCAgZFAgICBkUCAgIGA4ODg4OFAnIGRQICBkUCAgZFBcblxuXG5cbmV4cG9ydHMuUm93SXRlbSA9IGNsYXNzIFJvd0l0ZW0gZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblxuXHRcdEBfaWNvbiA9IG9wdGlvbnMuaWNvblxuXHRcdEBfaWNvbkJhY2tncm91bmRDb2xvciA9IG9wdGlvbnMuaWNvbkJhY2tncm91bmRDb2xvciA/ICcjNzc3J1xuXHRcdEBfdGV4dCA9IG9wdGlvbnMudGV4dCA/ICdSb3cgaXRlbSdcblx0XHRAX3JvdyA9IG9wdGlvbnMucm93ID8gMFxuXHRcdEBfeSA9IDMyICsgKEBfcm93ICogNDgpXG5cblx0XHRzdXBlciBfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHR3aWR0aDogU2NyZWVuLndpZHRoXG5cdFx0XHR5OiBAX3lcblx0XHRcdGhlaWdodDogNDhcblx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXG5cdFx0QGljb24gPSBuZXcgTGF5ZXJcblx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBAXG5cdFx0XHR4OiAxNiwgeTogQWxpZ24uY2VudGVyXG5cdFx0XHRoZWlnaHQ6IDMyLCB3aWR0aDogMzIsIGJvcmRlclJhZGl1czogMTZcblx0XHRcdGJhY2tncm91bmRDb2xvcjogQF9pY29uQmFja2dyb3VuZENvbG9yXG5cdFx0XHRpbWFnZTogQF9pY29uXG5cblx0XHRAbGFiZWxMYXllciA9IG5ldyB0eXBlLlJlZ3VsYXJcblx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBAXG5cdFx0XHR4OiBAaWNvbi5tYXhYICsgMTYsIHk6IEFsaWduLmNlbnRlclxuXHRcdFx0Y29sb3I6IHRoZW1lLnRleHQudGV4dFxuXHRcdFx0dGV4dDogQF90ZXh0XG5cblxuXG5cblxuXG5cblxuIyBcdDg4ODhiYS44OGJhICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgODg4ODg4YmEgICAgICAgICAgICAgZFAgICAgIGRQXG4jIFx0ODggIGA4YiAgYDhiICAgICAgICAgICAgICAgICAgICAgICAgICAgICA4OCAgICBgOGIgICAgICAgICAgICA4OCAgICAgODhcbiMgXHQ4OCAgIDg4ICAgODggLmQ4ODg4Yi4gODhkODg4Yi4gZFAgICAgZFAgYTg4YWFhYThQJyBkUCAgICBkUCBkODg4OFAgZDg4ODhQIC5kODg4OGIuIDg4ZDg4OGIuXG4jIFx0ODggICA4OCAgIDg4IDg4b29vb2Q4IDg4JyAgYDg4IDg4ICAgIDg4ICA4OCAgIGA4Yi4gODggICAgODggICA4OCAgICAgODggICA4OCcgIGA4OCA4OCcgIGA4OFxuIyBcdDg4ICAgODggICA4OCA4OC4gIC4uLiA4OCAgICA4OCA4OC4gIC44OCAgODggICAgLjg4IDg4LiAgLjg4ICAgODggICAgIDg4ICAgODguICAuODggODggICAgODhcbiMgXHRkUCAgIGRQICAgZFAgYDg4ODg4UCcgZFAgICAgZFAgYDg4ODg4UCcgIDg4ODg4ODg4UCBgODg4ODhQJyAgIGRQICAgICBkUCAgIGA4ODg4OFAnIGRQICAgIGRQXG5cblxuXG5jbGFzcyBNZW51QnV0dG9uIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cblx0XHRAX2ljb24gPSBvcHRpb25zLmljb24gPyAnaG9tZSdcblx0XHRAX3RleHQgPSBvcHRpb25zLnRleHQgPyAnRGVmYXVsdCdcblx0XHRAX2FjdGlvbiA9IG9wdGlvbnMuYWN0aW9uID8gLT4gbnVsbFxuXG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0aGVpZ2h0OiA0OCwgd2lkdGg6IDMwNFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cblx0XHRAaWNvbkxheWVyID0gbmV3IEljb25cblx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBAXG5cdFx0XHR5OiBBbGlnbi5jZW50ZXJcblx0XHRcdGljb246IEBfaWNvbiwgY29sb3I6IHRoZW1lLm1lbnVPdmVybGF5LnRleHRcblxuXHRcdEBsYWJlbExheWVyID0gbmV3IHR5cGUuUmVndWxhclxuXHRcdFx0bmFtZTogJ2xhYmVsJywgcGFyZW50OiBAXG5cdFx0XHR4OiBAaWNvbkxheWVyLm1heFggKyAxNlxuXHRcdFx0eTogQWxpZ24uY2VudGVyKClcblx0XHRcdGNvbG9yOiB0aGVtZS5tZW51T3ZlcmxheS50ZXh0XG5cdFx0XHR0ZXh0OiBAX3RleHRcblxuXHRcdEBvblRhcCBAX2FjdGlvblxuXHRcdEBvblRhcCAtPlxuXHRcdFx0VXRpbHMuZGVsYXkgLjI1LCA9PiBAcGFyZW50LmhpZGUoKVxuXG5cblxuXG5cblxuXG5cbiMgXHQ4ODg4YmEuODhiYSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC44ODg4OC4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRQXG4jIFx0ODggIGA4YiAgYDhiICAgICAgICAgICAgICAgICAgICAgICAgICAgIGQ4JyAgIGA4YiAgICAgICAgICAgICAgICAgICAgICAgICAgICA4OFxuIyBcdDg4ICAgODggICA4OCAuZDg4ODhiLiA4OGQ4ODhiLiBkUCAgICBkUCA4OCAgICAgODggZFAgICAuZFAgLmQ4ODg4Yi4gODhkODg4Yi4gODggLmQ4ODg4Yi4gZFAgICAgZFBcbiMgXHQ4OCAgIDg4ICAgODggODhvb29vZDggODgnICBgODggODggICAgODggODggICAgIDg4IDg4ICAgZDgnIDg4b29vb2Q4IDg4JyAgYDg4IDg4IDg4JyAgYDg4IDg4ICAgIDg4XG4jIFx0ODggICA4OCAgIDg4IDg4LiAgLi4uIDg4ICAgIDg4IDg4LiAgLjg4IFk4LiAgIC44UCA4OCAuODgnICA4OC4gIC4uLiA4OCAgICAgICA4OCA4OC4gIC44OCA4OC4gIC44OFxuIyBcdGRQICAgZFAgICBkUCBgODg4ODhQJyBkUCAgICBkUCBgODg4ODhQJyAgYDg4ODhQJyAgODg4OFAnICAgYDg4ODg4UCcgZFAgICAgICAgZFAgYDg4ODg4UDggYDg4ODhQODhcbiMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC44OFxuIyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkODg4OFBcblxuXG5cbmV4cG9ydHMuTWVudU92ZXJsYXkgPSBjbGFzcyBNZW51T3ZlcmxheSBleHRlbmRzIExheWVyXG5cblxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblxuXHRcdEBfbGlua3MgPSBvcHRpb25zLmxpbmtzID8gW3t0aXRsZTogJ0hvbWUnLCBpY29uOiAnaG9tZScsIGFjdGlvbjogLT4gbnVsbH1dXG5cdFx0QF90aXRsZSA9IG9wdGlvbnMudGl0bGUgPyAnTWVudSdcblx0XHRAX2ltYWdlID0gb3B0aW9ucy5pbWFnZSA/IG51bGxcblxuXG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0aGVpZ2h0OiBTY3JlZW4uaGVpZ2h0XG5cdFx0XHR3aWR0aDogMzA0XG5cdFx0XHR2aXNpYmxlOiBmYWxzZVxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiB0aGVtZS5tZW51T3ZlcmxheS5iYWNrZ3JvdW5kQ29sb3Jcblx0XHRcdGFuaW1hdGlvbk9wdGlvbnM6IHtjdXJ2ZTogXCJzcHJpbmcoMzAwLCAzNSwgMClcIn1cblxuXG5cdFx0QHNjcmltID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiAnLicsXG5cdFx0XHRzaXplOiBTY3JlZW4uc2l6ZVxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiAncmdiYSgwLDAsMCwuNiknXG5cdFx0XHRvcGFjaXR5OiAwXG5cdFx0XHR2aXNpYmxlOiBmYWxzZVxuXHRcdFx0YW5pbWF0aW9uT3B0aW9uczpcblx0XHRcdFx0dGltZTogLjI1XG5cblx0XHRAc2NyaW0ub25UYXAgPT4gQGhpZGUoKVxuXHRcdEBvblN3aXBlTGVmdEVuZCA9PiBAaGlkZSgpXG5cblx0XHRAaGVhZGVyID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQFxuXHRcdFx0d2lkdGg6IEB3aWR0aCwgaGVpZ2h0OiAxNzNcblx0XHRcdGltYWdlOiB0aGVtZS51c2VyLmltYWdlXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IHRoZW1lLm1lbnVPdmVybGF5LmhlYWRlci5iYWNrZ3JvdW5kQ29sb3JcblxuXHRcdEB0aXRsZUljb24gPSBuZXcgTGF5ZXJcblx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBAaGVhZGVyXG5cdFx0XHR4OiAxNiwgeTogNDBcblx0XHRcdGhlaWdodDogNjQsIHdpZHRoOiA2NFxuXHRcdFx0Ym9yZGVyUmFkaXVzOiAzMlxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiB0aGVtZS5tZW51T3ZlcmxheS5oZWFkZXIuaWNvblxuXG5cdFx0QHN1YmhlYWRlckV4cGFuZCA9IG5ldyBJY29uXG5cdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQGhlYWRlclxuXHRcdFx0eDogQWxpZ24ucmlnaHQoLTE2KVxuXHRcdFx0eTogQWxpZ24uYm90dG9tKC0xNilcblx0XHRcdGljb246ICdtZW51LWRvd24nXG5cdFx0XHRjb2xvcjogdGhlbWUubWVudU92ZXJsYXkuc3ViaGVhZGVyLmljb25cblxuXHRcdEBzdWJoZWFkZXIgPSBuZXcgdHlwZS5Cb2R5MVxuXHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEBoZWFkZXJcblx0XHRcdHdpZHRoOiBAd2lkdGhcblx0XHRcdHg6IDE2LCB5OiBBbGlnbi5ib3R0b20oLTE4KVxuXHRcdFx0dGV4dDogQF90aXRsZVxuXHRcdFx0Y29sb3I6IHRoZW1lLm1lbnVPdmVybGF5LnN1YmhlYWRlci50ZXh0XG5cblx0XHRsaW5rcyA9IFtdXG5cblx0XHRmb3IgbGluaywgaSBpbiBAX2xpbmtzXG5cdFx0XHRsaW5rc1tpXSA9IG5ldyBNZW51QnV0dG9uXG5cdFx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBAXG5cdFx0XHRcdHg6IDE2LCB5OiAxODkgKyAoNDggKiBpKVxuXHRcdFx0XHR0ZXh0OiBsaW5rLnRpdGxlXG5cdFx0XHRcdGljb246IGxpbmsuaWNvblxuXHRcdFx0XHRhY3Rpb246IGxpbmsuYWN0aW9uXG5cblx0c2hvdzogLT5cblx0XHRAYnJpbmdUb0Zyb250KClcblx0XHRAdmlzaWJsZSA9IHRydWVcblx0XHRAeCA9IC1TY3JlZW4ud2lkdGhcblx0XHRAYW5pbWF0ZVxuXHRcdFx0eDogMFxuXG5cdFx0QHNjcmltLnBsYWNlQmVoaW5kKEApXG5cdFx0QHNjcmltLnZpc2libGUgPSB0cnVlXG5cdFx0QHNjcmltLmFuaW1hdGVcblx0XHRcdG9wYWNpdHk6IDFcblxuXHRoaWRlOiAtPlxuXHRcdEBhbmltYXRlXG5cdFx0XHR4OiAtU2NyZWVuLndpZHRoXG5cblx0XHRAc2NyaW0uYW5pbWF0ZVxuXHRcdFx0b3BhY2l0eTogMFxuXG5cdFx0VXRpbHMuZGVsYXkgLjMsID0+XG5cdFx0XHRAdmlzaWJsZSA9IGZhbHNlXG5cdFx0XHRAc2NyaW0udmlzaWJsZSA9IGZhbHNlXG5cdFx0XHRAc2VuZFRvQmFjaygpXG5cdFx0XHRAc2NyaW0uc2VuZFRvQmFjaygpXG5cblxuXG5cblxuXG5cblxuIyBcdDg4ODg4OGJhICBvbyAgICAgICAgICBkUFxuIyBcdDg4ICAgIGA4YiAgICAgICAgICAgICA4OFxuIyBcdDg4ICAgICA4OCBkUCAuZDg4ODhiLiA4OCAuZDg4ODhiLiAuZDg4ODhiLlxuIyBcdDg4ICAgICA4OCA4OCA4OCcgIGA4OCA4OCA4OCcgIGA4OCA4OCcgIGA4OFxuIyBcdDg4ICAgIC44UCA4OCA4OC4gIC44OCA4OCA4OC4gIC44OCA4OC4gIC44OFxuIyBcdDg4ODg4ODhQICBkUCBgODg4ODhQOCBkUCBgODg4ODhQJyBgODg4OFA4OFxuIyBcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC44OFxuIyBcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZDg4ODhQXG5cblxuXG5leHBvcnRzLkRpYWxvZyA9IGNsYXNzIERpYWxvZyBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IGFwcFxuXHRcdFx0c2l6ZTogU2NyZWVuLnNpemVcblx0XHRcdGJhY2tncm91bmRDb2xvcjogJ3JnYmEoMCwgMCwgMCwgLjUpJ1xuXHRcdFx0b3BhY2l0eTogMFxuXG5cdFx0QF90aXRsZSA9IG9wdGlvbnMudGl0bGUgPyAnRGVmYXVsdCBUaXRsZSdcblx0XHRAX2JvZHkgPSBvcHRpb25zLmJvZHkgPyAnQm9keSB0ZXh0IGdvZXMgaGVyZS4nXG5cdFx0QF9hY2NlcHRUZXh0ID0gb3B0aW9ucy5hY2NlcHRUZXh0ID8gJ2NvbmZpcm0nXG5cdFx0QF9hY2NlcHRBY3Rpb24gPSBvcHRpb25zLmFjY2VwdEFjdGlvbiA/IC0+IG51bGxcblx0XHRAX2RlY2xpbmVUZXh0ID0gb3B0aW9ucy5kZWNsaW5lVGV4dCA/ICcnXG5cdFx0QF9kZWNsaW5lQWN0aW9uID0gb3B0aW9ucy5kZWNsaW5lQWN0aW9uID8gLT4gbnVsbFxuXG5cdFx0QG9uIEV2ZW50cy5UYXAsIChldmVudCkgLT4gZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcblxuXHRcdEBjb250YWluZXIgPSBuZXcgTGF5ZXJcblx0XHRcdG5hbWU6ICdjb250YWluZXInLCBwYXJlbnQ6IEBcblx0XHRcdHg6IEFsaWduLmNlbnRlclxuXHRcdFx0aGVpZ2h0OiAxMjgsIHdpZHRoOiBTY3JlZW4ud2lkdGggLSA4MFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiB0aGVtZS5kaWFsb2cuYmFja2dyb3VuZENvbG9yXG5cdFx0XHRzaGFkb3dYOiAwLCBzaGFkb3dZOiA3LCBzaGFkb3dCbHVyOiAzMFxuXHRcdFx0b3BhY2l0eTogMFxuXHRcdFx0c2hhZG93Q29sb3I6ICdyZ2JhKDAsMCwwLC4zKSdcblxuXHRcdEB0aXRsZSA9IG5ldyB0eXBlLlRpdGxlXG5cdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQGNvbnRhaW5lclxuXHRcdFx0eDogMjQsIHk6IDIwXG5cdFx0XHRmb250U2l6ZTogMTYsIGZvbnRXZWlnaHQ6IDUwMCwgY29sb3I6IHRoZW1lLnRleHQudGl0bGVcblx0XHRcdHRleHQ6IEBfdGl0bGVcblxuXHRcdEBib2R5ID0gbmV3IHR5cGUuU3ViaGVhZFxuXHRcdFx0bmFtZTogJ2JvZHknLCBwYXJlbnQ6IEBjb250YWluZXJcblx0XHRcdHg6IDI0LCB5OiA1MlxuXHRcdFx0d2lkdGg6IEBjb250YWluZXIud2lkdGggLSA0MlxuXHRcdFx0dGV4dDogQF9ib2R5XG5cblx0XHRidXR0b25zWSA9IGlmIEBfYm9keSBpcyAnJyB0aGVuIDEyOCBlbHNlIEBib2R5Lm1heFkgKyAxNlxuXG5cdFx0QGFjY2VwdCA9IG5ldyBCdXR0b25cblx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBAY29udGFpbmVyXG5cdFx0XHR4OiBBbGlnbi5yaWdodCgtMTYpLCB5OiBidXR0b25zWVxuXHRcdFx0dGV4dDogQF9hY2NlcHRUZXh0LnRvVXBwZXJDYXNlKClcblx0XHRcdGFjdGlvbjogQF9hY2NlcHRBY3Rpb25cblxuXHRcdGlmIEBfZGVjbGluZVRleHQgaXNudCAnJ1xuXHRcdFx0QGRlY2xpbmUgPSBuZXcgQnV0dG9uXG5cdFx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBAY29udGFpbmVyXG5cdFx0XHRcdHg6IDAsIHk6IGJ1dHRvbnNZXG5cdFx0XHRcdHRleHQ6IEBfZGVjbGluZVRleHQudG9VcHBlckNhc2UoKVxuXHRcdFx0XHRhY3Rpb246IEBfZGVjbGluZUFjdGlvblxuXG5cdFx0IyBzZXQgcG9zaXRpb25zXG5cdFx0QGNvbnRhaW5lci5oZWlnaHQgPSBAYWNjZXB0Lm1heFkgKyAxMlxuXHRcdEBkZWNsaW5lPy5tYXhYID0gQGFjY2VwdC54IC0gMTZcblx0XHRAY29udGFpbmVyLnkgPSBBbGlnbi5jZW50ZXIoMTYpXG5cblx0XHQjIGFkZCBjbG9zZSBhY3Rpb25zIHRvIGNvbmZpcm0gYW5kIGNhbmNlbFxuXHRcdGZvciBidXR0b24gaW4gW0BhY2NlcHQsIEBkZWNsaW5lXVxuXHRcdFx0YnV0dG9uPy5vblRhcCBAY2xvc2VcblxuXHRcdCMgT04gTE9BRFxuXHRcdEBvcGVuKClcblxuXHRvcGVuOiA9PlxuXHRcdEBhbmltYXRlXG5cdFx0XHRvcGFjaXR5OiAxXG5cdFx0XHRvcHRpb25zOlxuXHRcdFx0XHR0aW1lOiAuMjVcblxuXHRcdEBjb250YWluZXIuYW5pbWF0ZVxuXHRcdFx0b3BhY2l0eTogMVxuXHRcdFx0b3B0aW9uczpcblx0XHRcdFx0dGltZTogLjI1XG5cdFx0XHRcdGRlbGF5OiAuMDVcblxuXHRjbG9zZTogPT5cblx0XHRAY29udGFpbmVyLmFuaW1hdGVcblx0XHRcdG9wYWNpdHk6IDBcblx0XHRcdG9wdGlvbnM6XG5cdFx0XHRcdHRpbWU6IC4yNVxuXG5cdFx0QGFuaW1hdGVcblx0XHRcdG9wYWNpdHk6IDBcblx0XHRcdG9wdGlvbnM6XG5cdFx0XHRcdHRpbWU6IC4yNVxuXG5cdFx0VXRpbHMuZGVsYXkgLjUsID0+IEBkZXN0cm95KClcblxuXG5cblxuXG5cblxuXG4jIFx0IDg4ODg4OGJhICAgICAgICAgICAgIGRQICAgICBkUFxuIyBcdCA4OCAgICBgOGIgICAgICAgICAgICA4OCAgICAgODhcbiMgXHRhODhhYWFhOFAnIGRQICAgIGRQIGQ4ODg4UCBkODg4OFAgLmQ4ODg4Yi4gODhkODg4Yi5cbiMgXHQgODggICBgOGIuIDg4ICAgIDg4ICAgODggICAgIDg4ICAgODgnICBgODggODgnICBgODhcbiMgXHQgODggICAgLjg4IDg4LiAgLjg4ICAgODggICAgIDg4ICAgODguICAuODggODggICAgODhcbiMgXHQgODg4ODg4ODhQIGA4ODg4OFAnICAgZFAgICAgIGRQICAgYDg4ODg4UCcgZFAgICAgZFBcblxuXG5cbmV4cG9ydHMuQnV0dG9uID0gQnV0dG9uID0gY2xhc3MgQnV0dG9uIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cblx0XHRAX3JhaXNlZCA9IG9wdGlvbnMucmFpc2VkID8gZmFsc2Vcblx0XHRAX3R5cGUgPSBpZiBAX3JhaXNlZCB0aGVuICdyYWlzZWQnIGVsc2UgJ2ZsYXQnXG5cdFx0QF9hY3Rpb24gPSBvcHRpb25zLmFjdGlvbiA/IC0+IG51bGxcblxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdG5hbWU6ICcuJ1xuXHRcdFx0d2lkdGg6IDAsIGhlaWdodDogMzZcblx0XHRcdGJvcmRlclJhZGl1czogMlxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiB0aGVtZS5idXR0b25bQF90eXBlXS5iYWNrZ3JvdW5kQ29sb3Jcblx0XHRcdHNoYWRvd1k6IHRoZW1lLmJ1dHRvbltAX3R5cGVdLnNoYWRvd1lcblx0XHRcdHNoYWRvd0JsdXI6IHRoZW1lLmJ1dHRvbltAX3R5cGVdLnNoYWRvd0JsdXJcblx0XHRcdHNoYWRvd0NvbG9yOiB0aGVtZS5idXR0b25bQF90eXBlXS5zaGFkb3dDb2xvclxuXHRcdFx0YW5pbWF0aW9uT3B0aW9uczoge3RpbWU6IC4xNX1cblxuXHRcdEBsYWJlbExheWVyID0gbmV3IHR5cGUuQnV0dG9uXG5cdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQFxuXHRcdFx0Y29sb3I6IHRoZW1lLmJ1dHRvbltAX3R5cGVdLmNvbG9yXG5cdFx0XHR0ZXh0OiBvcHRpb25zLnRleHQgPyAnYnV0dG9uJ1xuXHRcdFx0dGV4dFRyYW5zZm9ybTogJ3VwcGVyY2FzZSdcblx0XHRcdHRleHRBbGlnbjogJ2NlbnRlcidcblx0XHRcdGFuaW1hdGlvbk9wdGlvbnM6IHt0aW1lOiAuMTV9XG5cdFx0XHRwYWRkaW5nOlxuXHRcdFx0XHRsZWZ0OiAxNi41LCByaWdodDogMTYuNVxuXHRcdFx0XHR0b3A6IDksIGJvdHRvbTogMTFcblxuXHRcdEBzaXplID0gQGxhYmVsTGF5ZXIuc2l6ZVxuXHRcdEB4ID0gb3B0aW9ucy54XG5cblx0XHRAb25Ub3VjaFN0YXJ0IChldmVudCkgLT5cblx0XHRcdEBzaG93VG91Y2hlZCgpXG5cdFx0XHRVdGlscy5kZWxheSAxLCA9PiBAcmVzZXQoKVxuXG5cdFx0QG9uVG91Y2hFbmQgKGV2ZW50KSAtPlxuXHRcdFx0QF9hY3Rpb24oKVxuXHRcdFx0QHJlc2V0KClcblxuXG5cdHNob3dUb3VjaGVkOiAtPlxuXHRcdEBsYWJlbExheWVyLmFuaW1hdGUge2JyaWdodG5lc3M6IDExMCwgc2F0dXJhdGU6IDExMH1cblxuXHRcdHN3aXRjaCBAX3R5cGVcblx0XHRcdHdoZW4gJ2ZsYXQnIHRoZW4gQGFuaW1hdGUge2JhY2tncm91bmRDb2xvcjogJ3JnYmEoMCwwLDAsLjA1KSd9XG5cdFx0XHR3aGVuICdyYWlzZWQnXG5cdFx0XHRcdHJpcHBsZShALCBldmVudC5wb2ludCwgQGxhYmVsTGF5ZXIpXG5cdFx0XHRcdEBhbmltYXRlIHtzaGFkb3dZOiAzLCBzaGFkb3dTcHJlYWQ6IDF9XG5cblx0cmVzZXQ6IC0+XG5cdFx0QGxhYmVsTGF5ZXIuYW5pbWF0ZSB7YnJpZ2h0bmVzczogMTAwLCBzYXR1cmF0ZTogMTAwfVxuXHRcdEBiYWNrZ3JvdW5kQ29sb3IgPSB0aGVtZS5idXR0b25bQF90eXBlXS5iYWNrZ3JvdW5kQ29sb3Jcblx0XHRAYW5pbWF0ZVxuXHRcdFx0c2hhZG93WTogdGhlbWUuYnV0dG9uW0BfdHlwZV0uc2hhZG93WVxuXHRcdFx0c2hhZG93U3ByZWFkOiAwXG5cblxuXG5cblxuXG5cbiMgXHQgLmQ4ODg4ODggICAgICAgICAgICAgZFAgICBvbyAgICAgICAgICAgICAgICAgICAgODg4ODg4YmEgICAgICAgICAgICAgZFAgICAgIGRQXG4jIFx0ZDgnICAgIDg4ICAgICAgICAgICAgIDg4ICAgICAgICAgICAgICAgICAgICAgICAgIDg4ICAgIGA4YiAgICAgICAgICAgIDg4ICAgICA4OFxuIyBcdDg4YWFhYWE4OGEgLmQ4ODg4Yi4gZDg4ODhQIGRQIC5kODg4OGIuIDg4ZDg4OGIuIGE4OGFhYWE4UCcgZFAgICAgZFAgZDg4ODhQIGQ4ODg4UCAuZDg4ODhiLiA4OGQ4ODhiLlxuIyBcdDg4ICAgICA4OCAgODgnICBgXCJcIiAgIDg4ICAgODggODgnICBgODggODgnICBgODggIDg4ICAgYDhiLiA4OCAgICA4OCAgIDg4ICAgICA4OCAgIDg4JyAgYDg4IDg4JyAgYDg4XG4jIFx0ODggICAgIDg4ICA4OC4gIC4uLiAgIDg4ICAgODggODguICAuODggODggICAgODggIDg4ICAgIC44OCA4OC4gIC44OCAgIDg4ICAgICA4OCAgIDg4LiAgLjg4IDg4ICAgIDg4XG4jIFx0ODggICAgIDg4ICBgODg4ODhQJyAgIGRQICAgZFAgYDg4ODg4UCcgZFAgICAgZFAgIDg4ODg4ODg4UCBgODg4ODhQJyAgIGRQICAgICBkUCAgIGA4ODg4OFAnIGRQICAgIGRQXG5cblxuZXhwb3J0cy5BY3Rpb25CdXR0b24gPSBBY3Rpb25CdXR0b24gPSBjbGFzcyBBY3Rpb25CdXR0b24gZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblxuXHRcdEBfcmFpc2VkID0gb3B0aW9ucy5yYWlzZWQgPyBmYWxzZVxuXHRcdEBfYWN0aW9uID0gb3B0aW9ucy5hY3Rpb24gPyAtPiBudWxsXG5cdFx0QF9pY29uID0gb3B0aW9ucy5pY29uID8gJ3BsdXMnXG5cblx0XHRzdXBlciBfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRuYW1lOiAnLidcblx0XHRcdHg6IEFsaWduLnJpZ2h0KC0xNiksIHk6IEFsaWduLmJvdHRvbSgtMTcpXG5cdFx0XHR3aWR0aDogNjQsIGhlaWdodDogNjQsIGJvcmRlclJhZGl1czogMzJcblx0XHRcdGJhY2tncm91bmRDb2xvcjogdGhlbWUuZmFiLmJhY2tncm91bmRDb2xvclxuXHRcdFx0c2hhZG93WTogMiwgc2hhZG93Qmx1cjogM1xuXHRcdFx0c2hhZG93Q29sb3I6ICdyZ2JhKDAsMCwwLC4yNSknXG5cdFx0XHRhbmltYXRpb25PcHRpb25zOiB7dGltZTogLjE1fVxuXG5cdFx0aWYgYXBwLmJvdHRvbU5hdj8gdGhlbiBAeSAtPSBhcHAuYm90dG9tTmF2LmhlaWdodFxuXG5cdFx0QGljb25MYXllciA9IG5ldyBJY29uXG5cdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQFxuXHRcdFx0eDogQWxpZ24uY2VudGVyLCB5OiBBbGlnbi5jZW50ZXJcblx0XHRcdGljb246IEBfaWNvbiwgY29sb3I6IHRoZW1lLmZhYi5jb2xvclxuXG5cdFx0QG9uVG91Y2hTdGFydCAoZXZlbnQpIC0+XG5cdFx0XHRAc2hvd1RvdWNoZWQoKVxuXHRcdFx0VXRpbHMuZGVsYXkgMSwgPT4gQHJlc2V0KClcblxuXHRcdEBvblRvdWNoRW5kIChldmVudCkgLT5cblx0XHRcdEBfYWN0aW9uKClcblx0XHRcdEByZXNldCgpXG5cblx0XHRhcHAuYWN0aW9uQnV0dG9uID0gQFxuXG5cblx0c2hvd1RvdWNoZWQ6IC0+XG5cdFx0cmlwcGxlKEAsIGV2ZW50LnBvaW50LCBAaWNvbkxheWVyKVxuXHRcdEBhbmltYXRlIHtzaGFkb3dZOiAzLCBzaGFkb3dTcHJlYWQ6IDF9XG5cblx0cmVzZXQ6IC0+XG5cdFx0QGFuaW1hdGVcblx0XHRcdHNoYWRvd1k6IDJcblx0XHRcdHNoYWRvd1NwcmVhZDogMFxuXG5cblxuXG5cblxuXG5cblxuIyBcdCAuODg4ODguICAgICAgICAgICBvbyAgICAgICBkUCBkUCAgICAgICAgb28gICAgICAgICAgICBkUFxuIyBcdGQ4JyAgIGA4OCAgICAgICAgICAgICAgICAgICA4OCA4OCAgICAgICAgICAgICAgICAgICAgICA4OFxuIyBcdDg4ICAgICAgICA4OGQ4ODhiLiBkUCAuZDg4OGI4OCA4OCAgICAgICAgZFAgLmQ4ODg4Yi4gZDg4ODhQXG4jIFx0ODggICBZUDg4IDg4JyAgYDg4IDg4IDg4JyAgYDg4IDg4ICAgICAgICA4OCBZOG9vb29vLiAgIDg4XG4jIFx0WTguICAgLjg4IDg4ICAgICAgIDg4IDg4LiAgLjg4IDg4ICAgICAgICA4OCAgICAgICA4OCAgIDg4XG4jIFx0IGA4ODg4OCcgIGRQICAgICAgIGRQIGA4ODg4OFA4IDg4ODg4ODg4UCBkUCBgODg4ODhQJyAgIGRQXG5cbmV4cG9ydHMuR3JpZExpc3QgPSBHcmlkTGlzdCA9IGNsYXNzIEdyaWRMaXN0IGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cblx0XHRAX2NvbHVtbnMgPSBvcHRpb25zLmNvbHVtbnMgPyAyXG5cblx0XHRzdXBlciBfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRuYW1lOiAnLidcblx0XHRcdHdpZHRoOiBTY3JlZW4ud2lkdGhcblx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXG5cdFx0QHRpbGVzID0gW11cblx0XHRAdGlsZVdpZHRoID0gKEB3aWR0aCAtIDI0KSAvIEBfY29sdW1uc1xuXHRcdEB0aWxlSGVpZ2h0ID0gb3B0aW9ucy50aWxlSGVpZ2h0ID8gU2NyZWVuLndpZHRoIC8gQF9jb2x1bW5zXG5cblx0YWRkVGlsZTogKHRpbGUpIC0+XG5cdFx0dGlsZS5pID0gQHRpbGVzLmxlbmd0aFxuXHRcdEB0aWxlcy5wdXNoKHRpbGUpXG5cblx0XHR0aWxlLnggPSA4ICsgKEB0aWxlV2lkdGggKyA4KSAqICh0aWxlLmkgJSBAX2NvbHVtbnMpXG5cdFx0dGlsZS55ID0gOCArIChAdGlsZUhlaWdodCArIDgpICogTWF0aC5mbG9vcih0aWxlLmkgLyBAX2NvbHVtbnMpXG5cblx0XHRAaGVpZ2h0ID0gXy5sYXN0KEB0aWxlcykubWF4WVxuXG5cdFx0aWYgQHBhcmVudD8ucGFyZW50Py5jb250ZW50PyB0aGVuIEBwYXJlbnQucGFyZW50LnVwZGF0ZUNvbnRlbnQoKVxuXG5cdHJlbW92ZVRpbGU6ICh0aWxlKSAtPlxuXHRcdF8ucHVsbChAdGlsZXMsIHRpbGUpXG5cdFx0dGlsZS5kZXN0cm95KClcblx0XHRAcmVwb3NpdGlvblRpbGVzKClcblxuXHRyZXBvc2l0aW9uVGlsZXM6IC0+XG5cdFx0Zm9yIHRpbGUsIGkgaW4gQHRpbGVzXG5cdFx0XHR0aWxlLmkgPSBpXG5cdFx0XHR0aWxlLmFuaW1hdGVcblx0XHRcdFx0eDogOCArIChAdGlsZVdpZHRoICsgOCkgKiAodGlsZS5pICUgQF9jb2x1bW5zKVxuXHRcdFx0XHR5OiA4ICsgKEB0aWxlSGVpZ2h0ICsgOCkgKiBNYXRoLmZsb29yKHRpbGUuaSAvIEBfY29sdW1ucylcblx0XHRAaGVpZ2h0ID0gXy5sYXN0KEB0aWxlcykubWF4WVxuXG5cdFx0aWYgQHBhcmVudD8ucGFyZW50Py5jb250ZW50PyB0aGVuIEBwYXJlbnQucGFyZW50LnVwZGF0ZUNvbnRlbnQoKVxuXG5cblxuXG5cblxuXG5cblxuXG4jIFx0ZDg4ODg4OFAgb28gZFBcbiMgXHQgICA4OCAgICAgICA4OFxuIyBcdCAgIDg4ICAgIGRQIDg4IC5kODg4OGIuXG4jIFx0ICAgODggICAgODggODggODhvb29vZDhcbiMgXHQgICA4OCAgICA4OCA4OCA4OC4gIC4uLlxuIyBcdCAgIGRQICAgIGRQIGRQIGA4ODg4OFAnXG5cblxuZXhwb3J0cy5UaWxlID0gVGlsZSA9IGNsYXNzIFRpbGUgZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblxuXHRcdEBfaGVhZGVyID0gb3B0aW9ucy5oZWFkZXIgPyBmYWxzZVxuXHRcdEBfZm9vdGVyID0gb3B0aW9ucy5mb290ZXIgPyBmYWxzZVxuXHRcdEBfYWN0aW9uID0gb3B0aW9ucy5hY3Rpb24gPyAtPiBudWxsXG5cdFx0QF9oZWFkZXJBY3Rpb24gPSBvcHRpb25zLmhlYWRlckFjdGlvbiA/IC0+IG51bGxcblx0XHRAX2Zvb3RlckFjdGlvbiA9IG9wdGlvbnMuZm9vdGVyQWN0aW9uID8gLT4gbnVsbFxuXG5cdFx0aWYgQF9oZWFkZXIgYW5kIEBfZm9vdGVyIHRoZW4gdGhyb3cgJ1RpbGUgY2Fubm90IGhhdmUgYm90aCBhIGhlYWRlciBhbmQgYSBmb290ZXIuJ1xuXG5cdFx0QF9pY29uID0gb3B0aW9ucy5pY29uXG5cdFx0QGdyaWRMaXN0ID0gb3B0aW9ucy5ncmlkTGlzdCA/IHRocm93ICdUaWxlIG5lZWRzIGEgZ3JpZCBwcm9wZXJ0eS4nXG5cblx0XHRzdXBlciBfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQGdyaWRMaXN0XG5cdFx0XHR3aWR0aDogQGdyaWRMaXN0LnRpbGVXaWR0aFxuXHRcdFx0aGVpZ2h0OiBAZ3JpZExpc3QudGlsZUhlaWdodFxuXHRcdFx0YW5pbWF0aW9uT3B0aW9uczoge3RpbWU6IC4zfVxuXG5cdFx0QG9uVG91Y2hTdGFydCAoZXZlbnQpIC0+XG5cdFx0XHRpZiBAZ3JpZExpc3QucGFyZW50Py5wYXJlbnQ/LmNvbnRlbnQgYW5kIEBncmlkTGlzdC5wYXJlbnQ/LnBhcmVudD8uaXNNb3ZpbmcgaXMgZmFsc2Vcblx0XHRcdFx0cmlwcGxlKEAsIGV2ZW50LnBvaW50LCBAaGVhZGVyLCBvcHRpb25zLnJpcHBsZUNvbG9yID8gJ3JnYmEoMCwwLDAsLjEpJylcblxuXHRcdEBvblRhcCBAX2FjdGlvblxuXHRcdEBvblRhcCAoZXZlbnQpIC0+IGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXG5cblx0XHRpZiBAX2hlYWRlciBvciBAX2Zvb3RlclxuXHRcdFx0QGhlYWRlciA9IG5ldyBMYXllclxuXHRcdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQFxuXHRcdFx0XHR5OiBpZiBAX2Zvb3RlciB0aGVuIEFsaWduLmJvdHRvbSgpXG5cdFx0XHRcdHdpZHRoOiBAd2lkdGhcblx0XHRcdFx0aGVpZ2h0OiBpZiBvcHRpb25zLnN1cHBvcnQgdGhlbiA2OCBlbHNlIDQ4XG5cdFx0XHRcdGJhY2tncm91bmRDb2xvcjogb3B0aW9ucy5iYWNrZ3JvdW5kQ29sb3IgPyAncmdiYSgwLDAsMCwuNSknXG5cblx0XHRcdEBoZWFkZXIub25Ub3VjaFN0YXJ0IChldmVudCkgLT4gcmlwcGxlKEAsIGV2ZW50LnBvaW50LCBAdGl0bGUpXG5cblx0XHRcdGlmIEBfZm9vdGVyIHRoZW4gQGhlYWRlci5vblRhcCBAX2Zvb3RlckFjdGlvblxuXHRcdFx0ZWxzZSBAaGVhZGVyLm9uVGFwIEBfaGVhZGVyQWN0aW9uXG5cblx0XHRcdEBoZWFkZXIub25UYXAgKGV2ZW50KSAtPiBldmVudC5zdG9wUHJvcGFnYXRpb24oKVxuXG5cdFx0XHRpZiBvcHRpb25zLnRpdGxlXG5cdFx0XHRcdEBoZWFkZXIudGl0bGUgPSBuZXcgdHlwZS5SZWd1bGFyXG5cdFx0XHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEBoZWFkZXJcblx0XHRcdFx0XHR4OiA4LCB5OiBpZiBvcHRpb25zLnN1cHBvcnQgdGhlbiAxMiBlbHNlIEFsaWduLmNlbnRlcigpXG5cdFx0XHRcdFx0Y29sb3I6IEBjb2xvclxuXHRcdFx0XHRcdHRleHQ6IG9wdGlvbnMudGl0bGUgPyAnVHdvIExpbmUnXG5cblx0XHRcdFx0aWYgb3B0aW9ucy5zdXBwb3J0XG5cdFx0XHRcdFx0QGhlYWRlci5zdXBwb3J0ID0gbmV3IFRleHRMYXllclxuXHRcdFx0XHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEBoZWFkZXJcblx0XHRcdFx0XHRcdHg6IDgsIHk6IDM1XG5cdFx0XHRcdFx0XHRmb250U2l6ZTogMTJcblx0XHRcdFx0XHRcdGZvbnRGYW1pbHk6ICdSb2JvdG8nXG5cdFx0XHRcdFx0XHRjb2xvcjogQGNvbG9yXG5cdFx0XHRcdFx0XHR0ZXh0OiBvcHRpb25zLnN1cHBvcnQgPyAnU3VwcG9ydCB0ZXh0J1xuXG5cdFx0XHRpZiBvcHRpb25zLmljb25cblx0XHRcdFx0QGhlYWRlci5pY29uID0gbmV3IEljb25cblx0XHRcdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQGhlYWRlclxuXHRcdFx0XHRcdHg6IEFsaWduLnJpZ2h0KC0xMiksIHk6IGlmIG9wdGlvbnMuc3VwcG9ydCB0aGVuIDIwIGVsc2UgQWxpZ24uY2VudGVyKClcblx0XHRcdFx0XHRpY29uOiBvcHRpb25zLmljb25cblx0XHRcdFx0XHRjb2xvcjogQGNvbG9yXG5cblx0XHRAaSA9IHVuZGVmaW5lZFxuXHRcdEBncmlkTGlzdC5hZGRUaWxlKEApXG5cblxuXG5cbiMgXHQuZDg4ODg4YiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZFAgICAgICAgZFBcbiMgXHQ4OC4gICAgXCInICAgICAgICAgICAgICAgICAgICAgICAgICAgIDg4ICAgICAgIDg4XG4jIFx0YFk4ODg4OGIuIDg4ZDg4OGIuIC5kODg4OGIuIC5kODg4OGIuIDg4ICAuZFAgIDg4ZDg4OGIuIC5kODg4OGIuIDg4ZDg4OGIuXG4jIFx0ICAgICAgYDhiIDg4JyAgYDg4IDg4JyAgYDg4IDg4JyAgYFwiXCIgODg4ODhcIiAgIDg4JyAgYDg4IDg4JyAgYDg4IDg4JyAgYDg4XG4jIFx0ZDgnICAgLjhQIDg4ICAgIDg4IDg4LiAgLjg4IDg4LiAgLi4uIDg4ICBgOGIuIDg4LiAgLjg4IDg4LiAgLjg4IDg4XG4jIFx0IFk4ODg4OFAgIGRQICAgIGRQIGA4ODg4OFA4IGA4ODg4OFAnIGRQICAgYFlQIDg4WTg4ODgnIGA4ODg4OFA4IGRQXG5cbmV4cG9ydHMuU25hY2tiYXIgPSBTbmFja2JhciA9IGNsYXNzIFNuYWNrYmFyIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cblx0XHRAX3RpdGxlID0gb3B0aW9ucy50aXRsZSA/ICdTbmFja2Jhcidcblx0XHRAX3RpbWVvdXQgPSBvcHRpb25zLnRpbWVvdXQgPyA0XG5cdFx0QF9hY3Rpb24gPSBvcHRpb25zLmFjdGlvblxuXG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0bmFtZTogJy4nXG5cdFx0XHR3aWR0aDogYXBwLndpZHRoXG5cdFx0XHRjbGlwOiB0cnVlXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IHRoZW1lLnNuYWNrYmFyLmJhY2tncm91bmRDb2xvclxuXHRcdFx0YW5pbWF0aW9uT3B0aW9uczoge3RpbWU6IC4yNX1cblxuXHRcdHRpdGxlV2lkdGggPSBAd2lkdGggLSA0OFxuXG5cdFx0aWYgQF9hY3Rpb24/XG5cdFx0XHRAYWN0aW9uID0gbmV3IEJ1dHRvblxuXHRcdFx0XHRwYXJlbnQ6IEBcblx0XHRcdFx0eDogQWxpZ24ucmlnaHQoLTgpLCB5OiA0XG5cdFx0XHRcdGNvbG9yOiBAX2FjdGlvbi5jb2xvciA/IHRoZW1lLmNvbG9ycy5wcmltYXJ5LmxpZ2h0XG5cdFx0XHRcdHRleHQ6IEBfYWN0aW9uLnRpdGxlLnRvVXBwZXJDYXNlKClcblx0XHRcdFx0YWN0aW9uOiBAX2FjdGlvbi5hY3Rpb25cblxuXHRcdFx0QGFjdGlvbi5vblRhcCBAaGlkZVxuXHRcdFx0dGl0bGVXaWR0aCA9IEBhY3Rpb24ueCAtIDggLSAyNFxuXG5cdFx0QHRleHRMYWJlbCA9IG5ldyB0eXBlLkJvZHkxXG5cdFx0XHRuYW1lOiAnVGl0bGUnLCBwYXJlbnQ6IEBcblx0XHRcdHg6IDI0LCB5OiAxNFxuXHRcdFx0d2lkdGg6IHRpdGxlV2lkdGhcblx0XHRcdHRleHQ6IEBfdGl0bGVcblx0XHRcdGNvbG9yOiB0aGVtZS5zbmFja2Jhci5jb2xvclxuXG5cdFx0QGhlaWdodCA9IEB0ZXh0TGFiZWwubWF4WSArIDE0XG5cdFx0QGFjdGlvbj8ueSA9IEFsaWduLmNlbnRlclxuXHRcdEB5ID0gaWYgYXBwLmJvdHRvbU5hdj8gdGhlbiBBbGlnbi5ib3R0b20oLWFwcC5ib3R0b21OYXYuaGVpZ2h0ICsgQGhlaWdodCkgPyBBbGlnbi5ib3R0b20oQGhlaWdodClcblxuXHRcdFV0aWxzLmRlbGF5IEBfdGltZW91dCwgQGhpZGVcblxuXHRcdEBzaG93KClcblxuXHRzaG93OiA9PlxuXHRcdGlmIGFwcC5zbmFja2Jhcj9cblx0XHRcdGFwcC5zbmFja2Jhci5oaWRlKClcblx0XHRcdFV0aWxzLmRlbGF5IDEsIEBzaG93XG5cdFx0XHRyZXR1cm5cblx0XHRlbHNlXG5cdFx0XHRhcHAuc25hY2tiYXIgPSBAXG5cdFx0XHRhcHAuYWN0aW9uQnV0dG9uPy5hbmltYXRlIHt5OiBhcHAuYWN0aW9uQnV0dG9uLnkgLSBAaGVpZ2h0LCBvcHRpb25zOiBAYW5pbWF0aW9uT3B0aW9uc31cblx0XHRcdEBhbmltYXRlIHt5OiBAeSAtIEBoZWlnaHR9XG5cblx0aGlkZTogPT5cblx0XHRhcHAuc25hY2tiYXIgPSB1bmRlZmluZWRcblx0XHRhcHAuYWN0aW9uQnV0dG9uPy5hbmltYXRlIHt5OiBhcHAuYWN0aW9uQnV0dG9uLnkgKyBAaGVpZ2h0LCBvcHRpb25zOiBAYW5pbWF0aW9uT3B0aW9uc31cblx0XHRAYW5pbWF0ZSB7aGVpZ2h0OiAwLCB5OiBAeSArIEBoZWlnaHR9XG5cdFx0VXRpbHMuZGVsYXkgLjUsID0+IEBkZXN0cm95KClcblxuXG5cblxuXG4jIFx0ODg4ODg4YmEgICAgICAgICAgICAgZFAgICBvbyAuODg4OGIgb28gICAgICAgICAgICAgICAgICAgICBkUCAgIG9vXG4jIFx0ODggICAgYDhiICAgICAgICAgICAgODggICAgICA4OCAgIFwiICAgICAgICAgICAgICAgICAgICAgICAgODhcbiMgXHQ4OCAgICAgODggLmQ4ODg4Yi4gZDg4ODhQIGRQIDg4YWFhICBkUCAuZDg4ODhiLiAuZDg4ODhiLiBkODg4OFAgZFAgLmQ4ODg4Yi4gODhkODg4Yi5cbiMgXHQ4OCAgICAgODggODgnICBgODggICA4OCAgIDg4IDg4ICAgICA4OCA4OCcgIGBcIlwiIDg4JyAgYDg4ICAgODggICA4OCA4OCcgIGA4OCA4OCcgIGA4OFxuIyBcdDg4ICAgICA4OCA4OC4gIC44OCAgIDg4ICAgODggODggICAgIDg4IDg4LiAgLi4uIDg4LiAgLjg4ICAgODggICA4OCA4OC4gIC44OCA4OCAgICA4OFxuIyBcdGRQICAgICBkUCBgODg4ODhQJyAgIGRQICAgZFAgZFAgICAgIGRQIGA4ODg4OFAnIGA4ODg4OFA4ICAgZFAgICBkUCBgODg4ODhQJyBkUCAgICBkUFxuXG5cblxuZXhwb3J0cy5Ob3RpZmljYXRpb24gPSBOb3RpZmljYXRpb24gPSBjbGFzcyBOb3RpZmljYXRpb24gZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblxuXHRcdEBfdGl0bGUgPSBvcHRpb25zLnRpdGxlID8gJ05vdGlmaWNhdGlvbidcblx0XHRAX2JvZHkgPSBvcHRpb25zLmJvZHkgPyAnVGhpcyBpcyBhIG5vdGlmaWNhdGlvbi4nXG5cdFx0QF9pY29uID0gb3B0aW9ucy5pY29uID8gdW5kZWZpbmVkXG5cdFx0QF9pY29uQ29sb3IgPSBvcHRpb25zLmljb25Db2xvciA/IHRoZW1lLnRleHQuc2Vjb25kYXJ5XG5cdFx0QF9pY29uQmFja2dyb3VuZENvbG9yID0gb3B0aW9ucy5pY29uQmFja2dyb3VuZENvbG9yID8gdGhlbWUuc2Vjb25kYXJ5XG5cdFx0QF90aW1lID0gb3B0aW9ucy50aW1lID8gbmV3IERhdGUoKVxuXHRcdCNUT0RPOiByZXBsYWNlIGFjdGlvbjEgLyBhY3Rpb24yIHdpdGggQGFjdGlvbnMgKGFycmF5KVxuXHRcdEBfYWN0aW9uMSA9IG9wdGlvbnMuYWN0aW9uMVxuXHRcdEBfYWN0aW9uMiA9IG9wdGlvbnMuYWN0aW9uMlxuXHRcdEBfdGltZW91dCA9IG9wdGlvbnMudGltZW91dCA/IDVcblxuXHRcdCMgYWN0aW9ucyBzaG91bGQgYmUge3RpdGxlOiAnYXJjaGl2ZScsIGljb246ICdhcmNoaXZlJ31cblxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdG5hbWU6IG9wdGlvbnMubmFtZSA/ICcuJywgcGFyZW50OiBhcHBcblx0XHRcdHdpZHRoOiAzNDQsIGJvcmRlclJhZGl1czogMlxuXHRcdFx0eDogQWxpZ24uY2VudGVyLCB5OiBpZiBhcHAubm90aWZpY2F0aW9ucy5sZW5ndGggPiAwIHRoZW4gXy5sYXN0KGFwcC5ub3RpZmljYXRpb25zKS5tYXhZICsgOCBlbHNlIGFwcC5oZWFkZXIubWF4WSArIDRcblx0XHRcdGJhY2tncm91bmRDb2xvcjogdGhlbWUuZGlhbG9nLmJhY2tncm91bmRDb2xvclxuXHRcdFx0c2hhZG93WDogMCwgc2hhZG93WTogMiwgc2hhZG93Qmx1cjogM1xuXHRcdFx0b3BhY2l0eTogMCwgc2hhZG93Q29sb3I6ICdyZ2JhKDAsMCwwLC4zKSdcblx0XHRcdGFuaW1hdGlvbk9wdGlvbnM6IHt0aW1lOiAuMjV9XG5cblx0XHRhcHAubm90aWZpY2F0aW9ucy5wdXNoKEApXG5cblx0XHRAaWNvbkxheWVyID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiAnSWNvbiBDb250YWluZXInXG5cdFx0XHRwYXJlbnQ6IEBcblx0XHRcdHg6IDEyLCB5OiAxMlxuXHRcdFx0aGVpZ2h0OiA0MCwgd2lkdGg6IDQwLCBib3JkZXJSYWRpdXM6IDIwXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IEBfaWNvbkJhY2tncm91bmRDb2xvclxuXG5cdFx0aWYgQF9pY29uXG5cdFx0XHRAaWNvbiA9IG5ldyBJY29uXG5cdFx0XHRcdG5hbWU6ICdJY29uJ1xuXHRcdFx0XHRwYXJlbnQ6IEBpY29uTGF5ZXJcblx0XHRcdFx0eDogQWxpZ24uY2VudGVyLCB5OiBBbGlnbi5jZW50ZXJcblx0XHRcdFx0Y29sb3I6IEBfaWNvbkNvbG9yXG5cdFx0XHRcdGljb246IEBfaWNvblxuXG5cdFx0QHRpdGxlID0gbmV3IHR5cGUuU3ViaGVhZFxuXHRcdFx0bmFtZTogJ1RpdGxlJ1xuXHRcdFx0cGFyZW50OiBAXG5cdFx0XHR4OiA2NCwgeTogOFxuXHRcdFx0d2lkdGg6IEB3aWR0aCAtIDcyXG5cdFx0XHRjb2xvcjogJ3JnYmEoMCwwLDAsLjg3KSdcblx0XHRcdHRleHQ6IEBfdGl0bGVcblxuXHRcdEBib2R5ID0gbmV3IHR5cGUuQm9keTFcblx0XHRcdG5hbWU6ICdCb2R5J1xuXHRcdFx0cGFyZW50OiBAXG5cdFx0XHR4OiA2NCwgeTogQHRpdGxlLm1heFlcblx0XHRcdHdpZHRoOiBAd2lkdGggLSA3MlxuXHRcdFx0dGV4dDogQF9ib2R5XG5cblx0XHRAZGF0ZSA9IG5ldyB0eXBlLkNhcHRpb25cblx0XHRcdG5hbWU6ICdEYXRlJ1xuXHRcdFx0cGFyZW50OiBAXG5cdFx0XHR4OiBBbGlnbi5yaWdodCgtOSksIHk6IDE1XG5cdFx0XHR0ZXh0OiBAX3RpbWUudG9Mb2NhbGVUaW1lU3RyaW5nKFtdLCBob3VyOiBcIm51bWVyaWNcIiwgbWludXRlOiBcIjItZGlnaXRcIilcblxuXHRcdEBoZWlnaHQgPSBfLmNsYW1wKEBib2R5Lm1heFkgKyAxMywgNjQsIEluZmluaXR5KVxuXG5cdFx0aWYgQF9hY3Rpb24xP1xuXG5cdFx0XHRkaXZpZGVyID0gbmV3IERpdmlkZXJcblx0XHRcdFx0bmFtZTogJ0RpdmlkZXInXG5cdFx0XHRcdHBhcmVudDogQFxuXHRcdFx0XHR4OiA2NCwgeTogQGJvZHkubWF4WSArIDExXG5cdFx0XHRcdHdpZHRoOiBAd2lkdGggLSA2NFxuXG5cdFx0XHRpZiBAX2FjdGlvbjE/XG5cdFx0XHRcdEBhY3Rpb24xID0gbmV3IExheWVyXG5cdFx0XHRcdFx0bmFtZTogJ0FjdGlvbiAxJywgcGFyZW50OiBAXG5cdFx0XHRcdFx0eDogNjQsIHk6IGRpdmlkZXIubWF4WSArIDExXG5cdFx0XHRcdFx0d2lkdGg6IDgwLCBoZWlnaHQ6IDI0LCBiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblxuXHRcdFx0XHRAYWN0aW9uMS5pY29uID0gbmV3IEljb25cblx0XHRcdFx0XHRuYW1lOiAnSWNvbicsIHBhcmVudDogQGFjdGlvbjFcblx0XHRcdFx0XHRpY29uOiBAX2FjdGlvbjEuaWNvblxuXHRcdFx0XHRcdHdpZHRoOiAxOCwgaGVpZ2h0OiAxOFxuXHRcdFx0XHRcdGNvbG9yOiAncmdiYSgwLDAsMCwuNTQpJ1xuXG5cdFx0XHRcdEBhY3Rpb24xLmxhYmVsID0gbmV3IHR5cGUuQ2FwdGlvblxuXHRcdFx0XHRcdG5hbWU6ICdMYWJlbCcsIHBhcmVudDogQGFjdGlvbjFcblx0XHRcdFx0XHR4OiBAYWN0aW9uMS5pY29uLm1heFggKyA4XG5cdFx0XHRcdFx0Zm9udFNpemU6IDEzXG5cdFx0XHRcdFx0dGV4dDogQF9hY3Rpb24xLnRpdGxlLnRvVXBwZXJDYXNlKClcblxuXHRcdFx0XHRAYWN0aW9uMS53aWR0aCA9IEBhY3Rpb24xLmxhYmVsLm1heFhcblxuXHRcdFx0XHQjQGFjdGlvbjEub25Ub3VjaFN0YXJ0IChldmVudCkgLT4gcmlwcGxlKEAsIGV2ZW50LnBvaW50LCBAaWNvbiwgbmV3IENvbG9yKHRoZW1lLnNlY29uZGFyeSkuYWxwaGEoLjMpKVxuXHRcdFx0XHRAYWN0aW9uMS5vblRhcCBAY2xvc2Vcblx0XHRcdFx0aWYgQF9hY3Rpb24xLmFjdGlvbiB0aGVuIEBhY3Rpb24xLm9uVGFwID0+IFV0aWxzLmRlbGF5IC4yNSwgXy5iaW5kKEBfYWN0aW9uMS5hY3Rpb24sIEApXG5cblxuXHRcdFx0XHRpZiBAX2FjdGlvbjI/XG5cdFx0XHRcdFx0QGFjdGlvbjIgPSBuZXcgTGF5ZXJcblx0XHRcdFx0XHRcdG5hbWU6ICdBY3Rpb24gMicsIHBhcmVudDogQFxuXHRcdFx0XHRcdFx0eDogQGFjdGlvbjEubWF4WCArIDQ1LCB5OiBkaXZpZGVyLm1heFkgKyAxMVxuXHRcdFx0XHRcdFx0d2lkdGg6IDgwLCBoZWlnaHQ6IDI0LCBiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblxuXHRcdFx0XHRcdEBhY3Rpb24yLmljb24gPSBuZXcgSWNvblxuXHRcdFx0XHRcdFx0bmFtZTogJ0ljb24nLCBwYXJlbnQ6IEBhY3Rpb24yXG5cdFx0XHRcdFx0XHRpY29uOiBAX2FjdGlvbjIuaWNvblxuXHRcdFx0XHRcdFx0d2lkdGg6IDE4LCBoZWlnaHQ6IDE4XG5cdFx0XHRcdFx0XHRjb2xvcjogJ3JnYmEoMCwwLDAsLjU0KSdcblxuXHRcdFx0XHRcdEBhY3Rpb24yLmxhYmVsID0gbmV3IHR5cGUuQ2FwdGlvblxuXHRcdFx0XHRcdFx0bmFtZTogJ0xhYmVsJywgcGFyZW50OiBAYWN0aW9uMlxuXHRcdFx0XHRcdFx0eDogQGFjdGlvbjIuaWNvbi5tYXhYICsgOFxuXHRcdFx0XHRcdFx0Zm9udFNpemU6IDEzXG5cdFx0XHRcdFx0XHR0ZXh0OiBAX2FjdGlvbjIudGl0bGUudG9VcHBlckNhc2UoKVxuXG5cdFx0XHRcdFx0QGFjdGlvbjIud2lkdGggPSBAYWN0aW9uMi5sYWJlbC5tYXhYXG5cblx0XHRcdFx0XHQjQGFjdGlvbjIub25Ub3VjaFN0YXJ0IChldmVudCkgLT4gcmlwcGxlKEAsIGV2ZW50LnBvaW50LCBAaWNvbiwgbmV3IENvbG9yKHRoZW1lLnNlY29uZGFyeSkuYWxwaGEoLjMpKVxuXHRcdFx0XHRcdEBhY3Rpb24yLm9uVGFwIEBjbG9zZVxuXHRcdFx0XHRcdGlmIEBfYWN0aW9uMi5hY3Rpb24gdGhlbiBAYWN0aW9uMi5vblRhcCA9PiBVdGlscy5kZWxheSAuMjUsIF8uYmluZChAX2FjdGlvbjIuYWN0aW9uLCBAKVxuXG5cblx0XHRcdFx0QGhlaWdodCA9IGRpdmlkZXIubWF4WSArIDQ3XG5cblx0XHRAb3BlbigpXG5cblx0XHRAb25Td2lwZUxlZnRFbmQgPT4gQGNsb3NlKCdsZWZ0Jylcblx0XHRAb25Td2lwZVJpZ2h0RW5kID0+IEBjbG9zZSgncmlnaHQnKVxuXHRcdFV0aWxzLmRlbGF5IEBfdGltZW91dCwgPT4gaWYgbm90IEBjbG9zZWQgdGhlbiBAY2xvc2UoJ3JpZ2h0JylcblxuXHRvcGVuOiA9PlxuXHRcdEBhbmltYXRlIHtvcGFjaXR5OiAxfVxuXG5cdGNsb3NlOiAoZGlyZWN0aW9uKSA9PlxuXHRcdF8ucHVsbChhcHAubm90aWZpY2F0aW9ucywgQClcblxuXHRcdEBhbmltYXRlXG5cdFx0XHR4OiBpZiBkaXJlY3Rpb24gaXMgJ2xlZnQnIHRoZW4gLVNjcmVlbi53aWR0aCBlbHNlIFNjcmVlbi53aWR0aFxuXHRcdFx0b3BhY2l0eTogMFxuXG5cdFx0Zm9yIG5vdGlmaWNhdGlvbiBpbiBhcHAubm90aWZpY2F0aW9uc1xuXHRcdFx0aWYgbm90aWZpY2F0aW9uLnkgPiBAbWF4WVxuXHRcdFx0XHRub3RpZmljYXRpb24uYW5pbWF0ZSB7eTogbm90aWZpY2F0aW9uLnkgLSBAaGVpZ2h0fVxuXG5cdFx0QGNsb3NlZCA9IHRydWVcblxuXHRcdFV0aWxzLmRlbGF5IC41LCA9PiBAZGVzdHJveSgpXG5cblxuXG5cbiMgXHQ4ODg4ODhiYSAgb28gICAgICAgICAgb28gICAgICAgZFBcbiMgXHQ4OCAgICBgOGIgICAgICAgICAgICAgICAgICAgICAgODhcbiMgXHQ4OCAgICAgODggZFAgZFAgICAuZFAgZFAgLmQ4ODhiODggLmQ4ODg4Yi4gODhkODg4Yi5cbiMgXHQ4OCAgICAgODggODggODggICBkOCcgODggODgnICBgODggODhvb29vZDggODgnICBgODhcbiMgXHQ4OCAgICAuOFAgODggODggLjg4JyAgODggODguICAuODggODguICAuLi4gODhcbiMgXHQ4ODg4ODg4UCAgZFAgODg4OFAnICAgZFAgYDg4ODg4UDggYDg4ODg4UCcgZFBcblxuXG5leHBvcnRzLkRpdmlkZXIgPSBEaXZpZGVyID0gY2xhc3MgRGl2aWRlciBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdG5hbWU6ICcuJ1xuXHRcdFx0d2lkdGg6IDIwMCwgaGVpZ2h0OiAxLFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiB0aGVtZS5kaXZpZGVyLmJhY2tncm91bmRDb2xvclxuXG5cblxuXG5cblxuIyBcdC5kODg4ODhiICAgICAgICAgICAgIG9vICAgZFAgICAgICAgICAgICBkUFxuIyBcdDg4LiAgICBcIicgICAgICAgICAgICAgICAgIDg4ICAgICAgICAgICAgODhcbiMgXHRgWTg4ODg4Yi4gZFAgIGRQICBkUCBkUCBkODg4OFAgLmQ4ODg4Yi4gODhkODg4Yi5cbiMgXHQgICAgICBgOGIgODggIDg4ICA4OCA4OCAgIDg4ICAgODgnICBgXCJcIiA4OCcgIGA4OFxuIyBcdGQ4JyAgIC44UCA4OC44OGIuODgnIDg4ICAgODggICA4OC4gIC4uLiA4OCAgICA4OFxuIyBcdCBZODg4ODhQICA4ODg4UCBZOFAgIGRQICAgZFAgICBgODg4ODhQJyBkUCAgICBkUFxuXG5cbmV4cG9ydHMuU3dpdGNoID0gU3dpdGNoID0gY2xhc3MgU3dpdGNoIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cblx0XHRAX2lzT24gPSB1bmRlZmluZWRcblxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdG5hbWU6ICcuJ1xuXHRcdFx0d2lkdGg6IDM0LCBoZWlnaHQ6IDE0LCBib3JkZXJSYWRpdXM6IDdcblx0XHRcdGJhY2tncm91bmRDb2xvcjogJ3JnYmEoMzQsIDMxLCAzMSwgLjI2KSdcblx0XHRcdGFuaW1hdGlvbk9wdGlvbnM6IHt0aW1lOiAuMTV9XG5cblx0XHRAa25vYiA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEBcblx0XHRcdHg6IDAsIHk6IEFsaWduLmNlbnRlclxuXHRcdFx0d2lkdGg6IDIwLCBoZWlnaHQ6IDIwLCBib3JkZXJSYWRpdXM6IDEwXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6ICdGMUYxRjEnXG5cdFx0XHRzaGFkb3dZOiAyLCBzaGFkb3dCbHVyOiAzXG5cdFx0XHRhbmltYXRpb25PcHRpb25zOiB7dGltZTogLjE1fVxuXG5cdFx0QGlzT24gPSBvcHRpb25zLmlzT24gPyBmYWxzZVxuXHRcdEBvblRhcCAtPiBAaXNPbiA9ICFAaXNPblxuXG5cdEBkZWZpbmUgXCJpc09uXCIsXG5cdFx0Z2V0OiAtPiByZXR1cm4gQF9pc09uXG5cdFx0c2V0OiAoYm9vbCkgLT5cblx0XHRcdHJldHVybiBpZiBib29sIGlzIEBfaXNPblxuXG5cdFx0XHRAX2lzT24gPSBib29sXG5cdFx0XHRAZW1pdChcImNoYW5nZTppc09uXCIsIEBfaXNPbiwgQClcblx0XHRcdEB1cGRhdGUoKVxuXG5cdHVwZGF0ZTogLT5cblx0XHRpZiBAX2lzT25cblx0XHRcdEBrbm9iLmFuaW1hdGUge3g6IEFsaWduLnJpZ2h0KCksIGJhY2tncm91bmRDb2xvcjogdGhlbWUuY29sb3JzLnByaW1hcnkubWFpbn1cblx0XHRcdEBhbmltYXRlIHtiYWNrZ3JvdW5kQ29sb3I6IHRoZW1lLmNvbG9ycy5wcmltYXJ5LmxpZ2h0fVxuXHRcdGVsc2Vcblx0XHRcdEBrbm9iLmFuaW1hdGUge3g6IDAsIGJhY2tncm91bmRDb2xvcjogJ0YxRjFGMSd9XG5cdFx0XHRAYW5pbWF0ZSB7YmFja2dyb3VuZENvbG9yOiAncmdiYSgzNCwgMzEsIDMxLCAuMjYpJ31cblxuXG5cblxuXG4jIFx0IGE4ODg4OGIuIGRQICAgICAgICAgICAgICAgICAgICAgICAgIGRQICAgICAgIGRQXG4jIFx0ZDgnICAgYDg4IDg4ICAgICAgICAgICAgICAgICAgICAgICAgIDg4ICAgICAgIDg4XG4jIFx0ODggICAgICAgIDg4ZDg4OGIuIC5kODg4OGIuIC5kODg4OGIuIDg4ICAuZFAgIDg4ZDg4OGIuIC5kODg4OGIuIGRQLiAgLmRQXG4jIFx0ODggICAgICAgIDg4JyAgYDg4IDg4b29vb2Q4IDg4JyAgYFwiXCIgODg4ODhcIiAgIDg4JyAgYDg4IDg4JyAgYDg4ICBgOGJkOCdcbiMgXHRZOC4gICAuODggODggICAgODggODguICAuLi4gODguICAuLi4gODggIGA4Yi4gODguICAuODggODguICAuODggIC5kODhiLlxuIyBcdCBZODg4ODhQJyBkUCAgICBkUCBgODg4ODhQJyBgODg4ODhQJyBkUCAgIGBZUCA4OFk4ODg4JyBgODg4ODhQJyBkUCcgIGBkUFxuXG5cblxuZXhwb3J0cy5DaGVja2JveCA9IENoZWNrQm94ID0gY2xhc3MgQ2hlY2tib3ggZXh0ZW5kcyBJY29uXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXG5cdFx0QF9pc09uID0gdW5kZWZpbmVkXG5cblx0XHRzdXBlciBfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRuYW1lOiAnLidcblx0XHRcdGFuaW1hdGlvbk9wdGlvbnM6IHt0aW1lOiAuMTV9XG5cdFx0XHRpY29uOiAnY2hlY2tib3gtYmxhbmstb3V0bGluZSdcblx0XHRcdGNvbG9yOiAncmdiYSgwLDAsMCwuNTQpJ1xuXG5cdFx0QGlzT24gPSBvcHRpb25zLmlzT24gPyBmYWxzZVxuXHRcdEBvblRhcCAtPiBAaXNPbiA9ICFAaXNPblxuXG5cdEBkZWZpbmUgXCJpc09uXCIsXG5cdFx0Z2V0OiAtPiByZXR1cm4gQF9pc09uXG5cdFx0c2V0OiAoYm9vbCkgLT5cblx0XHRcdHJldHVybiBpZiBib29sIGlzIEBfaXNPblxuXG5cdFx0XHRAX2lzT24gPSBib29sXG5cdFx0XHRAZW1pdChcImNoYW5nZTppc09uXCIsIEBfaXNPbiwgQClcblx0XHRcdEB1cGRhdGUoKVxuXG5cdHVwZGF0ZTogLT5cblx0XHRpZiBAX2lzT25cblx0XHRcdEBpY29uID0gJ2NoZWNrYm94LW1hcmtlZCdcblx0XHRcdEBjb2xvciA9IHRoZW1lLmNvbG9ycy5wcmltYXJ5Lm1haW5cblx0XHRlbHNlXG5cdFx0XHRAaWNvbiA9ICdjaGVja2JveC1ibGFuay1vdXRsaW5lJ1xuXHRcdFx0QGNvbG9yID0gJ3JnYmEoMCwwLDAsLjU0KSdcblxuXG5cblxuXG5cbiMgXHQgODg4ODg4YmEgICAgICAgICAgICAgICAgIGRQIG9vICAgICAgICAgICA4ODg4ODhiYSAgICAgICAgICAgICBkUCAgICAgZFBcbiMgXHQgODggICAgYDhiICAgICAgICAgICAgICAgIDg4ICAgICAgICAgICAgICA4OCAgICBgOGIgICAgICAgICAgICA4OCAgICAgODhcbiMgXHRhODhhYWFhOFAnIC5kODg4OGIuIC5kODg4Yjg4IGRQIC5kODg4OGIuIGE4OGFhYWE4UCcgZFAgICAgZFAgZDg4ODhQIGQ4ODg4UCAuZDg4ODhiLiA4OGQ4ODhiLlxuIyBcdCA4OCAgIGA4Yi4gODgnICBgODggODgnICBgODggODggODgnICBgODggIDg4ICAgYDhiLiA4OCAgICA4OCAgIDg4ICAgICA4OCAgIDg4JyAgYDg4IDg4JyAgYDg4XG4jIFx0IDg4ICAgICA4OCA4OC4gIC44OCA4OC4gIC44OCA4OCA4OC4gIC44OCAgODggICAgLjg4IDg4LiAgLjg4ICAgODggICAgIDg4ICAgODguICAuODggODggICAgODhcbiMgXHQgZFAgICAgIGRQIGA4ODg4OFA4IGA4ODg4OFA4IGRQIGA4ODg4OFAnICA4ODg4ODg4OFAgYDg4ODg4UCcgICBkUCAgICAgZFAgICBgODg4ODhQJyBkUCAgICBkUFxuI1xuI1xuXG5cbmV4cG9ydHMuUmFkaW9ib3ggPSBSYWRpb2JveCA9IGNsYXNzIFJhZGlvYm94IGV4dGVuZHMgSWNvblxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblxuXHRcdEBfaXNPbiA9IHVuZGVmaW5lZFxuXHRcdEBfZ3JvdXAgPSBvcHRpb25zLmdyb3VwID8gW11cblxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdG5hbWU6ICcuJ1xuXHRcdFx0YW5pbWF0aW9uT3B0aW9uczoge3RpbWU6IC4xNX1cblx0XHRcdGljb246ICdyYWRpb2JveC1ibGFuaydcblx0XHRcdGNvbG9yOiAncmdiYSgwLDAsMCwuNTQpJ1xuXG5cdFx0QGlzT24gPSBvcHRpb25zLmlzT24gPyBmYWxzZVxuXHRcdEBvblRhcCAtPiBpZiBAaXNPbiBpcyBmYWxzZSB0aGVuIEBpc09uID0gdHJ1ZVxuXG5cdFx0QF9ncm91cC5wdXNoKEApXG5cblx0QGRlZmluZSBcImlzT25cIixcblx0XHRnZXQ6IC0+IHJldHVybiBAX2lzT25cblx0XHRzZXQ6IChib29sKSAtPlxuXHRcdFx0cmV0dXJuIGlmIGJvb2wgaXMgQF9pc09uXG5cblx0XHRcdEBfaXNPbiA9IGJvb2xcblx0XHRcdEBlbWl0KFwiY2hhbmdlOmlzT25cIiwgQF9pc09uLCBAKVxuXHRcdFx0QHVwZGF0ZSgpXG5cblx0dXBkYXRlOiAtPlxuXHRcdGlmIEBfaXNPblxuXHRcdFx0QGljb24gPSAncmFkaW9ib3gtbWFya2VkJ1xuXHRcdFx0QGNvbG9yID0gdGhlbWUuY29sb3JzLnByaW1hcnkubWFpblxuXG5cdFx0XHRyYWRpb2JveC5pc09uID0gZmFsc2UgZm9yIHJhZGlvYm94IGluIF8ud2l0aG91dChAX2dyb3VwLCBAKVxuXHRcdGVsc2Vcblx0XHRcdEBpY29uID0gJ3JhZGlvYm94LWJsYW5rJ1xuXHRcdFx0QGNvbG9yID0gJ3JnYmEoMCwwLDAsLjU0KSdcblxuXG5cbiMgXHQuZDg4ODg4YiAgZFAgb28gICAgICAgZFBcbiMgXHQ4OC4gICAgXCInIDg4ICAgICAgICAgIDg4XG4jIFx0YFk4ODg4OGIuIDg4IGRQIC5kODg4Yjg4IC5kODg4OGIuIDg4ZDg4OGIuXG4jIFx0ICAgICAgYDhiIDg4IDg4IDg4JyAgYDg4IDg4b29vb2Q4IDg4JyAgYDg4XG4jIFx0ZDgnICAgLjhQIDg4IDg4IDg4LiAgLjg4IDg4LiAgLi4uIDg4XG4jIFx0IFk4ODg4OFAgIGRQIGRQIGA4ODg4OFA4IGA4ODg4OFAnIGRQXG5cblxuZXhwb3J0cy5TbGlkZXIgPSBTbGlkZXIgPSBjbGFzcyBTbGlkZXIgZXh0ZW5kcyBTbGlkZXJDb21wb25lbnRcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cblx0XHRAX25vdGNoZWQgPSBvcHRpb25zLm5vdGNoZWQgPyBmYWxzZVxuXG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0aGVpZ2h0OiAyXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6ICdyZ2JhKDAsMCwwLC4yNiknXG5cdFx0XHRtaW46IDEsIG1heDogMTBcblx0XHRpZiBvcHRpb25zLmN1c3RvbVxuXG5cdFx0XHRcdHRyYWNrQ29sb3I9c2xpZGVyUmVndWxhckhpZ2h0bGlnaHQuYmFja2dyb3VuZENvbG9yXG5cdFx0XHRcdGtub2JDb2xvcj1zbGlkZXJSZWd1bGFyS25vYi5iYWNrZ3JvdW5kQ29sb3Jcblx0XHRlbHNlXG5cdFx0XHRcdHRyYWNrQ29sb3I9dGhlbWUuY29sb3JzLnByaW1hcnkubWFpblxuXHRcdFx0XHRrbm9iQ29sb3I9dGhlbWUuY29sb3JzLnByaW1hcnkubWFpblxuXHRcdEBmaWxsLmJhY2tncm91bmRDb2xvciA9IHRyYWNrQ29sb3JcblxuXHRcdEBrbm9iLnByb3BzID1cblx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFx0c2hhZG93WDogMFxuXHRcdFx0c2hhZG93WTogMFxuXHRcdFx0c2hhZG93Qmx1cjogMFxuXG5cdFx0QHRodW1iID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQGtub2Jcblx0XHRcdHg6IEFsaWduLmNlbnRlciwgeTogQWxpZ24uY2VudGVyXG5cdFx0XHRoZWlnaHQ6IDEyLCB3aWR0aDogMTIsIGJvcmRlclJhZGl1czogMTJcblx0XHRcdGJhY2tncm91bmRDb2xvcjoga25vYkNvbG9yXG5cdFx0XHRhbmltYXRpb25PcHRpb25zOiB7dGltZTogLjE1fVxuXG5cdFx0aWYgQF9ub3RjaGVkXG5cblx0XHRcdGZvciBpIGluIFswLi4uQG1heC1AbWluXVxuXHRcdFx0XHRub3RjaCA9IG5ldyBMYXllclxuXHRcdFx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBAXG5cdFx0XHRcdFx0eDogaSAqIEB3aWR0aC8oQG1heC1AbWluKVxuXHRcdFx0XHRcdHdpZHRoOiAyLCBoZWlnaHQ6IDIsIGJvcmRlclJhZGl1czogMixcblx0XHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IHRoZW1lLmNvbG9ycy5wcmltYXJ5LnRleHRcblxuXHRcdFx0QHRpcCA9IG5ldyBMYXllclxuXHRcdFx0XHRwYXJlbnQ6IEBrbm9iXG5cdFx0XHRcdHg6IEFsaWduLmNlbnRlciwgeTogLTI0XG5cdFx0XHRcdHdpZHRoOiAyNiwgaGVpZ2h0OiAzMlxuXHRcdFx0XHRodG1sOiAnPHN2ZyB3aWR0aD1cIjI2cHhcIiBoZWlnaHQ9XCIzMnB4XCIgdmlld0JveD1cIjAgMCAyNiAzMlwiPjxwYXRoIGQ9XCJNMTMsMC4xIEMyMC4yLDAuMSAyNiw2IDI2LDEzLjMgQzI2LDE3IDI0LDIwLjkgMTguNywyNi4yIEwxMywzMiBMNy4yLDI2LjIgQzIsMjAuOCAwLDE2LjkgMCwxMy4zIEMtMy41NTI3MTM2OGUtMTUsNiA1LjgsMC4xIDEzLDAuMSBMMTMsMC4xIFpcIiBmaWxsPVwiJyArIHRoZW1lLmNvbG9ycy5wcmltYXJ5Lm1haW4gKyAnXCI+PC9wYXRoPjwvc3ZnPidcblx0XHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsLCBvcGFjaXR5OiAwXG5cdFx0XHRcdGFuaW1hdGlvbk9wdGlvbnM6IHt0aW1lOiAuMTV9XG5cblx0XHRcdEB0aXBWYWx1ZSA9IG5ldyBUZXh0TGF5ZXJcblx0XHRcdFx0bmFtZTogJ1RpcCBWYWx1ZScsIHBhcmVudDogQHRpcFxuXHRcdFx0XHR5OiA1LCB3aWR0aDogMjZcblx0XHRcdFx0Y29sb3I6IHRoZW1lLmNvbG9ycy5wcmltYXJ5LnRleHRcblx0XHRcdFx0Zm9udFNpemU6IDEyLCBmb250RmFtaWx5OiAnUm9ib3RvJywgdGV4dEFsaWduOiAnY2VudGVyJ1xuXHRcdFx0XHR0ZXh0OiBcInt2YWx1ZX1cIlxuXG5cdFx0XHRAdGlwVmFsdWUudGVtcGxhdGUgPVxuXHRcdFx0XHR2YWx1ZTogQHZhbHVlXG5cblx0XHRcdEBrbm9iLm9uVG91Y2hTdGFydCA9PlxuXHRcdFx0XHRAdGh1bWIuYW5pbWF0ZSB7b3BhY2l0eTogMH1cblx0XHRcdFx0QHRpcC5hbmltYXRlIHtvcGFjaXR5OiAxfVxuXG5cdFx0XHRAb25Ub3VjaEVuZCAtPlxuXHRcdFx0XHRAdGh1bWIuYW5pbWF0ZSB7b3BhY2l0eTogMX1cblx0XHRcdFx0QHRpcC5hbmltYXRlIHtvcGFjaXR5OiAwfVxuXG5cdFx0XHRyb3VuZCA9IChudW1iZXIsIG5lYXJlc3QpIC0+XG5cdFx0XHQgICAgTWF0aC5yb3VuZChudW1iZXIgLyBuZWFyZXN0KSAqIG5lYXJlc3RcblxuXHRcdFx0QGtub2IuZHJhZ2dhYmxlLnVwZGF0ZVBvc2l0aW9uID0gKHBvaW50KSA9PlxuXHRcdFx0ICAgIHBvaW50LnggPSByb3VuZChwb2ludC54LCBAd2lkdGggLyAoQG1heC1AbWluKSApIC0gKEBrbm9iLndpZHRoIC8gMilcblx0XHRcdCAgICByZXR1cm4gcG9pbnRcblxuXHRcdFx0QG9uVmFsdWVDaGFuZ2UgLT5cblx0XHRcdFx0QHRpcFZhbHVlLnRlbXBsYXRlID0gTWF0aC5yb3VuZChAdmFsdWUpXG5cblx0XHRlbHNlXG5cdFx0XHRAa25vYi5vblRvdWNoU3RhcnQgPT5cblx0XHRcdFx0QHRodW1iLmFuaW1hdGUge3dpZHRoOiAxOCwgaGVpZ2h0OiAxOCwgeDogNiwgeTogNn1cblx0XHRcdEBrbm9iLm9uVG91Y2hFbmQgPT5cblx0XHRcdFx0QHRodW1iLmFuaW1hdGUge3dpZHRoOiAxMiwgaGVpZ2h0OiAxMiwgeDogOSwgeTogOX1cbiIsImljb25zID0gSlNPTi5wYXJzZSBVdGlscy5kb21Mb2FkRGF0YVN5bmMgXCJtb2R1bGVzL2ljb25zLmpzb25cIlxuXG4jIFx0ZFBcbiMgXHQ4OFxuIyBcdDg4IC5kODg4OGIuIC5kODg4OGIuIDg4ZDg4OGIuXG4jIFx0ODggODgnICBgXCJcIiA4OCcgIGA4OCA4OCcgIGA4OFxuIyBcdDg4IDg4LiAgLi4uIDg4LiAgLjg4IDg4ICAgIDg4XG4jIFx0ZFAgYDg4ODg4UCcgYDg4ODg4UCcgZFAgICAgZFBcbiMgXHRcbiMgXHRcbiMtLSBAc3RldmVydWl6b2tcbiNcdEEgY2xhc3MgZm9yIGNyZWF0aW5nIE1hdGVyaWFsIERlc2lnbiBpY29ucywgd2l0aCBhY2Nlc3MgdG8gMTYwMCBpY29ucyBhcyBTVkdzLlxuI1x0QWRhcHRlZCBmcm9tIG1hcmNiYWNobWFubidzIGh0dHBzOi8vd3d3Lm5wbWpzLmNvbS9wYWNrYWdlL21hdGVyaWFsLWRlc2lnbi1pY29ucy1zdmcuXG4jXHRcbiNcbiMtLSBJbnN0YWxsYXRpb246XG4jXHREb3dubG9hZCBhbmQgcGxhY2UgaWNvbi5jb2ZmZWUgYW5kIGljb25zLmpzb24gaW4geW91ciBwcm9qZWN0J3MgbW9kdWxlcyBmb2xkZXIuXG4jXHRBdCB0aGUgdG9wIG9mIHlvdXIgcHJvamVjdCwgdHlwZTogXCJ7SWNvbn0gPSByZXF1aXJlIFwiaWNvblwiXG4jXG4jXG4jLS1cdFVzYWdlOlxuI1x0VG8gY3JlYXRlIGFuIGljb24sIHR5cGU6XG4jXG4jXHRcdG15SWNvbiA9IG5ldyBJY29uXG4jXHRcdFxuI1x0WW91IGNhbiBzZXQgdGhlIGljb24gYW5kIHRoZSBpY29uJ3MgZmlsbCBjb2xvci5cbiNcbiNcdFx0bXlJY29uID0gbmV3IEljb25cbiNcdFx0XHRpY29uOiAnY29va2llJ1xuI1x0XHRcdGNvbG9yOiAnIzk0NTIwMCdcbiNcbiNcdFlvdSBjYW4gY2hhbmdlIGFuIGV4aXN0aW5nIGljb24ncyBmaWxsIG9yIGljb24uXG4jXG4jIFx0XHRteUljb24uY29sb3IgPSAncmVkJyBcbiNcdFx0bXlJY29uLmljb24gPSAnY3VwJ1xuI1xuI1x0QXBhcnQgZnJvbSB0aGF0LCB5b3UgY2FuIHVzZSB0aGUgSWNvbiBpbnN0YW5jZSBqdXN0IGxpa2UgYW55IG90aGVyIExheWVyIGluc3RhbmNlLlxuI1xuI1x0RW5qb3khIEBzdGV2ZXJ1aW9rXG5cblxuXG5leHBvcnRzLkljb24gPSBjbGFzcyBJY29uIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cblx0XHRAX2ljb24gPSBvcHRpb25zLmljb24gPyAnbWVudSdcblx0XHRAX2NvbG9yID0gb3B0aW9ucy5jb2xvciA/ICcjMDAwMDAnXG5cdFx0QF9iYWNrZ3JvdW5kQ29sb3IgPSBvcHRpb25zLmJhY2tncm91bmRDb2xvciA/IG51bGxcblxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdG5hbWU6ICcuJ1xuXHRcdFx0aGVpZ2h0OiAyNCwgd2lkdGg6IDI0XG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IEBfYmFja2dyb3VuZENvbG9yXG5cblx0QGRlZmluZSBcImljb25cIixcblx0XHRnZXQ6IC0+IHJldHVybiBAX2ljb25cblx0XHRzZXQ6IChuYW1lKSAtPlxuXHRcdFx0QF9pY29uID0gbmFtZVxuXG5cdFx0XHRzdmcgPSBpZiBpY29uc1tAX2ljb25dIHRoZW4gXCI8c3ZnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zycgdmlld0JveD0nMCAwIDI0IDI0Jz48cGF0aCBkPScje2ljb25zW0BfaWNvbl19JyBmaWxsPScje0BfY29sb3J9Jy8+PC9zdmc+XCJcblx0XHRcdGVsc2UgdGhyb3cgXCJFcnJvcjogaWNvbiAnI3tuYW1lfScgd2FzIG5vdCBmb3VuZC4gU2VlIGh0dHBzOi8vbWF0ZXJpYWxkZXNpZ25pY29ucy5jb20vIGZvciBmdWxsIGxpc3Qgb2YgaWNvbnMuXCJcblxuXHRcdFx0QGh0bWwgPSBzdmdcblxuXHRAZGVmaW5lIFwiY29sb3JcIixcblx0XHRnZXQ6IC0+IHJldHVybiBAX2NvbG9yXG5cdFx0c2V0OiAoY29sb3IpIC0+XG5cdFx0XHRAX2NvbG9yID0gbmV3IENvbG9yKGNvbG9yKVxuXG5cdFx0XHRzdmcgPSBpZiBpY29uc1tAX2ljb25dIHRoZW4gXCI8c3ZnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zycgdmlld0JveD0nMCAwIDI0IDI0Jz48cGF0aCBkPScje2ljb25zW0BfaWNvbl19JyBmaWxsPScje0BfY29sb3J9Jy8+PC9zdmc+XCJcblx0XHRcdGVsc2UgdGhyb3cgXCJFcnJvcjogaWNvbiAnI3tuYW1lfScgd2FzIG5vdCBmb3VuZC4gU2VlIGh0dHBzOi8vbWF0ZXJpYWxkZXNpZ25pY29ucy5jb20vIGZvciBmdWxsIGxpc3Qgb2YgaWNvbnMuXCJcblxuXHRcdFx0QGh0bWwgPSBzdmciLCIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUtBQTtBREFBLElBQUEsV0FBQTtFQUFBOzs7QUFBQSxLQUFBLEdBQVEsSUFBSSxDQUFDLEtBQUwsQ0FBVyxLQUFLLENBQUMsZUFBTixDQUFzQixvQkFBdEIsQ0FBWDs7QUEwQ1IsT0FBTyxDQUFDLElBQVIsR0FBcUI7OztFQUNQLGNBQUMsT0FBRDtBQUVaLFFBQUE7O01BRmEsVUFBVTs7SUFFdkIsSUFBQyxDQUFBLEtBQUQsd0NBQXdCO0lBQ3hCLElBQUMsQ0FBQSxNQUFELDJDQUEwQjtJQUMxQixJQUFDLENBQUEsZ0JBQUQscURBQThDO0lBRTlDLHNDQUFNLENBQUMsQ0FBQyxRQUFGLENBQVcsT0FBWCxFQUNMO01BQUEsSUFBQSxFQUFNLEdBQU47TUFDQSxNQUFBLEVBQVEsRUFEUjtNQUNZLEtBQUEsRUFBTyxFQURuQjtNQUVBLGVBQUEsRUFBaUIsSUFBQyxDQUFBLGdCQUZsQjtLQURLLENBQU47RUFOWTs7RUFXYixJQUFDLENBQUEsTUFBRCxDQUFRLE1B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
