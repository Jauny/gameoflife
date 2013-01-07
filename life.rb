class Cell
  attr_accessor :state

  def initialize
    @state = :dead
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
end

class Life
  attr_accessor :board

  def initialize(size = 10)
    @board = Array.new(size * size) { Cell.new }
  end

  def generation
    next_gen = @board.each_with_index.map do |cell, index|
      neighbors_count = neighbors(index)

      if neighbors_count < 2 || neighbors_count > 3
        cell = :dead
      elsif (neighbors_count == 2 && cell.alive?) || (neighbors_count == 3)
        cell = :alive
      end 
    end

    next_gen.each_with_index do |state, index|
      if state == :alive
        @board[index].born
      elsif state == :dead
        @board[index].die
      end
    end

    return @board
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