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
    Guild.findOne({ _id: message.guild.id }, async (err, server) => {
      if (!message.member.hasPermission("BAN_MEMBERS"))
        return message.quote(
          `${message.author}, você não tem permissão para banir membros.`
        );
      let member = message.guild.member(
        message.guild.members.cache.get(args[0]));

      let reason;
      if (!args[1]) reason = "Não informado";
      else reason = args.slice(1).join(" ");

      if (!member) {
        return message.quote(
          `${message.author}, você precisa inserir o ID do membro que deseja desbanir.`
        );
      } else if (member.id == message.author.id) {
        return message.quote(`${message.author}, você não pode se desbanir, bobinho.`);
      } else {
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
            member.user.displayAvatarURL({ dynamic: true, size: 2048 })
          )
          .addFields(
            {
              name: "Membro",
              value: member.user.tag,
            },
            {
              name: "ID do Membro",
              value: member.id,
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
          setTimeout(()=> msg.delete(), 5000)
        });

        member.unban({ days: 7, reason: reason });
      }
    });
  }
};
