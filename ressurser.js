const resources = [
    {
        category: "HTML",
        text: "HTML står for HyperText Markup Language, og er et strukturspråk som brukes for å lage strukturer til nettside- og applikasjonsgrensesnitt.",
        sources: [
            {
                title: "W3Schools",
                url: "https://www.w3schools.com/html/"
            },
            {
                title: "HTML Living standard",
                url: "https://html.spec.whatwg.org/multipage/"
            },
            {
                title: "HTML.com Tutorials",
                url: "https://html.com/"
            },
        ]
    },
    {
        category: "CSS",
        text: "CSS står for Cascading StyleSheets, og brukes for å sette stilregler på HTML-elementer.",
        sources: [
            {
                title: "W3Schools",
                url: "https://www.w3schools.com/css/"
            },
            {
                title: "W3C HTML & CSS Standards",
                url: "https://www.w3.org/standards/webdesign/htmlcss.html"
            },
            {
                title: "W3C CSS Validator",
                url: "https://jigsaw.w3.org/css-validator/"
            },
            {
                title: "CSS Tricks",
                url: "https://css-tricks.com/"
            },
        ]
    },
    {
        category: "JavaScript",
        text: "JavaScript er et scriptspråk basert på EcmaScript. JavaScript kjører direkte i nettleseren, og brukes ofte til å manipulere HTML og CSS i webgrensnesnitt.",
        sources: [
            {
                title: "W3Schools",
                url: "https://www.w3schools.com/js/"
            },
            {
                title: "MDN Web Docs",
                url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript"
            },
            {
                title: "How to read JavaScript Documentation",
                url: "https://www.youtube.com/watch?v=O3iR-CIufKM"
            },
        ]
    },
    {
        category: "React",
        text: "React er et rammeverk bygget i JavaScript. React bruker komponenter og states for å lage en levende frontend.",
        sources: [
            {
                title: "React documentation",
                url: "https://reactjs.org/docs/getting-started.html"
            },
            {
                title: "W3Schools",
                url: "https://www.w3schools.com/REACT/DEFAULT.ASP"
            },
            {
                title: "How to read JavaScript Documentation",
                url: "https://www.youtube.com/watch?v=O3iR-CIufKM"
            },
        ]
    },
    {
        category: "Sanity and headless CMS",
        text: "Sanity er et headless CMS som står for innholdsadministrasjon. Innhold hentes inn i applikasjoner via GROQ-spørringer.",
        sources: [
            {
                title: "Sanity documentation",
                url: "https://www.sanity.io/docs"
            },
            {
                title: "OnCrawl: a beginners guide to headless CMS",
                url: "https://www.oncrawl.com/technical-seo/beginners-guide-headless-cms/"
            },
            {
                title: "Section.io: Getting started with Sanity CMS",
                url: "https://www.section.io/engineering-education/getting-started-with-sanity-cms/"
            },
        ]
    },
]

function updateButtons(activeButton) {
    //Gjør om menyknappene til en array så jeg kan utnytte array-egenskaper videre.
    const btnArray = Array.from(document.getElementsByClassName("menubutton"))
    console.log(btnArray)
    btnArray.map((btn) => {
        //Hvis knappen som er trykket har samme verdi som parameteren som er sendt med skal klassen "active" legges til eller fjernes.
        if (btn.textContent === activeButton) {
            //Da det virker som the er oppdatering av siden som er problemet, la jeg til setTimeout for å prøve å løse problemet med CSS-transitioneffekten. Det løste det kun 50% da knappestyling ikke "easer" UT riktig.
            setTimeout(() => {
                btn.classList.add("active")
            }, 1)
        } else {
            btn.classList.remove("active")
        }
        btn.addEventListener("click", () => {
            //Kaller på updateUI med det tekstlige innholdet i knappen som er trykket. Dette, sammen med filtreringen i updateUI gir muligheten til å legge til flere objekter i arrayen og hente frem riktig informasjon.
            updateUI(btn.textContent)
        })
    })
}

//Funksjon for å oppdatere visning av menypunkter og hovedinnhold.
function updateUI(category) {
    //Gjør klar tomme variabler for å senere kunne lagre HTML-struktur i. 
    let menuHTML = ""
    let infoHTML = ""
    //Filtrerer arrayen resources basert på parameteren som sendes med funksjonen, dette for å kunne vise riktig innhold etter hvilken fane som er valgt.
    const filteredInfo = resources.filter(res => res.category === category)
    resources.map(item => {
        //For hver av objektene i arrayen skal riktig HTML-struktur lagres i variabelen menuHTML
        menuHTML += `<li><button class="menubutton">${item.category}</button></li>`
    })
    //Går gjennom den filtrerte arrayen
    filteredInfo.map(info => {
        //For hvert av de filtrerte objektene i arrayen, basert på parameteren som sendes med, skal det skrives ut riktig HTML-struktur til variablene infoHTML
        infoHTML = `<h2>${info.category}</h2>
        <p>${info.text}.</p>
        <ul>`
        //Går gjennom andre nivå av array.
        info.sources.map(links => {
            infoHTML +=
                `<li><a href="${links.url}">${links.title}</a></li>`
        })
        infoHTML += `</ul>`
    })
    //Skriver ut HTML-strukturen som er lagret i variabelene infoHTML og menuHTML til HTML-element med tilhørende IDer.
    document.getElementById("main").innerHTML = infoHTML
    document.getElementById("menu").innerHTML = menuHTML
    //Oppdaterer knappevisning med den samme parameteren som er sendt med til updateUI.
    updateButtons(category)
}
//Kaller på updateUI med verdien fra den første category-key som utgangspunkt for å sørge for at siden lastes med innhold fra første objektet i arrayen.
updateUI(resources[0].category)
