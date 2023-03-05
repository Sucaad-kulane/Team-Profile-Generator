const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


// TODO: Write Code to gather information about the development team members, and render the HTML file.
const idList = []
const teamMemebers = []


const appMenu = () => {


    function buildTeam() {

    }

    function addIntern() {
        inquirer.prompt([
            {
                type: "input",
                name: "internName",
                message: "what is the intern name?"

            },
            {
                type: "input",
                name: "internId",
                message: "what is the intern Id?"

            },
            {
                type: "input",
                name: "internEmail",
                message: "what is the intern email?"

            },
            {
                type: "input",
                name: "internSchool",
                message: "what is the intern school?"

            },
        ]).then(answers => {
            const engineer = new Intern (answers.internName, answers.internId, answers.internEmail, answers.internSchool);
            teamMemebers.push(engineer);
            idList.push(answers.engineerId);
            console.log(engineer);
            createTeam()

        })

    }



    function addEngineer() {
        inquirer.prompt([
            {
                type: "input",
                name: "engineerName",
                message: "what is the engineer's name?"

            },
            {
                type: "input",
                name: "engineerId",
                message: "what is the engineer's Id?"

            },
            {
                type: "input",
                name: "engineerEmail",
                message: "what is the engineer's email?"

            },
            {
                type: "input",
                name: "engineerGithub",
                message: "what is the engineer's github name?"

            },
        ]).then(answers => {
            const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub);
            teamMemebers.push(engineer);
            idList.push(answers.engineerId);
            console.log(engineer);
            createTeam()

        })

    }


    function createTeam() {
        inquirer.prompt([
            {
                type: "list",
                name: "memberChoice",
                message: "Which type of team do you want to add?",
                choices: [
                    "Intern",
                    "Engineer",
                    "Not Applicable"

                ]
            }
        ]).then(userChoice => {
            if (userChoice.memberChoice === "Engineer") {
                // Engineer function
                addEngineer();
            } else if (userChoice.memberChoice === "Intern") {
                // Intern function
                addIntern();
            } else {
                // Build team function
                buildTeam();
            }
        })
    }


    function createManager() {
        console.log("Build your team");
        inquirer.prompt([
            {
                type: "input",
                name: 'managerName',
                message: "What is the manager's name?",
                validate: answer => {
                    if (answer !== "") {
                        return true
                    }
                    return "Please enter a valid name."
                }
            },
            {
                type: "input",
                name: "managerId",
                message: "What is team manager's id",

            },
            {
                type: "input",
                name: "managerEmail",
                message: "What is the team manager's email?"
            },
            {
                type: "input",
                name: "managerOfficeNumber",
                message: "What is the team manager's office number"
            },

        ]).then(answers => {
            const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber);
            console.log(manager);
            teamMemebers.push(manager);
            idList.push(answers.managerId);
            createTeam();

        })

    }

    createManager();


}

appMenu();

