$(function() {
  window.Cell = function() {
    var self = this;

    self.state = ko.observable('dead');
    self.neighbors = ko.observable(0);

    self.kill = function() {
      self.state('dead');
    };

    self.spawn = function() {
      self.state('alive');
    };

    return self;
  };
});
