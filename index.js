let http = require("http");
let fs = require("fs");
let axios = require("axios");


http.createServer( (req, res)=>{
    axios.get('https://gist.githubusercontent.com/josejbocanegra/c6c2c82a091b880d0f6062b0a90cce88/raw/9ed13fd53a144528568d1187c1d34073b36101fd/categories.json'
    ).then(resp =>{
        fs.readFile("index.html", (data)=>{
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(`<head>
            <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
            <script src="index.js"></script>
        </head>`);
            resp.forEach(element => {
                let name  = element["name"];
                res.write(`<div class="card">
                <div class="card-header" id="headingOne">
                    <h5 class="mb-0">
                        <button class="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        ` + name +`
                        </button>
                    </h5>
                </div><div class="card">
            <div class="card-header" id="headingOne">
                <h5 class="mb-0">
                    <button class="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    Collapsible Group Item #1
                    </button>
                </h5>
            </div>
            <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                `);
                let products = element["products"];
                products.forEach(elem =>{
                    res.write(`<div class="card" style="width: 18rem;">
                        <img class="card-img-top" src="`+ elem["image"] +`" alt="Card image cap">
                        <div class="card-body">
                          <h5 class="card-title">`+elem["name"] +`</h5>
                          <p class="card-text">`+elem["description"] +`</p>
                          <h5>`+ elem["price"] +`</h5>
                          <a href="#" class="btn btn-primary">Add to car</a>
                        </div>
                      </div>`);
                });
                res.write(`</div>`)
            });
            res.write("</div>");
            return res.end();
        }).catch(err =>{
            console.log(err);
        });

    }).catch(err =>{
        console.log(err);
    });

    
}).listen(8080);

