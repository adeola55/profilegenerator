var inquirer = require("inquirer")
var axios = require("axios")
var userinput;
var fs = require("fs")
inquirer.prompt([
    {
        type:"input",
        message:"what is your github username?",
        name:"github",
    },
    {
        type:"input",
        message:"what is your email address?",
        name:"email",
    },
    {
        type:"input",
        message:"what is your project URL?",
        name:"url",
    },
    {
        type: "input",
        message:"what is your project title?",
        name:"project title"
    },
    {
        type: "input",
        message:"what is your description?",
        name:"description"
    },
    {
        type:"input",
        message:"What is your table of content?",
        name:"table of content"
    },
    {
        type:"input",
        message:"what were your installations?",
        name:"installation"
    },
    {
        type:"input",
        message:"what is your usage?",
        name:"usage"
    },
    {
        type:"input",
        message:"what are your licenses",
        name:"license"
    },
    {
        type:"input",
        message:"what are your contributions?",
        name:"contributions"
    },
    {
        type:"input",
        message:"what were your tests?",
        name:"tests"
    },
    {
        type:"input",
        message:"Do you have any questions?",
        name:"questions"
    }
])
.then(function(response){
    console.log(response)
    userinput = response;
     return axios.get(`https://api.github.com/users/${response.github}`) 
}).then(function(apiresponse){
    console.log("API RESPONSE",apiresponse)
    let  readmetext = `
    # GITHUB USERNAME: ${apiresponse.data.login}
    ### PROJECT1: ${userinput.url}
    Email: ${userinput.email}
    Following: ${apiresponse.data.following}
    Followers: ${apiresponse.data.followers}
    Public repo: ${[apiresponse.data.public_repos]}
    Project title: ${[userinput.project_title]}
    Description: ${[userinput.description]}
    Table of content: ${[userinput.table_of_content]}
    Installation: ${[userinput.installation]}
    Usage: ${[userinput.usage]}
    License: ${[userinput.license]}
    Contributions: ${[userinput.contributions]}
    Tests: ${[userinput.tests]}
    Questions: ${[userinput.questions]}
    `
    return readmetext
})
.then(function(data){
    fs.writeFileSync("./README.md", data)
})

