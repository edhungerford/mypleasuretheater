const { getVoiceConnection } = require("@discordjs/voice");
const { SlashCommandBuilder, SnowflakeUtil } = require("discord.js");


module.exports = {
    data: new SlashCommandBuilder().setName("leave").setDescription("Leaves current voice channel."),
    async execute(interaction, recordable){
        const connection = getVoiceConnection(interaction.guildId);
        if (!connection) {
		    await interaction.reply({ content: 'Not in a voice channel in this server!', ephemeral: true });
            return;
	    }
        connection.destroy();
        recordable.clear();
        await interaction.reply({ content: 'Left the channel!', ephemeral: true });
    }   

}