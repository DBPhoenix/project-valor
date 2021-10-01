import { Message, Invite } from 'discord.js';
import { channelData, roleData } from './JSONFileHandler';

async function personalLink(msg: Message): Promise<Invite | null> {
  const { guild } = msg;

  if (!guild) {
    throw Error();
  }

  let link: Invite | undefined;
  await guild.fetchInvites().then((collection) => collection.each((invite) => {
    if (invite.inviter === msg.author) {
      msg.channel.send(`Dit Link: ${invite.url}`);
      link = invite;
    }
  }));

  if (!link) {
    msg.channel.send(
      `${'Boten registrede ikke et invite link i dit navn. På grund af tekniske begrænsninger i Discord skal invite linket oprettes manuelt for at stå i dit navn. For at oprette et invite link, skal du gøre følgende:\n'
      + '1. Gå ind på <#'}${channelData.overblik}>\n`
      + '2. Tryk på PlayValorant Danmark i venstre hjørne.\n'
      + '3. Tryk \'Invite People\' eller tilsvarende på dansk.\n'
      + '4. Tryk på \'Edit Invite Link\' eller tilsvarende nede i bunden med blå skrift.\n'
      + '5. Første dropdown skal hede \'Never\' eller tilsvarende\n'
      + '6. Anden skal hedde \'No Limit\' eller tilsvarende\n'
      + '7. Tryk Generate a New Link',
    );

    return null;
  }

  return link;
}

export function handleMessage(msg: Message, args: string[]): void {
  const { member } = msg;

  if (!member) {
    throw Error();
  }

  if (member.roles.cache.some((role) => role.id === roleData['Content Creator'])) {
    if (args[0] === 'link') personalLink(msg);
  } else {
    msg.channel.send('Dette er kun en command for Content Creators');
  }
}
