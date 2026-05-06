
const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionsBitField , EmbedBuilder , Modal, TextInputComponent, MessageActionRow, MessageButton, Permissions  } = require('discord.js');
const fetch = require('node-fetch-commonjs')


module.exports =  {
	data: new SlashCommandBuilder()
		.setName('gen')     
        .setDescription('Generate whitelist key') 
        .addSubcommand(subcommand =>
            subcommand
                .setName('key')
                .setDescription('Generate whitelist key')          
                ),

            async execute(interaction, client) {       

                   

if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)){
        const noperm = new EmbedBuilder()
                .setAuthor({name: client.user.username, iconURL: client.user.displayAvatarURL() })
                .setColor('Red')
                .setDescription('You are not allowed to use this command!')
                .setTimestamp()
	            .setFooter({ text: interaction.member.user.username, iconURL: interaction.member.user.displayAvatarURL() });
     return interaction.reply({embeds: [noperm]})
                    }

                   
fetch('api key thing', {
    'headers': {
      'API-Key': 'my_boy'
    }
  }).then(async res => {
    let data = await res.json()

  
    const regularkey = new EmbedBuilder()
                .setAuthor({name: client.user.username, iconURL: client.user.displayAvatarURL() })
                .setColor('Green')
                .setDescription(`Key Generated Successfully!\n\`\`\`${data.regKey}\`\`\``)
                .setTimestamp()
	            .setFooter({ text: interaction.member.user.username, iconURL: interaction.member.user.displayAvatarURL() });
     interaction.reply({embeds: [regularkey], ephemeral: true})

   }).catch(function (error) {
    console.log(error)
    const noperm = new EmbedBuilder()
    .setAuthor({name: client.user.username, iconURL: client.user.displayAvatarURL() })
    .setColor('Red')
    .setDescription('Sorry API is offline please try again later')
    .setTimestamp()
  .setFooter({ text: interaction.member.user.username, iconURL: interaction.member.user.displayAvatarURL() });
return interaction.reply({embeds: [noperm]})
  })
                    
                
                
          }
      }
    