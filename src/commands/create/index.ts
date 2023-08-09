import { Args, Command, Flags } from '@oclif/core'
import * as fs from 'fs';
import * as path from 'path'; // Import the 'path' module
import { exec } from 'child_process';
import indexFile from '../../files/indexFile';
import packageJsonFile from '../../files/packageJsonFile';
import fetchLatest from '../../functions/checkLatestVersion';
import WriteToFile from '../../functions/writeToFile';
import runScripts from '../../functions/runScripts';

export default class Create extends Command {
  static description = 'Create a discord bot boilerplate'

  static examples = [
    `swyft-bot create "bot-name" --l typescript --token sometoken -p ! -dir .`,
  ]

  static flags = {
    language: Flags.string({ char: 'l', description: 'What language do you want your bot to be written in?', required: true, options: ["javascript", "typescript"], aliases: ["l"] }),
    token: Flags.string({ char: 't', description: 'Your bot token', required: true, aliases: ["t"] }),
    prefix: Flags.string({ char: 'p', description: 'Your bot prefix', required: true, aliases: ["p"] }),
    dir: Flags.string({ char: 'o', description: 'The directory of your bot', required: false, aliases: ["d", "o"] }),
  }

  static args = {
    name: Args.string({ required: true })
  }

  async run(): Promise<void> {
    const { args, flags } = await this.parse(Create)

    const greenFont = '\x1b[32m%s\x1b[0m'
    const redFont = '\x1b[31m%s\x1b[0m'
    const yellowFont = '\x1b[33m%s\x1b[0m'

    if (args.name.includes(" ")) return console.error(redFont, "Name cannot include spaces.")

    interface Options {
      [key: string]: string
    }

    const extensions: Options = {
      javascript: "js",
      typescript: "ts"
    };

    const startScripts: Options = {
      javascript: "node index.js",
      typescript: "ts-node-dev index.ts"
    };

    const indexDirPath = flags.dir ?? ".";
    const indexFilePath = path.join(indexDirPath, args.name, `index.${extensions[flags.language]}`); // Use path.join to create the file path
    const packagePath = path.join(indexDirPath, args.name, "package.json");
    const execScriptPath = path.join(indexDirPath, args.name)

    // Create the directory if it doesn't exist
    fs.mkdirSync(path.dirname(indexFilePath), { recursive: true });

    const packageContent = packageJsonFile(args, extensions, startScripts, flags);

    fs.appendFileSync(packagePath, packageContent);

    const indexContent = indexFile(flags)

    fetchLatest(yellowFont, redFont)

    WriteToFile(indexFilePath, indexContent, (err) => {
      console.error(redFont, 'Error writing to a file:', err);
    }, () => {
      console.log(yellowFont, `Writing to a file using ${flags.language}...`);
    })

    console.log(yellowFont, `Installing packages using npm...`)

    const modulesToInstall: Options = {
      javascript: "npm install discord.js",
      typescript: "npm install discord.js typescript ts-node-dev && tsc --init"
    }

    runScripts(modulesToInstall[flags.language], execScriptPath, (error) => {
      console.error(redFont, 'There was an error installing packages. Please try to run "npm install" manually.');
    }, (stdout) => {
      console.log(stdout);
      console.log(greenFont, "Finished creating a boilerplate!")
    })
  }
}
