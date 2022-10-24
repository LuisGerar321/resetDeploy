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
  constructor (path = "../") {
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
    const deleteCommand = `kubectl delete -f ${this.path}zaamna-infrastructure/templates/kops/bsa/qa/deployments/admin/deployment-back-users.yaml`;
    const applyCommand = `kubectl apply -f ${this.path}zaamna-infrastructure/templates/kops/bsa/qa/deployments/admin/deployment-back-users.yaml`;
    try {
      let res = "";
      res = await execCommand(deleteCommand);
      logger.info(res);
      res = await execCommand(applyCommand);
      logger.info(res);
    } catch (err) {
      logger.warn(err);
    }
  }
}

const kubectl = new KubectlExec();
module.exports = kubectl;