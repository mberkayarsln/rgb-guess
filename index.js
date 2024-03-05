$(document).ready(function () {
  let correctCount = 0;
  let falseCount = 0;
  let clicks = 0;

  const generateColor = () => {
    let red = (Math.random() * 255).toFixed(0);
    let green = (Math.random() * 255).toFixed(0);
    let blue = (Math.random() * 255).toFixed(0);

    return [red, green, blue];
  };

  const startGame = () => {
    correctCount = 0;
    falseCount = 0;
    clicks = 0;

    const color = generateColor();
    const firstBox = generateColor();
    const secondBox = generateColor();
    const thirdBox = generateColor();

    $("#content").html(`
        <div class="container-sm bg-secondary rounded position-absolute top-50 start-50 translate-middle h-100 py-3 d-flex flex-column justify-content-around align-items-center" id="content">
        <p class="h3 text-light" id="color">RGB(${color[0]},${color[1]},${color[2]})</p>
        <div class="box h-25" id="box-1" style="background-color:rgb(${firstBox[0]},${firstBox[1]},${firstBox[2]});"></div>
        <div class="box h-25" id="box-2" style="background-color:rgb(${secondBox[0]},${secondBox[1]},${secondBox[2]});"></div>
        <div class="box h-25" id="box-3" style="background-color:rgb(${thirdBox[0]},${thirdBox[1]},${thirdBox[2]});"></div>
        <button type="button" class="btn btn-info text-light" id="refresh">
          Change colors!
        </button>
        </div>
        `);

    let randomOption = Math.floor(Math.random() * 3) + 1;
    $(`#box-${randomOption}`)
      .css("background-color", `rgb(${color[0]},${color[1]},${color[2]})`)
      .addClass("correct");
  };

  $("#start").click(() => {
    startGame();
  });

  $(document).on("click", "#refresh", () => {
    const color = generateColor();

    $("#color").text(`RGB(${color[0]},${color[1]},${color[2]})`);

    let randomOption = Math.floor(Math.random() * 3) + 1;
    for (let i = 1; i <= 3; i++) {
      if (i === randomOption) {
        $(`#box-${i}`)
          .css("background-color", `rgb(${color[0]},${color[1]},${color[2]})`)
          .addClass("correct")
          .removeClass("false");

        continue;
      }
      let optionColor = generateColor();
      $(`#box-${i}`)
        .css(
          "background-color",
          `rgb(${optionColor[0]},${optionColor[1]},${optionColor[2]})`
        )
        .addClass("false")
        .removeClass("correct");
    }
  });

  $(document).on("click", ".box", (e) => {
    if (e.target.classList.contains("correct")) {
      correctCount++;
      $("#correctCount").text(`True : ${correctCount}`);
    } else {
      falseCount++;
      $("#falseCount").text(`False : ${falseCount}`);
    }
    $("#refresh").click();
    clicks++;
    $("#clickCount").text(`Count : ${clicks}`);
    if (clicks === 10) {
      $("#content").html(`
      <div class="container-sm bg-secondary rounded position-absolute top-50 start-50 translate-middle h-100 py-3 d-flex flex-column justify-content-around align-items-center" id="content">
          <p class="h2 text-white ">Game over!</p>
          <button type="button" class="btn btn-info text-light" id="restart">
          Play again!
        </button>
        </div>
          `);

      $(document).on("click", "#restart", () => {
        startGame();
        $("#correctCount").text(`True : 0`);
        $("#falseCount").text(`False : 0`);
        $("#clickCount").text(`Count : 0`);
      });
    }
  });
});
