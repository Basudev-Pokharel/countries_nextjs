export async function GET(request) {
  return new Response(`<h1>${request.key.toString()}</h1>`, { status: 200 });
}
