import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

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

export async function updateProfile() {}

export async function getConnections() {}
export async function getConnection() {}
export async function updateConnection() {}
