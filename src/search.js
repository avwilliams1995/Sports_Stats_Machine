import React from "react";
import PlayerBox from "./PlayerBox";
import GameBox from "./GameBox";
import Stat from "./Stat";

const SearchDiv = (props) => {
  const newProps = Object.assign({}, props);
  let show;
  let type = props.type.split(" ")[1];
  if (type === "Player") {
    show = <PlayerBox props={newProps} />;
  } else if (type === "Game") {
    show = <GameBox props={newProps} />;
  }

  let winner;
  if (props.winnerType === "green") {
    winner = "Win";
  } else if (props.winnerType === "red") {
    winner = "Loss";
  } else if (props.winnerType === "white") {
    winner = "";
  }

  return (
    <div className="full-box">
      <div className="box">
        <h2>{props.text}</h2>
        <select
          name="types"
          id="bet-types"
          onChange={async (e) => await props.updateType(e, props.otherKey)}
        >
          <option value="">Select Bet Type </option>
          <option value="NBA Game">NBA Game</option>
          <option value="NBA Player">NBA Player</option>
          <option value="NCAA Game">NCAA Game</option>
          <option value="NCAA Player">NCAA Player</option>
        </select>

        <div className="box-postSearch">{show}</div>
      </div>
      <Stat
        winner={winner}
        name={props.name}
        statType={props.statType}
        stat={props.stat}
        winnerType={props.winnerType}
        spread={props.spread}
        propType = {props.propType}
      />
    </div>
  );
};

export default SearchDiv;
