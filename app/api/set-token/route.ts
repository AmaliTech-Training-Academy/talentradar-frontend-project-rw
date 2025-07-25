import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const GET = auth(async function (req) {
  const auth = req.auth;
  if (!auth)
    return NextResponse.json(
      { message: "Unauthorized", ok: false },
      { status: 401 }
    );
  const {
    user: { token },
  } = auth;

  if (!token)
    return NextResponse.json({ message: "Token required" }, { status: 400 });
  const cookiesStore = await cookies();

  cookiesStore.set("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    domain: `${process.env.NEXT_PUBLIC_API_DOMAIN}`,
    maxAge: 60 * 60 * 24 * 7,
  });

  return NextResponse.json(
    { message: "Cookie set successfully" },
    { status: 200 }
  );
});

export const DELETE = auth(async function (req) {
  const auth = req.auth;
  if (!auth)
    return NextResponse.json(
      { message: "Unauthorized", ok: false },
      { status: 401 }
    );
  const {
    user: { token },
  } = auth;

  if (!token)
    return NextResponse.json({ message: "Token required" }, { status: 400 });
  const cookiesStore = await cookies();

  cookiesStore.set("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    domain: `${process.env.NEXT_PUBLIC_API_DOMAIN}`,
    maxAge: 0,
  });

  return NextResponse.json(
    { message: "Cookies deleted successfully" },
    { status: 200 }
  );
});
