class Board
  attr_reader :cells

  def initialize(size = 10)
    @cells = Array.new(size) { Array.new(size, "_") } # board full of dead cells
  end

  def size
    @cells[0].size
  end

  def cell(x, y)
    @cells[x][y]
  end

  def give_life(x, y)
    @cells[x][y] = "0"
  end

  def kill(x, y)
    @cells[x][y] = "_"
  end

  def alive?(x, y)
    @cells[x][y] == "0"
  end

  def survival(x, y)
    if neighbor_count(x, y) < 2 || neighbor_count > 3
      kill(x, y)
    elsif neighbor_count(x, y) == ( 2 && alive?(x, y) || 3 ) 
      give_life(x, y)
    end
  end

  def neighbor_count(x, y)
    neighbors = [:left, :right, :top, :bottom, :topleft, :topright, :bottomleft, :bottomright]
    count = 0
    
    neighbors.each do |neighbor|
      count += 1 if self.send(neighbor, x, y)
    end

    return count
  end

  def top(x, y)
    alive?(x - 1, y)
  end

  def bottom(x, y)
    alive?(x + 1, y)
  end

  def left(x, y)
    alive?(x, y - 1)
  end

  def right(x, y)
    alive?(x, y + 1)
  end

  def topleft(x, y)
    alive?(x - 1, y - 1)
  end

  def topright(x, y)
    alive?(x - 1, y + 1)
  end

  def bottomleft(x, y)
    alive?(x + 1, y - 1)
  end

  def bottomright(x, y)
    alive?(x + 1, y + 1)
  end
end


class Life
  attr_accessor :board

  def initialize(args = {})
    @board = Board.new(args[:board_size] = 10)
  end

  def give_life(x, y)
    board.give_life(x, y)
  end

  def kill(x, y)
    board.kill(x, y)
  end
end