document.getElementById('startButton').onclick = function() {
    this.style.display = 'none'; // Hide start button
    document.getElementById('quizForm').style.display = 'block'; // Show quiz form
    startTimer(30, document.getElementById('timer')); // Start timer with 30 seconds
    updateQuestionCounter(1, document.querySelectorAll('.question').length); // Initial question counter
};

let currentQuestionIndex = 0;
const questions = document.querySelectorAll('.question');
const totalQuestions = questions.length;
let timer = 30;

function startTimer(duration, display) {
    timer = duration;
    var interval = setInterval(function () {
        display.textContent = "00:" + (timer < 10 ? "0" + timer : timer);

        if (--timer < 0) {
            clearInterval(interval);
            goToNextQuestion(); // Move to next question when time is up
            if (currentQuestionIndex < totalQuestions) {
                startTimer(duration, display); // Restart timer for next question
            }
        }
    }, 1000);
}

function enableNextButton() {
    document.getElementById('nextButton').style.display = 'inline-block';
}

function goToNextQuestion() {
    if (currentQuestionIndex < totalQuestions - 1) {
        questions[currentQuestionIndex].style.display = 'none';
        currentQuestionIndex++;
        questions[currentQuestionIndex].style.display = 'block';
        updateQuestionCounter(currentQuestionIndex + 1, totalQuestions);
        document.getElementById('nextButton').style.display = 'none'; // Hide next button again
        timer = 30; // Reset timer for the next question
    } else {
        document.getElementById('quizForm').submit(); // Submit the form if it's the last question
    }
}

function updateQuestionCounter(current, total) {
    document.getElementById('questionCounter').textContent = `${current}/${total}`;
}
