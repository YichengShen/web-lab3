// Path of JSON data
const path_json = 'assets/json/data.json'

// Parse URL parameters 
const query_string = window.location.search;
console.log(query_string);
const url_params = new URLSearchParams(query_string);

const project_id = url_params.get("project");

// Load Data
fetch(path_json)
.then(response => {
    return response.json();
})
.then(data => {
    // if URL contains project ID
    // show project page
    if (project_id) {
        const project = data.projects.filter(d=>d.id===project_id)[0]
        render_project_page(project);
        
    } else { // else, show main page
        render_index_page(data);
}
});

function render_index_page(data) {
    render_index_structure();
    render_about(data.about);
    render_publications(data.publications);
    render_projects(data.projects);
    render_news(data.news);
}

function render_index_structure() {
    document.body.innerHTML = `
        <header class="name-header text-white text-decoration-none">
            <div class="container text-center">
            <h1 class="fw-bolder animate__animated animate__heartBeat animate__delay-1s animate__slow">Yicheng Shen</h1>
            </div>
        </header>

        <nav class="sticky-top">
            <ul class="nav nav-justified nav-menu">
                <a class="nav-link href-item center-underline" href="#about">About</a>
                <a class="nav-link href-item center-underline" href="#publications">Publications</a>
                <a class="nav-link href-item center-underline" href="#projects">Projects</a>
                <a class="nav-link href-item center-underline" href="#news">News</a>
            </ul>
        </nav>

        <div class="container">
            <div class="row">
                <div class="col-10 mx-auto">

                    <section id="about" class="anchor"></section>
                    <section id="publications" class="anchor"></section>
                    <section>
                        <div class="row">
                            <div id="projects" class="col-sm-8 anchor"></div>
                            <div id="news" class="col-sm-4 anchor"></div>
                        </div>
                    </section>

                </div>
            </div>
        </div>

        <footer class="py-3 bg-dark">
            <div class="container">
                <p class="m-0 text-center text-white">Copyright &copy; Yicheng Shen 2021</p>
            </div>
        </footer>
    `
}

function render_about(data){
    const container = document.querySelector("#about");
    container.innerHTML = `
        <div class="row">
            <div class="col-sm-8">
                <header>About</header>
                <p class="fw-normal">${data.description}</p>
                <a href="${data.github}" class="fs-3 href-item" target="_blank"><i class="fab fa-github"></i></a> 
                <span class="fs-3"> | </span>
                <a href="${data.linkedin}" class="fs-3 href-item" target="_blank"><i class="fab fa-linkedin"></i></a>
                <span class="fs-3"> | </span>
                <a href="${data.twitter}" class="fs-3 href-item" target="_blank"><i class="fab fa-twitter"></i></a>
            </div>
        
            <div class="col-sm-4">
                <img src="${data.photo}" class="my-img mx-auto d-block" alt="alternatetext">
            </div>
        </div>
    `;
}

function render_publications(data) {
    const container = document.querySelector("#publications");
    // Header
    const header = document.createElement("HEADER");
    header.innerHTML = "Publications";
    container.appendChild(header);
    // Content
    for (let [i, each] of data.entries()) {
        let txt = document.createElement("div");
        txt.innerHTML = `
            <div class="row">
                <div class="col" id="pub${i}">
                    <h5 class="fw-bold">${each.title}</h5>
                    <span class="badge bg-primary bg-custom bg-${each.tags[0]}">${each.tags[0]}</span>
                    <span class="badge bg-primary bg-custom bg-${each.tags[1]}">${each.tags[1]}</span>
                    <p class="fw-light">Authors: ${each.authors}</p>
                    <p class="fw-light">Conference: ${each.conference}</p>
                </div>
            </div>
            <br>
        `;
        container.appendChild(txt);

        let column = document.querySelector("#pub"+i);
        const paper_span = document.createElement("span");
        if (each.paper_link) {
            paper_span.innerHTML = `
                <a href="${each.paper_link}" class="href-item text-decoration-none center-underline me-3" target="_blank"><i class="fas fa-file-alt"></i> Paper</a>
            `
            column.appendChild(paper_span);
        }
        const video_span = document.createElement("span");
        if (each.video_link) {
            video_span.innerHTML = `
                <a href="${each.video_link}" class="href-item text-decoration-none center-underline" target="_blank"><i class="fas fa-video"></i> Video</a>
            `
            column.appendChild(video_span);
        }
    }
}

function render_projects(data) {
    const container = document.querySelector("#projects");
    // Header
    const header = document.createElement("HEADER");
    header.innerHTML = "Projects";
    container.appendChild(header);
    // Content
    for (let [i, each] of data.entries()) {
        let txt = document.createElement("div");
        txt.innerHTML = `
            <h5 class="fw-bold">
                <a href="?project=${each.id}" class="href-item text-decoration-none center-underline">${each.title}</a>
            </h5>
            <p class="fw-lighter">${each.date}</p>
            <p class="fw-light">${each.abstract}</p>
        `;
        container.appendChild(txt);

        if (each.documents) {
            for (let [i, docu] of each.documents.entries()) {
                const docu_span = document.createElement("span");
                docu_span.innerHTML = `
                    <a href="${docu.link}" class="href-item text-decoration-none center-underline" target="_blank"><i class="fas fa-file-alt"></i> ${docu.type}</a>
                `
                txt.appendChild(docu_span)
            }
        }

        container.appendChild(document.createElement("br"))
    }
}

function render_news(data) {
    const container = document.querySelector("#news");
    // Header
    const header = document.createElement("HEADER");
    header.innerHTML = "News";
    container.appendChild(header);
    // Content
    for (let each of data) {
        let txt = document.createElement("div");
        txt.innerHTML = `
            <p class="fw-light lh-sm">${each.title}</p>
            <p class="fw-lighter lh-sm">${each.date}</p>
            <br>
        `;
        container.appendChild(txt);
    }
}

