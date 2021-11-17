const axios = require('axios');
const express = require('express')
const app = express()
flag = null
const port = 80
percent = ""
str = "<div style='display: inline-block;'><table style='border-collapse: collapse;'><tbody><tr>"
str2 = "<div style='display: inline-block;'><table style='border-collapse: collapse;'><tbody><tr>"
str3 = "<div style='display: inline-block;'><table style='border-collapse: collapse;'><tbody><tr>"
app.get('/', (req, res) => {
    res.send(str + str2 + str3+percent)
})
total = 0
act = 0

tab = []
tab2 = []
for (var i = 0; i < 102; i++) {
    tab[i] = []
    tab2[i] = []
}
fla = []
async function requrest() {
    f = null
    await axios.get('https://api-flag.fouloscopie.com/flag').then(function (response) {
        f = response.data
        console.log(f.find(a => a.author == "c8da61b3-3450-471c-b98b-648ce80cbaea"))
        console.log(f.length)
        console.log(f[0])

    })


    await axios.get("https://ygorg.github.io/plop/terres_fertiles_pixel_art.html").then((response) => {
        flag = response.data
        colonne = flag.split("<tbody>")[1].split("</tbody>")[0].split("</tr>")

        colonne = colonne.map(a => a.split("<tr>")[1])
        for (c in colonne) {
            if (colonne[c]) {
                colonne[c] = colonne[c].split("</td>")
                for (d in colonne[c]) {
                    colonne[c][d] = colonne[c][d].split(/<|>/)[2]
                }
                colonne[c].shift()
                colonne[c].pop()
            }

        }
        for (a in colonne) {
            for (b in colonne[a]) {
                str2 += '<td><div style="width: 10px;height:10px;background-color:#' + colonne[a][b].split(" ")[1] + '"</div>&nbsp;</td>'


                tab2[a][b] = ("#" + colonne[a][b].split(" ")[1].toUpperCase())

            }
            str2 += "</tr><tr>"

        }

        str2 += "</tr></tbody></table></div>"

        console.log("ok")
    })

    setInterval(async () => {
        str = "<div style='display: inline-block;'><table style='border-collapse: collapse;'><tbody><tr>"
        str3 = "<div style='display: inline-block;'><table style='border-collapse: collapse;'><tbody><tr>"
        fi = null
        await axios.get("https://api.codati.ovh/pixels/zone/?minx=242&miny=151&maxx=289&maxy=249").then((response) => {
            tab = []

            for (var i = 0; i < 102; i++) {
                tab[i] = []

            }
            flag = response.data
            fla = flag

            for (a in flag) {

                tab[flag[a].y - 151].push(flag[a].hexColor)
            }
            for (x in tab) {
                for (y in tab[x]) {
                    str += '<td><div style="width: 10px;height:10px;background-color:' + tab[x][y] + '"</div>&nbsp;</td>'
                    str3 += '<td><div style="width: 10px;height:10px;background-color:' + (tab2[x][y] == tab[x][y] ? "blue" : "red") + '"</div>&nbsp;</td>'
                    act += tab2[x][y] == tab[x][y] ? 1 : 0
                    fi = (tab2[x][y] != tab[x][y] && !fi) ? { x: y - (-242), y: x - (-151), xx: x, yy: y } : fi
                    total += 1
                }
                str += "</tr><tr>"
                str3 += "</tr><tr>"
            }
            str += "</tr></tbody></table></div>"
            str3 += "</tr></tbody></table></div>"
            console.log("ok")

            console.log(total)
            console.log(act)
            console.log(act / total)
            percent="<div style='display: inline-block;'>"+(act / total)+"</div>"

        })
       
        console.log(fi)
        console.log(tab2[fi.xx][fi.yy])
        pixel = flag.find(a => a.x == fi.x && a.y == fi.y)
        //console.log(pixel)
        truc = f.find(a => a.author == pixel.author)
        //console.log(truc)
        console.log("reload")
        await axios.put('https://api-flag.fouloscopie.com/pixel', 
        { "hexColor": tab2[fi.xx][fi.yy], "pixelId": truc.entityId }, 
        { headers: { "Content-Type": "application/json", "Authorization": "gis99pk2imr7dadeekru42jf6gywi0et" } }).then((response) => {
            console.log("ok")
        }).catch((error)=>{
            console.log(error)
        })
    }, 130000);
}
requrest()
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})