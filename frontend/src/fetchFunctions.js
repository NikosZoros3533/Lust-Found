import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

//Auth functions
export async function getMe() {
  try {
    const res = await fetch("/api/auth/me");
    const data = await res.json();
    if (data.error) {
      return null;
    }
    if (!res.ok) {
      throw new Error(data.error || "Something went wrong");
    }
    console.log(data);
    return data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function login({ nickname, password }) {
  try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nickname, password }),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || "Something went wrong");
    }
  } catch (error) {
    throw new Error(error);
  }
}

export async function logout() {
  try {
    const res = await fetch("/api/auth/logout", {
      method: "POST",
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || "Something went wrong");
    }
  } catch (error) {
    throw new Error(error);
  }
}

export async function signup({ nickname, password }) {
  try {
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nickname, password }),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || "Failed to create an acount");
    }
    console.log(nickname, password);
    return { nickname, password };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

//Profile functions
export async function updateProfile(formData) {
  try {
    const res = await fetch("/api/users/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || "Something went wrong");
    }
  } catch (error) {
    throw new Error(error);
  }
}

export async function fetchCities() {
  try {
    const res = await fetch("/api/cities");
    const data = await res.json();
    if (data.error) {
      return null;
    }
    if (!res.ok) {
      throw new Error(data.error || "Something went wrong");
    }
    return data;
  } catch (error) {
    throw new Error(error);
  }
}

//Connections functions
export async function createConnection(data) {
  try {
    const res = await fetch("/api/posts/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const dataRetrived = await res.json();
    if (!res.ok) {
      throw new Error(dataRetrived.error || "Something went wrong");
    }
  } catch (error) {
    throw new Error(error);
  }
}

export async function getConnections() {
  try {
    const res = await fetch("/api/posts/all");
    const data = await res.json();
    if (data.error) {
      return null;
    }
    if (!res.ok) {
      throw new Error(data.error || "Something went wrong");
    }
    console.log(data);
    return data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getConnection({ id, signal }) {
  try {
    const res = await fetch(`/api/posts/${id}`, { signal });
    const data = await res.json();
    if (data.error) {
      return null;
    }
    if (!res.ok) {
      throw new Error(data.error || "Something went wrong");
    }
    console.log(data);
    return data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function updateConnection({ formData, id }) {
  try {
    const res = await fetch(`/api/posts/update-post/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const dataRetrived = await res.json();
    if (!res.ok) {
      throw new Error(dataRetrived.error || "Something went wrong");
    }
  } catch (error) {
    throw new Error(error);
  }
}

export async function deleteConnection({id}) {
  try {
    const res = await fetch(`/api/posts/delete-post/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    
    if (!res.ok) {
      throw new Error(data.error || "Something went wrong");
    }
  } catch (error) {
    throw new Error(error);
  }

}

export async function likeConnection(post) {
  console.log(post._id);

  try {
    const res = await fetch(`/api/posts/interest/${post._id}`, {
      method: "POST",
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || "Something went wrong");
    }
  } catch (error) {
    throw new Error(error);
  }
}

//comment Post
export async function commentOnPost({ comment, postId }) {
  console.log(postId);

  try {
    const res = await fetch(`/api/posts/comment/${postId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(comment),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || "Something went wrong");
    }
  } catch (error) {
    throw new Error(error);
  }
}

export async function updateComment({ formData, commentId,postId }) {
  try {
    const res = await fetch(`/api/posts/update-comment/${postId}/${commentId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const dataRetrived = await res.json();
    if (!res.ok) {
      throw new Error(dataRetrived.error || "Something went wrong");
    }
  } catch (error) {
    throw new Error(error);
  }
}

export async function deleteComment() {}
