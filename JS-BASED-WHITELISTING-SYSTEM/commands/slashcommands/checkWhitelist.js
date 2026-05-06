
const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionsBitField , EmbedBuilder , Modal, TextInputComponent, MessageActionRow, MessageButton, Permissions, AttachmentBuilder  } = require('discord.js');
const fetch = require('node-fetch-commonjs')
const { Userdb } = require('../../database/index')
const config = require('../../config.json')

module.exports =  {
	data: new SlashCommandBuilder()
		.setName('check')     
        .setDescription('Check if you are whitelisted')
        .addSubcommand(subcommand =>
          subcommand
              .setName('whitelist')
              .setDescription('Check if you are whitelisted') 
              .addStringOption(option => option.setName('key').setDescription('Your whitelist key').setRequired(true))),

            async execute(interaction, client) {
                
        
              if (interaction.options.getSubcommand() === 'whitelist') {

     const key = interaction.options.getString('key')

     interaction.reply({content: `fetching in database..`, ephemeral: true})

   

fetch(`https://apihere/${key}/${interaction.user.id}`,{
  'headers': {
    'API-Key': 'my_boy',
  }
}).then(async res => {

const data = await res.json()

if(data.status === "Key-Found"){
  const wl_role = interaction.guild.roles.cache.get(config.whitelist_role)
  interaction.member.roles.add(wl_role);

  const trueKey = new EmbedBuilder()
  .setAuthor({name: client.user.username, iconURL: client.user.displayAvatarURL() })
  .setColor('Green')
  .setDescription(`You are whitelisted!`)
  .setTimestamp()
  .setFooter({ text: interaction.member.user.username, iconURL: interaction.member.user.displayAvatarURL() });
 interaction.channel.send({ embeds: [trueKey]})
} else {

  const falseKey = new EmbedBuilder()
  .setAuthor({name: client.user.username, iconURL: client.user.displayAvatarURL() })
  .setColor('Red')
  .setDescription(`Invalid Key!`)
  .setTimestamp()
  .setFooter({ text: interaction.member.user.username, iconURL: interaction.member.user.displayAvatarURL() });
 interaction.channel.send({ embeds: [falseKey]})
}

  })

  
}  
        }
      }
    