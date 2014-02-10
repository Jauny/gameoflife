$(function () {
  // Cell Model
  Cell = Backbone.Model.extend({
    initialize: function(alive) {
      this.alive = alive || false;

      this.listenTo(this, 'toggleStatus', this.toggleStatus);
    },

    status: function() {
      return this.alive ? 'alive' : 'dead';
    },

    toggleStatus: function() {
      this.alive = !this.alive;
    }
  });

  // Cell view
  CellView = Backbone.View.extend({
    tagName: 'div',
    className: 'cell',
    template: _.template($('#cell-view-template').html()),

    events: {
      'click': 'toggleStatus'
    },

    initialize: function() {
      this.listenTo(this.model, 'toggleStatus', this.toggleClass);
    },

    toggleStatus: function() {
      this.model.trigger('toggleStatus');
    },

    toggleClass: function() {
      $(this.el).attr('class', 'cell ' + this.model.status());
    },

    render: function() {
      this.$el.html(this.template(this.model)).addClass(this.model.status());

      return this;
    }
  });

  // Cells Collection (board)
  Cells = Backbone.Collection.extend({
    model: Cell,

    // board for next life cycle
    nextBoard: [],

    initialize: function() {
      this.listenTo(this, 'nextLifeCycle', this.nextLifeCycle);
    },

    cellIndex: function(cell) {
      return this.models.indexOf(cell);
    },

    cellLeft: function(cell) {
      var index = this.cellIndex(cell) - 1;
      if (index < 0) {
        return null;
      } else {
        return this.models[index];
      }
    },

    nextLifeCycle: function() {
      var _this = this;

      _.each(_this.models, function(model) {
        var left = _this.cellLeft(model);

        if (left && left.status() == 'alive' && model.status() == 'alive') {
          _this.nextBoard.push(new Cell(true));
        } else {
          _this.nextBoard.push(new Cell(false));
        }
      })

      console.log(_this.models);
      console.log(_this.nextBoard);
      _this.models = _this.nextBoard;
      _this.nextBoard = [];
      console.log(_this.models);
      console.log(_this.nextBoard);
      this.trigger('renderNextBoard');
    }
  });

  // Cells Collection View
  CellsView = Backbone.View.extend({
    el: $('#board'),

    initialize: function() {
      this.listenTo(this.collection, 'add', this.addOne);
      this.listenTo(this.collection, 'change', this.render);
      this.listenTo(this.collection, 'renderNextBoard', this.render);
    },

    addOne: function(model) {
      var cellView = new CellView({
        model: model,
        collection: this.collection,
      });

      // append cellView to the DOM
      this.$el.append(cellView.render().el);
    },

    render: function() {
      console.log('rendering');
      this.$el.html('');
      this.collection.forEach(this.addOne, this);

      return this;
    }
  });

  // life cycle button view
  NextView = Backbone.View.extend({
    el: '#nextLife',

    events: {
      'click': 'nextLifeCycle'
    },

    nextLifeCycle: function() {
      this.collection.trigger('nextLifeCycle');
    }
  });

  // main app
  App = Backbone.View.extend({
    el: $('#board'),

    initialize: function() {
      this.cells = new Cells();
      this.cellsView = new CellsView({
        collection: this.cells
      });
      this.next = new NextView({
        collection: this.cells
      });
    },

    start: function() {
      for (var i = 0; i < 100; i++) {
        this.cells.add(new Cell);
      }
    }
  });

  // initialize everything
  window.app = new App();
  window.app.start();
});
