from model.board import Board 
from model.player import Player
from model.classical_mode import ClassicalMode

class Game:
    def __init__(self, game_logic = ClassicalMode(), size = 3) -> None:
        # recommended to start from empty methods so that work can be divided between team members
        self.board = Board()
        self.curr_player = Player.X
        self.game_logic = game_logic
        pass
    def is_valid_move(self, move):
        return self.game_logic.is_valid_move(move)
    def make_move(self, move):
        pass
    def switch_player(self):
        self.curr_player = 3 - self.curr_player
        pass
    def get_winner(self):
        pass
    