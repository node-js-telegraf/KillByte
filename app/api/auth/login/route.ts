import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const { email, password } = await request.json()

  // Mock authentication - replace with real database check
  if (email && password) {
    // Generate mock JWT and API key
    const mockToken = `jwt_${btoa(email)}_${Date.now()}`
    const mockKey = `kb_${Math.random().toString(36).substring(2, 15)}`

    return NextResponse.json({
      token: mockToken,
      key: mockKey,
      email: email,
    })
  }

  return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
}
