import { GuildMember, TextChannel, Message } from 'discord.js';

function checkForTeamCaptain(member: GuildMember, channel: TextChannel): boolean {
  return channel.parent?.permissionsFor(member)?.any('MANAGE_MESSAGES') ?? false;
}

export function createChannel(msg: Message, args: string[]): void {
  const { guild, member } = msg;

  if (!guild || !member) {
    throw Error();
  }

  const thisTextChannel: TextChannel = <TextChannel>msg.channel;

  if (!thisTextChannel.parent) {
    throw Error();
  }

  if (checkForTeamCaptain(member, thisTextChannel)) {
    if (args[1] === 'text') {
      guild.channels.create('New Text', {
        parent: thisTextChannel.parent.id,
      });
    } else if (args[1] === 'voice') {
      guild.channels.create('New Voice', {
        type: 'voice',
        parent: thisTextChannel.parent.id,
      });
    } else {
      msg.channel.send('Ukendt kanal type: Usage v!team create <text/voice>');
    }
  } else {
    msg.reply('du skal være Team Captain og i jeres Team Chat for at bruge denne command');
  }
}
