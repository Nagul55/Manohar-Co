// DotGrid.js - Vanilla JS DotGrid background animation
// Adapted from React version

(function(global) {
  function hexToRgb(hex) {
    const m = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
    if (!m) return { r: 0, g: 0, b: 0 };
    return {
      r: parseInt(m[1], 16),
      g: parseInt(m[2], 16),
      b: parseInt(m[3], 16)
    };
  }

  function DotGrid(options) {
    this.options = Object.assign({
      dotSize: 10,
      gap: 15,
      baseColor: '#5227FF',
      activeColor: '#5227FF',
      proximity: 120,
      shockRadius: 250,
      shockStrength: 5,
      resistance: 750,
      returnDuration: 1.5,
      container: null
    }, options);
    this.dots = [];
    this.pointer = { x: 0, y: 0 };
    this._rafId = null;
    this._init();
  }

  DotGrid.prototype._init = function() {
    var container = typeof this.options.container === 'string' ? document.querySelector(this.options.container) : this.options.container;
    if (!container) return;
    this.container = container;
    this.container.classList.add('dot-grid');
    this.canvas = document.createElement('canvas');
    this.canvas.className = 'dot-grid__canvas';
    this.container.appendChild(this.canvas);
    this._resize();
    this._buildGrid();
    this._bindEvents();
    this._draw();
  };

  DotGrid.prototype._resize = function() {
    var rect = this.container.getBoundingClientRect();
    var dpr = window.devicePixelRatio || 1;
    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;
    this.canvas.style.width = rect.width + 'px';
    this.canvas.style.height = rect.height + 'px';
    this.ctx = this.canvas.getContext('2d');
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.scale(dpr, dpr);
  };

  DotGrid.prototype._buildGrid = function() {
    var rect = this.container.getBoundingClientRect();
    var dotSize = this.options.dotSize;
    var gap = this.options.gap;
    var cols = Math.floor((rect.width + gap) / (dotSize + gap));
    var rows = Math.floor((rect.height + gap) / (dotSize + gap));
    var cell = dotSize + gap;
    var gridW = cell * cols - gap;
    var gridH = cell * rows - gap;
    var extraX = rect.width - gridW;
    var extraY = rect.height - gridH;
    var startX = extraX / 2 + dotSize / 2;
    var startY = extraY / 2 + dotSize / 2;
    this.dots = [];
    for (var y = 0; y < rows; y++) {
      for (var x = 0; x < cols; x++) {
        var cx = startX + x * cell;
        var cy = startY + y * cell;
        this.dots.push({ cx: cx, cy: cy, xOffset: 0, yOffset: 0 });
      }
    }
  };

  DotGrid.prototype._bindEvents = function() {
    var self = this;
    window.addEventListener('resize', function() {
      self._resize();
      self._buildGrid();
    });
    this.canvas.addEventListener('mousemove', function(e) {
      var rect = self.canvas.getBoundingClientRect();
      self.pointer.x = e.clientX - rect.left;
      self.pointer.y = e.clientY - rect.top;
    });
    this.canvas.addEventListener('mouseleave', function() {
      self.pointer.x = -1000;
      self.pointer.y = -1000;
    });
  };

  DotGrid.prototype._draw = function() {
    var ctx = this.ctx;
    var dots = this.dots;
    var pointer = this.pointer;
    var dotSize = this.options.dotSize;
    var baseRgb = hexToRgb(this.options.baseColor);
    var activeRgb = hexToRgb(this.options.activeColor);
    var proximity = this.options.proximity;
    var proxSq = proximity * proximity;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (var i = 0; i < dots.length; i++) {
      var dot = dots[i];
      var dx = dot.cx - pointer.x;
      var dy = dot.cy - pointer.y;
      var dsq = dx * dx + dy * dy;
      var style = this.options.baseColor;
      if (dsq <= proxSq) {
        var dist = Math.sqrt(dsq);
        var t = 1 - dist / proximity;
        var r = Math.round(baseRgb.r + (activeRgb.r - baseRgb.r) * t);
        var g = Math.round(baseRgb.g + (activeRgb.g - baseRgb.g) * t);
        var b = Math.round(baseRgb.b + (activeRgb.b - baseRgb.b) * t);
        style = 'rgb(' + r + ',' + g + ',' + b + ')';
      }
      ctx.save();
      ctx.beginPath();
      ctx.arc(dot.cx, dot.cy, dotSize / 2, 0, Math.PI * 2);
      ctx.fillStyle = style;
      ctx.fill();
      ctx.restore();
    }
    this._rafId = requestAnimationFrame(this._draw.bind(this));
  };

  DotGrid.prototype.destroy = function() {
    cancelAnimationFrame(this._rafId);
    if (this.canvas && this.canvas.parentNode) {
      this.canvas.parentNode.removeChild(this.canvas);
    }
  };

  global.DotGrid = DotGrid;
})(window);