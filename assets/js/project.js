function render_project_page(data) {
    render_project_header(data);
    render_navbar();
    render_content(data);
    render_footer();
}

function render_project_header(data) {
    const header_div = document.createElement("div");
    header_div.innerHTML = `
        <header class="name-header text-white text-decoration-none">
            <div class="container text-center">
                <h1>${data.title}</h1>
            </div>
        </header>
    `;
    document.body.appendChild(header_div);
}

function render_navbar() {
    const navbar = document.createElement('nav');
    navbar.className = "sticky-top mb-2";
    navbar.innerHTML = `
        <ul class="nav nav-justified nav-menu">
            <a class="nav-link href-item center-underline" href="index.html">Return to main page</a>
        </ul>
    `;
    document.body.appendChild(navbar);
}

function render_content(data) {
    const content = document.createElement('section');
    content.innerHTML = `
        <div class="container">
            <div class="row">
                <div class="col-sm-10 mx-auto" id="content-col">
                    <h5><u>Time</u></h5>
                    <p class="fw-light">${data.date}</p>
                    <h5><u>Description</u></h5>
                    <p class="fw-light">${data.details}</p>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(content);
    render_content_links(data);
    render_content_images(data);
}        

function render_content_links(data) {
    const column = document.querySelector("#content-col")
    if (data.documents) {
        for (let [i, docu] of data.documents.entries()) {
            const docu_span = document.createElement("div");
            docu_span.innerHTML = `
                <a href="${docu.link}" class="href-item text-decoration-none center-underline" target="_blank"><i class="fas fa-file-alt"></i> ${docu.type}</a>
            `
            column.appendChild(docu_span)
        }
    }
    column.appendChild(document.createElement("br"));
}

function render_content_images(data) {
    const column = document.querySelector("#content-col")
    if (data.images) {
        for (let [i, image] of data.images.entries()) {
            const image_div = document.createElement("div");
            image_div.innerHTML = `
                <h5><u>${image.img_name}<u></h5>
                <img src="${image.img}" class="img-fluid mb-4 mx-auto d-block" alt="login">
            `
            column.appendChild(image_div)
        }
    }
}

function render_footer() {
    const footer = document.createElement('footer');
    footer.className = "py-3 bg-dark";
    footer.innerHTML = `
        <div class="container">
            <p class="m-0 text-center text-white">Copyright &copy; Yicheng Shen 2021</p>
        </div>
    `;
    document.body.appendChild(footer)
}