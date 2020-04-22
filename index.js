var inquirer = require("inquirer")
var axios = require("axios")
var userinput;
var fs = require("fs")
inquirer.prompt([
    {
        type:"input",
        messgae:"what is your github username?",
        name:"github",
    },
    {
        type:"input",
        messgae:"what is your email address?",
        name:"email",
    },
    {
        type:"input",
        messgae:"what is your project URL?",
        name:"url",
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
    `
    return readmetext
})
.then(function(data){
    fs.writeFileSync("./README.md", data)
})