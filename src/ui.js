const UI = (function(){

  const Selectors = {
    post: '#posts',
    titleInput: '#title',
    postBody: '#body',
    postId: '#id',
    submitBtn: '.post-submit'
  }

  let forState = 'add';

  const postHtml = function(post) {
    const output = `
      <div class="card mb-3">
        <div class="card-body">
          <h4 class="card-title">${post.title}</h4>
          <hr>
          <p class="card-text">${post.body}</p>
          <a href="#" class="edit card-link" data-id="${post.id}">
            <i class="fa fa-pencil"></i>
          </a>
          <a href="#" class="delete card-link" data-id="${post.id}">
            <i class="fa fa-remove"></i>
          </a>
        </div>
      </div>
    `;
    return output;
  }

  const clearAlert = function() {
    const currentAlert = document.querySelector('.alert');
      if (currentAlert) {
        currentAlert.remove();
      }
  }

  return{
    showPosts: (posts) => {
      let output = '';
      posts.forEach((post) => {
        output += postHtml(post);
        
      });
      document.querySelector(Selectors.post).innerHTML = output;
    },
    showPostResponse: () => {
      let output = postHtml(post);
      document.querySelector(Selectors.post).insertAdjacentHTML('beforeend', output);
    },
    clearFields: () => {
      document.querySelector(Selectors.titleInput).value = '';
      document.querySelector(Selectors.postBody).value = '';
    },
    showAlert: (message, className) => {
      clearAlert();

      // Create div
      const div = document.createElement('div');
      // Add classes
      div.className = className;
      // Add text
      if (className === 'alert alert-success'){
        message += ' ✧*｡٩(ˊᗜˋ*)و✧*｡'
      }
      div.appendChild(document.createTextNode(`${message}`));
      // Get parent
      const container = document.querySelector('.postsContainer');
      // Get posts
      const posts = document.querySelector('#posts');
      // Insert alert div
      container.insertBefore(div, posts);

      setTimeout(() => {
        clearAlert();
      }, 3000); 
    }
  }
})();

export const ui = UI;