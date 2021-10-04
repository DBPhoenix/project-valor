import { MessageEmbed } from 'discord.js';
import { channelData, roleData } from './JSONFileHandler';

const valorColorHex = '#ff4654';
const sageColorHex: string = '#00c8c1';
const phoenixColorHex: string = '#ec9f3e';
const viperColorHex: string = '#09963a';

export const overblikVelkommen = new MessageEmbed()
  .setColor(sageColorHex)
  .setTitle('Velkommen til PlayValorant Danmark')
  .setDescription(
    `${'PlayValorant Danmark stræber efter at blive den bedste danske Valorant Discord server. Vi håber, at du nyder dit ophold her.\n\n'

    + 'Her finder du en hurtig oversigt over serveren og vær venlig at læse reglerne igennem i <#'}${channelData.regler}>.\n\n`

    + `Hvis du har brug for hjælp, så kontakt en <@&${roleData.Moderator}>.\n\n`

    + 'Invite link: https://discord.gg/5RPdCUb\n\n'

    + 'Join Valorant Danmarks Facebook gruppe: https://www.facebook.com/groups/276840039591196/',
  );

export const overblikKanaler = new MessageEmbed()
  .setColor(phoenixColorHex)
  .setTitle('Oversigt over kanaler')
  .setDescription(
    `<#${channelData.regler}> - regler for serveren, sørg for at få dem læst, da der ikke står for meget.\n`
    + `<#${channelData['bot-commands']}> - en oversigt over alle commands, som Valor har.\n`
    + `<#${channelData['jeg-mainer']}> - skriv, hvem I mainer her, så får I jeres role.\n`
    + `<#${channelData['community-content']}> - her kan I se alt, hvad Content Creators'ne går og laver. Gå ind og følg dem og støt den Danske Valorant Community.\n\n`

    + '--- Main Chats ---\n'
    + `<#${channelData['--- Main Chats ---'].general}> - en generel chat for alt, hvad der sker.\n`
    + `<#${channelData['--- Main Chats ---'].valorant}> - for alt, hvad der har med Valorant at gøre.\n`
    + `<#${channelData['--- Main Chats ---'].bot}> - til bot commands og bot spam.\n\n`

    + '--- Teams ---\n'
    + `<#${channelData['--- Teams ---'].scrims}> - søg efter scrim partnere her. Se eventuelt pin.\n`
    + `<#${channelData['--- Teams ---']['søger-hold']}> - til alle jer, der søger et team.\n`
    + `<#${channelData['--- Teams ---']['søger-spillere']}> - til holdene, der mangler spillere.\n\n`

    + '--- Agents ---\n'
    + 'Der er en tekst channel for hver Agent, hvor man kan stille spørgsmål til en specifik Agent og snakke tips & tricks.\n\n'

    + '--- Maps ---\n'
    + 'Der er en tekst channel for hvert Map, hvor man kan diskutere de bedste strats.\n\n'

    + '--- Public Voice ---\n'
    + 'Åbne voice channels, hvor alle kan joine og have en hyggelig samtale. Disse channels er ikke ment for at spille Valorant Competitivt, så der forventes, at samtalen ikke fyldes med calls.\n\n'

    + '--- Play Valorant ---\n'
    + 'Disse voice channels er ment for folk, der spiller Valorant sammen og har brug for ro. De fylder automatisk på, så hver velkommen til at okkupere et rum.',
  );

export const overblikTeams = new MessageEmbed()
  .setColor(viperColorHex)
  .setTitle('Valorant Discord Teams')
  .setDescription(
    `${'Du kan oprette teams under Discorden, hvor du kan spille og snakke med andre spillere, om det er 5 eller 15, competitivt team eler casual community, venner eller randoms betyder intet.\n\n'

    + 'Hvis du har lyst til at oprette et team, kan du skrive til en <@&'}${roleData.Moderator}>. Det kræver en Team Leader og mindst 2 andre personer for at oprette et team.`
    + 'På et team får i som standard tilknyttet en Kategori, med en Text Channel og en Voice Channel, som Team Lederen kan ændre på, som han ønsker.\n\n'

    + `Hvis du søger at joine et team, så kan du skrive i <#${channelData['--- Teams ---']['søger-hold']}>. Lige ledes, hvis du har tænkt dig at oprette et team eller mangler en spiller, kan du søge efter medlemmer i <#${channelData['--- Teams ---']['søger-spillere']}>.`,
  );

export const regler1 = new MessageEmbed()
  .setColor(valorColorHex)
  .setTitle('#1 Respekter Hinanden')
  .setDescription(
    'På Discord Serveren respekterer vi hinanden, hvilket betyder, at vi snakker pænt til hinanden og opfører os anstændigt. Generelt handler det om at opføre sig, som man ville, hvis man stod over for personen. Dette gælder både i text channels, såvel som voice channels.',
  );

export const regler2 = new MessageEmbed()
  .setColor(valorColorHex)
  .setTitle('#2 Intet NSFW')
  .setDescription(
    `NSFW - Not Safe For Work - content er forbudt i alle kanaler, hvor det ikke hører til. Hvis du har noget, du gerne vil dele, men er i tvivl, så værd på den sikre side, eller skriv til en <@&${roleData.Moderator}>. SFW content kvalificerer sig som indhold, som en person ville kunne se komfortabelt i miljøer som arbejdet eller skolen.`,
  );

export const regler3 = new MessageEmbed()
  .setColor(valorColorHex)
  .setTitle('#3 Stop Spam')
  .setDescription(
    'Der forventes af alle på Discord serveren, at der ikke spammes i de forskellige text/voice channels. Dette betyder, at beskederne sendt på Discord Channelen skal leve op til en vis standard.',
  );

export const regler4 = new MessageEmbed()
  .setColor(valorColorHex)
  .setTitle('#4 Ingen Reklame')
  .setDescription(
    `Det er som udgangspunkt ikke lovligt at reklamere for andre Discord Servere, Facebook Sider m.m. Hvis du søger at få et opslag godkendt, så kontakt en <@&${roleData.Moderator}>. Hvis du vil lave et opslag med din Twitch Stream eller YouTube, skal det gøres i <#${channelData['community-content']}>`,
  );

export const regler5 = new MessageEmbed()
  .setColor(valorColorHex)
  .setTitle('#5 Terms of Service')
  .setDescription(
    'Alt på Discorden skal selvfølgelig stemme overens med både Riots & Discords Terms of Service. Dette inkluderer bl.a. almen opførelse og salg af accounts. Læs mere:\n'
    + 'Riots Terms of Service: https://www.riotgames.com/en/terms-of-service\n'
    + 'Discords Terms of Service: https://discordapp.com/terms\n',
  );

export const regler6 = new MessageEmbed()
  .setColor(valorColorHex)
  .setTitle('#6 Lyt til Moderators')
  .setDescription(
    'Al aktivitet på Discorden er subjekt til vurdering af alt personale på Discord. Dette betyder, at det i alle tilfælde vil være administrationen, der har sidste ord. Hvis du skulle være i tvivl om, hvorvidt det du laver af en eller anden grund, skulle være mod reglerne, så kontakt en moderator.',
  );

export const commandsValor = new MessageEmbed()
  .setColor(valorColorHex)
  .setTitle('Valor\'s Commands')
  .setDescription(
    'Valor er PlayValorant Danmark\'s primære bot, den er konstant under udvikling, derfor kan I forvente at se opdateringer, når der er behøv for det.\n\n'

    + '**--- Core ---**\n'
    + 'Core Commands er forskellige generelle kommands.\n'
    + '!link - sender et link til Discorden og Facebooken\n'
    + '!random - en random agent til dem, der ikke ved, hvad de skal spille.\n\n'

    + '**--- Teams ---**\n'
    + 'Team Commands er til Team featuren på serveren. Designet til at gøre det nemmere at oprette og vedligeholde et team.\n'
    + '!team create <text/voice> - laver en text/voice channel til det team, du er en del af. Command skal skrives i det Team, hvor der skal oprettes en ny kanal og kan kun gøres af en Team Captain.\n\n'

    + '**--- Music ---**\n'
    + 'Music Bommands er til Valors musik feature. Der er pt 3 Music Bots på serveren, som Valor tildeler tilfældigt til de forskellige kanaler. Music Commands kan kun bruges i Voice Channels.\n'
    + '!join - en Music Bot joiner jeres kanal.\n'
    + '!leave - botten forlader chatten.\n'
    + '!loop - playlist repeater.\n'
    + '!pause - stopper med at afspille.\n'
    + '!play <keywords/URL> - afspiller en sang fundet med en Youtube Search eller et URL.\n'
    + '!resume - fortsætter med at afspille.\n'
    + '!skip - springer den nuværende sang over.',
  );
