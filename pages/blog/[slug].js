// 汎用ファイルを作成
import matter from "gray-matter"
import ReactMarkdown from 'react-markdown'

// コンポ部分
const SingleBlog =(props) => {

    console.log("props")
    console.log(props)
    return(
            <div>
                <h1>{props.frontmatter.title}</h1>
                <p>{props.frontmatter.date}</p>
                <ReactMarkdown children={props.markdownBody} />
            </div>

    )
}

export default SingleBlog

// 階層を指定してそこからパスを生成
// getStaticPathsとは？？
export async function getStaticPaths(){

    console.log("getStaticPath");

    const blogSlugs =((context)=>{
            const keys =context.keys()
            const data = keys.map((key,index)=>{
                let slug = key.replace(/^.*[\\\/]/,'').slice(0,-3)
                return slug

            })
            return data

    })(require.context('../../data', true, /\.md$/))

    const paths = blogSlugs.map((blogSlug) => `/blog/${blogSlug}`)
    console.log("path");
    console.log(paths);
    
    return {
        paths:paths,
        fallback:false,
        }
}

// propsを取得してpropsにセットする
// getStaticPropsとは？
export async function getStaticProps(context){
    const { slug } =context.params
    console.log("slug");
    console.log(context);
    const data = await import(`../../data/${slug}.md`)
    const singleDocument = matter(data.default)

    console.log("singleDocument");
    console.log(singleDocument); 
    

    return {
        props:{
            frontmatter:singleDocument.data,
            markdownBody:singleDocument.content

        }
    }



}