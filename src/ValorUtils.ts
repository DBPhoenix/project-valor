import { GuildMember } from 'discord.js';

const developerRoleID: string = '702055729284251708';

export function getAgentRoleIDFromName(name: string): string {
    let roleID = '';
    if (name === 'Breach') roleID = '701476915692699788';
    if (name === 'Brimstone') roleID = '701743884652380210';
    if (name === 'Cypher') roleID = '701747485147791412';
    if (name === 'Jett') roleID = '701013336938250380';
    if (name === 'Omen') roleID = '701049760789823558';
    if (name === 'Phoenix') roleID = '701001111691198504';
    if (name === 'Raze') roleID = '701477304525783159';
    if (name === 'Sage') roleID = '700996339517096056';
    if (name === 'Sova') roleID = '701494886419136522';
    if (name === 'Viper') roleID = '701001201596104754';
    return roleID;
}

export function checkForDeveloper(member: GuildMember): boolean {
    return member.roles.cache.some(role => role.id === developerRoleID);
}