
import { http } from './http';
import { ui } from './ui';

const Selectors = (function(){
  return {
    titleInput: '#title',
    bodyInput: '#body',
    postBtn: '.post-submit'
  }
})();

const App = (function(Selectors){

const addEventHandlers = function() {
  // Get posts on DOM load
  document.addEventListener('DOMContentLoaded', getPosts);
  // Listen for add post
  document.querySelector('.post-submit').addEventListener('click', submitPost);
}

function getPosts() {
  http.get('http://localhost:3000/posts')
    .then(data => ui.showPosts(data))
    .catch(err => console.log(err));
  }

  // Add Post
  function submitPost() {
    const title = document.querySelector(Selectors.titleInput).value;
    const body = document.querySelector(Selectors.bodyInput).value;
    const data = {
      title,
      body
    }

    // Create Post
    http.post('http://localhost:3000/posts', data)
      .then(data => {
        console.log(data);
        getPosts();
      })
      .catch(err => console.log(err));

}

  return {
    init: function() {
      addEventHandlers();
    }
  }
})(Selectors);

App.init();
