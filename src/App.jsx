import { useState } from "react";
import "./App.css";
import data from "./data";

function App() {
  return (
    <>
      <div className="app">
        <div className="sidebar">
          <FriendList />
        </div>
      </div>
    </>
  );
}

const FriendList = () => {
  return (
    <>
      <ul>
        {data.map((item) => {
          return <Friend friend={item} />;
        })}
      </ul>
    </>
  );
};

const Friend = ({ friend }) => {
  return (
    <li>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance > 0 && (
        <p className="red">
          You owe {friend.name} {Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance < 0 && (
        <p className="green">
          {friend.name} owes you {Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance === 0 && <p>You and {friend.name} are even</p>}
      <button className="button">Select</button>
    </li>
  );
};

export default App;
