
import { http } from './http';
import { ui } from './ui';

const Selectors = (function(){
  return {
    titleInput: '#title',
    bodyInput: '#body',
    postBtn: '.post-submit',
    posts: '#posts'
  }
})();

const App = (function(Selectors){

const addEventHandlers = function() {
  // Get posts on DOM load
  document.addEventListener('DOMContentLoaded', getPosts);
  // Listen for add post
  document.querySelector('.post-submit').addEventListener('click', submitPost);
  document.querySelector(Selectors.posts).addEventListener('click', editPosts);
}

const getPosts = function () {
    http.get('http://localhost:3000/posts')
      .then(data => ui.showPosts(data))
      .catch(err => console.log(err));
}

  // Add Post
const submitPost = function () {
    const title = document.querySelector(Selectors.titleInput).value;
    const body = document.querySelector(Selectors.bodyInput).value;

    if (title === '' || body === ''){
      ui.showAlert('Invalid title/body', 'alert alert-danger');
    } else {
      
      const data = {
        title,
        body
      }

      // Create Post
      http.post('http://localhost:3000/posts', data)
      .then(data => {
        getPosts();
        ui.showAlert('Post Added', 'alert alert-success');
        ui.clearFields();
      })
      .catch(err => console.log(err));
    }

}

const editPosts = function(evt) {
  if (evt.target.parentElement.classList.contains('edit')){
    
  }
  if (evt.target.parentElement.classList.contains('delete')){
    const id = evt.target.parentElement.dataset.id;
    http.delete(`http://localhost:3000/posts/${id}`)
      .then(data => {
        getPosts();
      })
      .catch(err => console.log(err));
  }
}


  return {
    init: function() {
      addEventHandlers();
    }
  }
})(Selectors);

App.init();
