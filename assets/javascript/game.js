$(document).ready(function () {
    let compScore
    let playerScore = 0
    let wins = 0
    let losses = 0
    let gem1val
    let gem2val
    let gem3val
    let gem4val
    let soundEffect = new Audio("assets/audio/gemEffect.wav")

    function randomNum() {
        //(max - min + 1(gets rid of 0)) + min
        compScore = Math.floor(Math.random() * 120 - 19 + 1) + 19
        // gem1val = Math.floor(Math.random() * 12 + 1)
        assignRandomValues()
    }
    //gem values will never be the identical
    function assignRandomValues() {
        const possibleValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

        gem1val = getRandomIndex(possibleValues)
        gem2val = getRandomIndex(possibleValues)
        gem3val = getRandomIndex(possibleValues)
        gem4val = getRandomIndex(possibleValues)
    }

    function getRandomIndex(array) {
        return array.splice(Math.floor(Math.random() * array.length), 1)
    }

    function newGame() {
        randomNum()
        playerScore = 0
        $("#compScore").text(compScore)
        $("#playerScore").text(playerScore)
        $("#gem1").attr("data-gemVal", gem1val)
        $("#gem2").attr("data-gemVal", gem2val)
        $("#gem3").attr("data-gemVal", gem3val)
        $("#gem4").attr("data-gemVal", gem4val)
        $("#wins").text(wins);
        $("#losses").text(losses)
    }

    newGame()

    //updates player score, wins & losses counter
    $(".gemImage").on("click", function () {
        soundEffect.play()

        if (playerScore >= compScore) {
            return
        }
        let gemVal = $(this).attr("data-gemVal")
        gemVal = parseInt(gemVal)
        playerScore += gemVal
        $("#playerScore").text(playerScore)

        if (playerScore === compScore) {
            wins++
            $("#wins").text(wins);
            newGame()
        } else if (playerScore > compScore) {
            losses++
            $("#losses").text(losses);
            newGame()
        }

        //randomize gem images
        var maindiv = $("#gemstones");
        var divs = maindiv.children();
        while (divs.length) {
            let randomIndex = Math.floor(Math.random() * divs.length)
            let child = divs.splice(randomIndex, 1)
            maindiv.append(child)
        }
    })

    //gem hover function
    $(".gemImage").hover(function () {
        $(this).css({ opacity: 0.5 })
    }, function () {
        $(this).css({ opacity: 1 })
    })

    //reset for new game
    $("#resetButton").on("click", function () {
        wins = 0
        losses = 0
        newGame()

    })

})


