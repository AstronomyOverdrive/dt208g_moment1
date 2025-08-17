// HTML Elements
const addButton: HTMLButtonElement = document.getElementById("add-btn") as HTMLButtonElement;
const courseCodeField: HTMLInputElement = document.getElementById("course-code") as HTMLInputElement;
const courseNameField: HTMLInputElement = document.getElementById("course-name") as HTMLInputElement;
const courseProgField: HTMLInputElement = document.getElementById("course-prog") as HTMLInputElement;
const courseSyllField: HTMLInputElement = document.getElementById("course-syll") as HTMLInputElement;
const infoBox: HTMLDivElement = document.getElementById("info-box") as HTMLDivElement;

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

// Event handlers
addButton.addEventListener("click", addCourse);
