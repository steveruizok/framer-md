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
    var i, j, notch, ref, ref1, round;
    if (options == null) {
      options = {};
    }
    this._notched = (ref = options.notched) != null ? ref : false;
    Slider.__super__.constructor.call(this, _.defaults(options, {
      name: '.',
      height: 2,
      knobSize: 32,
      backgroundColor: 'rgba(0,0,0,.26)',
      min: 1,
      max: 10
    }));
    this.fill.backgroundColor = Theme.slider.fill;
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
      size: Theme.slider.knob.size,
      borderRadius: Theme.slider.knob.radius,
      backgroundColor: Theme.slider.knob.backgroundColor,
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
          width: Theme.slider.notch.width,
          height: Theme.slider.notch.height,
          borderRadius: Theme.slider.notch.borderRadius,
          backgroundColor: Theme.slider.notch.backgroundColor
        });
      }
      this.tip = new Layer({
        name: 'Tip',
        parent: this.knob,
        x: Align.center,
        y: -24,
        width: 26,
        height: 32,
        html: '<svg width="26px" height="32px" viewBox="0 0 26 32"><path d="M13,0.1 C20.2,0.1 26,6 26,13.3 C26,17 24,20.9 18.7,26.2 L13,32 L7.2,26.2 C2,20.8 0,16.9 0,13.3 C-3.55271368e-15,6 5.8,0.1 13,0.1 L13,0.1 Z" fill="' + Theme.slider.tip.backgroundColor + '"></path></svg>',
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
        color: Theme.slider.tip.value.color,
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
var Theme, menuColor, menuInvert, menuTextColor, modifyColor, primaryColor, primaryInvert, ref, ref1, ref2, ref3, ref4, secondaryColor, source;

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
    fill: (ref = typeof slider_fill !== "undefined" && slider_fill !== null ? slider_fill.backgroundColor : void 0) != null ? ref : source.colors.primary.dark,
    backgroundColor: (ref1 = typeof slider_background !== "undefined" && slider_background !== null ? slider_background.backgroundColor : void 0) != null ? ref1 : 'rgba(0,0,0,.2)',
    knob: {
      size: (ref2 = typeof slider_knob !== "undefined" && slider_knob !== null ? slider_knob.size : void 0) != null ? ref2 : 12,
      backgroundColor: (ref3 = typeof slider_knob !== "undefined" && slider_knob !== null ? slider_knob.backgroundColor : void 0) != null ? ref3 : source.colors.primary.light,
      radius: (ref4 = typeof slider_knob !== "undefined" && slider_knob !== null ? slider_knob.borderRadius : void 0) != null ? ref4 : 12
    },
    notch: {
      width: 2,
      height: 2,
      borderRadius: 2,
      backgroundColor: source.colors.primary.text
    },
    tip: {
      backgroundColor: source.colors.primary.light,
      value: {
        color: source.colors.primary.text
      }
    }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3N0ZXZlcnVpei9MaWJyYXJ5L01vYmlsZSBEb2N1bWVudHMvY29tfmFwcGxlfkNsb3VkRG9jcy9HaXRIdWIvZnJhbWVyLW1kL3NsaWRlck5ldy5mcmFtZXIvbW9kdWxlcy9tZC5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9zdGV2ZXJ1aXovTGlicmFyeS9Nb2JpbGUgRG9jdW1lbnRzL2NvbX5hcHBsZX5DbG91ZERvY3MvR2l0SHViL2ZyYW1lci1tZC9zbGlkZXJOZXcuZnJhbWVyL21vZHVsZXMvbWQtY29tcG9uZW50cy9WaWV3LmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3N0ZXZlcnVpei9MaWJyYXJ5L01vYmlsZSBEb2N1bWVudHMvY29tfmFwcGxlfkNsb3VkRG9jcy9HaXRIdWIvZnJhbWVyLW1kL3NsaWRlck5ldy5mcmFtZXIvbW9kdWxlcy9tZC1jb21wb25lbnRzL1R5cGUuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvc3RldmVydWl6L0xpYnJhcnkvTW9iaWxlIERvY3VtZW50cy9jb21+YXBwbGV+Q2xvdWREb2NzL0dpdEh1Yi9mcmFtZXItbWQvc2xpZGVyTmV3LmZyYW1lci9tb2R1bGVzL21kLWNvbXBvbmVudHMvVGlsZS5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9zdGV2ZXJ1aXovTGlicmFyeS9Nb2JpbGUgRG9jdW1lbnRzL2NvbX5hcHBsZX5DbG91ZERvY3MvR2l0SHViL2ZyYW1lci1tZC9zbGlkZXJOZXcuZnJhbWVyL21vZHVsZXMvbWQtY29tcG9uZW50cy9UaGVtZS5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9zdGV2ZXJ1aXovTGlicmFyeS9Nb2JpbGUgRG9jdW1lbnRzL2NvbX5hcHBsZX5DbG91ZERvY3MvR2l0SHViL2ZyYW1lci1tZC9zbGlkZXJOZXcuZnJhbWVyL21vZHVsZXMvbWQtY29tcG9uZW50cy9UZXh0RmllbGQuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvc3RldmVydWl6L0xpYnJhcnkvTW9iaWxlIERvY3VtZW50cy9jb21+YXBwbGV+Q2xvdWREb2NzL0dpdEh1Yi9mcmFtZXItbWQvc2xpZGVyTmV3LmZyYW1lci9tb2R1bGVzL21kLWNvbXBvbmVudHMvU3dpdGNoLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3N0ZXZlcnVpei9MaWJyYXJ5L01vYmlsZSBEb2N1bWVudHMvY29tfmFwcGxlfkNsb3VkRG9jcy9HaXRIdWIvZnJhbWVyLW1kL3NsaWRlck5ldy5mcmFtZXIvbW9kdWxlcy9tZC1jb21wb25lbnRzL1N0YXR1c0Jhci5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9zdGV2ZXJ1aXovTGlicmFyeS9Nb2JpbGUgRG9jdW1lbnRzL2NvbX5hcHBsZX5DbG91ZERvY3MvR2l0SHViL2ZyYW1lci1tZC9zbGlkZXJOZXcuZnJhbWVyL21vZHVsZXMvbWQtY29tcG9uZW50cy9TbmFja2Jhci5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9zdGV2ZXJ1aXovTGlicmFyeS9Nb2JpbGUgRG9jdW1lbnRzL2NvbX5hcHBsZX5DbG91ZERvY3MvR2l0SHViL2ZyYW1lci1tZC9zbGlkZXJOZXcuZnJhbWVyL21vZHVsZXMvbWQtY29tcG9uZW50cy9TbGlkZXIuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvc3RldmVydWl6L0xpYnJhcnkvTW9iaWxlIERvY3VtZW50cy9jb21+YXBwbGV+Q2xvdWREb2NzL0dpdEh1Yi9mcmFtZXItbWQvc2xpZGVyTmV3LmZyYW1lci9tb2R1bGVzL21kLWNvbXBvbmVudHMvUm93SXRlbS5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9zdGV2ZXJ1aXovTGlicmFyeS9Nb2JpbGUgRG9jdW1lbnRzL2NvbX5hcHBsZX5DbG91ZERvY3MvR2l0SHViL2ZyYW1lci1tZC9zbGlkZXJOZXcuZnJhbWVyL21vZHVsZXMvbWQtY29tcG9uZW50cy9SaXBwbGUuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvc3RldmVydWl6L0xpYnJhcnkvTW9iaWxlIERvY3VtZW50cy9jb21+YXBwbGV+Q2xvdWREb2NzL0dpdEh1Yi9mcmFtZXItbWQvc2xpZGVyTmV3LmZyYW1lci9tb2R1bGVzL21kLWNvbXBvbmVudHMvUmFkaW9ib3guY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvc3RldmVydWl6L0xpYnJhcnkvTW9iaWxlIERvY3VtZW50cy9jb21+YXBwbGV+Q2xvdWREb2NzL0dpdEh1Yi9mcmFtZXItbWQvc2xpZGVyTmV3LmZyYW1lci9tb2R1bGVzL21kLWNvbXBvbmVudHMvUGFnZS5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9zdGV2ZXJ1aXovTGlicmFyeS9Nb2JpbGUgRG9jdW1lbnRzL2NvbX5hcHBsZX5DbG91ZERvY3MvR2l0SHViL2ZyYW1lci1tZC9zbGlkZXJOZXcuZnJhbWVyL21vZHVsZXMvbWQtY29tcG9uZW50cy9Ob3RpZmljYXRpb24uY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvc3RldmVydWl6L0xpYnJhcnkvTW9iaWxlIERvY3VtZW50cy9jb21+YXBwbGV+Q2xvdWREb2NzL0dpdEh1Yi9mcmFtZXItbWQvc2xpZGVyTmV3LmZyYW1lci9tb2R1bGVzL21kLWNvbXBvbmVudHMvTWVudU92ZXJsYXkuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvc3RldmVydWl6L0xpYnJhcnkvTW9iaWxlIERvY3VtZW50cy9jb21+YXBwbGV+Q2xvdWREb2NzL0dpdEh1Yi9mcmFtZXItbWQvc2xpZGVyTmV3LmZyYW1lci9tb2R1bGVzL21kLWNvbXBvbmVudHMvTWVudUJ1dHRvbi5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9zdGV2ZXJ1aXovTGlicmFyeS9Nb2JpbGUgRG9jdW1lbnRzL2NvbX5hcHBsZX5DbG91ZERvY3MvR2l0SHViL2ZyYW1lci1tZC9zbGlkZXJOZXcuZnJhbWVyL21vZHVsZXMvbWQtY29tcG9uZW50cy9JY29uLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3N0ZXZlcnVpei9MaWJyYXJ5L01vYmlsZSBEb2N1bWVudHMvY29tfmFwcGxlfkNsb3VkRG9jcy9HaXRIdWIvZnJhbWVyLW1kL3NsaWRlck5ldy5mcmFtZXIvbW9kdWxlcy9tZC1jb21wb25lbnRzL0hlYWRlci5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9zdGV2ZXJ1aXovTGlicmFyeS9Nb2JpbGUgRG9jdW1lbnRzL2NvbX5hcHBsZX5DbG91ZERvY3MvR2l0SHViL2ZyYW1lci1tZC9zbGlkZXJOZXcuZnJhbWVyL21vZHVsZXMvbWQtY29tcG9uZW50cy9HcmlkTGlzdC5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9zdGV2ZXJ1aXovTGlicmFyeS9Nb2JpbGUgRG9jdW1lbnRzL2NvbX5hcHBsZX5DbG91ZERvY3MvR2l0SHViL2ZyYW1lci1tZC9zbGlkZXJOZXcuZnJhbWVyL21vZHVsZXMvbWQtY29tcG9uZW50cy9EaXZpZGVyLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3N0ZXZlcnVpei9MaWJyYXJ5L01vYmlsZSBEb2N1bWVudHMvY29tfmFwcGxlfkNsb3VkRG9jcy9HaXRIdWIvZnJhbWVyLW1kL3NsaWRlck5ldy5mcmFtZXIvbW9kdWxlcy9tZC1jb21wb25lbnRzL0RpYWxvZy5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9zdGV2ZXJ1aXovTGlicmFyeS9Nb2JpbGUgRG9jdW1lbnRzL2NvbX5hcHBsZX5DbG91ZERvY3MvR2l0SHViL2ZyYW1lci1tZC9zbGlkZXJOZXcuZnJhbWVyL21vZHVsZXMvbWQtY29tcG9uZW50cy9DaGVja2JveC5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9zdGV2ZXJ1aXovTGlicmFyeS9Nb2JpbGUgRG9jdW1lbnRzL2NvbX5hcHBsZX5DbG91ZERvY3MvR2l0SHViL2ZyYW1lci1tZC9zbGlkZXJOZXcuZnJhbWVyL21vZHVsZXMvbWQtY29tcG9uZW50cy9CdXR0b24uY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvc3RldmVydWl6L0xpYnJhcnkvTW9iaWxlIERvY3VtZW50cy9jb21+YXBwbGV+Q2xvdWREb2NzL0dpdEh1Yi9mcmFtZXItbWQvc2xpZGVyTmV3LmZyYW1lci9tb2R1bGVzL21kLWNvbXBvbmVudHMvQm90dG9tTmF2LmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3N0ZXZlcnVpei9MaWJyYXJ5L01vYmlsZSBEb2N1bWVudHMvY29tfmFwcGxlfkNsb3VkRG9jcy9HaXRIdWIvZnJhbWVyLW1kL3NsaWRlck5ldy5mcmFtZXIvbW9kdWxlcy9tZC1jb21wb25lbnRzL0FwcC5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9zdGV2ZXJ1aXovTGlicmFyeS9Nb2JpbGUgRG9jdW1lbnRzL2NvbX5hcHBsZX5DbG91ZERvY3MvR2l0SHViL2ZyYW1lci1tZC9zbGlkZXJOZXcuZnJhbWVyL21vZHVsZXMvbWQtY29tcG9uZW50cy9BY3Rpb25CdXR0b24uY29mZmVlIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJUeXBlID0gcmVxdWlyZSAnbWQtY29tcG9uZW50cy9UeXBlJ1xueyBSaXBwbGUgfSA9IHJlcXVpcmUgJ21kLWNvbXBvbmVudHMvUmlwcGxlJ1xueyBUaGVtZSB9ID0gcmVxdWlyZSAnbWQtY29tcG9uZW50cy9UaGVtZSdcbnsgSWNvbiB9ID0gcmVxdWlyZSAnbWQtY29tcG9uZW50cy9JY29uJ1xueyBCdXR0b24gfSA9IHJlcXVpcmUgJ21kLWNvbXBvbmVudHMvQnV0dG9uJ1xueyBUZXh0RmllbGQgfSA9IHJlcXVpcmUgJ21kLWNvbXBvbmVudHMvVGV4dEZpZWxkJ1xueyBTbGlkZXIgfSA9IHJlcXVpcmUgJ21kLWNvbXBvbmVudHMvU2xpZGVyJ1xueyBSYWRpb2JveCB9ID0gcmVxdWlyZSAnbWQtY29tcG9uZW50cy9SYWRpb2JveCdcbnsgQ2hlY2tib3ggfSA9IHJlcXVpcmUgJ21kLWNvbXBvbmVudHMvQ2hlY2tib3gnXG57IFN3aXRjaCB9ID0gcmVxdWlyZSAnbWQtY29tcG9uZW50cy9Td2l0Y2gnXG57IERpdmlkZXIgfSA9IHJlcXVpcmUgJ21kLWNvbXBvbmVudHMvRGl2aWRlcidcbnsgR3JpZExpc3QgfSA9IHJlcXVpcmUgJ21kLWNvbXBvbmVudHMvR3JpZExpc3QnXG57IFRpbGUgfSA9IHJlcXVpcmUgJ21kLWNvbXBvbmVudHMvVGlsZSdcbnsgRGlhbG9nIH0gPSByZXF1aXJlICdtZC1jb21wb25lbnRzL0RpYWxvZydcbnsgU3RhdHVzQmFyIH0gPSByZXF1aXJlICdtZC1jb21wb25lbnRzL1N0YXR1c0JhcidcbnsgSGVhZGVyIH0gPSByZXF1aXJlICdtZC1jb21wb25lbnRzL0hlYWRlcidcbnsgTm90aWZpY2F0aW9uIH0gPSByZXF1aXJlICdtZC1jb21wb25lbnRzL05vdGlmaWNhdGlvbidcbnsgU25hY2tiYXIgfSA9IHJlcXVpcmUgJ21kLWNvbXBvbmVudHMvU25hY2tiYXInXG57IFJvd0l0ZW0gfSA9IHJlcXVpcmUgJ21kLWNvbXBvbmVudHMvUm93SXRlbSdcbnsgTWVudU92ZXJsYXkgfSA9IHJlcXVpcmUgJ21kLWNvbXBvbmVudHMvTWVudU92ZXJsYXknXG57IE1lbnVCdXR0b24gfSA9IHJlcXVpcmUgJ21kLWNvbXBvbmVudHMvTWVudUJ1dHRvbidcbnsgQWN0aW9uQnV0dG9uIH0gPSByZXF1aXJlICdtZC1jb21wb25lbnRzL0FjdGlvbkJ1dHRvbidcbnsgVmlldyB9ID0gcmVxdWlyZSAnbWQtY29tcG9uZW50cy9WaWV3J1xueyBQYWdlIH0gPSByZXF1aXJlICdtZC1jb21wb25lbnRzL1BhZ2UnXG57IEJvdHRvbU5hdiB9ID0gcmVxdWlyZSAnbWQtY29tcG9uZW50cy9Cb3R0b21OYXYnXG57IEFwcCB9ID0gcmVxdWlyZSAnbWQtY29tcG9uZW50cy9BcHAnXG5cbiMgVE9ETzogQ2hhbmdlIEFwcCBmcm9tIG1hc3RlciBmbG93IGNvbXBvbmVudCB0byBTY3JlZW4gbWFuYWdlci5cbiMgQXBwIHNob3VsZG4ndCBkaXJlY3RseSBtYW5hZ2UgcGFnZXM6IGEgbmV3IGNsYXNzLCAnc2NyZWVuJyB3aWxsIG1hbmFnZSBQYWdlcy5cbiMgVGFicyBhbGxvdyBuYXZpZ2F0aW9uIGJldHdlZW4gU2NyZWVucy4gQ29udGVudCBpcyBzdGlsbCBhZGRlZCB0byBQYWdlcy5cblxuIyBPdXIgZ29hbCBpcyB0byByZXF1aXJlIG9ubHkgb25lIHJlcXVpcmUgaW4gRnJhbWVyIHByb2plY3QsIHNvIHRoaXMgXG4jIGlzIGEgY2x1bmt5IHdheSBvZiBsZXR0aW5nIHVzZXIgY3JlYXRlIHRleHQgdXNpbmcgbWQuVGl0bGUsIGV0Yy5cblxuZXhwb3J0cy5SaXBwbGUgPSBSaXBwbGVcbmV4cG9ydHMuVGhlbWUgPSBUaGVtZVxuZXhwb3J0cy5JY29uID0gSWNvblxuZXhwb3J0cy5CdXR0b24gPSBCdXR0b25cbmV4cG9ydHMuVGV4dEZpZWxkID0gVGV4dEZpZWxkXG5leHBvcnRzLlNsaWRlciA9IFNsaWRlclxuZXhwb3J0cy5SYWRpb2JveCA9IFJhZGlvYm94XG5leHBvcnRzLkNoZWNrYm94ID0gQ2hlY2tib3hcbmV4cG9ydHMuU3dpdGNoID0gU3dpdGNoXG5leHBvcnRzLkRpdmlkZXIgPSBEaXZpZGVyXG5leHBvcnRzLkdyaWRMaXN0ID0gR3JpZExpc3RcbmV4cG9ydHMuVGlsZSA9IFRpbGVcbmV4cG9ydHMuRGlhbG9nID0gRGlhbG9nXG5leHBvcnRzLlN0YXR1c0JhciA9IFN0YXR1c0JhclxuZXhwb3J0cy5IZWFkZXIgPSBIZWFkZXJcbmV4cG9ydHMuTm90aWZpY2F0aW9uID0gTm90aWZpY2F0aW9uXG5leHBvcnRzLlNuYWNrYmFyID0gU25hY2tiYXJcbmV4cG9ydHMuUm93SXRlbSA9IFJvd0l0ZW1cbmV4cG9ydHMuQWN0aW9uQnV0dG9uID0gQWN0aW9uQnV0dG9uXG5leHBvcnRzLk1lbnVCdXR0b24gPSBNZW51QnV0dG9uXG5leHBvcnRzLk1lbnVPdmVybGF5ID0gTWVudU92ZXJsYXlcbmV4cG9ydHMuVmlldyA9IFZpZXdcbmV4cG9ydHMuUGFnZSA9IFBhZ2VcbmV4cG9ydHMuQXBwID0gQXBwXG5cbmV4cG9ydHMuVGl0bGUgPSBUaXRsZSA9IFR5cGUuVGl0bGVcbmV4cG9ydHMuSGVhZGxpbmUgPSBIZWFkbGluZSA9IFR5cGUuSGVhZGxpbmVcbmV4cG9ydHMuU3ViaGVhZCA9IFN1YmhlYWQgPSBUeXBlLlN1YmhlYWRcbmV4cG9ydHMuUmVndWxhciA9IFJlZ3VsYXIgPSBUeXBlLlJlZ3VsYXJcbmV4cG9ydHMuQm9keTIgPSBCb2R5MiA9IFR5cGUuQm9keTJcbmV4cG9ydHMuQm9keTEgPSBCb2R5MSA9IFR5cGUuQm9keTFcbmV4cG9ydHMuQ2FwdGlvbiA9IENhcHRpb24gPSBUeXBlLkNhcHRpb25cbmV4cG9ydHMuRGlhbG9nQWN0aW9uID0gRGlhbG9nQWN0aW9uID0gVHlwZS5EaWFsb2dBY3Rpb25cblxuRnJhbWVyLkV4dHJhcy5IaW50cy5kaXNhYmxlKClcblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuIiwiIyBcdGRQICAgICBkUCBvb1xuIyBcdDg4ICAgICA4OFxuIyBcdDg4ICAgIC44UCBkUCAuZDg4ODhiLiBkUCAgZFAgIGRQXG4jIFx0ODggICAgZDgnIDg4IDg4b29vb2Q4IDg4ICA4OCAgODhcbiMgXHQ4OCAgLmQ4UCAgODggODguICAuLi4gODguODhiLjg4J1xuIyBcdDg4ODg4OCcgICBkUCBgODg4ODhQJyA4ODg4UCBZOFBcblxuIyBXb3JrcyB3aXRob3V0IGFuIGFwcCwgYnV0IHdpbGwgaW50ZWdyYXRlIHdpdGggYXBwIGlmIHNldCB3aXRoIG9wdGlvbnMuYXBwLlxuXG57IFRoZW1lIH0gPSByZXF1aXJlICdtZC1jb21wb25lbnRzL1RoZW1lJ1xueyBQYWdlIH0gPSByZXF1aXJlICdtZC1jb21wb25lbnRzL1BhZ2UnXG5cbmV4cG9ydHMuVmlldyA9IGNsYXNzIFZpZXcgZXh0ZW5kcyBGbG93Q29tcG9uZW50XG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXG5cdFx0QF90aXRsZSA9IG9wdGlvbnMudGl0bGUgPyAnSG9tZSdcblx0XHRAX2ljb24gPSBvcHRpb25zLmljb24gPyAnbWVudSdcblx0XHRAX2ljb25BY3Rpb24gPSBvcHRpb25zLmljb25BY3Rpb24gPyAtPiBhcHAubWVudU92ZXJsYXkuc2hvdygpIFxuXHRcdEBfYXBwID0gb3B0aW9ucy5hcHBcblxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdG5hbWU6ICdWaWV3J1xuXHRcdFx0YW5pbWF0aW9uT3B0aW9uczoge2N1cnZlOiBcInNwcmluZygzMDAsIDM1LCAwKVwifVxuXHRcdFx0c2hhZG93U3ByZWFkOiAyLCBzaGFkb3dDb2xvcjogJ3JnYmEoMCwwLDAsLjEpJywgc2hhZG93Qmx1cjogNlxuXG5cdFx0QG9uVHJhbnNpdGlvblN0YXJ0IChjdXJyZW50LCBuZXh0LCBkaXJlY3Rpb24pIC0+IEBfYXBwPy5jaGFuZ2VQYWdlKG5leHQpXG5cblx0bmV3UGFnZTogKG9wdGlvbnMgPSB7fSkgLT5cblx0XHRwYWdlID0gbmV3IFBhZ2UgXy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0c2l6ZTogQHNpemVcblx0XHRyZXR1cm4gcGFnZSBcblxuXHRsaW5rVG86IChwYWdlKSAtPlxuXHRcdGlmIHBhZ2U/IGFuZCBAY3VycmVudCBpc250IHBhZ2Vcblx0XHRcdEBzaG93TmV4dChwYWdlKVxuIiwiVGhlbWUgPSByZXF1aXJlICdtZC1jb21wb25lbnRzL1RoZW1lJ1xuXG4jIFx0ZDg4ODg4OFAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZFBcbiMgXHQgICA4OCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA4OFxuIyBcdCAgIDg4ICAgIGRQICAgIGRQIDg4ZDg4OGIuIC5kODg4OGIuIC5kODg4OGIuIDg4ZDg4OGIuIC5kODg4OGIuIDg4ZDg4OGIuIDg4ZDg4OGIuIGRQICAgIGRQXG4jIFx0ICAgODggICAgODggICAgODggODgnICBgODggODgnICBgODggODgnICBgODggODgnICBgODggODgnICBgODggODgnICBgODggODgnICBgODggODggICAgODhcbiMgXHQgICA4OCAgICA4OC4gIC44OCA4OC4gIC44OCA4OC4gIC44OCA4OC4gIC44OCA4OCAgICAgICA4OC4gIC44OCA4OC4gIC44OCA4OCAgICA4OCA4OC4gIC44OFxuIyBcdCAgIGRQICAgIGA4ODg4UDg4IDg4WTg4OFAnIGA4ODg4OFAnIGA4ODg4UDg4IGRQICAgICAgIGA4ODg4OFA4IDg4WTg4OFAnIGRQICAgIGRQIGA4ODg4UDg4XG4jIFx0ICAgICAgICAgICAgICAuODggODggICAgICAgICAgICAgICAgICAgICAuODggICAgICAgICAgICAgICAgICAgODggICAgICAgICAgICAgICAgICAgICAuODhcbiMgXHQgICAgICAgICAgZDg4ODhQICBkUCAgICAgICAgICAgICAgICAgZDg4ODhQICAgICAgICAgICAgICAgICAgICBkUCAgICAgICAgICAgICAgICAgZDg4ODhQXG5cblV0aWxzLmluc2VydENTUyhcblx0XCJcIlwiXG4gICAgQGZvbnQtZmFjZSB7XG4gICAgICBmb250LWZhbWlseTogXCJSb2JvdG9cIjtcbiAgICAgIHNyYzogdXJsKFwibW9kdWxlcy9tZC1mb250cy9Sb2JvdG8tUmVndWxhci50dGZcIik7XG4gICAgXCJcIlwiKVxuXG5jbGFzcyBleHBvcnRzLkhlYWRsaW5lIGV4dGVuZHMgVGV4dExheWVyXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucykgLT5cblx0XHRzdXBlciBfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRuYW1lOiAnLidcblx0XHRcdGZvbnRGYW1pbHk6ICdSb2JvdG8nXG5cdFx0XHRmb250U2l6ZTogMjRcblx0XHRcdGZvbnRXZWlnaHQ6IDQwMFxuXHRcdFx0bGluZUhlaWdodDogMS4zXG5cdFx0XHRjb2xvcjogJ3JnYmEoMCwwLDAsLjg3KSdcblxuY2xhc3MgZXhwb3J0cy5TdWJoZWFkIGV4dGVuZHMgVGV4dExheWVyXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucykgLT5cblx0XHRzdXBlciBfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRuYW1lOiAnLidcblx0XHRcdGZvbnRGYW1pbHk6ICdSb2JvdG8nXG5cdFx0XHRmb250U2l6ZTogMTZcblx0XHRcdGZvbnRXZWlnaHQ6IDQwMCwgXG5cdFx0XHRsaW5lSGVpZ2h0OiAxLjUsXG5cdFx0XHRjb2xvcjogJ3JnYmEoMCwwLDAsLjU0KSdcblxuY2xhc3MgZXhwb3J0cy5UaXRsZSBleHRlbmRzIFRleHRMYXllclxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMpIC0+XG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0bmFtZTogJy4nXG5cdFx0XHRmb250RmFtaWx5OiAnUm9ib3RvJ1xuXHRcdFx0Zm9udFNpemU6IDIwXG5cdFx0XHRmb250V2VpZ2h0OiA1MDBcblx0XHRcdGxpbmVIZWlnaHQ6IDEuM1xuXHRcdFx0Y29sb3I6ICdyZ2JhKDAsMCwwLC44NyknXG5jbGFzcyBleHBvcnRzLlJlZ3VsYXIgZXh0ZW5kcyBUZXh0TGF5ZXJcblx0Y29uc3RydWN0b3I6IChvcHRpb25zKSAtPlxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdG5hbWU6ICcuJ1xuXHRcdFx0Zm9udEZhbWlseTogJ1JvYm90bydcblx0XHRcdGZvbnRTaXplOiAxNlxuXHRcdFx0Zm9udFdlaWdodDogNDAwXG5cdFx0XHRsaW5lSGVpZ2h0OiAxLjNcblx0XHRcdGNvbG9yOiAncmdiYSgwLDAsMCwuODcpJ1xuY2xhc3MgZXhwb3J0cy5Cb2R5MiBleHRlbmRzIFRleHRMYXllclxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMpIC0+XG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0bmFtZTogJy4nXG5cdFx0XHRmb250RmFtaWx5OiAnUm9ib3RvJ1xuXHRcdFx0Zm9udFNpemU6IDE0XG5cdFx0XHRmb250V2VpZ2h0OiA1MDBcblx0XHRcdGxpbmVIZWlnaHQ6IDEuM1xuXHRcdFx0Y29sb3I6ICdyZ2JhKDAsMCwwLC44NyknXG5jbGFzcyBleHBvcnRzLk1lbnUgZXh0ZW5kcyBUZXh0TGF5ZXJcblx0Y29uc3RydWN0b3I6IChvcHRpb25zKSAtPlxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdG5hbWU6ICcuJ1xuXHRcdFx0Zm9udEZhbWlseTogJ1JvYm90bydcblx0XHRcdGZvbnRTaXplOiAxNFxuXHRcdFx0Zm9udFdlaWdodDogNTAwXG5cdFx0XHRsaW5lSGVpZ2h0OiAxLjdcblx0XHRcdGNvbG9yOiAncmdiYSgwLDAsMCwuODcpJ1xuY2xhc3MgZXhwb3J0cy5Cb2R5MSBleHRlbmRzIFRleHRMYXllclxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMpIC0+XG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0bmFtZTogJy4nXG5cdFx0XHRmb250RmFtaWx5OiAnUm9ib3RvJ1xuXHRcdFx0Zm9udFNpemU6IDE0XG5cdFx0XHRmb250V2VpZ2h0OiA0MDBcblx0XHRcdGxpbmVIZWlnaHQ6IDEuNFxuXHRcdFx0Y29sb3I6ICdyZ2JhKDAsMCwwLC44NyknXG5jbGFzcyBleHBvcnRzLkNhcHRpb24gZXh0ZW5kcyBUZXh0TGF5ZXJcblx0Y29uc3RydWN0b3I6IChvcHRpb25zKSAtPlxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdG5hbWU6ICcuJ1xuXHRcdFx0Zm9udEZhbWlseTogJ1JvYm90bydcblx0XHRcdGZvbnRTaXplOiAxMlxuXHRcdFx0Zm9udFdlaWdodDogNDAwXG5cdFx0XHRsaW5lSGVpZ2h0OiAxLjNcblx0XHRcdGNvbG9yOiAncmdiYSgwLDAsMCwuNTQpJ1xuY2xhc3MgZXhwb3J0cy5CdXR0b24gZXh0ZW5kcyBUZXh0TGF5ZXJcblx0Y29uc3RydWN0b3I6IChvcHRpb25zKSAtPlxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdG5hbWU6ICcuJ1xuXHRcdFx0Zm9udEZhbWlseTogJ1JvYm90bydcblx0XHRcdGZvbnRTaXplOiAxNFxuXHRcdFx0Zm9udFdlaWdodDogNTAwXG5cdFx0XHRsaW5lSGVpZ2h0OiAxLjNcblx0XHRcdGNvbG9yOiAnIzAwOTY4OCdcblx0XHRcdGxldHRlclNwYWNpbmc6IDAuNVxuXHRcdFx0cGFkZGluZzoge2xlZnQ6IDQsIHJpZ2h0OiA0LCB0b3A6IDgsIGJvdHRvbTogMH0sIiwiIyBcdGQ4ODg4ODhQIG9vIGRQXG4jIFx0ICAgODggICAgICAgODhcbiMgXHQgICA4OCAgICBkUCA4OCAuZDg4ODhiLlxuIyBcdCAgIDg4ICAgIDg4IDg4IDg4b29vb2Q4XG4jIFx0ICAgODggICAgODggODggODguICAuLi5cbiMgXHQgICBkUCAgICBkUCBkUCBgODg4ODhQJ1xuXG5UeXBlID0gcmVxdWlyZSAnbWQtY29tcG9uZW50cy9UeXBlJ1xueyBSaXBwbGUgfSA9IHJlcXVpcmUgJ21kLWNvbXBvbmVudHMvUmlwcGxlJ1xueyBJY29uIH0gPSByZXF1aXJlICdtZC1jb21wb25lbnRzL0ljb24nXG57IFRoZW1lIH0gPSByZXF1aXJlICdtZC1jb21wb25lbnRzL1RoZW1lJ1xuXG5leHBvcnRzLlRpbGUgPSBUaWxlID0gY2xhc3MgVGlsZSBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXHRcdFxuXHRcdEBfaGVhZGVyID0gb3B0aW9ucy5oZWFkZXIgPyBmYWxzZVxuXHRcdEBfZm9vdGVyID0gb3B0aW9ucy5mb290ZXIgPyBmYWxzZVxuXHRcdEBfYWN0aW9uID0gb3B0aW9ucy5hY3Rpb24gPyAtPiBudWxsXG5cdFx0QF9oZWFkZXJBY3Rpb24gPSBvcHRpb25zLmhlYWRlckFjdGlvbiA/IC0+IG51bGxcblx0XHRAX2Zvb3RlckFjdGlvbiA9IG9wdGlvbnMuZm9vdGVyQWN0aW9uID8gLT4gbnVsbFxuXHRcdFxuXHRcdGlmIEBfaGVhZGVyIGFuZCBAX2Zvb3RlciB0aGVuIHRocm93ICdUaWxlIGNhbm5vdCBoYXZlIGJvdGggYSBoZWFkZXIgYW5kIGEgZm9vdGVyLidcblx0XHRcblx0XHRAX2ljb24gPSBvcHRpb25zLmljb25cblx0XHRAZ3JpZExpc3QgPSBvcHRpb25zLmdyaWRMaXN0ID8gdGhyb3cgJ1RpbGUgbmVlZHMgYSBncmlkIHByb3BlcnR5Lidcblx0XHRcblx0XHRzdXBlciBfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQGdyaWRMaXN0XG5cdFx0XHR3aWR0aDogQGdyaWRMaXN0LnRpbGVXaWR0aFxuXHRcdFx0aGVpZ2h0OiBAZ3JpZExpc3QudGlsZUhlaWdodFxuXHRcdFx0YW5pbWF0aW9uT3B0aW9uczoge3RpbWU6IC4zfVxuXHRcdFxuXHRcdEBvblRvdWNoU3RhcnQgKGV2ZW50KSAtPiBcblx0XHRcdGlmIEBncmlkTGlzdC5wYXJlbnQ/LnBhcmVudD8uY29udGVudCBhbmQgQGdyaWRMaXN0LnBhcmVudD8ucGFyZW50Py5pc01vdmluZyBpcyBmYWxzZVxuXHRcdFx0XHRSaXBwbGUoQCwgZXZlbnQucG9pbnQsIEBoZWFkZXIsIG9wdGlvbnMuUmlwcGxlQ29sb3IgPyAncmdiYSgwLDAsMCwuMSknKVxuXHRcdFxuXHRcdEBvblRhcCBAX2FjdGlvblxuXHRcdEBvblRhcCAoZXZlbnQpIC0+IGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXG5cblx0XHRpZiBAX2hlYWRlciBvciBAX2Zvb3RlclxuXHRcdFx0QGhlYWRlciA9IG5ldyBMYXllclxuXHRcdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQFxuXHRcdFx0XHR5OiBpZiBAX2Zvb3RlciB0aGVuIEFsaWduLmJvdHRvbSgpXG5cdFx0XHRcdHdpZHRoOiBAd2lkdGhcblx0XHRcdFx0aGVpZ2h0OiBpZiBvcHRpb25zLnN1cHBvcnQgdGhlbiA2OCBlbHNlIDQ4XG5cdFx0XHRcdGJhY2tncm91bmRDb2xvcjogb3B0aW9ucy5iYWNrZ3JvdW5kQ29sb3IgPyAncmdiYSgwLDAsMCwuNSknXG5cdFx0XHRcblx0XHRcdEBoZWFkZXIub25Ub3VjaFN0YXJ0IChldmVudCkgLT4gUmlwcGxlKEAsIGV2ZW50LnBvaW50LCBAdGl0bGUpXG5cdFx0XHRcblx0XHRcdGlmIEBfZm9vdGVyIHRoZW4gQGhlYWRlci5vblRhcCBAX2Zvb3RlckFjdGlvblxuXHRcdFx0ZWxzZSBAaGVhZGVyLm9uVGFwIEBfaGVhZGVyQWN0aW9uXG5cblx0XHRcdEBoZWFkZXIub25UYXAgKGV2ZW50KSAtPiBldmVudC5zdG9wUHJvcGFnYXRpb24oKVxuXG5cdFx0XHRpZiBvcHRpb25zLnRpdGxlXG5cdFx0XHRcdEBoZWFkZXIudGl0bGUgPSBuZXcgVHlwZS5SZWd1bGFyXG5cdFx0XHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEBoZWFkZXJcblx0XHRcdFx0XHR4OiA4LCB5OiBpZiBvcHRpb25zLnN1cHBvcnQgdGhlbiAxMiBlbHNlIEFsaWduLmNlbnRlcigpXG5cdFx0XHRcdFx0Y29sb3I6IEBjb2xvclxuXHRcdFx0XHRcdHRleHQ6IG9wdGlvbnMudGl0bGUgPyAnVHdvIExpbmUnXG5cdFx0XHRcblx0XHRcdFx0aWYgb3B0aW9ucy5zdXBwb3J0XG5cdFx0XHRcdFx0QGhlYWRlci5zdXBwb3J0ID0gbmV3IFRleHRMYXllclxuXHRcdFx0XHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEBoZWFkZXJcblx0XHRcdFx0XHRcdHg6IDgsIHk6IDM1XG5cdFx0XHRcdFx0XHRmb250U2l6ZTogMTJcblx0XHRcdFx0XHRcdGZvbnRGYW1pbHk6ICdSb2JvdG8nXG5cdFx0XHRcdFx0XHRjb2xvcjogQGNvbG9yXG5cdFx0XHRcdFx0XHR0ZXh0OiBvcHRpb25zLnN1cHBvcnQgPyAnU3VwcG9ydCB0ZXh0J1xuXHRcdFx0XG5cdFx0XHRpZiBvcHRpb25zLmljb25cblx0XHRcdFx0QGhlYWRlci5pY29uID0gbmV3IEljb25cblx0XHRcdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQGhlYWRlclxuXHRcdFx0XHRcdHg6IEFsaWduLnJpZ2h0KC0xMiksIHk6IGlmIG9wdGlvbnMuc3VwcG9ydCB0aGVuIDIwIGVsc2UgQWxpZ24uY2VudGVyKClcblx0XHRcdFx0XHRpY29uOiBvcHRpb25zLmljb25cblx0XHRcdFx0XHRjb2xvcjogQGNvbG9yXG5cblx0XHRAaSA9IHVuZGVmaW5lZFxuXHRcdEBncmlkTGlzdC5hZGRUaWxlKEApIiwiIyBcdGQ4ODg4ODhQIGRQXG4jIFx0ICAgODggICAgODhcbiMgXHQgICA4OCAgICA4OGQ4ODhiLiAuZDg4ODhiLiA4OGQ4Yi5kOGIuIC5kODg4OGIuXG4jIFx0ICAgODggICAgODgnICBgODggODhvb29vZDggODgnYDg4J2A4OCA4OG9vb29kOFxuIyBcdCAgIDg4ICAgIDg4ICAgIDg4IDg4LiAgLi4uIDg4ICA4OCAgODggODguICAuLi5cbiMgXHQgICBkUCAgICBkUCAgICBkUCBgODg4ODhQJyBkUCAgZFAgIGRQIGA4ODg4OFAnXG5cblxuIyBXaGVuIGxvYWRlZCwgdGhpcyBtb2R1bGUgd2lsbCBhdHRlbXB0IHRvIGNyZWF0ZSBhIG5ldyB0aGVtZSBiYXNlZCBvbiBcbiMgdGhlIERlc2lnbiBNb2RlIHRlbXBsYXRlLlxuXG5tb2RpZnlDb2xvciA9IChjb2xvciwgaCwgcywgbCkgLT5cblx0Y2xpcCA9IF8ucmVwbGFjZShfLnJlcGxhY2UoY29sb3IudG9Ic2xTdHJpbmcoKS5zbGljZSg0LCAtMSksICclJywgJycpLCAnJScsICcnKSAuc3BsaXQoJywgJylcblxuXHRuZXdDb2xvciA9IG5ldyBDb2xvcihcblx0XHRoOiBfLnBhcnNlSW50KGNsaXBbMF0pICsgaCwgXG5cdFx0czogKF8ucGFyc2VJbnQoY2xpcFsxXSkgKyBzKS8xMDAsIFxuXHRcdGw6IChfLnBhcnNlSW50KGNsaXBbMl0pICsgbCkvMTAwLCBcblx0XHRhOiAxKVxuXHRcblx0cmV0dXJuIG5ld0NvbG9yXG5cbnByaW1hcnlDb2xvciA9IHByaW1hcnlfY29sb3IuYmFja2dyb3VuZENvbG9yXG5wcmltYXJ5SW52ZXJ0ID0gMTAwIC0gKHByaW1hcnlfaW52ZXJ0Lm9wYWNpdHkgKiAxMDApXG5zZWNvbmRhcnlDb2xvciA9IHNlY29uZGFyeV9jb2xvci5iYWNrZ3JvdW5kQ29sb3Jcbm1lbnVDb2xvciA9IG1lbnVfY29sb3IuYmFja2dyb3VuZENvbG9yXG5tZW51VGV4dENvbG9yID0gbWVudV90ZXh0X2NvbG9yLmNvbG9yXG5tZW51SW52ZXJ0ID0gMTAwIC0gKG1lbnVfaW52ZXJ0Lm9wYWNpdHkgKiAxMDApXG5cblxuc291cmNlID1cblx0Y29sb3JzOlxuXHRcdHByaW1hcnk6XG5cdFx0XHRtYWluOiBwcmltYXJ5Q29sb3Jcblx0XHRcdGxpZ2h0OiBtb2RpZnlDb2xvcihwcmltYXJ5Q29sb3IsIDEzLCAtNSwgMTUpXG5cdFx0XHRkYXJrOiBtb2RpZnlDb2xvcihwcmltYXJ5Q29sb3IsIC0xLCAtNywgLTEyKVxuXHRcdFx0dGV4dDogcHJpbWFyeV90ZXh0X2NvbG9yLmNvbG9yXG5cdFx0XHRpbnZlcnQ6IHByaW1hcnlJbnZlcnRcblx0XHRzZWNvbmRhcnk6XG5cdFx0XHRtYWluOiBzZWNvbmRhcnlDb2xvclxuXHRcdFx0bGlnaHQ6IG1vZGlmeUNvbG9yKHNlY29uZGFyeUNvbG9yLCAxMywgLTUsIDE1KVxuXHRcdFx0ZGFyazogbW9kaWZ5Q29sb3Ioc2Vjb25kYXJ5Q29sb3IsIC0xLCAtNywgLTEyKVxuXHRcdFx0dGV4dDogc2Vjb25kYXJ5X3RleHRfY29sb3IuY29sb3Jcblx0XHRtZW51OlxuXHRcdFx0bGlnaHQ6IG1lbnVDb2xvclxuXHRcdFx0dGV4dDogbWVudVRleHRDb2xvclxuXHRcdFx0aW52ZXJ0OiBtZW51SW52ZXJ0XG5cblRoZW1lID0gXG5cdHRpbnQ6IHNvdXJjZS5jb2xvcnMuc2Vjb25kYXJ5Lm1haW5cblx0cHJpbWFyeTogc291cmNlLmNvbG9ycy5wcmltYXJ5Lm1haW5cblx0c2Vjb25kYXJ5OiBzb3VyY2UuY29sb3JzLnNlY29uZGFyeS5tYWluXG5cdG1lbnU6IHNvdXJjZS5jb2xvcnMubWVudS5saWdodFxuXHRjb2xvcnM6IHNvdXJjZS5jb2xvcnNcblxuXHR1c2VyOlxuXHRcdGltYWdlOiB1bmRlZmluZWRcblxuXHRoZWFkZXI6IFxuXHRcdGJhY2tncm91bmRDb2xvcjogc291cmNlLmNvbG9ycy5wcmltYXJ5Lm1haW5cblx0XHR0aXRsZTogc291cmNlLmNvbG9ycy5wcmltYXJ5LnRleHRcblx0XHRpbnZlcnQ6IHByaW1hcnlJbnZlcnRcblx0XHRpY29uOlxuXHRcdFx0Y29sb3I6IHNvdXJjZS5jb2xvcnMucHJpbWFyeS50ZXh0XG5cdFx0dGFiczpcblx0XHRcdGJhY2tncm91bmRDb2xvcjogc291cmNlLmNvbG9ycy5wcmltYXJ5LmxpZ2h0XG5cdFx0XHRjb2xvcjogc291cmNlLmNvbG9ycy5wcmltYXJ5LnRleHRcblx0XHRcdHNlbGVjdG9yOiBzb3VyY2UuY29sb3JzLnNlY29uZGFyeS5tYWluXG5cdFxuXHRzdGF0dXNCYXI6IFxuXHRcdGltYWdlOiAnbW9kdWxlcy9tZC1pbWFnZXMvc3RhdHVzX2Jhci5wbmcnXG5cdFx0YmFja2dyb3VuZENvbG9yOiBzb3VyY2UuY29sb3JzLnByaW1hcnkuZGFya1xuXHRcdGludmVydDogcHJpbWFyeUludmVydFxuXHRcblx0Ym90dG9tTmF2OlxuXHRcdGJhY2tncm91bmRDb2xvcjogJyNGRkZGRkYnXG5cdFx0c2hhZG93WTogLTJcblx0XHRzaGFkb3dCbHVyOiA2XG5cdFx0c2hhZG93Q29sb3I6ICdyZ2JhKDAsMCwwLC4xKSdcblx0XG5cdG5hdkJhcjpcblx0XHRiYWNrZ3JvdW5kQ29sb3I6ICcjMDAwMDAwJ1xuXHRcblx0a2V5Ym9hcmQ6XG5cdFx0aW1hZ2U6ICdtb2R1bGVzL21kLWltYWdlcy9rZXlib2FyZC5wbmcnXG5cblx0Zm9vdGVyOlxuXHRcdGltYWdlOiAnbW9kdWxlcy9tZC1pbWFnZXMvbmF2X2Jhci5wbmcnXG5cblx0cGFnZTpcblx0XHRwcmltYXJ5OlxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiAnI0UxRTJFMSdcblx0XHRzZWNvbmRhcnk6XG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6ICcjRjVGNUY2J1xuXG5cdG1lbnVPdmVybGF5OlxuXHRcdGhlYWRlcjpcblx0XHRcdGJhY2tncm91bmRDb2xvcjogc291cmNlLmNvbG9ycy5zZWNvbmRhcnkubWFpblxuXHRcdFx0aWNvbjogc291cmNlLmNvbG9ycy5zZWNvbmRhcnkubGlnaHRcblx0XHRcdHRleHQ6IHNvdXJjZS5jb2xvcnMuc2Vjb25kYXJ5LnRleHRcblx0XHRzdWJoZWFkZXI6XG5cdFx0XHRjb2xvcjogc291cmNlLmNvbG9ycy5tZW51LnRleHRcblx0XHRcdHRleHQ6IHNvdXJjZS5jb2xvcnMuc2Vjb25kYXJ5LnRleHRcblx0XHRcdGljb246IHNvdXJjZS5jb2xvcnMuc2Vjb25kYXJ5LnRleHRcblx0XHRiYWNrZ3JvdW5kQ29sb3I6IHNvdXJjZS5jb2xvcnMubWVudS5saWdodFxuXHRcdHRleHQ6IHNvdXJjZS5jb2xvcnMubWVudS50ZXh0XG5cdFx0c2xpZGVyOiBcblx0XHRcdGtub2I6IHNvdXJjZS5jb2xvcnMuc2Vjb25kYXJ5LmxpZ2h0XG5cdFx0XHRmaWxsOiBzb3VyY2UuY29sb3JzLnNlY29uZGFyeS5kYXJrXG5cdFx0aW52ZXJ0OiBzb3VyY2UuY29sb3JzLm1lbnUuaW52ZXJ0XG5cblx0YnV0dG9uOlxuXHRcdGZsYXQ6XG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcdGNvbG9yOiBzb3VyY2UuY29sb3JzLnNlY29uZGFyeS5tYWluXG5cdFx0XHRzaGFkb3dZOiAwXG5cdFx0XHRzaGFkb3dDb2xvcjogJ3JnYmEoMCwwLDAsLjE4KSdcblx0XHRcdHNoYWRvd0JsdXI6IDBcblxuXHRcdHJhaXNlZDpcblx0XHRcdGJhY2tncm91bmRDb2xvcjogc291cmNlLmNvbG9ycy5zZWNvbmRhcnkubWFpblxuXHRcdFx0Y29sb3I6IHNvdXJjZS5jb2xvcnMuc2Vjb25kYXJ5LnRleHRcblx0XHRcdHNoYWRvd1k6IDJcblx0XHRcdHNoYWRvd0NvbG9yOiAncmdiYSgwLDAsMCwuMTgpJ1xuXHRcdFx0c2hhZG93Qmx1cjogNlxuXG5cdGZhYjpcblx0XHRiYWNrZ3JvdW5kQ29sb3I6IHNvdXJjZS5jb2xvcnMuc2Vjb25kYXJ5Lm1haW5cblx0XHRjb2xvcjogc291cmNlLmNvbG9ycy5zZWNvbmRhcnkudGV4dFxuXHRcdGludmVydDogcHJpbWFyeUludmVydFxuXG5cdGRpYWxvZzogXG5cdFx0YmFja2dyb3VuZENvbG9yOicjRkFGQUZBJ1xuXHRcblx0ZGl2aWRlcjpcblx0XHRiYWNrZ3JvdW5kQ29sb3I6ICdyZ2JhKDAsMCwwLC4xMiknXG5cblx0dGV4dDogXG5cdFx0cHJpbWFyeTogc291cmNlLmNvbG9ycy5wcmltYXJ5LnRleHRcblx0XHRzZWNvbmRhcnk6IHNvdXJjZS5jb2xvcnMuc2Vjb25kYXJ5LnRleHRcblx0XG5cdHRhYmxlOlxuXHRcdGJhY2tncm91bmRDb2xvcjogJyNGRkZGRkYnXG5cdFx0dGV4dDogc291cmNlLmNvbG9ycy5wcmltYXJ5LnRleHRcblx0XHRjaGVja0JveDpcblx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFx0Ym9yZGVyQ29sb3I6ICcjRDNEM0QzJ1xuXHRcdHNlbGVjdGVkOlxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBzb3VyY2UuY29sb3JzLnNlY29uZGFyeS5tYWluXG5cdFx0XHR0ZXh0OiBzb3VyY2UuY29sb3JzLnByaW1hcnkudGV4dFxuXHRcdFx0Y2hlY2tCb3g6XG5cdFx0XHRcdGJhY2tncm91bmRDb2xvcjogc291cmNlLmNvbG9ycy5zZWNvbmRhcnkuZGFya1xuXHRcdFx0XHRib3JkZXJDb2xvcjogbnVsbFxuXG5cdHNuYWNrYmFyOlxuXHRcdGJhY2tncm91bmRDb2xvcjogJ3JnYmEoNTEsIDUxLCA1MSwgMSknXG5cdFx0Y29sb3I6ICdyZ2JhKDI1NSwgMjU1LCAyNTUsIDEpJ1xuXG5cdHNsaWRlcjpcblx0XHRmaWxsOiBzbGlkZXJfZmlsbD8uYmFja2dyb3VuZENvbG9yID8gc291cmNlLmNvbG9ycy5wcmltYXJ5LmRhcmtcblx0XHRiYWNrZ3JvdW5kQ29sb3I6IHNsaWRlcl9iYWNrZ3JvdW5kPy5iYWNrZ3JvdW5kQ29sb3IgPyAncmdiYSgwLDAsMCwuMiknXG5cdFx0a25vYjogXG5cdFx0XHRzaXplOiBzbGlkZXJfa25vYj8uc2l6ZSA/IDEyXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IHNsaWRlcl9rbm9iPy5iYWNrZ3JvdW5kQ29sb3IgPyBzb3VyY2UuY29sb3JzLnByaW1hcnkubGlnaHRcblx0XHRcdHJhZGl1czogc2xpZGVyX2tub2I/LmJvcmRlclJhZGl1cyA/IDEyXG5cdFx0bm90Y2g6XG5cdFx0XHR3aWR0aDogMlxuXHRcdFx0aGVpZ2h0OiAyXG5cdFx0XHRib3JkZXJSYWRpdXM6IDJcblx0XHRcdGJhY2tncm91bmRDb2xvcjogc291cmNlLmNvbG9ycy5wcmltYXJ5LnRleHRcblx0XHR0aXA6XG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IHNvdXJjZS5jb2xvcnMucHJpbWFyeS5saWdodFxuXHRcdFx0dmFsdWU6IFxuXHRcdFx0XHRjb2xvcjogc291cmNlLmNvbG9ycy5wcmltYXJ5LnRleHRcblxuXHRjYXJkOlxuXHRcdGhlYWRlcjogc291cmNlLmNvbG9ycy5zZWNvbmRhcnkuZGFya1xuXG5cbmNvbG9yX3BhbGxldGUuZGVzdHJveSgpXG5cbmV4cG9ydHMuVGhlbWUgPSBUaGVtZVxuIiwiVHlwZSA9IHJlcXVpcmUgJ21kLWNvbXBvbmVudHMvVHlwZSdcbnsgUmlwcGxlIH0gPSByZXF1aXJlICdtZC1jb21wb25lbnRzL1JpcHBsZSdcbnsgSWNvbiB9ID0gcmVxdWlyZSAnbWQtY29tcG9uZW50cy9JY29uJ1xueyBUaGVtZSB9ID0gcmVxdWlyZSAnbWQtY29tcG9uZW50cy9UaGVtZSdcblxuIyBcdGQ4ODg4ODhQICAgICAgICAgICAgICAgICAgICAgZFAgICAgODg4ODg4ODhiIG9vICAgICAgICAgIGRQICAgICAgIGRQXG4jIFx0ICAgODggICAgICAgICAgICAgICAgICAgICAgICA4OCAgICA4OCAgICAgICAgICAgICAgICAgICAgODggICAgICAgODhcbiMgXHQgICA4OCAgICAuZDg4ODhiLiBkUC4gIC5kUCBkODg4OFAgYTg4YWFhYSAgICBkUCAuZDg4ODhiLiA4OCAuZDg4OGI4OFxuIyBcdCAgIDg4ICAgIDg4b29vb2Q4ICBgOGJkOCcgICAgODggICAgODggICAgICAgIDg4IDg4b29vb2Q4IDg4IDg4JyAgYDg4XG4jIFx0ICAgODggICAgODguICAuLi4gIC5kODhiLiAgICA4OCAgICA4OCAgICAgICAgODggODguICAuLi4gODggODguICAuODhcbiMgXHQgICBkUCAgICBgODg4ODhQJyBkUCcgIGBkUCAgIGRQICAgIGRQICAgICAgICBkUCBgODg4ODhQJyBkUCBgODg4ODhQOFxuIyBcdFxuIyBcdFxuXG5leHBvcnRzLlRleHRGaWVsZCA9IGNsYXNzIFRleHRGaWVsZFxuXG4iLCJcbiMgXHQuZDg4ODg4YiAgICAgICAgICAgICBvbyAgIGRQICAgICAgICAgICAgZFBcbiMgXHQ4OC4gICAgXCInICAgICAgICAgICAgICAgICA4OCAgICAgICAgICAgIDg4XG4jIFx0YFk4ODg4OGIuIGRQICBkUCAgZFAgZFAgZDg4ODhQIC5kODg4OGIuIDg4ZDg4OGIuXG4jIFx0ICAgICAgYDhiIDg4ICA4OCAgODggODggICA4OCAgIDg4JyAgYFwiXCIgODgnICBgODhcbiMgXHRkOCcgICAuOFAgODguODhiLjg4JyA4OCAgIDg4ICAgODguICAuLi4gODggICAgODhcbiMgXHQgWTg4ODg4UCAgODg4OFAgWThQICBkUCAgIGRQICAgYDg4ODg4UCcgZFAgICAgZFBcblxuVHlwZSA9IHJlcXVpcmUgJ21kLWNvbXBvbmVudHMvVHlwZSdcbnsgUmlwcGxlIH0gPSByZXF1aXJlICdtZC1jb21wb25lbnRzL1JpcHBsZSdcbnsgSWNvbiB9ID0gcmVxdWlyZSAnbWQtY29tcG9uZW50cy9JY29uJ1xueyBUaGVtZSB9ID0gcmVxdWlyZSAnbWQtY29tcG9uZW50cy9UaGVtZSdcblxuZXhwb3J0cy5Td2l0Y2ggPSBjbGFzcyBTd2l0Y2ggZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblxuXHRcdEBfaXNPbiA9IHVuZGVmaW5lZFxuXG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0bmFtZTogJy4nXG5cdFx0XHR3aWR0aDogMzQsIGhlaWdodDogMTQsIGJvcmRlclJhZGl1czogN1xuXHRcdFx0YmFja2dyb3VuZENvbG9yOiAncmdiYSgzNCwgMzEsIDMxLCAuMjYpJ1xuXHRcdFx0YW5pbWF0aW9uT3B0aW9uczoge3RpbWU6IC4xNX1cblxuXHRcdEBrbm9iID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQFxuXHRcdFx0eDogMCwgeTogQWxpZ24uY2VudGVyXG5cdFx0XHR3aWR0aDogMjAsIGhlaWdodDogMjAsIGJvcmRlclJhZGl1czogMTBcblx0XHRcdGJhY2tncm91bmRDb2xvcjogJ0YxRjFGMSdcblx0XHRcdHNoYWRvd1k6IDIsIHNoYWRvd0JsdXI6IDNcblx0XHRcdGFuaW1hdGlvbk9wdGlvbnM6IHt0aW1lOiAuMTV9XG5cblx0XHRAaXNPbiA9IG9wdGlvbnMuaXNPbiA/IGZhbHNlXG5cdFx0QG9uVGFwIC0+IEBpc09uID0gIUBpc09uXG5cblx0QGRlZmluZSBcImlzT25cIixcblx0XHRnZXQ6IC0+IHJldHVybiBAX2lzT25cblx0XHRzZXQ6IChib29sKSAtPlxuXHRcdFx0cmV0dXJuIGlmIGJvb2wgaXMgQF9pc09uXG5cdFx0XHRcblx0XHRcdEBfaXNPbiA9IGJvb2xcblx0XHRcdEBlbWl0KFwiY2hhbmdlOmlzT25cIiwgQF9pc09uLCBAKVxuXHRcdFx0QHVwZGF0ZSgpXG5cblx0dXBkYXRlOiAtPlxuXHRcdGlmIEBfaXNPblxuXHRcdFx0QGtub2IuYW5pbWF0ZSB7eDogQWxpZ24ucmlnaHQoKSwgYmFja2dyb3VuZENvbG9yOiBUaGVtZS5jb2xvcnMucHJpbWFyeS5tYWlufVxuXHRcdFx0QGFuaW1hdGUge2JhY2tncm91bmRDb2xvcjogVGhlbWUuY29sb3JzLnByaW1hcnkubGlnaHR9XG5cdFx0ZWxzZSBcblx0XHRcdEBrbm9iLmFuaW1hdGUge3g6IDAsIGJhY2tncm91bmRDb2xvcjogJ0YxRjFGMSd9XG5cdFx0XHRAYW5pbWF0ZSB7YmFja2dyb3VuZENvbG9yOiAncmdiYSgzNCwgMzEsIDMxLCAuMjYpJ31cbiIsIiMgLmQ4ODg4OGIgICAgZFAgICAgICAgICAgICAgIGRQICAgICAgICAgICAgICAgICAgICAgIDg4ODg4OGJhICAgICAgICAgICAgICAgICAgIFxuIyA4OC4gICAgXCInICAgODggICAgICAgICAgICAgIDg4ICAgICAgICAgICAgICAgICAgICAgIDg4ICAgIGA4YiAgICAgICAgICAgICAgICAgIFxuIyBgWTg4ODg4Yi4gZDg4ODhQIC5kODg4OGIuIGQ4ODg4UCBkUCAgICBkUCAuZDg4ODhiLiBhODhhYWFhOFAnIC5kODg4OGIuIDg4ZDg4OGIuXG4jICAgICAgIGA4YiAgIDg4ICAgODgnICBgODggICA4OCAgIDg4ICAgIDg4IFk4b29vb28uICA4OCAgIGA4Yi4gODgnICBgODggODgnICBgODhcbiMgZDgnICAgLjhQICAgODggICA4OC4gIC44OCAgIDg4ICAgODguICAuODggICAgICAgODggIDg4ICAgIC44OCA4OC4gIC44OCA4OCAgICAgIFxuIyAgWTg4ODg4UCAgICBkUCAgIGA4ODg4OFA4ICAgZFAgICBgODg4ODhQJyBgODg4ODhQJyAgODg4ODg4ODhQIGA4ODg4OFA4IGRQICBcblxuVHlwZSA9IHJlcXVpcmUgJ21kLWNvbXBvbmVudHMvVHlwZSdcbnsgUmlwcGxlIH0gPSByZXF1aXJlICdtZC1jb21wb25lbnRzL1JpcHBsZSdcbnsgSWNvbiB9ID0gcmVxdWlyZSAnbWQtY29tcG9uZW50cy9JY29uJ1xueyBUaGVtZSB9ID0gcmVxdWlyZSAnbWQtY29tcG9uZW50cy9UaGVtZSdcblxuZXhwb3J0cy5TdGF0dXNCYXIgPSBjbGFzcyBTdGF0dXNCYXIgZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdG5hbWU6ICcuJ1xuXHRcdFx0d2lkdGg6IFNjcmVlbi53aWR0aCwgaGVpZ2h0OiAyNFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBUaGVtZS5zdGF0dXNCYXIuYmFja2dyb3VuZENvbG9yXG5cblx0XHRAaXRlbXMgPSBuZXcgTGF5ZXJcblx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBAXG5cdFx0XHRzaXplOiBAc2l6ZVxuXHRcdFx0aW1hZ2U6IFRoZW1lLnN0YXR1c0Jhci5pbWFnZVxuXHRcdFx0aW52ZXJ0OiBUaGVtZS5zdGF0dXNCYXIuaW52ZXJ0XG4iLCIjIFx0LmQ4ODg4OGIgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRQICAgICAgIGRQXG4jIFx0ODguICAgIFwiJyAgICAgICAgICAgICAgICAgICAgICAgICAgICA4OCAgICAgICA4OFxuIyBcdGBZODg4ODhiLiA4OGQ4ODhiLiAuZDg4ODhiLiAuZDg4ODhiLiA4OCAgLmRQICA4OGQ4ODhiLiAuZDg4ODhiLiA4OGQ4ODhiLlxuIyBcdCAgICAgIGA4YiA4OCcgIGA4OCA4OCcgIGA4OCA4OCcgIGBcIlwiIDg4ODg4XCIgICA4OCcgIGA4OCA4OCcgIGA4OCA4OCcgIGA4OFxuIyBcdGQ4JyAgIC44UCA4OCAgICA4OCA4OC4gIC44OCA4OC4gIC4uLiA4OCAgYDhiLiA4OC4gIC44OCA4OC4gIC44OCA4OFxuIyBcdCBZODg4ODhQICBkUCAgICBkUCBgODg4ODhQOCBgODg4ODhQJyBkUCAgIGBZUCA4OFk4ODg4JyBgODg4ODhQOCBkUFxuXG5UeXBlID0gcmVxdWlyZSAnbWQtY29tcG9uZW50cy9UeXBlJ1xueyBSaXBwbGUgfSA9IHJlcXVpcmUgJ21kLWNvbXBvbmVudHMvUmlwcGxlJ1xueyBUaGVtZSB9ID0gcmVxdWlyZSAnbWQtY29tcG9uZW50cy9UaGVtZSdcbnsgQnV0dG9uIH0gPSByZXF1aXJlICdtZC1jb21wb25lbnRzL0J1dHRvbicgXG5cbmV4cG9ydHMuU25hY2tiYXIgPSBTbmFja2JhciA9IGNsYXNzIFNuYWNrYmFyIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cblx0XHRAX3RpdGxlID0gb3B0aW9ucy50aXRsZSA/ICdTbmFja2Jhcidcblx0XHRAX3RpbWVvdXQgPSBvcHRpb25zLnRpbWVvdXQgPyA0XG5cdFx0QF9hY3Rpb24gPSBvcHRpb25zLmFjdGlvblxuXHRcdEBfYXBwID0gb3B0aW9ucy5hcHBcblxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdG5hbWU6ICcuJ1xuXHRcdFx0d2lkdGg6IFNjcmVlbi53aWR0aFxuXHRcdFx0Y2xpcDogdHJ1ZVxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBUaGVtZS5zbmFja2Jhci5iYWNrZ3JvdW5kQ29sb3Jcblx0XHRcdGFuaW1hdGlvbk9wdGlvbnM6IHt0aW1lOiAuMjV9XG5cblx0XHR0aXRsZVdpZHRoID0gQHdpZHRoIC0gNDhcblxuXHRcdGlmIEBfYWN0aW9uP1xuXHRcdFx0QGFjdGlvbiA9IG5ldyBCdXR0b25cblx0XHRcdFx0cGFyZW50OiBAXG5cdFx0XHRcdHg6IEFsaWduLnJpZ2h0KC04KSwgeTogNFxuXHRcdFx0XHRjb2xvcjogQF9hY3Rpb24uY29sb3IgPyBUaGVtZS5jb2xvcnMucHJpbWFyeS5saWdodFxuXHRcdFx0XHR0ZXh0OiBAX2FjdGlvbi50aXRsZS50b1VwcGVyQ2FzZSgpXG5cdFx0XHRcdGFjdGlvbjogQF9hY3Rpb24uYWN0aW9uXG5cblx0XHRcdEBhY3Rpb24ub25UYXAgQGhpZGVcblx0XHRcdHRpdGxlV2lkdGggPSBAYWN0aW9uLnggLSA4IC0gMjRcblxuXHRcdEB0ZXh0TGFiZWwgPSBuZXcgVHlwZS5Cb2R5MVxuXHRcdFx0bmFtZTogJ1RpdGxlJywgcGFyZW50OiBAXG5cdFx0XHR4OiAyNCwgeTogMTRcblx0XHRcdHdpZHRoOiB0aXRsZVdpZHRoXG5cdFx0XHR0ZXh0OiBAX3RpdGxlXG5cdFx0XHRjb2xvcjogVGhlbWUuc25hY2tiYXIuY29sb3JcblxuXHRcdEBoZWlnaHQgPSBAdGV4dExhYmVsLm1heFkgKyAxNFxuXHRcdEBhY3Rpb24/LnkgPSBBbGlnbi5jZW50ZXJcblxuXHRcdGlmIEBfYXBwP1xuXHRcdFx0QHkgPSBpZiBAX2FwcC5ib3R0b21OYXY/IHRoZW4gQWxpZ24uYm90dG9tKC1AX2FwcC5ib3R0b21OYXYuaGVpZ2h0ICsgQGhlaWdodCkgPyBBbGlnbi5ib3R0b20oQGhlaWdodClcblxuXHRcdFV0aWxzLmRlbGF5IEBfdGltZW91dCwgQGhpZGVcblxuXHRcdEBzaG93KClcblxuXHRzaG93OiA9PlxuXHRcdGlmIEBfYXBwP1xuXHRcdFx0aWYgQF9hcHAuc25hY2tiYXI/IFxuXHRcdFx0XHRAX2FwcC5zbmFja2Jhci5oaWRlKClcblx0XHRcdFx0VXRpbHMuZGVsYXkgMSwgQHNob3dcblx0XHRcdFx0cmV0dXJuXG5cdFx0XHRlbHNlXG5cdFx0XHRcdEBfYXBwLnNuYWNrYmFyID0gQFxuXHRcdFx0XHRAX2FwcC5hY3Rpb25CdXR0b24/LmFuaW1hdGUge3k6IEBfYXBwLmFjdGlvbkJ1dHRvbi55IC0gQGhlaWdodCwgb3B0aW9uczogQGFuaW1hdGlvbk9wdGlvbnN9XG5cdFx0XHRcdEBhbmltYXRlIHt5OiBAeSAtIEBoZWlnaHR9XG5cdFx0ZWxzZVxuXHRcdFx0QGFuaW1hdGUge3k6IEB5IC0gQGhlaWdodH1cblxuXHRoaWRlOiA9PiBcblx0XHRpZiBAX2FwcD9cblx0XHRcdEBfYXBwLnNuYWNrYmFyID0gdW5kZWZpbmVkXG5cdFx0XHRAX2FwcC5hY3Rpb25CdXR0b24/LmFuaW1hdGUge3k6IEBfYXBwLmFjdGlvbkJ1dHRvbi55ICsgQGhlaWdodCwgb3B0aW9uczogQGFuaW1hdGlvbk9wdGlvbnN9XG5cdFx0XG5cdFx0QGFuaW1hdGUge2hlaWdodDogMCwgeTogQHkgKyBAaGVpZ2h0fVxuXHRcdFV0aWxzLmRlbGF5IC41LCA9PiBAZGVzdHJveSgpIiwiIyBcdC5kODg4ODhiICBkUCBvbyAgICAgICBkUFxuIyBcdDg4LiAgICBcIicgODggICAgICAgICAgODhcbiMgXHRgWTg4ODg4Yi4gODggZFAgLmQ4ODhiODggLmQ4ODg4Yi4gODhkODg4Yi5cbiMgXHQgICAgICBgOGIgODggODggODgnICBgODggODhvb29vZDggODgnICBgODhcbiMgXHRkOCcgICAuOFAgODggODggODguICAuODggODguICAuLi4gODhcbiMgXHQgWTg4ODg4UCAgZFAgZFAgYDg4ODg4UDggYDg4ODg4UCcgZFBcblxuVHlwZSA9IHJlcXVpcmUgJ21kLWNvbXBvbmVudHMvVHlwZSdcbnsgUmlwcGxlIH0gPSByZXF1aXJlICdtZC1jb21wb25lbnRzL1JpcHBsZSdcbnsgSWNvbiB9ID0gcmVxdWlyZSAnbWQtY29tcG9uZW50cy9JY29uJ1xueyBUaGVtZSB9ID0gcmVxdWlyZSAnbWQtY29tcG9uZW50cy9UaGVtZSdcblxuZXhwb3J0cy5TbGlkZXIgPSBjbGFzcyBTbGlkZXIgZXh0ZW5kcyBTbGlkZXJDb21wb25lbnRcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cblx0XHRAX25vdGNoZWQgPSBvcHRpb25zLm5vdGNoZWQgPyBmYWxzZVxuXG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0bmFtZTogJy4nLCBoZWlnaHQ6IDJcblx0XHRcdGtub2JTaXplOiAzMlxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiAncmdiYSgwLDAsMCwuMjYpJ1xuXHRcdFx0bWluOiAxLCBtYXg6IDEwXG5cblx0XHRAZmlsbC5iYWNrZ3JvdW5kQ29sb3IgPSBUaGVtZS5zbGlkZXIuZmlsbFxuXG5cdFx0QGtub2IucHJvcHMgPVxuXHRcdFx0bmFtZTogJ0tub2InXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcdHNoYWRvd1g6IDBcblx0XHRcdHNoYWRvd1k6IDBcblx0XHRcdHNoYWRvd0JsdXI6IDBcblxuXHRcdEB0aHVtYiA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogJ1RodW1iJywgcGFyZW50OiBAa25vYlxuXHRcdFx0eDogQWxpZ24uY2VudGVyLCB5OiBBbGlnbi5jZW50ZXJcblx0XHRcdHNpemU6IFRoZW1lLnNsaWRlci5rbm9iLnNpemUsIGJvcmRlclJhZGl1czogVGhlbWUuc2xpZGVyLmtub2IucmFkaXVzXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFRoZW1lLnNsaWRlci5rbm9iLmJhY2tncm91bmRDb2xvclxuXHRcdFx0YW5pbWF0aW9uT3B0aW9uczoge3RpbWU6IC4xNX1cblxuXHRcdGlmIEBfbm90Y2hlZFxuXG5cdFx0XHRmb3IgaSBpbiBbMC4uLkBtYXgtQG1pbl1cblx0XHRcdFx0bm90Y2ggPSBuZXcgTGF5ZXJcblx0XHRcdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQFxuXHRcdFx0XHRcdHg6IGkgKiBAd2lkdGgvKEBtYXgtQG1pbilcblx0XHRcdFx0XHR3aWR0aDogVGhlbWUuc2xpZGVyLm5vdGNoLndpZHRoLCBoZWlnaHQ6IFRoZW1lLnNsaWRlci5ub3RjaC5oZWlnaHQsIGJvcmRlclJhZGl1czogVGhlbWUuc2xpZGVyLm5vdGNoLmJvcmRlclJhZGl1cyxcblx0XHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFRoZW1lLnNsaWRlci5ub3RjaC5iYWNrZ3JvdW5kQ29sb3JcblxuXHRcdFx0QHRpcCA9IG5ldyBMYXllclxuXHRcdFx0XHRuYW1lOiAnVGlwJywgcGFyZW50OiBAa25vYlxuXHRcdFx0XHR4OiBBbGlnbi5jZW50ZXIsIHk6IC0yNFxuXHRcdFx0XHR3aWR0aDogMjYsIGhlaWdodDogMzJcblx0XHRcdFx0aHRtbDogJzxzdmcgd2lkdGg9XCIyNnB4XCIgaGVpZ2h0PVwiMzJweFwiIHZpZXdCb3g9XCIwIDAgMjYgMzJcIj48cGF0aCBkPVwiTTEzLDAuMSBDMjAuMiwwLjEgMjYsNiAyNiwxMy4zIEMyNiwxNyAyNCwyMC45IDE4LjcsMjYuMiBMMTMsMzIgTDcuMiwyNi4yIEMyLDIwLjggMCwxNi45IDAsMTMuMyBDLTMuNTUyNzEzNjhlLTE1LDYgNS44LDAuMSAxMywwLjEgTDEzLDAuMSBaXCIgZmlsbD1cIicgKyBUaGVtZS5zbGlkZXIudGlwLmJhY2tncm91bmRDb2xvciArICdcIj48L3BhdGg+PC9zdmc+J1xuXHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IG51bGwsIG9wYWNpdHk6IDBcblx0XHRcdFx0YW5pbWF0aW9uT3B0aW9uczoge3RpbWU6IC4xNX1cblxuXHRcdFx0QHRpcFZhbHVlID0gbmV3IFRleHRMYXllclxuXHRcdFx0XHRuYW1lOiAnVGlwIFZhbHVlJywgcGFyZW50OiBAdGlwXG5cdFx0XHRcdHk6IDUsIHdpZHRoOiAyNlxuXHRcdFx0XHRjb2xvcjogVGhlbWUuc2xpZGVyLnRpcC52YWx1ZS5jb2xvclxuXHRcdFx0XHRmb250U2l6ZTogMTIsIGZvbnRGYW1pbHk6ICdSb2JvdG8nLCB0ZXh0QWxpZ246ICdjZW50ZXInXG5cdFx0XHRcdHRleHQ6IFwie3ZhbHVlfVwiXG5cblx0XHRcdEB0aXBWYWx1ZS50ZW1wbGF0ZSA9XG5cdFx0XHRcdHZhbHVlOiBAdmFsdWVcblxuXHRcdFx0QGtub2Iub25Ub3VjaFN0YXJ0ID0+XG5cdFx0XHRcdEB0aHVtYi5hbmltYXRlIHtvcGFjaXR5OiAwfVxuXHRcdFx0XHRAdGlwLmFuaW1hdGUge29wYWNpdHk6IDF9XG5cblx0XHRcdEBvblRvdWNoRW5kIC0+XG5cdFx0XHRcdEB0aHVtYi5hbmltYXRlIHtvcGFjaXR5OiAxfVxuXHRcdFx0XHRAdGlwLmFuaW1hdGUge29wYWNpdHk6IDB9XG5cblx0XHRcdHJvdW5kID0gKG51bWJlciwgbmVhcmVzdCkgLT5cblx0XHRcdCAgICBNYXRoLnJvdW5kKG51bWJlciAvIG5lYXJlc3QpICogbmVhcmVzdFxuXG5cdFx0XHRAa25vYi5kcmFnZ2FibGUudXBkYXRlUG9zaXRpb24gPSAocG9pbnQpID0+XG5cdFx0XHQgICAgcG9pbnQueCA9IHJvdW5kKHBvaW50LngsIEB3aWR0aCAvIChAbWF4LUBtaW4pICkgLSAoQGtub2Iud2lkdGggLyAyKVxuXHRcdFx0ICAgIHJldHVybiBwb2ludFxuXG5cdFx0XHRAb25WYWx1ZUNoYW5nZSAtPlxuXHRcdFx0XHRAdGlwVmFsdWUudGVtcGxhdGUgPSBNYXRoLnJvdW5kKEB2YWx1ZSlcblxuXHRcdGVsc2Vcblx0XHRcdEBrbm9iLm9uVG91Y2hTdGFydCA9PlxuXHRcdFx0XHRAdGh1bWIuYW5pbWF0ZSB7c2NhbGU6MS4xfVxuXHRcdFx0QGtub2Iub25Ub3VjaEVuZCA9PlxuXHRcdFx0XHRAdGh1bWIuYW5pbWF0ZSB7c2NhbGU6MX1cbiIsIiMgIDg4ODg4OGJhICAgICAgICAgICAgICAgICAgICAgIGRQICAgZFAgICAgICAgICAgICAgICAgICAgICAgXG4jICA4OCAgICBgOGIgICAgICAgICAgICAgICAgICAgICA4OCAgIDg4ICAgICAgICAgICAgICAgICAgICAgIFxuIyBhODhhYWFhOFAnIC5kODg4OGIuIGRQICBkUCAgZFAgODggZDg4ODhQIC5kODg4OGIuIDg4ZDhiLmQ4Yi5cbiMgIDg4ICAgYDhiLiA4OCcgIGA4OCA4OCAgODggIDg4IDg4ICAgODggICA4OG9vb29kOCA4OCdgODgnYDg4XG4jICA4OCAgICAgODggODguICAuODggODguODhiLjg4JyA4OCAgIDg4ICAgODguICAuLi4gODggIDg4ICA4OFxuIyAgZFAgICAgIGRQIGA4ODg4OFAnIDg4ODhQIFk4UCAgZFAgICBkUCAgIGA4ODg4OFAnIGRQICBkUCAgZFBcblxuVHlwZSA9IHJlcXVpcmUgJ21kLWNvbXBvbmVudHMvVHlwZSdcbnsgVGhlbWUgfSA9IHJlcXVpcmUgJ21kLWNvbXBvbmVudHMvVGhlbWUnXG57IERpdmlkZXIgfSA9IHJlcXVpcmUgJ21kLWNvbXBvbmVudHMvRGl2aWRlcicgXG5cblxuZXhwb3J0cy5Sb3dJdGVtID0gY2xhc3MgUm93SXRlbSBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXG5cdFx0QF9pY29uID0gb3B0aW9ucy5pY29uXG5cdFx0QF9pY29uQmFja2dyb3VuZENvbG9yID0gb3B0aW9ucy5pY29uQmFja2dyb3VuZENvbG9yID8gJyM3NzcnXG5cdFx0QF90ZXh0ID0gb3B0aW9ucy50ZXh0ID8gJ1JvdyBpdGVtJ1xuXHRcdEBfcm93ID0gb3B0aW9ucy5yb3cgPyAwXG5cdFx0QF95ID0gMzIgKyAoQF9yb3cgKiA0OCkgXG5cblx0XHRzdXBlciBfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHR3aWR0aDogU2NyZWVuLndpZHRoXG5cdFx0XHR5OiBAX3lcblx0XHRcdGhlaWdodDogNDhcblx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXG5cdFx0QGljb24gPSBuZXcgTGF5ZXJcblx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBAXG5cdFx0XHR4OiAxNiwgeTogQWxpZ24uY2VudGVyXG5cdFx0XHRoZWlnaHQ6IDMyLCB3aWR0aDogMzIsIGJvcmRlclJhZGl1czogMTZcblx0XHRcdGJhY2tncm91bmRDb2xvcjogQF9pY29uQmFja2dyb3VuZENvbG9yXG5cdFx0XHRpbWFnZTogQF9pY29uXG5cblx0XHRAbGFiZWxMYXllciA9IG5ldyBUeXBlLlJlZ3VsYXJcblx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBAXG5cdFx0XHR4OiBAaWNvbi5tYXhYICsgMTYsIHk6IEFsaWduLmNlbnRlclxuXHRcdFx0Y29sb3I6IFRoZW1lLnRleHQudGV4dFxuXHRcdFx0dGV4dDogQF90ZXh0IiwiIyBcdCA4ODg4ODhiYSAgb28gICAgICAgICAgICAgICAgICAgZFBcbiMgXHQgODggICAgYDhiICAgICAgICAgICAgICAgICAgICAgIDg4XG4jIFx0YTg4YWFhYThQJyBkUCA4OGQ4ODhiLiA4OGQ4ODhiLiA4OCAuZDg4ODhiLlxuIyBcdCA4OCAgIGA4Yi4gODggODgnICBgODggODgnICBgODggODggODhvb29vZDhcbiMgXHQgODggICAgIDg4IDg4IDg4LiAgLjg4IDg4LiAgLjg4IDg4IDg4LiAgLi4uXG4jIFx0IGRQICAgICBkUCBkUCA4OFk4ODhQJyA4OFk4ODhQJyBkUCBgODg4ODhQJ1xuIyBcdCAgICAgICAgICAgICAgODggICAgICAgODhcbiMgXHQgICAgICAgICAgICAgIGRQICAgICAgIGRQXG5cbiNcdEJ5IGRlZmF1bHQsIHNob3dzIGFuIGV4cGFuZGluZyBjaXJjbGUgb3ZlciBhIGxheWVyLCBjbGlwcGVkIHRvIGl0cyBmcmFtZS5cbiNcdE9uIHRoZSBsYXllcidzIHRvdWNoRW5kIGV2ZW50LCB0aGUgY2lyY2xlIGFuZCBpdHMgbWFzayB3aWxsIGRpc2FwcGVhci5cblxuI1x0cmVxdWlyZWQ6XG4jXHRsYXllciAoTGF5ZXIpLCB0aGUgbGF5ZXIgb3ZlciB3aGljaCB0byBzaG93IHRoZSByaXBwbGUgZWZmZWN0XG4jXHRwb2ludCAob2JqZWN0KSwgdGhlIHJpcHBsZSBvcmlnaW4gcG9pbnQsIHVzdWFsbHkgYSBvblRvdWNoU3RhcnQncyBldmVudC5wb2ludFxuXG4jXHRvcHRpb25hbDpcbiNcdHBsYWNlQmVoaW5kIChMYXllciksIGEgY2hpbGQgb2YgbGF5ZXIgYmVoaW5kIHdoaWNoIHRoZSByaXBwbGUgc2hvdWxkIGFwcGVhclxuI1x0Y29sb3IgKHN0cmluZyBvciBjb2xvciBvYmplY3QpLCBhIGN1c3RvbSBjb2xvciBmb3IgdGhlIHJpcHBsZVxuXG5SaXBwbGUgPSAobGF5ZXIsIHBvaW50LCBwbGFjZUJlaGluZCwgY29sb3IpIC0+XG5cdFxuXHRpZiAhbGF5ZXI/IHRoZW4gdGhyb3cgJ1JpcHBsZSByZXF1aXJlcyBhIExheWVyLiBUcnkgbXlMYXllci5vblRvdWNoU3RhcnQgKGV2ZW50KSAtPiByaXBwbGUoQCwgZXZlbnQucG9pbnQpJ1xuXHRpZiAhcG9pbnQ/IHRoZW4gdGhyb3cgJ1JpcHBsZSByZXF1aXJlcyBhIHBvaW50LiBUcnkgbXlMYXllci5vblRvdWNoU3RhcnQgKGV2ZW50KSAtPiByaXBwbGUoQCwgZXZlbnQucG9pbnQpJ1xuXG5cdG1hc2sgPSBuZXcgTGF5ZXJcblx0XHRuYW1lOiAnLidcblx0XHRwYXJlbnQ6IGxheWVyXG5cdFx0c2l6ZTogbGF5ZXIuc2l6ZVxuXHRcdGJvcmRlclJhZGl1czogbGF5ZXIuYm9yZGVyUmFkaXVzXG5cdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0Y2xpcDogdHJ1ZVxuXHRcdG9wYWNpdHk6IDBcblx0XHRhbmltYXRpb25PcHRpb25zOiB7dGltZTogLjE1fVxuXHRcblx0aWYgcGxhY2VCZWhpbmQgdGhlbiBtYXNrLnBsYWNlQmVoaW5kKHBsYWNlQmVoaW5kKVxuXHRcblx0IyBSSVBQTEUgQ0lSQ0xFXG5cdFxuXHRsb25nU2lkZSA9IGlmIGxheWVyLndpZHRoID4gbGF5ZXIuaGVpZ2h0IHRoZW4gbGF5ZXIud2lkdGggZWxzZSBsYXllci5oZWlnaHRcblxuXHRyaXBwbGVDaXJjbGUgPSBuZXcgTGF5ZXJcblx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBtYXNrXG5cdFx0XHR4OiBwb2ludC54IC0gMTZcblx0XHRcdHk6IHBvaW50LnkgLSAxNlxuXHRcdFx0d2lkdGg6IDMyLCBoZWlnaHQ6IDMyLCBcblx0XHRcdGJvcmRlclJhZGl1czogbG9uZ1NpZGVcblx0XHRcdFxuXHRpZiBjb2xvcj9cblx0XHRyaXBwbGVDaXJjbGUucHJvcHMgPVxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBjb2xvclxuXHRlbHNlIFxuXHRcdHJpcHBsZUNpcmNsZS5wcm9wcyA9IFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBsYXllci5iYWNrZ3JvdW5kQ29sb3Jcblx0XHRcdHNhdHVyYXRlOiAxMjBcblx0XHRcdGJyaWdodG5lc3M6IDEyMFxuXHRcdFx0b3BhY2l0eTogLjVcblx0XG5cdCMgQU5JTUFUSU9OUyBDSVJDTEVcblx0XG5cdG1hc2suYW5pbWF0ZVxuXHRcdG9wYWNpdHk6IDFcblx0XHRvcHRpb25zOiB7dGltZTogLjE1fVxuXHRcblx0cmlwcGxlQ2lyY2xlLmFuaW1hdGVcblx0XHR4OiByaXBwbGVDaXJjbGUueCAtIGxvbmdTaWRlICogMS4zXG5cdFx0eTogcmlwcGxlQ2lyY2xlLnkgLSBsb25nU2lkZSAqIDEuM1xuXHRcdHdpZHRoOiBsb25nU2lkZSAqIDIuNlxuXHRcdGhlaWdodDogbG9uZ1NpZGUgKiAyLjZcblx0XHRvcHRpb25zOiB7dGltZTogLjV9XG5cdFxuXHRVdGlscy5kZWxheSAyLCAtPiBcblx0XHRtYXNrLmFuaW1hdGVcblx0XHRcdG9wYWNpdHk6IDBcblx0XHRtYXNrLm9uQW5pbWF0aW9uRW5kIG1hc2suZGVzdHJveVxuXG5cdCMgVE9VQ0ggRU5EXG5cdFxuXHRsYXllci5vblRvdWNoRW5kIC0+IFxuXHRcdG1hc2suYW5pbWF0ZVxuXHRcdFx0b3BhY2l0eTogMFxuXHRcdG1hc2sub25BbmltYXRpb25FbmQgbWFzay5kZXN0cm95XG5cbmV4cG9ydHMuUmlwcGxlID0gUmlwcGxlIiwiIyBcdCA4ODg4ODhiYSAgICAgICAgICAgICAgICAgZFAgb28gICAgICAgICAgZFBcbiMgXHQgODggICAgYDhiICAgICAgICAgICAgICAgIDg4ICAgICAgICAgICAgIDg4XG4jIFx0YTg4YWFhYThQJyAuZDg4ODhiLiAuZDg4OGI4OCBkUCAuZDg4ODhiLiA4OGQ4ODhiLiAuZDg4ODhiLiBkUC4gIC5kUFxuIyBcdCA4OCAgIGA4Yi4gODgnICBgODggODgnICBgODggODggODgnICBgODggODgnICBgODggODgnICBgODggIGA4YmQ4J1xuIyBcdCA4OCAgICAgODggODguICAuODggODguICAuODggODggODguICAuODggODguICAuODggODguICAuODggIC5kODhiLlxuIyBcdCBkUCAgICAgZFAgYDg4ODg4UDggYDg4ODg4UDggZFAgYDg4ODg4UCcgODhZODg4OCcgYDg4ODg4UCcgZFAnICBgZFBcblxuXG5UeXBlID0gcmVxdWlyZSAnbWQtY29tcG9uZW50cy9UeXBlJ1xueyBSaXBwbGUgfSA9IHJlcXVpcmUgJ21kLWNvbXBvbmVudHMvUmlwcGxlJ1xueyBJY29uIH0gPSByZXF1aXJlICdtZC1jb21wb25lbnRzL0ljb24nXG57IFRoZW1lIH0gPSByZXF1aXJlICdtZC1jb21wb25lbnRzL1RoZW1lJ1xuXG5leHBvcnRzLlJhZGlvYm94ID0gUmFkaW9ib3ggPSBjbGFzcyBSYWRpb2JveCBleHRlbmRzIEljb25cblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cblx0XHRAX2lzT24gPSB1bmRlZmluZWRcblx0XHRAX2dyb3VwID0gb3B0aW9ucy5ncm91cCA/IFtdXG5cblx0XHRzdXBlciBfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRuYW1lOiAnLidcblx0XHRcdGFuaW1hdGlvbk9wdGlvbnM6IHt0aW1lOiAuMTV9XG5cdFx0XHRpY29uOiAncmFkaW9ib3gtYmxhbmsnXG5cdFx0XHRjb2xvcjogJ3JnYmEoMCwwLDAsLjU0KSdcblxuXHRcdEBpc09uID0gb3B0aW9ucy5pc09uID8gZmFsc2Vcblx0XHRAb25UYXAgLT4gaWYgQGlzT24gaXMgZmFsc2UgdGhlbiBAaXNPbiA9IHRydWVcblxuXHRcdEBfZ3JvdXAucHVzaChAKVxuXG5cdEBkZWZpbmUgXCJpc09uXCIsXG5cdFx0Z2V0OiAtPiByZXR1cm4gQF9pc09uXG5cdFx0c2V0OiAoYm9vbCkgLT5cblx0XHRcdHJldHVybiBpZiBib29sIGlzIEBfaXNPblxuXHRcdFx0XG5cdFx0XHRAX2lzT24gPSBib29sXG5cdFx0XHRAZW1pdChcImNoYW5nZTppc09uXCIsIEBfaXNPbiwgQClcblx0XHRcdEB1cGRhdGUoKVxuXG5cdHVwZGF0ZTogLT5cblx0XHRpZiBAX2lzT25cblx0XHRcdEBpY29uID0gJ3JhZGlvYm94LW1hcmtlZCdcblx0XHRcdEBjb2xvciA9IFRoZW1lLmNvbG9ycy5wcmltYXJ5Lm1haW5cblxuXHRcdFx0cmFkaW9ib3guaXNPbiA9IGZhbHNlIGZvciByYWRpb2JveCBpbiBfLndpdGhvdXQoQF9ncm91cCwgQClcblx0XHRlbHNlIFxuXHRcdFx0QGljb24gPSAncmFkaW9ib3gtYmxhbmsnXG5cdFx0XHRAY29sb3IgPSAncmdiYSgwLDAsMCwuNTQpJyIsIlxuIyAgODg4ODg4YmEgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4jICA4OCAgICBgOGIgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiMgYTg4YWFhYThQJyAuZDg4ODhiLiAuZDg4ODhiLiAuZDg4ODhiLlxuIyAgODggICAgICAgIDg4JyAgYDg4IDg4JyAgYDg4IDg4b29vb2Q4XG4jICA4OCAgICAgICAgODguICAuODggODguICAuODggODguICAuLi5cbiMgIGRQICAgICAgICBgODg4ODhQOCBgODg4OFA4OCBgODg4ODhQJ1xuIyAgICAgICAgICAgICAgICAgICAgICAgICAgLjg4ICAgICAgICAgXG4jICAgICAgICAgICAgICAgICAgICAgIGQ4ODg4UCAgICAgICAgICBcblxueyBUaGVtZSB9ID0gcmVxdWlyZSAnbWQtY29tcG9uZW50cy9UaGVtZSdcblxuZXhwb3J0cy5QYWdlID0gY2xhc3MgUGFnZSBleHRlbmRzIFNjcm9sbENvbXBvbmVudFxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblx0XHRcblx0XHRAX2hlYWRlciA9IHt9XG5cdFx0QF9oZWFkZXIudGl0bGUgPSBvcHRpb25zLmhlYWRlcj8udGl0bGUgPyAnTmV3IFBhZ2UnXG5cdFx0QF9oZWFkZXIudmlzaWJsZSA9IG9wdGlvbnMuaGVhZGVyPy52aXNpYmxlID8gdHJ1ZVxuXHRcdEBfaGVhZGVyLmljb24gPSBvcHRpb25zLmhlYWRlcj8uaWNvbiA/ICdtZW51J1xuXHRcdEBfaGVhZGVyLmljb25BY3Rpb24gPSBvcHRpb25zLmhlYWRlcj8uaWNvbkFjdGlvbiA/IC0+IG51bGxcblxuXHRcdEBfdGVtcGxhdGUgPSBvcHRpb25zLnRlbXBsYXRlXG5cdFx0QF90ZW1wbGF0ZU9wYWNpdHkgPSBvcHRpb25zLnRlbXBsYXRlT3BhY2l0eSA/IC41XG5cdFx0QF9vbkxvYWQgPSBvcHRpb25zLm9uTG9hZCA/IC0+IG51bGxcblxuXHRcdGlmIEBfaGVhZGVyLmljb25BY3Rpb24gdGhlbiBAX2hlYWRlci5pY29uQWN0aW9uID0gXy5iaW5kKEBfaGVhZGVyLmljb25BY3Rpb24sIEApXG5cdFx0aWYgQF9vbkxvYWQgdGhlbiBAX29uTG9hZCA9IF8uYmluZChAX29uTG9hZCwgQClcblxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdG5hbWU6ICdQYWdlJ1xuXHRcdFx0c2l6ZTogU2NyZWVuLnNpemVcblx0XHRcdHNjcm9sbEhvcml6b250YWw6IGZhbHNlXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFRoZW1lLnBhZ2UucHJpbWFyeS5iYWNrZ3JvdW5kQ29sb3Jcblx0XHRcblx0XHRAY29udGVudEluc2V0ID1cblx0XHRcdHRvcDogMCwgYm90dG9tOiAxNjBcblxuXHRcdEBjb250ZW50LmJhY2tncm91bmRDb2xvciA9IG51bGxcblxuXHRcdGlmIEBfdGVtcGxhdGU/XG5cdFx0XHRAX3RlbXBsYXRlLnByb3BzID1cblx0XHRcdFx0cGFyZW50OiBAXG5cdFx0XHRcdG9wYWNpdHk6IEBfdGVtcGxhdGVPcGFjaXR5XG5cblx0XHRAc2VuZFRvQmFjaygpXG5cblx0dXBkYXRlOiAtPiByZXR1cm4gbnVsbCIsIiMgXHQ4ODg4ODhiYSAgICAgICAgICAgICBkUCAgIG9vIC44ODg4YiBvbyAgICAgICAgICAgICAgICAgICAgIGRQICAgb29cbiMgXHQ4OCAgICBgOGIgICAgICAgICAgICA4OCAgICAgIDg4ICAgXCIgICAgICAgICAgICAgICAgICAgICAgICA4OFxuIyBcdDg4ICAgICA4OCAuZDg4ODhiLiBkODg4OFAgZFAgODhhYWEgIGRQIC5kODg4OGIuIC5kODg4OGIuIGQ4ODg4UCBkUCAuZDg4ODhiLiA4OGQ4ODhiLlxuIyBcdDg4ICAgICA4OCA4OCcgIGA4OCAgIDg4ICAgODggODggICAgIDg4IDg4JyAgYFwiXCIgODgnICBgODggICA4OCAgIDg4IDg4JyAgYDg4IDg4JyAgYDg4XG4jIFx0ODggICAgIDg4IDg4LiAgLjg4ICAgODggICA4OCA4OCAgICAgODggODguICAuLi4gODguICAuODggICA4OCAgIDg4IDg4LiAgLjg4IDg4ICAgIDg4XG4jIFx0ZFAgICAgIGRQIGA4ODg4OFAnICAgZFAgICBkUCBkUCAgICAgZFAgYDg4ODg4UCcgYDg4ODg4UDggICBkUCAgIGRQIGA4ODg4OFAnIGRQICAgIGRQXG5cbiMgTm90aWZpY2F0aW9uIGRvZXMgbm90IHJlcXVpcmUgYW4gYXBwIHByb3BlcnR5LCBob3dldmVyIGlmIG9uZSBpcyBub3Qgc2V0IHRoZW4gbm90aWZpY2F0aW9ucyB3aWxsIG5vdCBmbG93IGFyb3VuZCBlYWNob3RoZXIuXG5cbiMgVE9ETzogcmVwbGFjZSBhY3Rpb24xIGFuZCBhY3Rpb24yIHdpdGggYXJyYXkgb2YgYWN0aW9ucy5cblxuVHlwZSA9IHJlcXVpcmUgJ21kLWNvbXBvbmVudHMvVHlwZSdcbnsgUmlwcGxlIH0gPSByZXF1aXJlICdtZC1jb21wb25lbnRzL1JpcHBsZSdcbnsgSWNvbiB9ID0gcmVxdWlyZSAnbWQtY29tcG9uZW50cy9JY29uJ1xueyBUaGVtZSB9ID0gcmVxdWlyZSAnbWQtY29tcG9uZW50cy9UaGVtZSdcbnsgRGl2aWRlciB9ID0gcmVxdWlyZSAnbWQtY29tcG9uZW50cy9EaXZpZGVyJyBcblxuZXhwb3J0cy5Ob3RpZmljYXRpb24gPSBOb3RpZmljYXRpb24gPSBjbGFzcyBOb3RpZmljYXRpb24gZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblx0XHRcblx0XHRAX3RpdGxlID0gb3B0aW9ucy50aXRsZSA/ICdOb3RpZmljYXRpb24nXG5cdFx0QF9ib2R5ID0gb3B0aW9ucy5ib2R5ID8gJ1RoaXMgaXMgYSBub3RpZmljYXRpb24uJ1xuXHRcdEBfaWNvbiA9IG9wdGlvbnMuaWNvbiA/IHVuZGVmaW5lZFxuXHRcdEBfaWNvbkNvbG9yID0gb3B0aW9ucy5pY29uQ29sb3IgPyBUaGVtZS50ZXh0LnNlY29uZGFyeVxuXHRcdEBfaWNvbkJhY2tncm91bmRDb2xvciA9IG9wdGlvbnMuaWNvbkJhY2tncm91bmRDb2xvciA/IFRoZW1lLnNlY29uZGFyeVxuXHRcdEBfdGltZSA9IG9wdGlvbnMudGltZSA/IG5ldyBEYXRlKClcblx0XHQjVE9ETzogcmVwbGFjZSBhY3Rpb24xIC8gYWN0aW9uMiB3aXRoIEBhY3Rpb25zIChhcnJheSlcblx0XHRAX2FjdGlvbjEgPSBvcHRpb25zLmFjdGlvbjFcblx0XHRAX2FjdGlvbjIgPSBvcHRpb25zLmFjdGlvbjJcblx0XHRAX3RpbWVvdXQgPSBvcHRpb25zLnRpbWVvdXQgPyA1XG5cdFx0QF9hcHAgPSBvcHRpb25zLmFwcFxuXG5cdFx0IyBhY3Rpb25zIHNob3VsZCBiZSB7dGl0bGU6ICdhcmNoaXZlJywgaWNvbjogJ2FyY2hpdmUnfVxuXHRcdFxuXHRcdGluaXRZID0gdW5kZWZpbmVkXG5cdFx0aWYgQF9hcHA/XG5cdFx0XHRpbml0WSA9IGlmIEBfYXBwLm5vdGlmaWNhdGlvbnMubGVuZ3RoID4gMCB0aGVuIF8ubGFzdChAX2FwcC5ub3RpZmljYXRpb25zKS5tYXhZICsgOCBlbHNlIEBfYXBwLmhlYWRlci5tYXhZICsgNFxuXHRcdFx0QF9hcHAubm90aWZpY2F0aW9ucy5wdXNoKEApXG5cblx0XHRzdXBlciBfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRuYW1lOiBvcHRpb25zLm5hbWUgPyAnLidcblx0XHRcdHdpZHRoOiAzNDQsIGJvcmRlclJhZGl1czogMlxuXHRcdFx0eDogQWxpZ24uY2VudGVyLCB5OiBpbml0WSA/IDBcblx0XHRcdGJhY2tncm91bmRDb2xvcjogVGhlbWUuZGlhbG9nLmJhY2tncm91bmRDb2xvclxuXHRcdFx0c2hhZG93WDogMCwgc2hhZG93WTogMiwgc2hhZG93Qmx1cjogM1xuXHRcdFx0b3BhY2l0eTogMCwgc2hhZG93Q29sb3I6ICdyZ2JhKDAsMCwwLC4zKSdcblx0XHRcdGFuaW1hdGlvbk9wdGlvbnM6IHt0aW1lOiAuMjV9XG5cblx0XHRAaWNvbkxheWVyID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiAnSWNvbiBDb250YWluZXInXG5cdFx0XHRwYXJlbnQ6IEBcblx0XHRcdHg6IDEyLCB5OiAxMlxuXHRcdFx0aGVpZ2h0OiA0MCwgd2lkdGg6IDQwLCBib3JkZXJSYWRpdXM6IDIwXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IEBfaWNvbkJhY2tncm91bmRDb2xvclxuXG5cdFx0aWYgQF9pY29uXG5cdFx0XHRAaWNvbiA9IG5ldyBJY29uXG5cdFx0XHRcdG5hbWU6ICdJY29uJ1xuXHRcdFx0XHRwYXJlbnQ6IEBpY29uTGF5ZXJcblx0XHRcdFx0eDogQWxpZ24uY2VudGVyLCB5OiBBbGlnbi5jZW50ZXJcblx0XHRcdFx0Y29sb3I6IEBfaWNvbkNvbG9yXG5cdFx0XHRcdGljb246IEBfaWNvblxuXG5cdFx0QHRpdGxlID0gbmV3IFR5cGUuU3ViaGVhZFxuXHRcdFx0bmFtZTogJ1RpdGxlJ1xuXHRcdFx0cGFyZW50OiBAIFxuXHRcdFx0eDogNjQsIHk6IDhcblx0XHRcdHdpZHRoOiBAd2lkdGggLSA3MlxuXHRcdFx0Y29sb3I6ICdyZ2JhKDAsMCwwLC44NyknXG5cdFx0XHR0ZXh0OiBAX3RpdGxlXG5cblx0XHRAYm9keSA9IG5ldyBUeXBlLkJvZHkxXG5cdFx0XHRuYW1lOiAnQm9keSdcblx0XHRcdHBhcmVudDogQFxuXHRcdFx0eDogNjQsIHk6IEB0aXRsZS5tYXhZXG5cdFx0XHR3aWR0aDogQHdpZHRoIC0gNzJcblx0XHRcdHRleHQ6IEBfYm9keVxuXG5cdFx0QGRhdGUgPSBuZXcgVHlwZS5DYXB0aW9uXG5cdFx0XHRuYW1lOiAnRGF0ZSdcblx0XHRcdHBhcmVudDogQFxuXHRcdFx0eDogQWxpZ24ucmlnaHQoLTkpLCB5OiAxNVxuXHRcdFx0dGV4dDogQF90aW1lLnRvTG9jYWxlVGltZVN0cmluZyhbXSwgaG91cjogXCJudW1lcmljXCIsIG1pbnV0ZTogXCIyLWRpZ2l0XCIpXG5cblx0XHRAaGVpZ2h0ID0gXy5jbGFtcChAYm9keS5tYXhZICsgMTMsIDY0LCBJbmZpbml0eSlcblxuXHRcdGlmIEBfYWN0aW9uMT9cblxuXHRcdFx0ZGl2aWRlciA9IG5ldyBEaXZpZGVyXG5cdFx0XHRcdG5hbWU6ICdEaXZpZGVyJ1xuXHRcdFx0XHRwYXJlbnQ6IEBcblx0XHRcdFx0eDogNjQsIHk6IEBib2R5Lm1heFkgKyAxMVxuXHRcdFx0XHR3aWR0aDogQHdpZHRoIC0gNjRcblxuXHRcdFx0aWYgQF9hY3Rpb24xP1xuXHRcdFx0XHRAYWN0aW9uMSA9IG5ldyBMYXllclxuXHRcdFx0XHRcdG5hbWU6ICdBY3Rpb24gMScsIHBhcmVudDogQFxuXHRcdFx0XHRcdHg6IDY0LCB5OiBkaXZpZGVyLm1heFkgKyAxMVxuXHRcdFx0XHRcdHdpZHRoOiA4MCwgaGVpZ2h0OiAyNCwgYmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHRcdFxuXHRcdFx0XHRAYWN0aW9uMS5pY29uID0gbmV3IEljb25cblx0XHRcdFx0XHRuYW1lOiAnSWNvbicsIHBhcmVudDogQGFjdGlvbjFcblx0XHRcdFx0XHRpY29uOiBAX2FjdGlvbjEuaWNvblxuXHRcdFx0XHRcdHdpZHRoOiAxOCwgaGVpZ2h0OiAxOFxuXHRcdFx0XHRcdGNvbG9yOiAncmdiYSgwLDAsMCwuNTQpJ1xuXHRcdFx0XHRcblx0XHRcdFx0QGFjdGlvbjEubGFiZWwgPSBuZXcgVHlwZS5DYXB0aW9uXG5cdFx0XHRcdFx0bmFtZTogJ0xhYmVsJywgcGFyZW50OiBAYWN0aW9uMVxuXHRcdFx0XHRcdHg6IEBhY3Rpb24xLmljb24ubWF4WCArIDhcblx0XHRcdFx0XHRmb250U2l6ZTogMTNcblx0XHRcdFx0XHR0ZXh0OiBAX2FjdGlvbjEudGl0bGUudG9VcHBlckNhc2UoKVxuXG5cdFx0XHRcdEBhY3Rpb24xLndpZHRoID0gQGFjdGlvbjEubGFiZWwubWF4WFxuXG5cdFx0XHRcdCNAYWN0aW9uMS5vblRvdWNoU3RhcnQgKGV2ZW50KSAtPiBSaXBwbGUoQCwgZXZlbnQucG9pbnQsIEBpY29uLCBuZXcgQ29sb3IoVGhlbWUuc2Vjb25kYXJ5KS5hbHBoYSguMykpXG5cdFx0XHRcdEBhY3Rpb24xLm9uVGFwIEBjbG9zZVxuXHRcdFx0XHRpZiBAX2FjdGlvbjEuYWN0aW9uIHRoZW4gQGFjdGlvbjEub25UYXAgPT4gVXRpbHMuZGVsYXkgLjI1LCBfLmJpbmQoQF9hY3Rpb24xLmFjdGlvbiwgQClcblx0XHRcdFx0XG5cblx0XHRcdFx0aWYgQF9hY3Rpb24yP1xuXHRcdFx0XHRcdEBhY3Rpb24yID0gbmV3IExheWVyXG5cdFx0XHRcdFx0XHRuYW1lOiAnQWN0aW9uIDInLCBwYXJlbnQ6IEBcblx0XHRcdFx0XHRcdHg6IEBhY3Rpb24xLm1heFggKyA0NSwgeTogZGl2aWRlci5tYXhZICsgMTFcblx0XHRcdFx0XHRcdHdpZHRoOiA4MCwgaGVpZ2h0OiAyNCwgYmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0QGFjdGlvbjIuaWNvbiA9IG5ldyBJY29uXG5cdFx0XHRcdFx0XHRuYW1lOiAnSWNvbicsIHBhcmVudDogQGFjdGlvbjJcblx0XHRcdFx0XHRcdGljb246IEBfYWN0aW9uMi5pY29uXG5cdFx0XHRcdFx0XHR3aWR0aDogMTgsIGhlaWdodDogMThcblx0XHRcdFx0XHRcdGNvbG9yOiAncmdiYSgwLDAsMCwuNTQpJ1xuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdEBhY3Rpb24yLmxhYmVsID0gbmV3IFR5cGUuQ2FwdGlvblxuXHRcdFx0XHRcdFx0bmFtZTogJ0xhYmVsJywgcGFyZW50OiBAYWN0aW9uMlxuXHRcdFx0XHRcdFx0eDogQGFjdGlvbjIuaWNvbi5tYXhYICsgOFxuXHRcdFx0XHRcdFx0Zm9udFNpemU6IDEzXG5cdFx0XHRcdFx0XHR0ZXh0OiBAX2FjdGlvbjIudGl0bGUudG9VcHBlckNhc2UoKVxuXG5cdFx0XHRcdFx0QGFjdGlvbjIud2lkdGggPSBAYWN0aW9uMi5sYWJlbC5tYXhYXG5cblx0XHRcdFx0XHQjQGFjdGlvbjIub25Ub3VjaFN0YXJ0IChldmVudCkgLT4gUmlwcGxlKEAsIGV2ZW50LnBvaW50LCBAaWNvbiwgbmV3IENvbG9yKFRoZW1lLnNlY29uZGFyeSkuYWxwaGEoLjMpKVxuXHRcdFx0XHRcdEBhY3Rpb24yLm9uVGFwIEBjbG9zZVxuXHRcdFx0XHRcdGlmIEBfYWN0aW9uMi5hY3Rpb24gdGhlbiBAYWN0aW9uMi5vblRhcCA9PiBVdGlscy5kZWxheSAuMjUsIF8uYmluZChAX2FjdGlvbjIuYWN0aW9uLCBAKVxuXHRcdFx0XHRcdFxuXG5cdFx0XHRcdEBoZWlnaHQgPSBkaXZpZGVyLm1heFkgKyA0N1xuXG5cdFx0QG9wZW4oKVxuXG5cdFx0QG9uU3dpcGVMZWZ0RW5kID0+IEBjbG9zZSgnbGVmdCcpXG5cdFx0QG9uU3dpcGVSaWdodEVuZCA9PiBAY2xvc2UoJ3JpZ2h0Jylcblx0XHRVdGlscy5kZWxheSBAX3RpbWVvdXQsID0+IGlmIG5vdCBAY2xvc2VkIHRoZW4gQGNsb3NlKCdyaWdodCcpXG5cblx0b3BlbjogPT4gXG5cdFx0QGFuaW1hdGUge29wYWNpdHk6IDF9XG5cblx0Y2xvc2U6IChkaXJlY3Rpb24pID0+XG5cdFx0aWYgQF9hcHA/IFxuXHRcdFx0Xy5wdWxsKEBfYXBwLm5vdGlmaWNhdGlvbnMsIEApXG5cblx0XHRcdGZvciBub3RpZmljYXRpb24gaW4gQF9hcHAubm90aWZpY2F0aW9uc1xuXHRcdFx0XHRpZiBub3RpZmljYXRpb24ueSA+IEBtYXhZXG5cdFx0XHRcdFx0bm90aWZpY2F0aW9uLmFuaW1hdGUge3k6IG5vdGlmaWNhdGlvbi55IC0gQGhlaWdodH1cblxuXHRcdEBhbmltYXRlXG5cdFx0XHR4OiBpZiBkaXJlY3Rpb24gaXMgJ2xlZnQnIHRoZW4gLVNjcmVlbi53aWR0aCBlbHNlIFNjcmVlbi53aWR0aFxuXHRcdFx0b3BhY2l0eTogMFxuXHRcdFxuXHRcdEBjbG9zZWQgPSB0cnVlXG5cblx0XHRVdGlscy5kZWxheSAuNSwgPT4gQGRlc3Ryb3koKSIsIiMgXHQ4ODg4YmEuODhiYSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC44ODg4OC4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRQICAgICAgICAgICAgICAgICAgXG4jIFx0ODggIGA4YiAgYDhiICAgICAgICAgICAgICAgICAgICAgICAgICAgIGQ4JyAgIGA4YiAgICAgICAgICAgICAgICAgICAgICAgICAgICA4OCAgICAgICAgICAgICAgICAgIFxuIyBcdDg4ICAgODggICA4OCAuZDg4ODhiLiA4OGQ4ODhiLiBkUCAgICBkUCA4OCAgICAgODggZFAgICAuZFAgLmQ4ODg4Yi4gODhkODg4Yi4gODggLmQ4ODg4Yi4gZFAgICAgZFBcbiMgXHQ4OCAgIDg4ICAgODggODhvb29vZDggODgnICBgODggODggICAgODggODggICAgIDg4IDg4ICAgZDgnIDg4b29vb2Q4IDg4JyAgYDg4IDg4IDg4JyAgYDg4IDg4ICAgIDg4XG4jIFx0ODggICA4OCAgIDg4IDg4LiAgLi4uIDg4ICAgIDg4IDg4LiAgLjg4IFk4LiAgIC44UCA4OCAuODgnICA4OC4gIC4uLiA4OCAgICAgICA4OCA4OC4gIC44OCA4OC4gIC44OFxuIyBcdGRQICAgZFAgICBkUCBgODg4ODhQJyBkUCAgICBkUCBgODg4ODhQJyAgYDg4ODhQJyAgODg4OFAnICAgYDg4ODg4UCcgZFAgICAgICAgZFAgYDg4ODg4UDggYDg4ODhQODhcbiMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC44OFxuIyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkODg4OFAgXG5cblR5cGUgPSByZXF1aXJlICdtZC1jb21wb25lbnRzL1R5cGUnXG57IFJpcHBsZSB9ID0gcmVxdWlyZSAnbWQtY29tcG9uZW50cy9SaXBwbGUnXG57IEljb24gfSA9IHJlcXVpcmUgJ21kLWNvbXBvbmVudHMvSWNvbidcbnsgVGhlbWUgfSA9IHJlcXVpcmUgJ21kLWNvbXBvbmVudHMvVGhlbWUnXG57IE1lbnVCdXR0b24gfSA9IHJlcXVpcmUgJ21kLWNvbXBvbmVudHMvTWVudUJ1dHRvbidcblxuZXhwb3J0cy5NZW51T3ZlcmxheSA9IGNsYXNzIE1lbnVPdmVybGF5IGV4dGVuZHMgTGF5ZXJcblx0XG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXG5cdFx0QF9saW5rcyA9IG9wdGlvbnMubGlua3MgPyBbe3RpdGxlOiAnSG9tZScsIGljb246ICdob21lJywgYWN0aW9uOiAtPiBudWxsfV1cblx0XHRAX3RpdGxlID0gb3B0aW9ucy50aXRsZSA/ICdNZW51J1xuXHRcdEBfaW1hZ2UgPSBvcHRpb25zLmltYWdlID8gbnVsbFxuXG5cblx0XHRzdXBlciBfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRoZWlnaHQ6IFNjcmVlbi5oZWlnaHRcblx0XHRcdHdpZHRoOiAzMDRcblx0XHRcdHZpc2libGU6IGZhbHNlXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFRoZW1lLm1lbnVPdmVybGF5LmJhY2tncm91bmRDb2xvclxuXHRcdFx0YW5pbWF0aW9uT3B0aW9uczoge2N1cnZlOiBcInNwcmluZygzMDAsIDM1LCAwKVwifVxuXG5cblx0XHRAc2NyaW0gPSBuZXcgTGF5ZXJcblx0XHRcdG5hbWU6ICcuJywgXG5cdFx0XHRzaXplOiBTY3JlZW4uc2l6ZVxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiAncmdiYSgwLDAsMCwuNiknXG5cdFx0XHRvcGFjaXR5OiAwXG5cdFx0XHR2aXNpYmxlOiBmYWxzZVxuXHRcdFx0YW5pbWF0aW9uT3B0aW9uczpcblx0XHRcdFx0dGltZTogLjI1XG5cblx0XHRAc2NyaW0ub25UYXAgPT4gQGhpZGUoKVxuXHRcdEBvblN3aXBlTGVmdEVuZCA9PiBAaGlkZSgpXG5cblx0XHRAaGVhZGVyID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQFxuXHRcdFx0d2lkdGg6IEB3aWR0aCwgaGVpZ2h0OiAxNzNcblx0XHRcdGltYWdlOiBUaGVtZS51c2VyLmltYWdlXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFRoZW1lLm1lbnVPdmVybGF5LmhlYWRlci5iYWNrZ3JvdW5kQ29sb3JcblxuXHRcdEB0aXRsZUljb24gPSBuZXcgTGF5ZXJcblx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBAaGVhZGVyXG5cdFx0XHR4OiAxNiwgeTogNDBcblx0XHRcdGhlaWdodDogNjQsIHdpZHRoOiA2NFxuXHRcdFx0Ym9yZGVyUmFkaXVzOiAzMlxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBUaGVtZS5tZW51T3ZlcmxheS5oZWFkZXIuaWNvblxuXG5cdFx0QHN1YmhlYWRlckV4cGFuZCA9IG5ldyBJY29uXG5cdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQGhlYWRlclxuXHRcdFx0eDogQWxpZ24ucmlnaHQoLTE2KVxuXHRcdFx0eTogQWxpZ24uYm90dG9tKC0xNilcblx0XHRcdGljb246ICdtZW51LWRvd24nXG5cdFx0XHRjb2xvcjogVGhlbWUubWVudU92ZXJsYXkuc3ViaGVhZGVyLmljb25cblxuXHRcdEBzdWJoZWFkZXIgPSBuZXcgVHlwZS5Cb2R5MVxuXHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEBoZWFkZXJcblx0XHRcdHdpZHRoOiBAd2lkdGhcblx0XHRcdHg6IDE2LCB5OiBBbGlnbi5ib3R0b20oLTE4KVxuXHRcdFx0dGV4dDogQF90aXRsZVxuXHRcdFx0Y29sb3I6IFRoZW1lLm1lbnVPdmVybGF5LnN1YmhlYWRlci50ZXh0XG5cblx0XHRsaW5rcyA9IFtdXG5cblx0XHRmb3IgbGluaywgaSBpbiBAX2xpbmtzXG5cdFx0XHRsaW5rc1tpXSA9IG5ldyBNZW51QnV0dG9uXG5cdFx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBAXG5cdFx0XHRcdHg6IDE2LCB5OiAxODkgKyAoNDggKiBpKVxuXHRcdFx0XHR0ZXh0OiBsaW5rLnRpdGxlXG5cdFx0XHRcdGljb246IGxpbmsuaWNvblxuXHRcdFx0XHRhY3Rpb246IGxpbmsuYWN0aW9uXG5cblx0c2hvdzogLT5cblx0XHRAYnJpbmdUb0Zyb250KClcblx0XHRAdmlzaWJsZSA9IHRydWVcblx0XHRAeCA9IC1TY3JlZW4ud2lkdGhcblx0XHRAYW5pbWF0ZVxuXHRcdFx0eDogMFxuXG5cdFx0QHNjcmltLnBsYWNlQmVoaW5kKEApXG5cdFx0QHNjcmltLnZpc2libGUgPSB0cnVlXG5cdFx0QHNjcmltLmFuaW1hdGVcblx0XHRcdG9wYWNpdHk6IDFcblxuXHRoaWRlOiAtPlxuXHRcdEBhbmltYXRlXG5cdFx0XHR4OiAtU2NyZWVuLndpZHRoXG5cblx0XHRAc2NyaW0uYW5pbWF0ZVxuXHRcdFx0b3BhY2l0eTogMFxuXG5cdFx0VXRpbHMuZGVsYXkgLjMsID0+XG5cdFx0XHRAdmlzaWJsZSA9IGZhbHNlXG5cdFx0XHRAc2NyaW0udmlzaWJsZSA9IGZhbHNlXG5cdFx0XHRAc2VuZFRvQmFjaygpXG5cdFx0XHRAc2NyaW0uc2VuZFRvQmFjaygpIiwiIyBcdDg4ODhiYS44OGJhICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgODg4ODg4YmEgICAgICAgICAgICAgZFAgICAgIGRQXG4jIFx0ODggIGA4YiAgYDhiICAgICAgICAgICAgICAgICAgICAgICAgICAgICA4OCAgICBgOGIgICAgICAgICAgICA4OCAgICAgODhcbiMgXHQ4OCAgIDg4ICAgODggLmQ4ODg4Yi4gODhkODg4Yi4gZFAgICAgZFAgYTg4YWFhYThQJyBkUCAgICBkUCBkODg4OFAgZDg4ODhQIC5kODg4OGIuIDg4ZDg4OGIuXG4jIFx0ODggICA4OCAgIDg4IDg4b29vb2Q4IDg4JyAgYDg4IDg4ICAgIDg4ICA4OCAgIGA4Yi4gODggICAgODggICA4OCAgICAgODggICA4OCcgIGA4OCA4OCcgIGA4OFxuIyBcdDg4ICAgODggICA4OCA4OC4gIC4uLiA4OCAgICA4OCA4OC4gIC44OCAgODggICAgLjg4IDg4LiAgLjg4ICAgODggICAgIDg4ICAgODguICAuODggODggICAgODhcbiMgXHRkUCAgIGRQICAgZFAgYDg4ODg4UCcgZFAgICAgZFAgYDg4ODg4UCcgIDg4ODg4ODg4UCBgODg4ODhQJyAgIGRQICAgICBkUCAgIGA4ODg4OFAnIGRQICAgIGRQXG5cblR5cGUgPSByZXF1aXJlICdtZC1jb21wb25lbnRzL1R5cGUnXG57IFJpcHBsZSB9ID0gcmVxdWlyZSAnbWQtY29tcG9uZW50cy9SaXBwbGUnXG57IEljb24gfSA9IHJlcXVpcmUgJ21kLWNvbXBvbmVudHMvSWNvbidcbnsgVGhlbWUgfSA9IHJlcXVpcmUgJ21kLWNvbXBvbmVudHMvVGhlbWUnXG5cblxuZXhwb3J0cy5NZW51QnV0dG9uID0gY2xhc3MgTWVudUJ1dHRvbiBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXHRcdFxuXHRcdEBfaWNvbiA9IG9wdGlvbnMuaWNvbiA/ICdob21lJ1xuXHRcdEBfdGV4dCA9IG9wdGlvbnMudGV4dCA/ICdEZWZhdWx0J1xuXHRcdEBfYWN0aW9uID0gb3B0aW9ucy5hY3Rpb24gPyAtPiBudWxsXG5cblx0XHRzdXBlciBfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRoZWlnaHQ6IDQ4LCB3aWR0aDogMzA0XG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblxuXHRcdEBpY29uTGF5ZXIgPSBuZXcgSWNvblxuXHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEBcblx0XHRcdHk6IEFsaWduLmNlbnRlclxuXHRcdFx0aWNvbjogQF9pY29uLCBjb2xvcjogVGhlbWUubWVudU92ZXJsYXkudGV4dFxuXG5cdFx0QGxhYmVsTGF5ZXIgPSBuZXcgVHlwZS5SZWd1bGFyXG5cdFx0XHRuYW1lOiAnbGFiZWwnLCBwYXJlbnQ6IEBcblx0XHRcdHg6IEBpY29uTGF5ZXIubWF4WCArIDE2XG5cdFx0XHR5OiBBbGlnbi5jZW50ZXIoKVxuXHRcdFx0Y29sb3I6IFRoZW1lLm1lbnVPdmVybGF5LnRleHRcblx0XHRcdHRleHQ6IEBfdGV4dFxuXG5cdFx0QG9uVGFwIEBfYWN0aW9uXG5cdFx0QG9uVGFwIC0+IFxuXHRcdFx0VXRpbHMuZGVsYXkgLjI1LCA9PiBAcGFyZW50LmhpZGUoKSIsIiMgXHRkUFxuIyBcdDg4XG4jIFx0ODggLmQ4ODg4Yi4gLmQ4ODg4Yi4gODhkODg4Yi5cbiMgXHQ4OCA4OCcgIGBcIlwiIDg4JyAgYDg4IDg4JyAgYDg4XG4jIFx0ODggODguICAuLi4gODguICAuODggODggICAgODhcbiMgXHRkUCBgODg4ODhQJyBgODg4ODhQJyBkUCAgICBkUFxuIyBcdFxuIyBcdFxuIy0tIEBzdGV2ZXJ1aXpva1xuI1x0QSBjbGFzcyBmb3IgY3JlYXRpbmcgTWF0ZXJpYWwgRGVzaWduIGljb25zLCB3aXRoIGFjY2VzcyB0byAxNjAwIGljb25zIGFzIFNWR3MuXG4jXHRBZGFwdGVkIGZyb20gbWFyY2JhY2htYW5uJ3MgaHR0cHM6Ly93d3cubnBtanMuY29tL3BhY2thZ2UvbWF0ZXJpYWwtZGVzaWduLWljb25zLXN2Zy5cbiNcdFxuI1xuIy0tIEluc3RhbGxhdGlvbjpcbiNcdERvd25sb2FkIGFuZCBwbGFjZSBpY29uLmNvZmZlZSBhbmQgaWNvbnMuanNvbiBpbiB5b3VyIHByb2plY3QncyBtb2R1bGVzIGZvbGRlci5cbiNcdEF0IHRoZSB0b3Agb2YgeW91ciBwcm9qZWN0LCB0eXBlOiBcIntJY29ufSA9IHJlcXVpcmUgXCJpY29uXCJcbiNcbiNcbiMtLVx0VXNhZ2U6XG4jXG4jXHRUbyBjcmVhdGUgYW4gaWNvbiwgdHlwZTpcbiNcbiNcdFx0bXlJY29uID0gbmV3IEljb25cbiNcdFx0XG4jXHRZb3UgY2FuIHNldCB0aGUgaWNvbiBhbmQgdGhlIGljb24ncyBmaWxsIGNvbG9yLlxuI1xuI1x0XHRteUljb24gPSBuZXcgSWNvblxuI1x0XHRcdGljb246ICdjb29raWUnXG4jXHRcdFx0Y29sb3I6ICcjOTQ1MjAwJ1xuI1xuI1x0WW91IGNhbiBjaGFuZ2UgYW4gZXhpc3RpbmcgaWNvbidzIGZpbGwgb3IgaWNvbi5cbiNcbiMgXHRcdG15SWNvbi5jb2xvciA9ICdyZWQnIFxuI1x0XHRteUljb24uaWNvbiA9ICdjdXAnXG4jXG4jXHRBcGFydCBmcm9tIHRoYXQsIHlvdSBjYW4gdXNlIHRoZSBJY29uIGluc3RhbmNlIGp1c3QgbGlrZSBhbnkgb3RoZXIgTGF5ZXIgaW5zdGFuY2UuXG4jXG4jXG4jLS0gVHJvdWJsZXNob290aW5nXG4jXG4jXHRRLlx0V2h5IGRvIEkga2VlcCBnZXR0aW5nIHRoZSBcIkljb24gbm90IGZvdW5kP1wiIGVycm9yP1xuI1xuI1x0QS5cdFRoZSBpY29uIG5hbWVzIHVzZWQgYnkgdGhpcyBtb2R1bGUgYXJlIG5vdCBhbHdheXMgc3RhbmRhcmQgdG8gR29vZ2xlJ3MgbGlzdGluZ3MuIFxuI1x0XHRJZiB5b3UncmUgZ2V0dGluZyBlcnJvcnMsIHNlYXJjaCBmb3IgdGhlIGljb24gYXQgaHR0cHM6Ly9tYXRlcmlhbGRlc2lnbmljb25zLmNvbS8uXG4jXHRcdEl0IG1heSBiZSBsaXN0ZWQgdGhlcmUgdW5kZXIgYSBkaWZmZXJlbnQgbmFtZS4gSWYgdGhhdCdzIHRoZSBjYXNlLCB1c2UgdGhlaXJcbiNcdFx0bmFtZSBmb3IgdGhlIGljb24gaW5zdGVhZCB3aGVuIGNyZWF0aW5nIHlvdXIgSWNvbiBpbnN0YW5jZS5cbiNcbiNcdFx0QSBjb21tb24gZXhhbXBsZTogaWNvbjogXCJzZWFyY2hcIiB3b24ndCB3b3JrLCBidXQgaWNvbjogXCJtYWduaWZ5XCIgd2lsbC4gwq9cXF8o44OEKV8vwq9cbiNcdFxuIy0tIEVuam95ISBAc3RldmVydWlva1xuXG5cbmljb25zID0gSlNPTi5wYXJzZSBVdGlscy5kb21Mb2FkRGF0YVN5bmMgXCJtb2R1bGVzL21kLWNvbXBvbmVudHMvaWNvbnMuanNvblwiXG5cbmV4cG9ydHMuSWNvbiA9IGNsYXNzIEljb24gZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblxuXHRcdEBfaWNvbiA9IG9wdGlvbnMuaWNvbiA/ICdtZW51J1xuXHRcdEBfY29sb3IgPSBvcHRpb25zLmNvbG9yID8gJyMwMDAwMCdcblx0XHRAX2JhY2tncm91bmRDb2xvciA9IG9wdGlvbnMuYmFja2dyb3VuZENvbG9yID8gbnVsbFxuXG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0bmFtZTogJy4nXG5cdFx0XHRoZWlnaHQ6IDI0LCB3aWR0aDogMjRcblx0XHRcdGJhY2tncm91bmRDb2xvcjogQF9iYWNrZ3JvdW5kQ29sb3JcblxuXHRAZGVmaW5lIFwiaWNvblwiLFxuXHRcdGdldDogLT4gcmV0dXJuIEBfaWNvblxuXHRcdHNldDogKG5hbWUpIC0+XG5cdFx0XHRAX2ljb24gPSBuYW1lXG5cblx0XHRcdHN2ZyA9IGlmIGljb25zW0BfaWNvbl0gdGhlbiBcIjxzdmcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB2aWV3Qm94PScwIDAgMjQgMjQnPjxwYXRoIGQ9JyN7aWNvbnNbQF9pY29uXX0nIGZpbGw9JyN7QF9jb2xvcn0nLz48L3N2Zz5cIlxuXHRcdFx0ZWxzZSB0aHJvdyBcIkVycm9yOiBpY29uICcje25hbWV9JyB3YXMgbm90IGZvdW5kLiBTZWUgaHR0cHM6Ly9tYXRlcmlhbGRlc2lnbmljb25zLmNvbS8gZm9yIGZ1bGwgbGlzdCBvZiBpY29ucy5cIlxuXG5cdFx0XHRAaHRtbCA9IHN2Z1xuXG5cdEBkZWZpbmUgXCJjb2xvclwiLFxuXHRcdGdldDogLT4gcmV0dXJuIEBfY29sb3Jcblx0XHRzZXQ6IChjb2xvcikgLT5cblx0XHRcdEBfY29sb3IgPSBuZXcgQ29sb3IoY29sb3IpXG5cblx0XHRcdHN2ZyA9IGlmIGljb25zW0BfaWNvbl0gdGhlbiBcIjxzdmcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB2aWV3Qm94PScwIDAgMjQgMjQnPjxwYXRoIGQ9JyN7aWNvbnNbQF9pY29uXX0nIGZpbGw9JyN7QF9jb2xvcn0nLz48L3N2Zz5cIlxuXHRcdFx0ZWxzZSB0aHJvdyBcIkVycm9yOiBpY29uICcje25hbWV9JyB3YXMgbm90IGZvdW5kLiBTZWUgaHR0cHM6Ly9tYXRlcmlhbGRlc2lnbmljb25zLmNvbS8gZm9yIGZ1bGwgbGlzdCBvZiBpY29ucy5cIlxuXG5cdFx0XHRAaHRtbCA9IHN2ZyIsIiMgZFAgICAgIGRQICAgICAgICAgICAgICAgICAgICAgICAgICBkUCAgICAgICAgICAgICAgICAgIFxuIyA4OCAgICAgODggICAgICAgICAgICAgICAgICAgICAgICAgIDg4ICAgICAgICAgICAgICAgICAgXG4jIDg4YWFhYWE4OGEgLmQ4ODg4Yi4gLmQ4ODg4Yi4gLmQ4ODhiODggLmQ4ODg4Yi4gODhkODg4Yi5cbiMgODggICAgIDg4ICA4OG9vb29kOCA4OCcgIGA4OCA4OCcgIGA4OCA4OG9vb29kOCA4OCcgIGA4OFxuIyA4OCAgICAgODggIDg4LiAgLi4uIDg4LiAgLjg4IDg4LiAgLjg4IDg4LiAgLi4uIDg4ICAgICAgXG4jIGRQICAgICBkUCAgYDg4ODg4UCcgYDg4ODg4UDggYDg4ODg4UDggYDg4ODg4UCcgZFAgICAgXG5cblR5cGUgPSByZXF1aXJlICdtZC1jb21wb25lbnRzL1R5cGUnXG57IFJpcHBsZSB9ID0gcmVxdWlyZSAnbWQtY29tcG9uZW50cy9SaXBwbGUnXG57IEljb24gfSA9IHJlcXVpcmUgJ21kLWNvbXBvbmVudHMvSWNvbidcbnsgVGhlbWUgfSA9IHJlcXVpcmUgJ21kLWNvbXBvbmVudHMvVGhlbWUnXG57IFN0YXR1c0JhciB9ID0gcmVxdWlyZSAnbWQtY29tcG9uZW50cy9TdGF0dXNCYXInXG5cbmV4cG9ydHMuSGVhZGVyID0gY2xhc3MgSGVhZGVyIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cdFx0XG5cdFx0QF90aXRsZSA9IHVuZGVmaW5lZFxuXHRcdEBfaWNvbiA9IHVuZGVmaW5lZFxuXHRcdEBfaWNvbkFjdGlvbiA9IG9wdGlvbnMuaWNvbkFjdGlvbiA/IC0+IG51bGxcblxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdG5hbWU6ICdIZWFkZXInLCBcblx0XHRcdHdpZHRoOiBTY3JlZW4ud2lkdGgsIGhlaWdodDogODBcblx0XHRcdHNoYWRvd1k6IDIsIHNoYWRvd0JsdXI6IDMsIHNoYWRvd0NvbG9yOiAncmdiYSgwLDAsMCwuMjQpJ1xuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBUaGVtZS5oZWFkZXIuYmFja2dyb3VuZENvbG9yXG5cblx0XHQjIFRPRE86IGlmIG9wdGlvbnMuaWNvbiBpcyBmYWxzZSB0aGVuIG5vIGljb25MYXllciwgbW92ZSB0aXRsZSBsZWZ0XG5cblx0XHRAdGl0bGVMYXllciA9IG5ldyBUeXBlLlRpdGxlXG5cdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQFxuXHRcdFx0eDogNzIsIHk6IEFsaWduLmJvdHRvbSgtMTQpXG5cdFx0XHRjb2xvcjogVGhlbWUuaGVhZGVyLnRpdGxlXG5cdFx0XHR0ZXh0OiBAdGl0bGUgPyBcIk5vIHRpdGxlXCJcblxuXHRcdEB0aXRsZSA9IG9wdGlvbnMudGl0bGUgPyAnRGVmYXVsdCBIZWFkZXInXG5cblx0XHRAaWNvbkxheWVyID0gbmV3IEljb25cblx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBALCBcblx0XHRcdHg6IDEyLCB5OiBBbGlnbi5jZW50ZXIoMTIpXG5cdFx0XHRpY29uOiAnbWVudScsIGNvbG9yOiBUaGVtZS5oZWFkZXIuaWNvbi5jb2xvclxuXG5cdFx0QGljb24gPSBvcHRpb25zLmljb24gPyAnbWVudSdcblxuXHRcdEBzdGF0dXNCYXIgPSBuZXcgU3RhdHVzQmFyXG5cdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQFxuXG5cdFx0QGljb25MYXllci5vblRhcCA9PiBAX2ljb25BY3Rpb24oKVxuXHRcdEBpY29uTGF5ZXIub25Ub3VjaFN0YXJ0IChldmVudCkgPT4gUmlwcGxlKEAsIGV2ZW50LnBvaW50LCBAdGl0bGVMYXllcilcblxuXG5cdEBkZWZpbmUgXCJ0aXRsZVwiLFxuXHRcdGdldDogLT4gcmV0dXJuIEBfdGl0bGVcblx0XHRzZXQ6ICh0aXRsZVRleHQpIC0+XG5cdFx0XHRAX3RpdGxlID0gdGl0bGVUZXh0XG5cdFx0XHRAdGl0bGVMYXllci50ZXh0UmVwbGFjZShAdGl0bGVMYXllci50ZXh0LCBAX3RpdGxlKVxuXG5cdEBkZWZpbmUgXCJpY29uXCIsXG5cdFx0Z2V0OiAtPiByZXR1cm4gQF9pY29uXG5cdFx0c2V0OiAoaWNvbk5hbWUpIC0+IFxuXHRcdFx0QF9pY29uID0gaWNvbk5hbWVcblx0XHRcdEBpY29uTGF5ZXIuaWNvbiA9IGljb25OYW1lXG5cblx0QGRlZmluZSBcImljb25Db2xvclwiLFxuXHRcdGdldDogLT4gcmV0dXJuIEBfaWNvbi5jb2xvclxuXHRcdHNldDogKGNvbG9yKSAtPiBcblx0XHRcdEBpY29uTGF5ZXIuY29sb3IgPSBjb2xvclxuXG5cdEBkZWZpbmUgXCJpY29uQWN0aW9uXCIsXG5cdFx0Z2V0OiAtPiByZXR1cm4gQF9pY29uQWN0aW9uXG5cdFx0c2V0OiAoYWN0aW9uKSAtPlxuXHRcdFx0QF9pY29uQWN0aW9uID0gYWN0aW9uIiwiXG4jIFx0IC44ODg4OC4gICAgICAgICAgIG9vICAgICAgIGRQIGRQICAgICAgICBvbyAgICAgICAgICAgIGRQXG4jIFx0ZDgnICAgYDg4ICAgICAgICAgICAgICAgICAgIDg4IDg4ICAgICAgICAgICAgICAgICAgICAgIDg4XG4jIFx0ODggICAgICAgIDg4ZDg4OGIuIGRQIC5kODg4Yjg4IDg4ICAgICAgICBkUCAuZDg4ODhiLiBkODg4OFBcbiMgXHQ4OCAgIFlQODggODgnICBgODggODggODgnICBgODggODggICAgICAgIDg4IFk4b29vb28uICAgODhcbiMgXHRZOC4gICAuODggODggICAgICAgODggODguICAuODggODggICAgICAgIDg4ICAgICAgIDg4ICAgODhcbiMgXHQgYDg4ODg4JyAgZFAgICAgICAgZFAgYDg4ODg4UDggODg4ODg4ODhQIGRQIGA4ODg4OFAnICAgZFBcblxuVHlwZSA9IHJlcXVpcmUgJ21kLWNvbXBvbmVudHMvVHlwZSdcbnsgUmlwcGxlIH0gPSByZXF1aXJlICdtZC1jb21wb25lbnRzL1JpcHBsZSdcbnsgSWNvbiB9ID0gcmVxdWlyZSAnbWQtY29tcG9uZW50cy9JY29uJ1xueyBUaGVtZSB9ID0gcmVxdWlyZSAnbWQtY29tcG9uZW50cy9UaGVtZSdcblxuZXhwb3J0cy5HcmlkTGlzdCA9IGNsYXNzIEdyaWRMaXN0IGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cdFx0XG5cdFx0QF9jb2x1bW5zID0gb3B0aW9ucy5jb2x1bW5zID8gMlxuXHRcdFxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdG5hbWU6ICcuJ1xuXHRcdFx0d2lkdGg6IFNjcmVlbi53aWR0aFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XG5cdFx0QHRpbGVzID0gW11cblx0XHRAdGlsZVdpZHRoID0gKEB3aWR0aCAtIDI0KSAvIEBfY29sdW1uc1xuXHRcdEB0aWxlSGVpZ2h0ID0gb3B0aW9ucy50aWxlSGVpZ2h0ID8gU2NyZWVuLndpZHRoIC8gQF9jb2x1bW5zXG5cdFx0XG5cdGFkZFRpbGU6ICh0aWxlKSAtPlxuXHRcdHRpbGUuaSA9IEB0aWxlcy5sZW5ndGhcblx0XHRAdGlsZXMucHVzaCh0aWxlKVxuXHRcdFxuXHRcdHRpbGUueCA9IDggKyAoQHRpbGVXaWR0aCArIDgpICogKHRpbGUuaSAlIEBfY29sdW1ucylcblx0XHR0aWxlLnkgPSA4ICsgKEB0aWxlSGVpZ2h0ICsgOCkgKiBNYXRoLmZsb29yKHRpbGUuaSAvIEBfY29sdW1ucylcblxuXHRcdEBoZWlnaHQgPSBfLmxhc3QoQHRpbGVzKS5tYXhZXG5cblx0XHRpZiBAcGFyZW50Py5wYXJlbnQ/LmNvbnRlbnQ/IHRoZW4gQHBhcmVudC5wYXJlbnQudXBkYXRlQ29udGVudCgpXG5cdFxuXHRyZW1vdmVUaWxlOiAodGlsZSkgLT5cblx0XHRfLnB1bGwoQHRpbGVzLCB0aWxlKVxuXHRcdHRpbGUuZGVzdHJveSgpXG5cdFx0QHJlcG9zaXRpb25UaWxlcygpXG5cblx0cmVwb3NpdGlvblRpbGVzOiAtPlxuXHRcdGZvciB0aWxlLCBpIGluIEB0aWxlc1xuXHRcdFx0dGlsZS5pID0gaVxuXHRcdFx0dGlsZS5hbmltYXRlXG5cdFx0XHRcdHg6IDggKyAoQHRpbGVXaWR0aCArIDgpICogKHRpbGUuaSAlIEBfY29sdW1ucylcblx0XHRcdFx0eTogOCArIChAdGlsZUhlaWdodCArIDgpICogTWF0aC5mbG9vcih0aWxlLmkgLyBAX2NvbHVtbnMpXG5cdFx0QGhlaWdodCA9IF8ubGFzdChAdGlsZXMpLm1heFlcblxuXHRcdGlmIEBwYXJlbnQ/LnBhcmVudD8uY29udGVudD8gdGhlbiBAcGFyZW50LnBhcmVudC51cGRhdGVDb250ZW50KClcbiIsIiMgXHQ4ODg4ODhiYSAgb28gICAgICAgICAgb28gICAgICAgZFBcbiMgXHQ4OCAgICBgOGIgICAgICAgICAgICAgICAgICAgICAgODhcbiMgXHQ4OCAgICAgODggZFAgZFAgICAuZFAgZFAgLmQ4ODhiODggLmQ4ODg4Yi4gODhkODg4Yi5cbiMgXHQ4OCAgICAgODggODggODggICBkOCcgODggODgnICBgODggODhvb29vZDggODgnICBgODhcbiMgXHQ4OCAgICAuOFAgODggODggLjg4JyAgODggODguICAuODggODguICAuLi4gODhcbiMgXHQ4ODg4ODg4UCAgZFAgODg4OFAnICAgZFAgYDg4ODg4UDggYDg4ODg4UCcgZFBcblxueyBUaGVtZSB9ID0gcmVxdWlyZSAnbWQtY29tcG9uZW50cy9UaGVtZSdcblxuZXhwb3J0cy5EaXZpZGVyID0gRGl2aWRlciA9IGNsYXNzIERpdmlkZXIgZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblx0XHRzdXBlciBfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRuYW1lOiAnLidcblx0XHRcdHdpZHRoOiAyMDAsIGhlaWdodDogMSxcblx0XHRcdGJhY2tncm91bmRDb2xvcjogVGhlbWUuZGl2aWRlci5iYWNrZ3JvdW5kQ29sb3IiLCIjIFx0ODg4ODg4YmEgIG9vICAgICAgICAgIGRQXG4jIFx0ODggICAgYDhiICAgICAgICAgICAgIDg4XG4jIFx0ODggICAgIDg4IGRQIC5kODg4OGIuIDg4IC5kODg4OGIuIC5kODg4OGIuXG4jIFx0ODggICAgIDg4IDg4IDg4JyAgYDg4IDg4IDg4JyAgYDg4IDg4JyAgYDg4XG4jIFx0ODggICAgLjhQIDg4IDg4LiAgLjg4IDg4IDg4LiAgLjg4IDg4LiAgLjg4XG4jIFx0ODg4ODg4OFAgIGRQIGA4ODg4OFA4IGRQIGA4ODg4OFAnIGA4ODg4UDg4XG4jIFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLjg4XG4jIFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkODg4OFBcblxuVHlwZSA9IHJlcXVpcmUgJ21kLWNvbXBvbmVudHMvVHlwZSdcbnsgUmlwcGxlIH0gPSByZXF1aXJlICdtZC1jb21wb25lbnRzL1JpcHBsZSdcbnsgSWNvbiB9ID0gcmVxdWlyZSAnbWQtY29tcG9uZW50cy9JY29uJ1xueyBUaGVtZSB9ID0gcmVxdWlyZSAnbWQtY29tcG9uZW50cy9UaGVtZSdcbnsgQnV0dG9uIH0gPSByZXF1aXJlICdtZC1jb21wb25lbnRzL0J1dHRvbidcblxuZXhwb3J0cy5EaWFsb2cgPSBjbGFzcyBEaWFsb2cgZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblx0XHRzdXBlciBfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRuYW1lOiAnLidcblx0XHRcdHNpemU6IFNjcmVlbi5zaXplXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6ICdyZ2JhKDAsIDAsIDAsIC41KSdcblx0XHRcdG9wYWNpdHk6IDBcblx0XHRcdFxuXHRcdEBfdGl0bGUgPSBvcHRpb25zLnRpdGxlID8gJ0RlZmF1bHQgVGl0bGUnXG5cdFx0QF9ib2R5ID0gb3B0aW9ucy5ib2R5ID8gJ0JvZHkgdGV4dCBnb2VzIGhlcmUuJ1xuXHRcdEBfYWNjZXB0VGV4dCA9IG9wdGlvbnMuYWNjZXB0VGV4dCA/ICdjb25maXJtJ1xuXHRcdEBfYWNjZXB0QWN0aW9uID0gb3B0aW9ucy5hY2NlcHRBY3Rpb24gPyAtPiBudWxsXG5cdFx0QF9kZWNsaW5lVGV4dCA9IG9wdGlvbnMuZGVjbGluZVRleHQgPyAnJ1xuXHRcdEBfZGVjbGluZUFjdGlvbiA9IG9wdGlvbnMuZGVjbGluZUFjdGlvbiA/IC0+IG51bGxcblx0XHRcblx0XHRAb24gRXZlbnRzLlRhcCwgKGV2ZW50KSAtPiBldmVudC5zdG9wUHJvcGFnYXRpb24oKVxuXHRcdFxuXHRcdEBjb250YWluZXIgPSBuZXcgTGF5ZXJcblx0XHRcdG5hbWU6ICdjb250YWluZXInLCBwYXJlbnQ6IEBcblx0XHRcdHg6IEFsaWduLmNlbnRlclxuXHRcdFx0aGVpZ2h0OiAxMjgsIHdpZHRoOiBTY3JlZW4ud2lkdGggLSA4MFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBUaGVtZS5kaWFsb2cuYmFja2dyb3VuZENvbG9yXG5cdFx0XHRzaGFkb3dYOiAwLCBzaGFkb3dZOiA3LCBzaGFkb3dCbHVyOiAzMFxuXHRcdFx0b3BhY2l0eTogMFxuXHRcdFx0c2hhZG93Q29sb3I6ICdyZ2JhKDAsMCwwLC4zKSdcblx0XHRcblx0XHRAdGl0bGUgPSBuZXcgVHlwZS5UaXRsZVxuXHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEBjb250YWluZXJcblx0XHRcdHg6IDI0LCB5OiAyMFxuXHRcdFx0Zm9udFNpemU6IDE2LCBmb250V2VpZ2h0OiA1MDAsIGNvbG9yOiBUaGVtZS50ZXh0LnRpdGxlXG5cdFx0XHR0ZXh0OiBAX3RpdGxlXG5cdFx0XG5cdFx0QGJvZHkgPSBuZXcgVHlwZS5TdWJoZWFkXG5cdFx0XHRuYW1lOiAnYm9keScsIHBhcmVudDogQGNvbnRhaW5lclxuXHRcdFx0eDogMjQsIHk6IDUyXG5cdFx0XHR3aWR0aDogQGNvbnRhaW5lci53aWR0aCAtIDQyXG5cdFx0XHR0ZXh0OiBAX2JvZHlcblx0XHRcblx0XHRidXR0b25zWSA9IGlmIEBfYm9keSBpcyAnJyB0aGVuIDEyOCBlbHNlIEBib2R5Lm1heFkgKyAxNlxuXHRcdFxuXHRcdEBhY2NlcHQgPSBuZXcgQnV0dG9uXG5cdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQGNvbnRhaW5lclxuXHRcdFx0eDogQWxpZ24ucmlnaHQoLTE2KSwgeTogYnV0dG9uc1lcblx0XHRcdHRleHQ6IEBfYWNjZXB0VGV4dC50b1VwcGVyQ2FzZSgpXG5cdFx0XHRhY3Rpb246IEBfYWNjZXB0QWN0aW9uXG5cdFx0XG5cdFx0aWYgQF9kZWNsaW5lVGV4dCBpc250ICcnXG5cdFx0XHRAZGVjbGluZSA9IG5ldyBCdXR0b25cblx0XHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEBjb250YWluZXJcblx0XHRcdFx0eDogMCwgeTogYnV0dG9uc1lcblx0XHRcdFx0dGV4dDogQF9kZWNsaW5lVGV4dC50b1VwcGVyQ2FzZSgpXG5cdFx0XHRcdGFjdGlvbjogQF9kZWNsaW5lQWN0aW9uXG5cblx0XHQjIHNldCBwb3NpdGlvbnNcblx0XHRAY29udGFpbmVyLmhlaWdodCA9IEBhY2NlcHQubWF4WSArIDEyXG5cdFx0QGRlY2xpbmU/Lm1heFggPSBAYWNjZXB0LnggLSAxNlxuXHRcdEBjb250YWluZXIueSA9IEFsaWduLmNlbnRlcigxNilcblx0XHRcblx0XHQjIGFkZCBjbG9zZSBhY3Rpb25zIHRvIGNvbmZpcm0gYW5kIGNhbmNlbFxuXHRcdGZvciBidXR0b24gaW4gW0BhY2NlcHQsIEBkZWNsaW5lXVxuXHRcdFx0YnV0dG9uPy5vblRhcCBAY2xvc2Vcblx0XHRcblx0XHQjIE9OIExPQURcblx0XHRAb3BlbigpXG5cdFxuXHRvcGVuOiA9PlxuXHRcdEBhbmltYXRlXG5cdFx0XHRvcGFjaXR5OiAxXG5cdFx0XHRvcHRpb25zOiBcblx0XHRcdFx0dGltZTogLjI1XG5cdFx0XG5cdFx0QGNvbnRhaW5lci5hbmltYXRlXG5cdFx0XHRvcGFjaXR5OiAxXG5cdFx0XHRvcHRpb25zOlxuXHRcdFx0XHR0aW1lOiAuMjVcblx0XHRcdFx0ZGVsYXk6IC4wNVxuXG5cdGNsb3NlOiA9PlxuXHRcdEBjb250YWluZXIuYW5pbWF0ZVxuXHRcdFx0b3BhY2l0eTogMFxuXHRcdFx0b3B0aW9uczpcblx0XHRcdFx0dGltZTogLjI1XG5cdFx0XG5cdFx0QGFuaW1hdGVcblx0XHRcdG9wYWNpdHk6IDBcblx0XHRcdG9wdGlvbnM6XG5cdFx0XHRcdHRpbWU6IC4yNVxuXHRcdFxuXHRcdFV0aWxzLmRlbGF5IC41LCA9PiBAZGVzdHJveSgpIiwiIyBcdCBhODg4ODhiLiBkUCAgICAgICAgICAgICAgICAgICAgICAgICBkUCAgICAgICBkUFxuIyBcdGQ4JyAgIGA4OCA4OCAgICAgICAgICAgICAgICAgICAgICAgICA4OCAgICAgICA4OFxuIyBcdDg4ICAgICAgICA4OGQ4ODhiLiAuZDg4ODhiLiAuZDg4ODhiLiA4OCAgLmRQICA4OGQ4ODhiLiAuZDg4ODhiLiBkUC4gIC5kUFxuIyBcdDg4ICAgICAgICA4OCcgIGA4OCA4OG9vb29kOCA4OCcgIGBcIlwiIDg4ODg4XCIgICA4OCcgIGA4OCA4OCcgIGA4OCAgYDhiZDgnXG4jIFx0WTguICAgLjg4IDg4ICAgIDg4IDg4LiAgLi4uIDg4LiAgLi4uIDg4ICBgOGIuIDg4LiAgLjg4IDg4LiAgLjg4ICAuZDg4Yi5cbiMgXHQgWTg4ODg4UCcgZFAgICAgZFAgYDg4ODg4UCcgYDg4ODg4UCcgZFAgICBgWVAgODhZODg4OCcgYDg4ODg4UCcgZFAnICBgZFBcblxuVHlwZSA9IHJlcXVpcmUgJ21kLWNvbXBvbmVudHMvVHlwZSdcbnsgUmlwcGxlIH0gPSByZXF1aXJlICdtZC1jb21wb25lbnRzL1JpcHBsZSdcbnsgSWNvbiB9ID0gcmVxdWlyZSAnbWQtY29tcG9uZW50cy9JY29uJ1xueyBUaGVtZSB9ID0gcmVxdWlyZSAnbWQtY29tcG9uZW50cy9UaGVtZSdcblxuZXhwb3J0cy5DaGVja2JveCA9IENoZWNrQm94ID0gY2xhc3MgQ2hlY2tib3ggZXh0ZW5kcyBJY29uXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXG5cdFx0QF9pc09uID0gdW5kZWZpbmVkXG5cblx0XHRzdXBlciBfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRuYW1lOiAnLidcblx0XHRcdGFuaW1hdGlvbk9wdGlvbnM6IHt0aW1lOiAuMTV9XG5cdFx0XHRpY29uOiAnY2hlY2tib3gtYmxhbmstb3V0bGluZSdcblx0XHRcdGNvbG9yOiAncmdiYSgwLDAsMCwuNTQpJ1xuXG5cdFx0QGlzT24gPSBvcHRpb25zLmlzT24gPyBmYWxzZVxuXHRcdEBvblRhcCAtPiBAaXNPbiA9ICFAaXNPblxuXG5cdEBkZWZpbmUgXCJpc09uXCIsXG5cdFx0Z2V0OiAtPiByZXR1cm4gQF9pc09uXG5cdFx0c2V0OiAoYm9vbCkgLT5cblx0XHRcdHJldHVybiBpZiBib29sIGlzIEBfaXNPblxuXHRcdFx0XG5cdFx0XHRAX2lzT24gPSBib29sXG5cdFx0XHRAZW1pdChcImNoYW5nZTppc09uXCIsIEBfaXNPbiwgQClcblx0XHRcdEB1cGRhdGUoKVxuXG5cdHVwZGF0ZTogLT5cblx0XHRpZiBAX2lzT25cblx0XHRcdEBpY29uID0gJ2NoZWNrYm94LW1hcmtlZCdcblx0XHRcdEBjb2xvciA9IFRoZW1lLmNvbG9ycy5wcmltYXJ5Lm1haW5cblx0XHRlbHNlIFxuXHRcdFx0QGljb24gPSAnY2hlY2tib3gtYmxhbmstb3V0bGluZSdcblx0XHRcdEBjb2xvciA9ICdyZ2JhKDAsMCwwLC41NCknIiwiIyBcdCA4ODg4ODhiYSAgICAgICAgICAgICBkUCAgICAgZFBcbiMgXHQgODggICAgYDhiICAgICAgICAgICAgODggICAgIDg4XG4jIFx0YTg4YWFhYThQJyBkUCAgICBkUCBkODg4OFAgZDg4ODhQIC5kODg4OGIuIDg4ZDg4OGIuXG4jIFx0IDg4ICAgYDhiLiA4OCAgICA4OCAgIDg4ICAgICA4OCAgIDg4JyAgYDg4IDg4JyAgYDg4XG4jIFx0IDg4ICAgIC44OCA4OC4gIC44OCAgIDg4ICAgICA4OCAgIDg4LiAgLjg4IDg4ICAgIDg4XG4jIFx0IDg4ODg4ODg4UCBgODg4ODhQJyAgIGRQICAgICBkUCAgIGA4ODg4OFAnIGRQICAgIGRQXG5cblxuVHlwZSA9IHJlcXVpcmUgJ21kLWNvbXBvbmVudHMvVHlwZSdcbnsgUmlwcGxlIH0gPSByZXF1aXJlICdtZC1jb21wb25lbnRzL1JpcHBsZSdcbnsgSWNvbiB9ID0gcmVxdWlyZSAnbWQtY29tcG9uZW50cy9JY29uJ1xueyBUaGVtZSB9ID0gcmVxdWlyZSAnbWQtY29tcG9uZW50cy9UaGVtZSdcblxuZXhwb3J0cy5CdXR0b24gPSBjbGFzcyBCdXR0b24gZXh0ZW5kcyBMYXllciBcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cblx0XHRAX3JhaXNlZCA9IG9wdGlvbnMucmFpc2VkID8gZmFsc2Vcblx0XHRAX3R5cGUgPSBpZiBAX3JhaXNlZCB0aGVuICdyYWlzZWQnIGVsc2UgJ2ZsYXQnXG5cdFx0QF9hY3Rpb24gPSBvcHRpb25zLmFjdGlvbiA/IC0+IG51bGxcblxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdG5hbWU6ICcuJ1xuXHRcdFx0d2lkdGg6IDAsIGhlaWdodDogMzZcblx0XHRcdGJvcmRlclJhZGl1czogMlxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBUaGVtZS5idXR0b25bQF90eXBlXS5iYWNrZ3JvdW5kQ29sb3Jcblx0XHRcdHNoYWRvd1k6IFRoZW1lLmJ1dHRvbltAX3R5cGVdLnNoYWRvd1lcblx0XHRcdHNoYWRvd0JsdXI6IFRoZW1lLmJ1dHRvbltAX3R5cGVdLnNoYWRvd0JsdXJcblx0XHRcdHNoYWRvd0NvbG9yOiBUaGVtZS5idXR0b25bQF90eXBlXS5zaGFkb3dDb2xvclxuXHRcdFx0YW5pbWF0aW9uT3B0aW9uczoge3RpbWU6IC4xNX1cblxuXHRcdEBsYWJlbExheWVyID0gbmV3IFR5cGUuQnV0dG9uXG5cdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQFxuXHRcdFx0Y29sb3I6IFRoZW1lLmJ1dHRvbltAX3R5cGVdLmNvbG9yXG5cdFx0XHR0ZXh0OiBvcHRpb25zLnRleHQgPyAnYnV0dG9uJ1xuXHRcdFx0dGV4dFRyYW5zZm9ybTogJ3VwcGVyY2FzZSdcblx0XHRcdHRleHRBbGlnbjogJ2NlbnRlcidcblx0XHRcdGFuaW1hdGlvbk9wdGlvbnM6IHt0aW1lOiAuMTV9XG5cdFx0XHRwYWRkaW5nOiBcblx0XHRcdFx0bGVmdDogMTYuNSwgcmlnaHQ6IDE2LjVcblx0XHRcdFx0dG9wOiA5LCBib3R0b206IDExXG5cblx0XHRAc2l6ZSA9IEBsYWJlbExheWVyLnNpemVcblx0XHRAeCA9IG9wdGlvbnMueFxuXG5cdFx0QG9uVG91Y2hTdGFydCAoZXZlbnQpIC0+IFxuXHRcdFx0QHNob3dUb3VjaGVkKClcblx0XHRcdFV0aWxzLmRlbGF5IDEsID0+IEByZXNldCgpXG5cdFx0XG5cdFx0QG9uVG91Y2hFbmQgKGV2ZW50KSAtPiBcblx0XHRcdEBfYWN0aW9uKClcblx0XHRcdEByZXNldCgpXG5cblxuXHRzaG93VG91Y2hlZDogLT4gXG5cdFx0QGxhYmVsTGF5ZXIuYW5pbWF0ZSB7YnJpZ2h0bmVzczogMTEwLCBzYXR1cmF0ZTogMTEwfVxuXHRcdFxuXHRcdHN3aXRjaCBAX3R5cGVcblx0XHRcdHdoZW4gJ2ZsYXQnIHRoZW4gQGFuaW1hdGUge2JhY2tncm91bmRDb2xvcjogJ3JnYmEoMCwwLDAsLjA1KSd9XG5cdFx0XHR3aGVuICdyYWlzZWQnXG5cdFx0XHRcdFJpcHBsZShALCBldmVudC5wb2ludCwgQGxhYmVsTGF5ZXIpXG5cdFx0XHRcdEBhbmltYXRlIHtzaGFkb3dZOiAzLCBzaGFkb3dTcHJlYWQ6IDF9XG5cblx0cmVzZXQ6IC0+XG5cdFx0QGxhYmVsTGF5ZXIuYW5pbWF0ZSB7YnJpZ2h0bmVzczogMTAwLCBzYXR1cmF0ZTogMTAwfVxuXHRcdEBiYWNrZ3JvdW5kQ29sb3IgPSBUaGVtZS5idXR0b25bQF90eXBlXS5iYWNrZ3JvdW5kQ29sb3Jcblx0XHRAYW5pbWF0ZSBcblx0XHRcdHNoYWRvd1k6IFRoZW1lLmJ1dHRvbltAX3R5cGVdLnNoYWRvd1lcblx0XHRcdHNoYWRvd1NwcmVhZDogMFxuIiwiIyBcdCA4ODg4ODhiYSAgICAgICAgICAgICBkUCAgICAgZFAgICAgICAgICAgICAgICAgICAgICAgIDg4ODg4OGJhXG4jIFx0IDg4ICAgIGA4YiAgICAgICAgICAgIDg4ICAgICA4OCAgICAgICAgICAgICAgICAgICAgICAgODggICAgYDhiXG4jIFx0YTg4YWFhYThQJyAuZDg4ODhiLiBkODg4OFAgZDg4ODhQIC5kODg4OGIuIDg4ZDhiLmQ4Yi4gODggICAgIDg4IC5kODg4OGIuIGRQICAgLmRQXG4jIFx0IDg4ICAgYDhiLiA4OCcgIGA4OCAgIDg4ICAgICA4OCAgIDg4JyAgYDg4IDg4J2A4OCdgODggODggICAgIDg4IDg4JyAgYDg4IDg4ICAgZDgnXG4jIFx0IDg4ICAgIC44OCA4OC4gIC44OCAgIDg4ICAgICA4OCAgIDg4LiAgLjg4IDg4ICA4OCAgODggODggICAgIDg4IDg4LiAgLjg4IDg4IC44OCdcbiMgXHQgODg4ODg4ODhQIGA4ODg4OFAnICAgZFAgICAgIGRQICAgYDg4ODg4UCcgZFAgIGRQICBkUCBkUCAgICAgZFAgYDg4ODg4UDggODg4OFAnXG5cblR5cGUgPSByZXF1aXJlICdtZC1jb21wb25lbnRzL1R5cGUnXG57IFJpcHBsZSB9ID0gcmVxdWlyZSAnbWQtY29tcG9uZW50cy9SaXBwbGUnXG57IEljb24gfSA9IHJlcXVpcmUgJ21kLWNvbXBvbmVudHMvSWNvbidcbnsgVGhlbWUgfSA9IHJlcXVpcmUgJ21kLWNvbXBvbmVudHMvVGhlbWUnXG5cbmV4cG9ydHMuQm90dG9tTmF2ID0gY2xhc3MgQm90dG9tTmF2IGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cdFx0XG5cdFx0QF9kZXN0aW5hdGlvbnMgPSBvcHRpb25zLmRlc3RpbmF0aW9ucyA/IHRocm93ICdOZWVkcyBhdCBsZWFzdCBvbmUgZGVzdGluYXRpb24uJ1xuXHRcdEBfaXRlbXMgPSBbXVxuXHRcdEBfaW5pdGlhbERlc3RpbmF0aW9uID0gb3B0aW9ucy5pbml0aWFsRGVzdGluYXRpb24gPyB1bmRlZmluZWRcblx0XHQjIGRlc3RpbmF0aW9uIHNob3VsZCBiZTogW3tuYW1lOiBzdHJpbmcsIGljb246IGljb25TdHJpbmcsIGFjdGlvbjogZnVuY3Rpb259XVxuXHRcdEBfYWN0aXZlRGVzdGluYXRpb24gPSBAX2luaXRpYWxEZXN0aW5hdGlvbiA/IEBfaXRlbXNbMF1cblx0XHRAX2FwcCA9IG9wdGlvbnMuYXBwXG5cblx0XHRzdXBlciBfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRuYW1lOiAnQm90dG9tIE5hdidcblx0XHRcdHk6IEFsaWduLmJvdHRvbVxuXHRcdFx0d2lkdGg6IFNjcmVlbi53aWR0aCwgaGVpZ2h0OiA1NlxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBUaGVtZS5ib3R0b21OYXYuYmFja2dyb3VuZENvbG9yXG5cdFx0XHRzaGFkb3dZOiBUaGVtZS5ib3R0b21OYXYuc2hhZG93WVxuXHRcdFx0c2hhZG93Qmx1cjogVGhlbWUuYm90dG9tTmF2LnNoYWRvd0JsdXJcblx0XHRcdHNoYWRvd0NvbG9yOiBUaGVtZS5ib3R0b21OYXYuc2hhZG93Q29sb3Jcblx0XHRcdGNsaXA6IHRydWVcblxuXG5cdFx0Zm9yIGRlc3RpbmF0aW9uLCBpIGluIEBfZGVzdGluYXRpb25zXG5cdFx0XHRpdGVtID0gbmV3IExheWVyXG5cdFx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBAXG5cdFx0XHRcdHg6IEB3aWR0aC9AX2Rlc3RpbmF0aW9ucy5sZW5ndGggKiBpXG5cdFx0XHRcdHdpZHRoOiBAd2lkdGgvQF9kZXN0aW5hdGlvbnMubGVuZ3RoLCBoZWlnaHQ6IEBoZWlnaHRcblx0XHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cblx0XHRcdGl0ZW0uZGlzayA9IG5ldyBMYXllclxuXHRcdFx0XHRuYW1lOiAnLicsIHBhcmVudDogaXRlbVxuXHRcdFx0XHR4OiBBbGlnbi5jZW50ZXIsIHk6IEFsaWduLmNlbnRlclxuXHRcdFx0XHRoZWlnaHQ6IEBoZWlnaHQgKiAxLjUsIHdpZHRoOiBAaGVpZ2h0ICogMS41LCBib3JkZXJSYWRpdXM6IEBoZWlnaHRcblx0XHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cblx0XHRcdGl0ZW0uaWNvbkxheWVyID0gbmV3IEljb25cblx0XHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IGl0ZW0uZGlza1xuXHRcdFx0XHR4OiBBbGlnbi5jZW50ZXIsIHk6IEFsaWduLmNlbnRlcigtOClcblx0XHRcdFx0aWNvbjogZGVzdGluYXRpb24uaWNvblxuXHRcdFx0XHRhbmltYXRpb25PcHRpb25zOiB7dGltZTogLjE1fVxuXG5cdFx0XHRpdGVtLmxhYmVsTGF5ZXIgPSBuZXcgVHlwZS5DYXB0aW9uXG5cdFx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBpdGVtLmRpc2tcblx0XHRcdFx0eDogQWxpZ24uY2VudGVyLCB5OiBBbGlnbi5jZW50ZXIoMTQpXG5cdFx0XHRcdHdpZHRoOiBAd2lkdGgsIHRleHRBbGlnbjogJ2NlbnRlcidcblx0XHRcdFx0dGV4dDogZGVzdGluYXRpb24udGl0bGVcblx0XHRcdFx0YW5pbWF0aW9uT3B0aW9uczoge3RpbWU6IC4xNX1cblxuXHRcdFx0aXRlbS5hY3Rpb24gPSBkZXN0aW5hdGlvbi5hY3Rpb25cblxuXHRcdFx0aXRlbS5kaXNrLm9uVG91Y2hTdGFydCAoZXZlbnQpIC0+IFxuXHRcdFx0XHRSaXBwbGUoQCwgZXZlbnQucG9pbnQsIEBwYXJlbnQuaWNvbkxheWVyLCBuZXcgQ29sb3IoVGhlbWUucHJpbWFyeSkuYWxwaGEoLjMpKVxuXG5cdFx0XHRpdGVtLm9uVGFwIC0+IEBwYXJlbnQuYWN0aXZlRGVzdGluYXRpb24gPSBAXG5cblx0XHRcdEBfaXRlbXMucHVzaChpdGVtKVxuXG5cdFx0XHRAc2hvd0FjdGl2ZShAX2l0ZW1zWzBdKVxuXG5cdEBkZWZpbmUgXCJhY3RpdmVEZXN0aW5hdGlvblwiLFxuXHRcdGdldDogLT4gcmV0dXJuIEBfYWN0aXZlRGVzdGluYXRpb25cblx0XHRzZXQ6IChkZXN0aW5hdGlvbikgLT5cblx0XHRcdHJldHVybiBpZiBkZXN0aW5hdGlvbiBpcyBAX2FjdGl2ZURlc3RpbmF0aW9uXG5cdFx0XHRAX2FjdGl2ZURlc3RpbmF0aW9uID0gZGVzdGluYXRpb25cblxuXHRcdFx0QF9hY3RpdmVEZXN0aW5hdGlvbi5hY3Rpb24oKVxuXHRcdFx0QHNob3dBY3RpdmUoQF9hY3RpdmVEZXN0aW5hdGlvbilcblxuXHRzaG93QWN0aXZlOiAoaXRlbSkgLT5cblx0XHRpdGVtLmxhYmVsTGF5ZXIuYW5pbWF0ZSB7Y29sb3I6IFRoZW1lLnByaW1hcnksIG9wYWNpdHk6IDF9XG5cdFx0aXRlbS5pY29uTGF5ZXIuY29sb3IgPSBUaGVtZS5wcmltYXJ5XG5cdFx0XG5cdFx0Zm9yIHNpYiBpbiBpdGVtLnNpYmxpbmdzXG5cdFx0XHRzaWIubGFiZWxMYXllci5hbmltYXRlIHtjb2xvcjogJyM3NzcnfVxuXHRcdFx0c2liLmljb25MYXllci5jb2xvciA9ICcjNzc3JyIsIiMgXHQgLmQ4ODg4ODhcbiMgXHRkOCcgICAgODhcbiMgXHQ4OGFhYWFhODhhIDg4ZDg4OGIuIDg4ZDg4OGIuXG4jIFx0ODggICAgIDg4ICA4OCcgIGA4OCA4OCcgIGA4OFxuIyBcdDg4ICAgICA4OCAgODguICAuODggODguICAuODhcbiMgXHQ4OCAgICAgODggIDg4WTg4OFAnIDg4WTg4OFAnXG4jIFx0ICAgICAgICAgICA4OCAgICAgICA4OFxuIyBcdCAgICAgICAgICAgZFAgICAgICAgZFBcblxueyBUaGVtZSB9ID0gcmVxdWlyZSAnbWQtY29tcG9uZW50cy9UaGVtZSdcbnsgSGVhZGVyIH0gPSByZXF1aXJlICdtZC1jb21wb25lbnRzL0hlYWRlcidcbnsgQm90dG9tTmF2IH0gPSByZXF1aXJlICdtZC1jb21wb25lbnRzL0JvdHRvbU5hdidcbnsgTWVudU92ZXJsYXkgfSA9IHJlcXVpcmUgJ21kLWNvbXBvbmVudHMvTWVudU92ZXJsYXknXG5cbmV4cG9ydHMuQXBwID0gY2xhc3MgQXBwIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cblx0XHRAX2JvdHRvbU5hdiA9IG9wdGlvbnMuYm90dG9tTmF2ID8gdW5kZWZpbmVkXG5cdFx0QF9tZW51T3ZlcmxheSA9IG9wdGlvbnMubWVudU92ZXJsYXkgPyB1bmRlZmluZWRcblx0XHRcblx0XHRAVGhlbWUgPSBUaGVtZVxuXHRcdEB2aWV3cyA9IG9wdGlvbnMudmlld3MgPyBbXVxuXHRcdEBjdXJyZW50ID0ge2k6IDB9XG5cdFx0QG5vdGlmaWNhdGlvbnMgPSBbXVxuXHRcdEBhY3Rpb25CdXR0b24gPSB1bmRlZmluZWRcblx0XHRAc25hY2tiYXIgPSB1bmRlZmluZWRcblxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdG5hbWU6ICdBcHAnXG5cdFx0XHRzaXplOiBTY3JlZW4uc2l6ZVxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHRpbmRleDogMVxuXG5cdFx0IyBIRUFERVJcblxuXHRcdEBoZWFkZXIgPSBuZXcgSGVhZGVyXG5cdFx0XHRUaGVtZTogVGhlbWVcblx0XHRcdGluZGV4OiA5OTlcblxuXHRcdCMgRk9PVEVSXG5cblx0XHRAZm9vdGVyID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiAnRm9vdGVyJ1xuXHRcdFx0d2lkdGg6IFNjcmVlbi53aWR0aCwgaGVpZ2h0OiA0OFxuXHRcdFx0aW1hZ2U6IFRoZW1lLmZvb3Rlci5pbWFnZVxuXHRcdFx0aW5kZXg6IDk5OVxuXHRcdFx0eTogQWxpZ24uYm90dG9tKClcblxuXHRcdGlmIEBfYm90dG9tTmF2XG5cdFx0XHRAYm90dG9tTmF2ID0gbmV3IEJvdHRvbU5hdlxuXHRcdFx0XHRuYW1lOiAnQm90dG9tIE5hdidcblx0XHRcdFx0ZGVzdGluYXRpb25zOiBAX2JvdHRvbU5hdi5saW5rcyA/IFwiQm90dG9tTmF2IG5lZWRzIGFuIGFycmF5IG9mIGxpbmtzLiBFeGFtcGxlOiBbe3RpdGxlOiAnSG9tZScsIGljb246ICdob21lJywgYWN0aW9uOiAtPiB2aWV3LmxpbmtUbyhob21lKX1dXCJcblx0XHRcdFx0eTogaWYgQGZvb3Rlcj8gdGhlbiBBbGlnbi5ib3R0b20oLUBmb290ZXIuaGVpZ2h0KSBlbHNlIEFsaWduLmJvdHRvbSgpXG5cdFx0XHRcdGluZGV4OiA5OThcblxuXHRcdCMgTUVOVSBPVkVSTEFZXG5cdFx0aWYgQF9tZW51T3ZlcmxheVxuXHRcdFx0QG1lbnVPdmVybGF5ID0gbmV3IE1lbnVPdmVybGF5XG5cdFx0XHRcdG5hbWU6ICdNZW51IE92ZXJsYXknXG5cdFx0XHRcdHRpdGxlOiBAX21lbnVPdmVybGF5LnRpdGxlID8gdGhyb3cgJ01lbnVPdmVybGF5IG5lZWRzIGEgdGl0bGUuJ1xuXHRcdFx0XHRsaW5rczogQF9tZW51T3ZlcmxheS5saW5rcyA/IHRocm93IFwiTWVudU92ZXJsYXkgbmVlZHMgYW4gYXJyYXkgb2YgbGlua3MuIEV4YW1wbGU6IFt7dGl0bGU6ICdIb21lJywgaWNvbjogJ2hvbWUnLCBhY3Rpb246IC0+IHZpZXcubGlua1RvKGhvbWUpfV1cIlxuXG5cblx0XHQjIEtFWUJPQVJEXG5cblx0XHRAa2V5Ym9hcmQgPSBuZXcgTGF5ZXJcblx0XHRcdG5hbWU6ICdLZXlib2FyZCdcblx0XHRcdHk6IEBtYXhZLCBpbWFnZTogVGhlbWUua2V5Ym9hcmQuaW1hZ2Vcblx0XHRcdHdpZHRoOiBAd2lkdGgsIGhlaWdodDogMjIyXG5cdFx0XHRpbmRleDogMTAwMFxuXHRcdFx0YW5pbWF0aW9uT3B0aW9uczpcblx0XHRcdFx0dGltZTogLjI1XG5cblx0XHRAa2V5Ym9hcmQub25UYXAgPT4gQGhpZGVLZXlib2FyZCgpXG5cblx0XHRmb3IgdmlldywgaSBpbiBAdmlld3Ncblx0XHRcdEBhZGRWaWV3KHZpZXcsIGkpXG5cblx0XHRAY2hhbmdlVmlldyhAdmlld3NbMF0pXG5cblx0c2hvd0tleWJvYXJkOiAtPlxuXHRcdEBrZXlib2FyZC5hbmltYXRlXG5cdFx0XHR5OiBBbGlnbi5ib3R0b20oKVxuXHRcdEBrZXlib2FyZC5icmluZ1RvRnJvbnQoKVxuXG5cdGhpZGVLZXlib2FyZDogLT5cblx0XHRAa2V5Ym9hcmQuYW5pbWF0ZVxuXHRcdFx0eTogQG1heFlcblxuXHRhZGRWaWV3OiAodmlldywgaSkgLT5cblx0XHR2aWV3LmkgPSBpXG5cdFx0dmlldy5wYXJlbnQgPSBAXG5cdFx0dmlldy55ID0gQGhlYWRlci5tYXhZXG5cdFx0dmlldy5oZWlnaHQgPSBTY3JlZW4uaGVpZ2h0IC0gQGhlYWRlci5oZWlnaHQgLSBAZm9vdGVyLmhlaWdodFxuXG5cdFx0dmlldy5ob21lID0gdmlldy5uZXdQYWdlXG5cdFx0IFx0bmFtZTogJ2hvbWUnXG5cdFx0IFx0aGVhZGVyOlxuXHRcdFx0IFx0dGl0bGU6IHZpZXcuX3RpdGxlXG5cdFx0XHQgXHRpY29uOiB2aWV3Ll9pY29uXG5cdFx0XHQgXHRpY29uQWN0aW9uOiB2aWV3Ll9pY29uQWN0aW9uXG5cblx0XHR2aWV3LnNob3dOZXh0KHZpZXcuaG9tZSlcblxuXHRjaGFuZ2VWaWV3OiAodmlldykgLT5cblx0XHRyZXR1cm4gaWYgdmlldyBpcyBAY3VycmVudFxuXG5cdFx0QGhlYWRlci50aXRsZSA9IHZpZXcuY3VycmVudC5faGVhZGVyPy50aXRsZSA/ICdEZWZhdWx0J1xuXHRcdEBoZWFkZXIuaWNvbiA9IHZpZXcuY3VycmVudC5faGVhZGVyPy5pY29uID8gJ21lbnUnXG5cdFx0QGhlYWRlci5pY29uQWN0aW9uID0gdmlldy5jdXJyZW50Ll9oZWFkZXI/Lmljb25BY3Rpb24gPyAtPiBhcHAuc2hvd01lbnUoKVxuXHRcdEBoZWFkZXIudmlzaWJsZSA9IHZpZXcuY3VycmVudC5faGVhZGVyPy52aXNpYmxlID8gdHJ1ZVxuXG5cdFx0aWYgdmlldy5pID4gQGN1cnJlbnQuaVxuXHRcdFx0dmlldy54ID0gU2NyZWVuLndpZHRoIFxuXHRcdFx0QGN1cnJlbnQuYW5pbWF0ZSB7eDogLVNjcmVlbi53aWR0aH1cblx0XHRlbHNlIGlmIHZpZXcuaSA8IEBjdXJyZW50Lmlcblx0XHRcdHZpZXcueCA9IC1TY3JlZW4ud2lkdGhcblx0XHRcdEBjdXJyZW50LmFuaW1hdGUge3g6IFNjcmVlbi53aWR0aH1cblxuXHRcdHZpZXcuYW5pbWF0ZSB7eDogMH1cblx0XHR2aWV3LmJyaW5nVG9Gcm9udCgpXG5cdFx0QGN1cnJlbnQgPSB2aWV3XG5cblx0c2hvd01lbnU6IC0+XG5cdFx0QG1lbnVPdmVybGF5LnNob3coKVxuXG5cdGhpZGVNZW51OiAtPlxuXHRcdEBtZW51T3ZlcmxheS5oaWRlKClcblxuXHRjaGFuZ2VQYWdlOiAocGFnZSkgLT5cblx0XHRAaGVhZGVyLnRpdGxlID0gcGFnZS5faGVhZGVyLnRpdGxlXG5cdFx0QGhlYWRlci5pY29uID0gcGFnZS5faGVhZGVyLmljb25cblx0XHRAaGVhZGVyLmljb25BY3Rpb24gPSBwYWdlLl9oZWFkZXIuaWNvbkFjdGlvblxuXHRcdEBoZWFkZXIudmlzaWJsZSA9IHBhZ2UuX2hlYWRlci52aXNpYmxlXG5cdFx0cGFnZS5fb25Mb2FkKClcbiIsIiMgXHQgLmQ4ODg4ODggICAgICAgICAgICAgZFAgICBvbyAgICAgICAgICAgICAgICAgICAgODg4ODg4YmEgICAgICAgICAgICAgZFAgICAgIGRQXG4jIFx0ZDgnICAgIDg4ICAgICAgICAgICAgIDg4ICAgICAgICAgICAgICAgICAgICAgICAgIDg4ICAgIGA4YiAgICAgICAgICAgIDg4ICAgICA4OFxuIyBcdDg4YWFhYWE4OGEgLmQ4ODg4Yi4gZDg4ODhQIGRQIC5kODg4OGIuIDg4ZDg4OGIuIGE4OGFhYWE4UCcgZFAgICAgZFAgZDg4ODhQIGQ4ODg4UCAuZDg4ODhiLiA4OGQ4ODhiLlxuIyBcdDg4ICAgICA4OCAgODgnICBgXCJcIiAgIDg4ICAgODggODgnICBgODggODgnICBgODggIDg4ICAgYDhiLiA4OCAgICA4OCAgIDg4ICAgICA4OCAgIDg4JyAgYDg4IDg4JyAgYDg4XG4jIFx0ODggICAgIDg4ICA4OC4gIC4uLiAgIDg4ICAgODggODguICAuODggODggICAgODggIDg4ICAgIC44OCA4OC4gIC44OCAgIDg4ICAgICA4OCAgIDg4LiAgLjg4IDg4ICAgIDg4XG4jIFx0ODggICAgIDg4ICBgODg4ODhQJyAgIGRQICAgZFAgYDg4ODg4UCcgZFAgICAgZFAgIDg4ODg4ODg4UCBgODg4ODhQJyAgIGRQICAgICBkUCAgIGA4ODg4OFAnIGRQICAgIGRQXG5cblR5cGUgPSByZXF1aXJlICdtZC1jb21wb25lbnRzL1R5cGUnXG57IFJpcHBsZSB9ID0gcmVxdWlyZSAnbWQtY29tcG9uZW50cy9SaXBwbGUnXG57IEljb24gfSA9IHJlcXVpcmUgJ21kLWNvbXBvbmVudHMvSWNvbidcbnsgVGhlbWUgfSA9IHJlcXVpcmUgJ21kLWNvbXBvbmVudHMvVGhlbWUnXG57IE1lbnVCdXR0b24gfSA9IHJlcXVpcmUgJ21kLWNvbXBvbmVudHMvTWVudUJ1dHRvbidcblxuZXhwb3J0cy5BY3Rpb25CdXR0b24gPSBjbGFzcyBBY3Rpb25CdXR0b24gZXh0ZW5kcyBMYXllciBcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cblx0XHRAX3JhaXNlZCA9IG9wdGlvbnMucmFpc2VkID8gZmFsc2Vcblx0XHRAX2FjdGlvbiA9IG9wdGlvbnMuYWN0aW9uID8gLT4gbnVsbFxuXHRcdEBfaWNvbiA9IG9wdGlvbnMuaWNvbiA/ICdwbHVzJ1xuXHRcdEBfYXBwID0gb3B0aW9ucy5hcHBcblxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdG5hbWU6ICcuJ1xuXHRcdFx0eDogQWxpZ24ucmlnaHQoLTE2KSwgeTogQWxpZ24uYm90dG9tKC0xNylcblx0XHRcdHdpZHRoOiA2NCwgaGVpZ2h0OiA2NCwgYm9yZGVyUmFkaXVzOiAzMlxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBUaGVtZS5mYWIuYmFja2dyb3VuZENvbG9yXG5cdFx0XHRzaGFkb3dZOiAyLCBzaGFkb3dCbHVyOiAzXG5cdFx0XHRzaGFkb3dDb2xvcjogJ3JnYmEoMCwwLDAsLjI1KSdcblx0XHRcdGFuaW1hdGlvbk9wdGlvbnM6IHt0aW1lOiAuMTV9XG5cblx0XHRpZiBAX2FwcD9cblx0XHRcdGlmIEBfYXBwLmJvdHRvbU5hdj8gdGhlbiBAeSAtPSBAX2FwcC5ib3R0b21OYXYuaGVpZ2h0XG5cdFx0XHRAX2FwcC5hY3Rpb25CdXR0b24gPSBAXG5cblx0XHRAaWNvbkxheWVyID0gbmV3IEljb25cblx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBAXG5cdFx0XHR4OiBBbGlnbi5jZW50ZXIsIHk6IEFsaWduLmNlbnRlclxuXHRcdFx0aWNvbjogQF9pY29uLCBjb2xvcjogVGhlbWUuZmFiLmNvbG9yXG5cblx0XHRAb25Ub3VjaFN0YXJ0IChldmVudCkgLT4gXG5cdFx0XHRAc2hvd1RvdWNoZWQoKVxuXHRcdFx0VXRpbHMuZGVsYXkgMSwgPT4gQHJlc2V0KClcblx0XHRcblx0XHRAb25Ub3VjaEVuZCAoZXZlbnQpIC0+IFxuXHRcdFx0QF9hY3Rpb24oKVxuXHRcdFx0QHJlc2V0KClcblxuXHRzaG93VG91Y2hlZDogLT4gXG5cdFx0UmlwcGxlKEAsIGV2ZW50LnBvaW50LCBAaWNvbkxheWVyKVxuXHRcdEBhbmltYXRlIHtzaGFkb3dZOiAzLCBzaGFkb3dTcHJlYWQ6IDF9XG5cblx0cmVzZXQ6IC0+XG5cdFx0QGFuaW1hdGUgXG5cdFx0XHRzaGFkb3dZOiAyXG5cdFx0XHRzaGFkb3dTcHJlYWQ6IDBcbiIsIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBMkJBQTtBRE9BLElBQUEsbURBQUE7RUFBQTs7O0FBQUEsSUFBQSxHQUFPLE9BQUEsQ0FBUSxvQkFBUjs7QUFDTCxTQUFXLE9BQUEsQ0FBUSxzQkFBUjs7QUFDWCxPQUFTLE9BQUEsQ0FBUSxvQkFBUjs7QUFDVCxRQUFVLE9BQUEsQ0FBUSxxQkFBUjs7QUFDVixhQUFlLE9BQUEsQ0FBUSwwQkFBUjs7QUFFakIsT0FBTyxDQUFDLFlBQVIsR0FBNkI7OztFQUNmLHNCQUFDLE9BQUQ7QUFFWixRQUFBOztNQUZhLFVBQVU7O0lBRXZCLElBQUMsQ0FBQSxPQUFELDBDQUE0QjtJQUM1QixJQUFD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
