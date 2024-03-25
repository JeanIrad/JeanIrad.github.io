const App = () => {
  const [likes, setLikes] = React.useState(() => {
    const storedVal = JSON.parse(localStorage.getItem("likes")) ?? 0;
    return storedVal;
  });
  //   if (!localStorage.getItem("likes")) {
  //     localStorage.setItem("likes", JSON.stringify(likes));
  //   }
  const handleClicks = () => {
    setLikes(likes + 1);
    localStorage.setItem("likes", JSON.stringify(likes + 1));
  };
  return (
    <div className="likes_container">
      <button
        id="likeBtn"
        onClick={() =>
          handleClicks(JSON.parse(localStorage.getItem("likes")) + 1)
        }
      >
        Like👍
      </button>
      <span id="numLikes">{JSON.parse(localStorage.getItem("likes"))}</span>
    </div>
  );
};
ReactDOM.render(<App />, document.getElementById("likes"));
