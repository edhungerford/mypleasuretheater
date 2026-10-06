const { SlashCommandBuilder, MessageFlags } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder().setName('popcorn').setDescription('Careful. It gets messy in here.'),
    async execute(interaction) {
        const interactionUser = await interaction.member.user;
        const users = interaction.member?.voice.channel.members;     
        const apiHit = await fetch("http://localhost:3001/", {
            method: "POST",
            body: JSON.stringify(
                users.map(user => {
                    return {
                        displayName: user.displayName,
                        pfp: user.displayAvatarURL(),
                        bouncing: user.id == interactionUser.id ? true : false,
                        type: "holding",
                        holding: user.id == interactionUser.id ? "popcorn" : undefined
                    }
                })
            ),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const responseBody = await apiHit.json();

       await interaction.reply({ content: 'You threw popcorn.', flags: MessageFlags.Ephemeral});
    }

}