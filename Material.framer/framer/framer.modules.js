require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"md":[function(require,module,exports){
var ActionButton, App, Body1, Body2, BottomNav, Button, Caption, CheckBox, Checkbox, Dialog, DialogAction, Divider, GridList, Header, Headline, Icon, MenuButton, MenuOverlay, Notification, Page, Radiobox, Regular, RowItem, Snackbar, StatusBar, Subhead, Switch, Tile, Title, View, app, icons, ripple, theme, type,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

ripple = require('ripple').ripple;

theme = require('theme').theme;

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
    } else if (view.i < this.current.i) {
      view.x = -Screen.width;
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
      return this.isOn = !this.isOn;
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


},{"ripple":"ripple","theme":"theme","type":"type"}],"ripple":[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3N0ZXZlcnVpei9MaWJyYXJ5L01vYmlsZSBEb2N1bWVudHMvY29tfmFwcGxlfkNsb3VkRG9jcy9HaXRIdWIvZnJhbWVyLW1kL01hdGVyaWFsLmZyYW1lci9tb2R1bGVzL3R5cGUuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvc3RldmVydWl6L0xpYnJhcnkvTW9iaWxlIERvY3VtZW50cy9jb21+YXBwbGV+Q2xvdWREb2NzL0dpdEh1Yi9mcmFtZXItbWQvTWF0ZXJpYWwuZnJhbWVyL21vZHVsZXMvdGhlbWUuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvc3RldmVydWl6L0xpYnJhcnkvTW9iaWxlIERvY3VtZW50cy9jb21+YXBwbGV+Q2xvdWREb2NzL0dpdEh1Yi9mcmFtZXItbWQvTWF0ZXJpYWwuZnJhbWVyL21vZHVsZXMvcmlwcGxlLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3N0ZXZlcnVpei9MaWJyYXJ5L01vYmlsZSBEb2N1bWVudHMvY29tfmFwcGxlfkNsb3VkRG9jcy9HaXRIdWIvZnJhbWVyLW1kL01hdGVyaWFsLmZyYW1lci9tb2R1bGVzL21kLmNvZmZlZSIsIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsidGhlbWUgPSByZXF1aXJlICd0aGVtZSdcblxuIyBcdGQ4ODg4ODhQICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRQXG4jIFx0ICAgODggICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgODhcbiMgXHQgICA4OCAgICBkUCAgICBkUCA4OGQ4ODhiLiAuZDg4ODhiLiAuZDg4ODhiLiA4OGQ4ODhiLiAuZDg4ODhiLiA4OGQ4ODhiLiA4OGQ4ODhiLiBkUCAgICBkUFxuIyBcdCAgIDg4ICAgIDg4ICAgIDg4IDg4JyAgYDg4IDg4JyAgYDg4IDg4JyAgYDg4IDg4JyAgYDg4IDg4JyAgYDg4IDg4JyAgYDg4IDg4JyAgYDg4IDg4ICAgIDg4XG4jIFx0ICAgODggICAgODguICAuODggODguICAuODggODguICAuODggODguICAuODggODggICAgICAgODguICAuODggODguICAuODggODggICAgODggODguICAuODhcbiMgXHQgICBkUCAgICBgODg4OFA4OCA4OFk4ODhQJyBgODg4ODhQJyBgODg4OFA4OCBkUCAgICAgICBgODg4ODhQOCA4OFk4ODhQJyBkUCAgICBkUCBgODg4OFA4OFxuIyBcdCAgICAgICAgICAgICAgLjg4IDg4ICAgICAgICAgICAgICAgICAgICAgLjg4ICAgICAgICAgICAgICAgICAgIDg4ICAgICAgICAgICAgICAgICAgICAgLjg4XG4jIFx0ICAgICAgICAgIGQ4ODg4UCAgZFAgICAgICAgICAgICAgICAgIGQ4ODg4UCAgICAgICAgICAgICAgICAgICAgZFAgICAgICAgICAgICAgICAgIGQ4ODg4UFxuXG5VdGlscy5pbnNlcnRDU1MoXG5cdFwiXCJcIlxuICAgIEBmb250LWZhY2Uge1xuICAgICAgZm9udC1mYW1pbHk6IFwiUm9ib3RvXCI7XG4gICAgICBzcmM6IHVybChcImZvbnRzL1JvYm90by1SZWd1bGFyLnR0ZlwiKTtcbiAgICBcIlwiXCIpXG5cbmNsYXNzIGV4cG9ydHMuSGVhZGxpbmUgZXh0ZW5kcyBUZXh0TGF5ZXJcblx0Y29uc3RydWN0b3I6IChvcHRpb25zKSAtPlxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdG5hbWU6ICcuJ1xuXHRcdFx0Zm9udEZhbWlseTogJ1JvYm90bydcblx0XHRcdGZvbnRTaXplOiAyNFxuXHRcdFx0Zm9udFdlaWdodDogNDAwXG5cdFx0XHRsaW5lSGVpZ2h0OiAxLjNcblx0XHRcdGNvbG9yOiAncmdiYSgwLDAsMCwuODcpJ1xuXG5jbGFzcyBleHBvcnRzLlN1YmhlYWQgZXh0ZW5kcyBUZXh0TGF5ZXJcblx0Y29uc3RydWN0b3I6IChvcHRpb25zKSAtPlxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdG5hbWU6ICcuJ1xuXHRcdFx0Zm9udEZhbWlseTogJ1JvYm90bydcblx0XHRcdGZvbnRTaXplOiAxNlxuXHRcdFx0Zm9udFdlaWdodDogNDAwLCBcblx0XHRcdGxpbmVIZWlnaHQ6IDEuNSxcblx0XHRcdGNvbG9yOiAncmdiYSgwLDAsMCwuNTQpJ1xuXG5jbGFzcyBleHBvcnRzLlRpdGxlIGV4dGVuZHMgVGV4dExheWVyXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucykgLT5cblx0XHRzdXBlciBfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRuYW1lOiAnLidcblx0XHRcdGZvbnRGYW1pbHk6ICdSb2JvdG8nXG5cdFx0XHRmb250U2l6ZTogMjBcblx0XHRcdGZvbnRXZWlnaHQ6IDUwMFxuXHRcdFx0bGluZUhlaWdodDogMS4zXG5cdFx0XHRjb2xvcjogJ3JnYmEoMCwwLDAsLjg3KSdcbmNsYXNzIGV4cG9ydHMuUmVndWxhciBleHRlbmRzIFRleHRMYXllclxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMpIC0+XG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0bmFtZTogJy4nXG5cdFx0XHRmb250RmFtaWx5OiAnUm9ib3RvJ1xuXHRcdFx0Zm9udFNpemU6IDE2XG5cdFx0XHRmb250V2VpZ2h0OiA0MDBcblx0XHRcdGxpbmVIZWlnaHQ6IDEuM1xuXHRcdFx0Y29sb3I6ICdyZ2JhKDAsMCwwLC44NyknXG5jbGFzcyBleHBvcnRzLkJvZHkyIGV4dGVuZHMgVGV4dExheWVyXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucykgLT5cblx0XHRzdXBlciBfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRuYW1lOiAnLidcblx0XHRcdGZvbnRGYW1pbHk6ICdSb2JvdG8nXG5cdFx0XHRmb250U2l6ZTogMTRcblx0XHRcdGZvbnRXZWlnaHQ6IDUwMFxuXHRcdFx0bGluZUhlaWdodDogMS4zXG5cdFx0XHRjb2xvcjogJ3JnYmEoMCwwLDAsLjg3KSdcbmNsYXNzIGV4cG9ydHMuTWVudSBleHRlbmRzIFRleHRMYXllclxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMpIC0+XG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0bmFtZTogJy4nXG5cdFx0XHRmb250RmFtaWx5OiAnUm9ib3RvJ1xuXHRcdFx0Zm9udFNpemU6IDE0XG5cdFx0XHRmb250V2VpZ2h0OiA1MDBcblx0XHRcdGxpbmVIZWlnaHQ6IDEuN1xuXHRcdFx0Y29sb3I6ICdyZ2JhKDAsMCwwLC44NyknXG5jbGFzcyBleHBvcnRzLkJvZHkxIGV4dGVuZHMgVGV4dExheWVyXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucykgLT5cblx0XHRzdXBlciBfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRuYW1lOiAnLidcblx0XHRcdGZvbnRGYW1pbHk6ICdSb2JvdG8nXG5cdFx0XHRmb250U2l6ZTogMTRcblx0XHRcdGZvbnRXZWlnaHQ6IDQwMFxuXHRcdFx0bGluZUhlaWdodDogMS40XG5cdFx0XHRjb2xvcjogJ3JnYmEoMCwwLDAsLjg3KSdcbmNsYXNzIGV4cG9ydHMuQ2FwdGlvbiBleHRlbmRzIFRleHRMYXllclxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMpIC0+XG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0bmFtZTogJy4nXG5cdFx0XHRmb250RmFtaWx5OiAnUm9ib3RvJ1xuXHRcdFx0Zm9udFNpemU6IDEyXG5cdFx0XHRmb250V2VpZ2h0OiA0MDBcblx0XHRcdGxpbmVIZWlnaHQ6IDEuM1xuXHRcdFx0Y29sb3I6ICdyZ2JhKDAsMCwwLC41NCknXG5jbGFzcyBleHBvcnRzLkJ1dHRvbiBleHRlbmRzIFRleHRMYXllclxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMpIC0+XG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0bmFtZTogJy4nXG5cdFx0XHRmb250RmFtaWx5OiAnUm9ib3RvJ1xuXHRcdFx0Zm9udFNpemU6IDE0XG5cdFx0XHRmb250V2VpZ2h0OiA1MDBcblx0XHRcdGxpbmVIZWlnaHQ6IDEuM1xuXHRcdFx0Y29sb3I6ICcjMDA5Njg4J1xuXHRcdFx0bGV0dGVyU3BhY2luZzogMC41XG5cdFx0XHRwYWRkaW5nOiB7bGVmdDogNCwgcmlnaHQ6IDQsIHRvcDogOCwgYm90dG9tOiAwfSwiLCJcbiMgICBkUCAgIGRQICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiMgICA4OCAgIDg4ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiMgZDg4ODhQIDg4ZDg4OGIuIC5kODg4OGIuIDg4ZDhiLmQ4Yi4gLmQ4ODg4Yi4gLmQ4ODg4Yi5cbiMgICA4OCAgIDg4JyAgYDg4IDg4b29vb2Q4IDg4J2A4OCdgODggODhvb29vZDggWThvb29vby5cbiMgICA4OCAgIDg4ICAgIDg4IDg4LiAgLi4uIDg4ICA4OCAgODggODguICAuLi4gICAgICAgODhcbiMgICBkUCAgIGRQICAgIGRQIGA4ODg4OFAnIGRQICBkUCAgZFAgYDg4ODg4UCcgYDg4ODg4UCdcblxuIyBXaGVuIGxvYWRlZCwgdGhpcyBtb2R1bGUgd2lsbCBhdHRlbXB0IHRvIGNyZWF0ZSBhIG5ldyB0aGVtZSBiYXNlZCBvbiBcbiMgdGhlIERlc2lnbiBNb2RlIHRlbXBsYXRlLiBJdHMgZGVmYXVsdCB2YWx1ZXMgd2lsbCBiZSBmb3IgYSBcIkxpZ2h0XCIgdGhlbWUuXG5cbm1vZGlmeUNvbG9yID0gKGNvbG9yLCBoLCBzLCBsKSAtPlxuXHRjbGlwID0gXy5yZXBsYWNlKF8ucmVwbGFjZShjb2xvci50b0hzbFN0cmluZygpLnNsaWNlKDQsIC0xKSwgJyUnLCAnJyksICclJywgJycpIC5zcGxpdCgnLCAnKVxuXG5cdG5ld0NvbG9yID0gbmV3IENvbG9yKFxuXHRcdGg6IF8ucGFyc2VJbnQoY2xpcFswXSkgKyBoLCBcblx0XHRzOiAoXy5wYXJzZUludChjbGlwWzFdKSArIHMpLzEwMCwgXG5cdFx0bDogKF8ucGFyc2VJbnQoY2xpcFsyXSkgKyBsKS8xMDAsIFxuXHRcdGE6IDEpXG5cdFxuXHRyZXR1cm4gbmV3Q29sb3JcblxucHJpbWFyeUNvbG9yID0gcHJpbWFyeV9jb2xvci5iYWNrZ3JvdW5kQ29sb3JcbnByaW1hcnlJbnZlcnQgPSAxMDAgLSAocHJpbWFyeV9pbnZlcnQub3BhY2l0eSAqIDEwMClcbnNlY29uZGFyeUNvbG9yID0gc2Vjb25kYXJ5X2NvbG9yLmJhY2tncm91bmRDb2xvclxubWVudUNvbG9yID0gbWVudV9jb2xvci5iYWNrZ3JvdW5kQ29sb3Jcbm1lbnVUZXh0Q29sb3IgPSBtZW51X3RleHRfY29sb3IuY29sb3Jcbm1lbnVJbnZlcnQgPSAxMDAgLSAobWVudV9pbnZlcnQub3BhY2l0eSAqIDEwMClcblxuXG5zb3VyY2UgPVxuXHRjb2xvcnM6XG5cdFx0cHJpbWFyeTpcblx0XHRcdG1haW46IHByaW1hcnlDb2xvclxuXHRcdFx0bGlnaHQ6IG1vZGlmeUNvbG9yKHByaW1hcnlDb2xvciwgMTMsIC01LCAxNSlcblx0XHRcdGRhcms6IG1vZGlmeUNvbG9yKHByaW1hcnlDb2xvciwgLTEsIC03LCAtMTIpXG5cdFx0XHR0ZXh0OiBwcmltYXJ5X3RleHRfY29sb3IuY29sb3Jcblx0XHRcdGludmVydDogcHJpbWFyeUludmVydFxuXHRcdHNlY29uZGFyeTpcblx0XHRcdG1haW46IHNlY29uZGFyeUNvbG9yXG5cdFx0XHRsaWdodDogbW9kaWZ5Q29sb3Ioc2Vjb25kYXJ5Q29sb3IsIDEzLCAtNSwgMTUpXG5cdFx0XHRkYXJrOiBtb2RpZnlDb2xvcihzZWNvbmRhcnlDb2xvciwgLTEsIC03LCAtMTIpXG5cdFx0XHR0ZXh0OiBzZWNvbmRhcnlfdGV4dF9jb2xvci5jb2xvclxuXHRcdG1lbnU6XG5cdFx0XHRsaWdodDogbWVudUNvbG9yXG5cdFx0XHR0ZXh0OiBtZW51VGV4dENvbG9yXG5cdFx0XHRpbnZlcnQ6IG1lbnVJbnZlcnRcblxudGhlbWUgPSBcblx0dGludDogc291cmNlLmNvbG9ycy5zZWNvbmRhcnkubWFpblxuXHRwcmltYXJ5OiBzb3VyY2UuY29sb3JzLnByaW1hcnkubWFpblxuXHRzZWNvbmRhcnk6IHNvdXJjZS5jb2xvcnMuc2Vjb25kYXJ5Lm1haW5cblx0bWVudTogc291cmNlLmNvbG9ycy5tZW51LmxpZ2h0XG5cdGNvbG9yczogc291cmNlLmNvbG9yc1xuXG5cdHVzZXI6XG5cdFx0aW1hZ2U6IHVuZGVmaW5lZFxuXG5cdGhlYWRlcjogXG5cdFx0YmFja2dyb3VuZENvbG9yOiBzb3VyY2UuY29sb3JzLnByaW1hcnkubWFpblxuXHRcdHRpdGxlOiBzb3VyY2UuY29sb3JzLnByaW1hcnkudGV4dFxuXHRcdGludmVydDogcHJpbWFyeUludmVydFxuXHRcdGljb246XG5cdFx0XHRjb2xvcjogc291cmNlLmNvbG9ycy5wcmltYXJ5LnRleHRcblx0XHR0YWJzOlxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBzb3VyY2UuY29sb3JzLnByaW1hcnkubGlnaHRcblx0XHRcdGNvbG9yOiBzb3VyY2UuY29sb3JzLnByaW1hcnkudGV4dFxuXHRcdFx0c2VsZWN0b3I6IHNvdXJjZS5jb2xvcnMuc2Vjb25kYXJ5Lm1haW5cblx0XG5cdHN0YXR1c0JhcjogXG5cdFx0aW1hZ2U6ICdpbWFnZXMvc3RhdHVzX2Jhci5wbmcnXG5cdFx0YmFja2dyb3VuZENvbG9yOiBzb3VyY2UuY29sb3JzLnByaW1hcnkuZGFya1xuXHRcdGludmVydDogcHJpbWFyeUludmVydFxuXHRcblx0Ym90dG9tTmF2OlxuXHRcdGJhY2tncm91bmRDb2xvcjogJyNGRkZGRkYnXG5cdFx0c2hhZG93WTogLTJcblx0XHRzaGFkb3dCbHVyOiA2XG5cdFx0c2hhZG93Q29sb3I6ICdyZ2JhKDAsMCwwLC4xKSdcblxuXHRwYWdlOlxuXHRcdHByaW1hcnk6XG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6ICcjRTFFMkUxJ1xuXHRcdHNlY29uZGFyeTpcblx0XHRcdGJhY2tncm91bmRDb2xvcjogJyNGNUY1RjYnXG5cblx0bWVudU92ZXJsYXk6XG5cdFx0aGVhZGVyOlxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBzb3VyY2UuY29sb3JzLnNlY29uZGFyeS5tYWluXG5cdFx0XHRpY29uOiBzb3VyY2UuY29sb3JzLnNlY29uZGFyeS5saWdodFxuXHRcdFx0dGV4dDogc291cmNlLmNvbG9ycy5zZWNvbmRhcnkudGV4dFxuXHRcdHN1YmhlYWRlcjpcblx0XHRcdGNvbG9yOiBzb3VyY2UuY29sb3JzLm1lbnUudGV4dFxuXHRcdFx0dGV4dDogc291cmNlLmNvbG9ycy5zZWNvbmRhcnkudGV4dFxuXHRcdFx0aWNvbjogc291cmNlLmNvbG9ycy5zZWNvbmRhcnkudGV4dFxuXHRcdGJhY2tncm91bmRDb2xvcjogc291cmNlLmNvbG9ycy5tZW51LmxpZ2h0XG5cdFx0dGV4dDogc291cmNlLmNvbG9ycy5tZW51LnRleHRcblx0XHRzbGlkZXI6IFxuXHRcdFx0a25vYjogc291cmNlLmNvbG9ycy5zZWNvbmRhcnkubGlnaHRcblx0XHRcdGZpbGw6IHNvdXJjZS5jb2xvcnMuc2Vjb25kYXJ5LmRhcmtcblx0XHRpbnZlcnQ6IHNvdXJjZS5jb2xvcnMubWVudS5pbnZlcnRcblxuXHRidXR0b246XG5cdFx0ZmxhdDpcblx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFx0Y29sb3I6IHNvdXJjZS5jb2xvcnMuc2Vjb25kYXJ5Lm1haW5cblx0XHRcdHNoYWRvd1k6IDBcblx0XHRcdHNoYWRvd0NvbG9yOiAncmdiYSgwLDAsMCwuMTgpJ1xuXHRcdFx0c2hhZG93Qmx1cjogMFxuXG5cdFx0cmFpc2VkOlxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBzb3VyY2UuY29sb3JzLnNlY29uZGFyeS5tYWluXG5cdFx0XHRjb2xvcjogc291cmNlLmNvbG9ycy5zZWNvbmRhcnkudGV4dFxuXHRcdFx0c2hhZG93WTogMlxuXHRcdFx0c2hhZG93Q29sb3I6ICdyZ2JhKDAsMCwwLC4xOCknXG5cdFx0XHRzaGFkb3dCbHVyOiA2XG5cblx0ZmFiOlxuXHRcdGJhY2tncm91bmRDb2xvcjogc291cmNlLmNvbG9ycy5zZWNvbmRhcnkubWFpblxuXHRcdGNvbG9yOiBzb3VyY2UuY29sb3JzLnNlY29uZGFyeS50ZXh0XG5cdFx0aW52ZXJ0OiBwcmltYXJ5SW52ZXJ0XG5cblx0ZGlhbG9nOiBcblx0XHRiYWNrZ3JvdW5kQ29sb3I6JyNGQUZBRkEnXG5cdFxuXHRkaXZpZGVyOlxuXHRcdGJhY2tncm91bmRDb2xvcjogJ3JnYmEoMCwwLDAsLjEyKSdcblxuXHR0ZXh0OiBcblx0XHRwcmltYXJ5OiBzb3VyY2UuY29sb3JzLnByaW1hcnkudGV4dFxuXHRcdHNlY29uZGFyeTogc291cmNlLmNvbG9ycy5zZWNvbmRhcnkudGV4dFxuXHRcblx0dGFibGU6XG5cdFx0YmFja2dyb3VuZENvbG9yOiAnI0ZGRkZGRidcblx0XHR0ZXh0OiBzb3VyY2UuY29sb3JzLnByaW1hcnkudGV4dFxuXHRcdGNoZWNrQm94OlxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHRib3JkZXJDb2xvcjogJyNEM0QzRDMnXG5cdFx0c2VsZWN0ZWQ6XG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IHNvdXJjZS5jb2xvcnMuc2Vjb25kYXJ5Lm1haW5cblx0XHRcdHRleHQ6IHNvdXJjZS5jb2xvcnMucHJpbWFyeS50ZXh0XG5cdFx0XHRjaGVja0JveDpcblx0XHRcdFx0YmFja2dyb3VuZENvbG9yOiBzb3VyY2UuY29sb3JzLnNlY29uZGFyeS5kYXJrXG5cdFx0XHRcdGJvcmRlckNvbG9yOiBudWxsXG5cblx0c25hY2tiYXI6XG5cdFx0YmFja2dyb3VuZENvbG9yOiAncmdiYSg1MSwgNTEsIDUxLCAxKSdcblx0XHRjb2xvcjogJ3JnYmEoMjU1LCAyNTUsIDI1NSwgMSknXG5cblx0c2xpZGVyOlxuXHRcdGtub2I6IHNvdXJjZS5jb2xvcnMucHJpbWFyeS5saWdodFxuXHRcdGZpbGw6IHNvdXJjZS5jb2xvcnMucHJpbWFyeS5kYXJrXG5cblx0Y2FyZDpcblx0XHRoZWFkZXI6IHNvdXJjZS5jb2xvcnMuc2Vjb25kYXJ5LmRhcmtcblx0XG5cdG5hdkJhcjpcblx0XHRiYWNrZ3JvdW5kQ29sb3I6ICcjMDAwMDAwJ1xuXHRcblx0a2V5Ym9hcmQ6XG5cdFx0aW1hZ2U6ICdpbWFnZXMva2V5Ym9hcmQucG5nJ1xuXG5jb2xvcl9wYWxsZXRlLmRlc3Ryb3koKVxuXG5leHBvcnRzLnRoZW1lID0gdGhlbWVcbiIsIiMgXHQgODg4ODg4YmEgIG9vICAgICAgICAgICAgICAgICAgIGRQXG4jIFx0IDg4ICAgIGA4YiAgICAgICAgICAgICAgICAgICAgICA4OFxuIyBcdGE4OGFhYWE4UCcgZFAgODhkODg4Yi4gODhkODg4Yi4gODggLmQ4ODg4Yi5cbiMgXHQgODggICBgOGIuIDg4IDg4JyAgYDg4IDg4JyAgYDg4IDg4IDg4b29vb2Q4XG4jIFx0IDg4ICAgICA4OCA4OCA4OC4gIC44OCA4OC4gIC44OCA4OCA4OC4gIC4uLlxuIyBcdCBkUCAgICAgZFAgZFAgODhZODg4UCcgODhZODg4UCcgZFAgYDg4ODg4UCdcbiMgXHQgICAgICAgICAgICAgIDg4ICAgICAgIDg4XG4jIFx0ICAgICAgICAgICAgICBkUCAgICAgICBkUFxuXG4jXHRCeSBkZWZhdWx0LCBzaG93cyBhbiBleHBhbmRpbmcgY2lyY2xlIG92ZXIgYSBsYXllciwgY2xpcHBlZCB0byBpdHMgZnJhbWUuXG4jXHRPbiB0aGUgbGF5ZXIncyB0b3VjaEVuZCBldmVudCwgdGhlIGNpcmNsZSBhbmQgaXRzIG1hc2sgd2lsbCBkaXNhcHBlYXIuXG5cbiNcdHJlcXVpcmVkOlxuI1x0bGF5ZXIgKExheWVyKSwgdGhlIGxheWVyIG92ZXIgd2hpY2ggdG8gc2hvdyB0aGUgcmlwcGxlIGVmZmVjdFxuI1x0cG9pbnQgKG9iamVjdCksIHRoZSByaXBwbGUgb3JpZ2luIHBvaW50LCB1c3VhbGx5IGEgb25Ub3VjaFN0YXJ0J3MgZXZlbnQucG9pbnRcblxuI1x0b3B0aW9uYWw6XG4jXHRwbGFjZUJlaGluZCAoTGF5ZXIpLCBhIGNoaWxkIG9mIGxheWVyIGJlaGluZCB3aGljaCB0aGUgcmlwcGxlIHNob3VsZCBhcHBlYXJcbiNcdGNvbG9yIChzdHJpbmcgb3IgY29sb3Igb2JqZWN0KSwgYSBjdXN0b20gY29sb3IgZm9yIHRoZSByaXBwbGVcblxucmlwcGxlID0gKGxheWVyLCBwb2ludCwgcGxhY2VCZWhpbmQsIGNvbG9yKSAtPlxuXHRcblx0aWYgIWxheWVyPyB0aGVuIHRocm93ICdSaXBwbGUgcmVxdWlyZXMgYSBMYXllci4gVHJ5IG15TGF5ZXIub25Ub3VjaFN0YXJ0IChldmVudCkgLT4gcmlwcGxlKEAsIGV2ZW50LnBvaW50KSdcblx0aWYgIXBvaW50PyB0aGVuIHRocm93ICdSaXBwbGUgcmVxdWlyZXMgYSBwb2ludC4gVHJ5IG15TGF5ZXIub25Ub3VjaFN0YXJ0IChldmVudCkgLT4gcmlwcGxlKEAsIGV2ZW50LnBvaW50KSdcblxuXHRtYXNrID0gbmV3IExheWVyXG5cdFx0bmFtZTogJy4nXG5cdFx0cGFyZW50OiBsYXllclxuXHRcdHNpemU6IGxheWVyLnNpemVcblx0XHRib3JkZXJSYWRpdXM6IGxheWVyLmJvcmRlclJhZGl1c1xuXHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdGNsaXA6IHRydWVcblx0XHRvcGFjaXR5OiAwXG5cdFx0YW5pbWF0aW9uT3B0aW9uczoge3RpbWU6IC4xNX1cblx0XG5cdGlmIHBsYWNlQmVoaW5kIHRoZW4gbWFzay5wbGFjZUJlaGluZChwbGFjZUJlaGluZClcblx0XG5cdCMgUklQUExFIENJUkNMRVxuXHRcblx0bG9uZ1NpZGUgPSBpZiBsYXllci53aWR0aCA+IGxheWVyLmhlaWdodCB0aGVuIGxheWVyLndpZHRoIGVsc2UgbGF5ZXIuaGVpZ2h0XG5cblx0cmlwcGxlQ2lyY2xlID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiAnLicsIHBhcmVudDogbWFza1xuXHRcdFx0eDogcG9pbnQueCAtIDE2XG5cdFx0XHR5OiBwb2ludC55IC0gMTZcblx0XHRcdHdpZHRoOiAzMiwgaGVpZ2h0OiAzMiwgXG5cdFx0XHRib3JkZXJSYWRpdXM6IGxvbmdTaWRlXG5cdFx0XHRcblx0aWYgY29sb3I/XG5cdFx0cmlwcGxlQ2lyY2xlLnByb3BzID1cblx0XHRcdGJhY2tncm91bmRDb2xvcjogY29sb3Jcblx0ZWxzZSBcblx0XHRyaXBwbGVDaXJjbGUucHJvcHMgPSBcblx0XHRcdGJhY2tncm91bmRDb2xvcjogbGF5ZXIuYmFja2dyb3VuZENvbG9yXG5cdFx0XHRzYXR1cmF0ZTogMTIwXG5cdFx0XHRicmlnaHRuZXNzOiAxMjBcblx0XHRcdG9wYWNpdHk6IC41XG5cdFxuXHQjIEFOSU1BVElPTlMgQ0lSQ0xFXG5cdFxuXHRtYXNrLmFuaW1hdGVcblx0XHRvcGFjaXR5OiAxXG5cdFx0b3B0aW9uczoge3RpbWU6IC4xNX1cblx0XG5cdHJpcHBsZUNpcmNsZS5hbmltYXRlXG5cdFx0eDogcmlwcGxlQ2lyY2xlLnggLSBsb25nU2lkZSAqIDEuM1xuXHRcdHk6IHJpcHBsZUNpcmNsZS55IC0gbG9uZ1NpZGUgKiAxLjNcblx0XHR3aWR0aDogbG9uZ1NpZGUgKiAyLjZcblx0XHRoZWlnaHQ6IGxvbmdTaWRlICogMi42XG5cdFx0b3B0aW9uczoge3RpbWU6IC41fVxuXHRcblx0VXRpbHMuZGVsYXkgMiwgLT4gXG5cdFx0bWFzay5hbmltYXRlXG5cdFx0XHRvcGFjaXR5OiAwXG5cdFx0bWFzay5vbkFuaW1hdGlvbkVuZCBtYXNrLmRlc3Ryb3lcblxuXHQjIFRPVUNIIEVORFxuXHRcblx0bGF5ZXIub25Ub3VjaEVuZCAtPiBcblx0XHRtYXNrLmFuaW1hdGVcblx0XHRcdG9wYWNpdHk6IDBcblx0XHRtYXNrLm9uQW5pbWF0aW9uRW5kIG1hc2suZGVzdHJveVxuXG5leHBvcnRzLnJpcHBsZSA9IHJpcHBsZSIsIntyaXBwbGV9ID0gcmVxdWlyZSAncmlwcGxlJ1xue3RoZW1lfSA9IHJlcXVpcmUgJ3RoZW1lJ1xudHlwZSA9IHJlcXVpcmUgJ3R5cGUnXG5pY29ucyA9IEpTT04ucGFyc2UgVXRpbHMuZG9tTG9hZERhdGFTeW5jIFwibW9kdWxlcy9pY29ucy5qc29uXCJcblxuRnJhbWVyLkV4dHJhcy5IaW50cy5kaXNhYmxlKClcbkZyYW1lci5FeHRyYXMuUHJlbG9hZGVyLmVuYWJsZSgpXG5cbiMgVE9ETzogQ2hhbmdlIEFwcCBmcm9tIG1hc3RlciBmbG93IGNvbXBvbmVudCB0byBTY3JlZW4gbWFuYWdlci5cbiMgQXBwIHNob3VsZG4ndCBkaXJlY3RseSBtYW5hZ2UgcGFnZXM6IGEgbmV3IGNsYXNzLCAnc2NyZWVuJyB3aWxsIG1hbmFnZSBQYWdlcy5cbiMgVGFicyBhbGxvdyBuYXZpZ2F0aW9uIGJldHdlZW4gU2NyZWVucy4gQ29udGVudCBpcyBzdGlsbCBhZGRlZCB0byBQYWdlcy5cblxuXG4jIE91ciBnb2FsIGlzIHRvIHJlcXVpcmUgb25seSBvbmUgcmVxdWlyZSBpbiBGcmFtZXIgcHJvamVjdCwgc28gdGhpcyBcbiMgaXMgYSBjbHVua3kgd2F5IG9mIGxldHRpbmcgdXNlciBjcmVhdGUgdGV4dCB1c2luZyBtZC5UaXRsZSwgZXRjLlxuXG5leHBvcnRzLnRoZW1lID0gdGhlbWVcbmV4cG9ydHMuVGl0bGUgPSBUaXRsZSA9IHR5cGUuVGl0bGVcbmV4cG9ydHMuSGVhZGxpbmUgPSBIZWFkbGluZSA9IHR5cGUuSGVhZGxpbmVcbmV4cG9ydHMuU3ViaGVhZCA9IFN1YmhlYWQgPSB0eXBlLlN1YmhlYWRcbmV4cG9ydHMuUmVndWxhciA9IFJlZ3VsYXIgPSB0eXBlLlJlZ3VsYXJcbmV4cG9ydHMuQm9keTIgPSBCb2R5MiA9IHR5cGUuQm9keTJcbmV4cG9ydHMuQm9keTEgPSBCb2R5MSA9IHR5cGUuQm9keTFcbmV4cG9ydHMuQ2FwdGlvbiA9IENhcHRpb24gPSB0eXBlLkNhcHRpb25cbmV4cG9ydHMuRGlhbG9nQWN0aW9uID0gRGlhbG9nQWN0aW9uID0gdHlwZS5EaWFsb2dBY3Rpb25cblxuYXBwID0gdW5kZWZpbmVkXG5cblxuXG5cblxuXG5cblxuIyBcdCAuZDg4ODg4OFxuIyBcdGQ4JyAgICA4OFxuIyBcdDg4YWFhYWE4OGEgODhkODg4Yi4gODhkODg4Yi5cbiMgXHQ4OCAgICAgODggIDg4JyAgYDg4IDg4JyAgYDg4XG4jIFx0ODggICAgIDg4ICA4OC4gIC44OCA4OC4gIC44OFxuIyBcdDg4ICAgICA4OCAgODhZODg4UCcgODhZODg4UCdcbiMgXHQgICAgICAgICAgIDg4ICAgICAgIDg4XG4jIFx0ICAgICAgICAgICBkUCAgICAgICBkUFxuXG5cblxuZXhwb3J0cy5BcHAgPSBjbGFzcyBBcHAgZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblxuXHRcdEBfYm90dG9tTmF2ID0gb3B0aW9ucy5ib3R0b21OYXYgPyB1bmRlZmluZWRcblx0XHRAX21lbnVPdmVybGF5ID0gb3B0aW9ucy5tZW51T3ZlcmxheSA/IHVuZGVmaW5lZFxuXHRcdFxuXHRcdEB0aGVtZSA9IHRoZW1lXG5cdFx0QHZpZXdzID0gb3B0aW9ucy52aWV3cyA/IFtdXG5cdFx0QGN1cnJlbnQgPSB7aTogMH1cblx0XHRAbm90aWZpY2F0aW9ucyA9IFtdXG5cdFx0QGFjdGlvbkJ1dHRvbiA9IHVuZGVmaW5lZFxuXHRcdEBzbmFja2JhciA9IHVuZGVmaW5lZFxuXG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0bmFtZTogJ0FwcCdcblx0XHRcdHNpemU6IFNjcmVlbi5zaXplXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcdGluZGV4OiAxXG5cdFx0XG5cdFx0YXBwID0gQFxuXG5cdFx0IyBIRUFERVJcblxuXHRcdEBoZWFkZXIgPSBuZXcgSGVhZGVyXG5cdFx0XHR0aGVtZTogdGhlbWVcblx0XHRcdGluZGV4OiA5OTlcblxuXHRcdCMgRk9PVEVSXG5cblx0XHRAZm9vdGVyID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiAnRm9vdGVyJ1xuXHRcdFx0d2lkdGg6IFNjcmVlbi53aWR0aCwgaGVpZ2h0OiA0OFxuXHRcdFx0aW1hZ2U6ICdpbWFnZXMvbmF2X2Jhci5wbmcnXG5cdFx0XHRpbmRleDogOTk5XG5cdFx0XHR5OiBBbGlnbi5ib3R0b20oKVxuXG5cdFx0aWYgQF9ib3R0b21OYXZcblx0XHRcdEBib3R0b21OYXYgPSBuZXcgQm90dG9tTmF2XG5cdFx0XHRcdG5hbWU6ICdCb3R0b20gTmF2J1xuXHRcdFx0XHRkZXN0aW5hdGlvbnM6IEBfYm90dG9tTmF2LmxpbmtzID8gXCJtZC5hcHAuYm90dG9tTmF2IG5lZWRzIGFuIGFycmF5IG9mIGxpbmtzLiBFeGFtcGxlOiBbe3RpdGxlOiAnSG9tZScsIGljb246ICdob21lJywgYWN0aW9uOiAtPiB2aWV3LmxpbmtUbyhob21lKX1dXCJcblx0XHRcdFx0eTogaWYgQGZvb3Rlcj8gdGhlbiBBbGlnbi5ib3R0b20oLUBmb290ZXIuaGVpZ2h0KSBlbHNlIEFsaWduLmJvdHRvbSgpXG5cdFx0XHRcdGluZGV4OiA5OThcblxuXHRcdCMgTUVOVSBPVkVSTEFZXG5cdFx0aWYgQF9tZW51T3ZlcmxheVxuXHRcdFx0QG1lbnVPdmVybGF5ID0gbmV3IE1lbnVPdmVybGF5XG5cdFx0XHRcdG5hbWU6ICdNZW51IE92ZXJsYXknXG5cdFx0XHRcdHRpdGxlOiBAX21lbnVPdmVybGF5LnRpdGxlID8gdGhyb3cgJ21kLmFwcC5tZW51T3ZlcmxheSBuZWVkcyBhIHRpdGxlLidcblx0XHRcdFx0bGlua3M6IEBfbWVudU92ZXJsYXkubGlua3MgPyB0aHJvdyBcIm1kLmFwcC5tZW51T3ZlcmxheSBuZWVkcyBhbiBhcnJheSBvZiBsaW5rcy4gRXhhbXBsZTogW3t0aXRsZTogJ0hvbWUnLCBpY29uOiAnaG9tZScsIGFjdGlvbjogLT4gdmlldy5saW5rVG8oaG9tZSl9XVwiXG5cblxuXHRcdCMgS0VZQk9BUkRcblxuXHRcdEBrZXlib2FyZCA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogJ0tleWJvYXJkJ1xuXHRcdFx0eTogQG1heFksIGltYWdlOiB0aGVtZS5rZXlib2FyZC5pbWFnZVxuXHRcdFx0d2lkdGg6IEB3aWR0aCwgaGVpZ2h0OiAyMjJcblx0XHRcdGluZGV4OiAxMDAwXG5cdFx0XHRhbmltYXRpb25PcHRpb25zOlxuXHRcdFx0XHR0aW1lOiAuMjVcblxuXHRcdEBrZXlib2FyZC5vblRhcCA9PiBAaGlkZUtleWJvYXJkKClcblxuXHRcdGZvciB2aWV3LCBpIGluIEB2aWV3c1xuXHRcdFx0QGFkZFZpZXcodmlldywgaSlcblxuXHRcdEBjaGFuZ2VWaWV3KEB2aWV3c1swXSlcblxuXHRzaG93S2V5Ym9hcmQ6IC0+XG5cdFx0QGtleWJvYXJkLmFuaW1hdGVcblx0XHRcdHk6IEFsaWduLmJvdHRvbSgpXG5cdFx0QGtleWJvYXJkLmJyaW5nVG9Gcm9udCgpXG5cblx0aGlkZUtleWJvYXJkOiAtPlxuXHRcdEBrZXlib2FyZC5hbmltYXRlXG5cdFx0XHR5OiBAbWF4WVxuXG5cdGFkZFZpZXc6ICh2aWV3LCBpKSAtPlxuXHRcdHZpZXcuaSA9IGlcblx0XHR2aWV3LnBhcmVudCA9IEBcblx0XHR2aWV3LnkgPSBAaGVhZGVyLm1heFlcblx0XHR2aWV3LmhlaWdodCA9IFNjcmVlbi5oZWlnaHQgLSBAaGVhZGVyLmhlaWdodCAtIEBmb290ZXIuaGVpZ2h0XG5cblx0XHR2aWV3LmhvbWUgPSB2aWV3Lm5ld1BhZ2Vcblx0XHQgXHRuYW1lOiAnaG9tZSdcblx0XHQgXHRoZWFkZXI6XG5cdFx0XHQgXHR0aXRsZTogdmlldy5fdGl0bGVcblx0XHRcdCBcdGljb246IHZpZXcuX2ljb25cblx0XHRcdCBcdGljb25BY3Rpb246IHZpZXcuX2ljb25BY3Rpb25cblxuXHRcdHZpZXcuc2hvd05leHQodmlldy5ob21lKVxuXG5cdGNoYW5nZVZpZXc6ICh2aWV3KSAtPlxuXG5cdFx0cmV0dXJuIGlmIHZpZXcgaXMgQGN1cnJlbnRcblxuXHRcdEBoZWFkZXIudGl0bGUgPSB2aWV3LmN1cnJlbnQuX2hlYWRlcj8udGl0bGUgPyAnRGVmYXVsdCdcblx0XHRAaGVhZGVyLmljb24gPSB2aWV3LmN1cnJlbnQuX2hlYWRlcj8uaWNvbiA/ICdtZW51J1xuXHRcdEBoZWFkZXIuaWNvbkFjdGlvbiA9IHZpZXcuY3VycmVudC5faGVhZGVyPy5pY29uQWN0aW9uID8gLT4gYXBwLnNob3dNZW51KClcblx0XHRAaGVhZGVyLnZpc2libGUgPSB2aWV3LmN1cnJlbnQuX2hlYWRlcj8udmlzaWJsZSA/IHRydWVcblxuXHRcdGlmIHZpZXcuaSA+IEBjdXJyZW50Lmlcblx0XHRcdHZpZXcueCA9IFNjcmVlbi53aWR0aCBcblx0XHRlbHNlIGlmIHZpZXcuaSA8IEBjdXJyZW50Lmlcblx0XHRcdHZpZXcueCA9IC1TY3JlZW4ud2lkdGhcblxuXHRcdHZpZXcuYW5pbWF0ZSB7eDogMH1cblx0XHR2aWV3LmJyaW5nVG9Gcm9udCgpXG5cdFx0QGN1cnJlbnQgPSB2aWV3XG5cblx0c2hvd01lbnU6IC0+XG5cdFx0QG1lbnVPdmVybGF5LnNob3coKVxuXG5cdGhpZGVNZW51OiAtPlxuXHRcdEBtZW51T3ZlcmxheS5oaWRlKClcblxuXHRjaGFuZ2VQYWdlOiAocGFnZSkgLT5cblx0XHRAaGVhZGVyLnRpdGxlID0gcGFnZS5faGVhZGVyLnRpdGxlXG5cdFx0QGhlYWRlci5pY29uID0gcGFnZS5faGVhZGVyLmljb25cblx0XHRAaGVhZGVyLmljb25BY3Rpb24gPSBwYWdlLl9oZWFkZXIuaWNvbkFjdGlvblxuXHRcdEBoZWFkZXIudmlzaWJsZSA9IHBhZ2UuX2hlYWRlci52aXNpYmxlXG5cdFx0cGFnZS5fb25Mb2FkKClcblxuXG5cblxuXG4jIFx0ZFAgICAgIGRQIG9vXG4jIFx0ODggICAgIDg4XG4jIFx0ODggICAgLjhQIGRQIC5kODg4OGIuIGRQICBkUCAgZFBcbiMgXHQ4OCAgICBkOCcgODggODhvb29vZDggODggIDg4ICA4OFxuIyBcdDg4ICAuZDhQICA4OCA4OC4gIC4uLiA4OC44OGIuODgnXG4jIFx0ODg4ODg4JyAgIGRQIGA4ODg4OFAnIDg4ODhQIFk4UFxuXG5cblxuZXhwb3J0cy5WaWV3ID0gY2xhc3MgVmlldyBleHRlbmRzIEZsb3dDb21wb25lbnRcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cblx0XHRAX3RpdGxlID0gb3B0aW9ucy50aXRsZSA/ICdIb21lJ1xuXHRcdEBfaWNvbiA9IG9wdGlvbnMuaWNvbiA/ICdtZW51J1xuXHRcdEBfaWNvbkFjdGlvbiA9IG9wdGlvbnMuaWNvbkFjdGlvbiA/IC0+IGFwcC5tZW51T3ZlcmxheS5zaG93KCkgXG5cblx0XHRzdXBlciBfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRuYW1lOiAnVmlldydcblx0XHRcdGFuaW1hdGlvbk9wdGlvbnM6IHtjdXJ2ZTogXCJzcHJpbmcoMzAwLCAzNSwgMClcIn1cblx0XHRcdHNoYWRvd1NwcmVhZDogMiwgc2hhZG93Q29sb3I6ICdyZ2JhKDAsMCwwLC4xKScsIHNoYWRvd0JsdXI6IDZcblxuXHRcdEBvblRyYW5zaXRpb25TdGFydCAoY3VycmVudCwgbmV4dCwgZGlyZWN0aW9uKSAtPiBhcHAuY2hhbmdlUGFnZShuZXh0KVxuXG5cdG5ld1BhZ2U6IChvcHRpb25zID0ge30pIC0+XG5cdFx0cGFnZSA9IG5ldyBQYWdlIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdHNpemU6IEBzaXplXG5cdFx0cmV0dXJuIHBhZ2UgXG5cblx0bGlua1RvOiAocGFnZSkgLT5cblx0XHRpZiBwYWdlPyBhbmQgQGN1cnJlbnQgaXNudCBwYWdlXG5cdFx0XHRAc2hvd05leHQocGFnZSlcblxuXG5cblxuXG5cblxuXG4jIFx0ZFBcbiMgXHQ4OFxuIyBcdDg4IC5kODg4OGIuIC5kODg4OGIuIDg4ZDg4OGIuXG4jIFx0ODggODgnICBgXCJcIiA4OCcgIGA4OCA4OCcgIGA4OFxuIyBcdDg4IDg4LiAgLi4uIDg4LiAgLjg4IDg4ICAgIDg4XG4jIFx0ZFAgYDg4ODg4UCcgYDg4ODg4UCcgZFAgICAgZFBcbiMgXHRcbiMgXHRcblxuZXhwb3J0cy5JY29uID0gY2xhc3MgSWNvbiBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXG5cdFx0QF9pY29uID0gb3B0aW9ucy5pY29uID8gJ21lbnUnXG5cdFx0QF9jb2xvciA9IG9wdGlvbnMuY29sb3IgPyAnIzAwMDAwJ1xuXHRcdEBfYmFja2dyb3VuZENvbG9yID0gb3B0aW9ucy5iYWNrZ3JvdW5kQ29sb3IgPyBudWxsXG5cblx0XHRzdXBlciBfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRuYW1lOiAnLidcblx0XHRcdGhlaWdodDogMjQsIHdpZHRoOiAyNFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBAX2JhY2tncm91bmRDb2xvclxuXG5cdFx0IyBAaWNvbiA9IEBfaWNvblxuXG5cdEBkZWZpbmUgXCJpY29uXCIsXG5cdFx0Z2V0OiAtPiByZXR1cm4gQF9pY29uXG5cdFx0c2V0OiAobmFtZSkgLT5cblx0XHRcdEBfaWNvbiA9IG5hbWVcblxuXHRcdFx0c3ZnID0gaWYgaWNvbnNbQF9pY29uXSB0aGVuIFwiPHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAyNCAyNCc+PHBhdGggZD0nI3tpY29uc1tAX2ljb25dfScgZmlsbD0nI3tAX2NvbG9yfScvPjwvc3ZnPlwiXG5cdFx0XHRlbHNlIHRocm93IFwiRXJyb3I6IGljb24gJyN7bmFtZX0nIHdhcyBub3QgZm91bmQuIFNlZSBodHRwczovL21hdGVyaWFsZGVzaWduaWNvbnMuY29tLyBmb3IgZnVsbCBsaXN0IG9mIGljb25zLlwiXG5cblx0XHRcdEBodG1sID0gc3ZnXG5cblx0QGRlZmluZSBcImNvbG9yXCIsXG5cdFx0Z2V0OiAtPiByZXR1cm4gQF9jb2xvclxuXHRcdHNldDogKGNvbG9yKSAtPlxuXHRcdFx0QF9jb2xvciA9IG5ldyBDb2xvcihjb2xvcilcblxuXHRcdFx0c3ZnID0gaWYgaWNvbnNbQF9pY29uXSB0aGVuIFwiPHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAyNCAyNCc+PHBhdGggZD0nI3tpY29uc1tAX2ljb25dfScgZmlsbD0nI3tAX2NvbG9yfScvPjwvc3ZnPlwiXG5cdFx0XHRlbHNlIHRocm93IFwiRXJyb3I6IGljb24gJyN7bmFtZX0nIHdhcyBub3QgZm91bmQuIFNlZSBodHRwczovL21hdGVyaWFsZGVzaWduaWNvbnMuY29tLyBmb3IgZnVsbCBsaXN0IG9mIGljb25zLlwiXG5cblx0XHRcdEBodG1sID0gc3ZnXG5cblxuXG5cblxuXG4jIC5kODg4ODhiICAgIGRQICAgICAgICAgICAgICBkUCAgICAgICAgICAgICAgICAgICAgICA4ODg4ODhiYSAgICAgICAgICAgICAgICAgICBcbiMgODguICAgIFwiJyAgIDg4ICAgICAgICAgICAgICA4OCAgICAgICAgICAgICAgICAgICAgICA4OCAgICBgOGIgICAgICAgICAgICAgICAgICBcbiMgYFk4ODg4OGIuIGQ4ODg4UCAuZDg4ODhiLiBkODg4OFAgZFAgICAgZFAgLmQ4ODg4Yi4gYTg4YWFhYThQJyAuZDg4ODhiLiA4OGQ4ODhiLlxuIyAgICAgICBgOGIgICA4OCAgIDg4JyAgYDg4ICAgODggICA4OCAgICA4OCBZOG9vb29vLiAgODggICBgOGIuIDg4JyAgYDg4IDg4JyAgYDg4XG4jIGQ4JyAgIC44UCAgIDg4ICAgODguICAuODggICA4OCAgIDg4LiAgLjg4ICAgICAgIDg4ICA4OCAgICAuODggODguICAuODggODggICAgICBcbiMgIFk4ODg4OFAgICAgZFAgICBgODg4ODhQOCAgIGRQICAgYDg4ODg4UCcgYDg4ODg4UCcgIDg4ODg4ODg4UCBgODg4ODhQOCBkUCAgXG5cblxuXG5leHBvcnRzLlN0YXR1c0JhciA9IGNsYXNzIFN0YXR1c0JhciBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0bmFtZTogJy4nXG5cdFx0XHR3aWR0aDogU2NyZWVuLndpZHRoLCBoZWlnaHQ6IDI0XG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IHRoZW1lLnN0YXR1c0Jhci5iYWNrZ3JvdW5kQ29sb3JcblxuXHRcdEBpdGVtcyA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEBcblx0XHRcdHNpemU6IEBzaXplXG5cdFx0XHRpbWFnZTogdGhlbWUuc3RhdHVzQmFyLmltYWdlXG5cdFx0XHRpbnZlcnQ6IHRoZW1lLnN0YXR1c0Jhci5pbnZlcnRcblxuXG5cblxuXG5cblxuXG4jIGRQICAgICBkUCAgICAgICAgICAgICAgICAgICAgICAgICAgZFAgICAgICAgICAgICAgICAgICBcbiMgODggICAgIDg4ICAgICAgICAgICAgICAgICAgICAgICAgICA4OCAgICAgICAgICAgICAgICAgIFxuIyA4OGFhYWFhODhhIC5kODg4OGIuIC5kODg4OGIuIC5kODg4Yjg4IC5kODg4OGIuIDg4ZDg4OGIuXG4jIDg4ICAgICA4OCAgODhvb29vZDggODgnICBgODggODgnICBgODggODhvb29vZDggODgnICBgODhcbiMgODggICAgIDg4ICA4OC4gIC4uLiA4OC4gIC44OCA4OC4gIC44OCA4OC4gIC4uLiA4OCAgICAgIFxuIyBkUCAgICAgZFAgIGA4ODg4OFAnIGA4ODg4OFA4IGA4ODg4OFA4IGA4ODg4OFAnIGRQICAgIFxuXG5cblxuZXhwb3J0cy5IZWFkZXIgPSBjbGFzcyBIZWFkZXIgZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblx0XHRcblx0XHRAX3RpdGxlID0gdW5kZWZpbmVkXG5cdFx0QF9pY29uID0gdW5kZWZpbmVkXG5cdFx0QF9pY29uQWN0aW9uID0gb3B0aW9ucy5pY29uQWN0aW9uID8gLT4gbnVsbFxuXG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0bmFtZTogJ0hlYWRlcicsIFxuXHRcdFx0d2lkdGg6IFNjcmVlbi53aWR0aCwgaGVpZ2h0OiA4MFxuXHRcdFx0c2hhZG93WTogMiwgc2hhZG93Qmx1cjogMywgc2hhZG93Q29sb3I6ICdyZ2JhKDAsMCwwLC4yNCknXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IHRoZW1lLmhlYWRlci5iYWNrZ3JvdW5kQ29sb3JcblxuXHRcdCMgVE9ETzogaWYgb3B0aW9ucy5pY29uIGlzIGZhbHNlIHRoZW4gbm8gaWNvbkxheWVyLCBtb3ZlIHRpdGxlIGxlZnRcblxuXHRcdEB0aXRsZUxheWVyID0gbmV3IHR5cGUuVGl0bGVcblx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBAXG5cdFx0XHR4OiA3MiwgeTogQWxpZ24uYm90dG9tKC0xNClcblx0XHRcdGNvbG9yOiB0aGVtZS5oZWFkZXIudGl0bGVcblx0XHRcdHRleHQ6IEB0aXRsZSA/IFwiTm8gdGl0bGVcIlxuXG5cdFx0QHRpdGxlID0gb3B0aW9ucy50aXRsZSA/ICdEZWZhdWx0IEhlYWRlcidcblxuXHRcdEBpY29uTGF5ZXIgPSBuZXcgSWNvblxuXHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEAsIFxuXHRcdFx0eDogMTIsIHk6IEFsaWduLmNlbnRlcigxMilcblx0XHRcdGljb246ICdtZW51JywgY29sb3I6IHRoZW1lLmhlYWRlci5pY29uLmNvbG9yXG5cblx0XHRAaWNvbiA9IG9wdGlvbnMuaWNvbiA/ICdtZW51J1xuXG5cdFx0QHN0YXR1c0JhciA9IG5ldyBTdGF0dXNCYXJcblx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBAXG5cblx0XHRAaWNvbkxheWVyLm9uVGFwID0+IEBfaWNvbkFjdGlvbigpXG5cdFx0QGljb25MYXllci5vblRvdWNoU3RhcnQgKGV2ZW50KSA9PiByaXBwbGUoQCwgZXZlbnQucG9pbnQsIEB0aXRsZUxheWVyKVxuXG5cblx0QGRlZmluZSBcInRpdGxlXCIsXG5cdFx0Z2V0OiAtPiByZXR1cm4gQF90aXRsZVxuXHRcdHNldDogKHRpdGxlVGV4dCkgLT5cblx0XHRcdEBfdGl0bGUgPSB0aXRsZVRleHRcblx0XHRcdEB0aXRsZUxheWVyLnRleHRSZXBsYWNlKEB0aXRsZUxheWVyLnRleHQsIEBfdGl0bGUpXG5cblx0QGRlZmluZSBcImljb25cIixcblx0XHRnZXQ6IC0+IHJldHVybiBAX2ljb25cblx0XHRzZXQ6IChpY29uTmFtZSkgLT4gXG5cdFx0XHRAX2ljb24gPSBpY29uTmFtZVxuXHRcdFx0QGljb25MYXllci5pY29uID0gaWNvbk5hbWVcblxuXHRAZGVmaW5lIFwiaWNvbkNvbG9yXCIsXG5cdFx0Z2V0OiAtPiByZXR1cm4gQF9pY29uLmNvbG9yXG5cdFx0c2V0OiAoY29sb3IpIC0+IFxuXHRcdFx0QGljb25MYXllci5jb2xvciA9IGNvbG9yXG5cblx0QGRlZmluZSBcImljb25BY3Rpb25cIixcblx0XHRnZXQ6IC0+IHJldHVybiBAX2ljb25BY3Rpb25cblx0XHRzZXQ6IChhY3Rpb24pIC0+XG5cdFx0XHRAX2ljb25BY3Rpb24gPSBhY3Rpb25cblxuXG5cblxuXG5cblxuIyBcdCA4ODg4ODhiYSAgICAgICAgICAgICBkUCAgICAgZFAgICAgICAgICAgICAgICAgICAgICAgIDg4ODg4OGJhXG4jIFx0IDg4ICAgIGA4YiAgICAgICAgICAgIDg4ICAgICA4OCAgICAgICAgICAgICAgICAgICAgICAgODggICAgYDhiXG4jIFx0YTg4YWFhYThQJyAuZDg4ODhiLiBkODg4OFAgZDg4ODhQIC5kODg4OGIuIDg4ZDhiLmQ4Yi4gODggICAgIDg4IC5kODg4OGIuIGRQICAgLmRQXG4jIFx0IDg4ICAgYDhiLiA4OCcgIGA4OCAgIDg4ICAgICA4OCAgIDg4JyAgYDg4IDg4J2A4OCdgODggODggICAgIDg4IDg4JyAgYDg4IDg4ICAgZDgnXG4jIFx0IDg4ICAgIC44OCA4OC4gIC44OCAgIDg4ICAgICA4OCAgIDg4LiAgLjg4IDg4ICA4OCAgODggODggICAgIDg4IDg4LiAgLjg4IDg4IC44OCdcbiMgXHQgODg4ODg4ODhQIGA4ODg4OFAnICAgZFAgICAgIGRQICAgYDg4ODg4UCcgZFAgIGRQICBkUCBkUCAgICAgZFAgYDg4ODg4UDggODg4OFAnXG5cblxuXG5leHBvcnRzLkJvdHRvbU5hdiA9IGNsYXNzIEJvdHRvbU5hdiBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXHRcdFxuXHRcdEBfZGVzdGluYXRpb25zID0gb3B0aW9ucy5kZXN0aW5hdGlvbnMgPyB0aHJvdyAnTmVlZHMgYXQgbGVhc3Qgb25lIGRlc3RpbmF0aW9uLidcblx0XHRAX2l0ZW1zID0gW11cblx0XHRAX2luaXRpYWxEZXN0aW5hdGlvbiA9IG9wdGlvbnMuaW5pdGlhbERlc3RpbmF0aW9uID8gdW5kZWZpbmVkXG5cdFx0IyBkZXN0aW5hdGlvbiBzaG91bGQgYmU6IFt7bmFtZTogc3RyaW5nLCBpY29uOiBpY29uU3RyaW5nLCBhY3Rpb246IGZ1bmN0aW9ufV1cblx0XHRAX2FjdGl2ZURlc3RpbmF0aW9uID0gQF9pbml0aWFsRGVzdGluYXRpb24gPyBAX2l0ZW1zWzBdXG5cblx0XHRzdXBlciBfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRuYW1lOiAnQm90dG9tIE5hdidcblx0XHRcdHk6IEFsaWduLmJvdHRvbVxuXHRcdFx0d2lkdGg6IFNjcmVlbi53aWR0aCwgaGVpZ2h0OiA1NlxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiB0aGVtZS5ib3R0b21OYXYuYmFja2dyb3VuZENvbG9yXG5cdFx0XHRzaGFkb3dZOiB0aGVtZS5ib3R0b21OYXYuc2hhZG93WVxuXHRcdFx0c2hhZG93Qmx1cjogdGhlbWUuYm90dG9tTmF2LnNoYWRvd0JsdXJcblx0XHRcdHNoYWRvd0NvbG9yOiB0aGVtZS5ib3R0b21OYXYuc2hhZG93Q29sb3Jcblx0XHRcdGNsaXA6IHRydWVcblxuXG5cdFx0Zm9yIGRlc3RpbmF0aW9uLCBpIGluIEBfZGVzdGluYXRpb25zXG5cdFx0XHRpdGVtID0gbmV3IExheWVyXG5cdFx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBAXG5cdFx0XHRcdHg6IEB3aWR0aC9AX2Rlc3RpbmF0aW9ucy5sZW5ndGggKiBpXG5cdFx0XHRcdHdpZHRoOiBAd2lkdGgvQF9kZXN0aW5hdGlvbnMubGVuZ3RoLCBoZWlnaHQ6IEBoZWlnaHRcblx0XHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cblx0XHRcdGl0ZW0uZGlzayA9IG5ldyBMYXllclxuXHRcdFx0XHRuYW1lOiAnLicsIHBhcmVudDogaXRlbVxuXHRcdFx0XHR4OiBBbGlnbi5jZW50ZXIsIHk6IEFsaWduLmNlbnRlclxuXHRcdFx0XHRoZWlnaHQ6IEBoZWlnaHQgKiAxLjUsIHdpZHRoOiBAaGVpZ2h0ICogMS41LCBib3JkZXJSYWRpdXM6IEBoZWlnaHRcblx0XHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cblx0XHRcdGl0ZW0uaWNvbkxheWVyID0gbmV3IEljb25cblx0XHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IGl0ZW0uZGlza1xuXHRcdFx0XHR4OiBBbGlnbi5jZW50ZXIsIHk6IEFsaWduLmNlbnRlcigtOClcblx0XHRcdFx0aWNvbjogZGVzdGluYXRpb24uaWNvblxuXHRcdFx0XHRhbmltYXRpb25PcHRpb25zOiB7dGltZTogLjE1fVxuXG5cdFx0XHRpdGVtLmxhYmVsTGF5ZXIgPSBuZXcgdHlwZS5DYXB0aW9uXG5cdFx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBpdGVtLmRpc2tcblx0XHRcdFx0eDogQWxpZ24uY2VudGVyLCB5OiBBbGlnbi5jZW50ZXIoMTQpXG5cdFx0XHRcdHdpZHRoOiBAd2lkdGgsIHRleHRBbGlnbjogJ2NlbnRlcidcblx0XHRcdFx0dGV4dDogZGVzdGluYXRpb24udGl0bGVcblx0XHRcdFx0YW5pbWF0aW9uT3B0aW9uczoge3RpbWU6IC4xNX1cblxuXHRcdFx0aXRlbS5hY3Rpb24gPSBkZXN0aW5hdGlvbi5hY3Rpb25cblxuXHRcdFx0aXRlbS5kaXNrLm9uVG91Y2hTdGFydCAoZXZlbnQpIC0+IFxuXHRcdFx0XHRyaXBwbGUoQCwgZXZlbnQucG9pbnQsIEBwYXJlbnQuaWNvbkxheWVyLCBuZXcgQ29sb3IodGhlbWUucHJpbWFyeSkuYWxwaGEoLjMpKVxuXG5cdFx0XHRpdGVtLm9uVGFwIC0+IEBwYXJlbnQuYWN0aXZlRGVzdGluYXRpb24gPSBAXG5cblx0XHRcdEBfaXRlbXMucHVzaChpdGVtKVxuXG5cdFx0XHRAc2hvd0FjdGl2ZShAX2l0ZW1zWzBdKVxuXG5cdFx0XG5cblx0QGRlZmluZSBcImFjdGl2ZURlc3RpbmF0aW9uXCIsXG5cdFx0Z2V0OiAtPiByZXR1cm4gQF9hY3RpdmVEZXN0aW5hdGlvblxuXHRcdHNldDogKGRlc3RpbmF0aW9uKSAtPlxuXHRcdFx0cmV0dXJuIGlmIGRlc3RpbmF0aW9uIGlzIEBfYWN0aXZlRGVzdGluYXRpb25cblx0XHRcdEBfYWN0aXZlRGVzdGluYXRpb24gPSBkZXN0aW5hdGlvblxuXG5cdFx0XHRAX2FjdGl2ZURlc3RpbmF0aW9uLmFjdGlvbigpXG5cdFx0XHRAc2hvd0FjdGl2ZShAX2FjdGl2ZURlc3RpbmF0aW9uKVxuXG5cdHNob3dBY3RpdmU6IChpdGVtKSAtPlxuXHRcdGl0ZW0ubGFiZWxMYXllci5hbmltYXRlIHtjb2xvcjogdGhlbWUucHJpbWFyeSwgb3BhY2l0eTogMX1cblx0XHRpdGVtLmljb25MYXllci5jb2xvciA9IHRoZW1lLnByaW1hcnlcblx0XHRcblxuXHRcdGZvciBzaWIgaW4gaXRlbS5zaWJsaW5nc1xuXHRcdFx0c2liLmxhYmVsTGF5ZXIuYW5pbWF0ZSB7Y29sb3I6ICcjNzc3J31cblx0XHRcdHNpYi5pY29uTGF5ZXIuY29sb3IgPSAnIzc3NydcblxuXG5cblxuIyAgODg4ODg4YmEgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4jICA4OCAgICBgOGIgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiMgYTg4YWFhYThQJyAuZDg4ODhiLiAuZDg4ODhiLiAuZDg4ODhiLlxuIyAgODggICAgICAgIDg4JyAgYDg4IDg4JyAgYDg4IDg4b29vb2Q4XG4jICA4OCAgICAgICAgODguICAuODggODguICAuODggODguICAuLi5cbiMgIGRQICAgICAgICBgODg4ODhQOCBgODg4OFA4OCBgODg4ODhQJ1xuIyAgICAgICAgICAgICAgICAgICAgICAgICAgLjg4ICAgICAgICAgXG4jICAgICAgICAgICAgICAgICAgICAgIGQ4ODg4UCAgICAgICAgICBcblxuXG5cbmV4cG9ydHMuUGFnZSA9IGNsYXNzIFBhZ2UgZXh0ZW5kcyBTY3JvbGxDb21wb25lbnRcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cdFx0XG5cdFx0QF9oZWFkZXIgPSB7fVxuXHRcdEBfaGVhZGVyLnRpdGxlID0gb3B0aW9ucy5oZWFkZXI/LnRpdGxlID8gJ05ldyBQYWdlJ1xuXHRcdEBfaGVhZGVyLnZpc2libGUgPSBvcHRpb25zLmhlYWRlcj8udmlzaWJsZSA/IHRydWVcblx0XHRAX2hlYWRlci5pY29uID0gb3B0aW9ucy5oZWFkZXI/Lmljb24gPyAnbWVudSdcblx0XHRAX2hlYWRlci5pY29uQWN0aW9uID0gb3B0aW9ucy5oZWFkZXI/Lmljb25BY3Rpb24gPyAtPiBudWxsXG5cblx0XHRAX3RlbXBsYXRlID0gb3B0aW9ucy50ZW1wbGF0ZVxuXHRcdEBfdGVtcGxhdGVPcGFjaXR5ID0gb3B0aW9ucy50ZW1wbGF0ZU9wYWNpdHkgPyAuNVxuXHRcdEBfb25Mb2FkID0gb3B0aW9ucy5vbkxvYWQgPyAtPiBudWxsXG5cblx0XHRpZiBAX2hlYWRlci5pY29uQWN0aW9uIHRoZW4gQF9oZWFkZXIuaWNvbkFjdGlvbiA9IF8uYmluZChAX2hlYWRlci5pY29uQWN0aW9uLCBAKVxuXHRcdGlmIEBfb25Mb2FkIHRoZW4gQF9vbkxvYWQgPSBfLmJpbmQoQF9vbkxvYWQsIEApXG5cblxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdG5hbWU6ICdQYWdlJ1xuXHRcdFx0c2l6ZTogU2NyZWVuLnNpemVcblx0XHRcdHNjcm9sbEhvcml6b250YWw6IGZhbHNlXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IHRoZW1lLnBhZ2UucHJpbWFyeS5iYWNrZ3JvdW5kQ29sb3Jcblx0XHRcblx0XHRAY29udGVudEluc2V0ID1cblx0XHRcdHRvcDogMCwgYm90dG9tOiAxNjBcblxuXHRcdEBjb250ZW50LmJhY2tncm91bmRDb2xvciA9IG51bGxcblxuXHRcdGlmIEBfdGVtcGxhdGU/XG5cdFx0XHRAX3RlbXBsYXRlLnByb3BzID1cblx0XHRcdFx0cGFyZW50OiBAXG5cdFx0XHRcdG9wYWNpdHk6IEBfdGVtcGxhdGVPcGFjaXR5XG5cblx0XHRAc2VuZFRvQmFjaygpXG5cblxuXHR1cGRhdGU6IC0+IHJldHVybiBudWxsXG5cblxuXG5cblxuXG5cblxuIyAgODg4ODg4YmEgICAgICAgICAgICAgICAgICAgICAgZFAgICBkUCAgICAgICAgICAgICAgICAgICAgICBcbiMgIDg4ICAgIGA4YiAgICAgICAgICAgICAgICAgICAgIDg4ICAgODggICAgICAgICAgICAgICAgICAgICAgXG4jIGE4OGFhYWE4UCcgLmQ4ODg4Yi4gZFAgIGRQICBkUCA4OCBkODg4OFAgLmQ4ODg4Yi4gODhkOGIuZDhiLlxuIyAgODggICBgOGIuIDg4JyAgYDg4IDg4ICA4OCAgODggODggICA4OCAgIDg4b29vb2Q4IDg4J2A4OCdgODhcbiMgIDg4ICAgICA4OCA4OC4gIC44OCA4OC44OGIuODgnIDg4ICAgODggICA4OC4gIC4uLiA4OCAgODggIDg4XG4jICBkUCAgICAgZFAgYDg4ODg4UCcgODg4OFAgWThQICBkUCAgIGRQICAgYDg4ODg4UCcgZFAgIGRQICBkUFxuXG5cblxuZXhwb3J0cy5Sb3dJdGVtID0gY2xhc3MgUm93SXRlbSBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXG5cdFx0QF9pY29uID0gb3B0aW9ucy5pY29uXG5cdFx0QF9pY29uQmFja2dyb3VuZENvbG9yID0gb3B0aW9ucy5pY29uQmFja2dyb3VuZENvbG9yID8gJyM3NzcnXG5cdFx0QF90ZXh0ID0gb3B0aW9ucy50ZXh0ID8gJ1JvdyBpdGVtJ1xuXHRcdEBfcm93ID0gb3B0aW9ucy5yb3cgPyAwXG5cdFx0QF95ID0gMzIgKyAoQF9yb3cgKiA0OCkgXG5cblx0XHRzdXBlciBfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHR3aWR0aDogU2NyZWVuLndpZHRoXG5cdFx0XHR5OiBAX3lcblx0XHRcdGhlaWdodDogNDhcblx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXG5cdFx0QGljb24gPSBuZXcgTGF5ZXJcblx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBAXG5cdFx0XHR4OiAxNiwgeTogQWxpZ24uY2VudGVyXG5cdFx0XHRoZWlnaHQ6IDMyLCB3aWR0aDogMzIsIGJvcmRlclJhZGl1czogMTZcblx0XHRcdGJhY2tncm91bmRDb2xvcjogQF9pY29uQmFja2dyb3VuZENvbG9yXG5cdFx0XHRpbWFnZTogQF9pY29uXG5cblx0XHRAbGFiZWxMYXllciA9IG5ldyB0eXBlLlJlZ3VsYXJcblx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBAXG5cdFx0XHR4OiBAaWNvbi5tYXhYICsgMTYsIHk6IEFsaWduLmNlbnRlclxuXHRcdFx0Y29sb3I6IHRoZW1lLnRleHQudGV4dFxuXHRcdFx0dGV4dDogQF90ZXh0XG5cblxuXG5cblxuXG5cblxuIyBcdDg4ODhiYS44OGJhICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgODg4ODg4YmEgICAgICAgICAgICAgZFAgICAgIGRQXG4jIFx0ODggIGA4YiAgYDhiICAgICAgICAgICAgICAgICAgICAgICAgICAgICA4OCAgICBgOGIgICAgICAgICAgICA4OCAgICAgODhcbiMgXHQ4OCAgIDg4ICAgODggLmQ4ODg4Yi4gODhkODg4Yi4gZFAgICAgZFAgYTg4YWFhYThQJyBkUCAgICBkUCBkODg4OFAgZDg4ODhQIC5kODg4OGIuIDg4ZDg4OGIuXG4jIFx0ODggICA4OCAgIDg4IDg4b29vb2Q4IDg4JyAgYDg4IDg4ICAgIDg4ICA4OCAgIGA4Yi4gODggICAgODggICA4OCAgICAgODggICA4OCcgIGA4OCA4OCcgIGA4OFxuIyBcdDg4ICAgODggICA4OCA4OC4gIC4uLiA4OCAgICA4OCA4OC4gIC44OCAgODggICAgLjg4IDg4LiAgLjg4ICAgODggICAgIDg4ICAgODguICAuODggODggICAgODhcbiMgXHRkUCAgIGRQICAgZFAgYDg4ODg4UCcgZFAgICAgZFAgYDg4ODg4UCcgIDg4ODg4ODg4UCBgODg4ODhQJyAgIGRQICAgICBkUCAgIGA4ODg4OFAnIGRQICAgIGRQXG5cblxuXG5jbGFzcyBNZW51QnV0dG9uIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cdFx0XG5cdFx0QF9pY29uID0gb3B0aW9ucy5pY29uID8gJ2hvbWUnXG5cdFx0QF90ZXh0ID0gb3B0aW9ucy50ZXh0ID8gJ0RlZmF1bHQnXG5cdFx0QF9hY3Rpb24gPSBvcHRpb25zLmFjdGlvbiA/IC0+IG51bGxcblxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdGhlaWdodDogNDgsIHdpZHRoOiAzMDRcblx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXG5cdFx0QGljb25MYXllciA9IG5ldyBJY29uXG5cdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQFxuXHRcdFx0eTogQWxpZ24uY2VudGVyXG5cdFx0XHRpY29uOiBAX2ljb24sIGNvbG9yOiB0aGVtZS5tZW51T3ZlcmxheS50ZXh0XG5cblx0XHRAbGFiZWxMYXllciA9IG5ldyB0eXBlLlJlZ3VsYXJcblx0XHRcdG5hbWU6ICdsYWJlbCcsIHBhcmVudDogQFxuXHRcdFx0eDogQGljb25MYXllci5tYXhYICsgMTZcblx0XHRcdHk6IEFsaWduLmNlbnRlcigpXG5cdFx0XHRjb2xvcjogdGhlbWUubWVudU92ZXJsYXkudGV4dFxuXHRcdFx0dGV4dDogQF90ZXh0XG5cblx0XHRAb25UYXAgQF9hY3Rpb25cblx0XHRAb25UYXAgLT4gXG5cdFx0XHRVdGlscy5kZWxheSAuMjUsID0+IEBwYXJlbnQuaGlkZSgpXG5cblxuXG5cblxuXG5cblxuIyBcdDg4ODhiYS44OGJhICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLjg4ODg4LiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZFAgICAgICAgICAgICAgICAgICBcbiMgXHQ4OCAgYDhiICBgOGIgICAgICAgICAgICAgICAgICAgICAgICAgICAgZDgnICAgYDhiICAgICAgICAgICAgICAgICAgICAgICAgICAgIDg4ICAgICAgICAgICAgICAgICAgXG4jIFx0ODggICA4OCAgIDg4IC5kODg4OGIuIDg4ZDg4OGIuIGRQICAgIGRQIDg4ICAgICA4OCBkUCAgIC5kUCAuZDg4ODhiLiA4OGQ4ODhiLiA4OCAuZDg4ODhiLiBkUCAgICBkUFxuIyBcdDg4ICAgODggICA4OCA4OG9vb29kOCA4OCcgIGA4OCA4OCAgICA4OCA4OCAgICAgODggODggICBkOCcgODhvb29vZDggODgnICBgODggODggODgnICBgODggODggICAgODhcbiMgXHQ4OCAgIDg4ICAgODggODguICAuLi4gODggICAgODggODguICAuODggWTguICAgLjhQIDg4IC44OCcgIDg4LiAgLi4uIDg4ICAgICAgIDg4IDg4LiAgLjg4IDg4LiAgLjg4XG4jIFx0ZFAgICBkUCAgIGRQIGA4ODg4OFAnIGRQICAgIGRQIGA4ODg4OFAnICBgODg4OFAnICA4ODg4UCcgICBgODg4ODhQJyBkUCAgICAgICBkUCBgODg4ODhQOCBgODg4OFA4OFxuIyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLjg4XG4jICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGQ4ODg4UCBcblxuXG5cbmV4cG9ydHMuTWVudU92ZXJsYXkgPSBjbGFzcyBNZW51T3ZlcmxheSBleHRlbmRzIExheWVyXG5cdFxuXHRcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cblx0XHRAX2xpbmtzID0gb3B0aW9ucy5saW5rcyA/IFt7dGl0bGU6ICdIb21lJywgaWNvbjogJ2hvbWUnLCBhY3Rpb246IC0+IG51bGx9XVxuXHRcdEBfdGl0bGUgPSBvcHRpb25zLnRpdGxlID8gJ01lbnUnXG5cdFx0QF9pbWFnZSA9IG9wdGlvbnMuaW1hZ2UgPyBudWxsXG5cblxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdGhlaWdodDogU2NyZWVuLmhlaWdodFxuXHRcdFx0d2lkdGg6IDMwNFxuXHRcdFx0dmlzaWJsZTogZmFsc2Vcblx0XHRcdGJhY2tncm91bmRDb2xvcjogdGhlbWUubWVudU92ZXJsYXkuYmFja2dyb3VuZENvbG9yXG5cdFx0XHRhbmltYXRpb25PcHRpb25zOiB7Y3VydmU6IFwic3ByaW5nKDMwMCwgMzUsIDApXCJ9XG5cblxuXHRcdEBzY3JpbSA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogJy4nLCBcblx0XHRcdHNpemU6IFNjcmVlbi5zaXplXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6ICdyZ2JhKDAsMCwwLC42KSdcblx0XHRcdG9wYWNpdHk6IDBcblx0XHRcdHZpc2libGU6IGZhbHNlXG5cdFx0XHRhbmltYXRpb25PcHRpb25zOlxuXHRcdFx0XHR0aW1lOiAuMjVcblxuXHRcdEBzY3JpbS5vblRhcCA9PiBAaGlkZSgpXG5cdFx0QG9uU3dpcGVMZWZ0RW5kID0+IEBoaWRlKClcblxuXHRcdEBoZWFkZXIgPSBuZXcgTGF5ZXJcblx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBAXG5cdFx0XHR3aWR0aDogQHdpZHRoLCBoZWlnaHQ6IDE3M1xuXHRcdFx0aW1hZ2U6IHRoZW1lLnVzZXIuaW1hZ2Vcblx0XHRcdGJhY2tncm91bmRDb2xvcjogdGhlbWUubWVudU92ZXJsYXkuaGVhZGVyLmJhY2tncm91bmRDb2xvclxuXG5cdFx0QHRpdGxlSWNvbiA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEBoZWFkZXJcblx0XHRcdHg6IDE2LCB5OiA0MFxuXHRcdFx0aGVpZ2h0OiA2NCwgd2lkdGg6IDY0XG5cdFx0XHRib3JkZXJSYWRpdXM6IDMyXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IHRoZW1lLm1lbnVPdmVybGF5LmhlYWRlci5pY29uXG5cblx0XHRAc3ViaGVhZGVyRXhwYW5kID0gbmV3IEljb25cblx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBAaGVhZGVyXG5cdFx0XHR4OiBBbGlnbi5yaWdodCgtMTYpXG5cdFx0XHR5OiBBbGlnbi5ib3R0b20oLTE2KVxuXHRcdFx0aWNvbjogJ21lbnUtZG93bidcblx0XHRcdGNvbG9yOiB0aGVtZS5tZW51T3ZlcmxheS5zdWJoZWFkZXIuaWNvblxuXG5cdFx0QHN1YmhlYWRlciA9IG5ldyB0eXBlLkJvZHkxXG5cdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQGhlYWRlclxuXHRcdFx0d2lkdGg6IEB3aWR0aFxuXHRcdFx0eDogMTYsIHk6IEFsaWduLmJvdHRvbSgtMTgpXG5cdFx0XHR0ZXh0OiBAX3RpdGxlXG5cdFx0XHRjb2xvcjogdGhlbWUubWVudU92ZXJsYXkuc3ViaGVhZGVyLnRleHRcblxuXHRcdGxpbmtzID0gW11cblxuXHRcdGZvciBsaW5rLCBpIGluIEBfbGlua3Ncblx0XHRcdGxpbmtzW2ldID0gbmV3IE1lbnVCdXR0b25cblx0XHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEBcblx0XHRcdFx0eDogMTYsIHk6IDE4OSArICg0OCAqIGkpXG5cdFx0XHRcdHRleHQ6IGxpbmsudGl0bGVcblx0XHRcdFx0aWNvbjogbGluay5pY29uXG5cdFx0XHRcdGFjdGlvbjogbGluay5hY3Rpb25cblxuXHRzaG93OiAtPlxuXHRcdEBicmluZ1RvRnJvbnQoKVxuXHRcdEB2aXNpYmxlID0gdHJ1ZVxuXHRcdEB4ID0gLVNjcmVlbi53aWR0aFxuXHRcdEBhbmltYXRlXG5cdFx0XHR4OiAwXG5cblx0XHRAc2NyaW0ucGxhY2VCZWhpbmQoQClcblx0XHRAc2NyaW0udmlzaWJsZSA9IHRydWVcblx0XHRAc2NyaW0uYW5pbWF0ZVxuXHRcdFx0b3BhY2l0eTogMVxuXG5cdGhpZGU6IC0+XG5cdFx0QGFuaW1hdGVcblx0XHRcdHg6IC1TY3JlZW4ud2lkdGhcblxuXHRcdEBzY3JpbS5hbmltYXRlXG5cdFx0XHRvcGFjaXR5OiAwXG5cblx0XHRVdGlscy5kZWxheSAuMywgPT5cblx0XHRcdEB2aXNpYmxlID0gZmFsc2Vcblx0XHRcdEBzY3JpbS52aXNpYmxlID0gZmFsc2Vcblx0XHRcdEBzZW5kVG9CYWNrKClcblx0XHRcdEBzY3JpbS5zZW5kVG9CYWNrKClcblxuXG5cblxuXG5cblxuXG4jIFx0ODg4ODg4YmEgIG9vICAgICAgICAgIGRQXG4jIFx0ODggICAgYDhiICAgICAgICAgICAgIDg4XG4jIFx0ODggICAgIDg4IGRQIC5kODg4OGIuIDg4IC5kODg4OGIuIC5kODg4OGIuXG4jIFx0ODggICAgIDg4IDg4IDg4JyAgYDg4IDg4IDg4JyAgYDg4IDg4JyAgYDg4XG4jIFx0ODggICAgLjhQIDg4IDg4LiAgLjg4IDg4IDg4LiAgLjg4IDg4LiAgLjg4XG4jIFx0ODg4ODg4OFAgIGRQIGA4ODg4OFA4IGRQIGA4ODg4OFAnIGA4ODg4UDg4XG4jIFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLjg4XG4jIFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkODg4OFBcblxuXG5cbmV4cG9ydHMuRGlhbG9nID0gY2xhc3MgRGlhbG9nIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cblx0XHRzdXBlciBfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRuYW1lOiAnLicsIHBhcmVudDogYXBwXG5cdFx0XHRzaXplOiBTY3JlZW4uc2l6ZVxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiAncmdiYSgwLCAwLCAwLCAuNSknXG5cdFx0XHRvcGFjaXR5OiAwXG5cdFx0XHRcblx0XHRAX3RpdGxlID0gb3B0aW9ucy50aXRsZSA/ICdEZWZhdWx0IFRpdGxlJ1xuXHRcdEBfYm9keSA9IG9wdGlvbnMuYm9keSA/ICdCb2R5IHRleHQgZ29lcyBoZXJlLidcblx0XHRAX2FjY2VwdFRleHQgPSBvcHRpb25zLmFjY2VwdFRleHQgPyAnY29uZmlybSdcblx0XHRAX2FjY2VwdEFjdGlvbiA9IG9wdGlvbnMuYWNjZXB0QWN0aW9uID8gLT4gbnVsbFxuXHRcdEBfZGVjbGluZVRleHQgPSBvcHRpb25zLmRlY2xpbmVUZXh0ID8gJydcblx0XHRAX2RlY2xpbmVBY3Rpb24gPSBvcHRpb25zLmRlY2xpbmVBY3Rpb24gPyAtPiBudWxsXG5cdFx0XG5cdFx0QG9uIEV2ZW50cy5UYXAsIChldmVudCkgLT4gZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcblx0XHRcblx0XHRAY29udGFpbmVyID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiAnY29udGFpbmVyJywgcGFyZW50OiBAXG5cdFx0XHR4OiBBbGlnbi5jZW50ZXJcblx0XHRcdGhlaWdodDogMTI4LCB3aWR0aDogU2NyZWVuLndpZHRoIC0gODBcblx0XHRcdGJhY2tncm91bmRDb2xvcjogdGhlbWUuZGlhbG9nLmJhY2tncm91bmRDb2xvclxuXHRcdFx0c2hhZG93WDogMCwgc2hhZG93WTogNywgc2hhZG93Qmx1cjogMzBcblx0XHRcdG9wYWNpdHk6IDBcblx0XHRcdHNoYWRvd0NvbG9yOiAncmdiYSgwLDAsMCwuMyknXG5cdFx0XG5cdFx0QHRpdGxlID0gbmV3IHR5cGUuVGl0bGVcblx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBAY29udGFpbmVyXG5cdFx0XHR4OiAyNCwgeTogMjBcblx0XHRcdGZvbnRTaXplOiAxNiwgZm9udFdlaWdodDogNTAwLCBjb2xvcjogdGhlbWUudGV4dC50aXRsZVxuXHRcdFx0dGV4dDogQF90aXRsZVxuXHRcdFxuXHRcdEBib2R5ID0gbmV3IHR5cGUuU3ViaGVhZFxuXHRcdFx0bmFtZTogJ2JvZHknLCBwYXJlbnQ6IEBjb250YWluZXJcblx0XHRcdHg6IDI0LCB5OiA1MlxuXHRcdFx0d2lkdGg6IEBjb250YWluZXIud2lkdGggLSA0MlxuXHRcdFx0dGV4dDogQF9ib2R5XG5cdFx0XG5cdFx0YnV0dG9uc1kgPSBpZiBAX2JvZHkgaXMgJycgdGhlbiAxMjggZWxzZSBAYm9keS5tYXhZICsgMTZcblx0XHRcblx0XHRAYWNjZXB0ID0gbmV3IEJ1dHRvblxuXHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEBjb250YWluZXJcblx0XHRcdHg6IEFsaWduLnJpZ2h0KC0xNiksIHk6IGJ1dHRvbnNZXG5cdFx0XHR0ZXh0OiBAX2FjY2VwdFRleHQudG9VcHBlckNhc2UoKVxuXHRcdFx0YWN0aW9uOiBAX2FjY2VwdEFjdGlvblxuXHRcdFxuXHRcdGlmIEBfZGVjbGluZVRleHQgaXNudCAnJ1xuXHRcdFx0QGRlY2xpbmUgPSBuZXcgQnV0dG9uXG5cdFx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBAY29udGFpbmVyXG5cdFx0XHRcdHg6IDAsIHk6IGJ1dHRvbnNZXG5cdFx0XHRcdHRleHQ6IEBfZGVjbGluZVRleHQudG9VcHBlckNhc2UoKVxuXHRcdFx0XHRhY3Rpb246IEBfZGVjbGluZUFjdGlvblxuXG5cdFx0IyBzZXQgcG9zaXRpb25zXG5cdFx0QGNvbnRhaW5lci5oZWlnaHQgPSBAYWNjZXB0Lm1heFkgKyAxMlxuXHRcdEBkZWNsaW5lPy5tYXhYID0gQGFjY2VwdC54IC0gMTZcblx0XHRAY29udGFpbmVyLnkgPSBBbGlnbi5jZW50ZXIoMTYpXG5cdFx0XG5cdFx0IyBhZGQgY2xvc2UgYWN0aW9ucyB0byBjb25maXJtIGFuZCBjYW5jZWxcblx0XHRmb3IgYnV0dG9uIGluIFtAYWNjZXB0LCBAZGVjbGluZV1cblx0XHRcdGJ1dHRvbj8ub25UYXAgQGNsb3NlXG5cdFx0XG5cdFx0IyBPTiBMT0FEXG5cdFx0QG9wZW4oKVxuXHRcblx0b3BlbjogPT5cblx0XHRAYW5pbWF0ZVxuXHRcdFx0b3BhY2l0eTogMVxuXHRcdFx0b3B0aW9uczogXG5cdFx0XHRcdHRpbWU6IC4yNVxuXHRcdFxuXHRcdEBjb250YWluZXIuYW5pbWF0ZVxuXHRcdFx0b3BhY2l0eTogMVxuXHRcdFx0b3B0aW9uczpcblx0XHRcdFx0dGltZTogLjI1XG5cdFx0XHRcdGRlbGF5OiAuMDVcblxuXHRjbG9zZTogPT5cblx0XHRAY29udGFpbmVyLmFuaW1hdGVcblx0XHRcdG9wYWNpdHk6IDBcblx0XHRcdG9wdGlvbnM6XG5cdFx0XHRcdHRpbWU6IC4yNVxuXHRcdFxuXHRcdEBhbmltYXRlXG5cdFx0XHRvcGFjaXR5OiAwXG5cdFx0XHRvcHRpb25zOlxuXHRcdFx0XHR0aW1lOiAuMjVcblx0XHRcblx0XHRVdGlscy5kZWxheSAuNSwgPT4gQGRlc3Ryb3koKVxuXG5cblxuXG5cblxuXG5cbiMgXHQgODg4ODg4YmEgICAgICAgICAgICAgZFAgICAgIGRQXG4jIFx0IDg4ICAgIGA4YiAgICAgICAgICAgIDg4ICAgICA4OFxuIyBcdGE4OGFhYWE4UCcgZFAgICAgZFAgZDg4ODhQIGQ4ODg4UCAuZDg4ODhiLiA4OGQ4ODhiLlxuIyBcdCA4OCAgIGA4Yi4gODggICAgODggICA4OCAgICAgODggICA4OCcgIGA4OCA4OCcgIGA4OFxuIyBcdCA4OCAgICAuODggODguICAuODggICA4OCAgICAgODggICA4OC4gIC44OCA4OCAgICA4OFxuIyBcdCA4ODg4ODg4OFAgYDg4ODg4UCcgICBkUCAgICAgZFAgICBgODg4ODhQJyBkUCAgICBkUFxuXG5cblxuZXhwb3J0cy5CdXR0b24gPSBCdXR0b24gPSBjbGFzcyBCdXR0b24gZXh0ZW5kcyBMYXllciBcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cblx0XHRAX3JhaXNlZCA9IG9wdGlvbnMucmFpc2VkID8gZmFsc2Vcblx0XHRAX3R5cGUgPSBpZiBAX3JhaXNlZCB0aGVuICdyYWlzZWQnIGVsc2UgJ2ZsYXQnXG5cdFx0QF9hY3Rpb24gPSBvcHRpb25zLmFjdGlvbiA/IC0+IG51bGxcblxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdG5hbWU6ICcuJ1xuXHRcdFx0d2lkdGg6IDAsIGhlaWdodDogMzZcblx0XHRcdGJvcmRlclJhZGl1czogMlxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiB0aGVtZS5idXR0b25bQF90eXBlXS5iYWNrZ3JvdW5kQ29sb3Jcblx0XHRcdHNoYWRvd1k6IHRoZW1lLmJ1dHRvbltAX3R5cGVdLnNoYWRvd1lcblx0XHRcdHNoYWRvd0JsdXI6IHRoZW1lLmJ1dHRvbltAX3R5cGVdLnNoYWRvd0JsdXJcblx0XHRcdHNoYWRvd0NvbG9yOiB0aGVtZS5idXR0b25bQF90eXBlXS5zaGFkb3dDb2xvclxuXHRcdFx0YW5pbWF0aW9uT3B0aW9uczoge3RpbWU6IC4xNX1cblxuXHRcdEBsYWJlbExheWVyID0gbmV3IHR5cGUuQnV0dG9uXG5cdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQFxuXHRcdFx0Y29sb3I6IHRoZW1lLmJ1dHRvbltAX3R5cGVdLmNvbG9yXG5cdFx0XHR0ZXh0OiBvcHRpb25zLnRleHQgPyAnYnV0dG9uJ1xuXHRcdFx0dGV4dFRyYW5zZm9ybTogJ3VwcGVyY2FzZSdcblx0XHRcdHRleHRBbGlnbjogJ2NlbnRlcidcblx0XHRcdGFuaW1hdGlvbk9wdGlvbnM6IHt0aW1lOiAuMTV9XG5cdFx0XHRwYWRkaW5nOiBcblx0XHRcdFx0bGVmdDogMTYuNSwgcmlnaHQ6IDE2LjVcblx0XHRcdFx0dG9wOiA5LCBib3R0b206IDExXG5cblx0XHRAc2l6ZSA9IEBsYWJlbExheWVyLnNpemVcblx0XHRAeCA9IG9wdGlvbnMueFxuXG5cdFx0QG9uVG91Y2hTdGFydCAoZXZlbnQpIC0+IFxuXHRcdFx0QHNob3dUb3VjaGVkKClcblx0XHRcdFV0aWxzLmRlbGF5IDEsID0+IEByZXNldCgpXG5cdFx0XG5cdFx0QG9uVG91Y2hFbmQgKGV2ZW50KSAtPiBcblx0XHRcdEBfYWN0aW9uKClcblx0XHRcdEByZXNldCgpXG5cblxuXHRzaG93VG91Y2hlZDogLT4gXG5cdFx0QGxhYmVsTGF5ZXIuYW5pbWF0ZSB7YnJpZ2h0bmVzczogMTEwLCBzYXR1cmF0ZTogMTEwfVxuXHRcdFxuXHRcdHN3aXRjaCBAX3R5cGVcblx0XHRcdHdoZW4gJ2ZsYXQnIHRoZW4gQGFuaW1hdGUge2JhY2tncm91bmRDb2xvcjogJ3JnYmEoMCwwLDAsLjA1KSd9XG5cdFx0XHR3aGVuICdyYWlzZWQnXG5cdFx0XHRcdHJpcHBsZShALCBldmVudC5wb2ludCwgQGxhYmVsTGF5ZXIpXG5cdFx0XHRcdEBhbmltYXRlIHtzaGFkb3dZOiAzLCBzaGFkb3dTcHJlYWQ6IDF9XG5cblx0cmVzZXQ6IC0+XG5cdFx0QGxhYmVsTGF5ZXIuYW5pbWF0ZSB7YnJpZ2h0bmVzczogMTAwLCBzYXR1cmF0ZTogMTAwfVxuXHRcdEBiYWNrZ3JvdW5kQ29sb3IgPSB0aGVtZS5idXR0b25bQF90eXBlXS5iYWNrZ3JvdW5kQ29sb3Jcblx0XHRAYW5pbWF0ZSBcblx0XHRcdHNoYWRvd1k6IHRoZW1lLmJ1dHRvbltAX3R5cGVdLnNoYWRvd1lcblx0XHRcdHNoYWRvd1NwcmVhZDogMFxuXG5cblxuXG5cblxuXG4jIFx0IC5kODg4ODg4ICAgICAgICAgICAgIGRQICAgb28gICAgICAgICAgICAgICAgICAgIDg4ODg4OGJhICAgICAgICAgICAgIGRQICAgICBkUFxuIyBcdGQ4JyAgICA4OCAgICAgICAgICAgICA4OCAgICAgICAgICAgICAgICAgICAgICAgICA4OCAgICBgOGIgICAgICAgICAgICA4OCAgICAgODhcbiMgXHQ4OGFhYWFhODhhIC5kODg4OGIuIGQ4ODg4UCBkUCAuZDg4ODhiLiA4OGQ4ODhiLiBhODhhYWFhOFAnIGRQICAgIGRQIGQ4ODg4UCBkODg4OFAgLmQ4ODg4Yi4gODhkODg4Yi5cbiMgXHQ4OCAgICAgODggIDg4JyAgYFwiXCIgICA4OCAgIDg4IDg4JyAgYDg4IDg4JyAgYDg4ICA4OCAgIGA4Yi4gODggICAgODggICA4OCAgICAgODggICA4OCcgIGA4OCA4OCcgIGA4OFxuIyBcdDg4ICAgICA4OCAgODguICAuLi4gICA4OCAgIDg4IDg4LiAgLjg4IDg4ICAgIDg4ICA4OCAgICAuODggODguICAuODggICA4OCAgICAgODggICA4OC4gIC44OCA4OCAgICA4OFxuIyBcdDg4ICAgICA4OCAgYDg4ODg4UCcgICBkUCAgIGRQIGA4ODg4OFAnIGRQICAgIGRQICA4ODg4ODg4OFAgYDg4ODg4UCcgICBkUCAgICAgZFAgICBgODg4ODhQJyBkUCAgICBkUFxuXG5cbmV4cG9ydHMuQWN0aW9uQnV0dG9uID0gQWN0aW9uQnV0dG9uID0gY2xhc3MgQWN0aW9uQnV0dG9uIGV4dGVuZHMgTGF5ZXIgXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXG5cdFx0QF9yYWlzZWQgPSBvcHRpb25zLnJhaXNlZCA/IGZhbHNlXG5cdFx0QF9hY3Rpb24gPSBvcHRpb25zLmFjdGlvbiA/IC0+IG51bGxcblx0XHRAX2ljb24gPSBvcHRpb25zLmljb24gPyAncGx1cydcblxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdG5hbWU6ICcuJ1xuXHRcdFx0eDogQWxpZ24ucmlnaHQoLTE2KSwgeTogQWxpZ24uYm90dG9tKC0xNylcblx0XHRcdHdpZHRoOiA2NCwgaGVpZ2h0OiA2NCwgYm9yZGVyUmFkaXVzOiAzMlxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiB0aGVtZS5mYWIuYmFja2dyb3VuZENvbG9yXG5cdFx0XHRzaGFkb3dZOiAyLCBzaGFkb3dCbHVyOiAzXG5cdFx0XHRzaGFkb3dDb2xvcjogJ3JnYmEoMCwwLDAsLjI1KSdcblx0XHRcdGFuaW1hdGlvbk9wdGlvbnM6IHt0aW1lOiAuMTV9XG5cblx0XHRpZiBhcHAuYm90dG9tTmF2PyB0aGVuIEB5IC09IGFwcC5ib3R0b21OYXYuaGVpZ2h0XG5cblx0XHRAaWNvbkxheWVyID0gbmV3IEljb25cblx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBAXG5cdFx0XHR4OiBBbGlnbi5jZW50ZXIsIHk6IEFsaWduLmNlbnRlclxuXHRcdFx0aWNvbjogQF9pY29uLCBjb2xvcjogdGhlbWUuZmFiLmNvbG9yXG5cblx0XHRAb25Ub3VjaFN0YXJ0IChldmVudCkgLT4gXG5cdFx0XHRAc2hvd1RvdWNoZWQoKVxuXHRcdFx0VXRpbHMuZGVsYXkgMSwgPT4gQHJlc2V0KClcblx0XHRcblx0XHRAb25Ub3VjaEVuZCAoZXZlbnQpIC0+IFxuXHRcdFx0QF9hY3Rpb24oKVxuXHRcdFx0QHJlc2V0KClcblxuXHRcdGFwcC5hY3Rpb25CdXR0b24gPSBAXG5cblxuXHRzaG93VG91Y2hlZDogLT4gXG5cdFx0cmlwcGxlKEAsIGV2ZW50LnBvaW50LCBAaWNvbkxheWVyKVxuXHRcdEBhbmltYXRlIHtzaGFkb3dZOiAzLCBzaGFkb3dTcHJlYWQ6IDF9XG5cblx0cmVzZXQ6IC0+XG5cdFx0QGFuaW1hdGUgXG5cdFx0XHRzaGFkb3dZOiAyXG5cdFx0XHRzaGFkb3dTcHJlYWQ6IDBcblxuXG5cblxuXG5cblxuXG5cbiMgXHQgLjg4ODg4LiAgICAgICAgICAgb28gICAgICAgZFAgZFAgICAgICAgIG9vICAgICAgICAgICAgZFBcbiMgXHRkOCcgICBgODggICAgICAgICAgICAgICAgICAgODggODggICAgICAgICAgICAgICAgICAgICAgODhcbiMgXHQ4OCAgICAgICAgODhkODg4Yi4gZFAgLmQ4ODhiODggODggICAgICAgIGRQIC5kODg4OGIuIGQ4ODg4UFxuIyBcdDg4ICAgWVA4OCA4OCcgIGA4OCA4OCA4OCcgIGA4OCA4OCAgICAgICAgODggWThvb29vby4gICA4OFxuIyBcdFk4LiAgIC44OCA4OCAgICAgICA4OCA4OC4gIC44OCA4OCAgICAgICAgODggICAgICAgODggICA4OFxuIyBcdCBgODg4ODgnICBkUCAgICAgICBkUCBgODg4ODhQOCA4ODg4ODg4OFAgZFAgYDg4ODg4UCcgICBkUFxuXG5leHBvcnRzLkdyaWRMaXN0ID0gR3JpZExpc3QgPSBjbGFzcyBHcmlkTGlzdCBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXHRcdFxuXHRcdEBfY29sdW1ucyA9IG9wdGlvbnMuY29sdW1ucyA/IDJcblx0XHRcblx0XHRzdXBlciBfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRuYW1lOiAnLidcblx0XHRcdHdpZHRoOiBTY3JlZW4ud2lkdGhcblx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFxuXHRcdEB0aWxlcyA9IFtdXG5cdFx0QHRpbGVXaWR0aCA9IChAd2lkdGggLSAyNCkgLyBAX2NvbHVtbnNcblx0XHRAdGlsZUhlaWdodCA9IG9wdGlvbnMudGlsZUhlaWdodCA/IFNjcmVlbi53aWR0aCAvIEBfY29sdW1uc1xuXHRcdFxuXHRhZGRUaWxlOiAodGlsZSkgLT5cblx0XHR0aWxlLmkgPSBAdGlsZXMubGVuZ3RoXG5cdFx0QHRpbGVzLnB1c2godGlsZSlcblx0XHRcblx0XHR0aWxlLnggPSA4ICsgKEB0aWxlV2lkdGggKyA4KSAqICh0aWxlLmkgJSBAX2NvbHVtbnMpXG5cdFx0dGlsZS55ID0gOCArIChAdGlsZUhlaWdodCArIDgpICogTWF0aC5mbG9vcih0aWxlLmkgLyBAX2NvbHVtbnMpXG5cblx0XHRAaGVpZ2h0ID0gXy5sYXN0KEB0aWxlcykubWF4WVxuXG5cdFx0aWYgQHBhcmVudD8ucGFyZW50Py5jb250ZW50PyB0aGVuIEBwYXJlbnQucGFyZW50LnVwZGF0ZUNvbnRlbnQoKVxuXHRcblx0cmVtb3ZlVGlsZTogKHRpbGUpIC0+XG5cdFx0Xy5wdWxsKEB0aWxlcywgdGlsZSlcblx0XHR0aWxlLmRlc3Ryb3koKVxuXHRcdEByZXBvc2l0aW9uVGlsZXMoKVxuXG5cdHJlcG9zaXRpb25UaWxlczogLT5cblx0XHRmb3IgdGlsZSwgaSBpbiBAdGlsZXNcblx0XHRcdHRpbGUuaSA9IGlcblx0XHRcdHRpbGUuYW5pbWF0ZVxuXHRcdFx0XHR4OiA4ICsgKEB0aWxlV2lkdGggKyA4KSAqICh0aWxlLmkgJSBAX2NvbHVtbnMpXG5cdFx0XHRcdHk6IDggKyAoQHRpbGVIZWlnaHQgKyA4KSAqIE1hdGguZmxvb3IodGlsZS5pIC8gQF9jb2x1bW5zKVxuXHRcdEBoZWlnaHQgPSBfLmxhc3QoQHRpbGVzKS5tYXhZXG5cblx0XHRpZiBAcGFyZW50Py5wYXJlbnQ/LmNvbnRlbnQ/IHRoZW4gQHBhcmVudC5wYXJlbnQudXBkYXRlQ29udGVudCgpXG5cblxuXG5cblxuXG5cblxuXG5cbiMgXHRkODg4ODg4UCBvbyBkUFxuIyBcdCAgIDg4ICAgICAgIDg4XG4jIFx0ICAgODggICAgZFAgODggLmQ4ODg4Yi5cbiMgXHQgICA4OCAgICA4OCA4OCA4OG9vb29kOFxuIyBcdCAgIDg4ICAgIDg4IDg4IDg4LiAgLi4uXG4jIFx0ICAgZFAgICAgZFAgZFAgYDg4ODg4UCdcblxuXG5leHBvcnRzLlRpbGUgPSBUaWxlID0gY2xhc3MgVGlsZSBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXHRcdFxuXHRcdEBfaGVhZGVyID0gb3B0aW9ucy5oZWFkZXIgPyBmYWxzZVxuXHRcdEBfZm9vdGVyID0gb3B0aW9ucy5mb290ZXIgPyBmYWxzZVxuXHRcdEBfYWN0aW9uID0gb3B0aW9ucy5hY3Rpb24gPyAtPiBudWxsXG5cdFx0QF9oZWFkZXJBY3Rpb24gPSBvcHRpb25zLmhlYWRlckFjdGlvbiA/IC0+IG51bGxcblx0XHRAX2Zvb3RlckFjdGlvbiA9IG9wdGlvbnMuZm9vdGVyQWN0aW9uID8gLT4gbnVsbFxuXHRcdFxuXHRcdGlmIEBfaGVhZGVyIGFuZCBAX2Zvb3RlciB0aGVuIHRocm93ICdUaWxlIGNhbm5vdCBoYXZlIGJvdGggYSBoZWFkZXIgYW5kIGEgZm9vdGVyLidcblx0XHRcblx0XHRAX2ljb24gPSBvcHRpb25zLmljb25cblx0XHRAZ3JpZExpc3QgPSBvcHRpb25zLmdyaWRMaXN0ID8gdGhyb3cgJ1RpbGUgbmVlZHMgYSBncmlkIHByb3BlcnR5Lidcblx0XHRcblx0XHRzdXBlciBfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQGdyaWRMaXN0XG5cdFx0XHR3aWR0aDogQGdyaWRMaXN0LnRpbGVXaWR0aFxuXHRcdFx0aGVpZ2h0OiBAZ3JpZExpc3QudGlsZUhlaWdodFxuXHRcdFx0YW5pbWF0aW9uT3B0aW9uczoge3RpbWU6IC4zfVxuXHRcdFxuXHRcdEBvblRvdWNoU3RhcnQgKGV2ZW50KSAtPiBcblx0XHRcdGlmIEBncmlkTGlzdC5wYXJlbnQ/LnBhcmVudD8uY29udGVudCBhbmQgQGdyaWRMaXN0LnBhcmVudD8ucGFyZW50Py5pc01vdmluZyBpcyBmYWxzZVxuXHRcdFx0XHRyaXBwbGUoQCwgZXZlbnQucG9pbnQsIEBoZWFkZXIsIG9wdGlvbnMucmlwcGxlQ29sb3IgPyAncmdiYSgwLDAsMCwuMSknKVxuXHRcdFxuXHRcdEBvblRhcCBAX2FjdGlvblxuXHRcdEBvblRhcCAoZXZlbnQpIC0+IGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXG5cblx0XHRpZiBAX2hlYWRlciBvciBAX2Zvb3RlclxuXHRcdFx0QGhlYWRlciA9IG5ldyBMYXllclxuXHRcdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQFxuXHRcdFx0XHR5OiBpZiBAX2Zvb3RlciB0aGVuIEFsaWduLmJvdHRvbSgpXG5cdFx0XHRcdHdpZHRoOiBAd2lkdGhcblx0XHRcdFx0aGVpZ2h0OiBpZiBvcHRpb25zLnN1cHBvcnQgdGhlbiA2OCBlbHNlIDQ4XG5cdFx0XHRcdGJhY2tncm91bmRDb2xvcjogb3B0aW9ucy5iYWNrZ3JvdW5kQ29sb3IgPyAncmdiYSgwLDAsMCwuNSknXG5cdFx0XHRcblx0XHRcdEBoZWFkZXIub25Ub3VjaFN0YXJ0IChldmVudCkgLT4gcmlwcGxlKEAsIGV2ZW50LnBvaW50LCBAdGl0bGUpXG5cdFx0XHRcblx0XHRcdGlmIEBfZm9vdGVyIHRoZW4gQGhlYWRlci5vblRhcCBAX2Zvb3RlckFjdGlvblxuXHRcdFx0ZWxzZSBAaGVhZGVyLm9uVGFwIEBfaGVhZGVyQWN0aW9uXG5cblx0XHRcdEBoZWFkZXIub25UYXAgKGV2ZW50KSAtPiBldmVudC5zdG9wUHJvcGFnYXRpb24oKVxuXG5cdFx0XHRpZiBvcHRpb25zLnRpdGxlXG5cdFx0XHRcdEBoZWFkZXIudGl0bGUgPSBuZXcgdHlwZS5SZWd1bGFyXG5cdFx0XHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEBoZWFkZXJcblx0XHRcdFx0XHR4OiA4LCB5OiBpZiBvcHRpb25zLnN1cHBvcnQgdGhlbiAxMiBlbHNlIEFsaWduLmNlbnRlcigpXG5cdFx0XHRcdFx0Y29sb3I6IEBjb2xvclxuXHRcdFx0XHRcdHRleHQ6IG9wdGlvbnMudGl0bGUgPyAnVHdvIExpbmUnXG5cdFx0XHRcblx0XHRcdFx0aWYgb3B0aW9ucy5zdXBwb3J0XG5cdFx0XHRcdFx0QGhlYWRlci5zdXBwb3J0ID0gbmV3IFRleHRMYXllclxuXHRcdFx0XHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEBoZWFkZXJcblx0XHRcdFx0XHRcdHg6IDgsIHk6IDM1XG5cdFx0XHRcdFx0XHRmb250U2l6ZTogMTJcblx0XHRcdFx0XHRcdGZvbnRGYW1pbHk6ICdSb2JvdG8nXG5cdFx0XHRcdFx0XHRjb2xvcjogQGNvbG9yXG5cdFx0XHRcdFx0XHR0ZXh0OiBvcHRpb25zLnN1cHBvcnQgPyAnU3VwcG9ydCB0ZXh0J1xuXHRcdFx0XG5cdFx0XHRpZiBvcHRpb25zLmljb25cblx0XHRcdFx0QGhlYWRlci5pY29uID0gbmV3IEljb25cblx0XHRcdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQGhlYWRlclxuXHRcdFx0XHRcdHg6IEFsaWduLnJpZ2h0KC0xMiksIHk6IGlmIG9wdGlvbnMuc3VwcG9ydCB0aGVuIDIwIGVsc2UgQWxpZ24uY2VudGVyKClcblx0XHRcdFx0XHRpY29uOiBvcHRpb25zLmljb25cblx0XHRcdFx0XHRjb2xvcjogQGNvbG9yXG5cblx0XHRAaSA9IHVuZGVmaW5lZFxuXHRcdEBncmlkTGlzdC5hZGRUaWxlKEApXG5cblxuXG5cbiMgXHQuZDg4ODg4YiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZFAgICAgICAgZFBcbiMgXHQ4OC4gICAgXCInICAgICAgICAgICAgICAgICAgICAgICAgICAgIDg4ICAgICAgIDg4XG4jIFx0YFk4ODg4OGIuIDg4ZDg4OGIuIC5kODg4OGIuIC5kODg4OGIuIDg4ICAuZFAgIDg4ZDg4OGIuIC5kODg4OGIuIDg4ZDg4OGIuXG4jIFx0ICAgICAgYDhiIDg4JyAgYDg4IDg4JyAgYDg4IDg4JyAgYFwiXCIgODg4ODhcIiAgIDg4JyAgYDg4IDg4JyAgYDg4IDg4JyAgYDg4XG4jIFx0ZDgnICAgLjhQIDg4ICAgIDg4IDg4LiAgLjg4IDg4LiAgLi4uIDg4ICBgOGIuIDg4LiAgLjg4IDg4LiAgLjg4IDg4XG4jIFx0IFk4ODg4OFAgIGRQICAgIGRQIGA4ODg4OFA4IGA4ODg4OFAnIGRQICAgYFlQIDg4WTg4ODgnIGA4ODg4OFA4IGRQXG5cbmV4cG9ydHMuU25hY2tiYXIgPSBTbmFja2JhciA9IGNsYXNzIFNuYWNrYmFyIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cblx0XHRAX3RpdGxlID0gb3B0aW9ucy50aXRsZSA/ICdTbmFja2Jhcidcblx0XHRAX3RpbWVvdXQgPSBvcHRpb25zLnRpbWVvdXQgPyA0XG5cdFx0QF9hY3Rpb24gPSBvcHRpb25zLmFjdGlvblxuXG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0bmFtZTogJy4nXG5cdFx0XHR3aWR0aDogYXBwLndpZHRoXG5cdFx0XHRjbGlwOiB0cnVlXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IHRoZW1lLnNuYWNrYmFyLmJhY2tncm91bmRDb2xvclxuXHRcdFx0YW5pbWF0aW9uT3B0aW9uczoge3RpbWU6IC4yNX1cblxuXHRcdHRpdGxlV2lkdGggPSBAd2lkdGggLSA0OFxuXG5cdFx0aWYgQF9hY3Rpb24/XG5cdFx0XHRAYWN0aW9uID0gbmV3IEJ1dHRvblxuXHRcdFx0XHRwYXJlbnQ6IEBcblx0XHRcdFx0eDogQWxpZ24ucmlnaHQoLTgpLCB5OiA0XG5cdFx0XHRcdGNvbG9yOiBAX2FjdGlvbi5jb2xvciA/IHRoZW1lLmNvbG9ycy5wcmltYXJ5LmxpZ2h0XG5cdFx0XHRcdHRleHQ6IEBfYWN0aW9uLnRpdGxlLnRvVXBwZXJDYXNlKClcblx0XHRcdFx0YWN0aW9uOiBAX2FjdGlvbi5hY3Rpb25cblxuXHRcdFx0QGFjdGlvbi5vblRhcCBAaGlkZVxuXHRcdFx0dGl0bGVXaWR0aCA9IEBhY3Rpb24ueCAtIDggLSAyNFxuXG5cdFx0QHRleHRMYWJlbCA9IG5ldyB0eXBlLkJvZHkxXG5cdFx0XHRuYW1lOiAnVGl0bGUnLCBwYXJlbnQ6IEBcblx0XHRcdHg6IDI0LCB5OiAxNFxuXHRcdFx0d2lkdGg6IHRpdGxlV2lkdGhcblx0XHRcdHRleHQ6IEBfdGl0bGVcblx0XHRcdGNvbG9yOiB0aGVtZS5zbmFja2Jhci5jb2xvclxuXG5cdFx0QGhlaWdodCA9IEB0ZXh0TGFiZWwubWF4WSArIDE0XG5cdFx0QGFjdGlvbj8ueSA9IEFsaWduLmNlbnRlclxuXHRcdEB5ID0gaWYgYXBwLmJvdHRvbU5hdj8gdGhlbiBBbGlnbi5ib3R0b20oLWFwcC5ib3R0b21OYXYuaGVpZ2h0ICsgQGhlaWdodCkgPyBBbGlnbi5ib3R0b20oQGhlaWdodClcblxuXHRcdFV0aWxzLmRlbGF5IEBfdGltZW91dCwgQGhpZGVcblxuXHRcdEBzaG93KClcblxuXHRzaG93OiA9PlxuXHRcdGlmIGFwcC5zbmFja2Jhcj8gXG5cdFx0XHRhcHAuc25hY2tiYXIuaGlkZSgpXG5cdFx0XHRVdGlscy5kZWxheSAxLCBAc2hvd1xuXHRcdFx0cmV0dXJuXG5cdFx0ZWxzZVxuXHRcdFx0YXBwLnNuYWNrYmFyID0gQFxuXHRcdFx0YXBwLmFjdGlvbkJ1dHRvbj8uYW5pbWF0ZSB7eTogYXBwLmFjdGlvbkJ1dHRvbi55IC0gQGhlaWdodCwgb3B0aW9uczogQGFuaW1hdGlvbk9wdGlvbnN9XG5cdFx0XHRAYW5pbWF0ZSB7eTogQHkgLSBAaGVpZ2h0fVxuXG5cdGhpZGU6ID0+IFxuXHRcdGFwcC5zbmFja2JhciA9IHVuZGVmaW5lZFxuXHRcdGFwcC5hY3Rpb25CdXR0b24/LmFuaW1hdGUge3k6IGFwcC5hY3Rpb25CdXR0b24ueSArIEBoZWlnaHQsIG9wdGlvbnM6IEBhbmltYXRpb25PcHRpb25zfVxuXHRcdEBhbmltYXRlIHtoZWlnaHQ6IDAsIHk6IEB5ICsgQGhlaWdodH1cblx0XHRVdGlscy5kZWxheSAuNSwgPT4gQGRlc3Ryb3koKVxuXG5cblxuXG5cbiMgXHQ4ODg4ODhiYSAgICAgICAgICAgICBkUCAgIG9vIC44ODg4YiBvbyAgICAgICAgICAgICAgICAgICAgIGRQICAgb29cbiMgXHQ4OCAgICBgOGIgICAgICAgICAgICA4OCAgICAgIDg4ICAgXCIgICAgICAgICAgICAgICAgICAgICAgICA4OFxuIyBcdDg4ICAgICA4OCAuZDg4ODhiLiBkODg4OFAgZFAgODhhYWEgIGRQIC5kODg4OGIuIC5kODg4OGIuIGQ4ODg4UCBkUCAuZDg4ODhiLiA4OGQ4ODhiLlxuIyBcdDg4ICAgICA4OCA4OCcgIGA4OCAgIDg4ICAgODggODggICAgIDg4IDg4JyAgYFwiXCIgODgnICBgODggICA4OCAgIDg4IDg4JyAgYDg4IDg4JyAgYDg4XG4jIFx0ODggICAgIDg4IDg4LiAgLjg4ICAgODggICA4OCA4OCAgICAgODggODguICAuLi4gODguICAuODggICA4OCAgIDg4IDg4LiAgLjg4IDg4ICAgIDg4XG4jIFx0ZFAgICAgIGRQIGA4ODg4OFAnICAgZFAgICBkUCBkUCAgICAgZFAgYDg4ODg4UCcgYDg4ODg4UDggICBkUCAgIGRQIGA4ODg4OFAnIGRQICAgIGRQXG5cblxuXG5leHBvcnRzLk5vdGlmaWNhdGlvbiA9IE5vdGlmaWNhdGlvbiA9IGNsYXNzIE5vdGlmaWNhdGlvbiBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXHRcdFxuXHRcdEBfdGl0bGUgPSBvcHRpb25zLnRpdGxlID8gJ05vdGlmaWNhdGlvbidcblx0XHRAX2JvZHkgPSBvcHRpb25zLmJvZHkgPyAnVGhpcyBpcyBhIG5vdGlmaWNhdGlvbi4nXG5cdFx0QF9pY29uID0gb3B0aW9ucy5pY29uID8gdW5kZWZpbmVkXG5cdFx0QF9pY29uQ29sb3IgPSBvcHRpb25zLmljb25Db2xvciA/IHRoZW1lLnRleHQuc2Vjb25kYXJ5XG5cdFx0QF9pY29uQmFja2dyb3VuZENvbG9yID0gb3B0aW9ucy5pY29uQmFja2dyb3VuZENvbG9yID8gdGhlbWUuc2Vjb25kYXJ5XG5cdFx0QF90aW1lID0gb3B0aW9ucy50aW1lID8gbmV3IERhdGUoKVxuXHRcdEBfYWN0aW9uMSA9IG9wdGlvbnMuYWN0aW9uMVxuXHRcdEBfYWN0aW9uMiA9IG9wdGlvbnMuYWN0aW9uMlxuXHRcdEBfdGltZW91dCA9IG9wdGlvbnMudGltZW91dCA/IDVcblxuXHRcdCMgYWN0aW9ucyBzaG91bGQgYmUge3RpdGxlOiAnYXJjaGl2ZScsIGljb246ICdhcmNoaXZlJ31cblx0XHRcblx0XHRzdXBlciBfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRuYW1lOiBvcHRpb25zLm5hbWUgPyAnLicsIHBhcmVudDogYXBwXG5cdFx0XHR3aWR0aDogMzQ0LCBib3JkZXJSYWRpdXM6IDJcblx0XHRcdHg6IEFsaWduLmNlbnRlciwgeTogaWYgYXBwLm5vdGlmaWNhdGlvbnMubGVuZ3RoID4gMCB0aGVuIF8ubGFzdChhcHAubm90aWZpY2F0aW9ucykubWF4WSArIDggZWxzZSBhcHAuaGVhZGVyLm1heFkgKyA0XG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IHRoZW1lLmRpYWxvZy5iYWNrZ3JvdW5kQ29sb3Jcblx0XHRcdHNoYWRvd1g6IDAsIHNoYWRvd1k6IDIsIHNoYWRvd0JsdXI6IDNcblx0XHRcdG9wYWNpdHk6IDAsIHNoYWRvd0NvbG9yOiAncmdiYSgwLDAsMCwuMyknXG5cdFx0XHRhbmltYXRpb25PcHRpb25zOiB7dGltZTogLjI1fVxuXG5cdFx0YXBwLm5vdGlmaWNhdGlvbnMucHVzaChAKVxuXG5cdFx0QGljb25MYXllciA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogJ0ljb24gQ29udGFpbmVyJ1xuXHRcdFx0cGFyZW50OiBAXG5cdFx0XHR4OiAxMiwgeTogMTJcblx0XHRcdGhlaWdodDogNDAsIHdpZHRoOiA0MCwgYm9yZGVyUmFkaXVzOiAyMFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBAX2ljb25CYWNrZ3JvdW5kQ29sb3JcblxuXHRcdGlmIEBfaWNvblxuXHRcdFx0QGljb24gPSBuZXcgSWNvblxuXHRcdFx0XHRuYW1lOiAnSWNvbidcblx0XHRcdFx0cGFyZW50OiBAaWNvbkxheWVyXG5cdFx0XHRcdHg6IEFsaWduLmNlbnRlciwgeTogQWxpZ24uY2VudGVyXG5cdFx0XHRcdGNvbG9yOiBAX2ljb25Db2xvclxuXHRcdFx0XHRpY29uOiBAX2ljb25cblxuXHRcdEB0aXRsZSA9IG5ldyB0eXBlLlN1YmhlYWRcblx0XHRcdG5hbWU6ICdUaXRsZSdcblx0XHRcdHBhcmVudDogQCBcblx0XHRcdHg6IDY0LCB5OiA4XG5cdFx0XHR3aWR0aDogQHdpZHRoIC0gNzJcblx0XHRcdGNvbG9yOiAncmdiYSgwLDAsMCwuODcpJ1xuXHRcdFx0dGV4dDogQF90aXRsZVxuXG5cdFx0QGJvZHkgPSBuZXcgdHlwZS5Cb2R5MVxuXHRcdFx0bmFtZTogJ0JvZHknXG5cdFx0XHRwYXJlbnQ6IEBcblx0XHRcdHg6IDY0LCB5OiBAdGl0bGUubWF4WVxuXHRcdFx0d2lkdGg6IEB3aWR0aCAtIDcyXG5cdFx0XHR0ZXh0OiBAX2JvZHlcblxuXHRcdEBkYXRlID0gbmV3IHR5cGUuQ2FwdGlvblxuXHRcdFx0bmFtZTogJ0RhdGUnXG5cdFx0XHRwYXJlbnQ6IEBcblx0XHRcdHg6IEFsaWduLnJpZ2h0KC05KSwgeTogMTVcblx0XHRcdHRleHQ6IEBfdGltZS50b0xvY2FsZVRpbWVTdHJpbmcoW10sIGhvdXI6IFwibnVtZXJpY1wiLCBtaW51dGU6IFwiMi1kaWdpdFwiKVxuXG5cdFx0QGhlaWdodCA9IF8uY2xhbXAoQGJvZHkubWF4WSArIDEzLCA2NCwgSW5maW5pdHkpXG5cblx0XHRpZiBAX2FjdGlvbjE/XG5cblx0XHRcdGRpdmlkZXIgPSBuZXcgRGl2aWRlclxuXHRcdFx0XHRuYW1lOiAnRGl2aWRlcidcblx0XHRcdFx0cGFyZW50OiBAXG5cdFx0XHRcdHg6IDY0LCB5OiBAYm9keS5tYXhZICsgMTFcblx0XHRcdFx0d2lkdGg6IEB3aWR0aCAtIDY0XG5cblx0XHRcdGlmIEBfYWN0aW9uMT9cblx0XHRcdFx0QGFjdGlvbjEgPSBuZXcgTGF5ZXJcblx0XHRcdFx0XHRuYW1lOiAnQWN0aW9uIDEnLCBwYXJlbnQ6IEBcblx0XHRcdFx0XHR4OiA2NCwgeTogZGl2aWRlci5tYXhZICsgMTFcblx0XHRcdFx0XHR3aWR0aDogODAsIGhlaWdodDogMjQsIGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFx0XHRcblx0XHRcdFx0QGFjdGlvbjEuaWNvbiA9IG5ldyBJY29uXG5cdFx0XHRcdFx0bmFtZTogJ0ljb24nLCBwYXJlbnQ6IEBhY3Rpb24xXG5cdFx0XHRcdFx0aWNvbjogQF9hY3Rpb24xLmljb25cblx0XHRcdFx0XHR3aWR0aDogMTgsIGhlaWdodDogMThcblx0XHRcdFx0XHRjb2xvcjogJ3JnYmEoMCwwLDAsLjU0KSdcblx0XHRcdFx0XG5cdFx0XHRcdEBhY3Rpb24xLmxhYmVsID0gbmV3IHR5cGUuQ2FwdGlvblxuXHRcdFx0XHRcdG5hbWU6ICdMYWJlbCcsIHBhcmVudDogQGFjdGlvbjFcblx0XHRcdFx0XHR4OiBAYWN0aW9uMS5pY29uLm1heFggKyA4XG5cdFx0XHRcdFx0Zm9udFNpemU6IDEzXG5cdFx0XHRcdFx0dGV4dDogQF9hY3Rpb24xLnRpdGxlLnRvVXBwZXJDYXNlKClcblxuXHRcdFx0XHRAYWN0aW9uMS53aWR0aCA9IEBhY3Rpb24xLmxhYmVsLm1heFhcblxuXHRcdFx0XHQjQGFjdGlvbjEub25Ub3VjaFN0YXJ0IChldmVudCkgLT4gcmlwcGxlKEAsIGV2ZW50LnBvaW50LCBAaWNvbiwgbmV3IENvbG9yKHRoZW1lLnNlY29uZGFyeSkuYWxwaGEoLjMpKVxuXHRcdFx0XHRAYWN0aW9uMS5vblRhcCBAY2xvc2Vcblx0XHRcdFx0aWYgQF9hY3Rpb24xLmFjdGlvbiB0aGVuIEBhY3Rpb24xLm9uVGFwID0+IFV0aWxzLmRlbGF5IC4yNSwgXy5iaW5kKEBfYWN0aW9uMS5hY3Rpb24sIEApXG5cdFx0XHRcdFxuXG5cdFx0XHRcdGlmIEBfYWN0aW9uMj9cblx0XHRcdFx0XHRAYWN0aW9uMiA9IG5ldyBMYXllclxuXHRcdFx0XHRcdFx0bmFtZTogJ0FjdGlvbiAyJywgcGFyZW50OiBAXG5cdFx0XHRcdFx0XHR4OiBAYWN0aW9uMS5tYXhYICsgNDUsIHk6IGRpdmlkZXIubWF4WSArIDExXG5cdFx0XHRcdFx0XHR3aWR0aDogODAsIGhlaWdodDogMjQsIGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdEBhY3Rpb24yLmljb24gPSBuZXcgSWNvblxuXHRcdFx0XHRcdFx0bmFtZTogJ0ljb24nLCBwYXJlbnQ6IEBhY3Rpb24yXG5cdFx0XHRcdFx0XHRpY29uOiBAX2FjdGlvbjIuaWNvblxuXHRcdFx0XHRcdFx0d2lkdGg6IDE4LCBoZWlnaHQ6IDE4XG5cdFx0XHRcdFx0XHRjb2xvcjogJ3JnYmEoMCwwLDAsLjU0KSdcblx0XHRcdFx0XHRcblx0XHRcdFx0XHRAYWN0aW9uMi5sYWJlbCA9IG5ldyB0eXBlLkNhcHRpb25cblx0XHRcdFx0XHRcdG5hbWU6ICdMYWJlbCcsIHBhcmVudDogQGFjdGlvbjJcblx0XHRcdFx0XHRcdHg6IEBhY3Rpb24yLmljb24ubWF4WCArIDhcblx0XHRcdFx0XHRcdGZvbnRTaXplOiAxM1xuXHRcdFx0XHRcdFx0dGV4dDogQF9hY3Rpb24yLnRpdGxlLnRvVXBwZXJDYXNlKClcblxuXHRcdFx0XHRcdEBhY3Rpb24yLndpZHRoID0gQGFjdGlvbjIubGFiZWwubWF4WFxuXG5cdFx0XHRcdFx0I0BhY3Rpb24yLm9uVG91Y2hTdGFydCAoZXZlbnQpIC0+IHJpcHBsZShALCBldmVudC5wb2ludCwgQGljb24sIG5ldyBDb2xvcih0aGVtZS5zZWNvbmRhcnkpLmFscGhhKC4zKSlcblx0XHRcdFx0XHRAYWN0aW9uMi5vblRhcCBAY2xvc2Vcblx0XHRcdFx0XHRpZiBAX2FjdGlvbjIuYWN0aW9uIHRoZW4gQGFjdGlvbjIub25UYXAgPT4gVXRpbHMuZGVsYXkgLjI1LCBfLmJpbmQoQF9hY3Rpb24yLmFjdGlvbiwgQClcblx0XHRcdFx0XHRcblxuXHRcdFx0XHRAaGVpZ2h0ID0gZGl2aWRlci5tYXhZICsgNDdcblxuXHRcdEBvcGVuKClcblxuXHRcdEBvblN3aXBlTGVmdEVuZCA9PiBAY2xvc2UoJ2xlZnQnKVxuXHRcdEBvblN3aXBlUmlnaHRFbmQgPT4gQGNsb3NlKCdyaWdodCcpXG5cdFx0VXRpbHMuZGVsYXkgQF90aW1lb3V0LCA9PiBpZiBub3QgQGNsb3NlZCB0aGVuIEBjbG9zZSgncmlnaHQnKVxuXG5cdG9wZW46ID0+IFxuXHRcdEBhbmltYXRlIHtvcGFjaXR5OiAxfVxuXG5cdGNsb3NlOiAoZGlyZWN0aW9uKSA9PlxuXHRcdF8ucHVsbChhcHAubm90aWZpY2F0aW9ucywgQClcblxuXHRcdEBhbmltYXRlXG5cdFx0XHR4OiBpZiBkaXJlY3Rpb24gaXMgJ2xlZnQnIHRoZW4gLVNjcmVlbi53aWR0aCBlbHNlIFNjcmVlbi53aWR0aFxuXHRcdFx0b3BhY2l0eTogMFxuXG5cdFx0Zm9yIG5vdGlmaWNhdGlvbiBpbiBhcHAubm90aWZpY2F0aW9uc1xuXHRcdFx0aWYgbm90aWZpY2F0aW9uLnkgPiBAbWF4WVxuXHRcdFx0XHRub3RpZmljYXRpb24uYW5pbWF0ZSB7eTogbm90aWZpY2F0aW9uLnkgLSBAaGVpZ2h0fVxuXHRcdFxuXHRcdEBjbG9zZWQgPSB0cnVlXG5cblx0XHRVdGlscy5kZWxheSAuNSwgPT4gQGRlc3Ryb3koKVxuXG5cblxuXG4jIFx0ODg4ODg4YmEgIG9vICAgICAgICAgIG9vICAgICAgIGRQXG4jIFx0ODggICAgYDhiICAgICAgICAgICAgICAgICAgICAgIDg4XG4jIFx0ODggICAgIDg4IGRQIGRQICAgLmRQIGRQIC5kODg4Yjg4IC5kODg4OGIuIDg4ZDg4OGIuXG4jIFx0ODggICAgIDg4IDg4IDg4ICAgZDgnIDg4IDg4JyAgYDg4IDg4b29vb2Q4IDg4JyAgYDg4XG4jIFx0ODggICAgLjhQIDg4IDg4IC44OCcgIDg4IDg4LiAgLjg4IDg4LiAgLi4uIDg4XG4jIFx0ODg4ODg4OFAgIGRQIDg4ODhQJyAgIGRQIGA4ODg4OFA4IGA4ODg4OFAnIGRQXG5cblxuZXhwb3J0cy5EaXZpZGVyID0gRGl2aWRlciA9IGNsYXNzIERpdmlkZXIgZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblx0XHRzdXBlciBfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRuYW1lOiAnLidcblx0XHRcdHdpZHRoOiAyMDAsIGhlaWdodDogMSxcblx0XHRcdGJhY2tncm91bmRDb2xvcjogdGhlbWUuZGl2aWRlci5iYWNrZ3JvdW5kQ29sb3JcblxuXG5cblxuXG5cbiMgXHQuZDg4ODg4YiAgICAgICAgICAgICBvbyAgIGRQICAgICAgICAgICAgZFBcbiMgXHQ4OC4gICAgXCInICAgICAgICAgICAgICAgICA4OCAgICAgICAgICAgIDg4XG4jIFx0YFk4ODg4OGIuIGRQICBkUCAgZFAgZFAgZDg4ODhQIC5kODg4OGIuIDg4ZDg4OGIuXG4jIFx0ICAgICAgYDhiIDg4ICA4OCAgODggODggICA4OCAgIDg4JyAgYFwiXCIgODgnICBgODhcbiMgXHRkOCcgICAuOFAgODguODhiLjg4JyA4OCAgIDg4ICAgODguICAuLi4gODggICAgODhcbiMgXHQgWTg4ODg4UCAgODg4OFAgWThQICBkUCAgIGRQICAgYDg4ODg4UCcgZFAgICAgZFBcblxuXG5leHBvcnRzLlN3aXRjaCA9IFN3aXRjaCA9IGNsYXNzIFN3aXRjaCBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXG5cdFx0QF9pc09uID0gdW5kZWZpbmVkXG5cblx0XHRzdXBlciBfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRuYW1lOiAnLidcblx0XHRcdHdpZHRoOiAzNCwgaGVpZ2h0OiAxNCwgYm9yZGVyUmFkaXVzOiA3XG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6ICdyZ2JhKDM0LCAzMSwgMzEsIC4yNiknXG5cdFx0XHRhbmltYXRpb25PcHRpb25zOiB7dGltZTogLjE1fVxuXG5cdFx0QGtub2IgPSBuZXcgTGF5ZXJcblx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBAXG5cdFx0XHR4OiAwLCB5OiBBbGlnbi5jZW50ZXJcblx0XHRcdHdpZHRoOiAyMCwgaGVpZ2h0OiAyMCwgYm9yZGVyUmFkaXVzOiAxMFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiAnRjFGMUYxJ1xuXHRcdFx0c2hhZG93WTogMiwgc2hhZG93Qmx1cjogM1xuXHRcdFx0YW5pbWF0aW9uT3B0aW9uczoge3RpbWU6IC4xNX1cblxuXHRcdEBpc09uID0gb3B0aW9ucy5pc09uID8gZmFsc2Vcblx0XHRAb25UYXAgLT4gQGlzT24gPSAhQGlzT25cblxuXHRAZGVmaW5lIFwiaXNPblwiLFxuXHRcdGdldDogLT4gcmV0dXJuIEBfaXNPblxuXHRcdHNldDogKGJvb2wpIC0+XG5cdFx0XHRyZXR1cm4gaWYgYm9vbCBpcyBAX2lzT25cblx0XHRcdFxuXHRcdFx0QF9pc09uID0gYm9vbFxuXHRcdFx0QGVtaXQoXCJjaGFuZ2U6aXNPblwiLCBAX2lzT24sIEApXG5cdFx0XHRAdXBkYXRlKClcblxuXHR1cGRhdGU6IC0+XG5cdFx0aWYgQF9pc09uXG5cdFx0XHRAa25vYi5hbmltYXRlIHt4OiBBbGlnbi5yaWdodCgpLCBiYWNrZ3JvdW5kQ29sb3I6IHRoZW1lLmNvbG9ycy5wcmltYXJ5Lm1haW59XG5cdFx0XHRAYW5pbWF0ZSB7YmFja2dyb3VuZENvbG9yOiB0aGVtZS5jb2xvcnMucHJpbWFyeS5saWdodH1cblx0XHRlbHNlIFxuXHRcdFx0QGtub2IuYW5pbWF0ZSB7eDogMCwgYmFja2dyb3VuZENvbG9yOiAnRjFGMUYxJ31cblx0XHRcdEBhbmltYXRlIHtiYWNrZ3JvdW5kQ29sb3I6ICdyZ2JhKDM0LCAzMSwgMzEsIC4yNiknfVxuXG5cblxuXG5cbiMgXHQgYTg4ODg4Yi4gZFAgICAgICAgICAgICAgICAgICAgICAgICAgZFAgICAgICAgZFBcbiMgXHRkOCcgICBgODggODggICAgICAgICAgICAgICAgICAgICAgICAgODggICAgICAgODhcbiMgXHQ4OCAgICAgICAgODhkODg4Yi4gLmQ4ODg4Yi4gLmQ4ODg4Yi4gODggIC5kUCAgODhkODg4Yi4gLmQ4ODg4Yi4gZFAuICAuZFBcbiMgXHQ4OCAgICAgICAgODgnICBgODggODhvb29vZDggODgnICBgXCJcIiA4ODg4OFwiICAgODgnICBgODggODgnICBgODggIGA4YmQ4J1xuIyBcdFk4LiAgIC44OCA4OCAgICA4OCA4OC4gIC4uLiA4OC4gIC4uLiA4OCAgYDhiLiA4OC4gIC44OCA4OC4gIC44OCAgLmQ4OGIuXG4jIFx0IFk4ODg4OFAnIGRQICAgIGRQIGA4ODg4OFAnIGA4ODg4OFAnIGRQICAgYFlQIDg4WTg4ODgnIGA4ODg4OFAnIGRQJyAgYGRQXG5cblxuXG5leHBvcnRzLkNoZWNrYm94ID0gQ2hlY2tCb3ggPSBjbGFzcyBDaGVja2JveCBleHRlbmRzIEljb25cblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cblx0XHRAX2lzT24gPSB1bmRlZmluZWRcblxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdG5hbWU6ICcuJ1xuXHRcdFx0YW5pbWF0aW9uT3B0aW9uczoge3RpbWU6IC4xNX1cblx0XHRcdGljb246ICdjaGVja2JveC1ibGFuay1vdXRsaW5lJ1xuXHRcdFx0Y29sb3I6ICdyZ2JhKDAsMCwwLC41NCknXG5cblx0XHRAaXNPbiA9IG9wdGlvbnMuaXNPbiA/IGZhbHNlXG5cdFx0QG9uVGFwIC0+IEBpc09uID0gIUBpc09uXG5cblx0QGRlZmluZSBcImlzT25cIixcblx0XHRnZXQ6IC0+IHJldHVybiBAX2lzT25cblx0XHRzZXQ6IChib29sKSAtPlxuXHRcdFx0cmV0dXJuIGlmIGJvb2wgaXMgQF9pc09uXG5cdFx0XHRcblx0XHRcdEBfaXNPbiA9IGJvb2xcblx0XHRcdEBlbWl0KFwiY2hhbmdlOmlzT25cIiwgQF9pc09uLCBAKVxuXHRcdFx0QHVwZGF0ZSgpXG5cblx0dXBkYXRlOiAtPlxuXHRcdGlmIEBfaXNPblxuXHRcdFx0QGljb24gPSAnY2hlY2tib3gtbWFya2VkJ1xuXHRcdFx0QGNvbG9yID0gdGhlbWUuY29sb3JzLnByaW1hcnkubWFpblxuXHRcdGVsc2UgXG5cdFx0XHRAaWNvbiA9ICdjaGVja2JveC1ibGFuay1vdXRsaW5lJ1xuXHRcdFx0QGNvbG9yID0gJ3JnYmEoMCwwLDAsLjU0KSdcblxuXG5cblxuXG5cbiMgXHQgODg4ODg4YmEgICAgICAgICAgICAgICAgIGRQIG9vICAgICAgICAgICA4ODg4ODhiYSAgICAgICAgICAgICBkUCAgICAgZFBcbiMgXHQgODggICAgYDhiICAgICAgICAgICAgICAgIDg4ICAgICAgICAgICAgICA4OCAgICBgOGIgICAgICAgICAgICA4OCAgICAgODhcbiMgXHRhODhhYWFhOFAnIC5kODg4OGIuIC5kODg4Yjg4IGRQIC5kODg4OGIuIGE4OGFhYWE4UCcgZFAgICAgZFAgZDg4ODhQIGQ4ODg4UCAuZDg4ODhiLiA4OGQ4ODhiLlxuIyBcdCA4OCAgIGA4Yi4gODgnICBgODggODgnICBgODggODggODgnICBgODggIDg4ICAgYDhiLiA4OCAgICA4OCAgIDg4ICAgICA4OCAgIDg4JyAgYDg4IDg4JyAgYDg4XG4jIFx0IDg4ICAgICA4OCA4OC4gIC44OCA4OC4gIC44OCA4OCA4OC4gIC44OCAgODggICAgLjg4IDg4LiAgLjg4ICAgODggICAgIDg4ICAgODguICAuODggODggICAgODhcbiMgXHQgZFAgICAgIGRQIGA4ODg4OFA4IGA4ODg4OFA4IGRQIGA4ODg4OFAnICA4ODg4ODg4OFAgYDg4ODg4UCcgICBkUCAgICAgZFAgICBgODg4ODhQJyBkUCAgICBkUFxuIyBcdFxuIyBcdFxuXG5cbmV4cG9ydHMuUmFkaW9ib3ggPSBSYWRpb2JveCA9IGNsYXNzIFJhZGlvYm94IGV4dGVuZHMgSWNvblxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblxuXHRcdEBfaXNPbiA9IHVuZGVmaW5lZFxuXHRcdEBfZ3JvdXAgPSBvcHRpb25zLmdyb3VwID8gW11cblxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdG5hbWU6ICcuJ1xuXHRcdFx0YW5pbWF0aW9uT3B0aW9uczoge3RpbWU6IC4xNX1cblx0XHRcdGljb246ICdyYWRpb2JveC1ibGFuaydcblx0XHRcdGNvbG9yOiAncmdiYSgwLDAsMCwuNTQpJ1xuXG5cdFx0QGlzT24gPSBvcHRpb25zLmlzT24gPyBmYWxzZVxuXHRcdEBvblRhcCAtPiBAaXNPbiA9ICFAaXNPblxuXG5cdFx0QF9ncm91cC5wdXNoKEApXG5cblx0QGRlZmluZSBcImlzT25cIixcblx0XHRnZXQ6IC0+IHJldHVybiBAX2lzT25cblx0XHRzZXQ6IChib29sKSAtPlxuXHRcdFx0cmV0dXJuIGlmIGJvb2wgaXMgQF9pc09uXG5cdFx0XHRcblx0XHRcdEBfaXNPbiA9IGJvb2xcblx0XHRcdEBlbWl0KFwiY2hhbmdlOmlzT25cIiwgQF9pc09uLCBAKVxuXHRcdFx0QHVwZGF0ZSgpXG5cblx0dXBkYXRlOiAtPlxuXHRcdGlmIEBfaXNPblxuXHRcdFx0QGljb24gPSAncmFkaW9ib3gtbWFya2VkJ1xuXHRcdFx0QGNvbG9yID0gdGhlbWUuY29sb3JzLnByaW1hcnkubWFpblxuXG5cdFx0XHRyYWRpb2JveC5pc09uID0gZmFsc2UgZm9yIHJhZGlvYm94IGluIF8ud2l0aG91dChAX2dyb3VwLCBAKVxuXHRcdGVsc2UgXG5cdFx0XHRAaWNvbiA9ICdyYWRpb2JveC1ibGFuaydcblx0XHRcdEBjb2xvciA9ICdyZ2JhKDAsMCwwLC41NCknXG5cblxuXG5cblxuXG5cbiIsIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIl0sIm5hbWVzIjpb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
