const Discord = require("discord.js");
const Guild = require("../../database/Schemas/Guild");
const Command = require("../../structures/Command");
const ClientEmbed = require("../../structures/ClientEmbed");

module.exports = class Ban extends Command {
  constructor(client) {
    super(client);
    this.client = client;

    this.name = "unban";
    this.category = "Moderation";
    this.description = "Comando para desbanir membros do seu servidor";
    this.usage = "unban <@user> <motivo>";
    this.aliases = ["desbanir"];

    this.enabled = true;
    this.guildOnly = true;
  }
    async run({ message, args, prefix, author }, t) {
        const userID = args[0]
        if(!userID) return message.reply('Você precisa mandar um id :)') 
        let reason;
        if (!args[1]) reason = "Não informado";
        else reason = args.slice(1).join(" ");

        message.guild.fetchBans().then(bans => {
            if(bans.size == 0) return
            let bannedUser = bans.find(b => b.user.id == userID)

            if(bannedUser) { // If User Is Banned Then BOT Will Unban

                const UNBAN = new ClientEmbed(author)
                .setAuthor(
                  `${message.guild.name} - Membro Desbanido`,
                  message.guild.iconURL({ dynamic: true })
                )
                .setFooter(
                  `Comando requisitado por ${message.author.username}`,
                  message.author.displayAvatarURL({ dynamic: true })
                )
                .setColor("#00ACEE")
                .setThumbnail(
                    message.author.displayAvatarURL({ dynamic: true, size: 2048 })
                )
                .addFields(
                  {
                    name: "ID do Membro",
                    value: userID,
                  },
                  {
                    name: "Author",
                    value: message.author.tag,
                  },
                  {
                    name: "ID do Author",
                    value: message.author.id,
                  },
                  {
                    name: "Motivo do Unban",
                    value: reason,
                  }
                );
              message.channel.send(UNBAN).then(msg => {
                setTimeout(()=> msg.delete(), 10000)
              });
                message.guild.members.unban(bannedUser.user)
            } else {
                message.reply('Este usuário não está banido :)') 
            }
        })

    }
}