# Study Planner

A simple web application that helps a student keep track of study tasks and assignments.
Built as an individual mini project for the **ATU Virtual Internship (Software Development)** at Accra Technical University.

**Live application:** https://mosesdjabason.github.io/study-planner/

**Author:** Moses Djabason
**Index number:** 01254338B

## Problem Statement

Students often have many assignments and study tasks across different courses and forget what is due or what is finished. This app gives a student one place to add study tasks, see them in a clear list, mark them as done, and delete them. Tasks are saved in the browser so they remain after a refresh.

## Features

### Required features
- Add a task with a task title and a subject/course name
- Display saved tasks in a clear list
- Mark a task as complete and change it back to incomplete
- Delete a task
- Tasks stay saved after the page is refreshed (browser local storage)
- Helpful message when the task list is empty
- Blank task titles are rejected with an error message

### Extra features
- Priority label (High, Medium, Low) with a color-coded badge on each task
- Filter tabs: All, Active, Completed
- Progress bar and "remaining" counter

## Technologies Used
- HTML
- CSS
- JavaScript (no frameworks or external libraries)
- Browser `localStorage` for saving data

## Project Structure

```
study-planner/
├── index.html    # Page structure
├── style.css     # Styling and layout
├── script.js     # App logic (add, complete, delete, filter, save)
└── README.md     # Project description
```

## How to Run

**Online:** open the live link above.

**On your computer:**
1. Download or clone this repository.
2. Open `index.html` in any modern web browser.

No installation or server is needed.

## How to Use
1. Type a task title (required) and, optionally, a subject and priority.
2. Click **Add Task**.
3. Tick the checkbox to mark a task complete. Untick it to mark it incomplete.
4. Click **Delete** to remove a task.
5. Use the **All / Active / Completed** tabs to filter the list.

## Testing

| Test | Expected result | Result |
|---|---|---|
| Add a task with a title | The task appears in the list | Pass |
| Submit an empty title | An error message appears and no task is added | Pass |
| Mark a task complete | The task is visibly marked complete | Pass |
| Delete a task | The task is removed from the list | Pass |
| Refresh the page | Previously saved tasks remain visible | Pass |

## Notes
- Data is stored only in the browser it was created in, so tasks do not carry over to other browsers or devices.
- AI assistance (Claude by Anthropic) was used for guidance and code support while building this project. I reviewed the code and understand how it works.

## Author
Moses Djabason(Index number: 01254338B), ATU Virtual Internship
