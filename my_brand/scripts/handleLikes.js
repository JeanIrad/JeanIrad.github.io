const App = () => {
  const blogId = new URLSearchParams(window.location.search).get("id");
  const [likes, setLikes] = React.useState(() => {
    const storedVal = JSON.parse(localStorage.getItem(`likes_${blogId}`)) ?? 0;
    return storedVal;
  });
  //   if (!localStorage.getItem("likes")) {
  //     localStorage.setItem("likes", JSON.stringify(likes));
  //   }
  const handleClicks = () => {
    setLikes(likes + 1);
    localStorage.setItem(`likes_${blogId}`, JSON.stringify(likes + 1));
  };
  return (
    <div className="likes_container">
      <button id="likeBtn" onClick={() => handleClicks()}>
        Like👍
      </button>
      <span id="numLikes">
        {JSON.parse(localStorage.getItem(`likes_${blogId}`))}
      </span>
    </div>
  );
};
ReactDOM.render(<App />, document.getElementById("likes"));
