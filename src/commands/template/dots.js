const User = require("../../database/Schemas/User");
const Command = require("../../structures/Command");
const ClientEmbed = require("../../structures/ClientEmbed");
const moment = require("moment");
require("moment-duration-format");

module.exports = class Avatar extends Command {
  constructor(client) {
    super(client);
    this.client = client;

    this.name = "dots";
    this.category = "dev";
    this.description = "Comando de um dos devs ou amigo do mesmo";
    this.usage = "a!dev";
    this.aliases = ["logo"];

    this.enabled = true;
    this.guildOnly = true;
  }

  async run({ message, args, prefix, author }, t) {
    const user =
      this.client.users.cache.get(args[0]) || message.author;

    const avatar = user.displayAvatarURL({
      dynamic: true,
      format: "jpg",
      size: 2048,
    });

    const EMBED = new ClientEmbed(author)

      .setTitle("Dots das musiquinha lá")
      .setThumbnail(message.author.displayAvatarURL({ dynamic: true}))
      .setDescription("Sou burro o suficiente pra não saber fazer uma descrição")
      .setImage("https://i.imgur.com/tyamq6z.png")
      .setFooter(
        `Comando requisitado por ${message.author.username}`,
      message.author.displayAvatarURL({ dynamic: true })
      )
      .setColor("#00ACEE")
    
      message.channel.send(EMBED).then(msg => {
          setTimeout(()=> msg.delete(), 10000)
        });
  }
};
