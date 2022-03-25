// 汎用ファイルを作成
// 汎用ファイルに関して
// 動的なルーティングにを行うときに使う。
// URLと階層の関係からパラメータを取得することができる
// 例えば
//  階層/next-st/pages/blog/[slug].js
// URL：http://localhost:3000/blog/six-blog
// パラメータがslug：six-blogになる
// 
// 
import matter from "gray-matter"
import ReactMarkdown from 'react-markdown'
import Image from "next/image"
import Layout from "../../components/layout"//レイアウト用コンポーネント
import * as style from "../../styles/SingleBlog.module.scss"

// コンポ部分
const SingleBlog =(props) => {

    console.log("props [slug].js")
    console.log(props)
    return(
        <Layout>
        <div>
        <Image src={props.frontmatter.image} alt="blog-image" height={500} width={1000} ></Image>

        </div>
        <div>
            <div>
                <h1>{props.frontmatter.title}</h1>
                <p>{props.frontmatter.date}</p>
                <ReactMarkdown children={props.markdownBody} />
            </div>
        </div>
         
        
        </Layout>
          

    )
}

export default SingleBlog

// 階層を指定してそこからパスを生成
// getStaticPathsとは？
// getStaticPropsを使用するときに一緒に使うレンダリングをするパス生成用の関数
// URL生成と登録用の関数というイメージ
// 仕様としてはパスの生成にあたってdataは以下のパスを軒並み読み込む
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


// getStaticPropsとは？
// ビルド時にgetStaticPropsのpropsから値を取得することでプリレンダリングすることができ、そのための関数
// ※プリレンダリング：事前読み込み、サイトのページ単位でHTMLを生成しておくこと
// データ取り込み用の関数というイメージ
// 引数であるpropsはURLと階層の関係から作成したものが渡される。
// URL：http://localhost:3000/blog/six-blogだと階層が/pages/blog/[slug].jsなので
// 渡されるパラメータはslug：six-blog
// なのでsそのときはix-blogのMDファイルを読もうとする。
// 
export async function getStaticProps(context){
    const { slug } =context.params
    console.log("slug");
    console.log(context);
    const data = await import(`../../data/${slug}.md`)//引数で渡されたslug:XXにちなんだファイルをインポート

    // 以降はMatterの仕様に沿ってデータ作成
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