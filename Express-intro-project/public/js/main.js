const output = document.querySelector("#output");
const button = document.querySelector("#get-posts-btn");
const form = document.querySelector("#add-post-form");


async function showPosts() {
  try {
    const res = await fetch(`http://localhost:8000/api/posts`);
    if (!res.ok) {
      throw new Error("Failed to fetch");
    }

    const posts = await res.json();
    output.innerHTML = "";

    posts.forEach((post) => {
      const postElement = document.createElement("div");
      postElement.textContent = post.title;
      output.appendChild(postElement);
    });
  } catch (error) {
    console.log(error);
  }
}

async function addPost(e){
    e.preventDefault();
    const formData = new FormData(this);
    const title = formData.get('title');

    try {
        const res = await fetch(`http://localhost:8000/api/posts`, {
            method: 'POST',
            headers: {
                'content-type':'application/json'
            },
            body: JSON.stringify({title})
        })

        if(!res.ok){
            console.log('Error Occurred');
            const newPost = await res.json();
            const postElement = document.createElement('div');
            postElement.textContent = newPost.title;
            output.appendChild(postElement);
            showPosts();
        }
    } catch (error) {
        console.log(error);
    }
}

button.addEventListener('click', showPosts);
form.addEventListener('submit', addPost);