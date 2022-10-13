
import * as React from 'react'
import Headbar from '../components/Headbar'
import Sidebar from '../components/Sidebar'
import Offcanvas from 'react-bootstrap/Offcanvas'  

function Home() {

  return (

<><Headbar></Headbar>
    <div className="justify-center flex items-center h-screen border">
    <div className="blurred p-8 border border-gray-primary mb-4 rounded">
        <div className="flex w-full">
        </div>
        <div className="flex flex-col w-full">
            <div className="flex justify-center items-center flex-col w-full p-3 rounded text-black">
                <p className="text-main">
                    Welcome to Modern Pantry!
                </p>
                <p className="text-medium">
                    Your place to supervise your preserves
                </p>
            </div>
        </div>
    </div>
    </div>
</>
  );
}

export default Home;