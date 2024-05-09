from flask import Flask, jsonify, request, render_template
import json
import random
app = Flask(__name__, template_folder='templates')

def load_questions():
    with open('data/questions.json', 'r') as file:
        questions = json.load(file)
    random.shuffle(questions)  # Shuffle the list in place
    return questions[:10]

# Updated mock database of questions and MCQ answers
questions =load_questions()
@app.route('/')
def index():
    return render_template('index.html', questions=questions)


@app.route('/submit', methods=['POST'])
def submit():
    answers = request.form
    score = 0
    for question in questions:
        submitted_answer = answers.get(str(question['id']), '').strip().lower()
        correct_answer = question['answer'].strip().lower()
        print(f"Question ID: {question['id']}, Submitted Answer: {submitted_answer}, Correct Answer: {correct_answer}")  # Debugging statement
        if submitted_answer == correct_answer:
            score += 1
    print(f"Score: {score}")  # Debugging statement
    return render_template('result.html', score=score, total=len(questions))



if __name__ == '__main__':
    app.run(debug=True)
