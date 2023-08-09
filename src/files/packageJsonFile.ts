const packageJsonFile = (args: any, extensions: any, startScripts: any, flags: any) => {
    return `{
    "name": "${args.name}",
    "version": "1.0.0",
    "description": "",
    "main": "index.${extensions[flags.language]}",
    "scripts": {
        "start": "${startScripts[flags.language]}"
    },
    "keywords": [],
    "author": "",
    "license": "ISC"
}`
}

export default packageJsonFile