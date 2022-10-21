const { exec } = require("child_process");

function execSync () {
  return new Promise( (resolve, reject) => {
    exec("kubectl get namespaces", (error, stdout, stderr) => {
      if (error) {
          reject(error.message);
      }
      resolve(stderr);
    });
  })
}

class kubectlExec {
  constructor () {
    this.nameSpace = null;
  }

  async setNameSpaces() {
    let data = await execSync();
    console.log('my data', data.split('\n'));
    return data;
  }
}


const kb = new kubectlExec();

console.log(kb.setNameSpaces());
