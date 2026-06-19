export interface User {
  id: string
  email: string
  name: string
  createdAt: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
}

export const getAuthState = (): AuthState => {
  if (typeof window === "undefined") {
    return { user: null, isAuthenticated: false }
  }

  const userStr = localStorage.getItem("user")
  if (!userStr) {
    return { user: null, isAuthenticated: false }
  }

  try {
    const user = JSON.parse(userStr)
    return { user, isAuthenticated: true }
  } catch {
    return { user: null, isAuthenticated: false }
  }
}

export const login = (email: string, password: string): { success: boolean; user?: User; error?: string } => {
  const usersStr = localStorage.getItem("users")
  const users: Record<string, { password: string; user: User }> = usersStr ? JSON.parse(usersStr) : {}

  const userRecord = users[email]
  if (!userRecord || userRecord.password !== password) {
    return { success: false, error: "Invalid email or password" }
  }

  localStorage.setItem("user", JSON.stringify(userRecord.user))
  return { success: true, user: userRecord.user }
}

export const signup = (
  email: string,
  password: string,
  name: string,
): { success: boolean; user?: User; error?: string } => {
  const usersStr = localStorage.getItem("users")
  const users: Record<string, { password: string; user: User }> = usersStr ? JSON.parse(usersStr) : {}

  if (users[email]) {
    return { success: false, error: "Email already exists" }
  }

  const user: User = {
    id: Math.random().toString(36).substring(7),
    email,
    name,
    createdAt: new Date().toISOString(),
  }

  users[email] = { password, user }
  localStorage.setItem("users", JSON.stringify(users))
  localStorage.setItem("user", JSON.stringify(user))

  return { success: true, user }
}

export const logout = () => {
  localStorage.removeItem("user")
}
