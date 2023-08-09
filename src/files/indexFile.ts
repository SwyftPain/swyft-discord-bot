const indexFile = (flags: any) => {
    return `import { Client, GatewayIntentBits } from 'discord.js'

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent
  ]
})

client.on("ready", () => {
  console.log("Bot is online")
})

client.on("messageCreate", (msg) => {
  if (msg.author.bot) return;
  if (!msg.content.startsWith("${flags.prefix}")) return;

  const command = msg.content.slice(1)

  if (command === "hello") {
    msg.reply("Hello back");
  }
})

client.login("${flags.token}")`
}

export default indexFile