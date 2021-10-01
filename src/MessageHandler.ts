import {
  GuildEmoji,
  MessageReaction,
  User,
  PartialUser,
} from 'discord.js';
import { getAgentRoleIDFromName } from './ValorUtils';

export const reactMessageID: string = '704679784478670899';

export async function addMainByEmote(
  reaction: MessageReaction,
  user: User | PartialUser,
): Promise<void> {
  if (reaction.message.id === reactMessageID) {
    if (reaction.partial) {
      try {
        await reaction.fetch();
      } catch (err) {
        console.log(`Couldn't Fetch Message: ${err}`);
        return;
      }
    }

    const { emoji } = reaction;

    if (!(emoji instanceof GuildEmoji)) {
      return;
    }

    const member = emoji.guild.member(user.id);

    if (!member) {
      return;
    }

    member.roles.add(getAgentRoleIDFromName(reaction.emoji.name));
  }
}

export async function removeMainByEmote(
  reaction: MessageReaction,
  user: User | PartialUser,
): Promise<void> {
  if (reaction.message.id === reactMessageID) {
    if (reaction.partial) {
      try {
        await reaction.fetch();
      } catch (err) {
        console.log(`Couldn't Fetch Message: ${err}`);
        return;
      }
    }

    const { emoji } = reaction;

    if (!(emoji instanceof GuildEmoji)) {
      return;
    }

    const member = emoji.guild.member(user.id);

    if (!member) {
      return;
    }

    member.roles.remove(getAgentRoleIDFromName(reaction.emoji.name));
  }
}
