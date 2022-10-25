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

enum ContextType {
  QA = "qa",
  PROD = "prod",
}
interface KubeCtlInitConfig {
  path?: string,
  context?: ContextType;
}

class KubectlExec {
  public path: string;
  private nameSpaces: string[];
  private context: string;

  constructor({path = "../", context = ContextType.QA} : KubeCtlInitConfig) {
    this.nameSpaces = [];
    this.path = path;
    this.context = context;
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

  private genDeleteCommand(path: string, namespace: string, context: string): string {
    return `kubectl delete -f ${path}zaamna-infrastructure/templates/kops/bsa/${context}/deployments/${namespace}/deployment-back-users.yaml`
  }
  private genApplyCommand(path: string, namespace: string, context: string): string {
    return `kubectl apply -f ${path}zaamna-infrastructure/templates/kops/bsa/${context}/deployments/${namespace}/deployment-back-users.yaml`
  }

  async resetUserDeployment(): Promise<void> {
    try {
      // Reseting Admin Services
      let deleteCommand: string = this.genDeleteCommand(this.path, "admin", this.context);
      let applyCommand: string = this.genApplyCommand(this.path, "admin", this.context);
      let res = await execCommand(deleteCommand);
      logger.info(res);
      res = await execCommand(applyCommand);
      logger.info(res);

      //Reseting Student Services.
      deleteCommand = this.genDeleteCommand(this.path, "student", this.context);
      applyCommand = this.genApplyCommand(this.path, "student", this.context);
      res = await execCommand(deleteCommand);
      logger.info(res);
      res = await execCommand(applyCommand);
      logger.info(res);
    } catch (err) {
      logger.warn(err);
    }
  }
}

const kubectl = new KubectlExec({context: ContextType.PROD});
export default kubectl;
