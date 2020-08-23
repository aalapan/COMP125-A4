(function(){
    // Function scoped Variables
    let stage: createjs.Stage;
    let assets: createjs.LoadQueue;
    let slotMachineBackground: Core.GameObject;

    let spinButton: UIObjects.Button;
    let bet1Button: UIObjects.Button;
    let bet10Button: UIObjects.Button;
    let bet100Button: UIObjects.Button;
    let betMaxButton: UIObjects.Button;
    let resetButton: UIObjects.Button;
    let exitButton: UIObjects.Button;

    let jackPotLabel: UIObjects.Label;
    let creditLabel: UIObjects.Label;
    let winningsLabel: UIObjects.Label;
    let betLabel: UIObjects.Label;
    let insufficientCreditsLabel: UIObjects.Label;

    let leftReel: Core.GameObject;
    let middleReel: Core.GameObject;
    let rightReel: Core.GameObject;
    let betLine: Core.GameObject;

    // symbol tallies
    let grapes = 0;
    let bananas = 0;
    let oranges = 0;
    let cherries = 0;
    let bars = 0;
    let bells = 0;
    let sevens = 0;
    let blank = 0;

    let playerCredits = 1000;
    let winnings = 0;
    let jackpot = playerCredits*25;
    let playerBet = 0;


    let manifest: Core.Item[] = [
        {id:"background", src:"./Assets/images/background.png"},
        {id:"banana", src:"./Assets/images/banana.gif"},
        {id:"bars", src:"./Assets/images/bar.gif"},
        {id:"bells", src:"./Assets/images/bell.gif"},
        {id:"bet_line", src:"./Assets/images/bet_line.gif"},
        {id:"bet1Button", src:"./Assets/images/bet1Button.png"},
        {id:"bet10Button", src:"./Assets/images/bet10Button.png"},
        {id:"bet100Button", src:"./Assets/images/bet100Button.png"},
        {id:"betMaxButton", src:"./Assets/images/betMaxButton.png"},
        {id:"resetButton", src:"./Assets/images/resetButton.png"},
        {id:"exitButton", src:"./Assets/images/exitButton.png"},
        {id:"blank", src:"./Assets/images/blank.gif"},
        {id:"cherries", src:"./Assets/images/cherry.gif"},
        {id:"grapes", src:"./Assets/images/grapes.gif"},
        {id:"oranges", src:"./Assets/images/orange.gif"},
        {id:"sevens", src:"./Assets/images/seven.gif"},
        {id:"spinButton", src:"./Assets/images/spinButton.png"},
    ];   

    // This function triggers first and "Preloads" all the assets
    function Preload()
    {
        assets = new createjs.LoadQueue();
        assets.installPlugin(createjs.Sound);
        assets.on("complete", Start);

        assets.loadManifest(manifest);
    }

    // This function triggers after everything has been preloaded
    // This function is used for config and initialization
    function Start():void
    {
        console.log("App Started...");
        let canvas = document.getElementById("canvas") as HTMLCanvasElement;
        stage = new createjs.Stage(canvas);
        createjs.Ticker.framerate = 60; // 60 FPS or 16.667 ms
        createjs.Ticker.on("tick", Update);

        stage.enableMouseOver(20);

        Config.Globals.AssetManifest = assets;

        Main();
    }

    // called every frame
    function Update():void
    {
        stage.update();
    }

    /* Utility function to check if a value falls within a range of bounds */
    function checkRange(value:number, lowerBounds:number, upperBounds:number):number | boolean {
        if (value >= lowerBounds && value <= upperBounds)
        {
            return value;
        }
        else {
            return !value;
        }
    }

    //random reels
    function Reels():string[] {
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
                    betLine[spin] ="bananas";
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

    //determine prize based on reels outcome
    function determinePrize():void
    {   if(blank ==0){
        if (grapes == 3) {
            winnings = playerBet * 2;
            }
        else if(grapes == 2) {
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
            winnings = playerBet * 5;
            }
        else {
            winnings - playerBet;
        }
            youWonMessage();
        }
        else
        {
            youLostMessage();
        }
    }

    //build interface
    function buildInterface():void
    {
        // Slot Machine Background
        slotMachineBackground = new Core.GameObject("background", Config.Screen.CENTER_X, Config.Screen.CENTER_Y, true );
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

        resetButton = new UIObjects.Button("resetButton", Config.Screen.CENTER_X+300, Config.Screen.CENTER_Y, true);
        stage.addChild(resetButton),

        exitButton = new UIObjects.Button("exitButton", Config.Screen.CENTER_X-300, Config.Screen.CENTER_Y, true);
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

    //add functionalities to button
    function interfaceLogic():void
    {

         spinButton.on("click", ()=>{

            winningsLabel.setText("0");
            winnings = 0;
            if (playerBet <= playerCredits)
                {
                // reel test
                let reels = Reels();
    
                // example of how to replace the images in the reels
                leftReel.image = assets.getResult(reels[0]) as HTMLImageElement;
                middleReel.image = assets.getResult(reels[1]) as HTMLImageElement;
                rightReel.image = assets.getResult(reels[2]) as HTMLImageElement;
                determinePrize();

                jackPotLabel.setText(jackpot.toString());
                }
                else
                {
                console.log("Insufficient Credits");
                insufficientCreditsLabel.setText("Insufficient Credits, Reload Credits!");         
                }
        });

        bet1Button.on("click", ()=>{
            if (playerBet <= playerCredits)
            {
                playerBet += 1;
                console.log("Bet amount:" + playerBet);
                betLabel.setText(playerBet.toString());
            }
            else
            {
                console.log("Insufficient Credits");
                insufficientCreditsLabel.setText("Insufficient Credits, Reload Credits!");
            }    
        });

        bet10Button.on("click", ()=>{
            if (playerBet <= playerCredits)
            {
                playerBet += 10;
                console.log("Bet amount:" + playerBet);
                betLabel.setText(playerBet.toString());
            }
            else
            {
                console.log("Insufficient Credits");
                insufficientCreditsLabel.setText("Insufficient Credits, Reload Credits!");
            }    
        });

        bet100Button.on("click", ()=>{
            if (playerBet <= playerCredits)
            {
                playerBet += 100;
                console.log("Bet amount:" + playerBet);
                betLabel.setText(playerBet.toString());
            }
            else
            {
                console.log("Insufficient Credits");
                insufficientCreditsLabel.setText("Insufficient Credits, Reload Credits!");
            }    
        });

        betMaxButton.on("click", ()=>{
            if (playerBet <= playerCredits)
            {
                playerBet = playerCredits;
                console.log("Bet amount:" + playerBet);
                betLabel.setText(playerBet.toString());
            }
            else
            {
                console.log("Insufficient Credits");
                insufficientCreditsLabel.setText("Insufficient Credits, Reload Credits!");
            }    
        });

        resetButton.on("click", ()=>{
            resetButtonClicked();
        });

        exitButton.on("click", ()=>{
            exitButtonClicked();
        });
    }

    //you won
    function youWonMessage():void
    {
        playerCredits -= playerBet;
        playerCredits += winnings;

        console.log("Congratulations! You won:"  + winnings);
 
        winningsLabel.setText(winnings.toString());
        creditLabel.setText(playerCredits.toString());
    }

    //you lost
    function youLostMessage():void
    {
        playerCredits -= playerBet;

        console.log("Sorry! Better luck next time!");
 
        winningsLabel.setText(winnings.toString());
        creditLabel.setText(playerCredits.toString());
    }

    //reset button
    function resetButtonClicked():void
    {
        playerCredits = 1000;
        winnings = 0;
        jackpot = playerCredits * 25;
        playerBet = 0;

        creditLabel.setText(playerCredits.toString());
        winningsLabel.setText("0");
        jackPotLabel.setText(jackpot.toString());
        betLabel.setText("0");


        leftReel.image = assets.getResult("blank") as HTMLImageElement;
        middleReel.image = assets.getResult("blank") as HTMLImageElement;
        rightReel.image = assets.getResult("blank") as HTMLImageElement;
    }
    //exit button
    function exitButtonClicked():void
    {
        window.close();
    }

    function jackPotLabelUpdate():void
    {
        jackpot=playerCredits*25;
        jackPotLabel.setText(jackpot.toString());
    }

    // app logic goes here
    function Main():void
    {
        buildInterface();
        interfaceLogic();
        resetButtonClicked();   
        jackPotLabelUpdate();
       
    }

    window.addEventListener("load", Preload);
})();