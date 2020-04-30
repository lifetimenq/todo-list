const tasks = [
  {
    _id: '5d2ca9e2e03d40b326596aa7',
    completed: true,
    body:
      'Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n',
    title: 'Eu ea incididunt sunt consectetur fugiat non.',
  },
  {
    _id: '5d2ca9e29c8a94095c1288e0',
    completed: false,
    body:
      'Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n',
    title:
      'Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.',
  },
  {
    _id: '5d2ca9e2e03d40b3232496aa7',
    completed: true,
    body:
      'Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n',
    title: 'Eu ea incididunt sunt consectetur fugiat non.',
  },
  {
    _id: '5d2ca9e29c8a94095564788e0',
    completed: false,
    body:
      'Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n',
    title:
      'Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.',
  },
];

(function(arrOfTasks) {
    // objects
    const objOfTasks = arrOfTasks.reduce((acc, task) => {
        acc[task._id] = task;
        return acc;
    }, {});

    // Element UI
    const listContainer = document.querySelector(".tasks-list-section .list-group");
    const form = document.forms['addTask'];
    const inputTitle = form.elements['title'];
    const inputBody = form.elements['body'];
    
    // Events
    renderAllTasks(objOfTasks);
    form.addEventListener('submit', onFormSubmitHandler);
    
    function renderAllTasks(tasksList) {
        if (!tasksList) {
            console.error("nothing to show");
            return;
        }

        const fragment = document.createDocumentFragment();
        
        Object.values(tasksList).forEach(task => {
            const li = listItemTemplate(task);
            fragment.appendChild(li);
        });
        
        listContainer.appendChild(fragment);
    }
    
    function onFormSubmitHandler(e) {
        e.preventDefault();
        if (!inputTitle.value || !inputBody.value) {
            alert('Please input title and body!');
            return;
        }
        
        task = addTask(inputTitle.value, inputBody.value);
        const li = listItemTemplate(task);
        listContainer.insertAdjacentElement('afterbegin', li);
        form.reset();        
    }

    function addTask(title, body) {                
        const task = {
            _id: `task-${Math.random()}`,
            completed: false,
            title,
            body
        }
        
        objOfTasks[task._id] = task;
        return { ...task };
    }

    // template function
    function listItemTemplate({ _id, title, body } = {}) {
        const li = document.createElement('li');
        li.classList.add("list-group-item", "d-flex", "align-items-center", "flex-wrap", "mt-2");

        const span = document.createElement('span');
        span.textContent = title;
        span.style.fontWeight = 'bold';

        const button = document.createElement('button');
        button.classList.add("btn", "btn-danger", "ml-auto", "delete-btn");
        button.textContent = "Delete";

        const p = document.createElement("p");
        p.classList.add("mt-2", "w-100");
        p.textContent = body;

        li.appendChild(span);
        li.appendChild(button);
        li.appendChild(p);

        return li;
    }
})(tasks);
