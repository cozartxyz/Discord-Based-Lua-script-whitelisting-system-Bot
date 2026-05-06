module.exports = {
	name: 'ready',
	once: true, 
	async execute(client) {
		console.log(`Successfully logged in to ${client.user.tag}`.green);

		client.user.setPresence({
			activities: [{ name: `Whitelist Bot!`}],
			status: 'dnd',
		  });

	}
};