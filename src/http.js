class EasyHTTP {
  
  // GET HTTP Request
  async get(url) {
    const request = await fetch(url);
    const response = await request;
    if (response.status === 200) {
      return response.json();
    } else {
      return Promise.reject(response.status);
    }
  }

  async post(url, data) {
    const req = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type':'application/json'
      },
      body: JSON.stringify(data)
    });

    const response = await req;
    if (response.status === 201) {
      return response.json();
    } else {
      return Promise.reject(response.status)
    }
  }

  async put(url, data) {
    const req = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-type':'application/json'
      },
      body: JSON.stringify(data)
    });

    const response = await req;
    if (response.status === 200) {
      return response.json();
    } else {
      return Promise.reject(response.status);
    }
  }

  async delete(url) {
    const req = await fetch(url, {
      method: 'DELETE'
    });
    const response = await req;
    if (response.status === 200) {
      return 'Item deleted successfully';
    } else {
      return Promise.reject(response.status);
    }
  }

 }

 export const http = new EasyHTTP();