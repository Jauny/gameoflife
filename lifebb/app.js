$(function () {
  // Cell Model
  Cell = Backbone.Model.extend({
    initialize: function(board) {
      this.board = board;
      this.alive = false;

      this.listenTo(this, 'toggleStatus', this.toggleStatus);
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
      // big hack need a better way of doing so
      if (this.model.alive) {
        $(this.$el[0]).addClass('alive');
      } else {
        $(this.$el[0]).removeClass('alive');
      }
    },

    render: function() {
      this.$el.html(this.template(this.model));

      return this;
    }
  });

  // Cells Collection
  Cells = Backbone.Collection.extend({
    model: Cell,

    // board for next life cycle
    nextLife: null
  });

  // Cells Collection View
  CellsView = Backbone.View.extend({
    el: $('#board'),

    initialize: function() {
      this.listenTo(this.collection, 'add', this.addOne);
      this.listenTo(this.collection, 'reset', this.render);
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
      this.$el.html('');
      this.collection.forEach(this.addOne, this);

      return this;
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
