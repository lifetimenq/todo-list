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
    
    const themes = {
      default: {
        '--base-text-color': '#212529',
        '--header-bg': '#007bff',
        '--header-text-color': '#fff',
        '--default-btn-bg': '#007bff',
        '--default-btn-text-color': '#fff',
        '--default-btn-hover-bg': '#0069d9',
        '--default-btn-border-color': '#0069d9',
        '--danger-btn-bg': '#dc3545',
        '--danger-btn-text-color': '#fff',
        '--danger-btn-hover-bg': '#bd2130',
        '--danger-btn-border-color': '#dc3545',
        '--input-border-color': '#ced4da',
        '--input-bg-color': '#fff',
        '--input-text-color': '#495057',
        '--input-focus-bg-color': '#fff',
        '--input-focus-text-color': '#495057',
        '--input-focus-border-color': '#80bdff',
        '--input-focus-box-shadow': '0 0 0 0.2rem rgba(0, 123, 255, 0.25)',
      },
      dark: {
        '--base-text-color': '#212529',
        '--header-bg': '#343a40',
        '--header-text-color': '#fff',
        '--default-btn-bg': '#58616b',
        '--default-btn-text-color': '#fff',
        '--default-btn-hover-bg': '#292d31',
        '--default-btn-border-color': '#343a40',
        '--default-btn-focus-box-shadow':
          '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
        '--danger-btn-bg': '#b52d3a',
        '--danger-btn-text-color': '#fff',
        '--danger-btn-hover-bg': '#88222c',
        '--danger-btn-border-color': '#88222c',
        '--input-border-color': '#ced4da',
        '--input-bg-color': '#fff',
        '--input-text-color': '#495057',
        '--input-focus-bg-color': '#fff',
        '--input-focus-text-color': '#495057',
        '--input-focus-border-color': '#78818a',
        '--input-focus-box-shadow': '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
      },
      light: {
        '--base-text-color': '#212529',
        '--header-bg': '#fff',
        '--header-text-color': '#212529',
        '--default-btn-bg': '#fff',
        '--default-btn-text-color': '#212529',
        '--default-btn-hover-bg': '#e8e7e7',
        '--default-btn-border-color': '#343a40',
        '--default-btn-focus-box-shadow':
          '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
        '--danger-btn-bg': '#f1b5bb',
        '--danger-btn-text-color': '#212529',
        '--danger-btn-hover-bg': '#ef808a',
        '--danger-btn-border-color': '#e2818a',
        '--input-border-color': '#ced4da',
        '--input-bg-color': '#fff',
        '--input-text-color': '#495057',
        '--input-focus-bg-color': '#fff',
        '--input-focus-text-color': '#495057',
        '--input-focus-border-color': '#78818a',
        '--input-focus-box-shadow': '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
      },
    };

    // Element UI
    const listContainer = document.querySelector(".tasks-list-section .list-group");
    const form = document.forms['addTask'];
    const inputTitle = form.elements['title'];
    const inputBody = form.elements['body'];
    const themeSelect = document.getElementById("themeSelect")

    // Events
    renderAllTasks(objOfTasks);
    form.addEventListener('submit', onFormSubmitHandler);
    listContainer.addEventListener('click', onDeleteHandler);
    themeSelect.addEventListener('change', onChangeTheme);
    

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

    function onDeleteHandler({ target }) {
      if(target.classList.contains('delete-btn')) {
        const parent = target.closest('[data-task-id]');
        
        const confirmed = deleteTask(parent.dataset.taskId);
        deleteHtmlElement(confirmed, parent);
      }      
    }
    
    function onChangeTheme(e) {
      setTheme(e.target.value);
    }



    // func
    function setTheme(name) {
      const selected = themes[name];
      Object.entries(selected).forEach(([key, value]) => {
        document.documentElement.style.setProperty(key, value);
      })
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

    function deleteHtmlElement(confirmed, element) {
      if (!confirmed) return;
      element.remove();
    }

    function deleteTask(id) {
      const { title } = objOfTasks[id];
      const isConfirm = confirm(`Delete task "${title}"?`);
      if (!isConfirm) return isConfirm;
      delete objOfTasks[id];
      return isConfirm;
    }

    // template function
    function listItemTemplate({ _id, title, body } = {}) {
        const li = document.createElement('li');
        li.classList.add("list-group-item", "d-flex", "align-items-center", "flex-wrap", "mt-2");
        li.setAttribute("data-task-id", _id);

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
