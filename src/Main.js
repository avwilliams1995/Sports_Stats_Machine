import React, { useState } from "react";
import "./App.css";
import SearchDiv from "./search";
// import Stats from "./Stats";
import Header from "./Header";
import fetchData from "./Fetch";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Main = () => {
  let info = useSelector((state)=> state)
  // console.log('=======', info)
  let color;

  const [searches, setSearch] = useState(["", "", "", "", ""]);
  const [spreads, setSpread] = useState(["", "", "", "", ""]);
  const [nameQuery, setName] = useState(["", "", "", "", ""]);
  const [types, setTypes] = useState(["", "", "", "", ""]);
  const [statsQuery, setStatQuery] = useState(["", "", "", "", ""]);
  const [statTypes, setStatTypes] = useState(["", "", "", "", ""]);
  const [dateTypes, setDateTypes] = useState(["", "", "", "", ""]);
  const [winnerTypes, setWinnerTypes] = useState([
    "white",
    "white",
    "white",
    "white",
    "white",
  ]);
  const [changed, setChangeTypes] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);
  const [propTypes, setPropTypes] = useState(["", "", "", "", ""]);
  const [record, setRecord] = useState([0, 0]);

  const dates = [];
  for (let i = 0; i < 3; i++) {
    const date = new Date();
    let day = date.getDate() - i;
    let month = `0${date.getMonth() + 1}`;
    let year = date.getFullYear();
    let currentDate = `${year}-${month}-${day}`;
    dates.push(currentDate);
  }

  let navigate = useNavigate();
  const seeProfile = (e) => {
    e.preventDefault();
    navigate('/profile')
  }

  const winnerTest = async (result, stat, betType, index, spread, prop) => {
    let newWinners = [...winnerTypes];
    let bet = betType.split(" ")[1];
    console.log(
      "testing winner-----------",
      result,
      stat,
      betType,
      index,
      spread,
      prop
    );
    if (bet === "Player" && prop === "Over") {
      if (Number(result) >= Number(spread)) {
        newWinners[index] = "green";
      } else if (Number(result) < Number(spread)) {
        newWinners[index] = "red";
      }
    } else if (bet === "Player" && prop === "Under") {
      if (Number(result) < Number(spread)) {
        newWinners[index] = "green";
      } else if (Number(result) >= Number(spread)) {
        newWinners[index] = "red";
      }
    } else if (bet === "Game") {
      let betTeam = Number(result.split(" - ")[0]);
      let otherTeam = Number(result.split(" - ")[1]);
      switch (stat) {
        case "Moneyline":
          newWinners[index] = betTeam > otherTeam ? "green" : "red";
          break;
        case "Spread":
          newWinners[index] =
            betTeam + Number(spread) > otherTeam ? "green" : "red";
          break;
        case "Over":
          newWinners[index] =
            betTeam + otherTeam > Number(spread) ? "green" : "red";
          break;
        case "Under":
          newWinners[index] =
            betTeam + otherTeam < Number(spread) ? "green" : "red";
          break;
        default:
          return;
      }
      console.log("new color", newWinners[index]);
    }
    return newWinners[index];
  };

  const recordTest = async (winner) => {
    let records = [0,0]
    for (let i = 0; i < 5; i++) {
      console.log(winnerTypes[i])
      if (winner[i] === "green") records[0] += 1;
      if (winner[i] === "red") records[1] += 1;
    }
    setRecord(records);
  };
  const updateText = (e, index) => {
    const newText = [...searches];
    newText[index] = e.target.value;
    setSearch(newText);
  };


  const updateStats = async (arr) => {
    console.log("new query is", arr);
    setStatQuery(arr);
    console.log("updated is", statsQuery);
    return;
  };

  // const setLoad = () => {
  //   loading = true;
  // };

  const setAlert = () => {
    alert("Loading....");
  };

  const getSearch = async (e, index) => {
    e.preventDefault();
    setAlert();
    let newWinners = [...winnerTypes];
    let newQuery = [...statsQuery];
    let newNames = [...nameQuery];
    let changers = [...changed];
    

    console.log("grabbing data------------");
    for (let i = 0; i < 5; i++) {
      console.log("--------------on data", i);
      if (changed[i]) {
        let name = searches[i];
        let spread = spreads[i];
        let statType = statTypes[i];
        let prop = propTypes[i];
        console.log(name, spread, statType);
        let adjName;
        let currType = types[i].split(" ")[1];
        adjName =
          currType === "Player" ? `${name[0]}. ${name.split(" ")[1]}` : name;
        let stat = `player_${statTypes[i]}`;
        let result =
          !name || !statTypes[i] || !dateTypes[i]
            ? "Error: Input all fields"
            : await fetchData(types[i], adjName, stat, dateTypes[i], statType);
        if (
          result !== "Could not find" &&
          result !== "Please make a selection in each dropdown"
        ) {
          newQuery[i] = result;
          let winner = await winnerTest(
            result,
            statType,
            types[i],
            i,
            spread,
            prop
          );
          newWinners[i] = winner;
          newNames[i] = adjName;
          changers[i] = false;
          // const newRecord = [...record];
          // if (winner === "green") records[0] += 1;
          // if (winner === "red") records[1] += 1;
          console.log("-----------finished with", i);
        }
      }
    }
    await recordTest(newWinners)
    await updateStats(newQuery);
    await setWinnerTypes(newWinners);
    await setName(newNames);
    await setChangeTypes(changers);
    
  };

  const updateType = (e, index) => {
    const newTypes = [...types];
    newTypes[index] = e.target.value;
    setTypes(newTypes);
    changer(index);
  };

  const changer = (index) => {
    const changeArr = [...changed];
    changeArr[index] = true;
    setChangeTypes(changeArr);
  };

  const updatePropType = (e, index) => {
    const newTypes = [...propTypes];
    newTypes[index] = e.target.value;
    setPropTypes(newTypes);
    changer(index);
  };

  const updateStatType = (e, index) => {
    const newStatTypes = [...statTypes];
    newStatTypes[index] = e.target.value;
    setStatTypes(newStatTypes);
    changer(index);
  };

  const updateSpread = (e, index) => {
    const newSpread = [...spreads];
    newSpread[index] = e.target.value;
    setSpread(newSpread);
    changer(index);
    // console.log(spreads)
  };

  const updateDateType = (e, index) => {
    const newDateTypes = [...dateTypes];
    let currentDate = e.target.value;
    newDateTypes[index] = currentDate;
    setDateTypes(newDateTypes);
    changer(index);
  };

  const boxes = [];
  for (let i = 0; i < searches.length; i++) {
    boxes.push(
      <SearchDiv
        search={searches[i]}
        updateText={updateText}
        text={`Input ${i + 1}`}
        name={nameQuery[i]}
        getSearch={getSearch}
        otherKey={i}
        type={types[i]}
        updateType={updateType}
        stat={statsQuery[i]}
        updateStatType={updateStatType}
        statType={statTypes[i]}
        updateDateType={updateDateType}
        winnerType={winnerTypes[i]}
        dates={dates}
        updateSpread={updateSpread}
        spread={spreads[i]}
        color={color}
        updatePropType={updatePropType}
        propType={propTypes[i]}
      />
    );
  }
  // const userInfo = useSelector(state=> state.userInfo)
  // console.log(userInfo, '---------')

  return (
    <div className="App">
      <button
        className="get-button"
        onClick={(e) => seeProfile(e)}
      >
        See Profile
      </button>
      <Header />
      <h1>
        {record[0]}-{record[1]}
      </h1>
      {/* <h1>{loading}</h1> */}
      <button
        className="get-button"
        type="submit"
        onClick={async (e) => await getSearch(e)}
      >
        Get Stats
      </button>
      <div className="boxes">{boxes}</div>
    </div>
  );
};

export default Main