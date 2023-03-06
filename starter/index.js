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
const idList = [];
const teamMembers = [];

const appMenu = () => {
  function buildTeam() {
    if(!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR)
    } 
    fs.writeFileSync(outputPath, render(teamMembers), 'utf-8');
  }

  function addIntern() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "internName",
          message: "Pleas enter intern name",
        },
        {
          type: "input",
          name: "internId",
          message: "Please enter intern id",
        },
        {
          type: "input",
          name: "internEmail",
          message: "Please enter intern email",
        },
        {
          type: "input",
          name: "internSchool",
          message: "Please enter intern school",
        },
      ])
      .then((answers) => {
        const intern = new Intern(
          answers.internName,
          answers.internId,
          answers.internEmail,
          answers.internSchool
        );
        teamMembers.push(intern);
        idList.push(answers.internId);
        createTeam();
      });
  }

  function addEngineer() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "engineerName",
          message: "Please enter engineer name",
        },
        {
          type: "input",
          name: "engineerId",
          message: "please enter engineer id",
        },
        {
          type: "input",
          name: "engineerEmail",
          message: "Please ener engineer email",
        },
        {
          type: "input",
          name: "engineerGithub",
          message: "Please enter engineer github",
        },
      ])
      .then((answers) => {
        const engineer = new Engineer(
          answers.engineerName,
          answers.engineerId,
          answers.engineerEmail,
          answers.engineerGithub
        );
        teamMembers.push(engineer);
        idList.push(answers.engineerId);
        createTeam();
      });
  }

  function createTeam() {
    inquirer
      .prompt([
        {
          type: "list",
          name: "memberChoice",
          message: "Which team do you want to add?",
          choices: [
            "Engineer",
            "Intern",
            "No more teams",
          ],
        },
      ])
      .then((userChoice) => {
        if (userChoice.memberChoice === "Engineer") {
          
          addEngineer();
        } else if (userChoice.memberChoice === "Intern") {
        
          addIntern();
        } else {
        
          buildTeam();
        }
      });
  }

  function createManager() {
    console.log("Build your team!");
    inquirer
      .prompt([
        {
          type: "input",
          name: "managerName",
          message: "What is the team manager's name?",
          validate: (answer) => {
            if (answer !== "") {
              return true;
            }
            return "Please enter a valid name.";
          },
        },
        {
          type: "input",
          name: "managerId",
          message: "Please enter team manager's id",
        },
        {
          type: "input",
          name: "managerEmail",
          message: "Please enter team manager's email?",
        },
        {
          type: "input",
          name: "managerOfficeNumber",
          message: "Please enter team manager's office number",
        },
      ])
      .then((answers) => {
        const manager = new Manager(
          answers.managerName,
          answers.managerId,
          answers.managerEmail,
          answers.managerOfficeNumber
        );

        teamMembers.push(manager);
        idList.push(answers.managerId);
        createTeam();
      });
  }

  createManager();
};

appMenu();