let nums = document.querySelectorAll(".stats .container .number");
let section = document.querySelector(".stats");

function startCount(el) {
    let goal = parseInt(el.dataset.goal);
    let count = 0;
    let increment = goal / 200; // Adjust this value to control the speed

    let counter = setInterval(() => {
        count += increment;
        if (count >= goal) {
            el.innerText = goal.toLocaleString();
            clearInterval(counter);
        } else {
            el.innerText = Math.ceil(count).toLocaleString();
        }
    }, 20); // Adjust this value to control the speed

    // Store the interval ID in the element's dataset
    el.dataset.counter = counter;
}

function resetCount(el) {
    el.innerText = '0';
    // Clear the interval if it exists
    if (el.dataset.counter) {
        clearInterval(el.dataset.counter);
        delete el.dataset.counter;
    }
}

// Initialize the goal values from the innerText
nums.forEach(num => {
    num.dataset.goal = num.innerText.replace(/,/g, '');
    resetCount(num);
});

// Use IntersectionObserver to trigger counting when the section is in view
let observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            nums.forEach(num => {
                startCount(num);
            });
        } else {
            nums.forEach(num => resetCount(num));
        }
    });
}, { threshold: 0.5 }); // Adjust threshold as needed

observer.observe(section);