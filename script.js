function generateBingoCard() {
  const card = document.getElementById("bingoCard");
  card.innerHTML = "";

  const usedNumbers = new Set();
  const cardNumbers = [];
  let bingoMessage = document.getElementById("bingoMessage");

  // Create the Bingo Card
  for (let i = 0; i < 25; i++) {
    let num;
    do {
      num = Math.floor(Math.random() * 75) + 1;
    } while (usedNumbers.has(num));
    usedNumbers.add(num);
    cardNumbers.push(num);

    const cell = document.createElement("div");
    cell.className = "cell";
    cell.textContent = num;
    cell.onclick = () => {
      cell.classList.toggle("marked");
      checkBingo(cardNumbers);
    };
    card.appendChild(cell);
  }

  function checkBingo(numbers) {
    const rows = 5;
    const cols = 5;
    let bingo = false;

    // Check rows for Bingo
    for (let i = 0; i < rows; i++) {
      let marked = 0;
      for (let j = 0; j < cols; j++) {
        const cellIndex = i * rows + j;
        if (document.getElementsByClassName("cell")[cellIndex].classList.contains("marked")) {
          marked++;
        }
      }
      if (marked === 5) {
        bingo = true;
        break;
      }
    }

    // Check columns for Bingo
    if (!bingo) {
      for (let i = 0; i < cols; i++) {
        let marked = 0;
        for (let j = 0; j < rows; j++) {
          const cellIndex = j * cols + i;
          if (document.getElementsByClassName("cell")[cellIndex].classList.contains("marked")) {
            marked++;
          }
        }
        if (marked === 5) {
          bingo = true;
          break;
        }
      }
    }

    // If Bingo is achieved
    if (bingo) {
      bingoMessage.textContent = "Bingo!";
      bingoMessage.style.color = "green";
    } else {
      bingoMessage.textContent = "";
    }
  }
}
