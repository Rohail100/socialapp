import React, { useState } from "react";

export default function AddComment({post,addcomment}) {
  const [text, setText] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!text) return;
    addcomment(text)
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
      <input style={{ cursor: 'pointer'}} type="submit" value="comment" />
    </form>
  );
}
const form = {
	margin: '0px',
  paddingLeft: '2px'
}
const input = {
	width: '100%',
	height: '20px',
	fontWeight: '300',
	fontSize: '10.5px'
}