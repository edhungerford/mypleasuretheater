const { createAudioResource, NoSubscriberBehavior, AudioPlayerStatus } = require('@discordjs/voice');
const { entersState, VoiceConnectionStatus, joinVoiceChannel, getVoiceConnection, createAudioPlayer, StreamType } = require('@discordjs/voice');
const { createReadStream } = require('node:fs');
const { SlashCommandBuilder, MessageFlags } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder().setName('join').setDescription('Joins the voice channel you\'re in.'),
	async execute(interaction, recordable) {
		await interaction.deferReply();
		let connection = getVoiceConnection(interaction.guildId);

		if (!connection) {
			if (!interaction.member?.voice.channel) {
				await interaction.followUp('Join a voice channel and then try that again!');
				return;
			}

			connection = joinVoiceChannel({
				adapterCreator: interaction.guild.voiceAdapterCreator,
				channel: interaction.member.voice.channel,
				channelId: interaction.member.voice.channel.id,
				guildId: interaction.guild.id,
				selfDeaf: false,
				selfMute: false,
			});
		}

		try {
			interaction.member?.voice.channel.members.forEach(element => {
				console.log(element.id);
			});
			await entersState(connection, VoiceConnectionStatus.Ready, 20000);
			const receiver = connection.receiver;
			receiver.speaking.on('start', async (userId) => {
				if (recordable) {
					if(!recordable.has(userId)) recordable.add(userId)
					const user = await interaction.client.users.fetch(userId);
					interaction.guild.members.fetch({ user: Array.from(recordable), withPresences: true })
						.then(async response => {
							const apiHit = await fetch("http://localhost:3001/", {
								method: "POST",
								body: JSON.stringify(response.toJSON().map(function(user){
									user = user.toJSON()
									return {
										"type": "userBounce",
										"displayName": user.displayName,
										"pfp": user.displayAvatarURL,
										"bouncing": user.userId == userId? true : false
									}
								})),
								headers: {
									"Content-Type": "application/json",
								}
							})
							const responseBody = await apiHit.json();
					})
				}
			});
			receiver.speaking.on('end', async (userId) => {
				if (recordable) {
					const user = await interaction.client.users.fetch(userId);
					console.log("Speaking activity ended from user", user.displayName);
					interaction.guild.members.fetch({ user: Array.from(recordable), withPresences: true })
						.then(async response => {
							const apiHit = await fetch("http://localhost:3001/", {
								method: "POST",
								body: JSON.stringify(response.toJSON().map(function(user){
									user = user.toJSON()
									return {
										"displayName": user.displayName,
										"pfp": user.displayAvatarURL,
										"bouncing": false
									}
								})),
								headers: {
									"Content-Type": "application/json",
								}
							})
							const responseBody = await apiHit.json();
					})
				}
			});

		} catch (error) {
			console.warn(error);

			await interaction.followUp('Failed to join voice channel within 20 seconds, please try again later!');
		}

		await interaction.followUp({content: 'Ready!', flags: MessageFlags.EPHEMERAL});
	},
};