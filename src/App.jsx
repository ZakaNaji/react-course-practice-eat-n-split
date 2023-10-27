import { useState } from "react";
import "./App.css";
import data from "./data";

function App() {
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [friends, setFriends] = useState([...data]);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const onAddFriend = (newFriend) => {
    setFriends([...friends, newFriend]);
    setShowAddFriend(false);
  };
  const onSelectFriend = (f) => {
    setSelectedFriend((currentFriend) =>
      currentFriend?.id === f.id ? null : f
    );
    setShowAddFriend(false);
  };
  const changeBalance = (value) => {
    setFriends(
      friends.map((friend) => {
        if (friend.id === selectedFriend.id) {
          return {
            ...friend,
            balance: friend.balance + value,
          };
        }
        return friend;
      })
    );
  };

  return (
    <>
      <div className="app">
        <div className="sidebar">
          <FriendList
            friends={friends}
            selectedFriend={selectedFriend}
            onSelectFriend={onSelectFriend}
          />
          {showAddFriend && <AddFriendForm onAddFriend={onAddFriend} />}
          <Button onClick={() => setShowAddFriend(!showAddFriend)}>
            {!showAddFriend ? "Add Friend" : "Close"}
          </Button>
        </div>
        <SplitBillForm
          selectedFriend={selectedFriend}
          changeBalance={changeBalance}
          key={selectedFriend?.id}
        />
      </div>
    </>
  );
}

const FriendList = ({ friends, onSelectFriend, selectedFriend }) => {
  return (
    <>
      <ul>
        {friends.map((item) => {
          return (
            <Friend
              key={item.id}
              friend={item}
              onSelectFriend={onSelectFriend}
              selectedFriend={selectedFriend}
            />
          );
        })}
      </ul>
    </>
  );
};

const Friend = ({ friend, onSelectFriend, selectedFriend }) => {
  const isSelected = friend.id === selectedFriend?.id;
  const text = isSelected ? "Close" : "Select";
  return (
    <li className={`${isSelected ? "selected" : ""}`}>
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
      <Button onClick={() => onSelectFriend(friend)}>{text}</Button>
    </li>
  );
};

const AddFriendForm = ({ onAddFriend }) => {
  const [friendName, setFriendName] = useState("");
  const [image, setImage] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!friendName || !image) return;
    const newFriend = {
      id: new Date().getTime(),
      name: friendName,
      image: image,
      balance: 0,
    };
    onAddFriend(newFriend);
  };
  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)} className="form-add-friend">
        <label>Friend Name:</label>
        <input
          value={friendName}
          onChange={(e) => setFriendName(e.target.value)}
          type="text"
        />

        <label>Image Url:</label>
        <input
          value={image}
          onChange={(e) => setImage(e.target.value)}
          type="text"
        />

        <Button>Add</Button>
      </form>
    </>
  );
};

const SplitBillForm = ({ selectedFriend, changeBalance }) => {
  if (!selectedFriend) return;
  const [Bill, setBill] = useState(0);
  const [expanse, setExpanse] = useState(0);
  const [whosPaying, setWhosPaying] = useState("you");
  const friendExpanse = Bill - expanse;
  let balance = 0;
  const handleSubmit = (e) => {
    e.preventDefault();
    if (whosPaying === "you") {
      balance = -friendExpanse;
    }
    if (whosPaying === "friend") {
      balance = expanse;
    }
    changeBalance(balance);
  };
  return (
    <form onSubmit={(e) => handleSubmit(e)} className="form-split-bill">
      <h2>Split a bill with {selectedFriend.name}</h2>
      <label>Bill value</label>
      <input
        type="number"
        value={Bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />

      <label>Your expense</label>
      <input
        type="number"
        value={expanse}
        onChange={(e) => setExpanse(Number(e.target.value))}
      />

      <label>{selectedFriend.name}'s expense</label>
      <input type="text" value={friendExpanse} disabled={true} />

      <label>Who is paying</label>
      <select
        value={whosPaying}
        onChange={(e) => setWhosPaying(e.target.value)}
      >
        <option value="you">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>

      <Button>Split bill</Button>
    </form>
  );
};

const Button = ({ children, onClick }) => {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
};

export default App;
