let count = 0;

function countNumbers() {
    count++;
    postMessage(count);
    setTimeout(countNumbers, 500); // Fél másodpercenként frissít
}

countNumbers();
