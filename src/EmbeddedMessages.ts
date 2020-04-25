import { MessageEmbed, Message } from 'discord.js';
import { channelData, roleData } from './JSONFileHandler';

const valorColorHex = '#ff4654';
const sageColorHex: string = '#00c8c1';
const phoenixColorHex: string = '#ec9f3e';
const viperColorHex: string = '#09963a';

export const overblikVelkommen = new MessageEmbed()
    .setColor(sageColorHex)
    .setTitle('Velkommen til PlayValorant Danmark')
    .setDescription(
        "PlayValorant Danmark stræber efter at blive den bedste danske Valorant Discord server. Vi håber, at du nyder dit ophold her.\n\n" +

        "Her finder du en hurtig oversigt over serveren og vær venlig at læse reglerne igennem i <#" + channelData["regler"] + ">.\n\n" +

        "Hvis du har brug for hjælp, så kontakt en <@&" + roleData.Moderator + ">.\n\n" +

        "Invite link: https://discord.gg/5RPdCUb"
);

export const overblikKanaler = new MessageEmbed()
    .setColor(phoenixColorHex)
    .setTitle('Oversigt over kanaler')
    .setDescription(
        "<#" + channelData["regler"] + "> regler for serveren, sørg for at få dem læst, da der ikke står for meget.\n" +
        "<#" + channelData["jeg-mainer"] + "> skriv, hvem I mainer her, så får I jeres role.\n" +
        "<#" + channelData["server-forslag"] + "> her kan I skrive jeres forslag til serveren, hvis I har ting, der mangler, eller I føler, der skal ændres.\n\n" +
        
        "--- Main Chats ---\n" +
        "<#" + channelData["--- Main Chats ---"]["general"] + "> - En generel chat for alt, hvad der sker.\n" +
        "<#" + channelData["--- Main Chats ---"]["valorant"] + "> - For alt, hvad der har med Valorant at gøre.\n" +
        "<#" + channelData["--- Main Chats ---"]["looking-for-group"] + "> - Hvis du gerne vil finde et team, kan du søge efter et her.\n" +
        "<#" + channelData["--- Main Chats ---"]["bot"] + "> - Til bot commands og bot spam.\n\n" +
        
        "--- Agents ---\n" +
        "Der er en tekst channel for hver Agent, hvor man kan stille spørgsmål til en specifik Agent og snakke tips & tricks.\n\n" +
        
        "--- Maps ---\n" +
        "Der er en tekst channel for hvert Map, hvor man kan diskutere de bedste strats.\n\n" +
        
        "--- Misc Chats ---\n" +
        "<#"+ channelData["--- Misc Chats ---"]["nsfw"] +"> - Her kan i sende alt det NSFW content, som I har brug for. Text Kanalen er for 18+.\n\n" +
        
        "--- Public Voice ---\n" +
        "Åbne voice channels, hvor alle kan joine og have en hyggelig samtale. Disse channels er ikke ment for at spille Valorant Competitivt, så der forventes, at samtalen ikke fyldes med calls.\n\n" +
        
        "--- Play Valorant ---\n" +
        "Disse voice channels er ment for folk, der spiller Valorant sammen og har brug for ro. De fylder automatisk på, så hver velkommen til at okkupere et rum."
);

export const overblikTeams = new MessageEmbed()
    .setColor(viperColorHex)
    .setTitle('Valorant Discord Teams')
    .setDescription(
        "Du kan oprette teams under Discorden, hvor du kan spille og snakke med andre spillere, om det er 5 eller 15, competitivt eller casual, venner eller randoms betyder intet.\n\n" +

        "På et team får i som standard tilknyttet en Kategori, med en Text Channel og en Voice Channel, som Team Lederen kan ændre på, som han ønsker." + 
        "Hvis du har lyst til at oprette et team, kan du skrive til en <@&" + roleData.Moderator + ">. Det kræver en Team Leader og mindst 2 andre personer for at oprette et team.\n\n" +
        
        "Hvis du søger at joine et team, så kan du skrive i <#" + channelData["--- Main Chats ---"]["looking-for-group"] + ">. Lige ledes, hvis du har tænkt dig at oprette et team, kan du søge efter medlemmer der."
);

export const regler1 = new MessageEmbed()
    .setColor(valorColorHex)
    .setTitle("#1 Respekter Hinanden")
    .setDescription(
        "På Discord Serveren respekterer vi hinanden, hvilket betyder, at vi snakker pænt til hinanden og opfører os anstændigt. Generelt handler det om at opføre sig, som man ville, hvis man stod over for personen. Dette gælder både i text channels, såvel som voice channels."
);

export const regler2 = new MessageEmbed()
    .setColor(valorColorHex)
    .setTitle("#2 Intet NSFW")
    .setDescription(
        "NSFW - Not Safe For Work - content er forbudt i alle kanaler, hvor det ikke hører til. Hvis du har noget, du gerne vil dele, men er i tvivl, så værd på den sikre side. NSFW content er kun tilladt i <#" + channelData["--- Misc Chats ---"]["nsfw"] + ">. SFW content kvalificerer sig som indhold, som en person ville kunne se komfortabelt i miljøer som arbejdet eller skolen."
);

export const regler3 = new MessageEmbed()
    .setColor(valorColorHex)
    .setTitle("#3 Stop Spam")
    .setDescription(
        "Der forventes af alle på Discord serveren, at der ikke spammes i de forskellige text/voice channels. Dette betyder, at beskederne sendt på Discord Channelen skal leve op til en vis standard."
);

export const regler4 = new MessageEmbed()
    .setColor(valorColorHex)
    .setTitle("#4 Ingen Reklame")
    .setDescription(
        "Det er som udgangspunkt ikke lovligt at reklamere for andre Discord Servere, Facebook Sider m.m. Hvis du søger at få et opslag godkendt, så kontakt en <@&" + roleData.Moderator + ">."
);

export const regler5 = new MessageEmbed()
    .setColor(valorColorHex)
    .setTitle("#5 Lyt til Moderators")
    .setDescription(
        "Al aktivitet på Discorden er subjekt til vurdering af alt personale på Discord. Dette betyder, at det i alle tilfælde vil være administrationen, der har sidste ord. Hvis du skulle være i tvivl om, hvorvidt det du laver af en eller anden grund, skulle være mod reglerne, så kontakt en moderator."
);

export const commandsValor = new MessageEmbed()
    .setColor(valorColorHex)
    .setTitle("Valor's Commands")
    .setDescription(
        "Valor er PlayValorant Danmark's primære bot, den er konstant under udvikling, derfor kan I forvente at se opdateringer, når der er behøv for det. Hvis I har nogen forslag til Valor, så send dem til en <@&" + roleData.Developer + ">\n\n" +
        "**--- Core ---**\n" +
        "v!map <map> - sender et billede af den valgte map.\n" +
        "v!random - en random agent til dem, der ikke ved, hvad de skal spille.\n\n" +
        
        "**--- Teams ---**\n" +
        "v!team create <text/voice> - laver en text/voice channel til det team, du er en del af. Command skal skrives i det Team, hvor der skal oprettes en ny kanal og kan kun gøres af en Team Captain."
);