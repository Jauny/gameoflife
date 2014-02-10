$(function() {
  window.Board = function(width, height) {
    var self = this;


    self.width = ko.observable(
      typeof width !== "undefined" ? width : 10
    );
    self.height = ko.observable(
      (typeof height !== "undefined" ? height : (typeof width !== "undefined" ? width : 10))
    );
    self.size = ko.observable(self.width()*self.height());
    self.cells = ko.observableArray([]);

    self.cellCoordinates = function(cell) {
      x = Math.floor(self.cells().indexOf(cell) / self.width());
      y = Math.floor(self.cells().indexOf(cell) % self.height());

      return [x, y];
    };

    self.populate = ko.computed(function() {
      for (var i=0; i < self.size(); i++) {
        self.cells().push(new Cell);
      }
    });

    return self;
  };
  board = new Board;
  ko.applyBindings(board);
});
