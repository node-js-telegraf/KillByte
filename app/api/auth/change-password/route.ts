import { type NextRequest, NextResponse } from "next/server"

// Mock user storage (в production используйте настоящую БД)
const users: any[] = []

export async function POST(request: NextRequest) {
  try {
    const { username, currentPassword, newPassword } = await request.json()

    // Validate
    if (!username || !currentPassword || !newPassword) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 })
    }

    if (newPassword.length < 6 || newPassword.length > 30) {
      return NextResponse.json({ error: "Invalid password length" }, { status: 400 })
    }

    // Find user and verify current password
    const userIndex = users.findIndex((u) => u.username === username && u.password === currentPassword)

    if (userIndex === -1) {
      return NextResponse.json({ error: "Invalid current password" }, { status: 401 })
    }

    // Update password
    users[userIndex].password = newPassword

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
