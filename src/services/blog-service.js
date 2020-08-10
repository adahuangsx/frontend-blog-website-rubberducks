import { Login } from "../components/log-in";

class BlogService {
  constructor() {
    this.state = {
      protected: true,
      blogs: []
    };
  }

  postBlog(newBlog) {
    //title, content, userId, userName

    // By ZYC
    const requestOptions = {
      method: "POST",
      "Access-Control-Allow-Origin": "*",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newBlog)
    };
    fetch(
      "https://final-project-rubberducks.glitch.me/blog",
      requestOptions
    ).then(res => {
      console.log(newBlog);
      
      if (res.status === 201) {
        this.props.history.push("/");
        return res.json(); //HSX adds
      } else {
        const error = new Error(res.error);
        throw error;
      }
      //                 if(res.redirected == true){
      //                     // console.log(res);
      //                     // fetch(res.url, {method: 'GET'});
      //                     this.setState({protected: true});

      //                 }
    });

    // render() {
    // return this.state.protected;
    // }

    // .then(res => res.json())
    // .then(console.log);
  }
}

export default BlogService;
