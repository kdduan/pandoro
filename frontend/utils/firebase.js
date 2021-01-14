import axios from "axios";

export const createRoom = (roomId) => {
  const roomData = {
    roomId: roomId,
    paused: true,
    timeLeft: 600, // temp value
    lastPlayTime: null,
  };
  axios
    .post(
      "https://pandoro-d9f62-default-rtdb.firebaseio.com/" + "rooms.json",
      roomData
    )
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};
