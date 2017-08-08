require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"md":[function(require,module,exports){
var App, Body1, Body2, BottomNav, Button, Caption, Dialog, DialogAction, Fab, Header, Headline, Icon, MenuButton, MenuOverlay, Page, Regular, RowItem, StatusBar, SubheadSecondary, Title, View, app, icons, ripple, theme, type,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

ripple = require('ripple').ripple;

theme = require('theme').theme;

type = require('type');

icons = JSON.parse(Utils.domLoadDataSync("modules/icons.json"));

exports.theme = theme;

exports.Title = Title = type.Title;

exports.Headline = Headline = type.Headline;

exports.SubheadSecondary = SubheadSecondary = type.SubheadSecondary;

exports.Regular = Regular = type.Regular;

exports.Body2 = Body2 = type.Body2;

exports.Body1 = Body1 = type.Body1;

exports.Caption = Caption = type.Caption;

exports.DialogAction = DialogAction = type.DialogAction;

App = (function(superClass) {
  extend(App, superClass);

  function App(options) {
    var ref, ref1;
    if (options == null) {
      options = {};
    }
    this._footer = (ref = options.footer) != null ? ref : true;
    this._theme = theme;
    this.views = (ref1 = options.views) != null ? ref1 : [];
    App.__super__.constructor.call(this, _.defaults(options, {
      name: 'App',
      size: Screen.size,
      backgroundColor: null
    }));
    if (this._footer) {
      this.footer = new Layer({
        name: '.',
        parent: this,
        width: Screen.width,
        height: 48,
        image: 'images/nav_bar.png',
        index: 999,
        y: Align.bottom()
      });
    }
    this.header = new Header({
      theme: theme,
      index: 999
    });
    this.keyboard = new Layer({
      name: 'Keyboard',
      y: this.maxY,
      image: theme.keyboard.image,
      width: 360,
      height: 269,
      index: 1000,
      animationOptions: {
        time: .25
      }
    });
  }

  App.prototype.showKeyboard = function() {
    this.keyboard.animate({
      y: Align.bottom()
    });
    return this.keyboard.bringToFront();
  };

  App.prototype.hideKeyboard = function() {
    return this.keyboard.animate({
      y: Screen.maxY
    });
  };

  App.prototype.setup = function(options) {
    var ref, ref1, ref2, ref3;
    if (options == null) {
      options = {};
    }
    if (options.bottomNav) {
      this.bottomNav = new BottomNav({
        name: 'BottomNav',
        parent: this,
        destinations: (ref = options.bottomNav.links) != null ? ref : "md.app.bottomNav needs an array of links. Example: [{title: 'Home', icon: 'home', action: -> view.linkTo(home)}]",
        y: Align.bottom(-((ref1 = this.footer) != null ? ref1.height : void 0)),
        index: 999
      });
    }
    if (options.menuOverlay) {
      return this.menuOverlay = new MenuOverlay({
        title: (function() {
          if ((ref2 = options.menuOverlay.title) != null) {
            return ref2;
          } else {
            throw 'md.app.menuOverlay needs a title.';
          }
        })(),
        links: (function() {
          if ((ref3 = options.menuOverlay.links) != null) {
            return ref3;
          } else {
            throw "md.app.menuOverlay needs an array of links. Example: [{title: 'Home', icon: 'home', action: -> view.linkTo(home)}]";
          }
        })()
      });
    }
  };

  return App;

})(Layer);

exports.View = View = (function(superClass) {
  extend(View, superClass);

  function View(options) {
    if (options == null) {
      options = {};
    }
    this.app = app;
    View.__super__.constructor.call(this, _.defaults(options, {
      name: 'View',
      parent: app,
      index: 900,
      animationOptions: {
        time: .2
      }
    }));
    this.onTransitionStart((function(_this) {
      return function(current, next, direction) {
        var ref, ref1, ref2, ref3, ref4, ref5, ref6, ref7;
        _this.app.header.title = (ref = (ref1 = next._header) != null ? ref1.title : void 0) != null ? ref : 'Default';
        _this.app.header.icon = (ref2 = (ref3 = next._header) != null ? ref3.icon : void 0) != null ? ref2 : 'menu';
        _this.app.header.iconAction = (ref4 = (ref5 = next._header) != null ? ref5.iconAction : void 0) != null ? ref4 : function() {
          return null;
        };
        _this.app.header.visible = (ref6 = (ref7 = next._header) != null ? ref7.visible : void 0) != null ? ref6 : true;
        return next._onLoad();
      };
    })(this));
    app.views.push(this);
  }

  View.prototype.newPage = function(options) {
    var page;
    if (options == null) {
      options = {};
    }
    page = new Page(_.defaults(options, {
      contentInset: {
        top: this.app.header.height
      }
    }));
    if (page.contentInset.top < this.app.header.height) {
      page.contentInset = {
        top: page.contentInset.top += this.app.header.height,
        bottom: page.contentInset.bottom,
        left: page.contentInset.left,
        right: page.contentInset.right
      };
    }
    return page;
  };

  View.prototype.addPage = function(page) {
    page.contentInset = {
      top: this.app.header.height
    };
    if (page.contentInset.top < this.app.header.height) {
      page.contentInset = {
        top: page.contentInset.top += this.app.header.height,
        bottom: page.contentInset.bottom,
        left: page.contentInset.left,
        right: page.contentInset.right
      };
    }
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
    this._activeDestination = void 0;
    this._initialDestination = (ref1 = options.initialDestination) != null ? ref1 : void 0;
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
    ref2 = this._destinations;
    for (i = j = 0, len = ref2.length; j < len; i = ++j) {
      destination = ref2[i];
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
        return ripple(this, event.point, this.parent.iconLayer, new Color(theme.primary).alpha(.5));
      });
      item.onTap(function() {
        return this.parent.activeDestination = this;
      });
      this._items.push(item);
    }
    this.activeDestination = (ref3 = this._initialDestination) != null ? ref3 : this._items[0];
  }

  BottomNav.define("activeDestination", {
    get: function() {
      return this._activeDestination;
    },
    set: function(destination) {
      var j, len, ref, results, sib;
      if (destination === this._activeDestination) {
        return;
      }
      this._activeDestination = destination;
      this._activeDestination.action();
      this._activeDestination.labelLayer.animate({
        color: theme.primary,
        opacity: 1
      });
      this._activeDestination.iconLayer.color = theme.primary;
      ref = this._activeDestination.siblings;
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        sib = ref[j];
        sib.labelLayer.animate({
          color: '#777'
        });
        results.push(sib.iconLayer.color = '#777');
      }
      return results;
    }
  });

  return BottomNav;

})(Layer);

exports.Page = Page = (function(superClass) {
  extend(Page, superClass);

  function Page(options) {
    var ref, ref1, ref2;
    if (options == null) {
      options = {};
    }
    this._header = (ref = options.header) != null ? ref : {
      title: 'Default',
      visible: true,
      icon: 'menu',
      iconAction: function() {
        return null;
      }
    };
    this._template = options.template;
    this._templateOpacity = (ref1 = options.templateOpacity) != null ? ref1 : .5;
    this._onLoad = (ref2 = options.onLoad) != null ? ref2 : function() {
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
      bottom: 500
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
      height: Screen.height,
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
    this.titleExpand = new Icon({
      name: '.',
      parent: this.header,
      x: Align.right(-16),
      y: Align.bottom(-13),
      icon: 'menu-down',
      color: theme.menuOverlay.text
    });
    this.title = new type.Body1({
      name: '.',
      parent: this.header,
      width: this.width,
      x: 16,
      y: Align.bottom(-18),
      text: this._title
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
      y: Align.bottom(-66),
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

exports.App = app = new App;


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
    image: 'images/status_bar_clear.png',
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
    image: 'images/keyboard_light.png'
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3N0ZXZlcnVpei9MaWJyYXJ5L01vYmlsZSBEb2N1bWVudHMvY29tfmFwcGxlfkNsb3VkRG9jcy9HaXRIdWIvZnJhbWVyLW1kL01hdGVyaWFsLmZyYW1lci9tb2R1bGVzL3R5cGUuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvc3RldmVydWl6L0xpYnJhcnkvTW9iaWxlIERvY3VtZW50cy9jb21+YXBwbGV+Q2xvdWREb2NzL0dpdEh1Yi9mcmFtZXItbWQvTWF0ZXJpYWwuZnJhbWVyL21vZHVsZXMvdGhlbWUuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvc3RldmVydWl6L0xpYnJhcnkvTW9iaWxlIERvY3VtZW50cy9jb21+YXBwbGV+Q2xvdWREb2NzL0dpdEh1Yi9mcmFtZXItbWQvTWF0ZXJpYWwuZnJhbWVyL21vZHVsZXMvcmlwcGxlLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3N0ZXZlcnVpei9MaWJyYXJ5L01vYmlsZSBEb2N1bWVudHMvY29tfmFwcGxlfkNsb3VkRG9jcy9HaXRIdWIvZnJhbWVyLW1kL01hdGVyaWFsLmZyYW1lci9tb2R1bGVzL21kLmNvZmZlZSIsIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiIyBcdGQ4ODg4ODhQICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRQXG4jIFx0ICAgODggICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgODhcbiMgXHQgICA4OCAgICBkUCAgICBkUCA4OGQ4ODhiLiAuZDg4ODhiLiAuZDg4ODhiLiA4OGQ4ODhiLiAuZDg4ODhiLiA4OGQ4ODhiLiA4OGQ4ODhiLiBkUCAgICBkUFxuIyBcdCAgIDg4ICAgIDg4ICAgIDg4IDg4JyAgYDg4IDg4JyAgYDg4IDg4JyAgYDg4IDg4JyAgYDg4IDg4JyAgYDg4IDg4JyAgYDg4IDg4JyAgYDg4IDg4ICAgIDg4XG4jIFx0ICAgODggICAgODguICAuODggODguICAuODggODguICAuODggODguICAuODggODggICAgICAgODguICAuODggODguICAuODggODggICAgODggODguICAuODhcbiMgXHQgICBkUCAgICBgODg4OFA4OCA4OFk4ODhQJyBgODg4ODhQJyBgODg4OFA4OCBkUCAgICAgICBgODg4ODhQOCA4OFk4ODhQJyBkUCAgICBkUCBgODg4OFA4OFxuIyBcdCAgICAgICAgICAgICAgLjg4IDg4ICAgICAgICAgICAgICAgICAgICAgLjg4ICAgICAgICAgICAgICAgICAgIDg4ICAgICAgICAgICAgICAgICAgICAgLjg4XG4jIFx0ICAgICAgICAgIGQ4ODg4UCAgZFAgICAgICAgICAgICAgICAgIGQ4ODg4UCAgICAgICAgICAgICAgICAgICAgZFAgICAgICAgICAgICAgICAgIGQ4ODg4UFxuXG5VdGlscy5pbnNlcnRDU1MoXG5cdFwiXCJcIlxuICAgIEBmb250LWZhY2Uge1xuICAgICAgZm9udC1mYW1pbHk6IFwiUm9ib3RvXCI7XG4gICAgICBzcmM6IHVybChcImZvbnRzL1JvYm90by1SZWd1bGFyLnR0ZlwiKTtcbiAgICBcIlwiXCIpXG5cbmNsYXNzIGV4cG9ydHMuSGVhZGxpbmUgZXh0ZW5kcyBUZXh0TGF5ZXJcblx0Y29uc3RydWN0b3I6IChvcHRpb25zKSAtPlxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdGZvbnRGYW1pbHk6ICdSb2JvdG8nXG5cdFx0XHRmb250U2l6ZTogMjRcblx0XHRcdGZvbnRXZWlnaHQ6IDQwMFxuXHRcdFx0bGluZUhlaWdodDogMS4zXG5cdFx0XHRjb2xvcjogJ3JnYmEoMCwwLDAsLjg3KSdcblxuY2xhc3MgZXhwb3J0cy5TdWJoZWFkU2Vjb25kYXJ5IGV4dGVuZHMgVGV4dExheWVyXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucykgLT5cblx0XHRzdXBlciBfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRmb250RmFtaWx5OiAnUm9ib3RvJ1xuXHRcdFx0Zm9udFNpemU6IDE2XG5cdFx0XHRmb250V2VpZ2h0OiA0MDAsIFxuXHRcdFx0bGluZUhlaWdodDogMS41LFxuXHRcdFx0Y29sb3I6ICdyZ2JhKDAsMCwwLC41NCknXG5cbmNsYXNzIGV4cG9ydHMuVGl0bGUgZXh0ZW5kcyBUZXh0TGF5ZXJcblx0Y29uc3RydWN0b3I6IChvcHRpb25zKSAtPlxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdGZvbnRGYW1pbHk6ICdSb2JvdG8nXG5cdFx0XHRmb250U2l6ZTogMjBcblx0XHRcdGZvbnRXZWlnaHQ6IDUwMFxuXHRcdFx0bGluZUhlaWdodDogMS4zXG5cdFx0XHRjb2xvcjogJ3JnYmEoMCwwLDAsLjg3KSdcbmNsYXNzIGV4cG9ydHMuUmVndWxhciBleHRlbmRzIFRleHRMYXllclxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMpIC0+XG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0Zm9udEZhbWlseTogJ1JvYm90bydcblx0XHRcdGZvbnRTaXplOiAxNlxuXHRcdFx0Zm9udFdlaWdodDogNDAwXG5cdFx0XHRsaW5lSGVpZ2h0OiAxLjNcblx0XHRcdGNvbG9yOiAncmdiYSgwLDAsMCwuODcpJ1xuY2xhc3MgZXhwb3J0cy5Cb2R5MiBleHRlbmRzIFRleHRMYXllclxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMpIC0+XG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0Zm9udEZhbWlseTogJ1JvYm90bydcblx0XHRcdGZvbnRTaXplOiAxNFxuXHRcdFx0Zm9udFdlaWdodDogNTAwXG5cdFx0XHRsaW5lSGVpZ2h0OiAxLjNcblx0XHRcdGNvbG9yOiAncmdiYSgwLDAsMCwuODcpJ1xuY2xhc3MgZXhwb3J0cy5NZW51IGV4dGVuZHMgVGV4dExheWVyXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucykgLT5cblx0XHRzdXBlciBfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRmb250RmFtaWx5OiAnUm9ib3RvJ1xuXHRcdFx0Zm9udFNpemU6IDE0XG5cdFx0XHRmb250V2VpZ2h0OiA1MDBcblx0XHRcdGxpbmVIZWlnaHQ6IDEuN1xuXHRcdFx0Y29sb3I6ICdyZ2JhKDAsMCwwLC44NyknXG5jbGFzcyBleHBvcnRzLkJvZHkxIGV4dGVuZHMgVGV4dExheWVyXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucykgLT5cblx0XHRzdXBlciBfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRmb250RmFtaWx5OiAnUm9ib3RvJ1xuXHRcdFx0Zm9udFNpemU6IDE0XG5cdFx0XHRmb250V2VpZ2h0OiA0MDBcblx0XHRcdGxpbmVIZWlnaHQ6IDEuNFxuXHRcdFx0Y29sb3I6ICdyZ2JhKDAsMCwwLC44NyknXG5jbGFzcyBleHBvcnRzLkNhcHRpb24gZXh0ZW5kcyBUZXh0TGF5ZXJcblx0Y29uc3RydWN0b3I6IChvcHRpb25zKSAtPlxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdGZvbnRGYW1pbHk6ICdSb2JvdG8nXG5cdFx0XHRmb250U2l6ZTogMTJcblx0XHRcdGZvbnRXZWlnaHQ6IDQwMFxuXHRcdFx0bGluZUhlaWdodDogMS4zXG5cdFx0XHRjb2xvcjogJ3JnYmEoMCwwLDAsLjU0KSdcbmNsYXNzIGV4cG9ydHMuQnV0dG9uIGV4dGVuZHMgVGV4dExheWVyXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucykgLT5cblx0XHRzdXBlciBfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRmb250RmFtaWx5OiAnUm9ib3RvJ1xuXHRcdFx0Zm9udFNpemU6IDE0XG5cdFx0XHRmb250V2VpZ2h0OiA1MDBcblx0XHRcdGxpbmVIZWlnaHQ6IDEuM1xuXHRcdFx0Y29sb3I6ICcjMDA5Njg4J1xuXHRcdFx0bGV0dGVyU3BhY2luZzogMC41XG5cdFx0XHRwYWRkaW5nOiB7bGVmdDogNCwgcmlnaHQ6IDQsIHRvcDogOCwgYm90dG9tOiAwfSwiLCJcbiMgICBkUCAgIGRQICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiMgICA4OCAgIDg4ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiMgZDg4ODhQIDg4ZDg4OGIuIC5kODg4OGIuIDg4ZDhiLmQ4Yi4gLmQ4ODg4Yi4gLmQ4ODg4Yi5cbiMgICA4OCAgIDg4JyAgYDg4IDg4b29vb2Q4IDg4J2A4OCdgODggODhvb29vZDggWThvb29vby5cbiMgICA4OCAgIDg4ICAgIDg4IDg4LiAgLi4uIDg4ICA4OCAgODggODguICAuLi4gICAgICAgODhcbiMgICBkUCAgIGRQICAgIGRQIGA4ODg4OFAnIGRQICBkUCAgZFAgYDg4ODg4UCcgYDg4ODg4UCdcblxuIyBXaGVuIGxvYWRlZCwgdGhpcyBtb2R1bGUgd2lsbCBhdHRlbXB0IHRvIGNyZWF0ZSBhIG5ldyB0aGVtZSBiYXNlZCBvbiBcbiMgdGhlIERlc2lnbiBNb2RlIHRlbXBsYXRlLiBJdHMgZGVmYXVsdCB2YWx1ZXMgd2lsbCBiZSBmb3IgYSBcIkxpZ2h0XCIgdGhlbWUuXG5cbm1vZGlmeUNvbG9yID0gKGNvbG9yLCBoLCBzLCBsKSAtPlxuXHRjbGlwID0gXy5yZXBsYWNlKF8ucmVwbGFjZShjb2xvci50b0hzbFN0cmluZygpLnNsaWNlKDQsIC0xKSwgJyUnLCAnJyksICclJywgJycpIC5zcGxpdCgnLCAnKVxuXG5cdG5ld0NvbG9yID0gbmV3IENvbG9yKFxuXHRcdGg6IF8ucGFyc2VJbnQoY2xpcFswXSkgKyBoLCBcblx0XHRzOiAoXy5wYXJzZUludChjbGlwWzFdKSArIHMpLzEwMCwgXG5cdFx0bDogKF8ucGFyc2VJbnQoY2xpcFsyXSkgKyBsKS8xMDAsIFxuXHRcdGE6IDEpXG5cdFxuXHRyZXR1cm4gbmV3Q29sb3JcblxucHJpbWFyeUNvbG9yID0gcHJpbWFyeV9jb2xvci5iYWNrZ3JvdW5kQ29sb3JcbnByaW1hcnlJbnZlcnQgPSAxMDAgLSAocHJpbWFyeV9pbnZlcnQub3BhY2l0eSAqIDEwMClcbnNlY29uZGFyeUNvbG9yID0gc2Vjb25kYXJ5X2NvbG9yLmJhY2tncm91bmRDb2xvclxubWVudUNvbG9yID0gbWVudV9jb2xvci5iYWNrZ3JvdW5kQ29sb3Jcbm1lbnVUZXh0Q29sb3IgPSBtZW51X3RleHRfY29sb3IuY29sb3Jcbm1lbnVJbnZlcnQgPSAxMDAgLSAobWVudV9pbnZlcnQub3BhY2l0eSAqIDEwMClcblxuXG5zb3VyY2UgPVxuXHRjb2xvcnM6XG5cdFx0cHJpbWFyeTpcblx0XHRcdG1haW46IHByaW1hcnlDb2xvclxuXHRcdFx0bGlnaHQ6IG1vZGlmeUNvbG9yKHByaW1hcnlDb2xvciwgMTMsIC01LCAxNSlcblx0XHRcdGRhcms6IG1vZGlmeUNvbG9yKHByaW1hcnlDb2xvciwgLTEsIC03LCAtMTIpXG5cdFx0XHR0ZXh0OiBwcmltYXJ5X3RleHRfY29sb3IuY29sb3Jcblx0XHRcdGludmVydDogcHJpbWFyeUludmVydFxuXHRcdHNlY29uZGFyeTpcblx0XHRcdG1haW46IHNlY29uZGFyeUNvbG9yXG5cdFx0XHRsaWdodDogbW9kaWZ5Q29sb3Ioc2Vjb25kYXJ5Q29sb3IsIDEzLCAtNSwgMTUpXG5cdFx0XHRkYXJrOiBtb2RpZnlDb2xvcihzZWNvbmRhcnlDb2xvciwgLTEsIC03LCAtMTIpXG5cdFx0XHR0ZXh0OiBzZWNvbmRhcnlfdGV4dF9jb2xvci5jb2xvclxuXHRcdG1lbnU6XG5cdFx0XHRsaWdodDogbWVudUNvbG9yXG5cdFx0XHR0ZXh0OiBtZW51VGV4dENvbG9yXG5cdFx0XHRpbnZlcnQ6IG1lbnVJbnZlcnRcblxudGhlbWUgPSBcblx0dGludDogc291cmNlLmNvbG9ycy5zZWNvbmRhcnkubWFpblxuXHRwcmltYXJ5OiBzb3VyY2UuY29sb3JzLnByaW1hcnkubWFpblxuXHRwcmltYXJ5SW52ZXJ0OiBwcmltYXJ5SW52ZXJ0XG5cdHNlY29uZGFyeTogc291cmNlLmNvbG9ycy5zZWNvbmRhcnkubWFpblxuXHRtZW51OiBzb3VyY2UuY29sb3JzLm1lbnUubGlnaHRcblx0bWVudUludmVydDogc291cmNlLmNvbG9ycy5tZW51LmludmVydFxuXG5cdHVzZXI6XG5cdFx0aW1hZ2U6IHVuZGVmaW5lZFxuXG5cdGhlYWRlcjogXG5cdFx0YmFja2dyb3VuZENvbG9yOiBzb3VyY2UuY29sb3JzLnByaW1hcnkubWFpblxuXHRcdHRpdGxlOiBzb3VyY2UuY29sb3JzLnByaW1hcnkudGV4dFxuXHRcdGludmVydDogcHJpbWFyeUludmVydFxuXHRcdGljb246XG5cdFx0XHRjb2xvcjogc291cmNlLmNvbG9ycy5wcmltYXJ5LnRleHRcblx0XHR0YWJzOlxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBzb3VyY2UuY29sb3JzLnByaW1hcnkubGlnaHRcblx0XHRcdGNvbG9yOiBzb3VyY2UuY29sb3JzLnByaW1hcnkudGV4dFxuXHRcdFx0c2VsZWN0b3I6IHNvdXJjZS5jb2xvcnMuc2Vjb25kYXJ5Lm1haW5cblx0XG5cdHN0YXR1c0JhcjogXG5cdFx0aW1hZ2U6ICdpbWFnZXMvc3RhdHVzX2Jhcl9jbGVhci5wbmcnXG5cdFx0YmFja2dyb3VuZENvbG9yOiBzb3VyY2UuY29sb3JzLnByaW1hcnkuZGFya1xuXHRcdGludmVydDogcHJpbWFyeUludmVydFxuXHRcblx0Ym90dG9tTmF2OlxuXHRcdGJhY2tncm91bmRDb2xvcjogJyNGRkZGRkYnXG5cdFx0c2hhZG93WTogLTJcblx0XHRzaGFkb3dCbHVyOiA2XG5cdFx0c2hhZG93Q29sb3I6ICdyZ2JhKDAsMCwwLC4xKSdcblxuXHRwYWdlOlxuXHRcdHByaW1hcnk6XG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6ICcjRTFFMkUxJ1xuXHRcdHNlY29uZGFyeTpcblx0XHRcdGJhY2tncm91bmRDb2xvcjogJyNGNUY1RjYnXG5cblx0bWVudU92ZXJsYXk6XG5cdFx0aGVhZGVyOlxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBzb3VyY2UuY29sb3JzLnNlY29uZGFyeS5tYWluXG5cdFx0XHRpY29uOiBzb3VyY2UuY29sb3JzLnNlY29uZGFyeS5saWdodFxuXHRcdGJhY2tncm91bmRDb2xvcjogc291cmNlLmNvbG9ycy5tZW51LmxpZ2h0XG5cdFx0dGV4dDogc291cmNlLmNvbG9ycy5tZW51LnRleHRcblx0XHRzbGlkZXI6IFxuXHRcdFx0a25vYjogc291cmNlLmNvbG9ycy5zZWNvbmRhcnkubGlnaHRcblx0XHRcdGZpbGw6IHNvdXJjZS5jb2xvcnMuc2Vjb25kYXJ5LmRhcmtcblx0XHRpbnZlcnQ6IHNvdXJjZS5jb2xvcnMubWVudS5pbnZlcnRcblxuXHRidXR0b246XG5cdFx0ZmxhdDpcblx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFx0Y29sb3I6IHNvdXJjZS5jb2xvcnMuc2Vjb25kYXJ5Lm1haW5cblx0XHRcdHNoYWRvd1k6IDBcblx0XHRcdHNoYWRvd0NvbG9yOiAncmdiYSgwLDAsMCwuMTgpJ1xuXHRcdFx0c2hhZG93Qmx1cjogMFxuXG5cdFx0cmFpc2VkOlxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBzb3VyY2UuY29sb3JzLnNlY29uZGFyeS5tYWluXG5cdFx0XHRjb2xvcjogc291cmNlLmNvbG9ycy5zZWNvbmRhcnkudGV4dFxuXHRcdFx0c2hhZG93WTogMlxuXHRcdFx0c2hhZG93Q29sb3I6ICdyZ2JhKDAsMCwwLC4xOCknXG5cdFx0XHRzaGFkb3dCbHVyOiA2XG5cblx0ZmFiOlxuXHRcdGJhY2tncm91bmRDb2xvcjogc291cmNlLmNvbG9ycy5zZWNvbmRhcnkubWFpblxuXHRcdGNvbG9yOiBzb3VyY2UuY29sb3JzLnNlY29uZGFyeS50ZXh0XG5cdFx0aW52ZXJ0OiBwcmltYXJ5SW52ZXJ0XG5cblx0ZGlhbG9nOiBcblx0XHRiYWNrZ3JvdW5kQ29sb3I6JyNGQUZBRkEnXG5cdFxuXHR0ZXh0OiBcblx0XHRwcmltYXJ5OiBzb3VyY2UuY29sb3JzLnByaW1hcnkudGV4dFxuXHRcdHNlY29uZGFyeTogc291cmNlLmNvbG9ycy5zZWNvbmRhcnkudGV4dFxuXHRcblx0dGFibGU6XG5cdFx0YmFja2dyb3VuZENvbG9yOiAnI0ZGRkZGRidcblx0XHR0ZXh0OiBzb3VyY2UuY29sb3JzLnByaW1hcnkudGV4dFxuXHRcdGNoZWNrQm94OlxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHRib3JkZXJDb2xvcjogJyNEM0QzRDMnXG5cdFx0c2VsZWN0ZWQ6XG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IHNvdXJjZS5jb2xvcnMuc2Vjb25kYXJ5Lm1haW5cblx0XHRcdHRleHQ6IHNvdXJjZS5jb2xvcnMucHJpbWFyeS50ZXh0XG5cdFx0XHRjaGVja0JveDpcblx0XHRcdFx0YmFja2dyb3VuZENvbG9yOiBzb3VyY2UuY29sb3JzLnNlY29uZGFyeS5kYXJrXG5cdFx0XHRcdGJvcmRlckNvbG9yOiBudWxsXG5cblx0c2xpZGVyOlxuXHRcdGtub2I6IHNvdXJjZS5jb2xvcnMucHJpbWFyeS5saWdodFxuXHRcdGZpbGw6IHNvdXJjZS5jb2xvcnMucHJpbWFyeS5kYXJrXG5cblx0Y2FyZDpcblx0XHRoZWFkZXI6IHNvdXJjZS5jb2xvcnMuc2Vjb25kYXJ5LmRhcmtcblx0XG5cdG5hdkJhcjpcblx0XHRiYWNrZ3JvdW5kQ29sb3I6ICcjMDAwMDAwJ1xuXHRcblx0a2V5Ym9hcmQ6XG5cdFx0aW1hZ2U6ICdpbWFnZXMva2V5Ym9hcmRfbGlnaHQucG5nJ1xuXG5jb2xvcl9wYWxsZXRlLmRlc3Ryb3koKVxuXG5leHBvcnRzLnRoZW1lID0gdGhlbWVcbiIsIiMgXHQgODg4ODg4YmEgIG9vICAgICAgICAgICAgICAgICAgIGRQXG4jIFx0IDg4ICAgIGA4YiAgICAgICAgICAgICAgICAgICAgICA4OFxuIyBcdGE4OGFhYWE4UCcgZFAgODhkODg4Yi4gODhkODg4Yi4gODggLmQ4ODg4Yi5cbiMgXHQgODggICBgOGIuIDg4IDg4JyAgYDg4IDg4JyAgYDg4IDg4IDg4b29vb2Q4XG4jIFx0IDg4ICAgICA4OCA4OCA4OC4gIC44OCA4OC4gIC44OCA4OCA4OC4gIC4uLlxuIyBcdCBkUCAgICAgZFAgZFAgODhZODg4UCcgODhZODg4UCcgZFAgYDg4ODg4UCdcbiMgXHQgICAgICAgICAgICAgIDg4ICAgICAgIDg4XG4jIFx0ICAgICAgICAgICAgICBkUCAgICAgICBkUFxuXG4jXHRCeSBkZWZhdWx0LCBzaG93cyBhbiBleHBhbmRpbmcgY2lyY2xlIG92ZXIgYSBsYXllciwgY2xpcHBlZCB0byBpdHMgZnJhbWUuXG4jXHRPbiB0aGUgbGF5ZXIncyB0b3VjaEVuZCBldmVudCwgdGhlIGNpcmNsZSBhbmQgaXRzIG1hc2sgd2lsbCBkaXNhcHBlYXIuXG5cbiNcdHJlcXVpcmVkOlxuI1x0bGF5ZXIgKExheWVyKSwgdGhlIGxheWVyIG92ZXIgd2hpY2ggdG8gc2hvdyB0aGUgcmlwcGxlIGVmZmVjdFxuI1x0cG9pbnQgKG9iamVjdCksIHRoZSByaXBwbGUgb3JpZ2luIHBvaW50LCB1c3VhbGx5IGEgb25Ub3VjaFN0YXJ0J3MgZXZlbnQucG9pbnRcblxuI1x0b3B0aW9uYWw6XG4jXHRwbGFjZUJlaGluZCAoTGF5ZXIpLCBhIGNoaWxkIG9mIGxheWVyIGJlaGluZCB3aGljaCB0aGUgcmlwcGxlIHNob3VsZCBhcHBlYXJcbiNcdGNvbG9yIChzdHJpbmcgb3IgY29sb3Igb2JqZWN0KSwgYSBjdXN0b20gY29sb3IgZm9yIHRoZSByaXBwbGVcblxucmlwcGxlID0gKGxheWVyLCBwb2ludCwgcGxhY2VCZWhpbmQsIGNvbG9yKSAtPlxuXHRcblx0aWYgIWxheWVyPyB0aGVuIHRocm93ICdSaXBwbGUgcmVxdWlyZXMgYSBMYXllci4gVHJ5IG15TGF5ZXIub25Ub3VjaFN0YXJ0IChldmVudCkgLT4gcmlwcGxlKEAsIGV2ZW50LnBvaW50KSdcblx0aWYgIXBvaW50PyB0aGVuIHRocm93ICdSaXBwbGUgcmVxdWlyZXMgYSBwb2ludC4gVHJ5IG15TGF5ZXIub25Ub3VjaFN0YXJ0IChldmVudCkgLT4gcmlwcGxlKEAsIGV2ZW50LnBvaW50KSdcblxuXHRtYXNrID0gbmV3IExheWVyXG5cdFx0bmFtZTogJy4nXG5cdFx0cGFyZW50OiBsYXllclxuXHRcdHNpemU6IGxheWVyLnNpemVcblx0XHRib3JkZXJSYWRpdXM6IGxheWVyLmJvcmRlclJhZGl1c1xuXHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdGNsaXA6IHRydWVcblx0XHRvcGFjaXR5OiAwXG5cdFx0YW5pbWF0aW9uT3B0aW9uczoge3RpbWU6IC4xNX1cblx0XG5cdGlmIHBsYWNlQmVoaW5kIHRoZW4gbWFzay5wbGFjZUJlaGluZChwbGFjZUJlaGluZClcblx0XG5cdCMgUklQUExFIENJUkNMRVxuXHRcblx0bG9uZ1NpZGUgPSBpZiBsYXllci53aWR0aCA+IGxheWVyLmhlaWdodCB0aGVuIGxheWVyLndpZHRoIGVsc2UgbGF5ZXIuaGVpZ2h0XG5cblx0cmlwcGxlQ2lyY2xlID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiAnLicsIHBhcmVudDogbWFza1xuXHRcdFx0eDogcG9pbnQueCAtIDE2XG5cdFx0XHR5OiBwb2ludC55IC0gMTZcblx0XHRcdHdpZHRoOiAzMiwgaGVpZ2h0OiAzMiwgXG5cdFx0XHRib3JkZXJSYWRpdXM6IGxvbmdTaWRlXG5cdFx0XHRcblx0aWYgY29sb3I/XG5cdFx0cmlwcGxlQ2lyY2xlLnByb3BzID1cblx0XHRcdGJhY2tncm91bmRDb2xvcjogY29sb3Jcblx0ZWxzZSBcblx0XHRyaXBwbGVDaXJjbGUucHJvcHMgPSBcblx0XHRcdGJhY2tncm91bmRDb2xvcjogbGF5ZXIuYmFja2dyb3VuZENvbG9yXG5cdFx0XHRzYXR1cmF0ZTogMTUwXG5cdFx0XHRicmlnaHRuZXNzOiAxMjBcblx0XHRcdG9wYWNpdHk6IC4zXG5cdFxuXHQjIEFOSU1BVElPTlMgQ0lSQ0xFXG5cdFxuXHRtYXNrLmFuaW1hdGVcblx0XHRvcGFjaXR5OiAxXG5cdFx0b3B0aW9uczoge3RpbWU6IC4xNX1cblx0XG5cdHJpcHBsZUNpcmNsZS5hbmltYXRlXG5cdFx0eDogcmlwcGxlQ2lyY2xlLnggLSBsb25nU2lkZSAqIDEuM1xuXHRcdHk6IHJpcHBsZUNpcmNsZS55IC0gbG9uZ1NpZGUgKiAxLjNcblx0XHR3aWR0aDogbG9uZ1NpZGUgKiAyLjZcblx0XHRoZWlnaHQ6IGxvbmdTaWRlICogMi42XG5cdFx0b3B0aW9uczoge3RpbWU6IC41fVxuXHRcblx0VXRpbHMuZGVsYXkgMiwgLT4gXG5cdFx0bWFzay5hbmltYXRlXG5cdFx0XHRvcGFjaXR5OiAwXG5cdFx0bWFzay5vbkFuaW1hdGlvbkVuZCBtYXNrLmRlc3Ryb3lcblxuXHQjIFRPVUNIIEVORFxuXHRcblx0bGF5ZXIub25Ub3VjaEVuZCAtPiBcblx0XHRtYXNrLmFuaW1hdGVcblx0XHRcdG9wYWNpdHk6IDBcblx0XHRtYXNrLm9uQW5pbWF0aW9uRW5kIG1hc2suZGVzdHJveVxuXG5leHBvcnRzLnJpcHBsZSA9IHJpcHBsZSIsIntyaXBwbGV9ID0gcmVxdWlyZSAncmlwcGxlJ1xue3RoZW1lfSA9IHJlcXVpcmUgJ3RoZW1lJ1xudHlwZSA9IHJlcXVpcmUgJ3R5cGUnXG5pY29ucyA9IEpTT04ucGFyc2UgVXRpbHMuZG9tTG9hZERhdGFTeW5jIFwibW9kdWxlcy9pY29ucy5qc29uXCJcblxuXG4jIFRPRE86IENoYW5nZSBBcHAgZnJvbSBtYXN0ZXIgZmxvdyBjb21wb25lbnQgdG8gU2NyZWVuIG1hbmFnZXIuXG4jIEFwcCBzaG91bGRuJ3QgZGlyZWN0bHkgbWFuYWdlIHBhZ2VzOiBhIG5ldyBjbGFzcywgJ3NjcmVlbicgd2lsbCBtYW5hZ2UgUGFnZXMuXG4jIFRhYnMgYWxsb3cgbmF2aWdhdGlvbiBiZXR3ZWVuIFNjcmVlbnMuIENvbnRlbnQgaXMgc3RpbGwgYWRkZWQgdG8gUGFnZXMuXG5cblxuIyBPdXIgZ29hbCBpcyB0byByZXF1aXJlIG9ubHkgb25lIHJlcXVpcmUgaW4gRnJhbWVyIHByb2plY3QsIHNvIHRoaXMgXG4jIGlzIGEgY2x1bmt5IHdheSBvZiBsZXR0aW5nIHVzZXIgY3JlYXRlIHRleHQgdXNpbmcgbWQuVGl0bGUsIGV0Yy5cblxuZXhwb3J0cy50aGVtZSA9IHRoZW1lXG5leHBvcnRzLlRpdGxlID0gVGl0bGUgPSB0eXBlLlRpdGxlXG5leHBvcnRzLkhlYWRsaW5lID0gSGVhZGxpbmUgPSB0eXBlLkhlYWRsaW5lXG5leHBvcnRzLlN1YmhlYWRTZWNvbmRhcnkgPSBTdWJoZWFkU2Vjb25kYXJ5ID0gdHlwZS5TdWJoZWFkU2Vjb25kYXJ5XG5leHBvcnRzLlJlZ3VsYXIgPSBSZWd1bGFyID0gdHlwZS5SZWd1bGFyXG5leHBvcnRzLkJvZHkyID0gQm9keTIgPSB0eXBlLkJvZHkyXG5leHBvcnRzLkJvZHkxID0gQm9keTEgPSB0eXBlLkJvZHkxXG5leHBvcnRzLkNhcHRpb24gPSBDYXB0aW9uID0gdHlwZS5DYXB0aW9uXG5leHBvcnRzLkRpYWxvZ0FjdGlvbiA9IERpYWxvZ0FjdGlvbiA9IHR5cGUuRGlhbG9nQWN0aW9uXG5cblxuXG4jIFx0IC5kODg4ODg4XG4jIFx0ZDgnICAgIDg4XG4jIFx0ODhhYWFhYTg4YSA4OGQ4ODhiLiA4OGQ4ODhiLlxuIyBcdDg4ICAgICA4OCAgODgnICBgODggODgnICBgODhcbiMgXHQ4OCAgICAgODggIDg4LiAgLjg4IDg4LiAgLjg4XG4jIFx0ODggICAgIDg4ICA4OFk4ODhQJyA4OFk4ODhQJ1xuIyBcdCAgICAgICAgICAgODggICAgICAgODhcbiMgXHQgICAgICAgICAgIGRQICAgICAgIGRQXG5cblxuXG5jbGFzcyBBcHAgZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblxuXHRcdEBfZm9vdGVyID0gb3B0aW9ucy5mb290ZXIgPyB0cnVlXG5cdFx0QF90aGVtZSA9IHRoZW1lXG5cblx0XHRAdmlld3MgPSBvcHRpb25zLnZpZXdzID8gW11cblxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdG5hbWU6ICdBcHAnXG5cdFx0XHRzaXplOiBTY3JlZW4uc2l6ZVxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cblx0XHQjIEZPT1RFUlxuXG5cdFx0aWYgQF9mb290ZXJcblx0XHRcdEBmb290ZXIgPSBuZXcgTGF5ZXJcblx0XHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEBcblx0XHRcdFx0d2lkdGg6IFNjcmVlbi53aWR0aCwgaGVpZ2h0OiA0OFxuXHRcdFx0XHRpbWFnZTogJ2ltYWdlcy9uYXZfYmFyLnBuZydcblx0XHRcdFx0aW5kZXg6IDk5OVxuXHRcdFx0XHR5OiBBbGlnbi5ib3R0b20oKVxuXHRcdFxuXHRcdCMgSEVBREVSXG5cblx0XHRAaGVhZGVyID0gbmV3IEhlYWRlclxuXHRcdFx0dGhlbWU6IHRoZW1lXG5cdFx0XHRpbmRleDogOTk5XG5cblxuXHRcdCMgS0VZQk9BUkRcblxuXHRcdEBrZXlib2FyZCA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogJ0tleWJvYXJkJ1xuXHRcdFx0eTogQG1heFksIGltYWdlOiB0aGVtZS5rZXlib2FyZC5pbWFnZVxuXHRcdFx0d2lkdGg6IDM2MCwgaGVpZ2h0OiAyNjlcblx0XHRcdGluZGV4OiAxMDAwXG5cdFx0XHRhbmltYXRpb25PcHRpb25zOlxuXHRcdFx0XHR0aW1lOiAuMjVcblxuXG5cdHNob3dLZXlib2FyZDogLT5cblx0XHRAa2V5Ym9hcmQuYW5pbWF0ZVxuXHRcdFx0eTogQWxpZ24uYm90dG9tKClcblx0XHRAa2V5Ym9hcmQuYnJpbmdUb0Zyb250KClcblxuXHRoaWRlS2V5Ym9hcmQ6IC0+XG5cdFx0QGtleWJvYXJkLmFuaW1hdGVcblx0XHRcdHk6IFNjcmVlbi5tYXhZXG5cblx0c2V0dXA6IChvcHRpb25zID0ge30pIC0+XG5cblx0XHRpZiBvcHRpb25zLmJvdHRvbU5hdlxuXHRcdFx0QGJvdHRvbU5hdiA9IG5ldyBCb3R0b21OYXZcblx0XHRcdFx0bmFtZTogJ0JvdHRvbU5hdicsIHBhcmVudDogQFxuXHRcdFx0XHRkZXN0aW5hdGlvbnM6IG9wdGlvbnMuYm90dG9tTmF2LmxpbmtzID8gXCJtZC5hcHAuYm90dG9tTmF2IG5lZWRzIGFuIGFycmF5IG9mIGxpbmtzLiBFeGFtcGxlOiBbe3RpdGxlOiAnSG9tZScsIGljb246ICdob21lJywgYWN0aW9uOiAtPiB2aWV3LmxpbmtUbyhob21lKX1dXCJcblx0XHRcdFx0eTogQWxpZ24uYm90dG9tKC1AZm9vdGVyPy5oZWlnaHQpXG5cdFx0XHRcdGluZGV4OiA5OTlcblxuXHRcdGlmIG9wdGlvbnMubWVudU92ZXJsYXlcblx0XHRcdEBtZW51T3ZlcmxheSA9IG5ldyBNZW51T3ZlcmxheVxuXHRcdFx0XHR0aXRsZTogb3B0aW9ucy5tZW51T3ZlcmxheS50aXRsZSA/IHRocm93ICdtZC5hcHAubWVudU92ZXJsYXkgbmVlZHMgYSB0aXRsZS4nXG5cdFx0XHRcdGxpbmtzOiBvcHRpb25zLm1lbnVPdmVybGF5LmxpbmtzID8gdGhyb3cgXCJtZC5hcHAubWVudU92ZXJsYXkgbmVlZHMgYW4gYXJyYXkgb2YgbGlua3MuIEV4YW1wbGU6IFt7dGl0bGU6ICdIb21lJywgaWNvbjogJ2hvbWUnLCBhY3Rpb246IC0+IHZpZXcubGlua1RvKGhvbWUpfV1cIlxuXG5cblxuIyBcdGRQICAgICBkUCBvb1xuIyBcdDg4ICAgICA4OFxuIyBcdDg4ICAgIC44UCBkUCAuZDg4ODhiLiBkUCAgZFAgIGRQXG4jIFx0ODggICAgZDgnIDg4IDg4b29vb2Q4IDg4ICA4OCAgODhcbiMgXHQ4OCAgLmQ4UCAgODggODguICAuLi4gODguODhiLjg4J1xuIyBcdDg4ODg4OCcgICBkUCBgODg4ODhQJyA4ODg4UCBZOFBcblxuXG5cbmV4cG9ydHMuVmlldyA9IGNsYXNzIFZpZXcgZXh0ZW5kcyBGbG93Q29tcG9uZW50XG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXG5cdFx0QGFwcCA9IGFwcFxuXG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0bmFtZTogJ1ZpZXcnXG5cdFx0XHRwYXJlbnQ6IGFwcFxuXHRcdFx0aW5kZXg6IDkwMFxuXHRcdFx0YW5pbWF0aW9uT3B0aW9uczpcblx0XHRcdFx0dGltZTogLjJcblxuXHRcdEBvblRyYW5zaXRpb25TdGFydCAoY3VycmVudCwgbmV4dCwgZGlyZWN0aW9uKSA9PiBcblxuXHRcdFx0QGFwcC5oZWFkZXIudGl0bGUgPSBuZXh0Ll9oZWFkZXI/LnRpdGxlID8gJ0RlZmF1bHQnXG5cdFx0XHRAYXBwLmhlYWRlci5pY29uID0gbmV4dC5faGVhZGVyPy5pY29uID8gJ21lbnUnXG5cdFx0XHRAYXBwLmhlYWRlci5pY29uQWN0aW9uID0gbmV4dC5faGVhZGVyPy5pY29uQWN0aW9uID8gLT4gbnVsbFxuXHRcdFx0QGFwcC5oZWFkZXIudmlzaWJsZSA9IG5leHQuX2hlYWRlcj8udmlzaWJsZSA/IHRydWVcblx0XHRcdG5leHQuX29uTG9hZCgpXG5cblx0XHRhcHAudmlld3MucHVzaChAKVxuXG5cdG5ld1BhZ2U6IChvcHRpb25zID0ge30pIC0+XG5cblx0XHRwYWdlID0gbmV3IFBhZ2UgXy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0Y29udGVudEluc2V0OiB7dG9wOiBAYXBwLmhlYWRlci5oZWlnaHR9XG5cblx0XHQjIGFkanVzdCBjb250ZW50IGluc2V0IGZvciBwYWdlXG5cdFx0aWYgcGFnZS5jb250ZW50SW5zZXQudG9wIDwgQGFwcC5oZWFkZXIuaGVpZ2h0IHRoZW4gcGFnZS5jb250ZW50SW5zZXQgPSBcblx0XHRcdHRvcDogcGFnZS5jb250ZW50SW5zZXQudG9wICs9IEBhcHAuaGVhZGVyLmhlaWdodFxuXHRcdFx0Ym90dG9tOiBwYWdlLmNvbnRlbnRJbnNldC5ib3R0b21cblx0XHRcdGxlZnQ6IHBhZ2UuY29udGVudEluc2V0LmxlZnRcblx0XHRcdHJpZ2h0OiBwYWdlLmNvbnRlbnRJbnNldC5yaWdodFxuXG5cdFx0cmV0dXJuIHBhZ2UgXG5cblx0YWRkUGFnZTogKHBhZ2UpIC0+XG5cdFx0cGFnZS5jb250ZW50SW5zZXQgPSB7dG9wOiBAYXBwLmhlYWRlci5oZWlnaHR9XG5cblx0XHQjIGFkanVzdCBjb250ZW50IGluc2V0IGZvciBwYWdlXG5cdFx0aWYgcGFnZS5jb250ZW50SW5zZXQudG9wIDwgQGFwcC5oZWFkZXIuaGVpZ2h0IHRoZW4gcGFnZS5jb250ZW50SW5zZXQgPSBcblx0XHRcdHRvcDogcGFnZS5jb250ZW50SW5zZXQudG9wICs9IEBhcHAuaGVhZGVyLmhlaWdodFxuXHRcdFx0Ym90dG9tOiBwYWdlLmNvbnRlbnRJbnNldC5ib3R0b21cblx0XHRcdGxlZnQ6IHBhZ2UuY29udGVudEluc2V0LmxlZnRcblx0XHRcdHJpZ2h0OiBwYWdlLmNvbnRlbnRJbnNldC5yaWdodFxuXG5cdFx0cmV0dXJuIHBhZ2VcblxuXHRsaW5rVG86IChwYWdlKSAtPlxuXHRcdGlmIHBhZ2U/IGFuZCBAY3VycmVudCBpc250IHBhZ2Vcblx0XHRcdEBzaG93TmV4dChwYWdlKVxuXG5cblxuXG5cblxuXG5cbiMgXHRkUFxuIyBcdDg4XG4jIFx0ODggLmQ4ODg4Yi4gLmQ4ODg4Yi4gODhkODg4Yi5cbiMgXHQ4OCA4OCcgIGBcIlwiIDg4JyAgYDg4IDg4JyAgYDg4XG4jIFx0ODggODguICAuLi4gODguICAuODggODggICAgODhcbiMgXHRkUCBgODg4ODhQJyBgODg4ODhQJyBkUCAgICBkUFxuIyBcdFxuIyBcdFxuXG5leHBvcnRzLkljb24gPSBjbGFzcyBJY29uIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cblx0XHRAX2ljb24gPSBvcHRpb25zLmljb24gPyAnbWVudSdcblx0XHRAX2NvbG9yID0gb3B0aW9ucy5jb2xvciA/ICcjMDAwMDAnXG5cdFx0QF9iYWNrZ3JvdW5kQ29sb3IgPSBvcHRpb25zLmJhY2tncm91bmRDb2xvciA/IG51bGxcblxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdG5hbWU6ICcuJ1xuXHRcdFx0aGVpZ2h0OiAyNCwgd2lkdGg6IDI0XG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IEBfYmFja2dyb3VuZENvbG9yXG5cblx0XHQjIEBpY29uID0gQF9pY29uXG5cblx0QGRlZmluZSBcImljb25cIixcblx0XHRnZXQ6IC0+IHJldHVybiBAX2ljb25cblx0XHRzZXQ6IChuYW1lKSAtPlxuXHRcdFx0QF9pY29uID0gbmFtZVxuXG5cdFx0XHRzdmcgPSBpZiBpY29uc1tAX2ljb25dIHRoZW4gXCI8c3ZnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zycgdmlld0JveD0nMCAwIDI0IDI0Jz48cGF0aCBkPScje2ljb25zW0BfaWNvbl19JyBmaWxsPScje0BfY29sb3J9Jy8+PC9zdmc+XCJcblx0XHRcdGVsc2UgdGhyb3cgXCJFcnJvcjogaWNvbiAnI3tuYW1lfScgd2FzIG5vdCBmb3VuZC4gU2VlIGh0dHBzOi8vbWF0ZXJpYWxkZXNpZ25pY29ucy5jb20vIGZvciBmdWxsIGxpc3Qgb2YgaWNvbnMuXCJcblxuXHRcdFx0QGh0bWwgPSBzdmdcblxuXHRAZGVmaW5lIFwiY29sb3JcIixcblx0XHRnZXQ6IC0+IHJldHVybiBAX2NvbG9yXG5cdFx0c2V0OiAoY29sb3IpIC0+XG5cdFx0XHRAX2NvbG9yID0gbmV3IENvbG9yKGNvbG9yKVxuXG5cdFx0XHRzdmcgPSBpZiBpY29uc1tAX2ljb25dIHRoZW4gXCI8c3ZnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zycgdmlld0JveD0nMCAwIDI0IDI0Jz48cGF0aCBkPScje2ljb25zW0BfaWNvbl19JyBmaWxsPScje0BfY29sb3J9Jy8+PC9zdmc+XCJcblx0XHRcdGVsc2UgdGhyb3cgXCJFcnJvcjogaWNvbiAnI3tuYW1lfScgd2FzIG5vdCBmb3VuZC4gU2VlIGh0dHBzOi8vbWF0ZXJpYWxkZXNpZ25pY29ucy5jb20vIGZvciBmdWxsIGxpc3Qgb2YgaWNvbnMuXCJcblxuXHRcdFx0QGh0bWwgPSBzdmdcblxuXG5cblxuXG5cbiMgLmQ4ODg4OGIgICAgZFAgICAgICAgICAgICAgIGRQICAgICAgICAgICAgICAgICAgICAgIDg4ODg4OGJhICAgICAgICAgICAgICAgICAgIFxuIyA4OC4gICAgXCInICAgODggICAgICAgICAgICAgIDg4ICAgICAgICAgICAgICAgICAgICAgIDg4ICAgIGA4YiAgICAgICAgICAgICAgICAgIFxuIyBgWTg4ODg4Yi4gZDg4ODhQIC5kODg4OGIuIGQ4ODg4UCBkUCAgICBkUCAuZDg4ODhiLiBhODhhYWFhOFAnIC5kODg4OGIuIDg4ZDg4OGIuXG4jICAgICAgIGA4YiAgIDg4ICAgODgnICBgODggICA4OCAgIDg4ICAgIDg4IFk4b29vb28uICA4OCAgIGA4Yi4gODgnICBgODggODgnICBgODhcbiMgZDgnICAgLjhQICAgODggICA4OC4gIC44OCAgIDg4ICAgODguICAuODggICAgICAgODggIDg4ICAgIC44OCA4OC4gIC44OCA4OCAgICAgIFxuIyAgWTg4ODg4UCAgICBkUCAgIGA4ODg4OFA4ICAgZFAgICBgODg4ODhQJyBgODg4ODhQJyAgODg4ODg4ODhQIGA4ODg4OFA4IGRQICBcblxuXG5cbmV4cG9ydHMuU3RhdHVzQmFyID0gY2xhc3MgU3RhdHVzQmFyIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cblx0XHRzdXBlciBfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRuYW1lOiAnLidcblx0XHRcdHdpZHRoOiBTY3JlZW4ud2lkdGgsIGhlaWdodDogMjRcblx0XHRcdGJhY2tncm91bmRDb2xvcjogdGhlbWUuc3RhdHVzQmFyLmJhY2tncm91bmRDb2xvclxuXG5cdFx0QGl0ZW1zID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQFxuXHRcdFx0c2l6ZTogQHNpemVcblx0XHRcdGltYWdlOiB0aGVtZS5zdGF0dXNCYXIuaW1hZ2Vcblx0XHRcdGludmVydDogdGhlbWUuc3RhdHVzQmFyLmludmVydFxuXG5cblxuXG5cblxuXG5cbiMgZFAgICAgIGRQICAgICAgICAgICAgICAgICAgICAgICAgICBkUCAgICAgICAgICAgICAgICAgIFxuIyA4OCAgICAgODggICAgICAgICAgICAgICAgICAgICAgICAgIDg4ICAgICAgICAgICAgICAgICAgXG4jIDg4YWFhYWE4OGEgLmQ4ODg4Yi4gLmQ4ODg4Yi4gLmQ4ODhiODggLmQ4ODg4Yi4gODhkODg4Yi5cbiMgODggICAgIDg4ICA4OG9vb29kOCA4OCcgIGA4OCA4OCcgIGA4OCA4OG9vb29kOCA4OCcgIGA4OFxuIyA4OCAgICAgODggIDg4LiAgLi4uIDg4LiAgLjg4IDg4LiAgLjg4IDg4LiAgLi4uIDg4ICAgICAgXG4jIGRQICAgICBkUCAgYDg4ODg4UCcgYDg4ODg4UDggYDg4ODg4UDggYDg4ODg4UCcgZFAgICAgXG5cblxuXG5leHBvcnRzLkhlYWRlciA9IGNsYXNzIEhlYWRlciBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXHRcdFxuXHRcdEBfdGl0bGUgPSB1bmRlZmluZWRcblx0XHRAX2ljb24gPSB1bmRlZmluZWRcblx0XHRAX2ljb25BY3Rpb24gPSBvcHRpb25zLmljb25BY3Rpb24gPyAtPiBudWxsXG5cblx0XHRzdXBlciBfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRuYW1lOiAnSGVhZGVyJywgXG5cdFx0XHR3aWR0aDogU2NyZWVuLndpZHRoLCBoZWlnaHQ6IDgwXG5cdFx0XHRzaGFkb3dZOiAyLCBzaGFkb3dCbHVyOiAzLCBzaGFkb3dDb2xvcjogJ3JnYmEoMCwwLDAsLjI0KSdcblx0XHRcdGJhY2tncm91bmRDb2xvcjogdGhlbWUuaGVhZGVyLmJhY2tncm91bmRDb2xvclxuXG5cdFx0QHN0YXR1c0JhciA9IG5ldyBTdGF0dXNCYXJcblx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBAXG5cblx0XHQjIFRPRE86IGlmIG9wdGlvbnMuaWNvbiBpcyBmYWxzZSB0aGVuIG5vIGljb25MYXllciwgbW92ZSB0aXRsZSBsZWZ0XG5cblx0XHRAdGl0bGVMYXllciA9IG5ldyB0eXBlLlRpdGxlXG5cdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQFxuXHRcdFx0eDogNzIsIHk6IEFsaWduLmJvdHRvbSgtMTQpXG5cdFx0XHRjb2xvcjogdGhlbWUuaGVhZGVyLnRpdGxlXG5cdFx0XHR0ZXh0OiBAdGl0bGUgPyBcIk5vIHRpdGxlXCJcblxuXHRcdEB0aXRsZSA9IG9wdGlvbnMudGl0bGUgPyAnRGVmYXVsdCBIZWFkZXInXG5cblx0XHRAaWNvbkxheWVyID0gbmV3IEljb25cblx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBALCBcblx0XHRcdHg6IDEyLCB5OiBBbGlnbi5jZW50ZXIoMTIpXG5cdFx0XHRpY29uOiAnbWVudScsIGNvbG9yOiB0aGVtZS5oZWFkZXIuaWNvbi5jb2xvclxuXG5cdFx0QGljb24gPSBvcHRpb25zLmljb24gPyAnbWVudSdcblxuXHRcdEBpY29uTGF5ZXIub25UYXAgPT4gQF9pY29uQWN0aW9uKClcblx0XHRAaWNvbkxheWVyLm9uVG91Y2hTdGFydCAoZXZlbnQpIC0+IHJpcHBsZShhcHAuaGVhZGVyLCBldmVudC5wb2ludClcblxuXG5cdEBkZWZpbmUgXCJ0aXRsZVwiLFxuXHRcdGdldDogLT4gcmV0dXJuIEBfdGl0bGVcblx0XHRzZXQ6ICh0aXRsZVRleHQpIC0+XG5cdFx0XHRAX3RpdGxlID0gdGl0bGVUZXh0XG5cdFx0XHRAdGl0bGVMYXllci50ZXh0UmVwbGFjZShAdGl0bGVMYXllci50ZXh0LCBAX3RpdGxlKVxuXG5cdEBkZWZpbmUgXCJpY29uXCIsXG5cdFx0Z2V0OiAtPiByZXR1cm4gQF9pY29uXG5cdFx0c2V0OiAoaWNvbk5hbWUpIC0+IFxuXHRcdFx0QF9pY29uID0gaWNvbk5hbWVcblx0XHRcdEBpY29uTGF5ZXIuaWNvbiA9IGljb25OYW1lXG5cblx0QGRlZmluZSBcImljb25Db2xvclwiLFxuXHRcdGdldDogLT4gcmV0dXJuIEBfaWNvbi5jb2xvclxuXHRcdHNldDogKGNvbG9yKSAtPiBcblx0XHRcdEBpY29uTGF5ZXIuY29sb3IgPSBjb2xvclxuXG5cdEBkZWZpbmUgXCJpY29uQWN0aW9uXCIsXG5cdFx0Z2V0OiAtPiByZXR1cm4gQF9pY29uQWN0aW9uXG5cdFx0c2V0OiAoYWN0aW9uKSAtPlxuXHRcdFx0QF9pY29uQWN0aW9uID0gYWN0aW9uXG5cblxuXG5cblxuXG5cbiMgXHQgODg4ODg4YmEgICAgICAgICAgICAgZFAgICAgIGRQICAgICAgICAgICAgICAgICAgICAgICA4ODg4ODhiYVxuIyBcdCA4OCAgICBgOGIgICAgICAgICAgICA4OCAgICAgODggICAgICAgICAgICAgICAgICAgICAgIDg4ICAgIGA4YlxuIyBcdGE4OGFhYWE4UCcgLmQ4ODg4Yi4gZDg4ODhQIGQ4ODg4UCAuZDg4ODhiLiA4OGQ4Yi5kOGIuIDg4ICAgICA4OCAuZDg4ODhiLiBkUCAgIC5kUFxuIyBcdCA4OCAgIGA4Yi4gODgnICBgODggICA4OCAgICAgODggICA4OCcgIGA4OCA4OCdgODgnYDg4IDg4ICAgICA4OCA4OCcgIGA4OCA4OCAgIGQ4J1xuIyBcdCA4OCAgICAuODggODguICAuODggICA4OCAgICAgODggICA4OC4gIC44OCA4OCAgODggIDg4IDg4ICAgICA4OCA4OC4gIC44OCA4OCAuODgnXG4jIFx0IDg4ODg4ODg4UCBgODg4ODhQJyAgIGRQICAgICBkUCAgIGA4ODg4OFAnIGRQICBkUCAgZFAgZFAgICAgIGRQIGA4ODg4OFA4IDg4ODhQJ1xuXG5cblxuZXhwb3J0cy5Cb3R0b21OYXYgPSBjbGFzcyBCb3R0b21OYXYgZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblx0XHRcblx0XHRAX2Rlc3RpbmF0aW9ucyA9IG9wdGlvbnMuZGVzdGluYXRpb25zID8gdGhyb3cgJ05lZWRzIGF0IGxlYXN0IG9uZSBkZXN0aW5hdGlvbi4nXG5cdFx0QF9pdGVtcyA9IFtdXG5cdFx0QF9hY3RpdmVEZXN0aW5hdGlvbiA9IHVuZGVmaW5lZFxuXHRcdEBfaW5pdGlhbERlc3RpbmF0aW9uID0gb3B0aW9ucy5pbml0aWFsRGVzdGluYXRpb24gPyB1bmRlZmluZWRcblx0XHQjIGRlc3RpbmF0aW9uIHNob3VsZCBiZTogW3tuYW1lOiBzdHJpbmcsIGljb246IGljb25TdHJpbmcsIGFjdGlvbjogZnVuY3Rpb259XVxuXG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0bmFtZTogJ0JvdHRvbSBOYXYnXG5cdFx0XHR5OiBBbGlnbi5ib3R0b21cblx0XHRcdHdpZHRoOiBTY3JlZW4ud2lkdGgsIGhlaWdodDogNTZcblx0XHRcdGJhY2tncm91bmRDb2xvcjogdGhlbWUuYm90dG9tTmF2LmJhY2tncm91bmRDb2xvclxuXHRcdFx0c2hhZG93WTogdGhlbWUuYm90dG9tTmF2LnNoYWRvd1lcblx0XHRcdHNoYWRvd0JsdXI6IHRoZW1lLmJvdHRvbU5hdi5zaGFkb3dCbHVyXG5cdFx0XHRzaGFkb3dDb2xvcjogdGhlbWUuYm90dG9tTmF2LnNoYWRvd0NvbG9yXG5cblxuXHRcdGZvciBkZXN0aW5hdGlvbiwgaSBpbiBAX2Rlc3RpbmF0aW9uc1xuXHRcdFx0aXRlbSA9IG5ldyBMYXllclxuXHRcdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQFxuXHRcdFx0XHR4OiBAd2lkdGgvQF9kZXN0aW5hdGlvbnMubGVuZ3RoICogaVxuXHRcdFx0XHR3aWR0aDogQHdpZHRoL0BfZGVzdGluYXRpb25zLmxlbmd0aCwgaGVpZ2h0OiBAaGVpZ2h0XG5cdFx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXG5cdFx0XHRpdGVtLmRpc2sgPSBuZXcgTGF5ZXJcblx0XHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IGl0ZW1cblx0XHRcdFx0eDogQWxpZ24uY2VudGVyLCB5OiBBbGlnbi5jZW50ZXJcblx0XHRcdFx0aGVpZ2h0OiBAaGVpZ2h0LCB3aWR0aDogQGhlaWdodCwgYm9yZGVyUmFkaXVzOiBAaGVpZ2h0LzJcblx0XHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cblx0XHRcdGl0ZW0uaWNvbkxheWVyID0gbmV3IEljb25cblx0XHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IGl0ZW0uZGlza1xuXHRcdFx0XHR4OiBBbGlnbi5jZW50ZXIsIHk6IEFsaWduLmNlbnRlcigtOClcblx0XHRcdFx0aWNvbjogZGVzdGluYXRpb24uaWNvblxuXHRcdFx0XHRhbmltYXRpb25PcHRpb25zOiB7dGltZTogLjE1fVxuXG5cdFx0XHRpdGVtLmxhYmVsTGF5ZXIgPSBuZXcgdHlwZS5DYXB0aW9uXG5cdFx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBpdGVtLmRpc2tcblx0XHRcdFx0eDogQWxpZ24uY2VudGVyLCB5OiBBbGlnbi5jZW50ZXIoMTQpXG5cdFx0XHRcdHdpZHRoOiBAd2lkdGgsIHRleHRBbGlnbjogJ2NlbnRlcidcblx0XHRcdFx0dGV4dDogZGVzdGluYXRpb24udGl0bGVcblx0XHRcdFx0YW5pbWF0aW9uT3B0aW9uczoge3RpbWU6IC4xNX1cblxuXHRcdFx0aXRlbS5hY3Rpb24gPSBkZXN0aW5hdGlvbi5hY3Rpb25cblxuXHRcdFx0aXRlbS5kaXNrLm9uVG91Y2hTdGFydCAoZXZlbnQpIC0+IFxuXHRcdFx0XHRyaXBwbGUoQCwgZXZlbnQucG9pbnQsIEBwYXJlbnQuaWNvbkxheWVyLCBuZXcgQ29sb3IodGhlbWUucHJpbWFyeSkuYWxwaGEoLjUpKVxuXG5cdFx0XHRpdGVtLm9uVGFwIC0+IEBwYXJlbnQuYWN0aXZlRGVzdGluYXRpb24gPSBAXG5cblx0XHRcdEBfaXRlbXMucHVzaChpdGVtKVxuXG5cdFx0QGFjdGl2ZURlc3RpbmF0aW9uID0gQF9pbml0aWFsRGVzdGluYXRpb24gPyBAX2l0ZW1zWzBdXG5cblx0QGRlZmluZSBcImFjdGl2ZURlc3RpbmF0aW9uXCIsXG5cdFx0Z2V0OiAtPiByZXR1cm4gQF9hY3RpdmVEZXN0aW5hdGlvblxuXHRcdHNldDogKGRlc3RpbmF0aW9uKSAtPlxuXHRcdFx0cmV0dXJuIGlmIGRlc3RpbmF0aW9uIGlzIEBfYWN0aXZlRGVzdGluYXRpb25cblx0XHRcdEBfYWN0aXZlRGVzdGluYXRpb24gPSBkZXN0aW5hdGlvblxuXG5cdFx0XHRAX2FjdGl2ZURlc3RpbmF0aW9uLmFjdGlvbigpXG5cdFx0XHRAX2FjdGl2ZURlc3RpbmF0aW9uLmxhYmVsTGF5ZXIuYW5pbWF0ZSB7Y29sb3I6IHRoZW1lLnByaW1hcnksIG9wYWNpdHk6IDF9XG5cdFx0XHRAX2FjdGl2ZURlc3RpbmF0aW9uLmljb25MYXllci5jb2xvciA9IHRoZW1lLnByaW1hcnlcblx0XHRcdFxuXG5cdFx0XHRmb3Igc2liIGluIEBfYWN0aXZlRGVzdGluYXRpb24uc2libGluZ3Ncblx0XHRcdFx0c2liLmxhYmVsTGF5ZXIuYW5pbWF0ZSB7Y29sb3I6ICcjNzc3J31cblx0XHRcdFx0c2liLmljb25MYXllci5jb2xvciA9ICcjNzc3J1xuXG5cblxuXG5cbiMgIDg4ODg4OGJhICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuIyAgODggICAgYDhiICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4jIGE4OGFhYWE4UCcgLmQ4ODg4Yi4gLmQ4ODg4Yi4gLmQ4ODg4Yi5cbiMgIDg4ICAgICAgICA4OCcgIGA4OCA4OCcgIGA4OCA4OG9vb29kOFxuIyAgODggICAgICAgIDg4LiAgLjg4IDg4LiAgLjg4IDg4LiAgLi4uXG4jICBkUCAgICAgICAgYDg4ODg4UDggYDg4ODhQODggYDg4ODg4UCdcbiMgICAgICAgICAgICAgICAgICAgICAgICAgIC44OCAgICAgICAgIFxuIyAgICAgICAgICAgICAgICAgICAgICBkODg4OFAgICAgICAgICAgXG5cblxuXG5leHBvcnRzLlBhZ2UgPSBjbGFzcyBQYWdlIGV4dGVuZHMgU2Nyb2xsQ29tcG9uZW50XG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXHRcdFxuXHRcdEBfaGVhZGVyID0gb3B0aW9ucy5oZWFkZXIgPyB7dGl0bGU6ICdEZWZhdWx0JywgdmlzaWJsZTogdHJ1ZSwgaWNvbjogJ21lbnUnLCBpY29uQWN0aW9uOiAtPiByZXR1cm4gbnVsbH1cblx0XHRAX3RlbXBsYXRlID0gb3B0aW9ucy50ZW1wbGF0ZVxuXHRcdEBfdGVtcGxhdGVPcGFjaXR5ID0gb3B0aW9ucy50ZW1wbGF0ZU9wYWNpdHkgPyAuNVxuXHRcdEBfb25Mb2FkID0gb3B0aW9ucy5vbkxvYWQgPyAtPiBudWxsXG5cblx0XHRpZiBAX2hlYWRlci5pY29uQWN0aW9uIHRoZW4gQF9oZWFkZXIuaWNvbkFjdGlvbiA9IF8uYmluZChAX2hlYWRlci5pY29uQWN0aW9uLCBAKVxuXHRcdGlmIEBfb25Mb2FkIHRoZW4gQF9vbkxvYWQgPSBfLmJpbmQoQF9vbkxvYWQsIEApXG5cblxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdG5hbWU6ICdQYWdlJ1xuXHRcdFx0c2l6ZTogU2NyZWVuLnNpemVcblx0XHRcdHNjcm9sbEhvcml6b250YWw6IGZhbHNlXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IHRoZW1lLnBhZ2UucHJpbWFyeS5iYWNrZ3JvdW5kQ29sb3Jcblx0XHRcblx0XHRAY29udGVudEluc2V0ID1cblx0XHRcdHRvcDogMCwgYm90dG9tOiA1MDBcblxuXHRcdEBjb250ZW50LmJhY2tncm91bmRDb2xvciA9IG51bGxcblxuXHRcdGlmIEBfdGVtcGxhdGU/XG5cdFx0XHRAX3RlbXBsYXRlLnByb3BzID1cblx0XHRcdFx0cGFyZW50OiBAXG5cdFx0XHRcdG9wYWNpdHk6IEBfdGVtcGxhdGVPcGFjaXR5XG5cblx0XHRAc2VuZFRvQmFjaygpXG5cblxuXHR1cGRhdGU6IC0+IHJldHVybiBudWxsXG5cblxuXG5cblxuXG5cblxuIyAgODg4ODg4YmEgICAgICAgICAgICAgICAgICAgICAgZFAgICBkUCAgICAgICAgICAgICAgICAgICAgICBcbiMgIDg4ICAgIGA4YiAgICAgICAgICAgICAgICAgICAgIDg4ICAgODggICAgICAgICAgICAgICAgICAgICAgXG4jIGE4OGFhYWE4UCcgLmQ4ODg4Yi4gZFAgIGRQICBkUCA4OCBkODg4OFAgLmQ4ODg4Yi4gODhkOGIuZDhiLlxuIyAgODggICBgOGIuIDg4JyAgYDg4IDg4ICA4OCAgODggODggICA4OCAgIDg4b29vb2Q4IDg4J2A4OCdgODhcbiMgIDg4ICAgICA4OCA4OC4gIC44OCA4OC44OGIuODgnIDg4ICAgODggICA4OC4gIC4uLiA4OCAgODggIDg4XG4jICBkUCAgICAgZFAgYDg4ODg4UCcgODg4OFAgWThQICBkUCAgIGRQICAgYDg4ODg4UCcgZFAgIGRQICBkUFxuXG5cblxuZXhwb3J0cy5Sb3dJdGVtID0gY2xhc3MgUm93SXRlbSBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXG5cdFx0QF9pY29uID0gb3B0aW9ucy5pY29uXG5cdFx0QF9pY29uQmFja2dyb3VuZENvbG9yID0gb3B0aW9ucy5pY29uQmFja2dyb3VuZENvbG9yID8gJyM3NzcnXG5cdFx0QF90ZXh0ID0gb3B0aW9ucy50ZXh0ID8gJ1JvdyBpdGVtJ1xuXHRcdEBfcm93ID0gb3B0aW9ucy5yb3cgPyAwXG5cdFx0QF95ID0gMzIgKyAoQF9yb3cgKiA0OCkgXG5cblx0XHRzdXBlciBfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHR3aWR0aDogU2NyZWVuLndpZHRoXG5cdFx0XHR5OiBAX3lcblx0XHRcdGhlaWdodDogNDhcblx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXG5cdFx0QGljb24gPSBuZXcgTGF5ZXJcblx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBAXG5cdFx0XHR4OiAxNiwgeTogQWxpZ24uY2VudGVyXG5cdFx0XHRoZWlnaHQ6IDMyLCB3aWR0aDogMzIsIGJvcmRlclJhZGl1czogMTZcblx0XHRcdGJhY2tncm91bmRDb2xvcjogQF9pY29uQmFja2dyb3VuZENvbG9yXG5cdFx0XHRpbWFnZTogQF9pY29uXG5cblx0XHRAbGFiZWxMYXllciA9IG5ldyB0eXBlLlJlZ3VsYXJcblx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBAXG5cdFx0XHR4OiBAaWNvbi5tYXhYICsgMTYsIHk6IEFsaWduLmNlbnRlclxuXHRcdFx0Y29sb3I6IHRoZW1lLnRleHQudGV4dFxuXHRcdFx0dGV4dDogQF90ZXh0XG5cblxuXG5cblxuXG5cblxuIyBcdDg4ODhiYS44OGJhICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgODg4ODg4YmEgICAgICAgICAgICAgZFAgICAgIGRQXG4jIFx0ODggIGA4YiAgYDhiICAgICAgICAgICAgICAgICAgICAgICAgICAgICA4OCAgICBgOGIgICAgICAgICAgICA4OCAgICAgODhcbiMgXHQ4OCAgIDg4ICAgODggLmQ4ODg4Yi4gODhkODg4Yi4gZFAgICAgZFAgYTg4YWFhYThQJyBkUCAgICBkUCBkODg4OFAgZDg4ODhQIC5kODg4OGIuIDg4ZDg4OGIuXG4jIFx0ODggICA4OCAgIDg4IDg4b29vb2Q4IDg4JyAgYDg4IDg4ICAgIDg4ICA4OCAgIGA4Yi4gODggICAgODggICA4OCAgICAgODggICA4OCcgIGA4OCA4OCcgIGA4OFxuIyBcdDg4ICAgODggICA4OCA4OC4gIC4uLiA4OCAgICA4OCA4OC4gIC44OCAgODggICAgLjg4IDg4LiAgLjg4ICAgODggICAgIDg4ICAgODguICAuODggODggICAgODhcbiMgXHRkUCAgIGRQICAgZFAgYDg4ODg4UCcgZFAgICAgZFAgYDg4ODg4UCcgIDg4ODg4ODg4UCBgODg4ODhQJyAgIGRQICAgICBkUCAgIGA4ODg4OFAnIGRQICAgIGRQXG5cblxuXG5jbGFzcyBNZW51QnV0dG9uIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cdFx0XG5cdFx0QF9pY29uID0gb3B0aW9ucy5pY29uID8gJ2hvbWUnXG5cdFx0QF90ZXh0ID0gb3B0aW9ucy50ZXh0ID8gJ0RlZmF1bHQnXG5cdFx0QF9hY3Rpb24gPSBvcHRpb25zLmFjdGlvbiA/IC0+IG51bGxcblxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdGhlaWdodDogNDgsIHdpZHRoOiAzMDRcblx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXG5cdFx0QGljb25MYXllciA9IG5ldyBJY29uXG5cdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQFxuXHRcdFx0eTogQWxpZ24uY2VudGVyXG5cdFx0XHRpY29uOiBAX2ljb24sIGNvbG9yOiB0aGVtZS5tZW51T3ZlcmxheS50ZXh0XG5cblx0XHRAbGFiZWxMYXllciA9IG5ldyB0eXBlLlJlZ3VsYXJcblx0XHRcdG5hbWU6ICdsYWJlbCcsIHBhcmVudDogQFxuXHRcdFx0eDogQGljb25MYXllci5tYXhYICsgMTZcblx0XHRcdHk6IEFsaWduLmNlbnRlcigpXG5cdFx0XHRjb2xvcjogdGhlbWUubWVudU92ZXJsYXkudGV4dFxuXHRcdFx0dGV4dDogQF90ZXh0XG5cblx0XHRAb25UYXAgQF9hY3Rpb25cblx0XHRAb25UYXAgLT4gXG5cdFx0XHRVdGlscy5kZWxheSAuMjUsID0+IEBwYXJlbnQuaGlkZSgpXG5cblxuXG5cblxuXG5cblxuIyBcdDg4ODhiYS44OGJhICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLjg4ODg4LiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZFAgICAgICAgICAgICAgICAgICBcbiMgXHQ4OCAgYDhiICBgOGIgICAgICAgICAgICAgICAgICAgICAgICAgICAgZDgnICAgYDhiICAgICAgICAgICAgICAgICAgICAgICAgICAgIDg4ICAgICAgICAgICAgICAgICAgXG4jIFx0ODggICA4OCAgIDg4IC5kODg4OGIuIDg4ZDg4OGIuIGRQICAgIGRQIDg4ICAgICA4OCBkUCAgIC5kUCAuZDg4ODhiLiA4OGQ4ODhiLiA4OCAuZDg4ODhiLiBkUCAgICBkUFxuIyBcdDg4ICAgODggICA4OCA4OG9vb29kOCA4OCcgIGA4OCA4OCAgICA4OCA4OCAgICAgODggODggICBkOCcgODhvb29vZDggODgnICBgODggODggODgnICBgODggODggICAgODhcbiMgXHQ4OCAgIDg4ICAgODggODguICAuLi4gODggICAgODggODguICAuODggWTguICAgLjhQIDg4IC44OCcgIDg4LiAgLi4uIDg4ICAgICAgIDg4IDg4LiAgLjg4IDg4LiAgLjg4XG4jIFx0ZFAgICBkUCAgIGRQIGA4ODg4OFAnIGRQICAgIGRQIGA4ODg4OFAnICBgODg4OFAnICA4ODg4UCcgICBgODg4ODhQJyBkUCAgICAgICBkUCBgODg4ODhQOCBgODg4OFA4OFxuIyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLjg4XG4jICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGQ4ODg4UCBcblxuXG5cbmV4cG9ydHMuTWVudU92ZXJsYXkgPSBjbGFzcyBNZW51T3ZlcmxheSBleHRlbmRzIExheWVyXG5cdFxuXHRcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cblx0XHRAX2xpbmtzID0gb3B0aW9ucy5saW5rcyA/IFt7dGl0bGU6ICdIb21lJywgaWNvbjogJ2hvbWUnLCBhY3Rpb246IC0+IG51bGx9XVxuXHRcdEBfdGl0bGUgPSBvcHRpb25zLnRpdGxlID8gJ01lbnUnXG5cdFx0QF9pbWFnZSA9IG9wdGlvbnMuaW1hZ2UgPyBudWxsXG5cblxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdGhlaWdodDogU2NyZWVuLmhlaWdodFxuXHRcdFx0d2lkdGg6IDMwNFxuXHRcdFx0aGVpZ2h0OiBTY3JlZW4uaGVpZ2h0XG5cdFx0XHR2aXNpYmxlOiBmYWxzZVxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiB0aGVtZS5tZW51T3ZlcmxheS5iYWNrZ3JvdW5kQ29sb3Jcblx0XHRcdGFuaW1hdGlvbk9wdGlvbnM6IHtjdXJ2ZTogXCJzcHJpbmcoMzAwLCAzNSwgMClcIn1cblxuXG5cdFx0QHNjcmltID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiAnLicsIFxuXHRcdFx0c2l6ZTogU2NyZWVuLnNpemVcblx0XHRcdGJhY2tncm91bmRDb2xvcjogJ3JnYmEoMCwwLDAsLjYpJ1xuXHRcdFx0b3BhY2l0eTogMFxuXHRcdFx0dmlzaWJsZTogZmFsc2Vcblx0XHRcdGFuaW1hdGlvbk9wdGlvbnM6XG5cdFx0XHRcdHRpbWU6IC4yNVxuXG5cdFx0QHNjcmltLm9uVGFwID0+IEBoaWRlKClcblx0XHRAb25Td2lwZUxlZnRFbmQgPT4gQGhpZGUoKVxuXG5cdFx0QGhlYWRlciA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEBcblx0XHRcdHdpZHRoOiBAd2lkdGgsIGhlaWdodDogMTczXG5cdFx0XHRpbWFnZTogdGhlbWUudXNlci5pbWFnZVxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiB0aGVtZS5tZW51T3ZlcmxheS5oZWFkZXIuYmFja2dyb3VuZENvbG9yXG5cblx0XHRAdGl0bGVJY29uID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQGhlYWRlclxuXHRcdFx0eDogMTYsIHk6IDQwXG5cdFx0XHRoZWlnaHQ6IDY0LCB3aWR0aDogNjRcblx0XHRcdGJvcmRlclJhZGl1czogMzJcblx0XHRcdGJhY2tncm91bmRDb2xvcjogdGhlbWUubWVudU92ZXJsYXkuaGVhZGVyLmljb25cblxuXHRcdEB0aXRsZUV4cGFuZCA9IG5ldyBJY29uXG5cdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQGhlYWRlclxuXHRcdFx0eDogQWxpZ24ucmlnaHQoLTE2KVxuXHRcdFx0eTogQWxpZ24uYm90dG9tKC0xMylcblx0XHRcdGljb246ICdtZW51LWRvd24nXG5cdFx0XHRjb2xvcjogdGhlbWUubWVudU92ZXJsYXkudGV4dFxuXG5cdFx0QHRpdGxlID0gbmV3IHR5cGUuQm9keTFcblx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBAaGVhZGVyXG5cdFx0XHR3aWR0aDogQHdpZHRoXG5cdFx0XHR4OiAxNiwgeTogQWxpZ24uYm90dG9tKC0xOClcblx0XHRcdHRleHQ6IEBfdGl0bGVcblxuXHRcdGxpbmtzID0gW11cblxuXHRcdGZvciBsaW5rLCBpIGluIEBfbGlua3Ncblx0XHRcdGxpbmtzW2ldID0gbmV3IE1lbnVCdXR0b25cblx0XHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEBcblx0XHRcdFx0eDogMTYsIHk6IDE4OSArICg0OCAqIGkpXG5cdFx0XHRcdHRleHQ6IGxpbmsudGl0bGVcblx0XHRcdFx0aWNvbjogbGluay5pY29uXG5cdFx0XHRcdGFjdGlvbjogbGluay5hY3Rpb25cblxuXHRzaG93OiAtPlxuXHRcdEBicmluZ1RvRnJvbnQoKVxuXHRcdEB2aXNpYmxlID0gdHJ1ZVxuXHRcdEB4ID0gLVNjcmVlbi53aWR0aFxuXHRcdEBhbmltYXRlXG5cdFx0XHR4OiAwXG5cblx0XHRAc2NyaW0ucGxhY2VCZWhpbmQoQClcblx0XHRAc2NyaW0udmlzaWJsZSA9IHRydWVcblx0XHRAc2NyaW0uYW5pbWF0ZVxuXHRcdFx0b3BhY2l0eTogMVxuXG5cdGhpZGU6IC0+XG5cdFx0QGFuaW1hdGVcblx0XHRcdHg6IC1TY3JlZW4ud2lkdGhcblxuXHRcdEBzY3JpbS5hbmltYXRlXG5cdFx0XHRvcGFjaXR5OiAwXG5cblx0XHRVdGlscy5kZWxheSAuMywgPT5cblx0XHRcdEB2aXNpYmxlID0gZmFsc2Vcblx0XHRcdEBzY3JpbS52aXNpYmxlID0gZmFsc2Vcblx0XHRcdEBzZW5kVG9CYWNrKClcblx0XHRcdEBzY3JpbS5zZW5kVG9CYWNrKClcblxuXG5cblxuXG5cblxuXG4jIFx0ODg4ODg4YmEgIG9vICAgICAgICAgIGRQXG4jIFx0ODggICAgYDhiICAgICAgICAgICAgIDg4XG4jIFx0ODggICAgIDg4IGRQIC5kODg4OGIuIDg4IC5kODg4OGIuIC5kODg4OGIuXG4jIFx0ODggICAgIDg4IDg4IDg4JyAgYDg4IDg4IDg4JyAgYDg4IDg4JyAgYDg4XG4jIFx0ODggICAgLjhQIDg4IDg4LiAgLjg4IDg4IDg4LiAgLjg4IDg4LiAgLjg4XG4jIFx0ODg4ODg4OFAgIGRQIGA4ODg4OFA4IGRQIGA4ODg4OFAnIGA4ODg4UDg4XG4jIFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLjg4XG4jIFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkODg4OFBcblxuXG5cbmV4cG9ydHMuRGlhbG9nID0gY2xhc3MgRGlhbG9nIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cblx0XHRzdXBlciBfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRuYW1lOiAnLicsIHNpemU6IFNjcmVlbi5zaXplLCBjb2xvcjogdGhlbWUudGludFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiAncmdiYSgwLCAwLCAwLCAuNSknXG5cdFx0XHRvcGFjaXR5OiAwXG5cdFx0XHRcblx0XHRAX3RpdGxlID0gb3B0aW9ucy50aXRsZSA/ICdEZWZhdWx0IFRpdGxlJ1xuXHRcdEBfYm9keSA9IG9wdGlvbnMuYm9keSA/ICdCb2R5IHRleHQgZ29lcyBoZXJlLidcblx0XHRAX2FjY2VwdFRleHQgPSBvcHRpb25zLmFjY2VwdFRleHQgPyAnY29uZmlybSdcblx0XHRAX2FjY2VwdEFjdGlvbiA9IG9wdGlvbnMuYWNjZXB0QWN0aW9uID8gLT4gbnVsbFxuXHRcdEBfZGVjbGluZVRleHQgPSBvcHRpb25zLmRlY2xpbmVUZXh0ID8gJydcblx0XHRAX2RlY2xpbmVBY3Rpb24gPSBvcHRpb25zLmRlY2xpbmVBY3Rpb24gPyAtPiBudWxsXG5cdFx0XG5cdFx0QG9uIEV2ZW50cy5UYXAsIChldmVudCkgLT4gZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcblx0XHRcblx0XHRAY29udGFpbmVyID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiAnY29udGFpbmVyJywgcGFyZW50OiBAXG5cdFx0XHR4OiBBbGlnbi5jZW50ZXJcblx0XHRcdGhlaWdodDogMTI4LCB3aWR0aDogU2NyZWVuLndpZHRoIC0gODBcblx0XHRcdGJhY2tncm91bmRDb2xvcjogdGhlbWUuZGlhbG9nLmJhY2tncm91bmRDb2xvclxuXHRcdFx0c2hhZG93WDogMCwgc2hhZG93WTogNywgc2hhZG93Qmx1cjogMzBcblx0XHRcdG9wYWNpdHk6IDBcblx0XHRcdHNoYWRvd0NvbG9yOiAncmdiYSgwLDAsMCwuMyknXG5cdFx0XG5cdFx0QHRpdGxlID0gbmV3IHR5cGUuVGl0bGVcblx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBAY29udGFpbmVyXG5cdFx0XHR4OiAyNCwgeTogMjBcblx0XHRcdGZvbnRTaXplOiAxNiwgZm9udFdlaWdodDogNTAwLCBjb2xvcjogdGhlbWUudGV4dC50aXRsZVxuXHRcdFx0dGV4dDogQF90aXRsZVxuXHRcdFxuXHRcdEBib2R5ID0gbmV3IHR5cGUuU3ViaGVhZFNlY29uZGFyeVxuXHRcdFx0bmFtZTogJ2JvZHknLCBwYXJlbnQ6IEBjb250YWluZXJcblx0XHRcdHg6IDI0LCB5OiA1MlxuXHRcdFx0d2lkdGg6IEBjb250YWluZXIud2lkdGggLSA0MlxuXHRcdFx0dGV4dDogQF9ib2R5XG5cdFx0XG5cdFx0YnV0dG9uc1kgPSBpZiBAX2JvZHkgaXMgJycgdGhlbiAxMjggZWxzZSBAYm9keS5tYXhZICsgMTZcblx0XHRcblx0XHRAYWNjZXB0ID0gbmV3IEJ1dHRvblxuXHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEBjb250YWluZXJcblx0XHRcdHg6IEFsaWduLnJpZ2h0KC0xNiksIHk6IGJ1dHRvbnNZXG5cdFx0XHR0ZXh0OiBAX2FjY2VwdFRleHQudG9VcHBlckNhc2UoKVxuXHRcdFx0YWN0aW9uOiBAX2FjY2VwdEFjdGlvblxuXHRcdFxuXHRcdGlmIEBfZGVjbGluZVRleHQgaXNudCAnJ1xuXHRcdFx0QGRlY2xpbmUgPSBuZXcgQnV0dG9uXG5cdFx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBAY29udGFpbmVyXG5cdFx0XHRcdHg6IDAsIHk6IGJ1dHRvbnNZXG5cdFx0XHRcdHRleHQ6IEBfZGVjbGluZVRleHQudG9VcHBlckNhc2UoKVxuXHRcdFx0XHRhY3Rpb246IEBfZGVjbGluZUFjdGlvblxuXG5cdFx0IyBzZXQgcG9zaXRpb25zXG5cdFx0QGNvbnRhaW5lci5oZWlnaHQgPSBAYWNjZXB0Lm1heFkgKyAxMlxuXHRcdEBkZWNsaW5lPy5tYXhYID0gQGFjY2VwdC54IC0gMTZcblx0XHRAY29udGFpbmVyLnkgPSBBbGlnbi5jZW50ZXIoMTYpXG5cdFx0XG5cdFx0IyBhZGQgY2xvc2UgYWN0aW9ucyB0byBjb25maXJtIGFuZCBjYW5jZWxcblx0XHRmb3IgYnV0dG9uIGluIFtAYWNjZXB0LCBAZGVjbGluZV1cblx0XHRcdGJ1dHRvbj8ub25UYXAgQGNsb3NlXG5cdFx0XG5cdFx0IyBPTiBMT0FEXG5cdFx0QG9wZW4oKVxuXHRcblx0b3BlbjogPT5cblx0XHRAYW5pbWF0ZVxuXHRcdFx0b3BhY2l0eTogMVxuXHRcdFx0b3B0aW9uczogXG5cdFx0XHRcdHRpbWU6IC4yNVxuXHRcdFxuXHRcdEBjb250YWluZXIuYW5pbWF0ZVxuXHRcdFx0b3BhY2l0eTogMVxuXHRcdFx0b3B0aW9uczpcblx0XHRcdFx0dGltZTogLjI1XG5cdFx0XHRcdGRlbGF5OiAuMDVcblxuXHRjbG9zZTogPT5cblx0XHRAY29udGFpbmVyLmFuaW1hdGVcblx0XHRcdG9wYWNpdHk6IDBcblx0XHRcdG9wdGlvbnM6XG5cdFx0XHRcdHRpbWU6IC4yNVxuXHRcdFxuXHRcdEBhbmltYXRlXG5cdFx0XHRvcGFjaXR5OiAwXG5cdFx0XHRvcHRpb25zOlxuXHRcdFx0XHR0aW1lOiAuMjVcblx0XHRcblx0XHRVdGlscy5kZWxheSAuNSwgPT4gQGRlc3Ryb3koKVxuXG5cblxuXG5cblxuXG5cbiMgXHQgODg4ODg4YmEgICAgICAgICAgICAgZFAgICAgIGRQXG4jIFx0IDg4ICAgIGA4YiAgICAgICAgICAgIDg4ICAgICA4OFxuIyBcdGE4OGFhYWE4UCcgZFAgICAgZFAgZDg4ODhQIGQ4ODg4UCAuZDg4ODhiLiA4OGQ4ODhiLlxuIyBcdCA4OCAgIGA4Yi4gODggICAgODggICA4OCAgICAgODggICA4OCcgIGA4OCA4OCcgIGA4OFxuIyBcdCA4OCAgICAuODggODguICAuODggICA4OCAgICAgODggICA4OC4gIC44OCA4OCAgICA4OFxuIyBcdCA4ODg4ODg4OFAgYDg4ODg4UCcgICBkUCAgICAgZFAgICBgODg4ODhQJyBkUCAgICBkUFxuXG5cblxuZXhwb3J0cy5CdXR0b24gPSBCdXR0b24gPSBjbGFzcyBCdXR0b24gZXh0ZW5kcyBMYXllciBcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cblx0XHRAX3JhaXNlZCA9IG9wdGlvbnMucmFpc2VkID8gZmFsc2Vcblx0XHRAX3R5cGUgPSBpZiBAX3JhaXNlZCB0aGVuICdyYWlzZWQnIGVsc2UgJ2ZsYXQnXG5cdFx0QF9hY3Rpb24gPSBvcHRpb25zLmFjdGlvbiA/IC0+IG51bGxcblxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdG5hbWU6ICcuJ1xuXHRcdFx0d2lkdGg6IDAsIGhlaWdodDogMzZcblx0XHRcdGJvcmRlclJhZGl1czogMlxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiB0aGVtZS5idXR0b25bQF90eXBlXS5iYWNrZ3JvdW5kQ29sb3Jcblx0XHRcdHNoYWRvd1k6IHRoZW1lLmJ1dHRvbltAX3R5cGVdLnNoYWRvd1lcblx0XHRcdHNoYWRvd0JsdXI6IHRoZW1lLmJ1dHRvbltAX3R5cGVdLnNoYWRvd0JsdXJcblx0XHRcdHNoYWRvd0NvbG9yOiB0aGVtZS5idXR0b25bQF90eXBlXS5zaGFkb3dDb2xvclxuXHRcdFx0YW5pbWF0aW9uT3B0aW9uczoge3RpbWU6IC4xNX1cblxuXHRcdEBsYWJlbExheWVyID0gbmV3IHR5cGUuQnV0dG9uXG5cdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQFxuXHRcdFx0Y29sb3I6IHRoZW1lLmJ1dHRvbltAX3R5cGVdLmNvbG9yXG5cdFx0XHR0ZXh0OiBvcHRpb25zLnRleHQgPyAnYnV0dG9uJ1xuXHRcdFx0dGV4dFRyYW5zZm9ybTogJ3VwcGVyY2FzZSdcblx0XHRcdHRleHRBbGlnbjogJ2NlbnRlcidcblx0XHRcdGFuaW1hdGlvbk9wdGlvbnM6IHt0aW1lOiAuMTV9XG5cdFx0XHRwYWRkaW5nOiBcblx0XHRcdFx0bGVmdDogMTYuNSwgcmlnaHQ6IDE2LjVcblx0XHRcdFx0dG9wOiA5LCBib3R0b206IDExXG5cblx0XHRAc2l6ZSA9IEBsYWJlbExheWVyLnNpemVcblx0XHRAeCA9IG9wdGlvbnMueFxuXG5cdFx0QG9uVG91Y2hTdGFydCAoZXZlbnQpIC0+IFxuXHRcdFx0QHNob3dUb3VjaGVkKClcblx0XHRcdFV0aWxzLmRlbGF5IDEsID0+IEByZXNldCgpXG5cdFx0XG5cdFx0QG9uVG91Y2hFbmQgKGV2ZW50KSAtPiBcblx0XHRcdEBfYWN0aW9uKClcblx0XHRcdEByZXNldCgpXG5cblxuXHRzaG93VG91Y2hlZDogLT4gXG5cdFx0QGxhYmVsTGF5ZXIuYW5pbWF0ZSB7YnJpZ2h0bmVzczogMTEwLCBzYXR1cmF0ZTogMTEwfVxuXHRcdFxuXHRcdHN3aXRjaCBAX3R5cGVcblx0XHRcdHdoZW4gJ2ZsYXQnIHRoZW4gQGFuaW1hdGUge2JhY2tncm91bmRDb2xvcjogJ3JnYmEoMCwwLDAsLjA1KSd9XG5cdFx0XHR3aGVuICdyYWlzZWQnXG5cdFx0XHRcdHJpcHBsZShALCBldmVudC5wb2ludCwgQGxhYmVsTGF5ZXIpXG5cdFx0XHRcdEBhbmltYXRlIHtzaGFkb3dZOiAzLCBzaGFkb3dTcHJlYWQ6IDF9XG5cblx0cmVzZXQ6IC0+XG5cdFx0QGxhYmVsTGF5ZXIuYW5pbWF0ZSB7YnJpZ2h0bmVzczogMTAwLCBzYXR1cmF0ZTogMTAwfVxuXHRcdEBiYWNrZ3JvdW5kQ29sb3IgPSB0aGVtZS5idXR0b25bQF90eXBlXS5iYWNrZ3JvdW5kQ29sb3Jcblx0XHRAYW5pbWF0ZSBcblx0XHRcdHNoYWRvd1k6IHRoZW1lLmJ1dHRvbltAX3R5cGVdLnNoYWRvd1lcblx0XHRcdHNoYWRvd1NwcmVhZDogMFxuXG5cblxuXG5cblxuXG5cbiMgXHQgODg4ODg4ODhiICAgICAgICAgIGRQXG4jIFx0IDg4ICAgICAgICAgICAgICAgICA4OFxuIyBcdGE4OGFhYWEgICAgLmQ4ODg4Yi4gODhkODg4Yi5cbiMgXHQgODggICAgICAgIDg4JyAgYDg4IDg4JyAgYDg4XG4jIFx0IDg4ICAgICAgICA4OC4gIC44OCA4OC4gIC44OFxuIyBcdCBkUCAgICAgICAgYDg4ODg4UDggODhZODg4OCdcblxuXG5cbmV4cG9ydHMuRmFiID0gRmFiID0gY2xhc3MgRmFiIGV4dGVuZHMgTGF5ZXIgXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXG5cdFx0QF9yYWlzZWQgPSBvcHRpb25zLnJhaXNlZCA/IGZhbHNlXG5cdFx0QF9hY3Rpb24gPSBvcHRpb25zLmFjdGlvbiA/IC0+IG51bGxcblx0XHRAX2ljb24gPSBvcHRpb25zLmljb24gPyAncGx1cydcblxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdG5hbWU6ICcuJ1xuXHRcdFx0eDogQWxpZ24ucmlnaHQoLTE2KSwgeTogQWxpZ24uYm90dG9tKC02Nilcblx0XHRcdHdpZHRoOiA2NCwgaGVpZ2h0OiA2NCwgYm9yZGVyUmFkaXVzOiAzMlxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiB0aGVtZS5mYWIuYmFja2dyb3VuZENvbG9yXG5cdFx0XHRzaGFkb3dZOiAyLCBzaGFkb3dCbHVyOiAzXG5cdFx0XHRzaGFkb3dDb2xvcjogJ3JnYmEoMCwwLDAsLjI1KSdcblx0XHRcdGFuaW1hdGlvbk9wdGlvbnM6IHt0aW1lOiAuMTV9XG5cblx0XHRpZiBhcHAuYm90dG9tTmF2PyB0aGVuIEB5IC09IGFwcC5ib3R0b21OYXYuaGVpZ2h0XG5cblx0XHRAaWNvbkxheWVyID0gbmV3IEljb25cblx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBAXG5cdFx0XHR4OiBBbGlnbi5jZW50ZXIsIHk6IEFsaWduLmNlbnRlclxuXHRcdFx0aWNvbjogQF9pY29uLCBjb2xvcjogdGhlbWUuZmFiLmNvbG9yXG5cblx0XHRAb25Ub3VjaFN0YXJ0IChldmVudCkgLT4gXG5cdFx0XHRAc2hvd1RvdWNoZWQoKVxuXHRcdFx0VXRpbHMuZGVsYXkgMSwgPT4gQHJlc2V0KClcblx0XHRcblx0XHRAb25Ub3VjaEVuZCAoZXZlbnQpIC0+IFxuXHRcdFx0QF9hY3Rpb24oKVxuXHRcdFx0QHJlc2V0KClcblxuXG5cdHNob3dUb3VjaGVkOiAtPiBcblx0XHRyaXBwbGUoQCwgZXZlbnQucG9pbnQsIEBpY29uTGF5ZXIpXG5cdFx0QGFuaW1hdGUge3NoYWRvd1k6IDMsIHNoYWRvd1NwcmVhZDogMX1cblxuXHRyZXNldDogLT5cblx0XHRAYW5pbWF0ZSBcblx0XHRcdHNoYWRvd1k6IDJcblx0XHRcdHNoYWRvd1NwcmVhZDogMFxuXG5leHBvcnRzLkFwcCA9IGFwcCA9IG5ldyBBcHBcblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuIiwiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFJQUE7QURBQSxJQUFBLDROQUFBO0VBQUE7Ozs7QUFBQyxTQUFVLE9BQUEsQ0FBUSxRQUFSOztBQUNWLFFBQVMsT0FBQSxDQUFRLE9BQVI7O0FBQ1YsSUFBQSxHQUFPLE9BQUEsQ0FBUSxNQUFSOztBQUNQLEtBQUEsR0FBUSxJQUFJLENBQUMsS0FBTCxDQUFXLEtBQUssQ0FBQyxlQUFOLENBQXNCLG9CQUF0QixDQUFYOztBQVdSLE9BQU8sQ0FBQyxLQUFSLEdBQWdCOztBQUNoQixPQUFPLENBQUMsS0FBUixHQUFnQixLQUFBLEdBQVEsSUFBSSxDQUFDOztBQUM3QixPQUFPLENBQUMsUUFBUixHQUFtQixRQUFBLEdBQVcsSUFB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
