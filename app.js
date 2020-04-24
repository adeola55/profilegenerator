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
        message:"what is your project repo?",
        name:"projectrepo",
    },
    {
        type: "input",
        message:"what is your project title?",
        name:"projecttitle"
    },
    {
        type: "input",
        message:"what is your description?",
        name:"description"
    },
    {
        type:"input",
        message:"what were your installations?",
        name:"installation",
        default: "npm i"
    },
    {
        type:"input",
        message:"what is your usage terms?",
        name:"usage"
    },
    {
        type:"list",
        message:"what are your licenses?",
        choices: ["MIT","ISC","APCAHE 2.0","None"],
        name:"license"
    },
    {
        type:"input",
        message:"what should your contributors know?",
        name:"contributions"
    },
    {
        type:"input",
        message:"what were your tests?",
        name:"tests",
        default:"npm test"
    }
    // ,{
    //     type:"input",
    //     message:"Do you have any questions?",
    //     name:"questions"
    // }
])
.then(function(response){
    console.log(response)
    userinput = response;
     return axios.get(`https://api.github.com/users/${response.github}`) 
}).then(function(apiresponse){
    console.log("API RESPONSE",apiresponse.data)
    let  readmetext = `
# ABOUT THE AUTHOR
    
## GITHUB USERNAME:** ${apiresponse.data.login} **
    
Email: ${userinput.email}
    
Following: ${apiresponse.data.following}
    
Followers: ${apiresponse.data.followers}
    
Public repo: ${[apiresponse.data.public_repos]}

# ABOUT THIS PROJECT
 * ### PROJECT1: ${userinput.url}
 * ![GitHub license] (https://img.shields.io/badge/license-${userinput.license}-blue.svg)
 * *  Project URL:[ Projecturl ] (https://github.com/${userinput.github}/${userinput.projectrepo})
    
    
 *  Project title: ${[userinput.projecttitle]}
    
    
 *  Description: ${[userinput.description]}
    
    
 *  Installation: ${[userinput.installation]}
    
    
 *   Usage: ${[userinput.usage]}

        
 *   NOTE to Contributors: ${[userinput.contributions]}


 *   Tests: ${[userinput.tests]}
    `
    return readmetext
})
.then(function(data){
    fs.writeFileSync("./README.md", data)
})

