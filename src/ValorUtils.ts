import { GuildMember } from 'discord.js';
import { roleData } from './JSONFileHandler';

const developerRoleID = '702055729284251708';

export function getAgentRoleIDFromName(name: string): string {
  return roleData[name];
}

export function checkForDeveloper(member: GuildMember): boolean {
  return (member.roles.cache.some((role) => role.id === developerRoleID));
}
