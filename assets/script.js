let flag = 0
let count = 0
let flagId = 0
let editingItem = null;
const today = document.getElementsByClassName('today')[0]
const p = document.querySelector('.number')
const inp = document.querySelector('.inp')
const btn = document.querySelector('.btn');

const addItem = (e) => {
    e.preventDefault();
    let text = inp.value;
    if (text) {
        if (editingItem) {
            // Update the existing item
            editingItem.querySelector('p').innerText = text;
            editingItem = null;
        } else {
            // Add a new item
            const li = document.createElement('li');
            li.innerHTML = `
        <div class="taskItem">
            <div class="tasksLi">
                <input type="checkbox" class="task-checkbox">
                <p>${text}</p>
            </div>
            <div class="icons">
                <img src="assets/img/2.png" alt="" onclick="_edit(this)">
                <img src="assets/img/1.png" alt="" onclick="_delete(this)">
            </div>
        </div>
    `;
            li.setAttribute('id', 'id' + flagId);
            flag += 1;
            flagId++;
            document.querySelector('.task').appendChild(li);

            // Add event listener to the new checkbox
            const checkbox = li.querySelector('.task-checkbox');
            checkbox.addEventListener('change', (e) => {
                if (e.target.checked) {
                    e.target.nextElementSibling.style.textDecoration = 'line-through';
                    e.target.nextElementSibling.style.color = '#2DC0C9';
                    count += 1;
                    _progress(count, flag)
                } else {
                    e.target.nextElementSibling.style.textDecoration = 'none';
                    e.target.nextElementSibling.style.color = 'white';
                    count -= 1;
                    _progress(count, flag)
                }
                // Update flag count display
                p.innerText = `${count} / ${flag}`;
            });
        }
        inp.value = '';
        inp.focus();
        // Update flag count display
        p.innerText = `${count} / ${flag}`;
    }
};

btn.addEventListener('click', addItem);

inp.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        addItem(e);
    }
});

_delete = (element) => {
    const taskItem = element.parentElement.parentElement;
    const checkbox = taskItem.querySelector('.task-checkbox');

    if (checkbox.checked) {
        count -= 1
    }
    // checkbox1 ? count -= 1 : count
    taskItem.parentElement.remove();
    flag -= 1;
    p.innerText = `${count} / ${flag}`;

    _progress(count, flag)
}
_edit = (element) => {
    const parent = element.parentElement.parentElement
    inp.value = parent.querySelector('p').innerText;
    editingItem = parent;
    console.log(editingItem);
    console.log(inp.value);
}
_progress = (count, flag) => {

    console.log(count);
    console.log(flag);
    const progress = count / flag * 100
    const progressBar = document.querySelector('.progress')
    progressBar.style.width = `${progress}%`
    if (count == flag) {
        blaskconfetti()
    }
}

// DayOfWeek
const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = new Date().getDate()
today.innerHTML = `Seems it's ${daysOfWeek[day]} 🤗`


// blaskconfetti or successfull animation
const blaskconfetti = () => {
    const count = 200,
        defaults = {
            origin: { y: 0.7 },
        };

    function fire(particleRatio, opts) {
        confetti(
            Object.assign({}, defaults, opts, {
                particleCount: Math.floor(count * particleRatio),
            })
        );
    }

    fire(0.25, {
        spread: 26,
        startVelocity: 55,
    });

    fire(0.2, {
        spread: 60,
    });

    fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8,
    });

    fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2,
    });

    fire(0.1, {
        spread: 120,
        startVelocity: 45,
    });
}