import { exec } from "child_process";
import logger from "./logger";

function execCommand(command: string): Promise<string> {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout) => {
      if (error) {
        reject(error.message);
      }
      resolve(stdout);
    });
  });
}

class KubectlExec {
  public path: string;
  private nameSpaces: string[];

  constructor(path = "../") {
    this.nameSpaces = [];
    this.path = path;
  }

  async init() {
    await this.setNameSpaces();
  }

  async setNameSpaces() {
    const res: string = await execCommand("kubectl get namespaces");
    const nameSpaces: string[] = res.split("\n");
    const filteredName: string[] = nameSpaces.map((value = "") => {
      return value.slice(0, value.indexOf(" "));
    });

    filteredName.shift();
    filteredName.pop();
    this.nameSpaces = filteredName;
  }

  getNameSpaces() {
    return this.nameSpaces;
  }

  async resetUserDeployment(): Promise<void> {
    const deleteCommand = `kubectl delete -f ${this.path}zaamna-infrastructure/templates/kops/bsa/qa/deployments/admin/deployment-back-users.yaml`;
    const applyCommand = `kubectl apply -f ${this.path}zaamna-infrastructure/templates/kops/bsa/qa/deployments/admin/deployment-back-users.yaml`;

    try {
      let res = await execCommand(deleteCommand);
      logger.info(res);

      res = await execCommand(applyCommand);
      logger.info(res);
    } catch (err) {
      logger.warn(err);
    }
  }
}

const kubectl = new KubectlExec();
export default kubectl;
