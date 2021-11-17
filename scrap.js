const axios = require('axios');

axios.get("https://ygorg.github.io/plop/terres_fertiles_pixel_art.html").then((response) => {
    flag = response.data
    colonne = flag.split("<tbody>")[1].split("</tbody>")[0].split("</tr>")

    colonne = colonne.map(a => a.split("<tr>")[1])
    for (c in colonne) {
        if (colonne[c]){
            colonne[c] = colonne[c].split("</td>")
            for(d in colonne[c]){
                colonne[c][d]= colonne[c][d].split(/<|>/)[2]
            }
            colonne[c].shift()
            colonne[c].pop()
        }
           
    }
    
    for(a in colonne){
        for(b in colonne[a]){
            console.log(colonne[a][b])
        }
    }
})