
const userAnswers = {};

const answers = {
    q1: "Only for half an hour.",
    q2: "We can't decide.",
    q3: "Would you like some help?",
    q4: "I'll just check for you.",
    q5: "I'm too tired.",
    q6: "so",
    q7: "once",
    q8: "edge",
    q9: "mean",
    q10: "with"
};


document.querySelectorAll('.option-button').forEach(button => {
    button.addEventListener('click', function () {
        const questionId = this.closest('.question').getAttribute('data-question-id');
        userAnswers[`q${questionId}`] = this.textContent;


        this.parentElement.querySelectorAll('.option-button').forEach(btn => btn.classList.remove('selected'));
        this.classList.add('selected');
    });
});


function submitTest() {
    const resultsGrid = document.getElementById('results');
    resultsGrid.innerHTML = '';
    let correctAnswersCount = 0;

    for (let i = 1; i <= 10; i++) {
        const userAnswer = userAnswers[`q${i}`];
        const correct = userAnswer === answers[`q${i}`];

        if (correct) correctAnswersCount++;

        const resultItem = document.createElement('div');
        resultItem.innerHTML = `
            <div>${i}</div>
            <img src="${correct ? 'truepic.png' : 'falsepic.png'}" alt="${correct ? 'Correct' : 'Incorrect'}">
        `;
        resultsGrid.appendChild(resultItem);
    }

    const proficiencyText = document.createElement('div');
    let proficiencyLevel = '';

    if (correctAnswersCount >= 8) {
        proficiencyLevel = 'Advanced';
    } else if (correctAnswersCount >= 5) {
        proficiencyLevel = 'Intermediate';
    } else {
        proficiencyLevel = 'Beginner';
    }

    proficiencyText.innerHTML =
        `
        <h3>Your Level: ${proficiencyLevel}</h3>
       
    `
        ;
    resultsGrid.appendChild(proficiencyText);

    document.getElementById('test-box').classList.add('hidden');
    document.getElementById('result-box').classList.remove('hidden');
}


function replayTest() {
    document.getElementById('result-box').classList.add('hidden');
    document.getElementById('test-box').classList.remove('hidden');
}


function goToSignUp() {
    window.location.href = 'signUp.html';
}
