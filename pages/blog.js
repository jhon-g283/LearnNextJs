// import * as style from "../styles/index.module.css"
///Users/nakaitakashiyoshimi/Dev/Nextjsstdy/LearnNextJs/next-st/styles/index.module.css
import matter from "gray-matter"

const Blog = (props) => {
    console.log(props);
  return(
  <div>
      <h1>Blog!! !!</h1>
      {props.blogs.map((blog,index)=>
      <div key={index}>
        <h3>{blog.frontmatter.title}</h3>

      </div>
      )
      
      }
      
      </div>
  
  
  )

}

export default Blog;

// reactで言うコンストラクタ的なもの？
// ここでpropsの宣言ができる。
export async function getStaticProps(){
    const testText = "Next.js ポートフォリオサイト "
    const blogs = ((context)=>{
        const keys = context.keys()     
        const values = keys.map(context)
        const data = keys.map((key,index)=>{
            let slug = key.replace(/^.*[\\\/]/,'').slice(0,-3)
            const value = values[index]     
            // console.log("value.default");
            // var matter = require("gray-matter");
            // console.log(matter(value.default));
            const document = matter(value.default)
            // console.log(document);
            return{
                frontmatter:document.data,
                slug:slug
            }

        })
        // console.log(context);           
        // console.log(keys);
        // console.log(values);
        // console.log(keys);
        // console.log(data);
        return data
       

    })(require.context('../data', true, /\.md$/))
    //(require.context('../data', true, /\.md$/))

    // console.log(JSON.parse(JSON.stringify(blogs)));
    return{
        props:{
            // test:testText,
            blogs:blogs
        },
    
    }
    
}