import React, { useState } from "react";

export default function CommentForm({ onComment }) {
  const [form, setForm] = useState({
    name: "",
    message: "",
  });
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onComment(form);
  };
  console.log(form);
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <input
          type="text"
          name="name"
          className="form-control"
          placeholder="Tên..."
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <textarea
          type="text"
          name="message"
          className="form-control"
          placeholder="Nội dung"
          onChange={handleChange}
        />
      </div>
      <div className="text-end">
        <button
          type="submit"
          name="message"
          className="btn btn-primary"
          onChange={handleChange}
        >
          Bình luận
        </button>
      </div>
    </form>
  );
}
// import React, { Component } from "react";

// export default class CommentForm extends Component {
//   constructor() {
//     super();
//     this.state = {
//       form: "",
//       formComment: {
//         name: null,
//         content: null,
//       },
//     };
//   }

//   handChange = (e) => {
//     const data = { ...this.state.form };
//     data[e.target.name] = e.target.value;
//     this.setState({ form: data });
//   };

//   handleSubmit = (e) => {
//     e.preventDefault();
//     const { name, content } = this.state.form;
//     this.setState({
//       formComment: {
//         name: name,
//         content: content,
//       },
//     });
//   };
//   render() {
//     return (
//       <form onSubmit={this.handleSubmit}>
//         <div className="mb-3">
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Tên..."
//             name="name"
//             onChange={this.handChange}
//           />
//         </div>
//         <div className="mb-3">
//           <textarea
//             type="text"
//             className="form-control"
//             placeholder="Nội dung"
//             name="content"
//             onChange={this.handChange}
//           />
//         </div>
//         <div className="text-end">
//           <button type="submit" className="btn btn-primary">
//             Bình luận
//           </button>
//         </div>
//       </form>
//     );
//   }
// }
