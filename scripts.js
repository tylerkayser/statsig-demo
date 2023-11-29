let moves = ["✊", "🖐", "✌"];
let score = 0; // new line

(async () => {
  await statsig.initialize(
    "client-XLcZYMx78Wgbsw2YkvGCzpDBYB0dm4sIcKQyIrw8Mip",
    {
      userID: "user_id_4",
    }
  );

  // -- new lines below

  const layer = statsig.getLayer("rps_experiments");
  moves = layer.get("moves", moves);

  const aiName = layer.get("ai_name", "Computer");

  const actions = document.getElementById("actions");

  // Dynamically add buttons to DOM
  moves.forEach((val, index) => {
    const button = document.createElement("button");
    button.textContent = val;
    button.onclick = () => onPick(index);
    button.className = "button";
    actions.appendChild(button);
  });

  function onPick(playerIndex) {
    const randomMove = moves[Math.floor(Math.random() * moves.length)];

    const cpuIndex = moves.indexOf(randomMove);
    const loseIndex = (playerIndex + 1) % moves.length;

    let result = "Won";
    if (cpuIndex === playerIndex) {
      result = "Tied";
    } else if (cpuIndex === loseIndex) {
      result = "Lost";
    } else {
      score++;
    }

    document.getElementById(
      "computer-move-text"
    ).innerHTML = `${aiName} picked ${randomMove}`; // updated

    document.getElementById("result-text").innerHTML = "You " + result;

    if (layer.get("scoreboard_enabled", false)) {
      document.getElementById("scoreboard").innerHTML = "Your Score: " + score;
    }

    statsig.logEvent("game_played", result.toLowerCase());
  }
})();
