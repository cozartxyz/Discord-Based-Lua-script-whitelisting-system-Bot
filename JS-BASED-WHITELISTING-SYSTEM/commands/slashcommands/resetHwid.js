
const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionsBitField , EmbedBuilder , Modal, TextInputComponent, MessageActionRow, MessageButton, Permissions, AttachmentBuilder  } = require('discord.js');
const fetch = require('node-fetch-commonjs')
const { Userdb } = require('../../database/index')
const config = require('../../config.json')

module.exports =  {
	data: new SlashCommandBuilder()
		.setName('reset')     
        .setDescription('Reset hwid')
        .addSubcommand(subcommand =>
            subcommand
                .setName('hwid')
                .setDescription('Reset hwid')          
                ),
            async execute(interaction, client) {

     interaction.reply({content: `fetching in database..`, ephemeral: true})

     const findUser= await Userdb.findOne({ discordId: interaction.user.id })

     if(!findUser){
        const nowhitelist = new EmbedBuilder()
        .setAuthor({name: client.user.username, iconURL: client.user.displayAvatarURL() })
        .setColor('Red')
        .setDescription(`User Not Whitelisted!`)
        .setTimestamp()
        .setFooter({ text: interaction.member.user.username, iconURL: interaction.member.user.displayAvatarURL() });
     return interaction.channel.send({embeds: [nowhitelist], ephemeral: true})
     }

    await Userdb.findOneAndUpdate(interaction.user.id,{
        hwid: "0"
    })

     const success = new EmbedBuilder()
     .setAuthor({name: client.user.username, iconURL: client.user.displayAvatarURL() })
     .setColor('Green')
     .setDescription(`Your **hwid** has been successfully reset!`)
     .setTimestamp()
     .setFooter({ text: interaction.member.user.username, iconURL: interaction.member.user.displayAvatarURL() });
interaction.channel.send({embeds: [success]})

     
        }
      }
    