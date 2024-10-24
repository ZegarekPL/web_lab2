document.addEventListener("DOMContentLoaded", function () {
  const example = document.getElementById("example");
  const cw1 = document.getElementById("cw1");
  const cw2 = document.getElementById("cw2");
  const cw3 = document.getElementById("cw3");
  const answer = document.getElementById("answer");
  const loadingModal = document.getElementById("loadingModal");

  function displayPosts(array) {
    let html = "<ul>";
    array.forEach((post) => {
      html += `<li><strong>${post.title}</strong><p>${post.body}</p></li>`;
    });
    html += "</ul>";
    answer.innerHTML = html;
  }

  function showLoading() {
    loadingModal.style.display = "block";
  }

  function hideLoading() {
    loadingModal.style.display = "none";
  }

  example.addEventListener("click", function () {
    showLoading();
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((array) => {
        console.log(array);
        answer.innerHTML = JSON.stringify(array);
      })
      .finally(() => hideLoading());
  });

  cw1.addEventListener("click", function () {
    answer.innerHTML = "Loading...";
    showLoading();
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((array) => {
        console.log(array);
        displayPosts(array);
      })
      .finally(() => hideLoading());
  });

  cw2.addEventListener("click", function () {
    answer.innerHTML = "Loading...";
    showLoading();
    fetch("https://jsonplaceholder.typicode.com/posts/1")
      .then((response) => response.json())
      .then((post) => {
        console.log(post);
        answer.innerHTML = `<h3 class="abc">${post.title}</h3><p>${post.body}</p>`;
      })
      .finally(() => hideLoading());
  });

  cw3.addEventListener("click", function () {
    answer.innerHTML = "Processing...";
    showLoading();
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        title: "Nowy post",
        body: "To jest treść nowego postu",
        userId: 1,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        answer.innerHTML = `Dodano nowy post o ID = ${data.id}`;
      })
      .finally(() => hideLoading());
  });
});
