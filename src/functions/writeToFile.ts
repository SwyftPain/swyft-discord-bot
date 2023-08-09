import * as fs from 'fs';

const WriteToFile = (dir: string, content: string, onErr: (err: NodeJS.ErrnoException | null) => void, onSuccess: () => void) => {
    fs.appendFile(dir, content, (err) => {
        if (err) {
            onErr(err)
        } else {
            onSuccess()
        }
    });
}

export default WriteToFile
