const nameInput = document.querySelector(".name-input");
const linkInput = document.querySelector(".link-input");
const commentInput = document.querySelector(".comment-input");
const container = document.querySelector(".container-input");
const submitButton = document.querySelector(".btn-submit");
const outputList = document.querySelector(".output-list");
const navSearch = document.querySelector(".search-nav");
let bookmarkArray = [];
let modalContainer = document.querySelector(".modal-container");
let btnClose = document.querySelector(".btn-close");
// Events

submitButton.addEventListener("click",addBookmark);
outputList.addEventListener("click", removeBookmark);
submitButton.addEventListener("click",addBookmark);
outputList.addEventListener("click", removeBookmark);
document.addEventListener("DOMContentLoaded", getBookmarks);
navSearch.addEventListener("keyup", searchNav);
btnClose.addEventListener("click", () => {
    modalContainer.style.transform = "translateX(100%)";
});
function addBookmark(e) {
    e.preventDefault();
    if(nameInput.value == "" || linkInput.value == "" || commentInput.value == "") {
        modalContainer.style.transform = "translateX(0%)";
    }
    else {
        const outputDiv = document.createElement("div");
        outputDiv.classList.add("output");
        const outputTitle = document.createElement("div");
        outputTitle.classList.add("output-title");
        const title = document.createElement("h3");
        title.classList.add("title");
        title.textContent = nameInput.value;
        const removeButton = document.createElement("button");
        removeButton.classList.add("btn-remove");
        removeButton.innerHTML = `<i class="fas fa-times"></i>`;
        outputTitle.appendChild(title);
        outputTitle.appendChild(removeButton);
        const comment = document.createElement("p");
        comment.textContent = commentInput.value;
        const link = document.createElement("a");
        if(linkInput.value.includes("https://") || linkInput.value.includes("http://")){
            link.href = linkInput.value;
        }
        else {
            link.href = "https://" + linkInput.value;
        }
        link.target = "_blank";
        link.textContent = "Link";
        let bookmark = {
            link: link.href,
            title: title.textContent,
            comment: comment.textContent,
        }
        console.log(bookmark.link);
        bookmarkArray.unshift(bookmark);
        saveLocalBookmarks(bookmark);
        outputDiv.appendChild(outputTitle);
        outputDiv.appendChild(comment);
        outputDiv.appendChild(link);
        outputList.appendChild(outputDiv);
        nameInput.value = "";
        linkInput.value = "";
        commentInput.value = "";
    }
}
function removeBookmark(e) {
    const item = e.target;
    if(item.classList[0] === "btn-remove") {
        const listItem = item.parentElement;
        const listBox = listItem.parentElement;
        removeLocalTodos(listBox);
        listBox.remove();
    }
}
function saveLocalBookmarks(bookmark) {
    let bookmarks;
    if(localStorage.getItem("bookmarks") === null) {
        bookmarks = [];
    }
    else {
        bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    }
    bookmarks.push(bookmark);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}
function getBookmarks() {
    let bookmarks;
    if(localStorage.getItem("bookmarks") === null) {
        bookmarks = [];
    }
    else {
        bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    }
    bookmarks.forEach(function(bookmark) {
        const outputDiv = document.createElement("div");
        outputDiv.classList.add("output");
        const outputTitle = document.createElement("div");
        outputTitle.classList.add("output-title");
        const title = document.createElement("h3");
        title.classList.add("title");
        title.textContent = bookmark.title;
        const removeButton = document.createElement("button");
        removeButton.classList.add("btn-remove");
        removeButton.innerHTML = `<i class="fas fa-times"></i>`;
        outputTitle.appendChild(title);
        outputTitle.appendChild(removeButton);
        const comment = document.createElement("p");
        comment.textContent = bookmark.comment;
        const link = document.createElement("a");
        link.href = bookmark.link;
        link.target = "_blank";
        link.textContent = "Link";
        outputDiv.appendChild(outputTitle);
        outputDiv.appendChild(comment);
        outputDiv.appendChild(link);
        outputList.appendChild(outputDiv);
        bookmarkArray.push(bookmark);
    });
}
function removeLocalTodos(bookmark) {
    let bookmarks;
    if(localStorage.getItem("bookmarks") === null) {
        bookmarks = [];
    }
    else {
        bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    }
    const bookmarkIndex = bookmarks[0];
    bookmarks.splice(bookmarks.indexOf(bookmarkIndex), 1);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks))
}
function searchNav(e) {
    e.preventDefault();
    const searchString = e.target.value.toLowerCase();
    const filteredBookmarks = bookmarkArray.filter((bookmark) => {
        return (
            bookmark.title.toLowerCase().includes(searchString)
        );
    });
    console.log(getMatch(filteredBookmarks, bookmarkArray));
}
function getMatch(filteredBookmarks, bookmarkArray) {
    let matches = [];
    for (let i=0;i<filteredBookmarks.length;i++) {
        for (j=0;j<bookmarkArray.length;j++) {
            if(filteredBookmarks[i] === bookmarkArray[j]) {
                matches.push(filteredBookmarks[i]);
            }
        }
    }
    outputList.innerHTML = "";
    matches.forEach((match) => {
        const outputDiv = document.createElement("div");
        outputDiv.classList.add("output");
        const outputTitle = document.createElement("div");
        outputTitle.classList.add("output-title");
        const title = document.createElement("h3");
        title.classList.add("title");
        title.textContent = match.title;
        const removeButton = document.createElement("button");
        removeButton.classList.add("btn-remove");
        removeButton.innerHTML = `<i class="fas fa-times"></i>`;
        outputTitle.appendChild(title);
        outputTitle.appendChild(removeButton);
        const comment = document.createElement("p");
        comment.textContent = match.comment;
        const link = document.createElement("a");
        link.href = match.link;
        link.target = "_blank";
        link.textContent = "Link";
        outputDiv.appendChild(outputTitle);
        outputDiv.appendChild(comment);
        outputDiv.appendChild(link);
        outputList.appendChild(outputDiv);
    });
}