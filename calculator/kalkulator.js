let previousResult = ''; // Variabel untuk menyimpan hasil sebelumnya
let isResultDisplayed = false; // Variabel untuk melacak apakah hasil kalkulasi ditampilkan

function addToExpression(value) {
    let input = document.getElementById('expression');
    let lastChar = input.value.slice(-1); // Ambil karakter terakhir dari input

    // Pengecekan untuk menghindari duplikasi simbol matematika
    if ((value === '+' || value === '-' || value === '*' || value === '/') && (lastChar === '+' || lastChar === '-' || lastChar === '*' || lastChar === '/')) {
        // Jangan tambahkan simbol yang sama secara berurutan
        return;
    }

    // Pengecekan jika tombol "=" belum ditekan setelah hasil muncul di atas teks box
    if (isResultDisplayed && !input.value.includes('=')) {
        input.value = previousResult + value; // Menggabungkan hasil sebelumnya dengan operasi baru
        previousResult = ''; // Mengosongkan hasil sebelumnya
        isResultDisplayed = false; // Set isResultDisplayed kembali menjadi false
    } else {
        input.value += value;
    }
}

function backspace() {
    let input = document.getElementById('expression');
    let currentValue = input.value;

    if (isResultDisplayed) {
        input.value = ''; // Hapus hasil kalkulasi yang ditampilkan
        previousResult = ''; // Mengosongkan hasil sebelumnya
        isResultDisplayed = false; // Set isResultDisplayed kembali menjadi false
    } else {
        input.value = currentValue.substring(0, currentValue.length - 1);
    }
}

function validateInput(input) {
    input.value = input.value.replace(/[^0-9+\-*\/.=]/g, ''); // Memperbolehkan simbol "." dan "="
}

function clearExpression() {
    let input = document.getElementById('expression');
    input.value = '';
    document.getElementById('resultAbove').innerText = ''; // Kosongkan hasil di atas text box
    previousResult = ''; // Mengatur nilai hasil sebelumnya menjadi kosong saat menghapus ekspresi
    isResultDisplayed = false; // Set isResultDisplayed kembali menjadi false
}

function moveResultToInput() {
    let resultAbove = document.getElementById('resultAbove');
    let input = document.getElementById('expression');
    input.value = resultAbove.innerText; // Pindahkan hasil dari atas text box ke dalam text box
    resultAbove.innerText = ''; // Kosongkan hasil di atas text box
}

function calculate() {
    let expression = document.getElementById('expression').value;
    let result;
    try {
        // Menggunakan hasil sebelumnya sebagai bagian dari ekspresi baru
        expression = expression.replace('ans', previousResult);
        result = eval(expression);
        document.getElementById('resultAbove').innerText = result; // Menampilkan hasil di atas text box
        previousResult = result; // Menyimpan hasil sebelumnya
        isResultDisplayed = true; // Set isResultDisplayed menjadi true karena hasil kalkulasi ditampilkan
        document.getElementById('expression').value = ''; // Mengosongkan kotak teks untuk melanjutkan operasi
    } catch (error) {
        document.getElementById('expression').value = 'Error: Invalid expression';
    }
}
