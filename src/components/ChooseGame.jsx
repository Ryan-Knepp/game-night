import React, { Component } from "react";
import PropTypes from "prop-types";
import Fab from "@material-ui/core/Fab";
import { withStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import { Flipped } from "react-flip-toolkit";
import grey from "@material-ui/core/colors/grey";
import WinnerPopup from "./WinnerPopup";

const styles = theme => ({
  fab: {
    flex: "0 0 auto",
    padding: "8px 4px"
  },
  container: {
    backgroundColor: theme.palette.background.paper,
    borderTop: "1px solid",

    borderColor: grey[300],
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  chipContainer: {
    display: "flex",
    flexWrap: "wrap",
    flex: "1 1 auto"
  },
  chip: {
    padding: "2px"
  }
});

class ChooseGame extends Component {
  state = {
    openWinnerPopup: false
  };

  handleClosePopup = () => {
    this.setState({ openWinnerPopup: false });
  };

  onButtonClick = onChooseGame => {
    onChooseGame();
    this.setState({ openWinnerPopup: true });
  };

  render() {
    const { classes, games, onRemoveGame, winner, onChooseGame } = this.props;

    const chooseGameButton = (
      <Fab
        variant="extended"
        color="primary"
        disabled={games.length < 2}
        onClick={() => this.onButtonClick(onChooseGame)}
      >
        Choose Game
      </Fab>
    );

    const winnerWinnerChickenDinner = winner ? (
      <WinnerPopup
        open={this.state.openWinnerPopup}
        handleClose={this.handleClosePopup}
        winner={winner}
      />
    ) : null;

    return (
      <div className={classes.container}>
        <div className={classes.chipContainer}>
          {games.map(game => (
            <Flipped key={game.id} flipId={"game-" + game.id} translate="false">
              <div id={"game-" + game.id} className={classes.chip}>
                <Chip
                  label={game.title}
                  onDelete={() => onRemoveGame(game)}
                  color="primary"
                  style={{
                    backgroundColor: game.color,
                    fontSize: "1rem"
                  }}
                />
              </div>
            </Flipped>
          ))}
        </div>
        <div className={classes.fab}>{chooseGameButton}</div>
        {winnerWinnerChickenDinner}
      </div>
    );
  }
}

ChooseGame.propTypes = {
  classes: PropTypes.object.isRequired,
  games: PropTypes.array.isRequired,
  onRemoveGame: PropTypes.func.isRequired,
  onChooseGame: PropTypes.func.isRequired,
  winner: PropTypes.object
};

export default withStyles(styles)(ChooseGame);
