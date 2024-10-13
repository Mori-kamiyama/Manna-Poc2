function showElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.style.display = "block"; // 指定されたIDの要素を表示
    }
    const correctSound = new Audio('./移動.mp3'); // 正解音のファイルパス
    correctSound.play();
}

function checkAnswerRadio(correctAnswer, quizName, element, resultPoint) {
    // ラジオボタンの選択された値を取得
    const radios = document.getElementsByName(quizName);
    let selectedValue = null;

    for (const radio of radios) {
        if (radio.checked) {
            selectedValue = radio.value;
            break;
        }
    }

    // 結果表示のための要素を取得
    const result = document.getElementById(resultPoint);

    // 正解かどうかをチェック
    if (selectedValue === null) {
        result.textContent = '選択肢を選んでください。';
    } else if (selectedValue === correctAnswer) {
        result.textContent = '正解です！🎉';
        playCorrectSound(); // 音を鳴らす
        showElement(element);
    } else {
        result.textContent = '不正解です。';
    }
}


function checkAnswerChackbox(quizName, element, resultPoint) {
    // 引数で受け取ったname属性を持つチェックボックスのリストを取得
    const checkboxes = document.querySelectorAll(`input[name="${quizName}"]:checked`);

    // チェックされたチェックボックスの数を取得
    const checkedCount = checkboxes.length;
    // 結果表示のための要素を取得
    const result = document.getElementById(resultPoint);

    // 正解かどうかをチェック
    if (checkedCount === 0) {
        result.textContent = '安心してください、この記事はそんなあなたのためにあります。';
    } else if (checkedCount < 3) {
        result.textContent = '素晴らしい！🎉';
        playCorrectSound(); // 音を鳴らす
        showElement(element);
    } else {
        result.textContent = '完璧です！！もしかしてプロ？';
        playCorrectSound(); // 音を鳴らす
    }
    showElement(element);
}

function playCorrectSound() {
    const correctSound = new Audio('./決定.mp3'); // 正解音のファイルパス
    correctSound.play();
}

const ctx = document.getElementById('language-ranging').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'bar', // グラフのタイプを指定
    data: {
        labels: [
            'Python', 'JavaScript', 'Java', 'C++', 'TypeScript',
            'C#', 'Go', 'C', 'RUST', 'Mathematica',
            'PHP', 'Lua', 'Dart', 'Kotlin', 'SAS',
            'Zig', 'Ruby', 'R', 'Swift', 'Pascal', ], // X軸のラベル
        datasets: [{
            label: '言語の人気度ランキング', // グラフのタイトル
            data: [
                39, 36.5, 35.5, 35, 34.67,
                32.75, 32.5, 32.5, 29.75, 28,
                26.75, 24, 23, 23, 22.5,
                22, 21.5, 21.25, 20.75, 16], // データセット
            backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(153, 102, 255, 0.5)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 1 // 枠線の幅
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true // Y軸が0から始まるようにする
            }
        }
    }
});


let scores = {
    Python: 0,
    C: 0,
    TypeScript: 0,
    Rust: 0,
    Dart: 0,
    Swift: 0,
    Ruby: 0,
    PHP: 0
};

function nextQuestion(current) {
    // すべての質問を非表示にする
    let questions = document.querySelectorAll('.question');
    questions.forEach(question => {
        question.classList.remove('active');
    });

    // 現在の質問で選択された答えを確認
    let selectedOption = document.querySelector('input[name="q' + current + '"]:checked');
    if (!selectedOption) {
        alert("選択してください！");
        return;
    }

    // 各質問に基づいてスコアを増加させる
    calculateScore(current, selectedOption.value);

    // 次の質問を表示
    let nextDiv = document.getElementById('question' + (current + 1));
    if (nextDiv) {
        nextDiv.classList.add('active');
    } else {
        // 結果表示
        showResult();
    }
}

function prevQuestion(current) {
    // すべての質問を非表示にする
    let questions = document.querySelectorAll('.question');
    questions.forEach(question => {
        question.classList.remove('active');
    });

    // 前の質問を表示
    let prevDiv = document.getElementById('question' + (current - 1));

    // 現在の質問が1以外の場合は前の質問に戻す
    if (current > 1) {
        if (prevDiv) {
            prevDiv.classList.add('active');
        }
    } else {
        // currentが1の場合は最初の質問を表示
        document.getElementById('question1').classList.add('active');
    }
}

function calculateScore(question, answer) {
    switch (question) {
        case 1:
            if (answer === 'webYes') {
                scores.Python += 7;
                scores.C += 2;
                scores.TypeScript += 9;
                scores.Rust += 6;
                scores.Dart += 5;
                scores.Swift += 4;
                scores.Ruby += 9;
                scores.PHP += 8;
            }
            break;
        case 2:
            if (answer === 'mobileYes') {
                scores.Python += 5;
                scores.C += 4;
                scores.TypeScript += 7;
                scores.Rust += 4;
                scores.Dart += 10;
                scores.Swift += 10;
                scores.Ruby += 4;
                scores.PHP += 3;
            }
            break;
        case 3:
            if (answer === 'gameYes') {
                scores.Python += 6;
                scores.C += 10;
                scores.TypeScript += 5;
                scores.Rust += 8;
                scores.Dart += 4;
                scores.Swift += 5;
                scores.Ruby += 3;
                scores.PHP += 2;
            }
            break;
        case 4:
            if (answer === 'dateYes') {
                scores.Python += 10;
                scores.C += 6;
                scores.TypeScript += 3;
                scores.Rust += 5;
                scores.Dart += 2;
                scores.Swift += 4;
                scores.Ruby += 3;
                scores.PHP += 1;
            }
            break;
        case 5:
            if (answer === 'serverYes') {
                scores.Python += 7;
                scores.C += 8;
                scores.TypeScript += 6;
                scores.Rust += 9;
                scores.Dart += 5;
                scores.Swift += 5;
                scores.Ruby += 6;
                scores.PHP += 9;
            }
            break;
        case 6:
            if (answer === 'performanceYes') {
                scores.Python += 5;
                scores.C += 10;
                scores.TypeScript += 4;
                scores.Rust += 10;
                scores.Dart += 3;
                scores.Swift += 6;
                scores.Ruby += 3;
                scores.PHP += 2;
            }
            break;
        case 7:
            if (answer === 'crossYes') {
                scores.Python += 6;
                scores.C += 5;
                scores.TypeScript += 9;
                scores.Rust += 7;
                scores.Dart += 9;
                scores.Swift += 4;
                scores.Ruby += 3;
                scores.PHP += 2;
            }
            break;
        case 8:
            if (answer === 'simpleYes') {
                scores.Python += 10;
                scores.C += 4;
                scores.TypeScript += 8;
                scores.Rust += 5;
                scores.Dart += 7;
                scores.Swift += 6;
                scores.Ruby += 9;
                scores.PHP += 6;
            }
            break;
        case 9:
            if (answer === 'simpleYes') {
                scores.Python += 7;
                scores.C += 10;
                scores.TypeScript += 1;
                scores.Rust += 9;
                scores.Dart += 1;
                scores.Swift += 2;
                scores.Ruby += 4;
                scores.PHP += 1;
            }
            break;
    }
}

function showResult() {
    let resultDiv = document.getElementById('result4');
    resultDiv.classList.add('active');

    // スコアの高い言語を表示
    let maxScore = 0;
    let recommendedLang = "";
    for (const [lang, score] of Object.entries(scores)) {
        if (score > maxScore) {
            maxScore = score;
            recommendedLang = lang;
        }
    }
    document.getElementById('resultText').textContent = `おすすめの言語は: ${recommendedLang} (スコア: ${maxScore})`;
}