require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"md-components/ActionButton":[function(require,module,exports){
var ActionButton, Icon, MenuButton, Ripple, Theme, Type,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Type = require('md-components/Type');

Ripple = require('md-components/Ripple').Ripple;

Icon = require('md-components/Icon').Icon;

Theme = require('md-components/Theme').Theme;

MenuButton = require('md-components/MenuButton').MenuButton;

exports.ActionButton = ActionButton = (function(superClass) {
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
    this._app = options.app;
    ActionButton.__super__.constructor.call(this, _.defaults(options, {
      name: '.',
      x: Align.right(-16),
      y: Align.bottom(-17),
      width: 64,
      height: 64,
      borderRadius: 32,
      backgroundColor: Theme.fab.backgroundColor,
      shadowY: 2,
      shadowBlur: 3,
      shadowColor: 'rgba(0,0,0,.25)',
      animationOptions: {
        time: .15
      }
    }));
    if (this._app != null) {
      if (this._app.bottomNav != null) {
        this.y -= this._app.bottomNav.height;
      }
      this._app.actionButton = this;
    }
    this.iconLayer = new Icon({
      name: '.',
      parent: this,
      x: Align.center,
      y: Align.center,
      icon: this._icon,
      color: Theme.fab.color
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

  ActionButton.prototype.showTouched = function() {
    Ripple(this, event.point, this.iconLayer);
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


},{"md-components/Icon":"md-components/Icon","md-components/MenuButton":"md-components/MenuButton","md-components/Ripple":"md-components/Ripple","md-components/Theme":"md-components/Theme","md-components/Type":"md-components/Type"}],"md-components/App":[function(require,module,exports){
var App, BottomNav, Header, MenuOverlay, Theme,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Theme = require('md-components/Theme').Theme;

Header = require('md-components/Header').Header;

BottomNav = require('md-components/BottomNav').BottomNav;

MenuOverlay = require('md-components/MenuOverlay').MenuOverlay;

exports.App = App = (function(superClass) {
  extend(App, superClass);

  function App(options) {
    var i, j, len, ref, ref1, ref2, ref3, ref4, ref5, ref6, view;
    if (options == null) {
      options = {};
    }
    this._bottomNav = (ref = options.bottomNav) != null ? ref : void 0;
    this._menuOverlay = (ref1 = options.menuOverlay) != null ? ref1 : void 0;
    this.Theme = Theme;
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
    this.header = new Header({
      Theme: Theme,
      index: 999
    });
    this.footer = new Layer({
      name: 'Footer',
      width: Screen.width,
      height: 48,
      image: Theme.footer.image,
      index: 999,
      y: Align.bottom()
    });
    if (this._bottomNav) {
      this.bottomNav = new BottomNav({
        name: 'Bottom Nav',
        destinations: (ref3 = this._bottomNav.links) != null ? ref3 : "BottomNav needs an array of links. Example: [{title: 'Home', icon: 'home', action: -> view.linkTo(home)}]",
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
            throw 'MenuOverlay needs a title.';
          }
        }).call(this),
        links: (function() {
          if ((ref5 = this._menuOverlay.links) != null) {
            return ref5;
          } else {
            throw "MenuOverlay needs an array of links. Example: [{title: 'Home', icon: 'home', action: -> view.linkTo(home)}]";
          }
        }).call(this)
      });
    }
    this.keyboard = new Layer({
      name: 'Keyboard',
      y: this.maxY,
      image: Theme.keyboard.image,
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


},{"md-components/BottomNav":"md-components/BottomNav","md-components/Header":"md-components/Header","md-components/MenuOverlay":"md-components/MenuOverlay","md-components/Theme":"md-components/Theme"}],"md-components/BottomNav":[function(require,module,exports){
var BottomNav, Icon, Ripple, Theme, Type,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Type = require('md-components/Type');

Ripple = require('md-components/Ripple').Ripple;

Icon = require('md-components/Icon').Icon;

Theme = require('md-components/Theme').Theme;

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
    this._app = options.app;
    BottomNav.__super__.constructor.call(this, _.defaults(options, {
      name: 'Bottom Nav',
      y: Align.bottom,
      width: Screen.width,
      height: 56,
      backgroundColor: Theme.bottomNav.backgroundColor,
      shadowY: Theme.bottomNav.shadowY,
      shadowBlur: Theme.bottomNav.shadowBlur,
      shadowColor: Theme.bottomNav.shadowColor,
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
      item.labelLayer = new Type.Caption({
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
        return Ripple(this, event.point, this.parent.iconLayer, new Color(Theme.primary).alpha(.3));
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
      color: Theme.primary,
      opacity: 1
    });
    item.iconLayer.color = Theme.primary;
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


},{"md-components/Icon":"md-components/Icon","md-components/Ripple":"md-components/Ripple","md-components/Theme":"md-components/Theme","md-components/Type":"md-components/Type"}],"md-components/Button":[function(require,module,exports){
var Button, Icon, Ripple, Theme, Type,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Type = require('md-components/Type');

Ripple = require('md-components/Ripple').Ripple;

Icon = require('md-components/Icon').Icon;

Theme = require('md-components/Theme').Theme;

exports.Button = Button = (function(superClass) {
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
      backgroundColor: Theme.button[this._type].backgroundColor,
      shadowY: Theme.button[this._type].shadowY,
      shadowBlur: Theme.button[this._type].shadowBlur,
      shadowColor: Theme.button[this._type].shadowColor,
      animationOptions: {
        time: .15
      }
    }));
    this.labelLayer = new Type.Button({
      name: '.',
      parent: this,
      color: Theme.button[this._type].color,
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
        Ripple(this, event.point, this.labelLayer);
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
    this.backgroundColor = Theme.button[this._type].backgroundColor;
    return this.animate({
      shadowY: Theme.button[this._type].shadowY,
      shadowSpread: 0
    });
  };

  return Button;

})(Layer);


},{"md-components/Icon":"md-components/Icon","md-components/Ripple":"md-components/Ripple","md-components/Theme":"md-components/Theme","md-components/Type":"md-components/Type"}],"md-components/Checkbox":[function(require,module,exports){
var CheckBox, Checkbox, Icon, Ripple, Theme, Type,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Type = require('md-components/Type');

Ripple = require('md-components/Ripple').Ripple;

Icon = require('md-components/Icon').Icon;

Theme = require('md-components/Theme').Theme;

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
      return this.color = Theme.colors.primary.main;
    } else {
      this.icon = 'checkbox-blank-outline';
      return this.color = 'rgba(0,0,0,.54)';
    }
  };

  return Checkbox;

})(Icon);


},{"md-components/Icon":"md-components/Icon","md-components/Ripple":"md-components/Ripple","md-components/Theme":"md-components/Theme","md-components/Type":"md-components/Type"}],"md-components/Dialog":[function(require,module,exports){
var Button, Dialog, Icon, Ripple, Theme, Type,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Type = require('md-components/Type');

Ripple = require('md-components/Ripple').Ripple;

Icon = require('md-components/Icon').Icon;

Theme = require('md-components/Theme').Theme;

Button = require('md-components/Button').Button;

exports.Dialog = Dialog = (function(superClass) {
  extend(Dialog, superClass);

  function Dialog(options) {
    var button, buttonsY, i, len, ref, ref1, ref2, ref3, ref4, ref5, ref6, ref7;
    if (options == null) {
      options = {};
    }
    this.close = bind(this.close, this);
    this.open = bind(this.open, this);
    Dialog.__super__.constructor.call(this, _.defaults(options, {
      name: '.',
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
      backgroundColor: Theme.dialog.backgroundColor,
      shadowX: 0,
      shadowY: 7,
      shadowBlur: 30,
      opacity: 0,
      shadowColor: 'rgba(0,0,0,.3)'
    });
    this.title = new Type.Title({
      name: '.',
      parent: this.container,
      x: 24,
      y: 20,
      fontSize: 16,
      fontWeight: 500,
      color: Theme.text.title,
      text: this._title
    });
    this.body = new Type.Subhead({
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
    for (i = 0, len = ref7.length; i < len; i++) {
      button = ref7[i];
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


},{"md-components/Button":"md-components/Button","md-components/Icon":"md-components/Icon","md-components/Ripple":"md-components/Ripple","md-components/Theme":"md-components/Theme","md-components/Type":"md-components/Type"}],"md-components/Divider":[function(require,module,exports){
var Divider, Theme,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Theme = require('md-components/Theme').Theme;

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
      backgroundColor: Theme.divider.backgroundColor
    }));
  }

  return Divider;

})(Layer);


},{"md-components/Theme":"md-components/Theme"}],"md-components/GridList":[function(require,module,exports){
var GridList, Icon, Ripple, Theme, Type,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Type = require('md-components/Type');

Ripple = require('md-components/Ripple').Ripple;

Icon = require('md-components/Icon').Icon;

Theme = require('md-components/Theme').Theme;

exports.GridList = GridList = (function(superClass) {
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


},{"md-components/Icon":"md-components/Icon","md-components/Ripple":"md-components/Ripple","md-components/Theme":"md-components/Theme","md-components/Type":"md-components/Type"}],"md-components/Header":[function(require,module,exports){
var Header, Icon, Ripple, StatusBar, Theme, Type,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Type = require('md-components/Type');

Ripple = require('md-components/Ripple').Ripple;

Icon = require('md-components/Icon').Icon;

Theme = require('md-components/Theme').Theme;

StatusBar = require('md-components/StatusBar').StatusBar;

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
      backgroundColor: Theme.header.backgroundColor
    }));
    this.titleLayer = new Type.Title({
      name: '.',
      parent: this,
      x: 72,
      y: Align.bottom(-14),
      color: Theme.header.title,
      text: (ref1 = this.title) != null ? ref1 : "No title"
    });
    this.title = (ref2 = options.title) != null ? ref2 : 'Default Header';
    this.iconLayer = new Icon({
      name: '.',
      parent: this,
      x: 12,
      y: Align.center(12),
      icon: 'menu',
      color: Theme.header.icon.color
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
        return Ripple(_this, event.point, _this.titleLayer);
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


},{"md-components/Icon":"md-components/Icon","md-components/Ripple":"md-components/Ripple","md-components/StatusBar":"md-components/StatusBar","md-components/Theme":"md-components/Theme","md-components/Type":"md-components/Type"}],"md-components/Icon":[function(require,module,exports){
var Icon, icons,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

icons = JSON.parse(Utils.domLoadDataSync("modules/md-components/icons.json"));

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


},{}],"md-components/MenuButton":[function(require,module,exports){
var Icon, MenuButton, Ripple, Theme, Type,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Type = require('md-components/Type');

Ripple = require('md-components/Ripple').Ripple;

Icon = require('md-components/Icon').Icon;

Theme = require('md-components/Theme').Theme;

exports.MenuButton = MenuButton = (function(superClass) {
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
      color: Theme.menuOverlay.text
    });
    this.labelLayer = new Type.Regular({
      name: 'label',
      parent: this,
      x: this.iconLayer.maxX + 16,
      y: Align.center(),
      color: Theme.menuOverlay.text,
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


},{"md-components/Icon":"md-components/Icon","md-components/Ripple":"md-components/Ripple","md-components/Theme":"md-components/Theme","md-components/Type":"md-components/Type"}],"md-components/MenuOverlay":[function(require,module,exports){
var Icon, MenuButton, MenuOverlay, Ripple, Theme, Type,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Type = require('md-components/Type');

Ripple = require('md-components/Ripple').Ripple;

Icon = require('md-components/Icon').Icon;

Theme = require('md-components/Theme').Theme;

MenuButton = require('md-components/MenuButton').MenuButton;

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
      backgroundColor: Theme.menuOverlay.backgroundColor,
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
      image: Theme.user.image,
      backgroundColor: Theme.menuOverlay.header.backgroundColor
    });
    this.titleIcon = new Layer({
      name: '.',
      parent: this.header,
      x: 16,
      y: 40,
      height: 64,
      width: 64,
      borderRadius: 32,
      backgroundColor: Theme.menuOverlay.header.icon
    });
    this.subheaderExpand = new Icon({
      name: '.',
      parent: this.header,
      x: Align.right(-16),
      y: Align.bottom(-16),
      icon: 'menu-down',
      color: Theme.menuOverlay.subheader.icon
    });
    this.subheader = new Type.Body1({
      name: '.',
      parent: this.header,
      width: this.width,
      x: 16,
      y: Align.bottom(-18),
      text: this._title,
      color: Theme.menuOverlay.subheader.text
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


},{"md-components/Icon":"md-components/Icon","md-components/MenuButton":"md-components/MenuButton","md-components/Ripple":"md-components/Ripple","md-components/Theme":"md-components/Theme","md-components/Type":"md-components/Type"}],"md-components/Notification":[function(require,module,exports){
var Divider, Icon, Notification, Ripple, Theme, Type,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Type = require('md-components/Type');

Ripple = require('md-components/Ripple').Ripple;

Icon = require('md-components/Icon').Icon;

Theme = require('md-components/Theme').Theme;

Divider = require('md-components/Divider').Divider;

exports.Notification = Notification = Notification = (function(superClass) {
  extend(Notification, superClass);

  function Notification(options) {
    var divider, initY, ref, ref1, ref2, ref3, ref4, ref5, ref6, ref7;
    if (options == null) {
      options = {};
    }
    this.close = bind(this.close, this);
    this.open = bind(this.open, this);
    this._title = (ref = options.title) != null ? ref : 'Notification';
    this._body = (ref1 = options.body) != null ? ref1 : 'This is a notification.';
    this._icon = (ref2 = options.icon) != null ? ref2 : void 0;
    this._iconColor = (ref3 = options.iconColor) != null ? ref3 : Theme.text.secondary;
    this._iconBackgroundColor = (ref4 = options.iconBackgroundColor) != null ? ref4 : Theme.secondary;
    this._time = (ref5 = options.time) != null ? ref5 : new Date();
    this._action1 = options.action1;
    this._action2 = options.action2;
    this._timeout = (ref6 = options.timeout) != null ? ref6 : 5;
    this._app = options.app;
    initY = void 0;
    if (this._app != null) {
      initY = this._app.notifications.length > 0 ? _.last(this._app.notifications).maxY + 8 : this._app.header.maxY + 4;
      this._app.notifications.push(this);
    }
    Notification.__super__.constructor.call(this, _.defaults(options, {
      name: (ref7 = options.name) != null ? ref7 : '.',
      width: 344,
      borderRadius: 2,
      x: Align.center,
      y: initY != null ? initY : 0,
      backgroundColor: Theme.dialog.backgroundColor,
      shadowX: 0,
      shadowY: 2,
      shadowBlur: 3,
      opacity: 0,
      shadowColor: 'rgba(0,0,0,.3)',
      animationOptions: {
        time: .25
      }
    }));
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
    this.title = new Type.Subhead({
      name: 'Title',
      parent: this,
      x: 64,
      y: 8,
      width: this.width - 72,
      color: 'rgba(0,0,0,.87)',
      text: this._title
    });
    this.body = new Type.Body1({
      name: 'Body',
      parent: this,
      x: 64,
      y: this.title.maxY,
      width: this.width - 72,
      text: this._body
    });
    this.date = new Type.Caption({
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
        this.action1.label = new Type.Caption({
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
          this.action2.label = new Type.Caption({
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
    var i, len, notification, ref;
    if (this._app != null) {
      _.pull(this._app.notifications, this);
      ref = this._app.notifications;
      for (i = 0, len = ref.length; i < len; i++) {
        notification = ref[i];
        if (notification.y > this.maxY) {
          notification.animate({
            y: notification.y - this.height
          });
        }
      }
    }
    this.animate({
      x: direction === 'left' ? -Screen.width : Screen.width,
      opacity: 0
    });
    this.closed = true;
    return Utils.delay(.5, (function(_this) {
      return function() {
        return _this.destroy();
      };
    })(this));
  };

  return Notification;

})(Layer);


},{"md-components/Divider":"md-components/Divider","md-components/Icon":"md-components/Icon","md-components/Ripple":"md-components/Ripple","md-components/Theme":"md-components/Theme","md-components/Type":"md-components/Type"}],"md-components/Page":[function(require,module,exports){
var Page, Theme,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Theme = require('md-components/Theme').Theme;

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
      backgroundColor: Theme.page.primary.backgroundColor
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


},{"md-components/Theme":"md-components/Theme"}],"md-components/Radiobox":[function(require,module,exports){
var Icon, Radiobox, Ripple, Theme, Type,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Type = require('md-components/Type');

Ripple = require('md-components/Ripple').Ripple;

Icon = require('md-components/Icon').Icon;

Theme = require('md-components/Theme').Theme;

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
    var i, len, radiobox, ref, results;
    if (this._isOn) {
      this.icon = 'radiobox-marked';
      this.color = Theme.colors.primary.main;
      ref = _.without(this._group, this);
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        radiobox = ref[i];
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


},{"md-components/Icon":"md-components/Icon","md-components/Ripple":"md-components/Ripple","md-components/Theme":"md-components/Theme","md-components/Type":"md-components/Type"}],"md-components/Ripple":[function(require,module,exports){
var Ripple;

Ripple = function(layer, point, placeBehind, color) {
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

exports.Ripple = Ripple;


},{}],"md-components/RowItem":[function(require,module,exports){
var Divider, RowItem, Theme, Type,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Type = require('md-components/Type');

Theme = require('md-components/Theme').Theme;

Divider = require('md-components/Divider').Divider;

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
    this.labelLayer = new Type.Regular({
      name: '.',
      parent: this,
      x: this.icon.maxX + 16,
      y: Align.center,
      color: Theme.text.text,
      text: this._text
    });
  }

  return RowItem;

})(Layer);


},{"md-components/Divider":"md-components/Divider","md-components/Theme":"md-components/Theme","md-components/Type":"md-components/Type"}],"md-components/Slider":[function(require,module,exports){
var Icon, Ripple, Slider, Theme, Type,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Type = require('md-components/Type');

Ripple = require('md-components/Ripple').Ripple;

Icon = require('md-components/Icon').Icon;

Theme = require('md-components/Theme').Theme;

exports.Slider = Slider = (function(superClass) {
  extend(Slider, superClass);

  function Slider(options) {
    var i, j, knobColor, knobRadius, knobSize, notch, ref, ref1, ref2, ref3, ref4, ref5, round, trackColor;
    if (options == null) {
      options = {};
    }
    this._notched = (ref = options.notched) != null ? ref : false;
    Slider.__super__.constructor.call(this, _.defaults(options, {
      name: '.',
      height: 2,
      knobSize: 12,
      backgroundColor: 'rgba(0,0,0,.26)',
      min: 1,
      max: 10
    }));
    if (options.custom && (typeof sliderRegularHightlight !== "undefined" && sliderRegularHightlight !== null) && (typeof sliderRegularKnob !== "undefined" && sliderRegularKnob !== null)) {
      trackColor = (ref1 = sliderRegularHightlight.backgroundColor) != null ? ref1 : Theme.colors.primary.main;
      knobColor = (ref2 = sliderRegularKnob.backgroundColor) != null ? ref2 : Theme.colors.primary.main;
      knobSize = (ref3 = sliderRegularKnob.size) != null ? ref3 : this.knobSize;
      knobRadius = (ref4 = sliderRegularKnob.borderRadius) != null ? ref4 : this.knobSize;
    } else {
      trackColor = Theme.colors.primary.main;
      knobColor = Theme.colors.primary.main;
      knobSize = this.knobSize;
      knobRadius = this.knobSize;
    }
    this.fill.backgroundColor = trackColor;
    this.knob.props = {
      name: 'Knob',
      backgroundColor: null,
      shadowX: 0,
      shadowY: 0,
      shadowBlur: 0
    };
    this.thumb = new Layer({
      name: 'Thumb',
      parent: this.knob,
      x: Align.center,
      y: Align.center,
      size: knobSize,
      borderRadius: knobRadius,
      backgroundColor: knobColor,
      animationOptions: {
        time: .15
      }
    });
    if (this._notched) {
      for (i = j = 0, ref5 = this.max - this.min; 0 <= ref5 ? j < ref5 : j > ref5; i = 0 <= ref5 ? ++j : --j) {
        notch = new Layer({
          name: '.',
          parent: this,
          x: i * this.width / (this.max - this.min),
          width: 2,
          height: 2,
          borderRadius: 2,
          backgroundColor: Theme.colors.primary.text
        });
      }
      this.tip = new Layer({
        name: 'Tip',
        parent: this.knob,
        x: Align.center,
        y: -24,
        width: 26,
        height: 32,
        html: '<svg width="26px" height="32px" viewBox="0 0 26 32"><path d="M13,0.1 C20.2,0.1 26,6 26,13.3 C26,17 24,20.9 18.7,26.2 L13,32 L7.2,26.2 C2,20.8 0,16.9 0,13.3 C-3.55271368e-15,6 5.8,0.1 13,0.1 L13,0.1 Z" fill="' + knobColor + '"></path></svg>',
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
        color: Theme.colors.primary.text,
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
            scale: 1.1
          });
        };
      })(this));
      this.knob.onTouchEnd((function(_this) {
        return function() {
          return _this.thumb.animate({
            scale: 1
          });
        };
      })(this));
    }
  }

  return Slider;

})(SliderComponent);


},{"md-components/Icon":"md-components/Icon","md-components/Ripple":"md-components/Ripple","md-components/Theme":"md-components/Theme","md-components/Type":"md-components/Type"}],"md-components/Snackbar":[function(require,module,exports){
var Button, Ripple, Snackbar, Theme, Type,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Type = require('md-components/Type');

Ripple = require('md-components/Ripple').Ripple;

Theme = require('md-components/Theme').Theme;

Button = require('md-components/Button').Button;

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
    this._app = options.app;
    Snackbar.__super__.constructor.call(this, _.defaults(options, {
      name: '.',
      width: Screen.width,
      clip: true,
      backgroundColor: Theme.snackbar.backgroundColor,
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
        color: (ref2 = this._action.color) != null ? ref2 : Theme.colors.primary.light,
        text: this._action.title.toUpperCase(),
        action: this._action.action
      });
      this.action.onTap(this.hide);
      titleWidth = this.action.x - 8 - 24;
    }
    this.textLabel = new Type.Body1({
      name: 'Title',
      parent: this,
      x: 24,
      y: 14,
      width: titleWidth,
      text: this._title,
      color: Theme.snackbar.color
    });
    this.height = this.textLabel.maxY + 14;
    if ((ref3 = this.action) != null) {
      ref3.y = Align.center;
    }
    if (this._app != null) {
      this.y = this._app.bottomNav != null ? (ref4 = Align.bottom(-this._app.bottomNav.height + this.height)) != null ? ref4 : Align.bottom(this.height) : void 0;
    }
    Utils.delay(this._timeout, this.hide);
    this.show();
  }

  Snackbar.prototype.show = function() {
    var ref;
    if (this._app != null) {
      if (this._app.snackbar != null) {
        this._app.snackbar.hide();
        Utils.delay(1, this.show);
      } else {
        this._app.snackbar = this;
        if ((ref = this._app.actionButton) != null) {
          ref.animate({
            y: this._app.actionButton.y - this.height,
            options: this.animationOptions
          });
        }
        return this.animate({
          y: this.y - this.height
        });
      }
    } else {
      return this.animate({
        y: this.y - this.height
      });
    }
  };

  Snackbar.prototype.hide = function() {
    var ref;
    if (this._app != null) {
      this._app.snackbar = void 0;
      if ((ref = this._app.actionButton) != null) {
        ref.animate({
          y: this._app.actionButton.y + this.height,
          options: this.animationOptions
        });
      }
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


},{"md-components/Button":"md-components/Button","md-components/Ripple":"md-components/Ripple","md-components/Theme":"md-components/Theme","md-components/Type":"md-components/Type"}],"md-components/StatusBar":[function(require,module,exports){
var Icon, Ripple, StatusBar, Theme, Type,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Type = require('md-components/Type');

Ripple = require('md-components/Ripple').Ripple;

Icon = require('md-components/Icon').Icon;

Theme = require('md-components/Theme').Theme;

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
      backgroundColor: Theme.statusBar.backgroundColor
    }));
    this.items = new Layer({
      name: '.',
      parent: this,
      size: this.size,
      image: Theme.statusBar.image,
      invert: Theme.statusBar.invert
    });
  }

  return StatusBar;

})(Layer);


},{"md-components/Icon":"md-components/Icon","md-components/Ripple":"md-components/Ripple","md-components/Theme":"md-components/Theme","md-components/Type":"md-components/Type"}],"md-components/Switch":[function(require,module,exports){
var Icon, Ripple, Switch, Theme, Type,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Type = require('md-components/Type');

Ripple = require('md-components/Ripple').Ripple;

Icon = require('md-components/Icon').Icon;

Theme = require('md-components/Theme').Theme;

exports.Switch = Switch = (function(superClass) {
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
        backgroundColor: Theme.colors.primary.main
      });
      return this.animate({
        backgroundColor: Theme.colors.primary.light
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


},{"md-components/Icon":"md-components/Icon","md-components/Ripple":"md-components/Ripple","md-components/Theme":"md-components/Theme","md-components/Type":"md-components/Type"}],"md-components/TextField":[function(require,module,exports){
var Icon, Ripple, TextField, Theme, Type;

Type = require('md-components/Type');

Ripple = require('md-components/Ripple').Ripple;

Icon = require('md-components/Icon').Icon;

Theme = require('md-components/Theme').Theme;

exports.TextField = TextField = (function() {
  function TextField() {}

  return TextField;

})();


},{"md-components/Icon":"md-components/Icon","md-components/Ripple":"md-components/Ripple","md-components/Theme":"md-components/Theme","md-components/Type":"md-components/Type"}],"md-components/Theme":[function(require,module,exports){
var Theme, menuColor, menuInvert, menuTextColor, modifyColor, primaryColor, primaryInvert, secondaryColor, source;

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

Theme = {
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
    image: 'modules/md-images/status_bar.png',
    backgroundColor: source.colors.primary.dark,
    invert: primaryInvert
  },
  bottomNav: {
    backgroundColor: '#FFFFFF',
    shadowY: -2,
    shadowBlur: 6,
    shadowColor: 'rgba(0,0,0,.1)'
  },
  navBar: {
    backgroundColor: '#000000'
  },
  keyboard: {
    image: 'modules/md-images/keyboard.png'
  },
  footer: {
    image: 'modules/md-images/nav_bar.png'
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
  }
};

color_pallete.destroy();

exports.Theme = Theme;


},{}],"md-components/Tile":[function(require,module,exports){
var Icon, Ripple, Theme, Tile, Type,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Type = require('md-components/Type');

Ripple = require('md-components/Ripple').Ripple;

Icon = require('md-components/Icon').Icon;

Theme = require('md-components/Theme').Theme;

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
        return Ripple(this, event.point, this.header, (ref10 = options.RippleColor) != null ? ref10 : 'rgba(0,0,0,.1)');
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
        return Ripple(this, event.point, this.title);
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
        this.header.title = new Type.Regular({
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


},{"md-components/Icon":"md-components/Icon","md-components/Ripple":"md-components/Ripple","md-components/Theme":"md-components/Theme","md-components/Type":"md-components/Type"}],"md-components/Type":[function(require,module,exports){
var Theme,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Theme = require('md-components/Theme');

Utils.insertCSS("@font-face {\n  font-family: \"Roboto\";\n  src: url(\"modules/md-fonts/Roboto-Regular.ttf\");");

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


},{"md-components/Theme":"md-components/Theme"}],"md-components/View":[function(require,module,exports){
var Page, Theme, View,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Theme = require('md-components/Theme').Theme;

Page = require('md-components/Page').Page;

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
    this._app = options.app;
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
      var ref3;
      return (ref3 = this._app) != null ? ref3.changePage(next) : void 0;
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


},{"md-components/Page":"md-components/Page","md-components/Theme":"md-components/Theme"}],"md":[function(require,module,exports){
var ActionButton, App, Body1, Body2, BottomNav, Button, Caption, Checkbox, Dialog, DialogAction, Divider, GridList, Header, Headline, Icon, MenuButton, MenuOverlay, Notification, Page, Radiobox, Regular, Ripple, RowItem, Slider, Snackbar, StatusBar, Subhead, Switch, TextField, Theme, Tile, Title, Type, View;

Type = require('md-components/Type');

Ripple = require('md-components/Ripple').Ripple;

Theme = require('md-components/Theme').Theme;

Icon = require('md-components/Icon').Icon;

Button = require('md-components/Button').Button;

TextField = require('md-components/TextField').TextField;

Slider = require('md-components/Slider').Slider;

Radiobox = require('md-components/Radiobox').Radiobox;

Checkbox = require('md-components/Checkbox').Checkbox;

Switch = require('md-components/Switch').Switch;

Divider = require('md-components/Divider').Divider;

GridList = require('md-components/GridList').GridList;

Tile = require('md-components/Tile').Tile;

Dialog = require('md-components/Dialog').Dialog;

StatusBar = require('md-components/StatusBar').StatusBar;

Header = require('md-components/Header').Header;

Notification = require('md-components/Notification').Notification;

Snackbar = require('md-components/Snackbar').Snackbar;

RowItem = require('md-components/RowItem').RowItem;

MenuOverlay = require('md-components/MenuOverlay').MenuOverlay;

MenuButton = require('md-components/MenuButton').MenuButton;

ActionButton = require('md-components/ActionButton').ActionButton;

View = require('md-components/View').View;

Page = require('md-components/Page').Page;

BottomNav = require('md-components/BottomNav').BottomNav;

App = require('md-components/App').App;

exports.Ripple = Ripple;

exports.Theme = Theme;

exports.Icon = Icon;

exports.Button = Button;

exports.TextField = TextField;

exports.Slider = Slider;

exports.Radiobox = Radiobox;

exports.Checkbox = Checkbox;

exports.Switch = Switch;

exports.Divider = Divider;

exports.GridList = GridList;

exports.Tile = Tile;

exports.Dialog = Dialog;

exports.StatusBar = StatusBar;

exports.Header = Header;

exports.Notification = Notification;

exports.Snackbar = Snackbar;

exports.RowItem = RowItem;

exports.ActionButton = ActionButton;

exports.MenuButton = MenuButton;

exports.MenuOverlay = MenuOverlay;

exports.View = View;

exports.Page = Page;

exports.App = App;

exports.Title = Title = Type.Title;

exports.Headline = Headline = Type.Headline;

exports.Subhead = Subhead = Type.Subhead;

exports.Regular = Regular = Type.Regular;

exports.Body2 = Body2 = Type.Body2;

exports.Body1 = Body1 = Type.Body1;

exports.Caption = Caption = Type.Caption;

exports.DialogAction = DialogAction = Type.DialogAction;

Framer.Extras.Hints.disable();


},{"md-components/ActionButton":"md-components/ActionButton","md-components/App":"md-components/App","md-components/BottomNav":"md-components/BottomNav","md-components/Button":"md-components/Button","md-components/Checkbox":"md-components/Checkbox","md-components/Dialog":"md-components/Dialog","md-components/Divider":"md-components/Divider","md-components/GridList":"md-components/GridList","md-components/Header":"md-components/Header","md-components/Icon":"md-components/Icon","md-components/MenuButton":"md-components/MenuButton","md-components/MenuOverlay":"md-components/MenuOverlay","md-components/Notification":"md-components/Notification","md-components/Page":"md-components/Page","md-components/Radiobox":"md-components/Radiobox","md-components/Ripple":"md-components/Ripple","md-components/RowItem":"md-components/RowItem","md-components/Slider":"md-components/Slider","md-components/Snackbar":"md-components/Snackbar","md-components/StatusBar":"md-components/StatusBar","md-components/Switch":"md-components/Switch","md-components/TextField":"md-components/TextField","md-components/Theme":"md-components/Theme","md-components/Tile":"md-components/Tile","md-components/Type":"md-components/Type","md-components/View":"md-components/View"}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1VzZXJzL21hbWV6aXRvL2RldmVsb3BtZW50L2dpdGh1Yi9mcmFtZXItbWQvTWF0ZXJpYWwuZnJhbWVyL21vZHVsZXMvbWQuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvbWFtZXppdG8vZGV2ZWxvcG1lbnQvZ2l0aHViL2ZyYW1lci1tZC9NYXRlcmlhbC5mcmFtZXIvbW9kdWxlcy9tZC1jb21wb25lbnRzL1ZpZXcuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvbWFtZXppdG8vZGV2ZWxvcG1lbnQvZ2l0aHViL2ZyYW1lci1tZC9NYXRlcmlhbC5mcmFtZXIvbW9kdWxlcy9tZC1jb21wb25lbnRzL1R5cGUuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvbWFtZXppdG8vZGV2ZWxvcG1lbnQvZ2l0aHViL2ZyYW1lci1tZC9NYXRlcmlhbC5mcmFtZXIvbW9kdWxlcy9tZC1jb21wb25lbnRzL1RpbGUuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvbWFtZXppdG8vZGV2ZWxvcG1lbnQvZ2l0aHViL2ZyYW1lci1tZC9NYXRlcmlhbC5mcmFtZXIvbW9kdWxlcy9tZC1jb21wb25lbnRzL1RoZW1lLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL21hbWV6aXRvL2RldmVsb3BtZW50L2dpdGh1Yi9mcmFtZXItbWQvTWF0ZXJpYWwuZnJhbWVyL21vZHVsZXMvbWQtY29tcG9uZW50cy9UZXh0RmllbGQuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvbWFtZXppdG8vZGV2ZWxvcG1lbnQvZ2l0aHViL2ZyYW1lci1tZC9NYXRlcmlhbC5mcmFtZXIvbW9kdWxlcy9tZC1jb21wb25lbnRzL1N3aXRjaC5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9tYW1leml0by9kZXZlbG9wbWVudC9naXRodWIvZnJhbWVyLW1kL01hdGVyaWFsLmZyYW1lci9tb2R1bGVzL21kLWNvbXBvbmVudHMvU3RhdHVzQmFyLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL21hbWV6aXRvL2RldmVsb3BtZW50L2dpdGh1Yi9mcmFtZXItbWQvTWF0ZXJpYWwuZnJhbWVyL21vZHVsZXMvbWQtY29tcG9uZW50cy9TbmFja2Jhci5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9tYW1leml0by9kZXZlbG9wbWVudC9naXRodWIvZnJhbWVyLW1kL01hdGVyaWFsLmZyYW1lci9tb2R1bGVzL21kLWNvbXBvbmVudHMvU2xpZGVyLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL21hbWV6aXRvL2RldmVsb3BtZW50L2dpdGh1Yi9mcmFtZXItbWQvTWF0ZXJpYWwuZnJhbWVyL21vZHVsZXMvbWQtY29tcG9uZW50cy9Sb3dJdGVtLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL21hbWV6aXRvL2RldmVsb3BtZW50L2dpdGh1Yi9mcmFtZXItbWQvTWF0ZXJpYWwuZnJhbWVyL21vZHVsZXMvbWQtY29tcG9uZW50cy9SaXBwbGUuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvbWFtZXppdG8vZGV2ZWxvcG1lbnQvZ2l0aHViL2ZyYW1lci1tZC9NYXRlcmlhbC5mcmFtZXIvbW9kdWxlcy9tZC1jb21wb25lbnRzL1JhZGlvYm94LmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL21hbWV6aXRvL2RldmVsb3BtZW50L2dpdGh1Yi9mcmFtZXItbWQvTWF0ZXJpYWwuZnJhbWVyL21vZHVsZXMvbWQtY29tcG9uZW50cy9QYWdlLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL21hbWV6aXRvL2RldmVsb3BtZW50L2dpdGh1Yi9mcmFtZXItbWQvTWF0ZXJpYWwuZnJhbWVyL21vZHVsZXMvbWQtY29tcG9uZW50cy9Ob3RpZmljYXRpb24uY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvbWFtZXppdG8vZGV2ZWxvcG1lbnQvZ2l0aHViL2ZyYW1lci1tZC9NYXRlcmlhbC5mcmFtZXIvbW9kdWxlcy9tZC1jb21wb25lbnRzL01lbnVPdmVybGF5LmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL21hbWV6aXRvL2RldmVsb3BtZW50L2dpdGh1Yi9mcmFtZXItbWQvTWF0ZXJpYWwuZnJhbWVyL21vZHVsZXMvbWQtY29tcG9uZW50cy9NZW51QnV0dG9uLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL21hbWV6aXRvL2RldmVsb3BtZW50L2dpdGh1Yi9mcmFtZXItbWQvTWF0ZXJpYWwuZnJhbWVyL21vZHVsZXMvbWQtY29tcG9uZW50cy9JY29uLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL21hbWV6aXRvL2RldmVsb3BtZW50L2dpdGh1Yi9mcmFtZXItbWQvTWF0ZXJpYWwuZnJhbWVyL21vZHVsZXMvbWQtY29tcG9uZW50cy9IZWFkZXIuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvbWFtZXppdG8vZGV2ZWxvcG1lbnQvZ2l0aHViL2ZyYW1lci1tZC9NYXRlcmlhbC5mcmFtZXIvbW9kdWxlcy9tZC1jb21wb25lbnRzL0dyaWRMaXN0LmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL21hbWV6aXRvL2RldmVsb3BtZW50L2dpdGh1Yi9mcmFtZXItbWQvTWF0ZXJpYWwuZnJhbWVyL21vZHVsZXMvbWQtY29tcG9uZW50cy9EaXZpZGVyLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL21hbWV6aXRvL2RldmVsb3BtZW50L2dpdGh1Yi9mcmFtZXItbWQvTWF0ZXJpYWwuZnJhbWVyL21vZHVsZXMvbWQtY29tcG9uZW50cy9EaWFsb2cuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvbWFtZXppdG8vZGV2ZWxvcG1lbnQvZ2l0aHViL2ZyYW1lci1tZC9NYXRlcmlhbC5mcmFtZXIvbW9kdWxlcy9tZC1jb21wb25lbnRzL0NoZWNrYm94LmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL21hbWV6aXRvL2RldmVsb3BtZW50L2dpdGh1Yi9mcmFtZXItbWQvTWF0ZXJpYWwuZnJhbWVyL21vZHVsZXMvbWQtY29tcG9uZW50cy9CdXR0b24uY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvbWFtZXppdG8vZGV2ZWxvcG1lbnQvZ2l0aHViL2ZyYW1lci1tZC9NYXRlcmlhbC5mcmFtZXIvbW9kdWxlcy9tZC1jb21wb25lbnRzL0JvdHRvbU5hdi5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9tYW1leml0by9kZXZlbG9wbWVudC9naXRodWIvZnJhbWVyLW1kL01hdGVyaWFsLmZyYW1lci9tb2R1bGVzL21kLWNvbXBvbmVudHMvQXBwLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL21hbWV6aXRvL2RldmVsb3BtZW50L2dpdGh1Yi9mcmFtZXItbWQvTWF0ZXJpYWwuZnJhbWVyL21vZHVsZXMvbWQtY29tcG9uZW50cy9BY3Rpb25CdXR0b24uY29mZmVlIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJUeXBlID0gcmVxdWlyZSAnbWQtY29tcG9uZW50cy9UeXBlJ1xueyBSaXBwbGUgfSA9IHJlcXVpcmUgJ21kLWNvbXBvbmVudHMvUmlwcGxlJ1xueyBUaGVtZSB9ID0gcmVxdWlyZSAnbWQtY29tcG9uZW50cy9UaGVtZSdcbnsgSWNvbiB9ID0gcmVxdWlyZSAnbWQtY29tcG9uZW50cy9JY29uJ1xueyBCdXR0b24gfSA9IHJlcXVpcmUgJ21kLWNvbXBvbmVudHMvQnV0dG9uJ1xueyBUZXh0RmllbGQgfSA9IHJlcXVpcmUgJ21kLWNvbXBvbmVudHMvVGV4dEZpZWxkJ1xueyBTbGlkZXIgfSA9IHJlcXVpcmUgJ21kLWNvbXBvbmVudHMvU2xpZGVyJ1xueyBSYWRpb2JveCB9ID0gcmVxdWlyZSAnbWQtY29tcG9uZW50cy9SYWRpb2JveCdcbnsgQ2hlY2tib3ggfSA9IHJlcXVpcmUgJ21kLWNvbXBvbmVudHMvQ2hlY2tib3gnXG57IFN3aXRjaCB9ID0gcmVxdWlyZSAnbWQtY29tcG9uZW50cy9Td2l0Y2gnXG57IERpdmlkZXIgfSA9IHJlcXVpcmUgJ21kLWNvbXBvbmVudHMvRGl2aWRlcidcbnsgR3JpZExpc3QgfSA9IHJlcXVpcmUgJ21kLWNvbXBvbmVudHMvR3JpZExpc3QnXG57IFRpbGUgfSA9IHJlcXVpcmUgJ21kLWNvbXBvbmVudHMvVGlsZSdcbnsgRGlhbG9nIH0gPSByZXF1aXJlICdtZC1jb21wb25lbnRzL0RpYWxvZydcbnsgU3RhdHVzQmFyIH0gPSByZXF1aXJlICdtZC1jb21wb25lbnRzL1N0YXR1c0JhcidcbnsgSGVhZGVyIH0gPSByZXF1aXJlICdtZC1jb21wb25lbnRzL0hlYWRlcidcbnsgTm90aWZpY2F0aW9uIH0gPSByZXF1aXJlICdtZC1jb21wb25lbnRzL05vdGlmaWNhdGlvbidcbnsgU25hY2tiYXIgfSA9IHJlcXVpcmUgJ21kLWNvbXBvbmVudHMvU25hY2tiYXInXG57IFJvd0l0ZW0gfSA9IHJlcXVpcmUgJ21kLWNvbXBvbmVudHMvUm93SXRlbSdcbnsgTWVudU92ZXJsYXkgfSA9IHJlcXVpcmUgJ21kLWNvbXBvbmVudHMvTWVudU92ZXJsYXknXG57IE1lbnVCdXR0b24gfSA9IHJlcXVpcmUgJ21kLWNvbXBvbmVudHMvTWVudUJ1dHRvbidcbnsgQWN0aW9uQnV0dG9uIH0gPSByZXF1aXJlICdtZC1jb21wb25lbnRzL0FjdGlvbkJ1dHRvbidcbnsgVmlldyB9ID0gcmVxdWlyZSAnbWQtY29tcG9uZW50cy9WaWV3J1xueyBQYWdlIH0gPSByZXF1aXJlICdtZC1jb21wb25lbnRzL1BhZ2UnXG57IEJvdHRvbU5hdiB9ID0gcmVxdWlyZSAnbWQtY29tcG9uZW50cy9Cb3R0b21OYXYnXG57IEFwcCB9ID0gcmVxdWlyZSAnbWQtY29tcG9uZW50cy9BcHAnXG5cbiMgVE9ETzogQ2hhbmdlIEFwcCBmcm9tIG1hc3RlciBmbG93IGNvbXBvbmVudCB0byBTY3JlZW4gbWFuYWdlci5cbiMgQXBwIHNob3VsZG4ndCBkaXJlY3RseSBtYW5hZ2UgcGFnZXM6IGEgbmV3IGNsYXNzLCAnc2NyZWVuJyB3aWxsIG1hbmFnZSBQYWdlcy5cbiMgVGFicyBhbGxvdyBuYXZpZ2F0aW9uIGJldHdlZW4gU2NyZWVucy4gQ29udGVudCBpcyBzdGlsbCBhZGRlZCB0byBQYWdlcy5cblxuIyBPdXIgZ29hbCBpcyB0byByZXF1aXJlIG9ubHkgb25lIHJlcXVpcmUgaW4gRnJhbWVyIHByb2plY3QsIHNvIHRoaXMgXG4jIGlzIGEgY2x1bmt5IHdheSBvZiBsZXR0aW5nIHVzZXIgY3JlYXRlIHRleHQgdXNpbmcgbWQuVGl0bGUsIGV0Yy5cblxuZXhwb3J0cy5SaXBwbGUgPSBSaXBwbGVcbmV4cG9ydHMuVGhlbWUgPSBUaGVtZVxuZXhwb3J0cy5JY29uID0gSWNvblxuZXhwb3J0cy5CdXR0b24gPSBCdXR0b25cbmV4cG9ydHMuVGV4dEZpZWxkID0gVGV4dEZpZWxkXG5leHBvcnRzLlNsaWRlciA9IFNsaWRlclxuZXhwb3J0cy5SYWRpb2JveCA9IFJhZGlvYm94XG5leHBvcnRzLkNoZWNrYm94ID0gQ2hlY2tib3hcbmV4cG9ydHMuU3dpdGNoID0gU3dpdGNoXG5leHBvcnRzLkRpdmlkZXIgPSBEaXZpZGVyXG5leHBvcnRzLkdyaWRMaXN0ID0gR3JpZExpc3RcbmV4cG9ydHMuVGlsZSA9IFRpbGVcbmV4cG9ydHMuRGlhbG9nID0gRGlhbG9nXG5leHBvcnRzLlN0YXR1c0JhciA9IFN0YXR1c0JhclxuZXhwb3J0cy5IZWFkZXIgPSBIZWFkZXJcbmV4cG9ydHMuTm90aWZpY2F0aW9uID0gTm90aWZpY2F0aW9uXG5leHBvcnRzLlNuYWNrYmFyID0gU25hY2tiYXJcbmV4cG9ydHMuUm93SXRlbSA9IFJvd0l0ZW1cbmV4cG9ydHMuQWN0aW9uQnV0dG9uID0gQWN0aW9uQnV0dG9uXG5leHBvcnRzLk1lbnVCdXR0b24gPSBNZW51QnV0dG9uXG5leHBvcnRzLk1lbnVPdmVybGF5ID0gTWVudU92ZXJsYXlcbmV4cG9ydHMuVmlldyA9IFZpZXdcbmV4cG9ydHMuUGFnZSA9IFBhZ2VcbmV4cG9ydHMuQXBwID0gQXBwXG5cbmV4cG9ydHMuVGl0bGUgPSBUaXRsZSA9IFR5cGUuVGl0bGVcbmV4cG9ydHMuSGVhZGxpbmUgPSBIZWFkbGluZSA9IFR5cGUuSGVhZGxpbmVcbmV4cG9ydHMuU3ViaGVhZCA9IFN1YmhlYWQgPSBUeXBlLlN1YmhlYWRcbmV4cG9ydHMuUmVndWxhciA9IFJlZ3VsYXIgPSBUeXBlLlJlZ3VsYXJcbmV4cG9ydHMuQm9keTIgPSBCb2R5MiA9IFR5cGUuQm9keTJcbmV4cG9ydHMuQm9keTEgPSBCb2R5MSA9IFR5cGUuQm9keTFcbmV4cG9ydHMuQ2FwdGlvbiA9IENhcHRpb24gPSBUeXBlLkNhcHRpb25cbmV4cG9ydHMuRGlhbG9nQWN0aW9uID0gRGlhbG9nQWN0aW9uID0gVHlwZS5EaWFsb2dBY3Rpb25cblxuRnJhbWVyLkV4dHJhcy5IaW50cy5kaXNhYmxlKClcblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuIiwiIyBcdGRQICAgICBkUCBvb1xuIyBcdDg4ICAgICA4OFxuIyBcdDg4ICAgIC44UCBkUCAuZDg4ODhiLiBkUCAgZFAgIGRQXG4jIFx0ODggICAgZDgnIDg4IDg4b29vb2Q4IDg4ICA4OCAgODhcbiMgXHQ4OCAgLmQ4UCAgODggODguICAuLi4gODguODhiLjg4J1xuIyBcdDg4ODg4OCcgICBkUCBgODg4ODhQJyA4ODg4UCBZOFBcblxuIyBXb3JrcyB3aXRob3V0IGFuIGFwcCwgYnV0IHdpbGwgaW50ZWdyYXRlIHdpdGggYXBwIGlmIHNldCB3aXRoIG9wdGlvbnMuYXBwLlxuXG57IFRoZW1lIH0gPSByZXF1aXJlICdtZC1jb21wb25lbnRzL1RoZW1lJ1xueyBQYWdlIH0gPSByZXF1aXJlICdtZC1jb21wb25lbnRzL1BhZ2UnXG5cbmV4cG9ydHMuVmlldyA9IGNsYXNzIFZpZXcgZXh0ZW5kcyBGbG93Q29tcG9uZW50XG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXG5cdFx0QF90aXRsZSA9IG9wdGlvbnMudGl0bGUgPyAnSG9tZSdcblx0XHRAX2ljb24gPSBvcHRpb25zLmljb24gPyAnbWVudSdcblx0XHRAX2ljb25BY3Rpb24gPSBvcHRpb25zLmljb25BY3Rpb24gPyAtPiBhcHAubWVudU92ZXJsYXkuc2hvdygpIFxuXHRcdEBfYXBwID0gb3B0aW9ucy5hcHBcblxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdG5hbWU6ICdWaWV3J1xuXHRcdFx0YW5pbWF0aW9uT3B0aW9uczoge2N1cnZlOiBcInNwcmluZygzMDAsIDM1LCAwKVwifVxuXHRcdFx0c2hhZG93U3ByZWFkOiAyLCBzaGFkb3dDb2xvcjogJ3JnYmEoMCwwLDAsLjEpJywgc2hhZG93Qmx1cjogNlxuXG5cdFx0QG9uVHJhbnNpdGlvblN0YXJ0IChjdXJyZW50LCBuZXh0LCBkaXJlY3Rpb24pIC0+IEBfYXBwPy5jaGFuZ2VQYWdlKG5leHQpXG5cblx0bmV3UGFnZTogKG9wdGlvbnMgPSB7fSkgLT5cblx0XHRwYWdlID0gbmV3IFBhZ2UgXy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0c2l6ZTogQHNpemVcblx0XHRyZXR1cm4gcGFnZSBcblxuXHRsaW5rVG86IChwYWdlKSAtPlxuXHRcdGlmIHBhZ2U/IGFuZCBAY3VycmVudCBpc250IHBhZ2Vcblx0XHRcdEBzaG93TmV4dChwYWdlKVxuIiwiVGhlbWUgPSByZXF1aXJlICdtZC1jb21wb25lbnRzL1RoZW1lJ1xuXG4jIFx0ZDg4ODg4OFAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZFBcbiMgXHQgICA4OCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA4OFxuIyBcdCAgIDg4ICAgIGRQICAgIGRQIDg4ZDg4OGIuIC5kODg4OGIuIC5kODg4OGIuIDg4ZDg4OGIuIC5kODg4OGIuIDg4ZDg4OGIuIDg4ZDg4OGIuIGRQICAgIGRQXG4jIFx0ICAgODggICAgODggICAgODggODgnICBgODggODgnICBgODggODgnICBgODggODgnICBgODggODgnICBgODggODgnICBgODggODgnICBgODggODggICAgODhcbiMgXHQgICA4OCAgICA4OC4gIC44OCA4OC4gIC44OCA4OC4gIC44OCA4OC4gIC44OCA4OCAgICAgICA4OC4gIC44OCA4OC4gIC44OCA4OCAgICA4OCA4OC4gIC44OFxuIyBcdCAgIGRQICAgIGA4ODg4UDg4IDg4WTg4OFAnIGA4ODg4OFAnIGA4ODg4UDg4IGRQICAgICAgIGA4ODg4OFA4IDg4WTg4OFAnIGRQICAgIGRQIGA4ODg4UDg4XG4jIFx0ICAgICAgICAgICAgICAuODggODggICAgICAgICAgICAgICAgICAgICAuODggICAgICAgICAgICAgICAgICAgODggICAgICAgICAgICAgICAgICAgICAuODhcbiMgXHQgICAgICAgICAgZDg4ODhQICBkUCAgICAgICAgICAgICAgICAgZDg4ODhQICAgICAgICAgICAgICAgICAgICBkUCAgICAgICAgICAgICAgICAgZDg4ODhQXG5cblV0aWxzLmluc2VydENTUyhcblx0XCJcIlwiXG4gICAgQGZvbnQtZmFjZSB7XG4gICAgICBmb250LWZhbWlseTogXCJSb2JvdG9cIjtcbiAgICAgIHNyYzogdXJsKFwibW9kdWxlcy9tZC1mb250cy9Sb2JvdG8tUmVndWxhci50dGZcIik7XG4gICAgXCJcIlwiKVxuXG5jbGFzcyBleHBvcnRzLkhlYWRsaW5lIGV4dGVuZHMgVGV4dExheWVyXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucykgLT5cblx0XHRzdXBlciBfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRuYW1lOiAnLidcblx0XHRcdGZvbnRGYW1pbHk6ICdSb2JvdG8nXG5cdFx0XHRmb250U2l6ZTogMjRcblx0XHRcdGZvbnRXZWlnaHQ6IDQwMFxuXHRcdFx0bGluZUhlaWdodDogMS4zXG5cdFx0XHRjb2xvcjogJ3JnYmEoMCwwLDAsLjg3KSdcblxuY2xhc3MgZXhwb3J0cy5TdWJoZWFkIGV4dGVuZHMgVGV4dExheWVyXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucykgLT5cblx0XHRzdXBlciBfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRuYW1lOiAnLidcblx0XHRcdGZvbnRGYW1pbHk6ICdSb2JvdG8nXG5cdFx0XHRmb250U2l6ZTogMTZcblx0XHRcdGZvbnRXZWlnaHQ6IDQwMCwgXG5cdFx0XHRsaW5lSGVpZ2h0OiAxLjUsXG5cdFx0XHRjb2xvcjogJ3JnYmEoMCwwLDAsLjU0KSdcblxuY2xhc3MgZXhwb3J0cy5UaXRsZSBleHRlbmRzIFRleHRMYXllclxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMpIC0+XG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0bmFtZTogJy4nXG5cdFx0XHRmb250RmFtaWx5OiAnUm9ib3RvJ1xuXHRcdFx0Zm9udFNpemU6IDIwXG5cdFx0XHRmb250V2VpZ2h0OiA1MDBcblx0XHRcdGxpbmVIZWlnaHQ6IDEuM1xuXHRcdFx0Y29sb3I6ICdyZ2JhKDAsMCwwLC44NyknXG5jbGFzcyBleHBvcnRzLlJlZ3VsYXIgZXh0ZW5kcyBUZXh0TGF5ZXJcblx0Y29uc3RydWN0b3I6IChvcHRpb25zKSAtPlxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdG5hbWU6ICcuJ1xuXHRcdFx0Zm9udEZhbWlseTogJ1JvYm90bydcblx0XHRcdGZvbnRTaXplOiAxNlxuXHRcdFx0Zm9udFdlaWdodDogNDAwXG5cdFx0XHRsaW5lSGVpZ2h0OiAxLjNcblx0XHRcdGNvbG9yOiAncmdiYSgwLDAsMCwuODcpJ1xuY2xhc3MgZXhwb3J0cy5Cb2R5MiBleHRlbmRzIFRleHRMYXllclxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMpIC0+XG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0bmFtZTogJy4nXG5cdFx0XHRmb250RmFtaWx5OiAnUm9ib3RvJ1xuXHRcdFx0Zm9udFNpemU6IDE0XG5cdFx0XHRmb250V2VpZ2h0OiA1MDBcblx0XHRcdGxpbmVIZWlnaHQ6IDEuM1xuXHRcdFx0Y29sb3I6ICdyZ2JhKDAsMCwwLC44NyknXG5jbGFzcyBleHBvcnRzLk1lbnUgZXh0ZW5kcyBUZXh0TGF5ZXJcblx0Y29uc3RydWN0b3I6IChvcHRpb25zKSAtPlxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdG5hbWU6ICcuJ1xuXHRcdFx0Zm9udEZhbWlseTogJ1JvYm90bydcblx0XHRcdGZvbnRTaXplOiAxNFxuXHRcdFx0Zm9udFdlaWdodDogNTAwXG5cdFx0XHRsaW5lSGVpZ2h0OiAxLjdcblx0XHRcdGNvbG9yOiAncmdiYSgwLDAsMCwuODcpJ1xuY2xhc3MgZXhwb3J0cy5Cb2R5MSBleHRlbmRzIFRleHRMYXllclxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMpIC0+XG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0bmFtZTogJy4nXG5cdFx0XHRmb250RmFtaWx5OiAnUm9ib3RvJ1xuXHRcdFx0Zm9udFNpemU6IDE0XG5cdFx0XHRmb250V2VpZ2h0OiA0MDBcblx0XHRcdGxpbmVIZWlnaHQ6IDEuNFxuXHRcdFx0Y29sb3I6ICdyZ2JhKDAsMCwwLC44NyknXG5jbGFzcyBleHBvcnRzLkNhcHRpb24gZXh0ZW5kcyBUZXh0TGF5ZXJcblx0Y29uc3RydWN0b3I6IChvcHRpb25zKSAtPlxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdG5hbWU6ICcuJ1xuXHRcdFx0Zm9udEZhbWlseTogJ1JvYm90bydcblx0XHRcdGZvbnRTaXplOiAxMlxuXHRcdFx0Zm9udFdlaWdodDogNDAwXG5cdFx0XHRsaW5lSGVpZ2h0OiAxLjNcblx0XHRcdGNvbG9yOiAncmdiYSgwLDAsMCwuNTQpJ1xuY2xhc3MgZXhwb3J0cy5CdXR0b24gZXh0ZW5kcyBUZXh0TGF5ZXJcblx0Y29uc3RydWN0b3I6IChvcHRpb25zKSAtPlxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdG5hbWU6ICcuJ1xuXHRcdFx0Zm9udEZhbWlseTogJ1JvYm90bydcblx0XHRcdGZvbnRTaXplOiAxNFxuXHRcdFx0Zm9udFdlaWdodDogNTAwXG5cdFx0XHRsaW5lSGVpZ2h0OiAxLjNcblx0XHRcdGNvbG9yOiAnIzAwOTY4OCdcblx0XHRcdGxldHRlclNwYWNpbmc6IDAuNVxuXHRcdFx0cGFkZGluZzoge2xlZnQ6IDQsIHJpZ2h0OiA0LCB0b3A6IDgsIGJvdHRvbTogMH0sIiwiIyBcdGQ4ODg4ODhQIG9vIGRQXG4jIFx0ICAgODggICAgICAgODhcbiMgXHQgICA4OCAgICBkUCA4OCAuZDg4ODhiLlxuIyBcdCAgIDg4ICAgIDg4IDg4IDg4b29vb2Q4XG4jIFx0ICAgODggICAgODggODggODguICAuLi5cbiMgXHQgICBkUCAgICBkUCBkUCBgODg4ODhQJ1xuXG5UeXBlID0gcmVxdWlyZSAnbWQtY29tcG9uZW50cy9UeXBlJ1xueyBSaXBwbGUgfSA9IHJlcXVpcmUgJ21kLWNvbXBvbmVudHMvUmlwcGxlJ1xueyBJY29uIH0gPSByZXF1aXJlICdtZC1jb21wb25lbnRzL0ljb24nXG57IFRoZW1lIH0gPSByZXF1aXJlICdtZC1jb21wb25lbnRzL1RoZW1lJ1xuXG5leHBvcnRzLlRpbGUgPSBUaWxlID0gY2xhc3MgVGlsZSBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXHRcdFxuXHRcdEBfaGVhZGVyID0gb3B0aW9ucy5oZWFkZXIgPyBmYWxzZVxuXHRcdEBfZm9vdGVyID0gb3B0aW9ucy5mb290ZXIgPyBmYWxzZVxuXHRcdEBfYWN0aW9uID0gb3B0aW9ucy5hY3Rpb24gPyAtPiBudWxsXG5cdFx0QF9oZWFkZXJBY3Rpb24gPSBvcHRpb25zLmhlYWRlckFjdGlvbiA/IC0+IG51bGxcblx0XHRAX2Zvb3RlckFjdGlvbiA9IG9wdGlvbnMuZm9vdGVyQWN0aW9uID8gLT4gbnVsbFxuXHRcdFxuXHRcdGlmIEBfaGVhZGVyIGFuZCBAX2Zvb3RlciB0aGVuIHRocm93ICdUaWxlIGNhbm5vdCBoYXZlIGJvdGggYSBoZWFkZXIgYW5kIGEgZm9vdGVyLidcblx0XHRcblx0XHRAX2ljb24gPSBvcHRpb25zLmljb25cblx0XHRAZ3JpZExpc3QgPSBvcHRpb25zLmdyaWRMaXN0ID8gdGhyb3cgJ1RpbGUgbmVlZHMgYSBncmlkIHByb3BlcnR5Lidcblx0XHRcblx0XHRzdXBlciBfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQGdyaWRMaXN0XG5cdFx0XHR3aWR0aDogQGdyaWRMaXN0LnRpbGVXaWR0aFxuXHRcdFx0aGVpZ2h0OiBAZ3JpZExpc3QudGlsZUhlaWdodFxuXHRcdFx0YW5pbWF0aW9uT3B0aW9uczoge3RpbWU6IC4zfVxuXHRcdFxuXHRcdEBvblRvdWNoU3RhcnQgKGV2ZW50KSAtPiBcblx0XHRcdGlmIEBncmlkTGlzdC5wYXJlbnQ/LnBhcmVudD8uY29udGVudCBhbmQgQGdyaWRMaXN0LnBhcmVudD8ucGFyZW50Py5pc01vdmluZyBpcyBmYWxzZVxuXHRcdFx0XHRSaXBwbGUoQCwgZXZlbnQucG9pbnQsIEBoZWFkZXIsIG9wdGlvbnMuUmlwcGxlQ29sb3IgPyAncmdiYSgwLDAsMCwuMSknKVxuXHRcdFxuXHRcdEBvblRhcCBAX2FjdGlvblxuXHRcdEBvblRhcCAoZXZlbnQpIC0+IGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXG5cblx0XHRpZiBAX2hlYWRlciBvciBAX2Zvb3RlclxuXHRcdFx0QGhlYWRlciA9IG5ldyBMYXllclxuXHRcdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQFxuXHRcdFx0XHR5OiBpZiBAX2Zvb3RlciB0aGVuIEFsaWduLmJvdHRvbSgpXG5cdFx0XHRcdHdpZHRoOiBAd2lkdGhcblx0XHRcdFx0aGVpZ2h0OiBpZiBvcHRpb25zLnN1cHBvcnQgdGhlbiA2OCBlbHNlIDQ4XG5cdFx0XHRcdGJhY2tncm91bmRDb2xvcjogb3B0aW9ucy5iYWNrZ3JvdW5kQ29sb3IgPyAncmdiYSgwLDAsMCwuNSknXG5cdFx0XHRcblx0XHRcdEBoZWFkZXIub25Ub3VjaFN0YXJ0IChldmVudCkgLT4gUmlwcGxlKEAsIGV2ZW50LnBvaW50LCBAdGl0bGUpXG5cdFx0XHRcblx0XHRcdGlmIEBfZm9vdGVyIHRoZW4gQGhlYWRlci5vblRhcCBAX2Zvb3RlckFjdGlvblxuXHRcdFx0ZWxzZSBAaGVhZGVyLm9uVGFwIEBfaGVhZGVyQWN0aW9uXG5cblx0XHRcdEBoZWFkZXIub25UYXAgKGV2ZW50KSAtPiBldmVudC5zdG9wUHJvcGFnYXRpb24oKVxuXG5cdFx0XHRpZiBvcHRpb25zLnRpdGxlXG5cdFx0XHRcdEBoZWFkZXIudGl0bGUgPSBuZXcgVHlwZS5SZWd1bGFyXG5cdFx0XHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEBoZWFkZXJcblx0XHRcdFx0XHR4OiA4LCB5OiBpZiBvcHRpb25zLnN1cHBvcnQgdGhlbiAxMiBlbHNlIEFsaWduLmNlbnRlcigpXG5cdFx0XHRcdFx0Y29sb3I6IEBjb2xvclxuXHRcdFx0XHRcdHRleHQ6IG9wdGlvbnMudGl0bGUgPyAnVHdvIExpbmUnXG5cdFx0XHRcblx0XHRcdFx0aWYgb3B0aW9ucy5zdXBwb3J0XG5cdFx0XHRcdFx0QGhlYWRlci5zdXBwb3J0ID0gbmV3IFRleHRMYXllclxuXHRcdFx0XHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEBoZWFkZXJcblx0XHRcdFx0XHRcdHg6IDgsIHk6IDM1XG5cdFx0XHRcdFx0XHRmb250U2l6ZTogMTJcblx0XHRcdFx0XHRcdGZvbnRGYW1pbHk6ICdSb2JvdG8nXG5cdFx0XHRcdFx0XHRjb2xvcjogQGNvbG9yXG5cdFx0XHRcdFx0XHR0ZXh0OiBvcHRpb25zLnN1cHBvcnQgPyAnU3VwcG9ydCB0ZXh0J1xuXHRcdFx0XG5cdFx0XHRpZiBvcHRpb25zLmljb25cblx0XHRcdFx0QGhlYWRlci5pY29uID0gbmV3IEljb25cblx0XHRcdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQGhlYWRlclxuXHRcdFx0XHRcdHg6IEFsaWduLnJpZ2h0KC0xMiksIHk6IGlmIG9wdGlvbnMuc3VwcG9ydCB0aGVuIDIwIGVsc2UgQWxpZ24uY2VudGVyKClcblx0XHRcdFx0XHRpY29uOiBvcHRpb25zLmljb25cblx0XHRcdFx0XHRjb2xvcjogQGNvbG9yXG5cblx0XHRAaSA9IHVuZGVmaW5lZFxuXHRcdEBncmlkTGlzdC5hZGRUaWxlKEApIiwiIyBcdGQ4ODg4ODhQIGRQXG4jIFx0ICAgODggICAgODhcbiMgXHQgICA4OCAgICA4OGQ4ODhiLiAuZDg4ODhiLiA4OGQ4Yi5kOGIuIC5kODg4OGIuXG4jIFx0ICAgODggICAgODgnICBgODggODhvb29vZDggODgnYDg4J2A4OCA4OG9vb29kOFxuIyBcdCAgIDg4ICAgIDg4ICAgIDg4IDg4LiAgLi4uIDg4ICA4OCAgODggODguICAuLi5cbiMgXHQgICBkUCAgICBkUCAgICBkUCBgODg4ODhQJyBkUCAgZFAgIGRQIGA4ODg4OFAnXG5cblxuIyBXaGVuIGxvYWRlZCwgdGhpcyBtb2R1bGUgd2lsbCBhdHRlbXB0IHRvIGNyZWF0ZSBhIG5ldyB0aGVtZSBiYXNlZCBvbiBcbiMgdGhlIERlc2lnbiBNb2RlIHRlbXBsYXRlLlxuXG5tb2RpZnlDb2xvciA9IChjb2xvciwgaCwgcywgbCkgLT5cblx0Y2xpcCA9IF8ucmVwbGFjZShfLnJlcGxhY2UoY29sb3IudG9Ic2xTdHJpbmcoKS5zbGljZSg0LCAtMSksICclJywgJycpLCAnJScsICcnKSAuc3BsaXQoJywgJylcblxuXHRuZXdDb2xvciA9IG5ldyBDb2xvcihcblx0XHRoOiBfLnBhcnNlSW50KGNsaXBbMF0pICsgaCwgXG5cdFx0czogKF8ucGFyc2VJbnQoY2xpcFsxXSkgKyBzKS8xMDAsIFxuXHRcdGw6IChfLnBhcnNlSW50KGNsaXBbMl0pICsgbCkvMTAwLCBcblx0XHRhOiAxKVxuXHRcblx0cmV0dXJuIG5ld0NvbG9yXG5cbnByaW1hcnlDb2xvciA9IHByaW1hcnlfY29sb3IuYmFja2dyb3VuZENvbG9yXG5wcmltYXJ5SW52ZXJ0ID0gMTAwIC0gKHByaW1hcnlfaW52ZXJ0Lm9wYWNpdHkgKiAxMDApXG5zZWNvbmRhcnlDb2xvciA9IHNlY29uZGFyeV9jb2xvci5iYWNrZ3JvdW5kQ29sb3Jcbm1lbnVDb2xvciA9IG1lbnVfY29sb3IuYmFja2dyb3VuZENvbG9yXG5tZW51VGV4dENvbG9yID0gbWVudV90ZXh0X2NvbG9yLmNvbG9yXG5tZW51SW52ZXJ0ID0gMTAwIC0gKG1lbnVfaW52ZXJ0Lm9wYWNpdHkgKiAxMDApXG5cblxuc291cmNlID1cblx0Y29sb3JzOlxuXHRcdHByaW1hcnk6XG5cdFx0XHRtYWluOiBwcmltYXJ5Q29sb3Jcblx0XHRcdGxpZ2h0OiBtb2RpZnlDb2xvcihwcmltYXJ5Q29sb3IsIDEzLCAtNSwgMTUpXG5cdFx0XHRkYXJrOiBtb2RpZnlDb2xvcihwcmltYXJ5Q29sb3IsIC0xLCAtNywgLTEyKVxuXHRcdFx0dGV4dDogcHJpbWFyeV90ZXh0X2NvbG9yLmNvbG9yXG5cdFx0XHRpbnZlcnQ6IHByaW1hcnlJbnZlcnRcblx0XHRzZWNvbmRhcnk6XG5cdFx0XHRtYWluOiBzZWNvbmRhcnlDb2xvclxuXHRcdFx0bGlnaHQ6IG1vZGlmeUNvbG9yKHNlY29uZGFyeUNvbG9yLCAxMywgLTUsIDE1KVxuXHRcdFx0ZGFyazogbW9kaWZ5Q29sb3Ioc2Vjb25kYXJ5Q29sb3IsIC0xLCAtNywgLTEyKVxuXHRcdFx0dGV4dDogc2Vjb25kYXJ5X3RleHRfY29sb3IuY29sb3Jcblx0XHRtZW51OlxuXHRcdFx0bGlnaHQ6IG1lbnVDb2xvclxuXHRcdFx0dGV4dDogbWVudVRleHRDb2xvclxuXHRcdFx0aW52ZXJ0OiBtZW51SW52ZXJ0XG5cblRoZW1lID0gXG5cdHRpbnQ6IHNvdXJjZS5jb2xvcnMuc2Vjb25kYXJ5Lm1haW5cblx0cHJpbWFyeTogc291cmNlLmNvbG9ycy5wcmltYXJ5Lm1haW5cblx0c2Vjb25kYXJ5OiBzb3VyY2UuY29sb3JzLnNlY29uZGFyeS5tYWluXG5cdG1lbnU6IHNvdXJjZS5jb2xvcnMubWVudS5saWdodFxuXHRjb2xvcnM6IHNvdXJjZS5jb2xvcnNcblxuXHR1c2VyOlxuXHRcdGltYWdlOiB1bmRlZmluZWRcblxuXHRoZWFkZXI6IFxuXHRcdGJhY2tncm91bmRDb2xvcjogc291cmNlLmNvbG9ycy5wcmltYXJ5Lm1haW5cblx0XHR0aXRsZTogc291cmNlLmNvbG9ycy5wcmltYXJ5LnRleHRcblx0XHRpbnZlcnQ6IHByaW1hcnlJbnZlcnRcblx0XHRpY29uOlxuXHRcdFx0Y29sb3I6IHNvdXJjZS5jb2xvcnMucHJpbWFyeS50ZXh0XG5cdFx0dGFiczpcblx0XHRcdGJhY2tncm91bmRDb2xvcjogc291cmNlLmNvbG9ycy5wcmltYXJ5LmxpZ2h0XG5cdFx0XHRjb2xvcjogc291cmNlLmNvbG9ycy5wcmltYXJ5LnRleHRcblx0XHRcdHNlbGVjdG9yOiBzb3VyY2UuY29sb3JzLnNlY29uZGFyeS5tYWluXG5cdFxuXHRzdGF0dXNCYXI6IFxuXHRcdGltYWdlOiAnbW9kdWxlcy9tZC1pbWFnZXMvc3RhdHVzX2Jhci5wbmcnXG5cdFx0YmFja2dyb3VuZENvbG9yOiBzb3VyY2UuY29sb3JzLnByaW1hcnkuZGFya1xuXHRcdGludmVydDogcHJpbWFyeUludmVydFxuXHRcblx0Ym90dG9tTmF2OlxuXHRcdGJhY2tncm91bmRDb2xvcjogJyNGRkZGRkYnXG5cdFx0c2hhZG93WTogLTJcblx0XHRzaGFkb3dCbHVyOiA2XG5cdFx0c2hhZG93Q29sb3I6ICdyZ2JhKDAsMCwwLC4xKSdcblx0XG5cdG5hdkJhcjpcblx0XHRiYWNrZ3JvdW5kQ29sb3I6ICcjMDAwMDAwJ1xuXHRcblx0a2V5Ym9hcmQ6XG5cdFx0aW1hZ2U6ICdtb2R1bGVzL21kLWltYWdlcy9rZXlib2FyZC5wbmcnXG5cblx0Zm9vdGVyOlxuXHRcdGltYWdlOiAnbW9kdWxlcy9tZC1pbWFnZXMvbmF2X2Jhci5wbmcnXG5cblx0cGFnZTpcblx0XHRwcmltYXJ5OlxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiAnI0UxRTJFMSdcblx0XHRzZWNvbmRhcnk6XG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6ICcjRjVGNUY2J1xuXG5cdG1lbnVPdmVybGF5OlxuXHRcdGhlYWRlcjpcblx0XHRcdGJhY2tncm91bmRDb2xvcjogc291cmNlLmNvbG9ycy5zZWNvbmRhcnkubWFpblxuXHRcdFx0aWNvbjogc291cmNlLmNvbG9ycy5zZWNvbmRhcnkubGlnaHRcblx0XHRcdHRleHQ6IHNvdXJjZS5jb2xvcnMuc2Vjb25kYXJ5LnRleHRcblx0XHRzdWJoZWFkZXI6XG5cdFx0XHRjb2xvcjogc291cmNlLmNvbG9ycy5tZW51LnRleHRcblx0XHRcdHRleHQ6IHNvdXJjZS5jb2xvcnMuc2Vjb25kYXJ5LnRleHRcblx0XHRcdGljb246IHNvdXJjZS5jb2xvcnMuc2Vjb25kYXJ5LnRleHRcblx0XHRiYWNrZ3JvdW5kQ29sb3I6IHNvdXJjZS5jb2xvcnMubWVudS5saWdodFxuXHRcdHRleHQ6IHNvdXJjZS5jb2xvcnMubWVudS50ZXh0XG5cdFx0c2xpZGVyOiBcblx0XHRcdGtub2I6IHNvdXJjZS5jb2xvcnMuc2Vjb25kYXJ5LmxpZ2h0XG5cdFx0XHRmaWxsOiBzb3VyY2UuY29sb3JzLnNlY29uZGFyeS5kYXJrXG5cdFx0aW52ZXJ0OiBzb3VyY2UuY29sb3JzLm1lbnUuaW52ZXJ0XG5cblx0YnV0dG9uOlxuXHRcdGZsYXQ6XG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcdGNvbG9yOiBzb3VyY2UuY29sb3JzLnNlY29uZGFyeS5tYWluXG5cdFx0XHRzaGFkb3dZOiAwXG5cdFx0XHRzaGFkb3dDb2xvcjogJ3JnYmEoMCwwLDAsLjE4KSdcblx0XHRcdHNoYWRvd0JsdXI6IDBcblxuXHRcdHJhaXNlZDpcblx0XHRcdGJhY2tncm91bmRDb2xvcjogc291cmNlLmNvbG9ycy5zZWNvbmRhcnkubWFpblxuXHRcdFx0Y29sb3I6IHNvdXJjZS5jb2xvcnMuc2Vjb25kYXJ5LnRleHRcblx0XHRcdHNoYWRvd1k6IDJcblx0XHRcdHNoYWRvd0NvbG9yOiAncmdiYSgwLDAsMCwuMTgpJ1xuXHRcdFx0c2hhZG93Qmx1cjogNlxuXG5cdGZhYjpcblx0XHRiYWNrZ3JvdW5kQ29sb3I6IHNvdXJjZS5jb2xvcnMuc2Vjb25kYXJ5Lm1haW5cblx0XHRjb2xvcjogc291cmNlLmNvbG9ycy5zZWNvbmRhcnkudGV4dFxuXHRcdGludmVydDogcHJpbWFyeUludmVydFxuXG5cdGRpYWxvZzogXG5cdFx0YmFja2dyb3VuZENvbG9yOicjRkFGQUZBJ1xuXHRcblx0ZGl2aWRlcjpcblx0XHRiYWNrZ3JvdW5kQ29sb3I6ICdyZ2JhKDAsMCwwLC4xMiknXG5cblx0dGV4dDogXG5cdFx0cHJpbWFyeTogc291cmNlLmNvbG9ycy5wcmltYXJ5LnRleHRcblx0XHRzZWNvbmRhcnk6IHNvdXJjZS5jb2xvcnMuc2Vjb25kYXJ5LnRleHRcblx0XG5cdHRhYmxlOlxuXHRcdGJhY2tncm91bmRDb2xvcjogJyNGRkZGRkYnXG5cdFx0dGV4dDogc291cmNlLmNvbG9ycy5wcmltYXJ5LnRleHRcblx0XHRjaGVja0JveDpcblx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFx0Ym9yZGVyQ29sb3I6ICcjRDNEM0QzJ1xuXHRcdHNlbGVjdGVkOlxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBzb3VyY2UuY29sb3JzLnNlY29uZGFyeS5tYWluXG5cdFx0XHR0ZXh0OiBzb3VyY2UuY29sb3JzLnByaW1hcnkudGV4dFxuXHRcdFx0Y2hlY2tCb3g6XG5cdFx0XHRcdGJhY2tncm91bmRDb2xvcjogc291cmNlLmNvbG9ycy5zZWNvbmRhcnkuZGFya1xuXHRcdFx0XHRib3JkZXJDb2xvcjogbnVsbFxuXG5cdHNuYWNrYmFyOlxuXHRcdGJhY2tncm91bmRDb2xvcjogJ3JnYmEoNTEsIDUxLCA1MSwgMSknXG5cdFx0Y29sb3I6ICdyZ2JhKDI1NSwgMjU1LCAyNTUsIDEpJ1xuXG5cdHNsaWRlcjpcblx0XHRrbm9iOiBzb3VyY2UuY29sb3JzLnByaW1hcnkubGlnaHRcblx0XHRmaWxsOiBzb3VyY2UuY29sb3JzLnByaW1hcnkuZGFya1xuXG5cdGNhcmQ6XG5cdFx0aGVhZGVyOiBzb3VyY2UuY29sb3JzLnNlY29uZGFyeS5kYXJrXG5cblxuY29sb3JfcGFsbGV0ZS5kZXN0cm95KClcblxuZXhwb3J0cy5UaGVtZSA9IFRoZW1lXG4iLCJUeXBlID0gcmVxdWlyZSAnbWQtY29tcG9uZW50cy9UeXBlJ1xueyBSaXBwbGUgfSA9IHJlcXVpcmUgJ21kLWNvbXBvbmVudHMvUmlwcGxlJ1xueyBJY29uIH0gPSByZXF1aXJlICdtZC1jb21wb25lbnRzL0ljb24nXG57IFRoZW1lIH0gPSByZXF1aXJlICdtZC1jb21wb25lbnRzL1RoZW1lJ1xuXG4jIFx0ZDg4ODg4OFAgICAgICAgICAgICAgICAgICAgICBkUCAgICA4ODg4ODg4OGIgb28gICAgICAgICAgZFAgICAgICAgZFBcbiMgXHQgICA4OCAgICAgICAgICAgICAgICAgICAgICAgIDg4ICAgIDg4ICAgICAgICAgICAgICAgICAgICA4OCAgICAgICA4OFxuIyBcdCAgIDg4ICAgIC5kODg4OGIuIGRQLiAgLmRQIGQ4ODg4UCBhODhhYWFhICAgIGRQIC5kODg4OGIuIDg4IC5kODg4Yjg4XG4jIFx0ICAgODggICAgODhvb29vZDggIGA4YmQ4JyAgICA4OCAgICA4OCAgICAgICAgODggODhvb29vZDggODggODgnICBgODhcbiMgXHQgICA4OCAgICA4OC4gIC4uLiAgLmQ4OGIuICAgIDg4ICAgIDg4ICAgICAgICA4OCA4OC4gIC4uLiA4OCA4OC4gIC44OFxuIyBcdCAgIGRQICAgIGA4ODg4OFAnIGRQJyAgYGRQICAgZFAgICAgZFAgICAgICAgIGRQIGA4ODg4OFAnIGRQIGA4ODg4OFA4XG4jIFx0XG4jIFx0XG5cbmV4cG9ydHMuVGV4dEZpZWxkID0gY2xhc3MgVGV4dEZpZWxkXG5cbiIsIlxuIyBcdC5kODg4ODhiICAgICAgICAgICAgIG9vICAgZFAgICAgICAgICAgICBkUFxuIyBcdDg4LiAgICBcIicgICAgICAgICAgICAgICAgIDg4ICAgICAgICAgICAgODhcbiMgXHRgWTg4ODg4Yi4gZFAgIGRQICBkUCBkUCBkODg4OFAgLmQ4ODg4Yi4gODhkODg4Yi5cbiMgXHQgICAgICBgOGIgODggIDg4ICA4OCA4OCAgIDg4ICAgODgnICBgXCJcIiA4OCcgIGA4OFxuIyBcdGQ4JyAgIC44UCA4OC44OGIuODgnIDg4ICAgODggICA4OC4gIC4uLiA4OCAgICA4OFxuIyBcdCBZODg4ODhQICA4ODg4UCBZOFAgIGRQICAgZFAgICBgODg4ODhQJyBkUCAgICBkUFxuXG5UeXBlID0gcmVxdWlyZSAnbWQtY29tcG9uZW50cy9UeXBlJ1xueyBSaXBwbGUgfSA9IHJlcXVpcmUgJ21kLWNvbXBvbmVudHMvUmlwcGxlJ1xueyBJY29uIH0gPSByZXF1aXJlICdtZC1jb21wb25lbnRzL0ljb24nXG57IFRoZW1lIH0gPSByZXF1aXJlICdtZC1jb21wb25lbnRzL1RoZW1lJ1xuXG5leHBvcnRzLlN3aXRjaCA9IGNsYXNzIFN3aXRjaCBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXG5cdFx0QF9pc09uID0gdW5kZWZpbmVkXG5cblx0XHRzdXBlciBfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRuYW1lOiAnLidcblx0XHRcdHdpZHRoOiAzNCwgaGVpZ2h0OiAxNCwgYm9yZGVyUmFkaXVzOiA3XG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6ICdyZ2JhKDM0LCAzMSwgMzEsIC4yNiknXG5cdFx0XHRhbmltYXRpb25PcHRpb25zOiB7dGltZTogLjE1fVxuXG5cdFx0QGtub2IgPSBuZXcgTGF5ZXJcblx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBAXG5cdFx0XHR4OiAwLCB5OiBBbGlnbi5jZW50ZXJcblx0XHRcdHdpZHRoOiAyMCwgaGVpZ2h0OiAyMCwgYm9yZGVyUmFkaXVzOiAxMFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiAnRjFGMUYxJ1xuXHRcdFx0c2hhZG93WTogMiwgc2hhZG93Qmx1cjogM1xuXHRcdFx0YW5pbWF0aW9uT3B0aW9uczoge3RpbWU6IC4xNX1cblxuXHRcdEBpc09uID0gb3B0aW9ucy5pc09uID8gZmFsc2Vcblx0XHRAb25UYXAgLT4gQGlzT24gPSAhQGlzT25cblxuXHRAZGVmaW5lIFwiaXNPblwiLFxuXHRcdGdldDogLT4gcmV0dXJuIEBfaXNPblxuXHRcdHNldDogKGJvb2wpIC0+XG5cdFx0XHRyZXR1cm4gaWYgYm9vbCBpcyBAX2lzT25cblx0XHRcdFxuXHRcdFx0QF9pc09uID0gYm9vbFxuXHRcdFx0QGVtaXQoXCJjaGFuZ2U6aXNPblwiLCBAX2lzT24sIEApXG5cdFx0XHRAdXBkYXRlKClcblxuXHR1cGRhdGU6IC0+XG5cdFx0aWYgQF9pc09uXG5cdFx0XHRAa25vYi5hbmltYXRlIHt4OiBBbGlnbi5yaWdodCgpLCBiYWNrZ3JvdW5kQ29sb3I6IFRoZW1lLmNvbG9ycy5wcmltYXJ5Lm1haW59XG5cdFx0XHRAYW5pbWF0ZSB7YmFja2dyb3VuZENvbG9yOiBUaGVtZS5jb2xvcnMucHJpbWFyeS5saWdodH1cblx0XHRlbHNlIFxuXHRcdFx0QGtub2IuYW5pbWF0ZSB7eDogMCwgYmFja2dyb3VuZENvbG9yOiAnRjFGMUYxJ31cblx0XHRcdEBhbmltYXRlIHtiYWNrZ3JvdW5kQ29sb3I6ICdyZ2JhKDM0LCAzMSwgMzEsIC4yNiknfVxuIiwiIyAuZDg4ODg4YiAgICBkUCAgICAgICAgICAgICAgZFAgICAgICAgICAgICAgICAgICAgICAgODg4ODg4YmEgICAgICAgICAgICAgICAgICAgXG4jIDg4LiAgICBcIicgICA4OCAgICAgICAgICAgICAgODggICAgICAgICAgICAgICAgICAgICAgODggICAgYDhiICAgICAgICAgICAgICAgICAgXG4jIGBZODg4ODhiLiBkODg4OFAgLmQ4ODg4Yi4gZDg4ODhQIGRQICAgIGRQIC5kODg4OGIuIGE4OGFhYWE4UCcgLmQ4ODg4Yi4gODhkODg4Yi5cbiMgICAgICAgYDhiICAgODggICA4OCcgIGA4OCAgIDg4ICAgODggICAgODggWThvb29vby4gIDg4ICAgYDhiLiA4OCcgIGA4OCA4OCcgIGA4OFxuIyBkOCcgICAuOFAgICA4OCAgIDg4LiAgLjg4ICAgODggICA4OC4gIC44OCAgICAgICA4OCAgODggICAgLjg4IDg4LiAgLjg4IDg4ICAgICAgXG4jICBZODg4ODhQICAgIGRQICAgYDg4ODg4UDggICBkUCAgIGA4ODg4OFAnIGA4ODg4OFAnICA4ODg4ODg4OFAgYDg4ODg4UDggZFAgIFxuXG5UeXBlID0gcmVxdWlyZSAnbWQtY29tcG9uZW50cy9UeXBlJ1xueyBSaXBwbGUgfSA9IHJlcXVpcmUgJ21kLWNvbXBvbmVudHMvUmlwcGxlJ1xueyBJY29uIH0gPSByZXF1aXJlICdtZC1jb21wb25lbnRzL0ljb24nXG57IFRoZW1lIH0gPSByZXF1aXJlICdtZC1jb21wb25lbnRzL1RoZW1lJ1xuXG5leHBvcnRzLlN0YXR1c0JhciA9IGNsYXNzIFN0YXR1c0JhciBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0bmFtZTogJy4nXG5cdFx0XHR3aWR0aDogU2NyZWVuLndpZHRoLCBoZWlnaHQ6IDI0XG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFRoZW1lLnN0YXR1c0Jhci5iYWNrZ3JvdW5kQ29sb3JcblxuXHRcdEBpdGVtcyA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEBcblx0XHRcdHNpemU6IEBzaXplXG5cdFx0XHRpbWFnZTogVGhlbWUuc3RhdHVzQmFyLmltYWdlXG5cdFx0XHRpbnZlcnQ6IFRoZW1lLnN0YXR1c0Jhci5pbnZlcnRcbiIsIiMgXHQuZDg4ODg4YiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZFAgICAgICAgZFBcbiMgXHQ4OC4gICAgXCInICAgICAgICAgICAgICAgICAgICAgICAgICAgIDg4ICAgICAgIDg4XG4jIFx0YFk4ODg4OGIuIDg4ZDg4OGIuIC5kODg4OGIuIC5kODg4OGIuIDg4ICAuZFAgIDg4ZDg4OGIuIC5kODg4OGIuIDg4ZDg4OGIuXG4jIFx0ICAgICAgYDhiIDg4JyAgYDg4IDg4JyAgYDg4IDg4JyAgYFwiXCIgODg4ODhcIiAgIDg4JyAgYDg4IDg4JyAgYDg4IDg4JyAgYDg4XG4jIFx0ZDgnICAgLjhQIDg4ICAgIDg4IDg4LiAgLjg4IDg4LiAgLi4uIDg4ICBgOGIuIDg4LiAgLjg4IDg4LiAgLjg4IDg4XG4jIFx0IFk4ODg4OFAgIGRQICAgIGRQIGA4ODg4OFA4IGA4ODg4OFAnIGRQICAgYFlQIDg4WTg4ODgnIGA4ODg4OFA4IGRQXG5cblR5cGUgPSByZXF1aXJlICdtZC1jb21wb25lbnRzL1R5cGUnXG57IFJpcHBsZSB9ID0gcmVxdWlyZSAnbWQtY29tcG9uZW50cy9SaXBwbGUnXG57IFRoZW1lIH0gPSByZXF1aXJlICdtZC1jb21wb25lbnRzL1RoZW1lJ1xueyBCdXR0b24gfSA9IHJlcXVpcmUgJ21kLWNvbXBvbmVudHMvQnV0dG9uJyBcblxuZXhwb3J0cy5TbmFja2JhciA9IFNuYWNrYmFyID0gY2xhc3MgU25hY2tiYXIgZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblxuXHRcdEBfdGl0bGUgPSBvcHRpb25zLnRpdGxlID8gJ1NuYWNrYmFyJ1xuXHRcdEBfdGltZW91dCA9IG9wdGlvbnMudGltZW91dCA/IDRcblx0XHRAX2FjdGlvbiA9IG9wdGlvbnMuYWN0aW9uXG5cdFx0QF9hcHAgPSBvcHRpb25zLmFwcFxuXG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0bmFtZTogJy4nXG5cdFx0XHR3aWR0aDogU2NyZWVuLndpZHRoXG5cdFx0XHRjbGlwOiB0cnVlXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFRoZW1lLnNuYWNrYmFyLmJhY2tncm91bmRDb2xvclxuXHRcdFx0YW5pbWF0aW9uT3B0aW9uczoge3RpbWU6IC4yNX1cblxuXHRcdHRpdGxlV2lkdGggPSBAd2lkdGggLSA0OFxuXG5cdFx0aWYgQF9hY3Rpb24/XG5cdFx0XHRAYWN0aW9uID0gbmV3IEJ1dHRvblxuXHRcdFx0XHRwYXJlbnQ6IEBcblx0XHRcdFx0eDogQWxpZ24ucmlnaHQoLTgpLCB5OiA0XG5cdFx0XHRcdGNvbG9yOiBAX2FjdGlvbi5jb2xvciA/IFRoZW1lLmNvbG9ycy5wcmltYXJ5LmxpZ2h0XG5cdFx0XHRcdHRleHQ6IEBfYWN0aW9uLnRpdGxlLnRvVXBwZXJDYXNlKClcblx0XHRcdFx0YWN0aW9uOiBAX2FjdGlvbi5hY3Rpb25cblxuXHRcdFx0QGFjdGlvbi5vblRhcCBAaGlkZVxuXHRcdFx0dGl0bGVXaWR0aCA9IEBhY3Rpb24ueCAtIDggLSAyNFxuXG5cdFx0QHRleHRMYWJlbCA9IG5ldyBUeXBlLkJvZHkxXG5cdFx0XHRuYW1lOiAnVGl0bGUnLCBwYXJlbnQ6IEBcblx0XHRcdHg6IDI0LCB5OiAxNFxuXHRcdFx0d2lkdGg6IHRpdGxlV2lkdGhcblx0XHRcdHRleHQ6IEBfdGl0bGVcblx0XHRcdGNvbG9yOiBUaGVtZS5zbmFja2Jhci5jb2xvclxuXG5cdFx0QGhlaWdodCA9IEB0ZXh0TGFiZWwubWF4WSArIDE0XG5cdFx0QGFjdGlvbj8ueSA9IEFsaWduLmNlbnRlclxuXG5cdFx0aWYgQF9hcHA/XG5cdFx0XHRAeSA9IGlmIEBfYXBwLmJvdHRvbU5hdj8gdGhlbiBBbGlnbi5ib3R0b20oLUBfYXBwLmJvdHRvbU5hdi5oZWlnaHQgKyBAaGVpZ2h0KSA/IEFsaWduLmJvdHRvbShAaGVpZ2h0KVxuXG5cdFx0VXRpbHMuZGVsYXkgQF90aW1lb3V0LCBAaGlkZVxuXG5cdFx0QHNob3coKVxuXG5cdHNob3c6ID0+XG5cdFx0aWYgQF9hcHA/XG5cdFx0XHRpZiBAX2FwcC5zbmFja2Jhcj8gXG5cdFx0XHRcdEBfYXBwLnNuYWNrYmFyLmhpZGUoKVxuXHRcdFx0XHRVdGlscy5kZWxheSAxLCBAc2hvd1xuXHRcdFx0XHRyZXR1cm5cblx0XHRcdGVsc2Vcblx0XHRcdFx0QF9hcHAuc25hY2tiYXIgPSBAXG5cdFx0XHRcdEBfYXBwLmFjdGlvbkJ1dHRvbj8uYW5pbWF0ZSB7eTogQF9hcHAuYWN0aW9uQnV0dG9uLnkgLSBAaGVpZ2h0LCBvcHRpb25zOiBAYW5pbWF0aW9uT3B0aW9uc31cblx0XHRcdFx0QGFuaW1hdGUge3k6IEB5IC0gQGhlaWdodH1cblx0XHRlbHNlXG5cdFx0XHRAYW5pbWF0ZSB7eTogQHkgLSBAaGVpZ2h0fVxuXG5cdGhpZGU6ID0+IFxuXHRcdGlmIEBfYXBwP1xuXHRcdFx0QF9hcHAuc25hY2tiYXIgPSB1bmRlZmluZWRcblx0XHRcdEBfYXBwLmFjdGlvbkJ1dHRvbj8uYW5pbWF0ZSB7eTogQF9hcHAuYWN0aW9uQnV0dG9uLnkgKyBAaGVpZ2h0LCBvcHRpb25zOiBAYW5pbWF0aW9uT3B0aW9uc31cblx0XHRcblx0XHRAYW5pbWF0ZSB7aGVpZ2h0OiAwLCB5OiBAeSArIEBoZWlnaHR9XG5cdFx0VXRpbHMuZGVsYXkgLjUsID0+IEBkZXN0cm95KCkiLCIjIFx0LmQ4ODg4OGIgIGRQIG9vICAgICAgIGRQXG4jIFx0ODguICAgIFwiJyA4OCAgICAgICAgICA4OFxuIyBcdGBZODg4ODhiLiA4OCBkUCAuZDg4OGI4OCAuZDg4ODhiLiA4OGQ4ODhiLlxuIyBcdCAgICAgIGA4YiA4OCA4OCA4OCcgIGA4OCA4OG9vb29kOCA4OCcgIGA4OFxuIyBcdGQ4JyAgIC44UCA4OCA4OCA4OC4gIC44OCA4OC4gIC4uLiA4OFxuIyBcdCBZODg4ODhQICBkUCBkUCBgODg4ODhQOCBgODg4ODhQJyBkUFxuXG5UeXBlID0gcmVxdWlyZSAnbWQtY29tcG9uZW50cy9UeXBlJ1xueyBSaXBwbGUgfSA9IHJlcXVpcmUgJ21kLWNvbXBvbmVudHMvUmlwcGxlJ1xueyBJY29uIH0gPSByZXF1aXJlICdtZC1jb21wb25lbnRzL0ljb24nXG57IFRoZW1lIH0gPSByZXF1aXJlICdtZC1jb21wb25lbnRzL1RoZW1lJ1xuXG5leHBvcnRzLlNsaWRlciA9IGNsYXNzIFNsaWRlciBleHRlbmRzIFNsaWRlckNvbXBvbmVudFxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblxuXHRcdEBfbm90Y2hlZCA9IG9wdGlvbnMubm90Y2hlZCA/IGZhbHNlXG5cblxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdG5hbWU6ICcuJywgaGVpZ2h0OiAyXG5cdFx0XHRrbm9iU2l6ZTogMTJcblx0XHRcdGJhY2tncm91bmRDb2xvcjogJ3JnYmEoMCwwLDAsLjI2KSdcblx0XHRcdG1pbjogMSwgbWF4OiAxMFxuXG5cdFx0aWYgb3B0aW9ucy5jdXN0b20gYW5kIHNsaWRlclJlZ3VsYXJIaWdodGxpZ2h0PyBhbmQgc2xpZGVyUmVndWxhcktub2I/XG5cdFx0XHRcdHRyYWNrQ29sb3I9c2xpZGVyUmVndWxhckhpZ2h0bGlnaHQuYmFja2dyb3VuZENvbG9yID8gVGhlbWUuY29sb3JzLnByaW1hcnkubWFpblxuXHRcdFx0XHRrbm9iQ29sb3I9c2xpZGVyUmVndWxhcktub2IuYmFja2dyb3VuZENvbG9yID8gVGhlbWUuY29sb3JzLnByaW1hcnkubWFpblxuXHRcdFx0XHRrbm9iU2l6ZT0gc2xpZGVyUmVndWxhcktub2Iuc2l6ZSA/IEBrbm9iU2l6ZVxuXHRcdFx0XHRrbm9iUmFkaXVzPXNsaWRlclJlZ3VsYXJLbm9iLmJvcmRlclJhZGl1cyA/IEBrbm9iU2l6ZVxuXHRcdGVsc2Vcblx0XHRcdFx0dHJhY2tDb2xvcj1UaGVtZS5jb2xvcnMucHJpbWFyeS5tYWluXG5cdFx0XHRcdGtub2JDb2xvcj1UaGVtZS5jb2xvcnMucHJpbWFyeS5tYWluXG5cdFx0XHRcdGtub2JTaXplPUBrbm9iU2l6ZVxuXHRcdFx0XHRrbm9iUmFkaXVzPUBrbm9iU2l6ZVxuXHRcdEBmaWxsLmJhY2tncm91bmRDb2xvciA9IHRyYWNrQ29sb3JcblxuXHRcdEBrbm9iLnByb3BzID1cblx0XHRcdG5hbWU6ICdLbm9iJ1xuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHRzaGFkb3dYOiAwXG5cdFx0XHRzaGFkb3dZOiAwXG5cdFx0XHRzaGFkb3dCbHVyOiAwXG5cblx0XHRAdGh1bWIgPSBuZXcgTGF5ZXJcblx0XHRcdG5hbWU6ICdUaHVtYicsIHBhcmVudDogQGtub2Jcblx0XHRcdHg6IEFsaWduLmNlbnRlciwgeTogQWxpZ24uY2VudGVyXG5cdFx0XHRzaXplOmtub2JTaXplLCBib3JkZXJSYWRpdXM6IGtub2JSYWRpdXNcblx0XHRcdGJhY2tncm91bmRDb2xvcjoga25vYkNvbG9yXG5cdFx0XHRhbmltYXRpb25PcHRpb25zOiB7dGltZTogLjE1fVxuXG5cdFx0aWYgQF9ub3RjaGVkXG5cblx0XHRcdGZvciBpIGluIFswLi4uQG1heC1AbWluXVxuXHRcdFx0XHRub3RjaCA9IG5ldyBMYXllclxuXHRcdFx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBAXG5cdFx0XHRcdFx0eDogaSAqIEB3aWR0aC8oQG1heC1AbWluKVxuXHRcdFx0XHRcdHdpZHRoOiAyLCBoZWlnaHQ6IDIsIGJvcmRlclJhZGl1czogMixcblx0XHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFRoZW1lLmNvbG9ycy5wcmltYXJ5LnRleHRcblxuXHRcdFx0QHRpcCA9IG5ldyBMYXllclxuXHRcdFx0XHRuYW1lOiAnVGlwJywgcGFyZW50OiBAa25vYlxuXHRcdFx0XHR4OiBBbGlnbi5jZW50ZXIsIHk6IC0yNFxuXHRcdFx0XHR3aWR0aDogMjYsIGhlaWdodDogMzJcblx0XHRcdFx0aHRtbDogJzxzdmcgd2lkdGg9XCIyNnB4XCIgaGVpZ2h0PVwiMzJweFwiIHZpZXdCb3g9XCIwIDAgMjYgMzJcIj48cGF0aCBkPVwiTTEzLDAuMSBDMjAuMiwwLjEgMjYsNiAyNiwxMy4zIEMyNiwxNyAyNCwyMC45IDE4LjcsMjYuMiBMMTMsMzIgTDcuMiwyNi4yIEMyLDIwLjggMCwxNi45IDAsMTMuMyBDLTMuNTUyNzEzNjhlLTE1LDYgNS44LDAuMSAxMywwLjEgTDEzLDAuMSBaXCIgZmlsbD1cIicgKyBrbm9iQ29sb3IgKyAnXCI+PC9wYXRoPjwvc3ZnPidcblx0XHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsLCBvcGFjaXR5OiAwXG5cdFx0XHRcdGFuaW1hdGlvbk9wdGlvbnM6IHt0aW1lOiAuMTV9XG5cblx0XHRcdEB0aXBWYWx1ZSA9IG5ldyBUZXh0TGF5ZXJcblx0XHRcdFx0bmFtZTogJ1RpcCBWYWx1ZScsIHBhcmVudDogQHRpcFxuXHRcdFx0XHR5OiA1LCB3aWR0aDogMjZcblx0XHRcdFx0Y29sb3I6IFRoZW1lLmNvbG9ycy5wcmltYXJ5LnRleHRcblx0XHRcdFx0Zm9udFNpemU6IDEyLCBmb250RmFtaWx5OiAnUm9ib3RvJywgdGV4dEFsaWduOiAnY2VudGVyJ1xuXHRcdFx0XHR0ZXh0OiBcInt2YWx1ZX1cIlxuXG5cdFx0XHRAdGlwVmFsdWUudGVtcGxhdGUgPVxuXHRcdFx0XHR2YWx1ZTogQHZhbHVlXG5cblx0XHRcdEBrbm9iLm9uVG91Y2hTdGFydCA9PlxuXHRcdFx0XHRAdGh1bWIuYW5pbWF0ZSB7b3BhY2l0eTogMH1cblx0XHRcdFx0QHRpcC5hbmltYXRlIHtvcGFjaXR5OiAxfVxuXG5cdFx0XHRAb25Ub3VjaEVuZCAtPlxuXHRcdFx0XHRAdGh1bWIuYW5pbWF0ZSB7b3BhY2l0eTogMX1cblx0XHRcdFx0QHRpcC5hbmltYXRlIHtvcGFjaXR5OiAwfVxuXG5cdFx0XHRyb3VuZCA9IChudW1iZXIsIG5lYXJlc3QpIC0+XG5cdFx0XHQgICAgTWF0aC5yb3VuZChudW1iZXIgLyBuZWFyZXN0KSAqIG5lYXJlc3RcblxuXHRcdFx0QGtub2IuZHJhZ2dhYmxlLnVwZGF0ZVBvc2l0aW9uID0gKHBvaW50KSA9PlxuXHRcdFx0ICAgIHBvaW50LnggPSByb3VuZChwb2ludC54LCBAd2lkdGggLyAoQG1heC1AbWluKSApIC0gKEBrbm9iLndpZHRoIC8gMilcblx0XHRcdCAgICByZXR1cm4gcG9pbnRcblxuXHRcdFx0QG9uVmFsdWVDaGFuZ2UgLT5cblx0XHRcdFx0QHRpcFZhbHVlLnRlbXBsYXRlID0gTWF0aC5yb3VuZChAdmFsdWUpXG5cblx0XHRlbHNlXG5cdFx0XHRAa25vYi5vblRvdWNoU3RhcnQgPT5cblx0XHRcdFx0QHRodW1iLmFuaW1hdGUge3NjYWxlOjEuMX1cblx0XHRcdEBrbm9iLm9uVG91Y2hFbmQgPT5cblx0XHRcdFx0QHRodW1iLmFuaW1hdGUge3NjYWxlOjF9XG4iLCIjICA4ODg4ODhiYSAgICAgICAgICAgICAgICAgICAgICBkUCAgIGRQICAgICAgICAgICAgICAgICAgICAgIFxuIyAgODggICAgYDhiICAgICAgICAgICAgICAgICAgICAgODggICA4OCAgICAgICAgICAgICAgICAgICAgICBcbiMgYTg4YWFhYThQJyAuZDg4ODhiLiBkUCAgZFAgIGRQIDg4IGQ4ODg4UCAuZDg4ODhiLiA4OGQ4Yi5kOGIuXG4jICA4OCAgIGA4Yi4gODgnICBgODggODggIDg4ICA4OCA4OCAgIDg4ICAgODhvb29vZDggODgnYDg4J2A4OFxuIyAgODggICAgIDg4IDg4LiAgLjg4IDg4Ljg4Yi44OCcgODggICA4OCAgIDg4LiAgLi4uIDg4ICA4OCAgODhcbiMgIGRQICAgICBkUCBgODg4ODhQJyA4ODg4UCBZOFAgIGRQICAgZFAgICBgODg4ODhQJyBkUCAgZFAgIGRQXG5cblR5cGUgPSByZXF1aXJlICdtZC1jb21wb25lbnRzL1R5cGUnXG57IFRoZW1lIH0gPSByZXF1aXJlICdtZC1jb21wb25lbnRzL1RoZW1lJ1xueyBEaXZpZGVyIH0gPSByZXF1aXJlICdtZC1jb21wb25lbnRzL0RpdmlkZXInIFxuXG5cbmV4cG9ydHMuUm93SXRlbSA9IGNsYXNzIFJvd0l0ZW0gZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblxuXHRcdEBfaWNvbiA9IG9wdGlvbnMuaWNvblxuXHRcdEBfaWNvbkJhY2tncm91bmRDb2xvciA9IG9wdGlvbnMuaWNvbkJhY2tncm91bmRDb2xvciA/ICcjNzc3J1xuXHRcdEBfdGV4dCA9IG9wdGlvbnMudGV4dCA/ICdSb3cgaXRlbSdcblx0XHRAX3JvdyA9IG9wdGlvbnMucm93ID8gMFxuXHRcdEBfeSA9IDMyICsgKEBfcm93ICogNDgpIFxuXG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0d2lkdGg6IFNjcmVlbi53aWR0aFxuXHRcdFx0eTogQF95XG5cdFx0XHRoZWlnaHQ6IDQ4XG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblxuXHRcdEBpY29uID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQFxuXHRcdFx0eDogMTYsIHk6IEFsaWduLmNlbnRlclxuXHRcdFx0aGVpZ2h0OiAzMiwgd2lkdGg6IDMyLCBib3JkZXJSYWRpdXM6IDE2XG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IEBfaWNvbkJhY2tncm91bmRDb2xvclxuXHRcdFx0aW1hZ2U6IEBfaWNvblxuXG5cdFx0QGxhYmVsTGF5ZXIgPSBuZXcgVHlwZS5SZWd1bGFyXG5cdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQFxuXHRcdFx0eDogQGljb24ubWF4WCArIDE2LCB5OiBBbGlnbi5jZW50ZXJcblx0XHRcdGNvbG9yOiBUaGVtZS50ZXh0LnRleHRcblx0XHRcdHRleHQ6IEBfdGV4dCIsIiMgXHQgODg4ODg4YmEgIG9vICAgICAgICAgICAgICAgICAgIGRQXG4jIFx0IDg4ICAgIGA4YiAgICAgICAgICAgICAgICAgICAgICA4OFxuIyBcdGE4OGFhYWE4UCcgZFAgODhkODg4Yi4gODhkODg4Yi4gODggLmQ4ODg4Yi5cbiMgXHQgODggICBgOGIuIDg4IDg4JyAgYDg4IDg4JyAgYDg4IDg4IDg4b29vb2Q4XG4jIFx0IDg4ICAgICA4OCA4OCA4OC4gIC44OCA4OC4gIC44OCA4OCA4OC4gIC4uLlxuIyBcdCBkUCAgICAgZFAgZFAgODhZODg4UCcgODhZODg4UCcgZFAgYDg4ODg4UCdcbiMgXHQgICAgICAgICAgICAgIDg4ICAgICAgIDg4XG4jIFx0ICAgICAgICAgICAgICBkUCAgICAgICBkUFxuXG4jXHRCeSBkZWZhdWx0LCBzaG93cyBhbiBleHBhbmRpbmcgY2lyY2xlIG92ZXIgYSBsYXllciwgY2xpcHBlZCB0byBpdHMgZnJhbWUuXG4jXHRPbiB0aGUgbGF5ZXIncyB0b3VjaEVuZCBldmVudCwgdGhlIGNpcmNsZSBhbmQgaXRzIG1hc2sgd2lsbCBkaXNhcHBlYXIuXG5cbiNcdHJlcXVpcmVkOlxuI1x0bGF5ZXIgKExheWVyKSwgdGhlIGxheWVyIG92ZXIgd2hpY2ggdG8gc2hvdyB0aGUgcmlwcGxlIGVmZmVjdFxuI1x0cG9pbnQgKG9iamVjdCksIHRoZSByaXBwbGUgb3JpZ2luIHBvaW50LCB1c3VhbGx5IGEgb25Ub3VjaFN0YXJ0J3MgZXZlbnQucG9pbnRcblxuI1x0b3B0aW9uYWw6XG4jXHRwbGFjZUJlaGluZCAoTGF5ZXIpLCBhIGNoaWxkIG9mIGxheWVyIGJlaGluZCB3aGljaCB0aGUgcmlwcGxlIHNob3VsZCBhcHBlYXJcbiNcdGNvbG9yIChzdHJpbmcgb3IgY29sb3Igb2JqZWN0KSwgYSBjdXN0b20gY29sb3IgZm9yIHRoZSByaXBwbGVcblxuUmlwcGxlID0gKGxheWVyLCBwb2ludCwgcGxhY2VCZWhpbmQsIGNvbG9yKSAtPlxuXHRcblx0aWYgIWxheWVyPyB0aGVuIHRocm93ICdSaXBwbGUgcmVxdWlyZXMgYSBMYXllci4gVHJ5IG15TGF5ZXIub25Ub3VjaFN0YXJ0IChldmVudCkgLT4gcmlwcGxlKEAsIGV2ZW50LnBvaW50KSdcblx0aWYgIXBvaW50PyB0aGVuIHRocm93ICdSaXBwbGUgcmVxdWlyZXMgYSBwb2ludC4gVHJ5IG15TGF5ZXIub25Ub3VjaFN0YXJ0IChldmVudCkgLT4gcmlwcGxlKEAsIGV2ZW50LnBvaW50KSdcblxuXHRtYXNrID0gbmV3IExheWVyXG5cdFx0bmFtZTogJy4nXG5cdFx0cGFyZW50OiBsYXllclxuXHRcdHNpemU6IGxheWVyLnNpemVcblx0XHRib3JkZXJSYWRpdXM6IGxheWVyLmJvcmRlclJhZGl1c1xuXHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdGNsaXA6IHRydWVcblx0XHRvcGFjaXR5OiAwXG5cdFx0YW5pbWF0aW9uT3B0aW9uczoge3RpbWU6IC4xNX1cblx0XG5cdGlmIHBsYWNlQmVoaW5kIHRoZW4gbWFzay5wbGFjZUJlaGluZChwbGFjZUJlaGluZClcblx0XG5cdCMgUklQUExFIENJUkNMRVxuXHRcblx0bG9uZ1NpZGUgPSBpZiBsYXllci53aWR0aCA+IGxheWVyLmhlaWdodCB0aGVuIGxheWVyLndpZHRoIGVsc2UgbGF5ZXIuaGVpZ2h0XG5cblx0cmlwcGxlQ2lyY2xlID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiAnLicsIHBhcmVudDogbWFza1xuXHRcdFx0eDogcG9pbnQueCAtIDE2XG5cdFx0XHR5OiBwb2ludC55IC0gMTZcblx0XHRcdHdpZHRoOiAzMiwgaGVpZ2h0OiAzMiwgXG5cdFx0XHRib3JkZXJSYWRpdXM6IGxvbmdTaWRlXG5cdFx0XHRcblx0aWYgY29sb3I/XG5cdFx0cmlwcGxlQ2lyY2xlLnByb3BzID1cblx0XHRcdGJhY2tncm91bmRDb2xvcjogY29sb3Jcblx0ZWxzZSBcblx0XHRyaXBwbGVDaXJjbGUucHJvcHMgPSBcblx0XHRcdGJhY2tncm91bmRDb2xvcjogbGF5ZXIuYmFja2dyb3VuZENvbG9yXG5cdFx0XHRzYXR1cmF0ZTogMTIwXG5cdFx0XHRicmlnaHRuZXNzOiAxMjBcblx0XHRcdG9wYWNpdHk6IC41XG5cdFxuXHQjIEFOSU1BVElPTlMgQ0lSQ0xFXG5cdFxuXHRtYXNrLmFuaW1hdGVcblx0XHRvcGFjaXR5OiAxXG5cdFx0b3B0aW9uczoge3RpbWU6IC4xNX1cblx0XG5cdHJpcHBsZUNpcmNsZS5hbmltYXRlXG5cdFx0eDogcmlwcGxlQ2lyY2xlLnggLSBsb25nU2lkZSAqIDEuM1xuXHRcdHk6IHJpcHBsZUNpcmNsZS55IC0gbG9uZ1NpZGUgKiAxLjNcblx0XHR3aWR0aDogbG9uZ1NpZGUgKiAyLjZcblx0XHRoZWlnaHQ6IGxvbmdTaWRlICogMi42XG5cdFx0b3B0aW9uczoge3RpbWU6IC41fVxuXHRcblx0VXRpbHMuZGVsYXkgMiwgLT4gXG5cdFx0bWFzay5hbmltYXRlXG5cdFx0XHRvcGFjaXR5OiAwXG5cdFx0bWFzay5vbkFuaW1hdGlvbkVuZCBtYXNrLmRlc3Ryb3lcblxuXHQjIFRPVUNIIEVORFxuXHRcblx0bGF5ZXIub25Ub3VjaEVuZCAtPiBcblx0XHRtYXNrLmFuaW1hdGVcblx0XHRcdG9wYWNpdHk6IDBcblx0XHRtYXNrLm9uQW5pbWF0aW9uRW5kIG1hc2suZGVzdHJveVxuXG5leHBvcnRzLlJpcHBsZSA9IFJpcHBsZSIsIiMgXHQgODg4ODg4YmEgICAgICAgICAgICAgICAgIGRQIG9vICAgICAgICAgIGRQXG4jIFx0IDg4ICAgIGA4YiAgICAgICAgICAgICAgICA4OCAgICAgICAgICAgICA4OFxuIyBcdGE4OGFhYWE4UCcgLmQ4ODg4Yi4gLmQ4ODhiODggZFAgLmQ4ODg4Yi4gODhkODg4Yi4gLmQ4ODg4Yi4gZFAuICAuZFBcbiMgXHQgODggICBgOGIuIDg4JyAgYDg4IDg4JyAgYDg4IDg4IDg4JyAgYDg4IDg4JyAgYDg4IDg4JyAgYDg4ICBgOGJkOCdcbiMgXHQgODggICAgIDg4IDg4LiAgLjg4IDg4LiAgLjg4IDg4IDg4LiAgLjg4IDg4LiAgLjg4IDg4LiAgLjg4ICAuZDg4Yi5cbiMgXHQgZFAgICAgIGRQIGA4ODg4OFA4IGA4ODg4OFA4IGRQIGA4ODg4OFAnIDg4WTg4ODgnIGA4ODg4OFAnIGRQJyAgYGRQXG5cblxuVHlwZSA9IHJlcXVpcmUgJ21kLWNvbXBvbmVudHMvVHlwZSdcbnsgUmlwcGxlIH0gPSByZXF1aXJlICdtZC1jb21wb25lbnRzL1JpcHBsZSdcbnsgSWNvbiB9ID0gcmVxdWlyZSAnbWQtY29tcG9uZW50cy9JY29uJ1xueyBUaGVtZSB9ID0gcmVxdWlyZSAnbWQtY29tcG9uZW50cy9UaGVtZSdcblxuZXhwb3J0cy5SYWRpb2JveCA9IFJhZGlvYm94ID0gY2xhc3MgUmFkaW9ib3ggZXh0ZW5kcyBJY29uXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXG5cdFx0QF9pc09uID0gdW5kZWZpbmVkXG5cdFx0QF9ncm91cCA9IG9wdGlvbnMuZ3JvdXAgPyBbXVxuXG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0bmFtZTogJy4nXG5cdFx0XHRhbmltYXRpb25PcHRpb25zOiB7dGltZTogLjE1fVxuXHRcdFx0aWNvbjogJ3JhZGlvYm94LWJsYW5rJ1xuXHRcdFx0Y29sb3I6ICdyZ2JhKDAsMCwwLC41NCknXG5cblx0XHRAaXNPbiA9IG9wdGlvbnMuaXNPbiA/IGZhbHNlXG5cdFx0QG9uVGFwIC0+IGlmIEBpc09uIGlzIGZhbHNlIHRoZW4gQGlzT24gPSB0cnVlXG5cblx0XHRAX2dyb3VwLnB1c2goQClcblxuXHRAZGVmaW5lIFwiaXNPblwiLFxuXHRcdGdldDogLT4gcmV0dXJuIEBfaXNPblxuXHRcdHNldDogKGJvb2wpIC0+XG5cdFx0XHRyZXR1cm4gaWYgYm9vbCBpcyBAX2lzT25cblx0XHRcdFxuXHRcdFx0QF9pc09uID0gYm9vbFxuXHRcdFx0QGVtaXQoXCJjaGFuZ2U6aXNPblwiLCBAX2lzT24sIEApXG5cdFx0XHRAdXBkYXRlKClcblxuXHR1cGRhdGU6IC0+XG5cdFx0aWYgQF9pc09uXG5cdFx0XHRAaWNvbiA9ICdyYWRpb2JveC1tYXJrZWQnXG5cdFx0XHRAY29sb3IgPSBUaGVtZS5jb2xvcnMucHJpbWFyeS5tYWluXG5cblx0XHRcdHJhZGlvYm94LmlzT24gPSBmYWxzZSBmb3IgcmFkaW9ib3ggaW4gXy53aXRob3V0KEBfZ3JvdXAsIEApXG5cdFx0ZWxzZSBcblx0XHRcdEBpY29uID0gJ3JhZGlvYm94LWJsYW5rJ1xuXHRcdFx0QGNvbG9yID0gJ3JnYmEoMCwwLDAsLjU0KSciLCJcbiMgIDg4ODg4OGJhICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuIyAgODggICAgYDhiICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4jIGE4OGFhYWE4UCcgLmQ4ODg4Yi4gLmQ4ODg4Yi4gLmQ4ODg4Yi5cbiMgIDg4ICAgICAgICA4OCcgIGA4OCA4OCcgIGA4OCA4OG9vb29kOFxuIyAgODggICAgICAgIDg4LiAgLjg4IDg4LiAgLjg4IDg4LiAgLi4uXG4jICBkUCAgICAgICAgYDg4ODg4UDggYDg4ODhQODggYDg4ODg4UCdcbiMgICAgICAgICAgICAgICAgICAgICAgICAgIC44OCAgICAgICAgIFxuIyAgICAgICAgICAgICAgICAgICAgICBkODg4OFAgICAgICAgICAgXG5cbnsgVGhlbWUgfSA9IHJlcXVpcmUgJ21kLWNvbXBvbmVudHMvVGhlbWUnXG5cbmV4cG9ydHMuUGFnZSA9IGNsYXNzIFBhZ2UgZXh0ZW5kcyBTY3JvbGxDb21wb25lbnRcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cdFx0XG5cdFx0QF9oZWFkZXIgPSB7fVxuXHRcdEBfaGVhZGVyLnRpdGxlID0gb3B0aW9ucy5oZWFkZXI/LnRpdGxlID8gJ05ldyBQYWdlJ1xuXHRcdEBfaGVhZGVyLnZpc2libGUgPSBvcHRpb25zLmhlYWRlcj8udmlzaWJsZSA/IHRydWVcblx0XHRAX2hlYWRlci5pY29uID0gb3B0aW9ucy5oZWFkZXI/Lmljb24gPyAnbWVudSdcblx0XHRAX2hlYWRlci5pY29uQWN0aW9uID0gb3B0aW9ucy5oZWFkZXI/Lmljb25BY3Rpb24gPyAtPiBudWxsXG5cblx0XHRAX3RlbXBsYXRlID0gb3B0aW9ucy50ZW1wbGF0ZVxuXHRcdEBfdGVtcGxhdGVPcGFjaXR5ID0gb3B0aW9ucy50ZW1wbGF0ZU9wYWNpdHkgPyAuNVxuXHRcdEBfb25Mb2FkID0gb3B0aW9ucy5vbkxvYWQgPyAtPiBudWxsXG5cblx0XHRpZiBAX2hlYWRlci5pY29uQWN0aW9uIHRoZW4gQF9oZWFkZXIuaWNvbkFjdGlvbiA9IF8uYmluZChAX2hlYWRlci5pY29uQWN0aW9uLCBAKVxuXHRcdGlmIEBfb25Mb2FkIHRoZW4gQF9vbkxvYWQgPSBfLmJpbmQoQF9vbkxvYWQsIEApXG5cblx0XHRzdXBlciBfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRuYW1lOiAnUGFnZSdcblx0XHRcdHNpemU6IFNjcmVlbi5zaXplXG5cdFx0XHRzY3JvbGxIb3Jpem9udGFsOiBmYWxzZVxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBUaGVtZS5wYWdlLnByaW1hcnkuYmFja2dyb3VuZENvbG9yXG5cdFx0XG5cdFx0QGNvbnRlbnRJbnNldCA9XG5cdFx0XHR0b3A6IDAsIGJvdHRvbTogMTYwXG5cblx0XHRAY29udGVudC5iYWNrZ3JvdW5kQ29sb3IgPSBudWxsXG5cblx0XHRpZiBAX3RlbXBsYXRlP1xuXHRcdFx0QF90ZW1wbGF0ZS5wcm9wcyA9XG5cdFx0XHRcdHBhcmVudDogQFxuXHRcdFx0XHRvcGFjaXR5OiBAX3RlbXBsYXRlT3BhY2l0eVxuXG5cdFx0QHNlbmRUb0JhY2soKVxuXG5cdHVwZGF0ZTogLT4gcmV0dXJuIG51bGwiLCIjIFx0ODg4ODg4YmEgICAgICAgICAgICAgZFAgICBvbyAuODg4OGIgb28gICAgICAgICAgICAgICAgICAgICBkUCAgIG9vXG4jIFx0ODggICAgYDhiICAgICAgICAgICAgODggICAgICA4OCAgIFwiICAgICAgICAgICAgICAgICAgICAgICAgODhcbiMgXHQ4OCAgICAgODggLmQ4ODg4Yi4gZDg4ODhQIGRQIDg4YWFhICBkUCAuZDg4ODhiLiAuZDg4ODhiLiBkODg4OFAgZFAgLmQ4ODg4Yi4gODhkODg4Yi5cbiMgXHQ4OCAgICAgODggODgnICBgODggICA4OCAgIDg4IDg4ICAgICA4OCA4OCcgIGBcIlwiIDg4JyAgYDg4ICAgODggICA4OCA4OCcgIGA4OCA4OCcgIGA4OFxuIyBcdDg4ICAgICA4OCA4OC4gIC44OCAgIDg4ICAgODggODggICAgIDg4IDg4LiAgLi4uIDg4LiAgLjg4ICAgODggICA4OCA4OC4gIC44OCA4OCAgICA4OFxuIyBcdGRQICAgICBkUCBgODg4ODhQJyAgIGRQICAgZFAgZFAgICAgIGRQIGA4ODg4OFAnIGA4ODg4OFA4ICAgZFAgICBkUCBgODg4ODhQJyBkUCAgICBkUFxuXG4jIE5vdGlmaWNhdGlvbiBkb2VzIG5vdCByZXF1aXJlIGFuIGFwcCBwcm9wZXJ0eSwgaG93ZXZlciBpZiBvbmUgaXMgbm90IHNldCB0aGVuIG5vdGlmaWNhdGlvbnMgd2lsbCBub3QgZmxvdyBhcm91bmQgZWFjaG90aGVyLlxuXG4jIFRPRE86IHJlcGxhY2UgYWN0aW9uMSBhbmQgYWN0aW9uMiB3aXRoIGFycmF5IG9mIGFjdGlvbnMuXG5cblR5cGUgPSByZXF1aXJlICdtZC1jb21wb25lbnRzL1R5cGUnXG57IFJpcHBsZSB9ID0gcmVxdWlyZSAnbWQtY29tcG9uZW50cy9SaXBwbGUnXG57IEljb24gfSA9IHJlcXVpcmUgJ21kLWNvbXBvbmVudHMvSWNvbidcbnsgVGhlbWUgfSA9IHJlcXVpcmUgJ21kLWNvbXBvbmVudHMvVGhlbWUnXG57IERpdmlkZXIgfSA9IHJlcXVpcmUgJ21kLWNvbXBvbmVudHMvRGl2aWRlcicgXG5cbmV4cG9ydHMuTm90aWZpY2F0aW9uID0gTm90aWZpY2F0aW9uID0gY2xhc3MgTm90aWZpY2F0aW9uIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cdFx0XG5cdFx0QF90aXRsZSA9IG9wdGlvbnMudGl0bGUgPyAnTm90aWZpY2F0aW9uJ1xuXHRcdEBfYm9keSA9IG9wdGlvbnMuYm9keSA/ICdUaGlzIGlzIGEgbm90aWZpY2F0aW9uLidcblx0XHRAX2ljb24gPSBvcHRpb25zLmljb24gPyB1bmRlZmluZWRcblx0XHRAX2ljb25Db2xvciA9IG9wdGlvbnMuaWNvbkNvbG9yID8gVGhlbWUudGV4dC5zZWNvbmRhcnlcblx0XHRAX2ljb25CYWNrZ3JvdW5kQ29sb3IgPSBvcHRpb25zLmljb25CYWNrZ3JvdW5kQ29sb3IgPyBUaGVtZS5zZWNvbmRhcnlcblx0XHRAX3RpbWUgPSBvcHRpb25zLnRpbWUgPyBuZXcgRGF0ZSgpXG5cdFx0I1RPRE86IHJlcGxhY2UgYWN0aW9uMSAvIGFjdGlvbjIgd2l0aCBAYWN0aW9ucyAoYXJyYXkpXG5cdFx0QF9hY3Rpb24xID0gb3B0aW9ucy5hY3Rpb24xXG5cdFx0QF9hY3Rpb24yID0gb3B0aW9ucy5hY3Rpb24yXG5cdFx0QF90aW1lb3V0ID0gb3B0aW9ucy50aW1lb3V0ID8gNVxuXHRcdEBfYXBwID0gb3B0aW9ucy5hcHBcblxuXHRcdCMgYWN0aW9ucyBzaG91bGQgYmUge3RpdGxlOiAnYXJjaGl2ZScsIGljb246ICdhcmNoaXZlJ31cblx0XHRcblx0XHRpbml0WSA9IHVuZGVmaW5lZFxuXHRcdGlmIEBfYXBwP1xuXHRcdFx0aW5pdFkgPSBpZiBAX2FwcC5ub3RpZmljYXRpb25zLmxlbmd0aCA+IDAgdGhlbiBfLmxhc3QoQF9hcHAubm90aWZpY2F0aW9ucykubWF4WSArIDggZWxzZSBAX2FwcC5oZWFkZXIubWF4WSArIDRcblx0XHRcdEBfYXBwLm5vdGlmaWNhdGlvbnMucHVzaChAKVxuXG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0bmFtZTogb3B0aW9ucy5uYW1lID8gJy4nXG5cdFx0XHR3aWR0aDogMzQ0LCBib3JkZXJSYWRpdXM6IDJcblx0XHRcdHg6IEFsaWduLmNlbnRlciwgeTogaW5pdFkgPyAwXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFRoZW1lLmRpYWxvZy5iYWNrZ3JvdW5kQ29sb3Jcblx0XHRcdHNoYWRvd1g6IDAsIHNoYWRvd1k6IDIsIHNoYWRvd0JsdXI6IDNcblx0XHRcdG9wYWNpdHk6IDAsIHNoYWRvd0NvbG9yOiAncmdiYSgwLDAsMCwuMyknXG5cdFx0XHRhbmltYXRpb25PcHRpb25zOiB7dGltZTogLjI1fVxuXG5cdFx0QGljb25MYXllciA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogJ0ljb24gQ29udGFpbmVyJ1xuXHRcdFx0cGFyZW50OiBAXG5cdFx0XHR4OiAxMiwgeTogMTJcblx0XHRcdGhlaWdodDogNDAsIHdpZHRoOiA0MCwgYm9yZGVyUmFkaXVzOiAyMFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBAX2ljb25CYWNrZ3JvdW5kQ29sb3JcblxuXHRcdGlmIEBfaWNvblxuXHRcdFx0QGljb24gPSBuZXcgSWNvblxuXHRcdFx0XHRuYW1lOiAnSWNvbidcblx0XHRcdFx0cGFyZW50OiBAaWNvbkxheWVyXG5cdFx0XHRcdHg6IEFsaWduLmNlbnRlciwgeTogQWxpZ24uY2VudGVyXG5cdFx0XHRcdGNvbG9yOiBAX2ljb25Db2xvclxuXHRcdFx0XHRpY29uOiBAX2ljb25cblxuXHRcdEB0aXRsZSA9IG5ldyBUeXBlLlN1YmhlYWRcblx0XHRcdG5hbWU6ICdUaXRsZSdcblx0XHRcdHBhcmVudDogQCBcblx0XHRcdHg6IDY0LCB5OiA4XG5cdFx0XHR3aWR0aDogQHdpZHRoIC0gNzJcblx0XHRcdGNvbG9yOiAncmdiYSgwLDAsMCwuODcpJ1xuXHRcdFx0dGV4dDogQF90aXRsZVxuXG5cdFx0QGJvZHkgPSBuZXcgVHlwZS5Cb2R5MVxuXHRcdFx0bmFtZTogJ0JvZHknXG5cdFx0XHRwYXJlbnQ6IEBcblx0XHRcdHg6IDY0LCB5OiBAdGl0bGUubWF4WVxuXHRcdFx0d2lkdGg6IEB3aWR0aCAtIDcyXG5cdFx0XHR0ZXh0OiBAX2JvZHlcblxuXHRcdEBkYXRlID0gbmV3IFR5cGUuQ2FwdGlvblxuXHRcdFx0bmFtZTogJ0RhdGUnXG5cdFx0XHRwYXJlbnQ6IEBcblx0XHRcdHg6IEFsaWduLnJpZ2h0KC05KSwgeTogMTVcblx0XHRcdHRleHQ6IEBfdGltZS50b0xvY2FsZVRpbWVTdHJpbmcoW10sIGhvdXI6IFwibnVtZXJpY1wiLCBtaW51dGU6IFwiMi1kaWdpdFwiKVxuXG5cdFx0QGhlaWdodCA9IF8uY2xhbXAoQGJvZHkubWF4WSArIDEzLCA2NCwgSW5maW5pdHkpXG5cblx0XHRpZiBAX2FjdGlvbjE/XG5cblx0XHRcdGRpdmlkZXIgPSBuZXcgRGl2aWRlclxuXHRcdFx0XHRuYW1lOiAnRGl2aWRlcidcblx0XHRcdFx0cGFyZW50OiBAXG5cdFx0XHRcdHg6IDY0LCB5OiBAYm9keS5tYXhZICsgMTFcblx0XHRcdFx0d2lkdGg6IEB3aWR0aCAtIDY0XG5cblx0XHRcdGlmIEBfYWN0aW9uMT9cblx0XHRcdFx0QGFjdGlvbjEgPSBuZXcgTGF5ZXJcblx0XHRcdFx0XHRuYW1lOiAnQWN0aW9uIDEnLCBwYXJlbnQ6IEBcblx0XHRcdFx0XHR4OiA2NCwgeTogZGl2aWRlci5tYXhZICsgMTFcblx0XHRcdFx0XHR3aWR0aDogODAsIGhlaWdodDogMjQsIGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFx0XHRcblx0XHRcdFx0QGFjdGlvbjEuaWNvbiA9IG5ldyBJY29uXG5cdFx0XHRcdFx0bmFtZTogJ0ljb24nLCBwYXJlbnQ6IEBhY3Rpb24xXG5cdFx0XHRcdFx0aWNvbjogQF9hY3Rpb24xLmljb25cblx0XHRcdFx0XHR3aWR0aDogMTgsIGhlaWdodDogMThcblx0XHRcdFx0XHRjb2xvcjogJ3JnYmEoMCwwLDAsLjU0KSdcblx0XHRcdFx0XG5cdFx0XHRcdEBhY3Rpb24xLmxhYmVsID0gbmV3IFR5cGUuQ2FwdGlvblxuXHRcdFx0XHRcdG5hbWU6ICdMYWJlbCcsIHBhcmVudDogQGFjdGlvbjFcblx0XHRcdFx0XHR4OiBAYWN0aW9uMS5pY29uLm1heFggKyA4XG5cdFx0XHRcdFx0Zm9udFNpemU6IDEzXG5cdFx0XHRcdFx0dGV4dDogQF9hY3Rpb24xLnRpdGxlLnRvVXBwZXJDYXNlKClcblxuXHRcdFx0XHRAYWN0aW9uMS53aWR0aCA9IEBhY3Rpb24xLmxhYmVsLm1heFhcblxuXHRcdFx0XHQjQGFjdGlvbjEub25Ub3VjaFN0YXJ0IChldmVudCkgLT4gUmlwcGxlKEAsIGV2ZW50LnBvaW50LCBAaWNvbiwgbmV3IENvbG9yKFRoZW1lLnNlY29uZGFyeSkuYWxwaGEoLjMpKVxuXHRcdFx0XHRAYWN0aW9uMS5vblRhcCBAY2xvc2Vcblx0XHRcdFx0aWYgQF9hY3Rpb24xLmFjdGlvbiB0aGVuIEBhY3Rpb24xLm9uVGFwID0+IFV0aWxzLmRlbGF5IC4yNSwgXy5iaW5kKEBfYWN0aW9uMS5hY3Rpb24sIEApXG5cdFx0XHRcdFxuXG5cdFx0XHRcdGlmIEBfYWN0aW9uMj9cblx0XHRcdFx0XHRAYWN0aW9uMiA9IG5ldyBMYXllclxuXHRcdFx0XHRcdFx0bmFtZTogJ0FjdGlvbiAyJywgcGFyZW50OiBAXG5cdFx0XHRcdFx0XHR4OiBAYWN0aW9uMS5tYXhYICsgNDUsIHk6IGRpdmlkZXIubWF4WSArIDExXG5cdFx0XHRcdFx0XHR3aWR0aDogODAsIGhlaWdodDogMjQsIGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdEBhY3Rpb24yLmljb24gPSBuZXcgSWNvblxuXHRcdFx0XHRcdFx0bmFtZTogJ0ljb24nLCBwYXJlbnQ6IEBhY3Rpb24yXG5cdFx0XHRcdFx0XHRpY29uOiBAX2FjdGlvbjIuaWNvblxuXHRcdFx0XHRcdFx0d2lkdGg6IDE4LCBoZWlnaHQ6IDE4XG5cdFx0XHRcdFx0XHRjb2xvcjogJ3JnYmEoMCwwLDAsLjU0KSdcblx0XHRcdFx0XHRcblx0XHRcdFx0XHRAYWN0aW9uMi5sYWJlbCA9IG5ldyBUeXBlLkNhcHRpb25cblx0XHRcdFx0XHRcdG5hbWU6ICdMYWJlbCcsIHBhcmVudDogQGFjdGlvbjJcblx0XHRcdFx0XHRcdHg6IEBhY3Rpb24yLmljb24ubWF4WCArIDhcblx0XHRcdFx0XHRcdGZvbnRTaXplOiAxM1xuXHRcdFx0XHRcdFx0dGV4dDogQF9hY3Rpb24yLnRpdGxlLnRvVXBwZXJDYXNlKClcblxuXHRcdFx0XHRcdEBhY3Rpb24yLndpZHRoID0gQGFjdGlvbjIubGFiZWwubWF4WFxuXG5cdFx0XHRcdFx0I0BhY3Rpb24yLm9uVG91Y2hTdGFydCAoZXZlbnQpIC0+IFJpcHBsZShALCBldmVudC5wb2ludCwgQGljb24sIG5ldyBDb2xvcihUaGVtZS5zZWNvbmRhcnkpLmFscGhhKC4zKSlcblx0XHRcdFx0XHRAYWN0aW9uMi5vblRhcCBAY2xvc2Vcblx0XHRcdFx0XHRpZiBAX2FjdGlvbjIuYWN0aW9uIHRoZW4gQGFjdGlvbjIub25UYXAgPT4gVXRpbHMuZGVsYXkgLjI1LCBfLmJpbmQoQF9hY3Rpb24yLmFjdGlvbiwgQClcblx0XHRcdFx0XHRcblxuXHRcdFx0XHRAaGVpZ2h0ID0gZGl2aWRlci5tYXhZICsgNDdcblxuXHRcdEBvcGVuKClcblxuXHRcdEBvblN3aXBlTGVmdEVuZCA9PiBAY2xvc2UoJ2xlZnQnKVxuXHRcdEBvblN3aXBlUmlnaHRFbmQgPT4gQGNsb3NlKCdyaWdodCcpXG5cdFx0VXRpbHMuZGVsYXkgQF90aW1lb3V0LCA9PiBpZiBub3QgQGNsb3NlZCB0aGVuIEBjbG9zZSgncmlnaHQnKVxuXG5cdG9wZW46ID0+IFxuXHRcdEBhbmltYXRlIHtvcGFjaXR5OiAxfVxuXG5cdGNsb3NlOiAoZGlyZWN0aW9uKSA9PlxuXHRcdGlmIEBfYXBwPyBcblx0XHRcdF8ucHVsbChAX2FwcC5ub3RpZmljYXRpb25zLCBAKVxuXG5cdFx0XHRmb3Igbm90aWZpY2F0aW9uIGluIEBfYXBwLm5vdGlmaWNhdGlvbnNcblx0XHRcdFx0aWYgbm90aWZpY2F0aW9uLnkgPiBAbWF4WVxuXHRcdFx0XHRcdG5vdGlmaWNhdGlvbi5hbmltYXRlIHt5OiBub3RpZmljYXRpb24ueSAtIEBoZWlnaHR9XG5cblx0XHRAYW5pbWF0ZVxuXHRcdFx0eDogaWYgZGlyZWN0aW9uIGlzICdsZWZ0JyB0aGVuIC1TY3JlZW4ud2lkdGggZWxzZSBTY3JlZW4ud2lkdGhcblx0XHRcdG9wYWNpdHk6IDBcblx0XHRcblx0XHRAY2xvc2VkID0gdHJ1ZVxuXG5cdFx0VXRpbHMuZGVsYXkgLjUsID0+IEBkZXN0cm95KCkiLCIjIFx0ODg4OGJhLjg4YmEgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuODg4ODguICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkUCAgICAgICAgICAgICAgICAgIFxuIyBcdDg4ICBgOGIgIGA4YiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkOCcgICBgOGIgICAgICAgICAgICAgICAgICAgICAgICAgICAgODggICAgICAgICAgICAgICAgICBcbiMgXHQ4OCAgIDg4ICAgODggLmQ4ODg4Yi4gODhkODg4Yi4gZFAgICAgZFAgODggICAgIDg4IGRQICAgLmRQIC5kODg4OGIuIDg4ZDg4OGIuIDg4IC5kODg4OGIuIGRQICAgIGRQXG4jIFx0ODggICA4OCAgIDg4IDg4b29vb2Q4IDg4JyAgYDg4IDg4ICAgIDg4IDg4ICAgICA4OCA4OCAgIGQ4JyA4OG9vb29kOCA4OCcgIGA4OCA4OCA4OCcgIGA4OCA4OCAgICA4OFxuIyBcdDg4ICAgODggICA4OCA4OC4gIC4uLiA4OCAgICA4OCA4OC4gIC44OCBZOC4gICAuOFAgODggLjg4JyAgODguICAuLi4gODggICAgICAgODggODguICAuODggODguICAuODhcbiMgXHRkUCAgIGRQICAgZFAgYDg4ODg4UCcgZFAgICAgZFAgYDg4ODg4UCcgIGA4ODg4UCcgIDg4ODhQJyAgIGA4ODg4OFAnIGRQICAgICAgIGRQIGA4ODg4OFA4IGA4ODg4UDg4XG4jICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuODhcbiMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZDg4ODhQIFxuXG5UeXBlID0gcmVxdWlyZSAnbWQtY29tcG9uZW50cy9UeXBlJ1xueyBSaXBwbGUgfSA9IHJlcXVpcmUgJ21kLWNvbXBvbmVudHMvUmlwcGxlJ1xueyBJY29uIH0gPSByZXF1aXJlICdtZC1jb21wb25lbnRzL0ljb24nXG57IFRoZW1lIH0gPSByZXF1aXJlICdtZC1jb21wb25lbnRzL1RoZW1lJ1xueyBNZW51QnV0dG9uIH0gPSByZXF1aXJlICdtZC1jb21wb25lbnRzL01lbnVCdXR0b24nXG5cbmV4cG9ydHMuTWVudU92ZXJsYXkgPSBjbGFzcyBNZW51T3ZlcmxheSBleHRlbmRzIExheWVyXG5cdFxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblxuXHRcdEBfbGlua3MgPSBvcHRpb25zLmxpbmtzID8gW3t0aXRsZTogJ0hvbWUnLCBpY29uOiAnaG9tZScsIGFjdGlvbjogLT4gbnVsbH1dXG5cdFx0QF90aXRsZSA9IG9wdGlvbnMudGl0bGUgPyAnTWVudSdcblx0XHRAX2ltYWdlID0gb3B0aW9ucy5pbWFnZSA/IG51bGxcblxuXG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0aGVpZ2h0OiBTY3JlZW4uaGVpZ2h0XG5cdFx0XHR3aWR0aDogMzA0XG5cdFx0XHR2aXNpYmxlOiBmYWxzZVxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBUaGVtZS5tZW51T3ZlcmxheS5iYWNrZ3JvdW5kQ29sb3Jcblx0XHRcdGFuaW1hdGlvbk9wdGlvbnM6IHtjdXJ2ZTogXCJzcHJpbmcoMzAwLCAzNSwgMClcIn1cblxuXG5cdFx0QHNjcmltID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiAnLicsIFxuXHRcdFx0c2l6ZTogU2NyZWVuLnNpemVcblx0XHRcdGJhY2tncm91bmRDb2xvcjogJ3JnYmEoMCwwLDAsLjYpJ1xuXHRcdFx0b3BhY2l0eTogMFxuXHRcdFx0dmlzaWJsZTogZmFsc2Vcblx0XHRcdGFuaW1hdGlvbk9wdGlvbnM6XG5cdFx0XHRcdHRpbWU6IC4yNVxuXG5cdFx0QHNjcmltLm9uVGFwID0+IEBoaWRlKClcblx0XHRAb25Td2lwZUxlZnRFbmQgPT4gQGhpZGUoKVxuXG5cdFx0QGhlYWRlciA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEBcblx0XHRcdHdpZHRoOiBAd2lkdGgsIGhlaWdodDogMTczXG5cdFx0XHRpbWFnZTogVGhlbWUudXNlci5pbWFnZVxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBUaGVtZS5tZW51T3ZlcmxheS5oZWFkZXIuYmFja2dyb3VuZENvbG9yXG5cblx0XHRAdGl0bGVJY29uID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQGhlYWRlclxuXHRcdFx0eDogMTYsIHk6IDQwXG5cdFx0XHRoZWlnaHQ6IDY0LCB3aWR0aDogNjRcblx0XHRcdGJvcmRlclJhZGl1czogMzJcblx0XHRcdGJhY2tncm91bmRDb2xvcjogVGhlbWUubWVudU92ZXJsYXkuaGVhZGVyLmljb25cblxuXHRcdEBzdWJoZWFkZXJFeHBhbmQgPSBuZXcgSWNvblxuXHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEBoZWFkZXJcblx0XHRcdHg6IEFsaWduLnJpZ2h0KC0xNilcblx0XHRcdHk6IEFsaWduLmJvdHRvbSgtMTYpXG5cdFx0XHRpY29uOiAnbWVudS1kb3duJ1xuXHRcdFx0Y29sb3I6IFRoZW1lLm1lbnVPdmVybGF5LnN1YmhlYWRlci5pY29uXG5cblx0XHRAc3ViaGVhZGVyID0gbmV3IFR5cGUuQm9keTFcblx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBAaGVhZGVyXG5cdFx0XHR3aWR0aDogQHdpZHRoXG5cdFx0XHR4OiAxNiwgeTogQWxpZ24uYm90dG9tKC0xOClcblx0XHRcdHRleHQ6IEBfdGl0bGVcblx0XHRcdGNvbG9yOiBUaGVtZS5tZW51T3ZlcmxheS5zdWJoZWFkZXIudGV4dFxuXG5cdFx0bGlua3MgPSBbXVxuXG5cdFx0Zm9yIGxpbmssIGkgaW4gQF9saW5rc1xuXHRcdFx0bGlua3NbaV0gPSBuZXcgTWVudUJ1dHRvblxuXHRcdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQFxuXHRcdFx0XHR4OiAxNiwgeTogMTg5ICsgKDQ4ICogaSlcblx0XHRcdFx0dGV4dDogbGluay50aXRsZVxuXHRcdFx0XHRpY29uOiBsaW5rLmljb25cblx0XHRcdFx0YWN0aW9uOiBsaW5rLmFjdGlvblxuXG5cdHNob3c6IC0+XG5cdFx0QGJyaW5nVG9Gcm9udCgpXG5cdFx0QHZpc2libGUgPSB0cnVlXG5cdFx0QHggPSAtU2NyZWVuLndpZHRoXG5cdFx0QGFuaW1hdGVcblx0XHRcdHg6IDBcblxuXHRcdEBzY3JpbS5wbGFjZUJlaGluZChAKVxuXHRcdEBzY3JpbS52aXNpYmxlID0gdHJ1ZVxuXHRcdEBzY3JpbS5hbmltYXRlXG5cdFx0XHRvcGFjaXR5OiAxXG5cblx0aGlkZTogLT5cblx0XHRAYW5pbWF0ZVxuXHRcdFx0eDogLVNjcmVlbi53aWR0aFxuXG5cdFx0QHNjcmltLmFuaW1hdGVcblx0XHRcdG9wYWNpdHk6IDBcblxuXHRcdFV0aWxzLmRlbGF5IC4zLCA9PlxuXHRcdFx0QHZpc2libGUgPSBmYWxzZVxuXHRcdFx0QHNjcmltLnZpc2libGUgPSBmYWxzZVxuXHRcdFx0QHNlbmRUb0JhY2soKVxuXHRcdFx0QHNjcmltLnNlbmRUb0JhY2soKSIsIiMgXHQ4ODg4YmEuODhiYSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDg4ODg4OGJhICAgICAgICAgICAgIGRQICAgICBkUFxuIyBcdDg4ICBgOGIgIGA4YiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgODggICAgYDhiICAgICAgICAgICAgODggICAgIDg4XG4jIFx0ODggICA4OCAgIDg4IC5kODg4OGIuIDg4ZDg4OGIuIGRQICAgIGRQIGE4OGFhYWE4UCcgZFAgICAgZFAgZDg4ODhQIGQ4ODg4UCAuZDg4ODhiLiA4OGQ4ODhiLlxuIyBcdDg4ICAgODggICA4OCA4OG9vb29kOCA4OCcgIGA4OCA4OCAgICA4OCAgODggICBgOGIuIDg4ICAgIDg4ICAgODggICAgIDg4ICAgODgnICBgODggODgnICBgODhcbiMgXHQ4OCAgIDg4ICAgODggODguICAuLi4gODggICAgODggODguICAuODggIDg4ICAgIC44OCA4OC4gIC44OCAgIDg4ICAgICA4OCAgIDg4LiAgLjg4IDg4ICAgIDg4XG4jIFx0ZFAgICBkUCAgIGRQIGA4ODg4OFAnIGRQICAgIGRQIGA4ODg4OFAnICA4ODg4ODg4OFAgYDg4ODg4UCcgICBkUCAgICAgZFAgICBgODg4ODhQJyBkUCAgICBkUFxuXG5UeXBlID0gcmVxdWlyZSAnbWQtY29tcG9uZW50cy9UeXBlJ1xueyBSaXBwbGUgfSA9IHJlcXVpcmUgJ21kLWNvbXBvbmVudHMvUmlwcGxlJ1xueyBJY29uIH0gPSByZXF1aXJlICdtZC1jb21wb25lbnRzL0ljb24nXG57IFRoZW1lIH0gPSByZXF1aXJlICdtZC1jb21wb25lbnRzL1RoZW1lJ1xuXG5cbmV4cG9ydHMuTWVudUJ1dHRvbiA9IGNsYXNzIE1lbnVCdXR0b24gZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblx0XHRcblx0XHRAX2ljb24gPSBvcHRpb25zLmljb24gPyAnaG9tZSdcblx0XHRAX3RleHQgPSBvcHRpb25zLnRleHQgPyAnRGVmYXVsdCdcblx0XHRAX2FjdGlvbiA9IG9wdGlvbnMuYWN0aW9uID8gLT4gbnVsbFxuXG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0aGVpZ2h0OiA0OCwgd2lkdGg6IDMwNFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cblx0XHRAaWNvbkxheWVyID0gbmV3IEljb25cblx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBAXG5cdFx0XHR5OiBBbGlnbi5jZW50ZXJcblx0XHRcdGljb246IEBfaWNvbiwgY29sb3I6IFRoZW1lLm1lbnVPdmVybGF5LnRleHRcblxuXHRcdEBsYWJlbExheWVyID0gbmV3IFR5cGUuUmVndWxhclxuXHRcdFx0bmFtZTogJ2xhYmVsJywgcGFyZW50OiBAXG5cdFx0XHR4OiBAaWNvbkxheWVyLm1heFggKyAxNlxuXHRcdFx0eTogQWxpZ24uY2VudGVyKClcblx0XHRcdGNvbG9yOiBUaGVtZS5tZW51T3ZlcmxheS50ZXh0XG5cdFx0XHR0ZXh0OiBAX3RleHRcblxuXHRcdEBvblRhcCBAX2FjdGlvblxuXHRcdEBvblRhcCAtPiBcblx0XHRcdFV0aWxzLmRlbGF5IC4yNSwgPT4gQHBhcmVudC5oaWRlKCkiLCIjIFx0ZFBcbiMgXHQ4OFxuIyBcdDg4IC5kODg4OGIuIC5kODg4OGIuIDg4ZDg4OGIuXG4jIFx0ODggODgnICBgXCJcIiA4OCcgIGA4OCA4OCcgIGA4OFxuIyBcdDg4IDg4LiAgLi4uIDg4LiAgLjg4IDg4ICAgIDg4XG4jIFx0ZFAgYDg4ODg4UCcgYDg4ODg4UCcgZFAgICAgZFBcbiMgXHRcbiMgXHRcbiMtLSBAc3RldmVydWl6b2tcbiNcdEEgY2xhc3MgZm9yIGNyZWF0aW5nIE1hdGVyaWFsIERlc2lnbiBpY29ucywgd2l0aCBhY2Nlc3MgdG8gMTYwMCBpY29ucyBhcyBTVkdzLlxuI1x0QWRhcHRlZCBmcm9tIG1hcmNiYWNobWFubidzIGh0dHBzOi8vd3d3Lm5wbWpzLmNvbS9wYWNrYWdlL21hdGVyaWFsLWRlc2lnbi1pY29ucy1zdmcuXG4jXHRcbiNcbiMtLSBJbnN0YWxsYXRpb246XG4jXHREb3dubG9hZCBhbmQgcGxhY2UgaWNvbi5jb2ZmZWUgYW5kIGljb25zLmpzb24gaW4geW91ciBwcm9qZWN0J3MgbW9kdWxlcyBmb2xkZXIuXG4jXHRBdCB0aGUgdG9wIG9mIHlvdXIgcHJvamVjdCwgdHlwZTogXCJ7SWNvbn0gPSByZXF1aXJlIFwiaWNvblwiXG4jXG4jXG4jLS1cdFVzYWdlOlxuI1xuI1x0VG8gY3JlYXRlIGFuIGljb24sIHR5cGU6XG4jXG4jXHRcdG15SWNvbiA9IG5ldyBJY29uXG4jXHRcdFxuI1x0WW91IGNhbiBzZXQgdGhlIGljb24gYW5kIHRoZSBpY29uJ3MgZmlsbCBjb2xvci5cbiNcbiNcdFx0bXlJY29uID0gbmV3IEljb25cbiNcdFx0XHRpY29uOiAnY29va2llJ1xuI1x0XHRcdGNvbG9yOiAnIzk0NTIwMCdcbiNcbiNcdFlvdSBjYW4gY2hhbmdlIGFuIGV4aXN0aW5nIGljb24ncyBmaWxsIG9yIGljb24uXG4jXG4jIFx0XHRteUljb24uY29sb3IgPSAncmVkJyBcbiNcdFx0bXlJY29uLmljb24gPSAnY3VwJ1xuI1xuI1x0QXBhcnQgZnJvbSB0aGF0LCB5b3UgY2FuIHVzZSB0aGUgSWNvbiBpbnN0YW5jZSBqdXN0IGxpa2UgYW55IG90aGVyIExheWVyIGluc3RhbmNlLlxuI1xuI1xuIy0tIFRyb3VibGVzaG9vdGluZ1xuI1xuI1x0US5cdFdoeSBkbyBJIGtlZXAgZ2V0dGluZyB0aGUgXCJJY29uIG5vdCBmb3VuZD9cIiBlcnJvcj9cbiNcbiNcdEEuXHRUaGUgaWNvbiBuYW1lcyB1c2VkIGJ5IHRoaXMgbW9kdWxlIGFyZSBub3QgYWx3YXlzIHN0YW5kYXJkIHRvIEdvb2dsZSdzIGxpc3RpbmdzLiBcbiNcdFx0SWYgeW91J3JlIGdldHRpbmcgZXJyb3JzLCBzZWFyY2ggZm9yIHRoZSBpY29uIGF0IGh0dHBzOi8vbWF0ZXJpYWxkZXNpZ25pY29ucy5jb20vLlxuI1x0XHRJdCBtYXkgYmUgbGlzdGVkIHRoZXJlIHVuZGVyIGEgZGlmZmVyZW50IG5hbWUuIElmIHRoYXQncyB0aGUgY2FzZSwgdXNlIHRoZWlyXG4jXHRcdG5hbWUgZm9yIHRoZSBpY29uIGluc3RlYWQgd2hlbiBjcmVhdGluZyB5b3VyIEljb24gaW5zdGFuY2UuXG4jXG4jXHRcdEEgY29tbW9uIGV4YW1wbGU6IGljb246IFwic2VhcmNoXCIgd29uJ3Qgd29yaywgYnV0IGljb246IFwibWFnbmlmeVwiIHdpbGwuIMKvXFxfKOODhClfL8KvXG4jXHRcbiMtLSBFbmpveSEgQHN0ZXZlcnVpb2tcblxuXG5pY29ucyA9IEpTT04ucGFyc2UgVXRpbHMuZG9tTG9hZERhdGFTeW5jIFwibW9kdWxlcy9tZC1jb21wb25lbnRzL2ljb25zLmpzb25cIlxuXG5leHBvcnRzLkljb24gPSBjbGFzcyBJY29uIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cblx0XHRAX2ljb24gPSBvcHRpb25zLmljb24gPyAnbWVudSdcblx0XHRAX2NvbG9yID0gb3B0aW9ucy5jb2xvciA/ICcjMDAwMDAnXG5cdFx0QF9iYWNrZ3JvdW5kQ29sb3IgPSBvcHRpb25zLmJhY2tncm91bmRDb2xvciA/IG51bGxcblxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdG5hbWU6ICcuJ1xuXHRcdFx0aGVpZ2h0OiAyNCwgd2lkdGg6IDI0XG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IEBfYmFja2dyb3VuZENvbG9yXG5cblx0QGRlZmluZSBcImljb25cIixcblx0XHRnZXQ6IC0+IHJldHVybiBAX2ljb25cblx0XHRzZXQ6IChuYW1lKSAtPlxuXHRcdFx0QF9pY29uID0gbmFtZVxuXG5cdFx0XHRzdmcgPSBpZiBpY29uc1tAX2ljb25dIHRoZW4gXCI8c3ZnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zycgdmlld0JveD0nMCAwIDI0IDI0Jz48cGF0aCBkPScje2ljb25zW0BfaWNvbl19JyBmaWxsPScje0BfY29sb3J9Jy8+PC9zdmc+XCJcblx0XHRcdGVsc2UgdGhyb3cgXCJFcnJvcjogaWNvbiAnI3tuYW1lfScgd2FzIG5vdCBmb3VuZC4gU2VlIGh0dHBzOi8vbWF0ZXJpYWxkZXNpZ25pY29ucy5jb20vIGZvciBmdWxsIGxpc3Qgb2YgaWNvbnMuXCJcblxuXHRcdFx0QGh0bWwgPSBzdmdcblxuXHRAZGVmaW5lIFwiY29sb3JcIixcblx0XHRnZXQ6IC0+IHJldHVybiBAX2NvbG9yXG5cdFx0c2V0OiAoY29sb3IpIC0+XG5cdFx0XHRAX2NvbG9yID0gbmV3IENvbG9yKGNvbG9yKVxuXG5cdFx0XHRzdmcgPSBpZiBpY29uc1tAX2ljb25dIHRoZW4gXCI8c3ZnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zycgdmlld0JveD0nMCAwIDI0IDI0Jz48cGF0aCBkPScje2ljb25zW0BfaWNvbl19JyBmaWxsPScje0BfY29sb3J9Jy8+PC9zdmc+XCJcblx0XHRcdGVsc2UgdGhyb3cgXCJFcnJvcjogaWNvbiAnI3tuYW1lfScgd2FzIG5vdCBmb3VuZC4gU2VlIGh0dHBzOi8vbWF0ZXJpYWxkZXNpZ25pY29ucy5jb20vIGZvciBmdWxsIGxpc3Qgb2YgaWNvbnMuXCJcblxuXHRcdFx0QGh0bWwgPSBzdmciLCIjIGRQICAgICBkUCAgICAgICAgICAgICAgICAgICAgICAgICAgZFAgICAgICAgICAgICAgICAgICBcbiMgODggICAgIDg4ICAgICAgICAgICAgICAgICAgICAgICAgICA4OCAgICAgICAgICAgICAgICAgIFxuIyA4OGFhYWFhODhhIC5kODg4OGIuIC5kODg4OGIuIC5kODg4Yjg4IC5kODg4OGIuIDg4ZDg4OGIuXG4jIDg4ICAgICA4OCAgODhvb29vZDggODgnICBgODggODgnICBgODggODhvb29vZDggODgnICBgODhcbiMgODggICAgIDg4ICA4OC4gIC4uLiA4OC4gIC44OCA4OC4gIC44OCA4OC4gIC4uLiA4OCAgICAgIFxuIyBkUCAgICAgZFAgIGA4ODg4OFAnIGA4ODg4OFA4IGA4ODg4OFA4IGA4ODg4OFAnIGRQICAgIFxuXG5UeXBlID0gcmVxdWlyZSAnbWQtY29tcG9uZW50cy9UeXBlJ1xueyBSaXBwbGUgfSA9IHJlcXVpcmUgJ21kLWNvbXBvbmVudHMvUmlwcGxlJ1xueyBJY29uIH0gPSByZXF1aXJlICdtZC1jb21wb25lbnRzL0ljb24nXG57IFRoZW1lIH0gPSByZXF1aXJlICdtZC1jb21wb25lbnRzL1RoZW1lJ1xueyBTdGF0dXNCYXIgfSA9IHJlcXVpcmUgJ21kLWNvbXBvbmVudHMvU3RhdHVzQmFyJ1xuXG5leHBvcnRzLkhlYWRlciA9IGNsYXNzIEhlYWRlciBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXHRcdFxuXHRcdEBfdGl0bGUgPSB1bmRlZmluZWRcblx0XHRAX2ljb24gPSB1bmRlZmluZWRcblx0XHRAX2ljb25BY3Rpb24gPSBvcHRpb25zLmljb25BY3Rpb24gPyAtPiBudWxsXG5cblx0XHRzdXBlciBfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRuYW1lOiAnSGVhZGVyJywgXG5cdFx0XHR3aWR0aDogU2NyZWVuLndpZHRoLCBoZWlnaHQ6IDgwXG5cdFx0XHRzaGFkb3dZOiAyLCBzaGFkb3dCbHVyOiAzLCBzaGFkb3dDb2xvcjogJ3JnYmEoMCwwLDAsLjI0KSdcblx0XHRcdGJhY2tncm91bmRDb2xvcjogVGhlbWUuaGVhZGVyLmJhY2tncm91bmRDb2xvclxuXG5cdFx0IyBUT0RPOiBpZiBvcHRpb25zLmljb24gaXMgZmFsc2UgdGhlbiBubyBpY29uTGF5ZXIsIG1vdmUgdGl0bGUgbGVmdFxuXG5cdFx0QHRpdGxlTGF5ZXIgPSBuZXcgVHlwZS5UaXRsZVxuXHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEBcblx0XHRcdHg6IDcyLCB5OiBBbGlnbi5ib3R0b20oLTE0KVxuXHRcdFx0Y29sb3I6IFRoZW1lLmhlYWRlci50aXRsZVxuXHRcdFx0dGV4dDogQHRpdGxlID8gXCJObyB0aXRsZVwiXG5cblx0XHRAdGl0bGUgPSBvcHRpb25zLnRpdGxlID8gJ0RlZmF1bHQgSGVhZGVyJ1xuXG5cdFx0QGljb25MYXllciA9IG5ldyBJY29uXG5cdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQCwgXG5cdFx0XHR4OiAxMiwgeTogQWxpZ24uY2VudGVyKDEyKVxuXHRcdFx0aWNvbjogJ21lbnUnLCBjb2xvcjogVGhlbWUuaGVhZGVyLmljb24uY29sb3JcblxuXHRcdEBpY29uID0gb3B0aW9ucy5pY29uID8gJ21lbnUnXG5cblx0XHRAc3RhdHVzQmFyID0gbmV3IFN0YXR1c0JhclxuXHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEBcblxuXHRcdEBpY29uTGF5ZXIub25UYXAgPT4gQF9pY29uQWN0aW9uKClcblx0XHRAaWNvbkxheWVyLm9uVG91Y2hTdGFydCAoZXZlbnQpID0+IFJpcHBsZShALCBldmVudC5wb2ludCwgQHRpdGxlTGF5ZXIpXG5cblxuXHRAZGVmaW5lIFwidGl0bGVcIixcblx0XHRnZXQ6IC0+IHJldHVybiBAX3RpdGxlXG5cdFx0c2V0OiAodGl0bGVUZXh0KSAtPlxuXHRcdFx0QF90aXRsZSA9IHRpdGxlVGV4dFxuXHRcdFx0QHRpdGxlTGF5ZXIudGV4dFJlcGxhY2UoQHRpdGxlTGF5ZXIudGV4dCwgQF90aXRsZSlcblxuXHRAZGVmaW5lIFwiaWNvblwiLFxuXHRcdGdldDogLT4gcmV0dXJuIEBfaWNvblxuXHRcdHNldDogKGljb25OYW1lKSAtPiBcblx0XHRcdEBfaWNvbiA9IGljb25OYW1lXG5cdFx0XHRAaWNvbkxheWVyLmljb24gPSBpY29uTmFtZVxuXG5cdEBkZWZpbmUgXCJpY29uQ29sb3JcIixcblx0XHRnZXQ6IC0+IHJldHVybiBAX2ljb24uY29sb3Jcblx0XHRzZXQ6IChjb2xvcikgLT4gXG5cdFx0XHRAaWNvbkxheWVyLmNvbG9yID0gY29sb3JcblxuXHRAZGVmaW5lIFwiaWNvbkFjdGlvblwiLFxuXHRcdGdldDogLT4gcmV0dXJuIEBfaWNvbkFjdGlvblxuXHRcdHNldDogKGFjdGlvbikgLT5cblx0XHRcdEBfaWNvbkFjdGlvbiA9IGFjdGlvbiIsIlxuIyBcdCAuODg4ODguICAgICAgICAgICBvbyAgICAgICBkUCBkUCAgICAgICAgb28gICAgICAgICAgICBkUFxuIyBcdGQ4JyAgIGA4OCAgICAgICAgICAgICAgICAgICA4OCA4OCAgICAgICAgICAgICAgICAgICAgICA4OFxuIyBcdDg4ICAgICAgICA4OGQ4ODhiLiBkUCAuZDg4OGI4OCA4OCAgICAgICAgZFAgLmQ4ODg4Yi4gZDg4ODhQXG4jIFx0ODggICBZUDg4IDg4JyAgYDg4IDg4IDg4JyAgYDg4IDg4ICAgICAgICA4OCBZOG9vb29vLiAgIDg4XG4jIFx0WTguICAgLjg4IDg4ICAgICAgIDg4IDg4LiAgLjg4IDg4ICAgICAgICA4OCAgICAgICA4OCAgIDg4XG4jIFx0IGA4ODg4OCcgIGRQICAgICAgIGRQIGA4ODg4OFA4IDg4ODg4ODg4UCBkUCBgODg4ODhQJyAgIGRQXG5cblR5cGUgPSByZXF1aXJlICdtZC1jb21wb25lbnRzL1R5cGUnXG57IFJpcHBsZSB9ID0gcmVxdWlyZSAnbWQtY29tcG9uZW50cy9SaXBwbGUnXG57IEljb24gfSA9IHJlcXVpcmUgJ21kLWNvbXBvbmVudHMvSWNvbidcbnsgVGhlbWUgfSA9IHJlcXVpcmUgJ21kLWNvbXBvbmVudHMvVGhlbWUnXG5cbmV4cG9ydHMuR3JpZExpc3QgPSBjbGFzcyBHcmlkTGlzdCBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXHRcdFxuXHRcdEBfY29sdW1ucyA9IG9wdGlvbnMuY29sdW1ucyA/IDJcblx0XHRcblx0XHRzdXBlciBfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRuYW1lOiAnLidcblx0XHRcdHdpZHRoOiBTY3JlZW4ud2lkdGhcblx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFxuXHRcdEB0aWxlcyA9IFtdXG5cdFx0QHRpbGVXaWR0aCA9IChAd2lkdGggLSAyNCkgLyBAX2NvbHVtbnNcblx0XHRAdGlsZUhlaWdodCA9IG9wdGlvbnMudGlsZUhlaWdodCA/IFNjcmVlbi53aWR0aCAvIEBfY29sdW1uc1xuXHRcdFxuXHRhZGRUaWxlOiAodGlsZSkgLT5cblx0XHR0aWxlLmkgPSBAdGlsZXMubGVuZ3RoXG5cdFx0QHRpbGVzLnB1c2godGlsZSlcblx0XHRcblx0XHR0aWxlLnggPSA4ICsgKEB0aWxlV2lkdGggKyA4KSAqICh0aWxlLmkgJSBAX2NvbHVtbnMpXG5cdFx0dGlsZS55ID0gOCArIChAdGlsZUhlaWdodCArIDgpICogTWF0aC5mbG9vcih0aWxlLmkgLyBAX2NvbHVtbnMpXG5cblx0XHRAaGVpZ2h0ID0gXy5sYXN0KEB0aWxlcykubWF4WVxuXG5cdFx0aWYgQHBhcmVudD8ucGFyZW50Py5jb250ZW50PyB0aGVuIEBwYXJlbnQucGFyZW50LnVwZGF0ZUNvbnRlbnQoKVxuXHRcblx0cmVtb3ZlVGlsZTogKHRpbGUpIC0+XG5cdFx0Xy5wdWxsKEB0aWxlcywgdGlsZSlcblx0XHR0aWxlLmRlc3Ryb3koKVxuXHRcdEByZXBvc2l0aW9uVGlsZXMoKVxuXG5cdHJlcG9zaXRpb25UaWxlczogLT5cblx0XHRmb3IgdGlsZSwgaSBpbiBAdGlsZXNcblx0XHRcdHRpbGUuaSA9IGlcblx0XHRcdHRpbGUuYW5pbWF0ZVxuXHRcdFx0XHR4OiA4ICsgKEB0aWxlV2lkdGggKyA4KSAqICh0aWxlLmkgJSBAX2NvbHVtbnMpXG5cdFx0XHRcdHk6IDggKyAoQHRpbGVIZWlnaHQgKyA4KSAqIE1hdGguZmxvb3IodGlsZS5pIC8gQF9jb2x1bW5zKVxuXHRcdEBoZWlnaHQgPSBfLmxhc3QoQHRpbGVzKS5tYXhZXG5cblx0XHRpZiBAcGFyZW50Py5wYXJlbnQ/LmNvbnRlbnQ/IHRoZW4gQHBhcmVudC5wYXJlbnQudXBkYXRlQ29udGVudCgpXG4iLCIjIFx0ODg4ODg4YmEgIG9vICAgICAgICAgIG9vICAgICAgIGRQXG4jIFx0ODggICAgYDhiICAgICAgICAgICAgICAgICAgICAgIDg4XG4jIFx0ODggICAgIDg4IGRQIGRQICAgLmRQIGRQIC5kODg4Yjg4IC5kODg4OGIuIDg4ZDg4OGIuXG4jIFx0ODggICAgIDg4IDg4IDg4ICAgZDgnIDg4IDg4JyAgYDg4IDg4b29vb2Q4IDg4JyAgYDg4XG4jIFx0ODggICAgLjhQIDg4IDg4IC44OCcgIDg4IDg4LiAgLjg4IDg4LiAgLi4uIDg4XG4jIFx0ODg4ODg4OFAgIGRQIDg4ODhQJyAgIGRQIGA4ODg4OFA4IGA4ODg4OFAnIGRQXG5cbnsgVGhlbWUgfSA9IHJlcXVpcmUgJ21kLWNvbXBvbmVudHMvVGhlbWUnXG5cbmV4cG9ydHMuRGl2aWRlciA9IERpdmlkZXIgPSBjbGFzcyBEaXZpZGVyIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0bmFtZTogJy4nXG5cdFx0XHR3aWR0aDogMjAwLCBoZWlnaHQ6IDEsXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFRoZW1lLmRpdmlkZXIuYmFja2dyb3VuZENvbG9yIiwiIyBcdDg4ODg4OGJhICBvbyAgICAgICAgICBkUFxuIyBcdDg4ICAgIGA4YiAgICAgICAgICAgICA4OFxuIyBcdDg4ICAgICA4OCBkUCAuZDg4ODhiLiA4OCAuZDg4ODhiLiAuZDg4ODhiLlxuIyBcdDg4ICAgICA4OCA4OCA4OCcgIGA4OCA4OCA4OCcgIGA4OCA4OCcgIGA4OFxuIyBcdDg4ICAgIC44UCA4OCA4OC4gIC44OCA4OCA4OC4gIC44OCA4OC4gIC44OFxuIyBcdDg4ODg4ODhQICBkUCBgODg4ODhQOCBkUCBgODg4ODhQJyBgODg4OFA4OFxuIyBcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC44OFxuIyBcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZDg4ODhQXG5cblR5cGUgPSByZXF1aXJlICdtZC1jb21wb25lbnRzL1R5cGUnXG57IFJpcHBsZSB9ID0gcmVxdWlyZSAnbWQtY29tcG9uZW50cy9SaXBwbGUnXG57IEljb24gfSA9IHJlcXVpcmUgJ21kLWNvbXBvbmVudHMvSWNvbidcbnsgVGhlbWUgfSA9IHJlcXVpcmUgJ21kLWNvbXBvbmVudHMvVGhlbWUnXG57IEJ1dHRvbiB9ID0gcmVxdWlyZSAnbWQtY29tcG9uZW50cy9CdXR0b24nXG5cbmV4cG9ydHMuRGlhbG9nID0gY2xhc3MgRGlhbG9nIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0bmFtZTogJy4nXG5cdFx0XHRzaXplOiBTY3JlZW4uc2l6ZVxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiAncmdiYSgwLCAwLCAwLCAuNSknXG5cdFx0XHRvcGFjaXR5OiAwXG5cdFx0XHRcblx0XHRAX3RpdGxlID0gb3B0aW9ucy50aXRsZSA/ICdEZWZhdWx0IFRpdGxlJ1xuXHRcdEBfYm9keSA9IG9wdGlvbnMuYm9keSA/ICdCb2R5IHRleHQgZ29lcyBoZXJlLidcblx0XHRAX2FjY2VwdFRleHQgPSBvcHRpb25zLmFjY2VwdFRleHQgPyAnY29uZmlybSdcblx0XHRAX2FjY2VwdEFjdGlvbiA9IG9wdGlvbnMuYWNjZXB0QWN0aW9uID8gLT4gbnVsbFxuXHRcdEBfZGVjbGluZVRleHQgPSBvcHRpb25zLmRlY2xpbmVUZXh0ID8gJydcblx0XHRAX2RlY2xpbmVBY3Rpb24gPSBvcHRpb25zLmRlY2xpbmVBY3Rpb24gPyAtPiBudWxsXG5cdFx0XG5cdFx0QG9uIEV2ZW50cy5UYXAsIChldmVudCkgLT4gZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcblx0XHRcblx0XHRAY29udGFpbmVyID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiAnY29udGFpbmVyJywgcGFyZW50OiBAXG5cdFx0XHR4OiBBbGlnbi5jZW50ZXJcblx0XHRcdGhlaWdodDogMTI4LCB3aWR0aDogU2NyZWVuLndpZHRoIC0gODBcblx0XHRcdGJhY2tncm91bmRDb2xvcjogVGhlbWUuZGlhbG9nLmJhY2tncm91bmRDb2xvclxuXHRcdFx0c2hhZG93WDogMCwgc2hhZG93WTogNywgc2hhZG93Qmx1cjogMzBcblx0XHRcdG9wYWNpdHk6IDBcblx0XHRcdHNoYWRvd0NvbG9yOiAncmdiYSgwLDAsMCwuMyknXG5cdFx0XG5cdFx0QHRpdGxlID0gbmV3IFR5cGUuVGl0bGVcblx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBAY29udGFpbmVyXG5cdFx0XHR4OiAyNCwgeTogMjBcblx0XHRcdGZvbnRTaXplOiAxNiwgZm9udFdlaWdodDogNTAwLCBjb2xvcjogVGhlbWUudGV4dC50aXRsZVxuXHRcdFx0dGV4dDogQF90aXRsZVxuXHRcdFxuXHRcdEBib2R5ID0gbmV3IFR5cGUuU3ViaGVhZFxuXHRcdFx0bmFtZTogJ2JvZHknLCBwYXJlbnQ6IEBjb250YWluZXJcblx0XHRcdHg6IDI0LCB5OiA1MlxuXHRcdFx0d2lkdGg6IEBjb250YWluZXIud2lkdGggLSA0MlxuXHRcdFx0dGV4dDogQF9ib2R5XG5cdFx0XG5cdFx0YnV0dG9uc1kgPSBpZiBAX2JvZHkgaXMgJycgdGhlbiAxMjggZWxzZSBAYm9keS5tYXhZICsgMTZcblx0XHRcblx0XHRAYWNjZXB0ID0gbmV3IEJ1dHRvblxuXHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEBjb250YWluZXJcblx0XHRcdHg6IEFsaWduLnJpZ2h0KC0xNiksIHk6IGJ1dHRvbnNZXG5cdFx0XHR0ZXh0OiBAX2FjY2VwdFRleHQudG9VcHBlckNhc2UoKVxuXHRcdFx0YWN0aW9uOiBAX2FjY2VwdEFjdGlvblxuXHRcdFxuXHRcdGlmIEBfZGVjbGluZVRleHQgaXNudCAnJ1xuXHRcdFx0QGRlY2xpbmUgPSBuZXcgQnV0dG9uXG5cdFx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBAY29udGFpbmVyXG5cdFx0XHRcdHg6IDAsIHk6IGJ1dHRvbnNZXG5cdFx0XHRcdHRleHQ6IEBfZGVjbGluZVRleHQudG9VcHBlckNhc2UoKVxuXHRcdFx0XHRhY3Rpb246IEBfZGVjbGluZUFjdGlvblxuXG5cdFx0IyBzZXQgcG9zaXRpb25zXG5cdFx0QGNvbnRhaW5lci5oZWlnaHQgPSBAYWNjZXB0Lm1heFkgKyAxMlxuXHRcdEBkZWNsaW5lPy5tYXhYID0gQGFjY2VwdC54IC0gMTZcblx0XHRAY29udGFpbmVyLnkgPSBBbGlnbi5jZW50ZXIoMTYpXG5cdFx0XG5cdFx0IyBhZGQgY2xvc2UgYWN0aW9ucyB0byBjb25maXJtIGFuZCBjYW5jZWxcblx0XHRmb3IgYnV0dG9uIGluIFtAYWNjZXB0LCBAZGVjbGluZV1cblx0XHRcdGJ1dHRvbj8ub25UYXAgQGNsb3NlXG5cdFx0XG5cdFx0IyBPTiBMT0FEXG5cdFx0QG9wZW4oKVxuXHRcblx0b3BlbjogPT5cblx0XHRAYW5pbWF0ZVxuXHRcdFx0b3BhY2l0eTogMVxuXHRcdFx0b3B0aW9uczogXG5cdFx0XHRcdHRpbWU6IC4yNVxuXHRcdFxuXHRcdEBjb250YWluZXIuYW5pbWF0ZVxuXHRcdFx0b3BhY2l0eTogMVxuXHRcdFx0b3B0aW9uczpcblx0XHRcdFx0dGltZTogLjI1XG5cdFx0XHRcdGRlbGF5OiAuMDVcblxuXHRjbG9zZTogPT5cblx0XHRAY29udGFpbmVyLmFuaW1hdGVcblx0XHRcdG9wYWNpdHk6IDBcblx0XHRcdG9wdGlvbnM6XG5cdFx0XHRcdHRpbWU6IC4yNVxuXHRcdFxuXHRcdEBhbmltYXRlXG5cdFx0XHRvcGFjaXR5OiAwXG5cdFx0XHRvcHRpb25zOlxuXHRcdFx0XHR0aW1lOiAuMjVcblx0XHRcblx0XHRVdGlscy5kZWxheSAuNSwgPT4gQGRlc3Ryb3koKSIsIiMgXHQgYTg4ODg4Yi4gZFAgICAgICAgICAgICAgICAgICAgICAgICAgZFAgICAgICAgZFBcbiMgXHRkOCcgICBgODggODggICAgICAgICAgICAgICAgICAgICAgICAgODggICAgICAgODhcbiMgXHQ4OCAgICAgICAgODhkODg4Yi4gLmQ4ODg4Yi4gLmQ4ODg4Yi4gODggIC5kUCAgODhkODg4Yi4gLmQ4ODg4Yi4gZFAuICAuZFBcbiMgXHQ4OCAgICAgICAgODgnICBgODggODhvb29vZDggODgnICBgXCJcIiA4ODg4OFwiICAgODgnICBgODggODgnICBgODggIGA4YmQ4J1xuIyBcdFk4LiAgIC44OCA4OCAgICA4OCA4OC4gIC4uLiA4OC4gIC4uLiA4OCAgYDhiLiA4OC4gIC44OCA4OC4gIC44OCAgLmQ4OGIuXG4jIFx0IFk4ODg4OFAnIGRQICAgIGRQIGA4ODg4OFAnIGA4ODg4OFAnIGRQICAgYFlQIDg4WTg4ODgnIGA4ODg4OFAnIGRQJyAgYGRQXG5cblR5cGUgPSByZXF1aXJlICdtZC1jb21wb25lbnRzL1R5cGUnXG57IFJpcHBsZSB9ID0gcmVxdWlyZSAnbWQtY29tcG9uZW50cy9SaXBwbGUnXG57IEljb24gfSA9IHJlcXVpcmUgJ21kLWNvbXBvbmVudHMvSWNvbidcbnsgVGhlbWUgfSA9IHJlcXVpcmUgJ21kLWNvbXBvbmVudHMvVGhlbWUnXG5cbmV4cG9ydHMuQ2hlY2tib3ggPSBDaGVja0JveCA9IGNsYXNzIENoZWNrYm94IGV4dGVuZHMgSWNvblxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblxuXHRcdEBfaXNPbiA9IHVuZGVmaW5lZFxuXG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0bmFtZTogJy4nXG5cdFx0XHRhbmltYXRpb25PcHRpb25zOiB7dGltZTogLjE1fVxuXHRcdFx0aWNvbjogJ2NoZWNrYm94LWJsYW5rLW91dGxpbmUnXG5cdFx0XHRjb2xvcjogJ3JnYmEoMCwwLDAsLjU0KSdcblxuXHRcdEBpc09uID0gb3B0aW9ucy5pc09uID8gZmFsc2Vcblx0XHRAb25UYXAgLT4gQGlzT24gPSAhQGlzT25cblxuXHRAZGVmaW5lIFwiaXNPblwiLFxuXHRcdGdldDogLT4gcmV0dXJuIEBfaXNPblxuXHRcdHNldDogKGJvb2wpIC0+XG5cdFx0XHRyZXR1cm4gaWYgYm9vbCBpcyBAX2lzT25cblx0XHRcdFxuXHRcdFx0QF9pc09uID0gYm9vbFxuXHRcdFx0QGVtaXQoXCJjaGFuZ2U6aXNPblwiLCBAX2lzT24sIEApXG5cdFx0XHRAdXBkYXRlKClcblxuXHR1cGRhdGU6IC0+XG5cdFx0aWYgQF9pc09uXG5cdFx0XHRAaWNvbiA9ICdjaGVja2JveC1tYXJrZWQnXG5cdFx0XHRAY29sb3IgPSBUaGVtZS5jb2xvcnMucHJpbWFyeS5tYWluXG5cdFx0ZWxzZSBcblx0XHRcdEBpY29uID0gJ2NoZWNrYm94LWJsYW5rLW91dGxpbmUnXG5cdFx0XHRAY29sb3IgPSAncmdiYSgwLDAsMCwuNTQpJyIsIiMgXHQgODg4ODg4YmEgICAgICAgICAgICAgZFAgICAgIGRQXG4jIFx0IDg4ICAgIGA4YiAgICAgICAgICAgIDg4ICAgICA4OFxuIyBcdGE4OGFhYWE4UCcgZFAgICAgZFAgZDg4ODhQIGQ4ODg4UCAuZDg4ODhiLiA4OGQ4ODhiLlxuIyBcdCA4OCAgIGA4Yi4gODggICAgODggICA4OCAgICAgODggICA4OCcgIGA4OCA4OCcgIGA4OFxuIyBcdCA4OCAgICAuODggODguICAuODggICA4OCAgICAgODggICA4OC4gIC44OCA4OCAgICA4OFxuIyBcdCA4ODg4ODg4OFAgYDg4ODg4UCcgICBkUCAgICAgZFAgICBgODg4ODhQJyBkUCAgICBkUFxuXG5cblR5cGUgPSByZXF1aXJlICdtZC1jb21wb25lbnRzL1R5cGUnXG57IFJpcHBsZSB9ID0gcmVxdWlyZSAnbWQtY29tcG9uZW50cy9SaXBwbGUnXG57IEljb24gfSA9IHJlcXVpcmUgJ21kLWNvbXBvbmVudHMvSWNvbidcbnsgVGhlbWUgfSA9IHJlcXVpcmUgJ21kLWNvbXBvbmVudHMvVGhlbWUnXG5cbmV4cG9ydHMuQnV0dG9uID0gY2xhc3MgQnV0dG9uIGV4dGVuZHMgTGF5ZXIgXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXG5cdFx0QF9yYWlzZWQgPSBvcHRpb25zLnJhaXNlZCA/IGZhbHNlXG5cdFx0QF90eXBlID0gaWYgQF9yYWlzZWQgdGhlbiAncmFpc2VkJyBlbHNlICdmbGF0J1xuXHRcdEBfYWN0aW9uID0gb3B0aW9ucy5hY3Rpb24gPyAtPiBudWxsXG5cblx0XHRzdXBlciBfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRuYW1lOiAnLidcblx0XHRcdHdpZHRoOiAwLCBoZWlnaHQ6IDM2XG5cdFx0XHRib3JkZXJSYWRpdXM6IDJcblx0XHRcdGJhY2tncm91bmRDb2xvcjogVGhlbWUuYnV0dG9uW0BfdHlwZV0uYmFja2dyb3VuZENvbG9yXG5cdFx0XHRzaGFkb3dZOiBUaGVtZS5idXR0b25bQF90eXBlXS5zaGFkb3dZXG5cdFx0XHRzaGFkb3dCbHVyOiBUaGVtZS5idXR0b25bQF90eXBlXS5zaGFkb3dCbHVyXG5cdFx0XHRzaGFkb3dDb2xvcjogVGhlbWUuYnV0dG9uW0BfdHlwZV0uc2hhZG93Q29sb3Jcblx0XHRcdGFuaW1hdGlvbk9wdGlvbnM6IHt0aW1lOiAuMTV9XG5cblx0XHRAbGFiZWxMYXllciA9IG5ldyBUeXBlLkJ1dHRvblxuXHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEBcblx0XHRcdGNvbG9yOiBUaGVtZS5idXR0b25bQF90eXBlXS5jb2xvclxuXHRcdFx0dGV4dDogb3B0aW9ucy50ZXh0ID8gJ2J1dHRvbidcblx0XHRcdHRleHRUcmFuc2Zvcm06ICd1cHBlcmNhc2UnXG5cdFx0XHR0ZXh0QWxpZ246ICdjZW50ZXInXG5cdFx0XHRhbmltYXRpb25PcHRpb25zOiB7dGltZTogLjE1fVxuXHRcdFx0cGFkZGluZzogXG5cdFx0XHRcdGxlZnQ6IDE2LjUsIHJpZ2h0OiAxNi41XG5cdFx0XHRcdHRvcDogOSwgYm90dG9tOiAxMVxuXG5cdFx0QHNpemUgPSBAbGFiZWxMYXllci5zaXplXG5cdFx0QHggPSBvcHRpb25zLnhcblxuXHRcdEBvblRvdWNoU3RhcnQgKGV2ZW50KSAtPiBcblx0XHRcdEBzaG93VG91Y2hlZCgpXG5cdFx0XHRVdGlscy5kZWxheSAxLCA9PiBAcmVzZXQoKVxuXHRcdFxuXHRcdEBvblRvdWNoRW5kIChldmVudCkgLT4gXG5cdFx0XHRAX2FjdGlvbigpXG5cdFx0XHRAcmVzZXQoKVxuXG5cblx0c2hvd1RvdWNoZWQ6IC0+IFxuXHRcdEBsYWJlbExheWVyLmFuaW1hdGUge2JyaWdodG5lc3M6IDExMCwgc2F0dXJhdGU6IDExMH1cblx0XHRcblx0XHRzd2l0Y2ggQF90eXBlXG5cdFx0XHR3aGVuICdmbGF0JyB0aGVuIEBhbmltYXRlIHtiYWNrZ3JvdW5kQ29sb3I6ICdyZ2JhKDAsMCwwLC4wNSknfVxuXHRcdFx0d2hlbiAncmFpc2VkJ1xuXHRcdFx0XHRSaXBwbGUoQCwgZXZlbnQucG9pbnQsIEBsYWJlbExheWVyKVxuXHRcdFx0XHRAYW5pbWF0ZSB7c2hhZG93WTogMywgc2hhZG93U3ByZWFkOiAxfVxuXG5cdHJlc2V0OiAtPlxuXHRcdEBsYWJlbExheWVyLmFuaW1hdGUge2JyaWdodG5lc3M6IDEwMCwgc2F0dXJhdGU6IDEwMH1cblx0XHRAYmFja2dyb3VuZENvbG9yID0gVGhlbWUuYnV0dG9uW0BfdHlwZV0uYmFja2dyb3VuZENvbG9yXG5cdFx0QGFuaW1hdGUgXG5cdFx0XHRzaGFkb3dZOiBUaGVtZS5idXR0b25bQF90eXBlXS5zaGFkb3dZXG5cdFx0XHRzaGFkb3dTcHJlYWQ6IDBcbiIsIiMgXHQgODg4ODg4YmEgICAgICAgICAgICAgZFAgICAgIGRQICAgICAgICAgICAgICAgICAgICAgICA4ODg4ODhiYVxuIyBcdCA4OCAgICBgOGIgICAgICAgICAgICA4OCAgICAgODggICAgICAgICAgICAgICAgICAgICAgIDg4ICAgIGA4YlxuIyBcdGE4OGFhYWE4UCcgLmQ4ODg4Yi4gZDg4ODhQIGQ4ODg4UCAuZDg4ODhiLiA4OGQ4Yi5kOGIuIDg4ICAgICA4OCAuZDg4ODhiLiBkUCAgIC5kUFxuIyBcdCA4OCAgIGA4Yi4gODgnICBgODggICA4OCAgICAgODggICA4OCcgIGA4OCA4OCdgODgnYDg4IDg4ICAgICA4OCA4OCcgIGA4OCA4OCAgIGQ4J1xuIyBcdCA4OCAgICAuODggODguICAuODggICA4OCAgICAgODggICA4OC4gIC44OCA4OCAgODggIDg4IDg4ICAgICA4OCA4OC4gIC44OCA4OCAuODgnXG4jIFx0IDg4ODg4ODg4UCBgODg4ODhQJyAgIGRQICAgICBkUCAgIGA4ODg4OFAnIGRQICBkUCAgZFAgZFAgICAgIGRQIGA4ODg4OFA4IDg4ODhQJ1xuXG5UeXBlID0gcmVxdWlyZSAnbWQtY29tcG9uZW50cy9UeXBlJ1xueyBSaXBwbGUgfSA9IHJlcXVpcmUgJ21kLWNvbXBvbmVudHMvUmlwcGxlJ1xueyBJY29uIH0gPSByZXF1aXJlICdtZC1jb21wb25lbnRzL0ljb24nXG57IFRoZW1lIH0gPSByZXF1aXJlICdtZC1jb21wb25lbnRzL1RoZW1lJ1xuXG5leHBvcnRzLkJvdHRvbU5hdiA9IGNsYXNzIEJvdHRvbU5hdiBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXHRcdFxuXHRcdEBfZGVzdGluYXRpb25zID0gb3B0aW9ucy5kZXN0aW5hdGlvbnMgPyB0aHJvdyAnTmVlZHMgYXQgbGVhc3Qgb25lIGRlc3RpbmF0aW9uLidcblx0XHRAX2l0ZW1zID0gW11cblx0XHRAX2luaXRpYWxEZXN0aW5hdGlvbiA9IG9wdGlvbnMuaW5pdGlhbERlc3RpbmF0aW9uID8gdW5kZWZpbmVkXG5cdFx0IyBkZXN0aW5hdGlvbiBzaG91bGQgYmU6IFt7bmFtZTogc3RyaW5nLCBpY29uOiBpY29uU3RyaW5nLCBhY3Rpb246IGZ1bmN0aW9ufV1cblx0XHRAX2FjdGl2ZURlc3RpbmF0aW9uID0gQF9pbml0aWFsRGVzdGluYXRpb24gPyBAX2l0ZW1zWzBdXG5cdFx0QF9hcHAgPSBvcHRpb25zLmFwcFxuXG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0bmFtZTogJ0JvdHRvbSBOYXYnXG5cdFx0XHR5OiBBbGlnbi5ib3R0b21cblx0XHRcdHdpZHRoOiBTY3JlZW4ud2lkdGgsIGhlaWdodDogNTZcblx0XHRcdGJhY2tncm91bmRDb2xvcjogVGhlbWUuYm90dG9tTmF2LmJhY2tncm91bmRDb2xvclxuXHRcdFx0c2hhZG93WTogVGhlbWUuYm90dG9tTmF2LnNoYWRvd1lcblx0XHRcdHNoYWRvd0JsdXI6IFRoZW1lLmJvdHRvbU5hdi5zaGFkb3dCbHVyXG5cdFx0XHRzaGFkb3dDb2xvcjogVGhlbWUuYm90dG9tTmF2LnNoYWRvd0NvbG9yXG5cdFx0XHRjbGlwOiB0cnVlXG5cblxuXHRcdGZvciBkZXN0aW5hdGlvbiwgaSBpbiBAX2Rlc3RpbmF0aW9uc1xuXHRcdFx0aXRlbSA9IG5ldyBMYXllclxuXHRcdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQFxuXHRcdFx0XHR4OiBAd2lkdGgvQF9kZXN0aW5hdGlvbnMubGVuZ3RoICogaVxuXHRcdFx0XHR3aWR0aDogQHdpZHRoL0BfZGVzdGluYXRpb25zLmxlbmd0aCwgaGVpZ2h0OiBAaGVpZ2h0XG5cdFx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXG5cdFx0XHRpdGVtLmRpc2sgPSBuZXcgTGF5ZXJcblx0XHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IGl0ZW1cblx0XHRcdFx0eDogQWxpZ24uY2VudGVyLCB5OiBBbGlnbi5jZW50ZXJcblx0XHRcdFx0aGVpZ2h0OiBAaGVpZ2h0ICogMS41LCB3aWR0aDogQGhlaWdodCAqIDEuNSwgYm9yZGVyUmFkaXVzOiBAaGVpZ2h0XG5cdFx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXG5cdFx0XHRpdGVtLmljb25MYXllciA9IG5ldyBJY29uXG5cdFx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBpdGVtLmRpc2tcblx0XHRcdFx0eDogQWxpZ24uY2VudGVyLCB5OiBBbGlnbi5jZW50ZXIoLTgpXG5cdFx0XHRcdGljb246IGRlc3RpbmF0aW9uLmljb25cblx0XHRcdFx0YW5pbWF0aW9uT3B0aW9uczoge3RpbWU6IC4xNX1cblxuXHRcdFx0aXRlbS5sYWJlbExheWVyID0gbmV3IFR5cGUuQ2FwdGlvblxuXHRcdFx0XHRuYW1lOiAnLicsIHBhcmVudDogaXRlbS5kaXNrXG5cdFx0XHRcdHg6IEFsaWduLmNlbnRlciwgeTogQWxpZ24uY2VudGVyKDE0KVxuXHRcdFx0XHR3aWR0aDogQHdpZHRoLCB0ZXh0QWxpZ246ICdjZW50ZXInXG5cdFx0XHRcdHRleHQ6IGRlc3RpbmF0aW9uLnRpdGxlXG5cdFx0XHRcdGFuaW1hdGlvbk9wdGlvbnM6IHt0aW1lOiAuMTV9XG5cblx0XHRcdGl0ZW0uYWN0aW9uID0gZGVzdGluYXRpb24uYWN0aW9uXG5cblx0XHRcdGl0ZW0uZGlzay5vblRvdWNoU3RhcnQgKGV2ZW50KSAtPiBcblx0XHRcdFx0UmlwcGxlKEAsIGV2ZW50LnBvaW50LCBAcGFyZW50Lmljb25MYXllciwgbmV3IENvbG9yKFRoZW1lLnByaW1hcnkpLmFscGhhKC4zKSlcblxuXHRcdFx0aXRlbS5vblRhcCAtPiBAcGFyZW50LmFjdGl2ZURlc3RpbmF0aW9uID0gQFxuXG5cdFx0XHRAX2l0ZW1zLnB1c2goaXRlbSlcblxuXHRcdFx0QHNob3dBY3RpdmUoQF9pdGVtc1swXSlcblxuXHRAZGVmaW5lIFwiYWN0aXZlRGVzdGluYXRpb25cIixcblx0XHRnZXQ6IC0+IHJldHVybiBAX2FjdGl2ZURlc3RpbmF0aW9uXG5cdFx0c2V0OiAoZGVzdGluYXRpb24pIC0+XG5cdFx0XHRyZXR1cm4gaWYgZGVzdGluYXRpb24gaXMgQF9hY3RpdmVEZXN0aW5hdGlvblxuXHRcdFx0QF9hY3RpdmVEZXN0aW5hdGlvbiA9IGRlc3RpbmF0aW9uXG5cblx0XHRcdEBfYWN0aXZlRGVzdGluYXRpb24uYWN0aW9uKClcblx0XHRcdEBzaG93QWN0aXZlKEBfYWN0aXZlRGVzdGluYXRpb24pXG5cblx0c2hvd0FjdGl2ZTogKGl0ZW0pIC0+XG5cdFx0aXRlbS5sYWJlbExheWVyLmFuaW1hdGUge2NvbG9yOiBUaGVtZS5wcmltYXJ5LCBvcGFjaXR5OiAxfVxuXHRcdGl0ZW0uaWNvbkxheWVyLmNvbG9yID0gVGhlbWUucHJpbWFyeVxuXHRcdFxuXHRcdGZvciBzaWIgaW4gaXRlbS5zaWJsaW5nc1xuXHRcdFx0c2liLmxhYmVsTGF5ZXIuYW5pbWF0ZSB7Y29sb3I6ICcjNzc3J31cblx0XHRcdHNpYi5pY29uTGF5ZXIuY29sb3IgPSAnIzc3NyciLCIjIFx0IC5kODg4ODg4XG4jIFx0ZDgnICAgIDg4XG4jIFx0ODhhYWFhYTg4YSA4OGQ4ODhiLiA4OGQ4ODhiLlxuIyBcdDg4ICAgICA4OCAgODgnICBgODggODgnICBgODhcbiMgXHQ4OCAgICAgODggIDg4LiAgLjg4IDg4LiAgLjg4XG4jIFx0ODggICAgIDg4ICA4OFk4ODhQJyA4OFk4ODhQJ1xuIyBcdCAgICAgICAgICAgODggICAgICAgODhcbiMgXHQgICAgICAgICAgIGRQICAgICAgIGRQXG5cbnsgVGhlbWUgfSA9IHJlcXVpcmUgJ21kLWNvbXBvbmVudHMvVGhlbWUnXG57IEhlYWRlciB9ID0gcmVxdWlyZSAnbWQtY29tcG9uZW50cy9IZWFkZXInXG57IEJvdHRvbU5hdiB9ID0gcmVxdWlyZSAnbWQtY29tcG9uZW50cy9Cb3R0b21OYXYnXG57IE1lbnVPdmVybGF5IH0gPSByZXF1aXJlICdtZC1jb21wb25lbnRzL01lbnVPdmVybGF5J1xuXG5leHBvcnRzLkFwcCA9IGNsYXNzIEFwcCBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXG5cdFx0QF9ib3R0b21OYXYgPSBvcHRpb25zLmJvdHRvbU5hdiA/IHVuZGVmaW5lZFxuXHRcdEBfbWVudU92ZXJsYXkgPSBvcHRpb25zLm1lbnVPdmVybGF5ID8gdW5kZWZpbmVkXG5cdFx0XG5cdFx0QFRoZW1lID0gVGhlbWVcblx0XHRAdmlld3MgPSBvcHRpb25zLnZpZXdzID8gW11cblx0XHRAY3VycmVudCA9IHtpOiAwfVxuXHRcdEBub3RpZmljYXRpb25zID0gW11cblx0XHRAYWN0aW9uQnV0dG9uID0gdW5kZWZpbmVkXG5cdFx0QHNuYWNrYmFyID0gdW5kZWZpbmVkXG5cblx0XHRzdXBlciBfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRuYW1lOiAnQXBwJ1xuXHRcdFx0c2l6ZTogU2NyZWVuLnNpemVcblx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFx0aW5kZXg6IDFcblxuXHRcdCMgSEVBREVSXG5cblx0XHRAaGVhZGVyID0gbmV3IEhlYWRlclxuXHRcdFx0VGhlbWU6IFRoZW1lXG5cdFx0XHRpbmRleDogOTk5XG5cblx0XHQjIEZPT1RFUlxuXG5cdFx0QGZvb3RlciA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogJ0Zvb3Rlcidcblx0XHRcdHdpZHRoOiBTY3JlZW4ud2lkdGgsIGhlaWdodDogNDhcblx0XHRcdGltYWdlOiBUaGVtZS5mb290ZXIuaW1hZ2Vcblx0XHRcdGluZGV4OiA5OTlcblx0XHRcdHk6IEFsaWduLmJvdHRvbSgpXG5cblx0XHRpZiBAX2JvdHRvbU5hdlxuXHRcdFx0QGJvdHRvbU5hdiA9IG5ldyBCb3R0b21OYXZcblx0XHRcdFx0bmFtZTogJ0JvdHRvbSBOYXYnXG5cdFx0XHRcdGRlc3RpbmF0aW9uczogQF9ib3R0b21OYXYubGlua3MgPyBcIkJvdHRvbU5hdiBuZWVkcyBhbiBhcnJheSBvZiBsaW5rcy4gRXhhbXBsZTogW3t0aXRsZTogJ0hvbWUnLCBpY29uOiAnaG9tZScsIGFjdGlvbjogLT4gdmlldy5saW5rVG8oaG9tZSl9XVwiXG5cdFx0XHRcdHk6IGlmIEBmb290ZXI/IHRoZW4gQWxpZ24uYm90dG9tKC1AZm9vdGVyLmhlaWdodCkgZWxzZSBBbGlnbi5ib3R0b20oKVxuXHRcdFx0XHRpbmRleDogOTk4XG5cblx0XHQjIE1FTlUgT1ZFUkxBWVxuXHRcdGlmIEBfbWVudU92ZXJsYXlcblx0XHRcdEBtZW51T3ZlcmxheSA9IG5ldyBNZW51T3ZlcmxheVxuXHRcdFx0XHRuYW1lOiAnTWVudSBPdmVybGF5J1xuXHRcdFx0XHR0aXRsZTogQF9tZW51T3ZlcmxheS50aXRsZSA/IHRocm93ICdNZW51T3ZlcmxheSBuZWVkcyBhIHRpdGxlLidcblx0XHRcdFx0bGlua3M6IEBfbWVudU92ZXJsYXkubGlua3MgPyB0aHJvdyBcIk1lbnVPdmVybGF5IG5lZWRzIGFuIGFycmF5IG9mIGxpbmtzLiBFeGFtcGxlOiBbe3RpdGxlOiAnSG9tZScsIGljb246ICdob21lJywgYWN0aW9uOiAtPiB2aWV3LmxpbmtUbyhob21lKX1dXCJcblxuXG5cdFx0IyBLRVlCT0FSRFxuXG5cdFx0QGtleWJvYXJkID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiAnS2V5Ym9hcmQnXG5cdFx0XHR5OiBAbWF4WSwgaW1hZ2U6IFRoZW1lLmtleWJvYXJkLmltYWdlXG5cdFx0XHR3aWR0aDogQHdpZHRoLCBoZWlnaHQ6IDIyMlxuXHRcdFx0aW5kZXg6IDEwMDBcblx0XHRcdGFuaW1hdGlvbk9wdGlvbnM6XG5cdFx0XHRcdHRpbWU6IC4yNVxuXG5cdFx0QGtleWJvYXJkLm9uVGFwID0+IEBoaWRlS2V5Ym9hcmQoKVxuXG5cdFx0Zm9yIHZpZXcsIGkgaW4gQHZpZXdzXG5cdFx0XHRAYWRkVmlldyh2aWV3LCBpKVxuXG5cdFx0QGNoYW5nZVZpZXcoQHZpZXdzWzBdKVxuXG5cdHNob3dLZXlib2FyZDogLT5cblx0XHRAa2V5Ym9hcmQuYW5pbWF0ZVxuXHRcdFx0eTogQWxpZ24uYm90dG9tKClcblx0XHRAa2V5Ym9hcmQuYnJpbmdUb0Zyb250KClcblxuXHRoaWRlS2V5Ym9hcmQ6IC0+XG5cdFx0QGtleWJvYXJkLmFuaW1hdGVcblx0XHRcdHk6IEBtYXhZXG5cblx0YWRkVmlldzogKHZpZXcsIGkpIC0+XG5cdFx0dmlldy5pID0gaVxuXHRcdHZpZXcucGFyZW50ID0gQFxuXHRcdHZpZXcueSA9IEBoZWFkZXIubWF4WVxuXHRcdHZpZXcuaGVpZ2h0ID0gU2NyZWVuLmhlaWdodCAtIEBoZWFkZXIuaGVpZ2h0IC0gQGZvb3Rlci5oZWlnaHRcblxuXHRcdHZpZXcuaG9tZSA9IHZpZXcubmV3UGFnZVxuXHRcdCBcdG5hbWU6ICdob21lJ1xuXHRcdCBcdGhlYWRlcjpcblx0XHRcdCBcdHRpdGxlOiB2aWV3Ll90aXRsZVxuXHRcdFx0IFx0aWNvbjogdmlldy5faWNvblxuXHRcdFx0IFx0aWNvbkFjdGlvbjogdmlldy5faWNvbkFjdGlvblxuXG5cdFx0dmlldy5zaG93TmV4dCh2aWV3LmhvbWUpXG5cblx0Y2hhbmdlVmlldzogKHZpZXcpIC0+XG5cdFx0cmV0dXJuIGlmIHZpZXcgaXMgQGN1cnJlbnRcblxuXHRcdEBoZWFkZXIudGl0bGUgPSB2aWV3LmN1cnJlbnQuX2hlYWRlcj8udGl0bGUgPyAnRGVmYXVsdCdcblx0XHRAaGVhZGVyLmljb24gPSB2aWV3LmN1cnJlbnQuX2hlYWRlcj8uaWNvbiA/ICdtZW51J1xuXHRcdEBoZWFkZXIuaWNvbkFjdGlvbiA9IHZpZXcuY3VycmVudC5faGVhZGVyPy5pY29uQWN0aW9uID8gLT4gYXBwLnNob3dNZW51KClcblx0XHRAaGVhZGVyLnZpc2libGUgPSB2aWV3LmN1cnJlbnQuX2hlYWRlcj8udmlzaWJsZSA/IHRydWVcblxuXHRcdGlmIHZpZXcuaSA+IEBjdXJyZW50Lmlcblx0XHRcdHZpZXcueCA9IFNjcmVlbi53aWR0aCBcblx0XHRcdEBjdXJyZW50LmFuaW1hdGUge3g6IC1TY3JlZW4ud2lkdGh9XG5cdFx0ZWxzZSBpZiB2aWV3LmkgPCBAY3VycmVudC5pXG5cdFx0XHR2aWV3LnggPSAtU2NyZWVuLndpZHRoXG5cdFx0XHRAY3VycmVudC5hbmltYXRlIHt4OiBTY3JlZW4ud2lkdGh9XG5cblx0XHR2aWV3LmFuaW1hdGUge3g6IDB9XG5cdFx0dmlldy5icmluZ1RvRnJvbnQoKVxuXHRcdEBjdXJyZW50ID0gdmlld1xuXG5cdHNob3dNZW51OiAtPlxuXHRcdEBtZW51T3ZlcmxheS5zaG93KClcblxuXHRoaWRlTWVudTogLT5cblx0XHRAbWVudU92ZXJsYXkuaGlkZSgpXG5cblx0Y2hhbmdlUGFnZTogKHBhZ2UpIC0+XG5cdFx0QGhlYWRlci50aXRsZSA9IHBhZ2UuX2hlYWRlci50aXRsZVxuXHRcdEBoZWFkZXIuaWNvbiA9IHBhZ2UuX2hlYWRlci5pY29uXG5cdFx0QGhlYWRlci5pY29uQWN0aW9uID0gcGFnZS5faGVhZGVyLmljb25BY3Rpb25cblx0XHRAaGVhZGVyLnZpc2libGUgPSBwYWdlLl9oZWFkZXIudmlzaWJsZVxuXHRcdHBhZ2UuX29uTG9hZCgpXG4iLCIjIFx0IC5kODg4ODg4ICAgICAgICAgICAgIGRQICAgb28gICAgICAgICAgICAgICAgICAgIDg4ODg4OGJhICAgICAgICAgICAgIGRQICAgICBkUFxuIyBcdGQ4JyAgICA4OCAgICAgICAgICAgICA4OCAgICAgICAgICAgICAgICAgICAgICAgICA4OCAgICBgOGIgICAgICAgICAgICA4OCAgICAgODhcbiMgXHQ4OGFhYWFhODhhIC5kODg4OGIuIGQ4ODg4UCBkUCAuZDg4ODhiLiA4OGQ4ODhiLiBhODhhYWFhOFAnIGRQICAgIGRQIGQ4ODg4UCBkODg4OFAgLmQ4ODg4Yi4gODhkODg4Yi5cbiMgXHQ4OCAgICAgODggIDg4JyAgYFwiXCIgICA4OCAgIDg4IDg4JyAgYDg4IDg4JyAgYDg4ICA4OCAgIGA4Yi4gODggICAgODggICA4OCAgICAgODggICA4OCcgIGA4OCA4OCcgIGA4OFxuIyBcdDg4ICAgICA4OCAgODguICAuLi4gICA4OCAgIDg4IDg4LiAgLjg4IDg4ICAgIDg4ICA4OCAgICAuODggODguICAuODggICA4OCAgICAgODggICA4OC4gIC44OCA4OCAgICA4OFxuIyBcdDg4ICAgICA4OCAgYDg4ODg4UCcgICBkUCAgIGRQIGA4ODg4OFAnIGRQICAgIGRQICA4ODg4ODg4OFAgYDg4ODg4UCcgICBkUCAgICAgZFAgICBgODg4ODhQJyBkUCAgICBkUFxuXG5UeXBlID0gcmVxdWlyZSAnbWQtY29tcG9uZW50cy9UeXBlJ1xueyBSaXBwbGUgfSA9IHJlcXVpcmUgJ21kLWNvbXBvbmVudHMvUmlwcGxlJ1xueyBJY29uIH0gPSByZXF1aXJlICdtZC1jb21wb25lbnRzL0ljb24nXG57IFRoZW1lIH0gPSByZXF1aXJlICdtZC1jb21wb25lbnRzL1RoZW1lJ1xueyBNZW51QnV0dG9uIH0gPSByZXF1aXJlICdtZC1jb21wb25lbnRzL01lbnVCdXR0b24nXG5cbmV4cG9ydHMuQWN0aW9uQnV0dG9uID0gY2xhc3MgQWN0aW9uQnV0dG9uIGV4dGVuZHMgTGF5ZXIgXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXG5cdFx0QF9yYWlzZWQgPSBvcHRpb25zLnJhaXNlZCA/IGZhbHNlXG5cdFx0QF9hY3Rpb24gPSBvcHRpb25zLmFjdGlvbiA/IC0+IG51bGxcblx0XHRAX2ljb24gPSBvcHRpb25zLmljb24gPyAncGx1cydcblx0XHRAX2FwcCA9IG9wdGlvbnMuYXBwXG5cblx0XHRzdXBlciBfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRuYW1lOiAnLidcblx0XHRcdHg6IEFsaWduLnJpZ2h0KC0xNiksIHk6IEFsaWduLmJvdHRvbSgtMTcpXG5cdFx0XHR3aWR0aDogNjQsIGhlaWdodDogNjQsIGJvcmRlclJhZGl1czogMzJcblx0XHRcdGJhY2tncm91bmRDb2xvcjogVGhlbWUuZmFiLmJhY2tncm91bmRDb2xvclxuXHRcdFx0c2hhZG93WTogMiwgc2hhZG93Qmx1cjogM1xuXHRcdFx0c2hhZG93Q29sb3I6ICdyZ2JhKDAsMCwwLC4yNSknXG5cdFx0XHRhbmltYXRpb25PcHRpb25zOiB7dGltZTogLjE1fVxuXG5cdFx0aWYgQF9hcHA/XG5cdFx0XHRpZiBAX2FwcC5ib3R0b21OYXY/IHRoZW4gQHkgLT0gQF9hcHAuYm90dG9tTmF2LmhlaWdodFxuXHRcdFx0QF9hcHAuYWN0aW9uQnV0dG9uID0gQFxuXG5cdFx0QGljb25MYXllciA9IG5ldyBJY29uXG5cdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQFxuXHRcdFx0eDogQWxpZ24uY2VudGVyLCB5OiBBbGlnbi5jZW50ZXJcblx0XHRcdGljb246IEBfaWNvbiwgY29sb3I6IFRoZW1lLmZhYi5jb2xvclxuXG5cdFx0QG9uVG91Y2hTdGFydCAoZXZlbnQpIC0+IFxuXHRcdFx0QHNob3dUb3VjaGVkKClcblx0XHRcdFV0aWxzLmRlbGF5IDEsID0+IEByZXNldCgpXG5cdFx0XG5cdFx0QG9uVG91Y2hFbmQgKGV2ZW50KSAtPiBcblx0XHRcdEBfYWN0aW9uKClcblx0XHRcdEByZXNldCgpXG5cblx0c2hvd1RvdWNoZWQ6IC0+IFxuXHRcdFJpcHBsZShALCBldmVudC5wb2ludCwgQGljb25MYXllcilcblx0XHRAYW5pbWF0ZSB7c2hhZG93WTogMywgc2hhZG93U3ByZWFkOiAxfVxuXG5cdHJlc2V0OiAtPlxuXHRcdEBhbmltYXRlIFxuXHRcdFx0c2hhZG93WTogMlxuXHRcdFx0c2hhZG93U3ByZWFkOiAwXG4iLCIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQTJCQUE7QURPQSxJQUFBLG1EQUFBO0VBQUE7OztBQUFBLElBQUEsR0FBTyxPQUFBLENBQVEsb0JBQVI7O0FBQ0wsU0FBVyxPQUFBLENBQVEsc0JBQVI7O0FBQ1gsT0FBUyxPQUFBLENBQVEsb0JBQVI7O0FBQ1QsUUFBVSxPQUFBLENBQVEscUJBQVI7O0FBQ1YsYUFBZSxPQUFBLENBQVEsMEJBQVI7O0FBRWpCLE9BQU8sQ0FBQyxZQUFSLEdBQTZCOzs7RUFDZixzQkFBQyxPQUFEO0FBRVosUUFBQTs7TUFGYSxVQUFVOztJQUV2QixJQUFDLENBQUEsT0FBRCwwQ0FBNEI7SUFDNUIsSUFBQyxDQUFBLE9BQUQsNENBQTRCLFNBQUE7YUFBRztJQUFIO0lBQzVCLElBQUMsQ0FBQSxLQUFELDBDQUF3QjtJQUN4QixJQUFDLENBQUEsSUFBRCxHQUFRLE9BQU8sQ0FBQztJQUVoQiw4Q0FBTSxDQUFDLENBQUMsUUFBRixDQUFXLE9BQVgsRUFDTDtNQUFBLElBQUEsRUFBTSxHQUFOO01BQ0EsQ0FBQSxFQUFHLEtBQUss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
