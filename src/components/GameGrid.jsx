import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core";
import GameCard from "./GameCard";
import { Flipped } from "react-flip-toolkit";

const styles = theme => ({
  layout: {
    width: "auto",
    overflowY: "auto"
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 2}px 0 ${theme.spacing.unit * 9}px`,
    marginBottom: theme.spacing.unit * 1
  },
  smallIcon: {
    fontSize: 20
  },
  games: {
    marginLeft: "auto",
    marginRight: "auto",
    [theme.breakpoints.up(1100)]: {
      width: 1100
    },
    [theme.breakpoints.down(1100)]: {
      width: "100%"
    }
  }
});

class GameGrid extends Component {
  render() {
    const { classes, availableGames, onSelectGame } = this.props;

    return (
      <div className={classNames(classes.layout, classes.cardGrid)}>
        <Grid container spacing={16} className={classes.games}>
          {availableGames.map(game => {
            return (
              <Flipped
                key={game.id}
                flipId={"game-" + game.id}
                translate="false"
              >
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <GameCard onSelect={onSelectGame} game={game} />
                </Grid>
              </Flipped>
            );
          })}
        </Grid>
      </div>
    );
  }
}

GameGrid.propTypes = {
  classes: PropTypes.object.isRequired,
  availableGames: PropTypes.array.isRequired,
  onSelectGame: PropTypes.func.isRequired
};

export default withStyles(styles)(GameGrid);
