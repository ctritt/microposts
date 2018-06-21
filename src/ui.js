const UI = (function(){

  const Selectors = {
    post: '#posts',
    titleInput: 'titleInput',
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

  return{
    showPosts: function(posts) {
      let output = '';
      posts.forEach((post) => {
        output += postHtml(post);
        
      });
      document.querySelector(Selectors.post).innerHTML = output;
    },
    showPostResponse: function(){
      let output = postHtml(post);
      document.querySelector(Selectors.post).insertAdjacentHTML('beforeend', output);
    }
  }
})();

export const ui = UI;