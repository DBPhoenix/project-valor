const betaRoleID: string = '700995685348016130';
const memberDefaultRoleID: string = '702661151858622464';

import { GuildMember, PartialGuildMember } from 'discord.js';

export function addBetaRole(member: GuildMember | PartialGuildMember): Promise<GuildMember> {
    return member.roles.add(betaRoleID);
}   

export function addMemberRole(member: GuildMember | PartialGuildMember): Promise<GuildMember> {
    return member.roles.add(memberDefaultRoleID);
}