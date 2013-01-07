class Cell
  attr_accessor :state, :neighbors

  def initialize
    @state = :dead
    @neighbors = 0
  end

  def born
    @state = :alive # @board exists in context of Life
  end

  def die
    @state = :dead
  end

  def alive?
    self.state == :alive
  end

  def evolve
    if alive?
      die if @neighbors < 2 || @neighbors > 3
    else
      born if @neighbors == 3
    end
  end
end

class Life
  attr_accessor :board

  def initialize(size = 10)
    @board = Array.new(size * size) { Cell.new }
  end

  def generation
    @board.each_with_index do |cell, index|
      cell.neighbors = neighbors(index)
    end

    @board.each do |cell|
      cell.evolve
    end
  end

  def neighbors(index)
    factor = Math.sqrt(@board.size)
    count = 0

    count += 1 if (index / factor) > 0 && (index % factor) > 0 && @board[index - (factor + 1)].alive? # top left
    count += 1 if (index / factor) > 0 && @board[index - factor].alive? # top
    count += 1 if (index / factor) > 0 && (index % factor) < (factor - 1) &&  @board[index - (factor - 1)].alive? # top right
    count += 1 if (index % factor) > 0 && @board[index - 1].alive? # left, etc.. 
    count += 1 if (index % factor) < (factor - 1) && @board[index + 1].alive?
    count += 1 if (index % factor) > 0 && (index / factor) < (factor - 1) && @board[index + (factor - 1)].alive?
    count += 1 if (index / factor) < (factor - 1) && @board[index + factor].alive?
    count += 1 if (index % factor ) < (factor - 1) && (index / factor) < (factor - 1) && @board[index + (factor + 1)].alive?
    
    return count
  end
end