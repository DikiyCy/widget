const widgetMessage = {
    statusNoWatch: 'https://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/sign-question-icon.png',
    statusWatch: 'https://netlock.hu/wp-content/uploads/2019/02/tick.png',

    createMess({title, author, date, link, id}) {

        const itemMess = document.createElement('div');
        itemMess.classList.add('itemMess');
        const wrapp1 = document.createElement('div');
        wrapp1.classList.add('itemMess__wrapp1');
        const wrapp2 = document.createElement('div');
        wrapp2.classList.add('itemMess__wrapp2');
        const itemTitle = document.createElement('h2');
        itemTitle.classList.add('itemMess__itemTitle');
        const itemAuthor = document.createElement('span');
        itemAuthor.classList.add('itemMess__itemAuthor');
        const itemTime = document.createElement('span');
        itemTime.classList.add('itemMess__itemTime');
        const itemLink = document.createElement('a');
        itemLink.classList.add('itemMess__itemLink');
        const itemStatus = document.createElement('span');
        itemStatus.classList.add('itemMess__itemStatus');

        itemLink.setAttribute('data-link', id);
        itemStatus.setAttribute('data-status', id);

        itemTitle.textContent = title;
        itemAuthor.textContent = `Author: ${author}`;
        itemTime.textContent = date;
        itemLink.textContent = `Подробнее...`;
        itemLink.setAttribute('href', link);

        itemLink.addEventListener('click', (event) => {
            event.preventDefault();
            window.open(event.target.href, '_blank');
        });

        const iconStatus = localStorage.getItem(id) ? this.statusNoWatch : this.statusWatch;

        itemMess.append(wrapp1, wrapp2);
        wrapp1.append(itemTitle, itemAuthor, itemTime);
        wrapp2.append(itemStatus, itemLink);

        itemMess.style.cssText = `
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-between;
            aling-items: center;
            // width: calc(100% - 10px);
            border: 2px solid #2196f3;
            border-radius: 5px;
            padding: 10px 10px 10px 10px;
            margin-bottom: 15px;
            font-family: 'Roboto';
        `;

        wrapp1.style.cssText = `
            display: flex;
            flex-flow: column nowrap;
            justify-content: space-between;
            aling-items: center;
        `;

        wrapp2.style.cssText = `
            width: 120px;
            display: flex;
            flex-flow: column nowrap;
            justify-content: space-between;
            align-items: flex-end;
        `;

        itemTitle.style.cssText = `
            padding: 0;
            margin: 0 0 30px 0;
        `;

        itemAuthor.style.cssText = `
            padding: 0;
            margin: 0 0 10px;
        `;

        itemTime.style.cssText = `
            padding: 0;
            margin: 0;
            color: #bbb;
        `;

        itemLink.style.cssText = `
            padding: 0;
            margin: 0;
            text-decoration: none;
        `;

        itemStatus.style.cssText = `
            display: block;
            width: 40px;
            height: 40px;
            background: url(${iconStatus}) center center/cover no-repeat;
        `;

        return itemMess;

    },

    init() {
            // main block
        const widget = document.getElementById('widget');
        widget.style.cssText = `
            width: 100%;
            max-width: 1440px;
            display: flex;
            flex-flow: column nowrap;
            justify-content: flex-start;
            align-items: flex-start;
            padding: 15px 0 15px;
            margin: 0 auto;
        `;

            // block for download
        const download = document.createElement('div');
        download.classList.add('download');
        download.style.cssText = `
            position: fixed;
            bottom: 5px;
            right: 5px;
            width: 50px;
            height: 50px;
            border: none;
            background: url('http://a2.mzstatic.com/us/r30/Purple5/v4/6f/d6/d2/6fd6d2cc-68d1-029a-9c1b-5ab920dbd58a/icon400x400.png') center center/cover no-repeat;
            color:red;
            text-align: center;
            vertical-align: middle;
            font-weight: 700;
            line-height: 50px;
            cursor: pointer;
        `;

            // block - icon-message
        const mess = document.createElement('div');
        mess.classList.add('message');
        mess.style.cssText = `
            position: fixed;
            display: none;
            bottom: 0px;
            right: 0px;
            width: 50px;
            height: 50px;
            border: none;
            background: url('http://www.cashadvance6online.com/data/archive/img/4199756867.png') center center/cover no-repeat;
            color:red;
            text-align: center;
            vertical-align: middle;
            font-weight: 700;
            line-height: 50px;
            cursor: pointer;
        `;

            // block for items message
        const itemWrapper = document.createElement('div');
        itemWrapper.classList.add('itemWrapper');
        itemWrapper.style = `
            width: 100%;
            display: none;
        `;

            // number of messages
        let count = 0;

        let fromServerWithLove = null;

        let activeClass = false;

        // createMess();

        widget.append(itemWrapper);

        widget.append(download, mess);

            // download message
        download.addEventListener('click', () => {

        // emulate receiving data from the server
        setTimeout(() => {
                fromServerWithLove = [
                    {
                        title: 'React or Vue',
                        author: 'Patricia Neil',
                        date: '9 октября 2019 в 12:30',
                        link: 'https://habr.com/ru/company/ruvds/blog/470413/',
                        id: 10001,
                    },
                    {
                        title: 'React or Angular',
                        author: 'Dler Ari',
                        date: '25 сентября 2018',
                        link: 'https://www.freecodecamp.org/news/a-comparison-between-angular-and-react-and-their-core-languages-9de52f485a76/',
                        id: 10002,
                    },
                    {
                        title: 'JavaScript is a pain',
                        author: 'Никифоридис',
                        date: '16 июля 2019 09:45',
                        link: 'https://fishki.net/3032505-ajtishnyj-jumor-dlja-teh-kto-v-teme.html?sign=83514868151504%2C120688308045173',
                        id: 10003,
                    },
                ];
                count = fromServerWithLove.length;

                mess.style.display = 'block';
                download.style.display = 'none';
                mess.innerHTML = `<span>${count}</span>`;

                    // create a new message
                fromServerWithLove.map((item) => {

                    itemWrapper.append(this.createMess(item));
                    localStorage.setItem(item.id, false);
                });
            }, 2000);

        });

            // show all message
        mess.addEventListener('click', () => {
            itemWrapper.style.display = activeClass ? 'none' : 'block';

            activeClass = !activeClass;
        });

            // chenged status
        widget.addEventListener('click', (e) => {
            if (e.target.className === 'itemMess__itemLink') {
                const attr = e.target.getAttribute('data-link');
                localStorage.setItem(attr, true);
                const status = document.querySelector(`[data-status="${attr}"]`);
                status.style.background = `url('${this.statusWatch}') center center/cover no-repeat`;
            }
        })
    }
}
