import { supabase } from "./supabase";

export async function GET(request) {
  const { data, error } = await supabase.from("test").select("*");
  if (error) {
    console.log(error);
  }
  console.log("data:", data);
  return new Response(JSON.stringify(data), { status: 200 });
}
