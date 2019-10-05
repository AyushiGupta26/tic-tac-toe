import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Button,
  Dimensions,
} from 'react-native';

export default class Tic extends React.Component {
  state = {
    board: ['-', '-', '-', '-', '-', '-', '-', '-', '-'],
    currentPlayer: 'X',
    winner: '',
    playAgain: false,
  };

  _analyze(board) {
    var moves = [
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
    ];
    for (let i = 0; i < moves.length; i++) {
      if (
        board[moves[i][0]] == board[moves[i][1]] &&
        board[moves[i][1]] == board[moves[i][2]] &&
        board[moves[i][0]] == 'X'
      ) {
        this.setState({ winner: 'Winner : X' });
        this.setState({ playAgain: true });
      } else if (
        board[moves[i][0]] == board[moves[i][1]] &&
        board[moves[i][1]] == board[moves[i][2]] &&
        board[moves[i][0]] == 'O'
      ) {
        this.setState({ winner: 'Winner : O' });
        this.setState({ playAgain: true });
      }
    }
    let counter = 0;
    for (let i of this.state.board) {
      if (i === '-') {
        counter = 0;
        break;
      } else {
        counter++;
      }
    }
    if (counter === 9) {
      alert('tie');
      this.setState({playAgain : true});
    }
  }

  _handleClick(boardIndex) {
    var newBoard = this.state.board;
    newBoard[boardIndex] = this.state.currentPlayer;
    this.setState({ board: newBoard });

    this._analyze(newBoard);

    var nextPlayer = this.state.currentPlayer == 'X' ? 'O' : 'X';
    this.setState({ currentPlayer: nextPlayer });
  }

  _playAgain() {
    this.setState({
      board: ['-', '-', '-', '-', '-', '-', '-', '-', '-'],
      currentPlayer: 'X',
      winner: '',
      playAgain: false,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.playAgain ? (
          <Button title="Play Again" onPress={() => this._playAgain()} />
        ) : null}
        <Text style={styles.display}>{this.state.winner}</Text>
        <View style={styles.list}>
          {this.state.board.map((val, i) => {
            return (
              <MyButton
                i={i}
                handleClick={this._handleClick.bind(this)}
                z={this.state.board}
                w={this.state.winner}
              />
            );
          })}
        </View>
      </View>
    );
  }
}

const MyButton = ({ i, handleClick, z, w }) => (
  <TouchableOpacity
    style={styles.btn}
    disabled={w !== '' || z[i] !== '-' ? true : false}
    onPress={() => {
      handleClick(i);
    }}>
    <Text style={styles.btnText}>{z[i]}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  display: {
    marginBottom: 40,
    fontSize: 40,
  },
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  btnText: {
    fontSize: 30,
    textAlign: 'center',
  },
  btn: {
    padding: 20,
    width: Dimensions.get('window').width / 3 - 2,
    backgroundColor: 'lightgray',
    margin: 1,
    height: Dimensions.get('window').width / 3 - 2,
  },
});
