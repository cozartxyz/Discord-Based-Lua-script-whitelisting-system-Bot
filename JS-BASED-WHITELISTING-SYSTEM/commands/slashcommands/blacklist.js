
const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionsBitField , EmbedBuilder , Modal, TextInputComponent, MessageActionRow, MessageButton, Permissions, AttachmentBuilder  } = require('discord.js');
const fetch = require('node-fetch-commonjs')
const { Userdb } = require('../../database/index')
const config = require('../../config.json')

module.exports =  {
	data: new SlashCommandBuilder()
		.setName('blacklist')     
        .setDescription('Blacklist user')
        .addUserOption(option => option.setName('user').setDescription('User for blacklist').setRequired(true)),

            async execute(interaction, client) {
                
        

     const user = interaction.options.getUser('user')

     interaction.reply({content: `fetching in database..`, ephemeral: true})

     const findUser= await Userdb.findOne({ discord: user.id })

     if (!interaction.member.roles.cache.some(role => role.id === config.whitelist_role)){ 
      const nowhitelist = new EmbedBuilder()
                      .setAuthor({name: client.user.username, iconURL: client.user.displayAvatarURL() })
                      .setColor('Red')
                      .setDescription(`You are not whitelisted for use this command!`)
                      .setTimestamp()
                      .setFooter({ text: interaction.member.user.username, iconURL: interaction.member.user.displayAvatarURL() });
           return interaction.reply({embeds: [nowhitelist]})
       }

     if(!findUser){
        const nowhitelist = new EmbedBuilder()
        .setAuthor({name: client.user.username, iconURL: client.user.displayAvatarURL() })
        .setColor('Red')
        .setDescription(`User Not Whitelisted!`)
        .setTimestamp()
        .setFooter({ text: interaction.member.user.username, iconURL: interaction.member.user.displayAvatarURL() });
     return interaction.channel.send({embeds: [nowhitelist], ephemeral: true})
     }

     await Userdb.deleteOne({ discord: user.id })

     const success = new EmbedBuilder()
     .setAuthor({name: client.user.username, iconURL: client.user.displayAvatarURL() })
     .setColor('Green')
     .setDescription(`**<@${user.id}>** has been blacklisted!`)
     .setTimestamp()
     .setFooter({ text: interaction.member.user.username, iconURL: interaction.member.user.displayAvatarURL() });
interaction.channel.send({embeds: [success]})

     
        }
      }
    