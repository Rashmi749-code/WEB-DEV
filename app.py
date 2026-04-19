from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

# Quiz Data: List of dictionaries
QUIZ_DATA = [
    {"id": 1, "question": "What does HTML stand for?", 
     "options": ["Hyper Text Markup Language", "High Tech Modern Language", "Hyperlink and Text Management"], "answer": "Hyper Text Markup Language"},
    {"id": 2, "question": "Which language is primarily used for styling web pages?", 
     "options": ["Python", "CSS", "SQL"], "answer": "CSS"},
    {"id": 3, "question": "What is the default port for Flask?", 
     "options": ["8080", "3000", "5000"], "answer": "5000"},
    {"id": 4, "question": "Which of these is a Python Framework?", 
     "options": ["React", "Flask", "Laravel"], "answer": "Flask"},
    {"id": 5, "question": "Inside which HTML element do we put the JavaScript?", 
     "options": ["<js>", "<scripting>", "<script>"], "answer": "<script>"}
]

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/quiz')
def quiz():
    return render_template('quiz.html', quiz=QUIZ_DATA)

@app.route('/submit', methods=['POST'])
def submit():
    score = 0
    total = len(QUIZ_DATA)
    
    for q in QUIZ_DATA:
        # Get the user's selected answer based on question ID
        user_answer = request.form.get(str(q['id']))
        if user_answer == q['answer']:
            score += 1
            
    # Logic for feedback message
    if score == total:
        feedback = "Excellent! You're a Web Master."
    elif score >= 3:
        feedback = "Good job! Keep practicing."
    else:
        feedback = "Keep learning! Better luck next time."
        
    return render_template('result.html', score=score, total=total, feedback=feedback)

if __name__ == '__main__':
    app.run(debug=True)