import * as style from "../styles/index.module.css"
///Users/nakaitakashiyoshimi/Dev/Nextjsstdy/LearnNextJs/next-st/styles/index.module.css


const Index = (props) => {
    console.log(props);
  return(<h1>Blog!! !!</h1>)

}

export default Index;

// reactで言うコンストラクタ的なもの？
// ここでpropsの宣言ができる。
export async function getStaticProps(){
    const testText = "Next.js ポートフォリオサイト "
    const blogs = ((context)=>{
        const keys = context.keys()     
        const values = keys.map(context)

        console.log(context);
        console.log(keys);
        console.log(values);
        // console.log(keys);
    
    
    

    })(require.context('../data', true, /\.md$/))
    //(require.context('../data', true, /\.md$/))
    return{
        props:{
            test:testText
        },
    
    }
    
}