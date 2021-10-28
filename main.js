const URL_BASE = `http://localhost:8080`;
let page = 0;
successHandler(page);
function addNewStatus() {
    let formData = new FormData($("#new-status")[0]);
    $.ajax({
        type: "POST",
        cache: false,
        contentType: false,
        processData: false,
        method: 'POST',
        enctype: "multipart/form-data",
        data: formData,
        url: URL_BASE + `/blogs`,
        success: successHandler
    });
}

function showBlog(page) {
    $.ajax({
        type: "GET",
        url: URL_BASE+ `/blogs?page=${page}`,
        success: function (data) {
            let result = data.content;
            let content = "";
            for (let i = 0; i < result.length; i++) {
                let date = new Date(result[i].blog.date).getDate() + "/"  +  (new Date(result[i].blog.date).getMonth() + 1)
                    + "/"  + new Date(result[i].blog.date).getFullYear() ;
                content += `<p>Name : <span>${result[i].blog.name}</span></p>
                <p>Date : <span>${date}</span></p>
                <p>Title : <span>${result[i].blog.title}</span></p>
                <p>Content : <span>${result[i].blog.content}</span></p>`
                for (let j = 0; j < result[i].images.length; j++) {
                    content += `<div>Image : <img width="200" height="auto" 
                         src="${URL_BASE + '/image/' + result[i].images[j].file}" alt=""></div> `
                }

            }
            content += `<button onclick="previousPage(${page}, ${data.totalPages})">Previous</button>`;
            for (let i = 0; i < data.totalPages; i++) {
                content += `<button onclick="successHandler(${i})">${i + 1}</button>`;
            }
            content += `<button onclick="nextPage(${page}, ${data.totalPages})">Next</button>`;
            $("#list").html(content);
        }
    });
}


function successHandler(page) {
    showBlog(page);
}

function previousPage(page, totalPages) {
    if (page > 0) {
        page--;
    }
    successHandler(page);
}
function nextPage(page, totalPages) {
    if (page < totalPages -1) {
        page++;
    }
    successHandler(page);
}
