
import * as React from 'react'
import Headbar from '../components/Headbar'
import Sidebar from '../components/Sidebar'
import Offcanvas from 'react-bootstrap/Offcanvas'

function Home() {

  return (
    <>
    <Headbar></Headbar>
    <div className="justify-center flex items-center h-screen">
      <div className="flex justify-center items-center flex-col w-fullrounded text-black blurred pr-5 h-12">
        <p className="text-main">
          Modern Pantry
        </p>
        <p className="text-medium">
          Your virtual storeroom
        </p>
      </div>
      <input type="image" src="https://i.imgur.com/YtiHDru.png"></input>
    </div>
    </>
  );
}
export default Home;