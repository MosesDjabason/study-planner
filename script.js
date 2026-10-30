const STORAGE_KEY = "studyPlannerTasks";

// Elements
const form = document.getElementById("task-form");
const titleInput = document.getElementById("task-title");
const subjectInput = document.getElementById("task-subject");
const priorityInput = document.getElementById("task-priority");
const titleError = document.getElementById("title-error");
const taskList = document.getElementById("task-list");
const emptyState = document.getElementById("empty-state");
const emptyTitle = document.getElementById("empty-title");
const emptyText = document.getElementById("empty-text");
const taskSummary = document.getElementById("task-summary");
const remainingBadge = document.getElementById("remaining-badge");
const progressWrap = document.getElementById("progress-wrap");
const progressFill = document.getElementById("progress-fill");
const progressText = document.getElementById("progress-text");
const filterButtons = document.querySelectorAll(".filter-btn");

let tasks = loadTasks();
let currentFilter = "all";

// ---------- Storage ----------
function loadTasks() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    return [];
  }
}

function saveTasks() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error("Could not save tasks:", error);
  }
}

// ---------- Rendering ----------
function getVisibleTasks() {
  if (currentFilter === "active") {
    return tasks.filter(function (t) { return !t.completed; });
  }
  if (currentFilter === "completed") {
    return tasks.filter(function (t) { return t.completed; });
  }
  return tasks;
}

function render() {
  taskList.innerHTML = "";
  const visible = getVisibleTasks();

  visible.forEach(function (task) {
    const priority = task.priority || "medium"; // older saved tasks have no priority

    const li = document.createElement("li");
    li.className = "task-item priority-" + priority + (task.completed ? " completed" : "");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.setAttribute("aria-label", "Mark task complete");
    checkbox.addEventListener("change", function () {
      toggleTask(task.id);
    });

    const info = document.createElement("div");
    info.className = "task-info";

    const title = document.createElement("p");
    title.className = "task-title";
    title.textContent = task.title;

    const meta = document.createElement("div");
    meta.className = "task-meta";

    const subject = document.createElement("span");
    subject.className = "task-subject";
    subject.textContent = task.subject;

    const tag = document.createElement("span");
    tag.className = "priority-tag tag-" + priority;
    tag.textContent = priority;

    meta.appendChild(subject);
    meta.appendChild(tag);
    info.appendChild(title);
    info.appendChild(meta);

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className = "btn-delete";
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", function () {
      deleteTask(task.id);
    });

    li.appendChild(checkbox);
    li.appendChild(info);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });

  updateSummary(visible.length);
}

function updateSummary(visibleCount) {
  const total = tasks.length;
  const done = tasks.filter(function (t) { return t.completed; }).length;
  const remaining = total - done;

  if (total === 0) {
    taskSummary.textContent = "Your study queue is clear";
    remainingBadge.classList.add("hidden");
    progressWrap.classList.add("hidden");
  } else {
    taskSummary.textContent = total + (total === 1 ? " task" : " tasks") + " on your study list";
    remainingBadge.textContent = remaining + " remaining";
    remainingBadge.classList.remove("hidden");

    const percent = Math.round((done / total) * 100);
    progressFill.style.width = percent + "%";
    progressText.textContent = percent + "%";
    progressWrap.classList.remove("hidden");
  }

  // Empty messages
  if (visibleCount === 0) {
    if (total === 0) {
      emptyTitle.textContent = "No tasks yet";
      emptyText.textContent = "Add your first study task above!";
    } else if (currentFilter === "active") {
      emptyTitle.textContent = "All caught up!";
      emptyText.textContent = "You have no active tasks left.";
    } else {
      emptyTitle.textContent = "Nothing completed yet";
      emptyText.textContent = "Tick a task to see it here.";
    }
    emptyState.classList.remove("hidden");
  } else {
    emptyState.classList.add("hidden");
  }
}

// ---------- Actions ----------
function addTask(title, subject, priority) {
  tasks.push({
    id: Date.now(),
    title: title,
    subject: subject || "General",
    priority: priority,
    completed: false
  });
  saveTasks();
  render();
}

function toggleTask(id) {
  tasks = tasks.map(function (task) {
    return task.id === id ? { ...task, completed: !task.completed } : task;
  });
  saveTasks();
  render();
}

function deleteTask(id) {
  tasks = tasks.filter(function (task) { return task.id !== id; });
  saveTasks();
  render();
}

// ---------- Events ----------
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const title = titleInput.value.trim();
  const subject = subjectInput.value.trim();
  const priority = priorityInput.value;

  if (title === "") {
    titleError.classList.remove("hidden");
    titleInput.classList.add("invalid");
    titleInput.focus();
    return;
  }

  addTask(title, subject, priority);
  form.reset();
  priorityInput.value = "medium";
  titleError.classList.add("hidden");
  titleInput.classList.remove("invalid");
  titleInput.focus();
});

titleInput.addEventListener("input", function () {
  titleError.classList.add("hidden");
  titleInput.classList.remove("invalid");
});

filterButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    currentFilter = button.dataset.filter;
    filterButtons.forEach(function (b) { b.classList.remove("active"); });
    button.classList.add("active");
    render();
  });
});

// First draw when the page loads
render();