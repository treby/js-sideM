var SideMMyDeskUI;

(function() {
  'use strict';

  SideMMyDeskUI = function() {
  };

  SideMMyDeskUI.prototype = {
    sidem: null,
    dragging: null,
    prevX: 0,
    prevY: 0,

    _doNothing: function(evt) {
      evt.stopPropagation();
      evt.preventDefault();
    },

    _getLocalImage: function(file, image) {
      if (typeof file !== 'undefined') {
        if (!file.type.match(/^image\/(png|jpeg|gif)$/)) return;

        var reader = new FileReader();

        reader.addEventListener('load', function(evt) {
          image.src = evt.target.result;
        }, false);

        reader.readAsDataURL(file);
      }
    },

    _onDrop: function() {
      var self = this;
      return (function(evt) {
        self._doNothing(evt);

        var pos = self._getCursorPositionInCanvas(evt);
        var frame = self.sidem.isPointInFrame(pos.x, pos.y);

        if (frame === null) return;

        var dt = evt.dataTransfer;
        var image = new Image();

        image.addEventListener('load', function() {
          self.sidem.setImage(frame, image);
        }, false);

        self._getLocalImage(dt.files[0], image);
      });
    },

    _onMouseDown: function() {
      var self = this;
      return (function(evt) {
        var pos = self._getCursorPositionInCanvas(evt);
        var frame = self.sidem.isPointInFrame(pos.x, pos.y);

        if (frame === null) return;

        var draggable = self.sidem.isDraggableFrame(frame);

        if (draggable) {
          self.prevX = pos.x;
          self.prevY = pos.y;
          self.dragging = frame;
        }
      });
    },

    _onMouseUp: function() {
      var self = this;
      return (function(evt) {
        self.dragging = null;
      });
    },

    _onMouseMove: function() {
      var self = this;
      return (function(evt) {
        var pos = self._getCursorPositionInCanvas(evt);

        if (self.dragging === null) {
          var draggable = self.sidem.isDraggablePosition(pos.x, pos.y);
          this.style.cursor = (draggable ? 'move' : 'auto');
        } else {
          var deltaX = pos.x - self.prevX;
          var deltaY = pos.y - self.prevY;
          self.prevX = pos.x;
          self.prevY = pos.y;
          self.sidem.moveFramePosition(self.dragging, deltaX, deltaY);
        }
      });
    },

    _onMouseWheel: function() {
      var self = this;
      return (function(evt) {
        self._doNothing(evt);

        var pos = self._getCursorPositionInCanvas(evt);
        var frame = self.sidem.isPointInFrame(pos.x, pos.y);

        if (frame === null) return;

        var draggable = self.sidem.isDraggableFrame(frame);

        if (draggable) {
          var delta = Math.max(-1, Math.min(1, (evt.wheelDelta || - evt.detail)));
          self.sidem.zoomFrame(frame, delta * 0.05);
        }
      });
    },

    _onChangeName: function() {
      var self = this;
      return (function() {
        var frame = parseInt(this.dataset.number, 10);
        self.sidem.setName(frame, this.value);
      });
    },

    _onChangeLine: function(evt) {
      var self = this;
      return (function() {
        var frame = parseInt(this.dataset.number, 10);
        self.sidem.setLine(frame, this.value);
      });
    },

    _onOutput: function(evt) {
      var self = this;
      return (function() {
        var img;
        try {
          img = self.sidem.toDataURL();
        } catch (e) {
          document.getElementById("result").innerHTML = 'エラーが発生しました:' + e.message;
          return;
        }

        document.getElementById("result").innerHTML = '<img id="result_img">';
        document.getElementById("result_img").src = img;
      });
    },

    _getCursorPositionInCanvas: function(evt) {
      var rect = evt.target.getBoundingClientRect();
      var x = evt.clientX - rect.left;
      var y = evt.clientY - rect.top;

      return {'x': x, 'y': y};
    },

    onLoad: function() {
      var i, element, self = this;

      this.sidem = new SideMMyDesk();

      element = document.getElementById('sidem-mydesk');
      this.sidem.setCanvas(element).drawBase();

      element.addEventListener('dragenter', this._doNothing, false);
      element.addEventListener('dragover', this._doNothing, false);
      element.addEventListener('drop', this._onDrop(), false);

      element.addEventListener('mousedown', this._onMouseDown(), false);
      element.addEventListener('mouseup', this._onMouseUp(), false);
      element.addEventListener('mousemove', this._onMouseMove(), false);
      element.addEventListener('mousewheel', this._onMouseWheel(), false);
      element.addEventListener('DOMMouseScroll', this._onMouseWheel(), false);

      element = document.getElementById('output');
      element.addEventListener('click', this._onOutput(), false);

      element = document.querySelectorAll('input.name');
      for (i = 0; i < element.length; i++) {
        element[i].addEventListener('input', this._onChangeName(), false);
      }

      element = document.querySelectorAll('input.line');
      for (i = 0; i < element.length; i++) {
        element[i].addEventListener('input', this._onChangeLine(), false);
      }
    },
  };
})();
