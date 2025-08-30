import matter from "gray-matter";

export default async function getAllNotes() {
  const repo = "villacreses/writing";
  const branch = "main";
  const folder = "_notes"; 
  
  const apiUrl = `https://api.github.com/repos/${repo}/contents/${folder}?ref=${branch}`;
  const markdownFiles = await fetch(apiUrl)
    .then(res => res.json())
    .then(files => files.filter(file => file.name.endsWith(".md")));

  const fetched = await Promise.all(
    markdownFiles.map(async file => {
      const raw = await fetch(file.download_url).then(payload => payload.text());
      const { data: frontmatter, content } = matter(raw);
      
      return {
        slug: file.name.split('.md')[0],
        frontmatter,
        content
      };
    })
  );

  const sorted =  fetched.sort((a, b) => b.frontmatter.date - a.frontmatter.date)

  return sorted;
}

