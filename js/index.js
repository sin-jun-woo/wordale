const 정답 = "APPLE";

let index = 0;
let attempts = 0;
let timer;

function appStart() {
  //로직들

  const displayGameover = () => {
    const div = document.createElement("div");
    div.innerText = "게임이 종료됐습니다.";
    div.style =
      "display:flex; justify-content:center; align-items:center; position:absolute; top:38vh; left:38vw; background-color:white; width:200px; height:100px;";
    document.body.appendChild(div);
  };

  const gameover = () => {
    window.removeEventListener("keydown", handlekeydown);
    displayGameover();
    clearInterval(timer);
  };

  const nextLine = () => {
    if (attempts === 6) {
      gameover();
      return;
    }
    attempts += 1;
    index = 0;
  };

  const handleEnterKey = () => {
    // 정답확인

    let 맞은_갯수 = 0;

    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-block[data-index='${attempts}${i}']`
      );
      const 입력한_글자 = block.innerText;
      const 정답_글자 = 정답[i];
      if (입력한_글자 === 정답_글자) {
        맞은_갯수++;
        block.style.background = "#6aaa64";
      } else if (정답.includes(입력한_글자)) {
        block.style.background = "#c9b458";
      } else {
        block.style.background = "#787c7e";
      }
      block.style.color = "white";
    }
    if (맞은_갯수 === 5) {
      gameover();
    } else {
      nextLine();
    }
  };

  const handleBackspace = () => {
    if (index > 0) {
      const preBlock = document.querySelector(
        `.board-block[data-index='${attempts}${index - 1}']`
      );
      preBlock.innerText = "";
    }
    if (index !== 0) index--;
  };

  const handlekeydown = (event) => {
    const key = event.key.toUpperCase();
    const keyCode = event.keyCode;
    const thisBlock = document.querySelector(
      `.board-block[data-index='${attempts}${index}']`
    );

    if (event.key === "Backspace") handleBackspace();
    else if (event.key === "Enter") {
      if (index === 5) {
        handleEnterKey();
      }
    } else if (65 <= keyCode && keyCode <= 90) {
      thisBlock.innerText = key;
      index++;
    }
  };

  const startTimer = () => {
    const 시작_시간 = new Date();

    function setTime() {
      const 현재_시간 = new Date();
      const 흐른_시간 = new Date(현재_시간 - 시작_시간);
      const minute = 흐른_시간.getMinutes().toString().padStart(2, "0");
      const second = 흐른_시간.getSeconds().toString().padStart(2, "0");
      const timeDiv = document.querySelector(".board-time");
      timeDiv.innerText = `${minute}:${second}`;
    }

    timer = setInterval(setTime, 1000);
  };

  startTimer();
  window.addEventListener("keydown", handlekeydown);
}

appStart();
