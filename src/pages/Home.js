
import * as React from 'react'
import Sidebar from '../components/Sidebar'

function Home() {

  return (

<><Sidebar></Sidebar>
    <div className="container flex mx-auto items-center h-screen">
        <div className="flex w-full">
        </div>
        <div className="flex flex-col w-full">
            <div className="flex justify-center items-center flex-col w-full p-4 rounded text-black">
                <p className="text-main">
                    Welcome to Modern Pantry!
                </p>
                <p className="text-sub">
                    placeholder..
                </p>
            </div>
        </div>
    </div>
</>
  );
}

export default Home;