let clients = [];
let stats = [];

export default async ({ request, response }) => {
	response.set({
		'Cache-Control': 'no-cache',
		'Content-Type': 'text/event-stream',
		Connection: 'keep-alive',
	});
	response.flushHeaders();

	const data = `data: ${JSON.stringify(stats)}\n\n`;

	response.write(data);

	const clientId = Date.now();

	const newClient = {
		id: clientId,
		response,
	};

	clients.push(newClient);

	//console.log(`${clientId} Connection opened`);

	request.on('close', () => {
		//console.log(`${clientId} Connection closed`);
		clients = clients.filter((client) => client.id !== clientId);
	});
};

export const post = async ({ request, response }) => {
	const newStat = request.body;
	stats.push(newStat);
	response.json(newStat);
	return sendEventsToAll(newStat);
};

function sendEventsToAll(newStat) {
	clients.forEach((client) => client.response.write(`data: ${JSON.stringify(newStat)}\n\n`));
}
