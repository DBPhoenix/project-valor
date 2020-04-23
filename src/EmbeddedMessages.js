import Discord from 'discord.js';

const valorColorHex = '#ff4654';
const sageColorHex = '#00c8c1';
const phoenixColorHex = '#ec9f3e';
const viperColorHex = '#09963a';

export const overblikVelkommen = new Discord.MessageEmbed()
    .setColor(sageColorHex)
    .setTitle('Velkommen til PlayValorant Danmark')
    .setDescription(
        "PlayValorant Danmark stræber efter at blive den bedste danske Valorant Discord server. Vi håber, at du nyder dit ophold her.\n\n" +

        "Her finder du en hurtig oversigt over serveren og vær venlig at læse reglerne igennem i <#702256342240591962>.\n\n" +

        "Hvis du har brug for hjælp, så kontakt en <@&700997792163954729>.\n\n" +

        "Invite link: https://discord.gg/5RPdCUb"
    );

export const overblikKanaler = new Discord.MessageEmbed()
    .setColor(phoenixColorHex)
    .setTitle('Oversigt over kanaler')
    .setDescription(
        "<#702256342240591962> regler for serveren, sørg for at få dem læst, da der ikke står for meget.\n" +
        "<#702065827717054466> skriv, hvem I mainer her, så får I jeres role. I kan også skrive 'Undecided' (Ikke valgt) eller 'Fill'.\n" +
        "<#702086742995501087> her kan I skrive jeres forslag til serveren, hvis I har ting, der mangler, eller I føler, der skal ændres.\n\n" +
        
        "--- Main Chats ---\n" +
        "<#700994554148552746> - En generel chat for alt, hvad der sker.\n" +
        "<#700997239446962216> - For alt, hvad der har med Valorant at gøre.\n" +
        "<#702654825212411965> - Hvis du gerne vil finde et team, kan du søge efter et her.\n" +
        "<#702084713858203708> - Til bot commands og bot spam.\n\n" +
        
        "--- Agents ---\n" +
        "Der er en tekst channel for hver Agent, hvor man kan stille spørgsmål til en specifik Agent og snakke tips & tricks.\n\n" +
        
        "--- Maps ---\n" +
        "Der er en tekst channel for hver Map, hvor man kan diskutere de bedste strats.\n\n" +
        
        "--- Misc Chats ---\n" +
        "<#702256591524855808> - Her kan i sende alt det NSFW content, som I har brug for. Text Kanalen er for 18+.\n\n" +
        
        "--- Public Voice ---\n" +
        "Åbne voice channels, hvor alle kan joine og have en hyggelig samtale.\n\n" +
        
        "--- Play Valorant ---\n" +
        "Disse voice channels er ment for folk, der spiller Valorant sammen og har brug for ro. De fylder automatisk på, så hver velkommen til at okkupere et rum."
    );

export const overblikTeams = new Discord.MessageEmbed()
    .setColor(viperColorHex)
    .setTitle('Valorant Discord Teams')
    .setDescription(
        "Du kan oprette teams under Discorden, hvor du kan spille og snakke med andre spillere, om det er 5 eller 15 betyder intet.\n\n" +

        "På et team får i som standard tilknyttet en Kategori, med en Text Channel og en Voice Channel, som Team Lederen kan ændre på, som han ønsker." + 
        "Hvis du har lyst til at oprette et team, kan du skrive til en <@&700997792163954729>. Det kræver en Team Leader og mindst 4 andre personer for at oprette et team.\n\n" +
        
        "Hvis du søger at joine et team, så kan du skrive i <#702654825212411965>. Lige ledes, hvis du har tænkt dig at oprette et team, kan du søge efter medlemmer der."
    );