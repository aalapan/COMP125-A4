"use strict";
(function () {
    // Function scoped Variables
    var stage;
    var assets;
    var slotMachineBackground;
    var spinButton;
    var bet1Button;
    var bet10Button;
    var bet100Button;
    var betMaxButton;
    var resetButton;
    var exitButton;
    var jackPotLabel;
    var creditLabel;
    var winningsLabel;
    var betLabel;
    var insufficientCreditsLabel;
    var leftReel;
    var middleReel;
    var rightReel;
    var betLine;
    // symbol tallies
    var grapes = 0;
    var bananas = 0;
    var oranges = 0;
    var cherries = 0;
    var bars = 0;
    var bells = 0;
    var sevens = 0;
    var blank = 0;
    var playerCredits = 1000;
    var winnings = 0;
    var jackpot = 2000;
    var playerBet = 0;
    var manifest = [
        { id: "background", src: "./Assets/images/background.png" },
        { id: "banana", src: "./Assets/images/banana.gif" },
        { id: "bars", src: "./Assets/images/bar.gif" },
        { id: "bells", src: "./Assets/images/bell.gif" },
        { id: "bet_line", src: "./Assets/images/bet_line.gif" },
        { id: "bet1Button", src: "./Assets/images/bet1Button.png" },
        { id: "bet10Button", src: "./Assets/images/bet10Button.png" },
        { id: "bet100Button", src: "./Assets/images/bet100Button.png" },
        { id: "betMaxButton", src: "./Assets/images/betMaxButton.png" },
        { id: "resetButton", src: "./Assets/images/resetButton.png" },
        { id: "exitButton", src: "./Assets/images/exitButton.png" },
        { id: "blank", src: "./Assets/images/blank.gif" },
        { id: "cherries", src: "./Assets/images/cherry.gif" },
        { id: "grapes", src: "./Assets/images/grapes.gif" },
        { id: "oranges", src: "./Assets/images/orange.gif" },
        { id: "sevens", src: "./Assets/images/seven.gif" },
        { id: "spinButton", src: "./Assets/images/spinButton.png" },
    ];
    // This function triggers first and "Preloads" all the assets
    function Preload() {
        assets = new createjs.LoadQueue();
        assets.installPlugin(createjs.Sound);
        assets.on("complete", Start);
        assets.loadManifest(manifest);
    }
    // This function triggers after everything has been preloaded
    // This function is used for config and initialization
    function Start() {
        console.log("App Started...");
        var canvas = document.getElementById("canvas");
        stage = new createjs.Stage(canvas);
        createjs.Ticker.framerate = 60; // 60 FPS or 16.667 ms
        createjs.Ticker.on("tick", Update);
        stage.enableMouseOver(20);
        Config.Globals.AssetManifest = assets;
        Main();
    }
    // called every frame
    function Update() {
        stage.update();
    }
    /* Utility function to check if a value falls within a range of bounds */
    function checkRange(value, lowerBounds, upperBounds) {
        if (value >= lowerBounds && value <= upperBounds) {
            return value;
        }
        else {
            return !value;
        }
    }
    /* When this function is called it determines the betLine results.
    e.g. Bar - Orange - Banana */
    function Reels() {
        var betLine = [" ", " ", " "];
        var outCome = [0, 0, 0];
        for (var spin = 0; spin < 3; spin++) {
            outCome[spin] = Math.floor((Math.random() * 110) + 1);
            switch (outCome[spin]) {
                case checkRange(outCome[spin], 1, 30):
                    betLine[spin] = "grapes";
                    grapes++;
                    break;
                case checkRange(outCome[spin], 31, 56):
                    betLine[spin] = "bananas";
                    bananas++;
                    break;
                case checkRange(outCome[spin], 57, 77):
                    betLine[spin] = "oranges";
                    oranges++;
                    break;
                case checkRange(outCome[spin], 78, 93):
                    betLine[spin] = "cherries";
                    cherries++;
                    break;
                case checkRange(outCome[spin], 93, 103):
                    betLine[spin] = "bars";
                    bars++;
                    break;
                case checkRange(outCome[spin], 103, 108):
                    betLine[spin] = "bells";
                    bells++;
                    break;
                case checkRange(outCome[spin], 108, 110):
                    betLine[spin] = "sevens";
                    sevens++;
                    break;
            }
        }
        return betLine;
    }
    function determinePrize() {
        if (blank == 0) {
            if (grapes == 3) {
                winnings = playerBet * 2;
            }
            else if (grapes == 2) {
                winnings = playerBet;
            }
            else if (bananas == 3) {
                winnings = playerBet * 2;
            }
            else if (bananas == 2) {
                winnings = playerBet;
            }
            else if (oranges == 3) {
                winnings = playerBet * 2;
            }
            else if (oranges == 2) {
                winnings = playerBet;
            }
            else if (cherries == 3) {
                winnings = playerBet * 2;
            }
            else if (cherries == 2) {
                winnings = playerBet;
            }
            else if (bars == 3) {
                winnings = playerBet * 5;
            }
            else if (bars == 2) {
                winnings = playerBet * 2;
            }
            else if (bells == 3) {
                winnings = playerBet * 5;
            }
            else if (bells == 2) {
                winnings = playerBet * 2;
            }
            else if (sevens == 3) {
                winnings = jackpot;
            }
            else if (sevens == 2) {
                winnings = playerBet * 10;
            }
            else {
                winnings - playerBet;
            }
            youWonMessage();
        }
        else {
            youLostMessage();
        }
    }
    function buildInterface() {
        // Slot Machine Background
        slotMachineBackground = new Core.GameObject("background", Config.Screen.CENTER_X, Config.Screen.CENTER_Y, true);
        stage.addChild(slotMachineBackground);
        // Buttons
        spinButton = new UIObjects.Button("spinButton", Config.Screen.CENTER_X + 135, Config.Screen.CENTER_Y + 176, true);
        stage.addChild(spinButton);
        bet1Button = new UIObjects.Button("bet1Button", Config.Screen.CENTER_X - 135, Config.Screen.CENTER_Y + 176, true);
        stage.addChild(bet1Button);
        bet10Button = new UIObjects.Button("bet10Button", Config.Screen.CENTER_X - 67, Config.Screen.CENTER_Y + 176, true);
        stage.addChild(bet10Button);
        bet100Button = new UIObjects.Button("bet100Button", Config.Screen.CENTER_X, Config.Screen.CENTER_Y + 176, true);
        stage.addChild(bet100Button);
        betMaxButton = new UIObjects.Button("betMaxButton", Config.Screen.CENTER_X + 67, Config.Screen.CENTER_Y + 176, true);
        stage.addChild(betMaxButton);
        resetButton = new UIObjects.Button("resetButton", Config.Screen.CENTER_X + 300, Config.Screen.CENTER_Y, true);
        stage.addChild(resetButton),
            exitButton = new UIObjects.Button("exitButton", Config.Screen.CENTER_X - 300, Config.Screen.CENTER_Y, true);
        stage.addChild(exitButton),
            // Labels
            jackPotLabel = new UIObjects.Label("2000", "20px", "Consolas", "#FF0000", Config.Screen.CENTER_X, Config.Screen.CENTER_Y - 175, true);
        stage.addChild(jackPotLabel);
        creditLabel = new UIObjects.Label("1000", "20px", "Consolas", "#FF0000", Config.Screen.CENTER_X - 94, Config.Screen.CENTER_Y + 108, true);
        stage.addChild(creditLabel);
        winningsLabel = new UIObjects.Label("0", "20px", "Consolas", "#FF0000", Config.Screen.CENTER_X + 94, Config.Screen.CENTER_Y + 108, true);
        stage.addChild(winningsLabel);
        betLabel = new UIObjects.Label("0", "20px", "Consolas", "#FF0000", Config.Screen.CENTER_X, Config.Screen.CENTER_Y + 108, true);
        stage.addChild(betLabel);
        // Reel GameObjects
        leftReel = new Core.GameObject("blank", Config.Screen.CENTER_X - 79, Config.Screen.CENTER_Y - 12, true);
        stage.addChild(leftReel);
        middleReel = new Core.GameObject("blank", Config.Screen.CENTER_X, Config.Screen.CENTER_Y - 12, true);
        stage.addChild(middleReel);
        rightReel = new Core.GameObject("blank", Config.Screen.CENTER_X + 78, Config.Screen.CENTER_Y - 12, true);
        stage.addChild(rightReel);
        // Bet Line
        betLine = new Core.GameObject("bet_line", Config.Screen.CENTER_X, Config.Screen.CENTER_Y - 12, true);
        stage.addChild(betLine);
    }
    function interfaceLogic() {
        spinButton.on("click", function () {
            winningsLabel.setText("0");
            winnings = 0;
            if (playerBet <= playerCredits) {
                // reel test
                var reels = Reels();
                // example of how to replace the images in the reels
                leftReel.image = assets.getResult(reels[0]);
                middleReel.image = assets.getResult(reels[1]);
                rightReel.image = assets.getResult(reels[2]);
                determinePrize();
                jackPotLabel.setText(jackpot.toString());
            }
            else {
                console.log("Insufficient Credits");
                insufficientCreditsLabel.setText("Insufficient Credits, Reload Credits!");
            }
        });
        bet1Button.on("click", function () {
            if (playerBet <= playerCredits) {
                playerBet += 1;
                console.log("Bet amount:" + playerBet);
                betLabel.setText(playerBet.toString());
            }
            else {
                console.log("Insufficient Credits");
                insufficientCreditsLabel.setText("Insufficient Credits, Reload Credits!");
            }
        });
        bet10Button.on("click", function () {
            if (playerBet <= playerCredits) {
                playerBet += 10;
                console.log("Bet amount:" + playerBet);
                betLabel.setText(playerBet.toString());
            }
            else {
                console.log("Insufficient Credits");
                insufficientCreditsLabel.setText("Insufficient Credits, Reload Credits!");
            }
        });
        bet100Button.on("click", function () {
            if (playerBet <= playerCredits) {
                playerBet += 100;
                console.log("Bet amount:" + playerBet);
                betLabel.setText(playerBet.toString());
            }
            else {
                console.log("Insufficient Credits");
                insufficientCreditsLabel.setText("Insufficient Credits, Reload Credits!");
            }
        });
        betMaxButton.on("click", function () {
            if (playerBet <= playerCredits) {
                playerBet = playerCredits;
                console.log("Bet amount:" + playerBet);
                betLabel.setText(playerBet.toString());
            }
            else {
                console.log("Insufficient Credits");
                insufficientCreditsLabel.setText("Insufficient Credits, Reload Credits!");
            }
        });
        resetButton.on("click", function () {
            resetButtonClicked();
        });
        exitButton.on("click", function () {
            exitButtonClicked();
        });
    }
    function youWonMessage() {
        playerCredits - playerBet;
        playerCredits += winnings;
        console.log("Congratulations! You won:" + winnings);
        winningsLabel.setText(winnings.toString());
        creditLabel.setText(playerCredits.toString());
    }
    function youLostMessage() {
        playerCredits - playerBet;
        console.log("Sorry! Better luck next time!");
        winningsLabel.setText(winnings.toString());
        creditLabel.setText(playerCredits.toString());
    }
    function resetButtonClicked() {
        playerCredits = 1000;
        winnings = 0;
        jackpot = 5000;
        playerBet = 0;
        creditLabel.setText(playerCredits.toString());
        winningsLabel.setText("0");
        jackPotLabel.setText(jackpot.toString());
        betLabel.setText("0");
        leftReel.image = assets.getResult("blank");
        middleReel.image = assets.getResult("blank");
        rightReel.image = assets.getResult("blank");
    }
    function exitButtonClicked() {
        window.close();
    }
    // app logic goes here
    function Main() {
        buildInterface();
        interfaceLogic();
        resetButtonClicked();
    }
    window.addEventListener("load", Preload);
})();
