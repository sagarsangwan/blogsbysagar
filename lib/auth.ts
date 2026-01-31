import { SignJWT, jwtVerify } from "jose";

const key = new TextEncoder().encode(process.env.JWT_SECRET);
// type payload = {
//   user: string;
//   expires: string;
// };
export async function encrypt(payload: any) {
  console.log(payload);

  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("2h")
    .sign(key);
}

export async function decrypt(input: string) {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}
