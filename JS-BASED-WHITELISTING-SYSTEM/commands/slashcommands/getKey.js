
const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionsBitField , EmbedBuilder , Modal, TextInputComponent, MessageActionRow, MessageButton, Permissions  } = require('discord.js');
const fetch = require('node-fetch-commonjs')
const config = require('../../config.json')
const { Userdb } = require('../../database/index')

module.exports =  {
	data: new SlashCommandBuilder()
		.setName('get')     
        .setDescription('Get your whitelist key') 
        .addSubcommand(subcommand =>
            subcommand
                .setName('key')
                .setDescription('Get your whitelist key')          
                ),

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

                     const findUser= await Userdb.findOne({ discordId: interaction.user.id })

                     if(!findUser){
                        const nowhitelist = new EmbedBuilder()
                        .setAuthor({name: client.user.username, iconURL: client.user.displayAvatarURL() })
                        .setColor('Red')
                        .setDescription(`You are Not Whitelisted!`)
                        .setTimestamp()
                        .setFooter({ text: interaction.member.user.username, iconURL: interaction.member.user.displayAvatarURL() });
                     return interaction.channel.send({embeds: [nowhitelist], ephemeral: true})
                     }

interaction.reply({content: 'Check your DMS', ephemeral: true})

const scriptKey = new EmbedBuilder()
        .setColor('Green')
        .setDescription(`\`\`\`\n${findUser.key}\n\`\`\``)
        .setAuthor({name: client.user.username, iconURL: client.user.displayAvatarURL() })
        .setTimestamp()
        .setFooter({ text: interaction.member.user.username, iconURL: interaction.member.user.displayAvatarURL() });

interaction.user.send({embeds: [scriptKey]})
                
                
          }
      }
    