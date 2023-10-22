import { useState } from "react";
import "./App.css";
import data from "./data";

function App() {
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [friends, setFriends] = useState([...data]);
  const onAddFriend = (newFriend) => {
    setFriends([...friends, newFriend]);
    setShowAddFriend(false);
  };

  return (
    <>
      <div className="app">
        <div className="sidebar">
          <FriendList friends={friends} />
          {showAddFriend && <AddFriendForm onAddFriend={onAddFriend} />}
          <Button onClick={() => setShowAddFriend(!showAddFriend)}>
            {!showAddFriend ? "Add Friend" : "Close"}
          </Button>
        </div>
        <SplitBillForm />
      </div>
    </>
  );
}

const FriendList = ({ friends }) => {
  return (
    <>
      <ul>
        {friends.map((item) => {
          return <Friend key={item.id} friend={item} />;
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
      <Button>Select</Button>
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

const SplitBillForm = () => {
  return (
    <form className="form-split-bill">
      <h2>Split a bill with X</h2>
      <label>Bill value</label>
      <input type="text" />

      <label>Your expense</label>
      <input type="text" />

      <label>X's expense</label>
      <input type="text" disabled={true} />

      <label>Who is paying</label>
      <select>
        <option value="you">You</option>
        <option value="friend">X</option>
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
