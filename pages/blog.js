import * as style from "../styles/blog.module.scss"
///Users/nakaitakashiyoshimi/Dev/Nextjsstdy/LearnNextJs/next-st/styles/index.module.css
import matter from "gray-matter"
import Link from 'next/Link'// Linkをインポート
import Image  from "next/image";
import Layout from "../components/layout";//レイアウト用コンポーネント

const Blog = (props) => {
    console.log("props");
    console.log(props);

  return(
  <Layout>
  <div className={style.wrapper}>
    <div >
      <h1>Blog!! !!</h1>
      <p>This is Enginea's Life</p>
      {props.blogs.map((blog,index)=>{

        return(
      <div key={index}>
          <div>
            <h3>{blog.frontmatter.title}</h3>
            <p>{blog.frontmatter.excerpt}</p>
            <p>{blog.frontmatter.date}</p>
            {/* このリンクが何か調べること！！！！ */}
            <Link href={`/blog/${blog.slug}`}><a>Read More</a></Link>
          </div>
          <div>
              <Image src={blog.frontmatter.image} alt="card-image" height={300} width={1000} quality={90}></Image>
          </div>
       
      </div>
        )
        })
      
      }

        </div>
      </div>
    </Layout>
  
  
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
    const orderedBlogs = blogs.sort((a,b) => {
        return b.frontmatter.id - a.frontmatter.id
    })
    return{
        props:{
            // test:testText,
            blogs:JSON.parse(JSON.stringify(orderedBlogs))
        },
    
    }
    
}