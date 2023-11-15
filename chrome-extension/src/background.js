// When the extension is installed or upgraded ...
chrome.runtime.onInstalled.addListener(function () {
    // Replace all rules ...
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
        // With a new rule ...
        chrome.declarativeContent.onPageChanged.addRules([
            {
                conditions: [
                    new chrome.declarativeContent.PageStateMatcher({
                        pageUrl: {hostContains: 'github.com'}
                    })
                ],
                // And shows the extension's page action.
                actions: [new chrome.declarativeContent.ShowPageAction()]
            }
        ]);
    });
});

chrome.pageAction.onClicked.addListener(function (event) {
    //console.log("Page action:", event);
    lgtm();
});

chrome.commands.onCommand.addListener(function (command) {
    //console.log('Command:', command);
    lgtm(command);
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    // console.log("message received", message);
    if (message.action === 'loadLgtm') {
        loadLgtm(function (lgtmResponse) {
            var payload = {action: 'initiate', type: message.type, lgtm: lgtmResponse};
            sendMessage(payload);
        })
    }
});

function lgtm(command) {
    var payload = {action: 'initiate', type: command ? command : 'lgtm'};
     console.log('sending', payload);
    sendMessage(payload);
}

function sendMessage(payload) {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        if(tabs[0]) chrome.tabs.sendMessage(tabs[0].id, payload);
    });
}

function loadLgtm(callback) {
    callback(getRandomGif());
}

function getRandomGif() {
    var items = [
        "![Palpatine Well Done](https://media1.giphy.com/media/9g8PH1MbwTy4o/giphy.gif?cid=47028fa81rda1t2f7b12e0cyh0rlj4hnehstygaulemz4h55&ep=v1_gifs&rid=giphy.gif&ct=g)",
        "![Simon Well Done Reaction](https://media2.giphy.com/media/LSW7SaO8wCrTipmekG/giphy.gif?cid=47028fa81rda1t2f7b12e0cyh0rlj4hnehstygaulemz4h55&ep=v1_gifs&rid=giphy.gif&ct=g)",
        "![Dog LGTM](https://media4.giphy.com/media/eM0U5NQtVHu30VM5sS/giphy.gif?cid=47028fa81rda1t2f7b12e0cyh0rlj4hnehstygaulemz4h55&ep=v1_gifs&rid=giphy.gif&ct=g)",
        "![Horse Head Thumb](https://media1.giphy.com/media/8RxCFgu88jUbe/giphy.gif?cid=47028fa81rda1t2f7b12e0cyh0rlj4hnehstygaulemz4h55&ep=v1_gifs&rid=giphy.gif&ct=g)",
        "![Horse Head Thumb](https://media1.giphy.com/media/8RxCFgu88jUbe/giphy.gif?cid=47028fa81rda1t2f7b12e0cyh0rlj4hnehstygaulemz4h55&ep=v1_gifs&rid=giphy.gif&ct=g)",
        "![Jim](https://media4.giphy.com/media/1u0TnBxIgCEn1P5f7g/giphy.gif?cid=47028fa81rda1t2f7b12e0cyh0rlj4hnehstygaulemz4h55&ep=v1_gifs&rid=giphy.gif&ct=g)",
        "![You've Got LGTM](https://media0.giphy.com/media/W7K4C2BnqqafLhHwpX/giphy.gif?cid=47028fa81rda1t2f7b12e0cyh0rlj4hnehstygaulemz4h55&ep=v1_gifs&rid=giphy.gif&ct=g)",
        "![You Are The Best Thumbs Up](https://media1.giphy.com/media/XE1cLqA94WFTOWqfn1/giphy-downsized-medium.gif?cid=47028fa81rda1t2f7b12e0cyh0rlj4hnehstygaulemz4h55&ep=v1_gifs&rid=giphy-downsized-medium.gif&ct=g)",
        "![Obama Very Good GIF](https://media3.giphy.com/media/E6LPrrzKOJwhG/giphy.gif?cid=47028fa81rda1t2f7b12e0cyh0rlj4hnehstygaulemz4h55&ep=v1_gifs&rid=giphy.gif&ct=g)",
        "![Bill Murray LGTM](https://media4.giphy.com/media/LMEVGVZTnEI4nZaP81/giphy.gif?cid=47028fa81rda1t2f7b12e0cyh0rlj4hnehstygaulemz4h55&ep=v1_gifs&rid=giphy.gif&ct=g)",
        "![Rad LGTM](https://media1.giphy.com/media/KcoVEBAl4H6rnJRPjI/giphy.gif?cid=47028fa81rda1t2f7b12e0cyh0rlj4hnehstygaulemz4h55&ep=v1_gifs&rid=giphy.gif&ct=g)",
        "![NASA LGTM](https://media2.giphy.com/media/MUKtQ1aRXwkO8ntpfg/giphy.gif?cid=47028fa81rda1t2f7b12e0cyh0rlj4hnehstygaulemz4h55&ep=v1_gifs&rid=giphy.gif&ct=g)",
        "![Pizza Guy Thumb](https://media0.giphy.com/media/QyrysGo7Hz70I/giphy.gif?cid=47028fa81rda1t2f7b12e0cyh0rlj4hnehstygaulemz4h55&ep=v1_gifs&rid=giphy.gif&ct=g)",
        "![Great Job Barney](https://media4.giphy.com/media/xHMIDAy1qkzNS/giphy.gif?cid=47028fa81rda1t2f7b12e0cyh0rlj4hnehstygaulemz4h55&ep=v1_gifs&rid=giphy.gif&ct=g)",
        "![Titanic Ship](https://media2.giphy.com/media/Hw8vYF4DNRCKY/giphy.gif?cid=47028fa81rda1t2f7b12e0cyh0rlj4hnehstygaulemz4h55&ep=v1_gifs&rid=giphy.gif&ct=g)",
        "![Scarlett Johansson Thumbs Up](https://media3.giphy.com/media/7rKgR0TWdoHrW/giphy.gif?cid=47028fa81rda1t2f7b12e0cyh0rlj4hnehstygaulemz4h55&ep=v1_gifs&rid=giphy.gif&ct=g)",
        "![Happy Donald Glover](https://media4.giphy.com/media/l2R0dZTDEZ9rS2O6k/giphy.gif?cid=47028fa81rda1t2f7b12e0cyh0rlj4hnehstygaulemz4h55&ep=v1_gifs&rid=giphy.gif&ct=g)",
        "![Cookie Monster](https://media1.giphy.com/media/BNIzysgbLQZEf73HG0/giphy.gif?cid=47028fa81rda1t2f7b12e0cyh0rlj4hnehstygaulemz4h55&ep=v1_gifs&rid=giphy.gif&ct=g)",
        "![Yoda Very Good](https://media2.giphy.com/media/3ohuAnWilO3JcRtCMw/giphy.gif?cid=47028fa81rda1t2f7b12e0cyh0rlj4hnehstygaulemz4h55&ep=v1_gifs&rid=giphy.gif&ct=g)",
        "![Crocodile Hunter Yes](https://media3.giphy.com/media/k2bbmbmvUo7gA/giphy.gif?cid=47028fa81rda1t2f7b12e0cyh0rlj4hnehstygaulemz4h55&ep=v1_gifs&rid=giphy.gif&ct=g)",
        "![Community Thumbs Up](https://media2.giphy.com/media/NDjtmyXAAUWKQ/giphy.gif?cid=47028fa81rda1t2f7b12e0cyh0rlj4hnehstygaulemz4h55&ep=v1_gifs&rid=giphy.gif&ct=g)",
        "![Stephen Merchant](https://media2.giphy.com/media/lFlZd7ZmoUqVa/giphy.gif?cid=47028fa81rda1t2f7b12e0cyh0rlj4hnehstygaulemz4h55&ep=v1_gifs&rid=giphy.gif&ct=g)",
        "![Stanley Thumb](https://media2.giphy.com/media/VIjf1GqRSbf0OsNG0H/giphy.gif?cid=47028fa81rda1t2f7b12e0cyh0rlj4hnehstygaulemz4h55&ep=v1_gifs&rid=giphy.gif&ct=g)",
        "![Chuck Norris Thumbs Up](https://media2.giphy.com/media/oBPOP48aQpIxq/giphy.gif?cid=47028fa81rda1t2f7b12e0cyh0rlj4hnehstygaulemz4h55&ep=v1_gifs&rid=giphy.gif&ct=g)",
        "![Happy Big Bang](https://media2.giphy.com/media/3osxYdek8wYWCOLgT6/giphy.gif?cid=47028fa81rda1t2f7b12e0cyh0rlj4hnehstygaulemz4h55&ep=v1_gifs&rid=giphy.gif&ct=g)",
        "![BB8 Thumbs Up](https://media0.giphy.com/media/2cRLQokbuIWB7YTGVt/giphy.gif?cid=47028fa81rda1t2f7b12e0cyh0rlj4hnehstygaulemz4h55&ep=v1_gifs&rid=giphy.gif&ct=g)",
        "![Shaun The Sheep](https://media2.giphy.com/media/tIeCLkB8geYtW/giphy.gif?cid=47028fa81rda1t2f7b12e0cyh0rlj4hnehstygaulemz4h55&ep=v1_gifs&rid=giphy.gif&ct=g)",
        "![Community Thumbs Up](https://media4.giphy.com/media/FufPwnJGp6lGwNyqXr/giphy.gif?cid=47028fa81rda1t2f7b12e0cyh0rlj4hnehstygaulemz4h55&ep=v1_gifs&rid=giphy.gif&ct=g)"
    ]
    return items[Math.floor(Math.random()*items.length)];
}
