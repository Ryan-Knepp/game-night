import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import GroupIcon from "@material-ui/icons/Group";
import TimeIcon from "@material-ui/icons/AccessTime";
import { List, ListItemIcon, ListItem, ListItemText } from "@material-ui/core";
import { Flipped } from "react-flip-toolkit";
import AddIcon from "@material-ui/icons/Add";

const styles = theme => ({
  card: {
    display: "flex",
    flexDirection: "column",
    borderTop: "4px solid",
    minWidth: "250px"
  },
  cardContent: {
    flexGrow: 1,
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit
  },
  playersItem: {
    listStyleImage: <GroupIcon />
  },
  timeItem: {
    listStyleImage: <TimeIcon />
  },
  cardActions: {
    display: "flex",
    justifyContent: "flex-end"
  },
  gameDetailLine: {
    padding: "0"
  },
  gameDetailElement: {
    padding: "4px",
    margin: "auto"
  },
  smallIcon: {
    fontSize: 20
  }
});

function GameCard(props) {
  const { classes, game } = props;

  return (
    <Card
      className={classes.card}
      style={{ borderColor: game.color }}
      elevation={2}
    >
      <CardContent className={classes.cardContent}>
        <Flipped inverseFlipId={game.id}>
          <Typography variant="h6" component="h3" style={{ color: game.color }}>
            {game.title}
          </Typography>
        </Flipped>
        <List disablePadding>
          <ListItem disableGutters className={classes.gameDetailLine}>
            <ListItemIcon className={classes.gameDetailElement}>
              <GroupIcon />
            </ListItemIcon>
            <ListItemText
              primary={game.players}
              className={classes.gameDetailElement}
            />
          </ListItem>
          <ListItem disableGutters className={classes.gameDetailLine}>
            <ListItemIcon className={classes.gameDetailElement}>
              <TimeIcon />
            </ListItemIcon>
            <ListItemText
              primary={game.duration}
              className={classes.gameDetailElement}
            />
          </ListItem>
        </List>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          color="primary"
          variant="outlined"
          onClick={() => props.onSelect(props.game)}
        >
          <AddIcon />
          Include
        </Button>
      </CardActions>
    </Card>
  );
}

GameCard.propTypes = {
  classes: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired,
  game: PropTypes.object.isRequired
};

export default withStyles(styles)(GameCard);
