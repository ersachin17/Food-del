import { useState } from 'react'
import Exploremenu from '../../components/Exploremenu/Exploremenu'
import Header from '../../components/Header/Header'
import FoodDisplay from '../../components/fooddisplay/FoodDisplay'
import Appdownload from '../../components/Appdownload/Appdownload'
const Home = () => {
  const [category,setCategory] = useState("All");
  return (
    <div>
      <Header/>
       <Exploremenu category={category} setCategory={setCategory}/>
       <FoodDisplay  category={category}/>
       <Appdownload/>
    </div>
  )
}

export default Home
