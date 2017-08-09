require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"md":[function(require,module,exports){
var App, Body1, Body2, BottomNav, Button, Caption, Dialog, DialogAction, Fab, GridList, Header, Headline, Icon, MenuButton, MenuOverlay, Page, Regular, RowItem, StatusBar, SubheadSecondary, Tile, Title, View, app, icons, ripple, theme, type,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

ripple = require('ripple').ripple;

theme = require('theme').theme;

type = require('type');

icons = JSON.parse(Utils.domLoadDataSync("modules/icons.json"));

Framer.Extras.Hints.disable();

exports.theme = theme;

exports.Title = Title = type.Title;

exports.Headline = Headline = type.Headline;

exports.SubheadSecondary = SubheadSecondary = type.SubheadSecondary;

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
    view.height = Screen.height - this.header.height - this.footer.height - this.bottomNav.height;
    view.home = view.newPage({
      header: {
        title: view._title,
        icon: view._icon,
        iconAction: view._iconAction
      }
    });
    return view.showNext(view.home);
  };

  App.prototype.changeView = function(view) {
    var ref, ref1, ref2, ref3, ref4;
    if (view === this.current) {
      return;
    }
    this.header.title = (ref = (ref1 = view.current._header) != null ? ref1.title : void 0) != null ? ref : 'Default';
    this.header.icon = (ref2 = view.current.icon) != null ? ref2 : 'menu';
    this.header.iconAction = (ref3 = view.current.iconAction) != null ? ref3 : function() {
      return app.showMenu();
    };
    this.header.visible = (ref4 = view.current.visible) != null ? ref4 : true;
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

  View.prototype.addPage = function(page) {
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
    this.statusBar = new StatusBar({
      name: '.',
      parent: this
    });
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
    this.iconLayer.onTap((function(_this) {
      return function() {
        return _this._iconAction();
      };
    })(this));
    this.iconLayer.onTouchStart(function(event) {
      return ripple(app.header, event.point);
    });
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
      shadowColor: theme.bottomNav.shadowColor
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
        height: this.height,
        width: this.height,
        borderRadius: this.height / 2,
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
      color: theme.menuOverlay.subheader.text
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
      size: Screen.size,
      color: theme.tint,
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
    this.body = new type.SubheadSecondary({
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

exports.Fab = Fab = Fab = (function(superClass) {
  extend(Fab, superClass);

  function Fab(options) {
    var ref, ref1, ref2;
    if (options == null) {
      options = {};
    }
    this._raised = (ref = options.raised) != null ? ref : false;
    this._action = (ref1 = options.action) != null ? ref1 : function() {
      return null;
    };
    this._icon = (ref2 = options.icon) != null ? ref2 : 'plus';
    Fab.__super__.constructor.call(this, _.defaults(options, {
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
  }

  Fab.prototype.showTouched = function() {
    ripple(this, event.point, this.iconLayer);
    return this.animate({
      shadowY: 3,
      shadowSpread: 1
    });
  };

  Fab.prototype.reset = function() {
    return this.animate({
      shadowY: 2,
      shadowSpread: 0
    });
  };

  return Fab;

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
      saturate: 150,
      brightness: 120,
      opacity: .3
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
  primaryInvert: primaryInvert,
  secondary: source.colors.secondary.main,
  menu: source.colors.menu.light,
  menuInvert: source.colors.menu.invert,
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
      icon: source.colors.secondary.light
    },
    subheader: {
      color: source.colors.menu.text
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
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Utils.insertCSS("@font-face {\n  font-family: \"Roboto\";\n  src: url(\"fonts/Roboto-Regular.ttf\");");

exports.Headline = (function(superClass) {
  extend(Headline, superClass);

  function Headline(options) {
    Headline.__super__.constructor.call(this, _.defaults(options, {
      fontFamily: 'Roboto',
      fontSize: 24,
      fontWeight: 400,
      lineHeight: 1.3,
      color: 'rgba(0,0,0,.87)'
    }));
  }

  return Headline;

})(TextLayer);

exports.SubheadSecondary = (function(superClass) {
  extend(SubheadSecondary, superClass);

  function SubheadSecondary(options) {
    SubheadSecondary.__super__.constructor.call(this, _.defaults(options, {
      fontFamily: 'Roboto',
      fontSize: 16,
      fontWeight: 400,
      lineHeight: 1.5,
      color: 'rgba(0,0,0,.54)'
    }));
  }

  return SubheadSecondary;

})(TextLayer);

exports.Title = (function(superClass) {
  extend(Title, superClass);

  function Title(options) {
    Title.__super__.constructor.call(this, _.defaults(options, {
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


},{}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3N0ZXZlcnVpei9MaWJyYXJ5L01vYmlsZSBEb2N1bWVudHMvY29tfmFwcGxlfkNsb3VkRG9jcy9HaXRIdWIvZnJhbWVyLW1kL01hdGVyaWFsLmZyYW1lci9tb2R1bGVzL3R5cGUuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvc3RldmVydWl6L0xpYnJhcnkvTW9iaWxlIERvY3VtZW50cy9jb21+YXBwbGV+Q2xvdWREb2NzL0dpdEh1Yi9mcmFtZXItbWQvTWF0ZXJpYWwuZnJhbWVyL21vZHVsZXMvdGhlbWUuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvc3RldmVydWl6L0xpYnJhcnkvTW9iaWxlIERvY3VtZW50cy9jb21+YXBwbGV+Q2xvdWREb2NzL0dpdEh1Yi9mcmFtZXItbWQvTWF0ZXJpYWwuZnJhbWVyL21vZHVsZXMvcmlwcGxlLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3N0ZXZlcnVpei9MaWJyYXJ5L01vYmlsZSBEb2N1bWVudHMvY29tfmFwcGxlfkNsb3VkRG9jcy9HaXRIdWIvZnJhbWVyLW1kL01hdGVyaWFsLmZyYW1lci9tb2R1bGVzL21kLmNvZmZlZSIsIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiIyBcdGQ4ODg4ODhQICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRQXG4jIFx0ICAgODggICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgODhcbiMgXHQgICA4OCAgICBkUCAgICBkUCA4OGQ4ODhiLiAuZDg4ODhiLiAuZDg4ODhiLiA4OGQ4ODhiLiAuZDg4ODhiLiA4OGQ4ODhiLiA4OGQ4ODhiLiBkUCAgICBkUFxuIyBcdCAgIDg4ICAgIDg4ICAgIDg4IDg4JyAgYDg4IDg4JyAgYDg4IDg4JyAgYDg4IDg4JyAgYDg4IDg4JyAgYDg4IDg4JyAgYDg4IDg4JyAgYDg4IDg4ICAgIDg4XG4jIFx0ICAgODggICAgODguICAuODggODguICAuODggODguICAuODggODguICAuODggODggICAgICAgODguICAuODggODguICAuODggODggICAgODggODguICAuODhcbiMgXHQgICBkUCAgICBgODg4OFA4OCA4OFk4ODhQJyBgODg4ODhQJyBgODg4OFA4OCBkUCAgICAgICBgODg4ODhQOCA4OFk4ODhQJyBkUCAgICBkUCBgODg4OFA4OFxuIyBcdCAgICAgICAgICAgICAgLjg4IDg4ICAgICAgICAgICAgICAgICAgICAgLjg4ICAgICAgICAgICAgICAgICAgIDg4ICAgICAgICAgICAgICAgICAgICAgLjg4XG4jIFx0ICAgICAgICAgIGQ4ODg4UCAgZFAgICAgICAgICAgICAgICAgIGQ4ODg4UCAgICAgICAgICAgICAgICAgICAgZFAgICAgICAgICAgICAgICAgIGQ4ODg4UFxuXG5VdGlscy5pbnNlcnRDU1MoXG5cdFwiXCJcIlxuICAgIEBmb250LWZhY2Uge1xuICAgICAgZm9udC1mYW1pbHk6IFwiUm9ib3RvXCI7XG4gICAgICBzcmM6IHVybChcImZvbnRzL1JvYm90by1SZWd1bGFyLnR0ZlwiKTtcbiAgICBcIlwiXCIpXG5cbmNsYXNzIGV4cG9ydHMuSGVhZGxpbmUgZXh0ZW5kcyBUZXh0TGF5ZXJcblx0Y29uc3RydWN0b3I6IChvcHRpb25zKSAtPlxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdGZvbnRGYW1pbHk6ICdSb2JvdG8nXG5cdFx0XHRmb250U2l6ZTogMjRcblx0XHRcdGZvbnRXZWlnaHQ6IDQwMFxuXHRcdFx0bGluZUhlaWdodDogMS4zXG5cdFx0XHRjb2xvcjogJ3JnYmEoMCwwLDAsLjg3KSdcblxuY2xhc3MgZXhwb3J0cy5TdWJoZWFkU2Vjb25kYXJ5IGV4dGVuZHMgVGV4dExheWVyXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucykgLT5cblx0XHRzdXBlciBfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRmb250RmFtaWx5OiAnUm9ib3RvJ1xuXHRcdFx0Zm9udFNpemU6IDE2XG5cdFx0XHRmb250V2VpZ2h0OiA0MDAsIFxuXHRcdFx0bGluZUhlaWdodDogMS41LFxuXHRcdFx0Y29sb3I6ICdyZ2JhKDAsMCwwLC41NCknXG5cbmNsYXNzIGV4cG9ydHMuVGl0bGUgZXh0ZW5kcyBUZXh0TGF5ZXJcblx0Y29uc3RydWN0b3I6IChvcHRpb25zKSAtPlxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdGZvbnRGYW1pbHk6ICdSb2JvdG8nXG5cdFx0XHRmb250U2l6ZTogMjBcblx0XHRcdGZvbnRXZWlnaHQ6IDUwMFxuXHRcdFx0bGluZUhlaWdodDogMS4zXG5cdFx0XHRjb2xvcjogJ3JnYmEoMCwwLDAsLjg3KSdcbmNsYXNzIGV4cG9ydHMuUmVndWxhciBleHRlbmRzIFRleHRMYXllclxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMpIC0+XG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0Zm9udEZhbWlseTogJ1JvYm90bydcblx0XHRcdGZvbnRTaXplOiAxNlxuXHRcdFx0Zm9udFdlaWdodDogNDAwXG5cdFx0XHRsaW5lSGVpZ2h0OiAxLjNcblx0XHRcdGNvbG9yOiAncmdiYSgwLDAsMCwuODcpJ1xuY2xhc3MgZXhwb3J0cy5Cb2R5MiBleHRlbmRzIFRleHRMYXllclxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMpIC0+XG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0Zm9udEZhbWlseTogJ1JvYm90bydcblx0XHRcdGZvbnRTaXplOiAxNFxuXHRcdFx0Zm9udFdlaWdodDogNTAwXG5cdFx0XHRsaW5lSGVpZ2h0OiAxLjNcblx0XHRcdGNvbG9yOiAncmdiYSgwLDAsMCwuODcpJ1xuY2xhc3MgZXhwb3J0cy5NZW51IGV4dGVuZHMgVGV4dExheWVyXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucykgLT5cblx0XHRzdXBlciBfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRmb250RmFtaWx5OiAnUm9ib3RvJ1xuXHRcdFx0Zm9udFNpemU6IDE0XG5cdFx0XHRmb250V2VpZ2h0OiA1MDBcblx0XHRcdGxpbmVIZWlnaHQ6IDEuN1xuXHRcdFx0Y29sb3I6ICdyZ2JhKDAsMCwwLC44NyknXG5jbGFzcyBleHBvcnRzLkJvZHkxIGV4dGVuZHMgVGV4dExheWVyXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucykgLT5cblx0XHRzdXBlciBfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRmb250RmFtaWx5OiAnUm9ib3RvJ1xuXHRcdFx0Zm9udFNpemU6IDE0XG5cdFx0XHRmb250V2VpZ2h0OiA0MDBcblx0XHRcdGxpbmVIZWlnaHQ6IDEuNFxuXHRcdFx0Y29sb3I6ICdyZ2JhKDAsMCwwLC44NyknXG5jbGFzcyBleHBvcnRzLkNhcHRpb24gZXh0ZW5kcyBUZXh0TGF5ZXJcblx0Y29uc3RydWN0b3I6IChvcHRpb25zKSAtPlxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdGZvbnRGYW1pbHk6ICdSb2JvdG8nXG5cdFx0XHRmb250U2l6ZTogMTJcblx0XHRcdGZvbnRXZWlnaHQ6IDQwMFxuXHRcdFx0bGluZUhlaWdodDogMS4zXG5cdFx0XHRjb2xvcjogJ3JnYmEoMCwwLDAsLjU0KSdcbmNsYXNzIGV4cG9ydHMuQnV0dG9uIGV4dGVuZHMgVGV4dExheWVyXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucykgLT5cblx0XHRzdXBlciBfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRmb250RmFtaWx5OiAnUm9ib3RvJ1xuXHRcdFx0Zm9udFNpemU6IDE0XG5cdFx0XHRmb250V2VpZ2h0OiA1MDBcblx0XHRcdGxpbmVIZWlnaHQ6IDEuM1xuXHRcdFx0Y29sb3I6ICcjMDA5Njg4J1xuXHRcdFx0bGV0dGVyU3BhY2luZzogMC41XG5cdFx0XHRwYWRkaW5nOiB7bGVmdDogNCwgcmlnaHQ6IDQsIHRvcDogOCwgYm90dG9tOiAwfSwiLCJcbiMgICBkUCAgIGRQICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiMgICA4OCAgIDg4ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiMgZDg4ODhQIDg4ZDg4OGIuIC5kODg4OGIuIDg4ZDhiLmQ4Yi4gLmQ4ODg4Yi4gLmQ4ODg4Yi5cbiMgICA4OCAgIDg4JyAgYDg4IDg4b29vb2Q4IDg4J2A4OCdgODggODhvb29vZDggWThvb29vby5cbiMgICA4OCAgIDg4ICAgIDg4IDg4LiAgLi4uIDg4ICA4OCAgODggODguICAuLi4gICAgICAgODhcbiMgICBkUCAgIGRQICAgIGRQIGA4ODg4OFAnIGRQICBkUCAgZFAgYDg4ODg4UCcgYDg4ODg4UCdcblxuIyBXaGVuIGxvYWRlZCwgdGhpcyBtb2R1bGUgd2lsbCBhdHRlbXB0IHRvIGNyZWF0ZSBhIG5ldyB0aGVtZSBiYXNlZCBvbiBcbiMgdGhlIERlc2lnbiBNb2RlIHRlbXBsYXRlLiBJdHMgZGVmYXVsdCB2YWx1ZXMgd2lsbCBiZSBmb3IgYSBcIkxpZ2h0XCIgdGhlbWUuXG5cbm1vZGlmeUNvbG9yID0gKGNvbG9yLCBoLCBzLCBsKSAtPlxuXHRjbGlwID0gXy5yZXBsYWNlKF8ucmVwbGFjZShjb2xvci50b0hzbFN0cmluZygpLnNsaWNlKDQsIC0xKSwgJyUnLCAnJyksICclJywgJycpIC5zcGxpdCgnLCAnKVxuXG5cdG5ld0NvbG9yID0gbmV3IENvbG9yKFxuXHRcdGg6IF8ucGFyc2VJbnQoY2xpcFswXSkgKyBoLCBcblx0XHRzOiAoXy5wYXJzZUludChjbGlwWzFdKSArIHMpLzEwMCwgXG5cdFx0bDogKF8ucGFyc2VJbnQoY2xpcFsyXSkgKyBsKS8xMDAsIFxuXHRcdGE6IDEpXG5cdFxuXHRyZXR1cm4gbmV3Q29sb3JcblxucHJpbWFyeUNvbG9yID0gcHJpbWFyeV9jb2xvci5iYWNrZ3JvdW5kQ29sb3JcbnByaW1hcnlJbnZlcnQgPSAxMDAgLSAocHJpbWFyeV9pbnZlcnQub3BhY2l0eSAqIDEwMClcbnNlY29uZGFyeUNvbG9yID0gc2Vjb25kYXJ5X2NvbG9yLmJhY2tncm91bmRDb2xvclxubWVudUNvbG9yID0gbWVudV9jb2xvci5iYWNrZ3JvdW5kQ29sb3Jcbm1lbnVUZXh0Q29sb3IgPSBtZW51X3RleHRfY29sb3IuY29sb3Jcbm1lbnVJbnZlcnQgPSAxMDAgLSAobWVudV9pbnZlcnQub3BhY2l0eSAqIDEwMClcblxuXG5zb3VyY2UgPVxuXHRjb2xvcnM6XG5cdFx0cHJpbWFyeTpcblx0XHRcdG1haW46IHByaW1hcnlDb2xvclxuXHRcdFx0bGlnaHQ6IG1vZGlmeUNvbG9yKHByaW1hcnlDb2xvciwgMTMsIC01LCAxNSlcblx0XHRcdGRhcms6IG1vZGlmeUNvbG9yKHByaW1hcnlDb2xvciwgLTEsIC03LCAtMTIpXG5cdFx0XHR0ZXh0OiBwcmltYXJ5X3RleHRfY29sb3IuY29sb3Jcblx0XHRcdGludmVydDogcHJpbWFyeUludmVydFxuXHRcdHNlY29uZGFyeTpcblx0XHRcdG1haW46IHNlY29uZGFyeUNvbG9yXG5cdFx0XHRsaWdodDogbW9kaWZ5Q29sb3Ioc2Vjb25kYXJ5Q29sb3IsIDEzLCAtNSwgMTUpXG5cdFx0XHRkYXJrOiBtb2RpZnlDb2xvcihzZWNvbmRhcnlDb2xvciwgLTEsIC03LCAtMTIpXG5cdFx0XHR0ZXh0OiBzZWNvbmRhcnlfdGV4dF9jb2xvci5jb2xvclxuXHRcdG1lbnU6XG5cdFx0XHRsaWdodDogbWVudUNvbG9yXG5cdFx0XHR0ZXh0OiBtZW51VGV4dENvbG9yXG5cdFx0XHRpbnZlcnQ6IG1lbnVJbnZlcnRcblxudGhlbWUgPSBcblx0dGludDogc291cmNlLmNvbG9ycy5zZWNvbmRhcnkubWFpblxuXHRwcmltYXJ5OiBzb3VyY2UuY29sb3JzLnByaW1hcnkubWFpblxuXHRwcmltYXJ5SW52ZXJ0OiBwcmltYXJ5SW52ZXJ0XG5cdHNlY29uZGFyeTogc291cmNlLmNvbG9ycy5zZWNvbmRhcnkubWFpblxuXHRtZW51OiBzb3VyY2UuY29sb3JzLm1lbnUubGlnaHRcblx0bWVudUludmVydDogc291cmNlLmNvbG9ycy5tZW51LmludmVydFxuXG5cdHVzZXI6XG5cdFx0aW1hZ2U6IHVuZGVmaW5lZFxuXG5cdGhlYWRlcjogXG5cdFx0YmFja2dyb3VuZENvbG9yOiBzb3VyY2UuY29sb3JzLnByaW1hcnkubWFpblxuXHRcdHRpdGxlOiBzb3VyY2UuY29sb3JzLnByaW1hcnkudGV4dFxuXHRcdGludmVydDogcHJpbWFyeUludmVydFxuXHRcdGljb246XG5cdFx0XHRjb2xvcjogc291cmNlLmNvbG9ycy5wcmltYXJ5LnRleHRcblx0XHR0YWJzOlxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBzb3VyY2UuY29sb3JzLnByaW1hcnkubGlnaHRcblx0XHRcdGNvbG9yOiBzb3VyY2UuY29sb3JzLnByaW1hcnkudGV4dFxuXHRcdFx0c2VsZWN0b3I6IHNvdXJjZS5jb2xvcnMuc2Vjb25kYXJ5Lm1haW5cblx0XG5cdHN0YXR1c0JhcjogXG5cdFx0aW1hZ2U6ICdpbWFnZXMvc3RhdHVzX2Jhci5wbmcnXG5cdFx0YmFja2dyb3VuZENvbG9yOiBzb3VyY2UuY29sb3JzLnByaW1hcnkuZGFya1xuXHRcdGludmVydDogcHJpbWFyeUludmVydFxuXHRcblx0Ym90dG9tTmF2OlxuXHRcdGJhY2tncm91bmRDb2xvcjogJyNGRkZGRkYnXG5cdFx0c2hhZG93WTogLTJcblx0XHRzaGFkb3dCbHVyOiA2XG5cdFx0c2hhZG93Q29sb3I6ICdyZ2JhKDAsMCwwLC4xKSdcblxuXHRwYWdlOlxuXHRcdHByaW1hcnk6XG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6ICcjRTFFMkUxJ1xuXHRcdHNlY29uZGFyeTpcblx0XHRcdGJhY2tncm91bmRDb2xvcjogJyNGNUY1RjYnXG5cblx0bWVudU92ZXJsYXk6XG5cdFx0aGVhZGVyOlxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBzb3VyY2UuY29sb3JzLnNlY29uZGFyeS5tYWluXG5cdFx0XHRpY29uOiBzb3VyY2UuY29sb3JzLnNlY29uZGFyeS5saWdodFxuXHRcdHN1YmhlYWRlcjpcblx0XHRcdGNvbG9yOiBzb3VyY2UuY29sb3JzLm1lbnUudGV4dFxuXHRcdGJhY2tncm91bmRDb2xvcjogc291cmNlLmNvbG9ycy5tZW51LmxpZ2h0XG5cdFx0dGV4dDogc291cmNlLmNvbG9ycy5tZW51LnRleHRcblx0XHRzbGlkZXI6IFxuXHRcdFx0a25vYjogc291cmNlLmNvbG9ycy5zZWNvbmRhcnkubGlnaHRcblx0XHRcdGZpbGw6IHNvdXJjZS5jb2xvcnMuc2Vjb25kYXJ5LmRhcmtcblx0XHRpbnZlcnQ6IHNvdXJjZS5jb2xvcnMubWVudS5pbnZlcnRcblxuXHRidXR0b246XG5cdFx0ZmxhdDpcblx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFx0Y29sb3I6IHNvdXJjZS5jb2xvcnMuc2Vjb25kYXJ5Lm1haW5cblx0XHRcdHNoYWRvd1k6IDBcblx0XHRcdHNoYWRvd0NvbG9yOiAncmdiYSgwLDAsMCwuMTgpJ1xuXHRcdFx0c2hhZG93Qmx1cjogMFxuXG5cdFx0cmFpc2VkOlxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBzb3VyY2UuY29sb3JzLnNlY29uZGFyeS5tYWluXG5cdFx0XHRjb2xvcjogc291cmNlLmNvbG9ycy5zZWNvbmRhcnkudGV4dFxuXHRcdFx0c2hhZG93WTogMlxuXHRcdFx0c2hhZG93Q29sb3I6ICdyZ2JhKDAsMCwwLC4xOCknXG5cdFx0XHRzaGFkb3dCbHVyOiA2XG5cblx0ZmFiOlxuXHRcdGJhY2tncm91bmRDb2xvcjogc291cmNlLmNvbG9ycy5zZWNvbmRhcnkubWFpblxuXHRcdGNvbG9yOiBzb3VyY2UuY29sb3JzLnNlY29uZGFyeS50ZXh0XG5cdFx0aW52ZXJ0OiBwcmltYXJ5SW52ZXJ0XG5cblx0ZGlhbG9nOiBcblx0XHRiYWNrZ3JvdW5kQ29sb3I6JyNGQUZBRkEnXG5cdFxuXHR0ZXh0OiBcblx0XHRwcmltYXJ5OiBzb3VyY2UuY29sb3JzLnByaW1hcnkudGV4dFxuXHRcdHNlY29uZGFyeTogc291cmNlLmNvbG9ycy5zZWNvbmRhcnkudGV4dFxuXHRcblx0dGFibGU6XG5cdFx0YmFja2dyb3VuZENvbG9yOiAnI0ZGRkZGRidcblx0XHR0ZXh0OiBzb3VyY2UuY29sb3JzLnByaW1hcnkudGV4dFxuXHRcdGNoZWNrQm94OlxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHRib3JkZXJDb2xvcjogJyNEM0QzRDMnXG5cdFx0c2VsZWN0ZWQ6XG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IHNvdXJjZS5jb2xvcnMuc2Vjb25kYXJ5Lm1haW5cblx0XHRcdHRleHQ6IHNvdXJjZS5jb2xvcnMucHJpbWFyeS50ZXh0XG5cdFx0XHRjaGVja0JveDpcblx0XHRcdFx0YmFja2dyb3VuZENvbG9yOiBzb3VyY2UuY29sb3JzLnNlY29uZGFyeS5kYXJrXG5cdFx0XHRcdGJvcmRlckNvbG9yOiBudWxsXG5cblx0c2xpZGVyOlxuXHRcdGtub2I6IHNvdXJjZS5jb2xvcnMucHJpbWFyeS5saWdodFxuXHRcdGZpbGw6IHNvdXJjZS5jb2xvcnMucHJpbWFyeS5kYXJrXG5cblx0Y2FyZDpcblx0XHRoZWFkZXI6IHNvdXJjZS5jb2xvcnMuc2Vjb25kYXJ5LmRhcmtcblx0XG5cdG5hdkJhcjpcblx0XHRiYWNrZ3JvdW5kQ29sb3I6ICcjMDAwMDAwJ1xuXHRcblx0a2V5Ym9hcmQ6XG5cdFx0aW1hZ2U6ICdpbWFnZXMva2V5Ym9hcmQucG5nJ1xuXG5jb2xvcl9wYWxsZXRlLmRlc3Ryb3koKVxuXG5leHBvcnRzLnRoZW1lID0gdGhlbWVcbiIsIiMgXHQgODg4ODg4YmEgIG9vICAgICAgICAgICAgICAgICAgIGRQXG4jIFx0IDg4ICAgIGA4YiAgICAgICAgICAgICAgICAgICAgICA4OFxuIyBcdGE4OGFhYWE4UCcgZFAgODhkODg4Yi4gODhkODg4Yi4gODggLmQ4ODg4Yi5cbiMgXHQgODggICBgOGIuIDg4IDg4JyAgYDg4IDg4JyAgYDg4IDg4IDg4b29vb2Q4XG4jIFx0IDg4ICAgICA4OCA4OCA4OC4gIC44OCA4OC4gIC44OCA4OCA4OC4gIC4uLlxuIyBcdCBkUCAgICAgZFAgZFAgODhZODg4UCcgODhZODg4UCcgZFAgYDg4ODg4UCdcbiMgXHQgICAgICAgICAgICAgIDg4ICAgICAgIDg4XG4jIFx0ICAgICAgICAgICAgICBkUCAgICAgICBkUFxuXG4jXHRCeSBkZWZhdWx0LCBzaG93cyBhbiBleHBhbmRpbmcgY2lyY2xlIG92ZXIgYSBsYXllciwgY2xpcHBlZCB0byBpdHMgZnJhbWUuXG4jXHRPbiB0aGUgbGF5ZXIncyB0b3VjaEVuZCBldmVudCwgdGhlIGNpcmNsZSBhbmQgaXRzIG1hc2sgd2lsbCBkaXNhcHBlYXIuXG5cbiNcdHJlcXVpcmVkOlxuI1x0bGF5ZXIgKExheWVyKSwgdGhlIGxheWVyIG92ZXIgd2hpY2ggdG8gc2hvdyB0aGUgcmlwcGxlIGVmZmVjdFxuI1x0cG9pbnQgKG9iamVjdCksIHRoZSByaXBwbGUgb3JpZ2luIHBvaW50LCB1c3VhbGx5IGEgb25Ub3VjaFN0YXJ0J3MgZXZlbnQucG9pbnRcblxuI1x0b3B0aW9uYWw6XG4jXHRwbGFjZUJlaGluZCAoTGF5ZXIpLCBhIGNoaWxkIG9mIGxheWVyIGJlaGluZCB3aGljaCB0aGUgcmlwcGxlIHNob3VsZCBhcHBlYXJcbiNcdGNvbG9yIChzdHJpbmcgb3IgY29sb3Igb2JqZWN0KSwgYSBjdXN0b20gY29sb3IgZm9yIHRoZSByaXBwbGVcblxucmlwcGxlID0gKGxheWVyLCBwb2ludCwgcGxhY2VCZWhpbmQsIGNvbG9yKSAtPlxuXHRcblx0aWYgIWxheWVyPyB0aGVuIHRocm93ICdSaXBwbGUgcmVxdWlyZXMgYSBMYXllci4gVHJ5IG15TGF5ZXIub25Ub3VjaFN0YXJ0IChldmVudCkgLT4gcmlwcGxlKEAsIGV2ZW50LnBvaW50KSdcblx0aWYgIXBvaW50PyB0aGVuIHRocm93ICdSaXBwbGUgcmVxdWlyZXMgYSBwb2ludC4gVHJ5IG15TGF5ZXIub25Ub3VjaFN0YXJ0IChldmVudCkgLT4gcmlwcGxlKEAsIGV2ZW50LnBvaW50KSdcblxuXHRtYXNrID0gbmV3IExheWVyXG5cdFx0bmFtZTogJy4nXG5cdFx0cGFyZW50OiBsYXllclxuXHRcdHNpemU6IGxheWVyLnNpemVcblx0XHRib3JkZXJSYWRpdXM6IGxheWVyLmJvcmRlclJhZGl1c1xuXHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdGNsaXA6IHRydWVcblx0XHRvcGFjaXR5OiAwXG5cdFx0YW5pbWF0aW9uT3B0aW9uczoge3RpbWU6IC4xNX1cblx0XG5cdGlmIHBsYWNlQmVoaW5kIHRoZW4gbWFzay5wbGFjZUJlaGluZChwbGFjZUJlaGluZClcblx0XG5cdCMgUklQUExFIENJUkNMRVxuXHRcblx0bG9uZ1NpZGUgPSBpZiBsYXllci53aWR0aCA+IGxheWVyLmhlaWdodCB0aGVuIGxheWVyLndpZHRoIGVsc2UgbGF5ZXIuaGVpZ2h0XG5cblx0cmlwcGxlQ2lyY2xlID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiAnLicsIHBhcmVudDogbWFza1xuXHRcdFx0eDogcG9pbnQueCAtIDE2XG5cdFx0XHR5OiBwb2ludC55IC0gMTZcblx0XHRcdHdpZHRoOiAzMiwgaGVpZ2h0OiAzMiwgXG5cdFx0XHRib3JkZXJSYWRpdXM6IGxvbmdTaWRlXG5cdFx0XHRcblx0aWYgY29sb3I/XG5cdFx0cmlwcGxlQ2lyY2xlLnByb3BzID1cblx0XHRcdGJhY2tncm91bmRDb2xvcjogY29sb3Jcblx0ZWxzZSBcblx0XHRyaXBwbGVDaXJjbGUucHJvcHMgPSBcblx0XHRcdGJhY2tncm91bmRDb2xvcjogbGF5ZXIuYmFja2dyb3VuZENvbG9yXG5cdFx0XHRzYXR1cmF0ZTogMTUwXG5cdFx0XHRicmlnaHRuZXNzOiAxMjBcblx0XHRcdG9wYWNpdHk6IC4zXG5cdFxuXHQjIEFOSU1BVElPTlMgQ0lSQ0xFXG5cdFxuXHRtYXNrLmFuaW1hdGVcblx0XHRvcGFjaXR5OiAxXG5cdFx0b3B0aW9uczoge3RpbWU6IC4xNX1cblx0XG5cdHJpcHBsZUNpcmNsZS5hbmltYXRlXG5cdFx0eDogcmlwcGxlQ2lyY2xlLnggLSBsb25nU2lkZSAqIDEuM1xuXHRcdHk6IHJpcHBsZUNpcmNsZS55IC0gbG9uZ1NpZGUgKiAxLjNcblx0XHR3aWR0aDogbG9uZ1NpZGUgKiAyLjZcblx0XHRoZWlnaHQ6IGxvbmdTaWRlICogMi42XG5cdFx0b3B0aW9uczoge3RpbWU6IC41fVxuXHRcblx0VXRpbHMuZGVsYXkgMiwgLT4gXG5cdFx0bWFzay5hbmltYXRlXG5cdFx0XHRvcGFjaXR5OiAwXG5cdFx0bWFzay5vbkFuaW1hdGlvbkVuZCBtYXNrLmRlc3Ryb3lcblxuXHQjIFRPVUNIIEVORFxuXHRcblx0bGF5ZXIub25Ub3VjaEVuZCAtPiBcblx0XHRtYXNrLmFuaW1hdGVcblx0XHRcdG9wYWNpdHk6IDBcblx0XHRtYXNrLm9uQW5pbWF0aW9uRW5kIG1hc2suZGVzdHJveVxuXG5leHBvcnRzLnJpcHBsZSA9IHJpcHBsZSIsIntyaXBwbGV9ID0gcmVxdWlyZSAncmlwcGxlJ1xue3RoZW1lfSA9IHJlcXVpcmUgJ3RoZW1lJ1xudHlwZSA9IHJlcXVpcmUgJ3R5cGUnXG5pY29ucyA9IEpTT04ucGFyc2UgVXRpbHMuZG9tTG9hZERhdGFTeW5jIFwibW9kdWxlcy9pY29ucy5qc29uXCJcblxuRnJhbWVyLkV4dHJhcy5IaW50cy5kaXNhYmxlKClcblxuIyBUT0RPOiBDaGFuZ2UgQXBwIGZyb20gbWFzdGVyIGZsb3cgY29tcG9uZW50IHRvIFNjcmVlbiBtYW5hZ2VyLlxuIyBBcHAgc2hvdWxkbid0IGRpcmVjdGx5IG1hbmFnZSBwYWdlczogYSBuZXcgY2xhc3MsICdzY3JlZW4nIHdpbGwgbWFuYWdlIFBhZ2VzLlxuIyBUYWJzIGFsbG93IG5hdmlnYXRpb24gYmV0d2VlbiBTY3JlZW5zLiBDb250ZW50IGlzIHN0aWxsIGFkZGVkIHRvIFBhZ2VzLlxuXG5cbiMgT3VyIGdvYWwgaXMgdG8gcmVxdWlyZSBvbmx5IG9uZSByZXF1aXJlIGluIEZyYW1lciBwcm9qZWN0LCBzbyB0aGlzIFxuIyBpcyBhIGNsdW5reSB3YXkgb2YgbGV0dGluZyB1c2VyIGNyZWF0ZSB0ZXh0IHVzaW5nIG1kLlRpdGxlLCBldGMuXG5cbmV4cG9ydHMudGhlbWUgPSB0aGVtZVxuZXhwb3J0cy5UaXRsZSA9IFRpdGxlID0gdHlwZS5UaXRsZVxuZXhwb3J0cy5IZWFkbGluZSA9IEhlYWRsaW5lID0gdHlwZS5IZWFkbGluZVxuZXhwb3J0cy5TdWJoZWFkU2Vjb25kYXJ5ID0gU3ViaGVhZFNlY29uZGFyeSA9IHR5cGUuU3ViaGVhZFNlY29uZGFyeVxuZXhwb3J0cy5SZWd1bGFyID0gUmVndWxhciA9IHR5cGUuUmVndWxhclxuZXhwb3J0cy5Cb2R5MiA9IEJvZHkyID0gdHlwZS5Cb2R5MlxuZXhwb3J0cy5Cb2R5MSA9IEJvZHkxID0gdHlwZS5Cb2R5MVxuZXhwb3J0cy5DYXB0aW9uID0gQ2FwdGlvbiA9IHR5cGUuQ2FwdGlvblxuZXhwb3J0cy5EaWFsb2dBY3Rpb24gPSBEaWFsb2dBY3Rpb24gPSB0eXBlLkRpYWxvZ0FjdGlvblxuXG5hcHAgPSB1bmRlZmluZWRcblxuXG5cblxuXG5cblxuXG4jIFx0IC5kODg4ODg4XG4jIFx0ZDgnICAgIDg4XG4jIFx0ODhhYWFhYTg4YSA4OGQ4ODhiLiA4OGQ4ODhiLlxuIyBcdDg4ICAgICA4OCAgODgnICBgODggODgnICBgODhcbiMgXHQ4OCAgICAgODggIDg4LiAgLjg4IDg4LiAgLjg4XG4jIFx0ODggICAgIDg4ICA4OFk4ODhQJyA4OFk4ODhQJ1xuIyBcdCAgICAgICAgICAgODggICAgICAgODhcbiMgXHQgICAgICAgICAgIGRQICAgICAgIGRQXG5cblxuXG5leHBvcnRzLkFwcCA9IGNsYXNzIEFwcCBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXG5cdFx0QF9ib3R0b21OYXYgPSBvcHRpb25zLmJvdHRvbU5hdiA/IHVuZGVmaW5lZFxuXHRcdEBfbWVudU92ZXJsYXkgPSBvcHRpb25zLm1lbnVPdmVybGF5ID8gdW5kZWZpbmVkXG5cdFx0XG5cdFx0QHRoZW1lID0gdGhlbWVcblx0XHRAdmlld3MgPSBvcHRpb25zLnZpZXdzID8gW11cblx0XHRAY3VycmVudCA9IHtpOiAwfVxuXG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0bmFtZTogJ0FwcCdcblx0XHRcdHNpemU6IFNjcmVlbi5zaXplXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcdGluZGV4OiAxXG5cdFx0XG5cdFx0YXBwID0gQFxuXG5cdFx0IyBIRUFERVJcblxuXHRcdEBoZWFkZXIgPSBuZXcgSGVhZGVyXG5cdFx0XHR0aGVtZTogdGhlbWVcblx0XHRcdGluZGV4OiA5OTlcblxuXHRcdCMgRk9PVEVSXG5cblx0XHRAZm9vdGVyID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiAnRm9vdGVyJ1xuXHRcdFx0d2lkdGg6IFNjcmVlbi53aWR0aCwgaGVpZ2h0OiA0OFxuXHRcdFx0aW1hZ2U6ICdpbWFnZXMvbmF2X2Jhci5wbmcnXG5cdFx0XHRpbmRleDogOTk5XG5cdFx0XHR5OiBBbGlnbi5ib3R0b20oKVxuXG5cdFx0aWYgQF9ib3R0b21OYXZcblx0XHRcdEBib3R0b21OYXYgPSBuZXcgQm90dG9tTmF2XG5cdFx0XHRcdG5hbWU6ICdCb3R0b20gTmF2J1xuXHRcdFx0XHRkZXN0aW5hdGlvbnM6IEBfYm90dG9tTmF2LmxpbmtzID8gXCJtZC5hcHAuYm90dG9tTmF2IG5lZWRzIGFuIGFycmF5IG9mIGxpbmtzLiBFeGFtcGxlOiBbe3RpdGxlOiAnSG9tZScsIGljb246ICdob21lJywgYWN0aW9uOiAtPiB2aWV3LmxpbmtUbyhob21lKX1dXCJcblx0XHRcdFx0eTogaWYgQGZvb3Rlcj8gdGhlbiBBbGlnbi5ib3R0b20oLUBmb290ZXIuaGVpZ2h0KSBlbHNlIEFsaWduLmJvdHRvbSgpXG5cdFx0XHRcdGluZGV4OiA5OThcblxuXHRcdCMgTUVOVSBPVkVSTEFZXG5cdFx0aWYgQF9tZW51T3ZlcmxheVxuXHRcdFx0QG1lbnVPdmVybGF5ID0gbmV3IE1lbnVPdmVybGF5XG5cdFx0XHRcdG5hbWU6ICdNZW51IE92ZXJsYXknXG5cdFx0XHRcdHRpdGxlOiBAX21lbnVPdmVybGF5LnRpdGxlID8gdGhyb3cgJ21kLmFwcC5tZW51T3ZlcmxheSBuZWVkcyBhIHRpdGxlLidcblx0XHRcdFx0bGlua3M6IEBfbWVudU92ZXJsYXkubGlua3MgPyB0aHJvdyBcIm1kLmFwcC5tZW51T3ZlcmxheSBuZWVkcyBhbiBhcnJheSBvZiBsaW5rcy4gRXhhbXBsZTogW3t0aXRsZTogJ0hvbWUnLCBpY29uOiAnaG9tZScsIGFjdGlvbjogLT4gdmlldy5saW5rVG8oaG9tZSl9XVwiXG5cblxuXHRcdCMgS0VZQk9BUkRcblxuXHRcdEBrZXlib2FyZCA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogJ0tleWJvYXJkJ1xuXHRcdFx0eTogQG1heFksIGltYWdlOiB0aGVtZS5rZXlib2FyZC5pbWFnZVxuXHRcdFx0d2lkdGg6IEB3aWR0aCwgaGVpZ2h0OiAyMjJcblx0XHRcdGluZGV4OiAxMDAwXG5cdFx0XHRhbmltYXRpb25PcHRpb25zOlxuXHRcdFx0XHR0aW1lOiAuMjVcblxuXHRcdEBrZXlib2FyZC5vblRhcCA9PiBAaGlkZUtleWJvYXJkKClcblxuXHRcdGZvciB2aWV3LCBpIGluIEB2aWV3c1xuXHRcdFx0QGFkZFZpZXcodmlldywgaSlcblxuXHRcdEBjaGFuZ2VWaWV3KEB2aWV3c1swXSlcblxuXHRzaG93S2V5Ym9hcmQ6IC0+XG5cdFx0QGtleWJvYXJkLmFuaW1hdGVcblx0XHRcdHk6IEFsaWduLmJvdHRvbSgpXG5cdFx0QGtleWJvYXJkLmJyaW5nVG9Gcm9udCgpXG5cblx0aGlkZUtleWJvYXJkOiAtPlxuXHRcdEBrZXlib2FyZC5hbmltYXRlXG5cdFx0XHR5OiBAbWF4WVxuXG5cdGFkZFZpZXc6ICh2aWV3LCBpKSAtPlxuXHRcdHZpZXcuaSA9IGlcblx0XHR2aWV3LnBhcmVudCA9IEBcblx0XHR2aWV3LnkgPSBAaGVhZGVyLm1heFlcblx0XHR2aWV3LmhlaWdodCA9IFNjcmVlbi5oZWlnaHQgLSBAaGVhZGVyLmhlaWdodCAtIEBmb290ZXIuaGVpZ2h0IC0gQGJvdHRvbU5hdi5oZWlnaHRcblxuXHRcdHZpZXcuaG9tZSA9IHZpZXcubmV3UGFnZVxuXHRcdCBcdGhlYWRlcjpcblx0XHRcdCBcdHRpdGxlOiB2aWV3Ll90aXRsZVxuXHRcdFx0IFx0aWNvbjogdmlldy5faWNvblxuXHRcdFx0IFx0aWNvbkFjdGlvbjogdmlldy5faWNvbkFjdGlvblxuXG5cdFx0dmlldy5zaG93TmV4dCh2aWV3LmhvbWUpXG5cblx0Y2hhbmdlVmlldzogKHZpZXcpIC0+XG5cblx0XHRyZXR1cm4gaWYgdmlldyBpcyBAY3VycmVudFxuXG5cdFx0QGhlYWRlci50aXRsZSA9IHZpZXcuY3VycmVudC5faGVhZGVyPy50aXRsZSA/ICdEZWZhdWx0J1xuXHRcdEBoZWFkZXIuaWNvbiA9IHZpZXcuY3VycmVudC5pY29uID8gJ21lbnUnXG5cdFx0QGhlYWRlci5pY29uQWN0aW9uID0gdmlldy5jdXJyZW50Lmljb25BY3Rpb24gPyAtPiBhcHAuc2hvd01lbnUoKVxuXHRcdEBoZWFkZXIudmlzaWJsZSA9IHZpZXcuY3VycmVudC52aXNpYmxlID8gdHJ1ZVxuXHRcdFxuXG5cblx0XHRpZiB2aWV3LmkgPiBAY3VycmVudC5pXG5cdFx0XHR2aWV3LnggPSBTY3JlZW4ud2lkdGggXG5cdFx0ZWxzZSBpZiB2aWV3LmkgPCBAY3VycmVudC5pXG5cdFx0XHR2aWV3LnggPSAtU2NyZWVuLndpZHRoXG5cblx0XHR2aWV3LmFuaW1hdGUge3g6IDB9XG5cdFx0dmlldy5icmluZ1RvRnJvbnQoKVxuXHRcdEBjdXJyZW50ID0gdmlld1xuXG5cdHNob3dNZW51OiAtPlxuXHRcdEBtZW51T3ZlcmxheS5zaG93KClcblxuXHRoaWRlTWVudTogLT5cblx0XHRAbWVudU92ZXJsYXkuaGlkZSgpXG5cblx0Y2hhbmdlUGFnZTogKHBhZ2UpIC0+XG5cdFx0QGhlYWRlci50aXRsZSA9IHBhZ2UuX2hlYWRlci50aXRsZVxuXHRcdEBoZWFkZXIuaWNvbiA9IHBhZ2UuX2hlYWRlci5pY29uXG5cdFx0QGhlYWRlci5pY29uQWN0aW9uID0gcGFnZS5faGVhZGVyLmljb25BY3Rpb25cblx0XHRAaGVhZGVyLnZpc2libGUgPSBwYWdlLl9oZWFkZXIudmlzaWJsZVxuXHRcdHBhZ2UuX29uTG9hZCgpXG5cblxuXG5cblxuIyBcdGRQICAgICBkUCBvb1xuIyBcdDg4ICAgICA4OFxuIyBcdDg4ICAgIC44UCBkUCAuZDg4ODhiLiBkUCAgZFAgIGRQXG4jIFx0ODggICAgZDgnIDg4IDg4b29vb2Q4IDg4ICA4OCAgODhcbiMgXHQ4OCAgLmQ4UCAgODggODguICAuLi4gODguODhiLjg4J1xuIyBcdDg4ODg4OCcgICBkUCBgODg4ODhQJyA4ODg4UCBZOFBcblxuXG5cbmV4cG9ydHMuVmlldyA9IGNsYXNzIFZpZXcgZXh0ZW5kcyBGbG93Q29tcG9uZW50XG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXG5cdFx0QF90aXRsZSA9IG9wdGlvbnMudGl0bGUgPyAnSG9tZSdcblx0XHRAX2ljb24gPSBvcHRpb25zLmljb24gPyAnbWVudSdcblx0XHRAX2ljb25BY3Rpb24gPSBvcHRpb25zLmljb25BY3Rpb24gPyAtPiBhcHAubWVudU92ZXJsYXkuc2hvdygpIFxuXG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0bmFtZTogJ1ZpZXcnXG5cdFx0XHRhbmltYXRpb25PcHRpb25zOiB7Y3VydmU6IFwic3ByaW5nKDMwMCwgMzUsIDApXCJ9XG5cdFx0XHRzaGFkb3dTcHJlYWQ6IDIsIHNoYWRvd0NvbG9yOiAncmdiYSgwLDAsMCwuMSknLCBzaGFkb3dCbHVyOiA2XG5cblx0XHRAb25UcmFuc2l0aW9uU3RhcnQgKGN1cnJlbnQsIG5leHQsIGRpcmVjdGlvbikgLT4gYXBwLmNoYW5nZVBhZ2UobmV4dClcblxuXG5cdG5ld1BhZ2U6IChvcHRpb25zID0ge30pIC0+XG5cdFx0cGFnZSA9IG5ldyBQYWdlIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdHNpemU6IEBzaXplXG5cdFx0cmV0dXJuIHBhZ2UgXG5cblx0YWRkUGFnZTogKHBhZ2UpIC0+XG5cdFx0IyBwYWdlLmNvbnRlbnRJbnNldCA9IHt0b3A6IEBhcHAuaGVhZGVyLmhlaWdodH1cblxuXHRcdCMgYWRqdXN0IGNvbnRlbnQgaW5zZXQgZm9yIHBhZ2Vcblx0XHQjIGlmIHBhZ2UuY29udGVudEluc2V0LnRvcCA8IEBhcHAuaGVhZGVyLmhlaWdodCB0aGVuIHBhZ2UuY29udGVudEluc2V0ID0gXG5cdFx0IyBcdHRvcDogcGFnZS5jb250ZW50SW5zZXQudG9wICs9IEBhcHAuaGVhZGVyLmhlaWdodFxuXHRcdCMgXHRib3R0b206IHBhZ2UuY29udGVudEluc2V0LmJvdHRvbVxuXHRcdCMgXHRsZWZ0OiBwYWdlLmNvbnRlbnRJbnNldC5sZWZ0XG5cdFx0IyBcdHJpZ2h0OiBwYWdlLmNvbnRlbnRJbnNldC5yaWdodFxuXG5cdFx0cmV0dXJuIHBhZ2VcblxuXHRsaW5rVG86IChwYWdlKSAtPlxuXHRcdGlmIHBhZ2U/IGFuZCBAY3VycmVudCBpc250IHBhZ2Vcblx0XHRcdEBzaG93TmV4dChwYWdlKVxuXG5cblxuXG5cblxuXG5cbiMgXHRkUFxuIyBcdDg4XG4jIFx0ODggLmQ4ODg4Yi4gLmQ4ODg4Yi4gODhkODg4Yi5cbiMgXHQ4OCA4OCcgIGBcIlwiIDg4JyAgYDg4IDg4JyAgYDg4XG4jIFx0ODggODguICAuLi4gODguICAuODggODggICAgODhcbiMgXHRkUCBgODg4ODhQJyBgODg4ODhQJyBkUCAgICBkUFxuIyBcdFxuIyBcdFxuXG5leHBvcnRzLkljb24gPSBjbGFzcyBJY29uIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cblx0XHRAX2ljb24gPSBvcHRpb25zLmljb24gPyAnbWVudSdcblx0XHRAX2NvbG9yID0gb3B0aW9ucy5jb2xvciA/ICcjMDAwMDAnXG5cdFx0QF9iYWNrZ3JvdW5kQ29sb3IgPSBvcHRpb25zLmJhY2tncm91bmRDb2xvciA/IG51bGxcblxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdG5hbWU6ICcuJ1xuXHRcdFx0aGVpZ2h0OiAyNCwgd2lkdGg6IDI0XG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IEBfYmFja2dyb3VuZENvbG9yXG5cblx0XHQjIEBpY29uID0gQF9pY29uXG5cblx0QGRlZmluZSBcImljb25cIixcblx0XHRnZXQ6IC0+IHJldHVybiBAX2ljb25cblx0XHRzZXQ6IChuYW1lKSAtPlxuXHRcdFx0QF9pY29uID0gbmFtZVxuXG5cdFx0XHRzdmcgPSBpZiBpY29uc1tAX2ljb25dIHRoZW4gXCI8c3ZnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zycgdmlld0JveD0nMCAwIDI0IDI0Jz48cGF0aCBkPScje2ljb25zW0BfaWNvbl19JyBmaWxsPScje0BfY29sb3J9Jy8+PC9zdmc+XCJcblx0XHRcdGVsc2UgdGhyb3cgXCJFcnJvcjogaWNvbiAnI3tuYW1lfScgd2FzIG5vdCBmb3VuZC4gU2VlIGh0dHBzOi8vbWF0ZXJpYWxkZXNpZ25pY29ucy5jb20vIGZvciBmdWxsIGxpc3Qgb2YgaWNvbnMuXCJcblxuXHRcdFx0QGh0bWwgPSBzdmdcblxuXHRAZGVmaW5lIFwiY29sb3JcIixcblx0XHRnZXQ6IC0+IHJldHVybiBAX2NvbG9yXG5cdFx0c2V0OiAoY29sb3IpIC0+XG5cdFx0XHRAX2NvbG9yID0gbmV3IENvbG9yKGNvbG9yKVxuXG5cdFx0XHRzdmcgPSBpZiBpY29uc1tAX2ljb25dIHRoZW4gXCI8c3ZnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zycgdmlld0JveD0nMCAwIDI0IDI0Jz48cGF0aCBkPScje2ljb25zW0BfaWNvbl19JyBmaWxsPScje0BfY29sb3J9Jy8+PC9zdmc+XCJcblx0XHRcdGVsc2UgdGhyb3cgXCJFcnJvcjogaWNvbiAnI3tuYW1lfScgd2FzIG5vdCBmb3VuZC4gU2VlIGh0dHBzOi8vbWF0ZXJpYWxkZXNpZ25pY29ucy5jb20vIGZvciBmdWxsIGxpc3Qgb2YgaWNvbnMuXCJcblxuXHRcdFx0QGh0bWwgPSBzdmdcblxuXG5cblxuXG5cbiMgLmQ4ODg4OGIgICAgZFAgICAgICAgICAgICAgIGRQICAgICAgICAgICAgICAgICAgICAgIDg4ODg4OGJhICAgICAgICAgICAgICAgICAgIFxuIyA4OC4gICAgXCInICAgODggICAgICAgICAgICAgIDg4ICAgICAgICAgICAgICAgICAgICAgIDg4ICAgIGA4YiAgICAgICAgICAgICAgICAgIFxuIyBgWTg4ODg4Yi4gZDg4ODhQIC5kODg4OGIuIGQ4ODg4UCBkUCAgICBkUCAuZDg4ODhiLiBhODhhYWFhOFAnIC5kODg4OGIuIDg4ZDg4OGIuXG4jICAgICAgIGA4YiAgIDg4ICAgODgnICBgODggICA4OCAgIDg4ICAgIDg4IFk4b29vb28uICA4OCAgIGA4Yi4gODgnICBgODggODgnICBgODhcbiMgZDgnICAgLjhQICAgODggICA4OC4gIC44OCAgIDg4ICAgODguICAuODggICAgICAgODggIDg4ICAgIC44OCA4OC4gIC44OCA4OCAgICAgIFxuIyAgWTg4ODg4UCAgICBkUCAgIGA4ODg4OFA4ICAgZFAgICBgODg4ODhQJyBgODg4ODhQJyAgODg4ODg4ODhQIGA4ODg4OFA4IGRQICBcblxuXG5cbmV4cG9ydHMuU3RhdHVzQmFyID0gY2xhc3MgU3RhdHVzQmFyIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cblx0XHRzdXBlciBfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRuYW1lOiAnLidcblx0XHRcdHdpZHRoOiBTY3JlZW4ud2lkdGgsIGhlaWdodDogMjRcblx0XHRcdGJhY2tncm91bmRDb2xvcjogdGhlbWUuc3RhdHVzQmFyLmJhY2tncm91bmRDb2xvclxuXG5cdFx0QGl0ZW1zID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQFxuXHRcdFx0c2l6ZTogQHNpemVcblx0XHRcdGltYWdlOiB0aGVtZS5zdGF0dXNCYXIuaW1hZ2Vcblx0XHRcdGludmVydDogdGhlbWUuc3RhdHVzQmFyLmludmVydFxuXG5cblxuXG5cblxuXG5cbiMgZFAgICAgIGRQICAgICAgICAgICAgICAgICAgICAgICAgICBkUCAgICAgICAgICAgICAgICAgIFxuIyA4OCAgICAgODggICAgICAgICAgICAgICAgICAgICAgICAgIDg4ICAgICAgICAgICAgICAgICAgXG4jIDg4YWFhYWE4OGEgLmQ4ODg4Yi4gLmQ4ODg4Yi4gLmQ4ODhiODggLmQ4ODg4Yi4gODhkODg4Yi5cbiMgODggICAgIDg4ICA4OG9vb29kOCA4OCcgIGA4OCA4OCcgIGA4OCA4OG9vb29kOCA4OCcgIGA4OFxuIyA4OCAgICAgODggIDg4LiAgLi4uIDg4LiAgLjg4IDg4LiAgLjg4IDg4LiAgLi4uIDg4ICAgICAgXG4jIGRQICAgICBkUCAgYDg4ODg4UCcgYDg4ODg4UDggYDg4ODg4UDggYDg4ODg4UCcgZFAgICAgXG5cblxuXG5leHBvcnRzLkhlYWRlciA9IGNsYXNzIEhlYWRlciBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXHRcdFxuXHRcdEBfdGl0bGUgPSB1bmRlZmluZWRcblx0XHRAX2ljb24gPSB1bmRlZmluZWRcblx0XHRAX2ljb25BY3Rpb24gPSBvcHRpb25zLmljb25BY3Rpb24gPyAtPiBudWxsXG5cblx0XHRzdXBlciBfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRuYW1lOiAnSGVhZGVyJywgXG5cdFx0XHR3aWR0aDogU2NyZWVuLndpZHRoLCBoZWlnaHQ6IDgwXG5cdFx0XHRzaGFkb3dZOiAyLCBzaGFkb3dCbHVyOiAzLCBzaGFkb3dDb2xvcjogJ3JnYmEoMCwwLDAsLjI0KSdcblx0XHRcdGJhY2tncm91bmRDb2xvcjogdGhlbWUuaGVhZGVyLmJhY2tncm91bmRDb2xvclxuXG5cdFx0QHN0YXR1c0JhciA9IG5ldyBTdGF0dXNCYXJcblx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBAXG5cblx0XHQjIFRPRE86IGlmIG9wdGlvbnMuaWNvbiBpcyBmYWxzZSB0aGVuIG5vIGljb25MYXllciwgbW92ZSB0aXRsZSBsZWZ0XG5cblx0XHRAdGl0bGVMYXllciA9IG5ldyB0eXBlLlRpdGxlXG5cdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQFxuXHRcdFx0eDogNzIsIHk6IEFsaWduLmJvdHRvbSgtMTQpXG5cdFx0XHRjb2xvcjogdGhlbWUuaGVhZGVyLnRpdGxlXG5cdFx0XHR0ZXh0OiBAdGl0bGUgPyBcIk5vIHRpdGxlXCJcblxuXHRcdEB0aXRsZSA9IG9wdGlvbnMudGl0bGUgPyAnRGVmYXVsdCBIZWFkZXInXG5cblx0XHRAaWNvbkxheWVyID0gbmV3IEljb25cblx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBALCBcblx0XHRcdHg6IDEyLCB5OiBBbGlnbi5jZW50ZXIoMTIpXG5cdFx0XHRpY29uOiAnbWVudScsIGNvbG9yOiB0aGVtZS5oZWFkZXIuaWNvbi5jb2xvclxuXG5cdFx0QGljb24gPSBvcHRpb25zLmljb24gPyAnbWVudSdcblxuXHRcdEBpY29uTGF5ZXIub25UYXAgPT4gQF9pY29uQWN0aW9uKClcblx0XHRAaWNvbkxheWVyLm9uVG91Y2hTdGFydCAoZXZlbnQpIC0+IHJpcHBsZShhcHAuaGVhZGVyLCBldmVudC5wb2ludClcblxuXG5cdEBkZWZpbmUgXCJ0aXRsZVwiLFxuXHRcdGdldDogLT4gcmV0dXJuIEBfdGl0bGVcblx0XHRzZXQ6ICh0aXRsZVRleHQpIC0+XG5cdFx0XHRAX3RpdGxlID0gdGl0bGVUZXh0XG5cdFx0XHRAdGl0bGVMYXllci50ZXh0UmVwbGFjZShAdGl0bGVMYXllci50ZXh0LCBAX3RpdGxlKVxuXG5cdEBkZWZpbmUgXCJpY29uXCIsXG5cdFx0Z2V0OiAtPiByZXR1cm4gQF9pY29uXG5cdFx0c2V0OiAoaWNvbk5hbWUpIC0+IFxuXHRcdFx0QF9pY29uID0gaWNvbk5hbWVcblx0XHRcdEBpY29uTGF5ZXIuaWNvbiA9IGljb25OYW1lXG5cblx0QGRlZmluZSBcImljb25Db2xvclwiLFxuXHRcdGdldDogLT4gcmV0dXJuIEBfaWNvbi5jb2xvclxuXHRcdHNldDogKGNvbG9yKSAtPiBcblx0XHRcdEBpY29uTGF5ZXIuY29sb3IgPSBjb2xvclxuXG5cdEBkZWZpbmUgXCJpY29uQWN0aW9uXCIsXG5cdFx0Z2V0OiAtPiByZXR1cm4gQF9pY29uQWN0aW9uXG5cdFx0c2V0OiAoYWN0aW9uKSAtPlxuXHRcdFx0QF9pY29uQWN0aW9uID0gYWN0aW9uXG5cblxuXG5cblxuXG5cbiMgXHQgODg4ODg4YmEgICAgICAgICAgICAgZFAgICAgIGRQICAgICAgICAgICAgICAgICAgICAgICA4ODg4ODhiYVxuIyBcdCA4OCAgICBgOGIgICAgICAgICAgICA4OCAgICAgODggICAgICAgICAgICAgICAgICAgICAgIDg4ICAgIGA4YlxuIyBcdGE4OGFhYWE4UCcgLmQ4ODg4Yi4gZDg4ODhQIGQ4ODg4UCAuZDg4ODhiLiA4OGQ4Yi5kOGIuIDg4ICAgICA4OCAuZDg4ODhiLiBkUCAgIC5kUFxuIyBcdCA4OCAgIGA4Yi4gODgnICBgODggICA4OCAgICAgODggICA4OCcgIGA4OCA4OCdgODgnYDg4IDg4ICAgICA4OCA4OCcgIGA4OCA4OCAgIGQ4J1xuIyBcdCA4OCAgICAuODggODguICAuODggICA4OCAgICAgODggICA4OC4gIC44OCA4OCAgODggIDg4IDg4ICAgICA4OCA4OC4gIC44OCA4OCAuODgnXG4jIFx0IDg4ODg4ODg4UCBgODg4ODhQJyAgIGRQICAgICBkUCAgIGA4ODg4OFAnIGRQICBkUCAgZFAgZFAgICAgIGRQIGA4ODg4OFA4IDg4ODhQJ1xuXG5cblxuZXhwb3J0cy5Cb3R0b21OYXYgPSBjbGFzcyBCb3R0b21OYXYgZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblx0XHRcblx0XHRAX2Rlc3RpbmF0aW9ucyA9IG9wdGlvbnMuZGVzdGluYXRpb25zID8gdGhyb3cgJ05lZWRzIGF0IGxlYXN0IG9uZSBkZXN0aW5hdGlvbi4nXG5cdFx0QF9pdGVtcyA9IFtdXG5cdFx0QF9pbml0aWFsRGVzdGluYXRpb24gPSBvcHRpb25zLmluaXRpYWxEZXN0aW5hdGlvbiA/IHVuZGVmaW5lZFxuXHRcdCMgZGVzdGluYXRpb24gc2hvdWxkIGJlOiBbe25hbWU6IHN0cmluZywgaWNvbjogaWNvblN0cmluZywgYWN0aW9uOiBmdW5jdGlvbn1dXG5cdFx0QF9hY3RpdmVEZXN0aW5hdGlvbiA9IEBfaW5pdGlhbERlc3RpbmF0aW9uID8gQF9pdGVtc1swXVxuXG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0bmFtZTogJ0JvdHRvbSBOYXYnXG5cdFx0XHR5OiBBbGlnbi5ib3R0b21cblx0XHRcdHdpZHRoOiBTY3JlZW4ud2lkdGgsIGhlaWdodDogNTZcblx0XHRcdGJhY2tncm91bmRDb2xvcjogdGhlbWUuYm90dG9tTmF2LmJhY2tncm91bmRDb2xvclxuXHRcdFx0c2hhZG93WTogdGhlbWUuYm90dG9tTmF2LnNoYWRvd1lcblx0XHRcdHNoYWRvd0JsdXI6IHRoZW1lLmJvdHRvbU5hdi5zaGFkb3dCbHVyXG5cdFx0XHRzaGFkb3dDb2xvcjogdGhlbWUuYm90dG9tTmF2LnNoYWRvd0NvbG9yXG5cblxuXHRcdGZvciBkZXN0aW5hdGlvbiwgaSBpbiBAX2Rlc3RpbmF0aW9uc1xuXHRcdFx0aXRlbSA9IG5ldyBMYXllclxuXHRcdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQFxuXHRcdFx0XHR4OiBAd2lkdGgvQF9kZXN0aW5hdGlvbnMubGVuZ3RoICogaVxuXHRcdFx0XHR3aWR0aDogQHdpZHRoL0BfZGVzdGluYXRpb25zLmxlbmd0aCwgaGVpZ2h0OiBAaGVpZ2h0XG5cdFx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXG5cdFx0XHRpdGVtLmRpc2sgPSBuZXcgTGF5ZXJcblx0XHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IGl0ZW1cblx0XHRcdFx0eDogQWxpZ24uY2VudGVyLCB5OiBBbGlnbi5jZW50ZXJcblx0XHRcdFx0aGVpZ2h0OiBAaGVpZ2h0LCB3aWR0aDogQGhlaWdodCwgYm9yZGVyUmFkaXVzOiBAaGVpZ2h0LzJcblx0XHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cblx0XHRcdGl0ZW0uaWNvbkxheWVyID0gbmV3IEljb25cblx0XHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IGl0ZW0uZGlza1xuXHRcdFx0XHR4OiBBbGlnbi5jZW50ZXIsIHk6IEFsaWduLmNlbnRlcigtOClcblx0XHRcdFx0aWNvbjogZGVzdGluYXRpb24uaWNvblxuXHRcdFx0XHRhbmltYXRpb25PcHRpb25zOiB7dGltZTogLjE1fVxuXG5cdFx0XHRpdGVtLmxhYmVsTGF5ZXIgPSBuZXcgdHlwZS5DYXB0aW9uXG5cdFx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBpdGVtLmRpc2tcblx0XHRcdFx0eDogQWxpZ24uY2VudGVyLCB5OiBBbGlnbi5jZW50ZXIoMTQpXG5cdFx0XHRcdHdpZHRoOiBAd2lkdGgsIHRleHRBbGlnbjogJ2NlbnRlcidcblx0XHRcdFx0dGV4dDogZGVzdGluYXRpb24udGl0bGVcblx0XHRcdFx0YW5pbWF0aW9uT3B0aW9uczoge3RpbWU6IC4xNX1cblxuXHRcdFx0aXRlbS5hY3Rpb24gPSBkZXN0aW5hdGlvbi5hY3Rpb25cblxuXHRcdFx0aXRlbS5kaXNrLm9uVG91Y2hTdGFydCAoZXZlbnQpIC0+IFxuXHRcdFx0XHRyaXBwbGUoQCwgZXZlbnQucG9pbnQsIEBwYXJlbnQuaWNvbkxheWVyLCBuZXcgQ29sb3IodGhlbWUucHJpbWFyeSkuYWxwaGEoLjMpKVxuXG5cdFx0XHRpdGVtLm9uVGFwIC0+IEBwYXJlbnQuYWN0aXZlRGVzdGluYXRpb24gPSBAXG5cblx0XHRcdEBfaXRlbXMucHVzaChpdGVtKVxuXG5cdFx0XHRAc2hvd0FjdGl2ZShAX2l0ZW1zWzBdKVxuXG5cdFx0XG5cblx0QGRlZmluZSBcImFjdGl2ZURlc3RpbmF0aW9uXCIsXG5cdFx0Z2V0OiAtPiByZXR1cm4gQF9hY3RpdmVEZXN0aW5hdGlvblxuXHRcdHNldDogKGRlc3RpbmF0aW9uKSAtPlxuXHRcdFx0cmV0dXJuIGlmIGRlc3RpbmF0aW9uIGlzIEBfYWN0aXZlRGVzdGluYXRpb25cblx0XHRcdEBfYWN0aXZlRGVzdGluYXRpb24gPSBkZXN0aW5hdGlvblxuXG5cdFx0XHRAX2FjdGl2ZURlc3RpbmF0aW9uLmFjdGlvbigpXG5cdFx0XHRAc2hvd0FjdGl2ZShAX2FjdGl2ZURlc3RpbmF0aW9uKVxuXG5cdHNob3dBY3RpdmU6IChpdGVtKSAtPlxuXHRcdGl0ZW0ubGFiZWxMYXllci5hbmltYXRlIHtjb2xvcjogdGhlbWUucHJpbWFyeSwgb3BhY2l0eTogMX1cblx0XHRpdGVtLmljb25MYXllci5jb2xvciA9IHRoZW1lLnByaW1hcnlcblx0XHRcblxuXHRcdGZvciBzaWIgaW4gaXRlbS5zaWJsaW5nc1xuXHRcdFx0c2liLmxhYmVsTGF5ZXIuYW5pbWF0ZSB7Y29sb3I6ICcjNzc3J31cblx0XHRcdHNpYi5pY29uTGF5ZXIuY29sb3IgPSAnIzc3NydcblxuXG5cblxuIyAgODg4ODg4YmEgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4jICA4OCAgICBgOGIgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiMgYTg4YWFhYThQJyAuZDg4ODhiLiAuZDg4ODhiLiAuZDg4ODhiLlxuIyAgODggICAgICAgIDg4JyAgYDg4IDg4JyAgYDg4IDg4b29vb2Q4XG4jICA4OCAgICAgICAgODguICAuODggODguICAuODggODguICAuLi5cbiMgIGRQICAgICAgICBgODg4ODhQOCBgODg4OFA4OCBgODg4ODhQJ1xuIyAgICAgICAgICAgICAgICAgICAgICAgICAgLjg4ICAgICAgICAgXG4jICAgICAgICAgICAgICAgICAgICAgIGQ4ODg4UCAgICAgICAgICBcblxuXG5cbmV4cG9ydHMuUGFnZSA9IGNsYXNzIFBhZ2UgZXh0ZW5kcyBTY3JvbGxDb21wb25lbnRcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cdFx0XG5cdFx0QF9oZWFkZXIgPSB7fVxuXHRcdEBfaGVhZGVyLnRpdGxlID0gb3B0aW9ucy5oZWFkZXI/LnRpdGxlID8gJ05ldyBQYWdlJ1xuXHRcdEBfaGVhZGVyLnZpc2libGUgPSBvcHRpb25zLmhlYWRlcj8udmlzaWJsZSA/IHRydWVcblx0XHRAX2hlYWRlci5pY29uID0gb3B0aW9ucy5oZWFkZXI/Lmljb24gPyAnbWVudSdcblx0XHRAX2hlYWRlci5pY29uQWN0aW9uID0gb3B0aW9ucy5oZWFkZXI/Lmljb25BY3Rpb24gPyAtPiBudWxsXG5cblx0XHRAX3RlbXBsYXRlID0gb3B0aW9ucy50ZW1wbGF0ZVxuXHRcdEBfdGVtcGxhdGVPcGFjaXR5ID0gb3B0aW9ucy50ZW1wbGF0ZU9wYWNpdHkgPyAuNVxuXHRcdEBfb25Mb2FkID0gb3B0aW9ucy5vbkxvYWQgPyAtPiBudWxsXG5cblx0XHRpZiBAX2hlYWRlci5pY29uQWN0aW9uIHRoZW4gQF9oZWFkZXIuaWNvbkFjdGlvbiA9IF8uYmluZChAX2hlYWRlci5pY29uQWN0aW9uLCBAKVxuXHRcdGlmIEBfb25Mb2FkIHRoZW4gQF9vbkxvYWQgPSBfLmJpbmQoQF9vbkxvYWQsIEApXG5cblxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdG5hbWU6ICdQYWdlJ1xuXHRcdFx0c2l6ZTogU2NyZWVuLnNpemVcblx0XHRcdHNjcm9sbEhvcml6b250YWw6IGZhbHNlXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IHRoZW1lLnBhZ2UucHJpbWFyeS5iYWNrZ3JvdW5kQ29sb3Jcblx0XHRcblx0XHRAY29udGVudEluc2V0ID1cblx0XHRcdHRvcDogMCwgYm90dG9tOiAxNjBcblxuXHRcdEBjb250ZW50LmJhY2tncm91bmRDb2xvciA9IG51bGxcblxuXHRcdGlmIEBfdGVtcGxhdGU/XG5cdFx0XHRAX3RlbXBsYXRlLnByb3BzID1cblx0XHRcdFx0cGFyZW50OiBAXG5cdFx0XHRcdG9wYWNpdHk6IEBfdGVtcGxhdGVPcGFjaXR5XG5cblx0XHRAc2VuZFRvQmFjaygpXG5cblxuXHR1cGRhdGU6IC0+IHJldHVybiBudWxsXG5cblxuXG5cblxuXG5cblxuIyAgODg4ODg4YmEgICAgICAgICAgICAgICAgICAgICAgZFAgICBkUCAgICAgICAgICAgICAgICAgICAgICBcbiMgIDg4ICAgIGA4YiAgICAgICAgICAgICAgICAgICAgIDg4ICAgODggICAgICAgICAgICAgICAgICAgICAgXG4jIGE4OGFhYWE4UCcgLmQ4ODg4Yi4gZFAgIGRQICBkUCA4OCBkODg4OFAgLmQ4ODg4Yi4gODhkOGIuZDhiLlxuIyAgODggICBgOGIuIDg4JyAgYDg4IDg4ICA4OCAgODggODggICA4OCAgIDg4b29vb2Q4IDg4J2A4OCdgODhcbiMgIDg4ICAgICA4OCA4OC4gIC44OCA4OC44OGIuODgnIDg4ICAgODggICA4OC4gIC4uLiA4OCAgODggIDg4XG4jICBkUCAgICAgZFAgYDg4ODg4UCcgODg4OFAgWThQICBkUCAgIGRQICAgYDg4ODg4UCcgZFAgIGRQICBkUFxuXG5cblxuZXhwb3J0cy5Sb3dJdGVtID0gY2xhc3MgUm93SXRlbSBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXG5cdFx0QF9pY29uID0gb3B0aW9ucy5pY29uXG5cdFx0QF9pY29uQmFja2dyb3VuZENvbG9yID0gb3B0aW9ucy5pY29uQmFja2dyb3VuZENvbG9yID8gJyM3NzcnXG5cdFx0QF90ZXh0ID0gb3B0aW9ucy50ZXh0ID8gJ1JvdyBpdGVtJ1xuXHRcdEBfcm93ID0gb3B0aW9ucy5yb3cgPyAwXG5cdFx0QF95ID0gMzIgKyAoQF9yb3cgKiA0OCkgXG5cblx0XHRzdXBlciBfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHR3aWR0aDogU2NyZWVuLndpZHRoXG5cdFx0XHR5OiBAX3lcblx0XHRcdGhlaWdodDogNDhcblx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXG5cdFx0QGljb24gPSBuZXcgTGF5ZXJcblx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBAXG5cdFx0XHR4OiAxNiwgeTogQWxpZ24uY2VudGVyXG5cdFx0XHRoZWlnaHQ6IDMyLCB3aWR0aDogMzIsIGJvcmRlclJhZGl1czogMTZcblx0XHRcdGJhY2tncm91bmRDb2xvcjogQF9pY29uQmFja2dyb3VuZENvbG9yXG5cdFx0XHRpbWFnZTogQF9pY29uXG5cblx0XHRAbGFiZWxMYXllciA9IG5ldyB0eXBlLlJlZ3VsYXJcblx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBAXG5cdFx0XHR4OiBAaWNvbi5tYXhYICsgMTYsIHk6IEFsaWduLmNlbnRlclxuXHRcdFx0Y29sb3I6IHRoZW1lLnRleHQudGV4dFxuXHRcdFx0dGV4dDogQF90ZXh0XG5cblxuXG5cblxuXG5cblxuIyBcdDg4ODhiYS44OGJhICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgODg4ODg4YmEgICAgICAgICAgICAgZFAgICAgIGRQXG4jIFx0ODggIGA4YiAgYDhiICAgICAgICAgICAgICAgICAgICAgICAgICAgICA4OCAgICBgOGIgICAgICAgICAgICA4OCAgICAgODhcbiMgXHQ4OCAgIDg4ICAgODggLmQ4ODg4Yi4gODhkODg4Yi4gZFAgICAgZFAgYTg4YWFhYThQJyBkUCAgICBkUCBkODg4OFAgZDg4ODhQIC5kODg4OGIuIDg4ZDg4OGIuXG4jIFx0ODggICA4OCAgIDg4IDg4b29vb2Q4IDg4JyAgYDg4IDg4ICAgIDg4ICA4OCAgIGA4Yi4gODggICAgODggICA4OCAgICAgODggICA4OCcgIGA4OCA4OCcgIGA4OFxuIyBcdDg4ICAgODggICA4OCA4OC4gIC4uLiA4OCAgICA4OCA4OC4gIC44OCAgODggICAgLjg4IDg4LiAgLjg4ICAgODggICAgIDg4ICAgODguICAuODggODggICAgODhcbiMgXHRkUCAgIGRQICAgZFAgYDg4ODg4UCcgZFAgICAgZFAgYDg4ODg4UCcgIDg4ODg4ODg4UCBgODg4ODhQJyAgIGRQICAgICBkUCAgIGA4ODg4OFAnIGRQICAgIGRQXG5cblxuXG5jbGFzcyBNZW51QnV0dG9uIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cdFx0XG5cdFx0QF9pY29uID0gb3B0aW9ucy5pY29uID8gJ2hvbWUnXG5cdFx0QF90ZXh0ID0gb3B0aW9ucy50ZXh0ID8gJ0RlZmF1bHQnXG5cdFx0QF9hY3Rpb24gPSBvcHRpb25zLmFjdGlvbiA/IC0+IG51bGxcblxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdGhlaWdodDogNDgsIHdpZHRoOiAzMDRcblx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXG5cdFx0QGljb25MYXllciA9IG5ldyBJY29uXG5cdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQFxuXHRcdFx0eTogQWxpZ24uY2VudGVyXG5cdFx0XHRpY29uOiBAX2ljb24sIGNvbG9yOiB0aGVtZS5tZW51T3ZlcmxheS50ZXh0XG5cblx0XHRAbGFiZWxMYXllciA9IG5ldyB0eXBlLlJlZ3VsYXJcblx0XHRcdG5hbWU6ICdsYWJlbCcsIHBhcmVudDogQFxuXHRcdFx0eDogQGljb25MYXllci5tYXhYICsgMTZcblx0XHRcdHk6IEFsaWduLmNlbnRlcigpXG5cdFx0XHRjb2xvcjogdGhlbWUubWVudU92ZXJsYXkudGV4dFxuXHRcdFx0dGV4dDogQF90ZXh0XG5cblx0XHRAb25UYXAgQF9hY3Rpb25cblx0XHRAb25UYXAgLT4gXG5cdFx0XHRVdGlscy5kZWxheSAuMjUsID0+IEBwYXJlbnQuaGlkZSgpXG5cblxuXG5cblxuXG5cblxuIyBcdDg4ODhiYS44OGJhICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLjg4ODg4LiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZFAgICAgICAgICAgICAgICAgICBcbiMgXHQ4OCAgYDhiICBgOGIgICAgICAgICAgICAgICAgICAgICAgICAgICAgZDgnICAgYDhiICAgICAgICAgICAgICAgICAgICAgICAgICAgIDg4ICAgICAgICAgICAgICAgICAgXG4jIFx0ODggICA4OCAgIDg4IC5kODg4OGIuIDg4ZDg4OGIuIGRQICAgIGRQIDg4ICAgICA4OCBkUCAgIC5kUCAuZDg4ODhiLiA4OGQ4ODhiLiA4OCAuZDg4ODhiLiBkUCAgICBkUFxuIyBcdDg4ICAgODggICA4OCA4OG9vb29kOCA4OCcgIGA4OCA4OCAgICA4OCA4OCAgICAgODggODggICBkOCcgODhvb29vZDggODgnICBgODggODggODgnICBgODggODggICAgODhcbiMgXHQ4OCAgIDg4ICAgODggODguICAuLi4gODggICAgODggODguICAuODggWTguICAgLjhQIDg4IC44OCcgIDg4LiAgLi4uIDg4ICAgICAgIDg4IDg4LiAgLjg4IDg4LiAgLjg4XG4jIFx0ZFAgICBkUCAgIGRQIGA4ODg4OFAnIGRQICAgIGRQIGA4ODg4OFAnICBgODg4OFAnICA4ODg4UCcgICBgODg4ODhQJyBkUCAgICAgICBkUCBgODg4ODhQOCBgODg4OFA4OFxuIyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLjg4XG4jICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGQ4ODg4UCBcblxuXG5cbmV4cG9ydHMuTWVudU92ZXJsYXkgPSBjbGFzcyBNZW51T3ZlcmxheSBleHRlbmRzIExheWVyXG5cdFxuXHRcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cblx0XHRAX2xpbmtzID0gb3B0aW9ucy5saW5rcyA/IFt7dGl0bGU6ICdIb21lJywgaWNvbjogJ2hvbWUnLCBhY3Rpb246IC0+IG51bGx9XVxuXHRcdEBfdGl0bGUgPSBvcHRpb25zLnRpdGxlID8gJ01lbnUnXG5cdFx0QF9pbWFnZSA9IG9wdGlvbnMuaW1hZ2UgPyBudWxsXG5cblxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdGhlaWdodDogU2NyZWVuLmhlaWdodFxuXHRcdFx0d2lkdGg6IDMwNFxuXHRcdFx0dmlzaWJsZTogZmFsc2Vcblx0XHRcdGJhY2tncm91bmRDb2xvcjogdGhlbWUubWVudU92ZXJsYXkuYmFja2dyb3VuZENvbG9yXG5cdFx0XHRhbmltYXRpb25PcHRpb25zOiB7Y3VydmU6IFwic3ByaW5nKDMwMCwgMzUsIDApXCJ9XG5cblxuXHRcdEBzY3JpbSA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogJy4nLCBcblx0XHRcdHNpemU6IFNjcmVlbi5zaXplXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6ICdyZ2JhKDAsMCwwLC42KSdcblx0XHRcdG9wYWNpdHk6IDBcblx0XHRcdHZpc2libGU6IGZhbHNlXG5cdFx0XHRhbmltYXRpb25PcHRpb25zOlxuXHRcdFx0XHR0aW1lOiAuMjVcblxuXHRcdEBzY3JpbS5vblRhcCA9PiBAaGlkZSgpXG5cdFx0QG9uU3dpcGVMZWZ0RW5kID0+IEBoaWRlKClcblxuXHRcdEBoZWFkZXIgPSBuZXcgTGF5ZXJcblx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBAXG5cdFx0XHR3aWR0aDogQHdpZHRoLCBoZWlnaHQ6IDE3M1xuXHRcdFx0aW1hZ2U6IHRoZW1lLnVzZXIuaW1hZ2Vcblx0XHRcdGJhY2tncm91bmRDb2xvcjogdGhlbWUubWVudU92ZXJsYXkuaGVhZGVyLmJhY2tncm91bmRDb2xvclxuXG5cdFx0QHRpdGxlSWNvbiA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEBoZWFkZXJcblx0XHRcdHg6IDE2LCB5OiA0MFxuXHRcdFx0aGVpZ2h0OiA2NCwgd2lkdGg6IDY0XG5cdFx0XHRib3JkZXJSYWRpdXM6IDMyXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IHRoZW1lLm1lbnVPdmVybGF5LmhlYWRlci5pY29uXG5cblx0XHRAc3ViaGVhZGVyRXhwYW5kID0gbmV3IEljb25cblx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBAaGVhZGVyXG5cdFx0XHR4OiBBbGlnbi5yaWdodCgtMTYpXG5cdFx0XHR5OiBBbGlnbi5ib3R0b20oLTE2KVxuXHRcdFx0aWNvbjogJ21lbnUtZG93bidcblx0XHRcdGNvbG9yOiB0aGVtZS5tZW51T3ZlcmxheS5zdWJoZWFkZXIudGV4dFxuXG5cdFx0QHN1YmhlYWRlciA9IG5ldyB0eXBlLkJvZHkxXG5cdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQGhlYWRlclxuXHRcdFx0d2lkdGg6IEB3aWR0aFxuXHRcdFx0eDogMTYsIHk6IEFsaWduLmJvdHRvbSgtMTgpXG5cdFx0XHR0ZXh0OiBAX3RpdGxlXG5cdFx0XHRjb2xvcjogdGhlbWUubWVudU92ZXJsYXkuc3ViaGVhZGVyLnRleHRcblxuXHRcdGxpbmtzID0gW11cblxuXHRcdGZvciBsaW5rLCBpIGluIEBfbGlua3Ncblx0XHRcdGxpbmtzW2ldID0gbmV3IE1lbnVCdXR0b25cblx0XHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEBcblx0XHRcdFx0eDogMTYsIHk6IDE4OSArICg0OCAqIGkpXG5cdFx0XHRcdHRleHQ6IGxpbmsudGl0bGVcblx0XHRcdFx0aWNvbjogbGluay5pY29uXG5cdFx0XHRcdGFjdGlvbjogbGluay5hY3Rpb25cblxuXHRzaG93OiAtPlxuXHRcdEBicmluZ1RvRnJvbnQoKVxuXHRcdEB2aXNpYmxlID0gdHJ1ZVxuXHRcdEB4ID0gLVNjcmVlbi53aWR0aFxuXHRcdEBhbmltYXRlXG5cdFx0XHR4OiAwXG5cblx0XHRAc2NyaW0ucGxhY2VCZWhpbmQoQClcblx0XHRAc2NyaW0udmlzaWJsZSA9IHRydWVcblx0XHRAc2NyaW0uYW5pbWF0ZVxuXHRcdFx0b3BhY2l0eTogMVxuXG5cdGhpZGU6IC0+XG5cdFx0QGFuaW1hdGVcblx0XHRcdHg6IC1TY3JlZW4ud2lkdGhcblxuXHRcdEBzY3JpbS5hbmltYXRlXG5cdFx0XHRvcGFjaXR5OiAwXG5cblx0XHRVdGlscy5kZWxheSAuMywgPT5cblx0XHRcdEB2aXNpYmxlID0gZmFsc2Vcblx0XHRcdEBzY3JpbS52aXNpYmxlID0gZmFsc2Vcblx0XHRcdEBzZW5kVG9CYWNrKClcblx0XHRcdEBzY3JpbS5zZW5kVG9CYWNrKClcblxuXG5cblxuXG5cblxuXG4jIFx0ODg4ODg4YmEgIG9vICAgICAgICAgIGRQXG4jIFx0ODggICAgYDhiICAgICAgICAgICAgIDg4XG4jIFx0ODggICAgIDg4IGRQIC5kODg4OGIuIDg4IC5kODg4OGIuIC5kODg4OGIuXG4jIFx0ODggICAgIDg4IDg4IDg4JyAgYDg4IDg4IDg4JyAgYDg4IDg4JyAgYDg4XG4jIFx0ODggICAgLjhQIDg4IDg4LiAgLjg4IDg4IDg4LiAgLjg4IDg4LiAgLjg4XG4jIFx0ODg4ODg4OFAgIGRQIGA4ODg4OFA4IGRQIGA4ODg4OFAnIGA4ODg4UDg4XG4jIFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLjg4XG4jIFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkODg4OFBcblxuXG5cbmV4cG9ydHMuRGlhbG9nID0gY2xhc3MgRGlhbG9nIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cblx0XHRzdXBlciBfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRuYW1lOiAnLicsIHNpemU6IFNjcmVlbi5zaXplLCBjb2xvcjogdGhlbWUudGludFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiAncmdiYSgwLCAwLCAwLCAuNSknXG5cdFx0XHRvcGFjaXR5OiAwXG5cdFx0XHRcblx0XHRAX3RpdGxlID0gb3B0aW9ucy50aXRsZSA/ICdEZWZhdWx0IFRpdGxlJ1xuXHRcdEBfYm9keSA9IG9wdGlvbnMuYm9keSA/ICdCb2R5IHRleHQgZ29lcyBoZXJlLidcblx0XHRAX2FjY2VwdFRleHQgPSBvcHRpb25zLmFjY2VwdFRleHQgPyAnY29uZmlybSdcblx0XHRAX2FjY2VwdEFjdGlvbiA9IG9wdGlvbnMuYWNjZXB0QWN0aW9uID8gLT4gbnVsbFxuXHRcdEBfZGVjbGluZVRleHQgPSBvcHRpb25zLmRlY2xpbmVUZXh0ID8gJydcblx0XHRAX2RlY2xpbmVBY3Rpb24gPSBvcHRpb25zLmRlY2xpbmVBY3Rpb24gPyAtPiBudWxsXG5cdFx0XG5cdFx0QG9uIEV2ZW50cy5UYXAsIChldmVudCkgLT4gZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcblx0XHRcblx0XHRAY29udGFpbmVyID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiAnY29udGFpbmVyJywgcGFyZW50OiBAXG5cdFx0XHR4OiBBbGlnbi5jZW50ZXJcblx0XHRcdGhlaWdodDogMTI4LCB3aWR0aDogU2NyZWVuLndpZHRoIC0gODBcblx0XHRcdGJhY2tncm91bmRDb2xvcjogdGhlbWUuZGlhbG9nLmJhY2tncm91bmRDb2xvclxuXHRcdFx0c2hhZG93WDogMCwgc2hhZG93WTogNywgc2hhZG93Qmx1cjogMzBcblx0XHRcdG9wYWNpdHk6IDBcblx0XHRcdHNoYWRvd0NvbG9yOiAncmdiYSgwLDAsMCwuMyknXG5cdFx0XG5cdFx0QHRpdGxlID0gbmV3IHR5cGUuVGl0bGVcblx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBAY29udGFpbmVyXG5cdFx0XHR4OiAyNCwgeTogMjBcblx0XHRcdGZvbnRTaXplOiAxNiwgZm9udFdlaWdodDogNTAwLCBjb2xvcjogdGhlbWUudGV4dC50aXRsZVxuXHRcdFx0dGV4dDogQF90aXRsZVxuXHRcdFxuXHRcdEBib2R5ID0gbmV3IHR5cGUuU3ViaGVhZFNlY29uZGFyeVxuXHRcdFx0bmFtZTogJ2JvZHknLCBwYXJlbnQ6IEBjb250YWluZXJcblx0XHRcdHg6IDI0LCB5OiA1MlxuXHRcdFx0d2lkdGg6IEBjb250YWluZXIud2lkdGggLSA0MlxuXHRcdFx0dGV4dDogQF9ib2R5XG5cdFx0XG5cdFx0YnV0dG9uc1kgPSBpZiBAX2JvZHkgaXMgJycgdGhlbiAxMjggZWxzZSBAYm9keS5tYXhZICsgMTZcblx0XHRcblx0XHRAYWNjZXB0ID0gbmV3IEJ1dHRvblxuXHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEBjb250YWluZXJcblx0XHRcdHg6IEFsaWduLnJpZ2h0KC0xNiksIHk6IGJ1dHRvbnNZXG5cdFx0XHR0ZXh0OiBAX2FjY2VwdFRleHQudG9VcHBlckNhc2UoKVxuXHRcdFx0YWN0aW9uOiBAX2FjY2VwdEFjdGlvblxuXHRcdFxuXHRcdGlmIEBfZGVjbGluZVRleHQgaXNudCAnJ1xuXHRcdFx0QGRlY2xpbmUgPSBuZXcgQnV0dG9uXG5cdFx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBAY29udGFpbmVyXG5cdFx0XHRcdHg6IDAsIHk6IGJ1dHRvbnNZXG5cdFx0XHRcdHRleHQ6IEBfZGVjbGluZVRleHQudG9VcHBlckNhc2UoKVxuXHRcdFx0XHRhY3Rpb246IEBfZGVjbGluZUFjdGlvblxuXG5cdFx0IyBzZXQgcG9zaXRpb25zXG5cdFx0QGNvbnRhaW5lci5oZWlnaHQgPSBAYWNjZXB0Lm1heFkgKyAxMlxuXHRcdEBkZWNsaW5lPy5tYXhYID0gQGFjY2VwdC54IC0gMTZcblx0XHRAY29udGFpbmVyLnkgPSBBbGlnbi5jZW50ZXIoMTYpXG5cdFx0XG5cdFx0IyBhZGQgY2xvc2UgYWN0aW9ucyB0byBjb25maXJtIGFuZCBjYW5jZWxcblx0XHRmb3IgYnV0dG9uIGluIFtAYWNjZXB0LCBAZGVjbGluZV1cblx0XHRcdGJ1dHRvbj8ub25UYXAgQGNsb3NlXG5cdFx0XG5cdFx0IyBPTiBMT0FEXG5cdFx0QG9wZW4oKVxuXHRcblx0b3BlbjogPT5cblx0XHRAYW5pbWF0ZVxuXHRcdFx0b3BhY2l0eTogMVxuXHRcdFx0b3B0aW9uczogXG5cdFx0XHRcdHRpbWU6IC4yNVxuXHRcdFxuXHRcdEBjb250YWluZXIuYW5pbWF0ZVxuXHRcdFx0b3BhY2l0eTogMVxuXHRcdFx0b3B0aW9uczpcblx0XHRcdFx0dGltZTogLjI1XG5cdFx0XHRcdGRlbGF5OiAuMDVcblxuXHRjbG9zZTogPT5cblx0XHRAY29udGFpbmVyLmFuaW1hdGVcblx0XHRcdG9wYWNpdHk6IDBcblx0XHRcdG9wdGlvbnM6XG5cdFx0XHRcdHRpbWU6IC4yNVxuXHRcdFxuXHRcdEBhbmltYXRlXG5cdFx0XHRvcGFjaXR5OiAwXG5cdFx0XHRvcHRpb25zOlxuXHRcdFx0XHR0aW1lOiAuMjVcblx0XHRcblx0XHRVdGlscy5kZWxheSAuNSwgPT4gQGRlc3Ryb3koKVxuXG5cblxuXG5cblxuXG5cbiMgXHQgODg4ODg4YmEgICAgICAgICAgICAgZFAgICAgIGRQXG4jIFx0IDg4ICAgIGA4YiAgICAgICAgICAgIDg4ICAgICA4OFxuIyBcdGE4OGFhYWE4UCcgZFAgICAgZFAgZDg4ODhQIGQ4ODg4UCAuZDg4ODhiLiA4OGQ4ODhiLlxuIyBcdCA4OCAgIGA4Yi4gODggICAgODggICA4OCAgICAgODggICA4OCcgIGA4OCA4OCcgIGA4OFxuIyBcdCA4OCAgICAuODggODguICAuODggICA4OCAgICAgODggICA4OC4gIC44OCA4OCAgICA4OFxuIyBcdCA4ODg4ODg4OFAgYDg4ODg4UCcgICBkUCAgICAgZFAgICBgODg4ODhQJyBkUCAgICBkUFxuXG5cblxuZXhwb3J0cy5CdXR0b24gPSBCdXR0b24gPSBjbGFzcyBCdXR0b24gZXh0ZW5kcyBMYXllciBcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cblx0XHRAX3JhaXNlZCA9IG9wdGlvbnMucmFpc2VkID8gZmFsc2Vcblx0XHRAX3R5cGUgPSBpZiBAX3JhaXNlZCB0aGVuICdyYWlzZWQnIGVsc2UgJ2ZsYXQnXG5cdFx0QF9hY3Rpb24gPSBvcHRpb25zLmFjdGlvbiA/IC0+IG51bGxcblxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdG5hbWU6ICcuJ1xuXHRcdFx0d2lkdGg6IDAsIGhlaWdodDogMzZcblx0XHRcdGJvcmRlclJhZGl1czogMlxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiB0aGVtZS5idXR0b25bQF90eXBlXS5iYWNrZ3JvdW5kQ29sb3Jcblx0XHRcdHNoYWRvd1k6IHRoZW1lLmJ1dHRvbltAX3R5cGVdLnNoYWRvd1lcblx0XHRcdHNoYWRvd0JsdXI6IHRoZW1lLmJ1dHRvbltAX3R5cGVdLnNoYWRvd0JsdXJcblx0XHRcdHNoYWRvd0NvbG9yOiB0aGVtZS5idXR0b25bQF90eXBlXS5zaGFkb3dDb2xvclxuXHRcdFx0YW5pbWF0aW9uT3B0aW9uczoge3RpbWU6IC4xNX1cblxuXHRcdEBsYWJlbExheWVyID0gbmV3IHR5cGUuQnV0dG9uXG5cdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQFxuXHRcdFx0Y29sb3I6IHRoZW1lLmJ1dHRvbltAX3R5cGVdLmNvbG9yXG5cdFx0XHR0ZXh0OiBvcHRpb25zLnRleHQgPyAnYnV0dG9uJ1xuXHRcdFx0dGV4dFRyYW5zZm9ybTogJ3VwcGVyY2FzZSdcblx0XHRcdHRleHRBbGlnbjogJ2NlbnRlcidcblx0XHRcdGFuaW1hdGlvbk9wdGlvbnM6IHt0aW1lOiAuMTV9XG5cdFx0XHRwYWRkaW5nOiBcblx0XHRcdFx0bGVmdDogMTYuNSwgcmlnaHQ6IDE2LjVcblx0XHRcdFx0dG9wOiA5LCBib3R0b206IDExXG5cblx0XHRAc2l6ZSA9IEBsYWJlbExheWVyLnNpemVcblx0XHRAeCA9IG9wdGlvbnMueFxuXG5cdFx0QG9uVG91Y2hTdGFydCAoZXZlbnQpIC0+IFxuXHRcdFx0QHNob3dUb3VjaGVkKClcblx0XHRcdFV0aWxzLmRlbGF5IDEsID0+IEByZXNldCgpXG5cdFx0XG5cdFx0QG9uVG91Y2hFbmQgKGV2ZW50KSAtPiBcblx0XHRcdEBfYWN0aW9uKClcblx0XHRcdEByZXNldCgpXG5cblxuXHRzaG93VG91Y2hlZDogLT4gXG5cdFx0QGxhYmVsTGF5ZXIuYW5pbWF0ZSB7YnJpZ2h0bmVzczogMTEwLCBzYXR1cmF0ZTogMTEwfVxuXHRcdFxuXHRcdHN3aXRjaCBAX3R5cGVcblx0XHRcdHdoZW4gJ2ZsYXQnIHRoZW4gQGFuaW1hdGUge2JhY2tncm91bmRDb2xvcjogJ3JnYmEoMCwwLDAsLjA1KSd9XG5cdFx0XHR3aGVuICdyYWlzZWQnXG5cdFx0XHRcdHJpcHBsZShALCBldmVudC5wb2ludCwgQGxhYmVsTGF5ZXIpXG5cdFx0XHRcdEBhbmltYXRlIHtzaGFkb3dZOiAzLCBzaGFkb3dTcHJlYWQ6IDF9XG5cblx0cmVzZXQ6IC0+XG5cdFx0QGxhYmVsTGF5ZXIuYW5pbWF0ZSB7YnJpZ2h0bmVzczogMTAwLCBzYXR1cmF0ZTogMTAwfVxuXHRcdEBiYWNrZ3JvdW5kQ29sb3IgPSB0aGVtZS5idXR0b25bQF90eXBlXS5iYWNrZ3JvdW5kQ29sb3Jcblx0XHRAYW5pbWF0ZSBcblx0XHRcdHNoYWRvd1k6IHRoZW1lLmJ1dHRvbltAX3R5cGVdLnNoYWRvd1lcblx0XHRcdHNoYWRvd1NwcmVhZDogMFxuXG5cblxuXG5cblxuXG5cbiMgXHQgODg4ODg4ODhiICAgICAgICAgIGRQXG4jIFx0IDg4ICAgICAgICAgICAgICAgICA4OFxuIyBcdGE4OGFhYWEgICAgLmQ4ODg4Yi4gODhkODg4Yi5cbiMgXHQgODggICAgICAgIDg4JyAgYDg4IDg4JyAgYDg4XG4jIFx0IDg4ICAgICAgICA4OC4gIC44OCA4OC4gIC44OFxuIyBcdCBkUCAgICAgICAgYDg4ODg4UDggODhZODg4OCdcblxuXG5cbmV4cG9ydHMuRmFiID0gRmFiID0gY2xhc3MgRmFiIGV4dGVuZHMgTGF5ZXIgXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXG5cdFx0QF9yYWlzZWQgPSBvcHRpb25zLnJhaXNlZCA/IGZhbHNlXG5cdFx0QF9hY3Rpb24gPSBvcHRpb25zLmFjdGlvbiA/IC0+IG51bGxcblx0XHRAX2ljb24gPSBvcHRpb25zLmljb24gPyAncGx1cydcblxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdG5hbWU6ICcuJ1xuXHRcdFx0eDogQWxpZ24ucmlnaHQoLTE2KSwgeTogQWxpZ24uYm90dG9tKC0xNylcblx0XHRcdHdpZHRoOiA2NCwgaGVpZ2h0OiA2NCwgYm9yZGVyUmFkaXVzOiAzMlxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiB0aGVtZS5mYWIuYmFja2dyb3VuZENvbG9yXG5cdFx0XHRzaGFkb3dZOiAyLCBzaGFkb3dCbHVyOiAzXG5cdFx0XHRzaGFkb3dDb2xvcjogJ3JnYmEoMCwwLDAsLjI1KSdcblx0XHRcdGFuaW1hdGlvbk9wdGlvbnM6IHt0aW1lOiAuMTV9XG5cblx0XHRpZiBhcHAuYm90dG9tTmF2PyB0aGVuIEB5IC09IGFwcC5ib3R0b21OYXYuaGVpZ2h0XG5cblx0XHRAaWNvbkxheWVyID0gbmV3IEljb25cblx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBAXG5cdFx0XHR4OiBBbGlnbi5jZW50ZXIsIHk6IEFsaWduLmNlbnRlclxuXHRcdFx0aWNvbjogQF9pY29uLCBjb2xvcjogdGhlbWUuZmFiLmNvbG9yXG5cblx0XHRAb25Ub3VjaFN0YXJ0IChldmVudCkgLT4gXG5cdFx0XHRAc2hvd1RvdWNoZWQoKVxuXHRcdFx0VXRpbHMuZGVsYXkgMSwgPT4gQHJlc2V0KClcblx0XHRcblx0XHRAb25Ub3VjaEVuZCAoZXZlbnQpIC0+IFxuXHRcdFx0QF9hY3Rpb24oKVxuXHRcdFx0QHJlc2V0KClcblxuXG5cdHNob3dUb3VjaGVkOiAtPiBcblx0XHRyaXBwbGUoQCwgZXZlbnQucG9pbnQsIEBpY29uTGF5ZXIpXG5cdFx0QGFuaW1hdGUge3NoYWRvd1k6IDMsIHNoYWRvd1NwcmVhZDogMX1cblxuXHRyZXNldDogLT5cblx0XHRAYW5pbWF0ZSBcblx0XHRcdHNoYWRvd1k6IDJcblx0XHRcdHNoYWRvd1NwcmVhZDogMFxuXG5cblxuXG5cblxuXG5cblxuIyBcdCAuODg4ODguICAgICAgICAgICBvbyAgICAgICBkUCBkUCAgICAgICAgb28gICAgICAgICAgICBkUFxuIyBcdGQ4JyAgIGA4OCAgICAgICAgICAgICAgICAgICA4OCA4OCAgICAgICAgICAgICAgICAgICAgICA4OFxuIyBcdDg4ICAgICAgICA4OGQ4ODhiLiBkUCAuZDg4OGI4OCA4OCAgICAgICAgZFAgLmQ4ODg4Yi4gZDg4ODhQXG4jIFx0ODggICBZUDg4IDg4JyAgYDg4IDg4IDg4JyAgYDg4IDg4ICAgICAgICA4OCBZOG9vb29vLiAgIDg4XG4jIFx0WTguICAgLjg4IDg4ICAgICAgIDg4IDg4LiAgLjg4IDg4ICAgICAgICA4OCAgICAgICA4OCAgIDg4XG4jIFx0IGA4ODg4OCcgIGRQICAgICAgIGRQIGA4ODg4OFA4IDg4ODg4ODg4UCBkUCBgODg4ODhQJyAgIGRQXG5cbmV4cG9ydHMuR3JpZExpc3QgPSBHcmlkTGlzdCA9IGNsYXNzIEdyaWRMaXN0IGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cdFx0XG5cdFx0QF9jb2x1bW5zID0gb3B0aW9ucy5jb2x1bW5zID8gMlxuXHRcdFxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdG5hbWU6ICcuJ1xuXHRcdFx0d2lkdGg6IFNjcmVlbi53aWR0aFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XG5cdFx0QHRpbGVzID0gW11cblx0XHRAdGlsZVdpZHRoID0gKEB3aWR0aCAtIDI0KSAvIEBfY29sdW1uc1xuXHRcdEB0aWxlSGVpZ2h0ID0gb3B0aW9ucy50aWxlSGVpZ2h0ID8gU2NyZWVuLndpZHRoIC8gQF9jb2x1bW5zXG5cdFx0XG5cdGFkZFRpbGU6ICh0aWxlKSAtPlxuXHRcdHRpbGUuaSA9IEB0aWxlcy5sZW5ndGhcblx0XHRAdGlsZXMucHVzaCh0aWxlKVxuXHRcdFxuXHRcdHRpbGUueCA9IDggKyAoQHRpbGVXaWR0aCArIDgpICogKHRpbGUuaSAlIEBfY29sdW1ucylcblx0XHR0aWxlLnkgPSA4ICsgKEB0aWxlSGVpZ2h0ICsgOCkgKiBNYXRoLmZsb29yKHRpbGUuaSAvIEBfY29sdW1ucylcblxuXHRcdEBoZWlnaHQgPSBfLmxhc3QoQHRpbGVzKS5tYXhZXG5cblx0XHRpZiBAcGFyZW50Py5wYXJlbnQ/LmNvbnRlbnQ/IHRoZW4gQHBhcmVudC5wYXJlbnQudXBkYXRlQ29udGVudCgpXG5cdFxuXHRyZW1vdmVUaWxlOiAodGlsZSkgLT5cblx0XHRfLnB1bGwoQHRpbGVzLCB0aWxlKVxuXHRcdHRpbGUuZGVzdHJveSgpXG5cdFx0QHJlcG9zaXRpb25UaWxlcygpXG5cblx0cmVwb3NpdGlvblRpbGVzOiAtPlxuXHRcdGZvciB0aWxlLCBpIGluIEB0aWxlc1xuXHRcdFx0dGlsZS5pID0gaVxuXHRcdFx0dGlsZS5hbmltYXRlXG5cdFx0XHRcdHg6IDggKyAoQHRpbGVXaWR0aCArIDgpICogKHRpbGUuaSAlIEBfY29sdW1ucylcblx0XHRcdFx0eTogOCArIChAdGlsZUhlaWdodCArIDgpICogTWF0aC5mbG9vcih0aWxlLmkgLyBAX2NvbHVtbnMpXG5cdFx0QGhlaWdodCA9IF8ubGFzdChAdGlsZXMpLm1heFlcblxuXHRcdGlmIEBwYXJlbnQ/LnBhcmVudD8uY29udGVudD8gdGhlbiBAcGFyZW50LnBhcmVudC51cGRhdGVDb250ZW50KClcblxuXG5cblxuXG5cblxuXG5cblxuIyBcdGQ4ODg4ODhQIG9vIGRQXG4jIFx0ICAgODggICAgICAgODhcbiMgXHQgICA4OCAgICBkUCA4OCAuZDg4ODhiLlxuIyBcdCAgIDg4ICAgIDg4IDg4IDg4b29vb2Q4XG4jIFx0ICAgODggICAgODggODggODguICAuLi5cbiMgXHQgICBkUCAgICBkUCBkUCBgODg4ODhQJ1xuXG5cbmV4cG9ydHMuVGlsZSA9IFRpbGUgPSBjbGFzcyBUaWxlIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cdFx0XG5cdFx0QF9oZWFkZXIgPSBvcHRpb25zLmhlYWRlciA/IGZhbHNlXG5cdFx0QF9mb290ZXIgPSBvcHRpb25zLmZvb3RlciA/IGZhbHNlXG5cdFx0QF9hY3Rpb24gPSBvcHRpb25zLmFjdGlvbiA/IC0+IG51bGxcblx0XHRAX2hlYWRlckFjdGlvbiA9IG9wdGlvbnMuaGVhZGVyQWN0aW9uID8gLT4gbnVsbFxuXHRcdEBfZm9vdGVyQWN0aW9uID0gb3B0aW9ucy5mb290ZXJBY3Rpb24gPyAtPiBudWxsXG5cdFx0XG5cdFx0aWYgQF9oZWFkZXIgYW5kIEBfZm9vdGVyIHRoZW4gdGhyb3cgJ1RpbGUgY2Fubm90IGhhdmUgYm90aCBhIGhlYWRlciBhbmQgYSBmb290ZXIuJ1xuXHRcdFxuXHRcdEBfaWNvbiA9IG9wdGlvbnMuaWNvblxuXHRcdEBncmlkTGlzdCA9IG9wdGlvbnMuZ3JpZExpc3QgPyB0aHJvdyAnVGlsZSBuZWVkcyBhIGdyaWQgcHJvcGVydHkuJ1xuXHRcdFxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBAZ3JpZExpc3Rcblx0XHRcdHdpZHRoOiBAZ3JpZExpc3QudGlsZVdpZHRoXG5cdFx0XHRoZWlnaHQ6IEBncmlkTGlzdC50aWxlSGVpZ2h0XG5cdFx0XHRhbmltYXRpb25PcHRpb25zOiB7dGltZTogLjN9XG5cdFx0XG5cdFx0QG9uVG91Y2hTdGFydCAoZXZlbnQpIC0+IFxuXHRcdFx0aWYgQGdyaWRMaXN0LnBhcmVudD8ucGFyZW50Py5jb250ZW50IGFuZCBAZ3JpZExpc3QucGFyZW50Py5wYXJlbnQ/LmlzTW92aW5nIGlzIGZhbHNlXG5cdFx0XHRcdHJpcHBsZShALCBldmVudC5wb2ludCwgQGhlYWRlciwgb3B0aW9ucy5yaXBwbGVDb2xvciA/ICdyZ2JhKDAsMCwwLC4xKScpXG5cdFx0XG5cdFx0QG9uVGFwIEBfYWN0aW9uXG5cdFx0QG9uVGFwIChldmVudCkgLT4gZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcblxuXHRcdGlmIEBfaGVhZGVyIG9yIEBfZm9vdGVyXG5cdFx0XHRAaGVhZGVyID0gbmV3IExheWVyXG5cdFx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBAXG5cdFx0XHRcdHk6IGlmIEBfZm9vdGVyIHRoZW4gQWxpZ24uYm90dG9tKClcblx0XHRcdFx0d2lkdGg6IEB3aWR0aFxuXHRcdFx0XHRoZWlnaHQ6IGlmIG9wdGlvbnMuc3VwcG9ydCB0aGVuIDY4IGVsc2UgNDhcblx0XHRcdFx0YmFja2dyb3VuZENvbG9yOiBvcHRpb25zLmJhY2tncm91bmRDb2xvciA/ICdyZ2JhKDAsMCwwLC41KSdcblx0XHRcdFxuXHRcdFx0QGhlYWRlci5vblRvdWNoU3RhcnQgKGV2ZW50KSAtPiByaXBwbGUoQCwgZXZlbnQucG9pbnQsIEB0aXRsZSlcblx0XHRcdFxuXHRcdFx0aWYgQF9mb290ZXIgdGhlbiBAaGVhZGVyLm9uVGFwIEBfZm9vdGVyQWN0aW9uXG5cdFx0XHRlbHNlIEBoZWFkZXIub25UYXAgQF9oZWFkZXJBY3Rpb25cblxuXHRcdFx0QGhlYWRlci5vblRhcCAoZXZlbnQpIC0+IGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXG5cblx0XHRcdGlmIG9wdGlvbnMudGl0bGVcblx0XHRcdFx0QGhlYWRlci50aXRsZSA9IG5ldyB0eXBlLlJlZ3VsYXJcblx0XHRcdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQGhlYWRlclxuXHRcdFx0XHRcdHg6IDgsIHk6IGlmIG9wdGlvbnMuc3VwcG9ydCB0aGVuIDEyIGVsc2UgQWxpZ24uY2VudGVyKClcblx0XHRcdFx0XHRjb2xvcjogQGNvbG9yXG5cdFx0XHRcdFx0dGV4dDogb3B0aW9ucy50aXRsZSA/ICdUd28gTGluZSdcblx0XHRcdFxuXHRcdFx0XHRpZiBvcHRpb25zLnN1cHBvcnRcblx0XHRcdFx0XHRAaGVhZGVyLnN1cHBvcnQgPSBuZXcgVGV4dExheWVyXG5cdFx0XHRcdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQGhlYWRlclxuXHRcdFx0XHRcdFx0eDogOCwgeTogMzVcblx0XHRcdFx0XHRcdGZvbnRTaXplOiAxMlxuXHRcdFx0XHRcdFx0Zm9udEZhbWlseTogJ1JvYm90bydcblx0XHRcdFx0XHRcdGNvbG9yOiBAY29sb3Jcblx0XHRcdFx0XHRcdHRleHQ6IG9wdGlvbnMuc3VwcG9ydCA/ICdTdXBwb3J0IHRleHQnXG5cdFx0XHRcblx0XHRcdGlmIG9wdGlvbnMuaWNvblxuXHRcdFx0XHRAaGVhZGVyLmljb24gPSBuZXcgSWNvblxuXHRcdFx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBAaGVhZGVyXG5cdFx0XHRcdFx0eDogQWxpZ24ucmlnaHQoLTEyKSwgeTogaWYgb3B0aW9ucy5zdXBwb3J0IHRoZW4gMjAgZWxzZSBBbGlnbi5jZW50ZXIoKVxuXHRcdFx0XHRcdGljb246IG9wdGlvbnMuaWNvblxuXHRcdFx0XHRcdGNvbG9yOiBAY29sb3JcblxuXHRcdEBpID0gdW5kZWZpbmVkXG5cdFx0QGdyaWRMaXN0LmFkZFRpbGUoQClcblx0XHRcdFxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuIiwiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFJQUE7QURBQSxJQUFBLDRPQUFBO0VBQUE7Ozs7QUFBQyxTQUFVLE9BQUEsQ0FBUSxRQUFSOztBQUNWLFFBQVMsT0FBQSxDQUFRLE9BQVI7O0FBQ1YsSUFBQSxHQUFPLE9BQUEsQ0FBUSxNQUFSOztBQUNQLEtBQUEsR0FBUSxJQUFJLENBQUMsS0FBTCxDQUFXLEtBQUssQ0FBQyxlQUFOLENBQXNCLG9CQUF0QixDQUFYOztBQUVSLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQXBCLENBQUE7O0FBVUEsT0FBTyxDQUFDLEtBQVIsR0FBZ0I7O0FBQ2hCLE9BQU8sQ0FBQyxLQUFSLEdBQWdCLEtBQUEsR0FBUSxJQUFJLENBQUM7O0FBQzdCLE9BQU8sQ0FBQyxRQUFSLEdBQW1CLFFBQUEsR0FBVyxJQUFJLENBQUM7O0FBQ25DLE9BQU8sQ0FBQyxnQkFBUixHQUEyQixnQkFBQSxHQUFtQixJQUFJLENBQUM7O0FBQ25ELE9BQU8sQ0FBQyxPQUFSLEdBQWtCLE9BQUEsR0FBVSxJQUFJLENBQUM7O0FBQ2pDLE9BQU8sQ0FBQyxLQUFSLEdB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
