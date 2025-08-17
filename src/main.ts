// HTML Elements
const addButton: HTMLButtonElement = document.getElementById("add-btn") as HTMLButtonElement;
const courseCodeField: HTMLInputElement = document.getElementById("course-code") as HTMLInputElement;
const courseNameField: HTMLInputElement = document.getElementById("course-name") as HTMLInputElement;
const courseProgField: HTMLInputElement = document.getElementById("course-prog") as HTMLInputElement;
const courseSyllField: HTMLInputElement = document.getElementById("course-syll") as HTMLInputElement;
const infoBox: HTMLDivElement = document.getElementById("info-box") as HTMLDivElement;
const courseTable: HTMLTableElement = document.getElementById("course-table") as HTMLTableElement;

// Create interface for courses
interface CourseInfo {
	code: string;
	name: string;
	progression: string;
	syllabus: string;
}

// Add new course
function addCourse(): void {
	const newCourse: CourseInfo = {
		code: courseCodeField.value,
		name: courseNameField.value,
		progression: courseProgField.value,
		syllabus: courseSyllField.value
	}
	if (isCourseValid(newCourse)) {
		let courseArray: Array<CourseInfo> = [newCourse];
		const storedCourses: string | null = localStorage.getItem("courses");
		if (storedCourses) { // Concat with any already saved courses
			const parsedCourses: Array<CourseInfo> = JSON.parse(storedCourses);
			courseArray = courseArray.concat(parsedCourses);
		}
		// Save courses to localStorage
		const storeCourses: string = JSON.stringify(courseArray);
		localStorage.setItem("courses", storeCourses);
		// Clear form fields
		courseCodeField.value = "";
		courseNameField.value = "";
		courseProgField.value = "";
		courseSyllField.value = "";
		// Update table
		displayCourses();
	}
}

// Validate course
function isCourseValid(newCourse: CourseInfo): Boolean {
	let problems: string = "";
	const storedCourses: string | null = localStorage.getItem("courses");
	// Check if course code is unique
	if (storedCourses) {
		const parsedCourses: Array<CourseInfo> = JSON.parse(storedCourses);
		parsedCourses.forEach(storedCourse => {
			if (newCourse.code.toLowerCase() === storedCourse.code.toLowerCase()) {
				problems += `Kurskod ${newCourse.code} finns redan!\n`;
			}
		});
	}
	// Check if progression is valid
	const validProgressions: string[] = ["A", "B", "C"];
	if (!validProgressions.includes(newCourse.progression)) {
		problems += `Progression kan bara vara A/B/C\n`;
	}
	// Edit info box
	infoBox.innerText = problems;
	// Return result
	if (problems === "") {
		return true;
	} else {
		return false;
	}
}

// Populate course table
function displayCourses(): void {
	// Clear table
	courseTable.innerHTML = "";
	// Add header
	let headerRow: HTMLTableRowElement = document.createElement("tr");
	let headerCode: HTMLTableCaptionElement = document.createElement("th");
	headerCode.textContent = "Kurskod";
	let headerName: HTMLTableCaptionElement = document.createElement("th");
	headerName.textContent = "Kursnamn";
	let headerProg: HTMLTableCaptionElement = document.createElement("th");
	headerProg.textContent = "Progression";
	headerRow.appendChild(headerCode);
	headerRow.appendChild(headerName);
	headerRow.appendChild(headerProg);
	courseTable.appendChild(headerRow);
	// Add cells
	const storedCourses: string | null = localStorage.getItem("courses");
	if (storedCourses) { // Check if any courses are stored
		const parsedCourses: Array<CourseInfo> = JSON.parse(storedCourses);
		parsedCourses.forEach(storedCourse => {
			// Add a new row
			let newRow: HTMLTableRowElement = document.createElement("tr");
			// Add a course code cell with link to syllabus
			let newCode: HTMLTableCellElement = document.createElement("td");
			let newSyll: HTMLAnchorElement = document.createElement("a");
			newSyll.href = storedCourse.syllabus;
			newSyll.textContent = storedCourse.code;
			newCode.appendChild(newSyll);
			// Add a course name cell
			let newName: HTMLTableCellElement = document.createElement("td");
			newName.textContent = storedCourse.name;
			// Add a course progression cell
			let newProg: HTMLTableCellElement = document.createElement("td");
			newProg.textContent = storedCourse.progression;
			// Add cells to row
			newRow.appendChild(newCode);
			newRow.appendChild(newName);
			newRow.appendChild(newProg);
			// Add row to table
			courseTable.appendChild(newRow);
		});
	}
}

// Event handlers
addButton.addEventListener("click", addCourse);
addEventListener("load", displayCourses);
