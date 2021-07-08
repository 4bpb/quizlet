var fetch = require('node-fetch');
const cheerio = require('cheerio');
fetch(webURL, {
    headers: {
        'Host': 'quizlet.com',
        'upgrade-insecure-requests': '1',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'sec-gpc': '1',
        'sec-fetch-site': 'none',
        'sec-fetch-mode': 'navigate',
        'sec-fetch-user': '?1',
        'sec-fetch-dest': 'document',
        'accept-language': 'en-US,en;q=0.9',
        'Cookie': ''//needed or will hit captcha
    }
})

.then(res => res.text())
.then(body => {
    const $ = cheerio.load(body) // Fetches The body of the WebURL
    let raw = $('#QuestionDetailsPageTarget').unwrap()[0].next.children[0].data // Selects the Page details and then narrows it down to the script that supplies the data

    let raw2 = raw.replace('(function(){window.Quizlet["questionDetailsPageData"] = ','') // Takes out (function(){window.Quizlet["questionDetailsPageData"] = 
    let raw3 = raw2.split('; QLoad("Quizlet.questionDetailsPageData");') // Splits the remaining string
    //These two above are used to format the string into readable json 

    let json = JSON.parse(raw3[0]) // The json

    let questionid = json.question.id // Navigating The json to the id 
    console.log(questionid)
});
