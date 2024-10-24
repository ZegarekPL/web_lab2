(function () {
  const example = document.getElementById('example');
  const cw1 = document.getElementById('cw1');
  const cw2 = document.getElementById('cw2');
  const cw3 = document.getElementById('cw3');
  const answer = document.getElementById('answer');

  function displayPosts(array) {
    let html = '<ul>';
    array.forEach(post => {
      html += `<li><strong>${post.title}</strong><p>${post.body}</p></li>`;
    });
    html += '</ul>';
    answer.innerHTML = html;
  }

  example.addEventListener("click", function () {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(array => {
        console.log(array)
        answer.innerHTML = JSON.stringify(array);
      })
  })

  cw1.addEventListener("click", function () {
    answer.innerHTML = 'Loading...';
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(array => {
        console.log(array);
        displayPosts(array);
      })
      .catch(err => console.error('Error fetching posts:', err));
  });

  cw2.addEventListener("click", function () {
    answer.innerHTML = 'Loading...';     fetch('https://jsonplaceholder.typicode.com/posts/1')
      .then(response => response.json())
      .then(post => {
        console.log(post);
        answer.innerHTML = `<h3>${post.title}</h3><p>${post.body}</p>`;
      })
      .catch(err => console.error('Error fetching post:', err));
  });

  cw3.addEventListener("click", function () {
    answer.innerHTML = 'Processing...';
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({
        title: 'Nowy post',
        body: 'To jest treść nowego postu',
        userId: 1
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        answer.innerHTML = `Dodano nowy post o ID = ${data.id}`; 
      })
      .catch(err => console.error('Error creating post:', err));
  });

})();
