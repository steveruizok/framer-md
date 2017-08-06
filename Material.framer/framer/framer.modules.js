require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"database":[function(require,module,exports){
var Event, Invitation, Location, database;

database = {
  chatBubbles: [],
  choices: {
    language: void 0,
    rule1: void 0,
    rule2: void 0,
    rule3: void 0,
    earlyExit1: void 0,
    earlyExit2: void 0
  },
  removeChatBubble: function(chatBubble) {
    _.pull(this.chatBubbles, chatBubble);
    return chatBubble.destroy();
  },
  user: {
    name: 'Victor Ivanovich',
    age: 42,
    sex: "M",
    image: "images/user.png",
    languages: ["english", "german"],
    history: [],
    note: "When you look at it, it looks like any other piece of land. The sun shines on it like on any other part of the earth. And it's as though nothing had particularly changed in it. Like everything was the way it was thirty years ago. My father, rest his soul, could  look at it and not notice anything out of place at all. Except maybe"
  },
  addHistory: function(item) {
    this.user.history.push(item);
    return item.timeStamp = _.now();
  },
  invitations: [],
  events: [],
  locations: []
};

exports.database = database;

Invitation = (function() {
  function Invitation(options) {
    var ref, ref1;
    this.name = (ref = options.name) != null ? ref : 'New Invitation';
    this.event = (ref1 = options.event) != null ? ref1 : new Event;
    this.location = this.event.location;
    this.startTime = this.event.startTime;
  }

  return Invitation;

})();

Location = (function() {
  function Location(options) {
    var ref;
    this.name = (ref = options.name) != null ? ref : 'Location';
  }

  return Location;

})();

Event = (function() {
  function Event(options) {
    var ref, ref1, ref2;
    this.name = (ref = options.name) != null ? ref : 'New Event';
    this.location = (ref1 = options.location) != null ? ref1 : new Location;
    this.startTime = (ref2 = options.startTime) != null ? ref2 : new Date(_.now() + 360000);
  }

  return Event;

})();


},{}],"flow":[function(require,module,exports){
var Biographies, BiographiesFocus, Book, Dashboard, DashboardButton, Help, History, Invitation, Map, MenuButton, MenuOverlay, Music, Notes, Profile, Radio, dashboard, database, flow, menuOverlay, pages,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

database = require('database').database;

exports.flow = flow = new md.App({
  theme: 'dau',
  footer: false,
  animationOptions: {
    curve: "spring(300, 35, 0)"
  }
});

MenuButton = (function(superClass) {
  extend(MenuButton, superClass);

  function MenuButton(options) {
    var ref, ref1, ref2;
    if (options == null) {
      options = {};
    }
    this._icon = (ref = options.icon) != null ? ref : 'book';
    this._text = (ref1 = options.text) != null ? ref1 : 'Default';
    this._action = (ref2 = options.action) != null ? ref2 : function() {
      return null;
    };
    MenuButton.__super__.constructor.call(this, _.defaults(options, {
      height: 48,
      width: 304,
      backgroundColor: null
    }));
    this.iconLayer = new Layer({
      name: '.',
      parent: this,
      y: Align.center,
      height: 32,
      width: 32,
      invert: 100,
      image: this._icon
    });
    this.labelLayer = new TextLayer({
      name: '.',
      parent: this,
      y: Align.center,
      x: this.iconLayer.maxX + 16,
      width: 100,
      fontFamily: 'Stratos',
      fontSize: 14,
      textAlign: 'left',
      color: '#FFF',
      text: "" + this._text
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

exports.DashboardButton = DashboardButton = (function(superClass) {
  extend(DashboardButton, superClass);

  function DashboardButton(options) {
    var ref, ref1, ref2;
    if (options == null) {
      options = {};
    }
    this._icon = (ref = options.icon) != null ? ref : 'book';
    this._text = (ref1 = options.text) != null ? ref1 : 'Default';
    this._action = (ref2 = options.action) != null ? ref2 : function() {
      return null;
    };
    DashboardButton.__super__.constructor.call(this, _.defaults(options, {
      backgroundColor: null,
      height: 100,
      width: 56
    }));
    this.iconLayer = new Layer({
      name: '.',
      parent: this,
      x: Align.center,
      y: 0,
      height: 72,
      width: 72,
      invert: 100,
      image: "images/icons/" + this._icon + ".png"
    });
    this.textLayer = new TextLayer({
      name: '.',
      parent: this,
      y: this.iconLayer.maxY,
      x: Align.center,
      width: 100,
      fontFamily: 'Stratos',
      fontSize: 13,
      textAlign: 'center',
      color: '#FFF',
      text: "" + this._text
    });
    this.onTap(this._action);
  }

  return DashboardButton;

})(Layer);

Invitation = (function(superClass) {
  extend(Invitation, superClass);

  function Invitation(options) {
    if (options == null) {
      options = {};
    }
    Invitation.__super__.constructor.call(this, _.defaults(options));
  }

  return Invitation;

})(Layer);

pages = [
  {
    title: 'Profile',
    icon: 'account-circle',
    action: function() {
      return flow.showNext(new Profile);
    }
  }, {
    title: 'Biographies',
    icon: 'group',
    action: function() {
      return flow.showNext(new Biographies);
    }
  }, {
    title: 'Notes',
    icon: 'drive-file',
    action: function() {
      return flow.showNext(new Notes);
    }
  }, {
    title: 'Music',
    icon: 'headset',
    action: function() {
      return flow.showNext(new Music);
    }
  }, {
    title: 'Map',
    icon: 'map',
    action: function() {
      return flow.showNext(new Map);
    }
  }, {
    title: 'Radio',
    icon: 'wifi-tethering',
    action: function() {
      return flow.showNext(new Radio);
    }
  }, {
    title: 'Book',
    icon: 'book',
    action: function() {
      return flow.showNext(new Book);
    }
  }, {
    title: 'History',
    icon: 'drive-document',
    action: function() {
      return flow.showNext(new History);
    }
  }, {
    title: 'Help',
    icon: 'warning',
    action: function() {
      return flow.showNext(new Help);
    }
  }
];

Dashboard = (function(superClass) {
  extend(Dashboard, superClass);

  function Dashboard(options) {
    var MARGIN, ROW_HEIGHT;
    if (options == null) {
      options = {};
    }
    Dashboard.__super__.constructor.call(this, _.defaults(options, {
      theme: flow.theme,
      header: {
        title: 'Dashboard',
        visible: true,
        icon: 'menu',
        iconAction: function() {
          return menuOverlay.show();
        }
      }
    }));
    MARGIN = 48;
    ROW_HEIGHT = 104;
    this.profileButton = new DashboardButton({
      name: '.',
      parent: this,
      x: MARGIN,
      y: ROW_HEIGHT,
      icon: 'account-circle',
      text: 'Profile',
      action: function() {
        return flow.showNext(new Profile);
      }
    });
    this.biosButton = new DashboardButton({
      name: '.',
      parent: this,
      x: Align.center,
      y: ROW_HEIGHT,
      icon: 'group',
      text: 'Biographies',
      action: function() {
        return flow.showNext(new Biographies);
      }
    });
    this.notesButton = new DashboardButton({
      name: '.',
      parent: this,
      x: Align.right(-MARGIN),
      y: ROW_HEIGHT,
      icon: 'drive-file',
      text: 'Notes',
      action: function() {
        return flow.showNext(new Notes);
      }
    });
    this.headsetButton = new DashboardButton({
      name: '.',
      parent: this,
      x: MARGIN,
      y: ROW_HEIGHT * 2,
      icon: 'headset',
      text: 'Music',
      action: function() {
        return flow.showNext(new Music);
      }
    });
    this.mapButton = new DashboardButton({
      name: '.',
      parent: this,
      x: Align.center,
      y: ROW_HEIGHT * 2,
      icon: 'map',
      text: 'Map',
      action: function() {
        return flow.showNext(new Map);
      }
    });
    this.radioButton = new DashboardButton({
      name: '.',
      parent: this,
      x: Align.right(-MARGIN),
      y: ROW_HEIGHT * 2,
      icon: 'wifi-tethering',
      text: 'Radio',
      action: function() {
        return flow.showNext(new Radio);
      }
    });
    this.bookButton = new DashboardButton({
      name: '.',
      parent: this,
      x: MARGIN,
      y: ROW_HEIGHT * 3,
      icon: 'book',
      text: 'Book',
      action: function() {
        return flow.showNext(new Book);
      }
    });
    this.historyButton = new DashboardButton({
      name: '.',
      parent: this,
      x: Align.center,
      y: ROW_HEIGHT * 3,
      icon: 'drive-document',
      text: 'History',
      action: function() {
        return flow.showNext(new History);
      }
    });
    this.helpButton = new DashboardButton({
      name: '.',
      parent: this,
      x: Align.right(-MARGIN),
      y: ROW_HEIGHT * 3,
      icon: 'warning',
      text: 'Help',
      action: function() {
        return flow.showNext(new Help);
      }
    });
  }

  return Dashboard;

})(md.Page);

MenuOverlay = (function(superClass) {
  extend(MenuOverlay, superClass);

  function MenuOverlay(options) {
    var i, j, len, links, page;
    if (options == null) {
      options = {};
    }
    MenuOverlay.__super__.constructor.call(this, _.defaults(options, {
      height: Screen.height,
      width: 304,
      height: Screen.height,
      visible: false,
      backgroundColor: '#303030',
      animationOptions: {
        curve: "spring(300, 35, 0)"
      }
    }));
    this.scrim = new Layer({
      name: '.',
      size: Screen.size,
      backgroundColor: 'rgba(0,0,0,.8)',
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
    this.userPhoto = new Layer({
      name: '.',
      parent: this,
      width: this.width,
      height: 173,
      image: database.user.image,
      brightness: 50
    });
    this.userName = new md.Title({
      name: '.',
      parent: this,
      width: this.width,
      fontSize: 28,
      color: '#FFF',
      x: 16,
      y: 32,
      text: database.user.name
    });
    this.userName.maxY = this.userPhoto.maxY - 16;
    links = [];
    for (i = j = 0, len = pages.length; j < len; i = ++j) {
      page = pages[i];
      links[i] = new MenuButton({
        name: '.',
        parent: this,
        x: 16,
        y: 189 + (48 * i),
        text: page.title,
        icon: "images/icons/" + page.icon + ".png",
        action: page.action
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

Profile = (function(superClass) {
  extend(Profile, superClass);

  function Profile(options) {
    Profile.__super__.constructor.call(this, _.defaults(options, {
      theme: flow.theme,
      header: {
        title: 'Profile',
        visible: true,
        icon: 'arrow-back',
        iconAction: function() {
          flow.showPrevious();
          return this.destroy();
        }
      }
    }));
  }

  return Profile;

})(md.Page);

Biographies = (function(superClass) {
  extend(Biographies, superClass);

  function Biographies(options) {
    if (options == null) {
      options = {};
    }
    Biographies.__super__.constructor.call(this, _.defaults(options, {
      theme: flow.theme,
      header: {
        title: 'Biographies',
        visible: true,
        icon: 'arrow-back',
        iconAction: function() {
          flow.showPrevious();
          return this.destroy();
        }
      }
    }));
  }

  return Biographies;

})(md.Page);

BiographiesFocus = (function(superClass) {
  extend(BiographiesFocus, superClass);

  function BiographiesFocus(options) {
    var ref;
    if (options == null) {
      options = {};
    }
    this._source = (ref = options.source) != null ? ref : {
      title: 'Default'
    };
    BiographiesFocus.__super__.constructor.call(this, _.defaults(options, {
      theme: flow.theme,
      header: {
        title: "" + this._source.title,
        visible: true,
        icon: 'arrow-back',
        iconAction: function() {
          flow.showPrevious();
          return this.destroy();
        }
      }
    }));
  }

  return BiographiesFocus;

})(md.Page);

Notes = (function(superClass) {
  extend(Notes, superClass);

  function Notes(options) {
    if (options == null) {
      options = {};
    }
    this._text = database.user.note;
    Notes.__super__.constructor.call(this, _.defaults(options, {
      theme: flow.theme,
      header: {
        title: 'Notes',
        visible: true,
        icon: 'arrow-back',
        iconAction: function() {
          flow.showPrevious();
          return this.destroy();
        }
      }
    }));
    this.textField = new Layer({
      parent: this,
      x: 16,
      y: 100,
      backgroundColor: null,
      html: "<textarea name=\"textarea\" class=\"textarea\" style=\"\n	background-color: #000000;\n	width: 320px;\n	height: 500px;\n	font-family: Stratos;\n	font-size: 16px;\n	font-weight: 400;\n	color: #FFFFFF;\n	line-height: 20px;\n	border: none;\n	outline: none; \n	\">\n	" + this._text + "\n</textarea>"
    });
    this.textArea = document.querySelectorAll(".textarea")[0];
    this.on("keyup", (function(_this) {
      return function() {
        return database.user.note = _this.textArea.value;
      };
    })(this));
  }

  return Notes;

})(md.Page);

Music = (function(superClass) {
  extend(Music, superClass);

  function Music(options) {
    if (options == null) {
      options = {};
    }
    Music.__super__.constructor.call(this, _.defaults(options, {
      theme: flow.theme,
      header: {
        title: 'Music',
        visible: true,
        icon: 'arrow-back',
        iconAction: function() {
          flow.showPrevious();
          return this.destroy();
        }
      }
    }));
    this.musicIcon = new Layer({
      name: '.',
      parent: this,
      height: 152,
      width: 152,
      x: Align.center,
      y: Align.center(-64),
      image: 'images/icons/headset.png',
      invert: 100
    });
    this.musicDescription1 = new md.Regular({
      name: '.',
      parent: this,
      x: Align.center,
      y: this.musicIcon.maxY,
      color: "#FFF",
      textAlign: "center",
      width: 280,
      text: 'Your music is composed based \u2028on what we know about you.'
    });
    this.musicDescription2 = new md.Regular({
      name: '.',
      parent: this,
      x: Align.center,
      y: this.musicDescription1.maxY + 16,
      color: "#FFF",
      textAlign: "center",
      width: 280,
      text: ' It is unique to you.'
    });
    this.musicDescription3 = new md.Regular({
      name: '.',
      parent: this,
      x: Align.center,
      y: this.musicDescription2.maxY + 16,
      color: "#FFF",
      textAlign: "center",
      width: 240,
      text: ' If you do not enjoy what \u2028you hear, please change.'
    });
  }

  return Music;

})(md.Page);

Map = (function(superClass) {
  extend(Map, superClass);

  function Map(options) {
    Map.__super__.constructor.call(this, _.defaults(options, {
      theme: flow.theme,
      header: {
        title: 'Map',
        visible: true,
        icon: 'arrow-back',
        iconAction: function() {
          flow.showPrevious();
          return this.destroy();
        }
      }
    }));
    this.map = new Layer({
      name: '.',
      parent: this,
      size: this.size,
      scale: 1.5,
      brightness: 80,
      image: 'images/map.png'
    });
    this.map.draggable = true;
    this.findMeBox = new Layer({
      name: '.',
      parent: this,
      x: Align.right(-8),
      y: Align.bottom(-176),
      width: 48,
      height: 48,
      backgroundColor: '#efefef',
      borderRadius: 24
    });
    this.findMe = new Layer({
      name: '.',
      parent: this.findMeBox,
      x: Align.center,
      y: Align.center,
      width: 40,
      height: 40,
      image: 'images/icons/radio-button-on.png'
    });
    this.zoomBox = new Layer({
      name: '.',
      parent: this,
      x: Align.right(-8),
      y: Align.bottom(-64),
      width: 48,
      height: 96,
      backgroundColor: '#efefef',
      borderRadius: 24
    });
    this.zoomIn = new Layer({
      name: '.',
      parent: this.zoomBox,
      x: Align.center,
      y: 8,
      width: 40,
      height: 40,
      image: 'images/icons/add.png'
    });
    this.zoomOut = new Layer({
      name: '.',
      parent: this.zoomBox,
      x: Align.center,
      y: Align.bottom(-8),
      width: 40,
      height: 40,
      image: 'images/icons/remove.png'
    });
  }

  return Map;

})(md.Page);

Radio = (function(superClass) {
  extend(Radio, superClass);

  function Radio(options) {
    if (options == null) {
      options = {};
    }
    Radio.__super__.constructor.call(this, _.defaults(options, {
      theme: flow.theme,
      header: {
        title: 'Radio',
        visible: true,
        icon: 'arrow-back',
        iconAction: function() {
          flow.showPrevious();
          return this.destroy();
        }
      }
    }));
    this.radioIcon = new Layer({
      name: '.',
      parent: this,
      height: 152,
      width: 152,
      x: Align.center,
      y: Align.center(-64),
      image: 'images/icons/wifi-tethering.png',
      invert: 100
    });
    this.radioLabel = new md.Regular({
      name: '.',
      parent: this,
      x: Align.center,
      y: this.radioIcon.maxY,
      color: "#FFF",
      textAlign: "center",
      text: 'Searching for signal...'
    });
    this.radioDescription = new md.Regular({
      name: '.',
      parent: this,
      x: Align.center,
      y: this.radioLabel.maxY + 32,
      color: "#FFF",
      textAlign: "center",
      width: 200,
      text: 'Radio is only available in \u2028certain areas of the Space.'
    });
  }

  return Radio;

})(md.Page);

Book = (function(superClass) {
  extend(Book, superClass);

  function Book(options) {
    if (options == null) {
      options = {};
    }
    Book.__super__.constructor.call(this, _.defaults(options, {
      theme: flow.theme,
      header: {
        title: 'Book',
        visible: true,
        icon: 'arrow-back',
        iconAction: function() {
          flow.showPrevious();
          return this.destroy();
        }
      }
    }));
    this.bookFlow = new Layer({
      name: '.',
      parent: this.content,
      x: 16,
      y: 96,
      backgroundColor: null,
      width: this.width - 32,
      height: this.height * 2
    });
    this.bookFlow.style = {
      fontFamily: 'Stratos',
      fontSize: '16px',
      lineHeight: '1.4',
      color: '#FFF'
    };
    this.bookFlow.html = "FADE IN:<br><br>\n1 INT. WASHINGTON MUSEUM - DAY 1<br><br>\nThe saddest eyes you ever saw.\nWe are looking at an El Greco drawing. It is a study for\none of his paintings.<br><br>\nPULL BACK TO REVEAL --<br><br>\nA bunch of art students are doing sketches of the eyes,\nthe elongated fingers, the slender hands El Greco drew so\nbrilliantly.<br><br>\nMost of the students are around 20. A couple of suburban\nhousewives are there too.\nAnd one older man.<br><br>\nThis is LUTHER WHITNEY. Mid 60s, very fit, neatly\ndressed. At quick glance, he seems as if he might be a\nsuccessful company executive.<br><br>\nAs we watch him draw we can tell he is capable of great\nconcentration. And patient. With eyes that miss\nnothing: He has pilot’s eyes.<br><br>\nWe’ll find out more about him as time goes on, but this\nis all you really have to know: Luther Whitney is the\nhero of this piece. As we watch him draw --\nLuther’s sketchbook. He is finishing his work on the\neyes, and he’s caught the sadness: It’s good stuff.\nLuther. It’s not good enough for him. He looks at his\nwork a moment, shakes his head.<br><br>\nGIRL STUDENT<br><br>\nDon’t give up.<br><br>\nLUTHER<br><br>\nI never do.<br><br>\nGIRL STUDENT<br><br>\nMay I?<br><br>\nShe’s indicated his sketchbook. He nods. She starts\nthumbing through.<br><br>\nThe sketchbook as the pages turn.<br><br>\nDetail work. Eyes and hands. The eyes are good. The\nhands are better. Very skillful.<br><br>\n(CONTINUED)<br><br>";
  }

  return Book;

})(md.Page);

History = (function(superClass) {
  extend(History, superClass);

  function History(options) {
    History.__super__.constructor.call(this, _.defaults(options, {
      theme: flow.theme,
      header: {
        title: 'History',
        visible: true,
        icon: 'arrow-back',
        iconAction: function() {
          flow.showPrevious();
          return this.destroy();
        }
      }
    }));
  }

  return History;

})(md.Page);

Help = (function(superClass) {
  extend(Help, superClass);

  function Help(options) {
    Help.__super__.constructor.call(this, _.defaults(options, {
      theme: flow.theme,
      header: {
        title: 'Help',
        visible: true,
        icon: 'arrow-back',
        iconAction: function() {
          flow.showPrevious();
          return this.destroy();
        }
      }
    }));
    this.helpIcon = new Layer({
      name: '.',
      parent: this,
      height: 152,
      width: 152,
      x: Align.center,
      y: Align.center(-128),
      image: 'images/icons/warning.png',
      invert: 100
    });
    this.helpLabel = new md.Regular({
      name: '.',
      parent: this,
      x: Align.center,
      y: this.helpIcon.maxY,
      color: "#FFF",
      textAlign: "center",
      text: 'Do you need help?'
    });
    this.helpDescription = new md.Regular({
      name: '.',
      parent: this,
      x: Align.center,
      y: this.helpLabel.maxY + 16,
      color: "#FFF",
      textAlign: "center",
      width: 280,
      text: 'Chat now with one of our operators.'
    });
    this.needHelp = new md.Title({
      name: '.',
      parent: this,
      text: 'I NEED HELP',
      textAlign: 'center',
      x: Align.center,
      y: this.helpDescription.maxY + 64,
      color: 'rgba(255, 0, 0, 1)'
    });
    this.needHelp.onTap(function() {
      return null;
    });
    this.cancel = new md.Title({
      name: '.',
      parent: this,
      text: 'CANCEL',
      textAlign: 'center',
      x: Align.center,
      y: this.needHelp.maxY + 48,
      color: '#CCC'
    });
    this.cancel.onTap(function() {
      return flow.showPrevious();
    });
  }

  return Help;

})(md.Page);

menuOverlay = new MenuOverlay;

dashboard = new Dashboard;

flow.showNext(dashboard);


},{"database":"database"}],"md":[function(require,module,exports){
var App, Body1, Body2, Button, Caption, Dialog, DialogAction, Fab, Header, Headline, MenuButton, MenuOverlay, Page, Regular, RowItem, StatusBar, SubheadSecondary, Title, View, app, database, ripple, theme, type,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

database = require('database').database;

ripple = require('ripple').ripple;

theme = require('theme').theme;

type = require('type');

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
    this._views = (ref1 = options.views) != null ? ref1 : [];
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
        image: 'images/nav_bar.png'
      });
    }
    this.header = new Header({
      theme: theme
    });
    this.keyboard = new Layer({
      name: 'Keyboard',
      y: this.maxY,
      image: theme.keyboard.image,
      width: 360,
      height: 269,
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
    this.iconLayer = new Layer({
      name: '.',
      parent: this,
      x: 12,
      y: Align.center(12),
      width: 32,
      height: 32,
      image: '',
      backgroundColor: null,
      invert: theme.header.invert
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
      return this.iconLayer.image = "images/icons/" + this._icon + ".png";
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
    this.iconLayer = new Layer({
      name: '.',
      parent: this,
      y: Align.center,
      height: 32,
      width: 32,
      invert: theme.menu.invert,
      image: this._icon
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
      image: database.user.image,
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
    this.titleExpand = new Layer({
      name: '.',
      parent: this.header,
      x: Align.right(-16),
      y: Align.bottom(-13),
      height: 32,
      width: 32,
      invert: theme.secondary.invert,
      image: "images/icons/expand-more.png"
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
        icon: "images/icons/" + link.icon + ".png",
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
    this._icon = (ref2 = options.icon) != null ? ref2 : 'add';
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
    this.iconLayer = new Layer({
      name: '.',
      parent: this,
      x: Align.center,
      y: Align.center,
      width: 32,
      height: 32,
      image: "images/icons/" + this._icon + ".png",
      invert: theme.fab.invert
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


},{"database":"database","ripple":"ripple","theme":"theme","type":"type"}],"myModule":[function(require,module,exports){
exports.myVar = "myVariable";

exports.myFunction = function() {
  return print("myFunction is running");
};

exports.myArray = [1, 2, 3];


},{}],"ripple":[function(require,module,exports){
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
  header: {
    backgroundColor: source.colors.primary.main,
    title: source.colors.primary.text,
    invert: primaryInvert,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3N0ZXZlcnVpei9MaWJyYXJ5L01vYmlsZSBEb2N1bWVudHMvY29tfmFwcGxlfkNsb3VkRG9jcy9HaXRIdWIvZnJhbWVyLW1kL01hdGVyaWFsLmZyYW1lci9tb2R1bGVzL3R5cGUuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvc3RldmVydWl6L0xpYnJhcnkvTW9iaWxlIERvY3VtZW50cy9jb21+YXBwbGV+Q2xvdWREb2NzL0dpdEh1Yi9mcmFtZXItbWQvTWF0ZXJpYWwuZnJhbWVyL21vZHVsZXMvdGhlbWUuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvc3RldmVydWl6L0xpYnJhcnkvTW9iaWxlIERvY3VtZW50cy9jb21+YXBwbGV+Q2xvdWREb2NzL0dpdEh1Yi9mcmFtZXItbWQvTWF0ZXJpYWwuZnJhbWVyL21vZHVsZXMvcmlwcGxlLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3N0ZXZlcnVpei9MaWJyYXJ5L01vYmlsZSBEb2N1bWVudHMvY29tfmFwcGxlfkNsb3VkRG9jcy9HaXRIdWIvZnJhbWVyLW1kL01hdGVyaWFsLmZyYW1lci9tb2R1bGVzL215TW9kdWxlLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3N0ZXZlcnVpei9MaWJyYXJ5L01vYmlsZSBEb2N1bWVudHMvY29tfmFwcGxlfkNsb3VkRG9jcy9HaXRIdWIvZnJhbWVyLW1kL01hdGVyaWFsLmZyYW1lci9tb2R1bGVzL21kLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3N0ZXZlcnVpei9MaWJyYXJ5L01vYmlsZSBEb2N1bWVudHMvY29tfmFwcGxlfkNsb3VkRG9jcy9HaXRIdWIvZnJhbWVyLW1kL01hdGVyaWFsLmZyYW1lci9tb2R1bGVzL2Zsb3cuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvc3RldmVydWl6L0xpYnJhcnkvTW9iaWxlIERvY3VtZW50cy9jb21+YXBwbGV+Q2xvdWREb2NzL0dpdEh1Yi9mcmFtZXItbWQvTWF0ZXJpYWwuZnJhbWVyL21vZHVsZXMvZGF0YWJhc2UuY29mZmVlIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIjIFx0ZDg4ODg4OFAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZFBcbiMgXHQgICA4OCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA4OFxuIyBcdCAgIDg4ICAgIGRQICAgIGRQIDg4ZDg4OGIuIC5kODg4OGIuIC5kODg4OGIuIDg4ZDg4OGIuIC5kODg4OGIuIDg4ZDg4OGIuIDg4ZDg4OGIuIGRQICAgIGRQXG4jIFx0ICAgODggICAgODggICAgODggODgnICBgODggODgnICBgODggODgnICBgODggODgnICBgODggODgnICBgODggODgnICBgODggODgnICBgODggODggICAgODhcbiMgXHQgICA4OCAgICA4OC4gIC44OCA4OC4gIC44OCA4OC4gIC44OCA4OC4gIC44OCA4OCAgICAgICA4OC4gIC44OCA4OC4gIC44OCA4OCAgICA4OCA4OC4gIC44OFxuIyBcdCAgIGRQICAgIGA4ODg4UDg4IDg4WTg4OFAnIGA4ODg4OFAnIGA4ODg4UDg4IGRQICAgICAgIGA4ODg4OFA4IDg4WTg4OFAnIGRQICAgIGRQIGA4ODg4UDg4XG4jIFx0ICAgICAgICAgICAgICAuODggODggICAgICAgICAgICAgICAgICAgICAuODggICAgICAgICAgICAgICAgICAgODggICAgICAgICAgICAgICAgICAgICAuODhcbiMgXHQgICAgICAgICAgZDg4ODhQICBkUCAgICAgICAgICAgICAgICAgZDg4ODhQICAgICAgICAgICAgICAgICAgICBkUCAgICAgICAgICAgICAgICAgZDg4ODhQXG5cblV0aWxzLmluc2VydENTUyhcblx0XCJcIlwiXG4gICAgQGZvbnQtZmFjZSB7XG4gICAgICBmb250LWZhbWlseTogXCJSb2JvdG9cIjtcbiAgICAgIHNyYzogdXJsKFwiZm9udHMvUm9ib3RvLVJlZ3VsYXIudHRmXCIpO1xuICAgIFwiXCJcIilcblxuY2xhc3MgZXhwb3J0cy5IZWFkbGluZSBleHRlbmRzIFRleHRMYXllclxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMpIC0+XG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0Zm9udEZhbWlseTogJ1JvYm90bydcblx0XHRcdGZvbnRTaXplOiAyNFxuXHRcdFx0Zm9udFdlaWdodDogNDAwXG5cdFx0XHRsaW5lSGVpZ2h0OiAxLjNcblx0XHRcdGNvbG9yOiAncmdiYSgwLDAsMCwuODcpJ1xuXG5jbGFzcyBleHBvcnRzLlN1YmhlYWRTZWNvbmRhcnkgZXh0ZW5kcyBUZXh0TGF5ZXJcblx0Y29uc3RydWN0b3I6IChvcHRpb25zKSAtPlxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdGZvbnRGYW1pbHk6ICdSb2JvdG8nXG5cdFx0XHRmb250U2l6ZTogMTZcblx0XHRcdGZvbnRXZWlnaHQ6IDQwMCwgXG5cdFx0XHRsaW5lSGVpZ2h0OiAxLjUsXG5cdFx0XHRjb2xvcjogJ3JnYmEoMCwwLDAsLjU0KSdcblxuY2xhc3MgZXhwb3J0cy5UaXRsZSBleHRlbmRzIFRleHRMYXllclxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMpIC0+XG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0Zm9udEZhbWlseTogJ1JvYm90bydcblx0XHRcdGZvbnRTaXplOiAyMFxuXHRcdFx0Zm9udFdlaWdodDogNTAwXG5cdFx0XHRsaW5lSGVpZ2h0OiAxLjNcblx0XHRcdGNvbG9yOiAncmdiYSgwLDAsMCwuODcpJ1xuY2xhc3MgZXhwb3J0cy5SZWd1bGFyIGV4dGVuZHMgVGV4dExheWVyXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucykgLT5cblx0XHRzdXBlciBfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRmb250RmFtaWx5OiAnUm9ib3RvJ1xuXHRcdFx0Zm9udFNpemU6IDE2XG5cdFx0XHRmb250V2VpZ2h0OiA0MDBcblx0XHRcdGxpbmVIZWlnaHQ6IDEuM1xuXHRcdFx0Y29sb3I6ICdyZ2JhKDAsMCwwLC44NyknXG5jbGFzcyBleHBvcnRzLkJvZHkyIGV4dGVuZHMgVGV4dExheWVyXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucykgLT5cblx0XHRzdXBlciBfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRmb250RmFtaWx5OiAnUm9ib3RvJ1xuXHRcdFx0Zm9udFNpemU6IDE0XG5cdFx0XHRmb250V2VpZ2h0OiA1MDBcblx0XHRcdGxpbmVIZWlnaHQ6IDEuM1xuXHRcdFx0Y29sb3I6ICdyZ2JhKDAsMCwwLC44NyknXG5jbGFzcyBleHBvcnRzLk1lbnUgZXh0ZW5kcyBUZXh0TGF5ZXJcblx0Y29uc3RydWN0b3I6IChvcHRpb25zKSAtPlxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdGZvbnRGYW1pbHk6ICdSb2JvdG8nXG5cdFx0XHRmb250U2l6ZTogMTRcblx0XHRcdGZvbnRXZWlnaHQ6IDUwMFxuXHRcdFx0bGluZUhlaWdodDogMS43XG5cdFx0XHRjb2xvcjogJ3JnYmEoMCwwLDAsLjg3KSdcbmNsYXNzIGV4cG9ydHMuQm9keTEgZXh0ZW5kcyBUZXh0TGF5ZXJcblx0Y29uc3RydWN0b3I6IChvcHRpb25zKSAtPlxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdGZvbnRGYW1pbHk6ICdSb2JvdG8nXG5cdFx0XHRmb250U2l6ZTogMTRcblx0XHRcdGZvbnRXZWlnaHQ6IDQwMFxuXHRcdFx0bGluZUhlaWdodDogMS40XG5cdFx0XHRjb2xvcjogJ3JnYmEoMCwwLDAsLjg3KSdcbmNsYXNzIGV4cG9ydHMuQ2FwdGlvbiBleHRlbmRzIFRleHRMYXllclxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMpIC0+XG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0Zm9udEZhbWlseTogJ1JvYm90bydcblx0XHRcdGZvbnRTaXplOiAxMlxuXHRcdFx0Zm9udFdlaWdodDogNDAwXG5cdFx0XHRsaW5lSGVpZ2h0OiAxLjNcblx0XHRcdGNvbG9yOiAncmdiYSgwLDAsMCwuNTQpJ1xuY2xhc3MgZXhwb3J0cy5CdXR0b24gZXh0ZW5kcyBUZXh0TGF5ZXJcblx0Y29uc3RydWN0b3I6IChvcHRpb25zKSAtPlxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdGZvbnRGYW1pbHk6ICdSb2JvdG8nXG5cdFx0XHRmb250U2l6ZTogMTRcblx0XHRcdGZvbnRXZWlnaHQ6IDUwMFxuXHRcdFx0bGluZUhlaWdodDogMS4zXG5cdFx0XHRjb2xvcjogJyMwMDk2ODgnXG5cdFx0XHRsZXR0ZXJTcGFjaW5nOiAwLjVcblx0XHRcdHBhZGRpbmc6IHtsZWZ0OiA0LCByaWdodDogNCwgdG9wOiA4LCBib3R0b206IDB9LCIsIlxuIyAgIGRQICAgZFAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuIyAgIDg4ICAgODggICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuIyBkODg4OFAgODhkODg4Yi4gLmQ4ODg4Yi4gODhkOGIuZDhiLiAuZDg4ODhiLiAuZDg4ODhiLlxuIyAgIDg4ICAgODgnICBgODggODhvb29vZDggODgnYDg4J2A4OCA4OG9vb29kOCBZOG9vb29vLlxuIyAgIDg4ICAgODggICAgODggODguICAuLi4gODggIDg4ICA4OCA4OC4gIC4uLiAgICAgICA4OFxuIyAgIGRQICAgZFAgICAgZFAgYDg4ODg4UCcgZFAgIGRQICBkUCBgODg4ODhQJyBgODg4ODhQJ1xuXG4jIFdoZW4gbG9hZGVkLCB0aGlzIG1vZHVsZSB3aWxsIGF0dGVtcHQgdG8gY3JlYXRlIGEgbmV3IHRoZW1lIGJhc2VkIG9uIFxuIyB0aGUgRGVzaWduIE1vZGUgdGVtcGxhdGUuIEl0cyBkZWZhdWx0IHZhbHVlcyB3aWxsIGJlIGZvciBhIFwiTGlnaHRcIiB0aGVtZS5cblxubW9kaWZ5Q29sb3IgPSAoY29sb3IsIGgsIHMsIGwpIC0+XG5cdGNsaXAgPSBfLnJlcGxhY2UoXy5yZXBsYWNlKGNvbG9yLnRvSHNsU3RyaW5nKCkuc2xpY2UoNCwgLTEpLCAnJScsICcnKSwgJyUnLCAnJykgLnNwbGl0KCcsICcpXG5cblx0bmV3Q29sb3IgPSBuZXcgQ29sb3IoXG5cdFx0aDogXy5wYXJzZUludChjbGlwWzBdKSArIGgsIFxuXHRcdHM6IChfLnBhcnNlSW50KGNsaXBbMV0pICsgcykvMTAwLCBcblx0XHRsOiAoXy5wYXJzZUludChjbGlwWzJdKSArIGwpLzEwMCwgXG5cdFx0YTogMSlcblx0XG5cdHJldHVybiBuZXdDb2xvclxuXG5wcmltYXJ5Q29sb3IgPSBwcmltYXJ5X2NvbG9yLmJhY2tncm91bmRDb2xvclxucHJpbWFyeUludmVydCA9IDEwMCAtIChwcmltYXJ5X2ludmVydC5vcGFjaXR5ICogMTAwKVxuc2Vjb25kYXJ5Q29sb3IgPSBzZWNvbmRhcnlfY29sb3IuYmFja2dyb3VuZENvbG9yXG5tZW51Q29sb3IgPSBtZW51X2NvbG9yLmJhY2tncm91bmRDb2xvclxubWVudVRleHRDb2xvciA9IG1lbnVfdGV4dF9jb2xvci5jb2xvclxubWVudUludmVydCA9IDEwMCAtIChtZW51X2ludmVydC5vcGFjaXR5ICogMTAwKVxuXG5cbnNvdXJjZSA9XG5cdGNvbG9yczpcblx0XHRwcmltYXJ5OlxuXHRcdFx0bWFpbjogcHJpbWFyeUNvbG9yXG5cdFx0XHRsaWdodDogbW9kaWZ5Q29sb3IocHJpbWFyeUNvbG9yLCAxMywgLTUsIDE1KVxuXHRcdFx0ZGFyazogbW9kaWZ5Q29sb3IocHJpbWFyeUNvbG9yLCAtMSwgLTcsIC0xMilcblx0XHRcdHRleHQ6IHByaW1hcnlfdGV4dF9jb2xvci5jb2xvclxuXHRcdFx0aW52ZXJ0OiBwcmltYXJ5SW52ZXJ0XG5cdFx0c2Vjb25kYXJ5OlxuXHRcdFx0bWFpbjogc2Vjb25kYXJ5Q29sb3Jcblx0XHRcdGxpZ2h0OiBtb2RpZnlDb2xvcihzZWNvbmRhcnlDb2xvciwgMTMsIC01LCAxNSlcblx0XHRcdGRhcms6IG1vZGlmeUNvbG9yKHNlY29uZGFyeUNvbG9yLCAtMSwgLTcsIC0xMilcblx0XHRcdHRleHQ6IHNlY29uZGFyeV90ZXh0X2NvbG9yLmNvbG9yXG5cdFx0bWVudTpcblx0XHRcdGxpZ2h0OiBtZW51Q29sb3Jcblx0XHRcdHRleHQ6IG1lbnVUZXh0Q29sb3Jcblx0XHRcdGludmVydDogbWVudUludmVydFxuXG50aGVtZSA9IFxuXHR0aW50OiBzb3VyY2UuY29sb3JzLnNlY29uZGFyeS5tYWluXG5cdHByaW1hcnk6IHNvdXJjZS5jb2xvcnMucHJpbWFyeS5tYWluXG5cdHByaW1hcnlJbnZlcnQ6IHByaW1hcnlJbnZlcnRcblx0c2Vjb25kYXJ5OiBzb3VyY2UuY29sb3JzLnNlY29uZGFyeS5tYWluXG5cdG1lbnU6IHNvdXJjZS5jb2xvcnMubWVudS5saWdodFxuXHRtZW51SW52ZXJ0OiBzb3VyY2UuY29sb3JzLm1lbnUuaW52ZXJ0XG5cblx0aGVhZGVyOiBcblx0XHRiYWNrZ3JvdW5kQ29sb3I6IHNvdXJjZS5jb2xvcnMucHJpbWFyeS5tYWluXG5cdFx0dGl0bGU6IHNvdXJjZS5jb2xvcnMucHJpbWFyeS50ZXh0XG5cdFx0aW52ZXJ0OiBwcmltYXJ5SW52ZXJ0XG5cdFx0dGFiczpcblx0XHRcdGJhY2tncm91bmRDb2xvcjogc291cmNlLmNvbG9ycy5wcmltYXJ5LmxpZ2h0XG5cdFx0XHRjb2xvcjogc291cmNlLmNvbG9ycy5wcmltYXJ5LnRleHRcblx0XHRcdHNlbGVjdG9yOiBzb3VyY2UuY29sb3JzLnNlY29uZGFyeS5tYWluXG5cdFxuXHRzdGF0dXNCYXI6IFxuXHRcdGltYWdlOiAnaW1hZ2VzL3N0YXR1c19iYXJfY2xlYXIucG5nJ1xuXHRcdGJhY2tncm91bmRDb2xvcjogc291cmNlLmNvbG9ycy5wcmltYXJ5LmRhcmtcblx0XHRpbnZlcnQ6IHByaW1hcnlJbnZlcnRcblx0XG5cdHBhZ2U6XG5cdFx0cHJpbWFyeTpcblx0XHRcdGJhY2tncm91bmRDb2xvcjogJyNFMUUyRTEnXG5cdFx0c2Vjb25kYXJ5OlxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiAnI0Y1RjVGNidcblxuXHRtZW51T3ZlcmxheTpcblx0XHRoZWFkZXI6XG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IHNvdXJjZS5jb2xvcnMuc2Vjb25kYXJ5Lm1haW5cblx0XHRcdGljb246IHNvdXJjZS5jb2xvcnMuc2Vjb25kYXJ5LmxpZ2h0XG5cdFx0YmFja2dyb3VuZENvbG9yOiBzb3VyY2UuY29sb3JzLm1lbnUubGlnaHRcblx0XHR0ZXh0OiBzb3VyY2UuY29sb3JzLm1lbnUudGV4dFxuXHRcdHNsaWRlcjogXG5cdFx0XHRrbm9iOiBzb3VyY2UuY29sb3JzLnNlY29uZGFyeS5saWdodFxuXHRcdFx0ZmlsbDogc291cmNlLmNvbG9ycy5zZWNvbmRhcnkuZGFya1xuXHRcdGludmVydDogc291cmNlLmNvbG9ycy5tZW51LmludmVydFxuXG5cdGJ1dHRvbjpcblx0XHRmbGF0OlxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHRjb2xvcjogc291cmNlLmNvbG9ycy5zZWNvbmRhcnkubWFpblxuXHRcdFx0c2hhZG93WTogMFxuXHRcdFx0c2hhZG93Q29sb3I6ICdyZ2JhKDAsMCwwLC4xOCknXG5cdFx0XHRzaGFkb3dCbHVyOiAwXG5cblx0XHRyYWlzZWQ6XG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IHNvdXJjZS5jb2xvcnMuc2Vjb25kYXJ5Lm1haW5cblx0XHRcdGNvbG9yOiBzb3VyY2UuY29sb3JzLnNlY29uZGFyeS50ZXh0XG5cdFx0XHRzaGFkb3dZOiAyXG5cdFx0XHRzaGFkb3dDb2xvcjogJ3JnYmEoMCwwLDAsLjE4KSdcblx0XHRcdHNoYWRvd0JsdXI6IDZcblxuXHRmYWI6XG5cdFx0YmFja2dyb3VuZENvbG9yOiBzb3VyY2UuY29sb3JzLnNlY29uZGFyeS5tYWluXG5cdFx0aW52ZXJ0OiBwcmltYXJ5SW52ZXJ0XG5cblx0ZGlhbG9nOiBcblx0XHRiYWNrZ3JvdW5kQ29sb3I6JyNGQUZBRkEnXG5cdFxuXHR0ZXh0OiBcblx0XHRwcmltYXJ5OiBzb3VyY2UuY29sb3JzLnByaW1hcnkudGV4dFxuXHRcdHNlY29uZGFyeTogc291cmNlLmNvbG9ycy5zZWNvbmRhcnkudGV4dFxuXHRcblx0dGFibGU6XG5cdFx0YmFja2dyb3VuZENvbG9yOiAnI0ZGRkZGRidcblx0XHR0ZXh0OiBzb3VyY2UuY29sb3JzLnByaW1hcnkudGV4dFxuXHRcdGNoZWNrQm94OlxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHRib3JkZXJDb2xvcjogJyNEM0QzRDMnXG5cdFx0c2VsZWN0ZWQ6XG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IHNvdXJjZS5jb2xvcnMuc2Vjb25kYXJ5Lm1haW5cblx0XHRcdHRleHQ6IHNvdXJjZS5jb2xvcnMucHJpbWFyeS50ZXh0XG5cdFx0XHRjaGVja0JveDpcblx0XHRcdFx0YmFja2dyb3VuZENvbG9yOiBzb3VyY2UuY29sb3JzLnNlY29uZGFyeS5kYXJrXG5cdFx0XHRcdGJvcmRlckNvbG9yOiBudWxsXG5cblx0c2xpZGVyOlxuXHRcdGtub2I6IHNvdXJjZS5jb2xvcnMucHJpbWFyeS5saWdodFxuXHRcdGZpbGw6IHNvdXJjZS5jb2xvcnMucHJpbWFyeS5kYXJrXG5cblx0Y2FyZDpcblx0XHRoZWFkZXI6IHNvdXJjZS5jb2xvcnMuc2Vjb25kYXJ5LmRhcmtcblx0XG5cdG5hdkJhcjpcblx0XHRiYWNrZ3JvdW5kQ29sb3I6ICcjMDAwMDAwJ1xuXHRcblx0a2V5Ym9hcmQ6XG5cdFx0aW1hZ2U6ICdpbWFnZXMva2V5Ym9hcmRfbGlnaHQucG5nJ1xuXG5jb2xvcl9wYWxsZXRlLmRlc3Ryb3koKVxuXG5leHBvcnRzLnRoZW1lID0gdGhlbWVcbiIsIiMgXHQgODg4ODg4YmEgIG9vICAgICAgICAgICAgICAgICAgIGRQXG4jIFx0IDg4ICAgIGA4YiAgICAgICAgICAgICAgICAgICAgICA4OFxuIyBcdGE4OGFhYWE4UCcgZFAgODhkODg4Yi4gODhkODg4Yi4gODggLmQ4ODg4Yi5cbiMgXHQgODggICBgOGIuIDg4IDg4JyAgYDg4IDg4JyAgYDg4IDg4IDg4b29vb2Q4XG4jIFx0IDg4ICAgICA4OCA4OCA4OC4gIC44OCA4OC4gIC44OCA4OCA4OC4gIC4uLlxuIyBcdCBkUCAgICAgZFAgZFAgODhZODg4UCcgODhZODg4UCcgZFAgYDg4ODg4UCdcbiMgXHQgICAgICAgICAgICAgIDg4ICAgICAgIDg4XG4jIFx0ICAgICAgICAgICAgICBkUCAgICAgICBkUFxuXG4jXHRCeSBkZWZhdWx0LCBzaG93cyBhbiBleHBhbmRpbmcgY2lyY2xlIG92ZXIgYSBsYXllciwgY2xpcHBlZCB0byBpdHMgZnJhbWUuXG4jXHRPbiB0aGUgbGF5ZXIncyB0b3VjaEVuZCBldmVudCwgdGhlIGNpcmNsZSBhbmQgaXRzIG1hc2sgd2lsbCBkaXNhcHBlYXIuXG5cbiNcdHJlcXVpcmVkOlxuI1x0bGF5ZXIgKExheWVyKSwgdGhlIGxheWVyIG92ZXIgd2hpY2ggdG8gc2hvdyB0aGUgcmlwcGxlIGVmZmVjdFxuI1x0cG9pbnQgKG9iamVjdCksIHRoZSByaXBwbGUgb3JpZ2luIHBvaW50LCB1c3VhbGx5IGEgb25Ub3VjaFN0YXJ0J3MgZXZlbnQucG9pbnRcblxuI1x0b3B0aW9uYWw6XG4jXHRwbGFjZUJlaGluZCAoTGF5ZXIpLCBhIGNoaWxkIG9mIGxheWVyIGJlaGluZCB3aGljaCB0aGUgcmlwcGxlIHNob3VsZCBhcHBlYXJcbiNcdGNvbG9yIChzdHJpbmcgb3IgY29sb3Igb2JqZWN0KSwgYSBjdXN0b20gY29sb3IgZm9yIHRoZSByaXBwbGVcblxucmlwcGxlID0gKGxheWVyLCBwb2ludCwgcGxhY2VCZWhpbmQsIGNvbG9yKSAtPlxuXHRcblx0aWYgIWxheWVyPyB0aGVuIHRocm93ICdSaXBwbGUgcmVxdWlyZXMgYSBMYXllci4gVHJ5IG15TGF5ZXIub25Ub3VjaFN0YXJ0IChldmVudCkgLT4gcmlwcGxlKEAsIGV2ZW50LnBvaW50KSdcblx0aWYgIXBvaW50PyB0aGVuIHRocm93ICdSaXBwbGUgcmVxdWlyZXMgYSBwb2ludC4gVHJ5IG15TGF5ZXIub25Ub3VjaFN0YXJ0IChldmVudCkgLT4gcmlwcGxlKEAsIGV2ZW50LnBvaW50KSdcblxuXHRtYXNrID0gbmV3IExheWVyXG5cdFx0bmFtZTogJy4nXG5cdFx0cGFyZW50OiBsYXllclxuXHRcdHNpemU6IGxheWVyLnNpemVcblx0XHRib3JkZXJSYWRpdXM6IGxheWVyLmJvcmRlclJhZGl1c1xuXHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdGNsaXA6IHRydWVcblx0XHRvcGFjaXR5OiAwXG5cdFx0YW5pbWF0aW9uT3B0aW9uczoge3RpbWU6IC4xNX1cblx0XG5cdGlmIHBsYWNlQmVoaW5kIHRoZW4gbWFzay5wbGFjZUJlaGluZChwbGFjZUJlaGluZClcblx0XG5cdCMgUklQUExFIENJUkNMRVxuXHRcblx0bG9uZ1NpZGUgPSBpZiBsYXllci53aWR0aCA+IGxheWVyLmhlaWdodCB0aGVuIGxheWVyLndpZHRoIGVsc2UgbGF5ZXIuaGVpZ2h0XG5cblx0cmlwcGxlQ2lyY2xlID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiAnLicsIHBhcmVudDogbWFza1xuXHRcdFx0eDogcG9pbnQueCAtIDE2XG5cdFx0XHR5OiBwb2ludC55IC0gMTZcblx0XHRcdHdpZHRoOiAzMiwgaGVpZ2h0OiAzMiwgXG5cdFx0XHRib3JkZXJSYWRpdXM6IGxvbmdTaWRlXG5cdFx0XHRcblx0aWYgY29sb3I/XG5cdFx0cmlwcGxlQ2lyY2xlLnByb3BzID1cblx0XHRcdGJhY2tncm91bmRDb2xvcjogY29sb3Jcblx0ZWxzZSBcblx0XHRyaXBwbGVDaXJjbGUucHJvcHMgPSBcblx0XHRcdGJhY2tncm91bmRDb2xvcjogbGF5ZXIuYmFja2dyb3VuZENvbG9yXG5cdFx0XHRzYXR1cmF0ZTogMTUwXG5cdFx0XHRicmlnaHRuZXNzOiAxMjBcblx0XHRcdG9wYWNpdHk6IC4zXG5cdFxuXHQjIEFOSU1BVElPTlMgQ0lSQ0xFXG5cdFxuXHRtYXNrLmFuaW1hdGVcblx0XHRvcGFjaXR5OiAxXG5cdFx0b3B0aW9uczoge3RpbWU6IC4xNX1cblx0XG5cdHJpcHBsZUNpcmNsZS5hbmltYXRlXG5cdFx0eDogcmlwcGxlQ2lyY2xlLnggLSBsb25nU2lkZSAqIDEuM1xuXHRcdHk6IHJpcHBsZUNpcmNsZS55IC0gbG9uZ1NpZGUgKiAxLjNcblx0XHR3aWR0aDogbG9uZ1NpZGUgKiAyLjZcblx0XHRoZWlnaHQ6IGxvbmdTaWRlICogMi42XG5cdFx0b3B0aW9uczoge3RpbWU6IC41fVxuXHRcblx0VXRpbHMuZGVsYXkgMiwgLT4gXG5cdFx0bWFzay5hbmltYXRlXG5cdFx0XHRvcGFjaXR5OiAwXG5cdFx0bWFzay5vbkFuaW1hdGlvbkVuZCBtYXNrLmRlc3Ryb3lcblxuXHQjIFRPVUNIIEVORFxuXHRcblx0bGF5ZXIub25Ub3VjaEVuZCAtPiBcblx0XHRtYXNrLmFuaW1hdGVcblx0XHRcdG9wYWNpdHk6IDBcblx0XHRtYXNrLm9uQW5pbWF0aW9uRW5kIG1hc2suZGVzdHJveVxuXG5leHBvcnRzLnJpcHBsZSA9IHJpcHBsZSIsIiMgQWRkIHRoZSBmb2xsb3dpbmcgbGluZSB0byB5b3VyIHByb2plY3QgaW4gRnJhbWVyIFN0dWRpby4gXG4jIG15TW9kdWxlID0gcmVxdWlyZSBcIm15TW9kdWxlXCJcbiMgUmVmZXJlbmNlIHRoZSBjb250ZW50cyBieSBuYW1lLCBsaWtlIG15TW9kdWxlLm15RnVuY3Rpb24oKSBvciBteU1vZHVsZS5teVZhclxuXG5leHBvcnRzLm15VmFyID0gXCJteVZhcmlhYmxlXCJcblxuZXhwb3J0cy5teUZ1bmN0aW9uID0gLT5cblx0cHJpbnQgXCJteUZ1bmN0aW9uIGlzIHJ1bm5pbmdcIlxuXG5leHBvcnRzLm15QXJyYXkgPSBbMSwgMiwgM10iLCJ7ZGF0YWJhc2V9ID0gcmVxdWlyZSAnZGF0YWJhc2UnXG57cmlwcGxlfSA9IHJlcXVpcmUgJ3JpcHBsZSdcbnt0aGVtZX0gPSByZXF1aXJlICd0aGVtZSdcbnR5cGUgPSByZXF1aXJlICd0eXBlJ1xuXG5cbiMgVE9ETzogQ2hhbmdlIEFwcCBmcm9tIG1hc3RlciBmbG93IGNvbXBvbmVudCB0byBTY3JlZW4gbWFuYWdlci5cbiMgQXBwIHNob3VsZG4ndCBkaXJlY3RseSBtYW5hZ2UgcGFnZXM6IGEgbmV3IGNsYXNzLCAnc2NyZWVuJyB3aWxsIG1hbmFnZSBQYWdlcy5cbiMgVGFicyBhbGxvdyBuYXZpZ2F0aW9uIGJldHdlZW4gU2NyZWVucy4gQ29udGVudCBpcyBzdGlsbCBhZGRlZCB0byBQYWdlcy5cblxuXG4jIE91ciBnb2FsIGlzIHRvIHJlcXVpcmUgb25seSBvbmUgcmVxdWlyZSBpbiBGcmFtZXIgcHJvamVjdCwgc28gdGhpcyBcbiMgaXMgYSBjbHVua3kgd2F5IG9mIGxldHRpbmcgdXNlciBjcmVhdGUgdGV4dCB1c2luZyBtZC5UaXRsZSwgZXRjLlxuXG5leHBvcnRzLnRoZW1lID0gdGhlbWVcbmV4cG9ydHMuVGl0bGUgPSBUaXRsZSA9IHR5cGUuVGl0bGVcbmV4cG9ydHMuSGVhZGxpbmUgPSBIZWFkbGluZSA9IHR5cGUuSGVhZGxpbmVcbmV4cG9ydHMuU3ViaGVhZFNlY29uZGFyeSA9IFN1YmhlYWRTZWNvbmRhcnkgPSB0eXBlLlN1YmhlYWRTZWNvbmRhcnlcbmV4cG9ydHMuUmVndWxhciA9IFJlZ3VsYXIgPSB0eXBlLlJlZ3VsYXJcbmV4cG9ydHMuQm9keTIgPSBCb2R5MiA9IHR5cGUuQm9keTJcbmV4cG9ydHMuQm9keTEgPSBCb2R5MSA9IHR5cGUuQm9keTFcbmV4cG9ydHMuQ2FwdGlvbiA9IENhcHRpb24gPSB0eXBlLkNhcHRpb25cbmV4cG9ydHMuRGlhbG9nQWN0aW9uID0gRGlhbG9nQWN0aW9uID0gdHlwZS5EaWFsb2dBY3Rpb25cblxuXG5cblxuXG4jIFx0IC5kODg4ODg4XG4jIFx0ZDgnICAgIDg4XG4jIFx0ODhhYWFhYTg4YSA4OGQ4ODhiLiA4OGQ4ODhiLlxuIyBcdDg4ICAgICA4OCAgODgnICBgODggODgnICBgODhcbiMgXHQ4OCAgICAgODggIDg4LiAgLjg4IDg4LiAgLjg4XG4jIFx0ODggICAgIDg4ICA4OFk4ODhQJyA4OFk4ODhQJ1xuIyBcdCAgICAgICAgICAgODggICAgICAgODhcbiMgXHQgICAgICAgICAgIGRQICAgICAgIGRQXG5cblxuXG5jbGFzcyBBcHAgZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblx0XHRAX2Zvb3RlciA9IG9wdGlvbnMuZm9vdGVyID8gdHJ1ZVxuXHRcdEBfdGhlbWUgPSB0aGVtZVxuXHRcdEBfdmlld3MgPSBvcHRpb25zLnZpZXdzID8gW11cblxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdG5hbWU6ICdBcHAnXG5cdFx0XHRzaXplOiBTY3JlZW4uc2l6ZVxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cblx0XHQjIEZPT1RFUlxuXG5cdFx0aWYgQF9mb290ZXJcblx0XHRcdEBmb290ZXIgPSBuZXcgTGF5ZXJcblx0XHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEBcblx0XHRcdFx0d2lkdGg6IFNjcmVlbi53aWR0aCwgaGVpZ2h0OiA0OFxuXHRcdFx0XHRpbWFnZTogJ2ltYWdlcy9uYXZfYmFyLnBuZydcblx0XHRcblx0XHQjIEhFQURFUlxuXG5cdFx0QGhlYWRlciA9IG5ldyBIZWFkZXJcblx0XHRcdHRoZW1lOiB0aGVtZVxuXG5cblx0XHQjIEtFWUJPQVJEXG5cblx0XHRAa2V5Ym9hcmQgPSBuZXcgTGF5ZXJcblx0XHRcdG5hbWU6ICdLZXlib2FyZCdcblx0XHRcdHk6IEBtYXhZLCBpbWFnZTogdGhlbWUua2V5Ym9hcmQuaW1hZ2Vcblx0XHRcdHdpZHRoOiAzNjAsIGhlaWdodDogMjY5XG5cdFx0XHRhbmltYXRpb25PcHRpb25zOlxuXHRcdFx0XHR0aW1lOiAuMjVcblxuXG5cdHNob3dLZXlib2FyZDogLT5cblx0XHRAa2V5Ym9hcmQuYW5pbWF0ZVxuXHRcdFx0eTogQWxpZ24uYm90dG9tKClcblx0XHRAa2V5Ym9hcmQuYnJpbmdUb0Zyb250KClcblxuXHRoaWRlS2V5Ym9hcmQ6IC0+XG5cdFx0QGtleWJvYXJkLmFuaW1hdGVcblx0XHRcdHk6IFNjcmVlbi5tYXhZXG5cblxuXG5cblxuIyBcdGRQICAgICBkUCBvb1xuIyBcdDg4ICAgICA4OFxuIyBcdDg4ICAgIC44UCBkUCAuZDg4ODhiLiBkUCAgZFAgIGRQXG4jIFx0ODggICAgZDgnIDg4IDg4b29vb2Q4IDg4ICA4OCAgODhcbiMgXHQ4OCAgLmQ4UCAgODggODguICAuLi4gODguODhiLjg4J1xuIyBcdDg4ODg4OCcgICBkUCBgODg4ODhQJyA4ODg4UCBZOFBcblxuXG5cbmV4cG9ydHMuVmlldyA9IGNsYXNzIFZpZXcgZXh0ZW5kcyBGbG93Q29tcG9uZW50XG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXG5cdFx0QGFwcCA9IGFwcFxuXG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0bmFtZTogJ1ZpZXcnXG5cdFx0XHRwYXJlbnQ6IGFwcFxuXHRcdFx0YW5pbWF0aW9uT3B0aW9uczpcblx0XHRcdFx0dGltZTogLjJcblxuXHRcdEBvblRyYW5zaXRpb25TdGFydCAoY3VycmVudCwgbmV4dCwgZGlyZWN0aW9uKSA9PiBcblxuXHRcdFx0QGFwcC5oZWFkZXIudGl0bGUgPSBuZXh0Ll9oZWFkZXI/LnRpdGxlID8gJ0RlZmF1bHQnXG5cdFx0XHRAYXBwLmhlYWRlci5pY29uID0gbmV4dC5faGVhZGVyPy5pY29uID8gJ21lbnUnXG5cdFx0XHRAYXBwLmhlYWRlci5pY29uQWN0aW9uID0gbmV4dC5faGVhZGVyPy5pY29uQWN0aW9uID8gLT4gbnVsbFxuXHRcdFx0QGFwcC5oZWFkZXIudmlzaWJsZSA9IG5leHQuX2hlYWRlcj8udmlzaWJsZSA/IHRydWVcblx0XHRcdG5leHQuX29uTG9hZCgpXG5cblx0bmV3UGFnZTogKG9wdGlvbnMgPSB7fSkgLT5cblxuXHRcdHBhZ2UgPSBuZXcgUGFnZSBfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRjb250ZW50SW5zZXQ6IHt0b3A6IEBhcHAuaGVhZGVyLmhlaWdodH1cblxuXHRcdCMgYWRqdXN0IGNvbnRlbnQgaW5zZXQgZm9yIHBhZ2Vcblx0XHRpZiBwYWdlLmNvbnRlbnRJbnNldC50b3AgPCBAYXBwLmhlYWRlci5oZWlnaHQgdGhlbiBwYWdlLmNvbnRlbnRJbnNldCA9IFxuXHRcdFx0dG9wOiBwYWdlLmNvbnRlbnRJbnNldC50b3AgKz0gQGFwcC5oZWFkZXIuaGVpZ2h0XG5cdFx0XHRib3R0b206IHBhZ2UuY29udGVudEluc2V0LmJvdHRvbVxuXHRcdFx0bGVmdDogcGFnZS5jb250ZW50SW5zZXQubGVmdFxuXHRcdFx0cmlnaHQ6IHBhZ2UuY29udGVudEluc2V0LnJpZ2h0XG5cblx0XHRyZXR1cm4gcGFnZSBcblxuXHRhZGRQYWdlOiAocGFnZSkgLT5cblx0XHRwYWdlLmNvbnRlbnRJbnNldCA9IHt0b3A6IEBhcHAuaGVhZGVyLmhlaWdodH1cblxuXHRcdCMgYWRqdXN0IGNvbnRlbnQgaW5zZXQgZm9yIHBhZ2Vcblx0XHRpZiBwYWdlLmNvbnRlbnRJbnNldC50b3AgPCBAYXBwLmhlYWRlci5oZWlnaHQgdGhlbiBwYWdlLmNvbnRlbnRJbnNldCA9IFxuXHRcdFx0dG9wOiBwYWdlLmNvbnRlbnRJbnNldC50b3AgKz0gQGFwcC5oZWFkZXIuaGVpZ2h0XG5cdFx0XHRib3R0b206IHBhZ2UuY29udGVudEluc2V0LmJvdHRvbVxuXHRcdFx0bGVmdDogcGFnZS5jb250ZW50SW5zZXQubGVmdFxuXHRcdFx0cmlnaHQ6IHBhZ2UuY29udGVudEluc2V0LnJpZ2h0XG5cblx0XHRyZXR1cm4gcGFnZVxuXG5cdGxpbmtUbzogKHBhZ2UpIC0+XG5cdFx0aWYgcGFnZT8gYW5kIEBjdXJyZW50IGlzbnQgcGFnZVxuXHRcdFx0QHNob3dOZXh0KHBhZ2UpXG5cblxuXG5cblxuXG5cblxuIyAuZDg4ODg4YiAgICBkUCAgICAgICAgICAgICAgZFAgICAgICAgICAgICAgICAgICAgICAgODg4ODg4YmEgICAgICAgICAgICAgICAgICAgXG4jIDg4LiAgICBcIicgICA4OCAgICAgICAgICAgICAgODggICAgICAgICAgICAgICAgICAgICAgODggICAgYDhiICAgICAgICAgICAgICAgICAgXG4jIGBZODg4ODhiLiBkODg4OFAgLmQ4ODg4Yi4gZDg4ODhQIGRQICAgIGRQIC5kODg4OGIuIGE4OGFhYWE4UCcgLmQ4ODg4Yi4gODhkODg4Yi5cbiMgICAgICAgYDhiICAgODggICA4OCcgIGA4OCAgIDg4ICAgODggICAgODggWThvb29vby4gIDg4ICAgYDhiLiA4OCcgIGA4OCA4OCcgIGA4OFxuIyBkOCcgICAuOFAgICA4OCAgIDg4LiAgLjg4ICAgODggICA4OC4gIC44OCAgICAgICA4OCAgODggICAgLjg4IDg4LiAgLjg4IDg4ICAgICAgXG4jICBZODg4ODhQICAgIGRQICAgYDg4ODg4UDggICBkUCAgIGA4ODg4OFAnIGA4ODg4OFAnICA4ODg4ODg4OFAgYDg4ODg4UDggZFAgIFxuXG5cblxuZXhwb3J0cy5TdGF0dXNCYXIgPSBjbGFzcyBTdGF0dXNCYXIgZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdG5hbWU6ICcuJ1xuXHRcdFx0d2lkdGg6IFNjcmVlbi53aWR0aCwgaGVpZ2h0OiAyNFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiB0aGVtZS5zdGF0dXNCYXIuYmFja2dyb3VuZENvbG9yXG5cblx0XHRAaXRlbXMgPSBuZXcgTGF5ZXJcblx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBAXG5cdFx0XHRzaXplOiBAc2l6ZVxuXHRcdFx0aW1hZ2U6IHRoZW1lLnN0YXR1c0Jhci5pbWFnZVxuXHRcdFx0aW52ZXJ0OiB0aGVtZS5zdGF0dXNCYXIuaW52ZXJ0XG5cblxuXG5cblxuXG5cblxuIyBkUCAgICAgZFAgICAgICAgICAgICAgICAgICAgICAgICAgIGRQICAgICAgICAgICAgICAgICAgXG4jIDg4ICAgICA4OCAgICAgICAgICAgICAgICAgICAgICAgICAgODggICAgICAgICAgICAgICAgICBcbiMgODhhYWFhYTg4YSAuZDg4ODhiLiAuZDg4ODhiLiAuZDg4OGI4OCAuZDg4ODhiLiA4OGQ4ODhiLlxuIyA4OCAgICAgODggIDg4b29vb2Q4IDg4JyAgYDg4IDg4JyAgYDg4IDg4b29vb2Q4IDg4JyAgYDg4XG4jIDg4ICAgICA4OCAgODguICAuLi4gODguICAuODggODguICAuODggODguICAuLi4gODggICAgICBcbiMgZFAgICAgIGRQICBgODg4ODhQJyBgODg4ODhQOCBgODg4ODhQOCBgODg4ODhQJyBkUCAgICBcblxuXG5cbmV4cG9ydHMuSGVhZGVyID0gY2xhc3MgSGVhZGVyIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cdFx0XG5cdFx0QF90aXRsZSA9IHVuZGVmaW5lZFxuXHRcdEBfaWNvbiA9IHVuZGVmaW5lZFxuXHRcdEBfaWNvbkFjdGlvbiA9IG9wdGlvbnMuaWNvbkFjdGlvbiA/IC0+IG51bGxcblxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdG5hbWU6ICdIZWFkZXInLCBcblx0XHRcdHdpZHRoOiBTY3JlZW4ud2lkdGgsIGhlaWdodDogODBcblx0XHRcdHNoYWRvd1k6IDIsIHNoYWRvd0JsdXI6IDMsIHNoYWRvd0NvbG9yOiAncmdiYSgwLDAsMCwuMjQpJ1xuXHRcdFx0YmFja2dyb3VuZENvbG9yOiB0aGVtZS5oZWFkZXIuYmFja2dyb3VuZENvbG9yXG5cblx0XHRAc3RhdHVzQmFyID0gbmV3IFN0YXR1c0JhclxuXHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEBcblxuXHRcdCMgVE9ETzogaWYgb3B0aW9ucy5pY29uIGlzIGZhbHNlIHRoZW4gbm8gaWNvbkxheWVyLCBtb3ZlIHRpdGxlIGxlZnRcblxuXHRcdEB0aXRsZUxheWVyID0gbmV3IHR5cGUuVGl0bGVcblx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBAXG5cdFx0XHR4OiA3MiwgeTogQWxpZ24uYm90dG9tKC0xNClcblx0XHRcdGNvbG9yOiB0aGVtZS5oZWFkZXIudGl0bGVcblx0XHRcdHRleHQ6IEB0aXRsZSA/IFwiTm8gdGl0bGVcIlxuXG5cdFx0QHRpdGxlID0gb3B0aW9ucy50aXRsZSA/ICdEZWZhdWx0IEhlYWRlcidcblxuXHRcdEBpY29uTGF5ZXIgPSBuZXcgTGF5ZXJcblx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBALCBcblx0XHRcdHg6IDEyLCB5OiBBbGlnbi5jZW50ZXIoMTIpXG5cdFx0XHR3aWR0aDogMzIsIGhlaWdodDogMzJcblx0XHRcdGltYWdlOiAnJywgYmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHRpbnZlcnQ6IHRoZW1lLmhlYWRlci5pbnZlcnRcblxuXHRcdEBpY29uID0gb3B0aW9ucy5pY29uID8gJ21lbnUnXG5cblx0XHRAaWNvbkxheWVyLm9uVGFwID0+IEBfaWNvbkFjdGlvbigpXG5cdFx0QGljb25MYXllci5vblRvdWNoU3RhcnQgKGV2ZW50KSAtPiByaXBwbGUoYXBwLmhlYWRlciwgZXZlbnQucG9pbnQpXG5cblxuXHRAZGVmaW5lIFwidGl0bGVcIixcblx0XHRnZXQ6IC0+IHJldHVybiBAX3RpdGxlXG5cdFx0c2V0OiAodGl0bGVUZXh0KSAtPlxuXHRcdFx0QF90aXRsZSA9IHRpdGxlVGV4dFxuXHRcdFx0QHRpdGxlTGF5ZXIudGV4dFJlcGxhY2UoQHRpdGxlTGF5ZXIudGV4dCwgQF90aXRsZSlcblxuXHRAZGVmaW5lIFwiaWNvblwiLFxuXHRcdGdldDogLT4gcmV0dXJuIEBfaWNvblxuXHRcdHNldDogKGljb25OYW1lKSAtPiBcblx0XHRcdEBfaWNvbiA9IGljb25OYW1lXG5cdFx0XHRAaWNvbkxheWVyLmltYWdlID0gXCJpbWFnZXMvaWNvbnMvI3tAX2ljb259LnBuZ1wiXG5cblx0QGRlZmluZSBcImljb25BY3Rpb25cIixcblx0XHRnZXQ6IC0+IHJldHVybiBAX2ljb25BY3Rpb25cblx0XHRzZXQ6IChhY3Rpb24pIC0+XG5cdFx0XHRAX2ljb25BY3Rpb24gPSBhY3Rpb25cblxuXG5cblxuXG5cblxuIyAgODg4ODg4YmEgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4jICA4OCAgICBgOGIgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiMgYTg4YWFhYThQJyAuZDg4ODhiLiAuZDg4ODhiLiAuZDg4ODhiLlxuIyAgODggICAgICAgIDg4JyAgYDg4IDg4JyAgYDg4IDg4b29vb2Q4XG4jICA4OCAgICAgICAgODguICAuODggODguICAuODggODguICAuLi5cbiMgIGRQICAgICAgICBgODg4ODhQOCBgODg4OFA4OCBgODg4ODhQJ1xuIyAgICAgICAgICAgICAgICAgICAgICAgICAgLjg4ICAgICAgICAgXG4jICAgICAgICAgICAgICAgICAgICAgIGQ4ODg4UCAgICAgICAgICBcblxuXG5cbmV4cG9ydHMuUGFnZSA9IGNsYXNzIFBhZ2UgZXh0ZW5kcyBTY3JvbGxDb21wb25lbnRcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cdFx0XG5cdFx0QF9oZWFkZXIgPSBvcHRpb25zLmhlYWRlciA/IHt0aXRsZTogJ0RlZmF1bHQnLCB2aXNpYmxlOiB0cnVlLCBpY29uOiAnbWVudScsIGljb25BY3Rpb246IC0+IHJldHVybiBudWxsfVxuXHRcdEBfdGVtcGxhdGUgPSBvcHRpb25zLnRlbXBsYXRlXG5cdFx0QF90ZW1wbGF0ZU9wYWNpdHkgPSBvcHRpb25zLnRlbXBsYXRlT3BhY2l0eSA/IC41XG5cdFx0QF9vbkxvYWQgPSBvcHRpb25zLm9uTG9hZCA/IC0+IG51bGxcblxuXHRcdGlmIEBfaGVhZGVyLmljb25BY3Rpb24gdGhlbiBAX2hlYWRlci5pY29uQWN0aW9uID0gXy5iaW5kKEBfaGVhZGVyLmljb25BY3Rpb24sIEApXG5cdFx0aWYgQF9vbkxvYWQgdGhlbiBAX29uTG9hZCA9IF8uYmluZChAX29uTG9hZCwgQClcblxuXG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0bmFtZTogJ1BhZ2UnXG5cdFx0XHRzaXplOiBTY3JlZW4uc2l6ZVxuXHRcdFx0c2Nyb2xsSG9yaXpvbnRhbDogZmFsc2Vcblx0XHRcdGJhY2tncm91bmRDb2xvcjogdGhlbWUucGFnZS5wcmltYXJ5LmJhY2tncm91bmRDb2xvclxuXHRcdFxuXHRcdEBjb250ZW50SW5zZXQgPVxuXHRcdFx0dG9wOiAwLCBib3R0b206IDUwMFxuXG5cdFx0QGNvbnRlbnQuYmFja2dyb3VuZENvbG9yID0gbnVsbFxuXG5cdFx0aWYgQF90ZW1wbGF0ZT9cblx0XHRcdEBfdGVtcGxhdGUucHJvcHMgPVxuXHRcdFx0XHRwYXJlbnQ6IEBcblx0XHRcdFx0b3BhY2l0eTogQF90ZW1wbGF0ZU9wYWNpdHlcblxuXHRcdEBzZW5kVG9CYWNrKClcblxuXG5cdHVwZGF0ZTogLT4gcmV0dXJuIG51bGxcblxuXG5cblxuXG5cblxuXG4jICA4ODg4ODhiYSAgICAgICAgICAgICAgICAgICAgICBkUCAgIGRQICAgICAgICAgICAgICAgICAgICAgIFxuIyAgODggICAgYDhiICAgICAgICAgICAgICAgICAgICAgODggICA4OCAgICAgICAgICAgICAgICAgICAgICBcbiMgYTg4YWFhYThQJyAuZDg4ODhiLiBkUCAgZFAgIGRQIDg4IGQ4ODg4UCAuZDg4ODhiLiA4OGQ4Yi5kOGIuXG4jICA4OCAgIGA4Yi4gODgnICBgODggODggIDg4ICA4OCA4OCAgIDg4ICAgODhvb29vZDggODgnYDg4J2A4OFxuIyAgODggICAgIDg4IDg4LiAgLjg4IDg4Ljg4Yi44OCcgODggICA4OCAgIDg4LiAgLi4uIDg4ICA4OCAgODhcbiMgIGRQICAgICBkUCBgODg4ODhQJyA4ODg4UCBZOFAgIGRQICAgZFAgICBgODg4ODhQJyBkUCAgZFAgIGRQXG5cblxuXG5leHBvcnRzLlJvd0l0ZW0gPSBjbGFzcyBSb3dJdGVtIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cblx0XHRAX2ljb24gPSBvcHRpb25zLmljb25cblx0XHRAX2ljb25CYWNrZ3JvdW5kQ29sb3IgPSBvcHRpb25zLmljb25CYWNrZ3JvdW5kQ29sb3IgPyAnIzc3Nydcblx0XHRAX3RleHQgPSBvcHRpb25zLnRleHQgPyAnUm93IGl0ZW0nXG5cdFx0QF9yb3cgPSBvcHRpb25zLnJvdyA/IDBcblx0XHRAX3kgPSAzMiArIChAX3JvdyAqIDQ4KSBcblxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdHdpZHRoOiBTY3JlZW4ud2lkdGhcblx0XHRcdHk6IEBfeVxuXHRcdFx0aGVpZ2h0OiA0OFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cblx0XHRAaWNvbiA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEBcblx0XHRcdHg6IDE2LCB5OiBBbGlnbi5jZW50ZXJcblx0XHRcdGhlaWdodDogMzIsIHdpZHRoOiAzMiwgYm9yZGVyUmFkaXVzOiAxNlxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBAX2ljb25CYWNrZ3JvdW5kQ29sb3Jcblx0XHRcdGltYWdlOiBAX2ljb25cblxuXHRcdEBsYWJlbExheWVyID0gbmV3IHR5cGUuUmVndWxhclxuXHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEBcblx0XHRcdHg6IEBpY29uLm1heFggKyAxNiwgeTogQWxpZ24uY2VudGVyXG5cdFx0XHRjb2xvcjogdGhlbWUudGV4dC50ZXh0XG5cdFx0XHR0ZXh0OiBAX3RleHRcblxuXG5cblxuXG5cblxuXG4jIFx0ODg4OGJhLjg4YmEgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA4ODg4ODhiYSAgICAgICAgICAgICBkUCAgICAgZFBcbiMgXHQ4OCAgYDhiICBgOGIgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDg4ICAgIGA4YiAgICAgICAgICAgIDg4ICAgICA4OFxuIyBcdDg4ICAgODggICA4OCAuZDg4ODhiLiA4OGQ4ODhiLiBkUCAgICBkUCBhODhhYWFhOFAnIGRQICAgIGRQIGQ4ODg4UCBkODg4OFAgLmQ4ODg4Yi4gODhkODg4Yi5cbiMgXHQ4OCAgIDg4ICAgODggODhvb29vZDggODgnICBgODggODggICAgODggIDg4ICAgYDhiLiA4OCAgICA4OCAgIDg4ICAgICA4OCAgIDg4JyAgYDg4IDg4JyAgYDg4XG4jIFx0ODggICA4OCAgIDg4IDg4LiAgLi4uIDg4ICAgIDg4IDg4LiAgLjg4ICA4OCAgICAuODggODguICAuODggICA4OCAgICAgODggICA4OC4gIC44OCA4OCAgICA4OFxuIyBcdGRQICAgZFAgICBkUCBgODg4ODhQJyBkUCAgICBkUCBgODg4ODhQJyAgODg4ODg4ODhQIGA4ODg4OFAnICAgZFAgICAgIGRQICAgYDg4ODg4UCcgZFAgICAgZFBcblxuXG5cbmNsYXNzIE1lbnVCdXR0b24gZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblx0XHRcblx0XHRAX2ljb24gPSBvcHRpb25zLmljb24gPyAnaG9tZSdcblx0XHRAX3RleHQgPSBvcHRpb25zLnRleHQgPyAnRGVmYXVsdCdcblx0XHRAX2FjdGlvbiA9IG9wdGlvbnMuYWN0aW9uID8gLT4gbnVsbFxuXG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0aGVpZ2h0OiA0OCwgd2lkdGg6IDMwNFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cblx0XHRAaWNvbkxheWVyID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQFxuXHRcdFx0eTogQWxpZ24uY2VudGVyXG5cdFx0XHRoZWlnaHQ6IDMyLCB3aWR0aDogMzJcblx0XHRcdGludmVydDogdGhlbWUubWVudS5pbnZlcnRcblx0XHRcdGltYWdlOiBAX2ljb25cblxuXHRcdEBsYWJlbExheWVyID0gbmV3IHR5cGUuUmVndWxhclxuXHRcdFx0bmFtZTogJ2xhYmVsJywgcGFyZW50OiBAXG5cdFx0XHR4OiBAaWNvbkxheWVyLm1heFggKyAxNlxuXHRcdFx0eTogQWxpZ24uY2VudGVyKClcblx0XHRcdGNvbG9yOiB0aGVtZS5tZW51T3ZlcmxheS50ZXh0XG5cdFx0XHR0ZXh0OiBAX3RleHRcblxuXHRcdEBvblRhcCBAX2FjdGlvblxuXHRcdEBvblRhcCAtPiBcblx0XHRcdFV0aWxzLmRlbGF5IC4yNSwgPT4gQHBhcmVudC5oaWRlKClcblxuXG5cblxuXG5cblxuXG4jIFx0ODg4OGJhLjg4YmEgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuODg4ODguICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkUCAgICAgICAgICAgICAgICAgIFxuIyBcdDg4ICBgOGIgIGA4YiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkOCcgICBgOGIgICAgICAgICAgICAgICAgICAgICAgICAgICAgODggICAgICAgICAgICAgICAgICBcbiMgXHQ4OCAgIDg4ICAgODggLmQ4ODg4Yi4gODhkODg4Yi4gZFAgICAgZFAgODggICAgIDg4IGRQICAgLmRQIC5kODg4OGIuIDg4ZDg4OGIuIDg4IC5kODg4OGIuIGRQICAgIGRQXG4jIFx0ODggICA4OCAgIDg4IDg4b29vb2Q4IDg4JyAgYDg4IDg4ICAgIDg4IDg4ICAgICA4OCA4OCAgIGQ4JyA4OG9vb29kOCA4OCcgIGA4OCA4OCA4OCcgIGA4OCA4OCAgICA4OFxuIyBcdDg4ICAgODggICA4OCA4OC4gIC4uLiA4OCAgICA4OCA4OC4gIC44OCBZOC4gICAuOFAgODggLjg4JyAgODguICAuLi4gODggICAgICAgODggODguICAuODggODguICAuODhcbiMgXHRkUCAgIGRQICAgZFAgYDg4ODg4UCcgZFAgICAgZFAgYDg4ODg4UCcgIGA4ODg4UCcgIDg4ODhQJyAgIGA4ODg4OFAnIGRQICAgICAgIGRQIGA4ODg4OFA4IGA4ODg4UDg4XG4jICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuODhcbiMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZDg4ODhQIFxuXG5cblxuZXhwb3J0cy5NZW51T3ZlcmxheSA9IGNsYXNzIE1lbnVPdmVybGF5IGV4dGVuZHMgTGF5ZXJcblx0XG5cdFxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblxuXHRcdEBfbGlua3MgPSBvcHRpb25zLmxpbmtzID8gW3t0aXRsZTogJ0hvbWUnLCBpY29uOiAnaG9tZScsIGFjdGlvbjogLT4gbnVsbH1dXG5cdFx0QF90aXRsZSA9IG9wdGlvbnMudGl0bGUgPyAnTWVudSdcblx0XHRAX2ltYWdlID0gb3B0aW9ucy5pbWFnZSA/IG51bGxcblxuXG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0aGVpZ2h0OiBTY3JlZW4uaGVpZ2h0XG5cdFx0XHR3aWR0aDogMzA0XG5cdFx0XHRoZWlnaHQ6IFNjcmVlbi5oZWlnaHRcblx0XHRcdHZpc2libGU6IGZhbHNlXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IHRoZW1lLm1lbnVPdmVybGF5LmJhY2tncm91bmRDb2xvclxuXHRcdFx0YW5pbWF0aW9uT3B0aW9uczoge2N1cnZlOiBcInNwcmluZygzMDAsIDM1LCAwKVwifVxuXG5cblx0XHRAc2NyaW0gPSBuZXcgTGF5ZXJcblx0XHRcdG5hbWU6ICcuJywgXG5cdFx0XHRzaXplOiBTY3JlZW4uc2l6ZVxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiAncmdiYSgwLDAsMCwuNiknXG5cdFx0XHRvcGFjaXR5OiAwXG5cdFx0XHR2aXNpYmxlOiBmYWxzZVxuXHRcdFx0YW5pbWF0aW9uT3B0aW9uczpcblx0XHRcdFx0dGltZTogLjI1XG5cblx0XHRAc2NyaW0ub25UYXAgPT4gQGhpZGUoKVxuXHRcdEBvblN3aXBlTGVmdEVuZCA9PiBAaGlkZSgpXG5cblx0XHRAaGVhZGVyID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQFxuXHRcdFx0d2lkdGg6IEB3aWR0aCwgaGVpZ2h0OiAxNzNcblx0XHRcdGltYWdlOiBkYXRhYmFzZS51c2VyLmltYWdlXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IHRoZW1lLm1lbnVPdmVybGF5LmhlYWRlci5iYWNrZ3JvdW5kQ29sb3JcblxuXHRcdEB0aXRsZUljb24gPSBuZXcgTGF5ZXJcblx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBAaGVhZGVyXG5cdFx0XHR4OiAxNiwgeTogNDBcblx0XHRcdGhlaWdodDogNjQsIHdpZHRoOiA2NFxuXHRcdFx0Ym9yZGVyUmFkaXVzOiAzMlxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiB0aGVtZS5tZW51T3ZlcmxheS5oZWFkZXIuaWNvblxuXG5cdFx0QHRpdGxlRXhwYW5kID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQGhlYWRlclxuXHRcdFx0eDogQWxpZ24ucmlnaHQoLTE2KVxuXHRcdFx0eTogQWxpZ24uYm90dG9tKC0xMylcblx0XHRcdGhlaWdodDogMzIsIHdpZHRoOiAzMlxuXHRcdFx0aW52ZXJ0OiB0aGVtZS5zZWNvbmRhcnkuaW52ZXJ0XG5cdFx0XHRpbWFnZTogXCJpbWFnZXMvaWNvbnMvZXhwYW5kLW1vcmUucG5nXCJcblxuXHRcdEB0aXRsZSA9IG5ldyB0eXBlLkJvZHkxXG5cdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQGhlYWRlclxuXHRcdFx0d2lkdGg6IEB3aWR0aFxuXHRcdFx0eDogMTYsIHk6IEFsaWduLmJvdHRvbSgtMTgpXG5cdFx0XHR0ZXh0OiBAX3RpdGxlXG5cblx0XHRsaW5rcyA9IFtdXG5cblx0XHRmb3IgbGluaywgaSBpbiBAX2xpbmtzXG5cdFx0XHRsaW5rc1tpXSA9IG5ldyBNZW51QnV0dG9uXG5cdFx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBAXG5cdFx0XHRcdHg6IDE2LCB5OiAxODkgKyAoNDggKiBpKVxuXHRcdFx0XHR0ZXh0OiBsaW5rLnRpdGxlXG5cdFx0XHRcdGljb246IFwiaW1hZ2VzL2ljb25zLyN7bGluay5pY29ufS5wbmdcIlxuXHRcdFx0XHRhY3Rpb246IGxpbmsuYWN0aW9uXG5cblx0c2hvdzogLT5cblx0XHRAYnJpbmdUb0Zyb250KClcblx0XHRAdmlzaWJsZSA9IHRydWVcblx0XHRAeCA9IC1TY3JlZW4ud2lkdGhcblx0XHRAYW5pbWF0ZVxuXHRcdFx0eDogMFxuXG5cdFx0QHNjcmltLnBsYWNlQmVoaW5kKEApXG5cdFx0QHNjcmltLnZpc2libGUgPSB0cnVlXG5cdFx0QHNjcmltLmFuaW1hdGVcblx0XHRcdG9wYWNpdHk6IDFcblxuXHRoaWRlOiAtPlxuXHRcdEBhbmltYXRlXG5cdFx0XHR4OiAtU2NyZWVuLndpZHRoXG5cblx0XHRAc2NyaW0uYW5pbWF0ZVxuXHRcdFx0b3BhY2l0eTogMFxuXG5cdFx0VXRpbHMuZGVsYXkgLjMsID0+XG5cdFx0XHRAdmlzaWJsZSA9IGZhbHNlXG5cdFx0XHRAc2NyaW0udmlzaWJsZSA9IGZhbHNlXG5cdFx0XHRAc2VuZFRvQmFjaygpXG5cdFx0XHRAc2NyaW0uc2VuZFRvQmFjaygpXG5cblxuXG5cblxuXG5cblxuIyBcdDg4ODg4OGJhICBvbyAgICAgICAgICBkUFxuIyBcdDg4ICAgIGA4YiAgICAgICAgICAgICA4OFxuIyBcdDg4ICAgICA4OCBkUCAuZDg4ODhiLiA4OCAuZDg4ODhiLiAuZDg4ODhiLlxuIyBcdDg4ICAgICA4OCA4OCA4OCcgIGA4OCA4OCA4OCcgIGA4OCA4OCcgIGA4OFxuIyBcdDg4ICAgIC44UCA4OCA4OC4gIC44OCA4OCA4OC4gIC44OCA4OC4gIC44OFxuIyBcdDg4ODg4ODhQICBkUCBgODg4ODhQOCBkUCBgODg4ODhQJyBgODg4OFA4OFxuIyBcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC44OFxuIyBcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZDg4ODhQXG5cblxuXG5leHBvcnRzLkRpYWxvZyA9IGNsYXNzIERpYWxvZyBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0bmFtZTogJy4nLCBzaXplOiBTY3JlZW4uc2l6ZSwgY29sb3I6IHRoZW1lLnRpbnRcblx0XHRcdGJhY2tncm91bmRDb2xvcjogJ3JnYmEoMCwgMCwgMCwgLjUpJ1xuXHRcdFx0b3BhY2l0eTogMFxuXHRcdFx0XG5cdFx0QF90aXRsZSA9IG9wdGlvbnMudGl0bGUgPyAnRGVmYXVsdCBUaXRsZSdcblx0XHRAX2JvZHkgPSBvcHRpb25zLmJvZHkgPyAnQm9keSB0ZXh0IGdvZXMgaGVyZS4nXG5cdFx0QF9hY2NlcHRUZXh0ID0gb3B0aW9ucy5hY2NlcHRUZXh0ID8gJ2NvbmZpcm0nXG5cdFx0QF9hY2NlcHRBY3Rpb24gPSBvcHRpb25zLmFjY2VwdEFjdGlvbiA/IC0+IG51bGxcblx0XHRAX2RlY2xpbmVUZXh0ID0gb3B0aW9ucy5kZWNsaW5lVGV4dCA/ICcnXG5cdFx0QF9kZWNsaW5lQWN0aW9uID0gb3B0aW9ucy5kZWNsaW5lQWN0aW9uID8gLT4gbnVsbFxuXHRcdFxuXHRcdEBvbiBFdmVudHMuVGFwLCAoZXZlbnQpIC0+IGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXG5cdFx0XG5cdFx0QGNvbnRhaW5lciA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogJ2NvbnRhaW5lcicsIHBhcmVudDogQFxuXHRcdFx0eDogQWxpZ24uY2VudGVyXG5cdFx0XHRoZWlnaHQ6IDEyOCwgd2lkdGg6IFNjcmVlbi53aWR0aCAtIDgwXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IHRoZW1lLmRpYWxvZy5iYWNrZ3JvdW5kQ29sb3Jcblx0XHRcdHNoYWRvd1g6IDAsIHNoYWRvd1k6IDcsIHNoYWRvd0JsdXI6IDMwXG5cdFx0XHRvcGFjaXR5OiAwXG5cdFx0XHRzaGFkb3dDb2xvcjogJ3JnYmEoMCwwLDAsLjMpJ1xuXHRcdFxuXHRcdEB0aXRsZSA9IG5ldyB0eXBlLlRpdGxlXG5cdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQGNvbnRhaW5lclxuXHRcdFx0eDogMjQsIHk6IDIwXG5cdFx0XHRmb250U2l6ZTogMTYsIGZvbnRXZWlnaHQ6IDUwMCwgY29sb3I6IHRoZW1lLnRleHQudGl0bGVcblx0XHRcdHRleHQ6IEBfdGl0bGVcblx0XHRcblx0XHRAYm9keSA9IG5ldyB0eXBlLlN1YmhlYWRTZWNvbmRhcnlcblx0XHRcdG5hbWU6ICdib2R5JywgcGFyZW50OiBAY29udGFpbmVyXG5cdFx0XHR4OiAyNCwgeTogNTJcblx0XHRcdHdpZHRoOiBAY29udGFpbmVyLndpZHRoIC0gNDJcblx0XHRcdHRleHQ6IEBfYm9keVxuXHRcdFxuXHRcdGJ1dHRvbnNZID0gaWYgQF9ib2R5IGlzICcnIHRoZW4gMTI4IGVsc2UgQGJvZHkubWF4WSArIDE2XG5cdFx0XG5cdFx0QGFjY2VwdCA9IG5ldyBCdXR0b25cblx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBAY29udGFpbmVyXG5cdFx0XHR4OiBBbGlnbi5yaWdodCgtMTYpLCB5OiBidXR0b25zWVxuXHRcdFx0dGV4dDogQF9hY2NlcHRUZXh0LnRvVXBwZXJDYXNlKClcblx0XHRcdGFjdGlvbjogQF9hY2NlcHRBY3Rpb25cblx0XHRcblx0XHRpZiBAX2RlY2xpbmVUZXh0IGlzbnQgJydcblx0XHRcdEBkZWNsaW5lID0gbmV3IEJ1dHRvblxuXHRcdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQGNvbnRhaW5lclxuXHRcdFx0XHR4OiAwLCB5OiBidXR0b25zWVxuXHRcdFx0XHR0ZXh0OiBAX2RlY2xpbmVUZXh0LnRvVXBwZXJDYXNlKClcblx0XHRcdFx0YWN0aW9uOiBAX2RlY2xpbmVBY3Rpb25cblxuXHRcdCMgc2V0IHBvc2l0aW9uc1xuXHRcdEBjb250YWluZXIuaGVpZ2h0ID0gQGFjY2VwdC5tYXhZICsgMTJcblx0XHRAZGVjbGluZT8ubWF4WCA9IEBhY2NlcHQueCAtIDE2XG5cdFx0QGNvbnRhaW5lci55ID0gQWxpZ24uY2VudGVyKDE2KVxuXHRcdFxuXHRcdCMgYWRkIGNsb3NlIGFjdGlvbnMgdG8gY29uZmlybSBhbmQgY2FuY2VsXG5cdFx0Zm9yIGJ1dHRvbiBpbiBbQGFjY2VwdCwgQGRlY2xpbmVdXG5cdFx0XHRidXR0b24/Lm9uVGFwIEBjbG9zZVxuXHRcdFxuXHRcdCMgT04gTE9BRFxuXHRcdEBvcGVuKClcblx0XG5cdG9wZW46ID0+XG5cdFx0QGFuaW1hdGVcblx0XHRcdG9wYWNpdHk6IDFcblx0XHRcdG9wdGlvbnM6IFxuXHRcdFx0XHR0aW1lOiAuMjVcblx0XHRcblx0XHRAY29udGFpbmVyLmFuaW1hdGVcblx0XHRcdG9wYWNpdHk6IDFcblx0XHRcdG9wdGlvbnM6XG5cdFx0XHRcdHRpbWU6IC4yNVxuXHRcdFx0XHRkZWxheTogLjA1XG5cblx0Y2xvc2U6ID0+XG5cdFx0QGNvbnRhaW5lci5hbmltYXRlXG5cdFx0XHRvcGFjaXR5OiAwXG5cdFx0XHRvcHRpb25zOlxuXHRcdFx0XHR0aW1lOiAuMjVcblx0XHRcblx0XHRAYW5pbWF0ZVxuXHRcdFx0b3BhY2l0eTogMFxuXHRcdFx0b3B0aW9uczpcblx0XHRcdFx0dGltZTogLjI1XG5cdFx0XG5cdFx0VXRpbHMuZGVsYXkgLjUsID0+IEBkZXN0cm95KClcblxuXG5cblxuXG5cblxuXG4jIFx0IDg4ODg4OGJhICAgICAgICAgICAgIGRQICAgICBkUFxuIyBcdCA4OCAgICBgOGIgICAgICAgICAgICA4OCAgICAgODhcbiMgXHRhODhhYWFhOFAnIGRQICAgIGRQIGQ4ODg4UCBkODg4OFAgLmQ4ODg4Yi4gODhkODg4Yi5cbiMgXHQgODggICBgOGIuIDg4ICAgIDg4ICAgODggICAgIDg4ICAgODgnICBgODggODgnICBgODhcbiMgXHQgODggICAgLjg4IDg4LiAgLjg4ICAgODggICAgIDg4ICAgODguICAuODggODggICAgODhcbiMgXHQgODg4ODg4ODhQIGA4ODg4OFAnICAgZFAgICAgIGRQICAgYDg4ODg4UCcgZFAgICAgZFBcblxuXG5cbmV4cG9ydHMuQnV0dG9uID0gQnV0dG9uID0gY2xhc3MgQnV0dG9uIGV4dGVuZHMgTGF5ZXIgXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXG5cdFx0QF9yYWlzZWQgPSBvcHRpb25zLnJhaXNlZCA/IGZhbHNlXG5cdFx0QF90eXBlID0gaWYgQF9yYWlzZWQgdGhlbiAncmFpc2VkJyBlbHNlICdmbGF0J1xuXHRcdEBfYWN0aW9uID0gb3B0aW9ucy5hY3Rpb24gPyAtPiBudWxsXG5cblx0XHRzdXBlciBfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRuYW1lOiAnLidcblx0XHRcdHdpZHRoOiAwLCBoZWlnaHQ6IDM2XG5cdFx0XHRib3JkZXJSYWRpdXM6IDJcblx0XHRcdGJhY2tncm91bmRDb2xvcjogdGhlbWUuYnV0dG9uW0BfdHlwZV0uYmFja2dyb3VuZENvbG9yXG5cdFx0XHRzaGFkb3dZOiB0aGVtZS5idXR0b25bQF90eXBlXS5zaGFkb3dZXG5cdFx0XHRzaGFkb3dCbHVyOiB0aGVtZS5idXR0b25bQF90eXBlXS5zaGFkb3dCbHVyXG5cdFx0XHRzaGFkb3dDb2xvcjogdGhlbWUuYnV0dG9uW0BfdHlwZV0uc2hhZG93Q29sb3Jcblx0XHRcdGFuaW1hdGlvbk9wdGlvbnM6IHt0aW1lOiAuMTV9XG5cblx0XHRAbGFiZWxMYXllciA9IG5ldyB0eXBlLkJ1dHRvblxuXHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEBcblx0XHRcdGNvbG9yOiB0aGVtZS5idXR0b25bQF90eXBlXS5jb2xvclxuXHRcdFx0dGV4dDogb3B0aW9ucy50ZXh0ID8gJ2J1dHRvbidcblx0XHRcdHRleHRUcmFuc2Zvcm06ICd1cHBlcmNhc2UnXG5cdFx0XHR0ZXh0QWxpZ246ICdjZW50ZXInXG5cdFx0XHRhbmltYXRpb25PcHRpb25zOiB7dGltZTogLjE1fVxuXHRcdFx0cGFkZGluZzogXG5cdFx0XHRcdGxlZnQ6IDE2LjUsIHJpZ2h0OiAxNi41XG5cdFx0XHRcdHRvcDogOSwgYm90dG9tOiAxMVxuXG5cdFx0QHNpemUgPSBAbGFiZWxMYXllci5zaXplXG5cdFx0QHggPSBvcHRpb25zLnhcblxuXHRcdEBvblRvdWNoU3RhcnQgKGV2ZW50KSAtPiBcblx0XHRcdEBzaG93VG91Y2hlZCgpXG5cdFx0XHRVdGlscy5kZWxheSAxLCA9PiBAcmVzZXQoKVxuXHRcdFxuXHRcdEBvblRvdWNoRW5kIChldmVudCkgLT4gXG5cdFx0XHRAX2FjdGlvbigpXG5cdFx0XHRAcmVzZXQoKVxuXG5cblx0c2hvd1RvdWNoZWQ6IC0+IFxuXHRcdEBsYWJlbExheWVyLmFuaW1hdGUge2JyaWdodG5lc3M6IDExMCwgc2F0dXJhdGU6IDExMH1cblx0XHRcblx0XHRzd2l0Y2ggQF90eXBlXG5cdFx0XHR3aGVuICdmbGF0JyB0aGVuIEBhbmltYXRlIHtiYWNrZ3JvdW5kQ29sb3I6ICdyZ2JhKDAsMCwwLC4wNSknfVxuXHRcdFx0d2hlbiAncmFpc2VkJ1xuXHRcdFx0XHRyaXBwbGUoQCwgZXZlbnQucG9pbnQsIEBsYWJlbExheWVyKVxuXHRcdFx0XHRAYW5pbWF0ZSB7c2hhZG93WTogMywgc2hhZG93U3ByZWFkOiAxfVxuXG5cdHJlc2V0OiAtPlxuXHRcdEBsYWJlbExheWVyLmFuaW1hdGUge2JyaWdodG5lc3M6IDEwMCwgc2F0dXJhdGU6IDEwMH1cblx0XHRAYmFja2dyb3VuZENvbG9yID0gdGhlbWUuYnV0dG9uW0BfdHlwZV0uYmFja2dyb3VuZENvbG9yXG5cdFx0QGFuaW1hdGUgXG5cdFx0XHRzaGFkb3dZOiB0aGVtZS5idXR0b25bQF90eXBlXS5zaGFkb3dZXG5cdFx0XHRzaGFkb3dTcHJlYWQ6IDBcblxuXG5cblxuXG5cblxuXG4jIFx0IDg4ODg4ODg4YiAgICAgICAgICBkUFxuIyBcdCA4OCAgICAgICAgICAgICAgICAgODhcbiMgXHRhODhhYWFhICAgIC5kODg4OGIuIDg4ZDg4OGIuXG4jIFx0IDg4ICAgICAgICA4OCcgIGA4OCA4OCcgIGA4OFxuIyBcdCA4OCAgICAgICAgODguICAuODggODguICAuODhcbiMgXHQgZFAgICAgICAgIGA4ODg4OFA4IDg4WTg4ODgnXG5cblxuXG5leHBvcnRzLkZhYiA9IEZhYiA9IGNsYXNzIEZhYiBleHRlbmRzIExheWVyIFxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblxuXHRcdEBfcmFpc2VkID0gb3B0aW9ucy5yYWlzZWQgPyBmYWxzZVxuXHRcdEBfYWN0aW9uID0gb3B0aW9ucy5hY3Rpb24gPyAtPiBudWxsXG5cdFx0QF9pY29uID0gb3B0aW9ucy5pY29uID8gJ2FkZCdcblxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdG5hbWU6ICcuJ1xuXHRcdFx0eDogQWxpZ24ucmlnaHQoLTE2KSwgeTogQWxpZ24uYm90dG9tKC02Nilcblx0XHRcdHdpZHRoOiA2NCwgaGVpZ2h0OiA2NCwgYm9yZGVyUmFkaXVzOiAzMlxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiB0aGVtZS5mYWIuYmFja2dyb3VuZENvbG9yXG5cdFx0XHRzaGFkb3dZOiAyLCBzaGFkb3dCbHVyOiAzXG5cdFx0XHRzaGFkb3dDb2xvcjogJ3JnYmEoMCwwLDAsLjI1KSdcblx0XHRcdGFuaW1hdGlvbk9wdGlvbnM6IHt0aW1lOiAuMTV9XG5cblx0XHRAaWNvbkxheWVyID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQFxuXHRcdFx0eDogQWxpZ24uY2VudGVyLCB5OiBBbGlnbi5jZW50ZXJcblx0XHRcdHdpZHRoOiAzMiwgaGVpZ2h0OiAzMlxuXHRcdFx0aW1hZ2U6IFwiaW1hZ2VzL2ljb25zLyN7QF9pY29ufS5wbmdcIlxuXHRcdFx0aW52ZXJ0OiB0aGVtZS5mYWIuaW52ZXJ0XG5cblx0XHRAb25Ub3VjaFN0YXJ0IChldmVudCkgLT4gXG5cdFx0XHRAc2hvd1RvdWNoZWQoKVxuXHRcdFx0VXRpbHMuZGVsYXkgMSwgPT4gQHJlc2V0KClcblx0XHRcblx0XHRAb25Ub3VjaEVuZCAoZXZlbnQpIC0+IFxuXHRcdFx0QF9hY3Rpb24oKVxuXHRcdFx0QHJlc2V0KClcblxuXG5cdHNob3dUb3VjaGVkOiAtPiBcblx0XHRyaXBwbGUoQCwgZXZlbnQucG9pbnQsIEBpY29uTGF5ZXIpXG5cdFx0QGFuaW1hdGUge3NoYWRvd1k6IDMsIHNoYWRvd1NwcmVhZDogMX1cblxuXHRyZXNldDogLT5cblx0XHRAYW5pbWF0ZSBcblx0XHRcdHNoYWRvd1k6IDJcblx0XHRcdHNoYWRvd1NwcmVhZDogMFxuXG5leHBvcnRzLkFwcCA9IGFwcCA9IG5ldyBBcHBcblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuIiwie2RhdGFiYXNlfSA9IHJlcXVpcmUgJ2RhdGFiYXNlJ1xuXG5cblxuIyBcdCA4ODg4ODg4OGIgZFBcbiMgXHQgODggICAgICAgIDg4XG4jIFx0YTg4YWFhYSAgICA4OCAuZDg4ODhiLiBkUCAgZFAgIGRQXG4jIFx0IDg4ICAgICAgICA4OCA4OCcgIGA4OCA4OCAgODggIDg4XG4jIFx0IDg4ICAgICAgICA4OCA4OC4gIC44OCA4OC44OGIuODgnXG4jIFx0IGRQICAgICAgICBkUCBgODg4ODhQJyA4ODg4UCBZOFBcbiBcdFxuXG5leHBvcnRzLmZsb3cgPSBmbG93ID0gbmV3IG1kLkFwcFxuXHR0aGVtZTogJ2RhdSdcblx0Zm9vdGVyOiBmYWxzZVxuXHRhbmltYXRpb25PcHRpb25zOiB7Y3VydmU6IFwic3ByaW5nKDMwMCwgMzUsIDApXCJ9XG5cblxuXG5cblxuXG4jIFx0ODg4OGJhLjg4YmEgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA4ODg4ODhiYSAgICAgICAgICAgICBkUCAgICAgZFBcbiMgXHQ4OCAgYDhiICBgOGIgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDg4ICAgIGA4YiAgICAgICAgICAgIDg4ICAgICA4OFxuIyBcdDg4ICAgODggICA4OCAuZDg4ODhiLiA4OGQ4ODhiLiBkUCAgICBkUCBhODhhYWFhOFAnIGRQICAgIGRQIGQ4ODg4UCBkODg4OFAgLmQ4ODg4Yi4gODhkODg4Yi5cbiMgXHQ4OCAgIDg4ICAgODggODhvb29vZDggODgnICBgODggODggICAgODggIDg4ICAgYDhiLiA4OCAgICA4OCAgIDg4ICAgICA4OCAgIDg4JyAgYDg4IDg4JyAgYDg4XG4jIFx0ODggICA4OCAgIDg4IDg4LiAgLi4uIDg4ICAgIDg4IDg4LiAgLjg4ICA4OCAgICAuODggODguICAuODggICA4OCAgICAgODggICA4OC4gIC44OCA4OCAgICA4OFxuIyBcdGRQICAgZFAgICBkUCBgODg4ODhQJyBkUCAgICBkUCBgODg4ODhQJyAgODg4ODg4ODhQIGA4ODg4OFAnICAgZFAgICAgIGRQICAgYDg4ODg4UCcgZFAgICAgZFBcblxuXG5jbGFzcyBNZW51QnV0dG9uIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cdFx0XG5cdFx0QF9pY29uID0gb3B0aW9ucy5pY29uID8gJ2Jvb2snXG5cdFx0QF90ZXh0ID0gb3B0aW9ucy50ZXh0ID8gJ0RlZmF1bHQnXG5cdFx0QF9hY3Rpb24gPSBvcHRpb25zLmFjdGlvbiA/IC0+IG51bGxcblxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdGhlaWdodDogNDgsIHdpZHRoOiAzMDRcblx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXG5cdFx0QGljb25MYXllciA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEBcblx0XHRcdHk6IEFsaWduLmNlbnRlclxuXHRcdFx0aGVpZ2h0OiAzMiwgd2lkdGg6IDMyXG5cdFx0XHRpbnZlcnQ6IDEwMFxuXHRcdFx0aW1hZ2U6IEBfaWNvblxuXG5cdFx0QGxhYmVsTGF5ZXIgPSBuZXcgVGV4dExheWVyXG5cdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQFxuXHRcdFx0eTogQWxpZ24uY2VudGVyLCB4OiBAaWNvbkxheWVyLm1heFggKyAxNlxuXHRcdFx0d2lkdGg6IDEwMFxuXHRcdFx0Zm9udEZhbWlseTogJ1N0cmF0b3MnXG5cdFx0XHRmb250U2l6ZTogMTRcblx0XHRcdHRleHRBbGlnbjogJ2xlZnQnXG5cdFx0XHRjb2xvcjogJyNGRkYnXG5cdFx0XHR0ZXh0OiBcIiN7QF90ZXh0fVwiXG5cblx0XHRAb25UYXAgQF9hY3Rpb25cblx0XHRAb25UYXAgLT4gXG5cdFx0XHRVdGlscy5kZWxheSAuMjUsID0+IEBwYXJlbnQuaGlkZSgpXG5cblxuXG5cblxuXG4jICAgIDg4ODg4OGJhICAgICAgICAgICAgICAgICAgICBkUCAgICAgICBkUCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkUCAgODg4ODg4YmEgICAgICAgICAgICAgZFAgICAgIGRQICAgICAgICAgICAgICAgICAgICBcbiMgICAgODggICAgYDhiICAgICAgICAgICAgICAgICAgIDg4ICAgICAgIDg4ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDg4ICA4OCAgICBgOGIgICAgICAgICAgICA4OCAgICAgODggICAgICAgICAgICAgICAgICAgIFxuIyAgICA4OCAgICAgODggLmQ4ODg4Yi4gLmQ4ODg4Yi4gODhkODg4Yi4gODhkODg4Yi4gLmQ4ODg4Yi4gLmQ4ODg4Yi4gODhkODg4Yi4gLmQ4ODhiODggYTg4YWFhYThQJyBkUCAgICBkUCBkODg4OFAgZDg4ODhQIC5kODg4OGIuIDg4ZDg4OGIuXG4jICAgIDg4ICAgICA4OCA4OCcgIGA4OCBZOG9vb29vLiA4OCcgIGA4OCA4OCcgIGA4OCA4OCcgIGA4OCA4OCcgIGA4OCA4OCcgIGA4OCA4OCcgIGA4OCAgODggICBgOGIuIDg4ICAgIDg4ICAgODggICAgIDg4ICAgODgnICBgODggODgnICBgODhcbiMgICAgODggICAgLjhQIDg4LiAgLjg4ICAgICAgIDg4IDg4ICAgIDg4IDg4LiAgLjg4IDg4LiAgLjg4IDg4LiAgLjg4IDg4ICAgICAgIDg4LiAgLjg4ICA4OCAgICAuODggODguICAuODggICA4OCAgICAgODggICA4OC4gIC44OCA4OCAgICA4OFxuIyAgICA4ODg4ODg4UCAgYDg4ODg4UDggYDg4ODg4UCcgZFAgICAgZFAgODhZODg4OCcgYDg4ODg4UCcgYDg4ODg4UDggZFAgICAgICAgYDg4ODg4UDggIDg4ODg4ODg4UCBgODg4ODhQJyAgIGRQICAgICBkUCAgIGA4ODg4OFAnIGRQICAgIGRQXG5cblxuZXhwb3J0cy5EYXNoYm9hcmRCdXR0b24gPSBjbGFzcyBEYXNoYm9hcmRCdXR0b24gZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblx0XHRcblx0XHRAX2ljb24gPSBvcHRpb25zLmljb24gPyAnYm9vaydcblx0XHRAX3RleHQgPSBvcHRpb25zLnRleHQgPyAnRGVmYXVsdCdcblx0XHRAX2FjdGlvbiA9IG9wdGlvbnMuYWN0aW9uID8gLT4gbnVsbFxuXG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHRoZWlnaHQ6IDEwMCwgd2lkdGg6IDU2XG5cblx0XHRAaWNvbkxheWVyID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQFxuXHRcdFx0eDogQWxpZ24uY2VudGVyLCB5OiAwXG5cdFx0XHRoZWlnaHQ6IDcyLCB3aWR0aDogNzJcblx0XHRcdGludmVydDogMTAwXG5cdFx0XHRpbWFnZTogXCJpbWFnZXMvaWNvbnMvI3tAX2ljb259LnBuZ1wiXG5cblx0XHRAdGV4dExheWVyID0gbmV3IFRleHRMYXllclxuXHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEBcblx0XHRcdHk6IEBpY29uTGF5ZXIubWF4WSwgeDogQWxpZ24uY2VudGVyXG5cdFx0XHR3aWR0aDogMTAwXG5cdFx0XHRmb250RmFtaWx5OiAnU3RyYXRvcydcblx0XHRcdGZvbnRTaXplOiAxM1xuXHRcdFx0dGV4dEFsaWduOiAnY2VudGVyJ1xuXHRcdFx0Y29sb3I6ICcjRkZGJ1xuXHRcdFx0dGV4dDogXCIje0BfdGV4dH1cIlxuXG5cdFx0QG9uVGFwIEBfYWN0aW9uXG5cblxuXG5cblxuXG4jXHRkUCAgICAgICAgICAgICAgICAgICBvbyAgIGRQICAgICAgICAgICAgICBkUCAgIG9vICAgICAgICAgICAgICAgICAgXG4jIFx0ODggICAgICAgICAgICAgICAgICAgICAgICA4OCAgICAgICAgICAgICAgODggICAgICAgICAgICAgICAgICAgICAgIFxuI1x0ODggODhkODg4Yi4gZFAgICAuZFAgZFAgZDg4ODhQIC5kODg4OGIuIGQ4ODg4UCBkUCAuZDg4ODhiLiA4OGQ4ODhiLlxuIyBcdDg4IDg4JyAgYDg4IDg4ICAgZDgnIDg4ICAgODggICA4OCcgIGA4OCAgIDg4ICAgODggODgnICBgODggODgnICBgODhcbiMgXHQ4OCA4OCAgICA4OCA4OCAuODgnICA4OCAgIDg4ICAgODguICAuODggICA4OCAgIDg4IDg4LiAgLjg4IDg4ICAgIDg4XG4jIFx0ZFAgZFAgICAgZFAgODg4OFAnICAgZFAgICBkUCAgIGA4ODg4OFA4ICAgZFAgICBkUCBgODg4ODhQJyBkUCAgICBkUFxuXG5jbGFzcyBJbnZpdGF0aW9uIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBvcHRpb25zXG5cblxuXG5cblxuXG4jIFx0IDg4ODg4OGJhXG4jIFx0IDg4ICAgIGA4YlxuIyBcdGE4OGFhYWE4UCcgLmQ4ODg4Yi4gLmQ4ODg4Yi4gLmQ4ODg4Yi4gLmQ4ODg4Yi5cbiMgXHQgODggICAgICAgIDg4JyAgYDg4IDg4JyAgYDg4IDg4b29vb2Q4IFk4b29vb28uXG4jIFx0IDg4ICAgICAgICA4OC4gIC44OCA4OC4gIC44OCA4OC4gIC4uLiAgICAgICA4OFxuIyBcdCBkUCAgICAgICAgYDg4ODg4UDggYDg4ODhQODggYDg4ODg4UCcgYDg4ODg4UCdcbiMgXHQgICAgICAgICAgICAgICAgICAgICAgICAgLjg4XG4jIFx0ICAgICAgICAgICAgICAgICAgICAgZDg4ODhQXG5cbnBhZ2VzID0gW1xuXHR7dGl0bGU6ICdQcm9maWxlJywgaWNvbjogJ2FjY291bnQtY2lyY2xlJywgYWN0aW9uOiAtPiBcblx0XHRmbG93LnNob3dOZXh0KG5ldyBQcm9maWxlKX0sXG5cdHt0aXRsZTogJ0Jpb2dyYXBoaWVzJywgaWNvbjogJ2dyb3VwJywgYWN0aW9uOiAtPiBcblx0XHRmbG93LnNob3dOZXh0KG5ldyBCaW9ncmFwaGllcyl9LFxuXHR7dGl0bGU6ICdOb3RlcycsIGljb246ICdkcml2ZS1maWxlJywgYWN0aW9uOiAtPiBcblx0XHRmbG93LnNob3dOZXh0KG5ldyBOb3Rlcyl9LFxuXHR7dGl0bGU6ICdNdXNpYycsIGljb246ICdoZWFkc2V0JywgYWN0aW9uOiAtPiBcblx0XHRmbG93LnNob3dOZXh0KG5ldyBNdXNpYyl9LFxuXHR7dGl0bGU6ICdNYXAnLCBpY29uOiAnbWFwJywgYWN0aW9uOiAtPiBcblx0XHRmbG93LnNob3dOZXh0KG5ldyBNYXApfSxcblx0e3RpdGxlOiAnUmFkaW8nLCBpY29uOiAnd2lmaS10ZXRoZXJpbmcnLCBhY3Rpb246IC0+IFxuXHRcdGZsb3cuc2hvd05leHQobmV3IFJhZGlvKX0sXG5cdHt0aXRsZTogJ0Jvb2snLCBpY29uOiAnYm9vaycsIGFjdGlvbjogLT4gXG5cdFx0Zmxvdy5zaG93TmV4dChuZXcgQm9vayl9LFxuXHR7dGl0bGU6ICdIaXN0b3J5JywgaWNvbjogJ2RyaXZlLWRvY3VtZW50JywgYWN0aW9uOiAtPiBcblx0XHRmbG93LnNob3dOZXh0KG5ldyBIaXN0b3J5KX0sXG5cdHt0aXRsZTogJ0hlbHAnLCBpY29uOiAnd2FybmluZycsIGFjdGlvbjogLT4gXG5cdFx0Zmxvdy5zaG93TmV4dChuZXcgSGVscCl9LFxuXVxuXG5cblxuXG5cblxuIyAgICA4ODg4ODhiYSAgICAgICAgICAgICAgICAgICAgZFAgICAgICAgZFAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZFBcbiMgICAgODggICAgYDhiICAgICAgICAgICAgICAgICAgIDg4ICAgICAgIDg4ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDg4XG4jICAgIDg4ICAgICA4OCAuZDg4ODhiLiAuZDg4ODhiLiA4OGQ4ODhiLiA4OGQ4ODhiLiAuZDg4ODhiLiAuZDg4ODhiLiA4OGQ4ODhiLiAuZDg4OGI4OFxuIyAgICA4OCAgICAgODggODgnICBgODggWThvb29vby4gODgnICBgODggODgnICBgODggODgnICBgODggODgnICBgODggODgnICBgODggODgnICBgODhcbiMgICAgODggICAgLjhQIDg4LiAgLjg4ICAgICAgIDg4IDg4ICAgIDg4IDg4LiAgLjg4IDg4LiAgLjg4IDg4LiAgLjg4IDg4ICAgICAgIDg4LiAgLjg4XG4jICAgIDg4ODg4ODhQICBgODg4ODhQOCBgODg4ODhQJyBkUCAgICBkUCA4OFk4ODg4JyBgODg4ODhQJyBgODg4ODhQOCBkUCAgICAgICBgODg4ODhQOFxuXG5cbmNsYXNzIERhc2hib2FyZCBleHRlbmRzIG1kLlBhZ2Vcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0dGhlbWU6IGZsb3cudGhlbWVcblx0XHRcdGhlYWRlcjogXG5cdFx0XHRcdHRpdGxlOiAnRGFzaGJvYXJkJywgXG5cdFx0XHRcdHZpc2libGU6IHRydWUsIFxuXHRcdFx0XHRpY29uOiAnbWVudScsIFxuXHRcdFx0XHRpY29uQWN0aW9uOiAtPiBtZW51T3ZlcmxheS5zaG93KClcblxuXHRcdE1BUkdJTiA9IDQ4XG5cdFx0Uk9XX0hFSUdIVCA9IDEwNFxuXG5cdFx0QHByb2ZpbGVCdXR0b24gPSBuZXcgRGFzaGJvYXJkQnV0dG9uXG5cdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQFxuXHRcdFx0eDogTUFSR0lOLCB5OiBST1dfSEVJR0hUXG5cdFx0XHRpY29uOiAnYWNjb3VudC1jaXJjbGUnXG5cdFx0XHR0ZXh0OiAnUHJvZmlsZSdcblx0XHRcdGFjdGlvbjogLT4gZmxvdy5zaG93TmV4dChuZXcgUHJvZmlsZSlcblxuXHRcdEBiaW9zQnV0dG9uID0gbmV3IERhc2hib2FyZEJ1dHRvblxuXHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEBcblx0XHRcdHg6IEFsaWduLmNlbnRlciwgeTogUk9XX0hFSUdIVFxuXHRcdFx0aWNvbjogJ2dyb3VwJ1xuXHRcdFx0dGV4dDogJ0Jpb2dyYXBoaWVzJ1xuXHRcdFx0YWN0aW9uOiAtPiBmbG93LnNob3dOZXh0KG5ldyBCaW9ncmFwaGllcylcblxuXHRcdEBub3Rlc0J1dHRvbiA9IG5ldyBEYXNoYm9hcmRCdXR0b25cblx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBAXG5cdFx0XHR4OiBBbGlnbi5yaWdodCgtTUFSR0lOKSwgeTogUk9XX0hFSUdIVFxuXHRcdFx0aWNvbjogJ2RyaXZlLWZpbGUnXG5cdFx0XHR0ZXh0OiAnTm90ZXMnXG5cdFx0XHRhY3Rpb246IC0+IGZsb3cuc2hvd05leHQobmV3IE5vdGVzKVxuXG5cdFx0QGhlYWRzZXRCdXR0b24gPSBuZXcgRGFzaGJvYXJkQnV0dG9uXG5cdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQFxuXHRcdFx0eDogTUFSR0lOLCB5OiBST1dfSEVJR0hUICogMlxuXHRcdFx0aWNvbjogJ2hlYWRzZXQnXG5cdFx0XHR0ZXh0OiAnTXVzaWMnXG5cdFx0XHRhY3Rpb246IC0+IGZsb3cuc2hvd05leHQobmV3IE11c2ljKVxuXG5cdFx0QG1hcEJ1dHRvbiA9IG5ldyBEYXNoYm9hcmRCdXR0b25cblx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBAXG5cdFx0XHR4OiBBbGlnbi5jZW50ZXIsIHk6IFJPV19IRUlHSFQgKiAyXG5cdFx0XHRpY29uOiAnbWFwJ1xuXHRcdFx0dGV4dDogJ01hcCdcblx0XHRcdGFjdGlvbjogLT4gZmxvdy5zaG93TmV4dChuZXcgTWFwKVxuXG5cdFx0QHJhZGlvQnV0dG9uID0gbmV3IERhc2hib2FyZEJ1dHRvblxuXHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEBcblx0XHRcdHg6IEFsaWduLnJpZ2h0KC1NQVJHSU4pLCB5OiBST1dfSEVJR0hUICogMlxuXHRcdFx0aWNvbjogJ3dpZmktdGV0aGVyaW5nJ1xuXHRcdFx0dGV4dDogJ1JhZGlvJ1xuXHRcdFx0YWN0aW9uOiAtPiBmbG93LnNob3dOZXh0KG5ldyBSYWRpbylcblxuXHRcdEBib29rQnV0dG9uID0gbmV3IERhc2hib2FyZEJ1dHRvblxuXHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEBcblx0XHRcdHg6IE1BUkdJTiwgeTogUk9XX0hFSUdIVCAqIDNcblx0XHRcdGljb246ICdib29rJ1xuXHRcdFx0dGV4dDogJ0Jvb2snXG5cdFx0XHRhY3Rpb246IC0+IGZsb3cuc2hvd05leHQobmV3IEJvb2spXG5cblx0XHRAaGlzdG9yeUJ1dHRvbiA9IG5ldyBEYXNoYm9hcmRCdXR0b25cblx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBAXG5cdFx0XHR4OiBBbGlnbi5jZW50ZXIsIHk6IFJPV19IRUlHSFQgKiAzXG5cdFx0XHRpY29uOiAnZHJpdmUtZG9jdW1lbnQnXG5cdFx0XHR0ZXh0OiAnSGlzdG9yeSdcblx0XHRcdGFjdGlvbjogLT4gZmxvdy5zaG93TmV4dChuZXcgSGlzdG9yeSlcblxuXHRcdEBoZWxwQnV0dG9uID0gbmV3IERhc2hib2FyZEJ1dHRvblxuXHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEBcblx0XHRcdHg6IEFsaWduLnJpZ2h0KC1NQVJHSU4pLCB5OiBST1dfSEVJR0hUICogM1xuXHRcdFx0aWNvbjogJ3dhcm5pbmcnXG5cdFx0XHR0ZXh0OiAnSGVscCdcblx0XHRcdGFjdGlvbjogLT4gZmxvdy5zaG93TmV4dChuZXcgSGVscClcblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuIyBcdDg4ODhiYS44OGJhICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLjg4ODg4LiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZFAgICAgICAgICAgICAgICAgICBcbiMgXHQ4OCAgYDhiICBgOGIgICAgICAgICAgICAgICAgICAgICAgICAgICAgZDgnICAgYDhiICAgICAgICAgICAgICAgICAgICAgICAgICAgIDg4ICAgICAgICAgICAgICAgICAgXG4jIFx0ODggICA4OCAgIDg4IC5kODg4OGIuIDg4ZDg4OGIuIGRQICAgIGRQIDg4ICAgICA4OCBkUCAgIC5kUCAuZDg4ODhiLiA4OGQ4ODhiLiA4OCAuZDg4ODhiLiBkUCAgICBkUFxuIyBcdDg4ICAgODggICA4OCA4OG9vb29kOCA4OCcgIGA4OCA4OCAgICA4OCA4OCAgICAgODggODggICBkOCcgODhvb29vZDggODgnICBgODggODggODgnICBgODggODggICAgODhcbiMgXHQ4OCAgIDg4ICAgODggODguICAuLi4gODggICAgODggODguICAuODggWTguICAgLjhQIDg4IC44OCcgIDg4LiAgLi4uIDg4ICAgICAgIDg4IDg4LiAgLjg4IDg4LiAgLjg4XG4jIFx0ZFAgICBkUCAgIGRQIGA4ODg4OFAnIGRQICAgIGRQIGA4ODg4OFAnICBgODg4OFAnICA4ODg4UCcgICBgODg4ODhQJyBkUCAgICAgICBkUCBgODg4ODhQOCBgODg4OFA4OFxuIyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLjg4XG4jICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGQ4ODg4UCBcblxuY2xhc3MgTWVudU92ZXJsYXkgZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblx0XHRzdXBlciBfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRoZWlnaHQ6IFNjcmVlbi5oZWlnaHRcblx0XHRcdHdpZHRoOiAzMDRcblx0XHRcdGhlaWdodDogU2NyZWVuLmhlaWdodFxuXHRcdFx0dmlzaWJsZTogZmFsc2Vcblx0XHRcdGJhY2tncm91bmRDb2xvcjogJyMzMDMwMzAnXG5cdFx0XHRhbmltYXRpb25PcHRpb25zOiB7Y3VydmU6IFwic3ByaW5nKDMwMCwgMzUsIDApXCJ9XG5cblx0XHRAc2NyaW0gPSBuZXcgTGF5ZXJcblx0XHRcdG5hbWU6ICcuJywgXG5cdFx0XHRzaXplOiBTY3JlZW4uc2l6ZVxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiAncmdiYSgwLDAsMCwuOCknXG5cdFx0XHRvcGFjaXR5OiAwXG5cdFx0XHR2aXNpYmxlOiBmYWxzZVxuXHRcdFx0YW5pbWF0aW9uT3B0aW9uczpcblx0XHRcdFx0dGltZTogLjI1XG5cblx0XHRAc2NyaW0ub25UYXAgPT4gQGhpZGUoKVxuXHRcdEBvblN3aXBlTGVmdEVuZCA9PiBAaGlkZSgpXG5cblx0XHRAdXNlclBob3RvID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQFxuXHRcdFx0d2lkdGg6IEB3aWR0aCwgaGVpZ2h0OiAxNzNcblx0XHRcdGltYWdlOiBkYXRhYmFzZS51c2VyLmltYWdlXG5cdFx0XHRicmlnaHRuZXNzOiA1MFxuXG5cdFx0QHVzZXJOYW1lID0gbmV3IG1kLlRpdGxlXG5cdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQFxuXHRcdFx0d2lkdGg6IEB3aWR0aFxuXHRcdFx0Zm9udFNpemU6IDI4XG5cdFx0XHRjb2xvcjogJyNGRkYnXG5cdFx0XHR4OiAxNiwgeTogMzJcblx0XHRcdHRleHQ6IGRhdGFiYXNlLnVzZXIubmFtZVxuXG5cdFx0QHVzZXJOYW1lLm1heFkgPSBAdXNlclBob3RvLm1heFkgLSAxNlxuXG5cdFx0bGlua3MgPSBbXVxuXG5cdFx0Zm9yIHBhZ2UsIGkgaW4gcGFnZXNcblx0XHRcdGxpbmtzW2ldID0gbmV3IE1lbnVCdXR0b25cblx0XHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEBcblx0XHRcdFx0eDogMTYsIHk6IDE4OSArICg0OCAqIGkpXG5cdFx0XHRcdHRleHQ6IHBhZ2UudGl0bGVcblx0XHRcdFx0aWNvbjogXCJpbWFnZXMvaWNvbnMvI3twYWdlLmljb259LnBuZ1wiXG5cdFx0XHRcdGFjdGlvbjogcGFnZS5hY3Rpb25cblxuXHRzaG93OiAtPlxuXHRcdEBicmluZ1RvRnJvbnQoKVxuXHRcdEB2aXNpYmxlID0gdHJ1ZVxuXHRcdEB4ID0gLVNjcmVlbi53aWR0aFxuXHRcdEBhbmltYXRlXG5cdFx0XHR4OiAwXG5cblx0XHRAc2NyaW0ucGxhY2VCZWhpbmQoQClcblx0XHRAc2NyaW0udmlzaWJsZSA9IHRydWVcblx0XHRAc2NyaW0uYW5pbWF0ZVxuXHRcdFx0b3BhY2l0eTogMVxuXG5cdGhpZGU6IC0+XG5cdFx0QGFuaW1hdGVcblx0XHRcdHg6IC1TY3JlZW4ud2lkdGhcblxuXHRcdEBzY3JpbS5hbmltYXRlXG5cdFx0XHRvcGFjaXR5OiAwXG5cblx0XHRVdGlscy5kZWxheSAuMywgPT5cblx0XHRcdEB2aXNpYmxlID0gZmFsc2Vcblx0XHRcdEBzY3JpbS52aXNpYmxlID0gZmFsc2Vcblx0XHRcdEBzZW5kVG9CYWNrKClcblx0XHRcdEBzY3JpbS5zZW5kVG9CYWNrKClcblxuXG5cblxuXG5cblxuIyBcdCA4ODg4ODhiYSAgICAgICAgICAgICAgICAgICAgLjg4ODhiIG9vIGRQXG4jIFx0IDg4ICAgIGA4YiAgICAgICAgICAgICAgICAgICA4OCAgIFwiICAgIDg4XG4jIFx0YTg4YWFhYThQJyA4OGQ4ODhiLiAuZDg4ODhiLiA4OGFhYSAgZFAgODggLmQ4ODg4Yi5cbiMgXHQgODggICAgICAgIDg4JyAgYDg4IDg4JyAgYDg4IDg4ICAgICA4OCA4OCA4OG9vb29kOFxuIyBcdCA4OCAgICAgICAgODggICAgICAgODguICAuODggODggICAgIDg4IDg4IDg4LiAgLi4uXG4jIFx0IGRQICAgICAgICBkUCAgICAgICBgODg4ODhQJyBkUCAgICAgZFAgZFAgYDg4ODg4UCdcblxuY2xhc3MgUHJvZmlsZSBleHRlbmRzIG1kLlBhZ2Vcblx0Y29uc3RydWN0b3I6IChvcHRpb25zKSAtPlxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdHRoZW1lOiBmbG93LnRoZW1lXG5cdFx0XHRoZWFkZXI6XG5cdFx0XHRcdHRpdGxlOiAnUHJvZmlsZSdcblx0XHRcdFx0dmlzaWJsZTogdHJ1ZSwgXG5cdFx0XHRcdGljb246ICdhcnJvdy1iYWNrJywgXG5cdFx0XHRcdGljb25BY3Rpb246IC0+IFxuXHRcdFx0XHRcdGZsb3cuc2hvd1ByZXZpb3VzKClcblx0XHRcdFx0XHRAZGVzdHJveSgpXG5cblxuXG5cblxuXG4jXHQgIDg4ODg4OGJhICBvbyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkUCAgICAgICBvb1xuI1x0ICA4OCAgICBgOGIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgODhcbiNcdCBhODhhYWFhOFAnIGRQIC5kODg4OGIuIC5kODg4OGIuIDg4ZDg4OGIuIC5kODg4OGIuIDg4ZDg4OGIuIDg4ZDg4OGIuIGRQIC5kODg4OGIuIC5kODg4OGIuXG4jXHQgIDg4ICAgYDhiLiA4OCA4OCcgIGA4OCA4OCcgIGA4OCA4OCcgIGA4OCA4OCcgIGA4OCA4OCcgIGA4OCA4OCcgIGA4OCA4OCA4OG9vb29kOCBZOG9vb29vLlxuI1x0ICA4OCAgICAuODggODggODguICAuODggODguICAuODggODggICAgICAgODguICAuODggODguICAuODggODggICAgODggODggODguICAuLi4gICAgICAgODhcbiNcdCAgODg4ODg4ODhQIGRQIGA4ODg4OFAnIGA4ODg4UDg4IGRQICAgICAgIGA4ODg4OFA4IDg4WTg4OFAnIGRQICAgIGRQIGRQIGA4ODg4OFAnIGA4ODg4OFAnXG4jXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC44OCAgICAgICAgICAgICAgICAgICA4OFxuI1x0ICAgICAgICAgICAgICAgICAgICAgICAgIGQ4ODg4UCAgICAgICAgICAgICAgICAgICAgZFBcblxuY2xhc3MgQmlvZ3JhcGhpZXMgZXh0ZW5kcyBtZC5QYWdlXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdHRoZW1lOiBmbG93LnRoZW1lXG5cdFx0XHRoZWFkZXI6XG5cdFx0XHRcdHRpdGxlOiAnQmlvZ3JhcGhpZXMnXG5cdFx0XHRcdHZpc2libGU6IHRydWUsIFxuXHRcdFx0XHRpY29uOiAnYXJyb3ctYmFjaycsIFxuXHRcdFx0XHRpY29uQWN0aW9uOiAtPiBcblx0XHRcdFx0XHRmbG93LnNob3dQcmV2aW91cygpXG5cdFx0XHRcdFx0QGRlc3Ryb3koKVxuXG5cblxuXG5cblxuI1x0ICA4ODg4ODhiYSAgb29cbiNcdCAgODggICAgYDhiXG4jXHQgYTg4YWFhYThQJyBkUCAuZDg4ODhiLlxuI1x0ICA4OCAgIGA4Yi4gODggODgnICBgODhcbiNcdCAgODggICAgLjg4IDg4IDg4LiAgLjg4XG4jXHQgIDg4ODg4ODg4UCBkUCBgODg4ODhQJ1xuXG5cblxuY2xhc3MgQmlvZ3JhcGhpZXNGb2N1cyBleHRlbmRzIG1kLlBhZ2Vcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cblx0XHRAX3NvdXJjZSA9IG9wdGlvbnMuc291cmNlID8ge3RpdGxlOiAnRGVmYXVsdCd9XG5cblx0XHRzdXBlciBfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHR0aGVtZTogZmxvdy50aGVtZVxuXHRcdFx0aGVhZGVyOlxuXHRcdFx0XHR0aXRsZTogXCIje0Bfc291cmNlLnRpdGxlfVwiXG5cdFx0XHRcdHZpc2libGU6IHRydWUsIFxuXHRcdFx0XHRpY29uOiAnYXJyb3ctYmFjaycsIFxuXHRcdFx0XHRpY29uQWN0aW9uOiAtPiBcblx0XHRcdFx0XHRmbG93LnNob3dQcmV2aW91cygpXG5cdFx0XHRcdFx0QGRlc3Ryb3koKVxuXG5cblxuXG5cblxuIyBcdDg4ODg4OGJhICAgICAgICAgICAgIGRQICAgICAgICAgICAgICAgICAgICBcbiMgXHQ4OCAgICBgOGIgICAgICAgICAgICA4OCAgICAgICAgICAgICAgICAgICAgXG4jIFx0ODggICAgIDg4IC5kODg4OGIuIGQ4ODg4UCAuZDg4ODhiLiAuZDg4ODhiLlxuIyBcdDg4ICAgICA4OCA4OCcgIGA4OCAgIDg4ICAgODhvb29vZDggWThvb29vby5cbiMgXHQ4OCAgICAgODggODguICAuODggICA4OCAgIDg4LiAgLi4uICAgICAgIDg4XG4jIFx0ZFAgICAgIGRQIGA4ODg4OFAnICAgZFAgICBgODg4ODhQJyBgODg4ODhQJ1xuXG5cbmNsYXNzIE5vdGVzIGV4dGVuZHMgbWQuUGFnZVxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblxuXHRcdEBfdGV4dCA9IGRhdGFiYXNlLnVzZXIubm90ZVxuXG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0dGhlbWU6IGZsb3cudGhlbWVcblx0XHRcdGhlYWRlcjpcblx0XHRcdFx0dGl0bGU6ICdOb3Rlcydcblx0XHRcdFx0dmlzaWJsZTogdHJ1ZSwgXG5cdFx0XHRcdGljb246ICdhcnJvdy1iYWNrJywgXG5cdFx0XHRcdGljb25BY3Rpb246IC0+IFxuXHRcdFx0XHRcdGZsb3cuc2hvd1ByZXZpb3VzKClcblx0XHRcdFx0XHRAZGVzdHJveSgpXG5cblx0XHRAdGV4dEZpZWxkID0gbmV3IExheWVyXG5cdFx0XHRwYXJlbnQ6IEBcblx0XHRcdHg6IDE2LCB5OiAxMDBcblx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFx0aHRtbDogXCJcIlwiXG5cdFx0XHQ8dGV4dGFyZWEgbmFtZT1cInRleHRhcmVhXCIgY2xhc3M9XCJ0ZXh0YXJlYVwiIHN0eWxlPVwiXG5cdFx0XHRcdGJhY2tncm91bmQtY29sb3I6ICMwMDAwMDA7XG5cdFx0XHRcdHdpZHRoOiAzMjBweDtcblx0XHRcdFx0aGVpZ2h0OiA1MDBweDtcblx0XHRcdFx0Zm9udC1mYW1pbHk6IFN0cmF0b3M7XG5cdFx0XHRcdGZvbnQtc2l6ZTogMTZweDtcblx0XHRcdFx0Zm9udC13ZWlnaHQ6IDQwMDtcblx0XHRcdFx0Y29sb3I6ICNGRkZGRkY7XG5cdFx0XHRcdGxpbmUtaGVpZ2h0OiAyMHB4O1xuXHRcdFx0XHRib3JkZXI6IG5vbmU7XG5cdFx0XHRcdG91dGxpbmU6IG5vbmU7IFxuXHRcdFx0XHRcIj5cblx0XHRcdFx0I3tAX3RleHR9XG5cdFx0XHQ8L3RleHRhcmVhPlxuXHRcdFwiXCJcIlxuXG5cdFx0QHRleHRBcmVhID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi50ZXh0YXJlYVwiKVswXVxuXG5cblx0XHRAb24gXCJrZXl1cFwiLCA9PlxuXHRcdFx0ZGF0YWJhc2UudXNlci5ub3RlID0gQHRleHRBcmVhLnZhbHVlXG5cblxuXG4jIFx0ODg4OGJhLjg4YmEgICAgICAgICAgICAgICAgICAgIG9vXG4jIFx0ODggIGA4YiAgYDhiXG4jIFx0ODggICA4OCAgIDg4IGRQICAgIGRQIC5kODg4OGIuIGRQIC5kODg4OGIuXG4jIFx0ODggICA4OCAgIDg4IDg4ICAgIDg4IFk4b29vb28uIDg4IDg4JyAgYFwiXCJcbiMgXHQ4OCAgIDg4ICAgODggODguICAuODggICAgICAgODggODggODguICAuLi5cbiMgXHRkUCAgIGRQICAgZFAgYDg4ODg4UCcgYDg4ODg4UCcgZFAgYDg4ODg4UCdcblxuY2xhc3MgTXVzaWMgZXh0ZW5kcyBtZC5QYWdlXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdHRoZW1lOiBmbG93LnRoZW1lXG5cdFx0XHRoZWFkZXI6XG5cdFx0XHRcdHRpdGxlOiAnTXVzaWMnXG5cdFx0XHRcdHZpc2libGU6IHRydWUsIFxuXHRcdFx0XHRpY29uOiAnYXJyb3ctYmFjaycsIFxuXHRcdFx0XHRpY29uQWN0aW9uOiAtPiBcblx0XHRcdFx0XHRmbG93LnNob3dQcmV2aW91cygpXG5cdFx0XHRcdFx0QGRlc3Ryb3koKVxuXG5cdFx0QG11c2ljSWNvbiA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEBcblx0XHRcdGhlaWdodDogMTUyLCB3aWR0aDogMTUyXG5cdFx0XHR4OiBBbGlnbi5jZW50ZXIsIHk6IEFsaWduLmNlbnRlcigtNjQpXG5cdFx0XHRpbWFnZTogJ2ltYWdlcy9pY29ucy9oZWFkc2V0LnBuZydcblx0XHRcdGludmVydDogMTAwXG5cblx0XHRAbXVzaWNEZXNjcmlwdGlvbjEgPSBuZXcgbWQuUmVndWxhclxuXHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEBcblx0XHRcdHg6IEFsaWduLmNlbnRlciwgeTogQG11c2ljSWNvbi5tYXhZXG5cdFx0XHRjb2xvcjogXCIjRkZGXCIsIHRleHRBbGlnbjogXCJjZW50ZXJcIlxuXHRcdFx0d2lkdGg6IDI4MFxuXHRcdFx0dGV4dDogJ1lvdXIgbXVzaWMgaXMgY29tcG9zZWQgYmFzZWQg4oCob24gd2hhdCB3ZSBrbm93IGFib3V0IHlvdS4nXG5cblx0XHRAbXVzaWNEZXNjcmlwdGlvbjIgPSBuZXcgbWQuUmVndWxhclxuXHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEBcblx0XHRcdHg6IEFsaWduLmNlbnRlciwgeTogQG11c2ljRGVzY3JpcHRpb24xLm1heFkgKyAxNlxuXHRcdFx0Y29sb3I6IFwiI0ZGRlwiLCB0ZXh0QWxpZ246IFwiY2VudGVyXCJcblx0XHRcdHdpZHRoOiAyODBcblx0XHRcdHRleHQ6ICcgSXQgaXMgdW5pcXVlIHRvIHlvdS4nXG5cblx0XHRAbXVzaWNEZXNjcmlwdGlvbjMgPSBuZXcgbWQuUmVndWxhclxuXHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEBcblx0XHRcdHg6IEFsaWduLmNlbnRlciwgeTogQG11c2ljRGVzY3JpcHRpb24yLm1heFkgKyAxNlxuXHRcdFx0Y29sb3I6IFwiI0ZGRlwiLCB0ZXh0QWxpZ246IFwiY2VudGVyXCJcblx0XHRcdHdpZHRoOiAyNDBcblx0XHRcdHRleHQ6ICcgSWYgeW91IGRvIG5vdCBlbmpveSB3aGF0IOKAqHlvdSBoZWFyLCBwbGVhc2UgY2hhbmdlLidcblxuXG5cblxuXG4jIFx0ODg4OGJhLjg4YmFcbiMgXHQ4OCAgYDhiICBgOGJcbiMgXHQ4OCAgIDg4ICAgODggLmQ4ODg4Yi4gODhkODg4Yi5cbiMgXHQ4OCAgIDg4ICAgODggODgnICBgODggODgnICBgODhcbiMgXHQ4OCAgIDg4ICAgODggODguICAuODggODguICAuODhcbiMgXHRkUCAgIGRQICAgZFAgYDg4ODg4UDggODhZODg4UCdcbiMgXHQgICAgICAgICAgICAgICAgICAgICAgODhcbiMgXHQgICAgICAgICAgICAgICAgICAgICAgZFBcblxuY2xhc3MgTWFwIGV4dGVuZHMgbWQuUGFnZVxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMpIC0+XG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0dGhlbWU6IGZsb3cudGhlbWVcblx0XHRcdGhlYWRlcjpcblx0XHRcdFx0dGl0bGU6ICdNYXAnXG5cdFx0XHRcdHZpc2libGU6IHRydWUsIFxuXHRcdFx0XHRpY29uOiAnYXJyb3ctYmFjaycsIFxuXHRcdFx0XHRpY29uQWN0aW9uOiAtPiBcblx0XHRcdFx0XHRmbG93LnNob3dQcmV2aW91cygpXG5cdFx0XHRcdFx0QGRlc3Ryb3koKVxuXHRcdFxuXHRcdEBtYXAgPSBuZXcgTGF5ZXJcblx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBAXG5cdFx0XHRzaXplOiBAc2l6ZVxuXHRcdFx0c2NhbGU6IDEuNVxuXHRcdFx0YnJpZ2h0bmVzczogODBcblx0XHRcdGltYWdlOiAnaW1hZ2VzL21hcC5wbmcnXG5cblx0XHRAbWFwLmRyYWdnYWJsZSA9IHRydWVcblxuXHRcdEBmaW5kTWVCb3ggPSBuZXcgTGF5ZXJcblx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBAXG5cdFx0XHR4OiBBbGlnbi5yaWdodCgtOCksIHk6IEFsaWduLmJvdHRvbSgtMTc2KVxuXHRcdFx0d2lkdGg6IDQ4LCBoZWlnaHQ6IDQ4XG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6ICcjZWZlZmVmJ1xuXHRcdFx0Ym9yZGVyUmFkaXVzOiAyNFxuXG5cdFx0QGZpbmRNZSA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEBmaW5kTWVCb3hcblx0XHRcdHg6IEFsaWduLmNlbnRlciwgeTogQWxpZ24uY2VudGVyXG5cdFx0XHR3aWR0aDogNDAsIGhlaWdodDogNDBcblx0XHRcdGltYWdlOiAnaW1hZ2VzL2ljb25zL3JhZGlvLWJ1dHRvbi1vbi5wbmcnXG5cblx0XHRAem9vbUJveCA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEBcblx0XHRcdHg6IEFsaWduLnJpZ2h0KC04KSwgeTogQWxpZ24uYm90dG9tKC02NClcblx0XHRcdHdpZHRoOiA0OCwgaGVpZ2h0OiA5NlxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiAnI2VmZWZlZidcblx0XHRcdGJvcmRlclJhZGl1czogMjRcblxuXHRcdEB6b29tSW4gPSBuZXcgTGF5ZXJcblx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBAem9vbUJveFxuXHRcdFx0eDogQWxpZ24uY2VudGVyLCB5OiA4XG5cdFx0XHR3aWR0aDogNDAsIGhlaWdodDogNDBcblx0XHRcdGltYWdlOiAnaW1hZ2VzL2ljb25zL2FkZC5wbmcnXG5cblx0XHRAem9vbU91dCA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEB6b29tQm94XG5cdFx0XHR4OiBBbGlnbi5jZW50ZXIsIHk6IEFsaWduLmJvdHRvbSgtOClcblx0XHRcdHdpZHRoOiA0MCwgaGVpZ2h0OiA0MFxuXHRcdFx0aW1hZ2U6ICdpbWFnZXMvaWNvbnMvcmVtb3ZlLnBuZydcblxuXG5cblxuXG4jXHQgODg4ODg4YmEgICAgICAgICAgICAgICAgIGRQIG9vXG4jXHQgIDg4ICAgIGA4YiAgICAgICAgICAgICAgICA4OFxuI1x0IGE4OGFhYWE4UCcgLmQ4ODg4Yi4gLmQ4ODhiODggZFAgLmQ4ODg4Yi5cbiNcdCAgODggICBgOGIuIDg4JyAgYDg4IDg4JyAgYDg4IDg4IDg4JyAgYDg4XG4jXHQgIDg4ICAgICA4OCA4OC4gIC44OCA4OC4gIC44OCA4OCA4OC4gIC44OFxuI1x0ICBkUCAgICAgZFAgYDg4ODg4UDggYDg4ODg4UDggZFAgYDg4ODg4UCdcblxuXG5cbmNsYXNzIFJhZGlvIGV4dGVuZHMgbWQuUGFnZVxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblx0XHRzdXBlciBfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHR0aGVtZTogZmxvdy50aGVtZVxuXHRcdFx0aGVhZGVyOlxuXHRcdFx0XHR0aXRsZTogJ1JhZGlvJ1xuXHRcdFx0XHR2aXNpYmxlOiB0cnVlLCBcblx0XHRcdFx0aWNvbjogJ2Fycm93LWJhY2snLCBcblx0XHRcdFx0aWNvbkFjdGlvbjogLT4gXG5cdFx0XHRcdFx0Zmxvdy5zaG93UHJldmlvdXMoKVxuXHRcdFx0XHRcdEBkZXN0cm95KClcblxuXHRcdEByYWRpb0ljb24gPSBuZXcgTGF5ZXJcblx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBAXG5cdFx0XHRoZWlnaHQ6IDE1Miwgd2lkdGg6IDE1MlxuXHRcdFx0eDogQWxpZ24uY2VudGVyLCB5OiBBbGlnbi5jZW50ZXIoLTY0KVxuXHRcdFx0aW1hZ2U6ICdpbWFnZXMvaWNvbnMvd2lmaS10ZXRoZXJpbmcucG5nJ1xuXHRcdFx0aW52ZXJ0OiAxMDBcblxuXHRcdEByYWRpb0xhYmVsID0gbmV3IG1kLlJlZ3VsYXJcblx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBAXG5cdFx0XHR4OiBBbGlnbi5jZW50ZXIsIHk6IEByYWRpb0ljb24ubWF4WVxuXHRcdFx0Y29sb3I6IFwiI0ZGRlwiLCB0ZXh0QWxpZ246IFwiY2VudGVyXCJcblx0XHRcdHRleHQ6ICdTZWFyY2hpbmcgZm9yIHNpZ25hbC4uLidcblxuXHRcdEByYWRpb0Rlc2NyaXB0aW9uID0gbmV3IG1kLlJlZ3VsYXJcblx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBAXG5cdFx0XHR4OiBBbGlnbi5jZW50ZXIsIHk6IEByYWRpb0xhYmVsLm1heFkgKyAzMlxuXHRcdFx0Y29sb3I6IFwiI0ZGRlwiLCB0ZXh0QWxpZ246IFwiY2VudGVyXCJcblx0XHRcdHdpZHRoOiAyMDBcblx0XHRcdHRleHQ6ICdSYWRpbyBpcyBvbmx5IGF2YWlsYWJsZSBpbiDigKhjZXJ0YWluIGFyZWFzIG9mIHRoZSBTcGFjZS4nXG5cblxuXG4jIFx0IDg4ODg4OGJhICAgICAgICAgICAgICAgICAgICBkUFxuIyBcdCA4OCAgICBgOGIgICAgICAgICAgICAgICAgICAgODhcbiMgXHRhODhhYWFhOFAnIC5kODg4OGIuIC5kODg4OGIuIDg4ICAuZFBcbiMgXHQgODggICBgOGIuIDg4JyAgYDg4IDg4JyAgYDg4IDg4ODg4XCJcbiMgXHQgODggICAgLjg4IDg4LiAgLjg4IDg4LiAgLjg4IDg4ICBgOGIuXG4jIFx0IDg4ODg4ODg4UCBgODg4ODhQJyBgODg4ODhQJyBkUCAgIGBZUFxuIyBcdFxuIyBcdFxuXG5jbGFzcyBCb29rIGV4dGVuZHMgbWQuUGFnZVxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblx0XHRzdXBlciBfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHR0aGVtZTogZmxvdy50aGVtZVxuXHRcdFx0aGVhZGVyOlxuXHRcdFx0XHR0aXRsZTogJ0Jvb2snXG5cdFx0XHRcdHZpc2libGU6IHRydWUsIFxuXHRcdFx0XHRpY29uOiAnYXJyb3ctYmFjaycsIFxuXHRcdFx0XHRpY29uQWN0aW9uOiAtPiBcblx0XHRcdFx0XHRmbG93LnNob3dQcmV2aW91cygpXG5cdFx0XHRcdFx0QGRlc3Ryb3koKVxuXG5cdFx0QGJvb2tGbG93ID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQGNvbnRlbnRcblx0XHRcdHg6IDE2LCB5OiA5NlxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHR3aWR0aDogQHdpZHRoIC0gMzJcblx0XHRcdGhlaWdodDogQGhlaWdodCAqIDJcblx0XHRcblx0XHRAYm9va0Zsb3cuc3R5bGUgPVxuXHRcdFx0Zm9udEZhbWlseTogJ1N0cmF0b3MnXG5cdFx0XHRmb250U2l6ZTogJzE2cHgnXG5cdFx0XHRsaW5lSGVpZ2h0OiAnMS40J1xuXHRcdFx0Y29sb3I6ICcjRkZGJ1xuXHRcdFxuXHRcdEBib29rRmxvdy5odG1sID0gXCJcIlwiRkFERSBJTjo8YnI+PGJyPlxuMSBJTlQuIFdBU0hJTkdUT04gTVVTRVVNIC0gREFZIDE8YnI+PGJyPlxuVGhlIHNhZGRlc3QgZXllcyB5b3UgZXZlciBzYXcuXG5XZSBhcmUgbG9va2luZyBhdCBhbiBFbCBHcmVjbyBkcmF3aW5nLiBJdCBpcyBhIHN0dWR5IGZvclxub25lIG9mIGhpcyBwYWludGluZ3MuPGJyPjxicj5cblBVTEwgQkFDSyBUTyBSRVZFQUwgLS08YnI+PGJyPlxuQSBidW5jaCBvZiBhcnQgc3R1ZGVudHMgYXJlIGRvaW5nIHNrZXRjaGVzIG9mIHRoZSBleWVzLFxudGhlIGVsb25nYXRlZCBmaW5nZXJzLCB0aGUgc2xlbmRlciBoYW5kcyBFbCBHcmVjbyBkcmV3IHNvXG5icmlsbGlhbnRseS48YnI+PGJyPlxuTW9zdCBvZiB0aGUgc3R1ZGVudHMgYXJlIGFyb3VuZCAyMC4gQSBjb3VwbGUgb2Ygc3VidXJiYW5cbmhvdXNld2l2ZXMgYXJlIHRoZXJlIHRvby5cbkFuZCBvbmUgb2xkZXIgbWFuLjxicj48YnI+XG5UaGlzIGlzIExVVEhFUiBXSElUTkVZLiBNaWQgNjBzLCB2ZXJ5IGZpdCwgbmVhdGx5XG5kcmVzc2VkLiBBdCBxdWljayBnbGFuY2UsIGhlIHNlZW1zIGFzIGlmIGhlIG1pZ2h0IGJlIGFcbnN1Y2Nlc3NmdWwgY29tcGFueSBleGVjdXRpdmUuPGJyPjxicj5cbkFzIHdlIHdhdGNoIGhpbSBkcmF3IHdlIGNhbiB0ZWxsIGhlIGlzIGNhcGFibGUgb2YgZ3JlYXRcbmNvbmNlbnRyYXRpb24uIEFuZCBwYXRpZW50LiBXaXRoIGV5ZXMgdGhhdCBtaXNzXG5ub3RoaW5nOiBIZSBoYXMgcGlsb3TigJlzIGV5ZXMuPGJyPjxicj5cbldl4oCZbGwgZmluZCBvdXQgbW9yZSBhYm91dCBoaW0gYXMgdGltZSBnb2VzIG9uLCBidXQgdGhpc1xuaXMgYWxsIHlvdSByZWFsbHkgaGF2ZSB0byBrbm93OiBMdXRoZXIgV2hpdG5leSBpcyB0aGVcbmhlcm8gb2YgdGhpcyBwaWVjZS4gQXMgd2Ugd2F0Y2ggaGltIGRyYXcgLS1cbkx1dGhlcuKAmXMgc2tldGNoYm9vay4gSGUgaXMgZmluaXNoaW5nIGhpcyB3b3JrIG9uIHRoZVxuZXllcywgYW5kIGhl4oCZcyBjYXVnaHQgdGhlIHNhZG5lc3M6IEl04oCZcyBnb29kIHN0dWZmLlxuTHV0aGVyLiBJdOKAmXMgbm90IGdvb2QgZW5vdWdoIGZvciBoaW0uIEhlIGxvb2tzIGF0IGhpc1xud29yayBhIG1vbWVudCwgc2hha2VzIGhpcyBoZWFkLjxicj48YnI+XG5HSVJMIFNUVURFTlQ8YnI+PGJyPlxuRG9u4oCZdCBnaXZlIHVwLjxicj48YnI+XG5MVVRIRVI8YnI+PGJyPlxuSSBuZXZlciBkby48YnI+PGJyPlxuR0lSTCBTVFVERU5UPGJyPjxicj5cbk1heSBJPzxicj48YnI+XG5TaGXigJlzIGluZGljYXRlZCBoaXMgc2tldGNoYm9vay4gSGUgbm9kcy4gU2hlIHN0YXJ0c1xudGh1bWJpbmcgdGhyb3VnaC48YnI+PGJyPlxuVGhlIHNrZXRjaGJvb2sgYXMgdGhlIHBhZ2VzIHR1cm4uPGJyPjxicj5cbkRldGFpbCB3b3JrLiBFeWVzIGFuZCBoYW5kcy4gVGhlIGV5ZXMgYXJlIGdvb2QuIFRoZVxuaGFuZHMgYXJlIGJldHRlci4gVmVyeSBza2lsbGZ1bC48YnI+PGJyPlxuKENPTlRJTlVFRCk8YnI+PGJyPlxuXCJcIlwiXG5cblxuXG5cblxuXG5cbiMgXHRkUCAgICAgZFAgIG9vICAgICAgICAgICAgZFBcbiMgXHQ4OCAgICAgODggICAgICAgICAgICAgICAgODhcbiMgXHQ4OGFhYWFhODhhIGRQIC5kODg4OGIuIGQ4ODg4UCAuZDg4ODhiLiA4OGQ4ODhiLiBkUCAgICBkUFxuIyBcdDg4ICAgICA4OCAgODggWThvb29vby4gICA4OCAgIDg4JyAgYDg4IDg4JyAgYDg4IDg4ICAgIDg4XG4jIFx0ODggICAgIDg4ICA4OCAgICAgICA4OCAgIDg4ICAgODguICAuODggODggICAgICAgODguICAuODhcbiMgXHRkUCAgICAgZFAgIGRQIGA4ODg4OFAnICAgZFAgICBgODg4ODhQJyBkUCAgICAgICBgODg4OFA4OFxuIyBcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLjg4XG4jIFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGQ4ODg4UFxuXG5cbmNsYXNzIEhpc3RvcnkgZXh0ZW5kcyBtZC5QYWdlXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucykgLT5cblx0XHRzdXBlciBfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHR0aGVtZTogZmxvdy50aGVtZVxuXHRcdFx0aGVhZGVyOlxuXHRcdFx0XHR0aXRsZTogJ0hpc3RvcnknXG5cdFx0XHRcdHZpc2libGU6IHRydWUsIFxuXHRcdFx0XHRpY29uOiAnYXJyb3ctYmFjaycsIFxuXHRcdFx0XHRpY29uQWN0aW9uOiAtPiBcblx0XHRcdFx0XHRmbG93LnNob3dQcmV2aW91cygpXG5cdFx0XHRcdFx0QGRlc3Ryb3koKVxuXG5cblxuXG5cblxuIyBcdGRQICAgICBkUCAgICAgICAgICAgZFBcbiMgXHQ4OCAgICAgODggICAgICAgICAgIDg4XG4jIFx0ODhhYWFhYTg4YSAuZDg4ODhiLiA4OCA4OGQ4ODhiLlxuIyBcdDg4ICAgICA4OCAgODhvb29vZDggODggODgnICBgODhcbiMgXHQ4OCAgICAgODggIDg4LiAgLi4uIDg4IDg4LiAgLjg4XG4jIFx0ZFAgICAgIGRQICBgODg4ODhQJyBkUCA4OFk4ODhQJ1xuIyBcdCAgICAgICAgICAgICAgICAgICAgICAgODhcbiMgXHQgICAgICAgICAgICAgICAgICAgICAgIGRQXG5cbmNsYXNzIEhlbHAgZXh0ZW5kcyBtZC5QYWdlXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucykgLT5cblx0XHRzdXBlciBfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHR0aGVtZTogZmxvdy50aGVtZVxuXHRcdFx0aGVhZGVyOlxuXHRcdFx0XHR0aXRsZTogJ0hlbHAnXG5cdFx0XHRcdHZpc2libGU6IHRydWUsIFxuXHRcdFx0XHRpY29uOiAnYXJyb3ctYmFjaycsIFxuXHRcdFx0XHRpY29uQWN0aW9uOiAtPiBcblx0XHRcdFx0XHRmbG93LnNob3dQcmV2aW91cygpXG5cdFx0XHRcdFx0QGRlc3Ryb3koKVxuXG5cblx0XHRAaGVscEljb24gPSBuZXcgTGF5ZXJcblx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBAXG5cdFx0XHRoZWlnaHQ6IDE1Miwgd2lkdGg6IDE1MlxuXHRcdFx0eDogQWxpZ24uY2VudGVyLCB5OiBBbGlnbi5jZW50ZXIoLTEyOClcblx0XHRcdGltYWdlOiAnaW1hZ2VzL2ljb25zL3dhcm5pbmcucG5nJ1xuXHRcdFx0aW52ZXJ0OiAxMDBcblxuXHRcdEBoZWxwTGFiZWwgPSBuZXcgbWQuUmVndWxhclxuXHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEBcblx0XHRcdHg6IEFsaWduLmNlbnRlciwgeTogQGhlbHBJY29uLm1heFlcblx0XHRcdGNvbG9yOiBcIiNGRkZcIiwgdGV4dEFsaWduOiBcImNlbnRlclwiXG5cdFx0XHR0ZXh0OiAnRG8geW91IG5lZWQgaGVscD8nXG5cblx0XHRAaGVscERlc2NyaXB0aW9uID0gbmV3IG1kLlJlZ3VsYXJcblx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBAXG5cdFx0XHR4OiBBbGlnbi5jZW50ZXIsIHk6IEBoZWxwTGFiZWwubWF4WSArIDE2XG5cdFx0XHRjb2xvcjogXCIjRkZGXCIsIHRleHRBbGlnbjogXCJjZW50ZXJcIlxuXHRcdFx0d2lkdGg6IDI4MFxuXHRcdFx0dGV4dDogJ0NoYXQgbm93IHdpdGggb25lIG9mIG91ciBvcGVyYXRvcnMuJ1xuXG5cdFx0QG5lZWRIZWxwID0gbmV3IG1kLlRpdGxlXG5cdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQFxuXHRcdFx0dGV4dDogJ0kgTkVFRCBIRUxQJ1xuXHRcdFx0dGV4dEFsaWduOiAnY2VudGVyJ1xuXHRcdFx0eDogQWxpZ24uY2VudGVyLCB5OiBAaGVscERlc2NyaXB0aW9uLm1heFkgKyA2NFxuXHRcdFx0Y29sb3I6ICdyZ2JhKDI1NSwgMCwgMCwgMSknXG5cblx0XHRAbmVlZEhlbHAub25UYXAgLT4gbnVsbCAjIFRPRE8sIGJlZ2luIGFzc2lzdGFuY2UgY2hhdFxuXG5cdFx0QGNhbmNlbCA9IG5ldyBtZC5UaXRsZVxuXHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEBcblx0XHRcdHRleHQ6ICdDQU5DRUwnXG5cdFx0XHR0ZXh0QWxpZ246ICdjZW50ZXInXG5cdFx0XHR4OiBBbGlnbi5jZW50ZXIsIHk6IEBuZWVkSGVscC5tYXhZICsgNDhcblx0XHRcdGNvbG9yOiAnI0NDQydcblxuXHRcdEBjYW5jZWwub25UYXAgLT4gZmxvdy5zaG93UHJldmlvdXMoKVxuXG5cbm1lbnVPdmVybGF5ID0gbmV3IE1lbnVPdmVybGF5XG5kYXNoYm9hcmQgPSBuZXcgRGFzaGJvYXJkXG5cbmZsb3cuc2hvd05leHQoZGFzaGJvYXJkKVxuIyBmbG93LnNob3dOZXh0KG5ldyBNYXApXG5cbiIsIlxuIyBcdCAgICAgIGRQICAgICAgICAgICAgZFAgICAgICAgICAgICBkUFxuIyBcdCAgICAgIDg4ICAgICAgICAgICAgODggICAgICAgICAgICA4OFxuIyBcdC5kODg4Yjg4IC5kODg4OGIuIGQ4ODg4UCAuZDg4ODhiLiA4OGQ4ODhiLiAuZDg4ODhiLiAuZDg4ODhiLiAuZDg4ODhiLlxuIyBcdDg4JyAgYDg4IDg4JyAgYDg4ICAgODggICA4OCcgIGA4OCA4OCcgIGA4OCA4OCcgIGA4OCBZOG9vb29vLiA4OG9vb29kOFxuIyBcdDg4LiAgLjg4IDg4LiAgLjg4ICAgODggICA4OC4gIC44OCA4OC4gIC44OCA4OC4gIC44OCAgICAgICA4OCA4OC4gIC4uLlxuIyBcdGA4ODg4OFA4IGA4ODg4OFA4ICAgZFAgICBgODg4ODhQOCA4OFk4ODg4JyBgODg4ODhQOCBgODg4ODhQJyBgODg4ODhQJ1xuXG5cbmRhdGFiYXNlID1cblxuXHRjaGF0QnViYmxlczogW11cblxuXHRjaG9pY2VzOlxuXHRcdGxhbmd1YWdlOiB1bmRlZmluZWRcblx0XHRydWxlMTogdW5kZWZpbmVkXG5cdFx0cnVsZTI6IHVuZGVmaW5lZFxuXHRcdHJ1bGUzOiB1bmRlZmluZWRcblx0XHRlYXJseUV4aXQxOiB1bmRlZmluZWRcblx0XHRlYXJseUV4aXQyOiB1bmRlZmluZWRcblxuXHRyZW1vdmVDaGF0QnViYmxlOiAoY2hhdEJ1YmJsZSkgLT5cblx0XHRfLnB1bGwoQGNoYXRCdWJibGVzLCBjaGF0QnViYmxlKVxuXHRcdGNoYXRCdWJibGUuZGVzdHJveSgpXG5cblx0dXNlcjpcblx0XHRuYW1lOiAnVmljdG9yIEl2YW5vdmljaCdcblx0XHRhZ2U6IDQyXG5cdFx0c2V4OiBcIk1cIlxuXHRcdGltYWdlOiBcImltYWdlcy91c2VyLnBuZ1wiXG5cdFx0bGFuZ3VhZ2VzOiBbXCJlbmdsaXNoXCIsIFwiZ2VybWFuXCJdXG5cdFx0aGlzdG9yeTogW11cblx0XHRub3RlOiBcIldoZW4geW91IGxvb2sgYXQgaXQsIGl0IGxvb2tzIGxpa2UgYW55IG90aGVyIHBpZWNlIG9mIGxhbmQuIFRoZSBzdW4gc2hpbmVzIG9uIGl0IGxpa2Ugb24gYW55IG90aGVyIHBhcnQgb2YgdGhlIGVhcnRoLiBBbmQgaXQncyBhcyB0aG91Z2ggbm90aGluZyBoYWQgcGFydGljdWxhcmx5IGNoYW5nZWQgaW4gaXQuIExpa2UgZXZlcnl0aGluZyB3YXMgdGhlIHdheSBpdCB3YXMgdGhpcnR5XG55ZWFycyBhZ28uIE15IGZhdGhlciwgcmVzdCBoaXMgc291bCwgY291bGQgIGxvb2sgYXQgaXQgYW5kIG5vdCBub3RpY2UgYW55dGhpbmcgb3V0IG9mIHBsYWNlIGF0IGFsbC4gRXhjZXB0IG1heWJlXCJcblxuXHRhZGRIaXN0b3J5OiAoaXRlbSkgLT5cblx0XHRAdXNlci5oaXN0b3J5LnB1c2goaXRlbSlcblx0XHRpdGVtLnRpbWVTdGFtcCA9IF8ubm93KClcblxuXHRpbnZpdGF0aW9uczogW11cblx0ZXZlbnRzOiBbXVxuXHRsb2NhdGlvbnM6IFtdXG5cblxuXG5leHBvcnRzLmRhdGFiYXNlID0gZGF0YWJhc2VcblxuXG5cbiMgXHRkUCAgICAgICAgICAgICAgICAgICBvbyAgIGRQICAgICAgICAgICAgICBkUCAgIG9vXG4jIFx0ODggICAgICAgICAgICAgICAgICAgICAgICA4OCAgICAgICAgICAgICAgODhcbiMgXHQ4OCA4OGQ4ODhiLiBkUCAgIC5kUCBkUCBkODg4OFAgLmQ4ODg4Yi4gZDg4ODhQIGRQIC5kODg4OGIuIDg4ZDg4OGIuXG4jIFx0ODggODgnICBgODggODggICBkOCcgODggICA4OCAgIDg4JyAgYDg4ICAgODggICA4OCA4OCcgIGA4OCA4OCcgIGA4OFxuIyBcdDg4IDg4ICAgIDg4IDg4IC44OCcgIDg4ICAgODggICA4OC4gIC44OCAgIDg4ICAgODggODguICAuODggODggICAgODhcbiMgXHRkUCBkUCAgICBkUCA4ODg4UCcgICBkUCAgIGRQICAgYDg4ODg4UDggICBkUCAgIGRQIGA4ODg4OFAnIGRQICAgIGRQXG4jIFx0XG4jIFx0XG5cbmNsYXNzIEludml0YXRpb25cblx0Y29uc3RydWN0b3I6IChvcHRpb25zKSAtPlxuXHRcdEBuYW1lID0gb3B0aW9ucy5uYW1lID8gJ05ldyBJbnZpdGF0aW9uJ1xuXHRcdEBldmVudCA9IG9wdGlvbnMuZXZlbnQgPyBuZXcgRXZlbnRcblx0XHRAbG9jYXRpb24gPSBAZXZlbnQubG9jYXRpb25cblx0XHRAc3RhcnRUaW1lID0gQGV2ZW50LnN0YXJ0VGltZVxuXG5cblxuIyBcdGRQICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRQICAgb29cbiMgXHQ4OCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA4OFxuIyBcdDg4ICAgICAgICAuZDg4ODhiLiAuZDg4ODhiLiAuZDg4ODhiLiBkODg4OFAgZFAgLmQ4ODg4Yi4gODhkODg4Yi5cbiMgXHQ4OCAgICAgICAgODgnICBgODggODgnICBgXCJcIiA4OCcgIGA4OCAgIDg4ICAgODggODgnICBgODggODgnICBgODhcbiMgXHQ4OCAgICAgICAgODguICAuODggODguICAuLi4gODguICAuODggICA4OCAgIDg4IDg4LiAgLjg4IDg4ICAgIDg4XG4jIFx0ODg4ODg4ODhQIGA4ODg4OFAnIGA4ODg4OFAnIGA4ODg4OFA4ICAgZFAgICBkUCBgODg4ODhQJyBkUCAgICBkUFxuXG5jbGFzcyBMb2NhdGlvblxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMpIC0+XG5cdFx0QG5hbWUgPSBvcHRpb25zLm5hbWUgPyAnTG9jYXRpb24nXG5cblxuXG4jIFx0IDg4ODg4ODg4YiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRQXG4jIFx0IDg4ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDg4XG4jIFx0YTg4YWFhYSAgICBkUCAgIC5kUCAuZDg4ODhiLiA4OGQ4ODhiLiBkODg4OFBcbiMgXHQgODggICAgICAgIDg4ICAgZDgnIDg4b29vb2Q4IDg4JyAgYDg4ICAgODhcbiMgXHQgODggICAgICAgIDg4IC44OCcgIDg4LiAgLi4uIDg4ICAgIDg4ICAgODhcbiMgXHQgODg4ODg4ODhQIDg4ODhQJyAgIGA4ODg4OFAnIGRQICAgIGRQICAgZFBcblxuXG5jbGFzcyBFdmVudFxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMpIC0+XG5cdFx0QG5hbWUgPSBvcHRpb25zLm5hbWUgPyAnTmV3IEV2ZW50J1xuXHRcdEBsb2NhdGlvbiA9IG9wdGlvbnMubG9jYXRpb24gPyBuZXcgTG9jYXRpb25cblx0XHRAc3RhcnRUaW1lID0gb3B0aW9ucy5zdGFydFRpbWUgPyBuZXcgRGF0ZShfLm5vdygpICsgMzYwMDAwKVxuXG5cblxuXG5cbiIsIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7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
