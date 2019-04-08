import React, { Component } from "react";
import { withStyles, Typography } from "@material-ui/core";
import Header from "./components/Header";
import GameGrid from "./components/GameGrid";
import ChooseGame from "./components/ChooseGame";
import Confetti from "react-dom-confetti";
import games from "./data/games";
import { Flipper } from "react-flip-toolkit";
import "./styles/App.css";

const styles = theme => ({
  gameListHeader: {
    paddingTop: "16px",
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: "auto",
      marginRight: "auto"
    },
    [theme.breakpoints.down(1100 + theme.spacing.unit * 3 * 2)]: {
      width: "100%"
    }
  }
});

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      availableGames: this.sortGames(games.list),
      selectedGames: [],
      winner: null,
      showConfetti: false,
      confettiStyle: {
        position: "fixed",
        top: "0",
        left: "0"
      }
    };
  }

  sortGames(games) {
    return games.sort((g1, g2) => g1.title.localeCompare(g2.title));
  }

  onSelectGame = selectedGame => {
    this.setState({
      selectedGames: [...this.state.selectedGames, selectedGame],
      availableGames: this.sortGames(
        this.state.availableGames.filter(game => game.id !== selectedGame.id)
      )
    });
  };

  onRemoveGame = removedGame => {
    this.setState({
      selectedGames: this.state.selectedGames.filter(
        game => game.id !== removedGame.id
      ),
      availableGames: this.sortGames([
        ...this.state.availableGames,
        removedGame
      ])
    });
  };

  onChooseGame = () => {
    const { selectedGames } = this.state;

    // Don't pick a game if there is no game to pick
    if (selectedGames.length < 1) {
      return;
    }

    const index = Math.floor(Math.random() * selectedGames.length);
    const choosenGame = selectedGames[index];

    this.setState({
      selectedGames: selectedGames.map(game => {
        if (game.id === choosenGame.id) {
          game.choosen = true;
        } else {
          game.choosen = false; //reset previously picked game if choosing again
        }
        return game;
      }),
      winner: choosenGame
    });

    setTimeout(() => this.showConfetti(), 250);
  };

  showConfetti = () => {
    const element = document.querySelector("#winner");
    const rect = element ? element.getBoundingClientRect() : null;
    const bottom = rect ? rect.bottom : 0;
    const left = rect ? rect.left + (rect.right - rect.left) / 2 : 0;

    this.setState({
      showConfetti: true,
      confettiStyle: {
        position: "fixed",
        top: bottom,
        left: left,
        zIndex: 4242424242
      }
    });

    // Reset variable in case another game is picked
    setTimeout(
      () =>
        this.setState({
          showConfetti: false
        }),
      confettiConfig.duration
    );
  };

  render() {
    const {
      selectedGames,
      availableGames,
      confettiStyle,
      showConfetti
    } = this.state;
    const { classes } = this.props;

    const flipKey =
      (selectedGames ? selectedGames.map(game => game.id).join("") : "") +
      "_" +
      (availableGames ? availableGames.map(game => game.id).join("") : "");

    return (
      <React.Fragment>
        <Flipper flipKey={flipKey} className="container">
          <div className="header">
            <Header selectingGames={selectedGames.length > 0} />
          </div>

          <div className="content">
            <Typography
              component="h2"
              variant="h5"
              align="center"
              color="primary"
              className={classes.gameListHeader}
            >
              Pick Some Games
            </Typography>
            <GameGrid
              availableGames={availableGames}
              onSelectGame={this.onSelectGame}
            />
          </div>
          <div className="footer">
            <ChooseGame
              games={selectedGames}
              winner={this.state.winner}
              onRemoveGame={this.onRemoveGame}
              onChooseGame={this.onChooseGame}
            />
          </div>
        </Flipper>
        <div style={confettiStyle} id="confetti">
          <Confetti active={showConfetti} config={confettiConfig} />
        </div>
      </React.Fragment>
    );
  }
}

const confettiConfig = {
  angle: "90",
  spread: 45,
  startVelocity: "25",
  elementCount: "42",
  dragFriction: 0.1,
  duration: 1250,
  delay: 0,
  width: "10px",
  height: "10px",
  colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"]
};

export default withStyles(styles)(App);
