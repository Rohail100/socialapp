import React, { useState } from "react";
import { useDispatch } from "react-redux";
import post from "../../api/post"

export default function AddPost() {
  const [text, setText] = useState("");
  const dispatch = useDispatch()

  const handleSubmit = e => {
    e.preventDefault();
    if (!text) return;
    post.post(dispatch,text)
    setText("");
  };

  return (
    <form style={form} onSubmit={handleSubmit}>
      <textarea
        type="text"
        style={input}
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <br/>
      <input style={{ cursor: 'pointer'}} type="submit" value="post" />
    </form>
  );
}
const form = {
	margin: '5px 0px'
}
const input = {
	width: '100%',
	height: '65px',
	fontWeight: '300',
	fontSize: '14px'
}