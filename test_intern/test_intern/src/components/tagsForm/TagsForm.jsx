import React, { useEffect, useState } from "react";
import dataApi from "../../api/dataApi";

export default function TagsForm({ onSubmit }) {
  const [tags, setTags] = useState(null);
  useEffect(() => {
    const getTags = async () => {
      const tags = await dataApi.getTags();
      console.log(tags);
      setTags(tags);
    };
    getTags();
  }, []);
  const handleTagsChange = (e) => {
    const value = e.target.value;
    if (!onSubmit) return;
    onSubmit(value);
  };
  return (
    <div>
      {" "}
      <select id="standard-select" onChange={handleTagsChange}>
        <option value="" selected>
          All
        </option>
        {tags &&
          tags.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
      </select>
    </div>
  );
}
