

const buttonRedact = document.getElementById('btn_redact');



buttonRedact.addEventListener('click', function () {
    const wordsToScramble = document.getElementById("scrambled").value.split(/[\s,]+/);
    const textToRedact = document.getElementById("text_box").value;
    const scramble = document.getElementById("asterisks").value || '*';


    let redactedText = textToRedact;
    let wordsScanned = 0;
    let wordsMatched = 0;
    let characterScrambled = 0;

    wordsToScramble.forEach((word) => {
        const regex = new RegExp(`\\b${word}\\b`, "gi");
        redactedText = redactedText.replace(regex, (match) => {

            wordsScanned = textToRedact.trim().split(/\s+/).length;
            if (match.toLowerCase() === word.toLowerCase() && scramble.length > 1) {
                wordsMatched++;
                characterScrambled += match.length;
                return scramble;
            } else if (
                match.toLowerCase() === word.toLowerCase() &&
                scramble.length === 1
            ) {
                wordsMatched++;
                characterScrambled += match.length;
                return scramble.repeat(match.length);
            } else {
                return match;
            }
        });
    });

    
    document.getElementById("sn").innerHTML = `${wordsScanned}`;
    document.getElementById("wm").innerHTML = `${wordsMatched}`;
    document.getElementById("cs").innerHTML = `${characterScrambled}`;


    document.getElementById("redactedOutput").innerHTML = `<div class="redactedText" id="redactedOutput">${redactedText}</div>`;
});


