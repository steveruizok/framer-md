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
var App, Body1, Body2, Caption, Dialog, Header, Headline, Menu, MenuButton, MenuOverlay, Page, Regular, RowItem, StatusBar, Title, database, eadline, themes,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

database = require('database').database;

Utils.insertCSS("@font-face {\n  font-family: \"Roboto\";\n  src: url(\"fonts/Roboto.ttf\");\n}");

exports.Headline = eadline = Headline = (function(superClass) {
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

exports.Title = Title = Title = (function(superClass) {
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

exports.Regular = Regular = Regular = (function(superClass) {
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

exports.Body2 = Body2 = Body2 = (function(superClass) {
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

exports.Menu = Menu = Menu = (function(superClass) {
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

exports.Body1 = Body1 = Body1 = (function(superClass) {
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

exports.Caption = Caption = Caption = (function(superClass) {
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

exports.themes = themes = {
  dark: {
    name: 'dark',
    tint: '#009688',
    header: {
      backgroundColor: '#212121',
      title: '#FFFFFF',
      invertIcon: true
    },
    statusBar: {
      image: 'images/status_bar_dark.png',
      backgroundColor: '#000000',
      invert: false
    },
    page: {
      backgroundColor: '#303030'
    },
    dialog: {
      backgroundColor: '#424242'
    },
    text: {
      title: 'rgba(255,255,255,1)',
      text: 'rgba(255,255,255,.7)'
    },
    navBar: {
      backgroundColor: '#000000'
    }
  },
  light: {
    name: 'light',
    tint: '#009688',
    header: {
      backgroundColor: '#E0E0E0',
      title: 'rgba(0,0,0,.87)',
      invertIcon: false
    },
    statusBar: {
      image: 'images/status_bar_light.png',
      backgroundColor: '#757575',
      invert: false
    },
    page: {
      backgroundColor: '#EEEEEE'
    },
    dialog: {
      backgroundColor: '#FAFAFA'
    },
    text: {
      title: 'rgba(0,0,0,.87)',
      text: 'rgba(0,0,0,.54)'
    },
    navBar: {
      backgroundColor: '#000000'
    }
  },
  dau: {
    name: 'dau',
    tint: '#009688',
    header: {
      backgroundColor: '#000',
      title: '#FFFFFF',
      invertIcon: true
    },
    statusBar: {
      image: 'images/status_bar_dark.png',
      backgroundColor: '#000000',
      invert: false
    },
    page: {
      backgroundColor: '#000000'
    },
    dialog: {
      backgroundColor: '#424242'
    },
    text: {
      title: 'rgba(255,255,255,1)',
      text: 'rgba(255,255,255,.9)'
    },
    navBar: {
      backgroundColor: '#303030'
    }
  }
};

exports.App = App = (function(superClass) {
  extend(App, superClass);

  function App(options) {
    var ref, ref1;
    if (options == null) {
      options = {};
    }
    this._theme = options.theme;
    this._footer = (ref = options.footer) != null ? ref : true;
    App.__super__.constructor.call(this, _.defaults(options, {
      name: 'Flow',
      animationOptions: {
        time: .2
      }
    }));
    this.theme = (ref1 = this._theme) != null ? ref1 : themes.dark;
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
      theme: this._theme
    });
    this.onTransitionStart((function(_this) {
      return function(current, next, direction) {
        var ref2, ref3, ref4, ref5, ref6, ref7, ref8, ref9;
        _this.header.title = (ref2 = (ref3 = next._header) != null ? ref3.title : void 0) != null ? ref2 : 'Default';
        _this.header.icon = (ref4 = (ref5 = next._header) != null ? ref5.icon : void 0) != null ? ref4 : 'menu';
        _this.header.iconAction = (ref6 = (ref7 = next._header) != null ? ref7.iconAction : void 0) != null ? ref6 : function() {
          return null;
        };
        _this.header.visible = (ref8 = (ref9 = next._header) != null ? ref9.visible : void 0) != null ? ref8 : true;
        return next._onLoad();
      };
    })(this));
    this.keyboard = new Layer({
      name: 'Keyboard',
      y: this.maxY,
      image: 'images/keyboard_dark.png',
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
      theme: this._theme,
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
    page.theme = this._theme;
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

  App.define("theme", {
    get: function() {
      return this._theme;
    },
    set: function(theme) {
      if (theme === this._theme) {
        return;
      }
      return this._theme = theme;
    }
  });

  return App;

})(FlowComponent);

exports.StatusBar = StatusBar = (function(superClass) {
  extend(StatusBar, superClass);

  function StatusBar(options) {
    var ref;
    if (options == null) {
      options = {};
    }
    this._theme = void 0;
    StatusBar.__super__.constructor.call(this, _.defaults(options, {
      name: '.',
      width: Screen.width,
      height: 24
    }));
    this.theme = (function() {
      if ((ref = options.theme) != null) {
        return ref;
      } else {
        throw 'Needs theme.';
      }
    })();
  }

  StatusBar.define("theme", {
    get: function() {
      return this._theme;
    },
    set: function(theme) {
      if (theme === this._theme) {
        return;
      }
      this._theme = theme;
      this.backgroundColor = null;
      this.image = this._theme.statusBar.image;
      return this.invert = this._theme.statusBar.invert === true ? 100 : 0;
    }
  });

  return StatusBar;

})(Layer);

exports.Header = Header = (function(superClass) {
  extend(Header, superClass);

  function Header(options) {
    var ref, ref1, ref2, ref3, ref4;
    if (options == null) {
      options = {};
    }
    this._theme = options.theme;
    this._title = void 0;
    this._icon = void 0;
    this._iconAction = (ref = options.iconAction) != null ? ref : function() {
      return null;
    };
    Header.__super__.constructor.call(this, _.defaults(options, {
      width: Screen.width,
      y: 0,
      height: 80,
      shadowY: 2,
      shadowBlur: 3,
      shadowColor: 'rgba(0,0,0,.24)'
    }));
    this.theme = (function() {
      if ((ref1 = options.theme) != null) {
        return ref1;
      } else {
        throw 'Needs theme.';
      }
    })();
    this.backgroundColor = this._theme.header.backgroundColor;
    this.statusBar = new StatusBar({
      name: '.',
      parent: this,
      theme: this._theme
    });
    this.titleLayer = new Title({
      name: '.',
      parent: this,
      x: 72,
      y: Align.bottom(-14),
      color: this.theme.header.title,
      text: (ref2 = this.title) != null ? ref2 : "No title"
    });
    this.title = (ref3 = options.title) != null ? ref3 : 'Default Header';
    this.iconLayer = new Layer({
      name: '.',
      parent: this,
      x: 12,
      y: Align.center(12),
      width: 32,
      height: 32,
      image: '',
      backgroundColor: null,
      invert: this.theme.header.invertIcon === true ? 100 : 0
    });
    this.icon = (ref4 = options.icon) != null ? ref4 : 'menu';
    this.iconLayer.onTap((function(_this) {
      return function() {
        return _this._iconAction();
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

  Header.define("theme", {
    get: function() {
      return this._theme;
    },
    set: function(theme) {
      if (theme === this._theme) {
        return;
      }
      this._theme = theme;
      this.backgroundColor = this._theme.header.backgroundColor;
      this.titleLayer.color = this._theme.header.title;
      return this.iconLayer.invert = this._theme.header.invertIcon === true ? 100 : 0;
    }
  });

  return Header;

})(Layer);

exports.Page = Page = (function(superClass) {
  extend(Page, superClass);

  function Page(options) {
    var ref, ref1, ref2, ref3;
    if (options == null) {
      options = {};
    }
    this._theme = options.theme;
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
      scrollHorizontal: false
    }));
    this.contentInset = {
      top: 0,
      bottom: 500
    };
    this.theme = (function() {
      if ((ref3 = options.theme) != null) {
        return ref3;
      } else {
        throw 'Needs theme.';
      }
    })();
    this.backgroundColor = this.theme.page.backgroundColor;
    this.content.backgroundColor = this.theme.page.backgroundColor;
    if (this._template != null) {
      this._template.props = {
        parent: this,
        opacity: this._templateOpacity
      };
    }
    this.sendToBack();
  }

  Page.define("theme", {
    get: function() {
      return this._theme;
    },
    set: function(theme) {
      if (theme === this._theme) {
        return;
      }
      this._theme = theme;
      return this.backgroundColor = this._theme.page.backgroundColor;
    }
  });

  Page.prototype.update = function() {
    return null;
  };

  return Page;

})(ScrollComponent);

exports.RowItem = RowItem = (function(superClass) {
  extend(RowItem, superClass);

  function RowItem(options) {
    var ref, ref1, ref2, ref3;
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
    this.theme = (function() {
      if ((ref3 = options.theme) != null) {
        return ref3;
      } else {
        throw 'needs theme';
      }
    })();
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
    this.labelLayer = new Regular({
      name: '.',
      parent: this,
      text: this._text,
      x: this.icon.maxX + 16,
      y: Align.center,
      color: this.theme.text.text
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
      invert: 100,
      image: this._icon
    });
    this.labelLayer = new Regular({
      name: 'label',
      parent: this,
      x: this.iconLayer.maxX + 16,
      y: Align.center(),
      color: '#FFF',
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
      backgroundColor: '#303030',
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
    this.topSection = new Layer({
      name: '.',
      parent: this,
      width: this.width,
      height: 173,
      image: database.user.image,
      backgroundColor: 'rgba(0,0,0,.3)'
    });
    this.titleIcon = new Layer({
      name: '.',
      parent: this.topSection,
      x: 16,
      y: 40,
      height: 64,
      width: 64,
      borderRadius: 32,
      backgroundColor: '#777'
    });
    this.titleExpand = new Layer({
      name: '.',
      parent: this.topSection,
      x: Align.right(-16),
      y: Align.bottom(-13),
      height: 32,
      width: 32,
      invert: 100,
      image: "images/icons/expand-more.png"
    });
    this.title = new Body1({
      name: '.',
      parent: this.topSection,
      width: this.width,
      color: '#FFF',
      x: 16,
      y: Align.bottom(-18),
      text: this._title
    });
    links = [];
    ref3 = this._links;
    for (i = j = 0, len = ref3.length; j < len; i = ++j) {
      link = ref3[i];
      links[i] = new MenuButton({
        name: 'test',
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
    var button, buttonsY, j, len, ref, ref1, ref2, ref3, ref4, ref5, ref6, ref7, ref8;
    if (options == null) {
      options = {};
    }
    this.close = bind(this.close, this);
    this.open = bind(this.open, this);
    this._theme = (ref = options.theme) != null ? ref : 'dark';
    Dialog.__super__.constructor.call(this, _.defaults(options, {
      name: '.',
      size: Screen.size,
      color: this._theme.tint,
      backgroundColor: 'rgba(0, 0, 0, .5)',
      opacity: 0
    }));
    this._title = (ref1 = options.title) != null ? ref1 : 'Default Title';
    this._body = (ref2 = options.body) != null ? ref2 : 'Body text goes here.';
    this._acceptText = (ref3 = options.acceptText) != null ? ref3 : 'confirm';
    this._acceptAction = (ref4 = options.acceptAction) != null ? ref4 : function() {
      return null;
    };
    this._declineText = (ref5 = options.declineText) != null ? ref5 : '';
    this._declineAction = (ref6 = options.declineAction) != null ? ref6 : function() {
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
      backgroundColor: this._theme.dialog.backgroundColor,
      shadowX: 0,
      shadowY: 7,
      shadowBlur: 30,
      opacity: 0,
      shadowColor: 'rgba(0,0,0,.3)'
    });
    this.title = new TextLayer({
      name: '.',
      parent: this.container,
      x: 24,
      y: 20,
      fontSize: 16,
      fontWeight: 500,
      color: this._theme.text.title,
      text: this._title
    });
    this.body = new TextLayer({
      name: 'body',
      parent: this.container,
      x: 24,
      y: 52,
      width: this.container.width - 42,
      fontSize: 16,
      fontWeight: 400,
      lineHeight: 1.5,
      color: this._theme.text.body,
      text: this._body
    });
    buttonsY = this._body === '' ? 128 : this.body.maxY + 16;
    this.accept = new TextLayer({
      name: '.',
      parent: this.container,
      x: Align.right(-16),
      y: buttonsY,
      fontSize: 14,
      fontWeight: 500,
      textAlign: 'center',
      letterSpacing: 1.1,
      padding: {
        left: 4,
        right: 4,
        top: 8,
        bottom: 0
      },
      color: this._theme.tint,
      text: this._acceptText.toUpperCase()
    });
    this.accept.onTap(this._acceptAction);
    if (this._declineText !== '') {
      this.decline = new TextLayer({
        name: '.',
        parent: this.container,
        x: 0,
        y: buttonsY,
        fontSize: 14,
        fontWeight: 500,
        textAlign: 'center',
        letterSpacing: 1.1,
        padding: {
          left: 4,
          right: 4,
          top: 8,
          bottom: 0
        },
        color: this._theme.tint,
        text: this._declineText.toUpperCase()
      });
      this.decline.onTap(this._declineAction);
    }
    this.container.height = this.accept.maxY + 12;
    if ((ref7 = this.decline) != null) {
      ref7.maxX = this.accept.x - 16;
    }
    this.container.y = Align.center(16);
    ref8 = [this.accept, this.decline];
    for (j = 0, len = ref8.length; j < len; j++) {
      button = ref8[j];
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


},{"database":"database"}],"myModule":[function(require,module,exports){
exports.myVar = "myVariable";

exports.myFunction = function() {
  return print("myFunction is running");
};

exports.myArray = [1, 2, 3];


},{}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3N0ZXZlcnVpei9Eb2N1bWVudHMvRHJvcGJveC9Eb2N1bWVudHMvVUkgRGVzaWduL0ZyYW1lci9NYXRlcmlhbF9Db21wb25lbnRzL01hdGVyaWFsLmZyYW1lci9tb2R1bGVzL215TW9kdWxlLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3N0ZXZlcnVpei9Eb2N1bWVudHMvRHJvcGJveC9Eb2N1bWVudHMvVUkgRGVzaWduL0ZyYW1lci9NYXRlcmlhbF9Db21wb25lbnRzL01hdGVyaWFsLmZyYW1lci9tb2R1bGVzL21kLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3N0ZXZlcnVpei9Eb2N1bWVudHMvRHJvcGJveC9Eb2N1bWVudHMvVUkgRGVzaWduL0ZyYW1lci9NYXRlcmlhbF9Db21wb25lbnRzL01hdGVyaWFsLmZyYW1lci9tb2R1bGVzL2Zsb3cuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvc3RldmVydWl6L0RvY3VtZW50cy9Ecm9wYm94L0RvY3VtZW50cy9VSSBEZXNpZ24vRnJhbWVyL01hdGVyaWFsX0NvbXBvbmVudHMvTWF0ZXJpYWwuZnJhbWVyL21vZHVsZXMvZGF0YWJhc2UuY29mZmVlIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIjIEFkZCB0aGUgZm9sbG93aW5nIGxpbmUgdG8geW91ciBwcm9qZWN0IGluIEZyYW1lciBTdHVkaW8uIFxuIyBteU1vZHVsZSA9IHJlcXVpcmUgXCJteU1vZHVsZVwiXG4jIFJlZmVyZW5jZSB0aGUgY29udGVudHMgYnkgbmFtZSwgbGlrZSBteU1vZHVsZS5teUZ1bmN0aW9uKCkgb3IgbXlNb2R1bGUubXlWYXJcblxuZXhwb3J0cy5teVZhciA9IFwibXlWYXJpYWJsZVwiXG5cbmV4cG9ydHMubXlGdW5jdGlvbiA9IC0+XG5cdHByaW50IFwibXlGdW5jdGlvbiBpcyBydW5uaW5nXCJcblxuZXhwb3J0cy5teUFycmF5ID0gWzEsIDIsIDNdIiwie2RhdGFiYXNlfSA9IHJlcXVpcmUgJ2RhdGFiYXNlJ1xuXG4jICA4ODg4ODg4OGIgICAgICAgICAgICAgICAgICAgICBkUCAgICAgICAgICAgXG4jICA4OCAgICAgICAgICAgICAgICAgICAgICAgICAgICA4OCAgICAgICAgICAgXG4jIGE4OGFhYWEgICAgLmQ4ODg4Yi4gODhkODg4Yi4gZDg4ODhQIC5kODg4OGIuXG4jICA4OCAgICAgICAgODgnICBgODggODgnICBgODggICA4OCAgIFk4b29vb28uXG4jICA4OCAgICAgICAgODguICAuODggODggICAgODggICA4OCAgICAgICAgIDg4XG4jICBkUCAgICAgICAgYDg4ODg4UCcgZFAgICAgZFAgICBkUCAgIGA4ODg4OFAnXG5cblxuVXRpbHMuaW5zZXJ0Q1NTKFxuXHRcIlwiXCJcbiAgICBAZm9udC1mYWNlIHtcbiAgICAgIGZvbnQtZmFtaWx5OiBcIlJvYm90b1wiO1xuICAgICAgc3JjOiB1cmwoXCJmb250cy9Sb2JvdG8udHRmXCIpO1xuICAgIH1cbiAgICBcIlwiXCIpXG5cbmV4cG9ydHMuSGVhZGxpbmUgPSBlYWRsaW5lID0gY2xhc3MgSGVhZGxpbmUgZXh0ZW5kcyBUZXh0TGF5ZXJcblx0Y29uc3RydWN0b3I6IChvcHRpb25zKSAtPlxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdGZvbnRGYW1pbHk6ICdSb2JvdG8nXG5cdFx0XHRmb250U2l6ZTogMjRcblx0XHRcdGZvbnRXZWlnaHQ6IDQwMFxuXHRcdFx0bGluZUhlaWdodDogMS4zXG5cdFx0XHRjb2xvcjogJ3JnYmEoMCwwLDAsLjg3KSdcbmV4cG9ydHMuVGl0bGUgPSBUaXRsZSA9IGNsYXNzIFRpdGxlIGV4dGVuZHMgVGV4dExheWVyXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucykgLT5cblx0XHRzdXBlciBfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRmb250RmFtaWx5OiAnUm9ib3RvJ1xuXHRcdFx0Zm9udFNpemU6IDIwXG5cdFx0XHRmb250V2VpZ2h0OiA1MDBcblx0XHRcdGxpbmVIZWlnaHQ6IDEuM1xuXHRcdFx0Y29sb3I6ICdyZ2JhKDAsMCwwLC44NyknXG5leHBvcnRzLlJlZ3VsYXIgPSBSZWd1bGFyID0gY2xhc3MgUmVndWxhciBleHRlbmRzIFRleHRMYXllclxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMpIC0+XG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0Zm9udEZhbWlseTogJ1JvYm90bydcblx0XHRcdGZvbnRTaXplOiAxNlxuXHRcdFx0Zm9udFdlaWdodDogNDAwXG5cdFx0XHRsaW5lSGVpZ2h0OiAxLjNcblx0XHRcdGNvbG9yOiAncmdiYSgwLDAsMCwuODcpJ1xuZXhwb3J0cy5Cb2R5MiA9IEJvZHkyID0gY2xhc3MgQm9keTIgZXh0ZW5kcyBUZXh0TGF5ZXJcblx0Y29uc3RydWN0b3I6IChvcHRpb25zKSAtPlxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdGZvbnRGYW1pbHk6ICdSb2JvdG8nXG5cdFx0XHRmb250U2l6ZTogMTRcblx0XHRcdGZvbnRXZWlnaHQ6IDUwMFxuXHRcdFx0bGluZUhlaWdodDogMS4zXG5cdFx0XHRjb2xvcjogJ3JnYmEoMCwwLDAsLjg3KSdcbmV4cG9ydHMuTWVudSA9IE1lbnUgPSBjbGFzcyBNZW51IGV4dGVuZHMgVGV4dExheWVyXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucykgLT5cblx0XHRzdXBlciBfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRmb250RmFtaWx5OiAnUm9ib3RvJ1xuXHRcdFx0Zm9udFNpemU6IDE0XG5cdFx0XHRmb250V2VpZ2h0OiA1MDBcblx0XHRcdGxpbmVIZWlnaHQ6IDEuN1xuXHRcdFx0Y29sb3I6ICdyZ2JhKDAsMCwwLC44NyknXG5leHBvcnRzLkJvZHkxID0gQm9keTEgPSBjbGFzcyBCb2R5MSBleHRlbmRzIFRleHRMYXllclxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMpIC0+XG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0Zm9udEZhbWlseTogJ1JvYm90bydcblx0XHRcdGZvbnRTaXplOiAxNFxuXHRcdFx0Zm9udFdlaWdodDogNDAwXG5cdFx0XHRsaW5lSGVpZ2h0OiAxLjRcblx0XHRcdGNvbG9yOiAncmdiYSgwLDAsMCwuODcpJ1xuZXhwb3J0cy5DYXB0aW9uID0gQ2FwdGlvbiA9IGNsYXNzIENhcHRpb24gZXh0ZW5kcyBUZXh0TGF5ZXJcblx0Y29uc3RydWN0b3I6IChvcHRpb25zKSAtPlxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdGZvbnRGYW1pbHk6ICdSb2JvdG8nXG5cdFx0XHRmb250U2l6ZTogMTJcblx0XHRcdGZvbnRXZWlnaHQ6IDQwMFxuXHRcdFx0bGluZUhlaWdodDogMS4zXG5cdFx0XHRjb2xvcjogJ3JnYmEoMCwwLDAsLjU0KSdcbiBcblxuXG5cblxuXG4jICAgZFAgICBkUCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4jICAgODggICA4OCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4jIGQ4ODg4UCA4OGQ4ODhiLiAuZDg4ODhiLiA4OGQ4Yi5kOGIuIC5kODg4OGIuIC5kODg4OGIuXG4jICAgODggICA4OCcgIGA4OCA4OG9vb29kOCA4OCdgODgnYDg4IDg4b29vb2Q4IFk4b29vb28uXG4jICAgODggICA4OCAgICA4OCA4OC4gIC4uLiA4OCAgODggIDg4IDg4LiAgLi4uICAgICAgIDg4XG4jICAgZFAgICBkUCAgICBkUCBgODg4ODhQJyBkUCAgZFAgIGRQIGA4ODg4OFAnIGA4ODg4OFAnXG5cblxuZXhwb3J0cy50aGVtZXMgPSB0aGVtZXMgPVxuXHRkYXJrOlxuXHRcdG5hbWU6ICdkYXJrJ1xuXHRcdHRpbnQ6ICcjMDA5Njg4J1xuXHRcdGhlYWRlcjogXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6ICcjMjEyMTIxJ1xuXHRcdFx0dGl0bGU6ICcjRkZGRkZGJ1xuXHRcdFx0aW52ZXJ0SWNvbjogdHJ1ZVxuXHRcdHN0YXR1c0JhcjogXG5cdFx0XHRpbWFnZTogJ2ltYWdlcy9zdGF0dXNfYmFyX2RhcmsucG5nJ1xuXHRcdFx0YmFja2dyb3VuZENvbG9yOiAnIzAwMDAwMCdcblx0XHRcdGludmVydDogZmFsc2Vcblx0XHRwYWdlOlxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiAnIzMwMzAzMCdcblx0XHRkaWFsb2c6IFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiAnIzQyNDI0Midcblx0XHR0ZXh0OlxuXHRcdFx0dGl0bGU6ICdyZ2JhKDI1NSwyNTUsMjU1LDEpJ1xuXHRcdFx0dGV4dDogJ3JnYmEoMjU1LDI1NSwyNTUsLjcpJ1xuXHRcdG5hdkJhcjpcblx0XHRcdGJhY2tncm91bmRDb2xvcjogJyMwMDAwMDAnXG5cdGxpZ2h0OlxuXHRcdG5hbWU6ICdsaWdodCdcblx0XHR0aW50OiAnIzAwOTY4OCdcblx0XHRoZWFkZXI6IFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiAnI0UwRTBFMCdcblx0XHRcdHRpdGxlOiAncmdiYSgwLDAsMCwuODcpJ1xuXHRcdFx0aW52ZXJ0SWNvbjogZmFsc2Vcblx0XHRzdGF0dXNCYXI6IFxuXHRcdFx0aW1hZ2U6ICdpbWFnZXMvc3RhdHVzX2Jhcl9saWdodC5wbmcnXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6ICcjNzU3NTc1J1xuXHRcdFx0aW52ZXJ0OiBmYWxzZVxuXHRcdHBhZ2U6XG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6ICcjRUVFRUVFJ1xuXHRcdGRpYWxvZzogXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6JyNGQUZBRkEnXG5cdFx0dGV4dDpcblx0XHRcdHRpdGxlOiAncmdiYSgwLDAsMCwuODcpJ1xuXHRcdFx0dGV4dDogJ3JnYmEoMCwwLDAsLjU0KSdcblx0XHRuYXZCYXI6XG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6ICcjMDAwMDAwJ1xuXHRkYXU6XG5cdFx0bmFtZTogJ2RhdSdcblx0XHR0aW50OiAnIzAwOTY4OCdcblx0XHRoZWFkZXI6IFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiAnIzAwMCdcblx0XHRcdHRpdGxlOiAnI0ZGRkZGRidcblx0XHRcdGludmVydEljb246IHRydWVcblx0XHRzdGF0dXNCYXI6IFxuXHRcdFx0aW1hZ2U6ICdpbWFnZXMvc3RhdHVzX2Jhcl9kYXJrLnBuZydcblx0XHRcdGJhY2tncm91bmRDb2xvcjogJyMwMDAwMDAnXG5cdFx0XHRpbnZlcnQ6IGZhbHNlXG5cdFx0cGFnZTpcblx0XHRcdGJhY2tncm91bmRDb2xvcjogJyMwMDAwMDAnXG5cdFx0ZGlhbG9nOiBcblx0XHRcdGJhY2tncm91bmRDb2xvcjogJyM0MjQyNDInXG5cdFx0dGV4dDpcblx0XHRcdHRpdGxlOiAncmdiYSgyNTUsMjU1LDI1NSwxKSdcblx0XHRcdHRleHQ6ICdyZ2JhKDI1NSwyNTUsMjU1LC45KSdcblx0XHRuYXZCYXI6XG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6ICcjMzAzMDMwJ1xuXG5cblxuXG5cblxuXG4jICAuZDg4ODg4OCAgICAgICAgICAgICAgICAgICBcbiMgZDgnICAgIDg4ICAgICAgICAgICAgICAgICAgIFxuIyA4OGFhYWFhODhhIDg4ZDg4OGIuIDg4ZDg4OGIuXG4jIDg4ICAgICA4OCAgODgnICBgODggODgnICBgODhcbiMgODggICAgIDg4ICA4OC4gIC44OCA4OC4gIC44OFxuIyA4OCAgICAgODggIDg4WTg4OFAnIDg4WTg4OFAnXG4jICAgICAgICAgICAgODggICAgICAgODggICAgICBcbiMgICAgICAgICAgICBkUCAgICAgICBkUCAgICAgIFxuXG5cbmV4cG9ydHMuQXBwID0gY2xhc3MgQXBwIGV4dGVuZHMgRmxvd0NvbXBvbmVudFxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblxuXG5cdFx0QF90aGVtZSA9IG9wdGlvbnMudGhlbWUgIz8gdGhlbWVzLmRhcmtcblx0XHRAX2Zvb3RlciA9IG9wdGlvbnMuZm9vdGVyID8gdHJ1ZVxuXG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0bmFtZTogJ0Zsb3cnXG5cdFx0XHRhbmltYXRpb25PcHRpb25zOlxuXHRcdFx0XHR0aW1lOiAuMlxuXHRcdFxuXG5cdFx0QHRoZW1lID0gQF90aGVtZSA/IHRoZW1lcy5kYXJrXG5cblx0XHRpZiBAX2Zvb3RlclxuXHRcdFx0QGZvb3RlciA9IG5ldyBMYXllclxuXHRcdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQFxuXHRcdFx0XHR3aWR0aDogU2NyZWVuLndpZHRoLCBoZWlnaHQ6IDQ4XG5cdFx0XHRcdGltYWdlOiAnaW1hZ2VzL25hdl9iYXIucG5nJ1xuXHRcdFxuXHRcdEBoZWFkZXIgPSBuZXcgSGVhZGVyXG5cdFx0XHR0aGVtZTogQF90aGVtZVxuXG5cdFx0QG9uVHJhbnNpdGlvblN0YXJ0IChjdXJyZW50LCBuZXh0LCBkaXJlY3Rpb24pID0+IFxuXG5cdFx0XHRAaGVhZGVyLnRpdGxlID0gbmV4dC5faGVhZGVyPy50aXRsZSA/ICdEZWZhdWx0J1xuXHRcdFx0QGhlYWRlci5pY29uID0gbmV4dC5faGVhZGVyPy5pY29uID8gJ21lbnUnXG5cdFx0XHRAaGVhZGVyLmljb25BY3Rpb24gPSBuZXh0Ll9oZWFkZXI/Lmljb25BY3Rpb24gPyAtPiBudWxsXG5cdFx0XHRAaGVhZGVyLnZpc2libGUgPSBuZXh0Ll9oZWFkZXI/LnZpc2libGUgPyB0cnVlXG5cdFx0XHRuZXh0Ll9vbkxvYWQoKVxuXG5cdFx0XG5cdFx0IyBLRVlCT0FSRFxuXG5cdFx0QGtleWJvYXJkID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiAnS2V5Ym9hcmQnXG5cdFx0XHR5OiBAbWF4WSwgaW1hZ2U6ICdpbWFnZXMva2V5Ym9hcmRfZGFyay5wbmcnXG5cdFx0XHR3aWR0aDogMzYwLCBoZWlnaHQ6IDI2OVxuXHRcdFx0YW5pbWF0aW9uT3B0aW9uczpcblx0XHRcdFx0dGltZTogLjI1XG5cblx0bmV3UGFnZTogKG9wdGlvbnMgPSB7fSkgLT5cblxuXHRcdHBhZ2UgPSBuZXcgUGFnZSBfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHR0aGVtZTogQF90aGVtZVxuXHRcdFx0Y29udGVudEluc2V0OiB7dG9wOiBAaGVhZGVyLmhlaWdodH1cblxuXHRcdCMgYWRqdXN0IGNvbnRlbnQgaW5zZXQgZm9yIHBhZ2Vcblx0XHRpZiBwYWdlLmNvbnRlbnRJbnNldC50b3AgPCBAaGVhZGVyLmhlaWdodCB0aGVuIHBhZ2UuY29udGVudEluc2V0ID0gXG5cdFx0XHR0b3A6IHBhZ2UuY29udGVudEluc2V0LnRvcCArPSBAaGVhZGVyLmhlaWdodFxuXHRcdFx0Ym90dG9tOiBwYWdlLmNvbnRlbnRJbnNldC5ib3R0b21cblx0XHRcdGxlZnQ6IHBhZ2UuY29udGVudEluc2V0LmxlZnRcblx0XHRcdHJpZ2h0OiBwYWdlLmNvbnRlbnRJbnNldC5yaWdodFxuXG5cdFx0cmV0dXJuIHBhZ2UgXG5cblx0YWRkUGFnZTogKHBhZ2UpIC0+XG5cdFx0cGFnZS5jb250ZW50SW5zZXQgPSB7dG9wOiBAaGVhZGVyLmhlaWdodH1cblx0XHRwYWdlLnRoZW1lID0gQF90aGVtZVxuXG5cdFx0IyBhZGp1c3QgY29udGVudCBpbnNldCBmb3IgcGFnZVxuXHRcdGlmIHBhZ2UuY29udGVudEluc2V0LnRvcCA8IEBoZWFkZXIuaGVpZ2h0IHRoZW4gcGFnZS5jb250ZW50SW5zZXQgPSBcblx0XHRcdHRvcDogcGFnZS5jb250ZW50SW5zZXQudG9wICs9IEBoZWFkZXIuaGVpZ2h0XG5cdFx0XHRib3R0b206IHBhZ2UuY29udGVudEluc2V0LmJvdHRvbVxuXHRcdFx0bGVmdDogcGFnZS5jb250ZW50SW5zZXQubGVmdFxuXHRcdFx0cmlnaHQ6IHBhZ2UuY29udGVudEluc2V0LnJpZ2h0XG5cblx0XHRyZXR1cm4gcGFnZSBcblxuXHRsaW5rVG86IChwYWdlKSAtPlxuXHRcdGlmIHBhZ2U/IGFuZCBAY3VycmVudCBpc250IHBhZ2Vcblx0XHRcdEBzaG93TmV4dChwYWdlKVxuXG5cblx0c2hvd0tleWJvYXJkOiAtPlxuXHRcdEBrZXlib2FyZC5hbmltYXRlXG5cdFx0XHR5OiBBbGlnbi5ib3R0b20oKVxuXHRcdEBrZXlib2FyZC5icmluZ1RvRnJvbnQoKVxuXG5cdGhpZGVLZXlib2FyZDogLT5cblx0XHRAa2V5Ym9hcmQuYW5pbWF0ZVxuXHRcdFx0eTogU2NyZWVuLm1heFlcblxuXHRAZGVmaW5lIFwidGhlbWVcIixcblx0XHRnZXQ6IC0+IHJldHVybiBAX3RoZW1lXG5cdFx0c2V0OiAodGhlbWUpIC0+XG5cdFx0XHRyZXR1cm4gaWYgdGhlbWUgaXMgQF90aGVtZVxuXHRcdFx0QF90aGVtZSA9IHRoZW1lXG5cblxuXG5cblxuXG5cbiMgLmQ4ODg4OGIgICAgZFAgICAgICAgICAgICAgIGRQICAgICAgICAgICAgICAgICAgICAgIDg4ODg4OGJhICAgICAgICAgICAgICAgICAgIFxuIyA4OC4gICAgXCInICAgODggICAgICAgICAgICAgIDg4ICAgICAgICAgICAgICAgICAgICAgIDg4ICAgIGA4YiAgICAgICAgICAgICAgICAgIFxuIyBgWTg4ODg4Yi4gZDg4ODhQIC5kODg4OGIuIGQ4ODg4UCBkUCAgICBkUCAuZDg4ODhiLiBhODhhYWFhOFAnIC5kODg4OGIuIDg4ZDg4OGIuXG4jICAgICAgIGA4YiAgIDg4ICAgODgnICBgODggICA4OCAgIDg4ICAgIDg4IFk4b29vb28uICA4OCAgIGA4Yi4gODgnICBgODggODgnICBgODhcbiMgZDgnICAgLjhQICAgODggICA4OC4gIC44OCAgIDg4ICAgODguICAuODggICAgICAgODggIDg4ICAgIC44OCA4OC4gIC44OCA4OCAgICAgIFxuIyAgWTg4ODg4UCAgICBkUCAgIGA4ODg4OFA4ICAgZFAgICBgODg4ODhQJyBgODg4ODhQJyAgODg4ODg4ODhQIGA4ODg4OFA4IGRQICBcblxuXG5leHBvcnRzLlN0YXR1c0JhciA9IGNsYXNzIFN0YXR1c0JhciBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXHRcdFxuXHRcdEBfdGhlbWUgPSB1bmRlZmluZWRcblxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdG5hbWU6ICcuJ1xuXHRcdFx0d2lkdGg6IFNjcmVlbi53aWR0aCwgaGVpZ2h0OiAyNFxuXG5cdFx0QHRoZW1lID0gb3B0aW9ucy50aGVtZSA/IHRocm93ICdOZWVkcyB0aGVtZS4nXG5cblx0QGRlZmluZSBcInRoZW1lXCIsXG5cdFx0Z2V0OiAtPiByZXR1cm4gQF90aGVtZVxuXHRcdHNldDogKHRoZW1lKSAtPlxuXHRcdFx0cmV0dXJuIGlmIHRoZW1lIGlzIEBfdGhlbWVcblxuXHRcdFx0QF90aGVtZSA9IHRoZW1lXG5cdFx0XHRAYmFja2dyb3VuZENvbG9yID0gbnVsbFxuXHRcdFx0QGltYWdlID0gQF90aGVtZS5zdGF0dXNCYXIuaW1hZ2Vcblx0XHRcdEBpbnZlcnQgPSBpZiBAX3RoZW1lLnN0YXR1c0Jhci5pbnZlcnQgaXMgdHJ1ZSB0aGVuIDEwMCBlbHNlIDBcblxuXG5cblxuXG5cblxuIyBkUCAgICAgZFAgICAgICAgICAgICAgICAgICAgICAgICAgIGRQICAgICAgICAgICAgICAgICAgXG4jIDg4ICAgICA4OCAgICAgICAgICAgICAgICAgICAgICAgICAgODggICAgICAgICAgICAgICAgICBcbiMgODhhYWFhYTg4YSAuZDg4ODhiLiAuZDg4ODhiLiAuZDg4OGI4OCAuZDg4ODhiLiA4OGQ4ODhiLlxuIyA4OCAgICAgODggIDg4b29vb2Q4IDg4JyAgYDg4IDg4JyAgYDg4IDg4b29vb2Q4IDg4JyAgYDg4XG4jIDg4ICAgICA4OCAgODguICAuLi4gODguICAuODggODguICAuODggODguICAuLi4gODggICAgICBcbiMgZFAgICAgIGRQICBgODg4ODhQJyBgODg4ODhQOCBgODg4ODhQOCBgODg4ODhQJyBkUCAgICAgIFxuXG5cbmV4cG9ydHMuSGVhZGVyID0gY2xhc3MgSGVhZGVyIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cdFx0XG5cdFx0QF90aGVtZSA9IG9wdGlvbnMudGhlbWVcblx0XHRAX3RpdGxlID0gdW5kZWZpbmVkXG5cdFx0QF9pY29uID0gdW5kZWZpbmVkXG5cdFx0QF9pY29uQWN0aW9uID0gb3B0aW9ucy5pY29uQWN0aW9uID8gLT4gbnVsbFxuXG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0d2lkdGg6IFNjcmVlbi53aWR0aFxuXHRcdFx0eTogMFxuXHRcdFx0aGVpZ2h0OiA4MFxuXHRcdFx0c2hhZG93WTogMiwgc2hhZG93Qmx1cjogMywgc2hhZG93Q29sb3I6ICdyZ2JhKDAsMCwwLC4yNCknXG5cblx0XHRAdGhlbWUgPSBvcHRpb25zLnRoZW1lID8gdGhyb3cgJ05lZWRzIHRoZW1lLidcblx0XHRcblx0XHRAYmFja2dyb3VuZENvbG9yID0gQF90aGVtZS5oZWFkZXIuYmFja2dyb3VuZENvbG9yXG5cblx0XHRAc3RhdHVzQmFyID0gbmV3IFN0YXR1c0JhclxuXHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEBcblx0XHRcdHRoZW1lOiBAX3RoZW1lXG5cblx0XHRAdGl0bGVMYXllciA9IG5ldyBUaXRsZVxuXHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEBcblx0XHRcdHg6IDcyLCB5OiBBbGlnbi5ib3R0b20oLTE0KVxuXHRcdFx0Y29sb3I6IEB0aGVtZS5oZWFkZXIudGl0bGVcblx0XHRcdHRleHQ6IEB0aXRsZSA/IFwiTm8gdGl0bGVcIlxuXG5cdFx0QHRpdGxlID0gb3B0aW9ucy50aXRsZSA/ICdEZWZhdWx0IEhlYWRlcidcblxuXHRcdEBpY29uTGF5ZXIgPSBuZXcgTGF5ZXJcblx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBALCBcblx0XHRcdHg6IDEyLCB5OiBBbGlnbi5jZW50ZXIoMTIpXG5cdFx0XHR3aWR0aDogMzJcblx0XHRcdGhlaWdodDogMzJcblx0XHRcdGltYWdlOiAnJ1xuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHRpbnZlcnQ6IGlmIEB0aGVtZS5oZWFkZXIuaW52ZXJ0SWNvbiBpcyB0cnVlIHRoZW4gMTAwIGVsc2UgMFxuXG5cdFx0QGljb24gPSBvcHRpb25zLmljb24gPyAnbWVudSdcblxuXHRcdEBpY29uTGF5ZXIub25UYXAgPT4gQF9pY29uQWN0aW9uKClcblxuXG5cdEBkZWZpbmUgXCJ0aXRsZVwiLFxuXHRcdGdldDogLT4gcmV0dXJuIEBfdGl0bGVcblx0XHRzZXQ6ICh0aXRsZVRleHQpIC0+XG5cdFx0XHRAX3RpdGxlID0gdGl0bGVUZXh0XG5cdFx0XHRAdGl0bGVMYXllci50ZXh0UmVwbGFjZShAdGl0bGVMYXllci50ZXh0LCBAX3RpdGxlKVxuXG5cdEBkZWZpbmUgXCJpY29uXCIsXG5cdFx0Z2V0OiAtPiByZXR1cm4gQF9pY29uXG5cdFx0c2V0OiAoaWNvbk5hbWUpIC0+IFxuXHRcdFx0QF9pY29uID0gaWNvbk5hbWVcblx0XHRcdEBpY29uTGF5ZXIuaW1hZ2UgPSBcImltYWdlcy9pY29ucy8je0BfaWNvbn0ucG5nXCJcblxuXHRAZGVmaW5lIFwiaWNvbkFjdGlvblwiLFxuXHRcdGdldDogLT4gcmV0dXJuIEBfaWNvbkFjdGlvblxuXHRcdHNldDogKGFjdGlvbikgLT5cblx0XHRcdEBfaWNvbkFjdGlvbiA9IGFjdGlvblxuXG5cdEBkZWZpbmUgXCJ0aGVtZVwiLFxuXHRcdGdldDogLT4gcmV0dXJuIEBfdGhlbWVcblx0XHRzZXQ6ICh0aGVtZSkgLT5cblx0XHRcdHJldHVybiBpZiB0aGVtZSBpcyBAX3RoZW1lXG5cblx0XHRcdEBfdGhlbWUgPSB0aGVtZVxuXHRcdFx0QGJhY2tncm91bmRDb2xvciA9IEBfdGhlbWUuaGVhZGVyLmJhY2tncm91bmRDb2xvclxuXHRcdFx0QHRpdGxlTGF5ZXIuY29sb3IgPSBAX3RoZW1lLmhlYWRlci50aXRsZVxuXHRcdFx0QGljb25MYXllci5pbnZlcnQgPSBpZiBAX3RoZW1lLmhlYWRlci5pbnZlcnRJY29uIGlzIHRydWUgdGhlbiAxMDAgZWxzZSAwXG5cblxuXG5cblxuXG5cbiMgIDg4ODg4OGJhICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuIyAgODggICAgYDhiICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4jIGE4OGFhYWE4UCcgLmQ4ODg4Yi4gLmQ4ODg4Yi4gLmQ4ODg4Yi5cbiMgIDg4ICAgICAgICA4OCcgIGA4OCA4OCcgIGA4OCA4OG9vb29kOFxuIyAgODggICAgICAgIDg4LiAgLjg4IDg4LiAgLjg4IDg4LiAgLi4uXG4jICBkUCAgICAgICAgYDg4ODg4UDggYDg4ODhQODggYDg4ODg4UCdcbiMgICAgICAgICAgICAgICAgICAgICAgICAgIC44OCAgICAgICAgIFxuIyAgICAgICAgICAgICAgICAgICAgICBkODg4OFAgICAgICAgICAgXG5cblxuZXhwb3J0cy5QYWdlID0gY2xhc3MgUGFnZSBleHRlbmRzIFNjcm9sbENvbXBvbmVudFxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblx0XHRcblx0XHRAX3RoZW1lID0gb3B0aW9ucy50aGVtZVxuXHRcdEBfaGVhZGVyID0gb3B0aW9ucy5oZWFkZXIgPyB7dGl0bGU6ICdEZWZhdWx0JywgdmlzaWJsZTogdHJ1ZSwgaWNvbjogJ21lbnUnLCBpY29uQWN0aW9uOiAtPiByZXR1cm4gbnVsbH1cblx0XHRAX3RlbXBsYXRlID0gb3B0aW9ucy50ZW1wbGF0ZVxuXHRcdEBfdGVtcGxhdGVPcGFjaXR5ID0gb3B0aW9ucy50ZW1wbGF0ZU9wYWNpdHkgPyAuNVxuXHRcdEBfb25Mb2FkID0gb3B0aW9ucy5vbkxvYWQgPyAtPiBudWxsXG5cblx0XHRpZiBAX2hlYWRlci5pY29uQWN0aW9uIHRoZW4gQF9oZWFkZXIuaWNvbkFjdGlvbiA9IF8uYmluZChAX2hlYWRlci5pY29uQWN0aW9uLCBAKVxuXHRcdGlmIEBfb25Mb2FkIHRoZW4gQF9vbkxvYWQgPSBfLmJpbmQoQF9vbkxvYWQsIEApXG5cblxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdG5hbWU6ICdQYWdlJ1xuXHRcdFx0c2l6ZTogU2NyZWVuLnNpemVcblx0XHRcdHNjcm9sbEhvcml6b250YWw6IGZhbHNlXG5cdFx0XG5cdFx0QGNvbnRlbnRJbnNldCA9XG5cdFx0XHR0b3A6IDAsIGJvdHRvbTogNTAwXG5cblx0XHRAdGhlbWUgPSBvcHRpb25zLnRoZW1lID8gdGhyb3cgJ05lZWRzIHRoZW1lLidcblxuXHRcdEBiYWNrZ3JvdW5kQ29sb3IgPSBAdGhlbWUucGFnZS5iYWNrZ3JvdW5kQ29sb3Jcblx0XHRAY29udGVudC5iYWNrZ3JvdW5kQ29sb3IgPSBAdGhlbWUucGFnZS5iYWNrZ3JvdW5kQ29sb3JcblxuXHRcdGlmIEBfdGVtcGxhdGU/XG5cdFx0XHRAX3RlbXBsYXRlLnByb3BzID1cblx0XHRcdFx0cGFyZW50OiBAXG5cdFx0XHRcdG9wYWNpdHk6IEBfdGVtcGxhdGVPcGFjaXR5XG5cblx0XHRAc2VuZFRvQmFjaygpXG5cblxuXHRAZGVmaW5lIFwidGhlbWVcIixcblx0XHRnZXQ6IC0+IHJldHVybiBAX3RoZW1lXG5cdFx0c2V0OiAodGhlbWUpIC0+XG5cdFx0XHRyZXR1cm4gaWYgdGhlbWUgaXMgQF90aGVtZVxuXG5cdFx0XHRAX3RoZW1lID0gdGhlbWVcblx0XHRcdEBiYWNrZ3JvdW5kQ29sb3IgPSBAX3RoZW1lLnBhZ2UuYmFja2dyb3VuZENvbG9yXG5cblx0dXBkYXRlOiAtPiByZXR1cm4gbnVsbFxuXG5cblxuIyAgODg4ODg4YmEgICAgICAgICAgICAgICAgICAgICAgZFAgICBkUCAgICAgICAgICAgICAgICAgICAgICBcbiMgIDg4ICAgIGA4YiAgICAgICAgICAgICAgICAgICAgIDg4ICAgODggICAgICAgICAgICAgICAgICAgICAgXG4jIGE4OGFhYWE4UCcgLmQ4ODg4Yi4gZFAgIGRQICBkUCA4OCBkODg4OFAgLmQ4ODg4Yi4gODhkOGIuZDhiLlxuIyAgODggICBgOGIuIDg4JyAgYDg4IDg4ICA4OCAgODggODggICA4OCAgIDg4b29vb2Q4IDg4J2A4OCdgODhcbiMgIDg4ICAgICA4OCA4OC4gIC44OCA4OC44OGIuODgnIDg4ICAgODggICA4OC4gIC4uLiA4OCAgODggIDg4XG4jICBkUCAgICAgZFAgYDg4ODg4UCcgODg4OFAgWThQICBkUCAgIGRQICAgYDg4ODg4UCcgZFAgIGRQICBkUFxuXG5leHBvcnRzLlJvd0l0ZW0gPSBjbGFzcyBSb3dJdGVtIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cblx0XHRAX2ljb24gPSBvcHRpb25zLmljb25cblx0XHRAX2ljb25CYWNrZ3JvdW5kQ29sb3IgPSBvcHRpb25zLmljb25CYWNrZ3JvdW5kQ29sb3IgPyAnIzc3Nydcblx0XHRAX3RleHQgPSBvcHRpb25zLnRleHQgPyAnUm93IGl0ZW0nXG5cdFx0QF9yb3cgPSBvcHRpb25zLnJvdyA/IDBcblx0XHRAX3kgPSAzMiArIChAX3JvdyAqIDQ4KSBcblxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdHdpZHRoOiBTY3JlZW4ud2lkdGhcblx0XHRcdHk6IEBfeVxuXHRcdFx0aGVpZ2h0OiA0OFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cblx0XHRAdGhlbWUgPSBvcHRpb25zLnRoZW1lID8gdGhyb3cgJ25lZWRzIHRoZW1lJ1xuXG5cdFx0QGljb24gPSBuZXcgTGF5ZXJcblx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBAXG5cdFx0XHR4OiAxNiwgeTogQWxpZ24uY2VudGVyXG5cdFx0XHRoZWlnaHQ6IDMyLCB3aWR0aDogMzIsIGJvcmRlclJhZGl1czogMTZcblx0XHRcdGJhY2tncm91bmRDb2xvcjogQF9pY29uQmFja2dyb3VuZENvbG9yXG5cdFx0XHRpbWFnZTogQF9pY29uXG5cblx0XHRAbGFiZWxMYXllciA9IG5ldyBSZWd1bGFyXG5cdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQFxuXHRcdFx0dGV4dDogQF90ZXh0XG5cdFx0XHR4OiBAaWNvbi5tYXhYICsgMTYsIHk6IEFsaWduLmNlbnRlclxuXHRcdFx0Y29sb3I6IEB0aGVtZS50ZXh0LnRleHRcblxuXG4jIFx0ODg4OGJhLjg4YmEgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA4ODg4ODhiYSAgICAgICAgICAgICBkUCAgICAgZFBcbiMgXHQ4OCAgYDhiICBgOGIgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDg4ICAgIGA4YiAgICAgICAgICAgIDg4ICAgICA4OFxuIyBcdDg4ICAgODggICA4OCAuZDg4ODhiLiA4OGQ4ODhiLiBkUCAgICBkUCBhODhhYWFhOFAnIGRQICAgIGRQIGQ4ODg4UCBkODg4OFAgLmQ4ODg4Yi4gODhkODg4Yi5cbiMgXHQ4OCAgIDg4ICAgODggODhvb29vZDggODgnICBgODggODggICAgODggIDg4ICAgYDhiLiA4OCAgICA4OCAgIDg4ICAgICA4OCAgIDg4JyAgYDg4IDg4JyAgYDg4XG4jIFx0ODggICA4OCAgIDg4IDg4LiAgLi4uIDg4ICAgIDg4IDg4LiAgLjg4ICA4OCAgICAuODggODguICAuODggICA4OCAgICAgODggICA4OC4gIC44OCA4OCAgICA4OFxuIyBcdGRQICAgZFAgICBkUCBgODg4ODhQJyBkUCAgICBkUCBgODg4ODhQJyAgODg4ODg4ODhQIGA4ODg4OFAnICAgZFAgICAgIGRQICAgYDg4ODg4UCcgZFAgICAgZFBcblxuXG5jbGFzcyBNZW51QnV0dG9uIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cdFx0XG5cdFx0QF9pY29uID0gb3B0aW9ucy5pY29uID8gJ2hvbWUnXG5cdFx0QF90ZXh0ID0gb3B0aW9ucy50ZXh0ID8gJ0RlZmF1bHQnXG5cdFx0QF9hY3Rpb24gPSBvcHRpb25zLmFjdGlvbiA/IC0+IG51bGxcblxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdGhlaWdodDogNDgsIHdpZHRoOiAzMDRcblx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXG5cdFx0QGljb25MYXllciA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEBcblx0XHRcdHk6IEFsaWduLmNlbnRlclxuXHRcdFx0aGVpZ2h0OiAzMiwgd2lkdGg6IDMyXG5cdFx0XHRpbnZlcnQ6IDEwMFxuXHRcdFx0aW1hZ2U6IEBfaWNvblxuXG5cdFx0QGxhYmVsTGF5ZXIgPSBuZXcgUmVndWxhclxuXHRcdFx0bmFtZTogJ2xhYmVsJywgcGFyZW50OiBAXG5cdFx0XHR4OiBAaWNvbkxheWVyLm1heFggKyAxNlxuXHRcdFx0eTogQWxpZ24uY2VudGVyKClcblx0XHRcdGNvbG9yOiAnI0ZGRidcblx0XHRcdHRleHQ6IEBfdGV4dFxuXG5cdFx0QG9uVGFwIEBfYWN0aW9uXG5cdFx0QG9uVGFwIC0+IFxuXHRcdFx0VXRpbHMuZGVsYXkgLjI1LCA9PiBAcGFyZW50LmhpZGUoKVxuXG5cblxuIyBcdDg4ODhiYS44OGJhICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLjg4ODg4LiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZFAgICAgICAgICAgICAgICAgICBcbiMgXHQ4OCAgYDhiICBgOGIgICAgICAgICAgICAgICAgICAgICAgICAgICAgZDgnICAgYDhiICAgICAgICAgICAgICAgICAgICAgICAgICAgIDg4ICAgICAgICAgICAgICAgICAgXG4jIFx0ODggICA4OCAgIDg4IC5kODg4OGIuIDg4ZDg4OGIuIGRQICAgIGRQIDg4ICAgICA4OCBkUCAgIC5kUCAuZDg4ODhiLiA4OGQ4ODhiLiA4OCAuZDg4ODhiLiBkUCAgICBkUFxuIyBcdDg4ICAgODggICA4OCA4OG9vb29kOCA4OCcgIGA4OCA4OCAgICA4OCA4OCAgICAgODggODggICBkOCcgODhvb29vZDggODgnICBgODggODggODgnICBgODggODggICAgODhcbiMgXHQ4OCAgIDg4ICAgODggODguICAuLi4gODggICAgODggODguICAuODggWTguICAgLjhQIDg4IC44OCcgIDg4LiAgLi4uIDg4ICAgICAgIDg4IDg4LiAgLjg4IDg4LiAgLjg4XG4jIFx0ZFAgICBkUCAgIGRQIGA4ODg4OFAnIGRQICAgIGRQIGA4ODg4OFAnICBgODg4OFAnICA4ODg4UCcgICBgODg4ODhQJyBkUCAgICAgICBkUCBgODg4ODhQOCBgODg4OFA4OFxuIyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLjg4XG4jICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGQ4ODg4UCBcblxuZXhwb3J0cy5NZW51T3ZlcmxheSA9IGNsYXNzIE1lbnVPdmVybGF5IGV4dGVuZHMgTGF5ZXJcblx0XG5cdFxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblxuXHRcdEBfbGlua3MgPSBvcHRpb25zLmxpbmtzID8gW3t0aXRsZTogJ0hvbWUnLCBpY29uOiAnaG9tZScsIGFjdGlvbjogLT4gbnVsbH1dXG5cdFx0QF90aXRsZSA9IG9wdGlvbnMudGl0bGUgPyAnTWVudSdcblx0XHRAX2ltYWdlID0gb3B0aW9ucy5pbWFnZSA/IG51bGxcblxuXG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0aGVpZ2h0OiBTY3JlZW4uaGVpZ2h0XG5cdFx0XHR3aWR0aDogMzA0XG5cdFx0XHRoZWlnaHQ6IFNjcmVlbi5oZWlnaHRcblx0XHRcdHZpc2libGU6IGZhbHNlXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6ICcjMzAzMDMwJ1xuXHRcdFx0YW5pbWF0aW9uT3B0aW9uczoge2N1cnZlOiBcInNwcmluZygzMDAsIDM1LCAwKVwifVxuXG5cblx0XHRAc2NyaW0gPSBuZXcgTGF5ZXJcblx0XHRcdG5hbWU6ICcuJywgXG5cdFx0XHRzaXplOiBTY3JlZW4uc2l6ZVxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiAncmdiYSgwLDAsMCwuNiknXG5cdFx0XHRvcGFjaXR5OiAwXG5cdFx0XHR2aXNpYmxlOiBmYWxzZVxuXHRcdFx0YW5pbWF0aW9uT3B0aW9uczpcblx0XHRcdFx0dGltZTogLjI1XG5cblx0XHRAc2NyaW0ub25UYXAgPT4gQGhpZGUoKVxuXHRcdEBvblN3aXBlTGVmdEVuZCA9PiBAaGlkZSgpXG5cblx0XHRAdG9wU2VjdGlvbiA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEBcblx0XHRcdHdpZHRoOiBAd2lkdGgsIGhlaWdodDogMTczXG5cdFx0XHRpbWFnZTogZGF0YWJhc2UudXNlci5pbWFnZVxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiAncmdiYSgwLDAsMCwuMyknXG5cblx0XHRAdGl0bGVJY29uID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQHRvcFNlY3Rpb25cblx0XHRcdHg6IDE2LCB5OiA0MFxuXHRcdFx0aGVpZ2h0OiA2NCwgd2lkdGg6IDY0XG5cdFx0XHRib3JkZXJSYWRpdXM6IDMyXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6ICcjNzc3J1xuXG5cdFx0QHRpdGxlRXhwYW5kID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQHRvcFNlY3Rpb25cblx0XHRcdHg6IEFsaWduLnJpZ2h0KC0xNilcblx0XHRcdHk6IEFsaWduLmJvdHRvbSgtMTMpXG5cdFx0XHRoZWlnaHQ6IDMyLCB3aWR0aDogMzJcblx0XHRcdGludmVydDogMTAwXG5cdFx0XHRpbWFnZTogXCJpbWFnZXMvaWNvbnMvZXhwYW5kLW1vcmUucG5nXCJcblxuXHRcdEB0aXRsZSA9IG5ldyBCb2R5MVxuXHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEB0b3BTZWN0aW9uXG5cdFx0XHR3aWR0aDogQHdpZHRoXG5cdFx0XHRjb2xvcjogJyNGRkYnXG5cdFx0XHR4OiAxNiwgeTogQWxpZ24uYm90dG9tKC0xOClcblx0XHRcdHRleHQ6IEBfdGl0bGVcblxuXHRcdGxpbmtzID0gW11cblxuXHRcdGZvciBsaW5rLCBpIGluIEBfbGlua3Ncblx0XHRcdGxpbmtzW2ldID0gbmV3IE1lbnVCdXR0b25cblx0XHRcdFx0bmFtZTogJ3Rlc3QnLCBwYXJlbnQ6IEBcblx0XHRcdFx0eDogMTYsIHk6IDE4OSArICg0OCAqIGkpXG5cdFx0XHRcdHRleHQ6IGxpbmsudGl0bGVcblx0XHRcdFx0aWNvbjogXCJpbWFnZXMvaWNvbnMvI3tsaW5rLmljb259LnBuZ1wiXG5cdFx0XHRcdGFjdGlvbjogbGluay5hY3Rpb25cblxuXHRzaG93OiAtPlxuXHRcdEBicmluZ1RvRnJvbnQoKVxuXHRcdEB2aXNpYmxlID0gdHJ1ZVxuXHRcdEB4ID0gLVNjcmVlbi53aWR0aFxuXHRcdEBhbmltYXRlXG5cdFx0XHR4OiAwXG5cblx0XHRAc2NyaW0ucGxhY2VCZWhpbmQoQClcblx0XHRAc2NyaW0udmlzaWJsZSA9IHRydWVcblx0XHRAc2NyaW0uYW5pbWF0ZVxuXHRcdFx0b3BhY2l0eTogMVxuXG5cdGhpZGU6IC0+XG5cdFx0QGFuaW1hdGVcblx0XHRcdHg6IC1TY3JlZW4ud2lkdGhcblxuXHRcdEBzY3JpbS5hbmltYXRlXG5cdFx0XHRvcGFjaXR5OiAwXG5cblx0XHRVdGlscy5kZWxheSAuMywgPT5cblx0XHRcdEB2aXNpYmxlID0gZmFsc2Vcblx0XHRcdEBzY3JpbS52aXNpYmxlID0gZmFsc2Vcblx0XHRcdEBzZW5kVG9CYWNrKClcblx0XHRcdEBzY3JpbS5zZW5kVG9CYWNrKClcblxuXG4jIFx0ODg4ODg4YmEgIG9vICAgICAgICAgIGRQXG4jIFx0ODggICAgYDhiICAgICAgICAgICAgIDg4XG4jIFx0ODggICAgIDg4IGRQIC5kODg4OGIuIDg4IC5kODg4OGIuIC5kODg4OGIuXG4jIFx0ODggICAgIDg4IDg4IDg4JyAgYDg4IDg4IDg4JyAgYDg4IDg4JyAgYDg4XG4jIFx0ODggICAgLjhQIDg4IDg4LiAgLjg4IDg4IDg4LiAgLjg4IDg4LiAgLjg4XG4jIFx0ODg4ODg4OFAgIGRQIGA4ODg4OFA4IGRQIGA4ODg4OFAnIGA4ODg4UDg4XG4jIFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLjg4XG4jIFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkODg4OFBcblxuZXhwb3J0cy5EaWFsb2cgPSBjbGFzcyBEaWFsb2cgZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblxuXHRcdEBfdGhlbWUgPSBvcHRpb25zLnRoZW1lID8gJ2RhcmsnXG5cblx0XHRzdXBlciBfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRuYW1lOiAnLicsIHNpemU6IFNjcmVlbi5zaXplLCBjb2xvcjogQF90aGVtZS50aW50XG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6ICdyZ2JhKDAsIDAsIDAsIC41KSdcblx0XHRcdG9wYWNpdHk6IDBcblx0XHRcdFxuXHRcdEBfdGl0bGUgPSBvcHRpb25zLnRpdGxlID8gJ0RlZmF1bHQgVGl0bGUnXG5cdFx0QF9ib2R5ID0gb3B0aW9ucy5ib2R5ID8gJ0JvZHkgdGV4dCBnb2VzIGhlcmUuJ1xuXHRcdEBfYWNjZXB0VGV4dCA9IG9wdGlvbnMuYWNjZXB0VGV4dCA/ICdjb25maXJtJ1xuXHRcdEBfYWNjZXB0QWN0aW9uID0gb3B0aW9ucy5hY2NlcHRBY3Rpb24gPyAtPiBudWxsXG5cdFx0QF9kZWNsaW5lVGV4dCA9IG9wdGlvbnMuZGVjbGluZVRleHQgPyAnJ1xuXHRcdEBfZGVjbGluZUFjdGlvbiA9IG9wdGlvbnMuZGVjbGluZUFjdGlvbiA/IC0+IG51bGxcblx0XHRcblx0XHRAb24gRXZlbnRzLlRhcCwgKGV2ZW50KSAtPiBldmVudC5zdG9wUHJvcGFnYXRpb24oKVxuXHRcdFxuXHRcdEBjb250YWluZXIgPSBuZXcgTGF5ZXJcblx0XHRcdG5hbWU6ICdjb250YWluZXInLCBwYXJlbnQ6IEBcblx0XHRcdHg6IEFsaWduLmNlbnRlclxuXHRcdFx0aGVpZ2h0OiAxMjgsIHdpZHRoOiBTY3JlZW4ud2lkdGggLSA4MFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBAX3RoZW1lLmRpYWxvZy5iYWNrZ3JvdW5kQ29sb3Jcblx0XHRcdHNoYWRvd1g6IDAsIHNoYWRvd1k6IDcsIHNoYWRvd0JsdXI6IDMwXG5cdFx0XHRvcGFjaXR5OiAwXG5cdFx0XHRzaGFkb3dDb2xvcjogJ3JnYmEoMCwwLDAsLjMpJ1xuXHRcdFxuXHRcdEB0aXRsZSA9IG5ldyBUZXh0TGF5ZXJcblx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBAY29udGFpbmVyXG5cdFx0XHR4OiAyNCwgeTogMjBcblx0XHRcdGZvbnRTaXplOiAxNiwgZm9udFdlaWdodDogNTAwLCBjb2xvcjogQF90aGVtZS50ZXh0LnRpdGxlXG5cdFx0XHR0ZXh0OiBAX3RpdGxlXG5cdFx0XG5cdFx0QGJvZHkgPSBuZXcgVGV4dExheWVyXG5cdFx0XHRuYW1lOiAnYm9keScsIHBhcmVudDogQGNvbnRhaW5lclxuXHRcdFx0eDogMjQsIHk6IDUyXG5cdFx0XHR3aWR0aDogQGNvbnRhaW5lci53aWR0aCAtIDQyXG5cdFx0XHRmb250U2l6ZTogMTZcblx0XHRcdGZvbnRXZWlnaHQ6IDQwMCwgbGluZUhlaWdodDogMS41LCBjb2xvcjogQF90aGVtZS50ZXh0LmJvZHlcblx0XHRcdHRleHQ6IEBfYm9keVxuXHRcdFxuXHRcdGJ1dHRvbnNZID0gaWYgQF9ib2R5IGlzICcnIHRoZW4gMTI4IGVsc2UgQGJvZHkubWF4WSArIDE2XG5cdFx0XG5cdFx0QGFjY2VwdCA9IG5ldyBUZXh0TGF5ZXJcblx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBAY29udGFpbmVyXG5cdFx0XHR4OiBBbGlnbi5yaWdodCgtMTYpLCB5OiBidXR0b25zWVxuXHRcdFx0Zm9udFNpemU6IDE0LCBmb250V2VpZ2h0OiA1MDAsIHRleHRBbGlnbjogJ2NlbnRlcidcblx0XHRcdGxldHRlclNwYWNpbmc6IDEuMSwgcGFkZGluZzoge2xlZnQ6IDQsIHJpZ2h0OiA0LCB0b3A6IDgsIGJvdHRvbTogMH0sIFxuXHRcdFx0Y29sb3I6IEBfdGhlbWUudGludCwgdGV4dDogQF9hY2NlcHRUZXh0LnRvVXBwZXJDYXNlKClcblx0XHRcdFxuXHRcdEBhY2NlcHQub25UYXAgQF9hY2NlcHRBY3Rpb25cblx0XHRcblx0XHRpZiBAX2RlY2xpbmVUZXh0IGlzbnQgJydcblx0XHRcdEBkZWNsaW5lID0gbmV3IFRleHRMYXllclxuXHRcdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQGNvbnRhaW5lclxuXHRcdFx0XHR4OiAwLCB5OiBidXR0b25zWVxuXHRcdFx0XHRmb250U2l6ZTogMTQsIGZvbnRXZWlnaHQ6IDUwMCwgdGV4dEFsaWduOiAnY2VudGVyJ1xuXHRcdFx0XHRsZXR0ZXJTcGFjaW5nOiAxLjEsIHBhZGRpbmc6IHtsZWZ0OiA0LCByaWdodDogNCwgdG9wOiA4LCBib3R0b206IDB9LCBcblx0XHRcdFx0Y29sb3I6IEBfdGhlbWUudGludCwgdGV4dDogQF9kZWNsaW5lVGV4dC50b1VwcGVyQ2FzZSgpXG5cblx0XHRcdEBkZWNsaW5lLm9uVGFwIEBfZGVjbGluZUFjdGlvblxuXG5cdFx0IyBzZXQgcG9zaXRpb25zXG5cdFx0QGNvbnRhaW5lci5oZWlnaHQgPSBAYWNjZXB0Lm1heFkgKyAxMlxuXHRcdEBkZWNsaW5lPy5tYXhYID0gQGFjY2VwdC54IC0gMTZcblx0XHRAY29udGFpbmVyLnkgPSBBbGlnbi5jZW50ZXIoMTYpXG5cdFx0XG5cdFx0IyBhZGQgY2xvc2UgYWN0aW9ucyB0byBjb25maXJtIGFuZCBjYW5jZWxcblx0XHRmb3IgYnV0dG9uIGluIFtAYWNjZXB0LCBAZGVjbGluZV1cblx0XHRcdGJ1dHRvbj8ub25UYXAgQGNsb3NlXG5cdFx0XG5cdFx0XG5cdFx0IyBPTiBMT0FEXG5cdFx0QG9wZW4oKVxuXHRcblx0b3BlbjogPT5cblx0XHRAYW5pbWF0ZVxuXHRcdFx0b3BhY2l0eTogMVxuXHRcdFx0b3B0aW9uczogXG5cdFx0XHRcdHRpbWU6IC4yNVxuXHRcdFxuXHRcdEBjb250YWluZXIuYW5pbWF0ZVxuXHRcdFx0b3BhY2l0eTogMVxuXHRcdFx0b3B0aW9uczpcblx0XHRcdFx0dGltZTogLjI1XG5cdFx0XHRcdGRlbGF5OiAuMDVcblxuXHRjbG9zZTogPT5cblx0XHRAY29udGFpbmVyLmFuaW1hdGVcblx0XHRcdG9wYWNpdHk6IDBcblx0XHRcdG9wdGlvbnM6XG5cdFx0XHRcdHRpbWU6IC4yNVxuXHRcdFxuXHRcdEBhbmltYXRlXG5cdFx0XHRvcGFjaXR5OiAwXG5cdFx0XHRvcHRpb25zOlxuXHRcdFx0XHR0aW1lOiAuMjVcblx0XHRcblx0XHRVdGlscy5kZWxheSAuNSwgPT4gQGRlc3Ryb3koKVxuXG5cblxuXG5cblxuIiwie2RhdGFiYXNlfSA9IHJlcXVpcmUgJ2RhdGFiYXNlJ1xuXG5cblxuIyBcdCA4ODg4ODg4OGIgZFBcbiMgXHQgODggICAgICAgIDg4XG4jIFx0YTg4YWFhYSAgICA4OCAuZDg4ODhiLiBkUCAgZFAgIGRQXG4jIFx0IDg4ICAgICAgICA4OCA4OCcgIGA4OCA4OCAgODggIDg4XG4jIFx0IDg4ICAgICAgICA4OCA4OC4gIC44OCA4OC44OGIuODgnXG4jIFx0IGRQICAgICAgICBkUCBgODg4ODhQJyA4ODg4UCBZOFBcbiBcdFxuXG5leHBvcnRzLmZsb3cgPSBmbG93ID0gbmV3IG1kLkFwcFxuXHR0aGVtZTogJ2RhdSdcblx0Zm9vdGVyOiBmYWxzZVxuXHRhbmltYXRpb25PcHRpb25zOiB7Y3VydmU6IFwic3ByaW5nKDMwMCwgMzUsIDApXCJ9XG5cblxuXG5cblxuXG4jIFx0ODg4OGJhLjg4YmEgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA4ODg4ODhiYSAgICAgICAgICAgICBkUCAgICAgZFBcbiMgXHQ4OCAgYDhiICBgOGIgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDg4ICAgIGA4YiAgICAgICAgICAgIDg4ICAgICA4OFxuIyBcdDg4ICAgODggICA4OCAuZDg4ODhiLiA4OGQ4ODhiLiBkUCAgICBkUCBhODhhYWFhOFAnIGRQICAgIGRQIGQ4ODg4UCBkODg4OFAgLmQ4ODg4Yi4gODhkODg4Yi5cbiMgXHQ4OCAgIDg4ICAgODggODhvb29vZDggODgnICBgODggODggICAgODggIDg4ICAgYDhiLiA4OCAgICA4OCAgIDg4ICAgICA4OCAgIDg4JyAgYDg4IDg4JyAgYDg4XG4jIFx0ODggICA4OCAgIDg4IDg4LiAgLi4uIDg4ICAgIDg4IDg4LiAgLjg4ICA4OCAgICAuODggODguICAuODggICA4OCAgICAgODggICA4OC4gIC44OCA4OCAgICA4OFxuIyBcdGRQICAgZFAgICBkUCBgODg4ODhQJyBkUCAgICBkUCBgODg4ODhQJyAgODg4ODg4ODhQIGA4ODg4OFAnICAgZFAgICAgIGRQICAgYDg4ODg4UCcgZFAgICAgZFBcblxuXG5jbGFzcyBNZW51QnV0dG9uIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cdFx0XG5cdFx0QF9pY29uID0gb3B0aW9ucy5pY29uID8gJ2Jvb2snXG5cdFx0QF90ZXh0ID0gb3B0aW9ucy50ZXh0ID8gJ0RlZmF1bHQnXG5cdFx0QF9hY3Rpb24gPSBvcHRpb25zLmFjdGlvbiA/IC0+IG51bGxcblxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdGhlaWdodDogNDgsIHdpZHRoOiAzMDRcblx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXG5cdFx0QGljb25MYXllciA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEBcblx0XHRcdHk6IEFsaWduLmNlbnRlclxuXHRcdFx0aGVpZ2h0OiAzMiwgd2lkdGg6IDMyXG5cdFx0XHRpbnZlcnQ6IDEwMFxuXHRcdFx0aW1hZ2U6IEBfaWNvblxuXG5cdFx0QGxhYmVsTGF5ZXIgPSBuZXcgVGV4dExheWVyXG5cdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQFxuXHRcdFx0eTogQWxpZ24uY2VudGVyLCB4OiBAaWNvbkxheWVyLm1heFggKyAxNlxuXHRcdFx0d2lkdGg6IDEwMFxuXHRcdFx0Zm9udEZhbWlseTogJ1N0cmF0b3MnXG5cdFx0XHRmb250U2l6ZTogMTRcblx0XHRcdHRleHRBbGlnbjogJ2xlZnQnXG5cdFx0XHRjb2xvcjogJyNGRkYnXG5cdFx0XHR0ZXh0OiBcIiN7QF90ZXh0fVwiXG5cblx0XHRAb25UYXAgQF9hY3Rpb25cblx0XHRAb25UYXAgLT4gXG5cdFx0XHRVdGlscy5kZWxheSAuMjUsID0+IEBwYXJlbnQuaGlkZSgpXG5cblxuXG5cblxuXG4jICAgIDg4ODg4OGJhICAgICAgICAgICAgICAgICAgICBkUCAgICAgICBkUCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkUCAgODg4ODg4YmEgICAgICAgICAgICAgZFAgICAgIGRQICAgICAgICAgICAgICAgICAgICBcbiMgICAgODggICAgYDhiICAgICAgICAgICAgICAgICAgIDg4ICAgICAgIDg4ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDg4ICA4OCAgICBgOGIgICAgICAgICAgICA4OCAgICAgODggICAgICAgICAgICAgICAgICAgIFxuIyAgICA4OCAgICAgODggLmQ4ODg4Yi4gLmQ4ODg4Yi4gODhkODg4Yi4gODhkODg4Yi4gLmQ4ODg4Yi4gLmQ4ODg4Yi4gODhkODg4Yi4gLmQ4ODhiODggYTg4YWFhYThQJyBkUCAgICBkUCBkODg4OFAgZDg4ODhQIC5kODg4OGIuIDg4ZDg4OGIuXG4jICAgIDg4ICAgICA4OCA4OCcgIGA4OCBZOG9vb29vLiA4OCcgIGA4OCA4OCcgIGA4OCA4OCcgIGA4OCA4OCcgIGA4OCA4OCcgIGA4OCA4OCcgIGA4OCAgODggICBgOGIuIDg4ICAgIDg4ICAgODggICAgIDg4ICAgODgnICBgODggODgnICBgODhcbiMgICAgODggICAgLjhQIDg4LiAgLjg4ICAgICAgIDg4IDg4ICAgIDg4IDg4LiAgLjg4IDg4LiAgLjg4IDg4LiAgLjg4IDg4ICAgICAgIDg4LiAgLjg4ICA4OCAgICAuODggODguICAuODggICA4OCAgICAgODggICA4OC4gIC44OCA4OCAgICA4OFxuIyAgICA4ODg4ODg4UCAgYDg4ODg4UDggYDg4ODg4UCcgZFAgICAgZFAgODhZODg4OCcgYDg4ODg4UCcgYDg4ODg4UDggZFAgICAgICAgYDg4ODg4UDggIDg4ODg4ODg4UCBgODg4ODhQJyAgIGRQICAgICBkUCAgIGA4ODg4OFAnIGRQICAgIGRQXG5cblxuZXhwb3J0cy5EYXNoYm9hcmRCdXR0b24gPSBjbGFzcyBEYXNoYm9hcmRCdXR0b24gZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblx0XHRcblx0XHRAX2ljb24gPSBvcHRpb25zLmljb24gPyAnYm9vaydcblx0XHRAX3RleHQgPSBvcHRpb25zLnRleHQgPyAnRGVmYXVsdCdcblx0XHRAX2FjdGlvbiA9IG9wdGlvbnMuYWN0aW9uID8gLT4gbnVsbFxuXG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHRoZWlnaHQ6IDEwMCwgd2lkdGg6IDU2XG5cblx0XHRAaWNvbkxheWVyID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQFxuXHRcdFx0eDogQWxpZ24uY2VudGVyLCB5OiAwXG5cdFx0XHRoZWlnaHQ6IDcyLCB3aWR0aDogNzJcblx0XHRcdGludmVydDogMTAwXG5cdFx0XHRpbWFnZTogXCJpbWFnZXMvaWNvbnMvI3tAX2ljb259LnBuZ1wiXG5cblx0XHRAdGV4dExheWVyID0gbmV3IFRleHRMYXllclxuXHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEBcblx0XHRcdHk6IEBpY29uTGF5ZXIubWF4WSwgeDogQWxpZ24uY2VudGVyXG5cdFx0XHR3aWR0aDogMTAwXG5cdFx0XHRmb250RmFtaWx5OiAnU3RyYXRvcydcblx0XHRcdGZvbnRTaXplOiAxM1xuXHRcdFx0dGV4dEFsaWduOiAnY2VudGVyJ1xuXHRcdFx0Y29sb3I6ICcjRkZGJ1xuXHRcdFx0dGV4dDogXCIje0BfdGV4dH1cIlxuXG5cdFx0QG9uVGFwIEBfYWN0aW9uXG5cblxuXG5cblxuXG4jXHRkUCAgICAgICAgICAgICAgICAgICBvbyAgIGRQICAgICAgICAgICAgICBkUCAgIG9vICAgICAgICAgICAgICAgICAgXG4jIFx0ODggICAgICAgICAgICAgICAgICAgICAgICA4OCAgICAgICAgICAgICAgODggICAgICAgICAgICAgICAgICAgICAgIFxuI1x0ODggODhkODg4Yi4gZFAgICAuZFAgZFAgZDg4ODhQIC5kODg4OGIuIGQ4ODg4UCBkUCAuZDg4ODhiLiA4OGQ4ODhiLlxuIyBcdDg4IDg4JyAgYDg4IDg4ICAgZDgnIDg4ICAgODggICA4OCcgIGA4OCAgIDg4ICAgODggODgnICBgODggODgnICBgODhcbiMgXHQ4OCA4OCAgICA4OCA4OCAuODgnICA4OCAgIDg4ICAgODguICAuODggICA4OCAgIDg4IDg4LiAgLjg4IDg4ICAgIDg4XG4jIFx0ZFAgZFAgICAgZFAgODg4OFAnICAgZFAgICBkUCAgIGA4ODg4OFA4ICAgZFAgICBkUCBgODg4ODhQJyBkUCAgICBkUFxuXG5jbGFzcyBJbnZpdGF0aW9uIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBvcHRpb25zXG5cblxuXG5cblxuXG4jIFx0IDg4ODg4OGJhXG4jIFx0IDg4ICAgIGA4YlxuIyBcdGE4OGFhYWE4UCcgLmQ4ODg4Yi4gLmQ4ODg4Yi4gLmQ4ODg4Yi4gLmQ4ODg4Yi5cbiMgXHQgODggICAgICAgIDg4JyAgYDg4IDg4JyAgYDg4IDg4b29vb2Q4IFk4b29vb28uXG4jIFx0IDg4ICAgICAgICA4OC4gIC44OCA4OC4gIC44OCA4OC4gIC4uLiAgICAgICA4OFxuIyBcdCBkUCAgICAgICAgYDg4ODg4UDggYDg4ODhQODggYDg4ODg4UCcgYDg4ODg4UCdcbiMgXHQgICAgICAgICAgICAgICAgICAgICAgICAgLjg4XG4jIFx0ICAgICAgICAgICAgICAgICAgICAgZDg4ODhQXG5cbnBhZ2VzID0gW1xuXHR7dGl0bGU6ICdQcm9maWxlJywgaWNvbjogJ2FjY291bnQtY2lyY2xlJywgYWN0aW9uOiAtPiBcblx0XHRmbG93LnNob3dOZXh0KG5ldyBQcm9maWxlKX0sXG5cdHt0aXRsZTogJ0Jpb2dyYXBoaWVzJywgaWNvbjogJ2dyb3VwJywgYWN0aW9uOiAtPiBcblx0XHRmbG93LnNob3dOZXh0KG5ldyBCaW9ncmFwaGllcyl9LFxuXHR7dGl0bGU6ICdOb3RlcycsIGljb246ICdkcml2ZS1maWxlJywgYWN0aW9uOiAtPiBcblx0XHRmbG93LnNob3dOZXh0KG5ldyBOb3Rlcyl9LFxuXHR7dGl0bGU6ICdNdXNpYycsIGljb246ICdoZWFkc2V0JywgYWN0aW9uOiAtPiBcblx0XHRmbG93LnNob3dOZXh0KG5ldyBNdXNpYyl9LFxuXHR7dGl0bGU6ICdNYXAnLCBpY29uOiAnbWFwJywgYWN0aW9uOiAtPiBcblx0XHRmbG93LnNob3dOZXh0KG5ldyBNYXApfSxcblx0e3RpdGxlOiAnUmFkaW8nLCBpY29uOiAnd2lmaS10ZXRoZXJpbmcnLCBhY3Rpb246IC0+IFxuXHRcdGZsb3cuc2hvd05leHQobmV3IFJhZGlvKX0sXG5cdHt0aXRsZTogJ0Jvb2snLCBpY29uOiAnYm9vaycsIGFjdGlvbjogLT4gXG5cdFx0Zmxvdy5zaG93TmV4dChuZXcgQm9vayl9LFxuXHR7dGl0bGU6ICdIaXN0b3J5JywgaWNvbjogJ2RyaXZlLWRvY3VtZW50JywgYWN0aW9uOiAtPiBcblx0XHRmbG93LnNob3dOZXh0KG5ldyBIaXN0b3J5KX0sXG5cdHt0aXRsZTogJ0hlbHAnLCBpY29uOiAnd2FybmluZycsIGFjdGlvbjogLT4gXG5cdFx0Zmxvdy5zaG93TmV4dChuZXcgSGVscCl9LFxuXVxuXG5cblxuXG5cblxuIyAgICA4ODg4ODhiYSAgICAgICAgICAgICAgICAgICAgZFAgICAgICAgZFAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZFBcbiMgICAgODggICAgYDhiICAgICAgICAgICAgICAgICAgIDg4ICAgICAgIDg4ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDg4XG4jICAgIDg4ICAgICA4OCAuZDg4ODhiLiAuZDg4ODhiLiA4OGQ4ODhiLiA4OGQ4ODhiLiAuZDg4ODhiLiAuZDg4ODhiLiA4OGQ4ODhiLiAuZDg4OGI4OFxuIyAgICA4OCAgICAgODggODgnICBgODggWThvb29vby4gODgnICBgODggODgnICBgODggODgnICBgODggODgnICBgODggODgnICBgODggODgnICBgODhcbiMgICAgODggICAgLjhQIDg4LiAgLjg4ICAgICAgIDg4IDg4ICAgIDg4IDg4LiAgLjg4IDg4LiAgLjg4IDg4LiAgLjg4IDg4ICAgICAgIDg4LiAgLjg4XG4jICAgIDg4ODg4ODhQICBgODg4ODhQOCBgODg4ODhQJyBkUCAgICBkUCA4OFk4ODg4JyBgODg4ODhQJyBgODg4ODhQOCBkUCAgICAgICBgODg4ODhQOFxuXG5cbmNsYXNzIERhc2hib2FyZCBleHRlbmRzIG1kLlBhZ2Vcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0dGhlbWU6IGZsb3cudGhlbWVcblx0XHRcdGhlYWRlcjogXG5cdFx0XHRcdHRpdGxlOiAnRGFzaGJvYXJkJywgXG5cdFx0XHRcdHZpc2libGU6IHRydWUsIFxuXHRcdFx0XHRpY29uOiAnbWVudScsIFxuXHRcdFx0XHRpY29uQWN0aW9uOiAtPiBtZW51T3ZlcmxheS5zaG93KClcblxuXHRcdE1BUkdJTiA9IDQ4XG5cdFx0Uk9XX0hFSUdIVCA9IDEwNFxuXG5cdFx0QHByb2ZpbGVCdXR0b24gPSBuZXcgRGFzaGJvYXJkQnV0dG9uXG5cdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQFxuXHRcdFx0eDogTUFSR0lOLCB5OiBST1dfSEVJR0hUXG5cdFx0XHRpY29uOiAnYWNjb3VudC1jaXJjbGUnXG5cdFx0XHR0ZXh0OiAnUHJvZmlsZSdcblx0XHRcdGFjdGlvbjogLT4gZmxvdy5zaG93TmV4dChuZXcgUHJvZmlsZSlcblxuXHRcdEBiaW9zQnV0dG9uID0gbmV3IERhc2hib2FyZEJ1dHRvblxuXHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEBcblx0XHRcdHg6IEFsaWduLmNlbnRlciwgeTogUk9XX0hFSUdIVFxuXHRcdFx0aWNvbjogJ2dyb3VwJ1xuXHRcdFx0dGV4dDogJ0Jpb2dyYXBoaWVzJ1xuXHRcdFx0YWN0aW9uOiAtPiBmbG93LnNob3dOZXh0KG5ldyBCaW9ncmFwaGllcylcblxuXHRcdEBub3Rlc0J1dHRvbiA9IG5ldyBEYXNoYm9hcmRCdXR0b25cblx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBAXG5cdFx0XHR4OiBBbGlnbi5yaWdodCgtTUFSR0lOKSwgeTogUk9XX0hFSUdIVFxuXHRcdFx0aWNvbjogJ2RyaXZlLWZpbGUnXG5cdFx0XHR0ZXh0OiAnTm90ZXMnXG5cdFx0XHRhY3Rpb246IC0+IGZsb3cuc2hvd05leHQobmV3IE5vdGVzKVxuXG5cdFx0QGhlYWRzZXRCdXR0b24gPSBuZXcgRGFzaGJvYXJkQnV0dG9uXG5cdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQFxuXHRcdFx0eDogTUFSR0lOLCB5OiBST1dfSEVJR0hUICogMlxuXHRcdFx0aWNvbjogJ2hlYWRzZXQnXG5cdFx0XHR0ZXh0OiAnTXVzaWMnXG5cdFx0XHRhY3Rpb246IC0+IGZsb3cuc2hvd05leHQobmV3IE11c2ljKVxuXG5cdFx0QG1hcEJ1dHRvbiA9IG5ldyBEYXNoYm9hcmRCdXR0b25cblx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBAXG5cdFx0XHR4OiBBbGlnbi5jZW50ZXIsIHk6IFJPV19IRUlHSFQgKiAyXG5cdFx0XHRpY29uOiAnbWFwJ1xuXHRcdFx0dGV4dDogJ01hcCdcblx0XHRcdGFjdGlvbjogLT4gZmxvdy5zaG93TmV4dChuZXcgTWFwKVxuXG5cdFx0QHJhZGlvQnV0dG9uID0gbmV3IERhc2hib2FyZEJ1dHRvblxuXHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEBcblx0XHRcdHg6IEFsaWduLnJpZ2h0KC1NQVJHSU4pLCB5OiBST1dfSEVJR0hUICogMlxuXHRcdFx0aWNvbjogJ3dpZmktdGV0aGVyaW5nJ1xuXHRcdFx0dGV4dDogJ1JhZGlvJ1xuXHRcdFx0YWN0aW9uOiAtPiBmbG93LnNob3dOZXh0KG5ldyBSYWRpbylcblxuXHRcdEBib29rQnV0dG9uID0gbmV3IERhc2hib2FyZEJ1dHRvblxuXHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEBcblx0XHRcdHg6IE1BUkdJTiwgeTogUk9XX0hFSUdIVCAqIDNcblx0XHRcdGljb246ICdib29rJ1xuXHRcdFx0dGV4dDogJ0Jvb2snXG5cdFx0XHRhY3Rpb246IC0+IGZsb3cuc2hvd05leHQobmV3IEJvb2spXG5cblx0XHRAaGlzdG9yeUJ1dHRvbiA9IG5ldyBEYXNoYm9hcmRCdXR0b25cblx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBAXG5cdFx0XHR4OiBBbGlnbi5jZW50ZXIsIHk6IFJPV19IRUlHSFQgKiAzXG5cdFx0XHRpY29uOiAnZHJpdmUtZG9jdW1lbnQnXG5cdFx0XHR0ZXh0OiAnSGlzdG9yeSdcblx0XHRcdGFjdGlvbjogLT4gZmxvdy5zaG93TmV4dChuZXcgSGlzdG9yeSlcblxuXHRcdEBoZWxwQnV0dG9uID0gbmV3IERhc2hib2FyZEJ1dHRvblxuXHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEBcblx0XHRcdHg6IEFsaWduLnJpZ2h0KC1NQVJHSU4pLCB5OiBST1dfSEVJR0hUICogM1xuXHRcdFx0aWNvbjogJ3dhcm5pbmcnXG5cdFx0XHR0ZXh0OiAnSGVscCdcblx0XHRcdGFjdGlvbjogLT4gZmxvdy5zaG93TmV4dChuZXcgSGVscClcblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuIyBcdDg4ODhiYS44OGJhICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLjg4ODg4LiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZFAgICAgICAgICAgICAgICAgICBcbiMgXHQ4OCAgYDhiICBgOGIgICAgICAgICAgICAgICAgICAgICAgICAgICAgZDgnICAgYDhiICAgICAgICAgICAgICAgICAgICAgICAgICAgIDg4ICAgICAgICAgICAgICAgICAgXG4jIFx0ODggICA4OCAgIDg4IC5kODg4OGIuIDg4ZDg4OGIuIGRQICAgIGRQIDg4ICAgICA4OCBkUCAgIC5kUCAuZDg4ODhiLiA4OGQ4ODhiLiA4OCAuZDg4ODhiLiBkUCAgICBkUFxuIyBcdDg4ICAgODggICA4OCA4OG9vb29kOCA4OCcgIGA4OCA4OCAgICA4OCA4OCAgICAgODggODggICBkOCcgODhvb29vZDggODgnICBgODggODggODgnICBgODggODggICAgODhcbiMgXHQ4OCAgIDg4ICAgODggODguICAuLi4gODggICAgODggODguICAuODggWTguICAgLjhQIDg4IC44OCcgIDg4LiAgLi4uIDg4ICAgICAgIDg4IDg4LiAgLjg4IDg4LiAgLjg4XG4jIFx0ZFAgICBkUCAgIGRQIGA4ODg4OFAnIGRQICAgIGRQIGA4ODg4OFAnICBgODg4OFAnICA4ODg4UCcgICBgODg4ODhQJyBkUCAgICAgICBkUCBgODg4ODhQOCBgODg4OFA4OFxuIyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLjg4XG4jICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGQ4ODg4UCBcblxuY2xhc3MgTWVudU92ZXJsYXkgZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblx0XHRzdXBlciBfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRoZWlnaHQ6IFNjcmVlbi5oZWlnaHRcblx0XHRcdHdpZHRoOiAzMDRcblx0XHRcdGhlaWdodDogU2NyZWVuLmhlaWdodFxuXHRcdFx0dmlzaWJsZTogZmFsc2Vcblx0XHRcdGJhY2tncm91bmRDb2xvcjogJyMzMDMwMzAnXG5cdFx0XHRhbmltYXRpb25PcHRpb25zOiB7Y3VydmU6IFwic3ByaW5nKDMwMCwgMzUsIDApXCJ9XG5cblx0XHRAc2NyaW0gPSBuZXcgTGF5ZXJcblx0XHRcdG5hbWU6ICcuJywgXG5cdFx0XHRzaXplOiBTY3JlZW4uc2l6ZVxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiAncmdiYSgwLDAsMCwuOCknXG5cdFx0XHRvcGFjaXR5OiAwXG5cdFx0XHR2aXNpYmxlOiBmYWxzZVxuXHRcdFx0YW5pbWF0aW9uT3B0aW9uczpcblx0XHRcdFx0dGltZTogLjI1XG5cblx0XHRAc2NyaW0ub25UYXAgPT4gQGhpZGUoKVxuXHRcdEBvblN3aXBlTGVmdEVuZCA9PiBAaGlkZSgpXG5cblx0XHRAdXNlclBob3RvID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQFxuXHRcdFx0d2lkdGg6IEB3aWR0aCwgaGVpZ2h0OiAxNzNcblx0XHRcdGltYWdlOiBkYXRhYmFzZS51c2VyLmltYWdlXG5cdFx0XHRicmlnaHRuZXNzOiA1MFxuXG5cdFx0QHVzZXJOYW1lID0gbmV3IG1kLlRpdGxlXG5cdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQFxuXHRcdFx0d2lkdGg6IEB3aWR0aFxuXHRcdFx0Zm9udFNpemU6IDI4XG5cdFx0XHRjb2xvcjogJyNGRkYnXG5cdFx0XHR4OiAxNiwgeTogMzJcblx0XHRcdHRleHQ6IGRhdGFiYXNlLnVzZXIubmFtZVxuXG5cdFx0QHVzZXJOYW1lLm1heFkgPSBAdXNlclBob3RvLm1heFkgLSAxNlxuXG5cdFx0bGlua3MgPSBbXVxuXG5cdFx0Zm9yIHBhZ2UsIGkgaW4gcGFnZXNcblx0XHRcdGxpbmtzW2ldID0gbmV3IE1lbnVCdXR0b25cblx0XHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEBcblx0XHRcdFx0eDogMTYsIHk6IDE4OSArICg0OCAqIGkpXG5cdFx0XHRcdHRleHQ6IHBhZ2UudGl0bGVcblx0XHRcdFx0aWNvbjogXCJpbWFnZXMvaWNvbnMvI3twYWdlLmljb259LnBuZ1wiXG5cdFx0XHRcdGFjdGlvbjogcGFnZS5hY3Rpb25cblxuXHRzaG93OiAtPlxuXHRcdEBicmluZ1RvRnJvbnQoKVxuXHRcdEB2aXNpYmxlID0gdHJ1ZVxuXHRcdEB4ID0gLVNjcmVlbi53aWR0aFxuXHRcdEBhbmltYXRlXG5cdFx0XHR4OiAwXG5cblx0XHRAc2NyaW0ucGxhY2VCZWhpbmQoQClcblx0XHRAc2NyaW0udmlzaWJsZSA9IHRydWVcblx0XHRAc2NyaW0uYW5pbWF0ZVxuXHRcdFx0b3BhY2l0eTogMVxuXG5cdGhpZGU6IC0+XG5cdFx0QGFuaW1hdGVcblx0XHRcdHg6IC1TY3JlZW4ud2lkdGhcblxuXHRcdEBzY3JpbS5hbmltYXRlXG5cdFx0XHRvcGFjaXR5OiAwXG5cblx0XHRVdGlscy5kZWxheSAuMywgPT5cblx0XHRcdEB2aXNpYmxlID0gZmFsc2Vcblx0XHRcdEBzY3JpbS52aXNpYmxlID0gZmFsc2Vcblx0XHRcdEBzZW5kVG9CYWNrKClcblx0XHRcdEBzY3JpbS5zZW5kVG9CYWNrKClcblxuXG5cblxuXG5cblxuIyBcdCA4ODg4ODhiYSAgICAgICAgICAgICAgICAgICAgLjg4ODhiIG9vIGRQXG4jIFx0IDg4ICAgIGA4YiAgICAgICAgICAgICAgICAgICA4OCAgIFwiICAgIDg4XG4jIFx0YTg4YWFhYThQJyA4OGQ4ODhiLiAuZDg4ODhiLiA4OGFhYSAgZFAgODggLmQ4ODg4Yi5cbiMgXHQgODggICAgICAgIDg4JyAgYDg4IDg4JyAgYDg4IDg4ICAgICA4OCA4OCA4OG9vb29kOFxuIyBcdCA4OCAgICAgICAgODggICAgICAgODguICAuODggODggICAgIDg4IDg4IDg4LiAgLi4uXG4jIFx0IGRQICAgICAgICBkUCAgICAgICBgODg4ODhQJyBkUCAgICAgZFAgZFAgYDg4ODg4UCdcblxuY2xhc3MgUHJvZmlsZSBleHRlbmRzIG1kLlBhZ2Vcblx0Y29uc3RydWN0b3I6IChvcHRpb25zKSAtPlxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdHRoZW1lOiBmbG93LnRoZW1lXG5cdFx0XHRoZWFkZXI6XG5cdFx0XHRcdHRpdGxlOiAnUHJvZmlsZSdcblx0XHRcdFx0dmlzaWJsZTogdHJ1ZSwgXG5cdFx0XHRcdGljb246ICdhcnJvdy1iYWNrJywgXG5cdFx0XHRcdGljb25BY3Rpb246IC0+IFxuXHRcdFx0XHRcdGZsb3cuc2hvd1ByZXZpb3VzKClcblx0XHRcdFx0XHRAZGVzdHJveSgpXG5cblxuXG5cblxuXG4jXHQgIDg4ODg4OGJhICBvbyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkUCAgICAgICBvb1xuI1x0ICA4OCAgICBgOGIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgODhcbiNcdCBhODhhYWFhOFAnIGRQIC5kODg4OGIuIC5kODg4OGIuIDg4ZDg4OGIuIC5kODg4OGIuIDg4ZDg4OGIuIDg4ZDg4OGIuIGRQIC5kODg4OGIuIC5kODg4OGIuXG4jXHQgIDg4ICAgYDhiLiA4OCA4OCcgIGA4OCA4OCcgIGA4OCA4OCcgIGA4OCA4OCcgIGA4OCA4OCcgIGA4OCA4OCcgIGA4OCA4OCA4OG9vb29kOCBZOG9vb29vLlxuI1x0ICA4OCAgICAuODggODggODguICAuODggODguICAuODggODggICAgICAgODguICAuODggODguICAuODggODggICAgODggODggODguICAuLi4gICAgICAgODhcbiNcdCAgODg4ODg4ODhQIGRQIGA4ODg4OFAnIGA4ODg4UDg4IGRQICAgICAgIGA4ODg4OFA4IDg4WTg4OFAnIGRQICAgIGRQIGRQIGA4ODg4OFAnIGA4ODg4OFAnXG4jXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC44OCAgICAgICAgICAgICAgICAgICA4OFxuI1x0ICAgICAgICAgICAgICAgICAgICAgICAgIGQ4ODg4UCAgICAgICAgICAgICAgICAgICAgZFBcblxuY2xhc3MgQmlvZ3JhcGhpZXMgZXh0ZW5kcyBtZC5QYWdlXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdHRoZW1lOiBmbG93LnRoZW1lXG5cdFx0XHRoZWFkZXI6XG5cdFx0XHRcdHRpdGxlOiAnQmlvZ3JhcGhpZXMnXG5cdFx0XHRcdHZpc2libGU6IHRydWUsIFxuXHRcdFx0XHRpY29uOiAnYXJyb3ctYmFjaycsIFxuXHRcdFx0XHRpY29uQWN0aW9uOiAtPiBcblx0XHRcdFx0XHRmbG93LnNob3dQcmV2aW91cygpXG5cdFx0XHRcdFx0QGRlc3Ryb3koKVxuXG5cblxuXG5cblxuI1x0ICA4ODg4ODhiYSAgb29cbiNcdCAgODggICAgYDhiXG4jXHQgYTg4YWFhYThQJyBkUCAuZDg4ODhiLlxuI1x0ICA4OCAgIGA4Yi4gODggODgnICBgODhcbiNcdCAgODggICAgLjg4IDg4IDg4LiAgLjg4XG4jXHQgIDg4ODg4ODg4UCBkUCBgODg4ODhQJ1xuXG5cblxuY2xhc3MgQmlvZ3JhcGhpZXNGb2N1cyBleHRlbmRzIG1kLlBhZ2Vcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cblx0XHRAX3NvdXJjZSA9IG9wdGlvbnMuc291cmNlID8ge3RpdGxlOiAnRGVmYXVsdCd9XG5cblx0XHRzdXBlciBfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHR0aGVtZTogZmxvdy50aGVtZVxuXHRcdFx0aGVhZGVyOlxuXHRcdFx0XHR0aXRsZTogXCIje0Bfc291cmNlLnRpdGxlfVwiXG5cdFx0XHRcdHZpc2libGU6IHRydWUsIFxuXHRcdFx0XHRpY29uOiAnYXJyb3ctYmFjaycsIFxuXHRcdFx0XHRpY29uQWN0aW9uOiAtPiBcblx0XHRcdFx0XHRmbG93LnNob3dQcmV2aW91cygpXG5cdFx0XHRcdFx0QGRlc3Ryb3koKVxuXG5cblxuXG5cblxuIyBcdDg4ODg4OGJhICAgICAgICAgICAgIGRQICAgICAgICAgICAgICAgICAgICBcbiMgXHQ4OCAgICBgOGIgICAgICAgICAgICA4OCAgICAgICAgICAgICAgICAgICAgXG4jIFx0ODggICAgIDg4IC5kODg4OGIuIGQ4ODg4UCAuZDg4ODhiLiAuZDg4ODhiLlxuIyBcdDg4ICAgICA4OCA4OCcgIGA4OCAgIDg4ICAgODhvb29vZDggWThvb29vby5cbiMgXHQ4OCAgICAgODggODguICAuODggICA4OCAgIDg4LiAgLi4uICAgICAgIDg4XG4jIFx0ZFAgICAgIGRQIGA4ODg4OFAnICAgZFAgICBgODg4ODhQJyBgODg4ODhQJ1xuXG5cbmNsYXNzIE5vdGVzIGV4dGVuZHMgbWQuUGFnZVxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblxuXHRcdEBfdGV4dCA9IGRhdGFiYXNlLnVzZXIubm90ZVxuXG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0dGhlbWU6IGZsb3cudGhlbWVcblx0XHRcdGhlYWRlcjpcblx0XHRcdFx0dGl0bGU6ICdOb3Rlcydcblx0XHRcdFx0dmlzaWJsZTogdHJ1ZSwgXG5cdFx0XHRcdGljb246ICdhcnJvdy1iYWNrJywgXG5cdFx0XHRcdGljb25BY3Rpb246IC0+IFxuXHRcdFx0XHRcdGZsb3cuc2hvd1ByZXZpb3VzKClcblx0XHRcdFx0XHRAZGVzdHJveSgpXG5cblx0XHRAdGV4dEZpZWxkID0gbmV3IExheWVyXG5cdFx0XHRwYXJlbnQ6IEBcblx0XHRcdHg6IDE2LCB5OiAxMDBcblx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFx0aHRtbDogXCJcIlwiXG5cdFx0XHQ8dGV4dGFyZWEgbmFtZT1cInRleHRhcmVhXCIgY2xhc3M9XCJ0ZXh0YXJlYVwiIHN0eWxlPVwiXG5cdFx0XHRcdGJhY2tncm91bmQtY29sb3I6ICMwMDAwMDA7XG5cdFx0XHRcdHdpZHRoOiAzMjBweDtcblx0XHRcdFx0aGVpZ2h0OiA1MDBweDtcblx0XHRcdFx0Zm9udC1mYW1pbHk6IFN0cmF0b3M7XG5cdFx0XHRcdGZvbnQtc2l6ZTogMTZweDtcblx0XHRcdFx0Zm9udC13ZWlnaHQ6IDQwMDtcblx0XHRcdFx0Y29sb3I6ICNGRkZGRkY7XG5cdFx0XHRcdGxpbmUtaGVpZ2h0OiAyMHB4O1xuXHRcdFx0XHRib3JkZXI6IG5vbmU7XG5cdFx0XHRcdG91dGxpbmU6IG5vbmU7IFxuXHRcdFx0XHRcIj5cblx0XHRcdFx0I3tAX3RleHR9XG5cdFx0XHQ8L3RleHRhcmVhPlxuXHRcdFwiXCJcIlxuXG5cdFx0QHRleHRBcmVhID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi50ZXh0YXJlYVwiKVswXVxuXG5cblx0XHRAb24gXCJrZXl1cFwiLCA9PlxuXHRcdFx0ZGF0YWJhc2UudXNlci5ub3RlID0gQHRleHRBcmVhLnZhbHVlXG5cblxuXG4jIFx0ODg4OGJhLjg4YmEgICAgICAgICAgICAgICAgICAgIG9vXG4jIFx0ODggIGA4YiAgYDhiXG4jIFx0ODggICA4OCAgIDg4IGRQICAgIGRQIC5kODg4OGIuIGRQIC5kODg4OGIuXG4jIFx0ODggICA4OCAgIDg4IDg4ICAgIDg4IFk4b29vb28uIDg4IDg4JyAgYFwiXCJcbiMgXHQ4OCAgIDg4ICAgODggODguICAuODggICAgICAgODggODggODguICAuLi5cbiMgXHRkUCAgIGRQICAgZFAgYDg4ODg4UCcgYDg4ODg4UCcgZFAgYDg4ODg4UCdcblxuY2xhc3MgTXVzaWMgZXh0ZW5kcyBtZC5QYWdlXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdHRoZW1lOiBmbG93LnRoZW1lXG5cdFx0XHRoZWFkZXI6XG5cdFx0XHRcdHRpdGxlOiAnTXVzaWMnXG5cdFx0XHRcdHZpc2libGU6IHRydWUsIFxuXHRcdFx0XHRpY29uOiAnYXJyb3ctYmFjaycsIFxuXHRcdFx0XHRpY29uQWN0aW9uOiAtPiBcblx0XHRcdFx0XHRmbG93LnNob3dQcmV2aW91cygpXG5cdFx0XHRcdFx0QGRlc3Ryb3koKVxuXG5cdFx0QG11c2ljSWNvbiA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEBcblx0XHRcdGhlaWdodDogMTUyLCB3aWR0aDogMTUyXG5cdFx0XHR4OiBBbGlnbi5jZW50ZXIsIHk6IEFsaWduLmNlbnRlcigtNjQpXG5cdFx0XHRpbWFnZTogJ2ltYWdlcy9pY29ucy9oZWFkc2V0LnBuZydcblx0XHRcdGludmVydDogMTAwXG5cblx0XHRAbXVzaWNEZXNjcmlwdGlvbjEgPSBuZXcgbWQuUmVndWxhclxuXHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEBcblx0XHRcdHg6IEFsaWduLmNlbnRlciwgeTogQG11c2ljSWNvbi5tYXhZXG5cdFx0XHRjb2xvcjogXCIjRkZGXCIsIHRleHRBbGlnbjogXCJjZW50ZXJcIlxuXHRcdFx0d2lkdGg6IDI4MFxuXHRcdFx0dGV4dDogJ1lvdXIgbXVzaWMgaXMgY29tcG9zZWQgYmFzZWQg4oCob24gd2hhdCB3ZSBrbm93IGFib3V0IHlvdS4nXG5cblx0XHRAbXVzaWNEZXNjcmlwdGlvbjIgPSBuZXcgbWQuUmVndWxhclxuXHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEBcblx0XHRcdHg6IEFsaWduLmNlbnRlciwgeTogQG11c2ljRGVzY3JpcHRpb24xLm1heFkgKyAxNlxuXHRcdFx0Y29sb3I6IFwiI0ZGRlwiLCB0ZXh0QWxpZ246IFwiY2VudGVyXCJcblx0XHRcdHdpZHRoOiAyODBcblx0XHRcdHRleHQ6ICcgSXQgaXMgdW5pcXVlIHRvIHlvdS4nXG5cblx0XHRAbXVzaWNEZXNjcmlwdGlvbjMgPSBuZXcgbWQuUmVndWxhclxuXHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEBcblx0XHRcdHg6IEFsaWduLmNlbnRlciwgeTogQG11c2ljRGVzY3JpcHRpb24yLm1heFkgKyAxNlxuXHRcdFx0Y29sb3I6IFwiI0ZGRlwiLCB0ZXh0QWxpZ246IFwiY2VudGVyXCJcblx0XHRcdHdpZHRoOiAyNDBcblx0XHRcdHRleHQ6ICcgSWYgeW91IGRvIG5vdCBlbmpveSB3aGF0IOKAqHlvdSBoZWFyLCBwbGVhc2UgY2hhbmdlLidcblxuXG5cblxuXG4jIFx0ODg4OGJhLjg4YmFcbiMgXHQ4OCAgYDhiICBgOGJcbiMgXHQ4OCAgIDg4ICAgODggLmQ4ODg4Yi4gODhkODg4Yi5cbiMgXHQ4OCAgIDg4ICAgODggODgnICBgODggODgnICBgODhcbiMgXHQ4OCAgIDg4ICAgODggODguICAuODggODguICAuODhcbiMgXHRkUCAgIGRQICAgZFAgYDg4ODg4UDggODhZODg4UCdcbiMgXHQgICAgICAgICAgICAgICAgICAgICAgODhcbiMgXHQgICAgICAgICAgICAgICAgICAgICAgZFBcblxuY2xhc3MgTWFwIGV4dGVuZHMgbWQuUGFnZVxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMpIC0+XG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0dGhlbWU6IGZsb3cudGhlbWVcblx0XHRcdGhlYWRlcjpcblx0XHRcdFx0dGl0bGU6ICdNYXAnXG5cdFx0XHRcdHZpc2libGU6IHRydWUsIFxuXHRcdFx0XHRpY29uOiAnYXJyb3ctYmFjaycsIFxuXHRcdFx0XHRpY29uQWN0aW9uOiAtPiBcblx0XHRcdFx0XHRmbG93LnNob3dQcmV2aW91cygpXG5cdFx0XHRcdFx0QGRlc3Ryb3koKVxuXHRcdFxuXHRcdEBtYXAgPSBuZXcgTGF5ZXJcblx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBAXG5cdFx0XHRzaXplOiBAc2l6ZVxuXHRcdFx0c2NhbGU6IDEuNVxuXHRcdFx0YnJpZ2h0bmVzczogODBcblx0XHRcdGltYWdlOiAnaW1hZ2VzL21hcC5wbmcnXG5cblx0XHRAbWFwLmRyYWdnYWJsZSA9IHRydWVcblxuXHRcdEBmaW5kTWVCb3ggPSBuZXcgTGF5ZXJcblx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBAXG5cdFx0XHR4OiBBbGlnbi5yaWdodCgtOCksIHk6IEFsaWduLmJvdHRvbSgtMTc2KVxuXHRcdFx0d2lkdGg6IDQ4LCBoZWlnaHQ6IDQ4XG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6ICcjZWZlZmVmJ1xuXHRcdFx0Ym9yZGVyUmFkaXVzOiAyNFxuXG5cdFx0QGZpbmRNZSA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEBmaW5kTWVCb3hcblx0XHRcdHg6IEFsaWduLmNlbnRlciwgeTogQWxpZ24uY2VudGVyXG5cdFx0XHR3aWR0aDogNDAsIGhlaWdodDogNDBcblx0XHRcdGltYWdlOiAnaW1hZ2VzL2ljb25zL3JhZGlvLWJ1dHRvbi1vbi5wbmcnXG5cblx0XHRAem9vbUJveCA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEBcblx0XHRcdHg6IEFsaWduLnJpZ2h0KC04KSwgeTogQWxpZ24uYm90dG9tKC02NClcblx0XHRcdHdpZHRoOiA0OCwgaGVpZ2h0OiA5NlxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiAnI2VmZWZlZidcblx0XHRcdGJvcmRlclJhZGl1czogMjRcblxuXHRcdEB6b29tSW4gPSBuZXcgTGF5ZXJcblx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBAem9vbUJveFxuXHRcdFx0eDogQWxpZ24uY2VudGVyLCB5OiA4XG5cdFx0XHR3aWR0aDogNDAsIGhlaWdodDogNDBcblx0XHRcdGltYWdlOiAnaW1hZ2VzL2ljb25zL2FkZC5wbmcnXG5cblx0XHRAem9vbU91dCA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEB6b29tQm94XG5cdFx0XHR4OiBBbGlnbi5jZW50ZXIsIHk6IEFsaWduLmJvdHRvbSgtOClcblx0XHRcdHdpZHRoOiA0MCwgaGVpZ2h0OiA0MFxuXHRcdFx0aW1hZ2U6ICdpbWFnZXMvaWNvbnMvcmVtb3ZlLnBuZydcblxuXG5cblxuXG4jXHQgODg4ODg4YmEgICAgICAgICAgICAgICAgIGRQIG9vXG4jXHQgIDg4ICAgIGA4YiAgICAgICAgICAgICAgICA4OFxuI1x0IGE4OGFhYWE4UCcgLmQ4ODg4Yi4gLmQ4ODhiODggZFAgLmQ4ODg4Yi5cbiNcdCAgODggICBgOGIuIDg4JyAgYDg4IDg4JyAgYDg4IDg4IDg4JyAgYDg4XG4jXHQgIDg4ICAgICA4OCA4OC4gIC44OCA4OC4gIC44OCA4OCA4OC4gIC44OFxuI1x0ICBkUCAgICAgZFAgYDg4ODg4UDggYDg4ODg4UDggZFAgYDg4ODg4UCdcblxuXG5cbmNsYXNzIFJhZGlvIGV4dGVuZHMgbWQuUGFnZVxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblx0XHRzdXBlciBfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHR0aGVtZTogZmxvdy50aGVtZVxuXHRcdFx0aGVhZGVyOlxuXHRcdFx0XHR0aXRsZTogJ1JhZGlvJ1xuXHRcdFx0XHR2aXNpYmxlOiB0cnVlLCBcblx0XHRcdFx0aWNvbjogJ2Fycm93LWJhY2snLCBcblx0XHRcdFx0aWNvbkFjdGlvbjogLT4gXG5cdFx0XHRcdFx0Zmxvdy5zaG93UHJldmlvdXMoKVxuXHRcdFx0XHRcdEBkZXN0cm95KClcblxuXHRcdEByYWRpb0ljb24gPSBuZXcgTGF5ZXJcblx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBAXG5cdFx0XHRoZWlnaHQ6IDE1Miwgd2lkdGg6IDE1MlxuXHRcdFx0eDogQWxpZ24uY2VudGVyLCB5OiBBbGlnbi5jZW50ZXIoLTY0KVxuXHRcdFx0aW1hZ2U6ICdpbWFnZXMvaWNvbnMvd2lmaS10ZXRoZXJpbmcucG5nJ1xuXHRcdFx0aW52ZXJ0OiAxMDBcblxuXHRcdEByYWRpb0xhYmVsID0gbmV3IG1kLlJlZ3VsYXJcblx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBAXG5cdFx0XHR4OiBBbGlnbi5jZW50ZXIsIHk6IEByYWRpb0ljb24ubWF4WVxuXHRcdFx0Y29sb3I6IFwiI0ZGRlwiLCB0ZXh0QWxpZ246IFwiY2VudGVyXCJcblx0XHRcdHRleHQ6ICdTZWFyY2hpbmcgZm9yIHNpZ25hbC4uLidcblxuXHRcdEByYWRpb0Rlc2NyaXB0aW9uID0gbmV3IG1kLlJlZ3VsYXJcblx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBAXG5cdFx0XHR4OiBBbGlnbi5jZW50ZXIsIHk6IEByYWRpb0xhYmVsLm1heFkgKyAzMlxuXHRcdFx0Y29sb3I6IFwiI0ZGRlwiLCB0ZXh0QWxpZ246IFwiY2VudGVyXCJcblx0XHRcdHdpZHRoOiAyMDBcblx0XHRcdHRleHQ6ICdSYWRpbyBpcyBvbmx5IGF2YWlsYWJsZSBpbiDigKhjZXJ0YWluIGFyZWFzIG9mIHRoZSBTcGFjZS4nXG5cblxuXG4jIFx0IDg4ODg4OGJhICAgICAgICAgICAgICAgICAgICBkUFxuIyBcdCA4OCAgICBgOGIgICAgICAgICAgICAgICAgICAgODhcbiMgXHRhODhhYWFhOFAnIC5kODg4OGIuIC5kODg4OGIuIDg4ICAuZFBcbiMgXHQgODggICBgOGIuIDg4JyAgYDg4IDg4JyAgYDg4IDg4ODg4XCJcbiMgXHQgODggICAgLjg4IDg4LiAgLjg4IDg4LiAgLjg4IDg4ICBgOGIuXG4jIFx0IDg4ODg4ODg4UCBgODg4ODhQJyBgODg4ODhQJyBkUCAgIGBZUFxuIyBcdFxuIyBcdFxuXG5jbGFzcyBCb29rIGV4dGVuZHMgbWQuUGFnZVxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblx0XHRzdXBlciBfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHR0aGVtZTogZmxvdy50aGVtZVxuXHRcdFx0aGVhZGVyOlxuXHRcdFx0XHR0aXRsZTogJ0Jvb2snXG5cdFx0XHRcdHZpc2libGU6IHRydWUsIFxuXHRcdFx0XHRpY29uOiAnYXJyb3ctYmFjaycsIFxuXHRcdFx0XHRpY29uQWN0aW9uOiAtPiBcblx0XHRcdFx0XHRmbG93LnNob3dQcmV2aW91cygpXG5cdFx0XHRcdFx0QGRlc3Ryb3koKVxuXG5cdFx0QGJvb2tGbG93ID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQGNvbnRlbnRcblx0XHRcdHg6IDE2LCB5OiA5NlxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHR3aWR0aDogQHdpZHRoIC0gMzJcblx0XHRcdGhlaWdodDogQGhlaWdodCAqIDJcblx0XHRcblx0XHRAYm9va0Zsb3cuc3R5bGUgPVxuXHRcdFx0Zm9udEZhbWlseTogJ1N0cmF0b3MnXG5cdFx0XHRmb250U2l6ZTogJzE2cHgnXG5cdFx0XHRsaW5lSGVpZ2h0OiAnMS40J1xuXHRcdFx0Y29sb3I6ICcjRkZGJ1xuXHRcdFxuXHRcdEBib29rRmxvdy5odG1sID0gXCJcIlwiRkFERSBJTjo8YnI+PGJyPlxuMSBJTlQuIFdBU0hJTkdUT04gTVVTRVVNIC0gREFZIDE8YnI+PGJyPlxuVGhlIHNhZGRlc3QgZXllcyB5b3UgZXZlciBzYXcuXG5XZSBhcmUgbG9va2luZyBhdCBhbiBFbCBHcmVjbyBkcmF3aW5nLiBJdCBpcyBhIHN0dWR5IGZvclxub25lIG9mIGhpcyBwYWludGluZ3MuPGJyPjxicj5cblBVTEwgQkFDSyBUTyBSRVZFQUwgLS08YnI+PGJyPlxuQSBidW5jaCBvZiBhcnQgc3R1ZGVudHMgYXJlIGRvaW5nIHNrZXRjaGVzIG9mIHRoZSBleWVzLFxudGhlIGVsb25nYXRlZCBmaW5nZXJzLCB0aGUgc2xlbmRlciBoYW5kcyBFbCBHcmVjbyBkcmV3IHNvXG5icmlsbGlhbnRseS48YnI+PGJyPlxuTW9zdCBvZiB0aGUgc3R1ZGVudHMgYXJlIGFyb3VuZCAyMC4gQSBjb3VwbGUgb2Ygc3VidXJiYW5cbmhvdXNld2l2ZXMgYXJlIHRoZXJlIHRvby5cbkFuZCBvbmUgb2xkZXIgbWFuLjxicj48YnI+XG5UaGlzIGlzIExVVEhFUiBXSElUTkVZLiBNaWQgNjBzLCB2ZXJ5IGZpdCwgbmVhdGx5XG5kcmVzc2VkLiBBdCBxdWljayBnbGFuY2UsIGhlIHNlZW1zIGFzIGlmIGhlIG1pZ2h0IGJlIGFcbnN1Y2Nlc3NmdWwgY29tcGFueSBleGVjdXRpdmUuPGJyPjxicj5cbkFzIHdlIHdhdGNoIGhpbSBkcmF3IHdlIGNhbiB0ZWxsIGhlIGlzIGNhcGFibGUgb2YgZ3JlYXRcbmNvbmNlbnRyYXRpb24uIEFuZCBwYXRpZW50LiBXaXRoIGV5ZXMgdGhhdCBtaXNzXG5ub3RoaW5nOiBIZSBoYXMgcGlsb3TigJlzIGV5ZXMuPGJyPjxicj5cbldl4oCZbGwgZmluZCBvdXQgbW9yZSBhYm91dCBoaW0gYXMgdGltZSBnb2VzIG9uLCBidXQgdGhpc1xuaXMgYWxsIHlvdSByZWFsbHkgaGF2ZSB0byBrbm93OiBMdXRoZXIgV2hpdG5leSBpcyB0aGVcbmhlcm8gb2YgdGhpcyBwaWVjZS4gQXMgd2Ugd2F0Y2ggaGltIGRyYXcgLS1cbkx1dGhlcuKAmXMgc2tldGNoYm9vay4gSGUgaXMgZmluaXNoaW5nIGhpcyB3b3JrIG9uIHRoZVxuZXllcywgYW5kIGhl4oCZcyBjYXVnaHQgdGhlIHNhZG5lc3M6IEl04oCZcyBnb29kIHN0dWZmLlxuTHV0aGVyLiBJdOKAmXMgbm90IGdvb2QgZW5vdWdoIGZvciBoaW0uIEhlIGxvb2tzIGF0IGhpc1xud29yayBhIG1vbWVudCwgc2hha2VzIGhpcyBoZWFkLjxicj48YnI+XG5HSVJMIFNUVURFTlQ8YnI+PGJyPlxuRG9u4oCZdCBnaXZlIHVwLjxicj48YnI+XG5MVVRIRVI8YnI+PGJyPlxuSSBuZXZlciBkby48YnI+PGJyPlxuR0lSTCBTVFVERU5UPGJyPjxicj5cbk1heSBJPzxicj48YnI+XG5TaGXigJlzIGluZGljYXRlZCBoaXMgc2tldGNoYm9vay4gSGUgbm9kcy4gU2hlIHN0YXJ0c1xudGh1bWJpbmcgdGhyb3VnaC48YnI+PGJyPlxuVGhlIHNrZXRjaGJvb2sgYXMgdGhlIHBhZ2VzIHR1cm4uPGJyPjxicj5cbkRldGFpbCB3b3JrLiBFeWVzIGFuZCBoYW5kcy4gVGhlIGV5ZXMgYXJlIGdvb2QuIFRoZVxuaGFuZHMgYXJlIGJldHRlci4gVmVyeSBza2lsbGZ1bC48YnI+PGJyPlxuKENPTlRJTlVFRCk8YnI+PGJyPlxuXCJcIlwiXG5cblxuXG5cblxuXG5cbiMgXHRkUCAgICAgZFAgIG9vICAgICAgICAgICAgZFBcbiMgXHQ4OCAgICAgODggICAgICAgICAgICAgICAgODhcbiMgXHQ4OGFhYWFhODhhIGRQIC5kODg4OGIuIGQ4ODg4UCAuZDg4ODhiLiA4OGQ4ODhiLiBkUCAgICBkUFxuIyBcdDg4ICAgICA4OCAgODggWThvb29vby4gICA4OCAgIDg4JyAgYDg4IDg4JyAgYDg4IDg4ICAgIDg4XG4jIFx0ODggICAgIDg4ICA4OCAgICAgICA4OCAgIDg4ICAgODguICAuODggODggICAgICAgODguICAuODhcbiMgXHRkUCAgICAgZFAgIGRQIGA4ODg4OFAnICAgZFAgICBgODg4ODhQJyBkUCAgICAgICBgODg4OFA4OFxuIyBcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLjg4XG4jIFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGQ4ODg4UFxuXG5cbmNsYXNzIEhpc3RvcnkgZXh0ZW5kcyBtZC5QYWdlXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucykgLT5cblx0XHRzdXBlciBfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHR0aGVtZTogZmxvdy50aGVtZVxuXHRcdFx0aGVhZGVyOlxuXHRcdFx0XHR0aXRsZTogJ0hpc3RvcnknXG5cdFx0XHRcdHZpc2libGU6IHRydWUsIFxuXHRcdFx0XHRpY29uOiAnYXJyb3ctYmFjaycsIFxuXHRcdFx0XHRpY29uQWN0aW9uOiAtPiBcblx0XHRcdFx0XHRmbG93LnNob3dQcmV2aW91cygpXG5cdFx0XHRcdFx0QGRlc3Ryb3koKVxuXG5cblxuXG5cblxuIyBcdGRQICAgICBkUCAgICAgICAgICAgZFBcbiMgXHQ4OCAgICAgODggICAgICAgICAgIDg4XG4jIFx0ODhhYWFhYTg4YSAuZDg4ODhiLiA4OCA4OGQ4ODhiLlxuIyBcdDg4ICAgICA4OCAgODhvb29vZDggODggODgnICBgODhcbiMgXHQ4OCAgICAgODggIDg4LiAgLi4uIDg4IDg4LiAgLjg4XG4jIFx0ZFAgICAgIGRQICBgODg4ODhQJyBkUCA4OFk4ODhQJ1xuIyBcdCAgICAgICAgICAgICAgICAgICAgICAgODhcbiMgXHQgICAgICAgICAgICAgICAgICAgICAgIGRQXG5cbmNsYXNzIEhlbHAgZXh0ZW5kcyBtZC5QYWdlXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucykgLT5cblx0XHRzdXBlciBfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHR0aGVtZTogZmxvdy50aGVtZVxuXHRcdFx0aGVhZGVyOlxuXHRcdFx0XHR0aXRsZTogJ0hlbHAnXG5cdFx0XHRcdHZpc2libGU6IHRydWUsIFxuXHRcdFx0XHRpY29uOiAnYXJyb3ctYmFjaycsIFxuXHRcdFx0XHRpY29uQWN0aW9uOiAtPiBcblx0XHRcdFx0XHRmbG93LnNob3dQcmV2aW91cygpXG5cdFx0XHRcdFx0QGRlc3Ryb3koKVxuXG5cblx0XHRAaGVscEljb24gPSBuZXcgTGF5ZXJcblx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBAXG5cdFx0XHRoZWlnaHQ6IDE1Miwgd2lkdGg6IDE1MlxuXHRcdFx0eDogQWxpZ24uY2VudGVyLCB5OiBBbGlnbi5jZW50ZXIoLTEyOClcblx0XHRcdGltYWdlOiAnaW1hZ2VzL2ljb25zL3dhcm5pbmcucG5nJ1xuXHRcdFx0aW52ZXJ0OiAxMDBcblxuXHRcdEBoZWxwTGFiZWwgPSBuZXcgbWQuUmVndWxhclxuXHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEBcblx0XHRcdHg6IEFsaWduLmNlbnRlciwgeTogQGhlbHBJY29uLm1heFlcblx0XHRcdGNvbG9yOiBcIiNGRkZcIiwgdGV4dEFsaWduOiBcImNlbnRlclwiXG5cdFx0XHR0ZXh0OiAnRG8geW91IG5lZWQgaGVscD8nXG5cblx0XHRAaGVscERlc2NyaXB0aW9uID0gbmV3IG1kLlJlZ3VsYXJcblx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBAXG5cdFx0XHR4OiBBbGlnbi5jZW50ZXIsIHk6IEBoZWxwTGFiZWwubWF4WSArIDE2XG5cdFx0XHRjb2xvcjogXCIjRkZGXCIsIHRleHRBbGlnbjogXCJjZW50ZXJcIlxuXHRcdFx0d2lkdGg6IDI4MFxuXHRcdFx0dGV4dDogJ0NoYXQgbm93IHdpdGggb25lIG9mIG91ciBvcGVyYXRvcnMuJ1xuXG5cdFx0QG5lZWRIZWxwID0gbmV3IG1kLlRpdGxlXG5cdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQFxuXHRcdFx0dGV4dDogJ0kgTkVFRCBIRUxQJ1xuXHRcdFx0dGV4dEFsaWduOiAnY2VudGVyJ1xuXHRcdFx0eDogQWxpZ24uY2VudGVyLCB5OiBAaGVscERlc2NyaXB0aW9uLm1heFkgKyA2NFxuXHRcdFx0Y29sb3I6ICdyZ2JhKDI1NSwgMCwgMCwgMSknXG5cblx0XHRAbmVlZEhlbHAub25UYXAgLT4gbnVsbCAjIFRPRE8sIGJlZ2luIGFzc2lzdGFuY2UgY2hhdFxuXG5cdFx0QGNhbmNlbCA9IG5ldyBtZC5UaXRsZVxuXHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEBcblx0XHRcdHRleHQ6ICdDQU5DRUwnXG5cdFx0XHR0ZXh0QWxpZ246ICdjZW50ZXInXG5cdFx0XHR4OiBBbGlnbi5jZW50ZXIsIHk6IEBuZWVkSGVscC5tYXhZICsgNDhcblx0XHRcdGNvbG9yOiAnI0NDQydcblxuXHRcdEBjYW5jZWwub25UYXAgLT4gZmxvdy5zaG93UHJldmlvdXMoKVxuXG5cbm1lbnVPdmVybGF5ID0gbmV3IE1lbnVPdmVybGF5XG5kYXNoYm9hcmQgPSBuZXcgRGFzaGJvYXJkXG5cbmZsb3cuc2hvd05leHQoZGFzaGJvYXJkKVxuIyBmbG93LnNob3dOZXh0KG5ldyBNYXApXG5cbiIsIlxuIyBcdCAgICAgIGRQICAgICAgICAgICAgZFAgICAgICAgICAgICBkUFxuIyBcdCAgICAgIDg4ICAgICAgICAgICAgODggICAgICAgICAgICA4OFxuIyBcdC5kODg4Yjg4IC5kODg4OGIuIGQ4ODg4UCAuZDg4ODhiLiA4OGQ4ODhiLiAuZDg4ODhiLiAuZDg4ODhiLiAuZDg4ODhiLlxuIyBcdDg4JyAgYDg4IDg4JyAgYDg4ICAgODggICA4OCcgIGA4OCA4OCcgIGA4OCA4OCcgIGA4OCBZOG9vb29vLiA4OG9vb29kOFxuIyBcdDg4LiAgLjg4IDg4LiAgLjg4ICAgODggICA4OC4gIC44OCA4OC4gIC44OCA4OC4gIC44OCAgICAgICA4OCA4OC4gIC4uLlxuIyBcdGA4ODg4OFA4IGA4ODg4OFA4ICAgZFAgICBgODg4ODhQOCA4OFk4ODg4JyBgODg4ODhQOCBgODg4ODhQJyBgODg4ODhQJ1xuXG5cbmRhdGFiYXNlID1cblxuXHRjaGF0QnViYmxlczogW11cblxuXHRjaG9pY2VzOlxuXHRcdGxhbmd1YWdlOiB1bmRlZmluZWRcblx0XHRydWxlMTogdW5kZWZpbmVkXG5cdFx0cnVsZTI6IHVuZGVmaW5lZFxuXHRcdHJ1bGUzOiB1bmRlZmluZWRcblx0XHRlYXJseUV4aXQxOiB1bmRlZmluZWRcblx0XHRlYXJseUV4aXQyOiB1bmRlZmluZWRcblxuXHRyZW1vdmVDaGF0QnViYmxlOiAoY2hhdEJ1YmJsZSkgLT5cblx0XHRfLnB1bGwoQGNoYXRCdWJibGVzLCBjaGF0QnViYmxlKVxuXHRcdGNoYXRCdWJibGUuZGVzdHJveSgpXG5cblx0dXNlcjpcblx0XHRuYW1lOiAnVmljdG9yIEl2YW5vdmljaCdcblx0XHRhZ2U6IDQyXG5cdFx0c2V4OiBcIk1cIlxuXHRcdGltYWdlOiBcImltYWdlcy91c2VyLnBuZ1wiXG5cdFx0bGFuZ3VhZ2VzOiBbXCJlbmdsaXNoXCIsIFwiZ2VybWFuXCJdXG5cdFx0aGlzdG9yeTogW11cblx0XHRub3RlOiBcIldoZW4geW91IGxvb2sgYXQgaXQsIGl0IGxvb2tzIGxpa2UgYW55IG90aGVyIHBpZWNlIG9mIGxhbmQuIFRoZSBzdW4gc2hpbmVzIG9uIGl0IGxpa2Ugb24gYW55IG90aGVyIHBhcnQgb2YgdGhlIGVhcnRoLiBBbmQgaXQncyBhcyB0aG91Z2ggbm90aGluZyBoYWQgcGFydGljdWxhcmx5IGNoYW5nZWQgaW4gaXQuIExpa2UgZXZlcnl0aGluZyB3YXMgdGhlIHdheSBpdCB3YXMgdGhpcnR5XG55ZWFycyBhZ28uIE15IGZhdGhlciwgcmVzdCBoaXMgc291bCwgY291bGQgIGxvb2sgYXQgaXQgYW5kIG5vdCBub3RpY2UgYW55dGhpbmcgb3V0IG9mIHBsYWNlIGF0IGFsbC4gRXhjZXB0IG1heWJlXCJcblxuXHRhZGRIaXN0b3J5OiAoaXRlbSkgLT5cblx0XHRAdXNlci5oaXN0b3J5LnB1c2goaXRlbSlcblx0XHRpdGVtLnRpbWVTdGFtcCA9IF8ubm93KClcblxuXHRpbnZpdGF0aW9uczogW11cblx0ZXZlbnRzOiBbXVxuXHRsb2NhdGlvbnM6IFtdXG5cblxuXG5leHBvcnRzLmRhdGFiYXNlID0gZGF0YWJhc2VcblxuXG5cbiMgXHRkUCAgICAgICAgICAgICAgICAgICBvbyAgIGRQICAgICAgICAgICAgICBkUCAgIG9vXG4jIFx0ODggICAgICAgICAgICAgICAgICAgICAgICA4OCAgICAgICAgICAgICAgODhcbiMgXHQ4OCA4OGQ4ODhiLiBkUCAgIC5kUCBkUCBkODg4OFAgLmQ4ODg4Yi4gZDg4ODhQIGRQIC5kODg4OGIuIDg4ZDg4OGIuXG4jIFx0ODggODgnICBgODggODggICBkOCcgODggICA4OCAgIDg4JyAgYDg4ICAgODggICA4OCA4OCcgIGA4OCA4OCcgIGA4OFxuIyBcdDg4IDg4ICAgIDg4IDg4IC44OCcgIDg4ICAgODggICA4OC4gIC44OCAgIDg4ICAgODggODguICAuODggODggICAgODhcbiMgXHRkUCBkUCAgICBkUCA4ODg4UCcgICBkUCAgIGRQICAgYDg4ODg4UDggICBkUCAgIGRQIGA4ODg4OFAnIGRQICAgIGRQXG4jIFx0XG4jIFx0XG5cbmNsYXNzIEludml0YXRpb25cblx0Y29uc3RydWN0b3I6IChvcHRpb25zKSAtPlxuXHRcdEBuYW1lID0gb3B0aW9ucy5uYW1lID8gJ05ldyBJbnZpdGF0aW9uJ1xuXHRcdEBldmVudCA9IG9wdGlvbnMuZXZlbnQgPyBuZXcgRXZlbnRcblx0XHRAbG9jYXRpb24gPSBAZXZlbnQubG9jYXRpb25cblx0XHRAc3RhcnRUaW1lID0gQGV2ZW50LnN0YXJ0VGltZVxuXG5cblxuIyBcdGRQICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRQICAgb29cbiMgXHQ4OCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA4OFxuIyBcdDg4ICAgICAgICAuZDg4ODhiLiAuZDg4ODhiLiAuZDg4ODhiLiBkODg4OFAgZFAgLmQ4ODg4Yi4gODhkODg4Yi5cbiMgXHQ4OCAgICAgICAgODgnICBgODggODgnICBgXCJcIiA4OCcgIGA4OCAgIDg4ICAgODggODgnICBgODggODgnICBgODhcbiMgXHQ4OCAgICAgICAgODguICAuODggODguICAuLi4gODguICAuODggICA4OCAgIDg4IDg4LiAgLjg4IDg4ICAgIDg4XG4jIFx0ODg4ODg4ODhQIGA4ODg4OFAnIGA4ODg4OFAnIGA4ODg4OFA4ICAgZFAgICBkUCBgODg4ODhQJyBkUCAgICBkUFxuXG5jbGFzcyBMb2NhdGlvblxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMpIC0+XG5cdFx0QG5hbWUgPSBvcHRpb25zLm5hbWUgPyAnTG9jYXRpb24nXG5cblxuXG4jIFx0IDg4ODg4ODg4YiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRQXG4jIFx0IDg4ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDg4XG4jIFx0YTg4YWFhYSAgICBkUCAgIC5kUCAuZDg4ODhiLiA4OGQ4ODhiLiBkODg4OFBcbiMgXHQgODggICAgICAgIDg4ICAgZDgnIDg4b29vb2Q4IDg4JyAgYDg4ICAgODhcbiMgXHQgODggICAgICAgIDg4IC44OCcgIDg4LiAgLi4uIDg4ICAgIDg4ICAgODhcbiMgXHQgODg4ODg4ODhQIDg4ODhQJyAgIGA4ODg4OFAnIGRQICAgIGRQICAgZFBcblxuXG5jbGFzcyBFdmVudFxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMpIC0+XG5cdFx0QG5hbWUgPSBvcHRpb25zLm5hbWUgPyAnTmV3IEV2ZW50J1xuXHRcdEBsb2NhdGlvbiA9IG9wdGlvbnMubG9jYXRpb24gPyBuZXcgTG9jYXRpb25cblx0XHRAc3RhcnRUaW1lID0gb3B0aW9ucy5zdGFydFRpbWUgPyBuZXcgRGF0ZShfLm5vdygpICsgMzYwMDAwKVxuXG5cblxuXG5cbiIsIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBSUFBO0FEU0EsSUFBQTs7QUFBQSxRQUFBLEdBRUM7RUFBQSxXQUFBLEVBQWEsRUFBYjtFQUVBLE9BQUEsRUFDQztJQUFBLFFBQUEsRUFBVSxNQUFWO0lBQ0EsS0FBQSxFQUFPLE1BRFA7SUFFQSxLQUFBLEVBQU8sTUFGUDtJQUdBLEtBQUEsRUFBTyxNQUhQO0lBSUEsVUFBQSxFQUFZLE1BSlo7SUFLQSxVQUFBLEVBQVksTUFMWjtHQUhEO0VBVUEsZ0JBQUEsRUFBa0IsU0FBQyxVQUFEO0lBQ2pCLENBQUMsQ0FBQyxJQUFGLENBQU8sSUFBQyxDQUFBLFdBQVIsRUFBcUIsVUFBckI7V0FDQSxVQUFVLENBQUMsT0FBWCxDQUFBO0VBRmlCLENBVmxCO0VBY0EsSUFBQSxFQUNDO0lBQUEsSUFBQSxFQUFNLGtCQUFOO0lBQ0EsR0FBQSxFQUFLLEVBREw7SUFFQSxHQUFBLEVBQUssR0FGTDtJQUdBLEtBQUEsRUFBTyxpQkFIUDtJQUlBLFNBQUEsRUFBVyxDQUFDLFNBQUQsRUFBWSxRQUFaLENBSlg7SUFLQSxPQUFBLEVBQVMsRUFMVDtJQU1BLElBQUEsRUFBTSw2VUFOTjtHQWZEO0VBd0JBLFVBQUEsRUFBWSxTQUFDLElBQUQ7SUFDWCxJQUFDLENBQUEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFkLENBQW1CLElBQW5CO1dBQ0EsSUFBSSxDQUFDLFNBQUwsR0FBaUIsQ0FBQyxDQUFDLEdBQUYsQ0FBQTtFQUZOLENBeEJaO0VBNEJBLFdBQUEsRUFBYSxFQTVCYjtFQTZCQSxNQUFBLEVBQVEsRUE3QlI7RUE4QkEsU0FBQSxFQUFXLEVBOUJYOzs7QUFrQ0QsT0FBTyxDQUFDLFFBQVIsR0FBbUI7O0FBYWI7RUFDUSxvQkFBQyxPQUFEO0FBQ1osUUFBQTtJQUFBLElBQUMsQ0FBQSxJQUFELHdDQUF1QjtJQUN2QixJQUFDLENBQUEsS0FBRCwyQ0FB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
