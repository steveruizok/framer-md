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
var App, Body1, Body2, Caption, Dialog, DialogAction, Header, Headline, MenuButton, MenuOverlay, Page, Regular, RowItem, StatusBar, SubheadSecondary, Title, database, ripple, theme, type,
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
    this.accept = new type.DialogAction({
      name: '.',
      parent: this.container,
      x: Align.right(-16),
      y: buttonsY,
      color: theme.tint,
      text: this._acceptText.toUpperCase()
    });
    this.accept.onTap(this._acceptAction);
    if (this._declineText !== '') {
      this.decline = new type.DialogAction({
        name: '.',
        parent: this.container,
        x: 0,
        y: buttonsY,
        color: theme.tint,
        text: this._declineText.toUpperCase()
      });
      this.decline.onTap(this._declineAction);
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
      opacity: .8
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
  button: {
    backgroundColor: source.colors.primary.main,
    color: source.colors.secondary.text
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

exports.DialogAction = (function(superClass) {
  extend(DialogAction, superClass);

  function DialogAction(options) {
    DialogAction.__super__.constructor.call(this, _.defaults(options, {
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

  return DialogAction;

})(TextLayer);


},{}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3N0ZXZlcnVpei9MaWJyYXJ5L01vYmlsZSBEb2N1bWVudHMvY29tfmFwcGxlfkNsb3VkRG9jcy9HaXRIdWIvZnJhbWVyLW1kL01hdGVyaWFsLmZyYW1lci9tb2R1bGVzL3R5cGUuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvc3RldmVydWl6L0xpYnJhcnkvTW9iaWxlIERvY3VtZW50cy9jb21+YXBwbGV+Q2xvdWREb2NzL0dpdEh1Yi9mcmFtZXItbWQvTWF0ZXJpYWwuZnJhbWVyL21vZHVsZXMvdGhlbWUuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvc3RldmVydWl6L0xpYnJhcnkvTW9iaWxlIERvY3VtZW50cy9jb21+YXBwbGV+Q2xvdWREb2NzL0dpdEh1Yi9mcmFtZXItbWQvTWF0ZXJpYWwuZnJhbWVyL21vZHVsZXMvcmlwcGxlLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3N0ZXZlcnVpei9MaWJyYXJ5L01vYmlsZSBEb2N1bWVudHMvY29tfmFwcGxlfkNsb3VkRG9jcy9HaXRIdWIvZnJhbWVyLW1kL01hdGVyaWFsLmZyYW1lci9tb2R1bGVzL215TW9kdWxlLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3N0ZXZlcnVpei9MaWJyYXJ5L01vYmlsZSBEb2N1bWVudHMvY29tfmFwcGxlfkNsb3VkRG9jcy9HaXRIdWIvZnJhbWVyLW1kL01hdGVyaWFsLmZyYW1lci9tb2R1bGVzL21kLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3N0ZXZlcnVpei9MaWJyYXJ5L01vYmlsZSBEb2N1bWVudHMvY29tfmFwcGxlfkNsb3VkRG9jcy9HaXRIdWIvZnJhbWVyLW1kL01hdGVyaWFsLmZyYW1lci9tb2R1bGVzL2Zsb3cuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvc3RldmVydWl6L0xpYnJhcnkvTW9iaWxlIERvY3VtZW50cy9jb21+YXBwbGV+Q2xvdWREb2NzL0dpdEh1Yi9mcmFtZXItbWQvTWF0ZXJpYWwuZnJhbWVyL21vZHVsZXMvZGF0YWJhc2UuY29mZmVlIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIjIFx0ZDg4ODg4OFAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZFBcbiMgXHQgICA4OCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA4OFxuIyBcdCAgIDg4ICAgIGRQICAgIGRQIDg4ZDg4OGIuIC5kODg4OGIuIC5kODg4OGIuIDg4ZDg4OGIuIC5kODg4OGIuIDg4ZDg4OGIuIDg4ZDg4OGIuIGRQICAgIGRQXG4jIFx0ICAgODggICAgODggICAgODggODgnICBgODggODgnICBgODggODgnICBgODggODgnICBgODggODgnICBgODggODgnICBgODggODgnICBgODggODggICAgODhcbiMgXHQgICA4OCAgICA4OC4gIC44OCA4OC4gIC44OCA4OC4gIC44OCA4OC4gIC44OCA4OCAgICAgICA4OC4gIC44OCA4OC4gIC44OCA4OCAgICA4OCA4OC4gIC44OFxuIyBcdCAgIGRQICAgIGA4ODg4UDg4IDg4WTg4OFAnIGA4ODg4OFAnIGA4ODg4UDg4IGRQICAgICAgIGA4ODg4OFA4IDg4WTg4OFAnIGRQICAgIGRQIGA4ODg4UDg4XG4jIFx0ICAgICAgICAgICAgICAuODggODggICAgICAgICAgICAgICAgICAgICAuODggICAgICAgICAgICAgICAgICAgODggICAgICAgICAgICAgICAgICAgICAuODhcbiMgXHQgICAgICAgICAgZDg4ODhQICBkUCAgICAgICAgICAgICAgICAgZDg4ODhQICAgICAgICAgICAgICAgICAgICBkUCAgICAgICAgICAgICAgICAgZDg4ODhQXG5cblV0aWxzLmluc2VydENTUyhcblx0XCJcIlwiXG4gICAgQGZvbnQtZmFjZSB7XG4gICAgICBmb250LWZhbWlseTogXCJSb2JvdG9cIjtcbiAgICAgIHNyYzogdXJsKFwiZm9udHMvUm9ib3RvLVJlZ3VsYXIudHRmXCIpO1xuICAgIFwiXCJcIilcblxuY2xhc3MgZXhwb3J0cy5IZWFkbGluZSBleHRlbmRzIFRleHRMYXllclxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMpIC0+XG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0Zm9udEZhbWlseTogJ1JvYm90bydcblx0XHRcdGZvbnRTaXplOiAyNFxuXHRcdFx0Zm9udFdlaWdodDogNDAwXG5cdFx0XHRsaW5lSGVpZ2h0OiAxLjNcblx0XHRcdGNvbG9yOiAncmdiYSgwLDAsMCwuODcpJ1xuXG5jbGFzcyBleHBvcnRzLlN1YmhlYWRTZWNvbmRhcnkgZXh0ZW5kcyBUZXh0TGF5ZXJcblx0Y29uc3RydWN0b3I6IChvcHRpb25zKSAtPlxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdGZvbnRGYW1pbHk6ICdSb2JvdG8nXG5cdFx0XHRmb250U2l6ZTogMTZcblx0XHRcdGZvbnRXZWlnaHQ6IDQwMCwgXG5cdFx0XHRsaW5lSGVpZ2h0OiAxLjUsXG5cdFx0XHRjb2xvcjogJ3JnYmEoMCwwLDAsLjU0KSdcblxuY2xhc3MgZXhwb3J0cy5UaXRsZSBleHRlbmRzIFRleHRMYXllclxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMpIC0+XG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0Zm9udEZhbWlseTogJ1JvYm90bydcblx0XHRcdGZvbnRTaXplOiAyMFxuXHRcdFx0Zm9udFdlaWdodDogNTAwXG5cdFx0XHRsaW5lSGVpZ2h0OiAxLjNcblx0XHRcdGNvbG9yOiAncmdiYSgwLDAsMCwuODcpJ1xuY2xhc3MgZXhwb3J0cy5SZWd1bGFyIGV4dGVuZHMgVGV4dExheWVyXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucykgLT5cblx0XHRzdXBlciBfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRmb250RmFtaWx5OiAnUm9ib3RvJ1xuXHRcdFx0Zm9udFNpemU6IDE2XG5cdFx0XHRmb250V2VpZ2h0OiA0MDBcblx0XHRcdGxpbmVIZWlnaHQ6IDEuM1xuXHRcdFx0Y29sb3I6ICdyZ2JhKDAsMCwwLC44NyknXG5jbGFzcyBleHBvcnRzLkJvZHkyIGV4dGVuZHMgVGV4dExheWVyXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucykgLT5cblx0XHRzdXBlciBfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRmb250RmFtaWx5OiAnUm9ib3RvJ1xuXHRcdFx0Zm9udFNpemU6IDE0XG5cdFx0XHRmb250V2VpZ2h0OiA1MDBcblx0XHRcdGxpbmVIZWlnaHQ6IDEuM1xuXHRcdFx0Y29sb3I6ICdyZ2JhKDAsMCwwLC44NyknXG5jbGFzcyBleHBvcnRzLk1lbnUgZXh0ZW5kcyBUZXh0TGF5ZXJcblx0Y29uc3RydWN0b3I6IChvcHRpb25zKSAtPlxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdGZvbnRGYW1pbHk6ICdSb2JvdG8nXG5cdFx0XHRmb250U2l6ZTogMTRcblx0XHRcdGZvbnRXZWlnaHQ6IDUwMFxuXHRcdFx0bGluZUhlaWdodDogMS43XG5cdFx0XHRjb2xvcjogJ3JnYmEoMCwwLDAsLjg3KSdcbmNsYXNzIGV4cG9ydHMuQm9keTEgZXh0ZW5kcyBUZXh0TGF5ZXJcblx0Y29uc3RydWN0b3I6IChvcHRpb25zKSAtPlxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdGZvbnRGYW1pbHk6ICdSb2JvdG8nXG5cdFx0XHRmb250U2l6ZTogMTRcblx0XHRcdGZvbnRXZWlnaHQ6IDQwMFxuXHRcdFx0bGluZUhlaWdodDogMS40XG5cdFx0XHRjb2xvcjogJ3JnYmEoMCwwLDAsLjg3KSdcbmNsYXNzIGV4cG9ydHMuQ2FwdGlvbiBleHRlbmRzIFRleHRMYXllclxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMpIC0+XG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0Zm9udEZhbWlseTogJ1JvYm90bydcblx0XHRcdGZvbnRTaXplOiAxMlxuXHRcdFx0Zm9udFdlaWdodDogNDAwXG5cdFx0XHRsaW5lSGVpZ2h0OiAxLjNcblx0XHRcdGNvbG9yOiAncmdiYSgwLDAsMCwuNTQpJ1xuY2xhc3MgZXhwb3J0cy5EaWFsb2dBY3Rpb24gZXh0ZW5kcyBUZXh0TGF5ZXJcblx0Y29uc3RydWN0b3I6IChvcHRpb25zKSAtPlxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdGZvbnRGYW1pbHk6ICdSb2JvdG8nXG5cdFx0XHRmb250U2l6ZTogMTRcblx0XHRcdGZvbnRXZWlnaHQ6IDUwMFxuXHRcdFx0bGluZUhlaWdodDogMS4zXG5cdFx0XHRjb2xvcjogJyMwMDk2ODgnXG5cdFx0XHRsZXR0ZXJTcGFjaW5nOiAxLjFcblx0XHRcdHBhZGRpbmc6IHtsZWZ0OiA0LCByaWdodDogNCwgdG9wOiA4LCBib3R0b206IDB9LCIsIlxuIyAgIGRQICAgZFAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuIyAgIDg4ICAgODggICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuIyBkODg4OFAgODhkODg4Yi4gLmQ4ODg4Yi4gODhkOGIuZDhiLiAuZDg4ODhiLiAuZDg4ODhiLlxuIyAgIDg4ICAgODgnICBgODggODhvb29vZDggODgnYDg4J2A4OCA4OG9vb29kOCBZOG9vb29vLlxuIyAgIDg4ICAgODggICAgODggODguICAuLi4gODggIDg4ICA4OCA4OC4gIC4uLiAgICAgICA4OFxuIyAgIGRQICAgZFAgICAgZFAgYDg4ODg4UCcgZFAgIGRQICBkUCBgODg4ODhQJyBgODg4ODhQJ1xuXG4jIFdoZW4gbG9hZGVkLCB0aGlzIG1vZHVsZSB3aWxsIGF0dGVtcHQgdG8gY3JlYXRlIGEgbmV3IHRoZW1lIGJhc2VkIG9uIFxuIyB0aGUgRGVzaWduIE1vZGUgdGVtcGxhdGUuIEl0cyBkZWZhdWx0IHZhbHVlcyB3aWxsIGJlIGZvciBhIFwiTGlnaHRcIiB0aGVtZS5cblxubW9kaWZ5Q29sb3IgPSAoY29sb3IsIGgsIHMsIGwpIC0+XG5cdGNsaXAgPSBfLnJlcGxhY2UoXy5yZXBsYWNlKGNvbG9yLnRvSHNsU3RyaW5nKCkuc2xpY2UoNCwgLTEpLCAnJScsICcnKSwgJyUnLCAnJykgLnNwbGl0KCcsICcpXG5cblx0bmV3Q29sb3IgPSBuZXcgQ29sb3IoXG5cdFx0aDogXy5wYXJzZUludChjbGlwWzBdKSArIGgsIFxuXHRcdHM6IChfLnBhcnNlSW50KGNsaXBbMV0pICsgcykvMTAwLCBcblx0XHRsOiAoXy5wYXJzZUludChjbGlwWzJdKSArIGwpLzEwMCwgXG5cdFx0YTogMSlcblx0XG5cdHJldHVybiBuZXdDb2xvclxuXG5wcmltYXJ5Q29sb3IgPSBwcmltYXJ5X2NvbG9yLmJhY2tncm91bmRDb2xvclxucHJpbWFyeUludmVydCA9IDEwMCAtIChwcmltYXJ5X2ludmVydC5vcGFjaXR5ICogMTAwKVxuc2Vjb25kYXJ5Q29sb3IgPSBzZWNvbmRhcnlfY29sb3IuYmFja2dyb3VuZENvbG9yXG5tZW51Q29sb3IgPSBtZW51X2NvbG9yLmJhY2tncm91bmRDb2xvclxubWVudVRleHRDb2xvciA9IG1lbnVfdGV4dF9jb2xvci5jb2xvclxubWVudUludmVydCA9IDEwMCAtIChtZW51X2ludmVydC5vcGFjaXR5ICogMTAwKVxuXG5cbnNvdXJjZSA9XG5cdGNvbG9yczpcblx0XHRwcmltYXJ5OlxuXHRcdFx0bWFpbjogcHJpbWFyeUNvbG9yXG5cdFx0XHRsaWdodDogbW9kaWZ5Q29sb3IocHJpbWFyeUNvbG9yLCAxMywgLTUsIDE1KVxuXHRcdFx0ZGFyazogbW9kaWZ5Q29sb3IocHJpbWFyeUNvbG9yLCAtMSwgLTcsIC0xMilcblx0XHRcdHRleHQ6IHByaW1hcnlfdGV4dF9jb2xvci5jb2xvclxuXHRcdFx0aW52ZXJ0OiBwcmltYXJ5SW52ZXJ0XG5cdFx0c2Vjb25kYXJ5OlxuXHRcdFx0bWFpbjogc2Vjb25kYXJ5Q29sb3Jcblx0XHRcdGxpZ2h0OiBtb2RpZnlDb2xvcihzZWNvbmRhcnlDb2xvciwgMTMsIC01LCAxNSlcblx0XHRcdGRhcms6IG1vZGlmeUNvbG9yKHNlY29uZGFyeUNvbG9yLCAtMSwgLTcsIC0xMilcblx0XHRcdHRleHQ6IHNlY29uZGFyeV90ZXh0X2NvbG9yLmNvbG9yXG5cdFx0bWVudTpcblx0XHRcdGxpZ2h0OiBtZW51Q29sb3Jcblx0XHRcdHRleHQ6IG1lbnVUZXh0Q29sb3Jcblx0XHRcdGludmVydDogbWVudUludmVydFxuXG5cbnRoZW1lID0gXG5cdHRpbnQ6IHNvdXJjZS5jb2xvcnMuc2Vjb25kYXJ5Lm1haW5cblx0cHJpbWFyeTogc291cmNlLmNvbG9ycy5wcmltYXJ5Lm1haW5cblx0cHJpbWFyeUludmVydDogcHJpbWFyeUludmVydFxuXHRzZWNvbmRhcnk6IHNvdXJjZS5jb2xvcnMuc2Vjb25kYXJ5Lm1haW5cblx0bWVudTogc291cmNlLmNvbG9ycy5tZW51LmxpZ2h0XG5cdG1lbnVJbnZlcnQ6IHNvdXJjZS5jb2xvcnMubWVudS5pbnZlcnRcblxuXHRoZWFkZXI6IFxuXHRcdGJhY2tncm91bmRDb2xvcjogc291cmNlLmNvbG9ycy5wcmltYXJ5Lm1haW5cblx0XHR0aXRsZTogc291cmNlLmNvbG9ycy5wcmltYXJ5LnRleHRcblx0XHRpbnZlcnQ6IHByaW1hcnlJbnZlcnRcblx0XHR0YWJzOlxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBzb3VyY2UuY29sb3JzLnByaW1hcnkubGlnaHRcblx0XHRcdGNvbG9yOiBzb3VyY2UuY29sb3JzLnByaW1hcnkudGV4dFxuXHRcdFx0c2VsZWN0b3I6IHNvdXJjZS5jb2xvcnMuc2Vjb25kYXJ5Lm1haW5cblx0XG5cdHN0YXR1c0JhcjogXG5cdFx0aW1hZ2U6ICdpbWFnZXMvc3RhdHVzX2Jhcl9jbGVhci5wbmcnXG5cdFx0YmFja2dyb3VuZENvbG9yOiBzb3VyY2UuY29sb3JzLnByaW1hcnkuZGFya1xuXHRcdGludmVydDogcHJpbWFyeUludmVydFxuXHRcblx0cGFnZTpcblx0XHRwcmltYXJ5OlxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiAnI0UxRTJFMSdcblx0XHRzZWNvbmRhcnk6XG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6ICcjRjVGNUY2J1xuXHRcblx0bWVudU92ZXJsYXk6XG5cdFx0aGVhZGVyOlxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBzb3VyY2UuY29sb3JzLnNlY29uZGFyeS5tYWluXG5cdFx0XHRpY29uOiBzb3VyY2UuY29sb3JzLnNlY29uZGFyeS5saWdodFxuXHRcdGJhY2tncm91bmRDb2xvcjogc291cmNlLmNvbG9ycy5tZW51LmxpZ2h0XG5cdFx0dGV4dDogc291cmNlLmNvbG9ycy5tZW51LnRleHRcblx0XHRzbGlkZXI6IFxuXHRcdFx0a25vYjogc291cmNlLmNvbG9ycy5zZWNvbmRhcnkubGlnaHRcblx0XHRcdGZpbGw6IHNvdXJjZS5jb2xvcnMuc2Vjb25kYXJ5LmRhcmtcblx0XHRpbnZlcnQ6IHNvdXJjZS5jb2xvcnMubWVudS5pbnZlcnRcblxuXHRkaWFsb2c6IFxuXHRcdGJhY2tncm91bmRDb2xvcjonI0ZBRkFGQSdcblx0XG5cdHRleHQ6IFxuXHRcdHByaW1hcnk6IHNvdXJjZS5jb2xvcnMucHJpbWFyeS50ZXh0XG5cdFx0c2Vjb25kYXJ5OiBzb3VyY2UuY29sb3JzLnNlY29uZGFyeS50ZXh0XG5cdFxuXHR0YWJsZTpcblx0XHRiYWNrZ3JvdW5kQ29sb3I6ICcjRkZGRkZGJ1xuXHRcdHRleHQ6IHNvdXJjZS5jb2xvcnMucHJpbWFyeS50ZXh0XG5cdFx0Y2hlY2tCb3g6XG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcdGJvcmRlckNvbG9yOiAnI0QzRDNEMydcblx0XHRzZWxlY3RlZDpcblx0XHRcdGJhY2tncm91bmRDb2xvcjogc291cmNlLmNvbG9ycy5zZWNvbmRhcnkubWFpblxuXHRcdFx0dGV4dDogc291cmNlLmNvbG9ycy5wcmltYXJ5LnRleHRcblx0XHRcdGNoZWNrQm94OlxuXHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IHNvdXJjZS5jb2xvcnMuc2Vjb25kYXJ5LmRhcmtcblx0XHRcdFx0Ym9yZGVyQ29sb3I6IG51bGxcblxuXHRzbGlkZXI6XG5cdFx0a25vYjogc291cmNlLmNvbG9ycy5wcmltYXJ5LmxpZ2h0XG5cdFx0ZmlsbDogc291cmNlLmNvbG9ycy5wcmltYXJ5LmRhcmtcblx0XG5cdGJ1dHRvbjpcblx0XHRiYWNrZ3JvdW5kQ29sb3I6IHNvdXJjZS5jb2xvcnMucHJpbWFyeS5tYWluXG5cdFx0Y29sb3I6IHNvdXJjZS5jb2xvcnMuc2Vjb25kYXJ5LnRleHRcblx0XG5cdGNhcmQ6XG5cdFx0aGVhZGVyOiBzb3VyY2UuY29sb3JzLnNlY29uZGFyeS5kYXJrXG5cdFxuXHRuYXZCYXI6XG5cdFx0YmFja2dyb3VuZENvbG9yOiAnIzAwMDAwMCdcblx0XG5cdGtleWJvYXJkOlxuXHRcdGltYWdlOiAnaW1hZ2VzL2tleWJvYXJkX2xpZ2h0LnBuZydcblxuZXhwb3J0cy50aGVtZSA9IHRoZW1lXG4iLCIjIFx0IDg4ODg4OGJhICBvbyAgICAgICAgICAgICAgICAgICBkUFxuIyBcdCA4OCAgICBgOGIgICAgICAgICAgICAgICAgICAgICAgODhcbiMgXHRhODhhYWFhOFAnIGRQIDg4ZDg4OGIuIDg4ZDg4OGIuIDg4IC5kODg4OGIuXG4jIFx0IDg4ICAgYDhiLiA4OCA4OCcgIGA4OCA4OCcgIGA4OCA4OCA4OG9vb29kOFxuIyBcdCA4OCAgICAgODggODggODguICAuODggODguICAuODggODggODguICAuLi5cbiMgXHQgZFAgICAgIGRQIGRQIDg4WTg4OFAnIDg4WTg4OFAnIGRQIGA4ODg4OFAnXG4jIFx0ICAgICAgICAgICAgICA4OCAgICAgICA4OFxuIyBcdCAgICAgICAgICAgICAgZFAgICAgICAgZFBcblxuI1x0QnkgZGVmYXVsdCwgc2hvd3MgYW4gZXhwYW5kaW5nIGNpcmNsZSBvdmVyIGEgbGF5ZXIsIGNsaXBwZWQgdG8gaXRzIGZyYW1lLlxuI1x0T24gdGhlIGxheWVyJ3MgdG91Y2hFbmQgZXZlbnQsIHRoZSBjaXJjbGUgYW5kIGl0cyBtYXNrIHdpbGwgZGlzYXBwZWFyLlxuXG4jXHRyZXF1aXJlZDpcbiNcdGxheWVyIChMYXllciksIHRoZSBsYXllciBvdmVyIHdoaWNoIHRvIHNob3cgdGhlIHJpcHBsZSBlZmZlY3RcbiNcdHBvaW50IChvYmplY3QpLCB0aGUgcmlwcGxlIG9yaWdpbiBwb2ludCwgdXN1YWxseSBhIG9uVG91Y2hTdGFydCdzIGV2ZW50LnBvaW50XG5cbiNcdG9wdGlvbmFsOlxuI1x0cGxhY2VCZWhpbmQgKExheWVyKSwgYSBjaGlsZCBvZiBsYXllciBiZWhpbmQgd2hpY2ggdGhlIHJpcHBsZSBzaG91bGQgYXBwZWFyXG4jXHRjb2xvciAoc3RyaW5nIG9yIGNvbG9yIG9iamVjdCksIGEgY3VzdG9tIGNvbG9yIGZvciB0aGUgcmlwcGxlXG5cbnJpcHBsZSA9IChsYXllciwgcG9pbnQsIHBsYWNlQmVoaW5kLCBjb2xvcikgLT5cblx0XG5cdGlmICFsYXllcj8gdGhlbiB0aHJvdyAnUmlwcGxlIHJlcXVpcmVzIGEgTGF5ZXIuIFRyeSBteUxheWVyLm9uVG91Y2hTdGFydCAoZXZlbnQpIC0+IHJpcHBsZShALCBldmVudC5wb2ludCknXG5cdGlmICFwb2ludD8gdGhlbiB0aHJvdyAnUmlwcGxlIHJlcXVpcmVzIGEgcG9pbnQuIFRyeSBteUxheWVyLm9uVG91Y2hTdGFydCAoZXZlbnQpIC0+IHJpcHBsZShALCBldmVudC5wb2ludCknXG5cblx0bWFzayA9IG5ldyBMYXllclxuXHRcdG5hbWU6ICcuJ1xuXHRcdHBhcmVudDogbGF5ZXJcblx0XHRzaXplOiBsYXllci5zaXplXG5cdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0Y2xpcDogdHJ1ZVxuXHRcdG9wYWNpdHk6IDBcblx0XHRhbmltYXRpb25PcHRpb25zOiB7dGltZTogLjE1fVxuXHRcblx0aWYgcGxhY2VCZWhpbmQgdGhlbiBtYXNrLnBsYWNlQmVoaW5kKHBsYWNlQmVoaW5kKVxuXHRcblx0IyBSSVBQTEUgQ0lSQ0xFXG5cdFxuXHRsb25nU2lkZSA9IGlmIGxheWVyLndpZHRoID4gbGF5ZXIuaGVpZ2h0IHRoZW4gbGF5ZXIud2lkdGggZWxzZSBsYXllci5oZWlnaHRcblxuXHRyaXBwbGVDaXJjbGUgPSBuZXcgTGF5ZXJcblx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBtYXNrXG5cdFx0XHR4OiBwb2ludC54IC0gMTZcblx0XHRcdHk6IHBvaW50LnkgLSAxNlxuXHRcdFx0d2lkdGg6IDMyLCBoZWlnaHQ6IDMyLCBcblx0XHRcdGJvcmRlclJhZGl1czogbG9uZ1NpZGVcblx0XHRcdFxuXHRpZiBjb2xvcj9cblx0XHRyaXBwbGVDaXJjbGUucHJvcHMgPVxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBjb2xvclxuXHRlbHNlIFxuXHRcdHJpcHBsZUNpcmNsZS5wcm9wcyA9IFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBsYXllci5iYWNrZ3JvdW5kQ29sb3Jcblx0XHRcdHNhdHVyYXRlOiAxNTBcblx0XHRcdGJyaWdodG5lc3M6IDE3MFxuXHRcdFx0b3BhY2l0eTogLjhcblx0XG5cdCMgQU5JTUFUSU9OUyBDSVJDTEVcblx0XG5cdG1hc2suYW5pbWF0ZVxuXHRcdG9wYWNpdHk6IDFcblx0XHRvcHRpb25zOiB7dGltZTogLjE1fVxuXHRcblx0cmlwcGxlQ2lyY2xlLmFuaW1hdGVcblx0XHR4OiByaXBwbGVDaXJjbGUueCAtIGxvbmdTaWRlICogMS4zXG5cdFx0eTogcmlwcGxlQ2lyY2xlLnkgLSBsb25nU2lkZSAqIDEuM1xuXHRcdHdpZHRoOiBsb25nU2lkZSAqIDIuNlxuXHRcdGhlaWdodDogbG9uZ1NpZGUgKiAyLjZcblx0XHRvcHRpb25zOiB7dGltZTogLjV9XG5cdFxuXHQjIFRPVUNIIEVORFxuXHRcblx0bGF5ZXIub25Ub3VjaEVuZCAtPiBcblx0XHRtYXNrLmFuaW1hdGVcblx0XHRcdG9wYWNpdHk6IDBcblx0XHRtYXNrLm9uQW5pbWF0aW9uRW5kIG1hc2suZGVzdHJveVxuXG5leHBvcnRzLnJpcHBsZSA9IHJpcHBsZSIsIiMgQWRkIHRoZSBmb2xsb3dpbmcgbGluZSB0byB5b3VyIHByb2plY3QgaW4gRnJhbWVyIFN0dWRpby4gXG4jIG15TW9kdWxlID0gcmVxdWlyZSBcIm15TW9kdWxlXCJcbiMgUmVmZXJlbmNlIHRoZSBjb250ZW50cyBieSBuYW1lLCBsaWtlIG15TW9kdWxlLm15RnVuY3Rpb24oKSBvciBteU1vZHVsZS5teVZhclxuXG5leHBvcnRzLm15VmFyID0gXCJteVZhcmlhYmxlXCJcblxuZXhwb3J0cy5teUZ1bmN0aW9uID0gLT5cblx0cHJpbnQgXCJteUZ1bmN0aW9uIGlzIHJ1bm5pbmdcIlxuXG5leHBvcnRzLm15QXJyYXkgPSBbMSwgMiwgM10iLCJ7ZGF0YWJhc2V9ID0gcmVxdWlyZSAnZGF0YWJhc2UnXG57cmlwcGxlfSA9IHJlcXVpcmUgJ3JpcHBsZSdcbnt0aGVtZX0gPSByZXF1aXJlICd0aGVtZSdcbnR5cGUgPSByZXF1aXJlICd0eXBlJ1xuXG4jIE91ciBnb2FsIGlzIHRvIHJlcXVpcmUgb25seSBvbmUgcmVxdWlyZSBpbiBGcmFtZXIgcHJvamVjdCwgc28gdGhpcyBcbiMgaXMgYSBjbHVua3kgd2F5IG9mIGxldHRpbmcgdXNlciBjcmVhdGUgdGV4dCB1c2luZyBtZC5UaXRsZSwgZXRjLlxuXG5leHBvcnRzLnRoZW1lID0gdGhlbWVcbmV4cG9ydHMuVGl0bGUgPSBUaXRsZSA9IHR5cGUuVGl0bGVcbmV4cG9ydHMuSGVhZGxpbmUgPSBIZWFkbGluZSA9IHR5cGUuSGVhZGxpbmVcbmV4cG9ydHMuU3ViaGVhZFNlY29uZGFyeSA9IFN1YmhlYWRTZWNvbmRhcnkgPSB0eXBlLlN1YmhlYWRTZWNvbmRhcnlcbmV4cG9ydHMuUmVndWxhciA9IFJlZ3VsYXIgPSB0eXBlLlJlZ3VsYXJcbmV4cG9ydHMuQm9keTIgPSBCb2R5MiA9IHR5cGUuQm9keTJcbmV4cG9ydHMuQm9keTEgPSBCb2R5MSA9IHR5cGUuQm9keTFcbmV4cG9ydHMuQ2FwdGlvbiA9IENhcHRpb24gPSB0eXBlLkNhcHRpb25cbmV4cG9ydHMuRGlhbG9nQWN0aW9uID0gRGlhbG9nQWN0aW9uID0gdHlwZS5EaWFsb2dBY3Rpb25cblxuIyAgLmQ4ODg4ODggICAgICAgICAgICAgICAgICAgXG4jIGQ4JyAgICA4OCAgICAgICAgICAgICAgICAgICBcbiMgODhhYWFhYTg4YSA4OGQ4ODhiLiA4OGQ4ODhiLlxuIyA4OCAgICAgODggIDg4JyAgYDg4IDg4JyAgYDg4XG4jIDg4ICAgICA4OCAgODguICAuODggODguICAuODhcbiMgODggICAgIDg4ICA4OFk4ODhQJyA4OFk4ODhQJ1xuIyAgICAgICAgICAgIDg4ICAgICAgIDg4ICAgICAgXG4jICAgICAgICAgICAgZFAgICAgICAgZFAgICAgICBcblxuXG5leHBvcnRzLkFwcCA9IGNsYXNzIEFwcCBleHRlbmRzIEZsb3dDb21wb25lbnRcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cblx0XHRAX2Zvb3RlciA9IG9wdGlvbnMuZm9vdGVyID8gdHJ1ZVxuXHRcdEB0aGVtZSA9IHRoZW1lXG5cblx0XHRzdXBlciBfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRuYW1lOiAnRmxvdydcblx0XHRcdGFuaW1hdGlvbk9wdGlvbnM6XG5cdFx0XHRcdHRpbWU6IC4yXG5cblx0XHRpZiBAX2Zvb3RlclxuXHRcdFx0QGZvb3RlciA9IG5ldyBMYXllclxuXHRcdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQFxuXHRcdFx0XHR3aWR0aDogU2NyZWVuLndpZHRoLCBoZWlnaHQ6IDQ4XG5cdFx0XHRcdGltYWdlOiAnaW1hZ2VzL25hdl9iYXIucG5nJ1xuXHRcdFxuXHRcdEBoZWFkZXIgPSBuZXcgSGVhZGVyXG5cdFx0XHR0aGVtZTogdGhlbWVcblxuXHRcdEBvblRyYW5zaXRpb25TdGFydCAoY3VycmVudCwgbmV4dCwgZGlyZWN0aW9uKSA9PiBcblxuXHRcdFx0QGhlYWRlci50aXRsZSA9IG5leHQuX2hlYWRlcj8udGl0bGUgPyAnRGVmYXVsdCdcblx0XHRcdEBoZWFkZXIuaWNvbiA9IG5leHQuX2hlYWRlcj8uaWNvbiA/ICdtZW51J1xuXHRcdFx0QGhlYWRlci5pY29uQWN0aW9uID0gbmV4dC5faGVhZGVyPy5pY29uQWN0aW9uID8gLT4gbnVsbFxuXHRcdFx0QGhlYWRlci52aXNpYmxlID0gbmV4dC5faGVhZGVyPy52aXNpYmxlID8gdHJ1ZVxuXHRcdFx0bmV4dC5fb25Mb2FkKClcblxuXHRcdFxuXHRcdCMgS0VZQk9BUkRcblxuXHRcdEBrZXlib2FyZCA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogJ0tleWJvYXJkJ1xuXHRcdFx0eTogQG1heFksIGltYWdlOiB0aGVtZS5rZXlib2FyZC5pbWFnZVxuXHRcdFx0d2lkdGg6IDM2MCwgaGVpZ2h0OiAyNjlcblx0XHRcdGFuaW1hdGlvbk9wdGlvbnM6XG5cdFx0XHRcdHRpbWU6IC4yNVxuXG5cdG5ld1BhZ2U6IChvcHRpb25zID0ge30pIC0+XG5cblx0XHRwYWdlID0gbmV3IFBhZ2UgXy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0Y29udGVudEluc2V0OiB7dG9wOiBAaGVhZGVyLmhlaWdodH1cblxuXHRcdCMgYWRqdXN0IGNvbnRlbnQgaW5zZXQgZm9yIHBhZ2Vcblx0XHRpZiBwYWdlLmNvbnRlbnRJbnNldC50b3AgPCBAaGVhZGVyLmhlaWdodCB0aGVuIHBhZ2UuY29udGVudEluc2V0ID0gXG5cdFx0XHR0b3A6IHBhZ2UuY29udGVudEluc2V0LnRvcCArPSBAaGVhZGVyLmhlaWdodFxuXHRcdFx0Ym90dG9tOiBwYWdlLmNvbnRlbnRJbnNldC5ib3R0b21cblx0XHRcdGxlZnQ6IHBhZ2UuY29udGVudEluc2V0LmxlZnRcblx0XHRcdHJpZ2h0OiBwYWdlLmNvbnRlbnRJbnNldC5yaWdodFxuXG5cdFx0cmV0dXJuIHBhZ2UgXG5cblx0YWRkUGFnZTogKHBhZ2UpIC0+XG5cdFx0cGFnZS5jb250ZW50SW5zZXQgPSB7dG9wOiBAaGVhZGVyLmhlaWdodH1cblxuXHRcdCMgYWRqdXN0IGNvbnRlbnQgaW5zZXQgZm9yIHBhZ2Vcblx0XHRpZiBwYWdlLmNvbnRlbnRJbnNldC50b3AgPCBAaGVhZGVyLmhlaWdodCB0aGVuIHBhZ2UuY29udGVudEluc2V0ID0gXG5cdFx0XHR0b3A6IHBhZ2UuY29udGVudEluc2V0LnRvcCArPSBAaGVhZGVyLmhlaWdodFxuXHRcdFx0Ym90dG9tOiBwYWdlLmNvbnRlbnRJbnNldC5ib3R0b21cblx0XHRcdGxlZnQ6IHBhZ2UuY29udGVudEluc2V0LmxlZnRcblx0XHRcdHJpZ2h0OiBwYWdlLmNvbnRlbnRJbnNldC5yaWdodFxuXG5cdFx0cmV0dXJuIHBhZ2UgXG5cblx0bGlua1RvOiAocGFnZSkgLT5cblx0XHRpZiBwYWdlPyBhbmQgQGN1cnJlbnQgaXNudCBwYWdlXG5cdFx0XHRAc2hvd05leHQocGFnZSlcblxuXG5cdHNob3dLZXlib2FyZDogLT5cblx0XHRAa2V5Ym9hcmQuYW5pbWF0ZVxuXHRcdFx0eTogQWxpZ24uYm90dG9tKClcblx0XHRAa2V5Ym9hcmQuYnJpbmdUb0Zyb250KClcblxuXHRoaWRlS2V5Ym9hcmQ6IC0+XG5cdFx0QGtleWJvYXJkLmFuaW1hdGVcblx0XHRcdHk6IFNjcmVlbi5tYXhZXG5cblxuXG5cblxuXG5cblxuIyAuZDg4ODg4YiAgICBkUCAgICAgICAgICAgICAgZFAgICAgICAgICAgICAgICAgICAgICAgODg4ODg4YmEgICAgICAgICAgICAgICAgICAgXG4jIDg4LiAgICBcIicgICA4OCAgICAgICAgICAgICAgODggICAgICAgICAgICAgICAgICAgICAgODggICAgYDhiICAgICAgICAgICAgICAgICAgXG4jIGBZODg4ODhiLiBkODg4OFAgLmQ4ODg4Yi4gZDg4ODhQIGRQICAgIGRQIC5kODg4OGIuIGE4OGFhYWE4UCcgLmQ4ODg4Yi4gODhkODg4Yi5cbiMgICAgICAgYDhiICAgODggICA4OCcgIGA4OCAgIDg4ICAgODggICAgODggWThvb29vby4gIDg4ICAgYDhiLiA4OCcgIGA4OCA4OCcgIGA4OFxuIyBkOCcgICAuOFAgICA4OCAgIDg4LiAgLjg4ICAgODggICA4OC4gIC44OCAgICAgICA4OCAgODggICAgLjg4IDg4LiAgLjg4IDg4ICAgICAgXG4jICBZODg4ODhQICAgIGRQICAgYDg4ODg4UDggICBkUCAgIGA4ODg4OFAnIGA4ODg4OFAnICA4ODg4ODg4OFAgYDg4ODg4UDggZFAgIFxuXG5cbmV4cG9ydHMuU3RhdHVzQmFyID0gY2xhc3MgU3RhdHVzQmFyIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cblx0XHRzdXBlciBfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRuYW1lOiAnLidcblx0XHRcdHdpZHRoOiBTY3JlZW4ud2lkdGgsIGhlaWdodDogMjRcblx0XHRcdGJhY2tncm91bmRDb2xvcjogdGhlbWUuc3RhdHVzQmFyLmJhY2tncm91bmRDb2xvclxuXG5cdFx0QGl0ZW1zID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQFxuXHRcdFx0c2l6ZTogQHNpemVcblx0XHRcdGltYWdlOiB0aGVtZS5zdGF0dXNCYXIuaW1hZ2Vcblx0XHRcdGludmVydDogdGhlbWUuc3RhdHVzQmFyLmludmVydFxuXG5cblxuIyBkUCAgICAgZFAgICAgICAgICAgICAgICAgICAgICAgICAgIGRQICAgICAgICAgICAgICAgICAgXG4jIDg4ICAgICA4OCAgICAgICAgICAgICAgICAgICAgICAgICAgODggICAgICAgICAgICAgICAgICBcbiMgODhhYWFhYTg4YSAuZDg4ODhiLiAuZDg4ODhiLiAuZDg4OGI4OCAuZDg4ODhiLiA4OGQ4ODhiLlxuIyA4OCAgICAgODggIDg4b29vb2Q4IDg4JyAgYDg4IDg4JyAgYDg4IDg4b29vb2Q4IDg4JyAgYDg4XG4jIDg4ICAgICA4OCAgODguICAuLi4gODguICAuODggODguICAuODggODguICAuLi4gODggICAgICBcbiMgZFAgICAgIGRQICBgODg4ODhQJyBgODg4ODhQOCBgODg4ODhQOCBgODg4ODhQJyBkUCAgICAgIFxuXG5cbmV4cG9ydHMuSGVhZGVyID0gY2xhc3MgSGVhZGVyIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cdFx0XG5cdFx0QF90aXRsZSA9IHVuZGVmaW5lZFxuXHRcdEBfaWNvbiA9IHVuZGVmaW5lZFxuXHRcdEBfaWNvbkFjdGlvbiA9IG9wdGlvbnMuaWNvbkFjdGlvbiA/IC0+IG51bGxcblxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdG5hbWU6ICdIZWFkZXInLCBcblx0XHRcdHdpZHRoOiBTY3JlZW4ud2lkdGgsIGhlaWdodDogODBcblx0XHRcdHNoYWRvd1k6IDIsIHNoYWRvd0JsdXI6IDMsIHNoYWRvd0NvbG9yOiAncmdiYSgwLDAsMCwuMjQpJ1xuXHRcdFx0YmFja2dyb3VuZENvbG9yOiB0aGVtZS5oZWFkZXIuYmFja2dyb3VuZENvbG9yXG5cblx0XHRAc3RhdHVzQmFyID0gbmV3IFN0YXR1c0JhclxuXHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEBcblxuXHRcdEB0aXRsZUxheWVyID0gbmV3IHR5cGUuVGl0bGVcblx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBAXG5cdFx0XHR4OiA3MiwgeTogQWxpZ24uYm90dG9tKC0xNClcblx0XHRcdGNvbG9yOiB0aGVtZS5oZWFkZXIudGl0bGVcblx0XHRcdHRleHQ6IEB0aXRsZSA/IFwiTm8gdGl0bGVcIlxuXG5cdFx0QHRpdGxlID0gb3B0aW9ucy50aXRsZSA/ICdEZWZhdWx0IEhlYWRlcidcblxuXHRcdEBpY29uTGF5ZXIgPSBuZXcgTGF5ZXJcblx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBALCBcblx0XHRcdHg6IDEyLCB5OiBBbGlnbi5jZW50ZXIoMTIpXG5cdFx0XHR3aWR0aDogMzIsIGhlaWdodDogMzJcblx0XHRcdGltYWdlOiAnJywgYmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHRpbnZlcnQ6IHRoZW1lLmhlYWRlci5pbnZlcnRcblxuXHRcdEBpY29uID0gb3B0aW9ucy5pY29uID8gJ21lbnUnXG5cblx0XHRAaWNvbkxheWVyLm9uVGFwID0+IEBfaWNvbkFjdGlvbigpXG5cblxuXHRAZGVmaW5lIFwidGl0bGVcIixcblx0XHRnZXQ6IC0+IHJldHVybiBAX3RpdGxlXG5cdFx0c2V0OiAodGl0bGVUZXh0KSAtPlxuXHRcdFx0QF90aXRsZSA9IHRpdGxlVGV4dFxuXHRcdFx0QHRpdGxlTGF5ZXIudGV4dFJlcGxhY2UoQHRpdGxlTGF5ZXIudGV4dCwgQF90aXRsZSlcblxuXHRAZGVmaW5lIFwiaWNvblwiLFxuXHRcdGdldDogLT4gcmV0dXJuIEBfaWNvblxuXHRcdHNldDogKGljb25OYW1lKSAtPiBcblx0XHRcdEBfaWNvbiA9IGljb25OYW1lXG5cdFx0XHRAaWNvbkxheWVyLmltYWdlID0gXCJpbWFnZXMvaWNvbnMvI3tAX2ljb259LnBuZ1wiXG5cblx0QGRlZmluZSBcImljb25BY3Rpb25cIixcblx0XHRnZXQ6IC0+IHJldHVybiBAX2ljb25BY3Rpb25cblx0XHRzZXQ6IChhY3Rpb24pIC0+XG5cdFx0XHRAX2ljb25BY3Rpb24gPSBhY3Rpb25cblxuXG5cblxuXG5cblxuIyAgODg4ODg4YmEgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4jICA4OCAgICBgOGIgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiMgYTg4YWFhYThQJyAuZDg4ODhiLiAuZDg4ODhiLiAuZDg4ODhiLlxuIyAgODggICAgICAgIDg4JyAgYDg4IDg4JyAgYDg4IDg4b29vb2Q4XG4jICA4OCAgICAgICAgODguICAuODggODguICAuODggODguICAuLi5cbiMgIGRQICAgICAgICBgODg4ODhQOCBgODg4OFA4OCBgODg4ODhQJ1xuIyAgICAgICAgICAgICAgICAgICAgICAgICAgLjg4ICAgICAgICAgXG4jICAgICAgICAgICAgICAgICAgICAgIGQ4ODg4UCAgICAgICAgICBcblxuXG5leHBvcnRzLlBhZ2UgPSBjbGFzcyBQYWdlIGV4dGVuZHMgU2Nyb2xsQ29tcG9uZW50XG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXHRcdFxuXHRcdEBfaGVhZGVyID0gb3B0aW9ucy5oZWFkZXIgPyB7dGl0bGU6ICdEZWZhdWx0JywgdmlzaWJsZTogdHJ1ZSwgaWNvbjogJ21lbnUnLCBpY29uQWN0aW9uOiAtPiByZXR1cm4gbnVsbH1cblx0XHRAX3RlbXBsYXRlID0gb3B0aW9ucy50ZW1wbGF0ZVxuXHRcdEBfdGVtcGxhdGVPcGFjaXR5ID0gb3B0aW9ucy50ZW1wbGF0ZU9wYWNpdHkgPyAuNVxuXHRcdEBfb25Mb2FkID0gb3B0aW9ucy5vbkxvYWQgPyAtPiBudWxsXG5cblx0XHRpZiBAX2hlYWRlci5pY29uQWN0aW9uIHRoZW4gQF9oZWFkZXIuaWNvbkFjdGlvbiA9IF8uYmluZChAX2hlYWRlci5pY29uQWN0aW9uLCBAKVxuXHRcdGlmIEBfb25Mb2FkIHRoZW4gQF9vbkxvYWQgPSBfLmJpbmQoQF9vbkxvYWQsIEApXG5cblxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdG5hbWU6ICdQYWdlJ1xuXHRcdFx0c2l6ZTogU2NyZWVuLnNpemVcblx0XHRcdHNjcm9sbEhvcml6b250YWw6IGZhbHNlXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IHRoZW1lLnBhZ2UucHJpbWFyeS5iYWNrZ3JvdW5kQ29sb3Jcblx0XHRcblx0XHRAY29udGVudEluc2V0ID1cblx0XHRcdHRvcDogMCwgYm90dG9tOiA1MDBcblxuXHRcdEBjb250ZW50LmJhY2tncm91bmRDb2xvciA9IG51bGxcblxuXHRcdGlmIEBfdGVtcGxhdGU/XG5cdFx0XHRAX3RlbXBsYXRlLnByb3BzID1cblx0XHRcdFx0cGFyZW50OiBAXG5cdFx0XHRcdG9wYWNpdHk6IEBfdGVtcGxhdGVPcGFjaXR5XG5cblx0XHRAc2VuZFRvQmFjaygpXG5cblxuXHR1cGRhdGU6IC0+IHJldHVybiBudWxsXG5cblxuXG4jICA4ODg4ODhiYSAgICAgICAgICAgICAgICAgICAgICBkUCAgIGRQICAgICAgICAgICAgICAgICAgICAgIFxuIyAgODggICAgYDhiICAgICAgICAgICAgICAgICAgICAgODggICA4OCAgICAgICAgICAgICAgICAgICAgICBcbiMgYTg4YWFhYThQJyAuZDg4ODhiLiBkUCAgZFAgIGRQIDg4IGQ4ODg4UCAuZDg4ODhiLiA4OGQ4Yi5kOGIuXG4jICA4OCAgIGA4Yi4gODgnICBgODggODggIDg4ICA4OCA4OCAgIDg4ICAgODhvb29vZDggODgnYDg4J2A4OFxuIyAgODggICAgIDg4IDg4LiAgLjg4IDg4Ljg4Yi44OCcgODggICA4OCAgIDg4LiAgLi4uIDg4ICA4OCAgODhcbiMgIGRQICAgICBkUCBgODg4ODhQJyA4ODg4UCBZOFAgIGRQICAgZFAgICBgODg4ODhQJyBkUCAgZFAgIGRQXG5cbmV4cG9ydHMuUm93SXRlbSA9IGNsYXNzIFJvd0l0ZW0gZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblxuXHRcdEBfaWNvbiA9IG9wdGlvbnMuaWNvblxuXHRcdEBfaWNvbkJhY2tncm91bmRDb2xvciA9IG9wdGlvbnMuaWNvbkJhY2tncm91bmRDb2xvciA/ICcjNzc3J1xuXHRcdEBfdGV4dCA9IG9wdGlvbnMudGV4dCA/ICdSb3cgaXRlbSdcblx0XHRAX3JvdyA9IG9wdGlvbnMucm93ID8gMFxuXHRcdEBfeSA9IDMyICsgKEBfcm93ICogNDgpIFxuXG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0d2lkdGg6IFNjcmVlbi53aWR0aFxuXHRcdFx0eTogQF95XG5cdFx0XHRoZWlnaHQ6IDQ4XG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblxuXHRcdEBpY29uID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQFxuXHRcdFx0eDogMTYsIHk6IEFsaWduLmNlbnRlclxuXHRcdFx0aGVpZ2h0OiAzMiwgd2lkdGg6IDMyLCBib3JkZXJSYWRpdXM6IDE2XG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IEBfaWNvbkJhY2tncm91bmRDb2xvclxuXHRcdFx0aW1hZ2U6IEBfaWNvblxuXG5cdFx0QGxhYmVsTGF5ZXIgPSBuZXcgdHlwZS5SZWd1bGFyXG5cdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQFxuXHRcdFx0eDogQGljb24ubWF4WCArIDE2LCB5OiBBbGlnbi5jZW50ZXJcblx0XHRcdGNvbG9yOiB0aGVtZS50ZXh0LnRleHRcblx0XHRcdHRleHQ6IEBfdGV4dFxuXG5cbiMgXHQ4ODg4YmEuODhiYSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDg4ODg4OGJhICAgICAgICAgICAgIGRQICAgICBkUFxuIyBcdDg4ICBgOGIgIGA4YiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgODggICAgYDhiICAgICAgICAgICAgODggICAgIDg4XG4jIFx0ODggICA4OCAgIDg4IC5kODg4OGIuIDg4ZDg4OGIuIGRQICAgIGRQIGE4OGFhYWE4UCcgZFAgICAgZFAgZDg4ODhQIGQ4ODg4UCAuZDg4ODhiLiA4OGQ4ODhiLlxuIyBcdDg4ICAgODggICA4OCA4OG9vb29kOCA4OCcgIGA4OCA4OCAgICA4OCAgODggICBgOGIuIDg4ICAgIDg4ICAgODggICAgIDg4ICAgODgnICBgODggODgnICBgODhcbiMgXHQ4OCAgIDg4ICAgODggODguICAuLi4gODggICAgODggODguICAuODggIDg4ICAgIC44OCA4OC4gIC44OCAgIDg4ICAgICA4OCAgIDg4LiAgLjg4IDg4ICAgIDg4XG4jIFx0ZFAgICBkUCAgIGRQIGA4ODg4OFAnIGRQICAgIGRQIGA4ODg4OFAnICA4ODg4ODg4OFAgYDg4ODg4UCcgICBkUCAgICAgZFAgICBgODg4ODhQJyBkUCAgICBkUFxuXG5cbmNsYXNzIE1lbnVCdXR0b24gZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblx0XHRcblx0XHRAX2ljb24gPSBvcHRpb25zLmljb24gPyAnaG9tZSdcblx0XHRAX3RleHQgPSBvcHRpb25zLnRleHQgPyAnRGVmYXVsdCdcblx0XHRAX2FjdGlvbiA9IG9wdGlvbnMuYWN0aW9uID8gLT4gbnVsbFxuXG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0aGVpZ2h0OiA0OCwgd2lkdGg6IDMwNFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cblx0XHRAaWNvbkxheWVyID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQFxuXHRcdFx0eTogQWxpZ24uY2VudGVyXG5cdFx0XHRoZWlnaHQ6IDMyLCB3aWR0aDogMzJcblx0XHRcdGludmVydDogdGhlbWUubWVudS5pbnZlcnRcblx0XHRcdGltYWdlOiBAX2ljb25cblxuXHRcdEBsYWJlbExheWVyID0gbmV3IHR5cGUuUmVndWxhclxuXHRcdFx0bmFtZTogJ2xhYmVsJywgcGFyZW50OiBAXG5cdFx0XHR4OiBAaWNvbkxheWVyLm1heFggKyAxNlxuXHRcdFx0eTogQWxpZ24uY2VudGVyKClcblx0XHRcdGNvbG9yOiB0aGVtZS5tZW51T3ZlcmxheS50ZXh0XG5cdFx0XHR0ZXh0OiBAX3RleHRcblxuXHRcdEBvblRhcCBAX2FjdGlvblxuXHRcdEBvblRhcCAtPiBcblx0XHRcdFV0aWxzLmRlbGF5IC4yNSwgPT4gQHBhcmVudC5oaWRlKClcblxuXG5cbiMgXHQ4ODg4YmEuODhiYSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC44ODg4OC4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRQICAgICAgICAgICAgICAgICAgXG4jIFx0ODggIGA4YiAgYDhiICAgICAgICAgICAgICAgICAgICAgICAgICAgIGQ4JyAgIGA4YiAgICAgICAgICAgICAgICAgICAgICAgICAgICA4OCAgICAgICAgICAgICAgICAgIFxuIyBcdDg4ICAgODggICA4OCAuZDg4ODhiLiA4OGQ4ODhiLiBkUCAgICBkUCA4OCAgICAgODggZFAgICAuZFAgLmQ4ODg4Yi4gODhkODg4Yi4gODggLmQ4ODg4Yi4gZFAgICAgZFBcbiMgXHQ4OCAgIDg4ICAgODggODhvb29vZDggODgnICBgODggODggICAgODggODggICAgIDg4IDg4ICAgZDgnIDg4b29vb2Q4IDg4JyAgYDg4IDg4IDg4JyAgYDg4IDg4ICAgIDg4XG4jIFx0ODggICA4OCAgIDg4IDg4LiAgLi4uIDg4ICAgIDg4IDg4LiAgLjg4IFk4LiAgIC44UCA4OCAuODgnICA4OC4gIC4uLiA4OCAgICAgICA4OCA4OC4gIC44OCA4OC4gIC44OFxuIyBcdGRQICAgZFAgICBkUCBgODg4ODhQJyBkUCAgICBkUCBgODg4ODhQJyAgYDg4ODhQJyAgODg4OFAnICAgYDg4ODg4UCcgZFAgICAgICAgZFAgYDg4ODg4UDggYDg4ODhQODhcbiMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC44OFxuIyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkODg4OFAgXG5cbmV4cG9ydHMuTWVudU92ZXJsYXkgPSBjbGFzcyBNZW51T3ZlcmxheSBleHRlbmRzIExheWVyXG5cdFxuXHRcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cblx0XHRAX2xpbmtzID0gb3B0aW9ucy5saW5rcyA/IFt7dGl0bGU6ICdIb21lJywgaWNvbjogJ2hvbWUnLCBhY3Rpb246IC0+IG51bGx9XVxuXHRcdEBfdGl0bGUgPSBvcHRpb25zLnRpdGxlID8gJ01lbnUnXG5cdFx0QF9pbWFnZSA9IG9wdGlvbnMuaW1hZ2UgPyBudWxsXG5cblxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdGhlaWdodDogU2NyZWVuLmhlaWdodFxuXHRcdFx0d2lkdGg6IDMwNFxuXHRcdFx0aGVpZ2h0OiBTY3JlZW4uaGVpZ2h0XG5cdFx0XHR2aXNpYmxlOiBmYWxzZVxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiB0aGVtZS5tZW51T3ZlcmxheS5iYWNrZ3JvdW5kQ29sb3Jcblx0XHRcdGFuaW1hdGlvbk9wdGlvbnM6IHtjdXJ2ZTogXCJzcHJpbmcoMzAwLCAzNSwgMClcIn1cblxuXG5cdFx0QHNjcmltID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiAnLicsIFxuXHRcdFx0c2l6ZTogU2NyZWVuLnNpemVcblx0XHRcdGJhY2tncm91bmRDb2xvcjogJ3JnYmEoMCwwLDAsLjYpJ1xuXHRcdFx0b3BhY2l0eTogMFxuXHRcdFx0dmlzaWJsZTogZmFsc2Vcblx0XHRcdGFuaW1hdGlvbk9wdGlvbnM6XG5cdFx0XHRcdHRpbWU6IC4yNVxuXG5cdFx0QHNjcmltLm9uVGFwID0+IEBoaWRlKClcblx0XHRAb25Td2lwZUxlZnRFbmQgPT4gQGhpZGUoKVxuXG5cdFx0QGhlYWRlciA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEBcblx0XHRcdHdpZHRoOiBAd2lkdGgsIGhlaWdodDogMTczXG5cdFx0XHRpbWFnZTogZGF0YWJhc2UudXNlci5pbWFnZVxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiB0aGVtZS5tZW51T3ZlcmxheS5oZWFkZXIuYmFja2dyb3VuZENvbG9yXG5cblx0XHRAdGl0bGVJY29uID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQGhlYWRlclxuXHRcdFx0eDogMTYsIHk6IDQwXG5cdFx0XHRoZWlnaHQ6IDY0LCB3aWR0aDogNjRcblx0XHRcdGJvcmRlclJhZGl1czogMzJcblx0XHRcdGJhY2tncm91bmRDb2xvcjogdGhlbWUubWVudU92ZXJsYXkuaGVhZGVyLmljb25cblxuXHRcdEB0aXRsZUV4cGFuZCA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEBoZWFkZXJcblx0XHRcdHg6IEFsaWduLnJpZ2h0KC0xNilcblx0XHRcdHk6IEFsaWduLmJvdHRvbSgtMTMpXG5cdFx0XHRoZWlnaHQ6IDMyLCB3aWR0aDogMzJcblx0XHRcdGludmVydDogdGhlbWUuc2Vjb25kYXJ5LmludmVydFxuXHRcdFx0aW1hZ2U6IFwiaW1hZ2VzL2ljb25zL2V4cGFuZC1tb3JlLnBuZ1wiXG5cblx0XHRAdGl0bGUgPSBuZXcgdHlwZS5Cb2R5MVxuXHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEBoZWFkZXJcblx0XHRcdHdpZHRoOiBAd2lkdGhcblx0XHRcdHg6IDE2LCB5OiBBbGlnbi5ib3R0b20oLTE4KVxuXHRcdFx0dGV4dDogQF90aXRsZVxuXG5cdFx0bGlua3MgPSBbXVxuXG5cdFx0Zm9yIGxpbmssIGkgaW4gQF9saW5rc1xuXHRcdFx0bGlua3NbaV0gPSBuZXcgTWVudUJ1dHRvblxuXHRcdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQFxuXHRcdFx0XHR4OiAxNiwgeTogMTg5ICsgKDQ4ICogaSlcblx0XHRcdFx0dGV4dDogbGluay50aXRsZVxuXHRcdFx0XHRpY29uOiBcImltYWdlcy9pY29ucy8je2xpbmsuaWNvbn0ucG5nXCJcblx0XHRcdFx0YWN0aW9uOiBsaW5rLmFjdGlvblxuXG5cdHNob3c6IC0+XG5cdFx0QGJyaW5nVG9Gcm9udCgpXG5cdFx0QHZpc2libGUgPSB0cnVlXG5cdFx0QHggPSAtU2NyZWVuLndpZHRoXG5cdFx0QGFuaW1hdGVcblx0XHRcdHg6IDBcblxuXHRcdEBzY3JpbS5wbGFjZUJlaGluZChAKVxuXHRcdEBzY3JpbS52aXNpYmxlID0gdHJ1ZVxuXHRcdEBzY3JpbS5hbmltYXRlXG5cdFx0XHRvcGFjaXR5OiAxXG5cblx0aGlkZTogLT5cblx0XHRAYW5pbWF0ZVxuXHRcdFx0eDogLVNjcmVlbi53aWR0aFxuXG5cdFx0QHNjcmltLmFuaW1hdGVcblx0XHRcdG9wYWNpdHk6IDBcblxuXHRcdFV0aWxzLmRlbGF5IC4zLCA9PlxuXHRcdFx0QHZpc2libGUgPSBmYWxzZVxuXHRcdFx0QHNjcmltLnZpc2libGUgPSBmYWxzZVxuXHRcdFx0QHNlbmRUb0JhY2soKVxuXHRcdFx0QHNjcmltLnNlbmRUb0JhY2soKVxuXG5cbiMgXHQ4ODg4ODhiYSAgb28gICAgICAgICAgZFBcbiMgXHQ4OCAgICBgOGIgICAgICAgICAgICAgODhcbiMgXHQ4OCAgICAgODggZFAgLmQ4ODg4Yi4gODggLmQ4ODg4Yi4gLmQ4ODg4Yi5cbiMgXHQ4OCAgICAgODggODggODgnICBgODggODggODgnICBgODggODgnICBgODhcbiMgXHQ4OCAgICAuOFAgODggODguICAuODggODggODguICAuODggODguICAuODhcbiMgXHQ4ODg4ODg4UCAgZFAgYDg4ODg4UDggZFAgYDg4ODg4UCcgYDg4ODhQODhcbiMgXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuODhcbiMgXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGQ4ODg4UFxuXG5leHBvcnRzLkRpYWxvZyA9IGNsYXNzIERpYWxvZyBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0bmFtZTogJy4nLCBzaXplOiBTY3JlZW4uc2l6ZSwgY29sb3I6IHRoZW1lLnRpbnRcblx0XHRcdGJhY2tncm91bmRDb2xvcjogJ3JnYmEoMCwgMCwgMCwgLjUpJ1xuXHRcdFx0b3BhY2l0eTogMFxuXHRcdFx0XG5cdFx0QF90aXRsZSA9IG9wdGlvbnMudGl0bGUgPyAnRGVmYXVsdCBUaXRsZSdcblx0XHRAX2JvZHkgPSBvcHRpb25zLmJvZHkgPyAnQm9keSB0ZXh0IGdvZXMgaGVyZS4nXG5cdFx0QF9hY2NlcHRUZXh0ID0gb3B0aW9ucy5hY2NlcHRUZXh0ID8gJ2NvbmZpcm0nXG5cdFx0QF9hY2NlcHRBY3Rpb24gPSBvcHRpb25zLmFjY2VwdEFjdGlvbiA/IC0+IG51bGxcblx0XHRAX2RlY2xpbmVUZXh0ID0gb3B0aW9ucy5kZWNsaW5lVGV4dCA/ICcnXG5cdFx0QF9kZWNsaW5lQWN0aW9uID0gb3B0aW9ucy5kZWNsaW5lQWN0aW9uID8gLT4gbnVsbFxuXHRcdFxuXHRcdEBvbiBFdmVudHMuVGFwLCAoZXZlbnQpIC0+IGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXG5cdFx0XG5cdFx0QGNvbnRhaW5lciA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogJ2NvbnRhaW5lcicsIHBhcmVudDogQFxuXHRcdFx0eDogQWxpZ24uY2VudGVyXG5cdFx0XHRoZWlnaHQ6IDEyOCwgd2lkdGg6IFNjcmVlbi53aWR0aCAtIDgwXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IHRoZW1lLmRpYWxvZy5iYWNrZ3JvdW5kQ29sb3Jcblx0XHRcdHNoYWRvd1g6IDAsIHNoYWRvd1k6IDcsIHNoYWRvd0JsdXI6IDMwXG5cdFx0XHRvcGFjaXR5OiAwXG5cdFx0XHRzaGFkb3dDb2xvcjogJ3JnYmEoMCwwLDAsLjMpJ1xuXHRcdFxuXHRcdEB0aXRsZSA9IG5ldyB0eXBlLlRpdGxlXG5cdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQGNvbnRhaW5lclxuXHRcdFx0eDogMjQsIHk6IDIwXG5cdFx0XHRmb250U2l6ZTogMTYsIGZvbnRXZWlnaHQ6IDUwMCwgY29sb3I6IHRoZW1lLnRleHQudGl0bGVcblx0XHRcdHRleHQ6IEBfdGl0bGVcblx0XHRcblx0XHRAYm9keSA9IG5ldyB0eXBlLlN1YmhlYWRTZWNvbmRhcnlcblx0XHRcdG5hbWU6ICdib2R5JywgcGFyZW50OiBAY29udGFpbmVyXG5cdFx0XHR4OiAyNCwgeTogNTJcblx0XHRcdHdpZHRoOiBAY29udGFpbmVyLndpZHRoIC0gNDJcblx0XHRcdHRleHQ6IEBfYm9keVxuXHRcdFxuXHRcdGJ1dHRvbnNZID0gaWYgQF9ib2R5IGlzICcnIHRoZW4gMTI4IGVsc2UgQGJvZHkubWF4WSArIDE2XG5cdFx0XG5cdFx0QGFjY2VwdCA9IG5ldyB0eXBlLkRpYWxvZ0FjdGlvblxuXHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEBjb250YWluZXJcblx0XHRcdHg6IEFsaWduLnJpZ2h0KC0xNiksIHk6IGJ1dHRvbnNZXG5cdFx0XHRjb2xvcjogdGhlbWUudGludCwgdGV4dDogQF9hY2NlcHRUZXh0LnRvVXBwZXJDYXNlKClcblx0XHRcdFxuXHRcdEBhY2NlcHQub25UYXAgQF9hY2NlcHRBY3Rpb25cblx0XHRcblx0XHRpZiBAX2RlY2xpbmVUZXh0IGlzbnQgJydcblx0XHRcdEBkZWNsaW5lID0gbmV3IHR5cGUuRGlhbG9nQWN0aW9uXG5cdFx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBAY29udGFpbmVyXG5cdFx0XHRcdHg6IDAsIHk6IGJ1dHRvbnNZXG5cdFx0XHRcdGNvbG9yOiB0aGVtZS50aW50LCB0ZXh0OiBAX2RlY2xpbmVUZXh0LnRvVXBwZXJDYXNlKClcblxuXHRcdFx0QGRlY2xpbmUub25UYXAgQF9kZWNsaW5lQWN0aW9uXG5cblx0XHQjIHNldCBwb3NpdGlvbnNcblx0XHRAY29udGFpbmVyLmhlaWdodCA9IEBhY2NlcHQubWF4WSArIDEyXG5cdFx0QGRlY2xpbmU/Lm1heFggPSBAYWNjZXB0LnggLSAxNlxuXHRcdEBjb250YWluZXIueSA9IEFsaWduLmNlbnRlcigxNilcblx0XHRcblx0XHQjIGFkZCBjbG9zZSBhY3Rpb25zIHRvIGNvbmZpcm0gYW5kIGNhbmNlbFxuXHRcdGZvciBidXR0b24gaW4gW0BhY2NlcHQsIEBkZWNsaW5lXVxuXHRcdFx0YnV0dG9uPy5vblRhcCBAY2xvc2Vcblx0XHRcblx0XHRcblx0XHQjIE9OIExPQURcblx0XHRAb3BlbigpXG5cdFxuXHRvcGVuOiA9PlxuXHRcdEBhbmltYXRlXG5cdFx0XHRvcGFjaXR5OiAxXG5cdFx0XHRvcHRpb25zOiBcblx0XHRcdFx0dGltZTogLjI1XG5cdFx0XG5cdFx0QGNvbnRhaW5lci5hbmltYXRlXG5cdFx0XHRvcGFjaXR5OiAxXG5cdFx0XHRvcHRpb25zOlxuXHRcdFx0XHR0aW1lOiAuMjVcblx0XHRcdFx0ZGVsYXk6IC4wNVxuXG5cdGNsb3NlOiA9PlxuXHRcdEBjb250YWluZXIuYW5pbWF0ZVxuXHRcdFx0b3BhY2l0eTogMFxuXHRcdFx0b3B0aW9uczpcblx0XHRcdFx0dGltZTogLjI1XG5cdFx0XG5cdFx0QGFuaW1hdGVcblx0XHRcdG9wYWNpdHk6IDBcblx0XHRcdG9wdGlvbnM6XG5cdFx0XHRcdHRpbWU6IC4yNVxuXHRcdFxuXHRcdFV0aWxzLmRlbGF5IC41LCA9PiBAZGVzdHJveSgpXG5cblxuXG5cblxuXG4iLCJ7ZGF0YWJhc2V9ID0gcmVxdWlyZSAnZGF0YWJhc2UnXG5cblxuXG4jIFx0IDg4ODg4ODg4YiBkUFxuIyBcdCA4OCAgICAgICAgODhcbiMgXHRhODhhYWFhICAgIDg4IC5kODg4OGIuIGRQICBkUCAgZFBcbiMgXHQgODggICAgICAgIDg4IDg4JyAgYDg4IDg4ICA4OCAgODhcbiMgXHQgODggICAgICAgIDg4IDg4LiAgLjg4IDg4Ljg4Yi44OCdcbiMgXHQgZFAgICAgICAgIGRQIGA4ODg4OFAnIDg4ODhQIFk4UFxuIFx0XG5cbmV4cG9ydHMuZmxvdyA9IGZsb3cgPSBuZXcgbWQuQXBwXG5cdHRoZW1lOiAnZGF1J1xuXHRmb290ZXI6IGZhbHNlXG5cdGFuaW1hdGlvbk9wdGlvbnM6IHtjdXJ2ZTogXCJzcHJpbmcoMzAwLCAzNSwgMClcIn1cblxuXG5cblxuXG5cbiMgXHQ4ODg4YmEuODhiYSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDg4ODg4OGJhICAgICAgICAgICAgIGRQICAgICBkUFxuIyBcdDg4ICBgOGIgIGA4YiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgODggICAgYDhiICAgICAgICAgICAgODggICAgIDg4XG4jIFx0ODggICA4OCAgIDg4IC5kODg4OGIuIDg4ZDg4OGIuIGRQICAgIGRQIGE4OGFhYWE4UCcgZFAgICAgZFAgZDg4ODhQIGQ4ODg4UCAuZDg4ODhiLiA4OGQ4ODhiLlxuIyBcdDg4ICAgODggICA4OCA4OG9vb29kOCA4OCcgIGA4OCA4OCAgICA4OCAgODggICBgOGIuIDg4ICAgIDg4ICAgODggICAgIDg4ICAgODgnICBgODggODgnICBgODhcbiMgXHQ4OCAgIDg4ICAgODggODguICAuLi4gODggICAgODggODguICAuODggIDg4ICAgIC44OCA4OC4gIC44OCAgIDg4ICAgICA4OCAgIDg4LiAgLjg4IDg4ICAgIDg4XG4jIFx0ZFAgICBkUCAgIGRQIGA4ODg4OFAnIGRQICAgIGRQIGA4ODg4OFAnICA4ODg4ODg4OFAgYDg4ODg4UCcgICBkUCAgICAgZFAgICBgODg4ODhQJyBkUCAgICBkUFxuXG5cbmNsYXNzIE1lbnVCdXR0b24gZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblx0XHRcblx0XHRAX2ljb24gPSBvcHRpb25zLmljb24gPyAnYm9vaydcblx0XHRAX3RleHQgPSBvcHRpb25zLnRleHQgPyAnRGVmYXVsdCdcblx0XHRAX2FjdGlvbiA9IG9wdGlvbnMuYWN0aW9uID8gLT4gbnVsbFxuXG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0aGVpZ2h0OiA0OCwgd2lkdGg6IDMwNFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cblx0XHRAaWNvbkxheWVyID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQFxuXHRcdFx0eTogQWxpZ24uY2VudGVyXG5cdFx0XHRoZWlnaHQ6IDMyLCB3aWR0aDogMzJcblx0XHRcdGludmVydDogMTAwXG5cdFx0XHRpbWFnZTogQF9pY29uXG5cblx0XHRAbGFiZWxMYXllciA9IG5ldyBUZXh0TGF5ZXJcblx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBAXG5cdFx0XHR5OiBBbGlnbi5jZW50ZXIsIHg6IEBpY29uTGF5ZXIubWF4WCArIDE2XG5cdFx0XHR3aWR0aDogMTAwXG5cdFx0XHRmb250RmFtaWx5OiAnU3RyYXRvcydcblx0XHRcdGZvbnRTaXplOiAxNFxuXHRcdFx0dGV4dEFsaWduOiAnbGVmdCdcblx0XHRcdGNvbG9yOiAnI0ZGRidcblx0XHRcdHRleHQ6IFwiI3tAX3RleHR9XCJcblxuXHRcdEBvblRhcCBAX2FjdGlvblxuXHRcdEBvblRhcCAtPiBcblx0XHRcdFV0aWxzLmRlbGF5IC4yNSwgPT4gQHBhcmVudC5oaWRlKClcblxuXG5cblxuXG5cbiMgICAgODg4ODg4YmEgICAgICAgICAgICAgICAgICAgIGRQICAgICAgIGRQICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRQICA4ODg4ODhiYSAgICAgICAgICAgICBkUCAgICAgZFAgICAgICAgICAgICAgICAgICAgIFxuIyAgICA4OCAgICBgOGIgICAgICAgICAgICAgICAgICAgODggICAgICAgODggICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgODggIDg4ICAgIGA4YiAgICAgICAgICAgIDg4ICAgICA4OCAgICAgICAgICAgICAgICAgICAgXG4jICAgIDg4ICAgICA4OCAuZDg4ODhiLiAuZDg4ODhiLiA4OGQ4ODhiLiA4OGQ4ODhiLiAuZDg4ODhiLiAuZDg4ODhiLiA4OGQ4ODhiLiAuZDg4OGI4OCBhODhhYWFhOFAnIGRQICAgIGRQIGQ4ODg4UCBkODg4OFAgLmQ4ODg4Yi4gODhkODg4Yi5cbiMgICAgODggICAgIDg4IDg4JyAgYDg4IFk4b29vb28uIDg4JyAgYDg4IDg4JyAgYDg4IDg4JyAgYDg4IDg4JyAgYDg4IDg4JyAgYDg4IDg4JyAgYDg4ICA4OCAgIGA4Yi4gODggICAgODggICA4OCAgICAgODggICA4OCcgIGA4OCA4OCcgIGA4OFxuIyAgICA4OCAgICAuOFAgODguICAuODggICAgICAgODggODggICAgODggODguICAuODggODguICAuODggODguICAuODggODggICAgICAgODguICAuODggIDg4ICAgIC44OCA4OC4gIC44OCAgIDg4ICAgICA4OCAgIDg4LiAgLjg4IDg4ICAgIDg4XG4jICAgIDg4ODg4ODhQICBgODg4ODhQOCBgODg4ODhQJyBkUCAgICBkUCA4OFk4ODg4JyBgODg4ODhQJyBgODg4ODhQOCBkUCAgICAgICBgODg4ODhQOCAgODg4ODg4ODhQIGA4ODg4OFAnICAgZFAgICAgIGRQICAgYDg4ODg4UCcgZFAgICAgZFBcblxuXG5leHBvcnRzLkRhc2hib2FyZEJ1dHRvbiA9IGNsYXNzIERhc2hib2FyZEJ1dHRvbiBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXHRcdFxuXHRcdEBfaWNvbiA9IG9wdGlvbnMuaWNvbiA/ICdib29rJ1xuXHRcdEBfdGV4dCA9IG9wdGlvbnMudGV4dCA/ICdEZWZhdWx0J1xuXHRcdEBfYWN0aW9uID0gb3B0aW9ucy5hY3Rpb24gPyAtPiBudWxsXG5cblx0XHRzdXBlciBfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcdGhlaWdodDogMTAwLCB3aWR0aDogNTZcblxuXHRcdEBpY29uTGF5ZXIgPSBuZXcgTGF5ZXJcblx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBAXG5cdFx0XHR4OiBBbGlnbi5jZW50ZXIsIHk6IDBcblx0XHRcdGhlaWdodDogNzIsIHdpZHRoOiA3MlxuXHRcdFx0aW52ZXJ0OiAxMDBcblx0XHRcdGltYWdlOiBcImltYWdlcy9pY29ucy8je0BfaWNvbn0ucG5nXCJcblxuXHRcdEB0ZXh0TGF5ZXIgPSBuZXcgVGV4dExheWVyXG5cdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQFxuXHRcdFx0eTogQGljb25MYXllci5tYXhZLCB4OiBBbGlnbi5jZW50ZXJcblx0XHRcdHdpZHRoOiAxMDBcblx0XHRcdGZvbnRGYW1pbHk6ICdTdHJhdG9zJ1xuXHRcdFx0Zm9udFNpemU6IDEzXG5cdFx0XHR0ZXh0QWxpZ246ICdjZW50ZXInXG5cdFx0XHRjb2xvcjogJyNGRkYnXG5cdFx0XHR0ZXh0OiBcIiN7QF90ZXh0fVwiXG5cblx0XHRAb25UYXAgQF9hY3Rpb25cblxuXG5cblxuXG5cbiNcdGRQICAgICAgICAgICAgICAgICAgIG9vICAgZFAgICAgICAgICAgICAgIGRQICAgb28gICAgICAgICAgICAgICAgICBcbiMgXHQ4OCAgICAgICAgICAgICAgICAgICAgICAgIDg4ICAgICAgICAgICAgICA4OCAgICAgICAgICAgICAgICAgICAgICAgXG4jXHQ4OCA4OGQ4ODhiLiBkUCAgIC5kUCBkUCBkODg4OFAgLmQ4ODg4Yi4gZDg4ODhQIGRQIC5kODg4OGIuIDg4ZDg4OGIuXG4jIFx0ODggODgnICBgODggODggICBkOCcgODggICA4OCAgIDg4JyAgYDg4ICAgODggICA4OCA4OCcgIGA4OCA4OCcgIGA4OFxuIyBcdDg4IDg4ICAgIDg4IDg4IC44OCcgIDg4ICAgODggICA4OC4gIC44OCAgIDg4ICAgODggODguICAuODggODggICAgODhcbiMgXHRkUCBkUCAgICBkUCA4ODg4UCcgICBkUCAgIGRQICAgYDg4ODg4UDggICBkUCAgIGRQIGA4ODg4OFAnIGRQICAgIGRQXG5cbmNsYXNzIEludml0YXRpb24gZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblx0XHRzdXBlciBfLmRlZmF1bHRzIG9wdGlvbnNcblxuXG5cblxuXG5cbiMgXHQgODg4ODg4YmFcbiMgXHQgODggICAgYDhiXG4jIFx0YTg4YWFhYThQJyAuZDg4ODhiLiAuZDg4ODhiLiAuZDg4ODhiLiAuZDg4ODhiLlxuIyBcdCA4OCAgICAgICAgODgnICBgODggODgnICBgODggODhvb29vZDggWThvb29vby5cbiMgXHQgODggICAgICAgIDg4LiAgLjg4IDg4LiAgLjg4IDg4LiAgLi4uICAgICAgIDg4XG4jIFx0IGRQICAgICAgICBgODg4ODhQOCBgODg4OFA4OCBgODg4ODhQJyBgODg4ODhQJ1xuIyBcdCAgICAgICAgICAgICAgICAgICAgICAgICAuODhcbiMgXHQgICAgICAgICAgICAgICAgICAgICBkODg4OFBcblxucGFnZXMgPSBbXG5cdHt0aXRsZTogJ1Byb2ZpbGUnLCBpY29uOiAnYWNjb3VudC1jaXJjbGUnLCBhY3Rpb246IC0+IFxuXHRcdGZsb3cuc2hvd05leHQobmV3IFByb2ZpbGUpfSxcblx0e3RpdGxlOiAnQmlvZ3JhcGhpZXMnLCBpY29uOiAnZ3JvdXAnLCBhY3Rpb246IC0+IFxuXHRcdGZsb3cuc2hvd05leHQobmV3IEJpb2dyYXBoaWVzKX0sXG5cdHt0aXRsZTogJ05vdGVzJywgaWNvbjogJ2RyaXZlLWZpbGUnLCBhY3Rpb246IC0+IFxuXHRcdGZsb3cuc2hvd05leHQobmV3IE5vdGVzKX0sXG5cdHt0aXRsZTogJ011c2ljJywgaWNvbjogJ2hlYWRzZXQnLCBhY3Rpb246IC0+IFxuXHRcdGZsb3cuc2hvd05leHQobmV3IE11c2ljKX0sXG5cdHt0aXRsZTogJ01hcCcsIGljb246ICdtYXAnLCBhY3Rpb246IC0+IFxuXHRcdGZsb3cuc2hvd05leHQobmV3IE1hcCl9LFxuXHR7dGl0bGU6ICdSYWRpbycsIGljb246ICd3aWZpLXRldGhlcmluZycsIGFjdGlvbjogLT4gXG5cdFx0Zmxvdy5zaG93TmV4dChuZXcgUmFkaW8pfSxcblx0e3RpdGxlOiAnQm9vaycsIGljb246ICdib29rJywgYWN0aW9uOiAtPiBcblx0XHRmbG93LnNob3dOZXh0KG5ldyBCb29rKX0sXG5cdHt0aXRsZTogJ0hpc3RvcnknLCBpY29uOiAnZHJpdmUtZG9jdW1lbnQnLCBhY3Rpb246IC0+IFxuXHRcdGZsb3cuc2hvd05leHQobmV3IEhpc3RvcnkpfSxcblx0e3RpdGxlOiAnSGVscCcsIGljb246ICd3YXJuaW5nJywgYWN0aW9uOiAtPiBcblx0XHRmbG93LnNob3dOZXh0KG5ldyBIZWxwKX0sXG5dXG5cblxuXG5cblxuXG4jICAgIDg4ODg4OGJhICAgICAgICAgICAgICAgICAgICBkUCAgICAgICBkUCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkUFxuIyAgICA4OCAgICBgOGIgICAgICAgICAgICAgICAgICAgODggICAgICAgODggICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgODhcbiMgICAgODggICAgIDg4IC5kODg4OGIuIC5kODg4OGIuIDg4ZDg4OGIuIDg4ZDg4OGIuIC5kODg4OGIuIC5kODg4OGIuIDg4ZDg4OGIuIC5kODg4Yjg4XG4jICAgIDg4ICAgICA4OCA4OCcgIGA4OCBZOG9vb29vLiA4OCcgIGA4OCA4OCcgIGA4OCA4OCcgIGA4OCA4OCcgIGA4OCA4OCcgIGA4OCA4OCcgIGA4OFxuIyAgICA4OCAgICAuOFAgODguICAuODggICAgICAgODggODggICAgODggODguICAuODggODguICAuODggODguICAuODggODggICAgICAgODguICAuODhcbiMgICAgODg4ODg4OFAgIGA4ODg4OFA4IGA4ODg4OFAnIGRQICAgIGRQIDg4WTg4ODgnIGA4ODg4OFAnIGA4ODg4OFA4IGRQICAgICAgIGA4ODg4OFA4XG5cblxuY2xhc3MgRGFzaGJvYXJkIGV4dGVuZHMgbWQuUGFnZVxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblx0XHRzdXBlciBfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHR0aGVtZTogZmxvdy50aGVtZVxuXHRcdFx0aGVhZGVyOiBcblx0XHRcdFx0dGl0bGU6ICdEYXNoYm9hcmQnLCBcblx0XHRcdFx0dmlzaWJsZTogdHJ1ZSwgXG5cdFx0XHRcdGljb246ICdtZW51JywgXG5cdFx0XHRcdGljb25BY3Rpb246IC0+IG1lbnVPdmVybGF5LnNob3coKVxuXG5cdFx0TUFSR0lOID0gNDhcblx0XHRST1dfSEVJR0hUID0gMTA0XG5cblx0XHRAcHJvZmlsZUJ1dHRvbiA9IG5ldyBEYXNoYm9hcmRCdXR0b25cblx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBAXG5cdFx0XHR4OiBNQVJHSU4sIHk6IFJPV19IRUlHSFRcblx0XHRcdGljb246ICdhY2NvdW50LWNpcmNsZSdcblx0XHRcdHRleHQ6ICdQcm9maWxlJ1xuXHRcdFx0YWN0aW9uOiAtPiBmbG93LnNob3dOZXh0KG5ldyBQcm9maWxlKVxuXG5cdFx0QGJpb3NCdXR0b24gPSBuZXcgRGFzaGJvYXJkQnV0dG9uXG5cdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQFxuXHRcdFx0eDogQWxpZ24uY2VudGVyLCB5OiBST1dfSEVJR0hUXG5cdFx0XHRpY29uOiAnZ3JvdXAnXG5cdFx0XHR0ZXh0OiAnQmlvZ3JhcGhpZXMnXG5cdFx0XHRhY3Rpb246IC0+IGZsb3cuc2hvd05leHQobmV3IEJpb2dyYXBoaWVzKVxuXG5cdFx0QG5vdGVzQnV0dG9uID0gbmV3IERhc2hib2FyZEJ1dHRvblxuXHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEBcblx0XHRcdHg6IEFsaWduLnJpZ2h0KC1NQVJHSU4pLCB5OiBST1dfSEVJR0hUXG5cdFx0XHRpY29uOiAnZHJpdmUtZmlsZSdcblx0XHRcdHRleHQ6ICdOb3Rlcydcblx0XHRcdGFjdGlvbjogLT4gZmxvdy5zaG93TmV4dChuZXcgTm90ZXMpXG5cblx0XHRAaGVhZHNldEJ1dHRvbiA9IG5ldyBEYXNoYm9hcmRCdXR0b25cblx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBAXG5cdFx0XHR4OiBNQVJHSU4sIHk6IFJPV19IRUlHSFQgKiAyXG5cdFx0XHRpY29uOiAnaGVhZHNldCdcblx0XHRcdHRleHQ6ICdNdXNpYydcblx0XHRcdGFjdGlvbjogLT4gZmxvdy5zaG93TmV4dChuZXcgTXVzaWMpXG5cblx0XHRAbWFwQnV0dG9uID0gbmV3IERhc2hib2FyZEJ1dHRvblxuXHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEBcblx0XHRcdHg6IEFsaWduLmNlbnRlciwgeTogUk9XX0hFSUdIVCAqIDJcblx0XHRcdGljb246ICdtYXAnXG5cdFx0XHR0ZXh0OiAnTWFwJ1xuXHRcdFx0YWN0aW9uOiAtPiBmbG93LnNob3dOZXh0KG5ldyBNYXApXG5cblx0XHRAcmFkaW9CdXR0b24gPSBuZXcgRGFzaGJvYXJkQnV0dG9uXG5cdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQFxuXHRcdFx0eDogQWxpZ24ucmlnaHQoLU1BUkdJTiksIHk6IFJPV19IRUlHSFQgKiAyXG5cdFx0XHRpY29uOiAnd2lmaS10ZXRoZXJpbmcnXG5cdFx0XHR0ZXh0OiAnUmFkaW8nXG5cdFx0XHRhY3Rpb246IC0+IGZsb3cuc2hvd05leHQobmV3IFJhZGlvKVxuXG5cdFx0QGJvb2tCdXR0b24gPSBuZXcgRGFzaGJvYXJkQnV0dG9uXG5cdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQFxuXHRcdFx0eDogTUFSR0lOLCB5OiBST1dfSEVJR0hUICogM1xuXHRcdFx0aWNvbjogJ2Jvb2snXG5cdFx0XHR0ZXh0OiAnQm9vaydcblx0XHRcdGFjdGlvbjogLT4gZmxvdy5zaG93TmV4dChuZXcgQm9vaylcblxuXHRcdEBoaXN0b3J5QnV0dG9uID0gbmV3IERhc2hib2FyZEJ1dHRvblxuXHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEBcblx0XHRcdHg6IEFsaWduLmNlbnRlciwgeTogUk9XX0hFSUdIVCAqIDNcblx0XHRcdGljb246ICdkcml2ZS1kb2N1bWVudCdcblx0XHRcdHRleHQ6ICdIaXN0b3J5J1xuXHRcdFx0YWN0aW9uOiAtPiBmbG93LnNob3dOZXh0KG5ldyBIaXN0b3J5KVxuXG5cdFx0QGhlbHBCdXR0b24gPSBuZXcgRGFzaGJvYXJkQnV0dG9uXG5cdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQFxuXHRcdFx0eDogQWxpZ24ucmlnaHQoLU1BUkdJTiksIHk6IFJPV19IRUlHSFQgKiAzXG5cdFx0XHRpY29uOiAnd2FybmluZydcblx0XHRcdHRleHQ6ICdIZWxwJ1xuXHRcdFx0YWN0aW9uOiAtPiBmbG93LnNob3dOZXh0KG5ldyBIZWxwKVxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG4jIFx0ODg4OGJhLjg4YmEgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuODg4ODguICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkUCAgICAgICAgICAgICAgICAgIFxuIyBcdDg4ICBgOGIgIGA4YiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkOCcgICBgOGIgICAgICAgICAgICAgICAgICAgICAgICAgICAgODggICAgICAgICAgICAgICAgICBcbiMgXHQ4OCAgIDg4ICAgODggLmQ4ODg4Yi4gODhkODg4Yi4gZFAgICAgZFAgODggICAgIDg4IGRQICAgLmRQIC5kODg4OGIuIDg4ZDg4OGIuIDg4IC5kODg4OGIuIGRQICAgIGRQXG4jIFx0ODggICA4OCAgIDg4IDg4b29vb2Q4IDg4JyAgYDg4IDg4ICAgIDg4IDg4ICAgICA4OCA4OCAgIGQ4JyA4OG9vb29kOCA4OCcgIGA4OCA4OCA4OCcgIGA4OCA4OCAgICA4OFxuIyBcdDg4ICAgODggICA4OCA4OC4gIC4uLiA4OCAgICA4OCA4OC4gIC44OCBZOC4gICAuOFAgODggLjg4JyAgODguICAuLi4gODggICAgICAgODggODguICAuODggODguICAuODhcbiMgXHRkUCAgIGRQICAgZFAgYDg4ODg4UCcgZFAgICAgZFAgYDg4ODg4UCcgIGA4ODg4UCcgIDg4ODhQJyAgIGA4ODg4OFAnIGRQICAgICAgIGRQIGA4ODg4OFA4IGA4ODg4UDg4XG4jICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuODhcbiMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZDg4ODhQIFxuXG5jbGFzcyBNZW51T3ZlcmxheSBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdGhlaWdodDogU2NyZWVuLmhlaWdodFxuXHRcdFx0d2lkdGg6IDMwNFxuXHRcdFx0aGVpZ2h0OiBTY3JlZW4uaGVpZ2h0XG5cdFx0XHR2aXNpYmxlOiBmYWxzZVxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiAnIzMwMzAzMCdcblx0XHRcdGFuaW1hdGlvbk9wdGlvbnM6IHtjdXJ2ZTogXCJzcHJpbmcoMzAwLCAzNSwgMClcIn1cblxuXHRcdEBzY3JpbSA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogJy4nLCBcblx0XHRcdHNpemU6IFNjcmVlbi5zaXplXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6ICdyZ2JhKDAsMCwwLC44KSdcblx0XHRcdG9wYWNpdHk6IDBcblx0XHRcdHZpc2libGU6IGZhbHNlXG5cdFx0XHRhbmltYXRpb25PcHRpb25zOlxuXHRcdFx0XHR0aW1lOiAuMjVcblxuXHRcdEBzY3JpbS5vblRhcCA9PiBAaGlkZSgpXG5cdFx0QG9uU3dpcGVMZWZ0RW5kID0+IEBoaWRlKClcblxuXHRcdEB1c2VyUGhvdG8gPSBuZXcgTGF5ZXJcblx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBAXG5cdFx0XHR3aWR0aDogQHdpZHRoLCBoZWlnaHQ6IDE3M1xuXHRcdFx0aW1hZ2U6IGRhdGFiYXNlLnVzZXIuaW1hZ2Vcblx0XHRcdGJyaWdodG5lc3M6IDUwXG5cblx0XHRAdXNlck5hbWUgPSBuZXcgbWQuVGl0bGVcblx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBAXG5cdFx0XHR3aWR0aDogQHdpZHRoXG5cdFx0XHRmb250U2l6ZTogMjhcblx0XHRcdGNvbG9yOiAnI0ZGRidcblx0XHRcdHg6IDE2LCB5OiAzMlxuXHRcdFx0dGV4dDogZGF0YWJhc2UudXNlci5uYW1lXG5cblx0XHRAdXNlck5hbWUubWF4WSA9IEB1c2VyUGhvdG8ubWF4WSAtIDE2XG5cblx0XHRsaW5rcyA9IFtdXG5cblx0XHRmb3IgcGFnZSwgaSBpbiBwYWdlc1xuXHRcdFx0bGlua3NbaV0gPSBuZXcgTWVudUJ1dHRvblxuXHRcdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQFxuXHRcdFx0XHR4OiAxNiwgeTogMTg5ICsgKDQ4ICogaSlcblx0XHRcdFx0dGV4dDogcGFnZS50aXRsZVxuXHRcdFx0XHRpY29uOiBcImltYWdlcy9pY29ucy8je3BhZ2UuaWNvbn0ucG5nXCJcblx0XHRcdFx0YWN0aW9uOiBwYWdlLmFjdGlvblxuXG5cdHNob3c6IC0+XG5cdFx0QGJyaW5nVG9Gcm9udCgpXG5cdFx0QHZpc2libGUgPSB0cnVlXG5cdFx0QHggPSAtU2NyZWVuLndpZHRoXG5cdFx0QGFuaW1hdGVcblx0XHRcdHg6IDBcblxuXHRcdEBzY3JpbS5wbGFjZUJlaGluZChAKVxuXHRcdEBzY3JpbS52aXNpYmxlID0gdHJ1ZVxuXHRcdEBzY3JpbS5hbmltYXRlXG5cdFx0XHRvcGFjaXR5OiAxXG5cblx0aGlkZTogLT5cblx0XHRAYW5pbWF0ZVxuXHRcdFx0eDogLVNjcmVlbi53aWR0aFxuXG5cdFx0QHNjcmltLmFuaW1hdGVcblx0XHRcdG9wYWNpdHk6IDBcblxuXHRcdFV0aWxzLmRlbGF5IC4zLCA9PlxuXHRcdFx0QHZpc2libGUgPSBmYWxzZVxuXHRcdFx0QHNjcmltLnZpc2libGUgPSBmYWxzZVxuXHRcdFx0QHNlbmRUb0JhY2soKVxuXHRcdFx0QHNjcmltLnNlbmRUb0JhY2soKVxuXG5cblxuXG5cblxuXG4jIFx0IDg4ODg4OGJhICAgICAgICAgICAgICAgICAgICAuODg4OGIgb28gZFBcbiMgXHQgODggICAgYDhiICAgICAgICAgICAgICAgICAgIDg4ICAgXCIgICAgODhcbiMgXHRhODhhYWFhOFAnIDg4ZDg4OGIuIC5kODg4OGIuIDg4YWFhICBkUCA4OCAuZDg4ODhiLlxuIyBcdCA4OCAgICAgICAgODgnICBgODggODgnICBgODggODggICAgIDg4IDg4IDg4b29vb2Q4XG4jIFx0IDg4ICAgICAgICA4OCAgICAgICA4OC4gIC44OCA4OCAgICAgODggODggODguICAuLi5cbiMgXHQgZFAgICAgICAgIGRQICAgICAgIGA4ODg4OFAnIGRQICAgICBkUCBkUCBgODg4ODhQJ1xuXG5jbGFzcyBQcm9maWxlIGV4dGVuZHMgbWQuUGFnZVxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMpIC0+XG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0dGhlbWU6IGZsb3cudGhlbWVcblx0XHRcdGhlYWRlcjpcblx0XHRcdFx0dGl0bGU6ICdQcm9maWxlJ1xuXHRcdFx0XHR2aXNpYmxlOiB0cnVlLCBcblx0XHRcdFx0aWNvbjogJ2Fycm93LWJhY2snLCBcblx0XHRcdFx0aWNvbkFjdGlvbjogLT4gXG5cdFx0XHRcdFx0Zmxvdy5zaG93UHJldmlvdXMoKVxuXHRcdFx0XHRcdEBkZXN0cm95KClcblxuXG5cblxuXG5cbiNcdCAgODg4ODg4YmEgIG9vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRQICAgICAgIG9vXG4jXHQgIDg4ICAgIGA4YiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA4OFxuI1x0IGE4OGFhYWE4UCcgZFAgLmQ4ODg4Yi4gLmQ4ODg4Yi4gODhkODg4Yi4gLmQ4ODg4Yi4gODhkODg4Yi4gODhkODg4Yi4gZFAgLmQ4ODg4Yi4gLmQ4ODg4Yi5cbiNcdCAgODggICBgOGIuIDg4IDg4JyAgYDg4IDg4JyAgYDg4IDg4JyAgYDg4IDg4JyAgYDg4IDg4JyAgYDg4IDg4JyAgYDg4IDg4IDg4b29vb2Q4IFk4b29vb28uXG4jXHQgIDg4ICAgIC44OCA4OCA4OC4gIC44OCA4OC4gIC44OCA4OCAgICAgICA4OC4gIC44OCA4OC4gIC44OCA4OCAgICA4OCA4OCA4OC4gIC4uLiAgICAgICA4OFxuI1x0ICA4ODg4ODg4OFAgZFAgYDg4ODg4UCcgYDg4ODhQODggZFAgICAgICAgYDg4ODg4UDggODhZODg4UCcgZFAgICAgZFAgZFAgYDg4ODg4UCcgYDg4ODg4UCdcbiNcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLjg4ICAgICAgICAgICAgICAgICAgIDg4XG4jXHQgICAgICAgICAgICAgICAgICAgICAgICAgZDg4ODhQICAgICAgICAgICAgICAgICAgICBkUFxuXG5jbGFzcyBCaW9ncmFwaGllcyBleHRlbmRzIG1kLlBhZ2Vcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0dGhlbWU6IGZsb3cudGhlbWVcblx0XHRcdGhlYWRlcjpcblx0XHRcdFx0dGl0bGU6ICdCaW9ncmFwaGllcydcblx0XHRcdFx0dmlzaWJsZTogdHJ1ZSwgXG5cdFx0XHRcdGljb246ICdhcnJvdy1iYWNrJywgXG5cdFx0XHRcdGljb25BY3Rpb246IC0+IFxuXHRcdFx0XHRcdGZsb3cuc2hvd1ByZXZpb3VzKClcblx0XHRcdFx0XHRAZGVzdHJveSgpXG5cblxuXG5cblxuXG4jXHQgIDg4ODg4OGJhICBvb1xuI1x0ICA4OCAgICBgOGJcbiNcdCBhODhhYWFhOFAnIGRQIC5kODg4OGIuXG4jXHQgIDg4ICAgYDhiLiA4OCA4OCcgIGA4OFxuI1x0ICA4OCAgICAuODggODggODguICAuODhcbiNcdCAgODg4ODg4ODhQIGRQIGA4ODg4OFAnXG5cblxuXG5jbGFzcyBCaW9ncmFwaGllc0ZvY3VzIGV4dGVuZHMgbWQuUGFnZVxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblxuXHRcdEBfc291cmNlID0gb3B0aW9ucy5zb3VyY2UgPyB7dGl0bGU6ICdEZWZhdWx0J31cblxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdHRoZW1lOiBmbG93LnRoZW1lXG5cdFx0XHRoZWFkZXI6XG5cdFx0XHRcdHRpdGxlOiBcIiN7QF9zb3VyY2UudGl0bGV9XCJcblx0XHRcdFx0dmlzaWJsZTogdHJ1ZSwgXG5cdFx0XHRcdGljb246ICdhcnJvdy1iYWNrJywgXG5cdFx0XHRcdGljb25BY3Rpb246IC0+IFxuXHRcdFx0XHRcdGZsb3cuc2hvd1ByZXZpb3VzKClcblx0XHRcdFx0XHRAZGVzdHJveSgpXG5cblxuXG5cblxuXG4jIFx0ODg4ODg4YmEgICAgICAgICAgICAgZFAgICAgICAgICAgICAgICAgICAgIFxuIyBcdDg4ICAgIGA4YiAgICAgICAgICAgIDg4ICAgICAgICAgICAgICAgICAgICBcbiMgXHQ4OCAgICAgODggLmQ4ODg4Yi4gZDg4ODhQIC5kODg4OGIuIC5kODg4OGIuXG4jIFx0ODggICAgIDg4IDg4JyAgYDg4ICAgODggICA4OG9vb29kOCBZOG9vb29vLlxuIyBcdDg4ICAgICA4OCA4OC4gIC44OCAgIDg4ICAgODguICAuLi4gICAgICAgODhcbiMgXHRkUCAgICAgZFAgYDg4ODg4UCcgICBkUCAgIGA4ODg4OFAnIGA4ODg4OFAnXG5cblxuY2xhc3MgTm90ZXMgZXh0ZW5kcyBtZC5QYWdlXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXG5cdFx0QF90ZXh0ID0gZGF0YWJhc2UudXNlci5ub3RlXG5cblx0XHRzdXBlciBfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHR0aGVtZTogZmxvdy50aGVtZVxuXHRcdFx0aGVhZGVyOlxuXHRcdFx0XHR0aXRsZTogJ05vdGVzJ1xuXHRcdFx0XHR2aXNpYmxlOiB0cnVlLCBcblx0XHRcdFx0aWNvbjogJ2Fycm93LWJhY2snLCBcblx0XHRcdFx0aWNvbkFjdGlvbjogLT4gXG5cdFx0XHRcdFx0Zmxvdy5zaG93UHJldmlvdXMoKVxuXHRcdFx0XHRcdEBkZXN0cm95KClcblxuXHRcdEB0ZXh0RmllbGQgPSBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogQFxuXHRcdFx0eDogMTYsIHk6IDEwMFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHRodG1sOiBcIlwiXCJcblx0XHRcdDx0ZXh0YXJlYSBuYW1lPVwidGV4dGFyZWFcIiBjbGFzcz1cInRleHRhcmVhXCIgc3R5bGU9XCJcblx0XHRcdFx0YmFja2dyb3VuZC1jb2xvcjogIzAwMDAwMDtcblx0XHRcdFx0d2lkdGg6IDMyMHB4O1xuXHRcdFx0XHRoZWlnaHQ6IDUwMHB4O1xuXHRcdFx0XHRmb250LWZhbWlseTogU3RyYXRvcztcblx0XHRcdFx0Zm9udC1zaXplOiAxNnB4O1xuXHRcdFx0XHRmb250LXdlaWdodDogNDAwO1xuXHRcdFx0XHRjb2xvcjogI0ZGRkZGRjtcblx0XHRcdFx0bGluZS1oZWlnaHQ6IDIwcHg7XG5cdFx0XHRcdGJvcmRlcjogbm9uZTtcblx0XHRcdFx0b3V0bGluZTogbm9uZTsgXG5cdFx0XHRcdFwiPlxuXHRcdFx0XHQje0BfdGV4dH1cblx0XHRcdDwvdGV4dGFyZWE+XG5cdFx0XCJcIlwiXG5cblx0XHRAdGV4dEFyZWEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnRleHRhcmVhXCIpWzBdXG5cblxuXHRcdEBvbiBcImtleXVwXCIsID0+XG5cdFx0XHRkYXRhYmFzZS51c2VyLm5vdGUgPSBAdGV4dEFyZWEudmFsdWVcblxuXG5cbiMgXHQ4ODg4YmEuODhiYSAgICAgICAgICAgICAgICAgICAgb29cbiMgXHQ4OCAgYDhiICBgOGJcbiMgXHQ4OCAgIDg4ICAgODggZFAgICAgZFAgLmQ4ODg4Yi4gZFAgLmQ4ODg4Yi5cbiMgXHQ4OCAgIDg4ICAgODggODggICAgODggWThvb29vby4gODggODgnICBgXCJcIlxuIyBcdDg4ICAgODggICA4OCA4OC4gIC44OCAgICAgICA4OCA4OCA4OC4gIC4uLlxuIyBcdGRQICAgZFAgICBkUCBgODg4ODhQJyBgODg4ODhQJyBkUCBgODg4ODhQJ1xuXG5jbGFzcyBNdXNpYyBleHRlbmRzIG1kLlBhZ2Vcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0dGhlbWU6IGZsb3cudGhlbWVcblx0XHRcdGhlYWRlcjpcblx0XHRcdFx0dGl0bGU6ICdNdXNpYydcblx0XHRcdFx0dmlzaWJsZTogdHJ1ZSwgXG5cdFx0XHRcdGljb246ICdhcnJvdy1iYWNrJywgXG5cdFx0XHRcdGljb25BY3Rpb246IC0+IFxuXHRcdFx0XHRcdGZsb3cuc2hvd1ByZXZpb3VzKClcblx0XHRcdFx0XHRAZGVzdHJveSgpXG5cblx0XHRAbXVzaWNJY29uID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQFxuXHRcdFx0aGVpZ2h0OiAxNTIsIHdpZHRoOiAxNTJcblx0XHRcdHg6IEFsaWduLmNlbnRlciwgeTogQWxpZ24uY2VudGVyKC02NClcblx0XHRcdGltYWdlOiAnaW1hZ2VzL2ljb25zL2hlYWRzZXQucG5nJ1xuXHRcdFx0aW52ZXJ0OiAxMDBcblxuXHRcdEBtdXNpY0Rlc2NyaXB0aW9uMSA9IG5ldyBtZC5SZWd1bGFyXG5cdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQFxuXHRcdFx0eDogQWxpZ24uY2VudGVyLCB5OiBAbXVzaWNJY29uLm1heFlcblx0XHRcdGNvbG9yOiBcIiNGRkZcIiwgdGV4dEFsaWduOiBcImNlbnRlclwiXG5cdFx0XHR3aWR0aDogMjgwXG5cdFx0XHR0ZXh0OiAnWW91ciBtdXNpYyBpcyBjb21wb3NlZCBiYXNlZCDigKhvbiB3aGF0IHdlIGtub3cgYWJvdXQgeW91LidcblxuXHRcdEBtdXNpY0Rlc2NyaXB0aW9uMiA9IG5ldyBtZC5SZWd1bGFyXG5cdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQFxuXHRcdFx0eDogQWxpZ24uY2VudGVyLCB5OiBAbXVzaWNEZXNjcmlwdGlvbjEubWF4WSArIDE2XG5cdFx0XHRjb2xvcjogXCIjRkZGXCIsIHRleHRBbGlnbjogXCJjZW50ZXJcIlxuXHRcdFx0d2lkdGg6IDI4MFxuXHRcdFx0dGV4dDogJyBJdCBpcyB1bmlxdWUgdG8geW91LidcblxuXHRcdEBtdXNpY0Rlc2NyaXB0aW9uMyA9IG5ldyBtZC5SZWd1bGFyXG5cdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQFxuXHRcdFx0eDogQWxpZ24uY2VudGVyLCB5OiBAbXVzaWNEZXNjcmlwdGlvbjIubWF4WSArIDE2XG5cdFx0XHRjb2xvcjogXCIjRkZGXCIsIHRleHRBbGlnbjogXCJjZW50ZXJcIlxuXHRcdFx0d2lkdGg6IDI0MFxuXHRcdFx0dGV4dDogJyBJZiB5b3UgZG8gbm90IGVuam95IHdoYXQg4oCoeW91IGhlYXIsIHBsZWFzZSBjaGFuZ2UuJ1xuXG5cblxuXG5cbiMgXHQ4ODg4YmEuODhiYVxuIyBcdDg4ICBgOGIgIGA4YlxuIyBcdDg4ICAgODggICA4OCAuZDg4ODhiLiA4OGQ4ODhiLlxuIyBcdDg4ICAgODggICA4OCA4OCcgIGA4OCA4OCcgIGA4OFxuIyBcdDg4ICAgODggICA4OCA4OC4gIC44OCA4OC4gIC44OFxuIyBcdGRQICAgZFAgICBkUCBgODg4ODhQOCA4OFk4ODhQJ1xuIyBcdCAgICAgICAgICAgICAgICAgICAgICA4OFxuIyBcdCAgICAgICAgICAgICAgICAgICAgICBkUFxuXG5jbGFzcyBNYXAgZXh0ZW5kcyBtZC5QYWdlXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucykgLT5cblx0XHRzdXBlciBfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHR0aGVtZTogZmxvdy50aGVtZVxuXHRcdFx0aGVhZGVyOlxuXHRcdFx0XHR0aXRsZTogJ01hcCdcblx0XHRcdFx0dmlzaWJsZTogdHJ1ZSwgXG5cdFx0XHRcdGljb246ICdhcnJvdy1iYWNrJywgXG5cdFx0XHRcdGljb25BY3Rpb246IC0+IFxuXHRcdFx0XHRcdGZsb3cuc2hvd1ByZXZpb3VzKClcblx0XHRcdFx0XHRAZGVzdHJveSgpXG5cdFx0XG5cdFx0QG1hcCA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEBcblx0XHRcdHNpemU6IEBzaXplXG5cdFx0XHRzY2FsZTogMS41XG5cdFx0XHRicmlnaHRuZXNzOiA4MFxuXHRcdFx0aW1hZ2U6ICdpbWFnZXMvbWFwLnBuZydcblxuXHRcdEBtYXAuZHJhZ2dhYmxlID0gdHJ1ZVxuXG5cdFx0QGZpbmRNZUJveCA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEBcblx0XHRcdHg6IEFsaWduLnJpZ2h0KC04KSwgeTogQWxpZ24uYm90dG9tKC0xNzYpXG5cdFx0XHR3aWR0aDogNDgsIGhlaWdodDogNDhcblx0XHRcdGJhY2tncm91bmRDb2xvcjogJyNlZmVmZWYnXG5cdFx0XHRib3JkZXJSYWRpdXM6IDI0XG5cblx0XHRAZmluZE1lID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQGZpbmRNZUJveFxuXHRcdFx0eDogQWxpZ24uY2VudGVyLCB5OiBBbGlnbi5jZW50ZXJcblx0XHRcdHdpZHRoOiA0MCwgaGVpZ2h0OiA0MFxuXHRcdFx0aW1hZ2U6ICdpbWFnZXMvaWNvbnMvcmFkaW8tYnV0dG9uLW9uLnBuZydcblxuXHRcdEB6b29tQm94ID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQFxuXHRcdFx0eDogQWxpZ24ucmlnaHQoLTgpLCB5OiBBbGlnbi5ib3R0b20oLTY0KVxuXHRcdFx0d2lkdGg6IDQ4LCBoZWlnaHQ6IDk2XG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6ICcjZWZlZmVmJ1xuXHRcdFx0Ym9yZGVyUmFkaXVzOiAyNFxuXG5cdFx0QHpvb21JbiA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEB6b29tQm94XG5cdFx0XHR4OiBBbGlnbi5jZW50ZXIsIHk6IDhcblx0XHRcdHdpZHRoOiA0MCwgaGVpZ2h0OiA0MFxuXHRcdFx0aW1hZ2U6ICdpbWFnZXMvaWNvbnMvYWRkLnBuZydcblxuXHRcdEB6b29tT3V0ID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQHpvb21Cb3hcblx0XHRcdHg6IEFsaWduLmNlbnRlciwgeTogQWxpZ24uYm90dG9tKC04KVxuXHRcdFx0d2lkdGg6IDQwLCBoZWlnaHQ6IDQwXG5cdFx0XHRpbWFnZTogJ2ltYWdlcy9pY29ucy9yZW1vdmUucG5nJ1xuXG5cblxuXG5cbiNcdCA4ODg4ODhiYSAgICAgICAgICAgICAgICAgZFAgb29cbiNcdCAgODggICAgYDhiICAgICAgICAgICAgICAgIDg4XG4jXHQgYTg4YWFhYThQJyAuZDg4ODhiLiAuZDg4OGI4OCBkUCAuZDg4ODhiLlxuI1x0ICA4OCAgIGA4Yi4gODgnICBgODggODgnICBgODggODggODgnICBgODhcbiNcdCAgODggICAgIDg4IDg4LiAgLjg4IDg4LiAgLjg4IDg4IDg4LiAgLjg4XG4jXHQgIGRQICAgICBkUCBgODg4ODhQOCBgODg4ODhQOCBkUCBgODg4ODhQJ1xuXG5cblxuY2xhc3MgUmFkaW8gZXh0ZW5kcyBtZC5QYWdlXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdHRoZW1lOiBmbG93LnRoZW1lXG5cdFx0XHRoZWFkZXI6XG5cdFx0XHRcdHRpdGxlOiAnUmFkaW8nXG5cdFx0XHRcdHZpc2libGU6IHRydWUsIFxuXHRcdFx0XHRpY29uOiAnYXJyb3ctYmFjaycsIFxuXHRcdFx0XHRpY29uQWN0aW9uOiAtPiBcblx0XHRcdFx0XHRmbG93LnNob3dQcmV2aW91cygpXG5cdFx0XHRcdFx0QGRlc3Ryb3koKVxuXG5cdFx0QHJhZGlvSWNvbiA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEBcblx0XHRcdGhlaWdodDogMTUyLCB3aWR0aDogMTUyXG5cdFx0XHR4OiBBbGlnbi5jZW50ZXIsIHk6IEFsaWduLmNlbnRlcigtNjQpXG5cdFx0XHRpbWFnZTogJ2ltYWdlcy9pY29ucy93aWZpLXRldGhlcmluZy5wbmcnXG5cdFx0XHRpbnZlcnQ6IDEwMFxuXG5cdFx0QHJhZGlvTGFiZWwgPSBuZXcgbWQuUmVndWxhclxuXHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEBcblx0XHRcdHg6IEFsaWduLmNlbnRlciwgeTogQHJhZGlvSWNvbi5tYXhZXG5cdFx0XHRjb2xvcjogXCIjRkZGXCIsIHRleHRBbGlnbjogXCJjZW50ZXJcIlxuXHRcdFx0dGV4dDogJ1NlYXJjaGluZyBmb3Igc2lnbmFsLi4uJ1xuXG5cdFx0QHJhZGlvRGVzY3JpcHRpb24gPSBuZXcgbWQuUmVndWxhclxuXHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEBcblx0XHRcdHg6IEFsaWduLmNlbnRlciwgeTogQHJhZGlvTGFiZWwubWF4WSArIDMyXG5cdFx0XHRjb2xvcjogXCIjRkZGXCIsIHRleHRBbGlnbjogXCJjZW50ZXJcIlxuXHRcdFx0d2lkdGg6IDIwMFxuXHRcdFx0dGV4dDogJ1JhZGlvIGlzIG9ubHkgYXZhaWxhYmxlIGluIOKAqGNlcnRhaW4gYXJlYXMgb2YgdGhlIFNwYWNlLidcblxuXG5cbiMgXHQgODg4ODg4YmEgICAgICAgICAgICAgICAgICAgIGRQXG4jIFx0IDg4ICAgIGA4YiAgICAgICAgICAgICAgICAgICA4OFxuIyBcdGE4OGFhYWE4UCcgLmQ4ODg4Yi4gLmQ4ODg4Yi4gODggIC5kUFxuIyBcdCA4OCAgIGA4Yi4gODgnICBgODggODgnICBgODggODg4ODhcIlxuIyBcdCA4OCAgICAuODggODguICAuODggODguICAuODggODggIGA4Yi5cbiMgXHQgODg4ODg4ODhQIGA4ODg4OFAnIGA4ODg4OFAnIGRQICAgYFlQXG4jIFx0XG4jIFx0XG5cbmNsYXNzIEJvb2sgZXh0ZW5kcyBtZC5QYWdlXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdHRoZW1lOiBmbG93LnRoZW1lXG5cdFx0XHRoZWFkZXI6XG5cdFx0XHRcdHRpdGxlOiAnQm9vaydcblx0XHRcdFx0dmlzaWJsZTogdHJ1ZSwgXG5cdFx0XHRcdGljb246ICdhcnJvdy1iYWNrJywgXG5cdFx0XHRcdGljb25BY3Rpb246IC0+IFxuXHRcdFx0XHRcdGZsb3cuc2hvd1ByZXZpb3VzKClcblx0XHRcdFx0XHRAZGVzdHJveSgpXG5cblx0XHRAYm9va0Zsb3cgPSBuZXcgTGF5ZXJcblx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBAY29udGVudFxuXHRcdFx0eDogMTYsIHk6IDk2XG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcdHdpZHRoOiBAd2lkdGggLSAzMlxuXHRcdFx0aGVpZ2h0OiBAaGVpZ2h0ICogMlxuXHRcdFxuXHRcdEBib29rRmxvdy5zdHlsZSA9XG5cdFx0XHRmb250RmFtaWx5OiAnU3RyYXRvcydcblx0XHRcdGZvbnRTaXplOiAnMTZweCdcblx0XHRcdGxpbmVIZWlnaHQ6ICcxLjQnXG5cdFx0XHRjb2xvcjogJyNGRkYnXG5cdFx0XG5cdFx0QGJvb2tGbG93Lmh0bWwgPSBcIlwiXCJGQURFIElOOjxicj48YnI+XG4xIElOVC4gV0FTSElOR1RPTiBNVVNFVU0gLSBEQVkgMTxicj48YnI+XG5UaGUgc2FkZGVzdCBleWVzIHlvdSBldmVyIHNhdy5cbldlIGFyZSBsb29raW5nIGF0IGFuIEVsIEdyZWNvIGRyYXdpbmcuIEl0IGlzIGEgc3R1ZHkgZm9yXG5vbmUgb2YgaGlzIHBhaW50aW5ncy48YnI+PGJyPlxuUFVMTCBCQUNLIFRPIFJFVkVBTCAtLTxicj48YnI+XG5BIGJ1bmNoIG9mIGFydCBzdHVkZW50cyBhcmUgZG9pbmcgc2tldGNoZXMgb2YgdGhlIGV5ZXMsXG50aGUgZWxvbmdhdGVkIGZpbmdlcnMsIHRoZSBzbGVuZGVyIGhhbmRzIEVsIEdyZWNvIGRyZXcgc29cbmJyaWxsaWFudGx5Ljxicj48YnI+XG5Nb3N0IG9mIHRoZSBzdHVkZW50cyBhcmUgYXJvdW5kIDIwLiBBIGNvdXBsZSBvZiBzdWJ1cmJhblxuaG91c2V3aXZlcyBhcmUgdGhlcmUgdG9vLlxuQW5kIG9uZSBvbGRlciBtYW4uPGJyPjxicj5cblRoaXMgaXMgTFVUSEVSIFdISVRORVkuIE1pZCA2MHMsIHZlcnkgZml0LCBuZWF0bHlcbmRyZXNzZWQuIEF0IHF1aWNrIGdsYW5jZSwgaGUgc2VlbXMgYXMgaWYgaGUgbWlnaHQgYmUgYVxuc3VjY2Vzc2Z1bCBjb21wYW55IGV4ZWN1dGl2ZS48YnI+PGJyPlxuQXMgd2Ugd2F0Y2ggaGltIGRyYXcgd2UgY2FuIHRlbGwgaGUgaXMgY2FwYWJsZSBvZiBncmVhdFxuY29uY2VudHJhdGlvbi4gQW5kIHBhdGllbnQuIFdpdGggZXllcyB0aGF0IG1pc3Ncbm5vdGhpbmc6IEhlIGhhcyBwaWxvdOKAmXMgZXllcy48YnI+PGJyPlxuV2XigJlsbCBmaW5kIG91dCBtb3JlIGFib3V0IGhpbSBhcyB0aW1lIGdvZXMgb24sIGJ1dCB0aGlzXG5pcyBhbGwgeW91IHJlYWxseSBoYXZlIHRvIGtub3c6IEx1dGhlciBXaGl0bmV5IGlzIHRoZVxuaGVybyBvZiB0aGlzIHBpZWNlLiBBcyB3ZSB3YXRjaCBoaW0gZHJhdyAtLVxuTHV0aGVy4oCZcyBza2V0Y2hib29rLiBIZSBpcyBmaW5pc2hpbmcgaGlzIHdvcmsgb24gdGhlXG5leWVzLCBhbmQgaGXigJlzIGNhdWdodCB0aGUgc2FkbmVzczogSXTigJlzIGdvb2Qgc3R1ZmYuXG5MdXRoZXIuIEl04oCZcyBub3QgZ29vZCBlbm91Z2ggZm9yIGhpbS4gSGUgbG9va3MgYXQgaGlzXG53b3JrIGEgbW9tZW50LCBzaGFrZXMgaGlzIGhlYWQuPGJyPjxicj5cbkdJUkwgU1RVREVOVDxicj48YnI+XG5Eb27igJl0IGdpdmUgdXAuPGJyPjxicj5cbkxVVEhFUjxicj48YnI+XG5JIG5ldmVyIGRvLjxicj48YnI+XG5HSVJMIFNUVURFTlQ8YnI+PGJyPlxuTWF5IEk/PGJyPjxicj5cblNoZeKAmXMgaW5kaWNhdGVkIGhpcyBza2V0Y2hib29rLiBIZSBub2RzLiBTaGUgc3RhcnRzXG50aHVtYmluZyB0aHJvdWdoLjxicj48YnI+XG5UaGUgc2tldGNoYm9vayBhcyB0aGUgcGFnZXMgdHVybi48YnI+PGJyPlxuRGV0YWlsIHdvcmsuIEV5ZXMgYW5kIGhhbmRzLiBUaGUgZXllcyBhcmUgZ29vZC4gVGhlXG5oYW5kcyBhcmUgYmV0dGVyLiBWZXJ5IHNraWxsZnVsLjxicj48YnI+XG4oQ09OVElOVUVEKTxicj48YnI+XG5cIlwiXCJcblxuXG5cblxuXG5cblxuIyBcdGRQICAgICBkUCAgb28gICAgICAgICAgICBkUFxuIyBcdDg4ICAgICA4OCAgICAgICAgICAgICAgICA4OFxuIyBcdDg4YWFhYWE4OGEgZFAgLmQ4ODg4Yi4gZDg4ODhQIC5kODg4OGIuIDg4ZDg4OGIuIGRQICAgIGRQXG4jIFx0ODggICAgIDg4ICA4OCBZOG9vb29vLiAgIDg4ICAgODgnICBgODggODgnICBgODggODggICAgODhcbiMgXHQ4OCAgICAgODggIDg4ICAgICAgIDg4ICAgODggICA4OC4gIC44OCA4OCAgICAgICA4OC4gIC44OFxuIyBcdGRQICAgICBkUCAgZFAgYDg4ODg4UCcgICBkUCAgIGA4ODg4OFAnIGRQICAgICAgIGA4ODg4UDg4XG4jIFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuODhcbiMgXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZDg4ODhQXG5cblxuY2xhc3MgSGlzdG9yeSBleHRlbmRzIG1kLlBhZ2Vcblx0Y29uc3RydWN0b3I6IChvcHRpb25zKSAtPlxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdHRoZW1lOiBmbG93LnRoZW1lXG5cdFx0XHRoZWFkZXI6XG5cdFx0XHRcdHRpdGxlOiAnSGlzdG9yeSdcblx0XHRcdFx0dmlzaWJsZTogdHJ1ZSwgXG5cdFx0XHRcdGljb246ICdhcnJvdy1iYWNrJywgXG5cdFx0XHRcdGljb25BY3Rpb246IC0+IFxuXHRcdFx0XHRcdGZsb3cuc2hvd1ByZXZpb3VzKClcblx0XHRcdFx0XHRAZGVzdHJveSgpXG5cblxuXG5cblxuXG4jIFx0ZFAgICAgIGRQICAgICAgICAgICBkUFxuIyBcdDg4ICAgICA4OCAgICAgICAgICAgODhcbiMgXHQ4OGFhYWFhODhhIC5kODg4OGIuIDg4IDg4ZDg4OGIuXG4jIFx0ODggICAgIDg4ICA4OG9vb29kOCA4OCA4OCcgIGA4OFxuIyBcdDg4ICAgICA4OCAgODguICAuLi4gODggODguICAuODhcbiMgXHRkUCAgICAgZFAgIGA4ODg4OFAnIGRQIDg4WTg4OFAnXG4jIFx0ICAgICAgICAgICAgICAgICAgICAgICA4OFxuIyBcdCAgICAgICAgICAgICAgICAgICAgICAgZFBcblxuY2xhc3MgSGVscCBleHRlbmRzIG1kLlBhZ2Vcblx0Y29uc3RydWN0b3I6IChvcHRpb25zKSAtPlxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdHRoZW1lOiBmbG93LnRoZW1lXG5cdFx0XHRoZWFkZXI6XG5cdFx0XHRcdHRpdGxlOiAnSGVscCdcblx0XHRcdFx0dmlzaWJsZTogdHJ1ZSwgXG5cdFx0XHRcdGljb246ICdhcnJvdy1iYWNrJywgXG5cdFx0XHRcdGljb25BY3Rpb246IC0+IFxuXHRcdFx0XHRcdGZsb3cuc2hvd1ByZXZpb3VzKClcblx0XHRcdFx0XHRAZGVzdHJveSgpXG5cblxuXHRcdEBoZWxwSWNvbiA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEBcblx0XHRcdGhlaWdodDogMTUyLCB3aWR0aDogMTUyXG5cdFx0XHR4OiBBbGlnbi5jZW50ZXIsIHk6IEFsaWduLmNlbnRlcigtMTI4KVxuXHRcdFx0aW1hZ2U6ICdpbWFnZXMvaWNvbnMvd2FybmluZy5wbmcnXG5cdFx0XHRpbnZlcnQ6IDEwMFxuXG5cdFx0QGhlbHBMYWJlbCA9IG5ldyBtZC5SZWd1bGFyXG5cdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQFxuXHRcdFx0eDogQWxpZ24uY2VudGVyLCB5OiBAaGVscEljb24ubWF4WVxuXHRcdFx0Y29sb3I6IFwiI0ZGRlwiLCB0ZXh0QWxpZ246IFwiY2VudGVyXCJcblx0XHRcdHRleHQ6ICdEbyB5b3UgbmVlZCBoZWxwPydcblxuXHRcdEBoZWxwRGVzY3JpcHRpb24gPSBuZXcgbWQuUmVndWxhclxuXHRcdFx0bmFtZTogJy4nLCBwYXJlbnQ6IEBcblx0XHRcdHg6IEFsaWduLmNlbnRlciwgeTogQGhlbHBMYWJlbC5tYXhZICsgMTZcblx0XHRcdGNvbG9yOiBcIiNGRkZcIiwgdGV4dEFsaWduOiBcImNlbnRlclwiXG5cdFx0XHR3aWR0aDogMjgwXG5cdFx0XHR0ZXh0OiAnQ2hhdCBub3cgd2l0aCBvbmUgb2Ygb3VyIG9wZXJhdG9ycy4nXG5cblx0XHRAbmVlZEhlbHAgPSBuZXcgbWQuVGl0bGVcblx0XHRcdG5hbWU6ICcuJywgcGFyZW50OiBAXG5cdFx0XHR0ZXh0OiAnSSBORUVEIEhFTFAnXG5cdFx0XHR0ZXh0QWxpZ246ICdjZW50ZXInXG5cdFx0XHR4OiBBbGlnbi5jZW50ZXIsIHk6IEBoZWxwRGVzY3JpcHRpb24ubWF4WSArIDY0XG5cdFx0XHRjb2xvcjogJ3JnYmEoMjU1LCAwLCAwLCAxKSdcblxuXHRcdEBuZWVkSGVscC5vblRhcCAtPiBudWxsICMgVE9ETywgYmVnaW4gYXNzaXN0YW5jZSBjaGF0XG5cblx0XHRAY2FuY2VsID0gbmV3IG1kLlRpdGxlXG5cdFx0XHRuYW1lOiAnLicsIHBhcmVudDogQFxuXHRcdFx0dGV4dDogJ0NBTkNFTCdcblx0XHRcdHRleHRBbGlnbjogJ2NlbnRlcidcblx0XHRcdHg6IEFsaWduLmNlbnRlciwgeTogQG5lZWRIZWxwLm1heFkgKyA0OFxuXHRcdFx0Y29sb3I6ICcjQ0NDJ1xuXG5cdFx0QGNhbmNlbC5vblRhcCAtPiBmbG93LnNob3dQcmV2aW91cygpXG5cblxubWVudU92ZXJsYXkgPSBuZXcgTWVudU92ZXJsYXlcbmRhc2hib2FyZCA9IG5ldyBEYXNoYm9hcmRcblxuZmxvdy5zaG93TmV4dChkYXNoYm9hcmQpXG4jIGZsb3cuc2hvd05leHQobmV3IE1hcClcblxuIiwiXG4jIFx0ICAgICAgZFAgICAgICAgICAgICBkUCAgICAgICAgICAgIGRQXG4jIFx0ICAgICAgODggICAgICAgICAgICA4OCAgICAgICAgICAgIDg4XG4jIFx0LmQ4ODhiODggLmQ4ODg4Yi4gZDg4ODhQIC5kODg4OGIuIDg4ZDg4OGIuIC5kODg4OGIuIC5kODg4OGIuIC5kODg4OGIuXG4jIFx0ODgnICBgODggODgnICBgODggICA4OCAgIDg4JyAgYDg4IDg4JyAgYDg4IDg4JyAgYDg4IFk4b29vb28uIDg4b29vb2Q4XG4jIFx0ODguICAuODggODguICAuODggICA4OCAgIDg4LiAgLjg4IDg4LiAgLjg4IDg4LiAgLjg4ICAgICAgIDg4IDg4LiAgLi4uXG4jIFx0YDg4ODg4UDggYDg4ODg4UDggICBkUCAgIGA4ODg4OFA4IDg4WTg4ODgnIGA4ODg4OFA4IGA4ODg4OFAnIGA4ODg4OFAnXG5cblxuZGF0YWJhc2UgPVxuXG5cdGNoYXRCdWJibGVzOiBbXVxuXG5cdGNob2ljZXM6XG5cdFx0bGFuZ3VhZ2U6IHVuZGVmaW5lZFxuXHRcdHJ1bGUxOiB1bmRlZmluZWRcblx0XHRydWxlMjogdW5kZWZpbmVkXG5cdFx0cnVsZTM6IHVuZGVmaW5lZFxuXHRcdGVhcmx5RXhpdDE6IHVuZGVmaW5lZFxuXHRcdGVhcmx5RXhpdDI6IHVuZGVmaW5lZFxuXG5cdHJlbW92ZUNoYXRCdWJibGU6IChjaGF0QnViYmxlKSAtPlxuXHRcdF8ucHVsbChAY2hhdEJ1YmJsZXMsIGNoYXRCdWJibGUpXG5cdFx0Y2hhdEJ1YmJsZS5kZXN0cm95KClcblxuXHR1c2VyOlxuXHRcdG5hbWU6ICdWaWN0b3IgSXZhbm92aWNoJ1xuXHRcdGFnZTogNDJcblx0XHRzZXg6IFwiTVwiXG5cdFx0aW1hZ2U6IFwiaW1hZ2VzL3VzZXIucG5nXCJcblx0XHRsYW5ndWFnZXM6IFtcImVuZ2xpc2hcIiwgXCJnZXJtYW5cIl1cblx0XHRoaXN0b3J5OiBbXVxuXHRcdG5vdGU6IFwiV2hlbiB5b3UgbG9vayBhdCBpdCwgaXQgbG9va3MgbGlrZSBhbnkgb3RoZXIgcGllY2Ugb2YgbGFuZC4gVGhlIHN1biBzaGluZXMgb24gaXQgbGlrZSBvbiBhbnkgb3RoZXIgcGFydCBvZiB0aGUgZWFydGguIEFuZCBpdCdzIGFzIHRob3VnaCBub3RoaW5nIGhhZCBwYXJ0aWN1bGFybHkgY2hhbmdlZCBpbiBpdC4gTGlrZSBldmVyeXRoaW5nIHdhcyB0aGUgd2F5IGl0IHdhcyB0aGlydHlcbnllYXJzIGFnby4gTXkgZmF0aGVyLCByZXN0IGhpcyBzb3VsLCBjb3VsZCAgbG9vayBhdCBpdCBhbmQgbm90IG5vdGljZSBhbnl0aGluZyBvdXQgb2YgcGxhY2UgYXQgYWxsLiBFeGNlcHQgbWF5YmVcIlxuXG5cdGFkZEhpc3Rvcnk6IChpdGVtKSAtPlxuXHRcdEB1c2VyLmhpc3RvcnkucHVzaChpdGVtKVxuXHRcdGl0ZW0udGltZVN0YW1wID0gXy5ub3coKVxuXG5cdGludml0YXRpb25zOiBbXVxuXHRldmVudHM6IFtdXG5cdGxvY2F0aW9uczogW11cblxuXG5cbmV4cG9ydHMuZGF0YWJhc2UgPSBkYXRhYmFzZVxuXG5cblxuIyBcdGRQICAgICAgICAgICAgICAgICAgIG9vICAgZFAgICAgICAgICAgICAgIGRQICAgb29cbiMgXHQ4OCAgICAgICAgICAgICAgICAgICAgICAgIDg4ICAgICAgICAgICAgICA4OFxuIyBcdDg4IDg4ZDg4OGIuIGRQICAgLmRQIGRQIGQ4ODg4UCAuZDg4ODhiLiBkODg4OFAgZFAgLmQ4ODg4Yi4gODhkODg4Yi5cbiMgXHQ4OCA4OCcgIGA4OCA4OCAgIGQ4JyA4OCAgIDg4ICAgODgnICBgODggICA4OCAgIDg4IDg4JyAgYDg4IDg4JyAgYDg4XG4jIFx0ODggODggICAgODggODggLjg4JyAgODggICA4OCAgIDg4LiAgLjg4ICAgODggICA4OCA4OC4gIC44OCA4OCAgICA4OFxuIyBcdGRQIGRQICAgIGRQIDg4ODhQJyAgIGRQICAgZFAgICBgODg4ODhQOCAgIGRQICAgZFAgYDg4ODg4UCcgZFAgICAgZFBcbiMgXHRcbiMgXHRcblxuY2xhc3MgSW52aXRhdGlvblxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMpIC0+XG5cdFx0QG5hbWUgPSBvcHRpb25zLm5hbWUgPyAnTmV3IEludml0YXRpb24nXG5cdFx0QGV2ZW50ID0gb3B0aW9ucy5ldmVudCA/IG5ldyBFdmVudFxuXHRcdEBsb2NhdGlvbiA9IEBldmVudC5sb2NhdGlvblxuXHRcdEBzdGFydFRpbWUgPSBAZXZlbnQuc3RhcnRUaW1lXG5cblxuXG4jIFx0ZFAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZFAgICBvb1xuIyBcdDg4ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDg4XG4jIFx0ODggICAgICAgIC5kODg4OGIuIC5kODg4OGIuIC5kODg4OGIuIGQ4ODg4UCBkUCAuZDg4ODhiLiA4OGQ4ODhiLlxuIyBcdDg4ICAgICAgICA4OCcgIGA4OCA4OCcgIGBcIlwiIDg4JyAgYDg4ICAgODggICA4OCA4OCcgIGA4OCA4OCcgIGA4OFxuIyBcdDg4ICAgICAgICA4OC4gIC44OCA4OC4gIC4uLiA4OC4gIC44OCAgIDg4ICAgODggODguICAuODggODggICAgODhcbiMgXHQ4ODg4ODg4OFAgYDg4ODg4UCcgYDg4ODg4UCcgYDg4ODg4UDggICBkUCAgIGRQIGA4ODg4OFAnIGRQICAgIGRQXG5cbmNsYXNzIExvY2F0aW9uXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucykgLT5cblx0XHRAbmFtZSA9IG9wdGlvbnMubmFtZSA/ICdMb2NhdGlvbidcblxuXG5cbiMgXHQgODg4ODg4ODhiICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZFBcbiMgXHQgODggICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgODhcbiMgXHRhODhhYWFhICAgIGRQICAgLmRQIC5kODg4OGIuIDg4ZDg4OGIuIGQ4ODg4UFxuIyBcdCA4OCAgICAgICAgODggICBkOCcgODhvb29vZDggODgnICBgODggICA4OFxuIyBcdCA4OCAgICAgICAgODggLjg4JyAgODguICAuLi4gODggICAgODggICA4OFxuIyBcdCA4ODg4ODg4OFAgODg4OFAnICAgYDg4ODg4UCcgZFAgICAgZFAgICBkUFxuXG5cbmNsYXNzIEV2ZW50XG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucykgLT5cblx0XHRAbmFtZSA9IG9wdGlvbnMubmFtZSA/ICdOZXcgRXZlbnQnXG5cdFx0QGxvY2F0aW9uID0gb3B0aW9ucy5sb2NhdGlvbiA/IG5ldyBMb2NhdGlvblxuXHRcdEBzdGFydFRpbWUgPSBvcHRpb25zLnN0YXJ0VGltZSA/IG5ldyBEYXRlKF8ubm93KCkgKyAzNjAwMDApXG5cblxuXG5cblxuIiwiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFPQUE7QURTQSxJQUFBOztBQUFBLFFBQUEsR0FFQztFQUFB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
