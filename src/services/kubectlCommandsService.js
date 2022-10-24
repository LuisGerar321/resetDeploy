const { exec } = require("child_process");
const logger = require("./logger");

function execCommand (command) {
  return new Promise( (resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
          reject(error.message);
      }
      resolve(stdout);
    });
  })
}

class KubectlExec {
  constructor (path = "../../") {
    this.nameSpaces;
    this.path = path;
  }

  async init(path){
    await this.setNameSpaces(); 
  }

  async setNameSpaces() {
    let res = await execCommand("kubectl get namespaces");
    let nameSpaces = res.split("\n");
    let filteredName = nameSpaces.map((value = "") => {
      return value.slice(0, value.indexOf(" "));
    })
    filteredName.shift()
    filteredName.pop();
    this.nameSpaces = filteredName;
  }
  getNameSpaces() {
    
    return this.nameSpaces;
  }
  async resetUserDeployment() {
    const deleteCommand = `kubectl delete -f ../zaamna-infrastructure/templates/kops/bsa/qa/deployments/admin/deployment-back-users.yaml`;
    const applyCommand = `kubectl apply -f ../zaamna-infrastructure/templates/kops/bsa/qa/deployments/admin/deployment-back-users.yaml`;
    console.log("Command to be executed:\n\t", deleteCommand);
    console.log("Command to be executed:\n\t", applyCommand);
    console.log("dirpath: ", __dirname);
    let res = "";
    res = await execCommand(deleteCommand);
    logger.info(res);
    res = await execCommand(applyCommand);
    logger.info(res);
  }
}

const kubectl = new KubectlExec();
module.exports = kubectl;