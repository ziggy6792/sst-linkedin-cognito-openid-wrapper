import notes from './notes';

export async function main() {
  console.log('GITHUB_API_URL', process.env.GITHUB_API_URL);
  return {
    statusCode: 200,
    body: JSON.stringify(notes, null, '  '),
  };
}
