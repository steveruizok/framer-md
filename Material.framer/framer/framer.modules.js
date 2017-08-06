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
var App, Body1, Body2, Button, Caption, Dialog, DialogAction, Header, Headline, MenuButton, MenuOverlay, Page, Regular, RowItem, StatusBar, SubheadSecondary, Title, database, ripple, theme, type,
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

exports.App = App = (function(superClass) {
  extend(App, superClass);

  function App(options) {
    var ref;
    if (options == null) {
      options = {};
    }
    this._footer = (ref = options.footer) != null ? ref : true;
    this.theme = theme;
    App.__super__.constructor.call(this, _.defaults(options, {
      name: 'Flow',
      animationOptions: {
        time: .2
      }
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
    this.onTransitionStart((function(_this) {
      return function(current, next, direction) {
        var ref1, ref2, ref3, ref4, ref5, ref6, ref7, ref8;
        _this.header.title = (ref1 = (ref2 = next._header) != null ? ref2.title : void 0) != null ? ref1 : 'Default';
        _this.header.icon = (ref3 = (ref4 = next._header) != null ? ref4.icon : void 0) != null ? ref3 : 'menu';
        _this.header.iconAction = (ref5 = (ref6 = next._header) != null ? ref6.iconAction : void 0) != null ? ref5 : function() {
          return null;
        };
        _this.header.visible = (ref7 = (ref8 = next._header) != null ? ref8.visible : void 0) != null ? ref7 : true;
        return next._onLoad();
      };
    })(this));
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

  App.prototype.newPage = function(options) {
    var page;
    if (options == null) {
      options = {};
    }
    page = new Page(_.defaults(options, {
      contentInset: {
        top: this.header.height
      }
    }));
    if (page.contentInset.top < this.header.height) {
      page.contentInset = {
        top: page.contentInset.top += this.header.height,
        bottom: page.contentInset.bottom,
        left: page.contentInset.left,
        right: page.contentInset.right
      };
    }
    return page;
  };

  App.prototype.addPage = function(page) {
    page.contentInset = {
      top: this.header.height
    };
    if (page.contentInset.top < this.header.height) {
      page.contentInset = {
        top: page.contentInset.top += this.header.height,
        bottom: page.contentInset.bottom,
        left: page.contentInset.left,
        right: page.contentInset.right
      };
    }
    return page;
  };

  App.prototype.linkTo = function(page) {
    if ((page != null) && this.current !== page) {
      return this.showNext(page);
    }
  };

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
      return ripple(header, event.point);
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
      brightness: 170,
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
      letterSpacing: 1.1,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3N0ZXZlcnVpei9MaWJyYXJ5L01vYmlsZSBEb2N1bWVudHMvY29tfmFwcGxlfkNsb3VkRG9jcy9HaXRIdWIvZnJhbWVyLW1kL01hdGVyaWFsLmZyYW1lci9tb2R1bGVzL3R5cGUuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvc3RldmVydWl6L0xpYnJhcnkvTW9iaWxlIERvY3VtZW50cy9jb21+YXBwbGV+Q2xvdWREb2NzL0dpdEh1Yi9mcmFtZXItbWQvTWF0ZXJpYWwuZnJhbWVyL21vZHVsZXMvdGhlbWUuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvc3RldmVydWl6L0xpYnJhcnkvTW9iaWxlIERvY3VtZW50cy9jb21+YXBwbGV+Q2xvdWREb2NzL0dpdEh1Yi9mcmFtZXItbWQvTWF0ZXJpYWwuZnJhbWVyL21vZHVsZXMvcmlwcGxlLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3N0ZXZlcnVpei9MaWJyYXJ5L01vYmlsZSBEb2N1bWVudHMvY29tfmFwcGxlfkNsb3VkRG9jcy9HaXRIdWIvZnJhbWVyLW1kL01hdGVyaWFsLmZyYW1lci9tb2R1bGVzL215TW9kdWxlLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3N0ZXZlcnVpei9MaWJyYXJ5L01vYmlsZSBEb2N1bWVudHMvY29tfmFwcGxlfkNsb3VkRG9jcy9HaXRIdWIvZnJhbWVyLW1kL01hdGVyaWFsLmZyYW1lci9tb2R1bGVzL21kLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3N0ZXZlcnVpei9MaWJyYXJ5L01vYmlsZSBEb2N1bWVudHMvY29tfmFwcGxlfkNsb3VkRG9jcy9HaXRIdWIvZnJhbWVyLW1kL01hdGVyaWFsLmZyYW1lci9tb2R1bGVzL2Zsb3cuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvc3RldmVydWl6L0xpYnJhcnkvTW9iaWxlIERvY3VtZW50cy9jb21+YXBwbGV+Q2xvdWREb2NzL0dpdEh1Yi9mcmFtZXItbWQvTWF0ZXJpYWwuZnJhbWVyL21vZHVsZXMvZGF0YWJhc2UuY29mZmVlIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIjIFx0ZDg4ODg4OFAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZFBcbiMgXHQgICA4OCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA4OFxuIyBcdCAgIDg4ICAgIGRQICAgIGRQIDg4ZDg4OGIuIC5kODg4OGIuIC5kODg4OGIuIDg4ZDg4OGIuIC5kODg4OGIuIDg4ZDg4OGIuIDg4ZDg4OGIuIGRQICAgIGRQXG4jIFx0ICAgODggICAgODggICAgODggODgnICBgODggODgnICBgODggODgnICBgODggODgnICBgODggODgnICBgODggODgnICBgODggODgnICBgODggODggICAgODhcbiMgXHQgICA4OCAgICA4OC4gIC44OCA4OC4gIC44OCA4OC4gIC44OCA4OC4gIC44OCA4OCAgICAgICA4OC4gIC44OCA4OC4gIC44OCA4OCAgICA4OCA4OC4gIC44OFxuIyBcdCAgIGRQICAgIGA4ODg4UDg4IDg4WTg4OFAnIGA4ODg4OFAnIGA4ODg4UDg4IGRQICAgICAgIGA4ODg4OFA4IDg4WTg4OFAnIGRQICAgIGRQIGA4ODg4UDg4XG4jIFx0ICAgICAgICAgICAgICAuODggODggICAgICAgICAgICAgICAgICAgICAuODggICAgICAgICAgICAgICAgICAgODggICAgICAgICAgICAgICAgICAgICAuODhcbiMgXHQgICAgICAgICAgZDg4ODhQICBkUCAgICAgICAgICAgICAgICAgZDg4ODhQICAgICAgICAgICAgICAgICAgICBkUCAgICAgICAgICAgICAgICAgZDg4ODhQXG5cblV0aWxzLmluc2VydENTUyhcblx0XCJcIlwiXG4gICAgQGZvbnQtZmFjZSB7XG4gICAgICBmb250LWZhbWlseTogXCJSb2JvdG9cIjtcbiAgICAgIHNyYzogdXJsKFwiZm9udHMvUm9ib3RvLVJlZ3VsYXIudHRmXCIpO1xuICAgIFwiXCJcIilcblxuY2xhc3MgZXhwb3J0cy5IZWFkbGluZSBleHRlbmRzIFRleHRMYXllclxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMpIC0+XG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0Zm9udEZhbWlseTogJ1JvYm90bydcblx0XHRcdGZvbnRTaXplOiAyNFxuXHRcdFx0Zm9udFdlaWdodDogNDAwXG5cdFx0XHRsaW5lSGVpZ2h0OiAxLjNcblx0XHRcdGNvbG9yOiAncmdiYSgwLDAsMCwuODcpJ1xuXG5jbGFzcyBleHBvcnRzLlN1YmhlYWRTZWNvbmRhcnkgZXh0ZW5kcyBUZXh0TGF5ZXJcblx0Y29uc3RydWN0b3I6IChvcHRpb25zKSAtPlxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdGZvbnRGYW1pbHk6ICdSb2JvdG8nXG5cdFx0XHRmb250U2l6ZTogMTZcblx0XHRcdGZvbnRXZWlnaHQ6IDQwMCwgXG5cdFx0XHRsaW5lSGVpZ2h0OiAxLjUsXG5cdFx0XHRjb2xvcjogJ3JnYmEoMCwwLDAsLjU0KSdcblxuY2xhc3MgZXhwb3J0cy5UaXRsZSBleHRlbmRzIFRleHRMYXllclxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMpIC0+XG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0Zm9udEZhbWlseTogJ1JvYm90bydcblx0XHRcdGZvbnRTaXplOiAyMFxuXHRcdFx0Zm9udFdlaWdodDogNTAwXG5cdFx0XHRsaW5lSGVpZ2h0OiAxLjNcblx0XHRcdGNvbG9yOiAncmdiYSgwLDAsMCwuODcpJ1xuY2xhc3MgZXhwb3J0cy5SZWd1bGFyIGV4dGVuZHMgVGV4dExheWVyXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucykgLT5cblx0XHRzdXBlciBfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRmb250RmFtaWx5OiAnUm9ib3RvJ1xuXHRcdFx0Zm9udFNpemU6IDE2XG5cdFx0XHRmb250V2VpZ2h0OiA0MDBcblx0XHRcdGxpbmVIZWlnaHQ6IDEuM1xuXHRcdFx0Y29sb3I6ICdyZ2JhKDAsMCwwLC44NyknXG5jbGFzcyBleHBvcnRzLkJvZHkyIGV4dGVuZHMgVGV4dExheWVyXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucykgLT5cblx0XHRzdXBlciBfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRmb250RmFtaWx5OiAnUm9ib3RvJ1xuXHRcdFx0Zm9udFNpemU6IDE0XG5cdFx0XHRmb250V2VpZ2h0OiA1MDBcblx0XHRcdGxpbmVIZWlnaHQ6IDEuM1xuXHRcdFx0Y29sb3I6ICdyZ2JhKDAsMCwwLC44NyknXG5jbGFzcyBleHBvcnRzLk1lbnUgZXh0ZW5kcyBUZXh0TGF5ZXJcblx0Y29uc3RydWN0b3I6IChvcHRpb25zKSAtPlxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdGZvbnRGYW1pbHk6ICdSb2JvdG8nXG5cdFx0XHRmb250U2l6ZTogMTRcblx0XHRcdGZvbnRXZWlnaHQ6IDUwMFxuXHRcdFx0bGluZUhlaWdodDogMS43XG5cdFx0XHRjb2xvcjogJ3JnYmEoMCwwLDAsLjg3KSdcbmNsYXNzIGV4cG9ydHMuQm9keTEgZXh0ZW5kcyBUZXh0TGF5ZXJcblx0Y29uc3RydWN0b3I6IChvcHRpb25zKSAtPlxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdGZvbnRGYW1pbHk6ICdSb2JvdG8nXG5cdFx0XHRmb250U2l6ZTogMTRcblx0XHRcdGZvbnRXZWlnaHQ6IDQwMFxuXHRcdFx0bGluZUhlaWdodDogMS40XG5cdFx0XHRjb2xvcjogJ3JnYmEoMCwwLDAsLjg3KSdcbmNsYXNzIGV4cG9ydHMuQ2FwdGlvbiBleHRlbmRzIFRleHRMYXllclxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMpIC0+XG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0Zm9udEZhbWlseTogJ1JvYm90bydcblx0XHRcdGZvbnRTaXplOiAxMlxuXHRcdFx0Zm9udFdlaWdodDogNDAwXG5cdFx0XHRsaW5lSGVpZ2h0OiAxLjNcblx0XHRcdGNvbG9yOiAncmdiYSgwLDAsMCwuNTQpJ1xuY2xhc3MgZXhwb3J0cy5CdXR0b24gZXh0ZW5kcyBUZXh0TGF5ZXJcblx0Y29uc3RydWN0b3I6IChvcHRpb25zKSAtPlxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdGZvbnRGYW1pbHk6ICdSb2JvdG8nXG5cdFx0XHRmb250U2l6ZTogMTRcblx0XHRcdGZvbnRXZWlnaHQ6IDUwMFxuXHRcdFx0bGluZUhlaWdodDogMS4zXG5cdFx0XHRjb2xvcjogJyMwMDk2ODgnXG5cdFx0XHRsZXR0ZXJTcGFjaW5nOiAxLjFcblx0XHRcdHBhZGRpbmc6IHtsZWZ0OiA0LCByaWdodDogNCwgdG9wOiA4LCBib3R0b206IDB9LCIsIlxuIyAgIGRQICAgZFAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuIyAgIDg4ICAgODggICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuIyBkODg4OFAgODhkODg4Yi4gLmQ4ODg4Yi4gODhkOGIuZDhiLiAuZDg4ODhiLiAuZDg4ODhiLlxuIyAgIDg4ICAgODgnICBgODggODhvb29vZDggODgnYDg4J2A4OCA4OG9vb29kOCBZOG9vb29vLlxuIyAgIDg4ICAgODggICAgODggODguICAuLi4gODggIDg4ICA4OCA4OC4gIC4uLiAgICAgICA4OFxuIyAgIGRQICAgZFAgICAgZFAgYDg4ODg4UCcgZFAgIGRQICBkUCBgODg4ODhQJyBgODg4ODhQJ1xuXG4jIFdoZW4gbG9hZGVkLCB0aGlzIG1vZHVsZSB3aWxsIGF0dGVtcHQgdG8gY3JlYXRlIGEgbmV3IHRoZW1lIGJhc2VkIG9uIFxuIyB0aGUgRGVzaWduIE1vZGUgdGVtcGxhdGUuIEl0cyBkZWZhdWx0IHZhbHVlcyB3aWxsIGJlIGZvciBhIFwiTGlnaHRcIiB0aGVtZS5cblxubW9kaWZ5Q29sb3IgPSAoY29sb3IsIGgsIHMsIGwpIC0+XG5cdGNsaXAgPSBfLnJlcGxhY2UoXy5yZXBsYWNlKGNvbG9yLnRvSHNsU3RyaW5nKCkuc2xpY2UoNCwgLTEpLCAnJScsICcnKSwgJyUnLCAnJykgLnNwbGl0KCcsICcpXG5cblx0bmV3Q29sb3IgPSBuZXcgQ29sb3IoXG5cdFx0aDogXy5wYXJzZUludChjbGlwWzBdKSArIGgsIFxuXHRcdHM6IChfLnBhcnNlSW50KGNsaXBbMV0pICsgcykvMTAwLCBcblx0XHRsOiAoXy5wYXJzZUludChjbGlwWzJdKSArIGwpLzEwMCwgXG5cdFx0YTogMSlcblx0XG5cdHJldHVybiBuZXdDb2xvclxuXG5wcmltYXJ5Q29sb3IgPSBwcmltYXJ5X2NvbG9yLmJhY2tncm91bmRDb2xvclxucHJpbWFyeUludmVydCA9IDEwMCAtIChwcmltYXJ5X2ludmVydC5vcGFjaXR5ICogMTAwKVxuc2Vjb25kYXJ5Q29sb3IgPSBzZWNvbmRhcnlfY29sb3IuYmFja2dyb3VuZENvbG9yXG5tZW51Q29sb3IgPSBtZW51X2NvbG9yLmJhY2tncm91bmRDb2xvclxubWVudVRleHRDb2xvciA9IG1lbnVfdGV4dF9jb2xvci5jb2xvclxubWVudUludmVydCA9IDEwMCAtIChtZW51X2ludmVydC5vcGFjaXR5ICogMTAwKVxuXG5cbnNvdXJjZSA9XG5cdGNvbG9yczpcblx0XHRwcmltYXJ5OlxuXHRcdFx0bWFpbjogcHJpbWFyeUNvbG9yXG5cdFx0XHRsaWdodDogbW9kaWZ5Q29sb3IocHJpbWFyeUNvbG9yLCAxMywgLTUsIDE1KVxuXHRcdFx0ZGFyazogbW9kaWZ5Q29sb3IocHJpbWFyeUNvbG9yLCAtMSwgLTcsIC0xMilcblx0XHRcdHRleHQ6IHByaW1hcnlfdGV4dF9jb2xvci5jb2xvclxuXHRcdFx0aW52ZXJ0OiBwcmltYXJ5SW52ZXJ0XG5cdFx0c2Vjb25kYXJ5OlxuXHRcdFx0bWFpbjogc2Vjb25kYXJ5Q29sb3Jcblx0XHRcdGxpZ2h0OiBtb2RpZnlDb2xvcihzZWNvbmRhcnlDb2xvciwgMTMsIC01LCAxNSlcblx0XHRcdGRhcms6IG1vZGlmeUNvbG9yKHNlY29uZGFyeUNvbG9yLCAtMSwgLTcsIC0xMilcblx0XHRcdHRleHQ6IHNlY29uZGFyeV90ZXh0X2NvbG9yLmNvbG9yXG5cdFx0bWVudTpcblx0XHRcdGxpZ2h0OiBtZW51Q29sb3Jcblx0XHRcdHRleHQ6IG1lbnVUZXh0Q29sb3Jcblx0XHRcdGludmVydDogbWVudUludmVydFxuXG5cbnRoZW1lID0gXG5cdHRpbnQ6IHNvdXJjZS5jb2xvcnMuc2Vjb25kYXJ5Lm1haW5cblx0cHJpbWFyeTogc291cmNlLmNvbG9ycy5wcmltYXJ5Lm1haW5cblx0cHJpbWFyeUludmVydDogcHJpbWFyeUludmVydFxuXHRzZWNvbmRhcnk6IHNvdXJjZS5jb2xvcnMuc2Vjb25kYXJ5Lm1haW5cblx0bWVudTogc291cmNlLmNvbG9ycy5tZW51LmxpZ2h0XG5cdG1lbnVJbnZlcnQ6IHNvdXJjZS5jb2xvcnMubWVudS5pbnZlcnRcblxuXHRoZWFkZXI6IFxuXHRcdGJhY2tncm91bmRDb2xvcjogc291cmNlLmNvbG9ycy5wcmltYXJ5Lm1haW5cblx0XHR0aXRsZTogc291cmNlLmNvbG9ycy5wcmltYXJ5LnRleHRcblx0XHRpbnZlcnQ6IHByaW1hcnlJbnZlcnRcblx0XHR0YWJzOlxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBzb3VyY2UuY29sb3JzLnByaW1hcnkubGlnaHRcblx0XHRcdGNvbG9yOiBzb3VyY2UuY29sb3JzLnByaW1hcnkudGV4dFxuXHRcdFx0c2VsZWN0b3I6IHNvdXJjZS5jb2xvcnMuc2Vjb25kYXJ5Lm1haW5cblx0XG5cdHN0YXR1c0JhcjogXG5cdFx0aW1hZ2U6ICdpbWFnZXMvc3RhdHVzX2Jhcl9jbGVhci5wbmcnXG5cdFx0YmFja2dyb3VuZENvbG9yOiBzb3VyY2UuY29sb3JzLnByaW1hcnkuZGFya1xuXHRcdGludmVydDogcHJpbWFyeUludmVydFxuXHRcblx0cGFnZTpcblx0XHRwcmltYXJ5OlxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiAnI0UxRTJFMSdcblx0XHRzZWNvbmRhcnk6XG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6ICcjRjVGNUY2J1xuXG5cdG1lbnVPdmVybGF5OlxuXHRcdGhlYWRlcjpcblx0XHRcdGJhY2tncm91bmRDb2xvcjogc291cmNlLmNvbG9ycy5zZWNvbmRhcnkubWFpblxuXHRcdFx0aWNvbjogc291cmNlLmNvbG9ycy5zZWNvbmRhcnkubGlnaHRcblx0XHRiYWNrZ3JvdW5kQ29sb3I6IHNvdXJjZS5jb2xvcnMubWVudS5saWdodFxuXHRcdHRleHQ6IHNvdXJjZS5jb2xvcnMubWVudS50ZXh0XG5cdFx0c2xpZGVyOiBcblx0XHRcdGtub2I6IHNvdXJjZS5jb2xvcnMuc2Vjb25kYXJ5LmxpZ2h0XG5cdFx0XHRmaWxsOiBzb3VyY2UuY29sb3JzLnNlY29uZGFyeS5kYXJrXG5cdFx0aW52ZXJ0OiBzb3VyY2UuY29sb3JzLm1lbnUuaW52ZXJ0XG5cblx0YnV0dG9uOlxuXHRcdGZsYXQ6XG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcdGNvbG9yOiBzb3VyY2UuY29sb3JzLnNlY29uZGFyeS5tYWluXG5cdFx0XHRzaGFkb3dZOiAwXG5cdFx0XHRzaGFkb3dDb2xvcjogJ3JnYmEoMCwwLDAsLjE4KSdcblx0XHRcdHNoYWRvd0JsdXI6IDBcblxuXHRcdHJhaXNlZDpcblx0XHRcdGJhY2tncm91bmRDb2xvcjogc291cmNlLmNvbG9ycy5zZWNvbmRhcnkubWFpblxuXHRcdFx0Y29sb3I6IHNvdXJjZS5jb2xvcnMuc2Vjb25kYXJ5LnRleHRcblx0XHRcdHNoYWRvd1k6IDJcblx0XHRcdHNoYWRvd0NvbG9yOiAncmdiYSgwLDAsMCwuMTgpJ1xuXHRcdFx0c2hhZG93Qmx1cjogNlxuXG5cblx0ZGlhbG9nOiBcblx0XHRiYWNrZ3JvdW5kQ29sb3I6JyNGQUZBRkEnXG5cdFxuXHR0ZXh0OiBcblx0XHRwcmltYXJ5OiBzb3VyY2UuY29sb3JzLnByaW1hcnkudGV4dFxuXHRcdHNlY29uZGFyeTogc291cmNlLmNvbG9ycy5zZWNvbmRhcnkudGV4dFxuXHRcblx0dGFibGU6XG5cdFx0YmFja2dyb3VuZENvbG9yOiAnI0ZGRkZGRidcblx0XHR0ZXh0OiBzb3VyY2UuY29sb3JzLnByaW1hcnkudGV4dFxuXHRcdGNoZWNrQm94OlxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHRib3JkZXJDb2xvcjogJyNEM0QzRDMnXG5cdFx0c2VsZWN0ZWQ6XG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IHNvdXJjZS5jb2xvcnMuc2Vjb25kYXJ5Lm1haW5cblx0XHRcdHRleHQ6IHNvdXJjZS5jb2xvcnMucHJpbWFyeS50ZXh0XG5cdFx0XHRjaGVja0JveDpcblx0XHRcdFx0YmFja2dyb3VuZENvbG9yOiBzb3VyY2UuY29sb3JzLnNlY29uZGFyeS5kYXJrXG5cdFx0XHRcdGJvcmRlckNvbG9yOiBudWxsXG5cblx0c2xpZGVyOlxuXHRcdGtub2I6IHNvdXJjZS5jb2xvcnMucHJpbWFyeS5saWdodFxuXHRcdGZpbGw6IHNvdXJjZS5jb2xvcnMucHJpbWFyeS5kYXJrXG5cblx0Y2FyZDpcblx0XHRoZWFkZXI6IHNvdXJjZS5jb2xvcnMuc2Vjb25kYXJ5LmRhcmtcblx0XG5cdG5hdkJhcjpcblx0XHRiYWNrZ3JvdW5kQ29sb3I6ICcjMDAwMDAwJ1xuXHRcblx0a2V5Ym9hcmQ6XG5cdFx0aW1hZ2U6ICdpbWFnZXMva2V5Ym9hcmRfbGlnaHQucG5nJ1xuXG5jb2xvcl9wYWxsZXRlLmRlc3Ryb3koKVxuXG5leHBvcnRzLnRoZW1lID0gdGhlbWVcbiIsIiMgXHQgODg4ODg4YmEgIG9vICAgICAgICAgICAgICAgICAgIGRQXG4jIFx0IDg4ICAgIGA4YiAgICAgICAgICAgICAgICAgICAgICA4OFxuIyBcdGE4OGFhYWE4UCcgZFAgODhkODg4Yi4gODhkODg4Yi4gODggLmQ4ODg4Yi5cbiMgXHQgODggICBgOGIuIDg4IDg4JyAgYDg4IDg4JyAgYDg4IDg4IDg4b29vb2Q4XG4jIFx0IDg4ICAgICA4OCA4OCA4OC4gIC44OCA4OC4gIC44OCA4OCA4OC4gIC4uLlxuIyBcdCBkUCAgICAgZFAgZFAgODhZODg4UCcgODhZODg4UCcgZFAgYDg4ODg4UCdcbiMgXHQgICAgICAgICAgICAgIDg4ICAgICAgIDg4XG4jIFx0ICAgICAgICAgICAgICBkUCAgICAgICBkUFxuXG4jXHRCeSBkZWZhdWx0LCBzaG93cyBhbiBleHBhbmRpbmcgY2lyY2xlIG92ZXIgYSBsYXllciwgY2xpcHBlZCB0byBpdHMgZnJhbWUuXG4jXHRPbiB0aGUgbGF5ZXIncyB0b3VjaEVuZCBldmVudCwgdGhlIGNpcmNsZSBhbmQgaXRzIG1hc2sgd2lsbCBkaXNhcHBlYXIuXG5cbiNcdHJlcXVpcmVkOlxuI1x0bGF5ZXIgKExheWVyKSwgdGhlIGxheWVyIG92ZXIgd2hpY2ggdG8gc2hvdyB0aGUgcmlwcGxlIGVmZmVjdFxuI1x0cG9pbnQgKG9iamVjdCksIHRoZSByaXBwbGUgb3JpZ2luIHBvaW50LCB1c3VhbGx5IGEgb25Ub3VjaFN0YXJ0J3MgZXZlbnQucG9pbnRcblxuI1x0b3B0aW9uYWw6XG4jXHRwbGFjZUJlaGluZCAoTGF5ZXIpLCBhIGNoaWxkIG9mIGxheWVyIGJlaGluZCB3aGljaCB0aGUgcmlwcGxlIHNob3VsZCBhcHBlYXJcbiNcdGNvbG9yIChzdHJpbmcgb3IgY29sb3Igb2JqZWN0KSwgYSBjdXN0b20gY29sb3IgZm9yIHRoZSByaXBwbGVcblxucmlwcGxlID0gKGxheWVyLCBwb2ludCwgcGxhY2VCZWhpbmQsIGNvbG9yKSAtPlxuXHRcblx0aWYgIWxheWVyPyB0aGVuIHRocm93ICdSaXBwbGUgcmVxdWlyZXMgYSBMYXllci4gVHJ5IG15TGF5ZXIub25Ub3VjaFN0YXJ0IChldmVudCkgLT4gcmlwcGxlKEAsIGV2ZW50LnBvaW50KSdcblx0aWYgIXBvaW50PyB0aGVuIHRocm93ICdSaXBwbGUgcmVxdWlyZXMgYSBwb2ludC4gVHJ5IG15TGF5ZXIub25Ub3VjaFN0YXJ0IChldmVudCkgLT4gcmlwcGxlKEAsIGV2ZW50LnBvaW50KSdcblxuXHRtYXNrID0gbmV3IExheWVyXG5cdFx0bmFtZTogJy4nXG5cdFx0cGFyZW50OiBsYXllclxuXHRcdHNpemU6IGxheWVyLnNpemVcblx0XHRiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRjbGlwOiB0cnVlXG5cdFx0b3BhY2l0eTogMFxuXHRcdGFuaW1hdGlvbk9wdGlvbnM6IHt0aW1lOiAuMTV9XG5cdFxuXHRpZiBwbGFjZUJlaGluZCB0aGVuIG1hc2sucGxhY2VCZWhpbmQocGxhY2VCZWhpbmQpXG5cdFxuXHQjIFJJUFBMRSBDSVJDTEVcblx0XG5cdGxvbmdTaWRlID0gaWYgbGF5ZXIud2lkdGggPiBsYXllci5oZWlnaHQgdGhlbiBsYXllci53aWR0aCBlbHNlIGxheWVyLmhlaWdodFxuXG5cdHJpcHBsZUNpcmNsZSA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IG1hc2tcblx0XHRcdHg6IHBvaW50LnggLSAxNlxuXHRcdFx0eTogcG9pbnQueSAtIDE2XG5cdFx0XHR3aWR0aDogMzIsIGhlaWdodDogMzIsIFxuXHRcdFx0Ym9yZGVyUmFkaXVzOiBsb25nU2lkZVxuXHRcdFx0XG5cdGlmIGNvbG9yP1xuXHRcdHJpcHBsZUNpcmNsZS5wcm9wcyA9XG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IGNvbG9yXG5cdGVsc2UgXG5cdFx0cmlwcGxlQ2lyY2xlLnByb3BzID0gXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IGxheWVyLmJhY2tncm91bmRDb2xvclxuXHRcdFx0c2F0dXJhdGU6IDE1MFxuXHRcdFx0YnJpZ2h0bmVzczogMTcwXG5cdFx0XHRvcGFjaXR5OiAuM1xuXHRcblx0IyBBTklNQVRJT05TIENJUkNMRVxuXHRcblx0bWFzay5hbmltYXRlXG5cdFx0b3BhY2l0eTogMVxuXHRcdG9wdGlvbnM6IHt0aW1lOiAuMTV9XG5cdFxuXHRyaXBwbGVDaXJjbGUuYW5pbWF0ZVxuXHRcdHg6IHJpcHBsZUNpcmNsZS54IC0gbG9uZ1NpZGUgKiAxLjNcblx0XHR5OiByaXBwbGVDaXJjbGUueSAtIGxvbmdTaWRlICogMS4zXG5cdFx0d2lkdGg6IGxvbmdTaWRlICogMi42XG5cdFx0aGVpZ2h0OiBsb25nU2lkZSAqIDIuNlxuXHRcdG9wdGlvbnM6IHt0aW1lOiAuNX1cblx0XG5cdFV0aWxzLmRlbGF5IDIsIC0+IFxuXHRcdG1hc2suYW5pbWF0ZVxuXHRcdFx0b3BhY2l0eTogMFxuXHRcdG1hc2sub25BbmltYXRpb25FbmQgbWFzay5kZXN0cm95XG5cblx0IyBUT1VDSCBFTkRcblx0XG5cdGxheWVyLm9uVG91Y2hFbmQgLT4gXG5cdFx0bWFzay5hbmltYXRlXG5cdFx0XHRvcGFjaXR5OiAwXG5cdFx0bWFzay5vbkFuaW1hdGlvbkVuZCBtYXNrLmRlc3Ryb3lcblxuZXhwb3J0cy5yaXBwbGUgPSByaXBwbGUiLCIjIEFkZCB0aGUgZm9sbG93aW5nIGxpbmUgdG8geW91ciBwcm9qZWN0IGluIEZyYW1lciBTdHVkaW8uIFxuIyBteU1vZHVsZSA9IHJlcXVpcmUgXCJteU1vZHVsZVwiXG4jIFJlZmVyZW5jZSB0aGUgY29udGVudHMgYnkgbmFtZSwgbGlrZSBteU1vZHVsZS5teUZ1bmN0aW9uKCkgb3IgbXlNb2R1bGUubXlWYXJcblxuZXhwb3J0cy5teVZhciA9IFwibXlWYXJpYWJsZVwiXG5cbmV4cG9ydHMubXlGdW5jdGlvbiA9IC0+XG5cdHByaW50IFwibXlGdW5jdGlvbiBpcyBydW5uaW5nXCJcblxuZXhwb3J0cy5teUFycmF5ID0gWzEsIDIsIDNdIiwie2RhdGFiYXNlfSA9IHJlcXVpcmUgJ2RhdGFiYXNlJ1xue3JpcHBsZX0gPSByZXF1aXJlICdyaXBwbGUnXG57dGhlbWV9ID0gcmVxdWlyZSAndGhlbWUnXG50eXBlID0gcmVxdWlyZSAndHlwZSdcblxuXG4jIFRPRE86IENoYW5nZSBBcHAgZnJvbSBtYXN0ZXIgZmxvdyBjb21wb25lbnQgdG8gU2NyZWVuIG1hbmFnZXIuXG4jIEFwcCBzaG91bGRuJ3QgZGlyZWN0bHkgbWFuYWdlIHBhZ2VzOiBhIG5ldyBjbGFzcywgJ3NjcmVlbicgd2lsbCBtYW5hZ2UgUGFnZXMuXG4jIFRhYnMgYWxsb3cgbmF2aWdhdGlvbiBiZXR3ZWVuIFNjcmVlbnMuIENvbnRlbnQgaXMgc3RpbGwgYWRkZWQgdG8gUGFnZXMuXG5cblxuIyBPdXIgZ29hbCBpcyB0byByZXF1aXJlIG9ubHkgb25lIHJlcXVpcmUgaW4gRnJhbWVyIHByb2plY3QsIHNvIHRoaXMgXG4jIGlzIGEgY2x1bmt5IHdheSBvZiBsZXR0aW5nIHVzZXIgY3JlYXRlIHRleHQgdXNpbmcgbWQuVGl0bGUsIGV0Yy5cblxuZXhwb3J0cy50aGVtZSA9IHRoZW1lXG5leHBvcnRzLlRpdGxlID0gVGl0bGUgPSB0eXBlLlRpdGxlXG5leHBvcnRzLkhlYWRsaW5lID0gSGVhZGxpbmUgPSB0eXBlLkhlYWRsaW5lXG5leHBvcnRzLlN1YmhlYWRTZWNvbmRhcnkgPSBTdWJoZWFkU2Vjb25kYXJ5ID0gdHlwZS5TdWJoZWFkU2Vjb25kYXJ5XG5leHBvcnRzLlJlZ3VsYXIgPSBSZWd1bGFyID0gdHlwZS5SZWd1bGFyXG5leHBvcnRzLkJvZHkyID0gQm9keTIgPSB0eXBlLkJvZHkyXG5leHBvcnRzLkJvZHkxID0gQm9keTEgPSB0eXBlLkJvZHkxXG5leHBvcnRzLkNhcHRpb24gPSBDYXB0aW9uID0gdHlwZS5DYXB0aW9uXG5leHBvcnRzLkRpYWxvZ0FjdGlvbiA9IERpYWxvZ0FjdGlvbiA9IHR5cGUuRGlhbG9nQWN0aW9uXG5cblxuIyAgLmQ4ODg4ODggICAgICAgICAgICAgICAgICAgXG4jIGQ4JyAgICA4OCAgICAgICAgICAgICAgICAgICBcbiMgODhhYWFhYTg4YSA4OGQ4ODhiLiA4OGQ4ODhiLlxuIyA4OCAgICAgODggIDg4JyAgYDg4IDg4JyAgYDg4XG4jIDg4ICAgICA4OCAgODguICAuODggODguICAuODhcbiMgODggICAgIDg4ICA4OFk4ODhQJyA4OFk4ODhQJ1xuIyAgICAgICAgICAgIDg4ICAgICAgIDg4ICAgICAgXG4jICAgICAgICAgICAgZFAgICAgICAgZFAgICAgICBcblxuXG5leHBvcnRzLkFwcCA9IGNsYXNzIEFwcCBleHRlbmRzIEZsb3dDb21wb25lbnRcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cblx0XHRAX2Zvb3RlciA9IG9wdGlvbnMuZm9vdGVyID8gdHJ1ZVxuXHRcdEB0aGVtZSA9IHRoZW1lXG5cblx0XHRzdXBlciBfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRuYW1lOiAnRmxvdydcblx0XHRcdGFuaW1hdGlvbk9wdGlvbnM6XG5cdFx0XHRcdHRpbWU6IC4yXG5cblxuXHRcdGlmIEBfZm9vdGVyXG5cdFx0XHRAZm9vdGVyID0gbmV3IExheWVyXG5cdFx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBAXG5cdFx0XHRcdHdpZHRoOiBTY3JlZW4ud2lkdGgsIGhlaWdodDogNDhcblx0XHRcdFx0aW1hZ2U6ICdpbWFnZXMvbmF2X2Jhci5wbmcnXG5cdFx0XG5cdFx0QGhlYWRlciA9IG5ldyBIZWFkZXJcblx0XHRcdHRoZW1lOiB0aGVtZVxuXG5cdFx0QG9uVHJhbnNpdGlvblN0YXJ0IChjdXJyZW50LCBuZXh0LCBkaXJlY3Rpb24pID0+IFxuXG5cdFx0XHRAaGVhZGVyLnRpdGxlID0gbmV4dC5faGVhZGVyPy50aXRsZSA/ICdEZWZhdWx0J1xuXHRcdFx0QGhlYWRlci5pY29uID0gbmV4dC5faGVhZGVyPy5pY29uID8gJ21lbnUnXG5cdFx0XHRAaGVhZGVyLmljb25BY3Rpb24gPSBuZXh0Ll9oZWFkZXI/Lmljb25BY3Rpb24gPyAtPiBudWxsXG5cdFx0XHRAaGVhZGVyLnZpc2libGUgPSBuZXh0Ll9oZWFkZXI/LnZpc2libGUgPyB0cnVlXG5cdFx0XHRuZXh0Ll9vbkxvYWQoKVxuXG5cdFx0XG5cdFx0IyBLRVlCT0FSRFxuXG5cdFx0QGtleWJvYXJkID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiAnS2V5Ym9hcmQnXG5cdFx0XHR5OiBAbWF4WSwgaW1hZ2U6IHRoZW1lLmtleWJvYXJkLmltYWdlXG5cdFx0XHR3aWR0aDogMzYwLCBoZWlnaHQ6IDI2OVxuXHRcdFx0YW5pbWF0aW9uT3B0aW9uczpcblx0XHRcdFx0dGltZTogLjI1XG5cblx0bmV3UGFnZTogKG9wdGlvbnMgPSB7fSkgLT5cblxuXHRcdHBhZ2UgPSBuZXcgUGFnZSBfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRjb250ZW50SW5zZXQ6IHt0b3A6IEBoZWFkZXIuaGVpZ2h0fVxuXG5cdFx0IyBhZGp1c3QgY29udGVudCBpbnNldCBmb3IgcGFnZVxuXHRcdGlmIHBhZ2UuY29udGVudEluc2V0LnRvcCA8IEBoZWFkZXIuaGVpZ2h0IHRoZW4gcGFnZS5jb250ZW50SW5zZXQgPSBcblx0XHRcdHRvcDogcGFnZS5jb250ZW50SW5zZXQudG9wICs9IEBoZWFkZXIuaGVpZ2h0XG5cdFx0XHRib3R0b206IHBhZ2UuY29udGVudEluc2V0LmJvdHRvbVxuXHRcdFx0bGVmdDogcGFnZS5jb250ZW50SW5zZXQubGVmdFxuXHRcdFx0cmlnaHQ6IHBhZ2UuY29udGVudEluc2V0LnJpZ2h0XG5cblx0XHRyZXR1cm4gcGFnZSBcblxuXHRhZGRQYWdlOiAocGFnZSkgLT5cblx0XHRwYWdlLmNvbnRlbnRJbnNldCA9IHt0b3A6IEBoZWFkZXIuaGVpZ2h0fVxuXG5cdFx0IyBhZGp1c3QgY29udGVudCBpbnNldCBmb3IgcGFnZVxuXHRcdGlmIHBhZ2UuY29udGVudEluc2V0LnRvcCA8IEBoZWFkZXIuaGVpZ2h0IHRoZW4gcGFnZS5jb250ZW50SW5zZXQgPSBcblx0XHRcdHRvcDogcGFnZS5jb250ZW50SW5zZXQudG9wICs9IEBoZWFkZXIuaGVpZ2h0XG5cdFx0XHRib3R0b206IHBhZ2UuY29udGVudEluc2V0LmJvdHRvbVxuXHRcdFx0bGVmdDogcGFnZS5jb250ZW50SW5zZXQubGVmdFxuXHRcdFx0cmlnaHQ6IHBhZ2UuY29udGVudEluc2V0LnJpZ2h0XG5cblx0XHRyZXR1cm4gcGFnZSBcblxuXHRsaW5rVG86IChwYWdlKSAtPlxuXHRcdGlmIHBhZ2U/IGFuZCBAY3VycmVudCBpc250IHBhZ2Vcblx0XHRcdEBzaG93TmV4dChwYWdlKVxuXG5cblx0c2hvd0tleWJvYXJkOiAtPlxuXHRcdEBrZXlib2FyZC5hbmltYXRlXG5cdFx0XHR5OiBBbGlnbi5ib3R0b20oKVxuXHRcdEBrZXlib2FyZC5icmluZ1RvRnJvbnQoKVxuXG5cdGhpZGVLZXlib2FyZDogLT5cblx0XHRAa2V5Ym9hcmQuYW5pbWF0ZVxuXHRcdFx0eTogU2NyZWVuLm1heFlcblxuXG5cblxuXG5cblxuXG4jIC5kODg4ODhiICAgIGRQICAgICAgICAgICAgICBkUCAgICAgICAgICAgICAgICAgICAgICA4ODg4ODhiYSAgICAgICAgICAgICAgICAgICBcbiMgODguICAgIFwiJyAgIDg4ICAgICAgICAgICAgICA4OCAgICAgICAgICAgICAgICAgICAgICA4OCAgICBgOGIgICAgICAgICAgICAgICAgICBcbiMgYFk4ODg4OGIuIGQ4ODg4UCAuZDg4ODhiLiBkODg4OFAgZFAgICAgZFAgLmQ4ODg4Yi4gYTg4YWFhYThQJyAuZDg4ODhiLiA4OGQ4ODhiLlxuIyAgICAgICBgOGIgICA4OCAgIDg4JyAgYDg4ICAgODggICA4OCAgICA4OCBZOG9vb29vLiAgODggICBgOGIuIDg4JyAgYDg4IDg4JyAgYDg4XG4jIGQ4JyAgIC44UCAgIDg4ICAgODguICAuODggICA4OCAgIDg4LiAgLjg4ICAgICAgIDg4ICA4OCAgICAuODggODguICAuODggODggICAgICBcbiMgIFk4ODg4OFAgICAgZFAgICBgODg4ODhQOCAgIGRQICAgYDg4ODg4UCcgYDg4ODg4UCcgIDg4ODg4ODg4UCBgODg4ODhQOCBkUCAgXG5cblxuZXhwb3J0cy5TdGF0dXNCYXIgPSBjbGFzcyBTdGF0dXNCYXIgZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdG5hbWU6ICcuJ1xuXHRcdFx0d2lkdGg6IFNjcmVlbi53aWR0aCwgaGVpZ2h0OiAyNFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiB0aGVtZS5zdGF0dXNCYXIuYmFja2dyb3VuZENvbG9yXG5cblx0XHRAaXRlbXMgPSBuZXcgTGF5ZXJcblx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBAXG5cdFx0XHRzaXplOiBAc2l6ZVxuXHRcdFx0aW1hZ2U6IHRoZW1lLnN0YXR1c0Jhci5pbWFnZVxuXHRcdFx0aW52ZXJ0OiB0aGVtZS5zdGF0dXNCYXIuaW52ZXJ0XG5cblxuXG4jIGRQICAgICBkUCAgICAgICAgICAgICAgICAgICAgICAgICAgZFAgICAgICAgICAgICAgICAgICBcbiMgODggICAgIDg4ICAgICAgICAgICAgICAgICAgICAgICAgICA4OCAgICAgICAgICAgICAgICAgIFxuIyA4OGFhYWFhODhhIC5kODg4OGIuIC5kODg4OGIuIC5kODg4Yjg4IC5kODg4OGIuIDg4ZDg4OGIuXG4jIDg4ICAgICA4OCAgODhvb29vZDggODgnICBgODggODgnICBgODggODhvb29vZDggODgnICBgODhcbiMgODggICAgIDg4ICA4OC4gIC4uLiA4OC4gIC44OCA4OC4gIC44OCA4OC4gIC4uLiA4OCAgICAgIFxuIyBkUCAgICAgZFAgIGA4ODg4OFAnIGA4ODg4OFA4IGA4ODg4OFA4IGA4ODg4OFAnIGRQICAgICAgXG5cblxuZXhwb3J0cy5IZWFkZXIgPSBjbGFzcyBIZWFkZXIgZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblx0XHRcblx0XHRAX3RpdGxlID0gdW5kZWZpbmVkXG5cdFx0QF9pY29uID0gdW5kZWZpbmVkXG5cdFx0QF9pY29uQWN0aW9uID0gb3B0aW9ucy5pY29uQWN0aW9uID8gLT4gbnVsbFxuXG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0bmFtZTogJ0hlYWRlcicsIFxuXHRcdFx0d2lkdGg6IFNjcmVlbi53aWR0aCwgaGVpZ2h0OiA4MFxuXHRcdFx0c2hhZG93WTogMiwgc2hhZG93Qmx1cjogMywgc2hhZG93Q29sb3I6ICdyZ2JhKDAsMCwwLC4yNCknXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IHRoZW1lLmhlYWRlci5iYWNrZ3JvdW5kQ29sb3JcblxuXHRcdEBzdGF0dXNCYXIgPSBuZXcgU3RhdHVzQmFyXG5cdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQFxuXG5cdFx0IyBUT0RPOiBpZiBvcHRpb25zLmljb24gaXMgZmFsc2UgdGhlbiBubyBpY29uTGF5ZXIsIG1vdmUgdGl0bGUgbGVmdFxuXG5cdFx0QHRpdGxlTGF5ZXIgPSBuZXcgdHlwZS5UaXRsZVxuXHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEBcblx0XHRcdHg6IDcyLCB5OiBBbGlnbi5ib3R0b20oLTE0KVxuXHRcdFx0Y29sb3I6IHRoZW1lLmhlYWRlci50aXRsZVxuXHRcdFx0dGV4dDogQHRpdGxlID8gXCJObyB0aXRsZVwiXG5cblx0XHRAdGl0bGUgPSBvcHRpb25zLnRpdGxlID8gJ0RlZmF1bHQgSGVhZGVyJ1xuXG5cdFx0QGljb25MYXllciA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEAsIFxuXHRcdFx0eDogMTIsIHk6IEFsaWduLmNlbnRlcigxMilcblx0XHRcdHdpZHRoOiAzMiwgaGVpZ2h0OiAzMlxuXHRcdFx0aW1hZ2U6ICcnLCBiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcdGludmVydDogdGhlbWUuaGVhZGVyLmludmVydFxuXG5cdFx0QGljb24gPSBvcHRpb25zLmljb24gPyAnbWVudSdcblxuXHRcdEBpY29uTGF5ZXIub25UYXAgPT4gQF9pY29uQWN0aW9uKClcblx0XHRAaWNvbkxheWVyLm9uVG91Y2hTdGFydCAoZXZlbnQpIC0+IHJpcHBsZShoZWFkZXIsIGV2ZW50LnBvaW50KVxuXG5cblx0QGRlZmluZSBcInRpdGxlXCIsXG5cdFx0Z2V0OiAtPiByZXR1cm4gQF90aXRsZVxuXHRcdHNldDogKHRpdGxlVGV4dCkgLT5cblx0XHRcdEBfdGl0bGUgPSB0aXRsZVRleHRcblx0XHRcdEB0aXRsZUxheWVyLnRleHRSZXBsYWNlKEB0aXRsZUxheWVyLnRleHQsIEBfdGl0bGUpXG5cblx0QGRlZmluZSBcImljb25cIixcblx0XHRnZXQ6IC0+IHJldHVybiBAX2ljb25cblx0XHRzZXQ6IChpY29uTmFtZSkgLT4gXG5cdFx0XHRAX2ljb24gPSBpY29uTmFtZVxuXHRcdFx0QGljb25MYXllci5pbWFnZSA9IFwiaW1hZ2VzL2ljb25zLyN7QF9pY29ufS5wbmdcIlxuXG5cdEBkZWZpbmUgXCJpY29uQWN0aW9uXCIsXG5cdFx0Z2V0OiAtPiByZXR1cm4gQF9pY29uQWN0aW9uXG5cdFx0c2V0OiAoYWN0aW9uKSAtPlxuXHRcdFx0QF9pY29uQWN0aW9uID0gYWN0aW9uXG5cblxuXG5cblxuXG5cbiMgIDg4ODg4OGJhICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuIyAgODggICAgYDhiICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4jIGE4OGFhYWE4UCcgLmQ4ODg4Yi4gLmQ4ODg4Yi4gLmQ4ODg4Yi5cbiMgIDg4ICAgICAgICA4OCcgIGA4OCA4OCcgIGA4OCA4OG9vb29kOFxuIyAgODggICAgICAgIDg4LiAgLjg4IDg4LiAgLjg4IDg4LiAgLi4uXG4jICBkUCAgICAgICAgYDg4ODg4UDggYDg4ODhQODggYDg4ODg4UCdcbiMgICAgICAgICAgICAgICAgICAgICAgICAgIC44OCAgICAgICAgIFxuIyAgICAgICAgICAgICAgICAgICAgICBkODg4OFAgICAgICAgICAgXG5cblxuZXhwb3J0cy5QYWdlID0gY2xhc3MgUGFnZSBleHRlbmRzIFNjcm9sbENvbXBvbmVudFxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblx0XHRcblx0XHRAX2hlYWRlciA9IG9wdGlvbnMuaGVhZGVyID8ge3RpdGxlOiAnRGVmYXVsdCcsIHZpc2libGU6IHRydWUsIGljb246ICdtZW51JywgaWNvbkFjdGlvbjogLT4gcmV0dXJuIG51bGx9XG5cdFx0QF90ZW1wbGF0ZSA9IG9wdGlvbnMudGVtcGxhdGVcblx0XHRAX3RlbXBsYXRlT3BhY2l0eSA9IG9wdGlvbnMudGVtcGxhdGVPcGFjaXR5ID8gLjVcblx0XHRAX29uTG9hZCA9IG9wdGlvbnMub25Mb2FkID8gLT4gbnVsbFxuXG5cdFx0aWYgQF9oZWFkZXIuaWNvbkFjdGlvbiB0aGVuIEBfaGVhZGVyLmljb25BY3Rpb24gPSBfLmJpbmQoQF9oZWFkZXIuaWNvbkFjdGlvbiwgQClcblx0XHRpZiBAX29uTG9hZCB0aGVuIEBfb25Mb2FkID0gXy5iaW5kKEBfb25Mb2FkLCBAKVxuXG5cblx0XHRzdXBlciBfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRuYW1lOiAnUGFnZSdcblx0XHRcdHNpemU6IFNjcmVlbi5zaXplXG5cdFx0XHRzY3JvbGxIb3Jpem9udGFsOiBmYWxzZVxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiB0aGVtZS5wYWdlLnByaW1hcnkuYmFja2dyb3VuZENvbG9yXG5cdFx0XG5cdFx0QGNvbnRlbnRJbnNldCA9XG5cdFx0XHR0b3A6IDAsIGJvdHRvbTogNTAwXG5cblx0XHRAY29udGVudC5iYWNrZ3JvdW5kQ29sb3IgPSBudWxsXG5cblx0XHRpZiBAX3RlbXBsYXRlP1xuXHRcdFx0QF90ZW1wbGF0ZS5wcm9wcyA9XG5cdFx0XHRcdHBhcmVudDogQFxuXHRcdFx0XHRvcGFjaXR5OiBAX3RlbXBsYXRlT3BhY2l0eVxuXG5cdFx0QHNlbmRUb0JhY2soKVxuXG5cblx0dXBkYXRlOiAtPiByZXR1cm4gbnVsbFxuXG5cblxuIyAgODg4ODg4YmEgICAgICAgICAgICAgICAgICAgICAgZFAgICBkUCAgICAgICAgICAgICAgICAgICAgICBcbiMgIDg4ICAgIGA4YiAgICAgICAgICAgICAgICAgICAgIDg4ICAgODggICAgICAgICAgICAgICAgICAgICAgXG4jIGE4OGFhYWE4UCcgLmQ4ODg4Yi4gZFAgIGRQICBkUCA4OCBkODg4OFAgLmQ4ODg4Yi4gODhkOGIuZDhiLlxuIyAgODggICBgOGIuIDg4JyAgYDg4IDg4ICA4OCAgODggODggICA4OCAgIDg4b29vb2Q4IDg4J2A4OCdgODhcbiMgIDg4ICAgICA4OCA4OC4gIC44OCA4OC44OGIuODgnIDg4ICAgODggICA4OC4gIC4uLiA4OCAgODggIDg4XG4jICBkUCAgICAgZFAgYDg4ODg4UCcgODg4OFAgWThQICBkUCAgIGRQICAgYDg4ODg4UCcgZFAgIGRQICBkUFxuXG5leHBvcnRzLlJvd0l0ZW0gPSBjbGFzcyBSb3dJdGVtIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cblx0XHRAX2ljb24gPSBvcHRpb25zLmljb25cblx0XHRAX2ljb25CYWNrZ3JvdW5kQ29sb3IgPSBvcHRpb25zLmljb25CYWNrZ3JvdW5kQ29sb3IgPyAnIzc3Nydcblx0XHRAX3RleHQgPSBvcHRpb25zLnRleHQgPyAnUm93IGl0ZW0nXG5cdFx0QF9yb3cgPSBvcHRpb25zLnJvdyA/IDBcblx0XHRAX3kgPSAzMiArIChAX3JvdyAqIDQ4KSBcblxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdHdpZHRoOiBTY3JlZW4ud2lkdGhcblx0XHRcdHk6IEBfeVxuXHRcdFx0aGVpZ2h0OiA0OFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cblx0XHRAaWNvbiA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEBcblx0XHRcdHg6IDE2LCB5OiBBbGlnbi5jZW50ZXJcblx0XHRcdGhlaWdodDogMzIsIHdpZHRoOiAzMiwgYm9yZGVyUmFkaXVzOiAxNlxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBAX2ljb25CYWNrZ3JvdW5kQ29sb3Jcblx0XHRcdGltYWdlOiBAX2ljb25cblxuXHRcdEBsYWJlbExheWVyID0gbmV3IHR5cGUuUmVndWxhclxuXHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEBcblx0XHRcdHg6IEBpY29uLm1heFggKyAxNiwgeTogQWxpZ24uY2VudGVyXG5cdFx0XHRjb2xvcjogdGhlbWUudGV4dC50ZXh0XG5cdFx0XHR0ZXh0OiBAX3RleHRcblxuXG4jIFx0ODg4OGJhLjg4YmEgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA4ODg4ODhiYSAgICAgICAgICAgICBkUCAgICAgZFBcbiMgXHQ4OCAgYDhiICBgOGIgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDg4ICAgIGA4YiAgICAgICAgICAgIDg4ICAgICA4OFxuIyBcdDg4ICAgODggICA4OCAuZDg4ODhiLiA4OGQ4ODhiLiBkUCAgICBkUCBhODhhYWFhOFAnIGRQICAgIGRQIGQ4ODg4UCBkODg4OFAgLmQ4ODg4Yi4gODhkODg4Yi5cbiMgXHQ4OCAgIDg4ICAgODggODhvb29vZDggODgnICBgODggODggICAgODggIDg4ICAgYDhiLiA4OCAgICA4OCAgIDg4ICAgICA4OCAgIDg4JyAgYDg4IDg4JyAgYDg4XG4jIFx0ODggICA4OCAgIDg4IDg4LiAgLi4uIDg4ICAgIDg4IDg4LiAgLjg4ICA4OCAgICAuODggODguICAuODggICA4OCAgICAgODggICA4OC4gIC44OCA4OCAgICA4OFxuIyBcdGRQICAgZFAgICBkUCBgODg4ODhQJyBkUCAgICBkUCBgODg4ODhQJyAgODg4ODg4ODhQIGA4ODg4OFAnICAgZFAgICAgIGRQICAgYDg4ODg4UCcgZFAgICAgZFBcblxuXG5jbGFzcyBNZW51QnV0dG9uIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cdFx0XG5cdFx0QF9pY29uID0gb3B0aW9ucy5pY29uID8gJ2hvbWUnXG5cdFx0QF90ZXh0ID0gb3B0aW9ucy50ZXh0ID8gJ0RlZmF1bHQnXG5cdFx0QF9hY3Rpb24gPSBvcHRpb25zLmFjdGlvbiA/IC0+IG51bGxcblxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdGhlaWdodDogNDgsIHdpZHRoOiAzMDRcblx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXG5cdFx0QGljb25MYXllciA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEBcblx0XHRcdHk6IEFsaWduLmNlbnRlclxuXHRcdFx0aGVpZ2h0OiAzMiwgd2lkdGg6IDMyXG5cdFx0XHRpbnZlcnQ6IHRoZW1lLm1lbnUuaW52ZXJ0XG5cdFx0XHRpbWFnZTogQF9pY29uXG5cblx0XHRAbGFiZWxMYXllciA9IG5ldyB0eXBlLlJlZ3VsYXJcblx0XHRcdG5hbWU6ICdsYWJlbCcsIHBhcmVudDogQFxuXHRcdFx0eDogQGljb25MYXllci5tYXhYICsgMTZcblx0XHRcdHk6IEFsaWduLmNlbnRlcigpXG5cdFx0XHRjb2xvcjogdGhlbWUubWVudU92ZXJsYXkudGV4dFxuXHRcdFx0dGV4dDogQF90ZXh0XG5cblx0XHRAb25UYXAgQF9hY3Rpb25cblx0XHRAb25UYXAgLT4gXG5cdFx0XHRVdGlscy5kZWxheSAuMjUsID0+IEBwYXJlbnQuaGlkZSgpXG5cblxuXG4jIFx0ODg4OGJhLjg4YmEgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuODg4ODguICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkUCAgICAgICAgICAgICAgICAgIFxuIyBcdDg4ICBgOGIgIGA4YiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkOCcgICBgOGIgICAgICAgICAgICAgICAgICAgICAgICAgICAgODggICAgICAgICAgICAgICAgICBcbiMgXHQ4OCAgIDg4ICAgODggLmQ4ODg4Yi4gODhkODg4Yi4gZFAgICAgZFAgODggICAgIDg4IGRQICAgLmRQIC5kODg4OGIuIDg4ZDg4OGIuIDg4IC5kODg4OGIuIGRQICAgIGRQXG4jIFx0ODggICA4OCAgIDg4IDg4b29vb2Q4IDg4JyAgYDg4IDg4ICAgIDg4IDg4ICAgICA4OCA4OCAgIGQ4JyA4OG9vb29kOCA4OCcgIGA4OCA4OCA4OCcgIGA4OCA4OCAgICA4OFxuIyBcdDg4ICAgODggICA4OCA4OC4gIC4uLiA4OCAgICA4OCA4OC4gIC44OCBZOC4gICAuOFAgODggLjg4JyAgODguICAuLi4gODggICAgICAgODggODguICAuODggODguICAuODhcbiMgXHRkUCAgIGRQICAgZFAgYDg4ODg4UCcgZFAgICAgZFAgYDg4ODg4UCcgIGA4ODg4UCcgIDg4ODhQJyAgIGA4ODg4OFAnIGRQICAgICAgIGRQIGA4ODg4OFA4IGA4ODg4UDg4XG4jICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuODhcbiMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZDg4ODhQIFxuXG5leHBvcnRzLk1lbnVPdmVybGF5ID0gY2xhc3MgTWVudU92ZXJsYXkgZXh0ZW5kcyBMYXllclxuXHRcblx0XG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXG5cdFx0QF9saW5rcyA9IG9wdGlvbnMubGlua3MgPyBbe3RpdGxlOiAnSG9tZScsIGljb246ICdob21lJywgYWN0aW9uOiAtPiBudWxsfV1cblx0XHRAX3RpdGxlID0gb3B0aW9ucy50aXRsZSA/ICdNZW51J1xuXHRcdEBfaW1hZ2UgPSBvcHRpb25zLmltYWdlID8gbnVsbFxuXG5cblx0XHRzdXBlciBfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRoZWlnaHQ6IFNjcmVlbi5oZWlnaHRcblx0XHRcdHdpZHRoOiAzMDRcblx0XHRcdGhlaWdodDogU2NyZWVuLmhlaWdodFxuXHRcdFx0dmlzaWJsZTogZmFsc2Vcblx0XHRcdGJhY2tncm91bmRDb2xvcjogdGhlbWUubWVudU92ZXJsYXkuYmFja2dyb3VuZENvbG9yXG5cdFx0XHRhbmltYXRpb25PcHRpb25zOiB7Y3VydmU6IFwic3ByaW5nKDMwMCwgMzUsIDApXCJ9XG5cblxuXHRcdEBzY3JpbSA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogJy4nLCBcblx0XHRcdHNpemU6IFNjcmVlbi5zaXplXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6ICdyZ2JhKDAsMCwwLC42KSdcblx0XHRcdG9wYWNpdHk6IDBcblx0XHRcdHZpc2libGU6IGZhbHNlXG5cdFx0XHRhbmltYXRpb25PcHRpb25zOlxuXHRcdFx0XHR0aW1lOiAuMjVcblxuXHRcdEBzY3JpbS5vblRhcCA9PiBAaGlkZSgpXG5cdFx0QG9uU3dpcGVMZWZ0RW5kID0+IEBoaWRlKClcblxuXHRcdEBoZWFkZXIgPSBuZXcgTGF5ZXJcblx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBAXG5cdFx0XHR3aWR0aDogQHdpZHRoLCBoZWlnaHQ6IDE3M1xuXHRcdFx0aW1hZ2U6IGRhdGFiYXNlLnVzZXIuaW1hZ2Vcblx0XHRcdGJhY2tncm91bmRDb2xvcjogdGhlbWUubWVudU92ZXJsYXkuaGVhZGVyLmJhY2tncm91bmRDb2xvclxuXG5cdFx0QHRpdGxlSWNvbiA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEBoZWFkZXJcblx0XHRcdHg6IDE2LCB5OiA0MFxuXHRcdFx0aGVpZ2h0OiA2NCwgd2lkdGg6IDY0XG5cdFx0XHRib3JkZXJSYWRpdXM6IDMyXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IHRoZW1lLm1lbnVPdmVybGF5LmhlYWRlci5pY29uXG5cblx0XHRAdGl0bGVFeHBhbmQgPSBuZXcgTGF5ZXJcblx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBAaGVhZGVyXG5cdFx0XHR4OiBBbGlnbi5yaWdodCgtMTYpXG5cdFx0XHR5OiBBbGlnbi5ib3R0b20oLTEzKVxuXHRcdFx0aGVpZ2h0OiAzMiwgd2lkdGg6IDMyXG5cdFx0XHRpbnZlcnQ6IHRoZW1lLnNlY29uZGFyeS5pbnZlcnRcblx0XHRcdGltYWdlOiBcImltYWdlcy9pY29ucy9leHBhbmQtbW9yZS5wbmdcIlxuXG5cdFx0QHRpdGxlID0gbmV3IHR5cGUuQm9keTFcblx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBAaGVhZGVyXG5cdFx0XHR3aWR0aDogQHdpZHRoXG5cdFx0XHR4OiAxNiwgeTogQWxpZ24uYm90dG9tKC0xOClcblx0XHRcdHRleHQ6IEBfdGl0bGVcblxuXHRcdGxpbmtzID0gW11cblxuXHRcdGZvciBsaW5rLCBpIGluIEBfbGlua3Ncblx0XHRcdGxpbmtzW2ldID0gbmV3IE1lbnVCdXR0b25cblx0XHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEBcblx0XHRcdFx0eDogMTYsIHk6IDE4OSArICg0OCAqIGkpXG5cdFx0XHRcdHRleHQ6IGxpbmsudGl0bGVcblx0XHRcdFx0aWNvbjogXCJpbWFnZXMvaWNvbnMvI3tsaW5rLmljb259LnBuZ1wiXG5cdFx0XHRcdGFjdGlvbjogbGluay5hY3Rpb25cblxuXHRzaG93OiAtPlxuXHRcdEBicmluZ1RvRnJvbnQoKVxuXHRcdEB2aXNpYmxlID0gdHJ1ZVxuXHRcdEB4ID0gLVNjcmVlbi53aWR0aFxuXHRcdEBhbmltYXRlXG5cdFx0XHR4OiAwXG5cblx0XHRAc2NyaW0ucGxhY2VCZWhpbmQoQClcblx0XHRAc2NyaW0udmlzaWJsZSA9IHRydWVcblx0XHRAc2NyaW0uYW5pbWF0ZVxuXHRcdFx0b3BhY2l0eTogMVxuXG5cdGhpZGU6IC0+XG5cdFx0QGFuaW1hdGVcblx0XHRcdHg6IC1TY3JlZW4ud2lkdGhcblxuXHRcdEBzY3JpbS5hbmltYXRlXG5cdFx0XHRvcGFjaXR5OiAwXG5cblx0XHRVdGlscy5kZWxheSAuMywgPT5cblx0XHRcdEB2aXNpYmxlID0gZmFsc2Vcblx0XHRcdEBzY3JpbS52aXNpYmxlID0gZmFsc2Vcblx0XHRcdEBzZW5kVG9CYWNrKClcblx0XHRcdEBzY3JpbS5zZW5kVG9CYWNrKClcblxuXG4jIFx0ODg4ODg4YmEgIG9vICAgICAgICAgIGRQXG4jIFx0ODggICAgYDhiICAgICAgICAgICAgIDg4XG4jIFx0ODggICAgIDg4IGRQIC5kODg4OGIuIDg4IC5kODg4OGIuIC5kODg4OGIuXG4jIFx0ODggICAgIDg4IDg4IDg4JyAgYDg4IDg4IDg4JyAgYDg4IDg4JyAgYDg4XG4jIFx0ODggICAgLjhQIDg4IDg4LiAgLjg4IDg4IDg4LiAgLjg4IDg4LiAgLjg4XG4jIFx0ODg4ODg4OFAgIGRQIGA4ODg4OFA4IGRQIGA4ODg4OFAnIGA4ODg4UDg4XG4jIFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLjg4XG4jIFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkODg4OFBcblxuZXhwb3J0cy5EaWFsb2cgPSBjbGFzcyBEaWFsb2cgZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdG5hbWU6ICcuJywgc2l6ZTogU2NyZWVuLnNpemUsIGNvbG9yOiB0aGVtZS50aW50XG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6ICdyZ2JhKDAsIDAsIDAsIC41KSdcblx0XHRcdG9wYWNpdHk6IDBcblx0XHRcdFxuXHRcdEBfdGl0bGUgPSBvcHRpb25zLnRpdGxlID8gJ0RlZmF1bHQgVGl0bGUnXG5cdFx0QF9ib2R5ID0gb3B0aW9ucy5ib2R5ID8gJ0JvZHkgdGV4dCBnb2VzIGhlcmUuJ1xuXHRcdEBfYWNjZXB0VGV4dCA9IG9wdGlvbnMuYWNjZXB0VGV4dCA/ICdjb25maXJtJ1xuXHRcdEBfYWNjZXB0QWN0aW9uID0gb3B0aW9ucy5hY2NlcHRBY3Rpb24gPyAtPiBudWxsXG5cdFx0QF9kZWNsaW5lVGV4dCA9IG9wdGlvbnMuZGVjbGluZVRleHQgPyAnJ1xuXHRcdEBfZGVjbGluZUFjdGlvbiA9IG9wdGlvbnMuZGVjbGluZUFjdGlvbiA/IC0+IG51bGxcblx0XHRcblx0XHRAb24gRXZlbnRzLlRhcCwgKGV2ZW50KSAtPiBldmVudC5zdG9wUHJvcGFnYXRpb24oKVxuXHRcdFxuXHRcdEBjb250YWluZXIgPSBuZXcgTGF5ZXJcblx0XHRcdG5hbWU6ICdjb250YWluZXInLCBwYXJlbnQ6IEBcblx0XHRcdHg6IEFsaWduLmNlbnRlclxuXHRcdFx0aGVpZ2h0OiAxMjgsIHdpZHRoOiBTY3JlZW4ud2lkdGggLSA4MFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiB0aGVtZS5kaWFsb2cuYmFja2dyb3VuZENvbG9yXG5cdFx0XHRzaGFkb3dYOiAwLCBzaGFkb3dZOiA3LCBzaGFkb3dCbHVyOiAzMFxuXHRcdFx0b3BhY2l0eTogMFxuXHRcdFx0c2hhZG93Q29sb3I6ICdyZ2JhKDAsMCwwLC4zKSdcblx0XHRcblx0XHRAdGl0bGUgPSBuZXcgdHlwZS5UaXRsZVxuXHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEBjb250YWluZXJcblx0XHRcdHg6IDI0LCB5OiAyMFxuXHRcdFx0Zm9udFNpemU6IDE2LCBmb250V2VpZ2h0OiA1MDAsIGNvbG9yOiB0aGVtZS50ZXh0LnRpdGxlXG5cdFx0XHR0ZXh0OiBAX3RpdGxlXG5cdFx0XG5cdFx0QGJvZHkgPSBuZXcgdHlwZS5TdWJoZWFkU2Vjb25kYXJ5XG5cdFx0XHRuYW1lOiAnYm9keScsIHBhcmVudDogQGNvbnRhaW5lclxuXHRcdFx0eDogMjQsIHk6IDUyXG5cdFx0XHR3aWR0aDogQGNvbnRhaW5lci53aWR0aCAtIDQyXG5cdFx0XHR0ZXh0OiBAX2JvZHlcblx0XHRcblx0XHRidXR0b25zWSA9IGlmIEBfYm9keSBpcyAnJyB0aGVuIDEyOCBlbHNlIEBib2R5Lm1heFkgKyAxNlxuXHRcdFxuXHRcdEBhY2NlcHQgPSBuZXcgQnV0dG9uXG5cdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQGNvbnRhaW5lclxuXHRcdFx0eDogQWxpZ24ucmlnaHQoLTE2KSwgeTogYnV0dG9uc1lcblx0XHRcdHRleHQ6IEBfYWNjZXB0VGV4dC50b1VwcGVyQ2FzZSgpXG5cdFx0XHRhY3Rpb246IEBfYWNjZXB0QWN0aW9uXG5cdFx0XG5cdFx0aWYgQF9kZWNsaW5lVGV4dCBpc250ICcnXG5cdFx0XHRAZGVjbGluZSA9IG5ldyBCdXR0b25cblx0XHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEBjb250YWluZXJcblx0XHRcdFx0eDogMCwgeTogYnV0dG9uc1lcblx0XHRcdFx0dGV4dDogQF9kZWNsaW5lVGV4dC50b1VwcGVyQ2FzZSgpXG5cdFx0XHRcdGFjdGlvbjogQF9kZWNsaW5lQWN0aW9uXG5cblx0XHQjIHNldCBwb3NpdGlvbnNcblx0XHRAY29udGFpbmVyLmhlaWdodCA9IEBhY2NlcHQubWF4WSArIDEyXG5cdFx0QGRlY2xpbmU/Lm1heFggPSBAYWNjZXB0LnggLSAxNlxuXHRcdEBjb250YWluZXIueSA9IEFsaWduLmNlbnRlcigxNilcblx0XHRcblx0XHQjIGFkZCBjbG9zZSBhY3Rpb25zIHRvIGNvbmZpcm0gYW5kIGNhbmNlbFxuXHRcdGZvciBidXR0b24gaW4gW0BhY2NlcHQsIEBkZWNsaW5lXVxuXHRcdFx0YnV0dG9uPy5vblRhcCBAY2xvc2Vcblx0XHRcblx0XHRcblx0XHQjIE9OIExPQURcblx0XHRAb3BlbigpXG5cdFxuXHRvcGVuOiA9PlxuXHRcdEBhbmltYXRlXG5cdFx0XHRvcGFjaXR5OiAxXG5cdFx0XHRvcHRpb25zOiBcblx0XHRcdFx0dGltZTogLjI1XG5cdFx0XG5cdFx0QGNvbnRhaW5lci5hbmltYXRlXG5cdFx0XHRvcGFjaXR5OiAxXG5cdFx0XHRvcHRpb25zOlxuXHRcdFx0XHR0aW1lOiAuMjVcblx0XHRcdFx0ZGVsYXk6IC4wNVxuXG5cdGNsb3NlOiA9PlxuXHRcdEBjb250YWluZXIuYW5pbWF0ZVxuXHRcdFx0b3BhY2l0eTogMFxuXHRcdFx0b3B0aW9uczpcblx0XHRcdFx0dGltZTogLjI1XG5cdFx0XG5cdFx0QGFuaW1hdGVcblx0XHRcdG9wYWNpdHk6IDBcblx0XHRcdG9wdGlvbnM6XG5cdFx0XHRcdHRpbWU6IC4yNVxuXHRcdFxuXHRcdFV0aWxzLmRlbGF5IC41LCA9PiBAZGVzdHJveSgpXG5cblxuXG4jIFx0IDg4ODg4OGJhICAgICAgICAgICAgIGRQICAgICBkUFxuIyBcdCA4OCAgICBgOGIgICAgICAgICAgICA4OCAgICAgODhcbiMgXHRhODhhYWFhOFAnIGRQICAgIGRQIGQ4ODg4UCBkODg4OFAgLmQ4ODg4Yi4gODhkODg4Yi5cbiMgXHQgODggICBgOGIuIDg4ICAgIDg4ICAgODggICAgIDg4ICAgODgnICBgODggODgnICBgODhcbiMgXHQgODggICAgLjg4IDg4LiAgLjg4ICAgODggICAgIDg4ICAgODguICAuODggODggICAgODhcbiMgXHQgODg4ODg4ODhQIGA4ODg4OFAnICAgZFAgICAgIGRQICAgYDg4ODg4UCcgZFAgICAgZFBcblxuXG5leHBvcnRzLkJ1dHRvbiA9IEJ1dHRvbiA9IGNsYXNzIEJ1dHRvbiBleHRlbmRzIExheWVyIFxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblxuXHRcdEBfcmFpc2VkID0gb3B0aW9ucy5yYWlzZWQgPyBmYWxzZVxuXHRcdEBfdHlwZSA9IGlmIEBfcmFpc2VkIHRoZW4gJ3JhaXNlZCcgZWxzZSAnZmxhdCdcblx0XHRAX2FjdGlvbiA9IG9wdGlvbnMuYWN0aW9uID8gLT4gbnVsbFxuXG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0bmFtZTogJy4nXG5cdFx0XHR3aWR0aDogMCwgaGVpZ2h0OiAzNlxuXHRcdFx0Ym9yZGVyUmFkaXVzOiAyXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IHRoZW1lLmJ1dHRvbltAX3R5cGVdLmJhY2tncm91bmRDb2xvclxuXHRcdFx0c2hhZG93WTogdGhlbWUuYnV0dG9uW0BfdHlwZV0uc2hhZG93WVxuXHRcdFx0c2hhZG93Qmx1cjogdGhlbWUuYnV0dG9uW0BfdHlwZV0uc2hhZG93Qmx1clxuXHRcdFx0c2hhZG93Q29sb3I6IHRoZW1lLmJ1dHRvbltAX3R5cGVdLnNoYWRvd0NvbG9yXG5cdFx0XHRhbmltYXRpb25PcHRpb25zOiB7dGltZTogLjE1fVxuXG5cdFx0QGxhYmVsTGF5ZXIgPSBuZXcgdHlwZS5CdXR0b25cblx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBAXG5cdFx0XHRjb2xvcjogdGhlbWUuYnV0dG9uW0BfdHlwZV0uY29sb3Jcblx0XHRcdHRleHQ6IG9wdGlvbnMudGV4dCA/ICdidXR0b24nXG5cdFx0XHR0ZXh0VHJhbnNmb3JtOiAndXBwZXJjYXNlJ1xuXHRcdFx0dGV4dEFsaWduOiAnY2VudGVyJ1xuXHRcdFx0YW5pbWF0aW9uT3B0aW9uczoge3RpbWU6IC4xNX1cblx0XHRcdHBhZGRpbmc6IFxuXHRcdFx0XHRsZWZ0OiAxNi41LCByaWdodDogMTYuNVxuXHRcdFx0XHR0b3A6IDksIGJvdHRvbTogMTFcblxuXHRcdEBzaXplID0gQGxhYmVsTGF5ZXIuc2l6ZVxuXHRcdEB4ID0gb3B0aW9ucy54XG5cblx0XHRAb25Ub3VjaFN0YXJ0IChldmVudCkgLT4gXG5cdFx0XHRAc2hvd1RvdWNoZWQoKVxuXHRcdFx0VXRpbHMuZGVsYXkgMSwgPT4gQHJlc2V0KClcblx0XHRcblx0XHRAb25Ub3VjaEVuZCAoZXZlbnQpIC0+IFxuXHRcdFx0QF9hY3Rpb24oKVxuXHRcdFx0QHJlc2V0KClcblxuXG5cdHNob3dUb3VjaGVkOiAtPiBcblx0XHRAbGFiZWxMYXllci5hbmltYXRlIHticmlnaHRuZXNzOiAxMTAsIHNhdHVyYXRlOiAxMTB9XG5cdFx0XG5cdFx0c3dpdGNoIEBfdHlwZVxuXHRcdFx0d2hlbiAnZmxhdCcgdGhlbiBAYW5pbWF0ZSB7YmFja2dyb3VuZENvbG9yOiAncmdiYSgwLDAsMCwuMDUpJ31cblx0XHRcdHdoZW4gJ3JhaXNlZCdcblx0XHRcdFx0cmlwcGxlKEAsIGV2ZW50LnBvaW50LCBAbGFiZWxMYXllcilcblx0XHRcdFx0QGFuaW1hdGUge3NoYWRvd1k6IDMsIHNoYWRvd1NwcmVhZDogMX1cblxuXHRyZXNldDogLT5cblx0XHRAbGFiZWxMYXllci5hbmltYXRlIHticmlnaHRuZXNzOiAxMDAsIHNhdHVyYXRlOiAxMDB9XG5cdFx0QGJhY2tncm91bmRDb2xvciA9IHRoZW1lLmJ1dHRvbltAX3R5cGVdLmJhY2tncm91bmRDb2xvclxuXHRcdEBhbmltYXRlIFxuXHRcdFx0c2hhZG93WTogdGhlbWUuYnV0dG9uW0BfdHlwZV0uc2hhZG93WVxuXHRcdFx0c2hhZG93U3ByZWFkOiAwXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cbiIsIntkYXRhYmFzZX0gPSByZXF1aXJlICdkYXRhYmFzZSdcblxuXG5cbiMgXHQgODg4ODg4ODhiIGRQXG4jIFx0IDg4ICAgICAgICA4OFxuIyBcdGE4OGFhYWEgICAgODggLmQ4ODg4Yi4gZFAgIGRQICBkUFxuIyBcdCA4OCAgICAgICAgODggODgnICBgODggODggIDg4ICA4OFxuIyBcdCA4OCAgICAgICAgODggODguICAuODggODguODhiLjg4J1xuIyBcdCBkUCAgICAgICAgZFAgYDg4ODg4UCcgODg4OFAgWThQXG4gXHRcblxuZXhwb3J0cy5mbG93ID0gZmxvdyA9IG5ldyBtZC5BcHBcblx0dGhlbWU6ICdkYXUnXG5cdGZvb3RlcjogZmFsc2Vcblx0YW5pbWF0aW9uT3B0aW9uczoge2N1cnZlOiBcInNwcmluZygzMDAsIDM1LCAwKVwifVxuXG5cblxuXG5cblxuIyBcdDg4ODhiYS44OGJhICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgODg4ODg4YmEgICAgICAgICAgICAgZFAgICAgIGRQXG4jIFx0ODggIGA4YiAgYDhiICAgICAgICAgICAgICAgICAgICAgICAgICAgICA4OCAgICBgOGIgICAgICAgICAgICA4OCAgICAgODhcbiMgXHQ4OCAgIDg4ICAgODggLmQ4ODg4Yi4gODhkODg4Yi4gZFAgICAgZFAgYTg4YWFhYThQJyBkUCAgICBkUCBkODg4OFAgZDg4ODhQIC5kODg4OGIuIDg4ZDg4OGIuXG4jIFx0ODggICA4OCAgIDg4IDg4b29vb2Q4IDg4JyAgYDg4IDg4ICAgIDg4ICA4OCAgIGA4Yi4gODggICAgODggICA4OCAgICAgODggICA4OCcgIGA4OCA4OCcgIGA4OFxuIyBcdDg4ICAgODggICA4OCA4OC4gIC4uLiA4OCAgICA4OCA4OC4gIC44OCAgODggICAgLjg4IDg4LiAgLjg4ICAgODggICAgIDg4ICAgODguICAuODggODggICAgODhcbiMgXHRkUCAgIGRQICAgZFAgYDg4ODg4UCcgZFAgICAgZFAgYDg4ODg4UCcgIDg4ODg4ODg4UCBgODg4ODhQJyAgIGRQICAgICBkUCAgIGA4ODg4OFAnIGRQICAgIGRQXG5cblxuY2xhc3MgTWVudUJ1dHRvbiBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXHRcdFxuXHRcdEBfaWNvbiA9IG9wdGlvbnMuaWNvbiA/ICdib29rJ1xuXHRcdEBfdGV4dCA9IG9wdGlvbnMudGV4dCA/ICdEZWZhdWx0J1xuXHRcdEBfYWN0aW9uID0gb3B0aW9ucy5hY3Rpb24gPyAtPiBudWxsXG5cblx0XHRzdXBlciBfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRoZWlnaHQ6IDQ4LCB3aWR0aDogMzA0XG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblxuXHRcdEBpY29uTGF5ZXIgPSBuZXcgTGF5ZXJcblx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBAXG5cdFx0XHR5OiBBbGlnbi5jZW50ZXJcblx0XHRcdGhlaWdodDogMzIsIHdpZHRoOiAzMlxuXHRcdFx0aW52ZXJ0OiAxMDBcblx0XHRcdGltYWdlOiBAX2ljb25cblxuXHRcdEBsYWJlbExheWVyID0gbmV3IFRleHRMYXllclxuXHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEBcblx0XHRcdHk6IEFsaWduLmNlbnRlciwgeDogQGljb25MYXllci5tYXhYICsgMTZcblx0XHRcdHdpZHRoOiAxMDBcblx0XHRcdGZvbnRGYW1pbHk6ICdTdHJhdG9zJ1xuXHRcdFx0Zm9udFNpemU6IDE0XG5cdFx0XHR0ZXh0QWxpZ246ICdsZWZ0J1xuXHRcdFx0Y29sb3I6ICcjRkZGJ1xuXHRcdFx0dGV4dDogXCIje0BfdGV4dH1cIlxuXG5cdFx0QG9uVGFwIEBfYWN0aW9uXG5cdFx0QG9uVGFwIC0+IFxuXHRcdFx0VXRpbHMuZGVsYXkgLjI1LCA9PiBAcGFyZW50LmhpZGUoKVxuXG5cblxuXG5cblxuIyAgICA4ODg4ODhiYSAgICAgICAgICAgICAgICAgICAgZFAgICAgICAgZFAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZFAgIDg4ODg4OGJhICAgICAgICAgICAgIGRQICAgICBkUCAgICAgICAgICAgICAgICAgICAgXG4jICAgIDg4ICAgIGA4YiAgICAgICAgICAgICAgICAgICA4OCAgICAgICA4OCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA4OCAgODggICAgYDhiICAgICAgICAgICAgODggICAgIDg4ICAgICAgICAgICAgICAgICAgICBcbiMgICAgODggICAgIDg4IC5kODg4OGIuIC5kODg4OGIuIDg4ZDg4OGIuIDg4ZDg4OGIuIC5kODg4OGIuIC5kODg4OGIuIDg4ZDg4OGIuIC5kODg4Yjg4IGE4OGFhYWE4UCcgZFAgICAgZFAgZDg4ODhQIGQ4ODg4UCAuZDg4ODhiLiA4OGQ4ODhiLlxuIyAgICA4OCAgICAgODggODgnICBgODggWThvb29vby4gODgnICBgODggODgnICBgODggODgnICBgODggODgnICBgODggODgnICBgODggODgnICBgODggIDg4ICAgYDhiLiA4OCAgICA4OCAgIDg4ICAgICA4OCAgIDg4JyAgYDg4IDg4JyAgYDg4XG4jICAgIDg4ICAgIC44UCA4OC4gIC44OCAgICAgICA4OCA4OCAgICA4OCA4OC4gIC44OCA4OC4gIC44OCA4OC4gIC44OCA4OCAgICAgICA4OC4gIC44OCAgODggICAgLjg4IDg4LiAgLjg4ICAgODggICAgIDg4ICAgODguICAuODggODggICAgODhcbiMgICAgODg4ODg4OFAgIGA4ODg4OFA4IGA4ODg4OFAnIGRQICAgIGRQIDg4WTg4ODgnIGA4ODg4OFAnIGA4ODg4OFA4IGRQICAgICAgIGA4ODg4OFA4ICA4ODg4ODg4OFAgYDg4ODg4UCcgICBkUCAgICAgZFAgICBgODg4ODhQJyBkUCAgICBkUFxuXG5cbmV4cG9ydHMuRGFzaGJvYXJkQnV0dG9uID0gY2xhc3MgRGFzaGJvYXJkQnV0dG9uIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cdFx0XG5cdFx0QF9pY29uID0gb3B0aW9ucy5pY29uID8gJ2Jvb2snXG5cdFx0QF90ZXh0ID0gb3B0aW9ucy50ZXh0ID8gJ0RlZmF1bHQnXG5cdFx0QF9hY3Rpb24gPSBvcHRpb25zLmFjdGlvbiA/IC0+IG51bGxcblxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFx0aGVpZ2h0OiAxMDAsIHdpZHRoOiA1NlxuXG5cdFx0QGljb25MYXllciA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEBcblx0XHRcdHg6IEFsaWduLmNlbnRlciwgeTogMFxuXHRcdFx0aGVpZ2h0OiA3Miwgd2lkdGg6IDcyXG5cdFx0XHRpbnZlcnQ6IDEwMFxuXHRcdFx0aW1hZ2U6IFwiaW1hZ2VzL2ljb25zLyN7QF9pY29ufS5wbmdcIlxuXG5cdFx0QHRleHRMYXllciA9IG5ldyBUZXh0TGF5ZXJcblx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBAXG5cdFx0XHR5OiBAaWNvbkxheWVyLm1heFksIHg6IEFsaWduLmNlbnRlclxuXHRcdFx0d2lkdGg6IDEwMFxuXHRcdFx0Zm9udEZhbWlseTogJ1N0cmF0b3MnXG5cdFx0XHRmb250U2l6ZTogMTNcblx0XHRcdHRleHRBbGlnbjogJ2NlbnRlcidcblx0XHRcdGNvbG9yOiAnI0ZGRidcblx0XHRcdHRleHQ6IFwiI3tAX3RleHR9XCJcblxuXHRcdEBvblRhcCBAX2FjdGlvblxuXG5cblxuXG5cblxuI1x0ZFAgICAgICAgICAgICAgICAgICAgb28gICBkUCAgICAgICAgICAgICAgZFAgICBvbyAgICAgICAgICAgICAgICAgIFxuIyBcdDg4ICAgICAgICAgICAgICAgICAgICAgICAgODggICAgICAgICAgICAgIDg4ICAgICAgICAgICAgICAgICAgICAgICBcbiNcdDg4IDg4ZDg4OGIuIGRQICAgLmRQIGRQIGQ4ODg4UCAuZDg4ODhiLiBkODg4OFAgZFAgLmQ4ODg4Yi4gODhkODg4Yi5cbiMgXHQ4OCA4OCcgIGA4OCA4OCAgIGQ4JyA4OCAgIDg4ICAgODgnICBgODggICA4OCAgIDg4IDg4JyAgYDg4IDg4JyAgYDg4XG4jIFx0ODggODggICAgODggODggLjg4JyAgODggICA4OCAgIDg4LiAgLjg4ICAgODggICA4OCA4OC4gIC44OCA4OCAgICA4OFxuIyBcdGRQIGRQICAgIGRQIDg4ODhQJyAgIGRQICAgZFAgICBgODg4ODhQOCAgIGRQICAgZFAgYDg4ODg4UCcgZFAgICAgZFBcblxuY2xhc3MgSW52aXRhdGlvbiBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9uc1xuXG5cblxuXG5cblxuIyBcdCA4ODg4ODhiYVxuIyBcdCA4OCAgICBgOGJcbiMgXHRhODhhYWFhOFAnIC5kODg4OGIuIC5kODg4OGIuIC5kODg4OGIuIC5kODg4OGIuXG4jIFx0IDg4ICAgICAgICA4OCcgIGA4OCA4OCcgIGA4OCA4OG9vb29kOCBZOG9vb29vLlxuIyBcdCA4OCAgICAgICAgODguICAuODggODguICAuODggODguICAuLi4gICAgICAgODhcbiMgXHQgZFAgICAgICAgIGA4ODg4OFA4IGA4ODg4UDg4IGA4ODg4OFAnIGA4ODg4OFAnXG4jIFx0ICAgICAgICAgICAgICAgICAgICAgICAgIC44OFxuIyBcdCAgICAgICAgICAgICAgICAgICAgIGQ4ODg4UFxuXG5wYWdlcyA9IFtcblx0e3RpdGxlOiAnUHJvZmlsZScsIGljb246ICdhY2NvdW50LWNpcmNsZScsIGFjdGlvbjogLT4gXG5cdFx0Zmxvdy5zaG93TmV4dChuZXcgUHJvZmlsZSl9LFxuXHR7dGl0bGU6ICdCaW9ncmFwaGllcycsIGljb246ICdncm91cCcsIGFjdGlvbjogLT4gXG5cdFx0Zmxvdy5zaG93TmV4dChuZXcgQmlvZ3JhcGhpZXMpfSxcblx0e3RpdGxlOiAnTm90ZXMnLCBpY29uOiAnZHJpdmUtZmlsZScsIGFjdGlvbjogLT4gXG5cdFx0Zmxvdy5zaG93TmV4dChuZXcgTm90ZXMpfSxcblx0e3RpdGxlOiAnTXVzaWMnLCBpY29uOiAnaGVhZHNldCcsIGFjdGlvbjogLT4gXG5cdFx0Zmxvdy5zaG93TmV4dChuZXcgTXVzaWMpfSxcblx0e3RpdGxlOiAnTWFwJywgaWNvbjogJ21hcCcsIGFjdGlvbjogLT4gXG5cdFx0Zmxvdy5zaG93TmV4dChuZXcgTWFwKX0sXG5cdHt0aXRsZTogJ1JhZGlvJywgaWNvbjogJ3dpZmktdGV0aGVyaW5nJywgYWN0aW9uOiAtPiBcblx0XHRmbG93LnNob3dOZXh0KG5ldyBSYWRpbyl9LFxuXHR7dGl0bGU6ICdCb29rJywgaWNvbjogJ2Jvb2snLCBhY3Rpb246IC0+IFxuXHRcdGZsb3cuc2hvd05leHQobmV3IEJvb2spfSxcblx0e3RpdGxlOiAnSGlzdG9yeScsIGljb246ICdkcml2ZS1kb2N1bWVudCcsIGFjdGlvbjogLT4gXG5cdFx0Zmxvdy5zaG93TmV4dChuZXcgSGlzdG9yeSl9LFxuXHR7dGl0bGU6ICdIZWxwJywgaWNvbjogJ3dhcm5pbmcnLCBhY3Rpb246IC0+IFxuXHRcdGZsb3cuc2hvd05leHQobmV3IEhlbHApfSxcbl1cblxuXG5cblxuXG5cbiMgICAgODg4ODg4YmEgICAgICAgICAgICAgICAgICAgIGRQICAgICAgIGRQICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRQXG4jICAgIDg4ICAgIGA4YiAgICAgICAgICAgICAgICAgICA4OCAgICAgICA4OCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA4OFxuIyAgICA4OCAgICAgODggLmQ4ODg4Yi4gLmQ4ODg4Yi4gODhkODg4Yi4gODhkODg4Yi4gLmQ4ODg4Yi4gLmQ4ODg4Yi4gODhkODg4Yi4gLmQ4ODhiODhcbiMgICAgODggICAgIDg4IDg4JyAgYDg4IFk4b29vb28uIDg4JyAgYDg4IDg4JyAgYDg4IDg4JyAgYDg4IDg4JyAgYDg4IDg4JyAgYDg4IDg4JyAgYDg4XG4jICAgIDg4ICAgIC44UCA4OC4gIC44OCAgICAgICA4OCA4OCAgICA4OCA4OC4gIC44OCA4OC4gIC44OCA4OC4gIC44OCA4OCAgICAgICA4OC4gIC44OFxuIyAgICA4ODg4ODg4UCAgYDg4ODg4UDggYDg4ODg4UCcgZFAgICAgZFAgODhZODg4OCcgYDg4ODg4UCcgYDg4ODg4UDggZFAgICAgICAgYDg4ODg4UDhcblxuXG5jbGFzcyBEYXNoYm9hcmQgZXh0ZW5kcyBtZC5QYWdlXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdHRoZW1lOiBmbG93LnRoZW1lXG5cdFx0XHRoZWFkZXI6IFxuXHRcdFx0XHR0aXRsZTogJ0Rhc2hib2FyZCcsIFxuXHRcdFx0XHR2aXNpYmxlOiB0cnVlLCBcblx0XHRcdFx0aWNvbjogJ21lbnUnLCBcblx0XHRcdFx0aWNvbkFjdGlvbjogLT4gbWVudU92ZXJsYXkuc2hvdygpXG5cblx0XHRNQVJHSU4gPSA0OFxuXHRcdFJPV19IRUlHSFQgPSAxMDRcblxuXHRcdEBwcm9maWxlQnV0dG9uID0gbmV3IERhc2hib2FyZEJ1dHRvblxuXHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEBcblx0XHRcdHg6IE1BUkdJTiwgeTogUk9XX0hFSUdIVFxuXHRcdFx0aWNvbjogJ2FjY291bnQtY2lyY2xlJ1xuXHRcdFx0dGV4dDogJ1Byb2ZpbGUnXG5cdFx0XHRhY3Rpb246IC0+IGZsb3cuc2hvd05leHQobmV3IFByb2ZpbGUpXG5cblx0XHRAYmlvc0J1dHRvbiA9IG5ldyBEYXNoYm9hcmRCdXR0b25cblx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBAXG5cdFx0XHR4OiBBbGlnbi5jZW50ZXIsIHk6IFJPV19IRUlHSFRcblx0XHRcdGljb246ICdncm91cCdcblx0XHRcdHRleHQ6ICdCaW9ncmFwaGllcydcblx0XHRcdGFjdGlvbjogLT4gZmxvdy5zaG93TmV4dChuZXcgQmlvZ3JhcGhpZXMpXG5cblx0XHRAbm90ZXNCdXR0b24gPSBuZXcgRGFzaGJvYXJkQnV0dG9uXG5cdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQFxuXHRcdFx0eDogQWxpZ24ucmlnaHQoLU1BUkdJTiksIHk6IFJPV19IRUlHSFRcblx0XHRcdGljb246ICdkcml2ZS1maWxlJ1xuXHRcdFx0dGV4dDogJ05vdGVzJ1xuXHRcdFx0YWN0aW9uOiAtPiBmbG93LnNob3dOZXh0KG5ldyBOb3RlcylcblxuXHRcdEBoZWFkc2V0QnV0dG9uID0gbmV3IERhc2hib2FyZEJ1dHRvblxuXHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEBcblx0XHRcdHg6IE1BUkdJTiwgeTogUk9XX0hFSUdIVCAqIDJcblx0XHRcdGljb246ICdoZWFkc2V0J1xuXHRcdFx0dGV4dDogJ011c2ljJ1xuXHRcdFx0YWN0aW9uOiAtPiBmbG93LnNob3dOZXh0KG5ldyBNdXNpYylcblxuXHRcdEBtYXBCdXR0b24gPSBuZXcgRGFzaGJvYXJkQnV0dG9uXG5cdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQFxuXHRcdFx0eDogQWxpZ24uY2VudGVyLCB5OiBST1dfSEVJR0hUICogMlxuXHRcdFx0aWNvbjogJ21hcCdcblx0XHRcdHRleHQ6ICdNYXAnXG5cdFx0XHRhY3Rpb246IC0+IGZsb3cuc2hvd05leHQobmV3IE1hcClcblxuXHRcdEByYWRpb0J1dHRvbiA9IG5ldyBEYXNoYm9hcmRCdXR0b25cblx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBAXG5cdFx0XHR4OiBBbGlnbi5yaWdodCgtTUFSR0lOKSwgeTogUk9XX0hFSUdIVCAqIDJcblx0XHRcdGljb246ICd3aWZpLXRldGhlcmluZydcblx0XHRcdHRleHQ6ICdSYWRpbydcblx0XHRcdGFjdGlvbjogLT4gZmxvdy5zaG93TmV4dChuZXcgUmFkaW8pXG5cblx0XHRAYm9va0J1dHRvbiA9IG5ldyBEYXNoYm9hcmRCdXR0b25cblx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBAXG5cdFx0XHR4OiBNQVJHSU4sIHk6IFJPV19IRUlHSFQgKiAzXG5cdFx0XHRpY29uOiAnYm9vaydcblx0XHRcdHRleHQ6ICdCb29rJ1xuXHRcdFx0YWN0aW9uOiAtPiBmbG93LnNob3dOZXh0KG5ldyBCb29rKVxuXG5cdFx0QGhpc3RvcnlCdXR0b24gPSBuZXcgRGFzaGJvYXJkQnV0dG9uXG5cdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQFxuXHRcdFx0eDogQWxpZ24uY2VudGVyLCB5OiBST1dfSEVJR0hUICogM1xuXHRcdFx0aWNvbjogJ2RyaXZlLWRvY3VtZW50J1xuXHRcdFx0dGV4dDogJ0hpc3RvcnknXG5cdFx0XHRhY3Rpb246IC0+IGZsb3cuc2hvd05leHQobmV3IEhpc3RvcnkpXG5cblx0XHRAaGVscEJ1dHRvbiA9IG5ldyBEYXNoYm9hcmRCdXR0b25cblx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBAXG5cdFx0XHR4OiBBbGlnbi5yaWdodCgtTUFSR0lOKSwgeTogUk9XX0hFSUdIVCAqIDNcblx0XHRcdGljb246ICd3YXJuaW5nJ1xuXHRcdFx0dGV4dDogJ0hlbHAnXG5cdFx0XHRhY3Rpb246IC0+IGZsb3cuc2hvd05leHQobmV3IEhlbHApXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cbiMgXHQ4ODg4YmEuODhiYSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC44ODg4OC4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRQICAgICAgICAgICAgICAgICAgXG4jIFx0ODggIGA4YiAgYDhiICAgICAgICAgICAgICAgICAgICAgICAgICAgIGQ4JyAgIGA4YiAgICAgICAgICAgICAgICAgICAgICAgICAgICA4OCAgICAgICAgICAgICAgICAgIFxuIyBcdDg4ICAgODggICA4OCAuZDg4ODhiLiA4OGQ4ODhiLiBkUCAgICBkUCA4OCAgICAgODggZFAgICAuZFAgLmQ4ODg4Yi4gODhkODg4Yi4gODggLmQ4ODg4Yi4gZFAgICAgZFBcbiMgXHQ4OCAgIDg4ICAgODggODhvb29vZDggODgnICBgODggODggICAgODggODggICAgIDg4IDg4ICAgZDgnIDg4b29vb2Q4IDg4JyAgYDg4IDg4IDg4JyAgYDg4IDg4ICAgIDg4XG4jIFx0ODggICA4OCAgIDg4IDg4LiAgLi4uIDg4ICAgIDg4IDg4LiAgLjg4IFk4LiAgIC44UCA4OCAuODgnICA4OC4gIC4uLiA4OCAgICAgICA4OCA4OC4gIC44OCA4OC4gIC44OFxuIyBcdGRQICAgZFAgICBkUCBgODg4ODhQJyBkUCAgICBkUCBgODg4ODhQJyAgYDg4ODhQJyAgODg4OFAnICAgYDg4ODg4UCcgZFAgICAgICAgZFAgYDg4ODg4UDggYDg4ODhQODhcbiMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC44OFxuIyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkODg4OFAgXG5cbmNsYXNzIE1lbnVPdmVybGF5IGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0aGVpZ2h0OiBTY3JlZW4uaGVpZ2h0XG5cdFx0XHR3aWR0aDogMzA0XG5cdFx0XHRoZWlnaHQ6IFNjcmVlbi5oZWlnaHRcblx0XHRcdHZpc2libGU6IGZhbHNlXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6ICcjMzAzMDMwJ1xuXHRcdFx0YW5pbWF0aW9uT3B0aW9uczoge2N1cnZlOiBcInNwcmluZygzMDAsIDM1LCAwKVwifVxuXG5cdFx0QHNjcmltID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiAnLicsIFxuXHRcdFx0c2l6ZTogU2NyZWVuLnNpemVcblx0XHRcdGJhY2tncm91bmRDb2xvcjogJ3JnYmEoMCwwLDAsLjgpJ1xuXHRcdFx0b3BhY2l0eTogMFxuXHRcdFx0dmlzaWJsZTogZmFsc2Vcblx0XHRcdGFuaW1hdGlvbk9wdGlvbnM6XG5cdFx0XHRcdHRpbWU6IC4yNVxuXG5cdFx0QHNjcmltLm9uVGFwID0+IEBoaWRlKClcblx0XHRAb25Td2lwZUxlZnRFbmQgPT4gQGhpZGUoKVxuXG5cdFx0QHVzZXJQaG90byA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEBcblx0XHRcdHdpZHRoOiBAd2lkdGgsIGhlaWdodDogMTczXG5cdFx0XHRpbWFnZTogZGF0YWJhc2UudXNlci5pbWFnZVxuXHRcdFx0YnJpZ2h0bmVzczogNTBcblxuXHRcdEB1c2VyTmFtZSA9IG5ldyBtZC5UaXRsZVxuXHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEBcblx0XHRcdHdpZHRoOiBAd2lkdGhcblx0XHRcdGZvbnRTaXplOiAyOFxuXHRcdFx0Y29sb3I6ICcjRkZGJ1xuXHRcdFx0eDogMTYsIHk6IDMyXG5cdFx0XHR0ZXh0OiBkYXRhYmFzZS51c2VyLm5hbWVcblxuXHRcdEB1c2VyTmFtZS5tYXhZID0gQHVzZXJQaG90by5tYXhZIC0gMTZcblxuXHRcdGxpbmtzID0gW11cblxuXHRcdGZvciBwYWdlLCBpIGluIHBhZ2VzXG5cdFx0XHRsaW5rc1tpXSA9IG5ldyBNZW51QnV0dG9uXG5cdFx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBAXG5cdFx0XHRcdHg6IDE2LCB5OiAxODkgKyAoNDggKiBpKVxuXHRcdFx0XHR0ZXh0OiBwYWdlLnRpdGxlXG5cdFx0XHRcdGljb246IFwiaW1hZ2VzL2ljb25zLyN7cGFnZS5pY29ufS5wbmdcIlxuXHRcdFx0XHRhY3Rpb246IHBhZ2UuYWN0aW9uXG5cblx0c2hvdzogLT5cblx0XHRAYnJpbmdUb0Zyb250KClcblx0XHRAdmlzaWJsZSA9IHRydWVcblx0XHRAeCA9IC1TY3JlZW4ud2lkdGhcblx0XHRAYW5pbWF0ZVxuXHRcdFx0eDogMFxuXG5cdFx0QHNjcmltLnBsYWNlQmVoaW5kKEApXG5cdFx0QHNjcmltLnZpc2libGUgPSB0cnVlXG5cdFx0QHNjcmltLmFuaW1hdGVcblx0XHRcdG9wYWNpdHk6IDFcblxuXHRoaWRlOiAtPlxuXHRcdEBhbmltYXRlXG5cdFx0XHR4OiAtU2NyZWVuLndpZHRoXG5cblx0XHRAc2NyaW0uYW5pbWF0ZVxuXHRcdFx0b3BhY2l0eTogMFxuXG5cdFx0VXRpbHMuZGVsYXkgLjMsID0+XG5cdFx0XHRAdmlzaWJsZSA9IGZhbHNlXG5cdFx0XHRAc2NyaW0udmlzaWJsZSA9IGZhbHNlXG5cdFx0XHRAc2VuZFRvQmFjaygpXG5cdFx0XHRAc2NyaW0uc2VuZFRvQmFjaygpXG5cblxuXG5cblxuXG5cbiMgXHQgODg4ODg4YmEgICAgICAgICAgICAgICAgICAgIC44ODg4YiBvbyBkUFxuIyBcdCA4OCAgICBgOGIgICAgICAgICAgICAgICAgICAgODggICBcIiAgICA4OFxuIyBcdGE4OGFhYWE4UCcgODhkODg4Yi4gLmQ4ODg4Yi4gODhhYWEgIGRQIDg4IC5kODg4OGIuXG4jIFx0IDg4ICAgICAgICA4OCcgIGA4OCA4OCcgIGA4OCA4OCAgICAgODggODggODhvb29vZDhcbiMgXHQgODggICAgICAgIDg4ICAgICAgIDg4LiAgLjg4IDg4ICAgICA4OCA4OCA4OC4gIC4uLlxuIyBcdCBkUCAgICAgICAgZFAgICAgICAgYDg4ODg4UCcgZFAgICAgIGRQIGRQIGA4ODg4OFAnXG5cbmNsYXNzIFByb2ZpbGUgZXh0ZW5kcyBtZC5QYWdlXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucykgLT5cblx0XHRzdXBlciBfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHR0aGVtZTogZmxvdy50aGVtZVxuXHRcdFx0aGVhZGVyOlxuXHRcdFx0XHR0aXRsZTogJ1Byb2ZpbGUnXG5cdFx0XHRcdHZpc2libGU6IHRydWUsIFxuXHRcdFx0XHRpY29uOiAnYXJyb3ctYmFjaycsIFxuXHRcdFx0XHRpY29uQWN0aW9uOiAtPiBcblx0XHRcdFx0XHRmbG93LnNob3dQcmV2aW91cygpXG5cdFx0XHRcdFx0QGRlc3Ryb3koKVxuXG5cblxuXG5cblxuI1x0ICA4ODg4ODhiYSAgb28gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZFAgICAgICAgb29cbiNcdCAgODggICAgYDhiICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDg4XG4jXHQgYTg4YWFhYThQJyBkUCAuZDg4ODhiLiAuZDg4ODhiLiA4OGQ4ODhiLiAuZDg4ODhiLiA4OGQ4ODhiLiA4OGQ4ODhiLiBkUCAuZDg4ODhiLiAuZDg4ODhiLlxuI1x0ICA4OCAgIGA4Yi4gODggODgnICBgODggODgnICBgODggODgnICBgODggODgnICBgODggODgnICBgODggODgnICBgODggODggODhvb29vZDggWThvb29vby5cbiNcdCAgODggICAgLjg4IDg4IDg4LiAgLjg4IDg4LiAgLjg4IDg4ICAgICAgIDg4LiAgLjg4IDg4LiAgLjg4IDg4ICAgIDg4IDg4IDg4LiAgLi4uICAgICAgIDg4XG4jXHQgIDg4ODg4ODg4UCBkUCBgODg4ODhQJyBgODg4OFA4OCBkUCAgICAgICBgODg4ODhQOCA4OFk4ODhQJyBkUCAgICBkUCBkUCBgODg4ODhQJyBgODg4ODhQJ1xuI1x0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuODggICAgICAgICAgICAgICAgICAgODhcbiNcdCAgICAgICAgICAgICAgICAgICAgICAgICBkODg4OFAgICAgICAgICAgICAgICAgICAgIGRQXG5cbmNsYXNzIEJpb2dyYXBoaWVzIGV4dGVuZHMgbWQuUGFnZVxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblx0XHRzdXBlciBfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHR0aGVtZTogZmxvdy50aGVtZVxuXHRcdFx0aGVhZGVyOlxuXHRcdFx0XHR0aXRsZTogJ0Jpb2dyYXBoaWVzJ1xuXHRcdFx0XHR2aXNpYmxlOiB0cnVlLCBcblx0XHRcdFx0aWNvbjogJ2Fycm93LWJhY2snLCBcblx0XHRcdFx0aWNvbkFjdGlvbjogLT4gXG5cdFx0XHRcdFx0Zmxvdy5zaG93UHJldmlvdXMoKVxuXHRcdFx0XHRcdEBkZXN0cm95KClcblxuXG5cblxuXG5cbiNcdCAgODg4ODg4YmEgIG9vXG4jXHQgIDg4ICAgIGA4YlxuI1x0IGE4OGFhYWE4UCcgZFAgLmQ4ODg4Yi5cbiNcdCAgODggICBgOGIuIDg4IDg4JyAgYDg4XG4jXHQgIDg4ICAgIC44OCA4OCA4OC4gIC44OFxuI1x0ICA4ODg4ODg4OFAgZFAgYDg4ODg4UCdcblxuXG5cbmNsYXNzIEJpb2dyYXBoaWVzRm9jdXMgZXh0ZW5kcyBtZC5QYWdlXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXG5cdFx0QF9zb3VyY2UgPSBvcHRpb25zLnNvdXJjZSA/IHt0aXRsZTogJ0RlZmF1bHQnfVxuXG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0dGhlbWU6IGZsb3cudGhlbWVcblx0XHRcdGhlYWRlcjpcblx0XHRcdFx0dGl0bGU6IFwiI3tAX3NvdXJjZS50aXRsZX1cIlxuXHRcdFx0XHR2aXNpYmxlOiB0cnVlLCBcblx0XHRcdFx0aWNvbjogJ2Fycm93LWJhY2snLCBcblx0XHRcdFx0aWNvbkFjdGlvbjogLT4gXG5cdFx0XHRcdFx0Zmxvdy5zaG93UHJldmlvdXMoKVxuXHRcdFx0XHRcdEBkZXN0cm95KClcblxuXG5cblxuXG5cbiMgXHQ4ODg4ODhiYSAgICAgICAgICAgICBkUCAgICAgICAgICAgICAgICAgICAgXG4jIFx0ODggICAgYDhiICAgICAgICAgICAgODggICAgICAgICAgICAgICAgICAgIFxuIyBcdDg4ICAgICA4OCAuZDg4ODhiLiBkODg4OFAgLmQ4ODg4Yi4gLmQ4ODg4Yi5cbiMgXHQ4OCAgICAgODggODgnICBgODggICA4OCAgIDg4b29vb2Q4IFk4b29vb28uXG4jIFx0ODggICAgIDg4IDg4LiAgLjg4ICAgODggICA4OC4gIC4uLiAgICAgICA4OFxuIyBcdGRQICAgICBkUCBgODg4ODhQJyAgIGRQICAgYDg4ODg4UCcgYDg4ODg4UCdcblxuXG5jbGFzcyBOb3RlcyBleHRlbmRzIG1kLlBhZ2Vcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cblx0XHRAX3RleHQgPSBkYXRhYmFzZS51c2VyLm5vdGVcblxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdHRoZW1lOiBmbG93LnRoZW1lXG5cdFx0XHRoZWFkZXI6XG5cdFx0XHRcdHRpdGxlOiAnTm90ZXMnXG5cdFx0XHRcdHZpc2libGU6IHRydWUsIFxuXHRcdFx0XHRpY29uOiAnYXJyb3ctYmFjaycsIFxuXHRcdFx0XHRpY29uQWN0aW9uOiAtPiBcblx0XHRcdFx0XHRmbG93LnNob3dQcmV2aW91cygpXG5cdFx0XHRcdFx0QGRlc3Ryb3koKVxuXG5cdFx0QHRleHRGaWVsZCA9IG5ldyBMYXllclxuXHRcdFx0cGFyZW50OiBAXG5cdFx0XHR4OiAxNiwgeTogMTAwXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcdGh0bWw6IFwiXCJcIlxuXHRcdFx0PHRleHRhcmVhIG5hbWU9XCJ0ZXh0YXJlYVwiIGNsYXNzPVwidGV4dGFyZWFcIiBzdHlsZT1cIlxuXHRcdFx0XHRiYWNrZ3JvdW5kLWNvbG9yOiAjMDAwMDAwO1xuXHRcdFx0XHR3aWR0aDogMzIwcHg7XG5cdFx0XHRcdGhlaWdodDogNTAwcHg7XG5cdFx0XHRcdGZvbnQtZmFtaWx5OiBTdHJhdG9zO1xuXHRcdFx0XHRmb250LXNpemU6IDE2cHg7XG5cdFx0XHRcdGZvbnQtd2VpZ2h0OiA0MDA7XG5cdFx0XHRcdGNvbG9yOiAjRkZGRkZGO1xuXHRcdFx0XHRsaW5lLWhlaWdodDogMjBweDtcblx0XHRcdFx0Ym9yZGVyOiBub25lO1xuXHRcdFx0XHRvdXRsaW5lOiBub25lOyBcblx0XHRcdFx0XCI+XG5cdFx0XHRcdCN7QF90ZXh0fVxuXHRcdFx0PC90ZXh0YXJlYT5cblx0XHRcIlwiXCJcblxuXHRcdEB0ZXh0QXJlYSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudGV4dGFyZWFcIilbMF1cblxuXG5cdFx0QG9uIFwia2V5dXBcIiwgPT5cblx0XHRcdGRhdGFiYXNlLnVzZXIubm90ZSA9IEB0ZXh0QXJlYS52YWx1ZVxuXG5cblxuIyBcdDg4ODhiYS44OGJhICAgICAgICAgICAgICAgICAgICBvb1xuIyBcdDg4ICBgOGIgIGA4YlxuIyBcdDg4ICAgODggICA4OCBkUCAgICBkUCAuZDg4ODhiLiBkUCAuZDg4ODhiLlxuIyBcdDg4ICAgODggICA4OCA4OCAgICA4OCBZOG9vb29vLiA4OCA4OCcgIGBcIlwiXG4jIFx0ODggICA4OCAgIDg4IDg4LiAgLjg4ICAgICAgIDg4IDg4IDg4LiAgLi4uXG4jIFx0ZFAgICBkUCAgIGRQIGA4ODg4OFAnIGA4ODg4OFAnIGRQIGA4ODg4OFAnXG5cbmNsYXNzIE11c2ljIGV4dGVuZHMgbWQuUGFnZVxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblx0XHRzdXBlciBfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHR0aGVtZTogZmxvdy50aGVtZVxuXHRcdFx0aGVhZGVyOlxuXHRcdFx0XHR0aXRsZTogJ011c2ljJ1xuXHRcdFx0XHR2aXNpYmxlOiB0cnVlLCBcblx0XHRcdFx0aWNvbjogJ2Fycm93LWJhY2snLCBcblx0XHRcdFx0aWNvbkFjdGlvbjogLT4gXG5cdFx0XHRcdFx0Zmxvdy5zaG93UHJldmlvdXMoKVxuXHRcdFx0XHRcdEBkZXN0cm95KClcblxuXHRcdEBtdXNpY0ljb24gPSBuZXcgTGF5ZXJcblx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBAXG5cdFx0XHRoZWlnaHQ6IDE1Miwgd2lkdGg6IDE1MlxuXHRcdFx0eDogQWxpZ24uY2VudGVyLCB5OiBBbGlnbi5jZW50ZXIoLTY0KVxuXHRcdFx0aW1hZ2U6ICdpbWFnZXMvaWNvbnMvaGVhZHNldC5wbmcnXG5cdFx0XHRpbnZlcnQ6IDEwMFxuXG5cdFx0QG11c2ljRGVzY3JpcHRpb24xID0gbmV3IG1kLlJlZ3VsYXJcblx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBAXG5cdFx0XHR4OiBBbGlnbi5jZW50ZXIsIHk6IEBtdXNpY0ljb24ubWF4WVxuXHRcdFx0Y29sb3I6IFwiI0ZGRlwiLCB0ZXh0QWxpZ246IFwiY2VudGVyXCJcblx0XHRcdHdpZHRoOiAyODBcblx0XHRcdHRleHQ6ICdZb3VyIG11c2ljIGlzIGNvbXBvc2VkIGJhc2VkIOKAqG9uIHdoYXQgd2Uga25vdyBhYm91dCB5b3UuJ1xuXG5cdFx0QG11c2ljRGVzY3JpcHRpb24yID0gbmV3IG1kLlJlZ3VsYXJcblx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBAXG5cdFx0XHR4OiBBbGlnbi5jZW50ZXIsIHk6IEBtdXNpY0Rlc2NyaXB0aW9uMS5tYXhZICsgMTZcblx0XHRcdGNvbG9yOiBcIiNGRkZcIiwgdGV4dEFsaWduOiBcImNlbnRlclwiXG5cdFx0XHR3aWR0aDogMjgwXG5cdFx0XHR0ZXh0OiAnIEl0IGlzIHVuaXF1ZSB0byB5b3UuJ1xuXG5cdFx0QG11c2ljRGVzY3JpcHRpb24zID0gbmV3IG1kLlJlZ3VsYXJcblx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBAXG5cdFx0XHR4OiBBbGlnbi5jZW50ZXIsIHk6IEBtdXNpY0Rlc2NyaXB0aW9uMi5tYXhZICsgMTZcblx0XHRcdGNvbG9yOiBcIiNGRkZcIiwgdGV4dEFsaWduOiBcImNlbnRlclwiXG5cdFx0XHR3aWR0aDogMjQwXG5cdFx0XHR0ZXh0OiAnIElmIHlvdSBkbyBub3QgZW5qb3kgd2hhdCDigKh5b3UgaGVhciwgcGxlYXNlIGNoYW5nZS4nXG5cblxuXG5cblxuIyBcdDg4ODhiYS44OGJhXG4jIFx0ODggIGA4YiAgYDhiXG4jIFx0ODggICA4OCAgIDg4IC5kODg4OGIuIDg4ZDg4OGIuXG4jIFx0ODggICA4OCAgIDg4IDg4JyAgYDg4IDg4JyAgYDg4XG4jIFx0ODggICA4OCAgIDg4IDg4LiAgLjg4IDg4LiAgLjg4XG4jIFx0ZFAgICBkUCAgIGRQIGA4ODg4OFA4IDg4WTg4OFAnXG4jIFx0ICAgICAgICAgICAgICAgICAgICAgIDg4XG4jIFx0ICAgICAgICAgICAgICAgICAgICAgIGRQXG5cbmNsYXNzIE1hcCBleHRlbmRzIG1kLlBhZ2Vcblx0Y29uc3RydWN0b3I6IChvcHRpb25zKSAtPlxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdHRoZW1lOiBmbG93LnRoZW1lXG5cdFx0XHRoZWFkZXI6XG5cdFx0XHRcdHRpdGxlOiAnTWFwJ1xuXHRcdFx0XHR2aXNpYmxlOiB0cnVlLCBcblx0XHRcdFx0aWNvbjogJ2Fycm93LWJhY2snLCBcblx0XHRcdFx0aWNvbkFjdGlvbjogLT4gXG5cdFx0XHRcdFx0Zmxvdy5zaG93UHJldmlvdXMoKVxuXHRcdFx0XHRcdEBkZXN0cm95KClcblx0XHRcblx0XHRAbWFwID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQFxuXHRcdFx0c2l6ZTogQHNpemVcblx0XHRcdHNjYWxlOiAxLjVcblx0XHRcdGJyaWdodG5lc3M6IDgwXG5cdFx0XHRpbWFnZTogJ2ltYWdlcy9tYXAucG5nJ1xuXG5cdFx0QG1hcC5kcmFnZ2FibGUgPSB0cnVlXG5cblx0XHRAZmluZE1lQm94ID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQFxuXHRcdFx0eDogQWxpZ24ucmlnaHQoLTgpLCB5OiBBbGlnbi5ib3R0b20oLTE3Nilcblx0XHRcdHdpZHRoOiA0OCwgaGVpZ2h0OiA0OFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiAnI2VmZWZlZidcblx0XHRcdGJvcmRlclJhZGl1czogMjRcblxuXHRcdEBmaW5kTWUgPSBuZXcgTGF5ZXJcblx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBAZmluZE1lQm94XG5cdFx0XHR4OiBBbGlnbi5jZW50ZXIsIHk6IEFsaWduLmNlbnRlclxuXHRcdFx0d2lkdGg6IDQwLCBoZWlnaHQ6IDQwXG5cdFx0XHRpbWFnZTogJ2ltYWdlcy9pY29ucy9yYWRpby1idXR0b24tb24ucG5nJ1xuXG5cdFx0QHpvb21Cb3ggPSBuZXcgTGF5ZXJcblx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBAXG5cdFx0XHR4OiBBbGlnbi5yaWdodCgtOCksIHk6IEFsaWduLmJvdHRvbSgtNjQpXG5cdFx0XHR3aWR0aDogNDgsIGhlaWdodDogOTZcblx0XHRcdGJhY2tncm91bmRDb2xvcjogJyNlZmVmZWYnXG5cdFx0XHRib3JkZXJSYWRpdXM6IDI0XG5cblx0XHRAem9vbUluID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQHpvb21Cb3hcblx0XHRcdHg6IEFsaWduLmNlbnRlciwgeTogOFxuXHRcdFx0d2lkdGg6IDQwLCBoZWlnaHQ6IDQwXG5cdFx0XHRpbWFnZTogJ2ltYWdlcy9pY29ucy9hZGQucG5nJ1xuXG5cdFx0QHpvb21PdXQgPSBuZXcgTGF5ZXJcblx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBAem9vbUJveFxuXHRcdFx0eDogQWxpZ24uY2VudGVyLCB5OiBBbGlnbi5ib3R0b20oLTgpXG5cdFx0XHR3aWR0aDogNDAsIGhlaWdodDogNDBcblx0XHRcdGltYWdlOiAnaW1hZ2VzL2ljb25zL3JlbW92ZS5wbmcnXG5cblxuXG5cblxuI1x0IDg4ODg4OGJhICAgICAgICAgICAgICAgICBkUCBvb1xuI1x0ICA4OCAgICBgOGIgICAgICAgICAgICAgICAgODhcbiNcdCBhODhhYWFhOFAnIC5kODg4OGIuIC5kODg4Yjg4IGRQIC5kODg4OGIuXG4jXHQgIDg4ICAgYDhiLiA4OCcgIGA4OCA4OCcgIGA4OCA4OCA4OCcgIGA4OFxuI1x0ICA4OCAgICAgODggODguICAuODggODguICAuODggODggODguICAuODhcbiNcdCAgZFAgICAgIGRQIGA4ODg4OFA4IGA4ODg4OFA4IGRQIGA4ODg4OFAnXG5cblxuXG5jbGFzcyBSYWRpbyBleHRlbmRzIG1kLlBhZ2Vcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0dGhlbWU6IGZsb3cudGhlbWVcblx0XHRcdGhlYWRlcjpcblx0XHRcdFx0dGl0bGU6ICdSYWRpbydcblx0XHRcdFx0dmlzaWJsZTogdHJ1ZSwgXG5cdFx0XHRcdGljb246ICdhcnJvdy1iYWNrJywgXG5cdFx0XHRcdGljb25BY3Rpb246IC0+IFxuXHRcdFx0XHRcdGZsb3cuc2hvd1ByZXZpb3VzKClcblx0XHRcdFx0XHRAZGVzdHJveSgpXG5cblx0XHRAcmFkaW9JY29uID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQFxuXHRcdFx0aGVpZ2h0OiAxNTIsIHdpZHRoOiAxNTJcblx0XHRcdHg6IEFsaWduLmNlbnRlciwgeTogQWxpZ24uY2VudGVyKC02NClcblx0XHRcdGltYWdlOiAnaW1hZ2VzL2ljb25zL3dpZmktdGV0aGVyaW5nLnBuZydcblx0XHRcdGludmVydDogMTAwXG5cblx0XHRAcmFkaW9MYWJlbCA9IG5ldyBtZC5SZWd1bGFyXG5cdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQFxuXHRcdFx0eDogQWxpZ24uY2VudGVyLCB5OiBAcmFkaW9JY29uLm1heFlcblx0XHRcdGNvbG9yOiBcIiNGRkZcIiwgdGV4dEFsaWduOiBcImNlbnRlclwiXG5cdFx0XHR0ZXh0OiAnU2VhcmNoaW5nIGZvciBzaWduYWwuLi4nXG5cblx0XHRAcmFkaW9EZXNjcmlwdGlvbiA9IG5ldyBtZC5SZWd1bGFyXG5cdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQFxuXHRcdFx0eDogQWxpZ24uY2VudGVyLCB5OiBAcmFkaW9MYWJlbC5tYXhZICsgMzJcblx0XHRcdGNvbG9yOiBcIiNGRkZcIiwgdGV4dEFsaWduOiBcImNlbnRlclwiXG5cdFx0XHR3aWR0aDogMjAwXG5cdFx0XHR0ZXh0OiAnUmFkaW8gaXMgb25seSBhdmFpbGFibGUgaW4g4oCoY2VydGFpbiBhcmVhcyBvZiB0aGUgU3BhY2UuJ1xuXG5cblxuIyBcdCA4ODg4ODhiYSAgICAgICAgICAgICAgICAgICAgZFBcbiMgXHQgODggICAgYDhiICAgICAgICAgICAgICAgICAgIDg4XG4jIFx0YTg4YWFhYThQJyAuZDg4ODhiLiAuZDg4ODhiLiA4OCAgLmRQXG4jIFx0IDg4ICAgYDhiLiA4OCcgIGA4OCA4OCcgIGA4OCA4ODg4OFwiXG4jIFx0IDg4ICAgIC44OCA4OC4gIC44OCA4OC4gIC44OCA4OCAgYDhiLlxuIyBcdCA4ODg4ODg4OFAgYDg4ODg4UCcgYDg4ODg4UCcgZFAgICBgWVBcbiMgXHRcbiMgXHRcblxuY2xhc3MgQm9vayBleHRlbmRzIG1kLlBhZ2Vcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0dGhlbWU6IGZsb3cudGhlbWVcblx0XHRcdGhlYWRlcjpcblx0XHRcdFx0dGl0bGU6ICdCb29rJ1xuXHRcdFx0XHR2aXNpYmxlOiB0cnVlLCBcblx0XHRcdFx0aWNvbjogJ2Fycm93LWJhY2snLCBcblx0XHRcdFx0aWNvbkFjdGlvbjogLT4gXG5cdFx0XHRcdFx0Zmxvdy5zaG93UHJldmlvdXMoKVxuXHRcdFx0XHRcdEBkZXN0cm95KClcblxuXHRcdEBib29rRmxvdyA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEBjb250ZW50XG5cdFx0XHR4OiAxNiwgeTogOTZcblx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFx0d2lkdGg6IEB3aWR0aCAtIDMyXG5cdFx0XHRoZWlnaHQ6IEBoZWlnaHQgKiAyXG5cdFx0XG5cdFx0QGJvb2tGbG93LnN0eWxlID1cblx0XHRcdGZvbnRGYW1pbHk6ICdTdHJhdG9zJ1xuXHRcdFx0Zm9udFNpemU6ICcxNnB4J1xuXHRcdFx0bGluZUhlaWdodDogJzEuNCdcblx0XHRcdGNvbG9yOiAnI0ZGRidcblx0XHRcblx0XHRAYm9va0Zsb3cuaHRtbCA9IFwiXCJcIkZBREUgSU46PGJyPjxicj5cbjEgSU5ULiBXQVNISU5HVE9OIE1VU0VVTSAtIERBWSAxPGJyPjxicj5cblRoZSBzYWRkZXN0IGV5ZXMgeW91IGV2ZXIgc2F3LlxuV2UgYXJlIGxvb2tpbmcgYXQgYW4gRWwgR3JlY28gZHJhd2luZy4gSXQgaXMgYSBzdHVkeSBmb3Jcbm9uZSBvZiBoaXMgcGFpbnRpbmdzLjxicj48YnI+XG5QVUxMIEJBQ0sgVE8gUkVWRUFMIC0tPGJyPjxicj5cbkEgYnVuY2ggb2YgYXJ0IHN0dWRlbnRzIGFyZSBkb2luZyBza2V0Y2hlcyBvZiB0aGUgZXllcyxcbnRoZSBlbG9uZ2F0ZWQgZmluZ2VycywgdGhlIHNsZW5kZXIgaGFuZHMgRWwgR3JlY28gZHJldyBzb1xuYnJpbGxpYW50bHkuPGJyPjxicj5cbk1vc3Qgb2YgdGhlIHN0dWRlbnRzIGFyZSBhcm91bmQgMjAuIEEgY291cGxlIG9mIHN1YnVyYmFuXG5ob3VzZXdpdmVzIGFyZSB0aGVyZSB0b28uXG5BbmQgb25lIG9sZGVyIG1hbi48YnI+PGJyPlxuVGhpcyBpcyBMVVRIRVIgV0hJVE5FWS4gTWlkIDYwcywgdmVyeSBmaXQsIG5lYXRseVxuZHJlc3NlZC4gQXQgcXVpY2sgZ2xhbmNlLCBoZSBzZWVtcyBhcyBpZiBoZSBtaWdodCBiZSBhXG5zdWNjZXNzZnVsIGNvbXBhbnkgZXhlY3V0aXZlLjxicj48YnI+XG5BcyB3ZSB3YXRjaCBoaW0gZHJhdyB3ZSBjYW4gdGVsbCBoZSBpcyBjYXBhYmxlIG9mIGdyZWF0XG5jb25jZW50cmF0aW9uLiBBbmQgcGF0aWVudC4gV2l0aCBleWVzIHRoYXQgbWlzc1xubm90aGluZzogSGUgaGFzIHBpbG904oCZcyBleWVzLjxicj48YnI+XG5XZeKAmWxsIGZpbmQgb3V0IG1vcmUgYWJvdXQgaGltIGFzIHRpbWUgZ29lcyBvbiwgYnV0IHRoaXNcbmlzIGFsbCB5b3UgcmVhbGx5IGhhdmUgdG8ga25vdzogTHV0aGVyIFdoaXRuZXkgaXMgdGhlXG5oZXJvIG9mIHRoaXMgcGllY2UuIEFzIHdlIHdhdGNoIGhpbSBkcmF3IC0tXG5MdXRoZXLigJlzIHNrZXRjaGJvb2suIEhlIGlzIGZpbmlzaGluZyBoaXMgd29yayBvbiB0aGVcbmV5ZXMsIGFuZCBoZeKAmXMgY2F1Z2h0IHRoZSBzYWRuZXNzOiBJdOKAmXMgZ29vZCBzdHVmZi5cbkx1dGhlci4gSXTigJlzIG5vdCBnb29kIGVub3VnaCBmb3IgaGltLiBIZSBsb29rcyBhdCBoaXNcbndvcmsgYSBtb21lbnQsIHNoYWtlcyBoaXMgaGVhZC48YnI+PGJyPlxuR0lSTCBTVFVERU5UPGJyPjxicj5cbkRvbuKAmXQgZ2l2ZSB1cC48YnI+PGJyPlxuTFVUSEVSPGJyPjxicj5cbkkgbmV2ZXIgZG8uPGJyPjxicj5cbkdJUkwgU1RVREVOVDxicj48YnI+XG5NYXkgST88YnI+PGJyPlxuU2hl4oCZcyBpbmRpY2F0ZWQgaGlzIHNrZXRjaGJvb2suIEhlIG5vZHMuIFNoZSBzdGFydHNcbnRodW1iaW5nIHRocm91Z2guPGJyPjxicj5cblRoZSBza2V0Y2hib29rIGFzIHRoZSBwYWdlcyB0dXJuLjxicj48YnI+XG5EZXRhaWwgd29yay4gRXllcyBhbmQgaGFuZHMuIFRoZSBleWVzIGFyZSBnb29kLiBUaGVcbmhhbmRzIGFyZSBiZXR0ZXIuIFZlcnkgc2tpbGxmdWwuPGJyPjxicj5cbihDT05USU5VRUQpPGJyPjxicj5cblwiXCJcIlxuXG5cblxuXG5cblxuXG4jIFx0ZFAgICAgIGRQICBvbyAgICAgICAgICAgIGRQXG4jIFx0ODggICAgIDg4ICAgICAgICAgICAgICAgIDg4XG4jIFx0ODhhYWFhYTg4YSBkUCAuZDg4ODhiLiBkODg4OFAgLmQ4ODg4Yi4gODhkODg4Yi4gZFAgICAgZFBcbiMgXHQ4OCAgICAgODggIDg4IFk4b29vb28uICAgODggICA4OCcgIGA4OCA4OCcgIGA4OCA4OCAgICA4OFxuIyBcdDg4ICAgICA4OCAgODggICAgICAgODggICA4OCAgIDg4LiAgLjg4IDg4ICAgICAgIDg4LiAgLjg4XG4jIFx0ZFAgICAgIGRQICBkUCBgODg4ODhQJyAgIGRQICAgYDg4ODg4UCcgZFAgICAgICAgYDg4ODhQODhcbiMgXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC44OFxuIyBcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkODg4OFBcblxuXG5jbGFzcyBIaXN0b3J5IGV4dGVuZHMgbWQuUGFnZVxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMpIC0+XG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0dGhlbWU6IGZsb3cudGhlbWVcblx0XHRcdGhlYWRlcjpcblx0XHRcdFx0dGl0bGU6ICdIaXN0b3J5J1xuXHRcdFx0XHR2aXNpYmxlOiB0cnVlLCBcblx0XHRcdFx0aWNvbjogJ2Fycm93LWJhY2snLCBcblx0XHRcdFx0aWNvbkFjdGlvbjogLT4gXG5cdFx0XHRcdFx0Zmxvdy5zaG93UHJldmlvdXMoKVxuXHRcdFx0XHRcdEBkZXN0cm95KClcblxuXG5cblxuXG5cbiMgXHRkUCAgICAgZFAgICAgICAgICAgIGRQXG4jIFx0ODggICAgIDg4ICAgICAgICAgICA4OFxuIyBcdDg4YWFhYWE4OGEgLmQ4ODg4Yi4gODggODhkODg4Yi5cbiMgXHQ4OCAgICAgODggIDg4b29vb2Q4IDg4IDg4JyAgYDg4XG4jIFx0ODggICAgIDg4ICA4OC4gIC4uLiA4OCA4OC4gIC44OFxuIyBcdGRQICAgICBkUCAgYDg4ODg4UCcgZFAgODhZODg4UCdcbiMgXHQgICAgICAgICAgICAgICAgICAgICAgIDg4XG4jIFx0ICAgICAgICAgICAgICAgICAgICAgICBkUFxuXG5jbGFzcyBIZWxwIGV4dGVuZHMgbWQuUGFnZVxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMpIC0+XG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0dGhlbWU6IGZsb3cudGhlbWVcblx0XHRcdGhlYWRlcjpcblx0XHRcdFx0dGl0bGU6ICdIZWxwJ1xuXHRcdFx0XHR2aXNpYmxlOiB0cnVlLCBcblx0XHRcdFx0aWNvbjogJ2Fycm93LWJhY2snLCBcblx0XHRcdFx0aWNvbkFjdGlvbjogLT4gXG5cdFx0XHRcdFx0Zmxvdy5zaG93UHJldmlvdXMoKVxuXHRcdFx0XHRcdEBkZXN0cm95KClcblxuXG5cdFx0QGhlbHBJY29uID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQFxuXHRcdFx0aGVpZ2h0OiAxNTIsIHdpZHRoOiAxNTJcblx0XHRcdHg6IEFsaWduLmNlbnRlciwgeTogQWxpZ24uY2VudGVyKC0xMjgpXG5cdFx0XHRpbWFnZTogJ2ltYWdlcy9pY29ucy93YXJuaW5nLnBuZydcblx0XHRcdGludmVydDogMTAwXG5cblx0XHRAaGVscExhYmVsID0gbmV3IG1kLlJlZ3VsYXJcblx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBAXG5cdFx0XHR4OiBBbGlnbi5jZW50ZXIsIHk6IEBoZWxwSWNvbi5tYXhZXG5cdFx0XHRjb2xvcjogXCIjRkZGXCIsIHRleHRBbGlnbjogXCJjZW50ZXJcIlxuXHRcdFx0dGV4dDogJ0RvIHlvdSBuZWVkIGhlbHA/J1xuXG5cdFx0QGhlbHBEZXNjcmlwdGlvbiA9IG5ldyBtZC5SZWd1bGFyXG5cdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQFxuXHRcdFx0eDogQWxpZ24uY2VudGVyLCB5OiBAaGVscExhYmVsLm1heFkgKyAxNlxuXHRcdFx0Y29sb3I6IFwiI0ZGRlwiLCB0ZXh0QWxpZ246IFwiY2VudGVyXCJcblx0XHRcdHdpZHRoOiAyODBcblx0XHRcdHRleHQ6ICdDaGF0IG5vdyB3aXRoIG9uZSBvZiBvdXIgb3BlcmF0b3JzLidcblxuXHRcdEBuZWVkSGVscCA9IG5ldyBtZC5UaXRsZVxuXHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEBcblx0XHRcdHRleHQ6ICdJIE5FRUQgSEVMUCdcblx0XHRcdHRleHRBbGlnbjogJ2NlbnRlcidcblx0XHRcdHg6IEFsaWduLmNlbnRlciwgeTogQGhlbHBEZXNjcmlwdGlvbi5tYXhZICsgNjRcblx0XHRcdGNvbG9yOiAncmdiYSgyNTUsIDAsIDAsIDEpJ1xuXG5cdFx0QG5lZWRIZWxwLm9uVGFwIC0+IG51bGwgIyBUT0RPLCBiZWdpbiBhc3Npc3RhbmNlIGNoYXRcblxuXHRcdEBjYW5jZWwgPSBuZXcgbWQuVGl0bGVcblx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBAXG5cdFx0XHR0ZXh0OiAnQ0FOQ0VMJ1xuXHRcdFx0dGV4dEFsaWduOiAnY2VudGVyJ1xuXHRcdFx0eDogQWxpZ24uY2VudGVyLCB5OiBAbmVlZEhlbHAubWF4WSArIDQ4XG5cdFx0XHRjb2xvcjogJyNDQ0MnXG5cblx0XHRAY2FuY2VsLm9uVGFwIC0+IGZsb3cuc2hvd1ByZXZpb3VzKClcblxuXG5tZW51T3ZlcmxheSA9IG5ldyBNZW51T3ZlcmxheVxuZGFzaGJvYXJkID0gbmV3IERhc2hib2FyZFxuXG5mbG93LnNob3dOZXh0KGRhc2hib2FyZClcbiMgZmxvdy5zaG93TmV4dChuZXcgTWFwKVxuXG4iLCJcbiMgXHQgICAgICBkUCAgICAgICAgICAgIGRQICAgICAgICAgICAgZFBcbiMgXHQgICAgICA4OCAgICAgICAgICAgIDg4ICAgICAgICAgICAgODhcbiMgXHQuZDg4OGI4OCAuZDg4ODhiLiBkODg4OFAgLmQ4ODg4Yi4gODhkODg4Yi4gLmQ4ODg4Yi4gLmQ4ODg4Yi4gLmQ4ODg4Yi5cbiMgXHQ4OCcgIGA4OCA4OCcgIGA4OCAgIDg4ICAgODgnICBgODggODgnICBgODggODgnICBgODggWThvb29vby4gODhvb29vZDhcbiMgXHQ4OC4gIC44OCA4OC4gIC44OCAgIDg4ICAgODguICAuODggODguICAuODggODguICAuODggICAgICAgODggODguICAuLi5cbiMgXHRgODg4ODhQOCBgODg4ODhQOCAgIGRQICAgYDg4ODg4UDggODhZODg4OCcgYDg4ODg4UDggYDg4ODg4UCcgYDg4ODg4UCdcblxuXG5kYXRhYmFzZSA9XG5cblx0Y2hhdEJ1YmJsZXM6IFtdXG5cblx0Y2hvaWNlczpcblx0XHRsYW5ndWFnZTogdW5kZWZpbmVkXG5cdFx0cnVsZTE6IHVuZGVmaW5lZFxuXHRcdHJ1bGUyOiB1bmRlZmluZWRcblx0XHRydWxlMzogdW5kZWZpbmVkXG5cdFx0ZWFybHlFeGl0MTogdW5kZWZpbmVkXG5cdFx0ZWFybHlFeGl0MjogdW5kZWZpbmVkXG5cblx0cmVtb3ZlQ2hhdEJ1YmJsZTogKGNoYXRCdWJibGUpIC0+XG5cdFx0Xy5wdWxsKEBjaGF0QnViYmxlcywgY2hhdEJ1YmJsZSlcblx0XHRjaGF0QnViYmxlLmRlc3Ryb3koKVxuXG5cdHVzZXI6XG5cdFx0bmFtZTogJ1ZpY3RvciBJdmFub3ZpY2gnXG5cdFx0YWdlOiA0MlxuXHRcdHNleDogXCJNXCJcblx0XHRpbWFnZTogXCJpbWFnZXMvdXNlci5wbmdcIlxuXHRcdGxhbmd1YWdlczogW1wiZW5nbGlzaFwiLCBcImdlcm1hblwiXVxuXHRcdGhpc3Rvcnk6IFtdXG5cdFx0bm90ZTogXCJXaGVuIHlvdSBsb29rIGF0IGl0LCBpdCBsb29rcyBsaWtlIGFueSBvdGhlciBwaWVjZSBvZiBsYW5kLiBUaGUgc3VuIHNoaW5lcyBvbiBpdCBsaWtlIG9uIGFueSBvdGhlciBwYXJ0IG9mIHRoZSBlYXJ0aC4gQW5kIGl0J3MgYXMgdGhvdWdoIG5vdGhpbmcgaGFkIHBhcnRpY3VsYXJseSBjaGFuZ2VkIGluIGl0LiBMaWtlIGV2ZXJ5dGhpbmcgd2FzIHRoZSB3YXkgaXQgd2FzIHRoaXJ0eVxueWVhcnMgYWdvLiBNeSBmYXRoZXIsIHJlc3QgaGlzIHNvdWwsIGNvdWxkICBsb29rIGF0IGl0IGFuZCBub3Qgbm90aWNlIGFueXRoaW5nIG91dCBvZiBwbGFjZSBhdCBhbGwuIEV4Y2VwdCBtYXliZVwiXG5cblx0YWRkSGlzdG9yeTogKGl0ZW0pIC0+XG5cdFx0QHVzZXIuaGlzdG9yeS5wdXNoKGl0ZW0pXG5cdFx0aXRlbS50aW1lU3RhbXAgPSBfLm5vdygpXG5cblx0aW52aXRhdGlvbnM6IFtdXG5cdGV2ZW50czogW11cblx0bG9jYXRpb25zOiBbXVxuXG5cblxuZXhwb3J0cy5kYXRhYmFzZSA9IGRhdGFiYXNlXG5cblxuXG4jIFx0ZFAgICAgICAgICAgICAgICAgICAgb28gICBkUCAgICAgICAgICAgICAgZFAgICBvb1xuIyBcdDg4ICAgICAgICAgICAgICAgICAgICAgICAgODggICAgICAgICAgICAgIDg4XG4jIFx0ODggODhkODg4Yi4gZFAgICAuZFAgZFAgZDg4ODhQIC5kODg4OGIuIGQ4ODg4UCBkUCAuZDg4ODhiLiA4OGQ4ODhiLlxuIyBcdDg4IDg4JyAgYDg4IDg4ICAgZDgnIDg4ICAgODggICA4OCcgIGA4OCAgIDg4ICAgODggODgnICBgODggODgnICBgODhcbiMgXHQ4OCA4OCAgICA4OCA4OCAuODgnICA4OCAgIDg4ICAgODguICAuODggICA4OCAgIDg4IDg4LiAgLjg4IDg4ICAgIDg4XG4jIFx0ZFAgZFAgICAgZFAgODg4OFAnICAgZFAgICBkUCAgIGA4ODg4OFA4ICAgZFAgICBkUCBgODg4ODhQJyBkUCAgICBkUFxuIyBcdFxuIyBcdFxuXG5jbGFzcyBJbnZpdGF0aW9uXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucykgLT5cblx0XHRAbmFtZSA9IG9wdGlvbnMubmFtZSA/ICdOZXcgSW52aXRhdGlvbidcblx0XHRAZXZlbnQgPSBvcHRpb25zLmV2ZW50ID8gbmV3IEV2ZW50XG5cdFx0QGxvY2F0aW9uID0gQGV2ZW50LmxvY2F0aW9uXG5cdFx0QHN0YXJ0VGltZSA9IEBldmVudC5zdGFydFRpbWVcblxuXG5cbiMgXHRkUCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkUCAgIG9vXG4jIFx0ODggICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgODhcbiMgXHQ4OCAgICAgICAgLmQ4ODg4Yi4gLmQ4ODg4Yi4gLmQ4ODg4Yi4gZDg4ODhQIGRQIC5kODg4OGIuIDg4ZDg4OGIuXG4jIFx0ODggICAgICAgIDg4JyAgYDg4IDg4JyAgYFwiXCIgODgnICBgODggICA4OCAgIDg4IDg4JyAgYDg4IDg4JyAgYDg4XG4jIFx0ODggICAgICAgIDg4LiAgLjg4IDg4LiAgLi4uIDg4LiAgLjg4ICAgODggICA4OCA4OC4gIC44OCA4OCAgICA4OFxuIyBcdDg4ODg4ODg4UCBgODg4ODhQJyBgODg4ODhQJyBgODg4ODhQOCAgIGRQICAgZFAgYDg4ODg4UCcgZFAgICAgZFBcblxuY2xhc3MgTG9jYXRpb25cblx0Y29uc3RydWN0b3I6IChvcHRpb25zKSAtPlxuXHRcdEBuYW1lID0gb3B0aW9ucy5uYW1lID8gJ0xvY2F0aW9uJ1xuXG5cblxuIyBcdCA4ODg4ODg4OGIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkUFxuIyBcdCA4OCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA4OFxuIyBcdGE4OGFhYWEgICAgZFAgICAuZFAgLmQ4ODg4Yi4gODhkODg4Yi4gZDg4ODhQXG4jIFx0IDg4ICAgICAgICA4OCAgIGQ4JyA4OG9vb29kOCA4OCcgIGA4OCAgIDg4XG4jIFx0IDg4ICAgICAgICA4OCAuODgnICA4OC4gIC4uLiA4OCAgICA4OCAgIDg4XG4jIFx0IDg4ODg4ODg4UCA4ODg4UCcgICBgODg4ODhQJyBkUCAgICBkUCAgIGRQXG5cblxuY2xhc3MgRXZlbnRcblx0Y29uc3RydWN0b3I6IChvcHRpb25zKSAtPlxuXHRcdEBuYW1lID0gb3B0aW9ucy5uYW1lID8gJ05ldyBFdmVudCdcblx0XHRAbG9jYXRpb24gPSBvcHRpb25zLmxvY2F0aW9uID8gbmV3IExvY2F0aW9uXG5cdFx0QHN0YXJ0VGltZSA9IG9wdGlvbnMuc3RhcnRUaW1lID8gbmV3IERhdGUoXy5ub3coKSArIDM2MDAwMClcblxuXG5cblxuXG4iLCIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQU9BQTtBRFNBLElBQUE7O0FBQUEsUUFBQSxHQUVDO0VBQUEsV0FBQSxFQUFhLEVBQWI7RUFFQSxPQUFBLEVBQ0M7SUFBQSxRQUFBLEVBQVUsTUFB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
