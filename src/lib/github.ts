export async function fetchGithubProfile(username: string) {
  try {
    const res = await fetch(`https://api.github.com/users/${username}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error('Failed to fetch profile');
    return res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function fetchGithubRepos(username: string) {
  try {
    const res = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=6`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) throw new Error('Failed to fetch repos');
    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}
