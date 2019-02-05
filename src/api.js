export const fetchlinks = (limit, search) => {
  const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&srlimit=${limit}&srsearch=${search}&format=json&origin=*`;
  return fetch(url)
    .then(res => res.json())
    .then(data => data.query.search)
    .catch(e => console.log("err", e));
};

export const getData = data => {
  return data.map(({ title, snippet, pageid }) => ({
    title,
    snippet,
    pageid
  }));
};

export const fetchrandomlink = () => {
  const url = `https://en.wikipedia.org/w/api.php?action=query&format=json&list=random&rnlimit=1&origin=*`;
  return fetch(url)
    .then(res => res.json())
    .then(data => data.query.random[0].title)
    .catch(e => console.log("err", e));
};
