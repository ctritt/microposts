
import { http } from './http';
import { ui } from './ui';

// Get posts on DOM load
document.addEventListener('DOMContentLoaded', getPosts);
// Listen for add post
document.querySelector('.post-submit').addEventListener('click', submitPost);
document.querySelector('#posts').addEventListener('click', deletePost);
document.querySelector('#posts').addEventListener('click', enableEdit);
document.querySelector('.card-form').addEventListener('click', cancelEdit);

function getPosts() {
  http.get('http://localhost:3000/posts')
    .then(data => ui.showPosts(data))
    .catch(err => console.log(err));
}

// Add Post
function submitPost() {
  const title = document.querySelector('#title').value;
  const body = document.querySelector('#body').value;
  const id = document.querySelector('#id').value;

  const data = {
    title,
    body
  }
  
  if (title === '' || body === ''){
    ui.showAlert('Invalid title/body', 'alert alert-danger');
  } else {
    
    // Check for ID
    if (id === '') {
      // Create Post
      http.post('http://localhost:3000/posts', data)
      .then(data => {
        ui.showPostResponse(data);
        ui.showAlert('Post Added', 'alert alert-success');
        ui.clearFields();
      })
      .catch(err => console.log(err));
    } else {
      // Update the post
      http.put(`http://localhost:3000/posts/${id}`, data)
        .then(data => {
          console.log(data);
          ui.showAlert('Post updated', 'alert alert-success');
          ui.changeFormState('add');
          getPosts();
        })
        .catch(err => console.log(err));
    }
  }
}

function deletePost(evt) {
if (evt.target.parentElement.classList.contains('delete')){
  const id = evt.target.parentElement.dataset.id;
  
  http.delete(`http://localhost:3000/posts/${id}`)
    .then(() => ui.removePostById(id))
    .catch(err => console.log(err));
}
evt.preventDefault();
}

function enableEdit(evt) {
if (evt.target.parentElement.classList.contains('edit')){
  const id = evt.target.parentElement.dataset.id;
  http.get(`http://localhost:3000/posts/${id}`)
    .then(data => ui.fillForm(data))
    .catch(err => console.log(err.message));
}
evt.preventDefault();
}

function cancelEdit(evt) {
  if (evt.target.classList.contains('post-cancel')){
    ui.changeFormState('add');
  }
  evt.preventDefault();
}