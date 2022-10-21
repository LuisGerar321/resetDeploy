const { exec } = require("child_process");


class kubectlExec {
  constructor () {
    this.nameSpaces = null;
  }

  async execKubeCtl() {
    let data = '';
    
    exec("kubectl get namespaces", (error, stdout, stderr) => {
      if (error) {
          data = null;
          return;
      }
      if (stderr) {
          data = stderr;
          return;
      }
      console.log('hiiii');
      return data;
    });
    return data;
  }
}


const kb = new kubectlExec();

console.log(kb.execKubeCtl());
