const start = document.getElementById('start');
const Modal_staticBackdrop1 = document.getElementById('staticBackdrop1');
const Modal_staticBackdrop2 = document.getElementById('staticBackdrop2');
const quiztion_item = document.querySelector('.quiztion');
const start_paly = document.getElementById('start_paly');
const cust = document.querySelector('.custom');
const close_model3 = document.getElementById('close-model3');
const next = document.getElementById('next');
const From = document.getElementById('From');
const To = document.getElementById('To');
const time = document.getElementById('time');
const from_curect = document.getElementById("from-curect");
const to_curect = document.getElementById("to-curect");
const restarted = document.getElementById('restart');
const slider = document.getElementById('slider');
const range_quiz = document.getElementById('range-quiz');
const timeSleepAnimat = document.querySelector('#timeSleepAnimat div div');
const curect_voice = new Audio('vois/currect.wav');
const error_voice = new Audio('vois/error.mp3');
const done_voice = new Audio('https://assets.codepen.io/1256430/whistle.mp3');
let timerInterval;
let index_item = 0;
let timer;
let curect = 0;
let rangeQuiztion = 5;

window.onload = () => {
    slider.setAttribute('max', quiztion_random.length);
}
slider.addEventListener('input', () => {
    range_quiz.textContent = slider.value;
    rangeQuiztion = slider.value;
})
start_paly.addEventListener('click', () => { startQuiz(index_item); });
close_model3.addEventListener('click', CloseModal3);
Modal_staticBackdrop2.querySelector('.btn-close').addEventListener('click', CloseModal3);
restarted.addEventListener('click', resetQuiz);
next.onclick = () => { startQuiz(index_item) };
function startQuiz(index) {
    curect_voice.currentTime = 0;
    curect_voice.pause();
    error_voice.currentTime = 0;
    error_voice.pause();

    cust.classList.add('modal-backdrop', 'fade', 'show');
    clearInterval(timerInterval);
    timer = 15;
    timeSleepAnimat.style.animation = 'none'
    timeSleepAnimat.offsetWidth;
    timeSleepAnimat.style.animation = 'timeSleep 15s  linear'

    next.style.pointerEvents = 'none';
    quiztion_item.innerHTML = `
        <span class="">${quiztion_random[index].quis}</span>
        <div class="quiz-item">${quiztion_random[index].options[0]} ${quiztion_random[index].options[0].replace(/(&lt;|&gt;)/g, '') == quiztion_random[index].answer.replace(/(<|>)/g, '') ? '<i class="bi bi-check-circle icon"></i>' : '<i class="bi bi-x-circle icon"></i>'}</div>
        <div class="quiz-item">${quiztion_random[index].options[1]} ${quiztion_random[index].options[1].replace(/(&lt;|&gt;)/g, '') == quiztion_random[index].answer.replace(/(<|>)/g, '') ? '<i class="bi bi-check-circle icon"></i>' : '<i class="bi bi-x-circle icon"></i>'}</div>
        <div class="quiz-item">${quiztion_random[index].options[2]} ${quiztion_random[index].options[2].replace(/(&lt;|&gt;)/g, '') == quiztion_random[index].answer.replace(/(<|>)/g, '') ? '<i class="bi bi-check-circle icon"></i>' : '<i class="bi bi-x-circle icon"></i>'}</div>
        <div class="quiz-item">${quiztion_random[index].options[3]} ${quiztion_random[index].options[3].replace(/(&lt;|&gt;)/g, '') == quiztion_random[index].answer.replace(/(<|>)/g, '') ? '<i class="bi bi-check-circle icon"></i>' : '<i class="bi bi-x-circle icon"></i>'}</div>
    `;
    From.textContent = index + 1;
    To.textContent = rangeQuiztion ?? 5;
    const quiz_item = quiztion_item.querySelectorAll('.quiz-item')

    quiz_item.forEach(item => {

        item.addEventListener('click', () => {
            item.querySelector('.icon').classList.add('active');
            item.textContent.trim() == quiztion_random[index].answer.trim() ? [item.classList.add('true'), curect++, curect_voice.play()] : [item.classList.add('false'), window.navigator.platform.includes('Win') ? error_voice.play() : window.navigator.vibrate[200]];
            quiz_item.forEach(item => {
                item.style.pointerEvents = 'none';
                item.textContent.trim() == quiztion_random[index].answer.trim() ? [item.querySelector('.icon').classList.add('active'), item.classList.add('true')] : false;
            });
            next.style.pointerEvents = 'auto';

        })
    });
    startTimer();

    if (index_item >= rangeQuiztion - 1) {
        next.onclick = null;
        next.textContent = 'إنهاء';
        next.setAttribute('data-bs-toggle', 'modal');
        next.setAttribute('data-bs-target', '#staticBackdrop2');
        next.addEventListener('click', closeModal);
        next.classList.add('done');
        start.removeAttribute('data-bs-toggle');
        start.removeAttribute('data-bs-target');
        start.addEventListener('click', resetQuiz);

    }
    index_item++;
}

function startTimer() {
    time.textContent = timer;
    timerInterval = setInterval(() => {
        timer--;
        time.textContent = timer;
        if (timer <= 0) {
            if (index_item >= rangeQuiztion) {
                next.onclick = null;
                closeModal();
                start.removeAttribute('data-bs-toggle');
                start.removeAttribute('data-bs-target');
                Modal_staticBackdrop2.removeAttribute('aria-hidden')
                Modal_staticBackdrop2.setAttribute('data-bs-backdrop', 'static');
                Modal_staticBackdrop2.setAttribute('aria-modal', 'true');
                Modal_staticBackdrop2.setAttribute('role', 'dialog');
                Modal_staticBackdrop2.setAttribute('style', 'display: block;');
                start.addEventListener('click', resetQuiz);
                clearInterval(timerInterval);
            } else {
                clearInterval(timerInterval);
                startQuiz(index_item);
            }

        }
    }, 1000)

}

function resetQuiz() {
    quiztion_item.innerHTML = '';
    index_item = 0;
    timer = 15;
    From.textContent = '';
    clearInterval(timerInterval);
    quiztion_item.innerHTML = '';
    next.style.pointerEvents = 'none';
    next.textContent = 'التالي';
    next.removeAttribute('data-bs-toggle');
    next.removeAttribute('data-bs-target');
    next.removeEventListener('click', closeModal);
    next.onclick = () => { startQuiz(index_item) };
    Modal_staticBackdrop1.style.transition = 'opacity .15s linear !important';
    Modal_staticBackdrop1.classList.add('trans');
    Modal_staticBackdrop1.classList.add('show');
    Modal_staticBackdrop1.setAttribute('aria-modal', 'true');
    Modal_staticBackdrop1.setAttribute('role', 'dialog');
    Modal_staticBackdrop1.setAttribute('style', 'display: block;');
    curect = 0;
    quiztion_random = quiztion.sort(() => Math.random() - 0.5);
    CloseModal3()
    startQuiz(index_item);
}


function closeModal() {
    Modal_staticBackdrop1.classList.remove('show');
    Modal_staticBackdrop1.style.display = 'none';
    from_curect.textContent = curect;
    to_curect.textContent = rangeQuiztion
    Modal_staticBackdrop2.style.transition = 'opacity .15s linear !important';
    setTimeout(() => {
        Modal_staticBackdrop2.setAttribute('style', 'display:block;');
        Modal_staticBackdrop2.classList.add('trans');
        Modal_staticBackdrop2.classList.add('show');
    }, 500)
    clearInterval(timerInterval);
    done_voice.play();
}

function CloseModal3() {
    Modal_staticBackdrop2.classList.remove('show');
    Modal_staticBackdrop2.removeAttribute('style');
    document.querySelectorAll('.modal-backdrop').forEach(element => {
        element.classList.remove('modal-backdrop', 'fade', 'show')
    });
}

