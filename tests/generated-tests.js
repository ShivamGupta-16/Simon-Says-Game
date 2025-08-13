```javascript
describe("Simon Game Test Suite", () => {
  beforeEach(() => {
    // Mock DOM elements for testing
    document.body.innerHTML = `
      <h2>Level 0</h2>
      <h3>Your Highesh Score:<b>0</b></h3>
      <button class="btn yellow" id="yellow"></button>
      <button class="btn red" id="red"></button>
      <button class="btn green" id="green"></button>
      <button class="btn blue" id="blue"></button>
    `;
    gameSeq = [];
    userSeq = [];
    highestScore = 0;
    started = false;
    level = 0;
    h2 = document.querySelector('h2');
    h3 = document.querySelector('h3');
    allBtns = document.querySelectorAll(".btn");
    for (btn of allBtns) {
      btn.addEventListener("click", btnPress);
    }

  });

  it("should start the game on keypress", () => {
    spyOn(console, 'log');
    document.dispatchEvent(new KeyboardEvent('keypress'));
    expect(started).toBe(true);
    expect(console.log).toHaveBeenCalledWith("game is started");
    expect(level).toBe(1);
  });

  it("should correctly update level and score", () => {
    document.dispatchEvent(new KeyboardEvent('keypress'));
    expect(h2.innerText).toBe("Level 1");
    expect(h3.innerHTML).toBe("Your Highesh Score:<b>0</b>");

    //Simulate a correct sequence of 2 moves
    document.getElementById("yellow").click();
    document.getElementById("red").click();
    expect(level).toBe(2);
    expect(h2.innerText).toBe("Level 2");
    expect(h3.innerHTML).toBe("Your Highesh Score:<b>2</b>");
  });


  it("should handle incorrect answer", () => {
    document.dispatchEvent(new KeyboardEvent('keypress')); // Start the game
    document.getElementById("yellow").click(); //Correct
    document.getElementById("blue").click(); //Incorrect - should be red

    expect(h2.innerHTML).toContain("Game Over!");
    expect(document.querySelector("body").style.backgroundColor).toBe("red");
  });

  it("should reset the game after game over", () => {
    document.dispatchEvent(new KeyboardEvent('keypress'));
    document.getElementById("yellow").click();
    document.getElementById("blue").click(); // Incorrect
    expect(started).toBe(false);
    expect(level).toBe(0);
    expect(gameSeq.length).toBe(0);
    expect(userSeq.length).toBe(0);
  });

  it("should handle multiple levels correctly", () => {
    document.dispatchEvent(new KeyboardEvent('keypress'));
    document.getElementById("yellow").click();
    document.getElementById("red").click();
    document.getElementById("green").click();
    expect(level).toBe(3);
  });
});
```