import { ExecException, exec } from 'child_process';

const runScripts = (command: string, pathToExecuteIn: string, onErr: (error: ExecException | null) => void, onSuccess: (stdout: string) => void) => {
    exec(command, { cwd: pathToExecuteIn }, (error, stdout, stderr) => {
        if (error) {
            onErr(error)
            return;
        }
        onSuccess(stdout)
    });
}

export default runScripts