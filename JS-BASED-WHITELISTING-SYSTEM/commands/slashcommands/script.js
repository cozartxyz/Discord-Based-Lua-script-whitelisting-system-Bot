
const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionsBitField , EmbedBuilder , Modal, TextInputComponent, MessageActionRow, MessageButton, Permissions, AttachmentBuilder  } = require('discord.js');
const config = require('../../config.json')

module.exports =  {
	data: new SlashCommandBuilder()
		.setName('script')     
        .setDescription('Get script'),

            async execute(interaction, client) {
                
                if (!interaction.member.roles.cache.some(role => role.id === config.whitelist_role)){ 
                    const nowhitelist = new EmbedBuilder()
                                    .setAuthor({name: client.user.username, iconURL: client.user.displayAvatarURL() })
                                    .setColor('Red')
                                    .setDescription(`You are not whitelisted for use this command!`)
                                    .setTimestamp()
                                    .setFooter({ text: interaction.member.user.username, iconURL: interaction.member.user.displayAvatarURL() });
                         return interaction.reply({embeds: [nowhitelist]})
                     }
 

         interaction.reply({content: 'Check your DMS', ephemeral: true})        

        const script = new EmbedBuilder()
        .setColor('Green')
        .setDescription(`\`\`\`lua\n${config.script}\n\`\`\``)
        .setAuthor({name: client.user.username, iconURL: client.user.displayAvatarURL() })
        .setTimestamp()
        .setFooter({ text: interaction.member.user.username, iconURL: interaction.member.user.displayAvatarURL() });

     interaction.user.send({embeds: [script]})
          }
      }
    