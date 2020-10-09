class PhotoGallery {
    constructor() {
        this.galleryDIv = document.querySelector('.gallery');
        this.selectedDiv = document.querySelector('.selectedImg');
        this.logo = document.querySelector('.logo')
        this.pageIndex = 1;
        this.eventHandle();
    }
    expandedImg(url, id) {
        const child = document.getElementById('addedImg');
        if (child !== null) {
            child.parentNode.removeChild(child);
        }
        const item = document.createElement('div');
        item.setAttribute('id', 'addedImg');
        document.getElementById('addedImg');
        item.innerHTML = `
          <img src=${url} class="newImg" alt="clickedImg" />
        `;
        this.selectedDiv.appendChild(item)
    }
    async eventHandle() {
        await document.addEventListener('DOMContentLoaded', async () => {
            await this.getImg(1);
        });
    }
    async getImg(pageIndex) {
        const baseURL = `https://picsum.photos/v2/list?page=${pageIndex}`;
        const data = await this.fetchImages(baseURL);
        this.GenerateHTML(data)
    }
    async fetchImages(baseURL) {
        const response = await fetch(baseURL, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            }
        });
        const data = await response.json();
        return data;
    }
    GenerateHTML(photos) {
        let firstIndex = 0
        let lastIndex = 4
        const maxLength = photos.length
        photos.slice(firstIndex, lastIndex).forEach((photo, mainIndex) => {
            const item = document.createElement('div');
            item.classList.add('item');
            item.innerHTML = `
          <img src="${photo.download_url}" id=${mainIndex} alt="displayedImg" />
          <h3>${photo.author}</h3>
        `;
            this.galleryDIv.appendChild(item)
            document.querySelectorAll("img").forEach((pic, subIndex) => {
                pic.addEventListener('load', (event) => {
                    subIndex === 0 && this.expandedImg(event.target.src)
                })
                item.addEventListener('click', event => {
                    document.getElementById(parseInt(mainIndex) === parseInt(subIndex) && subIndex).style.opacity = "0.2"
                    parseInt(mainIndex) === parseInt(subIndex) && this.expandedImg(event.target.src, event.target.id)
                })
            });
            document.getElementById('next').addEventListener('click', (event) => {
                lastIndex = 5
                this.expandedImg(photos[10].download_url)
                console.log('clicked Next')
            })
        })
    }
}

const gallery = new PhotoGallery;