import { GuildEmoji, GuildMember, MessageReaction, User, PartialUser } from 'discord.js';
import { getAgentRoleIDFromName } from './ValorUtils';

export const reactMessageID: string = '704679784478670899';

export async function addMainByEmote(reaction: MessageReaction, user: User | PartialUser): Promise<GuildMember> {
    if (reaction.message.id === reactMessageID) {
        if (reaction.partial) {
            try {
                await reaction.fetch();
            } catch (err) {
                console.log("Couldn't Fetch Message: " + err);
                return;
            }
        }

        try {
            return (<GuildEmoji> reaction.emoji).guild.member(user.id).roles.add(getAgentRoleIDFromName(reaction.emoji.name));   
        } catch (err) {
            console.warn("Expected GuildEmoji");
            console.warn("Error: " + err);
        }
    }
}

export async function removeMainByEmote(reaction: MessageReaction, user: User | PartialUser): Promise<GuildMember> {
    if (reaction.message.id === reactMessageID) {
        if (reaction.partial) {
            try {
                await reaction.fetch();
            } catch (err) {
                console.log("Couldn't Fetch Message: " + err);
                return; 
            }
        }

        try {
            return (<GuildEmoji> reaction.emoji).guild.member(user.id).roles.remove(getAgentRoleIDFromName(reaction.emoji.name));
        } catch (err) {
            console.warn("Expected GuildEmoji");
            console.warn("Error: " + err);
        }
    }
}