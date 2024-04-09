import inquirer from "inquirer";
import chalk from "chalk";

interface Student {
    name: string;
    present: boolean;
}

const students: Student[] = [
    { name: "Alice", present: false },
    { name: "Bob", present: false },
    { name: "Charlie", present: false },
    // Add more students here
];

async function markAttendance() {
    console.log(chalk.yellow("Mark Attendance\n"));
    const choices = students.map(student => ({
        name: student.name,
        value: student,
        checked: student.present
    }));
    
    const { selectedStudents } = await inquirer.prompt({
        type: "checkbox",
        name: "selectedStudents",
        message: "Select students who are present (Press <space> to select, <enter> to submit):",
        choices
    });

    students.forEach(student => {
        student.present = selectedStudents.includes(student);
    });

    console.log(chalk.green("\nAttendance Marked Successfully!\n"));

    showAttendance();
}

function showAttendance() {
    console.log(chalk.yellow("Attendance Report\n"));
    students.forEach(student => {
        const status = student.present ? chalk.green("Present") : chalk.red("Absent");
        console.log(`${student.name}: ${status}`);
    });
}

async function mainMenu() {
    while (true) {
        const { action } = await inquirer.prompt({
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: ['Mark Attendance', 'View Attendance', 'Exit']
        });

        switch (action) {
            case 'Mark Attendance':
                await markAttendance();
                break;
            case 'View Attendance':
                showAttendance();
                break;
            case 'Exit':
                console.log(chalk.yellow("Exiting Attendance System"));
                return;
        }
    }
}

mainMenu();
