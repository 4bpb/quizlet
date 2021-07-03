const Discord = require('discord.js');
const client = new Discord.Client();
var fetch = require('node-fetch');
var fs = require('fs');



client.once('ready', () => {
	console.log('Ready!');
});


client.on('message', message => {
	if(message.content.startsWith(`https://quizlet.com/`)){
		let split = message.content.split('/')
		let id = split[3]
		fetch('https://api.quizlet.com/3.6/terms?filters%5BsetId%5D='+id, {
				headers: {
			'Host': 'api.quizlet.com',
			'Accept': '*/*',
			'User-Agent': 'QuizletIOS/5.18 (QuizletBuild/2; iPhone13,2; iOS 14.6; Scale/3.0)',
			'Accept-Language': 'en-us',
			'Authorization': 'Bearer Wk3GbW23K4XkfutMKyHUuCbnvG7H6RtqNMMDZsp9',
			'Cookie': ''
		}
		})
		.then(res => res.json())
		.then(json => {
			let length = json.responses[0].models.term.length - 1
			json.responses[0].models.term.forEach(element => {
				let question = element.word
				let answer = element.definition
				let combined = question + '\n The Answer is: ' + answer
				fs.appendFileSync('Quizlet_'+id+'.txt', combined + ' \n', function (err) {
					if (err) return console.log(err);
				});
				if(json.responses[0].models.term[length].id===element.id){
					message.channel.send('<@'+message.author.id+'>', {files: ['./Quizlet_'+id+'.txt']})
				}
			})
		});
	}
});



client.login('');


