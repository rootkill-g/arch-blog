import { useState } from "react";
import { useHistory } from 'react-router-dom';

const Create = () => {
  const [title, set_title] = useState('');
  const [body, set_body] = useState('');
  const [author, set_author] = useState('rootkill');
  const [loading, set_loading] = useState(false);
  const history = useHistory();

  const handle_submit = (e) => {
    e.preventDefault();
    const blog = { title, body, author };
    set_loading(true);

    fetch('http://localhost:8000/blogs', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blog)
    }).then(() => {
      console.log('new blog added');
      set_loading(false);
      history.push('/');
    })
  }

  return (
    <div className="create">
      <h2>Add a new blog</h2>
      <form onSubmit={handle_submit}>
        <label>Blog title : </label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => set_title(e.target.value)}
        />
        <label>Blog body : </label>
        <textarea
          required
          value={body}
          onChange={(e) => set_body(e.target.value)}
        ></textarea>
        <label>Blog author</label>
        <select
          value={author}
          onChange={(e) => set_author(e.target.value)}
        >
          <option value="rootkill">rootkill</option>
          <option value="wellick">wellick</option>
          <option value="elliot">elliot</option>
        </select>
        {!loading && <button>Post blog</button>}
        {loading && <button disabled>Posting blog . . .</button>}
      </form>
    </div>
  );
}

export default Create;
