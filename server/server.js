const express = require('express')
const app = express()
const port = 3000


app.get('/animelist', (req, res) => {
  res.header("Access-Control-Allow-Origin", req.get("Origin")||"*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  console.log("req query page : ", req.query.page)
  const page  = parseInt(req.query.page)
  const limit = parseInt(req.query.limit)
  var request = require('request');
  request('https://api.jikan.moe/v3/top/anime/1', function (error, response, body) {
    var json = JSON.parse(body);
    var list = json.top;
    paginatedResults(list, page, limit).then(results => {
      res.write(JSON.stringify(results))
      res.end();
    })
    
  });
})

async function paginatedResults(list, page, limit) {
  return new Promise(resolve => {
    var results = {
      top: [],
      page: page,
      size: 0,
      total: list.length
    };
    var startIndex = (page - 1) * limit;
    var endIndex   = page * limit;
    endIndex = (endIndex > list.length - 1) ? list.length : endIndex;
    for(let i = startIndex; endIndex > i; i++) {
      results.top.push(list[i]);
      results.size++;
    }
    resolve(results);
  })
}

app.listen(port, function (error) {
  if (error) {
    coonsole.log("Something went wrong", error)
  } else {
    console.log('Server is listening n port ', port)
  }
})
