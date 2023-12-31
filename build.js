import albumsObject from "./albums.js"
import { mkdir, readFile, writeFile } from "node:fs/promises"

for (const genre in albumsObject) {
    const genreFolder = new URL(`./${genre}/`, import.meta.url)
    const createDir = await mkdir(genreFolder, { recursive: true });

    readFile('./template.html', { encoding: 'utf8' })
        .then((data) => data.replace("<!-- $title$ -->", `${albumsObject[genre].name}`))
        .then((data) => data.replace("<!-- $main$ -->", `<genre-albums genre="${genre}" />`))
        .then((data) => data.replace("<!-- $go-back-to$ -->", "/"))
        .then((html) => writeFile(new URL(`./${genre}/index.html`, import.meta.url), html))
        .catch((err) => console.error(err));

    for (const album in albumsObject[genre]["albums"]) {
        const albumObject = albumsObject[genre]["albums"][album];

        readFile('./template.html', { encoding: 'utf8' })
            .then((data) => data.replace("<!-- $title$ -->", `${albumObject.title}`))
            .then((data) => data.replace("<!-- $main$ -->", `<album-page album='${JSON.stringify(albumObject)}' />`))
            .then((data) => data.replace("<!-- $go-back-to$ -->", `/${genre}`))
            .then((html) => writeFile(new URL(`./${genre}/${album}.html`, import.meta.url), html))
            .catch((err) => console.error(err))
    }
}
