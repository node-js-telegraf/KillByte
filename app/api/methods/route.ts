import { type NextRequest, NextResponse } from "next/server"

// In-memory storage for methods (в production используйте БД)
let methods: { method: string; api: string }[] = [
  { method: "GET", api: "http://private.botnet.my:8080/api/attack" },
  { method: "POST", api: "http://private.botnet.my:8080/api/attack" },
  { method: "UDP", api: "http://private.botnet.my:8080/api/attack" },
  { method: "SPECIAL", api: "http://private.botnet.my:8080/api/attack" },
]

export async function GET() {
  return NextResponse.json(methods)
}

export async function POST(request: NextRequest) {
  try {
    const { method, api } = await request.json()

    if (!method || !api) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 })
    }

    // Check if method already exists
    if (methods.find((m) => m.method === method)) {
      return NextResponse.json({ error: "Method already exists" }, { status: 400 })
    }

    methods.push({ method, api })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const method = url.searchParams.get("method")

    if (!method) {
      return NextResponse.json({ error: "Missing method" }, { status: 400 })
    }

    methods = methods.filter((m) => m.method !== method)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
