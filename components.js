import albumsObject from "./albums.js";

// <genre-list />
class genreList extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {

        const shadow = this.attachShadow({ mode: "open" });
        const genreList = document.createElement("ul");
        for (const genre in albumsObject) {
            const genreListElement = document.createElement("li");
            const link = document.createElement("a");
            link.href = `/${genre}`
            const h1 = document.createElement("h1");
            h1.textContent = genre;
            link.appendChild(h1);
            genreListElement.appendChild(link);
            genreList.appendChild(genreListElement);
        }

        const style = document.createElement("style");
        style.textContent = `
            ul {
                list-style: none;
                display: flex;
                gap: 1rem;
            margin: 0;
padding: 0;
            }

            li > a {
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                transition: .1s;
                color: inherit;
                text-decoration: none;
            }

            li {
                width: 250px;
                height: 250px;
            }

            li > a:hover {
                background-color: rgba(0, 0, 0, 0.1);
            }
        `

        shadow.appendChild(genreList);
        shadow.appendChild(style);
    }
}
customElements.define('genre-list', genreList);

// <genre-albums genre="genre" />
class genreAlbums extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: "open" });
        const albums = albumsObject[this.getAttribute("genre")]["albums"];
        const albumList = document.createElement("ul");
        for (const album in albums) {
            const albumListElement = document.createElement("li");

            const albumLink = document.createElement("a");
            albumLink.href = `/${this.getAttribute("genre")}/${album}`;

            const albumCover = document.createElement("img");
            albumCover.src = albums[album].coverImg;

            const albumInfo = document.createElement("div");
            albumInfo.classList.add("album-info");

            const albumTitle = document.createElement("h2");
            albumTitle.textContent = albums[album].title;
            albumTitle.classList.add("album-title");

            const artist = document.createElement("span");
            artist.textContent = albums[album].artist;

            albumList.appendChild(albumListElement);
            albumListElement.appendChild(albumLink);
            albumLink.appendChild(albumCover);
            albumLink.appendChild(albumInfo);
            albumInfo.appendChild(albumTitle);
            albumInfo.appendChild(artist);
        }

        const style = document.createElement("style");
        style.textContent = `
            img {
                width: 250px;
            }

            ul {
                list-style: none;
                display: flex;
                gap: 1rem;
                margin: 0;
                padding: 0;
            }

            li {
                transition: .1s;
            }

            li:hover {
                background-color: rgba(0, 0, 0, 0.1);
            }

            a {
                display: flex;
                flex-direction: column;
                color: black;
                text-decoration: none;
            }

            .album-info {
                padding: .5em;
            }

            .album-info > h2 {
                padding: 0;
                margin: 0;
            }

            .album-info > span {
                color: #999999;
            }
        `;
        shadow.appendChild(albumList);
        shadow.appendChild(style);
    }
}
customElements.define('genre-albums', genreAlbums);

class albumPage extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const album = JSON.parse(this.getAttribute("album"));
        const shadow = this.attachShadow({ mode: "open" });

        const wrapper = document.createElement("div");
        wrapper.classList.add("wrapper");

        const cover = document.createElement("img");
        cover.src = album.coverImg;
        cover.alt = album.title;

        const infos = document.createElement("ul");

        const title = document.createElement("li");
        title.innerHTML = `<h1>${album.title}</h1>`;


        const artist = document.createElement("li");
        artist.textContent = album.artist;

        const releaseDate = document.createElement("li");
        releaseDate.textContent = album.releaseDate;

        const style = document.createElement("style");
        style.textContent = `
            .wrapper {
                display: flex;
                gap: 1em;
            }

            ul {
                list-style: none;
                margin: 0;
                padding: 0;
            }

            img {
                width: 500px;
            }
        `

        shadow.appendChild(wrapper);
        wrapper.appendChild(cover);
        wrapper.appendChild(infos);
        infos.appendChild(title);
        infos.appendChild(artist);
        infos.appendChild(releaseDate);
        shadow.appendChild(style);
    }
}
customElements.define("album-page", albumPage);

class goBackTo extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: "open" });
        const wrapper = document.createElement("a");
        wrapper.classList.add("wrapper");
        wrapper.innerHTML = "<h1><<h1/>"

        const destination = this.getAttribute("destination");
        wrapper.href = destination;

        const style = document.createElement("style");
        style.textContent = `
            .wrapper {
                box-sizing: border-box;
                width: 100px;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                color: black;
                text-decoration: none;
                position: fixed;
                left: 0;
            }

            .wrapper:hover {
                background-color: rgba(0, 0, 0, 0.1);
                transition: .1s;
            }
`
        shadow.appendChild(style);
        shadow.appendChild(wrapper);
    }
}
customElements.define("go-back-to", goBackTo);
