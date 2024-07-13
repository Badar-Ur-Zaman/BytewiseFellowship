let posts = [
    { id: 1, title: "Post one" },
    { id: 2, title: "Post two" },
    { id: 3, title: "Post three" },
  ];

export const getPosts = (req, res, next) => {
  const limit = parseInt(req.query.limit);
  if (!isNaN(limit) && limit > 0) {
    res.status(200).json(posts.slice(0, limit));
  } else {
    res.json(posts).status(200);
  }
};

export const getPost = (req, res, next) => {
  const id = parseInt(req.params.id);

  const post = posts.find((post) => post.id === id);

  if (!post) {
    const err = new Error(`Post with id ${id} not found`);
    err.statusCode = 404;
    return next(err);
  }

  return res.status(200).json(post);
};

export const createPost = (req, res, next) => {
  const newPost = {
    id: posts.length + 1,
    title: req.body.title,
  };

  if (!newPost.title) {
    const err = new Error(`Title is missing!`);
    err.statusCode = 400;
    return next(err);
  }

  posts.push(newPost);

  res.status(201).json(posts);
};

export const updatePost = (req, res, next) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);

  if (!post) {
    const err = new Error(`Post with id ${id} not found`);
    err.statusCode = 404;
    return next(err);
  }

  post.title = req.body.title;
  return res.status(200).json({ message: `Updated Successfully!` });
};

export const delPost = (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);
  if (!post) {
    const err = new Error(`Post with id ${id} not found`);
    err.statusCode = 404;
    return next(err);
  }
  posts = posts.filter((post) => post.id !== id);
  res.status(200).json({ message: `Deleted Successfully!` });
};
