const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
//const path = require("path");
const fs = require("fs");
// const OUTPUT_DIR = path.resolve(__dirname, "output")
// const outputPath = path.join(OUTPUT_DIR, "team.html");
//const render = require("./src/page-template.js");
const teamMembers = [];
//const idArray = [];
// function appMenu() {
//   function createManager() {
//     console.log("Please build your team");
//     inquirer.prompt([

// function to create team member objects




async function createTeamMember() {
    const {name, role, id, email} = await inquirer.prompt([
        {
            message: "Enter the team member's name",
            name: "name"
        },
        {
            type: "list",
            message: "Select the role",
            choices: [
                "Engineer",
                "Intern",
                "Manager"
            ],
            name: "role"
        },
        {
            message: "Enter the team member's ID Number",
            name: "id"
        },
        {
            message: "Enter the team member's email address",
            name: "email"
        }
    ])
    let roleInfo = "";
    if (role === "Engineer") {
        roleInfo = "GitHub username";
    } else if (role === "Intern") {
        roleInfo = "school name";
    } else {
        roleInfo = "office phone number";
    }
    const {roleVariable, addMore}= await inquirer.prompt([
        {
            message: `Enter the team member's ${roleInfo}`,
            name: "roleVariable"
        },
        {
            type: "list",
            message: "Do you want to add more team members?",
            choices: [
                "yes",
                "no"
            ],
            name: "addMore"
        }
    ])
    let newMember = [];
    if (role === "Engineer") {
        newMember = new Engineer(name, id, email, roleVariable);
    } else if (role === "Intern") {
        newMember = new Intern(name, id, email, roleVariable);
    } else {
        newMember = new Manager(name, id, email, roleVariable);
    }
    teamMembers.push(newMember);
    await addMemberHTML(newMember)
    return addMore; 
}



function generateHTML () {
    const html = `
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <title>Team Profile</title>
</head>
<body>
    <nav class="navbar navbar-dark bg-dark mb-5">
        <span class="navbar-brand mb-0 h1 w-100 text-center">Team Profile</span>
    </nav>
    <div class="container">
        <div class="row">
    `
    ;
    fs.writeFile("./dist/team.html", html, function(err) {
        if (err) {
            console.log(err);
        }
    });
    console.log("Commencing HTML file generation.")

}

function addMemberHTML(member) {
    return new Promise (function(resolve, reject) {
        const name = member.getName();
        const role = member.getRole();
        const id = member.getId();
        const email = member.getEmail();
        let data = "";
        if (role === "Engineer") {
            const github = member.getGithub();
            data = `
            <div class="col-6">
                <div class="card mx-auto mb-3" style="width: 18rem">
                    <h5 class="card-header">${name}<br /><br />${role}</h5>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">ID: ${id}</li>
                        <li class="list-group-item">Email: ${email}</li>
                        <li class="list-group-item">GitHub: ${github}</li>
                    </ul>
                </div>
            </div>
            `;
        } else if (role === "Intern") {
            const school = member.getSchool();
            data = `
            <div class="col-6">
                <div class="card mx-auto mb-3" style="width: 18rem">
                    <h5 class="card-header">${name}<br /><br />${role}</h5>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">ID: ${id}</li>
                        <li class="list-group-item">Email: ${email}</li>
                        <li class="list-group-item">School: ${school}</li>
                    </ul>
                </div>
            </div>
            `;
        } else {
            const phone = member.getOfficeNumber();
            data = `
            <div class="col-6">
                <div class="card mx-auto mb-3" style="width: 18rem">
                    <h5 class="card-header">${name}<br /><br />${role}</h5>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">ID: ${id}</li>
                        <li class="list-group-item">Email: ${email}</li>
                        <li class="list-group-item">Office Phone: ${phone}</li>
                    </ul>
                </div>
            </div>
            `;
        }
        console.log("Adding a team member!");
        fs.appendFile("./dist/team.html", data, function (err) {
            if (err) {
                return reject(err);
            };
            return finishHTML();
        });
    });
}

function finishHTML () {
    const endHTML = `
        </div>
    </div>
</body>
</html>
    `;
    fs.appendFile("./dist/team.html", endHTML, function (err) {
        if (err) {
            console.log(err);
        };
    });
    console.log("Ending HTML file generation.")
}

async function promptLoop (addMore)  {
    if (addMore === "yes") {
        const again = await createTeamMember();
        console.log("Team member Added!");
        return again;
    } else {
        finishHTML();
    }
}


function startProgram() {
    generateHTML();
    promptLoop("yes").then(()=>{});
    
}

startProgram();