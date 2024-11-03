// Додавання символу або функції у вираз
function appendSymbol(value) {
    document.getElementById("expression").value += value;
}

// Очищення введення
function clearInput() {
    document.getElementById("expression").value = "";
    document.getElementById("result").innerText = "";
}

// Основна функція для обчислення виразу
function calculate() {
    const expression = document.getElementById("expression").value;
    try {
        const result = evalExpression(expression);
        document.getElementById("result").innerText = "Результат: " + result;
    } catch (error) {
        document.getElementById("result").innerText = "Помилка: Некоректний вираз";
    }
}

// Обчислення математичного виразу з перетворенням функцій на Math
function evalExpression(expression) {
    // Дозволені функції та символи, з обробкою тригонометричних функцій у градусах
    const safeExpression = expression
        .replace(/sqrt\(/g, "Math.sqrt(")
        .replace(/log10\(/g, "Math.log10(")
        .replace(/log\(/g, "Math.log(")
        .replace(/sin\(/g, "sinDegrees(")
        .replace(/cos\(/g, "cosDegrees(")
        .replace(/tan\(/g, "tanDegrees(")
        .replace(/÷/g, "/")
        .replace(/×/g, "*");

    // Оновлений регулярний вираз, щоб врахувати всі дозволені символи та функції
    if (/[^-()\d/*+.MathsqrtlogsincontanDegrees]/.test(safeExpression)) {
        throw new Error("Некоректний вираз");
    }

    // Виконання обчислення
    return new Function(`return ${safeExpression}`)();
}

// Функції для обчислення тригонометрії у градусах
function sinDegrees(degrees) {
    return Math.sin((degrees * Math.PI) / 180);
}

function cosDegrees(degrees) {
    return Math.cos((degrees * Math.PI) / 180);
}

function tanDegrees(degrees) {
    return Math.tan((degrees * Math.PI) / 180);
}
