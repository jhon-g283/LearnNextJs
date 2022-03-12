import * as style from "../styles/index.module.css"
import Link from 'next/Link'// Linkをインポート


const Index = () => {
  return(
    <>
    <h1 className={style.h1Text}>Hellow !!</h1>
    {/* Linkで囲むことで普通のhrefよりも早く遷移できる。 */}
    <Link href = "/contact"><a>Go to Contact Page</a></Link>
   
  
  </>
  
  
  )

}

export default Index;