var SideMMyDesk;

(function() {
  'use strict';

  SideMMyDesk = function() {
  };

  SideMMyDesk.prototype = {
    TITLE: 'SideM Generator',
    FONT: 'sans-serif',

    BACKGROUND: {
      WIDTH: 640,
      HEIGHT: 586,
      COLOR: 'black'
    },

    BALLOON: {
      WIDTH: 616,
      HEIGHT: 82,
      COLOR: 'white',
      BORDER: {
        WIDTH: 4
      },
      RADIUS: 15,
      SHADOW: {
        COLOR: 'white',
        BLUR: 7,
        OFFSET: {
          X: 0,
          Y: 0
        }
      },
      ARROW: {
        WIDTH: 32,
        HEIGHT: 32
      },
      NAME: {
        FONT_SIZE: 20,
        LEFT: 16,
        BASELINE: 28,
        SHADOW: {
          LIGHT: {
            COLOR: 'white',
            BLUR: 2,
            OFFSET: {
              X: 2,
              Y: 2
            }
          },
          DARK: {
            COLOR: '#AAA',
            BLUR: 4,
            OFFSET: {
              X: 3,
              Y: 3
            }
          }
        }
      },
      LINE: {
        FONT_SIZE: 26,
        LEFT: 16,
        BASELINE: 16,
        SHADOW: {
          LIGHT: {
            COLOR: 'white',
            BLUR: 2,
            OFFSET: {
              X: 1,
              Y: 1
            }
          },
          DARK: {
            COLOR: '#CCC',
            BLUR: 4,
            OFFSET: {
              X: 3,
              Y: 3
            }
          }
        },
      }
    },
    TOP_BALLOON: {
      COLOR: 'rgb(0, 149, 59)',
      LEFT: 12,
      TOP: 14,
      ARROW: {
        LEFT: 546,
        TOP: 76,
      }
    },
    BOTTOM_BALLOON: {
      COLOR: 'rgb(0, 15, 158)',
      LEFT: 12,
      TOP: 482,
      ARROW: {
        LEFT: 424,
        TOP: 470,
      }
    },
    FRAMES: [
      {
        CORNER: [[480, 84], [498, 483], [640, 483], [640, 84]],
        CENTER: [563, 284],
        IMAGE_CENTER: [563, 284]
      },
      {
        CORNER: [[338, 84], [314, 483], [486, 483], [468, 84]],
        CENTER: [400, 284],
        IMAGE_CENTER: [400, 284]
      },
      {
        CORNER: [[154, 84], [173, 297], [312, 312], [326, 84]],
        CENTER: [240, 184],
        IMAGE_CENTER: [240, 284]
      },
      {
        CORNER: [[0, 84], [0, 277], [160, 295], [142, 84]],
        CENTER: [74, 184],
        IMAGE_CENTER: [74, 284]
      },
      {
        CORNER: [[0, 290], [0, 483], [301, 483], [311, 325]],
        CENTER: [155, 405],
        IMAGE_CENTER: [155, 484]
      },
    ],

    images: [
      {
        data: null,
        width: 0,
        height: 0,
        ratio: 1,
        x: 0,
        y: 0
      },
      {
        data: null,
        width: 0,
        height: 0,
        ratio: 1,
        x: 0,
        y: 0
      },
      {
        data: null,
        width: 0,
        height: 0,
        ratio: 1,
        x: 0,
        y: 0
      },
      {
        data: null,
        width: 0,
        height: 0,
        ratio: 1,
        x: 0,
        y: 0
      },
      {
        data: null,
        width: 0,
        height: 0,
        ratio: 1,
        x: 0,
        y: 0
      },
    ],

    names: ["", ""],
    lines: ["", ""],

    _fillRoundRect: function(left, top, width, height, radius) {
      var pi = Math.PI;
      this.ctx.save();

      this.ctx.beginPath();
      this.ctx.arc(left + radius, top + radius, radius, -pi, -0.5 * pi, false);
      this.ctx.arc(left + width - radius, top + radius, radius, - 0.5 * pi, 0, false);
      this.ctx.arc(left + width - radius, top + height - radius, radius, 0, 0.5 * pi, false);
      this.ctx.arc(left + radius, top + height - radius, radius, 0.5 * pi, pi, false);
      this.ctx.closePath();
      this.ctx.fill();

      this.ctx.restore();
    },

    _setPath: function(pos) {
      this.ctx.beginPath();

      for (var i = 0; i < pos.length; i++) {
        if (i === 0) {
          this.ctx.moveTo(pos[i][0], pos[i][1]);
        } else {
          this.ctx.lineTo(pos[i][0], pos[i][1]);
        }
      }

        this.ctx.closePath();
    },

    _fillPolygon: function(pos) {
      this.ctx.save();

      this._setPath(pos);
      this.ctx.fill();

      this.ctx.restore();
    },

    _clipPolygon: function(pos) {
      this._setPath(pos);
      this.ctx.clip();
    },

    _drawString: function(str, x, y, font, color, textAlign, textBaseline) {
      var f = (typeof font === 'undefined' ? '' : font);
      var c = (typeof color === 'undefined' ? 'black' : color);
      var a = (typeof textAlign === 'undefined' ? 'start' : textAlign);
      var b = (typeof textBaseline === 'undefined' ? 'alphabetic' : textBaseline);

      this.ctx.save();

      this.ctx.font = f;
      this.ctx.fillStyle = c;
      this.ctx.textAlign = a;
      this.ctx.textBaseline = b;
      this.ctx.fillText(str, x, y);

      this.ctx.restore();
    },

    _drawBackground: function() {
      this.ctx.save();

      this.ctx.fillStyle = this.BACKGROUND.COLOR;
      this.ctx.fillRect(0, 0, this.BACKGROUND.WIDTH, this.BACKGROUND.HEIGHT);

      this.ctx.restore();
    },

    _drawBalloon: function(left, top, arrowLeft, arrowTop, color) {
      var aw2 = this.BALLOON.ARROW.WIDTH / 2;
      var ah2 = this.BALLOON.ARROW.HEIGHT / 2;
      var abw = this.BALLOON.BORDER.WIDTH * Math.sqrt(2);
      var b2 = this.BALLOON.BORDER.WIDTH * 2;

      this.ctx.save();

      this.ctx.shadowColor = this.BALLOON.SHADOW.COLOR;
      this.ctx.shadowBlur = this.BALLOON.SHADOW.BLUR;
      this.ctx.shadowOffsetX = this.BALLOON.SHADOW.OFFSET.X;
      this.ctx.shadowOffsetY = this.BALLOON.SHADOW.OFFSET.Y;

      this.ctx.fillStyle = color;
      this._fillRoundRect(left, top, this.BALLOON.WIDTH, this.BALLOON.HEIGHT, this.BALLOON.RADIUS);

      this.ctx.restore();
      this.ctx.save();

      this.ctx.fillStyle = color;
      this._fillPolygon([
        [arrowLeft,                                 arrowTop + ah2],
        [arrowLeft + aw2,                           arrowTop + this.BALLOON.ARROW.HEIGHT],
        [arrowLeft + this.BALLOON.ARROW.WIDTH,      arrowTop + ah2],
        [arrowLeft + aw2,                           arrowTop]
      ]);

      this.ctx.fillStyle = this.BALLOON.COLOR;
      this._fillRoundRect(
        left + this.BALLOON.BORDER.WIDTH,
        top + this.BALLOON.BORDER.WIDTH,
        this.BALLOON.WIDTH - b2,
        this.BALLOON.HEIGHT - b2,
        this.BALLOON.RADIUS - this.BALLOON.BORDER.WIDTH
      );

      this._fillPolygon([
        [arrowLeft + abw,                           arrowTop + ah2],
        [arrowLeft + aw2,                           arrowTop + this.BALLOON.ARROW.HEIGHT - abw],
        [arrowLeft + this.BALLOON.ARROW.WIDTH -abw, arrowTop + ah2],
        [arrowLeft + aw2,                           arrowTop + abw]
      ]);

      this.ctx.restore();
    },

    _drawName: function(BalloonLeft, BalloonTop, name, color) {
      if (typeof name === null) return;

      this.ctx.save();

      this.ctx.shadowColor = this.BALLOON.NAME.SHADOW.DARK.COLOR;
      this.ctx.shadowBlur = this.BALLOON.NAME.SHADOW.DARK.BLUR;
      this.ctx.shadowOffsetX = this.BALLOON.NAME.SHADOW.DARK.OFFSET.X;
      this.ctx.shadowOffsetY = this.BALLOON.NAME.SHADOW.DARK.OFFSET.Y;
      this._drawString(
        name,
        BalloonLeft + this.BALLOON.NAME.LEFT,
        BalloonTop + this.BALLOON.NAME.BASELINE,
        'bold ' + this.BALLOON.NAME.FONT_SIZE + 'px ' + this.FONT,
        'white',
        'left'
      );

      this.ctx.restore();
      this.ctx.save();

      this.ctx.shadowColor = this.BALLOON.NAME.SHADOW.LIGHT.COLOR;
      this.ctx.shadowBlur = this.BALLOON.NAME.SHADOW.LIGHT.BLUR;
      this.ctx.shadowOffsetX = this.BALLOON.NAME.SHADOW.LIGHT.OFFSET.X;
      this.ctx.shadowOffsetY = this.BALLOON.NAME.SHADOW.LIGHT.OFFSET.Y;
      this._drawString(
        name,
        BalloonLeft + this.BALLOON.NAME.LEFT,
        BalloonTop + this.BALLOON.NAME.BASELINE,
        'bold ' + this.BALLOON.NAME.FONT_SIZE + 'px ' + this.FONT,
        color,
        'left'
      );

      this.ctx.restore();
    },

    _drawLine: function(BalloonLeft, BalloonBottom, line, color) {
      if (typeof line === null) return;

      this.ctx.save();

      this.ctx.shadowColor = this.BALLOON.LINE.SHADOW.DARK.COLOR;
      this.ctx.shadowBlur = this.BALLOON.LINE.SHADOW.DARK.BLUR;
      this.ctx.shadowOffsetX = this.BALLOON.LINE.SHADOW.DARK.OFFSET.X;
      this.ctx.shadowOffsetY = this.BALLOON.LINE.SHADOW.DARK.OFFSET.Y;
      this._drawString(
        line,
        BalloonLeft + this.BALLOON.LINE.LEFT,
        BalloonBottom - this.BALLOON.LINE.BASELINE,
        'bold ' + this.BALLOON.LINE.FONT_SIZE + 'px ' + this.FONT,
        'white',
        'left'
      );

      this.ctx.restore();
      this.ctx.save();

      this.ctx.shadowColor = this.BALLOON.LINE.SHADOW.LIGHT.COLOR;
      this.ctx.shadowBlur = this.BALLOON.LINE.SHADOW.LIGHT.BLUR;
      this.ctx.shadowOffsetX = this.BALLOON.LINE.SHADOW.LIGHT.OFFSET.X;
      this.ctx.shadowOffsetY = this.BALLOON.LINE.SHADOW.LIGHT.OFFSET.Y;
      this._drawString(
        line,
        BalloonLeft + this.BALLOON.LINE.LEFT,
        BalloonBottom - this.BALLOON.LINE.BASELINE,
        'bold ' + this.BALLOON.LINE.FONT_SIZE + 'px ' + this.FONT,
        color,
        'left'
      );

      this.ctx.restore();
    },

    _drawTopBalloon: function() {
      if (this.names[0] == '' && this.lines[0] == '') return;

      this._drawBalloon(this.TOP_BALLOON.LEFT, this.TOP_BALLOON.TOP, this.TOP_BALLOON.ARROW.LEFT, this.TOP_BALLOON.ARROW.TOP, this.TOP_BALLOON.COLOR);
      this._drawName(this.TOP_BALLOON.LEFT, this.TOP_BALLOON.TOP, this.names[0], this.TOP_BALLOON.COLOR);
      this._drawLine(this.TOP_BALLOON.LEFT, this.TOP_BALLOON.TOP + this.BALLOON.HEIGHT, this.lines[0], 'black');
    },

    _drawBottomBalloon: function() {
      if (this.names[1] == '' && this.lines[1] == '') return;

      this._drawBalloon(this.BOTTOM_BALLOON.LEFT, this.BOTTOM_BALLOON.TOP, this.BOTTOM_BALLOON.ARROW.LEFT, this.BOTTOM_BALLOON.ARROW.TOP, this.BOTTOM_BALLOON.COLOR);
      this._drawName(this.BOTTOM_BALLOON.LEFT, this.BOTTOM_BALLOON.TOP, this.names[1], this.BOTTOM_BALLOON.COLOR);
      this._drawLine(this.BOTTOM_BALLOON.LEFT, this.BOTTOM_BALLOON.TOP + this.BALLOON.HEIGHT, this.lines[1], 'black');
    },

    _drawWhiteFrame: function(frame) {
      this.ctx.save();

      this.ctx.fillStyle = 'white';

      var charCode = '1'.charCodeAt(0);

      this._fillPolygon(this.FRAMES[frame].CORNER);
      this._drawString(String.fromCharCode(charCode + frame), this.FRAMES[frame].CENTER[0], this.FRAMES[frame].CENTER[1], '50px ' + this.FONT, '#888', 'center', 'middle');

      this.ctx.restore();
    },

    _drawFrame: function(frame) {
      if (!this.images[frame].data) {
        this._drawWhiteFrame(frame);
        return;
      }

      var w = this.images[frame].width * this.images[frame].ratio;
      var h = this.images[frame].height * this.images[frame].ratio;

      this.ctx.save();

      this._clipPolygon(this.FRAMES[frame].CORNER);
      this.ctx.drawImage(
        this.images[frame].data,
        this.images[frame].x - (w / 2),
        this.images[frame].y - (h / 2),
        w,
        h
      );

      this.ctx.restore();
    },

    _drawSource: function() {
      this._drawString(this.TITLE, this.BACKGROUND.WIDTH - 5, this.BACKGROUND.HEIGHT - 2, '12 px ' + this.FONT, '#FFF', 'right', 'bottom');
    },

    setCanvas: function(canvas) {
      this.canvas = canvas;
      this.ctx = this.canvas.getContext('2d');

      return this;
    },

    drawBase: function() {
      var i;

      this._drawBackground();

      for (i = 0; i < this.FRAMES.length; i++) {
        this._drawWhiteFrame(i);
      }

      this._drawTopBalloon();
      this._drawBottomBalloon();
      this._drawSource();

      return this;
    },

    draw: function() {
      var i;

      this._drawBackground();

      for (i = 0; i < this.FRAMES.length; i++) {
        this._drawFrame(i);
      }

      this._drawTopBalloon();
      this._drawBottomBalloon();
      this._drawSource();

      return this;
    },

    setImage: function(frame, image) {
      var w = this.images[frame].width = image.width;
      var h = this.images[frame].height = image.height;
      var r = 1;

      if (h > 400) {
        r = 400 / h;
      }

      this.images[frame].data = image;
      this.images[frame].ratio = r;
      this.images[frame].x = this.FRAMES[frame].IMAGE_CENTER[0];
      this.images[frame].y = this.FRAMES[frame].IMAGE_CENTER[1];

      this.draw();

      return this;
    },

    setName: function(frame, name) {
      this.names[frame] = name;
      this.draw();

      return this;
    },

    setLine: function(frame, line) {
      this.lines[frame] = line;
      this.draw();

      return this;
    },

    isPointInFrame: function(x, y) {
      var i, result = null;

      this.ctx.save();

      for (i = 0; i < this.FRAMES.length; i++) {
        this._setPath(this.FRAMES[i].CORNER);
        if (this.ctx.isPointInPath(x, y)) {
          result = i;
          break;
        }
      }

      this.ctx.restore();
      return result;
    },

    isDraggablePosition: function(x, y) {
      var frame = this.isPointInFrame(x, y);
      if (frame === null) {
        return false;
      }

      return (this.images[frame].data !== null);
    },

    isDraggableFrame: function(frame) {
      return (typeof this.images[frame] !== 'undefined' && this.images[frame].data !== null);
    },

    moveFramePosition: function(frame, x, y) {
      this.images[frame].x += x;
      this.images[frame].y += y;
      this.draw();
    },

    zoomFrame: function(frame, inout) {
      var newRatio = this.images[frame].ratio + inout;
      if (newRatio > 0) {
        this.images[frame].ratio = newRatio;
      }

      this.draw();
    },

    toDataURL: function() {
      return this.canvas.toDataURL('image/jpeg');
    }
  };
})();
