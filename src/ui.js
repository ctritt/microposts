class UI {
  constructor(){
    this.titleInput = document.querySelector('#title');
    this.posts = document.querySelector('#posts');
    this.postBody = document.querySelector('#body');
    this.postId = document.querySelector('#id');
    this.submitBtn = document.querySelector('.post-submit');
    this.forState = 'add';
  }

  showPosts(posts) {
    let output = '';
      posts.forEach((post) => {
        output += `
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
      });
      this.posts.innerHTML = output;
  }

  showPostResponse(post) {
    let output = `
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
    this.posts.insertAdjacentHTML('beforeend', output);
  }

  removePostById(postId) {
    const posts = document.querySelectorAll('[data-id]');
    let found;
    for (let post of posts) {
      if (post.dataset.id === postId){
        found = post;
        break;
      }
    }
    if (found){
      found.parentElement.parentElement.remove();
    }
  }

  showAlert(message, className) {
    this.clearAlert();

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
        this.clearAlert();
      }, 3000); 
  }

  fillForm(data) {
    this.titleInput.value = data.title;
    this.postBody.value = data.body;
    this.postId.value = data.id;
    
    this.changeFormState('edit');
  }

  changeFormState(type) {
    if (type === 'edit') {
      this.submitBtn.textContent = 'Update Post';
      this.submitBtn.className = 'post-submit btn btn-warning btn-block';

      // Create cancel button
      const button = document.createElement('button');
      button.className = 'post-cancel btn btn-light btn-block'
      button.appendChild(document.createTextNode('Cancel Edit'));

      const cardForm = document.querySelector('.card-form');
      const formEnd = document.querySelector('.form-end');

      cardForm.insertBefore(button, formEnd);
    }
    if (type === 'add') {
      this.submitBtn.textContent = 'Post It';
      this.submitBtn.className = 'post-submit btn btn-primary btn-block';

      //Hide the cancel button
      const cancelUpdateBtn = document.querySelector('.post-cancel');
      if (cancelUpdateBtn) {
        cancelUpdateBtn.remove();
      }

      // Clear ID from hidden field
      this.clearIdInput();

      // Clear the text fields
      this.clearFields();
    }
  }

  clearIdInput() {
    this.postId.value = '';
  }

  clearFields() {
    this.titleInput.value = '';
    this.postBody.value = '';
  }

  clearAlert(){
    const currentAlert = document.querySelector('.alert');
    if (currentAlert) {
      currentAlert.remove();
    }
  }
}

export const ui = new UI();