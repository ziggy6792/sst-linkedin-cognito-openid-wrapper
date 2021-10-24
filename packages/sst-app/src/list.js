import notes from "./notes";

export async function main() {
  console.log("SOMETHING!")
  return {
    statusCode: 200,
    body: JSON.stringify(notes, null, "  "),
  };
}
