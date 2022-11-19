import * as React from 'react'
import Headbar from '../components/Headbar'
import Transitions from '../components/Transition'

function Home() {

  return (
    <>
      <Headbar></Headbar>
      <Transitions>
        <div className="justify-center flex items-center h-screen home md:flex-row lg:flex-row sm:flex-row fade-in">
          <div className="px-20 py-8 text-center homeborder darkthemebg">
            <div className="hometext sm:text-5xl">
              Modern Pantry
            </div>
            <p className="text-center md:text-base">
              Your virtual storeroom
            </p>
          </div>
          <img type="image" src="https://i.imgur.com/YtiHDru.png"></img>
        </div>
      </Transitions>
    </>
  );
}
export default Home;