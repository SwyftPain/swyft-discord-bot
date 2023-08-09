import packageJSON from '../package.json'

const fetchLatest = (yellowFont: string, redFont: string) => {
    fetch("https://registry.npmjs.org/swyft-discord-bot")
        .then((res) => res.json())
        .then((data) => {
            if (data['dist-tags'].latest > packageJSON.version) {
                console.log(yellowFont, "There is a newer version of the package. Update it with 'npm update swyft-discord-bot -g")
            }
        }).catch((err) => {
            console.log(redFont, err.message)
        })
}

export default fetchLatest