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
    var i, j, notch, ref, ref1, ref10, ref11, ref12, ref13, ref14, ref15, ref16, ref17, ref18, ref19, ref2, ref20, ref21, ref22, ref3, ref4, ref5, ref6, ref7, ref8, ref9, round, tipBackgroundColor;
    if (options == null) {
      options = {};
    }
    this._notched = (ref = options.notched) != null ? ref : false;
    this._theme = (ref1 = options.theme) != null ? ref1 : Theme.getStyle('slider');
    Slider.__super__.constructor.call(this, _.defaults(options, {
      name: '.',
      height: 2,
      knobSize: 32,
      backgroundColor: 'rgba(0,0,0,.26)',
      min: 1,
      max: 10
    }));
    this.fill.backgroundColor = (ref2 = (ref3 = this._theme) != null ? ref3.fill : void 0) != null ? ref2 : Theme.colors.primary.dark;
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
      size: (ref4 = (ref5 = this._theme.knob) != null ? ref5.size : void 0) != null ? ref4 : 12,
      borderRadius: (ref6 = (ref7 = this._theme.knob) != null ? ref7.radius : void 0) != null ? ref6 : 12,
      backgroundColor: (ref8 = (ref9 = this._theme.knob) != null ? ref9.backgroundColor : void 0) != null ? ref8 : Theme.colors.primary.light,
      animationOptions: {
        time: .15
      }
    });
    if (this._notched) {
      for (i = j = 0, ref10 = this.max - this.min; 0 <= ref10 ? j < ref10 : j > ref10; i = 0 <= ref10 ? ++j : --j) {
        notch = new Layer({
          name: '.',
          parent: this,
          x: i * this.width / (this.max - this.min),
          width: (ref11 = (ref12 = this._theme.notch) != null ? ref12.width : void 0) != null ? ref11 : 2,
          height: (ref13 = (ref14 = this._theme.notch) != null ? ref14.height : void 0) != null ? ref13 : 2,
          borderRadius: (ref15 = (ref16 = this._theme.notch) != null ? ref16.borderRadius : void 0) != null ? ref15 : 2,
          backgroundColor: (ref17 = (ref18 = this._theme.notch) != null ? ref18.backgroundColor : void 0) != null ? ref17 : Theme.colors.primary.text
        });
      }
      tipBackgroundColor = (ref19 = (ref20 = this._theme.tip) != null ? ref20.backgroundColor : void 0) != null ? ref19 : Theme.colors.primary.light;
      this.tip = new Layer({
        name: 'Tip',
        parent: this.knob,
        x: Align.center,
        y: -24,
        width: 26,
        height: 32,
        html: '<svg width="26px" height="32px" viewBox="0 0 26 32"><path d="M13,0.1 C20.2,0.1 26,6 26,13.3 C26,17 24,20.9 18.7,26.2 L13,32 L7.2,26.2 C2,20.8 0,16.9 0,13.3 C-3.55271368e-15,6 5.8,0.1 13,0.1 L13,0.1 Z" fill="' + tipBackgroundColor + '"></path></svg>',
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
        color: (ref21 = (ref22 = this._theme.tip) != null ? ref22.value.color : void 0) != null ? ref21 : Theme.colors.primary.text,
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
    fill: typeof slider_fill !== "undefined" && slider_fill !== null ? slider_fill.backgroundColor : void 0,
    backgroundColor: typeof slider_background !== "undefined" && slider_background !== null ? slider_background.backgroundColor : void 0,
    knob: {
      size: typeof slider_knob !== "undefined" && slider_knob !== null ? slider_knob.size : void 0,
      backgroundColor: typeof slider_knob !== "undefined" && slider_knob !== null ? slider_knob.backgroundColor : void 0,
      radius: typeof slider_knob !== "undefined" && slider_knob !== null ? slider_knob.borderRadius : void 0
    },
    notch: {
      width: void 0,
      height: void 0,
      borderRadius: void 0,
      backgroundColor: source.colors.primary.text
    },
    tip: {
      backgroundColor: void 0,
      value: {
        color: void 0
      }
    }
  },
  card: {
    header: source.colors.secondary.dark
  },
  designMode: true,
  getStyle: function(object) {
    if (this.designMode) {
      return this[object];
    } else {
      return {};
    }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3N0ZXZlcnVpei9MaWJyYXJ5L01vYmlsZSBEb2N1bWVudHMvY29tfmFwcGxlfkNsb3VkRG9jcy9HaXRIdWIvZnJhbWVyLW1kL3NsaWRlck5ldy5mcmFtZXIvbW9kdWxlcy9tZC5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9zdGV2ZXJ1aXovTGlicmFyeS9Nb2JpbGUgRG9jdW1lbnRzL2NvbX5hcHBsZX5DbG91ZERvY3MvR2l0SHViL2ZyYW1lci1tZC9zbGlkZXJOZXcuZnJhbWVyL21vZHVsZXMvbWQtY29tcG9uZW50cy9WaWV3LmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3N0ZXZlcnVpei9MaWJyYXJ5L01vYmlsZSBEb2N1bWVudHMvY29tfmFwcGxlfkNsb3VkRG9jcy9HaXRIdWIvZnJhbWVyLW1kL3NsaWRlck5ldy5mcmFtZXIvbW9kdWxlcy9tZC1jb21wb25lbnRzL1R5cGUuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvc3RldmVydWl6L0xpYnJhcnkvTW9iaWxlIERvY3VtZW50cy9jb21+YXBwbGV+Q2xvdWREb2NzL0dpdEh1Yi9mcmFtZXItbWQvc2xpZGVyTmV3LmZyYW1lci9tb2R1bGVzL21kLWNvbXBvbmVudHMvVGlsZS5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9zdGV2ZXJ1aXovTGlicmFyeS9Nb2JpbGUgRG9jdW1lbnRzL2NvbX5hcHBsZX5DbG91ZERvY3MvR2l0SHViL2ZyYW1lci1tZC9zbGlkZXJOZXcuZnJhbWVyL21vZHVsZXMvbWQtY29tcG9uZW50cy9UaGVtZS5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9zdGV2ZXJ1aXovTGlicmFyeS9Nb2JpbGUgRG9jdW1lbnRzL2NvbX5hcHBsZX5DbG91ZERvY3MvR2l0SHViL2ZyYW1lci1tZC9zbGlkZXJOZXcuZnJhbWVyL21vZHVsZXMvbWQtY29tcG9uZW50cy9UZXh0RmllbGQuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvc3RldmVydWl6L0xpYnJhcnkvTW9iaWxlIERvY3VtZW50cy9jb21+YXBwbGV+Q2xvdWREb2NzL0dpdEh1Yi9mcmFtZXItbWQvc2xpZGVyTmV3LmZyYW1lci9tb2R1bGVzL21kLWNvbXBvbmVudHMvU3dpdGNoLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3N0ZXZlcnVpei9MaWJyYXJ5L01vYmlsZSBEb2N1bWVudHMvY29tfmFwcGxlfkNsb3VkRG9jcy9HaXRIdWIvZnJhbWVyLW1kL3NsaWRlck5ldy5mcmFtZXIvbW9kdWxlcy9tZC1jb21wb25lbnRzL1N0YXR1c0Jhci5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9zdGV2ZXJ1aXovTGlicmFyeS9Nb2JpbGUgRG9jdW1lbnRzL2NvbX5hcHBsZX5DbG91ZERvY3MvR2l0SHViL2ZyYW1lci1tZC9zbGlkZXJOZXcuZnJhbWVyL21vZHVsZXMvbWQtY29tcG9uZW50cy9TbmFja2Jhci5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9zdGV2ZXJ1aXovTGlicmFyeS9Nb2JpbGUgRG9jdW1lbnRzL2NvbX5hcHBsZX5DbG91ZERvY3MvR2l0SHViL2ZyYW1lci1tZC9zbGlkZXJOZXcuZnJhbWVyL21vZHVsZXMvbWQtY29tcG9uZW50cy9TbGlkZXIuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvc3RldmVydWl6L0xpYnJhcnkvTW9iaWxlIERvY3VtZW50cy9jb21+YXBwbGV+Q2xvdWREb2NzL0dpdEh1Yi9mcmFtZXItbWQvc2xpZGVyTmV3LmZyYW1lci9tb2R1bGVzL21kLWNvbXBvbmVudHMvUm93SXRlbS5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9zdGV2ZXJ1aXovTGlicmFyeS9Nb2JpbGUgRG9jdW1lbnRzL2NvbX5hcHBsZX5DbG91ZERvY3MvR2l0SHViL2ZyYW1lci1tZC9zbGlkZXJOZXcuZnJhbWVyL21vZHVsZXMvbWQtY29tcG9uZW50cy9SaXBwbGUuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvc3RldmVydWl6L0xpYnJhcnkvTW9iaWxlIERvY3VtZW50cy9jb21+YXBwbGV+Q2xvdWREb2NzL0dpdEh1Yi9mcmFtZXItbWQvc2xpZGVyTmV3LmZyYW1lci9tb2R1bGVzL21kLWNvbXBvbmVudHMvUmFkaW9ib3guY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvc3RldmVydWl6L0xpYnJhcnkvTW9iaWxlIERvY3VtZW50cy9jb21+YXBwbGV+Q2xvdWREb2NzL0dpdEh1Yi9mcmFtZXItbWQvc2xpZGVyTmV3LmZyYW1lci9tb2R1bGVzL21kLWNvbXBvbmVudHMvUGFnZS5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9zdGV2ZXJ1aXovTGlicmFyeS9Nb2JpbGUgRG9jdW1lbnRzL2NvbX5hcHBsZX5DbG91ZERvY3MvR2l0SHViL2ZyYW1lci1tZC9zbGlkZXJOZXcuZnJhbWVyL21vZHVsZXMvbWQtY29tcG9uZW50cy9Ob3RpZmljYXRpb24uY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvc3RldmVydWl6L0xpYnJhcnkvTW9iaWxlIERvY3VtZW50cy9jb21+YXBwbGV+Q2xvdWREb2NzL0dpdEh1Yi9mcmFtZXItbWQvc2xpZGVyTmV3LmZyYW1lci9tb2R1bGVzL21kLWNvbXBvbmVudHMvTWVudU92ZXJsYXkuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvc3RldmVydWl6L0xpYnJhcnkvTW9iaWxlIERvY3VtZW50cy9jb21+YXBwbGV+Q2xvdWREb2NzL0dpdEh1Yi9mcmFtZXItbWQvc2xpZGVyTmV3LmZyYW1lci9tb2R1bGVzL21kLWNvbXBvbmVudHMvTWVudUJ1dHRvbi5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9zdGV2ZXJ1aXovTGlicmFyeS9Nb2JpbGUgRG9jdW1lbnRzL2NvbX5hcHBsZX5DbG91ZERvY3MvR2l0SHViL2ZyYW1lci1tZC9zbGlkZXJOZXcuZnJhbWVyL21vZHVsZXMvbWQtY29tcG9uZW50cy9JY29uLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3N0ZXZlcnVpei9MaWJyYXJ5L01vYmlsZSBEb2N1bWVudHMvY29tfmFwcGxlfkNsb3VkRG9jcy9HaXRIdWIvZnJhbWVyLW1kL3NsaWRlck5ldy5mcmFtZXIvbW9kdWxlcy9tZC1jb21wb25lbnRzL0hlYWRlci5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9zdGV2ZXJ1aXovTGlicmFyeS9Nb2JpbGUgRG9jdW1lbnRzL2NvbX5hcHBsZX5DbG91ZERvY3MvR2l0SHViL2ZyYW1lci1tZC9zbGlkZXJOZXcuZnJhbWVyL21vZHVsZXMvbWQtY29tcG9uZW50cy9HcmlkTGlzdC5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9zdGV2ZXJ1aXovTGlicmFyeS9Nb2JpbGUgRG9jdW1lbnRzL2NvbX5hcHBsZX5DbG91ZERvY3MvR2l0SHViL2ZyYW1lci1tZC9zbGlkZXJOZXcuZnJhbWVyL21vZHVsZXMvbWQtY29tcG9uZW50cy9EaXZpZGVyLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3N0ZXZlcnVpei9MaWJyYXJ5L01vYmlsZSBEb2N1bWVudHMvY29tfmFwcGxlfkNsb3VkRG9jcy9HaXRIdWIvZnJhbWVyLW1kL3NsaWRlck5ldy5mcmFtZXIvbW9kdWxlcy9tZC1jb21wb25lbnRzL0RpYWxvZy5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9zdGV2ZXJ1aXovTGlicmFyeS9Nb2JpbGUgRG9jdW1lbnRzL2NvbX5hcHBsZX5DbG91ZERvY3MvR2l0SHViL2ZyYW1lci1tZC9zbGlkZXJOZXcuZnJhbWVyL21vZHVsZXMvbWQtY29tcG9uZW50cy9DaGVja2JveC5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9zdGV2ZXJ1aXovTGlicmFyeS9Nb2JpbGUgRG9jdW1lbnRzL2NvbX5hcHBsZX5DbG91ZERvY3MvR2l0SHViL2ZyYW1lci1tZC9zbGlkZXJOZXcuZnJhbWVyL21vZHVsZXMvbWQtY29tcG9uZW50cy9CdXR0b24uY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvc3RldmVydWl6L0xpYnJhcnkvTW9iaWxlIERvY3VtZW50cy9jb21+YXBwbGV+Q2xvdWREb2NzL0dpdEh1Yi9mcmFtZXItbWQvc2xpZGVyTmV3LmZyYW1lci9tb2R1bGVzL21kLWNvbXBvbmVudHMvQm90dG9tTmF2LmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3N0ZXZlcnVpei9MaWJyYXJ5L01vYmlsZSBEb2N1bWVudHMvY29tfmFwcGxlfkNsb3VkRG9jcy9HaXRIdWIvZnJhbWVyLW1kL3NsaWRlck5ldy5mcmFtZXIvbW9kdWxlcy9tZC1jb21wb25lbnRzL0FwcC5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9zdGV2ZXJ1aXovTGlicmFyeS9Nb2JpbGUgRG9jdW1lbnRzL2NvbX5hcHBsZX5DbG91ZERvY3MvR2l0SHViL2ZyYW1lci1tZC9zbGlkZXJOZXcuZnJhbWVyL21vZHVsZXMvbWQtY29tcG9uZW50cy9BY3Rpb25CdXR0b24uY29mZmVlIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJUeXBlID0gcmVxdWlyZSAnbWQtY29tcG9uZW50cy9UeXBlJ1xueyBSaXBwbGUgfSA9IHJlcXVpcmUgJ21kLWNvbXBvbmVudHMvUmlwcGxlJ1xueyBUaGVtZSB9ID0gcmVxdWlyZSAnbWQtY29tcG9uZW50cy9UaGVtZSdcbnsgSWNvbiB9ID0gcmVxdWlyZSAnbWQtY29tcG9uZW50cy9JY29uJ1xueyBCdXR0b24gfSA9IHJlcXVpcmUgJ21kLWNvbXBvbmVudHMvQnV0dG9uJ1xueyBUZXh0RmllbGQgfSA9IHJlcXVpcmUgJ21kLWNvbXBvbmVudHMvVGV4dEZpZWxkJ1xueyBTbGlkZXIgfSA9IHJlcXVpcmUgJ21kLWNvbXBvbmVudHMvU2xpZGVyJ1xueyBSYWRpb2JveCB9ID0gcmVxdWlyZSAnbWQtY29tcG9uZW50cy9SYWRpb2JveCdcbnsgQ2hlY2tib3ggfSA9IHJlcXVpcmUgJ21kLWNvbXBvbmVudHMvQ2hlY2tib3gnXG57IFN3aXRjaCB9ID0gcmVxdWlyZSAnbWQtY29tcG9uZW50cy9Td2l0Y2gnXG57IERpdmlkZXIgfSA9IHJlcXVpcmUgJ21kLWNvbXBvbmVudHMvRGl2aWRlcidcbnsgR3JpZExpc3QgfSA9IHJlcXVpcmUgJ21kLWNvbXBvbmVudHMvR3JpZExpc3QnXG57IFRpbGUgfSA9IHJlcXVpcmUgJ21kLWNvbXBvbmVudHMvVGlsZSdcbnsgRGlhbG9nIH0gPSByZXF1aXJlICdtZC1jb21wb25lbnRzL0RpYWxvZydcbnsgU3RhdHVzQmFyIH0gPSByZXF1aXJlICdtZC1jb21wb25lbnRzL1N0YXR1c0JhcidcbnsgSGVhZGVyIH0gPSByZXF1aXJlICdtZC1jb21wb25lbnRzL0hlYWRlcidcbnsgTm90aWZpY2F0aW9uIH0gPSByZXF1aXJlICdtZC1jb21wb25lbnRzL05vdGlmaWNhdGlvbidcbnsgU25hY2tiYXIgfSA9IHJlcXVpcmUgJ21kLWNvbXBvbmVudHMvU25hY2tiYXInXG57IFJvd0l0ZW0gfSA9IHJlcXVpcmUgJ21kLWNvbXBvbmVudHMvUm93SXRlbSdcbnsgTWVudU92ZXJsYXkgfSA9IHJlcXVpcmUgJ21kLWNvbXBvbmVudHMvTWVudU92ZXJsYXknXG57IE1lbnVCdXR0b24gfSA9IHJlcXVpcmUgJ21kLWNvbXBvbmVudHMvTWVudUJ1dHRvbidcbnsgQWN0aW9uQnV0dG9uIH0gPSByZXF1aXJlICdtZC1jb21wb25lbnRzL0FjdGlvbkJ1dHRvbidcbnsgVmlldyB9ID0gcmVxdWlyZSAnbWQtY29tcG9uZW50cy9WaWV3J1xueyBQYWdlIH0gPSByZXF1aXJlICdtZC1jb21wb25lbnRzL1BhZ2UnXG57IEJvdHRvbU5hdiB9ID0gcmVxdWlyZSAnbWQtY29tcG9uZW50cy9Cb3R0b21OYXYnXG57IEFwcCB9ID0gcmVxdWlyZSAnbWQtY29tcG9uZW50cy9BcHAnXG5cbiMgVE9ETzogQ2hhbmdlIEFwcCBmcm9tIG1hc3RlciBmbG93IGNvbXBvbmVudCB0byBTY3JlZW4gbWFuYWdlci5cbiMgQXBwIHNob3VsZG4ndCBkaXJlY3RseSBtYW5hZ2UgcGFnZXM6IGEgbmV3IGNsYXNzLCAnc2NyZWVuJyB3aWxsIG1hbmFnZSBQYWdlcy5cbiMgVGFicyBhbGxvdyBuYXZpZ2F0aW9uIGJldHdlZW4gU2NyZWVucy4gQ29udGVudCBpcyBzdGlsbCBhZGRlZCB0byBQYWdlcy5cblxuIyBPdXIgZ29hbCBpcyB0byByZXF1aXJlIG9ubHkgb25lIHJlcXVpcmUgaW4gRnJhbWVyIHByb2plY3QsIHNvIHRoaXMgXG4jIGlzIGEgY2x1bmt5IHdheSBvZiBsZXR0aW5nIHVzZXIgY3JlYXRlIHRleHQgdXNpbmcgbWQuVGl0bGUsIGV0Yy5cblxuZXhwb3J0cy5SaXBwbGUgPSBSaXBwbGVcbmV4cG9ydHMuVGhlbWUgPSBUaGVtZVxuZXhwb3J0cy5JY29uID0gSWNvblxuZXhwb3J0cy5CdXR0b24gPSBCdXR0b25cbmV4cG9ydHMuVGV4dEZpZWxkID0gVGV4dEZpZWxkXG5leHBvcnRzLlNsaWRlciA9IFNsaWRlclxuZXhwb3J0cy5SYWRpb2JveCA9IFJhZGlvYm94XG5leHBvcnRzLkNoZWNrYm94ID0gQ2hlY2tib3hcbmV4cG9ydHMuU3dpdGNoID0gU3dpdGNoXG5leHBvcnRzLkRpdmlkZXIgPSBEaXZpZGVyXG5leHBvcnRzLkdyaWRMaXN0ID0gR3JpZExpc3RcbmV4cG9ydHMuVGlsZSA9IFRpbGVcbmV4cG9ydHMuRGlhbG9nID0gRGlhbG9nXG5leHBvcnRzLlN0YXR1c0JhciA9IFN0YXR1c0JhclxuZXhwb3J0cy5IZWFkZXIgPSBIZWFkZXJcbmV4cG9ydHMuTm90aWZpY2F0aW9uID0gTm90aWZpY2F0aW9uXG5leHBvcnRzLlNuYWNrYmFyID0gU25hY2tiYXJcbmV4cG9ydHMuUm93SXRlbSA9IFJvd0l0ZW1cbmV4cG9ydHMuQWN0aW9uQnV0dG9uID0gQWN0aW9uQnV0dG9uXG5leHBvcnRzLk1lbnVCdXR0b24gPSBNZW51QnV0dG9uXG5leHBvcnRzLk1lbnVPdmVybGF5ID0gTWVudU92ZXJsYXlcbmV4cG9ydHMuVmlldyA9IFZpZXdcbmV4cG9ydHMuUGFnZSA9IFBhZ2VcbmV4cG9ydHMuQXBwID0gQXBwXG5cbmV4cG9ydHMuVGl0bGUgPSBUaXRsZSA9IFR5cGUuVGl0bGVcbmV4cG9ydHMuSGVhZGxpbmUgPSBIZWFkbGluZSA9IFR5cGUuSGVhZGxpbmVcbmV4cG9ydHMuU3ViaGVhZCA9IFN1YmhlYWQgPSBUeXBlLlN1YmhlYWRcbmV4cG9ydHMuUmVndWxhciA9IFJlZ3VsYXIgPSBUeXBlLlJlZ3VsYXJcbmV4cG9ydHMuQm9keTIgPSBCb2R5MiA9IFR5cGUuQm9keTJcbmV4cG9ydHMuQm9keTEgPSBCb2R5MSA9IFR5cGUuQm9keTFcbmV4cG9ydHMuQ2FwdGlvbiA9IENhcHRpb24gPSBUeXBlLkNhcHRpb25cbmV4cG9ydHMuRGlhbG9nQWN0aW9uID0gRGlhbG9nQWN0aW9uID0gVHlwZS5EaWFsb2dBY3Rpb25cblxuRnJhbWVyLkV4dHJhcy5IaW50cy5kaXNhYmxlKClcblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuIiwiIyBcdGRQICAgICBkUCBvb1xuIyBcdDg4ICAgICA4OFxuIyBcdDg4ICAgIC44UCBkUCAuZDg4ODhiLiBkUCAgZFAgIGRQXG4jIFx0ODggICAgZDgnIDg4IDg4b29vb2Q4IDg4ICA4OCAgODhcbiMgXHQ4OCAgLmQ4UCAgODggODguICAuLi4gODguODhiLjg4J1xuIyBcdDg4ODg4OCcgICBkUCBgODg4ODhQJyA4ODg4UCBZOFBcblxuIyBXb3JrcyB3aXRob3V0IGFuIGFwcCwgYnV0IHdpbGwgaW50ZWdyYXRlIHdpdGggYXBwIGlmIHNldCB3aXRoIG9wdGlvbnMuYXBwLlxuXG57IFRoZW1lIH0gPSByZXF1aXJlICdtZC1jb21wb25lbnRzL1RoZW1lJ1xueyBQYWdlIH0gPSByZXF1aXJlICdtZC1jb21wb25lbnRzL1BhZ2UnXG5cbmV4cG9ydHMuVmlldyA9IGNsYXNzIFZpZXcgZXh0ZW5kcyBGbG93Q29tcG9uZW50XG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXG5cdFx0QF90aXRsZSA9IG9wdGlvbnMudGl0bGUgPyAnSG9tZSdcblx0XHRAX2ljb24gPSBvcHRpb25zLmljb24gPyAnbWVudSdcblx0XHRAX2ljb25BY3Rpb24gPSBvcHRpb25zLmljb25BY3Rpb24gPyAtPiBhcHAubWVudU92ZXJsYXkuc2hvdygpIFxuXHRcdEBfYXBwID0gb3B0aW9ucy5hcHBcblxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdG5hbWU6ICdWaWV3J1xuXHRcdFx0YW5pbWF0aW9uT3B0aW9uczoge2N1cnZlOiBcInNwcmluZygzMDAsIDM1LCAwKVwifVxuXHRcdFx0c2hhZG93U3ByZWFkOiAyLCBzaGFkb3dDb2xvcjogJ3JnYmEoMCwwLDAsLjEpJywgc2hhZG93Qmx1cjogNlxuXG5cdFx0QG9uVHJhbnNpdGlvblN0YXJ0IChjdXJyZW50LCBuZXh0LCBkaXJlY3Rpb24pIC0+IEBfYXBwPy5jaGFuZ2VQYWdlKG5leHQpXG5cblx0bmV3UGFnZTogKG9wdGlvbnMgPSB7fSkgLT5cblx0XHRwYWdlID0gbmV3IFBhZ2UgXy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0c2l6ZTogQHNpemVcblx0XHRyZXR1cm4gcGFnZSBcblxuXHRsaW5rVG86IChwYWdlKSAtPlxuXHRcdGlmIHBhZ2U/IGFuZCBAY3VycmVudCBpc250IHBhZ2Vcblx0XHRcdEBzaG93TmV4dChwYWdlKVxuIiwiVGhlbWUgPSByZXF1aXJlICdtZC1jb21wb25lbnRzL1RoZW1lJ1xuXG4jIFx0ZDg4ODg4OFAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZFBcbiMgXHQgICA4OCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA4OFxuIyBcdCAgIDg4ICAgIGRQICAgIGRQIDg4ZDg4OGIuIC5kODg4OGIuIC5kODg4OGIuIDg4ZDg4OGIuIC5kODg4OGIuIDg4ZDg4OGIuIDg4ZDg4OGIuIGRQICAgIGRQXG4jIFx0ICAgODggICAgODggICAgODggODgnICBgODggODgnICBgODggODgnICBgODggODgnICBgODggODgnICBgODggODgnICBgODggODgnICBgODggODggICAgODhcbiMgXHQgICA4OCAgICA4OC4gIC44OCA4OC4gIC44OCA4OC4gIC44OCA4OC4gIC44OCA4OCAgICAgICA4OC4gIC44OCA4OC4gIC44OCA4OCAgICA4OCA4OC4gIC44OFxuIyBcdCAgIGRQICAgIGA4ODg4UDg4IDg4WTg4OFAnIGA4ODg4OFAnIGA4ODg4UDg4IGRQICAgICAgIGA4ODg4OFA4IDg4WTg4OFAnIGRQICAgIGRQIGA4ODg4UDg4XG4jIFx0ICAgICAgICAgICAgICAuODggODggICAgICAgICAgICAgICAgICAgICAuODggICAgICAgICAgICAgICAgICAgODggICAgICAgICAgICAgICAgICAgICAuODhcbiMgXHQgICAgICAgICAgZDg4ODhQICBkUCAgICAgICAgICAgICAgICAgZDg4ODhQICAgICAgICAgICAgICAgICAgICBkUCAgICAgICAgICAgICAgICAgZDg4ODhQXG5cblV0aWxzLmluc2VydENTUyhcblx0XCJcIlwiXG4gICAgQGZvbnQtZmFjZSB7XG4gICAgICBmb250LWZhbWlseTogXCJSb2JvdG9cIjtcbiAgICAgIHNyYzogdXJsKFwibW9kdWxlcy9tZC1mb250cy9Sb2JvdG8tUmVndWxhci50dGZcIik7XG4gICAgXCJcIlwiKVxuXG5jbGFzcyBleHBvcnRzLkhlYWRsaW5lIGV4dGVuZHMgVGV4dExheWVyXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucykgLT5cblx0XHRzdXBlciBfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRuYW1lOiAnLidcblx0XHRcdGZvbnRGYW1pbHk6ICdSb2JvdG8nXG5cdFx0XHRmb250U2l6ZTogMjRcblx0XHRcdGZvbnRXZWlnaHQ6IDQwMFxuXHRcdFx0bGluZUhlaWdodDogMS4zXG5cdFx0XHRjb2xvcjogJ3JnYmEoMCwwLDAsLjg3KSdcblxuY2xhc3MgZXhwb3J0cy5TdWJoZWFkIGV4dGVuZHMgVGV4dExheWVyXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucykgLT5cblx0XHRzdXBlciBfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRuYW1lOiAnLidcblx0XHRcdGZvbnRGYW1pbHk6ICdSb2JvdG8nXG5cdFx0XHRmb250U2l6ZTogMTZcblx0XHRcdGZvbnRXZWlnaHQ6IDQwMCwgXG5cdFx0XHRsaW5lSGVpZ2h0OiAxLjUsXG5cdFx0XHRjb2xvcjogJ3JnYmEoMCwwLDAsLjU0KSdcblxuY2xhc3MgZXhwb3J0cy5UaXRsZSBleHRlbmRzIFRleHRMYXllclxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMpIC0+XG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0bmFtZTogJy4nXG5cdFx0XHRmb250RmFtaWx5OiAnUm9ib3RvJ1xuXHRcdFx0Zm9udFNpemU6IDIwXG5cdFx0XHRmb250V2VpZ2h0OiA1MDBcblx0XHRcdGxpbmVIZWlnaHQ6IDEuM1xuXHRcdFx0Y29sb3I6ICdyZ2JhKDAsMCwwLC44NyknXG5jbGFzcyBleHBvcnRzLlJlZ3VsYXIgZXh0ZW5kcyBUZXh0TGF5ZXJcblx0Y29uc3RydWN0b3I6IChvcHRpb25zKSAtPlxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdG5hbWU6ICcuJ1xuXHRcdFx0Zm9udEZhbWlseTogJ1JvYm90bydcblx0XHRcdGZvbnRTaXplOiAxNlxuXHRcdFx0Zm9udFdlaWdodDogNDAwXG5cdFx0XHRsaW5lSGVpZ2h0OiAxLjNcblx0XHRcdGNvbG9yOiAncmdiYSgwLDAsMCwuODcpJ1xuY2xhc3MgZXhwb3J0cy5Cb2R5MiBleHRlbmRzIFRleHRMYXllclxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMpIC0+XG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0bmFtZTogJy4nXG5cdFx0XHRmb250RmFtaWx5OiAnUm9ib3RvJ1xuXHRcdFx0Zm9udFNpemU6IDE0XG5cdFx0XHRmb250V2VpZ2h0OiA1MDBcblx0XHRcdGxpbmVIZWlnaHQ6IDEuM1xuXHRcdFx0Y29sb3I6ICdyZ2JhKDAsMCwwLC44NyknXG5jbGFzcyBleHBvcnRzLk1lbnUgZXh0ZW5kcyBUZXh0TGF5ZXJcblx0Y29uc3RydWN0b3I6IChvcHRpb25zKSAtPlxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdG5hbWU6ICcuJ1xuXHRcdFx0Zm9udEZhbWlseTogJ1JvYm90bydcblx0XHRcdGZvbnRTaXplOiAxNFxuXHRcdFx0Zm9udFdlaWdodDogNTAwXG5cdFx0XHRsaW5lSGVpZ2h0OiAxLjdcblx0XHRcdGNvbG9yOiAncmdiYSgwLDAsMCwuODcpJ1xuY2xhc3MgZXhwb3J0cy5Cb2R5MSBleHRlbmRzIFRleHRMYXllclxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMpIC0+XG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0bmFtZTogJy4nXG5cdFx0XHRmb250RmFtaWx5OiAnUm9ib3RvJ1xuXHRcdFx0Zm9udFNpemU6IDE0XG5cdFx0XHRmb250V2VpZ2h0OiA0MDBcblx0XHRcdGxpbmVIZWlnaHQ6IDEuNFxuXHRcdFx0Y29sb3I6ICdyZ2JhKDAsMCwwLC44NyknXG5jbGFzcyBleHBvcnRzLkNhcHRpb24gZXh0ZW5kcyBUZXh0TGF5ZXJcblx0Y29uc3RydWN0b3I6IChvcHRpb25zKSAtPlxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdG5hbWU6ICcuJ1xuXHRcdFx0Zm9udEZhbWlseTogJ1JvYm90bydcblx0XHRcdGZvbnRTaXplOiAxMlxuXHRcdFx0Zm9udFdlaWdodDogNDAwXG5cdFx0XHRsaW5lSGVpZ2h0OiAxLjNcblx0XHRcdGNvbG9yOiAncmdiYSgwLDAsMCwuNTQpJ1xuY2xhc3MgZXhwb3J0cy5CdXR0b24gZXh0ZW5kcyBUZXh0TGF5ZXJcblx0Y29uc3RydWN0b3I6IChvcHRpb25zKSAtPlxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdG5hbWU6ICcuJ1xuXHRcdFx0Zm9udEZhbWlseTogJ1JvYm90bydcblx0XHRcdGZvbnRTaXplOiAxNFxuXHRcdFx0Zm9udFdlaWdodDogNTAwXG5cdFx0XHRsaW5lSGVpZ2h0OiAxLjNcblx0XHRcdGNvbG9yOiAnIzAwOTY4OCdcblx0XHRcdGxldHRlclNwYWNpbmc6IDAuNVxuXHRcdFx0cGFkZGluZzoge2xlZnQ6IDQsIHJpZ2h0OiA0LCB0b3A6IDgsIGJvdHRvbTogMH0sIiwiIyBcdGQ4ODg4ODhQIG9vIGRQXG4jIFx0ICAgODggICAgICAgODhcbiMgXHQgICA4OCAgICBkUCA4OCAuZDg4ODhiLlxuIyBcdCAgIDg4ICAgIDg4IDg4IDg4b29vb2Q4XG4jIFx0ICAgODggICAgODggODggODguICAuLi5cbiMgXHQgICBkUCAgICBkUCBkUCBgODg4ODhQJ1xuXG5UeXBlID0gcmVxdWlyZSAnbWQtY29tcG9uZW50cy9UeXBlJ1xueyBSaXBwbGUgfSA9IHJlcXVpcmUgJ21kLWNvbXBvbmVudHMvUmlwcGxlJ1xueyBJY29uIH0gPSByZXF1aXJlICdtZC1jb21wb25lbnRzL0ljb24nXG57IFRoZW1lIH0gPSByZXF1aXJlICdtZC1jb21wb25lbnRzL1RoZW1lJ1xuXG5leHBvcnRzLlRpbGUgPSBUaWxlID0gY2xhc3MgVGlsZSBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXHRcdFxuXHRcdEBfaGVhZGVyID0gb3B0aW9ucy5oZWFkZXIgPyBmYWxzZVxuXHRcdEBfZm9vdGVyID0gb3B0aW9ucy5mb290ZXIgPyBmYWxzZVxuXHRcdEBfYWN0aW9uID0gb3B0aW9ucy5hY3Rpb24gPyAtPiBudWxsXG5cdFx0QF9oZWFkZXJBY3Rpb24gPSBvcHRpb25zLmhlYWRlckFjdGlvbiA/IC0+IG51bGxcblx0XHRAX2Zvb3RlckFjdGlvbiA9IG9wdGlvbnMuZm9vdGVyQWN0aW9uID8gLT4gbnVsbFxuXHRcdFxuXHRcdGlmIEBfaGVhZGVyIGFuZCBAX2Zvb3RlciB0aGVuIHRocm93ICdUaWxlIGNhbm5vdCBoYXZlIGJvdGggYSBoZWFkZXIgYW5kIGEgZm9vdGVyLidcblx0XHRcblx0XHRAX2ljb24gPSBvcHRpb25zLmljb25cblx0XHRAZ3JpZExpc3QgPSBvcHRpb25zLmdyaWRMaXN0ID8gdGhyb3cgJ1RpbGUgbmVlZHMgYSBncmlkIHByb3BlcnR5Lidcblx0XHRcblx0XHRzdXBlciBfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQGdyaWRMaXN0XG5cdFx0XHR3aWR0aDogQGdyaWRMaXN0LnRpbGVXaWR0aFxuXHRcdFx0aGVpZ2h0OiBAZ3JpZExpc3QudGlsZUhlaWdodFxuXHRcdFx0YW5pbWF0aW9uT3B0aW9uczoge3RpbWU6IC4zfVxuXHRcdFxuXHRcdEBvblRvdWNoU3RhcnQgKGV2ZW50KSAtPiBcblx0XHRcdGlmIEBncmlkTGlzdC5wYXJlbnQ/LnBhcmVudD8uY29udGVudCBhbmQgQGdyaWRMaXN0LnBhcmVudD8ucGFyZW50Py5pc01vdmluZyBpcyBmYWxzZVxuXHRcdFx0XHRSaXBwbGUoQCwgZXZlbnQucG9pbnQsIEBoZWFkZXIsIG9wdGlvbnMuUmlwcGxlQ29sb3IgPyAncmdiYSgwLDAsMCwuMSknKVxuXHRcdFxuXHRcdEBvblRhcCBAX2FjdGlvblxuXHRcdEBvblRhcCAoZXZlbnQpIC0+IGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXG5cblx0XHRpZiBAX2hlYWRlciBvciBAX2Zvb3RlclxuXHRcdFx0QGhlYWRlciA9IG5ldyBMYXllclxuXHRcdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQFxuXHRcdFx0XHR5OiBpZiBAX2Zvb3RlciB0aGVuIEFsaWduLmJvdHRvbSgpXG5cdFx0XHRcdHdpZHRoOiBAd2lkdGhcblx0XHRcdFx0aGVpZ2h0OiBpZiBvcHRpb25zLnN1cHBvcnQgdGhlbiA2OCBlbHNlIDQ4XG5cdFx0XHRcdGJhY2tncm91bmRDb2xvcjogb3B0aW9ucy5iYWNrZ3JvdW5kQ29sb3IgPyAncmdiYSgwLDAsMCwuNSknXG5cdFx0XHRcblx0XHRcdEBoZWFkZXIub25Ub3VjaFN0YXJ0IChldmVudCkgLT4gUmlwcGxlKEAsIGV2ZW50LnBvaW50LCBAdGl0bGUpXG5cdFx0XHRcblx0XHRcdGlmIEBfZm9vdGVyIHRoZW4gQGhlYWRlci5vblRhcCBAX2Zvb3RlckFjdGlvblxuXHRcdFx0ZWxzZSBAaGVhZGVyLm9uVGFwIEBfaGVhZGVyQWN0aW9uXG5cblx0XHRcdEBoZWFkZXIub25UYXAgKGV2ZW50KSAtPiBldmVudC5zdG9wUHJvcGFnYXRpb24oKVxuXG5cdFx0XHRpZiBvcHRpb25zLnRpdGxlXG5cdFx0XHRcdEBoZWFkZXIudGl0bGUgPSBuZXcgVHlwZS5SZWd1bGFyXG5cdFx0XHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEBoZWFkZXJcblx0XHRcdFx0XHR4OiA4LCB5OiBpZiBvcHRpb25zLnN1cHBvcnQgdGhlbiAxMiBlbHNlIEFsaWduLmNlbnRlcigpXG5cdFx0XHRcdFx0Y29sb3I6IEBjb2xvclxuXHRcdFx0XHRcdHRleHQ6IG9wdGlvbnMudGl0bGUgPyAnVHdvIExpbmUnXG5cdFx0XHRcblx0XHRcdFx0aWYgb3B0aW9ucy5zdXBwb3J0XG5cdFx0XHRcdFx0QGhlYWRlci5zdXBwb3J0ID0gbmV3IFRleHRMYXllclxuXHRcdFx0XHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEBoZWFkZXJcblx0XHRcdFx0XHRcdHg6IDgsIHk6IDM1XG5cdFx0XHRcdFx0XHRmb250U2l6ZTogMTJcblx0XHRcdFx0XHRcdGZvbnRGYW1pbHk6ICdSb2JvdG8nXG5cdFx0XHRcdFx0XHRjb2xvcjogQGNvbG9yXG5cdFx0XHRcdFx0XHR0ZXh0OiBvcHRpb25zLnN1cHBvcnQgPyAnU3VwcG9ydCB0ZXh0J1xuXHRcdFx0XG5cdFx0XHRpZiBvcHRpb25zLmljb25cblx0XHRcdFx0QGhlYWRlci5pY29uID0gbmV3IEljb25cblx0XHRcdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQGhlYWRlclxuXHRcdFx0XHRcdHg6IEFsaWduLnJpZ2h0KC0xMiksIHk6IGlmIG9wdGlvbnMuc3VwcG9ydCB0aGVuIDIwIGVsc2UgQWxpZ24uY2VudGVyKClcblx0XHRcdFx0XHRpY29uOiBvcHRpb25zLmljb25cblx0XHRcdFx0XHRjb2xvcjogQGNvbG9yXG5cblx0XHRAaSA9IHVuZGVmaW5lZFxuXHRcdEBncmlkTGlzdC5hZGRUaWxlKEApIiwiIyBcdGQ4ODg4ODhQIGRQXG4jIFx0ICAgODggICAgODhcbiMgXHQgICA4OCAgICA4OGQ4ODhiLiAuZDg4ODhiLiA4OGQ4Yi5kOGIuIC5kODg4OGIuXG4jIFx0ICAgODggICAgODgnICBgODggODhvb29vZDggODgnYDg4J2A4OCA4OG9vb29kOFxuIyBcdCAgIDg4ICAgIDg4ICAgIDg4IDg4LiAgLi4uIDg4ICA4OCAgODggODguICAuLi5cbiMgXHQgICBkUCAgICBkUCAgICBkUCBgODg4ODhQJyBkUCAgZFAgIGRQIGA4ODg4OFAnXG5cblxuIyBXaGVuIGxvYWRlZCwgdGhpcyBtb2R1bGUgd2lsbCBhdHRlbXB0IHRvIGNyZWF0ZSBhIG5ldyB0aGVtZSBiYXNlZCBvbiBcbiMgdGhlIERlc2lnbiBNb2RlIHRlbXBsYXRlLlxuXG5tb2RpZnlDb2xvciA9IChjb2xvciwgaCwgcywgbCkgLT5cblx0Y2xpcCA9IF8ucmVwbGFjZShfLnJlcGxhY2UoY29sb3IudG9Ic2xTdHJpbmcoKS5zbGljZSg0LCAtMSksICclJywgJycpLCAnJScsICcnKSAuc3BsaXQoJywgJylcblxuXHRuZXdDb2xvciA9IG5ldyBDb2xvcihcblx0XHRoOiBfLnBhcnNlSW50KGNsaXBbMF0pICsgaCwgXG5cdFx0czogKF8ucGFyc2VJbnQoY2xpcFsxXSkgKyBzKS8xMDAsIFxuXHRcdGw6IChfLnBhcnNlSW50KGNsaXBbMl0pICsgbCkvMTAwLCBcblx0XHRhOiAxKVxuXHRcblx0cmV0dXJuIG5ld0NvbG9yXG5cbnByaW1hcnlDb2xvciA9IHByaW1hcnlfY29sb3IuYmFja2dyb3VuZENvbG9yXG5wcmltYXJ5SW52ZXJ0ID0gMTAwIC0gKHByaW1hcnlfaW52ZXJ0Lm9wYWNpdHkgKiAxMDApXG5zZWNvbmRhcnlDb2xvciA9IHNlY29uZGFyeV9jb2xvci5iYWNrZ3JvdW5kQ29sb3Jcbm1lbnVDb2xvciA9IG1lbnVfY29sb3IuYmFja2dyb3VuZENvbG9yXG5tZW51VGV4dENvbG9yID0gbWVudV90ZXh0X2NvbG9yLmNvbG9yXG5tZW51SW52ZXJ0ID0gMTAwIC0gKG1lbnVfaW52ZXJ0Lm9wYWNpdHkgKiAxMDApXG5cblxuc291cmNlID1cblx0Y29sb3JzOlxuXHRcdHByaW1hcnk6XG5cdFx0XHRtYWluOiBwcmltYXJ5Q29sb3Jcblx0XHRcdGxpZ2h0OiBtb2RpZnlDb2xvcihwcmltYXJ5Q29sb3IsIDEzLCAtNSwgMTUpXG5cdFx0XHRkYXJrOiBtb2RpZnlDb2xvcihwcmltYXJ5Q29sb3IsIC0xLCAtNywgLTEyKVxuXHRcdFx0dGV4dDogcHJpbWFyeV90ZXh0X2NvbG9yLmNvbG9yXG5cdFx0XHRpbnZlcnQ6IHByaW1hcnlJbnZlcnRcblx0XHRzZWNvbmRhcnk6XG5cdFx0XHRtYWluOiBzZWNvbmRhcnlDb2xvclxuXHRcdFx0bGlnaHQ6IG1vZGlmeUNvbG9yKHNlY29uZGFyeUNvbG9yLCAxMywgLTUsIDE1KVxuXHRcdFx0ZGFyazogbW9kaWZ5Q29sb3Ioc2Vjb25kYXJ5Q29sb3IsIC0xLCAtNywgLTEyKVxuXHRcdFx0dGV4dDogc2Vjb25kYXJ5X3RleHRfY29sb3IuY29sb3Jcblx0XHRtZW51OlxuXHRcdFx0bGlnaHQ6IG1lbnVDb2xvclxuXHRcdFx0dGV4dDogbWVudVRleHRDb2xvclxuXHRcdFx0aW52ZXJ0OiBtZW51SW52ZXJ0XG5cblRoZW1lID0gXG5cdHRpbnQ6IHNvdXJjZS5jb2xvcnMuc2Vjb25kYXJ5Lm1haW5cblx0cHJpbWFyeTogc291cmNlLmNvbG9ycy5wcmltYXJ5Lm1haW5cblx0c2Vjb25kYXJ5OiBzb3VyY2UuY29sb3JzLnNlY29uZGFyeS5tYWluXG5cdG1lbnU6IHNvdXJjZS5jb2xvcnMubWVudS5saWdodFxuXHRjb2xvcnM6IHNvdXJjZS5jb2xvcnNcblxuXHR1c2VyOlxuXHRcdGltYWdlOiB1bmRlZmluZWRcblxuXHRoZWFkZXI6IFxuXHRcdGJhY2tncm91bmRDb2xvcjogc291cmNlLmNvbG9ycy5wcmltYXJ5Lm1haW5cblx0XHR0aXRsZTogc291cmNlLmNvbG9ycy5wcmltYXJ5LnRleHRcblx0XHRpbnZlcnQ6IHByaW1hcnlJbnZlcnRcblx0XHRpY29uOlxuXHRcdFx0Y29sb3I6IHNvdXJjZS5jb2xvcnMucHJpbWFyeS50ZXh0XG5cdFx0dGFiczpcblx0XHRcdGJhY2tncm91bmRDb2xvcjogc291cmNlLmNvbG9ycy5wcmltYXJ5LmxpZ2h0XG5cdFx0XHRjb2xvcjogc291cmNlLmNvbG9ycy5wcmltYXJ5LnRleHRcblx0XHRcdHNlbGVjdG9yOiBzb3VyY2UuY29sb3JzLnNlY29uZGFyeS5tYWluXG5cdFxuXHRzdGF0dXNCYXI6IFxuXHRcdGltYWdlOiAnbW9kdWxlcy9tZC1pbWFnZXMvc3RhdHVzX2Jhci5wbmcnXG5cdFx0YmFja2dyb3VuZENvbG9yOiBzb3VyY2UuY29sb3JzLnByaW1hcnkuZGFya1xuXHRcdGludmVydDogcHJpbWFyeUludmVydFxuXHRcblx0Ym90dG9tTmF2OlxuXHRcdGJhY2tncm91bmRDb2xvcjogJyNGRkZGRkYnXG5cdFx0c2hhZG93WTogLTJcblx0XHRzaGFkb3dCbHVyOiA2XG5cdFx0c2hhZG93Q29sb3I6ICdyZ2JhKDAsMCwwLC4xKSdcblx0XG5cdG5hdkJhcjpcblx0XHRiYWNrZ3JvdW5kQ29sb3I6ICcjMDAwMDAwJ1xuXHRcblx0a2V5Ym9hcmQ6XG5cdFx0aW1hZ2U6ICdtb2R1bGVzL21kLWltYWdlcy9rZXlib2FyZC5wbmcnXG5cblx0Zm9vdGVyOlxuXHRcdGltYWdlOiAnbW9kdWxlcy9tZC1pbWFnZXMvbmF2X2Jhci5wbmcnXG5cblx0cGFnZTpcblx0XHRwcmltYXJ5OlxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiAnI0UxRTJFMSdcblx0XHRzZWNvbmRhcnk6XG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6ICcjRjVGNUY2J1xuXG5cdG1lbnVPdmVybGF5OlxuXHRcdGhlYWRlcjpcblx0XHRcdGJhY2tncm91bmRDb2xvcjogc291cmNlLmNvbG9ycy5zZWNvbmRhcnkubWFpblxuXHRcdFx0aWNvbjogc291cmNlLmNvbG9ycy5zZWNvbmRhcnkubGlnaHRcblx0XHRcdHRleHQ6IHNvdXJjZS5jb2xvcnMuc2Vjb25kYXJ5LnRleHRcblx0XHRzdWJoZWFkZXI6XG5cdFx0XHRjb2xvcjogc291cmNlLmNvbG9ycy5tZW51LnRleHRcblx0XHRcdHRleHQ6IHNvdXJjZS5jb2xvcnMuc2Vjb25kYXJ5LnRleHRcblx0XHRcdGljb246IHNvdXJjZS5jb2xvcnMuc2Vjb25kYXJ5LnRleHRcblx0XHRiYWNrZ3JvdW5kQ29sb3I6IHNvdXJjZS5jb2xvcnMubWVudS5saWdodFxuXHRcdHRleHQ6IHNvdXJjZS5jb2xvcnMubWVudS50ZXh0XG5cdFx0c2xpZGVyOiBcblx0XHRcdGtub2I6IHNvdXJjZS5jb2xvcnMuc2Vjb25kYXJ5LmxpZ2h0XG5cdFx0XHRmaWxsOiBzb3VyY2UuY29sb3JzLnNlY29uZGFyeS5kYXJrXG5cdFx0aW52ZXJ0OiBzb3VyY2UuY29sb3JzLm1lbnUuaW52ZXJ0XG5cblx0YnV0dG9uOlxuXHRcdGZsYXQ6XG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcdGNvbG9yOiBzb3VyY2UuY29sb3JzLnNlY29uZGFyeS5tYWluXG5cdFx0XHRzaGFkb3dZOiAwXG5cdFx0XHRzaGFkb3dDb2xvcjogJ3JnYmEoMCwwLDAsLjE4KSdcblx0XHRcdHNoYWRvd0JsdXI6IDBcblxuXHRcdHJhaXNlZDpcblx0XHRcdGJhY2tncm91bmRDb2xvcjogc291cmNlLmNvbG9ycy5zZWNvbmRhcnkubWFpblxuXHRcdFx0Y29sb3I6IHNvdXJjZS5jb2xvcnMuc2Vjb25kYXJ5LnRleHRcblx0XHRcdHNoYWRvd1k6IDJcblx0XHRcdHNoYWRvd0NvbG9yOiAncmdiYSgwLDAsMCwuMTgpJ1xuXHRcdFx0c2hhZG93Qmx1cjogNlxuXG5cdGZhYjpcblx0XHRiYWNrZ3JvdW5kQ29sb3I6IHNvdXJjZS5jb2xvcnMuc2Vjb25kYXJ5Lm1haW5cblx0XHRjb2xvcjogc291cmNlLmNvbG9ycy5zZWNvbmRhcnkudGV4dFxuXHRcdGludmVydDogcHJpbWFyeUludmVydFxuXG5cdGRpYWxvZzogXG5cdFx0YmFja2dyb3VuZENvbG9yOicjRkFGQUZBJ1xuXHRcblx0ZGl2aWRlcjpcblx0XHRiYWNrZ3JvdW5kQ29sb3I6ICdyZ2JhKDAsMCwwLC4xMiknXG5cblx0dGV4dDogXG5cdFx0cHJpbWFyeTogc291cmNlLmNvbG9ycy5wcmltYXJ5LnRleHRcblx0XHRzZWNvbmRhcnk6IHNvdXJjZS5jb2xvcnMuc2Vjb25kYXJ5LnRleHRcblx0XG5cdHRhYmxlOlxuXHRcdGJhY2tncm91bmRDb2xvcjogJyNGRkZGRkYnXG5cdFx0dGV4dDogc291cmNlLmNvbG9ycy5wcmltYXJ5LnRleHRcblx0XHRjaGVja0JveDpcblx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFx0Ym9yZGVyQ29sb3I6ICcjRDNEM0QzJ1xuXHRcdHNlbGVjdGVkOlxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBzb3VyY2UuY29sb3JzLnNlY29uZGFyeS5tYWluXG5cdFx0XHR0ZXh0OiBzb3VyY2UuY29sb3JzLnByaW1hcnkudGV4dFxuXHRcdFx0Y2hlY2tCb3g6XG5cdFx0XHRcdGJhY2tncm91bmRDb2xvcjogc291cmNlLmNvbG9ycy5zZWNvbmRhcnkuZGFya1xuXHRcdFx0XHRib3JkZXJDb2xvcjogbnVsbFxuXG5cdHNuYWNrYmFyOlxuXHRcdGJhY2tncm91bmRDb2xvcjogJ3JnYmEoNTEsIDUxLCA1MSwgMSknXG5cdFx0Y29sb3I6ICdyZ2JhKDI1NSwgMjU1LCAyNTUsIDEpJ1xuXG5cdHNsaWRlcjpcblx0XHRmaWxsOiBzbGlkZXJfZmlsbD8uYmFja2dyb3VuZENvbG9yXG5cdFx0YmFja2dyb3VuZENvbG9yOiBzbGlkZXJfYmFja2dyb3VuZD8uYmFja2dyb3VuZENvbG9yXG5cdFx0a25vYjogXG5cdFx0XHRzaXplOiBzbGlkZXJfa25vYj8uc2l6ZVxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBzbGlkZXJfa25vYj8uYmFja2dyb3VuZENvbG9yXG5cdFx0XHRyYWRpdXM6IHNsaWRlcl9rbm9iPy5ib3JkZXJSYWRpdXNcblx0XHRub3RjaDpcblx0XHRcdHdpZHRoOiB1bmRlZmluZWRcblx0XHRcdGhlaWdodDogdW5kZWZpbmVkXG5cdFx0XHRib3JkZXJSYWRpdXM6IHVuZGVmaW5lZFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBzb3VyY2UuY29sb3JzLnByaW1hcnkudGV4dFxuXHRcdHRpcDpcblx0XHRcdGJhY2tncm91bmRDb2xvcjogdW5kZWZpbmVkXG5cdFx0XHR2YWx1ZTogXG5cdFx0XHRcdGNvbG9yOiB1bmRlZmluZWRcblxuXHRjYXJkOlxuXHRcdGhlYWRlcjogc291cmNlLmNvbG9ycy5zZWNvbmRhcnkuZGFya1xuXG5cdGRlc2lnbk1vZGU6IHRydWVcblxuXHRnZXRTdHlsZTogKG9iamVjdCkgLT4gXG5cdFx0aWYgQGRlc2lnbk1vZGVcblx0XHRcdHJldHVybiB0aGlzW29iamVjdF1cblx0XHRlbHNlXG5cdFx0XHRyZXR1cm4ge31cblxuXG5jb2xvcl9wYWxsZXRlLmRlc3Ryb3koKVxuXG5leHBvcnRzLlRoZW1lID0gVGhlbWVcbiIsIlR5cGUgPSByZXF1aXJlICdtZC1jb21wb25lbnRzL1R5cGUnXG57IFJpcHBsZSB9ID0gcmVxdWlyZSAnbWQtY29tcG9uZW50cy9SaXBwbGUnXG57IEljb24gfSA9IHJlcXVpcmUgJ21kLWNvbXBvbmVudHMvSWNvbidcbnsgVGhlbWUgfSA9IHJlcXVpcmUgJ21kLWNvbXBvbmVudHMvVGhlbWUnXG5cbiMgXHRkODg4ODg4UCAgICAgICAgICAgICAgICAgICAgIGRQICAgIDg4ODg4ODg4YiBvbyAgICAgICAgICBkUCAgICAgICBkUFxuIyBcdCAgIDg4ICAgICAgICAgICAgICAgICAgICAgICAgODggICAgODggICAgICAgICAgICAgICAgICAgIDg4ICAgICAgIDg4XG4jIFx0ICAgODggICAgLmQ4ODg4Yi4gZFAuICAuZFAgZDg4ODhQIGE4OGFhYWEgICAgZFAgLmQ4ODg4Yi4gODggLmQ4ODhiODhcbiMgXHQgICA4OCAgICA4OG9vb29kOCAgYDhiZDgnICAgIDg4ICAgIDg4ICAgICAgICA4OCA4OG9vb29kOCA4OCA4OCcgIGA4OFxuIyBcdCAgIDg4ICAgIDg4LiAgLi4uICAuZDg4Yi4gICAgODggICAgODggICAgICAgIDg4IDg4LiAgLi4uIDg4IDg4LiAgLjg4XG4jIFx0ICAgZFAgICAgYDg4ODg4UCcgZFAnICBgZFAgICBkUCAgICBkUCAgICAgICAgZFAgYDg4ODg4UCcgZFAgYDg4ODg4UDhcbiMgXHRcbiMgXHRcblxuZXhwb3J0cy5UZXh0RmllbGQgPSBjbGFzcyBUZXh0RmllbGRcblxuIiwiXG4jIFx0LmQ4ODg4OGIgICAgICAgICAgICAgb28gICBkUCAgICAgICAgICAgIGRQXG4jIFx0ODguICAgIFwiJyAgICAgICAgICAgICAgICAgODggICAgICAgICAgICA4OFxuIyBcdGBZODg4ODhiLiBkUCAgZFAgIGRQIGRQIGQ4ODg4UCAuZDg4ODhiLiA4OGQ4ODhiLlxuIyBcdCAgICAgIGA4YiA4OCAgODggIDg4IDg4ICAgODggICA4OCcgIGBcIlwiIDg4JyAgYDg4XG4jIFx0ZDgnICAgLjhQIDg4Ljg4Yi44OCcgODggICA4OCAgIDg4LiAgLi4uIDg4ICAgIDg4XG4jIFx0IFk4ODg4OFAgIDg4ODhQIFk4UCAgZFAgICBkUCAgIGA4ODg4OFAnIGRQICAgIGRQXG5cblR5cGUgPSByZXF1aXJlICdtZC1jb21wb25lbnRzL1R5cGUnXG57IFJpcHBsZSB9ID0gcmVxdWlyZSAnbWQtY29tcG9uZW50cy9SaXBwbGUnXG57IEljb24gfSA9IHJlcXVpcmUgJ21kLWNvbXBvbmVudHMvSWNvbidcbnsgVGhlbWUgfSA9IHJlcXVpcmUgJ21kLWNvbXBvbmVudHMvVGhlbWUnXG5cbmV4cG9ydHMuU3dpdGNoID0gY2xhc3MgU3dpdGNoIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cblx0XHRAX2lzT24gPSB1bmRlZmluZWRcblxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdG5hbWU6ICcuJ1xuXHRcdFx0d2lkdGg6IDM0LCBoZWlnaHQ6IDE0LCBib3JkZXJSYWRpdXM6IDdcblx0XHRcdGJhY2tncm91bmRDb2xvcjogJ3JnYmEoMzQsIDMxLCAzMSwgLjI2KSdcblx0XHRcdGFuaW1hdGlvbk9wdGlvbnM6IHt0aW1lOiAuMTV9XG5cblx0XHRAa25vYiA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEBcblx0XHRcdHg6IDAsIHk6IEFsaWduLmNlbnRlclxuXHRcdFx0d2lkdGg6IDIwLCBoZWlnaHQ6IDIwLCBib3JkZXJSYWRpdXM6IDEwXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6ICdGMUYxRjEnXG5cdFx0XHRzaGFkb3dZOiAyLCBzaGFkb3dCbHVyOiAzXG5cdFx0XHRhbmltYXRpb25PcHRpb25zOiB7dGltZTogLjE1fVxuXG5cdFx0QGlzT24gPSBvcHRpb25zLmlzT24gPyBmYWxzZVxuXHRcdEBvblRhcCAtPiBAaXNPbiA9ICFAaXNPblxuXG5cdEBkZWZpbmUgXCJpc09uXCIsXG5cdFx0Z2V0OiAtPiByZXR1cm4gQF9pc09uXG5cdFx0c2V0OiAoYm9vbCkgLT5cblx0XHRcdHJldHVybiBpZiBib29sIGlzIEBfaXNPblxuXHRcdFx0XG5cdFx0XHRAX2lzT24gPSBib29sXG5cdFx0XHRAZW1pdChcImNoYW5nZTppc09uXCIsIEBfaXNPbiwgQClcblx0XHRcdEB1cGRhdGUoKVxuXG5cdHVwZGF0ZTogLT5cblx0XHRpZiBAX2lzT25cblx0XHRcdEBrbm9iLmFuaW1hdGUge3g6IEFsaWduLnJpZ2h0KCksIGJhY2tncm91bmRDb2xvcjogVGhlbWUuY29sb3JzLnByaW1hcnkubWFpbn1cblx0XHRcdEBhbmltYXRlIHtiYWNrZ3JvdW5kQ29sb3I6IFRoZW1lLmNvbG9ycy5wcmltYXJ5LmxpZ2h0fVxuXHRcdGVsc2UgXG5cdFx0XHRAa25vYi5hbmltYXRlIHt4OiAwLCBiYWNrZ3JvdW5kQ29sb3I6ICdGMUYxRjEnfVxuXHRcdFx0QGFuaW1hdGUge2JhY2tncm91bmRDb2xvcjogJ3JnYmEoMzQsIDMxLCAzMSwgLjI2KSd9XG4iLCIjIC5kODg4ODhiICAgIGRQICAgICAgICAgICAgICBkUCAgICAgICAgICAgICAgICAgICAgICA4ODg4ODhiYSAgICAgICAgICAgICAgICAgICBcbiMgODguICAgIFwiJyAgIDg4ICAgICAgICAgICAgICA4OCAgICAgICAgICAgICAgICAgICAgICA4OCAgICBgOGIgICAgICAgICAgICAgICAgICBcbiMgYFk4ODg4OGIuIGQ4ODg4UCAuZDg4ODhiLiBkODg4OFAgZFAgICAgZFAgLmQ4ODg4Yi4gYTg4YWFhYThQJyAuZDg4ODhiLiA4OGQ4ODhiLlxuIyAgICAgICBgOGIgICA4OCAgIDg4JyAgYDg4ICAgODggICA4OCAgICA4OCBZOG9vb29vLiAgODggICBgOGIuIDg4JyAgYDg4IDg4JyAgYDg4XG4jIGQ4JyAgIC44UCAgIDg4ICAgODguICAuODggICA4OCAgIDg4LiAgLjg4ICAgICAgIDg4ICA4OCAgICAuODggODguICAuODggODggICAgICBcbiMgIFk4ODg4OFAgICAgZFAgICBgODg4ODhQOCAgIGRQICAgYDg4ODg4UCcgYDg4ODg4UCcgIDg4ODg4ODg4UCBgODg4ODhQOCBkUCAgXG5cblR5cGUgPSByZXF1aXJlICdtZC1jb21wb25lbnRzL1R5cGUnXG57IFJpcHBsZSB9ID0gcmVxdWlyZSAnbWQtY29tcG9uZW50cy9SaXBwbGUnXG57IEljb24gfSA9IHJlcXVpcmUgJ21kLWNvbXBvbmVudHMvSWNvbidcbnsgVGhlbWUgfSA9IHJlcXVpcmUgJ21kLWNvbXBvbmVudHMvVGhlbWUnXG5cbmV4cG9ydHMuU3RhdHVzQmFyID0gY2xhc3MgU3RhdHVzQmFyIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cblx0XHRzdXBlciBfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRuYW1lOiAnLidcblx0XHRcdHdpZHRoOiBTY3JlZW4ud2lkdGgsIGhlaWdodDogMjRcblx0XHRcdGJhY2tncm91bmRDb2xvcjogVGhlbWUuc3RhdHVzQmFyLmJhY2tncm91bmRDb2xvclxuXG5cdFx0QGl0ZW1zID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQFxuXHRcdFx0c2l6ZTogQHNpemVcblx0XHRcdGltYWdlOiBUaGVtZS5zdGF0dXNCYXIuaW1hZ2Vcblx0XHRcdGludmVydDogVGhlbWUuc3RhdHVzQmFyLmludmVydFxuIiwiIyBcdC5kODg4ODhiICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkUCAgICAgICBkUFxuIyBcdDg4LiAgICBcIicgICAgICAgICAgICAgICAgICAgICAgICAgICAgODggICAgICAgODhcbiMgXHRgWTg4ODg4Yi4gODhkODg4Yi4gLmQ4ODg4Yi4gLmQ4ODg4Yi4gODggIC5kUCAgODhkODg4Yi4gLmQ4ODg4Yi4gODhkODg4Yi5cbiMgXHQgICAgICBgOGIgODgnICBgODggODgnICBgODggODgnICBgXCJcIiA4ODg4OFwiICAgODgnICBgODggODgnICBgODggODgnICBgODhcbiMgXHRkOCcgICAuOFAgODggICAgODggODguICAuODggODguICAuLi4gODggIGA4Yi4gODguICAuODggODguICAuODggODhcbiMgXHQgWTg4ODg4UCAgZFAgICAgZFAgYDg4ODg4UDggYDg4ODg4UCcgZFAgICBgWVAgODhZODg4OCcgYDg4ODg4UDggZFBcblxuVHlwZSA9IHJlcXVpcmUgJ21kLWNvbXBvbmVudHMvVHlwZSdcbnsgUmlwcGxlIH0gPSByZXF1aXJlICdtZC1jb21wb25lbnRzL1JpcHBsZSdcbnsgVGhlbWUgfSA9IHJlcXVpcmUgJ21kLWNvbXBvbmVudHMvVGhlbWUnXG57IEJ1dHRvbiB9ID0gcmVxdWlyZSAnbWQtY29tcG9uZW50cy9CdXR0b24nIFxuXG5leHBvcnRzLlNuYWNrYmFyID0gU25hY2tiYXIgPSBjbGFzcyBTbmFja2JhciBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXG5cdFx0QF90aXRsZSA9IG9wdGlvbnMudGl0bGUgPyAnU25hY2tiYXInXG5cdFx0QF90aW1lb3V0ID0gb3B0aW9ucy50aW1lb3V0ID8gNFxuXHRcdEBfYWN0aW9uID0gb3B0aW9ucy5hY3Rpb25cblx0XHRAX2FwcCA9IG9wdGlvbnMuYXBwXG5cblx0XHRzdXBlciBfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRuYW1lOiAnLidcblx0XHRcdHdpZHRoOiBTY3JlZW4ud2lkdGhcblx0XHRcdGNsaXA6IHRydWVcblx0XHRcdGJhY2tncm91bmRDb2xvcjogVGhlbWUuc25hY2tiYXIuYmFja2dyb3VuZENvbG9yXG5cdFx0XHRhbmltYXRpb25PcHRpb25zOiB7dGltZTogLjI1fVxuXG5cdFx0dGl0bGVXaWR0aCA9IEB3aWR0aCAtIDQ4XG5cblx0XHRpZiBAX2FjdGlvbj9cblx0XHRcdEBhY3Rpb24gPSBuZXcgQnV0dG9uXG5cdFx0XHRcdHBhcmVudDogQFxuXHRcdFx0XHR4OiBBbGlnbi5yaWdodCgtOCksIHk6IDRcblx0XHRcdFx0Y29sb3I6IEBfYWN0aW9uLmNvbG9yID8gVGhlbWUuY29sb3JzLnByaW1hcnkubGlnaHRcblx0XHRcdFx0dGV4dDogQF9hY3Rpb24udGl0bGUudG9VcHBlckNhc2UoKVxuXHRcdFx0XHRhY3Rpb246IEBfYWN0aW9uLmFjdGlvblxuXG5cdFx0XHRAYWN0aW9uLm9uVGFwIEBoaWRlXG5cdFx0XHR0aXRsZVdpZHRoID0gQGFjdGlvbi54IC0gOCAtIDI0XG5cblx0XHRAdGV4dExhYmVsID0gbmV3IFR5cGUuQm9keTFcblx0XHRcdG5hbWU6ICdUaXRsZScsIHBhcmVudDogQFxuXHRcdFx0eDogMjQsIHk6IDE0XG5cdFx0XHR3aWR0aDogdGl0bGVXaWR0aFxuXHRcdFx0dGV4dDogQF90aXRsZVxuXHRcdFx0Y29sb3I6IFRoZW1lLnNuYWNrYmFyLmNvbG9yXG5cblx0XHRAaGVpZ2h0ID0gQHRleHRMYWJlbC5tYXhZICsgMTRcblx0XHRAYWN0aW9uPy55ID0gQWxpZ24uY2VudGVyXG5cblx0XHRpZiBAX2FwcD9cblx0XHRcdEB5ID0gaWYgQF9hcHAuYm90dG9tTmF2PyB0aGVuIEFsaWduLmJvdHRvbSgtQF9hcHAuYm90dG9tTmF2LmhlaWdodCArIEBoZWlnaHQpID8gQWxpZ24uYm90dG9tKEBoZWlnaHQpXG5cblx0XHRVdGlscy5kZWxheSBAX3RpbWVvdXQsIEBoaWRlXG5cblx0XHRAc2hvdygpXG5cblx0c2hvdzogPT5cblx0XHRpZiBAX2FwcD9cblx0XHRcdGlmIEBfYXBwLnNuYWNrYmFyPyBcblx0XHRcdFx0QF9hcHAuc25hY2tiYXIuaGlkZSgpXG5cdFx0XHRcdFV0aWxzLmRlbGF5IDEsIEBzaG93XG5cdFx0XHRcdHJldHVyblxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRAX2FwcC5zbmFja2JhciA9IEBcblx0XHRcdFx0QF9hcHAuYWN0aW9uQnV0dG9uPy5hbmltYXRlIHt5OiBAX2FwcC5hY3Rpb25CdXR0b24ueSAtIEBoZWlnaHQsIG9wdGlvbnM6IEBhbmltYXRpb25PcHRpb25zfVxuXHRcdFx0XHRAYW5pbWF0ZSB7eTogQHkgLSBAaGVpZ2h0fVxuXHRcdGVsc2Vcblx0XHRcdEBhbmltYXRlIHt5OiBAeSAtIEBoZWlnaHR9XG5cblx0aGlkZTogPT4gXG5cdFx0aWYgQF9hcHA/XG5cdFx0XHRAX2FwcC5zbmFja2JhciA9IHVuZGVmaW5lZFxuXHRcdFx0QF9hcHAuYWN0aW9uQnV0dG9uPy5hbmltYXRlIHt5OiBAX2FwcC5hY3Rpb25CdXR0b24ueSArIEBoZWlnaHQsIG9wdGlvbnM6IEBhbmltYXRpb25PcHRpb25zfVxuXHRcdFxuXHRcdEBhbmltYXRlIHtoZWlnaHQ6IDAsIHk6IEB5ICsgQGhlaWdodH1cblx0XHRVdGlscy5kZWxheSAuNSwgPT4gQGRlc3Ryb3koKSIsIiMgXHQuZDg4ODg4YiAgZFAgb28gICAgICAgZFBcbiMgXHQ4OC4gICAgXCInIDg4ICAgICAgICAgIDg4XG4jIFx0YFk4ODg4OGIuIDg4IGRQIC5kODg4Yjg4IC5kODg4OGIuIDg4ZDg4OGIuXG4jIFx0ICAgICAgYDhiIDg4IDg4IDg4JyAgYDg4IDg4b29vb2Q4IDg4JyAgYDg4XG4jIFx0ZDgnICAgLjhQIDg4IDg4IDg4LiAgLjg4IDg4LiAgLi4uIDg4XG4jIFx0IFk4ODg4OFAgIGRQIGRQIGA4ODg4OFA4IGA4ODg4OFAnIGRQXG5cblR5cGUgPSByZXF1aXJlICdtZC1jb21wb25lbnRzL1R5cGUnXG57IFJpcHBsZSB9ID0gcmVxdWlyZSAnbWQtY29tcG9uZW50cy9SaXBwbGUnXG57IEljb24gfSA9IHJlcXVpcmUgJ21kLWNvbXBvbmVudHMvSWNvbidcbnsgVGhlbWUgfSA9IHJlcXVpcmUgJ21kLWNvbXBvbmVudHMvVGhlbWUnXG5cbmV4cG9ydHMuU2xpZGVyID0gY2xhc3MgU2xpZGVyIGV4dGVuZHMgU2xpZGVyQ29tcG9uZW50XG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXG5cdFx0QF9ub3RjaGVkID0gb3B0aW9ucy5ub3RjaGVkID8gZmFsc2Vcblx0XHRAX3RoZW1lID0gb3B0aW9ucy50aGVtZSA/IFRoZW1lLmdldFN0eWxlKCdzbGlkZXInKVxuXG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0bmFtZTogJy4nLCBoZWlnaHQ6IDJcblx0XHRcdGtub2JTaXplOiAzMlxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiAncmdiYSgwLDAsMCwuMjYpJ1xuXHRcdFx0bWluOiAxLCBtYXg6IDEwXG5cblx0XHRAZmlsbC5iYWNrZ3JvdW5kQ29sb3IgPSBAX3RoZW1lPy5maWxsID8gVGhlbWUuY29sb3JzLnByaW1hcnkuZGFya1xuXG5cdFx0QGtub2IucHJvcHMgPVxuXHRcdFx0bmFtZTogJ0tub2InXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcdHNoYWRvd1g6IDBcblx0XHRcdHNoYWRvd1k6IDBcblx0XHRcdHNoYWRvd0JsdXI6IDBcblxuXHRcdEB0aHVtYiA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogJ1RodW1iJywgcGFyZW50OiBAa25vYlxuXHRcdFx0eDogQWxpZ24uY2VudGVyLCB5OiBBbGlnbi5jZW50ZXJcblx0XHRcdHNpemU6IEBfdGhlbWUua25vYj8uc2l6ZSA/IDEyLCBib3JkZXJSYWRpdXM6IEBfdGhlbWUua25vYj8ucmFkaXVzID8gMTJcblx0XHRcdGJhY2tncm91bmRDb2xvcjogQF90aGVtZS5rbm9iPy5iYWNrZ3JvdW5kQ29sb3IgPyBUaGVtZS5jb2xvcnMucHJpbWFyeS5saWdodFxuXHRcdFx0YW5pbWF0aW9uT3B0aW9uczoge3RpbWU6IC4xNX1cblxuXHRcdGlmIEBfbm90Y2hlZFxuXG5cdFx0XHRmb3IgaSBpbiBbMC4uLkBtYXgtQG1pbl1cblx0XHRcdFx0bm90Y2ggPSBuZXcgTGF5ZXJcblx0XHRcdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQFxuXHRcdFx0XHRcdHg6IGkgKiBAd2lkdGgvKEBtYXgtQG1pbilcblx0XHRcdFx0XHR3aWR0aDogQF90aGVtZS5ub3RjaD8ud2lkdGggPyAyLCBoZWlnaHQ6IEBfdGhlbWUubm90Y2g/LmhlaWdodCA/IDIsIGJvcmRlclJhZGl1czogQF90aGVtZS5ub3RjaD8uYm9yZGVyUmFkaXVzID8gMixcblx0XHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IEBfdGhlbWUubm90Y2g/LmJhY2tncm91bmRDb2xvciA/IFRoZW1lLmNvbG9ycy5wcmltYXJ5LnRleHRcblxuXHRcdFx0dGlwQmFja2dyb3VuZENvbG9yID0gQF90aGVtZS50aXA/LmJhY2tncm91bmRDb2xvciA/IFRoZW1lLmNvbG9ycy5wcmltYXJ5LmxpZ2h0XG5cblx0XHRcdEB0aXAgPSBuZXcgTGF5ZXJcblx0XHRcdFx0bmFtZTogJ1RpcCcsIHBhcmVudDogQGtub2Jcblx0XHRcdFx0eDogQWxpZ24uY2VudGVyLCB5OiAtMjRcblx0XHRcdFx0d2lkdGg6IDI2LCBoZWlnaHQ6IDMyXG5cdFx0XHRcdGh0bWw6ICc8c3ZnIHdpZHRoPVwiMjZweFwiIGhlaWdodD1cIjMycHhcIiB2aWV3Qm94PVwiMCAwIDI2IDMyXCI+PHBhdGggZD1cIk0xMywwLjEgQzIwLjIsMC4xIDI2LDYgMjYsMTMuMyBDMjYsMTcgMjQsMjAuOSAxOC43LDI2LjIgTDEzLDMyIEw3LjIsMjYuMiBDMiwyMC44IDAsMTYuOSAwLDEzLjMgQy0zLjU1MjcxMzY4ZS0xNSw2IDUuOCwwLjEgMTMsMC4xIEwxMywwLjEgWlwiIGZpbGw9XCInICsgdGlwQmFja2dyb3VuZENvbG9yICsgJ1wiPjwvcGF0aD48L3N2Zz4nXG5cdFx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbCwgb3BhY2l0eTogMFxuXHRcdFx0XHRhbmltYXRpb25PcHRpb25zOiB7dGltZTogLjE1fVxuXG5cdFx0XHRAdGlwVmFsdWUgPSBuZXcgVGV4dExheWVyXG5cdFx0XHRcdG5hbWU6ICdUaXAgVmFsdWUnLCBwYXJlbnQ6IEB0aXBcblx0XHRcdFx0eTogNSwgd2lkdGg6IDI2XG5cdFx0XHRcdGNvbG9yOiBAX3RoZW1lLnRpcD8udmFsdWUuY29sb3IgPyBUaGVtZS5jb2xvcnMucHJpbWFyeS50ZXh0XG5cdFx0XHRcdGZvbnRTaXplOiAxMiwgZm9udEZhbWlseTogJ1JvYm90bycsIHRleHRBbGlnbjogJ2NlbnRlcidcblx0XHRcdFx0dGV4dDogXCJ7dmFsdWV9XCJcblxuXHRcdFx0QHRpcFZhbHVlLnRlbXBsYXRlID1cblx0XHRcdFx0dmFsdWU6IEB2YWx1ZVxuXG5cdFx0XHRAa25vYi5vblRvdWNoU3RhcnQgPT5cblx0XHRcdFx0QHRodW1iLmFuaW1hdGUge29wYWNpdHk6IDB9XG5cdFx0XHRcdEB0aXAuYW5pbWF0ZSB7b3BhY2l0eTogMX1cblxuXHRcdFx0QG9uVG91Y2hFbmQgLT5cblx0XHRcdFx0QHRodW1iLmFuaW1hdGUge29wYWNpdHk6IDF9XG5cdFx0XHRcdEB0aXAuYW5pbWF0ZSB7b3BhY2l0eTogMH1cblxuXHRcdFx0cm91bmQgPSAobnVtYmVyLCBuZWFyZXN0KSAtPlxuXHRcdFx0ICAgIE1hdGgucm91bmQobnVtYmVyIC8gbmVhcmVzdCkgKiBuZWFyZXN0XG5cblx0XHRcdEBrbm9iLmRyYWdnYWJsZS51cGRhdGVQb3NpdGlvbiA9IChwb2ludCkgPT5cblx0XHRcdCAgICBwb2ludC54ID0gcm91bmQocG9pbnQueCwgQHdpZHRoIC8gKEBtYXgtQG1pbikgKSAtIChAa25vYi53aWR0aCAvIDIpXG5cdFx0XHQgICAgcmV0dXJuIHBvaW50XG5cblx0XHRcdEBvblZhbHVlQ2hhbmdlIC0+XG5cdFx0XHRcdEB0aXBWYWx1ZS50ZW1wbGF0ZSA9IE1hdGgucm91bmQoQHZhbHVlKVxuXG5cdFx0ZWxzZVxuXHRcdFx0QGtub2Iub25Ub3VjaFN0YXJ0ID0+XG5cdFx0XHRcdEB0aHVtYi5hbmltYXRlIHtzY2FsZToxLjF9XG5cdFx0XHRAa25vYi5vblRvdWNoRW5kID0+XG5cdFx0XHRcdEB0aHVtYi5hbmltYXRlIHtzY2FsZToxfVxuIiwiIyAgODg4ODg4YmEgICAgICAgICAgICAgICAgICAgICAgZFAgICBkUCAgICAgICAgICAgICAgICAgICAgICBcbiMgIDg4ICAgIGA4YiAgICAgICAgICAgICAgICAgICAgIDg4ICAgODggICAgICAgICAgICAgICAgICAgICAgXG4jIGE4OGFhYWE4UCcgLmQ4ODg4Yi4gZFAgIGRQICBkUCA4OCBkODg4OFAgLmQ4ODg4Yi4gODhkOGIuZDhiLlxuIyAgODggICBgOGIuIDg4JyAgYDg4IDg4ICA4OCAgODggODggICA4OCAgIDg4b29vb2Q4IDg4J2A4OCdgODhcbiMgIDg4ICAgICA4OCA4OC4gIC44OCA4OC44OGIuODgnIDg4ICAgODggICA4OC4gIC4uLiA4OCAgODggIDg4XG4jICBkUCAgICAgZFAgYDg4ODg4UCcgODg4OFAgWThQICBkUCAgIGRQICAgYDg4ODg4UCcgZFAgIGRQICBkUFxuXG5UeXBlID0gcmVxdWlyZSAnbWQtY29tcG9uZW50cy9UeXBlJ1xueyBUaGVtZSB9ID0gcmVxdWlyZSAnbWQtY29tcG9uZW50cy9UaGVtZSdcbnsgRGl2aWRlciB9ID0gcmVxdWlyZSAnbWQtY29tcG9uZW50cy9EaXZpZGVyJyBcblxuXG5leHBvcnRzLlJvd0l0ZW0gPSBjbGFzcyBSb3dJdGVtIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cblx0XHRAX2ljb24gPSBvcHRpb25zLmljb25cblx0XHRAX2ljb25CYWNrZ3JvdW5kQ29sb3IgPSBvcHRpb25zLmljb25CYWNrZ3JvdW5kQ29sb3IgPyAnIzc3Nydcblx0XHRAX3RleHQgPSBvcHRpb25zLnRleHQgPyAnUm93IGl0ZW0nXG5cdFx0QF9yb3cgPSBvcHRpb25zLnJvdyA/IDBcblx0XHRAX3kgPSAzMiArIChAX3JvdyAqIDQ4KSBcblxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdHdpZHRoOiBTY3JlZW4ud2lkdGhcblx0XHRcdHk6IEBfeVxuXHRcdFx0aGVpZ2h0OiA0OFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cblx0XHRAaWNvbiA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEBcblx0XHRcdHg6IDE2LCB5OiBBbGlnbi5jZW50ZXJcblx0XHRcdGhlaWdodDogMzIsIHdpZHRoOiAzMiwgYm9yZGVyUmFkaXVzOiAxNlxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBAX2ljb25CYWNrZ3JvdW5kQ29sb3Jcblx0XHRcdGltYWdlOiBAX2ljb25cblxuXHRcdEBsYWJlbExheWVyID0gbmV3IFR5cGUuUmVndWxhclxuXHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEBcblx0XHRcdHg6IEBpY29uLm1heFggKyAxNiwgeTogQWxpZ24uY2VudGVyXG5cdFx0XHRjb2xvcjogVGhlbWUudGV4dC50ZXh0XG5cdFx0XHR0ZXh0OiBAX3RleHQiLCIjIFx0IDg4ODg4OGJhICBvbyAgICAgICAgICAgICAgICAgICBkUFxuIyBcdCA4OCAgICBgOGIgICAgICAgICAgICAgICAgICAgICAgODhcbiMgXHRhODhhYWFhOFAnIGRQIDg4ZDg4OGIuIDg4ZDg4OGIuIDg4IC5kODg4OGIuXG4jIFx0IDg4ICAgYDhiLiA4OCA4OCcgIGA4OCA4OCcgIGA4OCA4OCA4OG9vb29kOFxuIyBcdCA4OCAgICAgODggODggODguICAuODggODguICAuODggODggODguICAuLi5cbiMgXHQgZFAgICAgIGRQIGRQIDg4WTg4OFAnIDg4WTg4OFAnIGRQIGA4ODg4OFAnXG4jIFx0ICAgICAgICAgICAgICA4OCAgICAgICA4OFxuIyBcdCAgICAgICAgICAgICAgZFAgICAgICAgZFBcblxuI1x0QnkgZGVmYXVsdCwgc2hvd3MgYW4gZXhwYW5kaW5nIGNpcmNsZSBvdmVyIGEgbGF5ZXIsIGNsaXBwZWQgdG8gaXRzIGZyYW1lLlxuI1x0T24gdGhlIGxheWVyJ3MgdG91Y2hFbmQgZXZlbnQsIHRoZSBjaXJjbGUgYW5kIGl0cyBtYXNrIHdpbGwgZGlzYXBwZWFyLlxuXG4jXHRyZXF1aXJlZDpcbiNcdGxheWVyIChMYXllciksIHRoZSBsYXllciBvdmVyIHdoaWNoIHRvIHNob3cgdGhlIHJpcHBsZSBlZmZlY3RcbiNcdHBvaW50IChvYmplY3QpLCB0aGUgcmlwcGxlIG9yaWdpbiBwb2ludCwgdXN1YWxseSBhIG9uVG91Y2hTdGFydCdzIGV2ZW50LnBvaW50XG5cbiNcdG9wdGlvbmFsOlxuI1x0cGxhY2VCZWhpbmQgKExheWVyKSwgYSBjaGlsZCBvZiBsYXllciBiZWhpbmQgd2hpY2ggdGhlIHJpcHBsZSBzaG91bGQgYXBwZWFyXG4jXHRjb2xvciAoc3RyaW5nIG9yIGNvbG9yIG9iamVjdCksIGEgY3VzdG9tIGNvbG9yIGZvciB0aGUgcmlwcGxlXG5cblJpcHBsZSA9IChsYXllciwgcG9pbnQsIHBsYWNlQmVoaW5kLCBjb2xvcikgLT5cblx0XG5cdGlmICFsYXllcj8gdGhlbiB0aHJvdyAnUmlwcGxlIHJlcXVpcmVzIGEgTGF5ZXIuIFRyeSBteUxheWVyLm9uVG91Y2hTdGFydCAoZXZlbnQpIC0+IHJpcHBsZShALCBldmVudC5wb2ludCknXG5cdGlmICFwb2ludD8gdGhlbiB0aHJvdyAnUmlwcGxlIHJlcXVpcmVzIGEgcG9pbnQuIFRyeSBteUxheWVyLm9uVG91Y2hTdGFydCAoZXZlbnQpIC0+IHJpcHBsZShALCBldmVudC5wb2ludCknXG5cblx0bWFzayA9IG5ldyBMYXllclxuXHRcdG5hbWU6ICcuJ1xuXHRcdHBhcmVudDogbGF5ZXJcblx0XHRzaXplOiBsYXllci5zaXplXG5cdFx0Ym9yZGVyUmFkaXVzOiBsYXllci5ib3JkZXJSYWRpdXNcblx0XHRiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRjbGlwOiB0cnVlXG5cdFx0b3BhY2l0eTogMFxuXHRcdGFuaW1hdGlvbk9wdGlvbnM6IHt0aW1lOiAuMTV9XG5cdFxuXHRpZiBwbGFjZUJlaGluZCB0aGVuIG1hc2sucGxhY2VCZWhpbmQocGxhY2VCZWhpbmQpXG5cdFxuXHQjIFJJUFBMRSBDSVJDTEVcblx0XG5cdGxvbmdTaWRlID0gaWYgbGF5ZXIud2lkdGggPiBsYXllci5oZWlnaHQgdGhlbiBsYXllci53aWR0aCBlbHNlIGxheWVyLmhlaWdodFxuXG5cdHJpcHBsZUNpcmNsZSA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IG1hc2tcblx0XHRcdHg6IHBvaW50LnggLSAxNlxuXHRcdFx0eTogcG9pbnQueSAtIDE2XG5cdFx0XHR3aWR0aDogMzIsIGhlaWdodDogMzIsIFxuXHRcdFx0Ym9yZGVyUmFkaXVzOiBsb25nU2lkZVxuXHRcdFx0XG5cdGlmIGNvbG9yP1xuXHRcdHJpcHBsZUNpcmNsZS5wcm9wcyA9XG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IGNvbG9yXG5cdGVsc2UgXG5cdFx0cmlwcGxlQ2lyY2xlLnByb3BzID0gXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IGxheWVyLmJhY2tncm91bmRDb2xvclxuXHRcdFx0c2F0dXJhdGU6IDEyMFxuXHRcdFx0YnJpZ2h0bmVzczogMTIwXG5cdFx0XHRvcGFjaXR5OiAuNVxuXHRcblx0IyBBTklNQVRJT05TIENJUkNMRVxuXHRcblx0bWFzay5hbmltYXRlXG5cdFx0b3BhY2l0eTogMVxuXHRcdG9wdGlvbnM6IHt0aW1lOiAuMTV9XG5cdFxuXHRyaXBwbGVDaXJjbGUuYW5pbWF0ZVxuXHRcdHg6IHJpcHBsZUNpcmNsZS54IC0gbG9uZ1NpZGUgKiAxLjNcblx0XHR5OiByaXBwbGVDaXJjbGUueSAtIGxvbmdTaWRlICogMS4zXG5cdFx0d2lkdGg6IGxvbmdTaWRlICogMi42XG5cdFx0aGVpZ2h0OiBsb25nU2lkZSAqIDIuNlxuXHRcdG9wdGlvbnM6IHt0aW1lOiAuNX1cblx0XG5cdFV0aWxzLmRlbGF5IDIsIC0+IFxuXHRcdG1hc2suYW5pbWF0ZVxuXHRcdFx0b3BhY2l0eTogMFxuXHRcdG1hc2sub25BbmltYXRpb25FbmQgbWFzay5kZXN0cm95XG5cblx0IyBUT1VDSCBFTkRcblx0XG5cdGxheWVyLm9uVG91Y2hFbmQgLT4gXG5cdFx0bWFzay5hbmltYXRlXG5cdFx0XHRvcGFjaXR5OiAwXG5cdFx0bWFzay5vbkFuaW1hdGlvbkVuZCBtYXNrLmRlc3Ryb3lcblxuZXhwb3J0cy5SaXBwbGUgPSBSaXBwbGUiLCIjIFx0IDg4ODg4OGJhICAgICAgICAgICAgICAgICBkUCBvbyAgICAgICAgICBkUFxuIyBcdCA4OCAgICBgOGIgICAgICAgICAgICAgICAgODggICAgICAgICAgICAgODhcbiMgXHRhODhhYWFhOFAnIC5kODg4OGIuIC5kODg4Yjg4IGRQIC5kODg4OGIuIDg4ZDg4OGIuIC5kODg4OGIuIGRQLiAgLmRQXG4jIFx0IDg4ICAgYDhiLiA4OCcgIGA4OCA4OCcgIGA4OCA4OCA4OCcgIGA4OCA4OCcgIGA4OCA4OCcgIGA4OCAgYDhiZDgnXG4jIFx0IDg4ICAgICA4OCA4OC4gIC44OCA4OC4gIC44OCA4OCA4OC4gIC44OCA4OC4gIC44OCA4OC4gIC44OCAgLmQ4OGIuXG4jIFx0IGRQICAgICBkUCBgODg4ODhQOCBgODg4ODhQOCBkUCBgODg4ODhQJyA4OFk4ODg4JyBgODg4ODhQJyBkUCcgIGBkUFxuXG5cblR5cGUgPSByZXF1aXJlICdtZC1jb21wb25lbnRzL1R5cGUnXG57IFJpcHBsZSB9ID0gcmVxdWlyZSAnbWQtY29tcG9uZW50cy9SaXBwbGUnXG57IEljb24gfSA9IHJlcXVpcmUgJ21kLWNvbXBvbmVudHMvSWNvbidcbnsgVGhlbWUgfSA9IHJlcXVpcmUgJ21kLWNvbXBvbmVudHMvVGhlbWUnXG5cbmV4cG9ydHMuUmFkaW9ib3ggPSBSYWRpb2JveCA9IGNsYXNzIFJhZGlvYm94IGV4dGVuZHMgSWNvblxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblxuXHRcdEBfaXNPbiA9IHVuZGVmaW5lZFxuXHRcdEBfZ3JvdXAgPSBvcHRpb25zLmdyb3VwID8gW11cblxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdG5hbWU6ICcuJ1xuXHRcdFx0YW5pbWF0aW9uT3B0aW9uczoge3RpbWU6IC4xNX1cblx0XHRcdGljb246ICdyYWRpb2JveC1ibGFuaydcblx0XHRcdGNvbG9yOiAncmdiYSgwLDAsMCwuNTQpJ1xuXG5cdFx0QGlzT24gPSBvcHRpb25zLmlzT24gPyBmYWxzZVxuXHRcdEBvblRhcCAtPiBpZiBAaXNPbiBpcyBmYWxzZSB0aGVuIEBpc09uID0gdHJ1ZVxuXG5cdFx0QF9ncm91cC5wdXNoKEApXG5cblx0QGRlZmluZSBcImlzT25cIixcblx0XHRnZXQ6IC0+IHJldHVybiBAX2lzT25cblx0XHRzZXQ6IChib29sKSAtPlxuXHRcdFx0cmV0dXJuIGlmIGJvb2wgaXMgQF9pc09uXG5cdFx0XHRcblx0XHRcdEBfaXNPbiA9IGJvb2xcblx0XHRcdEBlbWl0KFwiY2hhbmdlOmlzT25cIiwgQF9pc09uLCBAKVxuXHRcdFx0QHVwZGF0ZSgpXG5cblx0dXBkYXRlOiAtPlxuXHRcdGlmIEBfaXNPblxuXHRcdFx0QGljb24gPSAncmFkaW9ib3gtbWFya2VkJ1xuXHRcdFx0QGNvbG9yID0gVGhlbWUuY29sb3JzLnByaW1hcnkubWFpblxuXG5cdFx0XHRyYWRpb2JveC5pc09uID0gZmFsc2UgZm9yIHJhZGlvYm94IGluIF8ud2l0aG91dChAX2dyb3VwLCBAKVxuXHRcdGVsc2UgXG5cdFx0XHRAaWNvbiA9ICdyYWRpb2JveC1ibGFuaydcblx0XHRcdEBjb2xvciA9ICdyZ2JhKDAsMCwwLC41NCknIiwiXG4jICA4ODg4ODhiYSAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiMgIDg4ICAgIGA4YiAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuIyBhODhhYWFhOFAnIC5kODg4OGIuIC5kODg4OGIuIC5kODg4OGIuXG4jICA4OCAgICAgICAgODgnICBgODggODgnICBgODggODhvb29vZDhcbiMgIDg4ICAgICAgICA4OC4gIC44OCA4OC4gIC44OCA4OC4gIC4uLlxuIyAgZFAgICAgICAgIGA4ODg4OFA4IGA4ODg4UDg4IGA4ODg4OFAnXG4jICAgICAgICAgICAgICAgICAgICAgICAgICAuODggICAgICAgICBcbiMgICAgICAgICAgICAgICAgICAgICAgZDg4ODhQICAgICAgICAgIFxuXG57IFRoZW1lIH0gPSByZXF1aXJlICdtZC1jb21wb25lbnRzL1RoZW1lJ1xuXG5leHBvcnRzLlBhZ2UgPSBjbGFzcyBQYWdlIGV4dGVuZHMgU2Nyb2xsQ29tcG9uZW50XG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXHRcdFxuXHRcdEBfaGVhZGVyID0ge31cblx0XHRAX2hlYWRlci50aXRsZSA9IG9wdGlvbnMuaGVhZGVyPy50aXRsZSA/ICdOZXcgUGFnZSdcblx0XHRAX2hlYWRlci52aXNpYmxlID0gb3B0aW9ucy5oZWFkZXI/LnZpc2libGUgPyB0cnVlXG5cdFx0QF9oZWFkZXIuaWNvbiA9IG9wdGlvbnMuaGVhZGVyPy5pY29uID8gJ21lbnUnXG5cdFx0QF9oZWFkZXIuaWNvbkFjdGlvbiA9IG9wdGlvbnMuaGVhZGVyPy5pY29uQWN0aW9uID8gLT4gbnVsbFxuXG5cdFx0QF90ZW1wbGF0ZSA9IG9wdGlvbnMudGVtcGxhdGVcblx0XHRAX3RlbXBsYXRlT3BhY2l0eSA9IG9wdGlvbnMudGVtcGxhdGVPcGFjaXR5ID8gLjVcblx0XHRAX29uTG9hZCA9IG9wdGlvbnMub25Mb2FkID8gLT4gbnVsbFxuXG5cdFx0aWYgQF9oZWFkZXIuaWNvbkFjdGlvbiB0aGVuIEBfaGVhZGVyLmljb25BY3Rpb24gPSBfLmJpbmQoQF9oZWFkZXIuaWNvbkFjdGlvbiwgQClcblx0XHRpZiBAX29uTG9hZCB0aGVuIEBfb25Mb2FkID0gXy5iaW5kKEBfb25Mb2FkLCBAKVxuXG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0bmFtZTogJ1BhZ2UnXG5cdFx0XHRzaXplOiBTY3JlZW4uc2l6ZVxuXHRcdFx0c2Nyb2xsSG9yaXpvbnRhbDogZmFsc2Vcblx0XHRcdGJhY2tncm91bmRDb2xvcjogVGhlbWUucGFnZS5wcmltYXJ5LmJhY2tncm91bmRDb2xvclxuXHRcdFxuXHRcdEBjb250ZW50SW5zZXQgPVxuXHRcdFx0dG9wOiAwLCBib3R0b206IDE2MFxuXG5cdFx0QGNvbnRlbnQuYmFja2dyb3VuZENvbG9yID0gbnVsbFxuXG5cdFx0aWYgQF90ZW1wbGF0ZT9cblx0XHRcdEBfdGVtcGxhdGUucHJvcHMgPVxuXHRcdFx0XHRwYXJlbnQ6IEBcblx0XHRcdFx0b3BhY2l0eTogQF90ZW1wbGF0ZU9wYWNpdHlcblxuXHRcdEBzZW5kVG9CYWNrKClcblxuXHR1cGRhdGU6IC0+IHJldHVybiBudWxsIiwiIyBcdDg4ODg4OGJhICAgICAgICAgICAgIGRQICAgb28gLjg4ODhiIG9vICAgICAgICAgICAgICAgICAgICAgZFAgICBvb1xuIyBcdDg4ICAgIGA4YiAgICAgICAgICAgIDg4ICAgICAgODggICBcIiAgICAgICAgICAgICAgICAgICAgICAgIDg4XG4jIFx0ODggICAgIDg4IC5kODg4OGIuIGQ4ODg4UCBkUCA4OGFhYSAgZFAgLmQ4ODg4Yi4gLmQ4ODg4Yi4gZDg4ODhQIGRQIC5kODg4OGIuIDg4ZDg4OGIuXG4jIFx0ODggICAgIDg4IDg4JyAgYDg4ICAgODggICA4OCA4OCAgICAgODggODgnICBgXCJcIiA4OCcgIGA4OCAgIDg4ICAgODggODgnICBgODggODgnICBgODhcbiMgXHQ4OCAgICAgODggODguICAuODggICA4OCAgIDg4IDg4ICAgICA4OCA4OC4gIC4uLiA4OC4gIC44OCAgIDg4ICAgODggODguICAuODggODggICAgODhcbiMgXHRkUCAgICAgZFAgYDg4ODg4UCcgICBkUCAgIGRQIGRQICAgICBkUCBgODg4ODhQJyBgODg4ODhQOCAgIGRQICAgZFAgYDg4ODg4UCcgZFAgICAgZFBcblxuIyBOb3RpZmljYXRpb24gZG9lcyBub3QgcmVxdWlyZSBhbiBhcHAgcHJvcGVydHksIGhvd2V2ZXIgaWYgb25lIGlzIG5vdCBzZXQgdGhlbiBub3RpZmljYXRpb25zIHdpbGwgbm90IGZsb3cgYXJvdW5kIGVhY2hvdGhlci5cblxuIyBUT0RPOiByZXBsYWNlIGFjdGlvbjEgYW5kIGFjdGlvbjIgd2l0aCBhcnJheSBvZiBhY3Rpb25zLlxuXG5UeXBlID0gcmVxdWlyZSAnbWQtY29tcG9uZW50cy9UeXBlJ1xueyBSaXBwbGUgfSA9IHJlcXVpcmUgJ21kLWNvbXBvbmVudHMvUmlwcGxlJ1xueyBJY29uIH0gPSByZXF1aXJlICdtZC1jb21wb25lbnRzL0ljb24nXG57IFRoZW1lIH0gPSByZXF1aXJlICdtZC1jb21wb25lbnRzL1RoZW1lJ1xueyBEaXZpZGVyIH0gPSByZXF1aXJlICdtZC1jb21wb25lbnRzL0RpdmlkZXInIFxuXG5leHBvcnRzLk5vdGlmaWNhdGlvbiA9IE5vdGlmaWNhdGlvbiA9IGNsYXNzIE5vdGlmaWNhdGlvbiBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXHRcdFxuXHRcdEBfdGl0bGUgPSBvcHRpb25zLnRpdGxlID8gJ05vdGlmaWNhdGlvbidcblx0XHRAX2JvZHkgPSBvcHRpb25zLmJvZHkgPyAnVGhpcyBpcyBhIG5vdGlmaWNhdGlvbi4nXG5cdFx0QF9pY29uID0gb3B0aW9ucy5pY29uID8gdW5kZWZpbmVkXG5cdFx0QF9pY29uQ29sb3IgPSBvcHRpb25zLmljb25Db2xvciA/IFRoZW1lLnRleHQuc2Vjb25kYXJ5XG5cdFx0QF9pY29uQmFja2dyb3VuZENvbG9yID0gb3B0aW9ucy5pY29uQmFja2dyb3VuZENvbG9yID8gVGhlbWUuc2Vjb25kYXJ5XG5cdFx0QF90aW1lID0gb3B0aW9ucy50aW1lID8gbmV3IERhdGUoKVxuXHRcdCNUT0RPOiByZXBsYWNlIGFjdGlvbjEgLyBhY3Rpb24yIHdpdGggQGFjdGlvbnMgKGFycmF5KVxuXHRcdEBfYWN0aW9uMSA9IG9wdGlvbnMuYWN0aW9uMVxuXHRcdEBfYWN0aW9uMiA9IG9wdGlvbnMuYWN0aW9uMlxuXHRcdEBfdGltZW91dCA9IG9wdGlvbnMudGltZW91dCA/IDVcblx0XHRAX2FwcCA9IG9wdGlvbnMuYXBwXG5cblx0XHQjIGFjdGlvbnMgc2hvdWxkIGJlIHt0aXRsZTogJ2FyY2hpdmUnLCBpY29uOiAnYXJjaGl2ZSd9XG5cdFx0XG5cdFx0aW5pdFkgPSB1bmRlZmluZWRcblx0XHRpZiBAX2FwcD9cblx0XHRcdGluaXRZID0gaWYgQF9hcHAubm90aWZpY2F0aW9ucy5sZW5ndGggPiAwIHRoZW4gXy5sYXN0KEBfYXBwLm5vdGlmaWNhdGlvbnMpLm1heFkgKyA4IGVsc2UgQF9hcHAuaGVhZGVyLm1heFkgKyA0XG5cdFx0XHRAX2FwcC5ub3RpZmljYXRpb25zLnB1c2goQClcblxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdG5hbWU6IG9wdGlvbnMubmFtZSA/ICcuJ1xuXHRcdFx0d2lkdGg6IDM0NCwgYm9yZGVyUmFkaXVzOiAyXG5cdFx0XHR4OiBBbGlnbi5jZW50ZXIsIHk6IGluaXRZID8gMFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBUaGVtZS5kaWFsb2cuYmFja2dyb3VuZENvbG9yXG5cdFx0XHRzaGFkb3dYOiAwLCBzaGFkb3dZOiAyLCBzaGFkb3dCbHVyOiAzXG5cdFx0XHRvcGFjaXR5OiAwLCBzaGFkb3dDb2xvcjogJ3JnYmEoMCwwLDAsLjMpJ1xuXHRcdFx0YW5pbWF0aW9uT3B0aW9uczoge3RpbWU6IC4yNX1cblxuXHRcdEBpY29uTGF5ZXIgPSBuZXcgTGF5ZXJcblx0XHRcdG5hbWU6ICdJY29uIENvbnRhaW5lcidcblx0XHRcdHBhcmVudDogQFxuXHRcdFx0eDogMTIsIHk6IDEyXG5cdFx0XHRoZWlnaHQ6IDQwLCB3aWR0aDogNDAsIGJvcmRlclJhZGl1czogMjBcblx0XHRcdGJhY2tncm91bmRDb2xvcjogQF9pY29uQmFja2dyb3VuZENvbG9yXG5cblx0XHRpZiBAX2ljb25cblx0XHRcdEBpY29uID0gbmV3IEljb25cblx0XHRcdFx0bmFtZTogJ0ljb24nXG5cdFx0XHRcdHBhcmVudDogQGljb25MYXllclxuXHRcdFx0XHR4OiBBbGlnbi5jZW50ZXIsIHk6IEFsaWduLmNlbnRlclxuXHRcdFx0XHRjb2xvcjogQF9pY29uQ29sb3Jcblx0XHRcdFx0aWNvbjogQF9pY29uXG5cblx0XHRAdGl0bGUgPSBuZXcgVHlwZS5TdWJoZWFkXG5cdFx0XHRuYW1lOiAnVGl0bGUnXG5cdFx0XHRwYXJlbnQ6IEAgXG5cdFx0XHR4OiA2NCwgeTogOFxuXHRcdFx0d2lkdGg6IEB3aWR0aCAtIDcyXG5cdFx0XHRjb2xvcjogJ3JnYmEoMCwwLDAsLjg3KSdcblx0XHRcdHRleHQ6IEBfdGl0bGVcblxuXHRcdEBib2R5ID0gbmV3IFR5cGUuQm9keTFcblx0XHRcdG5hbWU6ICdCb2R5J1xuXHRcdFx0cGFyZW50OiBAXG5cdFx0XHR4OiA2NCwgeTogQHRpdGxlLm1heFlcblx0XHRcdHdpZHRoOiBAd2lkdGggLSA3MlxuXHRcdFx0dGV4dDogQF9ib2R5XG5cblx0XHRAZGF0ZSA9IG5ldyBUeXBlLkNhcHRpb25cblx0XHRcdG5hbWU6ICdEYXRlJ1xuXHRcdFx0cGFyZW50OiBAXG5cdFx0XHR4OiBBbGlnbi5yaWdodCgtOSksIHk6IDE1XG5cdFx0XHR0ZXh0OiBAX3RpbWUudG9Mb2NhbGVUaW1lU3RyaW5nKFtdLCBob3VyOiBcIm51bWVyaWNcIiwgbWludXRlOiBcIjItZGlnaXRcIilcblxuXHRcdEBoZWlnaHQgPSBfLmNsYW1wKEBib2R5Lm1heFkgKyAxMywgNjQsIEluZmluaXR5KVxuXG5cdFx0aWYgQF9hY3Rpb24xP1xuXG5cdFx0XHRkaXZpZGVyID0gbmV3IERpdmlkZXJcblx0XHRcdFx0bmFtZTogJ0RpdmlkZXInXG5cdFx0XHRcdHBhcmVudDogQFxuXHRcdFx0XHR4OiA2NCwgeTogQGJvZHkubWF4WSArIDExXG5cdFx0XHRcdHdpZHRoOiBAd2lkdGggLSA2NFxuXG5cdFx0XHRpZiBAX2FjdGlvbjE/XG5cdFx0XHRcdEBhY3Rpb24xID0gbmV3IExheWVyXG5cdFx0XHRcdFx0bmFtZTogJ0FjdGlvbiAxJywgcGFyZW50OiBAXG5cdFx0XHRcdFx0eDogNjQsIHk6IGRpdmlkZXIubWF4WSArIDExXG5cdFx0XHRcdFx0d2lkdGg6IDgwLCBoZWlnaHQ6IDI0LCBiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcdFx0XG5cdFx0XHRcdEBhY3Rpb24xLmljb24gPSBuZXcgSWNvblxuXHRcdFx0XHRcdG5hbWU6ICdJY29uJywgcGFyZW50OiBAYWN0aW9uMVxuXHRcdFx0XHRcdGljb246IEBfYWN0aW9uMS5pY29uXG5cdFx0XHRcdFx0d2lkdGg6IDE4LCBoZWlnaHQ6IDE4XG5cdFx0XHRcdFx0Y29sb3I6ICdyZ2JhKDAsMCwwLC41NCknXG5cdFx0XHRcdFxuXHRcdFx0XHRAYWN0aW9uMS5sYWJlbCA9IG5ldyBUeXBlLkNhcHRpb25cblx0XHRcdFx0XHRuYW1lOiAnTGFiZWwnLCBwYXJlbnQ6IEBhY3Rpb24xXG5cdFx0XHRcdFx0eDogQGFjdGlvbjEuaWNvbi5tYXhYICsgOFxuXHRcdFx0XHRcdGZvbnRTaXplOiAxM1xuXHRcdFx0XHRcdHRleHQ6IEBfYWN0aW9uMS50aXRsZS50b1VwcGVyQ2FzZSgpXG5cblx0XHRcdFx0QGFjdGlvbjEud2lkdGggPSBAYWN0aW9uMS5sYWJlbC5tYXhYXG5cblx0XHRcdFx0I0BhY3Rpb24xLm9uVG91Y2hTdGFydCAoZXZlbnQpIC0+IFJpcHBsZShALCBldmVudC5wb2ludCwgQGljb24sIG5ldyBDb2xvcihUaGVtZS5zZWNvbmRhcnkpLmFscGhhKC4zKSlcblx0XHRcdFx0QGFjdGlvbjEub25UYXAgQGNsb3NlXG5cdFx0XHRcdGlmIEBfYWN0aW9uMS5hY3Rpb24gdGhlbiBAYWN0aW9uMS5vblRhcCA9PiBVdGlscy5kZWxheSAuMjUsIF8uYmluZChAX2FjdGlvbjEuYWN0aW9uLCBAKVxuXHRcdFx0XHRcblxuXHRcdFx0XHRpZiBAX2FjdGlvbjI/XG5cdFx0XHRcdFx0QGFjdGlvbjIgPSBuZXcgTGF5ZXJcblx0XHRcdFx0XHRcdG5hbWU6ICdBY3Rpb24gMicsIHBhcmVudDogQFxuXHRcdFx0XHRcdFx0eDogQGFjdGlvbjEubWF4WCArIDQ1LCB5OiBkaXZpZGVyLm1heFkgKyAxMVxuXHRcdFx0XHRcdFx0d2lkdGg6IDgwLCBoZWlnaHQ6IDI0LCBiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcdFx0XHRcblx0XHRcdFx0XHRAYWN0aW9uMi5pY29uID0gbmV3IEljb25cblx0XHRcdFx0XHRcdG5hbWU6ICdJY29uJywgcGFyZW50OiBAYWN0aW9uMlxuXHRcdFx0XHRcdFx0aWNvbjogQF9hY3Rpb24yLmljb25cblx0XHRcdFx0XHRcdHdpZHRoOiAxOCwgaGVpZ2h0OiAxOFxuXHRcdFx0XHRcdFx0Y29sb3I6ICdyZ2JhKDAsMCwwLC41NCknXG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0QGFjdGlvbjIubGFiZWwgPSBuZXcgVHlwZS5DYXB0aW9uXG5cdFx0XHRcdFx0XHRuYW1lOiAnTGFiZWwnLCBwYXJlbnQ6IEBhY3Rpb24yXG5cdFx0XHRcdFx0XHR4OiBAYWN0aW9uMi5pY29uLm1heFggKyA4XG5cdFx0XHRcdFx0XHRmb250U2l6ZTogMTNcblx0XHRcdFx0XHRcdHRleHQ6IEBfYWN0aW9uMi50aXRsZS50b1VwcGVyQ2FzZSgpXG5cblx0XHRcdFx0XHRAYWN0aW9uMi53aWR0aCA9IEBhY3Rpb24yLmxhYmVsLm1heFhcblxuXHRcdFx0XHRcdCNAYWN0aW9uMi5vblRvdWNoU3RhcnQgKGV2ZW50KSAtPiBSaXBwbGUoQCwgZXZlbnQucG9pbnQsIEBpY29uLCBuZXcgQ29sb3IoVGhlbWUuc2Vjb25kYXJ5KS5hbHBoYSguMykpXG5cdFx0XHRcdFx0QGFjdGlvbjIub25UYXAgQGNsb3NlXG5cdFx0XHRcdFx0aWYgQF9hY3Rpb24yLmFjdGlvbiB0aGVuIEBhY3Rpb24yLm9uVGFwID0+IFV0aWxzLmRlbGF5IC4yNSwgXy5iaW5kKEBfYWN0aW9uMi5hY3Rpb24sIEApXG5cdFx0XHRcdFx0XG5cblx0XHRcdFx0QGhlaWdodCA9IGRpdmlkZXIubWF4WSArIDQ3XG5cblx0XHRAb3BlbigpXG5cblx0XHRAb25Td2lwZUxlZnRFbmQgPT4gQGNsb3NlKCdsZWZ0Jylcblx0XHRAb25Td2lwZVJpZ2h0RW5kID0+IEBjbG9zZSgncmlnaHQnKVxuXHRcdFV0aWxzLmRlbGF5IEBfdGltZW91dCwgPT4gaWYgbm90IEBjbG9zZWQgdGhlbiBAY2xvc2UoJ3JpZ2h0JylcblxuXHRvcGVuOiA9PiBcblx0XHRAYW5pbWF0ZSB7b3BhY2l0eTogMX1cblxuXHRjbG9zZTogKGRpcmVjdGlvbikgPT5cblx0XHRpZiBAX2FwcD8gXG5cdFx0XHRfLnB1bGwoQF9hcHAubm90aWZpY2F0aW9ucywgQClcblxuXHRcdFx0Zm9yIG5vdGlmaWNhdGlvbiBpbiBAX2FwcC5ub3RpZmljYXRpb25zXG5cdFx0XHRcdGlmIG5vdGlmaWNhdGlvbi55ID4gQG1heFlcblx0XHRcdFx0XHRub3RpZmljYXRpb24uYW5pbWF0ZSB7eTogbm90aWZpY2F0aW9uLnkgLSBAaGVpZ2h0fVxuXG5cdFx0QGFuaW1hdGVcblx0XHRcdHg6IGlmIGRpcmVjdGlvbiBpcyAnbGVmdCcgdGhlbiAtU2NyZWVuLndpZHRoIGVsc2UgU2NyZWVuLndpZHRoXG5cdFx0XHRvcGFjaXR5OiAwXG5cdFx0XG5cdFx0QGNsb3NlZCA9IHRydWVcblxuXHRcdFV0aWxzLmRlbGF5IC41LCA9PiBAZGVzdHJveSgpIiwiIyBcdDg4ODhiYS44OGJhICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLjg4ODg4LiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZFAgICAgICAgICAgICAgICAgICBcbiMgXHQ4OCAgYDhiICBgOGIgICAgICAgICAgICAgICAgICAgICAgICAgICAgZDgnICAgYDhiICAgICAgICAgICAgICAgICAgICAgICAgICAgIDg4ICAgICAgICAgICAgICAgICAgXG4jIFx0ODggICA4OCAgIDg4IC5kODg4OGIuIDg4ZDg4OGIuIGRQICAgIGRQIDg4ICAgICA4OCBkUCAgIC5kUCAuZDg4ODhiLiA4OGQ4ODhiLiA4OCAuZDg4ODhiLiBkUCAgICBkUFxuIyBcdDg4ICAgODggICA4OCA4OG9vb29kOCA4OCcgIGA4OCA4OCAgICA4OCA4OCAgICAgODggODggICBkOCcgODhvb29vZDggODgnICBgODggODggODgnICBgODggODggICAgODhcbiMgXHQ4OCAgIDg4ICAgODggODguICAuLi4gODggICAgODggODguICAuODggWTguICAgLjhQIDg4IC44OCcgIDg4LiAgLi4uIDg4ICAgICAgIDg4IDg4LiAgLjg4IDg4LiAgLjg4XG4jIFx0ZFAgICBkUCAgIGRQIGA4ODg4OFAnIGRQICAgIGRQIGA4ODg4OFAnICBgODg4OFAnICA4ODg4UCcgICBgODg4ODhQJyBkUCAgICAgICBkUCBgODg4ODhQOCBgODg4OFA4OFxuIyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLjg4XG4jICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGQ4ODg4UCBcblxuVHlwZSA9IHJlcXVpcmUgJ21kLWNvbXBvbmVudHMvVHlwZSdcbnsgUmlwcGxlIH0gPSByZXF1aXJlICdtZC1jb21wb25lbnRzL1JpcHBsZSdcbnsgSWNvbiB9ID0gcmVxdWlyZSAnbWQtY29tcG9uZW50cy9JY29uJ1xueyBUaGVtZSB9ID0gcmVxdWlyZSAnbWQtY29tcG9uZW50cy9UaGVtZSdcbnsgTWVudUJ1dHRvbiB9ID0gcmVxdWlyZSAnbWQtY29tcG9uZW50cy9NZW51QnV0dG9uJ1xuXG5leHBvcnRzLk1lbnVPdmVybGF5ID0gY2xhc3MgTWVudU92ZXJsYXkgZXh0ZW5kcyBMYXllclxuXHRcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cblx0XHRAX2xpbmtzID0gb3B0aW9ucy5saW5rcyA/IFt7dGl0bGU6ICdIb21lJywgaWNvbjogJ2hvbWUnLCBhY3Rpb246IC0+IG51bGx9XVxuXHRcdEBfdGl0bGUgPSBvcHRpb25zLnRpdGxlID8gJ01lbnUnXG5cdFx0QF9pbWFnZSA9IG9wdGlvbnMuaW1hZ2UgPyBudWxsXG5cblxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdGhlaWdodDogU2NyZWVuLmhlaWdodFxuXHRcdFx0d2lkdGg6IDMwNFxuXHRcdFx0dmlzaWJsZTogZmFsc2Vcblx0XHRcdGJhY2tncm91bmRDb2xvcjogVGhlbWUubWVudU92ZXJsYXkuYmFja2dyb3VuZENvbG9yXG5cdFx0XHRhbmltYXRpb25PcHRpb25zOiB7Y3VydmU6IFwic3ByaW5nKDMwMCwgMzUsIDApXCJ9XG5cblxuXHRcdEBzY3JpbSA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogJy4nLCBcblx0XHRcdHNpemU6IFNjcmVlbi5zaXplXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6ICdyZ2JhKDAsMCwwLC42KSdcblx0XHRcdG9wYWNpdHk6IDBcblx0XHRcdHZpc2libGU6IGZhbHNlXG5cdFx0XHRhbmltYXRpb25PcHRpb25zOlxuXHRcdFx0XHR0aW1lOiAuMjVcblxuXHRcdEBzY3JpbS5vblRhcCA9PiBAaGlkZSgpXG5cdFx0QG9uU3dpcGVMZWZ0RW5kID0+IEBoaWRlKClcblxuXHRcdEBoZWFkZXIgPSBuZXcgTGF5ZXJcblx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBAXG5cdFx0XHR3aWR0aDogQHdpZHRoLCBoZWlnaHQ6IDE3M1xuXHRcdFx0aW1hZ2U6IFRoZW1lLnVzZXIuaW1hZ2Vcblx0XHRcdGJhY2tncm91bmRDb2xvcjogVGhlbWUubWVudU92ZXJsYXkuaGVhZGVyLmJhY2tncm91bmRDb2xvclxuXG5cdFx0QHRpdGxlSWNvbiA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEBoZWFkZXJcblx0XHRcdHg6IDE2LCB5OiA0MFxuXHRcdFx0aGVpZ2h0OiA2NCwgd2lkdGg6IDY0XG5cdFx0XHRib3JkZXJSYWRpdXM6IDMyXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFRoZW1lLm1lbnVPdmVybGF5LmhlYWRlci5pY29uXG5cblx0XHRAc3ViaGVhZGVyRXhwYW5kID0gbmV3IEljb25cblx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBAaGVhZGVyXG5cdFx0XHR4OiBBbGlnbi5yaWdodCgtMTYpXG5cdFx0XHR5OiBBbGlnbi5ib3R0b20oLTE2KVxuXHRcdFx0aWNvbjogJ21lbnUtZG93bidcblx0XHRcdGNvbG9yOiBUaGVtZS5tZW51T3ZlcmxheS5zdWJoZWFkZXIuaWNvblxuXG5cdFx0QHN1YmhlYWRlciA9IG5ldyBUeXBlLkJvZHkxXG5cdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQGhlYWRlclxuXHRcdFx0d2lkdGg6IEB3aWR0aFxuXHRcdFx0eDogMTYsIHk6IEFsaWduLmJvdHRvbSgtMTgpXG5cdFx0XHR0ZXh0OiBAX3RpdGxlXG5cdFx0XHRjb2xvcjogVGhlbWUubWVudU92ZXJsYXkuc3ViaGVhZGVyLnRleHRcblxuXHRcdGxpbmtzID0gW11cblxuXHRcdGZvciBsaW5rLCBpIGluIEBfbGlua3Ncblx0XHRcdGxpbmtzW2ldID0gbmV3IE1lbnVCdXR0b25cblx0XHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEBcblx0XHRcdFx0eDogMTYsIHk6IDE4OSArICg0OCAqIGkpXG5cdFx0XHRcdHRleHQ6IGxpbmsudGl0bGVcblx0XHRcdFx0aWNvbjogbGluay5pY29uXG5cdFx0XHRcdGFjdGlvbjogbGluay5hY3Rpb25cblxuXHRzaG93OiAtPlxuXHRcdEBicmluZ1RvRnJvbnQoKVxuXHRcdEB2aXNpYmxlID0gdHJ1ZVxuXHRcdEB4ID0gLVNjcmVlbi53aWR0aFxuXHRcdEBhbmltYXRlXG5cdFx0XHR4OiAwXG5cblx0XHRAc2NyaW0ucGxhY2VCZWhpbmQoQClcblx0XHRAc2NyaW0udmlzaWJsZSA9IHRydWVcblx0XHRAc2NyaW0uYW5pbWF0ZVxuXHRcdFx0b3BhY2l0eTogMVxuXG5cdGhpZGU6IC0+XG5cdFx0QGFuaW1hdGVcblx0XHRcdHg6IC1TY3JlZW4ud2lkdGhcblxuXHRcdEBzY3JpbS5hbmltYXRlXG5cdFx0XHRvcGFjaXR5OiAwXG5cblx0XHRVdGlscy5kZWxheSAuMywgPT5cblx0XHRcdEB2aXNpYmxlID0gZmFsc2Vcblx0XHRcdEBzY3JpbS52aXNpYmxlID0gZmFsc2Vcblx0XHRcdEBzZW5kVG9CYWNrKClcblx0XHRcdEBzY3JpbS5zZW5kVG9CYWNrKCkiLCIjIFx0ODg4OGJhLjg4YmEgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA4ODg4ODhiYSAgICAgICAgICAgICBkUCAgICAgZFBcbiMgXHQ4OCAgYDhiICBgOGIgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDg4ICAgIGA4YiAgICAgICAgICAgIDg4ICAgICA4OFxuIyBcdDg4ICAgODggICA4OCAuZDg4ODhiLiA4OGQ4ODhiLiBkUCAgICBkUCBhODhhYWFhOFAnIGRQICAgIGRQIGQ4ODg4UCBkODg4OFAgLmQ4ODg4Yi4gODhkODg4Yi5cbiMgXHQ4OCAgIDg4ICAgODggODhvb29vZDggODgnICBgODggODggICAgODggIDg4ICAgYDhiLiA4OCAgICA4OCAgIDg4ICAgICA4OCAgIDg4JyAgYDg4IDg4JyAgYDg4XG4jIFx0ODggICA4OCAgIDg4IDg4LiAgLi4uIDg4ICAgIDg4IDg4LiAgLjg4ICA4OCAgICAuODggODguICAuODggICA4OCAgICAgODggICA4OC4gIC44OCA4OCAgICA4OFxuIyBcdGRQICAgZFAgICBkUCBgODg4ODhQJyBkUCAgICBkUCBgODg4ODhQJyAgODg4ODg4ODhQIGA4ODg4OFAnICAgZFAgICAgIGRQICAgYDg4ODg4UCcgZFAgICAgZFBcblxuVHlwZSA9IHJlcXVpcmUgJ21kLWNvbXBvbmVudHMvVHlwZSdcbnsgUmlwcGxlIH0gPSByZXF1aXJlICdtZC1jb21wb25lbnRzL1JpcHBsZSdcbnsgSWNvbiB9ID0gcmVxdWlyZSAnbWQtY29tcG9uZW50cy9JY29uJ1xueyBUaGVtZSB9ID0gcmVxdWlyZSAnbWQtY29tcG9uZW50cy9UaGVtZSdcblxuXG5leHBvcnRzLk1lbnVCdXR0b24gPSBjbGFzcyBNZW51QnV0dG9uIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cdFx0XG5cdFx0QF9pY29uID0gb3B0aW9ucy5pY29uID8gJ2hvbWUnXG5cdFx0QF90ZXh0ID0gb3B0aW9ucy50ZXh0ID8gJ0RlZmF1bHQnXG5cdFx0QF9hY3Rpb24gPSBvcHRpb25zLmFjdGlvbiA/IC0+IG51bGxcblxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdGhlaWdodDogNDgsIHdpZHRoOiAzMDRcblx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXG5cdFx0QGljb25MYXllciA9IG5ldyBJY29uXG5cdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQFxuXHRcdFx0eTogQWxpZ24uY2VudGVyXG5cdFx0XHRpY29uOiBAX2ljb24sIGNvbG9yOiBUaGVtZS5tZW51T3ZlcmxheS50ZXh0XG5cblx0XHRAbGFiZWxMYXllciA9IG5ldyBUeXBlLlJlZ3VsYXJcblx0XHRcdG5hbWU6ICdsYWJlbCcsIHBhcmVudDogQFxuXHRcdFx0eDogQGljb25MYXllci5tYXhYICsgMTZcblx0XHRcdHk6IEFsaWduLmNlbnRlcigpXG5cdFx0XHRjb2xvcjogVGhlbWUubWVudU92ZXJsYXkudGV4dFxuXHRcdFx0dGV4dDogQF90ZXh0XG5cblx0XHRAb25UYXAgQF9hY3Rpb25cblx0XHRAb25UYXAgLT4gXG5cdFx0XHRVdGlscy5kZWxheSAuMjUsID0+IEBwYXJlbnQuaGlkZSgpIiwiIyBcdGRQXG4jIFx0ODhcbiMgXHQ4OCAuZDg4ODhiLiAuZDg4ODhiLiA4OGQ4ODhiLlxuIyBcdDg4IDg4JyAgYFwiXCIgODgnICBgODggODgnICBgODhcbiMgXHQ4OCA4OC4gIC4uLiA4OC4gIC44OCA4OCAgICA4OFxuIyBcdGRQIGA4ODg4OFAnIGA4ODg4OFAnIGRQICAgIGRQXG4jIFx0XG4jIFx0XG4jLS0gQHN0ZXZlcnVpem9rXG4jXHRBIGNsYXNzIGZvciBjcmVhdGluZyBNYXRlcmlhbCBEZXNpZ24gaWNvbnMsIHdpdGggYWNjZXNzIHRvIDE2MDAgaWNvbnMgYXMgU1ZHcy5cbiNcdEFkYXB0ZWQgZnJvbSBtYXJjYmFjaG1hbm4ncyBodHRwczovL3d3dy5ucG1qcy5jb20vcGFja2FnZS9tYXRlcmlhbC1kZXNpZ24taWNvbnMtc3ZnLlxuI1x0XG4jXG4jLS0gSW5zdGFsbGF0aW9uOlxuI1x0RG93bmxvYWQgYW5kIHBsYWNlIGljb24uY29mZmVlIGFuZCBpY29ucy5qc29uIGluIHlvdXIgcHJvamVjdCdzIG1vZHVsZXMgZm9sZGVyLlxuI1x0QXQgdGhlIHRvcCBvZiB5b3VyIHByb2plY3QsIHR5cGU6IFwie0ljb259ID0gcmVxdWlyZSBcImljb25cIlxuI1xuI1xuIy0tXHRVc2FnZTpcbiNcbiNcdFRvIGNyZWF0ZSBhbiBpY29uLCB0eXBlOlxuI1xuI1x0XHRteUljb24gPSBuZXcgSWNvblxuI1x0XHRcbiNcdFlvdSBjYW4gc2V0IHRoZSBpY29uIGFuZCB0aGUgaWNvbidzIGZpbGwgY29sb3IuXG4jXG4jXHRcdG15SWNvbiA9IG5ldyBJY29uXG4jXHRcdFx0aWNvbjogJ2Nvb2tpZSdcbiNcdFx0XHRjb2xvcjogJyM5NDUyMDAnXG4jXG4jXHRZb3UgY2FuIGNoYW5nZSBhbiBleGlzdGluZyBpY29uJ3MgZmlsbCBvciBpY29uLlxuI1xuIyBcdFx0bXlJY29uLmNvbG9yID0gJ3JlZCcgXG4jXHRcdG15SWNvbi5pY29uID0gJ2N1cCdcbiNcbiNcdEFwYXJ0IGZyb20gdGhhdCwgeW91IGNhbiB1c2UgdGhlIEljb24gaW5zdGFuY2UganVzdCBsaWtlIGFueSBvdGhlciBMYXllciBpbnN0YW5jZS5cbiNcbiNcbiMtLSBUcm91Ymxlc2hvb3RpbmdcbiNcbiNcdFEuXHRXaHkgZG8gSSBrZWVwIGdldHRpbmcgdGhlIFwiSWNvbiBub3QgZm91bmQ/XCIgZXJyb3I/XG4jXG4jXHRBLlx0VGhlIGljb24gbmFtZXMgdXNlZCBieSB0aGlzIG1vZHVsZSBhcmUgbm90IGFsd2F5cyBzdGFuZGFyZCB0byBHb29nbGUncyBsaXN0aW5ncy4gXG4jXHRcdElmIHlvdSdyZSBnZXR0aW5nIGVycm9ycywgc2VhcmNoIGZvciB0aGUgaWNvbiBhdCBodHRwczovL21hdGVyaWFsZGVzaWduaWNvbnMuY29tLy5cbiNcdFx0SXQgbWF5IGJlIGxpc3RlZCB0aGVyZSB1bmRlciBhIGRpZmZlcmVudCBuYW1lLiBJZiB0aGF0J3MgdGhlIGNhc2UsIHVzZSB0aGVpclxuI1x0XHRuYW1lIGZvciB0aGUgaWNvbiBpbnN0ZWFkIHdoZW4gY3JlYXRpbmcgeW91ciBJY29uIGluc3RhbmNlLlxuI1xuI1x0XHRBIGNvbW1vbiBleGFtcGxlOiBpY29uOiBcInNlYXJjaFwiIHdvbid0IHdvcmssIGJ1dCBpY29uOiBcIm1hZ25pZnlcIiB3aWxsLiDCr1xcXyjjg4QpXy/Cr1xuI1x0XG4jLS0gRW5qb3khIEBzdGV2ZXJ1aW9rXG5cblxuaWNvbnMgPSBKU09OLnBhcnNlIFV0aWxzLmRvbUxvYWREYXRhU3luYyBcIm1vZHVsZXMvbWQtY29tcG9uZW50cy9pY29ucy5qc29uXCJcblxuZXhwb3J0cy5JY29uID0gY2xhc3MgSWNvbiBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXG5cdFx0QF9pY29uID0gb3B0aW9ucy5pY29uID8gJ21lbnUnXG5cdFx0QF9jb2xvciA9IG9wdGlvbnMuY29sb3IgPyAnIzAwMDAwJ1xuXHRcdEBfYmFja2dyb3VuZENvbG9yID0gb3B0aW9ucy5iYWNrZ3JvdW5kQ29sb3IgPyBudWxsXG5cblx0XHRzdXBlciBfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRuYW1lOiAnLidcblx0XHRcdGhlaWdodDogMjQsIHdpZHRoOiAyNFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBAX2JhY2tncm91bmRDb2xvclxuXG5cdEBkZWZpbmUgXCJpY29uXCIsXG5cdFx0Z2V0OiAtPiByZXR1cm4gQF9pY29uXG5cdFx0c2V0OiAobmFtZSkgLT5cblx0XHRcdEBfaWNvbiA9IG5hbWVcblxuXHRcdFx0c3ZnID0gaWYgaWNvbnNbQF9pY29uXSB0aGVuIFwiPHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAyNCAyNCc+PHBhdGggZD0nI3tpY29uc1tAX2ljb25dfScgZmlsbD0nI3tAX2NvbG9yfScvPjwvc3ZnPlwiXG5cdFx0XHRlbHNlIHRocm93IFwiRXJyb3I6IGljb24gJyN7bmFtZX0nIHdhcyBub3QgZm91bmQuIFNlZSBodHRwczovL21hdGVyaWFsZGVzaWduaWNvbnMuY29tLyBmb3IgZnVsbCBsaXN0IG9mIGljb25zLlwiXG5cblx0XHRcdEBodG1sID0gc3ZnXG5cblx0QGRlZmluZSBcImNvbG9yXCIsXG5cdFx0Z2V0OiAtPiByZXR1cm4gQF9jb2xvclxuXHRcdHNldDogKGNvbG9yKSAtPlxuXHRcdFx0QF9jb2xvciA9IG5ldyBDb2xvcihjb2xvcilcblxuXHRcdFx0c3ZnID0gaWYgaWNvbnNbQF9pY29uXSB0aGVuIFwiPHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAyNCAyNCc+PHBhdGggZD0nI3tpY29uc1tAX2ljb25dfScgZmlsbD0nI3tAX2NvbG9yfScvPjwvc3ZnPlwiXG5cdFx0XHRlbHNlIHRocm93IFwiRXJyb3I6IGljb24gJyN7bmFtZX0nIHdhcyBub3QgZm91bmQuIFNlZSBodHRwczovL21hdGVyaWFsZGVzaWduaWNvbnMuY29tLyBmb3IgZnVsbCBsaXN0IG9mIGljb25zLlwiXG5cblx0XHRcdEBodG1sID0gc3ZnIiwiIyBkUCAgICAgZFAgICAgICAgICAgICAgICAgICAgICAgICAgIGRQICAgICAgICAgICAgICAgICAgXG4jIDg4ICAgICA4OCAgICAgICAgICAgICAgICAgICAgICAgICAgODggICAgICAgICAgICAgICAgICBcbiMgODhhYWFhYTg4YSAuZDg4ODhiLiAuZDg4ODhiLiAuZDg4OGI4OCAuZDg4ODhiLiA4OGQ4ODhiLlxuIyA4OCAgICAgODggIDg4b29vb2Q4IDg4JyAgYDg4IDg4JyAgYDg4IDg4b29vb2Q4IDg4JyAgYDg4XG4jIDg4ICAgICA4OCAgODguICAuLi4gODguICAuODggODguICAuODggODguICAuLi4gODggICAgICBcbiMgZFAgICAgIGRQICBgODg4ODhQJyBgODg4ODhQOCBgODg4ODhQOCBgODg4ODhQJyBkUCAgICBcblxuVHlwZSA9IHJlcXVpcmUgJ21kLWNvbXBvbmVudHMvVHlwZSdcbnsgUmlwcGxlIH0gPSByZXF1aXJlICdtZC1jb21wb25lbnRzL1JpcHBsZSdcbnsgSWNvbiB9ID0gcmVxdWlyZSAnbWQtY29tcG9uZW50cy9JY29uJ1xueyBUaGVtZSB9ID0gcmVxdWlyZSAnbWQtY29tcG9uZW50cy9UaGVtZSdcbnsgU3RhdHVzQmFyIH0gPSByZXF1aXJlICdtZC1jb21wb25lbnRzL1N0YXR1c0JhcidcblxuZXhwb3J0cy5IZWFkZXIgPSBjbGFzcyBIZWFkZXIgZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblx0XHRcblx0XHRAX3RpdGxlID0gdW5kZWZpbmVkXG5cdFx0QF9pY29uID0gdW5kZWZpbmVkXG5cdFx0QF9pY29uQWN0aW9uID0gb3B0aW9ucy5pY29uQWN0aW9uID8gLT4gbnVsbFxuXG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0bmFtZTogJ0hlYWRlcicsIFxuXHRcdFx0d2lkdGg6IFNjcmVlbi53aWR0aCwgaGVpZ2h0OiA4MFxuXHRcdFx0c2hhZG93WTogMiwgc2hhZG93Qmx1cjogMywgc2hhZG93Q29sb3I6ICdyZ2JhKDAsMCwwLC4yNCknXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFRoZW1lLmhlYWRlci5iYWNrZ3JvdW5kQ29sb3JcblxuXHRcdCMgVE9ETzogaWYgb3B0aW9ucy5pY29uIGlzIGZhbHNlIHRoZW4gbm8gaWNvbkxheWVyLCBtb3ZlIHRpdGxlIGxlZnRcblxuXHRcdEB0aXRsZUxheWVyID0gbmV3IFR5cGUuVGl0bGVcblx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBAXG5cdFx0XHR4OiA3MiwgeTogQWxpZ24uYm90dG9tKC0xNClcblx0XHRcdGNvbG9yOiBUaGVtZS5oZWFkZXIudGl0bGVcblx0XHRcdHRleHQ6IEB0aXRsZSA/IFwiTm8gdGl0bGVcIlxuXG5cdFx0QHRpdGxlID0gb3B0aW9ucy50aXRsZSA/ICdEZWZhdWx0IEhlYWRlcidcblxuXHRcdEBpY29uTGF5ZXIgPSBuZXcgSWNvblxuXHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEAsIFxuXHRcdFx0eDogMTIsIHk6IEFsaWduLmNlbnRlcigxMilcblx0XHRcdGljb246ICdtZW51JywgY29sb3I6IFRoZW1lLmhlYWRlci5pY29uLmNvbG9yXG5cblx0XHRAaWNvbiA9IG9wdGlvbnMuaWNvbiA/ICdtZW51J1xuXG5cdFx0QHN0YXR1c0JhciA9IG5ldyBTdGF0dXNCYXJcblx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBAXG5cblx0XHRAaWNvbkxheWVyLm9uVGFwID0+IEBfaWNvbkFjdGlvbigpXG5cdFx0QGljb25MYXllci5vblRvdWNoU3RhcnQgKGV2ZW50KSA9PiBSaXBwbGUoQCwgZXZlbnQucG9pbnQsIEB0aXRsZUxheWVyKVxuXG5cblx0QGRlZmluZSBcInRpdGxlXCIsXG5cdFx0Z2V0OiAtPiByZXR1cm4gQF90aXRsZVxuXHRcdHNldDogKHRpdGxlVGV4dCkgLT5cblx0XHRcdEBfdGl0bGUgPSB0aXRsZVRleHRcblx0XHRcdEB0aXRsZUxheWVyLnRleHRSZXBsYWNlKEB0aXRsZUxheWVyLnRleHQsIEBfdGl0bGUpXG5cblx0QGRlZmluZSBcImljb25cIixcblx0XHRnZXQ6IC0+IHJldHVybiBAX2ljb25cblx0XHRzZXQ6IChpY29uTmFtZSkgLT4gXG5cdFx0XHRAX2ljb24gPSBpY29uTmFtZVxuXHRcdFx0QGljb25MYXllci5pY29uID0gaWNvbk5hbWVcblxuXHRAZGVmaW5lIFwiaWNvbkNvbG9yXCIsXG5cdFx0Z2V0OiAtPiByZXR1cm4gQF9pY29uLmNvbG9yXG5cdFx0c2V0OiAoY29sb3IpIC0+IFxuXHRcdFx0QGljb25MYXllci5jb2xvciA9IGNvbG9yXG5cblx0QGRlZmluZSBcImljb25BY3Rpb25cIixcblx0XHRnZXQ6IC0+IHJldHVybiBAX2ljb25BY3Rpb25cblx0XHRzZXQ6IChhY3Rpb24pIC0+XG5cdFx0XHRAX2ljb25BY3Rpb24gPSBhY3Rpb24iLCJcbiMgXHQgLjg4ODg4LiAgICAgICAgICAgb28gICAgICAgZFAgZFAgICAgICAgIG9vICAgICAgICAgICAgZFBcbiMgXHRkOCcgICBgODggICAgICAgICAgICAgICAgICAgODggODggICAgICAgICAgICAgICAgICAgICAgODhcbiMgXHQ4OCAgICAgICAgODhkODg4Yi4gZFAgLmQ4ODhiODggODggICAgICAgIGRQIC5kODg4OGIuIGQ4ODg4UFxuIyBcdDg4ICAgWVA4OCA4OCcgIGA4OCA4OCA4OCcgIGA4OCA4OCAgICAgICAgODggWThvb29vby4gICA4OFxuIyBcdFk4LiAgIC44OCA4OCAgICAgICA4OCA4OC4gIC44OCA4OCAgICAgICAgODggICAgICAgODggICA4OFxuIyBcdCBgODg4ODgnICBkUCAgICAgICBkUCBgODg4ODhQOCA4ODg4ODg4OFAgZFAgYDg4ODg4UCcgICBkUFxuXG5UeXBlID0gcmVxdWlyZSAnbWQtY29tcG9uZW50cy9UeXBlJ1xueyBSaXBwbGUgfSA9IHJlcXVpcmUgJ21kLWNvbXBvbmVudHMvUmlwcGxlJ1xueyBJY29uIH0gPSByZXF1aXJlICdtZC1jb21wb25lbnRzL0ljb24nXG57IFRoZW1lIH0gPSByZXF1aXJlICdtZC1jb21wb25lbnRzL1RoZW1lJ1xuXG5leHBvcnRzLkdyaWRMaXN0ID0gY2xhc3MgR3JpZExpc3QgZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblx0XHRcblx0XHRAX2NvbHVtbnMgPSBvcHRpb25zLmNvbHVtbnMgPyAyXG5cdFx0XG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0bmFtZTogJy4nXG5cdFx0XHR3aWR0aDogU2NyZWVuLndpZHRoXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcblx0XHRAdGlsZXMgPSBbXVxuXHRcdEB0aWxlV2lkdGggPSAoQHdpZHRoIC0gMjQpIC8gQF9jb2x1bW5zXG5cdFx0QHRpbGVIZWlnaHQgPSBvcHRpb25zLnRpbGVIZWlnaHQgPyBTY3JlZW4ud2lkdGggLyBAX2NvbHVtbnNcblx0XHRcblx0YWRkVGlsZTogKHRpbGUpIC0+XG5cdFx0dGlsZS5pID0gQHRpbGVzLmxlbmd0aFxuXHRcdEB0aWxlcy5wdXNoKHRpbGUpXG5cdFx0XG5cdFx0dGlsZS54ID0gOCArIChAdGlsZVdpZHRoICsgOCkgKiAodGlsZS5pICUgQF9jb2x1bW5zKVxuXHRcdHRpbGUueSA9IDggKyAoQHRpbGVIZWlnaHQgKyA4KSAqIE1hdGguZmxvb3IodGlsZS5pIC8gQF9jb2x1bW5zKVxuXG5cdFx0QGhlaWdodCA9IF8ubGFzdChAdGlsZXMpLm1heFlcblxuXHRcdGlmIEBwYXJlbnQ/LnBhcmVudD8uY29udGVudD8gdGhlbiBAcGFyZW50LnBhcmVudC51cGRhdGVDb250ZW50KClcblx0XG5cdHJlbW92ZVRpbGU6ICh0aWxlKSAtPlxuXHRcdF8ucHVsbChAdGlsZXMsIHRpbGUpXG5cdFx0dGlsZS5kZXN0cm95KClcblx0XHRAcmVwb3NpdGlvblRpbGVzKClcblxuXHRyZXBvc2l0aW9uVGlsZXM6IC0+XG5cdFx0Zm9yIHRpbGUsIGkgaW4gQHRpbGVzXG5cdFx0XHR0aWxlLmkgPSBpXG5cdFx0XHR0aWxlLmFuaW1hdGVcblx0XHRcdFx0eDogOCArIChAdGlsZVdpZHRoICsgOCkgKiAodGlsZS5pICUgQF9jb2x1bW5zKVxuXHRcdFx0XHR5OiA4ICsgKEB0aWxlSGVpZ2h0ICsgOCkgKiBNYXRoLmZsb29yKHRpbGUuaSAvIEBfY29sdW1ucylcblx0XHRAaGVpZ2h0ID0gXy5sYXN0KEB0aWxlcykubWF4WVxuXG5cdFx0aWYgQHBhcmVudD8ucGFyZW50Py5jb250ZW50PyB0aGVuIEBwYXJlbnQucGFyZW50LnVwZGF0ZUNvbnRlbnQoKVxuIiwiIyBcdDg4ODg4OGJhICBvbyAgICAgICAgICBvbyAgICAgICBkUFxuIyBcdDg4ICAgIGA4YiAgICAgICAgICAgICAgICAgICAgICA4OFxuIyBcdDg4ICAgICA4OCBkUCBkUCAgIC5kUCBkUCAuZDg4OGI4OCAuZDg4ODhiLiA4OGQ4ODhiLlxuIyBcdDg4ICAgICA4OCA4OCA4OCAgIGQ4JyA4OCA4OCcgIGA4OCA4OG9vb29kOCA4OCcgIGA4OFxuIyBcdDg4ICAgIC44UCA4OCA4OCAuODgnICA4OCA4OC4gIC44OCA4OC4gIC4uLiA4OFxuIyBcdDg4ODg4ODhQICBkUCA4ODg4UCcgICBkUCBgODg4ODhQOCBgODg4ODhQJyBkUFxuXG57IFRoZW1lIH0gPSByZXF1aXJlICdtZC1jb21wb25lbnRzL1RoZW1lJ1xuXG5leHBvcnRzLkRpdmlkZXIgPSBEaXZpZGVyID0gY2xhc3MgRGl2aWRlciBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdG5hbWU6ICcuJ1xuXHRcdFx0d2lkdGg6IDIwMCwgaGVpZ2h0OiAxLFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBUaGVtZS5kaXZpZGVyLmJhY2tncm91bmRDb2xvciIsIiMgXHQ4ODg4ODhiYSAgb28gICAgICAgICAgZFBcbiMgXHQ4OCAgICBgOGIgICAgICAgICAgICAgODhcbiMgXHQ4OCAgICAgODggZFAgLmQ4ODg4Yi4gODggLmQ4ODg4Yi4gLmQ4ODg4Yi5cbiMgXHQ4OCAgICAgODggODggODgnICBgODggODggODgnICBgODggODgnICBgODhcbiMgXHQ4OCAgICAuOFAgODggODguICAuODggODggODguICAuODggODguICAuODhcbiMgXHQ4ODg4ODg4UCAgZFAgYDg4ODg4UDggZFAgYDg4ODg4UCcgYDg4ODhQODhcbiMgXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuODhcbiMgXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGQ4ODg4UFxuXG5UeXBlID0gcmVxdWlyZSAnbWQtY29tcG9uZW50cy9UeXBlJ1xueyBSaXBwbGUgfSA9IHJlcXVpcmUgJ21kLWNvbXBvbmVudHMvUmlwcGxlJ1xueyBJY29uIH0gPSByZXF1aXJlICdtZC1jb21wb25lbnRzL0ljb24nXG57IFRoZW1lIH0gPSByZXF1aXJlICdtZC1jb21wb25lbnRzL1RoZW1lJ1xueyBCdXR0b24gfSA9IHJlcXVpcmUgJ21kLWNvbXBvbmVudHMvQnV0dG9uJ1xuXG5leHBvcnRzLkRpYWxvZyA9IGNsYXNzIERpYWxvZyBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdG5hbWU6ICcuJ1xuXHRcdFx0c2l6ZTogU2NyZWVuLnNpemVcblx0XHRcdGJhY2tncm91bmRDb2xvcjogJ3JnYmEoMCwgMCwgMCwgLjUpJ1xuXHRcdFx0b3BhY2l0eTogMFxuXHRcdFx0XG5cdFx0QF90aXRsZSA9IG9wdGlvbnMudGl0bGUgPyAnRGVmYXVsdCBUaXRsZSdcblx0XHRAX2JvZHkgPSBvcHRpb25zLmJvZHkgPyAnQm9keSB0ZXh0IGdvZXMgaGVyZS4nXG5cdFx0QF9hY2NlcHRUZXh0ID0gb3B0aW9ucy5hY2NlcHRUZXh0ID8gJ2NvbmZpcm0nXG5cdFx0QF9hY2NlcHRBY3Rpb24gPSBvcHRpb25zLmFjY2VwdEFjdGlvbiA/IC0+IG51bGxcblx0XHRAX2RlY2xpbmVUZXh0ID0gb3B0aW9ucy5kZWNsaW5lVGV4dCA/ICcnXG5cdFx0QF9kZWNsaW5lQWN0aW9uID0gb3B0aW9ucy5kZWNsaW5lQWN0aW9uID8gLT4gbnVsbFxuXHRcdFxuXHRcdEBvbiBFdmVudHMuVGFwLCAoZXZlbnQpIC0+IGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXG5cdFx0XG5cdFx0QGNvbnRhaW5lciA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogJ2NvbnRhaW5lcicsIHBhcmVudDogQFxuXHRcdFx0eDogQWxpZ24uY2VudGVyXG5cdFx0XHRoZWlnaHQ6IDEyOCwgd2lkdGg6IFNjcmVlbi53aWR0aCAtIDgwXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFRoZW1lLmRpYWxvZy5iYWNrZ3JvdW5kQ29sb3Jcblx0XHRcdHNoYWRvd1g6IDAsIHNoYWRvd1k6IDcsIHNoYWRvd0JsdXI6IDMwXG5cdFx0XHRvcGFjaXR5OiAwXG5cdFx0XHRzaGFkb3dDb2xvcjogJ3JnYmEoMCwwLDAsLjMpJ1xuXHRcdFxuXHRcdEB0aXRsZSA9IG5ldyBUeXBlLlRpdGxlXG5cdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQGNvbnRhaW5lclxuXHRcdFx0eDogMjQsIHk6IDIwXG5cdFx0XHRmb250U2l6ZTogMTYsIGZvbnRXZWlnaHQ6IDUwMCwgY29sb3I6IFRoZW1lLnRleHQudGl0bGVcblx0XHRcdHRleHQ6IEBfdGl0bGVcblx0XHRcblx0XHRAYm9keSA9IG5ldyBUeXBlLlN1YmhlYWRcblx0XHRcdG5hbWU6ICdib2R5JywgcGFyZW50OiBAY29udGFpbmVyXG5cdFx0XHR4OiAyNCwgeTogNTJcblx0XHRcdHdpZHRoOiBAY29udGFpbmVyLndpZHRoIC0gNDJcblx0XHRcdHRleHQ6IEBfYm9keVxuXHRcdFxuXHRcdGJ1dHRvbnNZID0gaWYgQF9ib2R5IGlzICcnIHRoZW4gMTI4IGVsc2UgQGJvZHkubWF4WSArIDE2XG5cdFx0XG5cdFx0QGFjY2VwdCA9IG5ldyBCdXR0b25cblx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBAY29udGFpbmVyXG5cdFx0XHR4OiBBbGlnbi5yaWdodCgtMTYpLCB5OiBidXR0b25zWVxuXHRcdFx0dGV4dDogQF9hY2NlcHRUZXh0LnRvVXBwZXJDYXNlKClcblx0XHRcdGFjdGlvbjogQF9hY2NlcHRBY3Rpb25cblx0XHRcblx0XHRpZiBAX2RlY2xpbmVUZXh0IGlzbnQgJydcblx0XHRcdEBkZWNsaW5lID0gbmV3IEJ1dHRvblxuXHRcdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQGNvbnRhaW5lclxuXHRcdFx0XHR4OiAwLCB5OiBidXR0b25zWVxuXHRcdFx0XHR0ZXh0OiBAX2RlY2xpbmVUZXh0LnRvVXBwZXJDYXNlKClcblx0XHRcdFx0YWN0aW9uOiBAX2RlY2xpbmVBY3Rpb25cblxuXHRcdCMgc2V0IHBvc2l0aW9uc1xuXHRcdEBjb250YWluZXIuaGVpZ2h0ID0gQGFjY2VwdC5tYXhZICsgMTJcblx0XHRAZGVjbGluZT8ubWF4WCA9IEBhY2NlcHQueCAtIDE2XG5cdFx0QGNvbnRhaW5lci55ID0gQWxpZ24uY2VudGVyKDE2KVxuXHRcdFxuXHRcdCMgYWRkIGNsb3NlIGFjdGlvbnMgdG8gY29uZmlybSBhbmQgY2FuY2VsXG5cdFx0Zm9yIGJ1dHRvbiBpbiBbQGFjY2VwdCwgQGRlY2xpbmVdXG5cdFx0XHRidXR0b24/Lm9uVGFwIEBjbG9zZVxuXHRcdFxuXHRcdCMgT04gTE9BRFxuXHRcdEBvcGVuKClcblx0XG5cdG9wZW46ID0+XG5cdFx0QGFuaW1hdGVcblx0XHRcdG9wYWNpdHk6IDFcblx0XHRcdG9wdGlvbnM6IFxuXHRcdFx0XHR0aW1lOiAuMjVcblx0XHRcblx0XHRAY29udGFpbmVyLmFuaW1hdGVcblx0XHRcdG9wYWNpdHk6IDFcblx0XHRcdG9wdGlvbnM6XG5cdFx0XHRcdHRpbWU6IC4yNVxuXHRcdFx0XHRkZWxheTogLjA1XG5cblx0Y2xvc2U6ID0+XG5cdFx0QGNvbnRhaW5lci5hbmltYXRlXG5cdFx0XHRvcGFjaXR5OiAwXG5cdFx0XHRvcHRpb25zOlxuXHRcdFx0XHR0aW1lOiAuMjVcblx0XHRcblx0XHRAYW5pbWF0ZVxuXHRcdFx0b3BhY2l0eTogMFxuXHRcdFx0b3B0aW9uczpcblx0XHRcdFx0dGltZTogLjI1XG5cdFx0XG5cdFx0VXRpbHMuZGVsYXkgLjUsID0+IEBkZXN0cm95KCkiLCIjIFx0IGE4ODg4OGIuIGRQICAgICAgICAgICAgICAgICAgICAgICAgIGRQICAgICAgIGRQXG4jIFx0ZDgnICAgYDg4IDg4ICAgICAgICAgICAgICAgICAgICAgICAgIDg4ICAgICAgIDg4XG4jIFx0ODggICAgICAgIDg4ZDg4OGIuIC5kODg4OGIuIC5kODg4OGIuIDg4ICAuZFAgIDg4ZDg4OGIuIC5kODg4OGIuIGRQLiAgLmRQXG4jIFx0ODggICAgICAgIDg4JyAgYDg4IDg4b29vb2Q4IDg4JyAgYFwiXCIgODg4ODhcIiAgIDg4JyAgYDg4IDg4JyAgYDg4ICBgOGJkOCdcbiMgXHRZOC4gICAuODggODggICAgODggODguICAuLi4gODguICAuLi4gODggIGA4Yi4gODguICAuODggODguICAuODggIC5kODhiLlxuIyBcdCBZODg4ODhQJyBkUCAgICBkUCBgODg4ODhQJyBgODg4ODhQJyBkUCAgIGBZUCA4OFk4ODg4JyBgODg4ODhQJyBkUCcgIGBkUFxuXG5UeXBlID0gcmVxdWlyZSAnbWQtY29tcG9uZW50cy9UeXBlJ1xueyBSaXBwbGUgfSA9IHJlcXVpcmUgJ21kLWNvbXBvbmVudHMvUmlwcGxlJ1xueyBJY29uIH0gPSByZXF1aXJlICdtZC1jb21wb25lbnRzL0ljb24nXG57IFRoZW1lIH0gPSByZXF1aXJlICdtZC1jb21wb25lbnRzL1RoZW1lJ1xuXG5leHBvcnRzLkNoZWNrYm94ID0gQ2hlY2tCb3ggPSBjbGFzcyBDaGVja2JveCBleHRlbmRzIEljb25cblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cblx0XHRAX2lzT24gPSB1bmRlZmluZWRcblxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdG5hbWU6ICcuJ1xuXHRcdFx0YW5pbWF0aW9uT3B0aW9uczoge3RpbWU6IC4xNX1cblx0XHRcdGljb246ICdjaGVja2JveC1ibGFuay1vdXRsaW5lJ1xuXHRcdFx0Y29sb3I6ICdyZ2JhKDAsMCwwLC41NCknXG5cblx0XHRAaXNPbiA9IG9wdGlvbnMuaXNPbiA/IGZhbHNlXG5cdFx0QG9uVGFwIC0+IEBpc09uID0gIUBpc09uXG5cblx0QGRlZmluZSBcImlzT25cIixcblx0XHRnZXQ6IC0+IHJldHVybiBAX2lzT25cblx0XHRzZXQ6IChib29sKSAtPlxuXHRcdFx0cmV0dXJuIGlmIGJvb2wgaXMgQF9pc09uXG5cdFx0XHRcblx0XHRcdEBfaXNPbiA9IGJvb2xcblx0XHRcdEBlbWl0KFwiY2hhbmdlOmlzT25cIiwgQF9pc09uLCBAKVxuXHRcdFx0QHVwZGF0ZSgpXG5cblx0dXBkYXRlOiAtPlxuXHRcdGlmIEBfaXNPblxuXHRcdFx0QGljb24gPSAnY2hlY2tib3gtbWFya2VkJ1xuXHRcdFx0QGNvbG9yID0gVGhlbWUuY29sb3JzLnByaW1hcnkubWFpblxuXHRcdGVsc2UgXG5cdFx0XHRAaWNvbiA9ICdjaGVja2JveC1ibGFuay1vdXRsaW5lJ1xuXHRcdFx0QGNvbG9yID0gJ3JnYmEoMCwwLDAsLjU0KSciLCIjIFx0IDg4ODg4OGJhICAgICAgICAgICAgIGRQICAgICBkUFxuIyBcdCA4OCAgICBgOGIgICAgICAgICAgICA4OCAgICAgODhcbiMgXHRhODhhYWFhOFAnIGRQICAgIGRQIGQ4ODg4UCBkODg4OFAgLmQ4ODg4Yi4gODhkODg4Yi5cbiMgXHQgODggICBgOGIuIDg4ICAgIDg4ICAgODggICAgIDg4ICAgODgnICBgODggODgnICBgODhcbiMgXHQgODggICAgLjg4IDg4LiAgLjg4ICAgODggICAgIDg4ICAgODguICAuODggODggICAgODhcbiMgXHQgODg4ODg4ODhQIGA4ODg4OFAnICAgZFAgICAgIGRQICAgYDg4ODg4UCcgZFAgICAgZFBcblxuXG5UeXBlID0gcmVxdWlyZSAnbWQtY29tcG9uZW50cy9UeXBlJ1xueyBSaXBwbGUgfSA9IHJlcXVpcmUgJ21kLWNvbXBvbmVudHMvUmlwcGxlJ1xueyBJY29uIH0gPSByZXF1aXJlICdtZC1jb21wb25lbnRzL0ljb24nXG57IFRoZW1lIH0gPSByZXF1aXJlICdtZC1jb21wb25lbnRzL1RoZW1lJ1xuXG5leHBvcnRzLkJ1dHRvbiA9IGNsYXNzIEJ1dHRvbiBleHRlbmRzIExheWVyIFxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblxuXHRcdEBfcmFpc2VkID0gb3B0aW9ucy5yYWlzZWQgPyBmYWxzZVxuXHRcdEBfdHlwZSA9IGlmIEBfcmFpc2VkIHRoZW4gJ3JhaXNlZCcgZWxzZSAnZmxhdCdcblx0XHRAX2FjdGlvbiA9IG9wdGlvbnMuYWN0aW9uID8gLT4gbnVsbFxuXG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0bmFtZTogJy4nXG5cdFx0XHR3aWR0aDogMCwgaGVpZ2h0OiAzNlxuXHRcdFx0Ym9yZGVyUmFkaXVzOiAyXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFRoZW1lLmJ1dHRvbltAX3R5cGVdLmJhY2tncm91bmRDb2xvclxuXHRcdFx0c2hhZG93WTogVGhlbWUuYnV0dG9uW0BfdHlwZV0uc2hhZG93WVxuXHRcdFx0c2hhZG93Qmx1cjogVGhlbWUuYnV0dG9uW0BfdHlwZV0uc2hhZG93Qmx1clxuXHRcdFx0c2hhZG93Q29sb3I6IFRoZW1lLmJ1dHRvbltAX3R5cGVdLnNoYWRvd0NvbG9yXG5cdFx0XHRhbmltYXRpb25PcHRpb25zOiB7dGltZTogLjE1fVxuXG5cdFx0QGxhYmVsTGF5ZXIgPSBuZXcgVHlwZS5CdXR0b25cblx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBAXG5cdFx0XHRjb2xvcjogVGhlbWUuYnV0dG9uW0BfdHlwZV0uY29sb3Jcblx0XHRcdHRleHQ6IG9wdGlvbnMudGV4dCA/ICdidXR0b24nXG5cdFx0XHR0ZXh0VHJhbnNmb3JtOiAndXBwZXJjYXNlJ1xuXHRcdFx0dGV4dEFsaWduOiAnY2VudGVyJ1xuXHRcdFx0YW5pbWF0aW9uT3B0aW9uczoge3RpbWU6IC4xNX1cblx0XHRcdHBhZGRpbmc6IFxuXHRcdFx0XHRsZWZ0OiAxNi41LCByaWdodDogMTYuNVxuXHRcdFx0XHR0b3A6IDksIGJvdHRvbTogMTFcblxuXHRcdEBzaXplID0gQGxhYmVsTGF5ZXIuc2l6ZVxuXHRcdEB4ID0gb3B0aW9ucy54XG5cblx0XHRAb25Ub3VjaFN0YXJ0IChldmVudCkgLT4gXG5cdFx0XHRAc2hvd1RvdWNoZWQoKVxuXHRcdFx0VXRpbHMuZGVsYXkgMSwgPT4gQHJlc2V0KClcblx0XHRcblx0XHRAb25Ub3VjaEVuZCAoZXZlbnQpIC0+IFxuXHRcdFx0QF9hY3Rpb24oKVxuXHRcdFx0QHJlc2V0KClcblxuXG5cdHNob3dUb3VjaGVkOiAtPiBcblx0XHRAbGFiZWxMYXllci5hbmltYXRlIHticmlnaHRuZXNzOiAxMTAsIHNhdHVyYXRlOiAxMTB9XG5cdFx0XG5cdFx0c3dpdGNoIEBfdHlwZVxuXHRcdFx0d2hlbiAnZmxhdCcgdGhlbiBAYW5pbWF0ZSB7YmFja2dyb3VuZENvbG9yOiAncmdiYSgwLDAsMCwuMDUpJ31cblx0XHRcdHdoZW4gJ3JhaXNlZCdcblx0XHRcdFx0UmlwcGxlKEAsIGV2ZW50LnBvaW50LCBAbGFiZWxMYXllcilcblx0XHRcdFx0QGFuaW1hdGUge3NoYWRvd1k6IDMsIHNoYWRvd1NwcmVhZDogMX1cblxuXHRyZXNldDogLT5cblx0XHRAbGFiZWxMYXllci5hbmltYXRlIHticmlnaHRuZXNzOiAxMDAsIHNhdHVyYXRlOiAxMDB9XG5cdFx0QGJhY2tncm91bmRDb2xvciA9IFRoZW1lLmJ1dHRvbltAX3R5cGVdLmJhY2tncm91bmRDb2xvclxuXHRcdEBhbmltYXRlIFxuXHRcdFx0c2hhZG93WTogVGhlbWUuYnV0dG9uW0BfdHlwZV0uc2hhZG93WVxuXHRcdFx0c2hhZG93U3ByZWFkOiAwXG4iLCIjIFx0IDg4ODg4OGJhICAgICAgICAgICAgIGRQICAgICBkUCAgICAgICAgICAgICAgICAgICAgICAgODg4ODg4YmFcbiMgXHQgODggICAgYDhiICAgICAgICAgICAgODggICAgIDg4ICAgICAgICAgICAgICAgICAgICAgICA4OCAgICBgOGJcbiMgXHRhODhhYWFhOFAnIC5kODg4OGIuIGQ4ODg4UCBkODg4OFAgLmQ4ODg4Yi4gODhkOGIuZDhiLiA4OCAgICAgODggLmQ4ODg4Yi4gZFAgICAuZFBcbiMgXHQgODggICBgOGIuIDg4JyAgYDg4ICAgODggICAgIDg4ICAgODgnICBgODggODgnYDg4J2A4OCA4OCAgICAgODggODgnICBgODggODggICBkOCdcbiMgXHQgODggICAgLjg4IDg4LiAgLjg4ICAgODggICAgIDg4ICAgODguICAuODggODggIDg4ICA4OCA4OCAgICAgODggODguICAuODggODggLjg4J1xuIyBcdCA4ODg4ODg4OFAgYDg4ODg4UCcgICBkUCAgICAgZFAgICBgODg4ODhQJyBkUCAgZFAgIGRQIGRQICAgICBkUCBgODg4ODhQOCA4ODg4UCdcblxuVHlwZSA9IHJlcXVpcmUgJ21kLWNvbXBvbmVudHMvVHlwZSdcbnsgUmlwcGxlIH0gPSByZXF1aXJlICdtZC1jb21wb25lbnRzL1JpcHBsZSdcbnsgSWNvbiB9ID0gcmVxdWlyZSAnbWQtY29tcG9uZW50cy9JY29uJ1xueyBUaGVtZSB9ID0gcmVxdWlyZSAnbWQtY29tcG9uZW50cy9UaGVtZSdcblxuZXhwb3J0cy5Cb3R0b21OYXYgPSBjbGFzcyBCb3R0b21OYXYgZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblx0XHRcblx0XHRAX2Rlc3RpbmF0aW9ucyA9IG9wdGlvbnMuZGVzdGluYXRpb25zID8gdGhyb3cgJ05lZWRzIGF0IGxlYXN0IG9uZSBkZXN0aW5hdGlvbi4nXG5cdFx0QF9pdGVtcyA9IFtdXG5cdFx0QF9pbml0aWFsRGVzdGluYXRpb24gPSBvcHRpb25zLmluaXRpYWxEZXN0aW5hdGlvbiA/IHVuZGVmaW5lZFxuXHRcdCMgZGVzdGluYXRpb24gc2hvdWxkIGJlOiBbe25hbWU6IHN0cmluZywgaWNvbjogaWNvblN0cmluZywgYWN0aW9uOiBmdW5jdGlvbn1dXG5cdFx0QF9hY3RpdmVEZXN0aW5hdGlvbiA9IEBfaW5pdGlhbERlc3RpbmF0aW9uID8gQF9pdGVtc1swXVxuXHRcdEBfYXBwID0gb3B0aW9ucy5hcHBcblxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdG5hbWU6ICdCb3R0b20gTmF2J1xuXHRcdFx0eTogQWxpZ24uYm90dG9tXG5cdFx0XHR3aWR0aDogU2NyZWVuLndpZHRoLCBoZWlnaHQ6IDU2XG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFRoZW1lLmJvdHRvbU5hdi5iYWNrZ3JvdW5kQ29sb3Jcblx0XHRcdHNoYWRvd1k6IFRoZW1lLmJvdHRvbU5hdi5zaGFkb3dZXG5cdFx0XHRzaGFkb3dCbHVyOiBUaGVtZS5ib3R0b21OYXYuc2hhZG93Qmx1clxuXHRcdFx0c2hhZG93Q29sb3I6IFRoZW1lLmJvdHRvbU5hdi5zaGFkb3dDb2xvclxuXHRcdFx0Y2xpcDogdHJ1ZVxuXG5cblx0XHRmb3IgZGVzdGluYXRpb24sIGkgaW4gQF9kZXN0aW5hdGlvbnNcblx0XHRcdGl0ZW0gPSBuZXcgTGF5ZXJcblx0XHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEBcblx0XHRcdFx0eDogQHdpZHRoL0BfZGVzdGluYXRpb25zLmxlbmd0aCAqIGlcblx0XHRcdFx0d2lkdGg6IEB3aWR0aC9AX2Rlc3RpbmF0aW9ucy5sZW5ndGgsIGhlaWdodDogQGhlaWdodFxuXHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblxuXHRcdFx0aXRlbS5kaXNrID0gbmV3IExheWVyXG5cdFx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBpdGVtXG5cdFx0XHRcdHg6IEFsaWduLmNlbnRlciwgeTogQWxpZ24uY2VudGVyXG5cdFx0XHRcdGhlaWdodDogQGhlaWdodCAqIDEuNSwgd2lkdGg6IEBoZWlnaHQgKiAxLjUsIGJvcmRlclJhZGl1czogQGhlaWdodFxuXHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblxuXHRcdFx0aXRlbS5pY29uTGF5ZXIgPSBuZXcgSWNvblxuXHRcdFx0XHRuYW1lOiAnLicsIHBhcmVudDogaXRlbS5kaXNrXG5cdFx0XHRcdHg6IEFsaWduLmNlbnRlciwgeTogQWxpZ24uY2VudGVyKC04KVxuXHRcdFx0XHRpY29uOiBkZXN0aW5hdGlvbi5pY29uXG5cdFx0XHRcdGFuaW1hdGlvbk9wdGlvbnM6IHt0aW1lOiAuMTV9XG5cblx0XHRcdGl0ZW0ubGFiZWxMYXllciA9IG5ldyBUeXBlLkNhcHRpb25cblx0XHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IGl0ZW0uZGlza1xuXHRcdFx0XHR4OiBBbGlnbi5jZW50ZXIsIHk6IEFsaWduLmNlbnRlcigxNClcblx0XHRcdFx0d2lkdGg6IEB3aWR0aCwgdGV4dEFsaWduOiAnY2VudGVyJ1xuXHRcdFx0XHR0ZXh0OiBkZXN0aW5hdGlvbi50aXRsZVxuXHRcdFx0XHRhbmltYXRpb25PcHRpb25zOiB7dGltZTogLjE1fVxuXG5cdFx0XHRpdGVtLmFjdGlvbiA9IGRlc3RpbmF0aW9uLmFjdGlvblxuXG5cdFx0XHRpdGVtLmRpc2sub25Ub3VjaFN0YXJ0IChldmVudCkgLT4gXG5cdFx0XHRcdFJpcHBsZShALCBldmVudC5wb2ludCwgQHBhcmVudC5pY29uTGF5ZXIsIG5ldyBDb2xvcihUaGVtZS5wcmltYXJ5KS5hbHBoYSguMykpXG5cblx0XHRcdGl0ZW0ub25UYXAgLT4gQHBhcmVudC5hY3RpdmVEZXN0aW5hdGlvbiA9IEBcblxuXHRcdFx0QF9pdGVtcy5wdXNoKGl0ZW0pXG5cblx0XHRcdEBzaG93QWN0aXZlKEBfaXRlbXNbMF0pXG5cblx0QGRlZmluZSBcImFjdGl2ZURlc3RpbmF0aW9uXCIsXG5cdFx0Z2V0OiAtPiByZXR1cm4gQF9hY3RpdmVEZXN0aW5hdGlvblxuXHRcdHNldDogKGRlc3RpbmF0aW9uKSAtPlxuXHRcdFx0cmV0dXJuIGlmIGRlc3RpbmF0aW9uIGlzIEBfYWN0aXZlRGVzdGluYXRpb25cblx0XHRcdEBfYWN0aXZlRGVzdGluYXRpb24gPSBkZXN0aW5hdGlvblxuXG5cdFx0XHRAX2FjdGl2ZURlc3RpbmF0aW9uLmFjdGlvbigpXG5cdFx0XHRAc2hvd0FjdGl2ZShAX2FjdGl2ZURlc3RpbmF0aW9uKVxuXG5cdHNob3dBY3RpdmU6IChpdGVtKSAtPlxuXHRcdGl0ZW0ubGFiZWxMYXllci5hbmltYXRlIHtjb2xvcjogVGhlbWUucHJpbWFyeSwgb3BhY2l0eTogMX1cblx0XHRpdGVtLmljb25MYXllci5jb2xvciA9IFRoZW1lLnByaW1hcnlcblx0XHRcblx0XHRmb3Igc2liIGluIGl0ZW0uc2libGluZ3Ncblx0XHRcdHNpYi5sYWJlbExheWVyLmFuaW1hdGUge2NvbG9yOiAnIzc3Nyd9XG5cdFx0XHRzaWIuaWNvbkxheWVyLmNvbG9yID0gJyM3NzcnIiwiIyBcdCAuZDg4ODg4OFxuIyBcdGQ4JyAgICA4OFxuIyBcdDg4YWFhYWE4OGEgODhkODg4Yi4gODhkODg4Yi5cbiMgXHQ4OCAgICAgODggIDg4JyAgYDg4IDg4JyAgYDg4XG4jIFx0ODggICAgIDg4ICA4OC4gIC44OCA4OC4gIC44OFxuIyBcdDg4ICAgICA4OCAgODhZODg4UCcgODhZODg4UCdcbiMgXHQgICAgICAgICAgIDg4ICAgICAgIDg4XG4jIFx0ICAgICAgICAgICBkUCAgICAgICBkUFxuXG57IFRoZW1lIH0gPSByZXF1aXJlICdtZC1jb21wb25lbnRzL1RoZW1lJ1xueyBIZWFkZXIgfSA9IHJlcXVpcmUgJ21kLWNvbXBvbmVudHMvSGVhZGVyJ1xueyBCb3R0b21OYXYgfSA9IHJlcXVpcmUgJ21kLWNvbXBvbmVudHMvQm90dG9tTmF2J1xueyBNZW51T3ZlcmxheSB9ID0gcmVxdWlyZSAnbWQtY29tcG9uZW50cy9NZW51T3ZlcmxheSdcblxuZXhwb3J0cy5BcHAgPSBjbGFzcyBBcHAgZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblxuXHRcdEBfYm90dG9tTmF2ID0gb3B0aW9ucy5ib3R0b21OYXYgPyB1bmRlZmluZWRcblx0XHRAX21lbnVPdmVybGF5ID0gb3B0aW9ucy5tZW51T3ZlcmxheSA/IHVuZGVmaW5lZFxuXHRcdFxuXHRcdEBUaGVtZSA9IFRoZW1lXG5cdFx0QHZpZXdzID0gb3B0aW9ucy52aWV3cyA/IFtdXG5cdFx0QGN1cnJlbnQgPSB7aTogMH1cblx0XHRAbm90aWZpY2F0aW9ucyA9IFtdXG5cdFx0QGFjdGlvbkJ1dHRvbiA9IHVuZGVmaW5lZFxuXHRcdEBzbmFja2JhciA9IHVuZGVmaW5lZFxuXG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0bmFtZTogJ0FwcCdcblx0XHRcdHNpemU6IFNjcmVlbi5zaXplXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcdGluZGV4OiAxXG5cblx0XHQjIEhFQURFUlxuXG5cdFx0QGhlYWRlciA9IG5ldyBIZWFkZXJcblx0XHRcdFRoZW1lOiBUaGVtZVxuXHRcdFx0aW5kZXg6IDk5OVxuXG5cdFx0IyBGT09URVJcblxuXHRcdEBmb290ZXIgPSBuZXcgTGF5ZXJcblx0XHRcdG5hbWU6ICdGb290ZXInXG5cdFx0XHR3aWR0aDogU2NyZWVuLndpZHRoLCBoZWlnaHQ6IDQ4XG5cdFx0XHRpbWFnZTogVGhlbWUuZm9vdGVyLmltYWdlXG5cdFx0XHRpbmRleDogOTk5XG5cdFx0XHR5OiBBbGlnbi5ib3R0b20oKVxuXG5cdFx0aWYgQF9ib3R0b21OYXZcblx0XHRcdEBib3R0b21OYXYgPSBuZXcgQm90dG9tTmF2XG5cdFx0XHRcdG5hbWU6ICdCb3R0b20gTmF2J1xuXHRcdFx0XHRkZXN0aW5hdGlvbnM6IEBfYm90dG9tTmF2LmxpbmtzID8gXCJCb3R0b21OYXYgbmVlZHMgYW4gYXJyYXkgb2YgbGlua3MuIEV4YW1wbGU6IFt7dGl0bGU6ICdIb21lJywgaWNvbjogJ2hvbWUnLCBhY3Rpb246IC0+IHZpZXcubGlua1RvKGhvbWUpfV1cIlxuXHRcdFx0XHR5OiBpZiBAZm9vdGVyPyB0aGVuIEFsaWduLmJvdHRvbSgtQGZvb3Rlci5oZWlnaHQpIGVsc2UgQWxpZ24uYm90dG9tKClcblx0XHRcdFx0aW5kZXg6IDk5OFxuXG5cdFx0IyBNRU5VIE9WRVJMQVlcblx0XHRpZiBAX21lbnVPdmVybGF5XG5cdFx0XHRAbWVudU92ZXJsYXkgPSBuZXcgTWVudU92ZXJsYXlcblx0XHRcdFx0bmFtZTogJ01lbnUgT3ZlcmxheSdcblx0XHRcdFx0dGl0bGU6IEBfbWVudU92ZXJsYXkudGl0bGUgPyB0aHJvdyAnTWVudU92ZXJsYXkgbmVlZHMgYSB0aXRsZS4nXG5cdFx0XHRcdGxpbmtzOiBAX21lbnVPdmVybGF5LmxpbmtzID8gdGhyb3cgXCJNZW51T3ZlcmxheSBuZWVkcyBhbiBhcnJheSBvZiBsaW5rcy4gRXhhbXBsZTogW3t0aXRsZTogJ0hvbWUnLCBpY29uOiAnaG9tZScsIGFjdGlvbjogLT4gdmlldy5saW5rVG8oaG9tZSl9XVwiXG5cblxuXHRcdCMgS0VZQk9BUkRcblxuXHRcdEBrZXlib2FyZCA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogJ0tleWJvYXJkJ1xuXHRcdFx0eTogQG1heFksIGltYWdlOiBUaGVtZS5rZXlib2FyZC5pbWFnZVxuXHRcdFx0d2lkdGg6IEB3aWR0aCwgaGVpZ2h0OiAyMjJcblx0XHRcdGluZGV4OiAxMDAwXG5cdFx0XHRhbmltYXRpb25PcHRpb25zOlxuXHRcdFx0XHR0aW1lOiAuMjVcblxuXHRcdEBrZXlib2FyZC5vblRhcCA9PiBAaGlkZUtleWJvYXJkKClcblxuXHRcdGZvciB2aWV3LCBpIGluIEB2aWV3c1xuXHRcdFx0QGFkZFZpZXcodmlldywgaSlcblxuXHRcdEBjaGFuZ2VWaWV3KEB2aWV3c1swXSlcblxuXHRzaG93S2V5Ym9hcmQ6IC0+XG5cdFx0QGtleWJvYXJkLmFuaW1hdGVcblx0XHRcdHk6IEFsaWduLmJvdHRvbSgpXG5cdFx0QGtleWJvYXJkLmJyaW5nVG9Gcm9udCgpXG5cblx0aGlkZUtleWJvYXJkOiAtPlxuXHRcdEBrZXlib2FyZC5hbmltYXRlXG5cdFx0XHR5OiBAbWF4WVxuXG5cdGFkZFZpZXc6ICh2aWV3LCBpKSAtPlxuXHRcdHZpZXcuaSA9IGlcblx0XHR2aWV3LnBhcmVudCA9IEBcblx0XHR2aWV3LnkgPSBAaGVhZGVyLm1heFlcblx0XHR2aWV3LmhlaWdodCA9IFNjcmVlbi5oZWlnaHQgLSBAaGVhZGVyLmhlaWdodCAtIEBmb290ZXIuaGVpZ2h0XG5cblx0XHR2aWV3LmhvbWUgPSB2aWV3Lm5ld1BhZ2Vcblx0XHQgXHRuYW1lOiAnaG9tZSdcblx0XHQgXHRoZWFkZXI6XG5cdFx0XHQgXHR0aXRsZTogdmlldy5fdGl0bGVcblx0XHRcdCBcdGljb246IHZpZXcuX2ljb25cblx0XHRcdCBcdGljb25BY3Rpb246IHZpZXcuX2ljb25BY3Rpb25cblxuXHRcdHZpZXcuc2hvd05leHQodmlldy5ob21lKVxuXG5cdGNoYW5nZVZpZXc6ICh2aWV3KSAtPlxuXHRcdHJldHVybiBpZiB2aWV3IGlzIEBjdXJyZW50XG5cblx0XHRAaGVhZGVyLnRpdGxlID0gdmlldy5jdXJyZW50Ll9oZWFkZXI/LnRpdGxlID8gJ0RlZmF1bHQnXG5cdFx0QGhlYWRlci5pY29uID0gdmlldy5jdXJyZW50Ll9oZWFkZXI/Lmljb24gPyAnbWVudSdcblx0XHRAaGVhZGVyLmljb25BY3Rpb24gPSB2aWV3LmN1cnJlbnQuX2hlYWRlcj8uaWNvbkFjdGlvbiA/IC0+IGFwcC5zaG93TWVudSgpXG5cdFx0QGhlYWRlci52aXNpYmxlID0gdmlldy5jdXJyZW50Ll9oZWFkZXI/LnZpc2libGUgPyB0cnVlXG5cblx0XHRpZiB2aWV3LmkgPiBAY3VycmVudC5pXG5cdFx0XHR2aWV3LnggPSBTY3JlZW4ud2lkdGggXG5cdFx0XHRAY3VycmVudC5hbmltYXRlIHt4OiAtU2NyZWVuLndpZHRofVxuXHRcdGVsc2UgaWYgdmlldy5pIDwgQGN1cnJlbnQuaVxuXHRcdFx0dmlldy54ID0gLVNjcmVlbi53aWR0aFxuXHRcdFx0QGN1cnJlbnQuYW5pbWF0ZSB7eDogU2NyZWVuLndpZHRofVxuXG5cdFx0dmlldy5hbmltYXRlIHt4OiAwfVxuXHRcdHZpZXcuYnJpbmdUb0Zyb250KClcblx0XHRAY3VycmVudCA9IHZpZXdcblxuXHRzaG93TWVudTogLT5cblx0XHRAbWVudU92ZXJsYXkuc2hvdygpXG5cblx0aGlkZU1lbnU6IC0+XG5cdFx0QG1lbnVPdmVybGF5LmhpZGUoKVxuXG5cdGNoYW5nZVBhZ2U6IChwYWdlKSAtPlxuXHRcdEBoZWFkZXIudGl0bGUgPSBwYWdlLl9oZWFkZXIudGl0bGVcblx0XHRAaGVhZGVyLmljb24gPSBwYWdlLl9oZWFkZXIuaWNvblxuXHRcdEBoZWFkZXIuaWNvbkFjdGlvbiA9IHBhZ2UuX2hlYWRlci5pY29uQWN0aW9uXG5cdFx0QGhlYWRlci52aXNpYmxlID0gcGFnZS5faGVhZGVyLnZpc2libGVcblx0XHRwYWdlLl9vbkxvYWQoKVxuIiwiIyBcdCAuZDg4ODg4OCAgICAgICAgICAgICBkUCAgIG9vICAgICAgICAgICAgICAgICAgICA4ODg4ODhiYSAgICAgICAgICAgICBkUCAgICAgZFBcbiMgXHRkOCcgICAgODggICAgICAgICAgICAgODggICAgICAgICAgICAgICAgICAgICAgICAgODggICAgYDhiICAgICAgICAgICAgODggICAgIDg4XG4jIFx0ODhhYWFhYTg4YSAuZDg4ODhiLiBkODg4OFAgZFAgLmQ4ODg4Yi4gODhkODg4Yi4gYTg4YWFhYThQJyBkUCAgICBkUCBkODg4OFAgZDg4ODhQIC5kODg4OGIuIDg4ZDg4OGIuXG4jIFx0ODggICAgIDg4ICA4OCcgIGBcIlwiICAgODggICA4OCA4OCcgIGA4OCA4OCcgIGA4OCAgODggICBgOGIuIDg4ICAgIDg4ICAgODggICAgIDg4ICAgODgnICBgODggODgnICBgODhcbiMgXHQ4OCAgICAgODggIDg4LiAgLi4uICAgODggICA4OCA4OC4gIC44OCA4OCAgICA4OCAgODggICAgLjg4IDg4LiAgLjg4ICAgODggICAgIDg4ICAgODguICAuODggODggICAgODhcbiMgXHQ4OCAgICAgODggIGA4ODg4OFAnICAgZFAgICBkUCBgODg4ODhQJyBkUCAgICBkUCAgODg4ODg4ODhQIGA4ODg4OFAnICAgZFAgICAgIGRQICAgYDg4ODg4UCcgZFAgICAgZFBcblxuVHlwZSA9IHJlcXVpcmUgJ21kLWNvbXBvbmVudHMvVHlwZSdcbnsgUmlwcGxlIH0gPSByZXF1aXJlICdtZC1jb21wb25lbnRzL1JpcHBsZSdcbnsgSWNvbiB9ID0gcmVxdWlyZSAnbWQtY29tcG9uZW50cy9JY29uJ1xueyBUaGVtZSB9ID0gcmVxdWlyZSAnbWQtY29tcG9uZW50cy9UaGVtZSdcbnsgTWVudUJ1dHRvbiB9ID0gcmVxdWlyZSAnbWQtY29tcG9uZW50cy9NZW51QnV0dG9uJ1xuXG5leHBvcnRzLkFjdGlvbkJ1dHRvbiA9IGNsYXNzIEFjdGlvbkJ1dHRvbiBleHRlbmRzIExheWVyIFxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblxuXHRcdEBfcmFpc2VkID0gb3B0aW9ucy5yYWlzZWQgPyBmYWxzZVxuXHRcdEBfYWN0aW9uID0gb3B0aW9ucy5hY3Rpb24gPyAtPiBudWxsXG5cdFx0QF9pY29uID0gb3B0aW9ucy5pY29uID8gJ3BsdXMnXG5cdFx0QF9hcHAgPSBvcHRpb25zLmFwcFxuXG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0bmFtZTogJy4nXG5cdFx0XHR4OiBBbGlnbi5yaWdodCgtMTYpLCB5OiBBbGlnbi5ib3R0b20oLTE3KVxuXHRcdFx0d2lkdGg6IDY0LCBoZWlnaHQ6IDY0LCBib3JkZXJSYWRpdXM6IDMyXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFRoZW1lLmZhYi5iYWNrZ3JvdW5kQ29sb3Jcblx0XHRcdHNoYWRvd1k6IDIsIHNoYWRvd0JsdXI6IDNcblx0XHRcdHNoYWRvd0NvbG9yOiAncmdiYSgwLDAsMCwuMjUpJ1xuXHRcdFx0YW5pbWF0aW9uT3B0aW9uczoge3RpbWU6IC4xNX1cblxuXHRcdGlmIEBfYXBwP1xuXHRcdFx0aWYgQF9hcHAuYm90dG9tTmF2PyB0aGVuIEB5IC09IEBfYXBwLmJvdHRvbU5hdi5oZWlnaHRcblx0XHRcdEBfYXBwLmFjdGlvbkJ1dHRvbiA9IEBcblxuXHRcdEBpY29uTGF5ZXIgPSBuZXcgSWNvblxuXHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEBcblx0XHRcdHg6IEFsaWduLmNlbnRlciwgeTogQWxpZ24uY2VudGVyXG5cdFx0XHRpY29uOiBAX2ljb24sIGNvbG9yOiBUaGVtZS5mYWIuY29sb3JcblxuXHRcdEBvblRvdWNoU3RhcnQgKGV2ZW50KSAtPiBcblx0XHRcdEBzaG93VG91Y2hlZCgpXG5cdFx0XHRVdGlscy5kZWxheSAxLCA9PiBAcmVzZXQoKVxuXHRcdFxuXHRcdEBvblRvdWNoRW5kIChldmVudCkgLT4gXG5cdFx0XHRAX2FjdGlvbigpXG5cdFx0XHRAcmVzZXQoKVxuXG5cdHNob3dUb3VjaGVkOiAtPiBcblx0XHRSaXBwbGUoQCwgZXZlbnQucG9pbnQsIEBpY29uTGF5ZXIpXG5cdFx0QGFuaW1hdGUge3NoYWRvd1k6IDMsIHNoYWRvd1NwcmVhZDogMX1cblxuXHRyZXNldDogLT5cblx0XHRAYW5pbWF0ZSBcblx0XHRcdHNoYWRvd1k6IDJcblx0XHRcdHNoYWRvd1NwcmVhZDogMFxuIiwiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkEyQkFBO0FET0EsSUFBQSxtREFBQTtFQUFBOzs7QUFBQSxJQUFBLEdBQU8sT0FBQSxDQUFRLG9CQUFSOztBQUNMLFNBQVcsT0FBQSxDQUFRLHNCQUFSOztBQUNYLE9BQVMsT0FBQSxDQUFRLG9CQUFSOztBQUNULFFBQVUsT0FBQSxDQUFRLHFCQUFSOztBQUNWLGFBQWUsT0FBQSxDQUFRLDBCQUFSOztBQUVqQixPQUFPLENBQUMsWUFBUixHQUE2Qjs7O0VBQ2Ysc0JBQUMsT0FBRDtBQUVaLFFBQUE7O01BRmEsVUFBVTs7SUFFdkIsSUFBQyxDQUFBLE9BQUQsMENBQTRCO0lBQzVCLElBQUMsQ0FBQSxPQUFELDRDQUE0QixTQUFBO2FBQUc7SUFBSDtJQUM1QixJQUFDLENBQUEsS0FBRCwwQ0FBd0I7SUFDeEIsSUFBQyxDQUFBLElBQUQsR0FBUSxPQUFPLENBQUM7SUFFaEIsOENBQU0sQ0FBQyxDQUFDLFFBQUYsQ0FBVyxPQUFYLEVBQ0w7TUFBQSxJQUFBLEVBQU0sR0FBTjtNQUNBLENBQUEsRUFBRyxLQUFLLENBQUMsS0FBTixDQUFZLENBQUMsRUFBYixDQURIO01BQ3FCLENBQUEsRUFBRyxLQUFLLENBQUMsTUFBTixDQUFhLENBQUMsRUFBZCxDQUR4QjtNQUVBLEtBQUEsRUFBTyxFQUZQO01BRVcsTUFBQSxFQUFRLEVBRm5CO01BRXVCLFlBQUEsRUFBYyxFQUZyQztNQUdBLGVBQUEsRUFBaUIsS0FBSyxDQUFDLEdBQUcsQ0FBQyxlQUgzQjtNQUlBLE9BQUEsRUFBUyxDQUpUO01BSVksVUFBQSxFQUFZLENBSnhCO01BS0EsV0FBQSxFQUFhLGlCQUxiO01BTUEsZ0JBQUEsRUFBa0I7UUFBQyxJQUFBLEVBQU0sR0FBUDtPQU5sQjtLQURLLENBQU47SUFTQSxJQUFHLGlCQUFIO01BQ0MsSUFBRywyQkFBSDtRQUF5QixJQUFDLENBQUEsQ0FBRCxJQUFNLElBQUMsQ0FBQSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQS9DOztNQUNBLElBQUMsQ0FBQSxJQUFJLENBQUMsWUFBTixHQUFxQixLQUZ0Qjs7SUFJQSxJQUFDLENBQUEsU0FBRCxHQUFpQixJQUFBLElBQUEsQ0FDaEI7TUFBQSxJQUFBLEVBQU0sR0FBTjtNQUFXLE1BQUEsRUFBUSxJQUFuQjtNQUNBLENBQUEsRUFBRyxLQUFLLENBQUMsTUFEVDtNQUNpQixDQUFBLEVBQUcsS0FBSyxDQUFDLE1BRDFCO01BRUEsSUFBQSxFQUFNLElBQUMsQ0FBQSxLQUZQO01BRWMsS0FBQSxFQUFPLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FGL0I7S0FEZ0I7SUFLakIsSUFBQyxDQUFBLFlBQUQsQ0FBYyxTQUFDLEtBQUQ7TUFDYixJQUFDLENBQUEsV0FBRCxDQUFBO2FBQ0EsS0FBSyxDQUFDLEtBQU4sQ0FBWSxDQUFaLEVBQWUsQ0FBQSxTQUFBLEtBQUE7ZUFBQSxTQUFBO2lCQUFHLEtBQUMsQ0FBQSxLQUFELENBQUE7UUFBSDtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBZjtJQUZhLENBQWQ7SUFJQSxJQUFDLENBQUEsVUFBRCxDQUFZLFNBQUMsS0FBRDtNQUNYLElBQUMsQ0FBQSxPQUFELENBQUE7YUFDQSxJQUFDLENBQUEsS0FBRCxDQUFBO0lBRlcsQ0FBWjtFQTdCWTs7eUJBaUNiLFdBQUEsR0FBYSxTQUFBO0lBQ1osTUFBQSxDQUFPLElBQVAsRUFBVSxLQUFLLENBQUMsS0FBaEIsRUFBdUIsSUFBQyxDQUFBLFNBQXhCO1dBQ0EsSUFBQyxDQUFBLE9BQUQsQ0FBUztNQUFDLE9BQUEsRUFBUyxDQUFWO01BQWEsWUFBQSxFQUFjLENBQTNCO0tBQVQ7RUFGWTs7eUJBSWIsS0FBQSxHQUFPLFNBQUE7V0FDTixJQUFDLENBQUEsT0FBRCxDQUNDO01BQUEsT0FBQSxFQUFTLENBQVQ7TUFDQSxZQUFBLEVBQWMsQ0FEZDtLQUREO0VBRE07Ozs7R0F0QzBDOzs7O0FESmxELElBQUEsMENBQUE7RUFBQTs7O0FBQUUsUUFBVSxPQUFBLENBQVEscUJBQVI7O0FBQ1YsU0FBVyxPQUFBLENBQVEsc0JBQVI7O0FBQ1gsWUFBYyxPQUFBLENBQVEseUJBQVI7O0FBQ2QsY0FBZ0IsT0FBQSxDQUFRLDJCQUFSOztBQUVsQixPQUFPLENBQUMsR0FBUixHQUFvQjs7O0VBQ04sYUFBQyxPQUFEO0FBRVosUUFBQTs7TUFGYSxVQUFVOztJQUV2QixJQUFDLENBQUEsVUFBRCw2Q0FBa0M7SUFDbEMsSUFBQyxDQUFBLFlBQUQsaURBQXNDO0lBRXRDLElBQUMsQ0FBQSxLQUFELEdBQVM7SUFDVCxJQUFDLENBQUEsS0FBRCwyQ0FBeUI7SUFDekIsSUFBQyxDQUFBLE9BQUQsR0FBVztNQUFDLENBQUEsRUFBRyxDQUFKOztJQUNYLElBQUMsQ0FBQSxhQUFELEdBQWlCO0lBQ2pCLElBQUMsQ0FBQSxZQUFELEdBQWdCO0lBQ2hCLElBQUMsQ0FBQSxRQUFELEdBQVk7SUFFWixxQ0FBTSxDQUFDLENBQUMsUUFBRixDQUFXLE9BQVgsRUFDTDtNQUFBLElBQUEsRUFBTSxLQUFOO01BQ0EsSUFBQSxFQUFNLE1BQU0sQ0FBQyxJQURiO01BRUEsZUFBQSxFQUFpQixJQUZqQjtNQUdBLEtBQUEsRUFBTyxDQUhQO0tBREssQ0FBTjtJQVFBLElBQUMsQ0FBQSxNQUFELEdBQWMsSUFBQSxNQUFBLENBQ2I7TUFBQSxLQUFBLEVBQU8sS0FBUDtNQUNBLEtBQUEsRUFBTyxHQURQO0tBRGE7SUFNZCxJQUFDLENBQUEsTUFBRCxHQUFjLElBQUEsS0FBQSxDQUNiO01BQUEsSUFBQSxFQUFNLFFBQU47TUFDQSxLQUFBLEVBQU8sTUFBTSxDQUFDLEtBRGQ7TUFDcUIsTUFBQSxFQUFRLEVBRDdCO01BRUEsS0FBQSxFQUFPLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FGcEI7TUFHQSxLQUFBLEVBQU8sR0FIUDtNQUlBLENBQUEsRUFBRyxLQUFLLENBQUMsTUFBTixDQUFBLENBSkg7S0FEYTtJQU9kLElBQUcsSUFBQyxDQUFBLFVBQUo7TUFDQyxJQUFDLENBQUEsU0FBRCxHQUFpQixJQUFBLFNBQUEsQ0FDaEI7UUFBQSxJQUFBLEVBQU0sWUFBTjtRQUNBLFlBQUEsa0RBQWtDLDJHQURsQztRQUVBLENBQUEsRUFBTSxtQkFBSCxHQUFpQixLQUFLLENBQUMsTUFBTixDQUFhLENBQUMsSUFBQyxDQUFBLE1BQU0sQ0FBQyxNQUF0QixDQUFqQixHQUFvRCxLQUFLLENBQUMsTUFBTixDQUFBLENBRnZEO1FBR0EsS0FBQSxFQUFPLEdBSFA7T0FEZ0IsRUFEbEI7O0lBUUEsSUFBRyxJQUFDLENBQUEsWUFBSjtNQUNDLElBQUMsQ0FBQSxXQUFELEdBQW1CLElBQUEsV0FBQSxDQUNsQjtRQUFBLElBQUEsRUFBTSxjQUFOO1FBQ0EsS0FBQTs7OztBQUE2QixrQkFBTTs7cUJBRG5DO1FBRUEsS0FBQTs7OztBQUE2QixrQkFBTTs7cUJBRm5DO09BRGtCLEVBRHBCOztJQVNBLElBQUMsQ0FBQSxRQUFELEdBQWdCLElBQUEsS0FBQSxDQUNmO01BQUEsSUFBQSxFQUFNLFVBQU47TUFDQSxDQUFBLEVBQUcsSUFBQyxDQUFBLElBREo7TUFDVSxLQUFBLEVBQU8sS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQURoQztNQUVBLEtBQUEsRUFBTyxJQUFDLENBQUEsS0FGUjtNQUVlLE1BQUEsRUFBUSxHQUZ2QjtNQUdBLEtBQUEsRUFBTyxJQUhQO01BSUEsZ0JBQUEsRUFDQztRQUFBLElBQUEsRUFBTSxHQUFOO09BTEQ7S0FEZTtJQVFoQixJQUFDLENBQUEsUUFBUSxDQUFDLEtBQVYsQ0FBZ0IsQ0FBQSxTQUFBLEtBQUE7YUFBQSxTQUFBO2VBQUcsS0FBQyxDQUFBLFlBQUQsQ0FBQTtNQUFIO0lBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFoQjtBQUVBO0FBQUEsU0FBQSw4Q0FBQTs7TUFDQyxJQUFDLENBQUEsT0FBRCxDQUFTLElBQVQsRUFBZSxDQUFmO0FBREQ7SUFHQSxJQUFDLENBQUEsVUFBRCxDQUFZLElBQUMsQ0FBQSxLQUFNLENBQUEsQ0FBQSxDQUFuQjtFQS9EWTs7Z0JBaUViLFlBQUEsR0FBYyxTQUFBO0lBQ2IsSUFBQyxDQUFBLFFBQVEsQ0FBQyxPQUFWLENBQ0M7TUFBQSxDQUFBLEVBQUcsS0FBSyxDQUFDLE1BQU4sQ0FBQSxDQUFIO0tBREQ7V0FFQSxJQUFDLENBQUEsUUFBUSxDQUFDLFlBQVYsQ0FBQTtFQUhhOztnQkFLZCxZQUFBLEdBQWMsU0FBQTtXQUNiLElBQUMsQ0FBQSxRQUFRLENBQUMsT0FBVixDQUNDO01BQUEsQ0FBQSxFQUFHLElBQUMsQ0FBQSxJQUFKO0tBREQ7RUFEYTs7Z0JBSWQsT0FBQSxHQUFTLFNBQUMsSUFBRCxFQUFPLENBQVA7SUFDUixJQUFJLENBQUMsQ0FBTCxHQUFTO0lBQ1QsSUFBSSxDQUFDLE1BQUwsR0FBYztJQUNkLElBQUksQ0FBQyxDQUFMLEdBQVMsSUFBQyxDQUFBLE1BQU0sQ0FBQztJQUNqQixJQUFJLENBQUMsTUFBTCxHQUFjLE1BQU0sQ0FBQyxNQUFQLEdBQWdCLElBQUMsQ0FBQSxNQUFNLENBQUMsTUFBeEIsR0FBaUMsSUFBQyxDQUFBLE1BQU0sQ0FBQztJQUV2RCxJQUFJLENBQUMsSUFBTCxHQUFZLElBQUksQ0FBQyxPQUFMLENBQ1Y7TUFBQSxJQUFBLEVBQU0sTUFBTjtNQUNBLE1BQUEsRUFDQztRQUFBLEtBQUEsRUFBTyxJQUFJLENBQUMsTUFBWjtRQUNBLElBQUEsRUFBTSxJQUFJLENBQUMsS0FEWDtRQUVBLFVBQUEsRUFBWSxJQUFJLENBQUMsV0FGakI7T0FGRDtLQURVO1dBT1osSUFBSSxDQUFDLFFBQUwsQ0FBYyxJQUFJLENBQUMsSUFBbkI7RUFiUTs7Z0JBZVQsVUFBQSxHQUFZLFNBQUMsSUFBRDtBQUNYLFFBQUE7SUFBQSxJQUFVLElBQUEsS0FBUSxJQUFDLENBQUEsT0FBbkI7QUFBQSxhQUFBOztJQUVBLElBQUMsQ0FBQSxNQUFNLENBQUMsS0FBUix1RkFBOEM7SUFDOUMsSUFBQyxDQUFBLE1BQU0sQ0FBQyxJQUFSLHdGQUE0QztJQUM1QyxJQUFDLENBQUEsTUFBTSxDQUFDLFVBQVIsOEZBQXdELFNBQUE7YUFBRyxHQUFHLENBQUMsUUFBSixDQUFBO0lBQUg7SUFDeEQsSUFBQyxDQUFBLE1BQU0sQ0FBQyxPQUFSLDJGQUFrRDtJQUVsRCxJQUFHLElBQUksQ0FBQyxDQUFMLEdBQVMsSUFBQyxDQUFBLE9BQU8sQ0FBQyxDQUFyQjtNQUNDLElBQUksQ0FBQyxDQUFMLEdBQVMsTUFBTSxDQUFDO01BQ2hCLElBQUMsQ0FBQSxPQUFPLENBQUMsT0FBVCxDQUFpQjtRQUFDLENBQUEsRUFBRyxDQUFDLE1BQU0sQ0FBQyxLQUFaO09BQWpCLEVBRkQ7S0FBQSxNQUdLLElBQUcsSUFBSSxDQUFDLENBQUwsR0FBUyxJQUFDLENBQUEsT0FBTyxDQUFDLENBQXJCO01BQ0osSUFBSSxDQUFDLENBQUwsR0FBUyxDQUFDLE1BQU0sQ0FBQztNQUNqQixJQUFDLENBQUEsT0FBTyxDQUFDLE9BQVQsQ0FBaUI7UUFBQyxDQUFBLEVBQUcsTUFBTSxDQUFDLEtBQVg7T0FBakIsRUFGSTs7SUFJTCxJQUFJLENBQUMsT0FBTCxDQUFhO01BQUMsQ0FBQSxFQUFHLENBQUo7S0FBYjtJQUNBLElBQUksQ0FBQyxZQUFMLENBQUE7V0FDQSxJQUFDLENBQUEsT0FBRCxHQUFXO0VBakJBOztnQkFtQlosUUFBQSxHQUFVLFNBQUE7V0FDVCxJQUFDLENBQUEsV0FBVyxDQUFDLElBQWIsQ0FBQTtFQURTOztnQkFHVixRQUFBLEdBQVUsU0FBQTtXQUNULElBQUMsQ0FBQSxXQUFXLENBQUMsSUFBYixDQUFBO0VBRFM7O2dCQUdWLFVBQUEsR0FBWSxTQUFDLElBQUQ7SUFDWCxJQUFDLENBQUEsTUFBTSxDQUFDLEtBQVIsR0FBZ0IsSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUM3QixJQUFDLENBQUEsTUFBTSxDQUFDLElBQVIsR0FBZSxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQzVCLElBQUMsQ0FBQSxNQUFNLENBQUMsVUFBUixHQUFxQixJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ2xDLElBQUMsQ0FBQSxNQUFNLENBQUMsT0FBUixHQUFrQixJQUFJLENBQUMsT0FBTyxDQUFDO1dBQy9CLElBQUksQ0FBQyxPQUFMLENBQUE7RUFMVzs7OztHQW5IbUI7Ozs7QURQaEMsSUFBQSxvQ0FBQTtFQUFBOzs7QUFBQSxJQUFBLEdBQU8sT0FBQSxDQUFRLG9CQUFSOztBQUNMLFNBQVcsT0FBQSxDQUFRLHNCQUFSOztBQUNYLE9BQVMsT0FBQSxDQUFRLG9CQUFSOztBQUNULFFBQVUsT0FBQSxDQUFRLHFCQUFSOztBQUVaLE9BQU8sQ0FBQyxTQUFSLEdBQTBCOzs7RUFDWixtQkFBQyxPQUFEO0FBRVosUUFBQTs7TUFGYSxVQUFVOztJQUV2QixJQUFDLENBQUEsYUFBRDs7OztBQUF3QyxjQUFNOzs7SUFDOUMsSUFBQyxDQUFBLE1BQUQsR0FBVTtJQUNWLElBQUMsQ0FBQSxtQkFBRCx3REFBb0Q7SUFFcEQsSUFBQyxDQUFBLGtCQUFELHNEQUE2QyxJQUFDLENBQUEsTUFBTyxDQUFBLENBQUE7SUFDckQsSUFBQyxDQUFBLElBQUQsR0FBUSxPQUFPLENBQUM7SUFFaEIsMkNBQU0sQ0FBQyxDQUFDLFFBQUYsQ0FBVyxPQUFYLEVBQ0w7TUFBQSxJQUFBLEVBQU0sWUFBTjtNQUNBLENBQUEsRUFBRyxLQUFLLENBQUMsTUFEVDtNQUVBLEtBQUEsRUFBTyxNQUFNLENBQUMsS0FGZDtNQUVxQixNQUFBLEVBQVEsRUFGN0I7TUFHQSxlQUFBLEVBQWlCLEtBQUssQ0FBQyxTQUFTLENBQUMsZUFIakM7TUFJQSxPQUFBLEVBQVMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxPQUp6QjtNQUtBLFVBQUEsRUFBWSxLQUFLLENBQUMsU0FBUyxDQUFDLFVBTDVCO01BTUEsV0FBQSxFQUFhLEtBQUssQ0FBQyxTQUFTLENBQUMsV0FON0I7TUFPQSxJQUFBLEVBQU0sSUFQTjtLQURLLENBQU47QUFXQTtBQUFBLFNBQUEsOENBQUE7O01BQ0MsSUFBQSxHQUFXLElBQUEsS0FBQSxDQUNWO1FBQUEsSUFBQSxFQUFNLEdBQU47UUFBVyxNQUFBLEVBQVEsSUFBbkI7UUFDQSxDQUFBLEVBQUcsSUFBQyxDQUFBLEtBQUQsR0FBTyxJQUFDLENBQUEsYUFBYSxDQUFDLE1BQXRCLEdBQStCLENBRGxDO1FBRUEsS0FBQSxFQUFPLElBQUMsQ0FBQSxLQUFELEdBQU8sSUFBQyxDQUFBLGFBQWEsQ0FBQyxNQUY3QjtRQUVxQyxNQUFBLEVBQVEsSUFBQyxDQUFBLE1BRjlDO1FBR0EsZUFBQSxFQUFpQixJQUhqQjtPQURVO01BTVgsSUFBSSxDQUFDLElBQUwsR0FBZ0IsSUFBQSxLQUFBLENBQ2Y7UUFBQSxJQUFBLEVBQU0sR0FBTjtRQUFXLE1BQUEsRUFBUSxJQUFuQjtRQUNBLENBQUEsRUFBRyxLQUFLLENBQUMsTUFEVDtRQUNpQixDQUFBLEVBQUcsS0FBSyxDQUFDLE1BRDFCO1FBRUEsTUFBQSxFQUFRLElBQUMsQ0FBQSxNQUFELEdBQVUsR0FGbEI7UUFFdUIsS0FBQSxFQUFPLElBQUMsQ0FBQSxNQUFELEdBQVUsR0FGeEM7UUFFNkMsWUFBQSxFQUFjLElBQUMsQ0FBQSxNQUY1RDtRQUdBLGVBQUEsRUFBaUIsSUFIakI7T0FEZTtNQU1oQixJQUFJLENBQUMsU0FBTCxHQUFxQixJQUFBLElBQUEsQ0FDcEI7UUFBQSxJQUFBLEVBQU0sR0FBTjtRQUFXLE1BQUEsRUFBUSxJQUFJLENBQUMsSUFBeEI7UUFDQSxDQUFBLEVBQUcsS0FBSyxDQUFDLE1BRFQ7UUFDaUIsQ0FBQSxFQUFHLEtBQUssQ0FBQyxNQUFOLENBQWEsQ0FBQyxDQUFkLENBRHBCO1FBRUEsSUFBQSxFQUFNLFdBQVcsQ0FBQyxJQUZsQjtRQUdBLGdCQUFBLEVBQWtCO1VBQUMsSUFBQSxFQUFNLEdBQVA7U0FIbEI7T0FEb0I7TUFNckIsSUFBSSxDQUFDLFVBQUwsR0FBc0IsSUFBQSxJQUFJLENBQUMsT0FBTCxDQUNyQjtRQUFBLElBQUEsRUFBTSxHQUFOO1FBQVcsTUFBQSxFQUFRLElBQUksQ0FBQyxJQUF4QjtRQUNBLENBQUEsRUFBRyxLQUFLLENBQUMsTUFEVDtRQUNpQixDQUFBLEVBQUcsS0FBSyxDQUFDLE1BQU4sQ0FBYSxFQUFiLENBRHBCO1FBRUEsS0FBQSxFQUFPLElBQUMsQ0FBQSxLQUZSO1FBRWUsU0FBQSxFQUFXLFFBRjFCO1FBR0EsSUFBQSxFQUFNLFdBQVcsQ0FBQyxLQUhsQjtRQUlBLGdCQUFBLEVBQWtCO1VBQUMsSUFBQSxFQUFNLEdBQVA7U0FKbEI7T0FEcUI7TUFPdEIsSUFBSSxDQUFDLE1BQUwsR0FBYyxXQUFXLENBQUM7TUFFMUIsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFWLENBQXVCLFNBQUMsS0FBRDtlQUN0QixNQUFBLENBQU8sSUFBUCxFQUFVLEtBQUssQ0FBQyxLQUFoQixFQUF1QixJQUFDLENBQUEsTUFBTSxDQUFDLFNBQS9CLEVBQThDLElBQUEsS0FBQSxDQUFNLEtBQUssQ0FBQyxPQUFaLENBQW9CLENBQUMsS0FBckIsQ0FBMkIsRUFBM0IsQ0FBOUM7TUFEc0IsQ0FBdkI7TUFHQSxJQUFJLENBQUMsS0FBTCxDQUFXLFNBQUE7ZUFBRyxJQUFDLENBQUEsTUFBTSxDQUFDLGlCQUFSLEdBQTRCO01BQS9CLENBQVg7TUFFQSxJQUFDLENBQUEsTUFBTSxDQUFDLElBQVIsQ0FBYSxJQUFiO01BRUEsSUFBQyxDQUFBLFVBQUQsQ0FBWSxJQUFDLENBQUEsTUFBTyxDQUFBLENBQUEsQ0FBcEI7QUFuQ0Q7RUFwQlk7O0VBeURiLFNBQUMsQ0FBQSxNQUFELENBQVEsbUJBQVIsRUFDQztJQUFBLEdBQUEsRUFBSyxTQUFBO0FBQUcsYUFBTyxJQUFDLENBQUE7SUFBWCxDQUFMO0lBQ0EsR0FBQSxFQUFLLFNBQUMsV0FBRDtNQUNKLElBQVUsV0FBQSxLQUFlLElBQUMsQ0FBQSxrQkFBMUI7QUFBQSxlQUFBOztNQUNBLElBQUMsQ0FBQSxrQkFBRCxHQUFzQjtNQUV0QixJQUFDLENBQUEsa0JBQWtCLENBQUMsTUFBcEIsQ0FBQTthQUNBLElBQUMsQ0FBQSxVQUFELENBQVksSUFBQyxDQUFBLGtCQUFiO0lBTEksQ0FETDtHQUREOztzQkFTQSxVQUFBLEdBQVksU0FBQyxJQUFEO0FBQ1gsUUFBQTtJQUFBLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBaEIsQ0FBd0I7TUFBQyxLQUFBLEVBQU8sS0FBSyxDQUFDLE9BQWQ7TUFBdUIsT0FBQSxFQUFTLENBQWhDO0tBQXhCO0lBQ0EsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFmLEdBQXVCLEtBQUssQ0FBQztBQUU3QjtBQUFBO1NBQUEscUNBQUE7O01BQ0MsR0FBRyxDQUFDLFVBQVUsQ0FBQyxPQUFmLENBQXVCO1FBQUMsS0FBQSxFQUFPLE1BQVI7T0FBdkI7bUJBQ0EsR0FBRyxDQUFDLFNBQVMsQ0FBQyxLQUFkLEdBQXNCO0FBRnZCOztFQUpXOzs7O0dBbkUrQjs7OztBREo1QyxJQUFBLGlDQUFBO0VBQUE7OztBQUFBLElBQUEsR0FBTyxPQUFBLENBQVEsb0JBQVI7O0FBQ0wsU0FBVyxPQUFBLENBQVEsc0JBQVI7O0FBQ1gsT0FBUyxPQUFBLENBQVEsb0JBQVI7O0FBQ1QsUUFBVSxPQUFBLENBQVEscUJBQVI7O0FBRVosT0FBTyxDQUFDLE1BQVIsR0FBdUI7OztFQUNULGdCQUFDLE9BQUQ7QUFFWixRQUFBOztNQUZhLFVBQVU7O0lBRXZCLElBQUMsQ0FBQSxPQUFELDBDQUE0QjtJQUM1QixJQUFDLENBQUEsS0FBRCxHQUFZLElBQUMsQ0FBQSxPQUFKLEdBQWlCLFFBQWpCLEdBQStCO0lBQ3hDLElBQUMsQ0FBQSxPQUFELDRDQUE0QixTQUFBO2FBQUc7SUFBSDtJQUU1Qix3Q0FBTSxDQUFDLENBQUMsUUFBRixDQUFXLE9BQVgsRUFDTDtNQUFBLElBQUEsRUFBTSxHQUFOO01BQ0EsS0FBQSxFQUFPLENBRFA7TUFDVSxNQUFBLEVBQVEsRUFEbEI7TUFFQSxZQUFBLEVBQWMsQ0FGZDtNQUdBLGVBQUEsRUFBaUIsS0FBSyxDQUFDLE1BQU8sQ0FBQSxJQUFDLENBQUEsS0FBRCxDQUFPLENBQUMsZUFIdEM7TUFJQSxPQUFBLEVBQVMsS0FBSyxDQUFDLE1BQU8sQ0FBQSxJQUFDLENBQUEsS0FBRCxDQUFPLENBQUMsT0FKOUI7TUFLQSxVQUFBLEVBQVksS0FBSyxDQUFDLE1BQU8sQ0FBQSxJQUFDLENBQUEsS0FBRCxDQUFPLENBQUMsVUFMakM7TUFNQSxXQUFBLEVBQWEsS0FBSyxDQUFDLE1BQU8sQ0FBQSxJQUFDLENBQUEsS0FBRCxDQUFPLENBQUMsV0FObEM7TUFPQSxnQkFBQSxFQUFrQjtRQUFDLElBQUEsRUFBTSxHQUFQO09BUGxCO0tBREssQ0FBTjtJQVVBLElBQUMsQ0FBQSxVQUFELEdBQWtCLElBQUEsSUFBSSxDQUFDLE1BQUwsQ0FDakI7TUFBQSxJQUFBLEVBQU0sR0FBTjtNQUFXLE1BQUEsRUFBUSxJQUFuQjtNQUNBLEtBQUEsRUFBTyxLQUFLLENBQUMsTUFBTyxDQUFBLElBQUMsQ0FBQSxLQUFELENBQU8sQ0FBQyxLQUQ1QjtNQUVBLElBQUEseUNBQXFCLFFBRnJCO01BR0EsYUFBQSxFQUFlLFdBSGY7TUFJQSxTQUFBLEVBQVcsUUFKWDtNQUtBLGdCQUFBLEVBQWtCO1FBQUMsSUFBQSxFQUFNLEdBQVA7T0FMbEI7TUFNQSxPQUFBLEVBQ0M7UUFBQSxJQUFBLEVBQU0sSUFBTjtRQUFZLEtBQUEsRUFBTyxJQUFuQjtRQUNBLEdBQUEsRUFBSyxDQURMO1FBQ1EsTUFBQSxFQUFRLEVBRGhCO09BUEQ7S0FEaUI7SUFXbEIsSUFBQyxDQUFBLElBQUQsR0FBUSxJQUFDLENBQUEsVUFBVSxDQUFDO0lBQ3BCLElBQUMsQ0FBQSxDQUFELEdBQUssT0FBTyxDQUFDO0lBRWIsSUFBQyxDQUFBLFlBQUQsQ0FBYyxTQUFDLEtBQUQ7TUFDYixJQUFDLENBQUEsV0FBRCxDQUFBO2FBQ0EsS0FBSyxDQUFDLEtBQU4sQ0FBWSxDQUFaLEVBQWUsQ0FBQSxTQUFBLEtBQUE7ZUFBQSxTQUFBO2lCQUFHLEtBQUMsQ0FBQSxLQUFELENBQUE7UUFBSDtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBZjtJQUZhLENBQWQ7SUFJQSxJQUFDLENBQUEsVUFBRCxDQUFZLFNBQUMsS0FBRDtNQUNYLElBQUMsQ0FBQSxPQUFELENBQUE7YUFDQSxJQUFDLENBQUEsS0FBRCxDQUFBO0lBRlcsQ0FBWjtFQWxDWTs7bUJBdUNiLFdBQUEsR0FBYSxTQUFBO0lBQ1osSUFBQyxDQUFBLFVBQVUsQ0FBQyxPQUFaLENBQW9CO01BQUMsVUFBQSxFQUFZLEdBQWI7TUFBa0IsUUFBQSxFQUFVLEdBQTVCO0tBQXBCO0FBRUEsWUFBTyxJQUFDLENBQUEsS0FBUjtBQUFBLFdBQ00sTUFETjtlQUNrQixJQUFDLENBQUEsT0FBRCxDQUFTO1VBQUMsZUFBQSxFQUFpQixpQkFBbEI7U0FBVDtBQURsQixXQUVNLFFBRk47UUFHRSxNQUFBLENBQU8sSUFBUCxFQUFVLEtBQUssQ0FBQyxLQUFoQixFQUF1QixJQUFDLENBQUEsVUFBeEI7ZUFDQSxJQUFDLENBQUEsT0FBRCxDQUFTO1VBQUMsT0FBQSxFQUFTLENBQVY7VUFBYSxZQUFBLEVBQWMsQ0FBM0I7U0FBVDtBQUpGO0VBSFk7O21CQVNiLEtBQUEsR0FBTyxTQUFBO0lBQ04sSUFBQyxDQUFBLFVBQVUsQ0FBQyxPQUFaLENBQW9CO01BQUMsVUFBQSxFQUFZLEdBQWI7TUFBa0IsUUFBQSxFQUFVLEdBQTVCO0tBQXBCO0lBQ0EsSUFBQyxDQUFBLGVBQUQsR0FBbUIsS0FBSyxDQUFDLE1BQU8sQ0FBQSxJQUFDLENBQUEsS0FBRCxDQUFPLENBQUM7V0FDeEMsSUFBQyxDQUFBLE9BQUQsQ0FDQztNQUFBLE9BQUEsRUFBUyxLQUFLLENBQUMsTUFBTyxDQUFBLElBQUMsQ0FBQSxLQUFELENBQU8sQ0FBQyxPQUE5QjtNQUNBLFlBQUEsRUFBYyxDQURkO0tBREQ7RUFITTs7OztHQWpEOEI7Ozs7QUROdEMsSUFBQSw2Q0FBQTtFQUFBOzs7QUFBQSxJQUFBLEdBQU8sT0FBQSxDQUFRLG9CQUFSOztBQUNMLFNBQVcsT0FBQSxDQUFRLHNCQUFSOztBQUNYLE9BQVMsT0FBQSxDQUFRLG9CQUFSOztBQUNULFFBQVUsT0FBQSxDQUFRLHFCQUFSOztBQUVaLE9BQU8sQ0FBQyxRQUFSLEdBQW1CLFFBQUEsR0FBaUI7OztFQUN0QixrQkFBQyxPQUFEO0FBRVosUUFBQTs7TUFGYSxVQUFVOztJQUV2QixJQUFDLENBQUEsS0FBRCxHQUFTO0lBRVQsMENBQU0sQ0FBQyxDQUFDLFFBQUYsQ0FBVyxPQUFYLEVBQ0w7TUFBQSxJQUFBLEVBQU0sR0FBTjtNQUNBLGdCQUFBLEVBQWtCO1FBQUMsSUFBQSxFQUFNLEdBQVA7T0FEbEI7TUFFQSxJQUFBLEVBQU0sd0JBRk47TUFHQSxLQUFBLEVBQU8saUJBSFA7S0FESyxDQUFOO0lBTUEsSUFBQyxDQUFBLElBQUQsd0NBQXVCO0lBQ3ZCLElBQUMsQ0FBQSxLQUFELENBQU8sU0FBQTthQUFHLElBQUMsQ0FBQSxJQUFELEdBQVEsQ0FBQyxJQUFDLENBQUE7SUFBYixDQUFQO0VBWFk7O0VBYWIsUUFBQyxDQUFBLE1BQUQsQ0FBUSxNQUFSLEVBQ0M7SUFBQSxHQUFBLEVBQUssU0FBQTtBQUFHLGFBQU8sSUFBQyxDQUFBO0lBQVgsQ0FBTDtJQUNBLEdBQUEsRUFBSyxTQUFDLElBQUQ7TUFDSixJQUFVLElBQUEsS0FBUSxJQUFDLENBQUEsS0FBbkI7QUFBQSxlQUFBOztNQUVBLElBQUMsQ0FBQSxLQUFELEdBQVM7TUFDVCxJQUFDLENBQUEsSUFBRCxDQUFNLGFBQU4sRUFBcUIsSUFBQyxDQUFBLEtBQXRCLEVBQTZCLElBQTdCO2FBQ0EsSUFBQyxDQUFBLE1BQUQsQ0FBQTtJQUxJLENBREw7R0FERDs7cUJBU0EsTUFBQSxHQUFRLFNBQUE7SUFDUCxJQUFHLElBQUMsQ0FBQSxLQUFKO01BQ0MsSUFBQyxDQUFBLElBQUQsR0FBUTthQUNSLElBQUMsQ0FBQSxLQUFELEdBQVMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FGL0I7S0FBQSxNQUFBO01BSUMsSUFBQyxDQUFBLElBQUQsR0FBUTthQUNSLElBQUMsQ0FBQSxLQUFELEdBQVMsa0JBTFY7O0VBRE87Ozs7R0F2QjRDOzs7O0FESHJELElBQUEseUNBQUE7RUFBQTs7OztBQUFBLElBQUEsR0FBTyxPQUFBLENBQVEsb0JBQVI7O0FBQ0wsU0FBVyxPQUFBLENBQVEsc0JBQVI7O0FBQ1gsT0FBUyxPQUFBLENBQVEsb0JBQVI7O0FBQ1QsUUFBVSxPQUFBLENBQVEscUJBQVI7O0FBQ1YsU0FBVyxPQUFBLENBQVEsc0JBQVI7O0FBRWIsT0FBTyxDQUFDLE1BQVIsR0FBdUI7OztFQUNULGdCQUFDLE9BQUQ7QUFDWixRQUFBOztNQURhLFVBQVU7Ozs7SUFDdkIsd0NBQU0sQ0FBQyxDQUFDLFFBQUYsQ0FBVyxPQUFYLEVBQ0w7TUFBQSxJQUFBLEVBQU0sR0FBTjtNQUNBLElBQUEsRUFBTSxNQUFNLENBQUMsSUFEYjtNQUVBLGVBQUEsRUFBaUIsbUJBRmpCO01BR0EsT0FBQSxFQUFTLENBSFQ7S0FESyxDQUFOO0lBTUEsSUFBQyxDQUFBLE1BQUQseUNBQTBCO0lBQzFCLElBQUMsQ0FBQSxLQUFELDBDQUF3QjtJQUN4QixJQUFDLENBQUEsV0FBRCxnREFBb0M7SUFDcEMsSUFBQyxDQUFBLGFBQUQsa0RBQXdDLFNBQUE7YUFBRztJQUFIO0lBQ3hDLElBQUMsQ0FBQSxZQUFELGlEQUFzQztJQUN0QyxJQUFDLENBQUEsY0FBRCxtREFBMEMsU0FBQTthQUFHO0lBQUg7SUFFMUMsSUFBQyxDQUFBLEVBQUQsQ0FBSSxNQUFNLENBQUMsR0FBWCxFQUFnQixTQUFDLEtBQUQ7YUFBVyxLQUFLLENBQUMsZUFBTixDQUFBO0lBQVgsQ0FBaEI7SUFFQSxJQUFDLENBQUEsU0FBRCxHQUFpQixJQUFBLEtBQUEsQ0FDaEI7TUFBQSxJQUFBLEVBQU0sV0FBTjtNQUFtQixNQUFBLEVBQVEsSUFBM0I7TUFDQSxDQUFBLEVBQUcsS0FBSyxDQUFDLE1BRFQ7TUFFQSxNQUFBLEVBQVEsR0FGUjtNQUVhLEtBQUEsRUFBTyxNQUFNLENBQUMsS0FBUCxHQUFlLEVBRm5DO01BR0EsZUFBQSxFQUFpQixLQUFLLENBQUMsTUFBTSxDQUFDLGVBSDlCO01BSUEsT0FBQSxFQUFTLENBSlQ7TUFJWSxPQUFBLEVBQVMsQ0FKckI7TUFJd0IsVUFBQSxFQUFZLEVBSnBDO01BS0EsT0FBQSxFQUFTLENBTFQ7TUFNQSxXQUFBLEVBQWEsZ0JBTmI7S0FEZ0I7SUFTakIsSUFBQyxDQUFBLEtBQUQsR0FBYSxJQUFBLElBQUksQ0FBQyxLQUFMLENBQ1o7TUFBQSxJQUFBLEVBQU0sR0FBTjtNQUFXLE1BQUEsRUFBUSxJQUFDLENBQUEsU0FBcEI7TUFDQSxDQUFBLEVBQUcsRUFESDtNQUNPLENBQUEsRUFBRyxFQURWO01BRUEsUUFBQSxFQUFVLEVBRlY7TUFFYyxVQUFBLEVBQVksR0FGMUI7TUFFK0IsS0FBQSxFQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FGakQ7TUFHQSxJQUFBLEVBQU0sSUFBQyxDQUFBLE1BSFA7S0FEWTtJQU1iLElBQUMsQ0FBQSxJQUFELEdBQVksSUFBQSxJQUFJLENBQUMsT0FBTCxDQUNYO01BQUEsSUFBQSxFQUFNLE1BQU47TUFBYyxNQUFBLEVBQVEsSUFBQyxDQUFBLFNBQXZCO01BQ0EsQ0FBQSxFQUFHLEVBREg7TUFDTyxDQUFBLEVBQUcsRUFEVjtNQUVBLEtBQUEsRUFBTyxJQUFDLENBQUEsU0FBUyxDQUFDLEtBQVgsR0FBbUIsRUFGMUI7TUFHQSxJQUFBLEVBQU0sSUFBQyxDQUFBLEtBSFA7S0FEVztJQU1aLFFBQUEsR0FBYyxJQUFDLENBQUEsS0FBRCxLQUFVLEVBQWIsR0FBcUIsR0FBckIsR0FBOEIsSUFBQyxDQUFBLElBQUksQ0FBQyxJQUFOLEdBQWE7SUFFdEQsSUFBQyxDQUFBLE1BQUQsR0FBYyxJQUFBLE1BQUEsQ0FDYjtNQUFBLElBQUEsRUFBTSxHQUFOO01BQVcsTUFBQSxFQUFRLElBQUMsQ0FBQSxTQUFwQjtNQUNBLENBQUEsRUFBRyxLQUFLLENBQUMsS0FBTixDQUFZLENBQUMsRUFBYixDQURIO01BQ3FCLENBQUEsRUFBRyxRQUR4QjtNQUVBLElBQUEsRUFBTSxJQUFDLENBQUEsV0FBVyxDQUFDLFdBQWIsQ0FBQSxDQUZOO01BR0EsTUFBQSxFQUFRLElBQUMsQ0FBQSxhQUhUO0tBRGE7SUFNZCxJQUFHLElBQUMsQ0FBQSxZQUFELEtBQW1CLEVBQXRCO01BQ0MsSUFBQyxDQUFBLE9BQUQsR0FBZSxJQUFBLE1BQUEsQ0FDZDtRQUFBLElBQUEsRUFBTSxHQUFOO1FBQVcsTUFBQSxFQUFRLElBQUMsQ0FBQSxTQUFwQjtRQUNBLENBQUEsRUFBRyxDQURIO1FBQ00sQ0FBQSxFQUFHLFFBRFQ7UUFFQSxJQUFBLEVBQU0sSUFBQyxDQUFBLFlBQVksQ0FBQyxXQUFkLENBQUEsQ0FGTjtRQUdBLE1BQUEsRUFBUSxJQUFDLENBQUEsY0FIVDtPQURjLEVBRGhCOztJQVFBLElBQUMsQ0FBQSxTQUFTLENBQUMsTUFBWCxHQUFvQixJQUFDLENBQUEsTUFBTSxDQUFDLElBQVIsR0FBZTs7VUFDM0IsQ0FBRSxJQUFWLEdBQWlCLElBQUMsQ0FBQSxNQUFNLENBQUMsQ0FBUixHQUFZOztJQUM3QixJQUFDLENBQUEsU0FBUyxDQUFDLENBQVgsR0FBZSxLQUFLLENBQUMsTUFBTixDQUFhLEVBQWI7QUFHZjtBQUFBLFNBQUEsc0NBQUE7OztRQUNDLE1BQU0sQ0FBRSxLQUFSLENBQWMsSUFBQyxDQUFBLEtBQWY7O0FBREQ7SUFJQSxJQUFDLENBQUEsSUFBRCxDQUFBO0VBOURZOzttQkFnRWIsSUFBQSxHQUFNLFNBQUE7SUFDTCxJQUFDLENBQUEsT0FBRCxDQUNDO01BQUEsT0FBQSxFQUFTLENBQVQ7TUFDQSxPQUFBLEVBQ0M7UUFBQSxJQUFBLEVBQU0sR0FBTjtPQUZEO0tBREQ7V0FLQSxJQUFDLENBQUEsU0FBUyxDQUFDLE9BQVgsQ0FDQztNQUFBLE9BQUEsRUFBUyxDQUFUO01BQ0EsT0FBQSxFQUNDO1FBQUEsSUFBQSxFQUFNLEdBQU47UUFDQSxLQUFBLEVBQU8sR0FEUDtPQUZEO0tBREQ7RUFOSzs7bUJBWU4sS0FBQSxHQUFPLFNBQUE7SUFDTixJQUFDLENBQUEsU0FBUyxDQUFDLE9BQVgsQ0FDQztNQUFBLE9BQUEsRUFBUyxDQUFUO01BQ0EsT0FBQSxFQUNDO1FBQUEsSUFBQSxFQUFNLEdBQU47T0FGRDtLQUREO0lBS0EsSUFBQyxDQUFBLE9BQUQsQ0FDQztNQUFBLE9BQUEsRUFBUyxDQUFUO01BQ0EsT0FBQSxFQUNDO1FBQUEsSUFBQSxFQUFNLEdBQU47T0FGRDtLQUREO1dBS0EsS0FBSyxDQUFDLEtBQU4sQ0FBWSxFQUFaLEVBQWdCLENBQUEsU0FBQSxLQUFBO2FBQUEsU0FBQTtlQUFHLEtBQUMsQ0FBQSxPQUFELENBQUE7TUFBSDtJQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBaEI7RUFYTTs7OztHQTdFOEI7Ozs7QURSdEMsSUFBQSxjQUFBO0VBQUE7OztBQUFFLFFBQVUsT0FBQSxDQUFRLHFCQUFSOztBQUVaLE9BQU8sQ0FBQyxPQUFSLEdBQWtCLE9BQUEsR0FBZ0I7OztFQUNwQixpQkFBQyxPQUFEOztNQUFDLFVBQVU7O0lBQ3ZCLHlDQUFNLENBQUMsQ0FBQyxRQUFGLENBQVcsT0FBWCxFQUNMO01BQUEsSUFBQSxFQUFNLEdBQU47TUFDQSxLQUFBLEVBQU8sR0FEUDtNQUNZLE1BQUEsRUFBUSxDQURwQjtNQUVBLGVBQUEsRUFBaUIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxlQUYvQjtLQURLLENBQU47RUFEWTs7OztHQURvQzs7OztBRERsRCxJQUFBLG1DQUFBO0VBQUE7OztBQUFBLElBQUEsR0FBTyxPQUFBLENBQVEsb0JBQVI7O0FBQ0wsU0FBVyxPQUFBLENBQVEsc0JBQVI7O0FBQ1gsT0FBUyxPQUFBLENBQVEsb0JBQVI7O0FBQ1QsUUFBVSxPQUFBLENBQVEscUJBQVI7O0FBRVosT0FBTyxDQUFDLFFBQVIsR0FBeUI7OztFQUNYLGtCQUFDLE9BQUQ7QUFFWixRQUFBOztNQUZhLFVBQVU7O0lBRXZCLElBQUMsQ0FBQSxRQUFELDJDQUE4QjtJQUU5QiwwQ0FBTSxDQUFDLENBQUMsUUFBRixDQUFXLE9BQVgsRUFDTDtNQUFBLElBQUEsRUFBTSxHQUFOO01BQ0EsS0FBQSxFQUFPLE1BQU0sQ0FBQyxLQURkO01BRUEsZUFBQSxFQUFpQixJQUZqQjtLQURLLENBQU47SUFLQSxJQUFDLENBQUEsS0FBRCxHQUFTO0lBQ1QsSUFBQyxDQUFBLFNBQUQsR0FBYSxDQUFDLElBQUMsQ0FBQSxLQUFELEdBQVMsRUFBVixDQUFBLEdBQWdCLElBQUMsQ0FBQTtJQUM5QixJQUFDLENBQUEsVUFBRCxnREFBbUMsTUFBTSxDQUFDLEtBQVAsR0FBZSxJQUFDLENBQUE7RUFYdkM7O3FCQWFiLE9BQUEsR0FBUyxTQUFDLElBQUQ7QUFDUixRQUFBO0lBQUEsSUFBSSxDQUFDLENBQUwsR0FBUyxJQUFDLENBQUEsS0FBSyxDQUFDO0lBQ2hCLElBQUMsQ0FBQSxLQUFLLENBQUMsSUFBUCxDQUFZLElBQVo7SUFFQSxJQUFJLENBQUMsQ0FBTCxHQUFTLENBQUEsR0FBSSxDQUFDLElBQUMsQ0FBQSxTQUFELEdBQWEsQ0FBZCxDQUFBLEdBQW1CLENBQUMsSUFBSSxDQUFDLENBQUwsR0FBUyxJQUFDLENBQUEsUUFBWDtJQUNoQyxJQUFJLENBQUMsQ0FBTCxHQUFTLENBQUEsR0FBSSxDQUFDLElBQUMsQ0FBQSxVQUFELEdBQWMsQ0FBZixDQUFBLEdBQW9CLElBQUksQ0FBQyxLQUFMLENBQVcsSUFBSSxDQUFDLENBQUwsR0FBUyxJQUFDLENBQUEsUUFBckI7SUFFakMsSUFBQyxDQUFBLE1BQUQsR0FBVSxDQUFDLENBQUMsSUFBRixDQUFPLElBQUMsQ0FBQSxLQUFSLENBQWMsQ0FBQztJQUV6QixJQUFHLG9HQUFIO2FBQWtDLElBQUMsQ0FBQSxNQUFNLENBQUMsTUFBTSxDQUFDLGFBQWYsQ0FBQSxFQUFsQzs7RUFUUTs7cUJBV1QsVUFBQSxHQUFZLFNBQUMsSUFBRDtJQUNYLENBQUMsQ0FBQyxJQUFGLENBQU8sSUFBQyxDQUFBLEtBQVIsRUFBZSxJQUFmO0lBQ0EsSUFBSSxDQUFDLE9BQUwsQ0FBQTtXQUNBLElBQUMsQ0FBQSxlQUFELENBQUE7RUFIVzs7cUJBS1osZUFBQSxHQUFpQixTQUFBO0FBQ2hCLFFBQUE7QUFBQTtBQUFBLFNBQUEsNkNBQUE7O01BQ0MsSUFBSSxDQUFDLENBQUwsR0FBUztNQUNULElBQUksQ0FBQyxPQUFMLENBQ0M7UUFBQSxDQUFBLEVBQUcsQ0FBQSxHQUFJLENBQUMsSUFBQyxDQUFBLFNBQUQsR0FBYSxDQUFkLENBQUEsR0FBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBTCxHQUFTLElBQUMsQ0FBQSxRQUFYLENBQTFCO1FBQ0EsQ0FBQSxFQUFHLENBQUEsR0FBSSxDQUFDLElBQUMsQ0FBQSxVQUFELEdBQWMsQ0FBZixDQUFBLEdBQW9CLElBQUksQ0FBQyxLQUFMLENBQVcsSUFBSSxDQUFDLENBQUwsR0FBUyxJQUFDLENBQUEsUUFBckIsQ0FEM0I7T0FERDtBQUZEO0lBS0EsSUFBQyxDQUFBLE1BQUQsR0FBVSxDQUFDLENBQUMsSUFBRixDQUFPLElBQUMsQ0FBQSxLQUFSLENBQWMsQ0FBQztJQUV6QixJQUFHLHNHQUFIO2FBQWtDLElBQUMsQ0FBQSxNQUFNLENBQUMsTUFBTSxDQUFDLGFBQWYsQ0FBQSxFQUFsQzs7RUFSZ0I7Ozs7R0E5QndCOzs7O0FETjFDLElBQUEsNENBQUE7RUFBQTs7O0FBQUEsSUFBQSxHQUFPLE9BQUEsQ0FBUSxvQkFBUjs7QUFDTCxTQUFXLE9BQUEsQ0FBUSxzQkFBUjs7QUFDWCxPQUFTLE9BQUEsQ0FBUSxvQkFBUjs7QUFDVCxRQUFVLE9BQUEsQ0FBUSxxQkFBUjs7QUFDVixZQUFjLE9BQUEsQ0FBUSx5QkFBUjs7QUFFaEIsT0FBTyxDQUFDLE1BQVIsR0FBdUI7OztFQUNULGdCQUFDLE9BQUQ7QUFFWixRQUFBOztNQUZhLFVBQVU7O0lBRXZCLElBQUMsQ0FBQSxNQUFELEdBQVU7SUFDVixJQUFDLENBQUEsS0FBRCxHQUFTO0lBQ1QsSUFBQyxDQUFBLFdBQUQsOENBQW9DLFNBQUE7YUFBRztJQUFIO0lBRXBDLHdDQUFNLENBQUMsQ0FBQyxRQUFGLENBQVcsT0FBWCxFQUNMO01BQUEsSUFBQSxFQUFNLFFBQU47TUFDQSxLQUFBLEVBQU8sTUFBTSxDQUFDLEtBRGQ7TUFDcUIsTUFBQSxFQUFRLEVBRDdCO01BRUEsT0FBQSxFQUFTLENBRlQ7TUFFWSxVQUFBLEVBQVksQ0FGeEI7TUFFMkIsV0FBQSxFQUFhLGlCQUZ4QztNQUdBLGVBQUEsRUFBaUIsS0FBSyxDQUFDLE1BQU0sQ0FBQyxlQUg5QjtLQURLLENBQU47SUFRQSxJQUFDLENBQUEsVUFBRCxHQUFrQixJQUFBLElBQUksQ0FBQyxLQUFMLENBQ2pCO01BQUEsSUFBQSxFQUFNLEdBQU47TUFBVyxNQUFBLEVBQVEsSUFBbkI7TUFDQSxDQUFBLEVBQUcsRUFESDtNQUNPLENBQUEsRUFBRyxLQUFLLENBQUMsTUFBTixDQUFhLENBQUMsRUFBZCxDQURWO01BRUEsS0FBQSxFQUFPLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FGcEI7TUFHQSxJQUFBLHVDQUFlLFVBSGY7S0FEaUI7SUFNbEIsSUFBQyxDQUFBLEtBQUQsMkNBQXlCO0lBRXpCLElBQUMsQ0FBQSxTQUFELEdBQWlCLElBQUEsSUFBQSxDQUNoQjtNQUFBLElBQUEsRUFBTSxHQUFOO01BQVcsTUFBQSxFQUFRLElBQW5CO01BQ0EsQ0FBQSxFQUFHLEVBREg7TUFDTyxDQUFBLEVBQUcsS0FBSyxDQUFDLE1BQU4sQ0FBYSxFQUFiLENBRFY7TUFFQSxJQUFBLEVBQU0sTUFGTjtNQUVjLEtBQUEsRUFBTyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUZ2QztLQURnQjtJQUtqQixJQUFDLENBQUEsSUFBRCwwQ0FBdUI7SUFFdkIsSUFBQyxDQUFBLFNBQUQsR0FBaUIsSUFBQSxTQUFBLENBQ2hCO01BQUEsSUFBQSxFQUFNLEdBQU47TUFBVyxNQUFBLEVBQVEsSUFBbkI7S0FEZ0I7SUFHakIsSUFBQyxDQUFBLFNBQVMsQ0FBQyxLQUFYLENBQWlCLENBQUEsU0FBQSxLQUFBO2FBQUEsU0FBQTtlQUFHLEtBQUMsQ0FBQSxXQUFELENBQUE7TUFBSDtJQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBakI7SUFDQSxJQUFDLENBQUEsU0FBUyxDQUFDLFlBQVgsQ0FBd0IsQ0FBQSxTQUFBLEtBQUE7YUFBQSxTQUFDLEtBQUQ7ZUFBVyxNQUFBLENBQU8sS0FBUCxFQUFVLEtBQUssQ0FBQyxLQUFoQixFQUF1QixLQUFDLENBQUEsVUFBeEI7TUFBWDtJQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBeEI7RUFqQ1k7O0VBb0NiLE1BQUMsQ0FBQSxNQUFELENBQVEsT0FBUixFQUNDO0lBQUEsR0FBQSxFQUFLLFNBQUE7QUFBRyxhQUFPLElBQUMsQ0FBQTtJQUFYLENBQUw7SUFDQSxHQUFBLEVBQUssU0FBQyxTQUFEO01BQ0osSUFBQyxDQUFBLE1BQUQsR0FBVTthQUNWLElBQUMsQ0FBQSxVQUFVLENBQUMsV0FBWixDQUF3QixJQUFDLENBQUEsVUFBVSxDQUFDLElBQXBDLEVBQTBDLElBQUMsQ0FBQSxNQUEzQztJQUZJLENBREw7R0FERDs7RUFNQSxNQUFDLENBQUEsTUFBRCxDQUFRLE1BQVIsRUFDQztJQUFBLEdBQUEsRUFBSyxTQUFBO0FBQUcsYUFBTyxJQUFDLENBQUE7SUFBWCxDQUFMO0lBQ0EsR0FBQSxFQUFLLFNBQUMsUUFBRDtNQUNKLElBQUMsQ0FBQSxLQUFELEdBQVM7YUFDVCxJQUFDLENBQUEsU0FBUyxDQUFDLElBQVgsR0FBa0I7SUFGZCxDQURMO0dBREQ7O0VBTUEsTUFBQyxDQUFBLE1BQUQsQ0FBUSxXQUFSLEVBQ0M7SUFBQSxHQUFBLEVBQUssU0FBQTtBQUFHLGFBQU8sSUFBQyxDQUFBLEtBQUssQ0FBQztJQUFqQixDQUFMO0lBQ0EsR0FBQSxFQUFLLFNBQUMsS0FBRDthQUNKLElBQUMsQ0FBQSxTQUFTLENBQUMsS0FBWCxHQUFtQjtJQURmLENBREw7R0FERDs7RUFLQSxNQUFDLENBQUEsTUFBRCxDQUFRLFlBQVIsRUFDQztJQUFBLEdBQUEsRUFBSyxTQUFBO0FBQUcsYUFBTyxJQUFDLENBQUE7SUFBWCxDQUFMO0lBQ0EsR0FBQSxFQUFLLFNBQUMsTUFBRDthQUNKLElBQUMsQ0FBQSxXQUFELEdBQWU7SUFEWCxDQURMO0dBREQ7Ozs7R0F0RHFDOzs7O0FEdUN0QyxJQUFBLFdBQUE7RUFBQTs7O0FBQUEsS0FBQSxHQUFRLElBQUksQ0FBQyxLQUFMLENBQVcsS0FBSyxDQUFDLGVBQU4sQ0FBc0Isa0NBQXRCLENBQVg7O0FBRVIsT0FBTyxDQUFDLElBQVIsR0FBcUI7OztFQUNQLGNBQUMsT0FBRDtBQUVaLFFBQUE7O01BRmEsVUFBVTs7SUFFdkIsSUFBQyxDQUFBLEtBQUQsd0NBQXdCO0lBQ3hCLElBQUMsQ0FBQSxNQUFELDJDQUEwQjtJQUMxQixJQUFDLENBQUEsZ0JBQUQscURBQThDO0lBRTlDLHNDQUFNLENBQUMsQ0FBQyxRQUFGLENBQVcsT0FBWCxFQUNMO01BQUEsSUFBQSxFQUFNLEdBQU47TUFDQSxNQUFBLEVBQVEsRUFEUjtNQUNZLEtBQUEsRUFBTyxFQURuQjtNQUVBLGVBQUEsRUFBaUIsSUFBQyxDQUFBLGdCQUZsQjtLQURLLENBQU47RUFOWTs7RUFXYixJQUFDLENBQUEsTUFBRCxDQUFRLE1BQVIsRUFDQztJQUFBLEdBQUEsRUFBSyxTQUFBO0FBQUcsYUFBTyxJQUFDLENBQUE7SUFBWCxDQUFMO0lBQ0EsR0FBQSxFQUFLLFNBQUMsSUFBRDtBQUNKLFVBQUE7TUFBQSxJQUFDLENBQUEsS0FBRCxHQUFTO01BRVQsR0FBQTtRQUFNLElBQUcsS0FBTSxDQUFBLElBQUMsQ0FBQSxLQUFELENBQVQ7aUJBQXNCLHVFQUFBLEdBQXdFLEtBQU0sQ0FBQSxJQUFDLENBQUEsS0FBRCxDQUE5RSxHQUFzRixVQUF0RixHQUFnRyxJQUFDLENBQUEsTUFBakcsR0FBd0csWUFBOUg7U0FBQSxNQUFBO0FBQ0QsZ0JBQU0sZUFBQSxHQUFnQixJQUFoQixHQUFxQixnRkFEMUI7OzthQUdOLElBQUMsQ0FBQSxJQUFELEdBQVE7SUFOSixDQURMO0dBREQ7O0VBVUEsSUFBQyxDQUFBLE1BQUQsQ0FBUSxPQUFSLEVBQ0M7SUFBQSxHQUFBLEVBQUssU0FBQTtBQUFHLGFBQU8sSUFBQyxDQUFBO0lBQVgsQ0FBTDtJQUNBLEdBQUEsRUFBSyxTQUFDLEtBQUQ7QUFDSixVQUFBO01BQUEsSUFBQyxDQUFBLE1BQUQsR0FBYyxJQUFBLEtBQUEsQ0FBTSxLQUFOO01BRWQsR0FBQTtRQUFNLElBQUcsS0FBTSxDQUFBLElBQUMsQ0FBQSxLQUFELENBQVQ7aUJBQXNCLHVFQUFBLEdBQXdFLEtBQU0sQ0FBQSxJQUFDLENBQUEsS0FBRCxDQUE5RSxHQUFzRixVQUF0RixHQUFnRyxJQUFDLENBQUEsTUFBakcsR0FBd0csWUFBOUg7U0FBQSxNQUFBO0FBQ0QsZ0JBQU0sZUFBQSxHQUFnQixJQUFoQixHQUFxQixnRkFEMUI7OzthQUdOLElBQUMsQ0FBQSxJQUFELEdBQVE7SUFOSixDQURMO0dBREQ7Ozs7R0F0QmlDOzs7O0FEL0NsQyxJQUFBLHFDQUFBO0VBQUE7OztBQUFBLElBQUEsR0FBTyxPQUFBLENBQVEsb0JBQVI7O0FBQ0wsU0FBVyxPQUFBLENBQVEsc0JBQVI7O0FBQ1gsT0FBUyxPQUFBLENBQVEsb0JBQVI7O0FBQ1QsUUFBVSxPQUFBLENBQVEscUJBQVI7O0FBR1osT0FBTyxDQUFDLFVBQVIsR0FBMkI7OztFQUNiLG9CQUFDLE9BQUQ7QUFFWixRQUFBOztNQUZhLFVBQVU7O0lBRXZCLElBQUMsQ0FBQSxLQUFELHdDQUF3QjtJQUN4QixJQUFDLENBQUEsS0FBRCwwQ0FBd0I7SUFDeEIsSUFBQyxDQUFBLE9BQUQsNENBQTRCLFNBQUE7YUFBRztJQUFIO0lBRTVCLDRDQUFNLENBQUMsQ0FBQyxRQUFGLENBQVcsT0FBWCxFQUNMO01BQUEsTUFBQSxFQUFRLEVBQVI7TUFBWSxLQUFBLEVBQU8sR0FBbkI7TUFDQSxlQUFBLEVBQWlCLElBRGpCO0tBREssQ0FBTjtJQUlBLElBQUMsQ0FBQSxTQUFELEdBQWlCLElBQUEsSUFBQSxDQUNoQjtNQUFBLElBQUEsRUFBTSxHQUFOO01BQVcsTUFBQSxFQUFRLElBQW5CO01BQ0EsQ0FBQSxFQUFHLEtBQUssQ0FBQyxNQURUO01BRUEsSUFBQSxFQUFNLElBQUMsQ0FBQSxLQUZQO01BRWMsS0FBQSxFQUFPLEtBQUssQ0FBQyxXQUFXLENBQUMsSUFGdkM7S0FEZ0I7SUFLakIsSUFBQyxDQUFBLFVBQUQsR0FBa0IsSUFBQSxJQUFJLENBQUMsT0FBTCxDQUNqQjtNQUFBLElBQUEsRUFBTSxPQUFOO01BQWUsTUFBQSxFQUFRLElBQXZCO01BQ0EsQ0FBQSxFQUFHLElBQUMsQ0FBQSxTQUFTLENBQUMsSUFBWCxHQUFrQixFQURyQjtNQUVBLENBQUEsRUFBRyxLQUFLLENBQUMsTUFBTixDQUFBLENBRkg7TUFHQSxLQUFBLEVBQU8sS0FBSyxDQUFDLFdBQVcsQ0FBQyxJQUh6QjtNQUlBLElBQUEsRUFBTSxJQUFDLENBQUEsS0FKUDtLQURpQjtJQU9sQixJQUFDLENBQUEsS0FBRCxDQUFPLElBQUMsQ0FBQSxPQUFSO0lBQ0EsSUFBQyxDQUFBLEtBQUQsQ0FBTyxTQUFBO2FBQ04sS0FBSyxDQUFDLEtBQU4sQ0FBWSxHQUFaLEVBQWlCLENBQUEsU0FBQSxLQUFBO2VBQUEsU0FBQTtpQkFBRyxLQUFDLENBQUEsTUFBTSxDQUFDLElBQVIsQ0FBQTtRQUFIO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFqQjtJQURNLENBQVA7RUF2Qlk7Ozs7R0FEZ0M7Ozs7QURKOUMsSUFBQSxrREFBQTtFQUFBOzs7QUFBQSxJQUFBLEdBQU8sT0FBQSxDQUFRLG9CQUFSOztBQUNMLFNBQVcsT0FBQSxDQUFRLHNCQUFSOztBQUNYLE9BQVMsT0FBQSxDQUFRLG9CQUFSOztBQUNULFFBQVUsT0FBQSxDQUFRLHFCQUFSOztBQUNWLGFBQWUsT0FBQSxDQUFRLDBCQUFSOztBQUVqQixPQUFPLENBQUMsV0FBUixHQUE0Qjs7O0VBRWQscUJBQUMsT0FBRDtBQUVaLFFBQUE7O01BRmEsVUFBVTs7SUFFdkIsSUFBQyxDQUFBLE1BQUQseUNBQTBCO01BQUM7UUFBQyxLQUFBLEVBQU8sTUFBUjtRQUFnQixJQUFBLEVBQU0sTUFBdEI7UUFBOEIsTUFBQSxFQUFRLFNBQUE7aUJBQUc7UUFBSCxDQUF0QztPQUFEOztJQUMxQixJQUFDLENBQUEsTUFBRCwyQ0FBMEI7SUFDMUIsSUFBQyxDQUFBLE1BQUQsMkNBQTBCO0lBRzFCLDZDQUFNLENBQUMsQ0FBQyxRQUFGLENBQVcsT0FBWCxFQUNMO01BQUEsTUFBQSxFQUFRLE1BQU0sQ0FBQyxNQUFmO01BQ0EsS0FBQSxFQUFPLEdBRFA7TUFFQSxPQUFBLEVBQVMsS0FGVDtNQUdBLGVBQUEsRUFBaUIsS0FBSyxDQUFDLFdBQVcsQ0FBQyxlQUhuQztNQUlBLGdCQUFBLEVBQWtCO1FBQUMsS0FBQSxFQUFPLG9CQUFSO09BSmxCO0tBREssQ0FBTjtJQVFBLElBQUMsQ0FBQSxLQUFELEdBQWEsSUFBQSxLQUFBLENBQ1o7TUFBQSxJQUFBLEVBQU0sR0FBTjtNQUNBLElBQUEsRUFBTSxNQUFNLENBQUMsSUFEYjtNQUVBLGVBQUEsRUFBaUIsZ0JBRmpCO01BR0EsT0FBQSxFQUFTLENBSFQ7TUFJQSxPQUFBLEVBQVMsS0FKVDtNQUtBLGdCQUFBLEVBQ0M7UUFBQSxJQUFBLEVBQU0sR0FBTjtPQU5EO0tBRFk7SUFTYixJQUFDLENBQUEsS0FBSyxDQUFDLEtBQVAsQ0FBYSxDQUFBLFNBQUEsS0FBQTthQUFBLFNBQUE7ZUFBRyxLQUFDLENBQUEsSUFBRCxDQUFBO01BQUg7SUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQWI7SUFDQSxJQUFDLENBQUEsY0FBRCxDQUFnQixDQUFBLFNBQUEsS0FBQTthQUFBLFNBQUE7ZUFBRyxLQUFDLENBQUEsSUFBRCxDQUFBO01BQUg7SUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQWhCO0lBRUEsSUFBQyxDQUFBLE1BQUQsR0FBYyxJQUFBLEtBQUEsQ0FDYjtNQUFBLElBQUEsRUFBTSxHQUFOO01BQVcsTUFBQSxFQUFRLElBQW5CO01BQ0EsS0FBQSxFQUFPLElBQUMsQ0FBQSxLQURSO01BQ2UsTUFBQSxFQUFRLEdBRHZCO01BRUEsS0FBQSxFQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FGbEI7TUFHQSxlQUFBLEVBQWlCLEtBQUssQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLGVBSDFDO0tBRGE7SUFNZCxJQUFDLENBQUEsU0FBRCxHQUFpQixJQUFBLEtBQUEsQ0FDaEI7TUFBQSxJQUFBLEVBQU0sR0FBTjtNQUFXLE1BQUEsRUFBUSxJQUFDLENBQUEsTUFBcEI7TUFDQSxDQUFBLEVBQUcsRUFESDtNQUNPLENBQUEsRUFBRyxFQURWO01BRUEsTUFBQSxFQUFRLEVBRlI7TUFFWSxLQUFBLEVBQU8sRUFGbkI7TUFHQSxZQUFBLEVBQWMsRUFIZDtNQUlBLGVBQUEsRUFBaUIsS0FBSyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsSUFKMUM7S0FEZ0I7SUFPakIsSUFBQyxDQUFBLGVBQUQsR0FBdUIsSUFBQSxJQUFBLENBQ3RCO01BQUEsSUFBQSxFQUFNLEdBQU47TUFBVyxNQUFBLEVBQVEsSUFBQyxDQUFBLE1BQXBCO01BQ0EsQ0FBQSxFQUFHLEtBQUssQ0FBQyxLQUFOLENBQVksQ0FBQyxFQUFiLENBREg7TUFFQSxDQUFBLEVBQUcsS0FBSyxDQUFDLE1BQU4sQ0FBYSxDQUFDLEVBQWQsQ0FGSDtNQUdBLElBQUEsRUFBTSxXQUhOO01BSUEsS0FBQSxFQUFPLEtBQUssQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLElBSm5DO0tBRHNCO0lBT3ZCLElBQUMsQ0FBQSxTQUFELEdBQWlCLElBQUEsSUFBSSxDQUFDLEtBQUwsQ0FDaEI7TUFBQSxJQUFBLEVBQU0sR0FBTjtNQUFXLE1BQUEsRUFBUSxJQUFDLENBQUEsTUFBcEI7TUFDQSxLQUFBLEVBQU8sSUFBQyxDQUFBLEtBRFI7TUFFQSxDQUFBLEVBQUcsRUFGSDtNQUVPLENBQUEsRUFBRyxLQUFLLENBQUMsTUFBTixDQUFhLENBQUMsRUFBZCxDQUZWO01BR0EsSUFBQSxFQUFNLElBQUMsQ0FBQSxNQUhQO01BSUEsS0FBQSxFQUFPLEtBQUssQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLElBSm5DO0tBRGdCO0lBT2pCLEtBQUEsR0FBUTtBQUVSO0FBQUEsU0FBQSw4Q0FBQTs7TUFDQyxLQUFNLENBQUEsQ0FBQSxDQUFOLEdBQWUsSUFBQSxVQUFBLENBQ2Q7UUFBQSxJQUFBLEVBQU0sR0FBTjtRQUFXLE1BQUEsRUFBUSxJQUFuQjtRQUNBLENBQUEsRUFBRyxFQURIO1FBQ08sQ0FBQSxFQUFHLEdBQUEsR0FBTSxDQUFDLEVBQUEsR0FBSyxDQUFOLENBRGhCO1FBRUEsSUFBQSxFQUFNLElBQUksQ0FBQyxLQUZYO1FBR0EsSUFBQSxFQUFNLElBQUksQ0FBQyxJQUhYO1FBSUEsTUFBQSxFQUFRLElBQUksQ0FBQyxNQUpiO09BRGM7QUFEaEI7RUF4RFk7O3dCQWdFYixJQUFBLEdBQU0sU0FBQTtJQUNMLElBQUMsQ0FBQSxZQUFELENBQUE7SUFDQSxJQUFDLENBQUEsT0FBRCxHQUFXO0lBQ1gsSUFBQyxDQUFBLENBQUQsR0FBSyxDQUFDLE1BQU0sQ0FBQztJQUNiLElBQUMsQ0FBQSxPQUFELENBQ0M7TUFBQSxDQUFBLEVBQUcsQ0FBSDtLQUREO0lBR0EsSUFBQyxDQUFBLEtBQUssQ0FBQyxXQUFQLENBQW1CLElBQW5CO0lBQ0EsSUFBQyxDQUFBLEtBQUssQ0FBQyxPQUFQLEdBQWlCO1dBQ2pCLElBQUMsQ0FBQSxLQUFLLENBQUMsT0FBUCxDQUNDO01BQUEsT0FBQSxFQUFTLENBQVQ7S0FERDtFQVRLOzt3QkFZTixJQUFBLEdBQU0sU0FBQTtJQUNMLElBQUMsQ0FBQSxPQUFELENBQ0M7TUFBQSxDQUFBLEVBQUcsQ0FBQyxNQUFNLENBQUMsS0FBWDtLQUREO0lBR0EsSUFBQyxDQUFBLEtBQUssQ0FBQyxPQUFQLENBQ0M7TUFBQSxPQUFBLEVBQVMsQ0FBVDtLQUREO1dBR0EsS0FBSyxDQUFDLEtBQU4sQ0FBWSxFQUFaLEVBQWdCLENBQUEsU0FBQSxLQUFBO2FBQUEsU0FBQTtRQUNmLEtBQUMsQ0FBQSxPQUFELEdBQVc7UUFDWCxLQUFDLENBQUEsS0FBSyxDQUFDLE9BQVAsR0FBaUI7UUFDakIsS0FBQyxDQUFBLFVBQUQsQ0FBQTtlQUNBLEtBQUMsQ0FBQSxLQUFLLENBQUMsVUFBUCxDQUFBO01BSmU7SUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQWhCO0VBUEs7Ozs7R0E5RXlDOzs7O0FESmhELElBQUEsZ0RBQUE7RUFBQTs7OztBQUFBLElBQUEsR0FBTyxPQUFBLENBQVEsb0JBQVI7O0FBQ0wsU0FBVyxPQUFBLENBQVEsc0JBQVI7O0FBQ1gsT0FBUyxPQUFBLENBQVEsb0JBQVI7O0FBQ1QsUUFBVSxPQUFBLENBQVEscUJBQVI7O0FBQ1YsVUFBWSxPQUFBLENBQVEsdUJBQVI7O0FBRWQsT0FBTyxDQUFDLFlBQVIsR0FBdUIsWUFBQSxHQUFxQjs7O0VBQzlCLHNCQUFDLE9BQUQ7QUFFWixRQUFBOztNQUZhLFVBQVU7Ozs7SUFFdkIsSUFBQyxDQUFBLE1BQUQseUNBQTBCO0lBQzFCLElBQUMsQ0FBQSxLQUFELDBDQUF3QjtJQUN4QixJQUFDLENBQUEsS0FBRCwwQ0FBd0I7SUFDeEIsSUFBQyxDQUFBLFVBQUQsK0NBQWtDLEtBQUssQ0FBQyxJQUFJLENBQUM7SUFDN0MsSUFBQyxDQUFBLG9CQUFELHlEQUFzRCxLQUFLLENBQUM7SUFDNUQsSUFBQyxDQUFBLEtBQUQsMENBQTRCLElBQUEsSUFBQSxDQUFBO0lBRTVCLElBQUMsQ0FBQSxRQUFELEdBQVksT0FBTyxDQUFDO0lBQ3BCLElBQUMsQ0FBQSxRQUFELEdBQVksT0FBTyxDQUFDO0lBQ3BCLElBQUMsQ0FBQSxRQUFELDZDQUE4QjtJQUM5QixJQUFDLENBQUEsSUFBRCxHQUFRLE9BQU8sQ0FBQztJQUloQixLQUFBLEdBQVE7SUFDUixJQUFHLGlCQUFIO01BQ0MsS0FBQSxHQUFXLElBQUMsQ0FBQSxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQXBCLEdBQTZCLENBQWhDLEdBQXVDLENBQUMsQ0FBQyxJQUFGLENBQU8sSUFBQyxDQUFBLElBQUksQ0FBQyxhQUFiLENBQTJCLENBQUMsSUFBNUIsR0FBbUMsQ0FBMUUsR0FBaUYsSUFBQyxDQUFBLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBYixHQUFvQjtNQUM3RyxJQUFDLENBQUEsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFwQixDQUF5QixJQUF6QixFQUZEOztJQUlBLDhDQUFNLENBQUMsQ0FBQyxRQUFGLENBQVcsT0FBWCxFQUNMO01BQUEsSUFBQSx5Q0FBcUIsR0FBckI7TUFDQSxLQUFBLEVBQU8sR0FEUDtNQUNZLFlBQUEsRUFBYyxDQUQxQjtNQUVBLENBQUEsRUFBRyxLQUFLLENBQUMsTUFGVDtNQUVpQixDQUFBLGtCQUFHLFFBQVEsQ0FGNUI7TUFHQSxlQUFBLEVBQWlCLEtBQUssQ0FBQyxNQUFNLENBQUMsZUFIOUI7TUFJQSxPQUFBLEVBQVMsQ0FKVDtNQUlZLE9BQUEsRUFBUyxDQUpyQjtNQUl3QixVQUFBLEVBQVksQ0FKcEM7TUFLQSxPQUFBLEVBQVMsQ0FMVDtNQUtZLFdBQUEsRUFBYSxnQkFMekI7TUFNQSxnQkFBQSxFQUFrQjtRQUFDLElBQUEsRUFBTSxHQUFQO09BTmxCO0tBREssQ0FBTjtJQVNBLElBQUMsQ0FBQSxTQUFELEdBQWlCLElBQUEsS0FBQSxDQUNoQjtNQUFBLElBQUEsRUFBTSxnQkFBTjtNQUNBLE1BQUEsRUFBUSxJQURSO01BRUEsQ0FBQSxFQUFHLEVBRkg7TUFFTyxDQUFBLEVBQUcsRUFGVjtNQUdBLE1BQUEsRUFBUSxFQUhSO01BR1ksS0FBQSxFQUFPLEVBSG5CO01BR3VCLFlBQUEsRUFBYyxFQUhyQztNQUlBLGVBQUEsRUFBaUIsSUFBQyxDQUFBLG9CQUpsQjtLQURnQjtJQU9qQixJQUFHLElBQUMsQ0FBQSxLQUFKO01BQ0MsSUFBQyxDQUFBLElBQUQsR0FBWSxJQUFBLElBQUEsQ0FDWDtRQUFBLElBQUEsRUFBTSxNQUFOO1FBQ0EsTUFBQSxFQUFRLElBQUMsQ0FBQSxTQURUO1FBRUEsQ0FBQSxFQUFHLEtBQUssQ0FBQyxNQUZUO1FBRWlCLENBQUEsRUFBRyxLQUFLLENBQUMsTUFGMUI7UUFHQSxLQUFBLEVBQU8sSUFBQyxDQUFBLFVBSFI7UUFJQSxJQUFBLEVBQU0sSUFBQyxDQUFBLEtBSlA7T0FEVyxFQURiOztJQVFBLElBQUMsQ0FBQSxLQUFELEdBQWEsSUFBQSxJQUFJLENBQUMsT0FBTCxDQUNaO01BQUEsSUFBQSxFQUFNLE9BQU47TUFDQSxNQUFBLEVBQVEsSUFEUjtNQUVBLENBQUEsRUFBRyxFQUZIO01BRU8sQ0FBQSxFQUFHLENBRlY7TUFHQSxLQUFBLEVBQU8sSUFBQyxDQUFBLEtBQUQsR0FBUyxFQUhoQjtNQUlBLEtBQUEsRUFBTyxpQkFKUDtNQUtBLElBQUEsRUFBTSxJQUFDLENBQUEsTUFMUDtLQURZO0lBUWIsSUFBQyxDQUFBLElBQUQsR0FBWSxJQUFBLElBQUksQ0FBQyxLQUFMLENBQ1g7TUFBQSxJQUFBLEVBQU0sTUFBTjtNQUNBLE1BQUEsRUFBUSxJQURSO01BRUEsQ0FBQSxFQUFHLEVBRkg7TUFFTyxDQUFBLEVBQUcsSUFBQyxDQUFBLEtBQUssQ0FBQyxJQUZqQjtNQUdBLEtBQUEsRUFBTyxJQUFDLENBQUEsS0FBRCxHQUFTLEVBSGhCO01BSUEsSUFBQSxFQUFNLElBQUMsQ0FBQSxLQUpQO0tBRFc7SUFPWixJQUFDLENBQUEsSUFBRCxHQUFZLElBQUEsSUFBSSxDQUFDLE9BQUwsQ0FDWDtNQUFBLElBQUEsRUFBTSxNQUFOO01BQ0EsTUFBQSxFQUFRLElBRFI7TUFFQSxDQUFBLEVBQUcsS0FBSyxDQUFDLEtBQU4sQ0FBWSxDQUFDLENBQWIsQ0FGSDtNQUVvQixDQUFBLEVBQUcsRUFGdkI7TUFHQSxJQUFBLEVBQU0sSUFBQyxDQUFBLEtBQUssQ0FBQyxrQkFBUCxDQUEwQixFQUExQixFQUE4QjtRQUFBLElBQUEsRUFBTSxTQUFOO1FBQWlCLE1BQUEsRUFBUSxTQUF6QjtPQUE5QixDQUhOO0tBRFc7SUFNWixJQUFDLENBQUEsTUFBRCxHQUFVLENBQUMsQ0FBQyxLQUFGLENBQVEsSUFBQyxDQUFBLElBQUksQ0FBQyxJQUFOLEdBQWEsRUFBckIsRUFBeUIsRUFBekIsRUFBNkIsS0FBN0I7SUFFVixJQUFHLHFCQUFIO01BRUMsT0FBQSxHQUFjLElBQUEsT0FBQSxDQUNiO1FBQUEsSUFBQSxFQUFNLFNBQU47UUFDQSxNQUFBLEVBQVEsSUFEUjtRQUVBLENBQUEsRUFBRyxFQUZIO1FBRU8sQ0FBQSxFQUFHLElBQUMsQ0FBQSxJQUFJLENBQUMsSUFBTixHQUFhLEVBRnZCO1FBR0EsS0FBQSxFQUFPLElBQUMsQ0FBQSxLQUFELEdBQVMsRUFIaEI7T0FEYTtNQU1kLElBQUcscUJBQUg7UUFDQyxJQUFDLENBQUEsT0FBRCxHQUFlLElBQUEsS0FBQSxDQUNkO1VBQUEsSUFBQSxFQUFNLFVBQU47VUFBa0IsTUFBQSxFQUFRLElBQTFCO1VBQ0EsQ0FBQSxFQUFHLEVBREg7VUFDTyxDQUFBLEVBQUcsT0FBTyxDQUFDLElBQVIsR0FBZSxFQUR6QjtVQUVBLEtBQUEsRUFBTyxFQUZQO1VBRVcsTUFBQSxFQUFRLEVBRm5CO1VBRXVCLGVBQUEsRUFBaUIsSUFGeEM7U0FEYztRQUtmLElBQUMsQ0FBQSxPQUFPLENBQUMsSUFBVCxHQUFvQixJQUFBLElBQUEsQ0FDbkI7VUFBQSxJQUFBLEVBQU0sTUFBTjtVQUFjLE1BQUEsRUFBUSxJQUFDLENBQUEsT0FBdkI7VUFDQSxJQUFBLEVBQU0sSUFBQyxDQUFBLFFBQVEsQ0FBQyxJQURoQjtVQUVBLEtBQUEsRUFBTyxFQUZQO1VBRVcsTUFBQSxFQUFRLEVBRm5CO1VBR0EsS0FBQSxFQUFPLGlCQUhQO1NBRG1CO1FBTXBCLElBQUMsQ0FBQSxPQUFPLENBQUMsS0FBVCxHQUFxQixJQUFBLElBQUksQ0FBQyxPQUFMLENBQ3BCO1VBQUEsSUFBQSxFQUFNLE9BQU47VUFBZSxNQUFBLEVBQVEsSUFBQyxDQUFBLE9BQXhCO1VBQ0EsQ0FBQSxFQUFHLElBQUMsQ0FBQSxPQUFPLENBQUMsSUFBSSxDQUFDLElBQWQsR0FBcUIsQ0FEeEI7VUFFQSxRQUFBLEVBQVUsRUFGVjtVQUdBLElBQUEsRUFBTSxJQUFDLENBQUEsUUFBUSxDQUFDLEtBQUssQ0FBQyxXQUFoQixDQUFBLENBSE47U0FEb0I7UUFNckIsSUFBQyxDQUFBLE9BQU8sQ0FBQyxLQUFULEdBQWlCLElBQUMsQ0FBQSxPQUFPLENBQUMsS0FBSyxDQUFDO1FBR2hDLElBQUMsQ0FBQSxPQUFPLENBQUMsS0FBVCxDQUFlLElBQUMsQ0FBQSxLQUFoQjtRQUNBLElBQUcsSUFBQyxDQUFBLFFBQVEsQ0FBQyxNQUFiO1VBQXlCLElBQUMsQ0FBQSxPQUFPLENBQUMsS0FBVCxDQUFlLENBQUEsU0FBQSxLQUFBO21CQUFBLFNBQUE7cUJBQUcsS0FBSyxDQUFDLEtBQU4sQ0FBWSxHQUFaLEVBQWlCLENBQUMsQ0FBQyxJQUFGLENBQU8sS0FBQyxDQUFBLFFBQVEsQ0FBQyxNQUFqQixFQUF5QixLQUF6QixDQUFqQjtZQUFIO1VBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFmLEVBQXpCOztRQUdBLElBQUcscUJBQUg7VUFDQyxJQUFDLENBQUEsT0FBRCxHQUFlLElBQUEsS0FBQSxDQUNkO1lBQUEsSUFBQSxFQUFNLFVBQU47WUFBa0IsTUFBQSxFQUFRLElBQTFCO1lBQ0EsQ0FBQSxFQUFHLElBQUMsQ0FBQSxPQUFPLENBQUMsSUFBVCxHQUFnQixFQURuQjtZQUN1QixDQUFBLEVBQUcsT0FBTyxDQUFDLElBQVIsR0FBZSxFQUR6QztZQUVBLEtBQUEsRUFBTyxFQUZQO1lBRVcsTUFBQSxFQUFRLEVBRm5CO1lBRXVCLGVBQUEsRUFBaUIsSUFGeEM7V0FEYztVQUtmLElBQUMsQ0FBQSxPQUFPLENBQUMsSUFBVCxHQUFvQixJQUFBLElBQUEsQ0FDbkI7WUFBQSxJQUFBLEVBQU0sTUFBTjtZQUFjLE1BQUEsRUFBUSxJQUFDLENBQUEsT0FBdkI7WUFDQSxJQUFBLEVBQU0sSUFBQyxDQUFBLFFBQVEsQ0FBQyxJQURoQjtZQUVBLEtBQUEsRUFBTyxFQUZQO1lBRVcsTUFBQSxFQUFRLEVBRm5CO1lBR0EsS0FBQSxFQUFPLGlCQUhQO1dBRG1CO1VBTXBCLElBQUMsQ0FBQSxPQUFPLENBQUMsS0FBVCxHQUFxQixJQUFBLElBQUksQ0FBQyxPQUFMLENBQ3BCO1lBQUEsSUFBQSxFQUFNLE9BQU47WUFBZSxNQUFBLEVBQVEsSUFBQyxDQUFBLE9BQXhCO1lBQ0EsQ0FBQSxFQUFHLElBQUMsQ0FBQSxPQUFPLENBQUMsSUFBSSxDQUFDLElBQWQsR0FBcUIsQ0FEeEI7WUFFQSxRQUFBLEVBQVUsRUFGVjtZQUdBLElBQUEsRUFBTSxJQUFDLENBQUEsUUFBUSxDQUFDLEtBQUssQ0FBQyxXQUFoQixDQUFBLENBSE47V0FEb0I7VUFNckIsSUFBQyxDQUFBLE9BQU8sQ0FBQyxLQUFULEdBQWlCLElBQUMsQ0FBQSxPQUFPLENBQUMsS0FBSyxDQUFDO1VBR2hDLElBQUMsQ0FBQSxPQUFPLENBQUMsS0FBVCxDQUFlLElBQUMsQ0FBQSxLQUFoQjtVQUNBLElBQUcsSUFBQyxDQUFBLFFBQVEsQ0FBQyxNQUFiO1lBQXlCLElBQUMsQ0FBQSxPQUFPLENBQUMsS0FBVCxDQUFlLENBQUEsU0FBQSxLQUFBO3FCQUFBLFNBQUE7dUJBQUcsS0FBSyxDQUFDLEtBQU4sQ0FBWSxHQUFaLEVBQWlCLENBQUMsQ0FBQyxJQUFGLENBQU8sS0FBQyxDQUFBLFFBQVEsQ0FBQyxNQUFqQixFQUF5QixLQUF6QixDQUFqQjtjQUFIO1lBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFmLEVBQXpCO1dBdEJEOztRQXlCQSxJQUFDLENBQUEsTUFBRCxHQUFVLE9BQU8sQ0FBQyxJQUFSLEdBQWUsR0FsRDFCO09BUkQ7O0lBNERBLElBQUMsQ0FBQSxJQUFELENBQUE7SUFFQSxJQUFDLENBQUEsY0FBRCxDQUFnQixDQUFBLFNBQUEsS0FBQTthQUFBLFNBQUE7ZUFBRyxLQUFDLENBQUEsS0FBRCxDQUFPLE1BQVA7TUFBSDtJQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBaEI7SUFDQSxJQUFDLENBQUEsZUFBRCxDQUFpQixDQUFBLFNBQUEsS0FBQTthQUFBLFNBQUE7ZUFBRyxLQUFDLENBQUEsS0FBRCxDQUFPLE9BQVA7TUFBSDtJQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBakI7SUFDQSxLQUFLLENBQUMsS0FBTixDQUFZLElBQUMsQ0FBQSxRQUFiLEVBQXVCLENBQUEsU0FBQSxLQUFBO2FBQUEsU0FBQTtRQUFHLElBQUcsQ0FBSSxLQUFDLENBQUEsTUFBUjtpQkFBb0IsS0FBQyxDQUFBLEtBQUQsQ0FBTyxPQUFQLEVBQXBCOztNQUFIO0lBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUF2QjtFQXBJWTs7eUJBc0liLElBQUEsR0FBTSxTQUFBO1dBQ0wsSUFBQyxDQUFBLE9BQUQsQ0FBUztNQUFDLE9BQUEsRUFBUyxDQUFWO0tBQVQ7RUFESzs7eUJBR04sS0FBQSxHQUFPLFNBQUMsU0FBRDtBQUNOLFFBQUE7SUFBQSxJQUFHLGlCQUFIO01BQ0MsQ0FBQyxDQUFDLElBQUYsQ0FBTyxJQUFDLENBQUEsSUFBSSxDQUFDLGFBQWIsRUFBNEIsSUFBNUI7QUFFQTtBQUFBLFdBQUEscUNBQUE7O1FBQ0MsSUFBRyxZQUFZLENBQUMsQ0FBYixHQUFpQixJQUFDLENBQUEsSUFBckI7VUFDQyxZQUFZLENBQUMsT0FBYixDQUFxQjtZQUFDLENBQUEsRUFBRyxZQUFZLENBQUMsQ0FBYixHQUFpQixJQUFDLENBQUEsTUFBdEI7V0FBckIsRUFERDs7QUFERCxPQUhEOztJQU9BLElBQUMsQ0FBQSxPQUFELENBQ0M7TUFBQSxDQUFBLEVBQU0sU0FBQSxLQUFhLE1BQWhCLEdBQTRCLENBQUMsTUFBTSxDQUFDLEtBQXBDLEdBQStDLE1BQU0sQ0FBQyxLQUF6RDtNQUNBLE9BQUEsRUFBUyxDQURUO0tBREQ7SUFJQSxJQUFDLENBQUEsTUFBRCxHQUFVO1dBRVYsS0FBSyxDQUFDLEtBQU4sQ0FBWSxFQUFaLEVBQWdCLENBQUEsU0FBQSxLQUFBO2FBQUEsU0FBQTtlQUFHLEtBQUMsQ0FBQSxPQUFELENBQUE7TUFBSDtJQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBaEI7RUFkTTs7OztHQTFJeUQ7Ozs7QURQakUsSUFBQSxXQUFBO0VBQUE7OztBQUFFLFFBQVUsT0FBQSxDQUFRLHFCQUFSOztBQUVaLE9BQU8sQ0FBQyxJQUFSLEdBQXFCOzs7RUFDUCxjQUFDLE9BQUQ7QUFFWixRQUFBOztNQUZhLFVBQVU7O0lBRXZCLElBQUMsQ0FBQSxPQUFELEdBQVc7SUFDWCxJQUFDLENBQUEsT0FBTyxDQUFDLEtBQVQsaUZBQXlDO0lBQ3pDLElBQUMsQ0FBQSxPQUFPLENBQUMsT0FBVCxxRkFBNkM7SUFDN0MsSUFBQyxDQUFBLE9BQU8sQ0FBQyxJQUFULGtGQUF1QztJQUN2QyxJQUFDLENBQUEsT0FBTyxDQUFDLFVBQVQsd0ZBQW1ELFNBQUE7YUFBRztJQUFIO0lBRW5ELElBQUMsQ0FBQSxTQUFELEdBQWEsT0FBTyxDQUFDO0lBQ3JCLElBQUMsQ0FBQSxnQkFBRCxxREFBOEM7SUFDOUMsSUFBQyxDQUFBLE9BQUQsNENBQTRCLFNBQUE7YUFBRztJQUFIO0lBRTVCLElBQUcsSUFBQyxDQUFBLE9BQU8sQ0FBQyxVQUFaO01BQTRCLElBQUMsQ0FBQSxPQUFPLENBQUMsVUFBVCxHQUFzQixDQUFDLENBQUMsSUFBRixDQUFPLElBQUMsQ0FBQSxPQUFPLENBQUMsVUFBaEIsRUFBNEIsSUFBNUIsRUFBbEQ7O0lBQ0EsSUFBRyxJQUFDLENBQUEsT0FBSjtNQUFpQixJQUFDLENBQUEsT0FBRCxHQUFXLENBQUMsQ0FBQyxJQUFGLENBQU8sSUFBQyxDQUFBLE9BQVIsRUFBaUIsSUFBakIsRUFBNUI7O0lBRUEsc0NBQU0sQ0FBQyxDQUFDLFFBQUYsQ0FBVyxPQUFYLEVBQ0w7TUFBQSxJQUFBLEVBQU0sTUFBTjtNQUNBLElBQUEsRUFBTSxNQUFNLENBQUMsSUFEYjtNQUVBLGdCQUFBLEVBQWtCLEtBRmxCO01BR0EsZUFBQSxFQUFpQixLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUhwQztLQURLLENBQU47SUFNQSxJQUFDLENBQUEsWUFBRCxHQUNDO01BQUEsR0FBQSxFQUFLLENBQUw7TUFBUSxNQUFBLEVBQVEsR0FBaEI7O0lBRUQsSUFBQyxDQUFBLE9BQU8sQ0FBQyxlQUFULEdBQTJCO0lBRTNCLElBQUcsc0JBQUg7TUFDQyxJQUFDLENBQUEsU0FBUyxDQUFDLEtBQVgsR0FDQztRQUFBLE1BQUEsRUFBUSxJQUFSO1FBQ0EsT0FBQSxFQUFTLElBQUMsQ0FBQSxnQkFEVjtRQUZGOztJQUtBLElBQUMsQ0FBQSxVQUFELENBQUE7RUEvQlk7O2lCQWlDYixNQUFBLEdBQVEsU0FBQTtBQUFHLFdBQU87RUFBVjs7OztHQWxDeUI7Ozs7QURKbEMsSUFBQSxtQ0FBQTtFQUFBOzs7QUFBQSxJQUFBLEdBQU8sT0FBQSxDQUFRLG9CQUFSOztBQUNMLFNBQVcsT0FBQSxDQUFRLHNCQUFSOztBQUNYLE9BQVMsT0FBQSxDQUFRLG9CQUFSOztBQUNULFFBQVUsT0FBQSxDQUFRLHFCQUFSOztBQUVaLE9BQU8sQ0FBQyxRQUFSLEdBQW1CLFFBQUEsR0FBaUI7OztFQUN0QixrQkFBQyxPQUFEO0FBRVosUUFBQTs7TUFGYSxVQUFVOztJQUV2QixJQUFDLENBQUEsS0FBRCxHQUFTO0lBQ1QsSUFBQyxDQUFBLE1BQUQseUNBQTBCO0lBRTFCLDBDQUFNLENBQUMsQ0FBQyxRQUFGLENBQVcsT0FBWCxFQUNMO01BQUEsSUFBQSxFQUFNLEdBQU47TUFDQSxnQkFBQSxFQUFrQjtRQUFDLElBQUEsRUFBTSxHQUFQO09BRGxCO01BRUEsSUFBQSxFQUFNLGdCQUZOO01BR0EsS0FBQSxFQUFPLGlCQUhQO0tBREssQ0FBTjtJQU1BLElBQUMsQ0FBQSxJQUFELDBDQUF1QjtJQUN2QixJQUFDLENBQUEsS0FBRCxDQUFPLFNBQUE7TUFBRyxJQUFHLElBQUMsQ0FBQSxJQUFELEtBQVMsS0FBWjtlQUF1QixJQUFDLENBQUEsSUFBRCxHQUFRLEtBQS9COztJQUFILENBQVA7SUFFQSxJQUFDLENBQUEsTUFBTSxDQUFDLElBQVIsQ0FBYSxJQUFiO0VBZFk7O0VBZ0JiLFFBQUMsQ0FBQSxNQUFELENBQVEsTUFBUixFQUNDO0lBQUEsR0FBQSxFQUFLLFNBQUE7QUFBRyxhQUFPLElBQUMsQ0FBQTtJQUFYLENBQUw7SUFDQSxHQUFBLEVBQUssU0FBQyxJQUFEO01BQ0osSUFBVSxJQUFBLEtBQVEsSUFBQyxDQUFBLEtBQW5CO0FBQUEsZUFBQTs7TUFFQSxJQUFDLENBQUEsS0FBRCxHQUFTO01BQ1QsSUFBQyxDQUFBLElBQUQsQ0FBTSxhQUFOLEVBQXFCLElBQUMsQ0FBQSxLQUF0QixFQUE2QixJQUE3QjthQUNBLElBQUMsQ0FBQSxNQUFELENBQUE7SUFMSSxDQURMO0dBREQ7O3FCQVNBLE1BQUEsR0FBUSxTQUFBO0FBQ1AsUUFBQTtJQUFBLElBQUcsSUFBQyxDQUFBLEtBQUo7TUFDQyxJQUFDLENBQUEsSUFBRCxHQUFRO01BQ1IsSUFBQyxDQUFBLEtBQUQsR0FBUyxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQztBQUU5QjtBQUFBO1dBQUEscUNBQUE7O3FCQUFBLFFBQVEsQ0FBQyxJQUFULEdBQWdCO0FBQWhCO3FCQUpEO0tBQUEsTUFBQTtNQU1DLElBQUMsQ0FBQSxJQUFELEdBQVE7YUFDUixJQUFDLENBQUEsS0FBRCxHQUFTLGtCQVBWOztFQURPOzs7O0dBMUI0Qzs7OztBRE9yRCxJQUFBOztBQUFBLE1BQUEsR0FBUyxTQUFDLEtBQUQsRUFBUSxLQUFSLEVBQWUsV0FBZixFQUE0QixLQUE1QjtBQUVSLE1BQUE7RUFBQSxJQUFJLGFBQUo7QUFBZ0IsVUFBTSxzRkFBdEI7O0VBQ0EsSUFBSSxhQUFKO0FBQWdCLFVBQU0sc0ZBQXRCOztFQUVBLElBQUEsR0FBVyxJQUFBLEtBQUEsQ0FDVjtJQUFBLElBQUEsRUFBTSxHQUFOO0lBQ0EsTUFBQSxFQUFRLEtBRFI7SUFFQSxJQUFBLEVBQU0sS0FBSyxDQUFDLElBRlo7SUFHQSxZQUFBLEVBQWMsS0FBSyxDQUFDLFlBSHBCO0lBSUEsZUFBQSxFQUFpQixJQUpqQjtJQUtBLElBQUEsRUFBTSxJQUxOO0lBTUEsT0FBQSxFQUFTLENBTlQ7SUFPQSxnQkFBQSxFQUFrQjtNQUFDLElBQUEsRUFBTSxHQUFQO0tBUGxCO0dBRFU7RUFVWCxJQUFHLFdBQUg7SUFBb0IsSUFBSSxDQUFDLFdBQUwsQ0FBaUIsV0FBakIsRUFBcEI7O0VBSUEsUUFBQSxHQUFjLEtBQUssQ0FBQyxLQUFOLEdBQWMsS0FBSyxDQUFDLE1BQXZCLEdBQW1DLEtBQUssQ0FBQyxLQUF6QyxHQUFvRCxLQUFLLENBQUM7RUFFckUsWUFBQSxHQUFtQixJQUFBLEtBQUEsQ0FDakI7SUFBQSxJQUFBLEVBQU0sR0FBTjtJQUFXLE1BQUEsRUFBUSxJQUFuQjtJQUNBLENBQUEsRUFBRyxLQUFLLENBQUMsQ0FBTixHQUFVLEVBRGI7SUFFQSxDQUFBLEVBQUcsS0FBSyxDQUFDLENBQU4sR0FBVSxFQUZiO0lBR0EsS0FBQSxFQUFPLEVBSFA7SUFHVyxNQUFBLEVBQVEsRUFIbkI7SUFJQSxZQUFBLEVBQWMsUUFKZDtHQURpQjtFQU9uQixJQUFHLGFBQUg7SUFDQyxZQUFZLENBQUMsS0FBYixHQUNDO01BQUEsZUFBQSxFQUFpQixLQUFqQjtNQUZGO0dBQUEsTUFBQTtJQUlDLFlBQVksQ0FBQyxLQUFiLEdBQ0M7TUFBQSxlQUFBLEVBQWlCLEtBQUssQ0FBQyxlQUF2QjtNQUNBLFFBQUEsRUFBVSxHQURWO01BRUEsVUFBQSxFQUFZLEdBRlo7TUFHQSxPQUFBLEVBQVMsRUFIVDtNQUxGOztFQVlBLElBQUksQ0FBQyxPQUFMLENBQ0M7SUFBQSxPQUFBLEVBQVMsQ0FBVDtJQUNBLE9BQUEsRUFBUztNQUFDLElBQUEsRUFBTSxHQUFQO0tBRFQ7R0FERDtFQUlBLFlBQVksQ0FBQyxPQUFiLENBQ0M7SUFBQSxDQUFBLEVBQUcsWUFBWSxDQUFDLENBQWIsR0FBaUIsUUFBQSxHQUFXLEdBQS9CO0lBQ0EsQ0FBQSxFQUFHLFlBQVksQ0FBQyxDQUFiLEdBQWlCLFFBQUEsR0FBVyxHQUQvQjtJQUVBLEtBQUEsRUFBTyxRQUFBLEdBQVcsR0FGbEI7SUFHQSxNQUFBLEVBQVEsUUFBQSxHQUFXLEdBSG5CO0lBSUEsT0FBQSxFQUFTO01BQUMsSUFBQSxFQUFNLEVBQVA7S0FKVDtHQUREO0VBT0EsS0FBSyxDQUFDLEtBQU4sQ0FBWSxDQUFaLEVBQWUsU0FBQTtJQUNkLElBQUksQ0FBQyxPQUFMLENBQ0M7TUFBQSxPQUFBLEVBQVMsQ0FBVDtLQUREO1dBRUEsSUFBSSxDQUFDLGNBQUwsQ0FBb0IsSUFBSSxDQUFDLE9BQXpCO0VBSGMsQ0FBZjtTQU9BLEtBQUssQ0FBQyxVQUFOLENBQWlCLFNBQUE7SUFDaEIsSUFBSSxDQUFDLE9BQUwsQ0FDQztNQUFBLE9BQUEsRUFBUyxDQUFUO0tBREQ7V0FFQSxJQUFJLENBQUMsY0FBTCxDQUFvQixJQUFJLENBQUMsT0FBekI7RUFIZ0IsQ0FBakI7QUExRFE7O0FBK0RULE9BQU8sQ0FBQyxNQUFSLEdBQWlCOzs7O0FENUVqQixJQUFBLDZCQUFBO0VBQUE7OztBQUFBLElBQUEsR0FBTyxPQUFBLENBQVEsb0JBQVI7O0FBQ0wsUUFBVSxPQUFBLENBQVEscUJBQVI7O0FBQ1YsVUFBWSxPQUFBLENBQVEsdUJBQVI7O0FBR2QsT0FBTyxDQUFDLE9BQVIsR0FBd0I7OztFQUNWLGlCQUFDLE9BQUQ7QUFFWixRQUFBOztNQUZhLFVBQVU7O0lBRXZCLElBQUMsQ0FBQSxLQUFELEdBQVMsT0FBTyxDQUFDO0lBQ2pCLElBQUMsQ0FBQSxvQkFBRCx1REFBc0Q7SUFDdEQsSUFBQyxDQUFBLEtBQUQsMENBQXdCO0lBQ3hCLElBQUMsQ0FBQSxJQUFELHlDQUFzQjtJQUN0QixJQUFDLENBQUEsRUFBRCxHQUFNLEVBQUEsR0FBSyxDQUFDLElBQUMsQ0FBQSxJQUFELEdBQVEsRUFBVDtJQUVYLHlDQUFNLENBQUMsQ0FBQyxRQUFGLENBQVcsT0FBWCxFQUNMO01BQUEsS0FBQSxFQUFPLE1BQU0sQ0FBQyxLQUFkO01BQ0EsQ0FBQSxFQUFHLElBQUMsQ0FBQSxFQURKO01BRUEsTUFBQSxFQUFRLEVBRlI7TUFHQSxlQUFBLEVBQWlCLElBSGpCO0tBREssQ0FBTjtJQU1BLElBQUMsQ0FBQSxJQUFELEdBQVksSUFBQSxLQUFBLENBQ1g7TUFBQSxJQUFBLEVBQU0sR0FBTjtNQUFXLE1BQUEsRUFBUSxJQUFuQjtNQUNBLENBQUEsRUFBRyxFQURIO01BQ08sQ0FBQSxFQUFHLEtBQUssQ0FBQyxNQURoQjtNQUVBLE1BQUEsRUFBUSxFQUZSO01BRVksS0FBQSxFQUFPLEVBRm5CO01BRXVCLFlBQUEsRUFBYyxFQUZyQztNQUdBLGVBQUEsRUFBaUIsSUFBQyxDQUFBLG9CQUhsQjtNQUlBLEtBQUEsRUFBTyxJQUFDLENBQUEsS0FKUjtLQURXO0lBT1osSUFBQyxDQUFBLFVBQUQsR0FBa0IsSUFBQSxJQUFJLENBQUMsT0FBTCxDQUNqQjtNQUFBLElBQUEsRUFBTSxHQUFOO01BQVcsTUFBQSxFQUFRLElBQW5CO01BQ0EsQ0FBQSxFQUFHLElBQUMsQ0FBQSxJQUFJLENBQUMsSUFBTixHQUFhLEVBRGhCO01BQ29CLENBQUEsRUFBRyxLQUFLLENBQUMsTUFEN0I7TUFFQSxLQUFBLEVBQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxJQUZsQjtNQUdBLElBQUEsRUFBTSxJQUFDLENBQUEsS0FIUDtLQURpQjtFQXJCTjs7OztHQUQwQjs7OztBREx4QyxJQUFBLGlDQUFBO0VBQUE7OztBQUFBLElBQUEsR0FBTyxPQUFBLENBQVEsb0JBQVI7O0FBQ0wsU0FBVyxPQUFBLENBQVEsc0JBQVI7O0FBQ1gsT0FBUyxPQUFBLENBQVEsb0JBQVI7O0FBQ1QsUUFBVSxPQUFBLENBQVEscUJBQVI7O0FBRVosT0FBTyxDQUFDLE1BQVIsR0FBdUI7OztFQUNULGdCQUFDLE9BQUQ7QUFFWixRQUFBOztNQUZhLFVBQVU7O0lBRXZCLElBQUMsQ0FBQSxRQUFELDJDQUE4QjtJQUM5QixJQUFDLENBQUEsTUFBRCwyQ0FBMEIsS0FBSyxDQUFDLFFBQU4sQ0FBZSxRQUFmO0lBRTFCLHdDQUFNLENBQUMsQ0FBQyxRQUFGLENBQVcsT0FBWCxFQUNMO01BQUEsSUFBQSxFQUFNLEdBQU47TUFBVyxNQUFBLEVBQVEsQ0FBbkI7TUFDQSxRQUFBLEVBQVUsRUFEVjtNQUVBLGVBQUEsRUFBaUIsaUJBRmpCO01BR0EsR0FBQSxFQUFLLENBSEw7TUFHUSxHQUFBLEVBQUssRUFIYjtLQURLLENBQU47SUFNQSxJQUFDLENBQUEsSUFBSSxDQUFDLGVBQU4sK0VBQXdDLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDO0lBRTdELElBQUMsQ0FBQSxJQUFJLENBQUMsS0FBTixHQUNDO01BQUEsSUFBQSxFQUFNLE1BQU47TUFDQSxlQUFBLEVBQWlCLElBRGpCO01BRUEsT0FBQSxFQUFTLENBRlQ7TUFHQSxPQUFBLEVBQVMsQ0FIVDtNQUlBLFVBQUEsRUFBWSxDQUpaOztJQU1ELElBQUMsQ0FBQSxLQUFELEdBQWEsSUFBQSxLQUFBLENBQ1o7TUFBQSxJQUFBLEVBQU0sT0FBTjtNQUFlLE1BQUEsRUFBUSxJQUFDLENBQUEsSUFBeEI7TUFDQSxDQUFBLEVBQUcsS0FBSyxDQUFDLE1BRFQ7TUFDaUIsQ0FBQSxFQUFHLEtBQUssQ0FBQyxNQUQxQjtNQUVBLElBQUEsbUZBQTJCLEVBRjNCO01BRStCLFlBQUEscUZBQXFDLEVBRnBFO01BR0EsZUFBQSw4RkFBaUQsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FIdEU7TUFJQSxnQkFBQSxFQUFrQjtRQUFDLElBQUEsRUFBTSxHQUFQO09BSmxCO0tBRFk7SUFPYixJQUFHLElBQUMsQ0FBQSxRQUFKO0FBRUMsV0FBUyxzR0FBVDtRQUNDLEtBQUEsR0FBWSxJQUFBLEtBQUEsQ0FDWDtVQUFBLElBQUEsRUFBTSxHQUFOO1VBQVcsTUFBQSxFQUFRLElBQW5CO1VBQ0EsQ0FBQSxFQUFHLENBQUEsR0FBSSxJQUFDLENBQUEsS0FBTCxHQUFXLENBQUMsSUFBQyxDQUFBLEdBQUQsR0FBSyxJQUFDLENBQUEsR0FBUCxDQURkO1VBRUEsS0FBQSx5RkFBOEIsQ0FGOUI7VUFFaUMsTUFBQSwwRkFBZ0MsQ0FGakU7VUFFb0UsWUFBQSxnR0FBNEMsQ0FGaEg7VUFHQSxlQUFBLG1HQUFrRCxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUh2RTtTQURXO0FBRGI7TUFPQSxrQkFBQSxrR0FBb0QsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7TUFFekUsSUFBQyxDQUFBLEdBQUQsR0FBVyxJQUFBLEtBQUEsQ0FDVjtRQUFBLElBQUEsRUFBTSxLQUFOO1FBQWEsTUFBQSxFQUFRLElBQUMsQ0FBQSxJQUF0QjtRQUNBLENBQUEsRUFBRyxLQUFLLENBQUMsTUFEVDtRQUNpQixDQUFBLEVBQUcsQ0FBQyxFQURyQjtRQUVBLEtBQUEsRUFBTyxFQUZQO1FBRVcsTUFBQSxFQUFRLEVBRm5CO1FBR0EsSUFBQSxFQUFNLGlOQUFBLEdBQW9OLGtCQUFwTixHQUF5TyxpQkFIL087UUFJQSxlQUFBLEVBQWlCLElBSmpCO1FBSXVCLE9BQUEsRUFBUyxDQUpoQztRQUtBLGdCQUFBLEVBQWtCO1VBQUMsSUFBQSxFQUFNLEdBQVA7U0FMbEI7T0FEVTtNQVFYLElBQUMsQ0FBQSxRQUFELEdBQWdCLElBQUEsU0FBQSxDQUNmO1FBQUEsSUFBQSxFQUFNLFdBQU47UUFBbUIsTUFBQSxFQUFRLElBQUMsQ0FBQSxHQUE1QjtRQUNBLENBQUEsRUFBRyxDQURIO1FBQ00sS0FBQSxFQUFPLEVBRGI7UUFFQSxLQUFBLDZGQUFrQyxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUZ2RDtRQUdBLFFBQUEsRUFBVSxFQUhWO1FBR2MsVUFBQSxFQUFZLFFBSDFCO1FBR29DLFNBQUEsRUFBVyxRQUgvQztRQUlBLElBQUEsRUFBTSxTQUpOO09BRGU7TUFPaEIsSUFBQyxDQUFBLFFBQVEsQ0FBQyxRQUFWLEdBQ0M7UUFBQSxLQUFBLEVBQU8sSUFBQyxDQUFBLEtBQVI7O01BRUQsSUFBQyxDQUFBLElBQUksQ0FBQyxZQUFOLENBQW1CLENBQUEsU0FBQSxLQUFBO2VBQUEsU0FBQTtVQUNsQixLQUFDLENBQUEsS0FBSyxDQUFDLE9BQVAsQ0FBZTtZQUFDLE9BQUEsRUFBUyxDQUFWO1dBQWY7aUJBQ0EsS0FBQyxDQUFBLEdBQUcsQ0FBQyxPQUFMLENBQWE7WUFBQyxPQUFBLEVBQVMsQ0FBVjtXQUFiO1FBRmtCO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFuQjtNQUlBLElBQUMsQ0FBQSxVQUFELENBQVksU0FBQTtRQUNYLElBQUMsQ0FBQSxLQUFLLENBQUMsT0FBUCxDQUFlO1VBQUMsT0FBQSxFQUFTLENBQVY7U0FBZjtlQUNBLElBQUMsQ0FBQSxHQUFHLENBQUMsT0FBTCxDQUFhO1VBQUMsT0FBQSxFQUFTLENBQVY7U0FBYjtNQUZXLENBQVo7TUFJQSxLQUFBLEdBQVEsU0FBQyxNQUFELEVBQVMsT0FBVDtlQUNKLElBQUksQ0FBQyxLQUFMLENBQVcsTUFBQSxHQUFTLE9BQXBCLENBQUEsR0FBK0I7TUFEM0I7TUFHUixJQUFDLENBQUEsSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFoQixHQUFpQyxDQUFBLFNBQUEsS0FBQTtlQUFBLFNBQUMsS0FBRDtVQUM3QixLQUFLLENBQUMsQ0FBTixHQUFVLEtBQUEsQ0FBTSxLQUFLLENBQUMsQ0FBWixFQUFlLEtBQUMsQ0FBQSxLQUFELEdBQVMsQ0FBQyxLQUFDLENBQUEsR0FBRCxHQUFLLEtBQUMsQ0FBQSxHQUFQLENBQXhCLENBQUEsR0FBd0MsQ0FBQyxLQUFDLENBQUEsSUFBSSxDQUFDLEtBQU4sR0FBYyxDQUFmO0FBQ2xELGlCQUFPO1FBRnNCO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQTtNQUlqQyxJQUFDLENBQUEsYUFBRCxDQUFlLFNBQUE7ZUFDZCxJQUFDLENBQUEsUUFBUSxDQUFDLFFBQVYsR0FBcUIsSUFBSSxDQUFDLEtBQUwsQ0FBVyxJQUFDLENBQUEsS0FBWjtNQURQLENBQWYsRUE1Q0Q7S0FBQSxNQUFBO01BZ0RDLElBQUMsQ0FBQSxJQUFJLENBQUMsWUFBTixDQUFtQixDQUFBLFNBQUEsS0FBQTtlQUFBLFNBQUE7aUJBQ2xCLEtBQUMsQ0FBQSxLQUFLLENBQUMsT0FBUCxDQUFlO1lBQUMsS0FBQSxFQUFNLEdBQVA7V0FBZjtRQURrQjtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBbkI7TUFFQSxJQUFDLENBQUEsSUFBSSxDQUFDLFVBQU4sQ0FBaUIsQ0FBQSxTQUFBLEtBQUE7ZUFBQSxTQUFBO2lCQUNoQixLQUFDLENBQUEsS0FBSyxDQUFDLE9BQVAsQ0FBZTtZQUFDLEtBQUEsRUFBTSxDQUFQO1dBQWY7UUFEZ0I7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQWpCLEVBbEREOztFQTNCWTs7OztHQUR3Qjs7OztBREx0QyxJQUFBLHFDQUFBO0VBQUE7Ozs7QUFBQSxJQUFBLEdBQU8sT0FBQSxDQUFRLG9CQUFSOztBQUNMLFNBQVcsT0FBQSxDQUFRLHNCQUFSOztBQUNYLFFBQVUsT0FBQSxDQUFRLHFCQUFSOztBQUNWLFNBQVcsT0FBQSxDQUFRLHNCQUFSOztBQUViLE9BQU8sQ0FBQyxRQUFSLEdBQW1CLFFBQUEsR0FBaUI7OztFQUN0QixrQkFBQyxPQUFEO0FBRVosUUFBQTs7TUFGYSxVQUFVOzs7O0lBRXZCLElBQUMsQ0FBQSxNQUFELHlDQUEwQjtJQUMxQixJQUFDLENBQUEsUUFBRCw2Q0FBOEI7SUFDOUIsSUFBQyxDQUFBLE9BQUQsR0FBVyxPQUFPLENBQUM7SUFDbkIsSUFBQyxDQUFBLElBQUQsR0FBUSxPQUFPLENBQUM7SUFFaEIsMENBQU0sQ0FBQyxDQUFDLFFBQUYsQ0FBVyxPQUFYLEVBQ0w7TUFBQSxJQUFBLEVBQU0sR0FBTjtNQUNBLEtBQUEsRUFBTyxNQUFNLENBQUMsS0FEZDtNQUVBLElBQUEsRUFBTSxJQUZOO01BR0EsZUFBQSxFQUFpQixLQUFLLENBQUMsUUFBUSxDQUFDLGVBSGhDO01BSUEsZ0JBQUEsRUFBa0I7UUFBQyxJQUFBLEVBQU0sR0FBUDtPQUpsQjtLQURLLENBQU47SUFPQSxVQUFBLEdBQWEsSUFBQyxDQUFBLEtBQUQsR0FBUztJQUV0QixJQUFHLG9CQUFIO01BQ0MsSUFBQyxDQUFBLE1BQUQsR0FBYyxJQUFBLE1BQUEsQ0FDYjtRQUFBLE1BQUEsRUFBUSxJQUFSO1FBQ0EsQ0FBQSxFQUFHLEtBQUssQ0FBQyxLQUFOLENBQVksQ0FBQyxDQUFiLENBREg7UUFDb0IsQ0FBQSxFQUFHLENBRHZCO1FBRUEsS0FBQSwrQ0FBd0IsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FGN0M7UUFHQSxJQUFBLEVBQU0sSUFBQyxDQUFBLE9BQU8sQ0FBQyxLQUFLLENBQUMsV0FBZixDQUFBLENBSE47UUFJQSxNQUFBLEVBQVEsSUFBQyxDQUFBLE9BQU8sQ0FBQyxNQUpqQjtPQURhO01BT2QsSUFBQyxDQUFBLE1BQU0sQ0FBQyxLQUFSLENBQWMsSUFBQyxDQUFBLElBQWY7TUFDQSxVQUFBLEdBQWEsSUFBQyxDQUFBLE1BQU0sQ0FBQyxDQUFSLEdBQVksQ0FBWixHQUFnQixHQVQ5Qjs7SUFXQSxJQUFDLENBQUEsU0FBRCxHQUFpQixJQUFBLElBQUksQ0FBQyxLQUFMLENBQ2hCO01BQUEsSUFBQSxFQUFNLE9BQU47TUFBZSxNQUFBLEVBQVEsSUFBdkI7TUFDQSxDQUFBLEVBQUcsRUFESDtNQUNPLENBQUEsRUFBRyxFQURWO01BRUEsS0FBQSxFQUFPLFVBRlA7TUFHQSxJQUFBLEVBQU0sSUFBQyxDQUFBLE1BSFA7TUFJQSxLQUFBLEVBQU8sS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUp0QjtLQURnQjtJQU9qQixJQUFDLENBQUEsTUFBRCxHQUFVLElBQUMsQ0FBQSxTQUFTLENBQUMsSUFBWCxHQUFrQjs7VUFDckIsQ0FBRSxDQUFULEdBQWEsS0FBSyxDQUFDOztJQUVuQixJQUFHLGlCQUFIO01BQ0MsSUFBQyxDQUFBLENBQUQsR0FBUSwyQkFBSCxxRkFBMkUsS0FBSyxDQUFDLE1BQU4sQ0FBYSxJQUFDLENBQUEsTUFBZCxDQUEzRSxHQUFBLE9BRE47O0lBR0EsS0FBSyxDQUFDLEtBQU4sQ0FBWSxJQUFDLENBQUEsUUFBYixFQUF1QixJQUFDLENBQUEsSUFBeEI7SUFFQSxJQUFDLENBQUEsSUFBRCxDQUFBO0VBMUNZOztxQkE0Q2IsSUFBQSxHQUFNLFNBQUE7QUFDTCxRQUFBO0lBQUEsSUFBRyxpQkFBSDtNQUNDLElBQUcsMEJBQUg7UUFDQyxJQUFDLENBQUEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFmLENBQUE7UUFDQSxLQUFLLENBQUMsS0FBTixDQUFZLENBQVosRUFBZSxJQUFDLENBQUEsSUFBaEIsRUFGRDtPQUFBLE1BQUE7UUFLQyxJQUFDLENBQUEsSUFBSSxDQUFDLFFBQU4sR0FBaUI7O2FBQ0MsQ0FBRSxPQUFwQixDQUE0QjtZQUFDLENBQUEsRUFBRyxJQUFDLENBQUEsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFuQixHQUF1QixJQUFDLENBQUEsTUFBNUI7WUFBb0MsT0FBQSxFQUFTLElBQUMsQ0FBQSxnQkFBOUM7V0FBNUI7O2VBQ0EsSUFBQyxDQUFBLE9BQUQsQ0FBUztVQUFDLENBQUEsRUFBRyxJQUFDLENBQUEsQ0FBRCxHQUFLLElBQUMsQ0FBQSxNQUFWO1NBQVQsRUFQRDtPQUREO0tBQUEsTUFBQTthQVVDLElBQUMsQ0FBQSxPQUFELENBQVM7UUFBQyxDQUFBLEVBQUcsSUFBQyxDQUFBLENBQUQsR0FBSyxJQUFDLENBQUEsTUFBVjtPQUFULEVBVkQ7O0VBREs7O3FCQWFOLElBQUEsR0FBTSxTQUFBO0FBQ0wsUUFBQTtJQUFBLElBQUcsaUJBQUg7TUFDQyxJQUFDLENBQUEsSUFBSSxDQUFDLFFBQU4sR0FBaUI7O1dBQ0MsQ0FBRSxPQUFwQixDQUE0QjtVQUFDLENBQUEsRUFBRyxJQUFDLENBQUEsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFuQixHQUF1QixJQUFDLENBQUEsTUFBNUI7VUFBb0MsT0FBQSxFQUFTLElBQUMsQ0FBQSxnQkFBOUM7U0FBNUI7T0FGRDs7SUFJQSxJQUFDLENBQUEsT0FBRCxDQUFTO01BQUMsTUFBQSxFQUFRLENBQVQ7TUFBWSxDQUFBLEVBQUcsSUFBQyxDQUFBLENBQUQsR0FBSyxJQUFDLENBQUEsTUFBckI7S0FBVDtXQUNBLEtBQUssQ0FBQyxLQUFOLENBQVksRUFBWixFQUFnQixDQUFBLFNBQUEsS0FBQTthQUFBLFNBQUE7ZUFBRyxLQUFDLENBQUEsT0FBRCxDQUFBO01BQUg7SUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQWhCO0VBTks7Ozs7R0ExRDhDOzs7O0FETHJELElBQUEsb0NBQUE7RUFBQTs7O0FBQUEsSUFBQSxHQUFPLE9BQUEsQ0FBUSxvQkFBUjs7QUFDTCxTQUFXLE9BQUEsQ0FBUSxzQkFBUjs7QUFDWCxPQUFTLE9BQUEsQ0FBUSxvQkFBUjs7QUFDVCxRQUFVLE9BQUEsQ0FBUSxxQkFBUjs7QUFFWixPQUFPLENBQUMsU0FBUixHQUEwQjs7O0VBQ1osbUJBQUMsT0FBRDs7TUFBQyxVQUFVOztJQUV2QiwyQ0FBTSxDQUFDLENBQUMsUUFBRixDQUFXLE9BQVgsRUFDTDtNQUFBLElBQUEsRUFBTSxHQUFOO01BQ0EsS0FBQSxFQUFPLE1BQU0sQ0FBQyxLQURkO01BQ3FCLE1BQUEsRUFBUSxFQUQ3QjtNQUVBLGVBQUEsRUFBaUIsS0FBSyxDQUFDLFNBQVMsQ0FBQyxlQUZqQztLQURLLENBQU47SUFLQSxJQUFDLENBQUEsS0FBRCxHQUFhLElBQUEsS0FBQSxDQUNaO01BQUEsSUFBQSxFQUFNLEdBQU47TUFBVyxNQUFBLEVBQVEsSUFBbkI7TUFDQSxJQUFBLEVBQU0sSUFBQyxDQUFBLElBRFA7TUFFQSxLQUFBLEVBQU8sS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUZ2QjtNQUdBLE1BQUEsRUFBUSxLQUFLLENBQUMsU0FBUyxDQUFDLE1BSHhCO0tBRFk7RUFQRDs7OztHQUQ4Qjs7OztBREo1QyxJQUFBLGlDQUFBO0VBQUE7OztBQUFBLElBQUEsR0FBTyxPQUFBLENBQVEsb0JBQVI7O0FBQ0wsU0FBVyxPQUFBLENBQVEsc0JBQVI7O0FBQ1gsT0FBUyxPQUFBLENBQVEsb0JBQVI7O0FBQ1QsUUFBVSxPQUFBLENBQVEscUJBQVI7O0FBRVosT0FBTyxDQUFDLE1BQVIsR0FBdUI7OztFQUNULGdCQUFDLE9BQUQ7QUFFWixRQUFBOztNQUZhLFVBQVU7O0lBRXZCLElBQUMsQ0FBQSxLQUFELEdBQVM7SUFFVCx3Q0FBTSxDQUFDLENBQUMsUUFBRixDQUFXLE9BQVgsRUFDTDtNQUFBLElBQUEsRUFBTSxHQUFOO01BQ0EsS0FBQSxFQUFPLEVBRFA7TUFDVyxNQUFBLEVBQVEsRUFEbkI7TUFDdUIsWUFBQSxFQUFjLENBRHJDO01BRUEsZUFBQSxFQUFpQix1QkFGakI7TUFHQSxnQkFBQSxFQUFrQjtRQUFDLElBQUEsRUFBTSxHQUFQO09BSGxCO0tBREssQ0FBTjtJQU1BLElBQUMsQ0FBQSxJQUFELEdBQVksSUFBQSxLQUFBLENBQ1g7TUFBQSxJQUFBLEVBQU0sR0FBTjtNQUFXLE1BQUEsRUFBUSxJQUFuQjtNQUNBLENBQUEsRUFBRyxDQURIO01BQ00sQ0FBQSxFQUFHLEtBQUssQ0FBQyxNQURmO01BRUEsS0FBQSxFQUFPLEVBRlA7TUFFVyxNQUFBLEVBQVEsRUFGbkI7TUFFdUIsWUFBQSxFQUFjLEVBRnJDO01BR0EsZUFBQSxFQUFpQixRQUhqQjtNQUlBLE9BQUEsRUFBUyxDQUpUO01BSVksVUFBQSxFQUFZLENBSnhCO01BS0EsZ0JBQUEsRUFBa0I7UUFBQyxJQUFBLEVBQU0sR0FBUDtPQUxsQjtLQURXO0lBUVosSUFBQyxDQUFBLElBQUQsd0NBQXVCO0lBQ3ZCLElBQUMsQ0FBQSxLQUFELENBQU8sU0FBQTthQUFHLElBQUMsQ0FBQSxJQUFELEdBQVEsQ0FBQyxJQUFDLENBQUE7SUFBYixDQUFQO0VBbkJZOztFQXFCYixNQUFDLENBQUEsTUFBRCxDQUFRLE1BQVIsRUFDQztJQUFBLEdBQUEsRUFBSyxTQUFBO0FBQUcsYUFBTyxJQUFDLENBQUE7SUFBWCxDQUFMO0lBQ0EsR0FBQSxFQUFLLFNBQUMsSUFBRDtNQUNKLElBQVUsSUFBQSxLQUFRLElBQUMsQ0FBQSxLQUFuQjtBQUFBLGVBQUE7O01BRUEsSUFBQyxDQUFBLEtBQUQsR0FBUztNQUNULElBQUMsQ0FBQSxJQUFELENBQU0sYUFBTixFQUFxQixJQUFDLENBQUEsS0FBdEIsRUFBNkIsSUFBN0I7YUFDQSxJQUFDLENBQUEsTUFBRCxDQUFBO0lBTEksQ0FETDtHQUREOzttQkFTQSxNQUFBLEdBQVEsU0FBQTtJQUNQLElBQUcsSUFBQyxDQUFBLEtBQUo7TUFDQyxJQUFDLENBQUEsSUFBSSxDQUFDLE9BQU4sQ0FBYztRQUFDLENBQUEsRUFBRyxLQUFLLENBQUMsS0FBTixDQUFBLENBQUo7UUFBbUIsZUFBQSxFQUFpQixLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUF6RDtPQUFkO2FBQ0EsSUFBQyxDQUFBLE9BQUQsQ0FBUztRQUFDLGVBQUEsRUFBaUIsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBdkM7T0FBVCxFQUZEO0tBQUEsTUFBQTtNQUlDLElBQUMsQ0FBQSxJQUFJLENBQUMsT0FBTixDQUFjO1FBQUMsQ0FBQSxFQUFHLENBQUo7UUFBTyxlQUFBLEVBQWlCLFFBQXhCO09BQWQ7YUFDQSxJQUFDLENBQUEsT0FBRCxDQUFTO1FBQUMsZUFBQSxFQUFpQix1QkFBbEI7T0FBVCxFQUxEOztFQURPOzs7O0dBL0I2Qjs7OztBRGJ0QyxJQUFBOztBQUFBLElBQUEsR0FBTyxPQUFBLENBQVEsb0JBQVI7O0FBQ0wsU0FBVyxPQUFBLENBQVEsc0JBQVI7O0FBQ1gsT0FBUyxPQUFBLENBQVEsb0JBQVI7O0FBQ1QsUUFBVSxPQUFBLENBQVEscUJBQVI7O0FBV1osT0FBTyxDQUFDLFNBQVIsR0FBMEI7Ozs7Ozs7OztBREgxQixJQUFBOztBQUFBLFdBQUEsR0FBYyxTQUFDLEtBQUQsRUFBUSxDQUFSLEVBQVcsQ0FBWCxFQUFjLENBQWQ7QUFDYixNQUFBO0VBQUEsSUFBQSxHQUFPLENBQUMsQ0FBQyxPQUFGLENBQVUsQ0FBQyxDQUFDLE9BQUYsQ0FBVSxLQUFLLENBQUMsV0FBTixDQUFBLENBQW1CLENBQUMsS0FBcEIsQ0FBMEIsQ0FBMUIsRUFBNkIsQ0FBQyxDQUE5QixDQUFWLEVBQTRDLEdBQTVDLEVBQWlELEVBQWpELENBQVYsRUFBZ0UsR0FBaEUsRUFBcUUsRUFBckUsQ0FBeUUsQ0FBQyxLQUExRSxDQUFnRixJQUFoRjtFQUVQLFFBQUEsR0FBZSxJQUFBLEtBQUEsQ0FDZDtJQUFBLENBQUEsRUFBRyxDQUFDLENBQUMsUUFBRixDQUFXLElBQUssQ0FBQSxDQUFBLENBQWhCLENBQUEsR0FBc0IsQ0FBekI7SUFDQSxDQUFBLEVBQUcsQ0FBQyxDQUFDLENBQUMsUUFBRixDQUFXLElBQUssQ0FBQSxDQUFBLENBQWhCLENBQUEsR0FBc0IsQ0FBdkIsQ0FBQSxHQUEwQixHQUQ3QjtJQUVBLENBQUEsRUFBRyxDQUFDLENBQUMsQ0FBQyxRQUFGLENBQVcsSUFBSyxDQUFBLENBQUEsQ0FBaEIsQ0FBQSxHQUFzQixDQUF2QixDQUFBLEdBQTBCLEdBRjdCO0lBR0EsQ0FBQSxFQUFHLENBSEg7R0FEYztBQU1mLFNBQU87QUFUTTs7QUFXZCxZQUFBLEdBQWUsYUFBYSxDQUFDOztBQUM3QixhQUFBLEdBQWdCLEdBQUEsR0FBTSxDQUFDLGNBQWMsQ0FBQyxPQUFmLEdBQXlCLEdBQTFCOztBQUN0QixjQUFBLEdBQWlCLGVBQWUsQ0FBQzs7QUFDakMsU0FBQSxHQUFZLFVBQVUsQ0FBQzs7QUFDdkIsYUFBQSxHQUFnQixlQUFlLENBQUM7O0FBQ2hDLFVBQUEsR0FBYSxHQUFBLEdBQU0sQ0FBQyxXQUFXLENBQUMsT0FBWixHQUFzQixHQUF2Qjs7QUFHbkIsTUFBQSxHQUNDO0VBQUEsTUFBQSxFQUNDO0lBQUEsT0FBQSxFQUNDO01BQUEsSUFBQSxFQUFNLFlBQU47TUFDQSxLQUFBLEVBQU8sV0FBQSxDQUFZLFlBQVosRUFBMEIsRUFBMUIsRUFBOEIsQ0FBQyxDQUEvQixFQUFrQyxFQUFsQyxDQURQO01BRUEsSUFBQSxFQUFNLFdBQUEsQ0FBWSxZQUFaLEVBQTBCLENBQUMsQ0FBM0IsRUFBOEIsQ0FBQyxDQUEvQixFQUFrQyxDQUFDLEVBQW5DLENBRk47TUFHQSxJQUFBLEVBQU0sa0JBQWtCLENBQUMsS0FIekI7TUFJQSxNQUFBLEVBQVEsYUFKUjtLQUREO0lBTUEsU0FBQSxFQUNDO01BQUEsSUFBQSxFQUFNLGNBQU47TUFDQSxLQUFBLEVBQU8sV0FBQSxDQUFZLGNBQVosRUFBNEIsRUFBNUIsRUFBZ0MsQ0FBQyxDQUFqQyxFQUFvQyxFQUFwQyxDQURQO01BRUEsSUFBQSxFQUFNLFdBQUEsQ0FBWSxjQUFaLEVBQTRCLENBQUMsQ0FBN0IsRUFBZ0MsQ0FBQyxDQUFqQyxFQUFvQyxDQUFDLEVBQXJDLENBRk47TUFHQSxJQUFBLEVBQU0sb0JBQW9CLENBQUMsS0FIM0I7S0FQRDtJQVdBLElBQUEsRUFDQztNQUFBLEtBQUEsRUFBTyxTQUFQO01BQ0EsSUFBQSxFQUFNLGFBRE47TUFFQSxNQUFBLEVBQVEsVUFGUjtLQVpEO0dBREQ7OztBQWlCRCxLQUFBLEdBQ0M7RUFBQSxJQUFBLEVBQU0sTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBOUI7RUFDQSxPQUFBLEVBQVMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFEL0I7RUFFQSxTQUFBLEVBQVcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFGbkM7RUFHQSxJQUFBLEVBQU0sTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FIekI7RUFJQSxNQUFBLEVBQVEsTUFBTSxDQUFDLE1BSmY7RUFNQSxJQUFBLEVBQ0M7SUFBQSxLQUFBLEVBQU8sTUFBUDtHQVBEO0VBU0EsTUFBQSxFQUNDO0lBQUEsZUFBQSxFQUFpQixNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUF2QztJQUNBLEtBQUEsRUFBTyxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUQ3QjtJQUVBLE1BQUEsRUFBUSxhQUZSO0lBR0EsSUFBQSxFQUNDO01BQUEsS0FBQSxFQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQTdCO0tBSkQ7SUFLQSxJQUFBLEVBQ0M7TUFBQSxlQUFBLEVBQWlCLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQXZDO01BQ0EsS0FBQSxFQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBRDdCO01BRUEsUUFBQSxFQUFVLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLElBRmxDO0tBTkQ7R0FWRDtFQW9CQSxTQUFBLEVBQ0M7SUFBQSxLQUFBLEVBQU8sa0NBQVA7SUFDQSxlQUFBLEVBQWlCLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBRHZDO0lBRUEsTUFBQSxFQUFRLGFBRlI7R0FyQkQ7RUF5QkEsU0FBQSxFQUNDO0lBQUEsZUFBQSxFQUFpQixTQUFqQjtJQUNBLE9BQUEsRUFBUyxDQUFDLENBRFY7SUFFQSxVQUFBLEVBQVksQ0FGWjtJQUdBLFdBQUEsRUFBYSxnQkFIYjtHQTFCRDtFQStCQSxNQUFBLEVBQ0M7SUFBQSxlQUFBLEVBQWlCLFNBQWpCO0dBaENEO0VBa0NBLFFBQUEsRUFDQztJQUFBLEtBQUEsRUFBTyxnQ0FBUDtHQW5DRDtFQXFDQSxNQUFBLEVBQ0M7SUFBQSxLQUFBLEVBQU8sK0JBQVA7R0F0Q0Q7RUF3Q0EsSUFBQSxFQUNDO0lBQUEsT0FBQSxFQUNDO01BQUEsZUFBQSxFQUFpQixTQUFqQjtLQUREO0lBRUEsU0FBQSxFQUNDO01BQUEsZUFBQSxFQUFpQixTQUFqQjtLQUhEO0dBekNEO0VBOENBLFdBQUEsRUFDQztJQUFBLE1BQUEsRUFDQztNQUFBLGVBQUEsRUFBaUIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBekM7TUFDQSxJQUFBLEVBQU0sTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsS0FEOUI7TUFFQSxJQUFBLEVBQU0sTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFGOUI7S0FERDtJQUlBLFNBQUEsRUFDQztNQUFBLEtBQUEsRUFBTyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUExQjtNQUNBLElBQUEsRUFBTSxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUQ5QjtNQUVBLElBQUEsRUFBTSxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUY5QjtLQUxEO0lBUUEsZUFBQSxFQUFpQixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQVJwQztJQVNBLElBQUEsRUFBTSxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQVR6QjtJQVVBLE1BQUEsRUFDQztNQUFBLElBQUEsRUFBTSxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxLQUE5QjtNQUNBLElBQUEsRUFBTSxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUQ5QjtLQVhEO0lBYUEsTUFBQSxFQUFRLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BYjNCO0dBL0NEO0VBOERBLE1BQUEsRUFDQztJQUFBLElBQUEsRUFDQztNQUFBLGVBQUEsRUFBaUIsSUFBakI7TUFDQSxLQUFBLEVBQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFEL0I7TUFFQSxPQUFBLEVBQVMsQ0FGVDtNQUdBLFdBQUEsRUFBYSxpQkFIYjtNQUlBLFVBQUEsRUFBWSxDQUpaO0tBREQ7SUFPQSxNQUFBLEVBQ0M7TUFBQSxlQUFBLEVBQWlCLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQXpDO01BQ0EsS0FBQSxFQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLElBRC9CO01BRUEsT0FBQSxFQUFTLENBRlQ7TUFHQSxXQUFBLEVBQWEsaUJBSGI7TUFJQSxVQUFBLEVBQVksQ0FKWjtLQVJEO0dBL0REO0VBNkVBLEdBQUEsRUFDQztJQUFBLGVBQUEsRUFBaUIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBekM7SUFDQSxLQUFBLEVBQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFEL0I7SUFFQSxNQUFBLEVBQVEsYUFGUjtHQTlFRDtFQWtGQSxNQUFBLEVBQ0M7SUFBQSxlQUFBLEVBQWdCLFNBQWhCO0dBbkZEO0VBcUZBLE9BQUEsRUFDQztJQUFBLGVBQUEsRUFBaUIsaUJBQWpCO0dBdEZEO0VBd0ZBLElBQUEsRUFDQztJQUFBLE9BQUEsRUFBUyxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUEvQjtJQUNBLFNBQUEsRUFBVyxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQURuQztHQXpGRDtFQTRGQSxLQUFBLEVBQ0M7SUFBQSxlQUFBLEVBQWlCLFNBQWpCO0lBQ0EsSUFBQSxFQUFNLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBRDVCO0lBRUEsUUFBQSxFQUNDO01BQUEsZUFBQSxFQUFpQixJQUFqQjtNQUNBLFdBQUEsRUFBYSxTQURiO0tBSEQ7SUFLQSxRQUFBLEVBQ0M7TUFBQSxlQUFBLEVBQWlCLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQXpDO01BQ0EsSUFBQSxFQUFNLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBRDVCO01BRUEsUUFBQSxFQUNDO1FBQUEsZUFBQSxFQUFpQixNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUF6QztRQUNBLFdBQUEsRUFBYSxJQURiO09BSEQ7S0FORDtHQTdGRDtFQXlHQSxRQUFBLEVBQ0M7SUFBQSxlQUFBLEVBQWlCLHFCQUFqQjtJQUNBLEtBQUEsRUFBTyx3QkFEUDtHQTFHRDtFQTZHQSxNQUFBLEVBQ0M7SUFBQSxJQUFBLCtEQUFNLFdBQVcsQ0FBRSx3QkFBbkI7SUFDQSxlQUFBLDJFQUFpQixpQkFBaUIsQ0FBRSx3QkFEcEM7SUFFQSxJQUFBLEVBQ0M7TUFBQSxJQUFBLCtEQUFNLFdBQVcsQ0FBRSxhQUFuQjtNQUNBLGVBQUEsK0RBQWlCLFdBQVcsQ0FBRSx3QkFEOUI7TUFFQSxNQUFBLCtEQUFRLFdBQVcsQ0FBRSxxQkFGckI7S0FIRDtJQU1BLEtBQUEsRUFDQztNQUFBLEtBQUEsRUFBTyxNQUFQO01BQ0EsTUFBQSxFQUFRLE1BRFI7TUFFQSxZQUFBLEVBQWMsTUFGZDtNQUdBLGVBQUEsRUFBaUIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFIdkM7S0FQRDtJQVdBLEdBQUEsRUFDQztNQUFBLGVBQUEsRUFBaUIsTUFBakI7TUFDQSxLQUFBLEVBQ0M7UUFBQSxLQUFBLEVBQU8sTUFBUDtPQUZEO0tBWkQ7R0E5R0Q7RUE4SEEsSUFBQSxFQUNDO0lBQUEsTUFBQSxFQUFRLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQWhDO0dBL0hEO0VBaUlBLFVBQUEsRUFBWSxJQWpJWjtFQW1JQSxRQUFBLEVBQVUsU0FBQyxNQUFEO0lBQ1QsSUFBRyxJQUFDLENBQUEsVUFBSjtBQUNDLGFBQU8sSUFBSyxDQUFBLE1BQUEsRUFEYjtLQUFBLE1BQUE7QUFHQyxhQUFPLEdBSFI7O0VBRFMsQ0FuSVY7OztBQTBJRCxhQUFhLENBQUMsT0FBZCxDQUFBOztBQUVBLE9BQU8sQ0FBQyxLQUFSLEdBQWdCOzs7O0FEdExoQixJQUFBLCtCQUFBO0VBQUE7OztBQUFBLElBQUEsR0FBTyxPQUFBLENBQVEsb0JBQVI7O0FBQ0wsU0FBVyxPQUFBLENBQVEsc0JBQVI7O0FBQ1gsT0FBUyxPQUFBLENBQVEsb0JBQVI7O0FBQ1QsUUFBVSxPQUFBLENBQVEscUJBQVI7O0FBRVosT0FBTyxDQUFDLElBQVIsR0FBZSxJQUFBLEdBQWE7OztFQUNkLGNBQUMsT0FBRDtBQUVaLFFBQUE7O01BRmEsVUFBVTs7SUFFdkIsSUFBQyxDQUFBLE9BQUQsMENBQTRCO0lBQzVCLElBQUMsQ0FBQSxPQUFELDRDQUE0QjtJQUM1QixJQUFDLENBQUEsT0FBRCw0Q0FBNEIsU0FBQTthQUFHO0lBQUg7SUFDNUIsSUFBQyxDQUFBLGFBQUQsa0RBQXdDLFNBQUE7YUFBRztJQUFIO0lBQ3hDLElBQUMsQ0FBQSxhQUFELGtEQUF3QyxTQUFBO2FBQUc7SUFBSDtJQUV4QyxJQUFHLElBQUMsQ0FBQSxPQUFELElBQWEsSUFBQyxDQUFBLE9BQWpCO0FBQThCLFlBQU0sK0NBQXBDOztJQUVBLElBQUMsQ0FBQSxLQUFELEdBQVMsT0FBTyxDQUFDO0lBQ2pCLElBQUMsQ0FBQSxRQUFEOzs7O0FBQStCLGNBQU07OztJQUVyQyxzQ0FBTSxDQUFDLENBQUMsUUFBRixDQUFXLE9BQVgsRUFDTDtNQUFBLElBQUEsRUFBTSxHQUFOO01BQVcsTUFBQSxFQUFRLElBQUMsQ0FBQSxRQUFwQjtNQUNBLEtBQUEsRUFBTyxJQUFDLENBQUEsUUFBUSxDQUFDLFNBRGpCO01BRUEsTUFBQSxFQUFRLElBQUMsQ0FBQSxRQUFRLENBQUMsVUFGbEI7TUFHQSxnQkFBQSxFQUFrQjtRQUFDLElBQUEsRUFBTSxFQUFQO09BSGxCO0tBREssQ0FBTjtJQU1BLElBQUMsQ0FBQSxZQUFELENBQWMsU0FBQyxLQUFEO0FBQ2IsVUFBQTtNQUFBLGdGQUEyQixDQUFFLDBCQUExQixnRkFBOEQsQ0FBRSwyQkFBMUIsS0FBc0MsS0FBL0U7ZUFDQyxNQUFBLENBQU8sSUFBUCxFQUFVLEtBQUssQ0FBQyxLQUFoQixFQUF1QixJQUFDLENBQUEsTUFBeEIsa0RBQXNELGdCQUF0RCxFQUREOztJQURhLENBQWQ7SUFJQSxJQUFDLENBQUEsS0FBRCxDQUFPLElBQUMsQ0FBQSxPQUFSO0lBQ0EsSUFBQyxDQUFBLEtBQUQsQ0FBTyxTQUFDLEtBQUQ7YUFBVyxLQUFLLENBQUMsZUFBTixDQUFBO0lBQVgsQ0FBUDtJQUVBLElBQUcsSUFBQyxDQUFBLE9BQUQsSUFBWSxJQUFDLENBQUEsT0FBaEI7TUFDQyxJQUFDLENBQUEsTUFBRCxHQUFjLElBQUEsS0FBQSxDQUNiO1FBQUEsSUFBQSxFQUFNLEdBQU47UUFBVyxNQUFBLEVBQVEsSUFBbkI7UUFDQSxDQUFBLEVBQU0sSUFBQyxDQUFBLE9BQUosR0FBaUIsS0FBSyxDQUFDLE1BQU4sQ0FBQSxDQUFqQixHQUFBLE1BREg7UUFFQSxLQUFBLEVBQU8sSUFBQyxDQUFBLEtBRlI7UUFHQSxNQUFBLEVBQVcsT0FBTyxDQUFDLE9BQVgsR0FBd0IsRUFBeEIsR0FBZ0MsRUFIeEM7UUFJQSxlQUFBLG9EQUEyQyxnQkFKM0M7T0FEYTtNQU9kLElBQUMsQ0FBQSxNQUFNLENBQUMsWUFBUixDQUFxQixTQUFDLEtBQUQ7ZUFBVyxNQUFBLENBQU8sSUFBUCxFQUFVLEtBQUssQ0FBQyxLQUFoQixFQUF1QixJQUFDLENBQUEsS0FBeEI7TUFBWCxDQUFyQjtNQUVBLElBQUcsSUFBQyxDQUFBLE9BQUo7UUFBaUIsSUFBQyxDQUFBLE1BQU0sQ0FBQyxLQUFSLENBQWMsSUFBQyxDQUFBLGFBQWYsRUFBakI7T0FBQSxNQUFBO1FBQ0ssSUFBQyxDQUFBLE1BQU0sQ0FBQyxLQUFSLENBQWMsSUFBQyxDQUFBLGFBQWYsRUFETDs7TUFHQSxJQUFDLENBQUEsTUFBTSxDQUFDLEtBQVIsQ0FBYyxTQUFDLEtBQUQ7ZUFBVyxLQUFLLENBQUMsZUFBTixDQUFBO01BQVgsQ0FBZDtNQUVBLElBQUcsT0FBTyxDQUFDLEtBQVg7UUFDQyxJQUFDLENBQUEsTUFBTSxDQUFDLEtBQVIsR0FBb0IsSUFBQSxJQUFJLENBQUMsT0FBTCxDQUNuQjtVQUFBLElBQUEsRUFBTSxHQUFOO1VBQVcsTUFBQSxFQUFRLElBQUMsQ0FBQSxNQUFwQjtVQUNBLENBQUEsRUFBRyxDQURIO1VBQ00sQ0FBQSxFQUFNLE9BQU8sQ0FBQyxPQUFYLEdBQXdCLEVBQXhCLEdBQWdDLEtBQUssQ0FBQyxNQUFOLENBQUEsQ0FEekM7VUFFQSxLQUFBLEVBQU8sSUFBQyxDQUFBLEtBRlI7VUFHQSxJQUFBLDBDQUFzQixVQUh0QjtTQURtQjtRQU1wQixJQUFHLE9BQU8sQ0FBQyxPQUFYO1VBQ0MsSUFBQyxDQUFBLE1BQU0sQ0FBQyxPQUFSLEdBQXNCLElBQUEsU0FBQSxDQUNyQjtZQUFBLElBQUEsRUFBTSxHQUFOO1lBQVcsTUFBQSxFQUFRLElBQUMsQ0FBQSxNQUFwQjtZQUNBLENBQUEsRUFBRyxDQURIO1lBQ00sQ0FBQSxFQUFHLEVBRFQ7WUFFQSxRQUFBLEVBQVUsRUFGVjtZQUdBLFVBQUEsRUFBWSxRQUhaO1lBSUEsS0FBQSxFQUFPLElBQUMsQ0FBQSxLQUpSO1lBS0EsSUFBQSw0Q0FBd0IsY0FMeEI7V0FEcUIsRUFEdkI7U0FQRDs7TUFnQkEsSUFBRyxPQUFPLENBQUMsSUFBWDtRQUNDLElBQUMsQ0FBQSxNQUFNLENBQUMsSUFBUixHQUFtQixJQUFBLElBQUEsQ0FDbEI7VUFBQSxJQUFBLEVBQU0sR0FBTjtVQUFXLE1BQUEsRUFBUSxJQUFDLENBQUEsTUFBcEI7VUFDQSxDQUFBLEVBQUcsS0FBSyxDQUFDLEtBQU4sQ0FBWSxDQUFDLEVBQWIsQ0FESDtVQUNxQixDQUFBLEVBQU0sT0FBTyxDQUFDLE9BQVgsR0FBd0IsRUFBeEIsR0FBZ0MsS0FBSyxDQUFDLE1BQU4sQ0FBQSxDQUR4RDtVQUVBLElBQUEsRUFBTSxPQUFPLENBQUMsSUFGZDtVQUdBLEtBQUEsRUFBTyxJQUFDLENBQUEsS0FIUjtTQURrQixFQURwQjtPQS9CRDs7SUFzQ0EsSUFBQyxDQUFBLENBQUQsR0FBSztJQUNMLElBQUMsQ0FBQSxRQUFRLENBQUMsT0FBVixDQUFrQixJQUFsQjtFQWpFWTs7OztHQUQyQjs7OztBRFp6QyxJQUFBLEtBQUE7RUFBQTs7O0FBQUEsS0FBQSxHQUFRLE9BQUEsQ0FBUSxxQkFBUjs7QUFXUixLQUFLLENBQUMsU0FBTixDQUNDLGdHQUREOztBQU9NLE9BQU8sQ0FBQzs7O0VBQ0Esa0JBQUMsT0FBRDtJQUNaLDBDQUFNLENBQUMsQ0FBQyxRQUFGLENBQVcsT0FBWCxFQUNMO01BQUEsSUFBQSxFQUFNLEdBQU47TUFDQSxVQUFBLEVBQVksUUFEWjtNQUVBLFFBQUEsRUFBVSxFQUZWO01BR0EsVUFBQSxFQUFZLEdBSFo7TUFJQSxVQUFBLEVBQVksR0FKWjtNQUtBLEtBQUEsRUFBTyxpQkFMUDtLQURLLENBQU47RUFEWTs7OztHQURpQjs7QUFVekIsT0FBTyxDQUFDOzs7RUFDQSxpQkFBQyxPQUFEO0lBQ1oseUNBQU0sQ0FBQyxDQUFDLFFBQUYsQ0FBVyxPQUFYLEVBQ0w7TUFBQSxJQUFBLEVBQU0sR0FBTjtNQUNBLFVBQUEsRUFBWSxRQURaO01BRUEsUUFBQSxFQUFVLEVBRlY7TUFHQSxVQUFBLEVBQVksR0FIWjtNQUlBLFVBQUEsRUFBWSxHQUpaO01BS0EsS0FBQSxFQUFPLGlCQUxQO0tBREssQ0FBTjtFQURZOzs7O0dBRGdCOztBQVV4QixPQUFPLENBQUM7OztFQUNBLGVBQUMsT0FBRDtJQUNaLHVDQUFNLENBQUMsQ0FBQyxRQUFGLENBQVcsT0FBWCxFQUNMO01BQUEsSUFBQSxFQUFNLEdBQU47TUFDQSxVQUFBLEVBQVksUUFEWjtNQUVBLFFBQUEsRUFBVSxFQUZWO01BR0EsVUFBQSxFQUFZLEdBSFo7TUFJQSxVQUFBLEVBQVksR0FKWjtNQUtBLEtBQUEsRUFBTyxpQkFMUDtLQURLLENBQU47RUFEWTs7OztHQURjOztBQVN0QixPQUFPLENBQUM7OztFQUNBLGlCQUFDLE9BQUQ7SUFDWix5Q0FBTSxDQUFDLENBQUMsUUFBRixDQUFXLE9BQVgsRUFDTDtNQUFBLElBQUEsRUFBTSxHQUFOO01BQ0EsVUFBQSxFQUFZLFFBRFo7TUFFQSxRQUFBLEVBQVUsRUFGVjtNQUdBLFVBQUEsRUFBWSxHQUhaO01BSUEsVUFBQSxFQUFZLEdBSlo7TUFLQSxLQUFBLEVBQU8saUJBTFA7S0FESyxDQUFOO0VBRFk7Ozs7R0FEZ0I7O0FBU3hCLE9BQU8sQ0FBQzs7O0VBQ0EsZUFBQyxPQUFEO0lBQ1osdUNBQU0sQ0FBQyxDQUFDLFFBQUYsQ0FBVyxPQUFYLEVBQ0w7TUFBQSxJQUFBLEVBQU0sR0FBTjtNQUNBLFVBQUEsRUFBWSxRQURaO01BRUEsUUFBQSxFQUFVLEVBRlY7TUFHQSxVQUFBLEVBQVksR0FIWjtNQUlBLFVBQUEsRUFBWSxHQUpaO01BS0EsS0FBQSxFQUFPLGlCQUxQO0tBREssQ0FBTjtFQURZOzs7O0dBRGM7O0FBU3RCLE9BQU8sQ0FBQzs7O0VBQ0EsY0FBQyxPQUFEO0lBQ1osc0NBQU0sQ0FBQyxDQUFDLFFBQUYsQ0FBVyxPQUFYLEVBQ0w7TUFBQSxJQUFBLEVBQU0sR0FBTjtNQUNBLFVBQUEsRUFBWSxRQURaO01BRUEsUUFBQSxFQUFVLEVBRlY7TUFHQSxVQUFBLEVBQVksR0FIWjtNQUlBLFVBQUEsRUFBWSxHQUpaO01BS0EsS0FBQSxFQUFPLGlCQUxQO0tBREssQ0FBTjtFQURZOzs7O0dBRGE7O0FBU3JCLE9BQU8sQ0FBQzs7O0VBQ0EsZUFBQyxPQUFEO0lBQ1osdUNBQU0sQ0FBQyxDQUFDLFFBQUYsQ0FBVyxPQUFYLEVBQ0w7TUFBQSxJQUFBLEVBQU0sR0FBTjtNQUNBLFVBQUEsRUFBWSxRQURaO01BRUEsUUFBQSxFQUFVLEVBRlY7TUFHQSxVQUFBLEVBQVksR0FIWjtNQUlBLFVBQUEsRUFBWSxHQUpaO01BS0EsS0FBQSxFQUFPLGlCQUxQO0tBREssQ0FBTjtFQURZOzs7O0dBRGM7O0FBU3RCLE9BQU8sQ0FBQzs7O0VBQ0EsaUJBQUMsT0FBRDtJQUNaLHlDQUFNLENBQUMsQ0FBQyxRQUFGLENBQVcsT0FBWCxFQUNMO01BQUEsSUFBQSxFQUFNLEdBQU47TUFDQSxVQUFBLEVBQVksUUFEWjtNQUVBLFFBQUEsRUFBVSxFQUZWO01BR0EsVUFBQSxFQUFZLEdBSFo7TUFJQSxVQUFBLEVBQVksR0FKWjtNQUtBLEtBQUEsRUFBTyxpQkFMUDtLQURLLENBQU47RUFEWTs7OztHQURnQjs7QUFTeEIsT0FBTyxDQUFDOzs7RUFDQSxnQkFBQyxPQUFEO0lBQ1osd0NBQU0sQ0FBQyxDQUFDLFFBQUYsQ0FBVyxPQUFYLEVBQ0w7TUFBQSxJQUFBLEVBQU0sR0FBTjtNQUNBLFVBQUEsRUFBWSxRQURaO01BRUEsUUFBQSxFQUFVLEVBRlY7TUFHQSxVQUFBLEVBQVksR0FIWjtNQUlBLFVBQUEsRUFBWSxHQUpaO01BS0EsS0FBQSxFQUFPLFNBTFA7TUFNQSxhQUFBLEVBQWUsR0FOZjtNQU9BLE9BQUEsRUFBUztRQUFDLElBQUEsRUFBTSxDQUFQO1FBQVUsS0FBQSxFQUFPLENBQWpCO1FBQW9CLEdBQUEsRUFBSyxDQUF6QjtRQUE0QixNQUFBLEVBQVEsQ0FBcEM7T0FQVDtLQURLLENBQU47RUFEWTs7OztHQURlOzs7O0FEbkY3QixJQUFBLGlCQUFBO0VBQUE7OztBQUFFLFFBQVUsT0FBQSxDQUFRLHFCQUFSOztBQUNWLE9BQVMsT0FBQSxDQUFRLG9CQUFSOztBQUVYLE9BQU8sQ0FBQyxJQUFSLEdBQXFCOzs7RUFDUCxjQUFDLE9BQUQ7QUFFWixRQUFBOztNQUZhLFVBQVU7O0lBRXZCLElBQUMsQ0FBQSxNQUFELHlDQUEwQjtJQUMxQixJQUFDLENBQUEsS0FBRCwwQ0FBd0I7SUFDeEIsSUFBQyxDQUFBLFdBQUQsZ0RBQW9DLFNBQUE7YUFBRyxHQUFHLENBQUMsV0FBVyxDQUFDLElBQWhCLENBQUE7SUFBSDtJQUNwQyxJQUFDLENBQUEsSUFBRCxHQUFRLE9BQU8sQ0FBQztJQUVoQixzQ0FBTSxDQUFDLENBQUMsUUFBRixDQUFXLE9BQVgsRUFDTDtNQUFBLElBQUEsRUFBTSxNQUFOO01BQ0EsZ0JBQUEsRUFBa0I7UUFBQyxLQUFBLEVBQU8sb0JBQVI7T0FEbEI7TUFFQSxZQUFBLEVBQWMsQ0FGZDtNQUVpQixXQUFBLEVBQWEsZ0JBRjlCO01BRWdELFVBQUEsRUFBWSxDQUY1RDtLQURLLENBQU47SUFLQSxJQUFDLENBQUEsaUJBQUQsQ0FBbUIsU0FBQyxPQUFELEVBQVUsSUFBVixFQUFnQixTQUFoQjtBQUE4QixVQUFBOzhDQUFLLENBQUUsVUFBUCxDQUFrQixJQUFsQjtJQUE5QixDQUFuQjtFQVpZOztpQkFjYixPQUFBLEdBQVMsU0FBQyxPQUFEO0FBQ1IsUUFBQTs7TUFEUyxVQUFVOztJQUNuQixJQUFBLEdBQVcsSUFBQSxJQUFBLENBQUssQ0FBQyxDQUFDLFFBQUYsQ0FBVyxPQUFYLEVBQ2Y7TUFBQSxJQUFBLEVBQU0sSUFBQyxDQUFBLElBQVA7S0FEZSxDQUFMO0FBRVgsV0FBTztFQUhDOztpQkFLVCxNQUFBLEdBQVEsU0FBQyxJQUFEO0lBQ1AsSUFBRyxjQUFBLElBQVUsSUFBQyxDQUFBLE9BQUQsS0FBYyxJQUEzQjthQUNDLElBQUMsQ0FBQSxRQUFELENBQVUsSUFBVixFQUREOztFQURPOzs7O0dBcEJ5Qjs7OztBRFpsQyxJQUFBOztBQUFBLElBQUEsR0FBTyxPQUFBLENBQVEsb0JBQVI7O0FBQ0wsU0FBVyxPQUFBLENBQVEsc0JBQVI7O0FBQ1gsUUFBVSxPQUFBLENBQVEscUJBQVI7O0FBQ1YsT0FBUyxPQUFBLENBQVEsb0JBQVI7O0FBQ1QsU0FBVyxPQUFBLENBQVEsc0JBQVI7O0FBQ1gsWUFBYyxPQUFBLENBQVEseUJBQVI7O0FBQ2QsU0FBVyxPQUFBLENBQVEsc0JBQVI7O0FBQ1gsV0FBYSxPQUFBLENBQVEsd0JBQVI7O0FBQ2IsV0FBYSxPQUFBLENBQVEsd0JBQVI7O0FBQ2IsU0FBVyxPQUFBLENBQVEsc0JBQVI7O0FBQ1gsVUFBWSxPQUFBLENBQVEsdUJBQVI7O0FBQ1osV0FBYSxPQUFBLENBQVEsd0JBQVI7O0FBQ2IsT0FBUyxPQUFBLENBQVEsb0JBQVI7O0FBQ1QsU0FBVyxPQUFBLENBQVEsc0JBQVI7O0FBQ1gsWUFBYyxPQUFBLENBQVEseUJBQVI7O0FBQ2QsU0FBVyxPQUFBLENBQVEsc0JBQVI7O0FBQ1gsZUFBaUIsT0FBQSxDQUFRLDRCQUFSOztBQUNqQixXQUFhLE9BQUEsQ0FBUSx3QkFBUjs7QUFDYixVQUFZLE9BQUEsQ0FBUSx1QkFBUjs7QUFDWixjQUFnQixPQUFBLENBQVEsMkJBQVI7O0FBQ2hCLGFBQWUsT0FBQSxDQUFRLDBCQUFSOztBQUNmLGVBQWlCLE9BQUEsQ0FBUSw0QkFBUjs7QUFDakIsT0FBUyxPQUFBLENBQVEsb0JBQVI7O0FBQ1QsT0FBUyxPQUFBLENBQVEsb0JBQVI7O0FBQ1QsWUFBYyxPQUFBLENBQVEseUJBQVI7O0FBQ2QsTUFBUSxPQUFBLENBQVEsbUJBQVI7O0FBU1YsT0FBTyxDQUFDLE1BQVIsR0FBaUI7O0FBQ2pCLE9BQU8sQ0FBQyxLQUFSLEdBQWdCOztBQUNoQixPQUFPLENBQUMsSUFBUixHQUFlOztBQUNmLE9BQU8sQ0FBQyxNQUFSLEdBQWlCOztBQUNqQixPQUFPLENBQUMsU0FBUixHQUFvQjs7QUFDcEIsT0FBTyxDQUFDLE1BQVIsR0FBaUI7O0FBQ2pCLE9BQU8sQ0FBQyxRQUFSLEdBQW1COztBQUNuQixPQUFPLENBQUMsUUFBUixHQUFtQjs7QUFDbkIsT0FBTyxDQUFDLE1BQVIsR0FBaUI7O0FBQ2pCLE9BQU8sQ0FBQyxPQUFSLEdBQWtCOztBQUNsQixPQUFPLENBQUMsUUFBUixHQUFtQjs7QUFDbkIsT0FBTyxDQUFDLElBQVIsR0FBZTs7QUFDZixPQUFPLENBQUMsTUFBUixHQUFpQjs7QUFDakIsT0FBTyxDQUFDLFNBQVIsR0FBb0I7O0FBQ3BCLE9BQU8sQ0FBQyxNQUFSLEdBQWlCOztBQUNqQixPQUFPLENBQUMsWUFBUixHQUF1Qjs7QUFDdkIsT0FBTyxDQUFDLFFBQVIsR0FBbUI7O0FBQ25CLE9BQU8sQ0FBQyxPQUFSLEdBQWtCOztBQUNsQixPQUFPLENBQUMsWUFBUixHQUF1Qjs7QUFDdkIsT0FBTyxDQUFDLFVBQVIsR0FBcUI7O0FBQ3JCLE9BQU8sQ0FBQyxXQUFSLEdBQXNCOztBQUN0QixPQUFPLENBQUMsSUFBUixHQUFlOztBQUNmLE9BQU8sQ0FBQyxJQUFSLEdBQWU7O0FBQ2YsT0FBTyxDQUFDLEdBQVIsR0FBYzs7QUFFZCxPQUFPLENBQUMsS0FBUixHQUFnQixLQUFBLEdBQVEsSUFBSSxDQUFDOztBQUM3QixPQUFPLENBQUMsUUFBUixHQUFtQixRQUFBLEdBQVcsSUFBSSxDQUFDOztBQUNuQyxPQUFPLENBQUMsT0FBUixHQUFrQixPQUFBLEdBQVUsSUFBSSxDQUFDOztBQUNqQyxPQUFPLENBQUMsT0FBUixHQUFrQixPQUFBLEdBQVUsSUFBSSxDQUFDOztBQUNqQyxPQUFPLENBQUMsS0FBUixHQUFnQixLQUFBLEdBQVEsSUFBSSxDQUFDOztBQUM3QixPQUFPLENBQUMsS0FBUixHQUFnQixLQUFBLEdBQVEsSUFBSSxDQUFDOztBQUM3QixPQUFPLENBQUMsT0FBUixHQUFrQixPQUFBLEdBQVUsSUFBSSxDQUFDOztBQUNqQyxPQUFPLENBQUMsWUFBUixHQUF1QixZQUFBLEdBQWUsSUFBSSxDQUFDOztBQUUzQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFwQixDQUFBIn0=
