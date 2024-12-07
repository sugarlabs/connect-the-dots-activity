define(function (require) {
  var activity = require("sugar-web/activity/activity");
  var icon = require("sugar-web/graphics/icon");
  require("easel");
  require("handlebars");
  var shapes = require("activity/shapes");

  // Manipulate the DOM only when it is ready.
  require(["domReady!"], function (doc) {
    // Initialize the activity.
    activity.setup();

    // Colorize the activity icon.
    var activityButton = document.getElementById("activity-button");
    activity.getXOColor(function (error, colors) {
      icon.colorize(activityButton, colors);
    });

    // Initialize the main applicaton
    var app = new DrawingApp();
    app.init();
  });

  function DrawingApp() {
    this.canvas = null;
    this.stage = null;
    this.drawingCanvas = null;
    this.oldPt = null;
    this.midPt = null;
    this.oldMidPt = null;
    this.color = null;
    this.stroke = null;
    this.colors = [
      "#D0033C",
      "#01A4A9",
      "#E9510E",
      "#CCCE01",
      "#FDC415",
      "#E1338C",
    ];
    this.index = 0;
    this.update = true;
    this.imagepos = [];
    this.myimages = [];
    this.bitmaps = [];
    this.bitmapLabels = [];
    this.pen_bitmap = null;
    this.nlabels = [];
    this.shape = 0;
    this.Star = "images/star.svg";
    this.Dot = "images/dot.svg";
    this.Pen = "images/pen.svg";
  }

  DrawingApp.prototype.init = function () {
    if (window.top != window) {
      document.getElementById("header").style.display = "none";
    }
    document.getElementById("loader").className = "loader";

    this.canvas = document.getElementById("myCanvas");
    this.stage = new createjs.Stage(this.canvas);
    createjs.Touch.enable(this.stage);
    this.stage.mouseMoveOutside = true;
    this.stage.enableMouseOver(10);

    this.oldPt = new createjs.Point(400, 300);
    this.midPt = this.oldPt;
    this.oldMidPt = this.oldPt;

    for (var i = 0; i < 21; i++) {
      this.imagepos[i] = [-100, -100];
      this.nlabels[i] = document.getElementById("n" + i.toString());
    }

    // Load images
    this.loadImages();

    // Drawing canvas
    this.drawingCanvas = new createjs.Shape();
    this.stage.addChild(this.drawingCanvas);
    this.stage.update();
    // (Further commits will add image loading and event setup here)
  };

  DrawingApp.prototype.loadImages = function () {
    var self = this;

    // Load the dot and star images
    for (var i = 0; i < this.nlabels.length; i++) {
      var image = new Image();
      image.dataId = i;
      image.src = i === 0 ? this.Star : this.Dot;
      image.onload = function (event) {
        self.handleImageLoad(event);
      };
      this.myimages.push(image);
    }

    // Load the pen image
    var penImage = new Image();
    penImage.src = this.Pen;
    penImage.onload = function (event) {
      self.handlePenLoad(event);
    };
  };

  DrawingApp.prototype.handleImageLoad = function (event) {
    var image = event.target;
    var imgW = image.width;
    var imgH = image.height;
    var i = image.dataId;

    var container = new createjs.Container();
    this.stage.addChild(container);

    // Create bitmap and text label
    var bitmap = new createjs.Bitmap(image);
    var bitText = new createjs.Text(i.toString(), "bold 20px Arial", "#000");
    this.bitmaps[i] = bitmap;
    this.bitmapLabels[i] = bitText;

    container.addChild(bitmap);
    container.addChild(bitText);

    // Set initial positions
    bitmap.x = this.imagepos[i][0];
    bitmap.y = this.imagepos[i][1];
    bitText.x = bitmap.x;
    bitText.y = bitmap.y;

    // Set registration point and scale
    bitmap.regX = imgW / 2;
    bitmap.regY = imgH / 2;
    bitmap.scaleX = bitmap.scaleY = bitmap.scale = i === 0 ? 0.5 : 1.5;

    // Set hit area
    var hitArea = new createjs.Shape();
    hitArea.graphics.beginFill("#FFF").drawEllipse(-11, -14, 24, 18);
    hitArea.x = imgW / 2;
    hitArea.y = imgH / 2;
    bitmap.hitArea = hitArea;

    // Set cursor
    bitmap.cursor = "pointer";

    document.getElementById("loader").className = "";
    createjs.Ticker.addEventListener("tick", this.tick.bind(this));
  };

  DrawingApp.prototype.handlePenLoad = function (event) {
    var self = this;
    var image = event.target;
    var imgW = image.width;
    var imgH = image.height;

    var container = new createjs.Container();
    this.stage.addChild(container);

    // Create pen bitmap
    var bitmap = new createjs.Bitmap(image);
    this.pen_bitmap = bitmap;
    container.addChild(bitmap);

    // Set initial position and registration point
    bitmap.x = this.imagepos[0][0];
    bitmap.y = this.imagepos[0][1];
    bitmap.regX = imgW / 2;
    bitmap.regY = imgH / 2;
    bitmap.scaleX = bitmap.scaleY = bitmap.scale = 1;

    // Set hit area
    var hitArea = new createjs.Shape();
    hitArea.graphics.beginFill("#FFF").drawEllipse(-22, -28, 48, 36);
    hitArea.x = imgW / 2;
    hitArea.y = imgH / 2;
    bitmap.hitArea = hitArea;

    // Set cursor
    bitmap.cursor = "pointer";

    // Event handlers
    (function (target) {
      target.onPress = function (evt) {
        // Bring the target to the front
        container.addChild(target);
        var offset = {
          x: target.x - evt.stageX,
          y: target.y - evt.stageY,
        };

        // Initialize drawing variables
        self.color = self.colors[self.index++ % self.colors.length];
        self.stroke = (Math.random() * 30 + 10) | 0;
        self.oldPt = new createjs.Point(self.stage.mouseX, self.stage.mouseY);
        self.oldMidPt = self.oldPt;

        evt.onMouseMove = function (ev) {
          target.x = ev.stageX + offset.x;
          target.y = ev.stageY + offset.y;
          self.update = true;

          var midPt = new createjs.Point(
            (self.oldPt.x + self.stage.mouseX) >> 1,
            (self.oldPt.y + self.stage.mouseY) >> 1
          );
          self.drawingCanvas.graphics
            .setStrokeStyle(self.stroke, "round", "round")
            .beginStroke(self.color)
            .moveTo(midPt.x, midPt.y)
            .curveTo(
              self.oldPt.x,
              self.oldPt.y,
              self.oldMidPt.x,
              self.oldMidPt.y
            );

          self.oldPt.x = self.stage.mouseX;
          self.oldPt.y = self.stage.mouseY;
          self.oldMidPt.x = midPt.x;
          self.oldMidPt.y = midPt.y;
        };
      };

      target.onMouseOver = function () {
        target.scaleX = target.scaleY = target.scale * 1.2;
        self.update = true;
      };

      target.onMouseOut = function () {
        target.scaleX = target.scaleY = target.scale;
        self.update = true;
      };
    })(bitmap);

    document.getElementById("loader").className = "";
    createjs.Ticker.addEventListener("tick", this.tick.bind(this));
  };
});
