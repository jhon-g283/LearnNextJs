// ヘッダーとフッターをまとめたコンポーネント
import Header from "./header";
import Footer from "./footer";

// propsをつけてインポート先で要素を挟む形で<Layout>XXXX</Layout>とすると
// XXの部分をchildrenとして渡すて使用できる
const Layout = (props) => {
    
    console.log("props Layout")
    console.log(props)

    return(
        <>
            <Header />
            <main>{props.children}</main>
            <Footer />
        </>
    )
}

export default Layout