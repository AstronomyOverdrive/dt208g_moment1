// HTML Elements
const addButton: HTMLButtonElement = document.getElementById("add-btn") as HTMLButtonElement;
const courseCodeField: HTMLInputElement = document.getElementById("course-code") as HTMLInputElement;
const courseNameField: HTMLInputElement = document.getElementById("course-name") as HTMLInputElement;
const courseProgField: HTMLInputElement = document.getElementById("course-prog") as HTMLInputElement;
const courseSyllField: HTMLInputElement = document.getElementById("course-syll") as HTMLInputElement;

// Create interface for courses
interface CourseInfo {
	code: String;
	name: String;
	progression: String;
	syllabus: String;
}

// Add new course
function addCourse (): void {
	const newCourse: CourseInfo = {
		code: courseCodeField.value,
		name: courseNameField.value,
		progression: courseProgField.value,
		syllabus: courseSyllField.value
	}
}

// Event handlers
addButton.addEventListener("click", addCourse);
