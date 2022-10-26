import * as React from 'react'
import Sidebar from '../components/Sidebar'
import Drawer from '../components/Drawer'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

function Dashboard() {

  return (
    <>
      <Drawer></Drawer>
      <div class="container">
        <div class="pantry-wrapper pt-5">
          <div class="pantry-search blurred1 pantry-item">
            <p className="text-main font-bold">
              Your Pantries
            </p>
            <p className="text-medium-medium font-bold">
              Even just a few spices or ethnic condiments that you can keep in your pantry can turn your mundane dishes into a culinary masterpiece.
              <i>-  Marcus Samuelsson</i>
            </p>
          </div>

          <div class="pantry-result">
            <div id="pantry">

              <div class="pantry-item">
                <div class="pantry-img pt-5">
                  <input type="image" src="https://i.imgur.com/LeAXVOG.png"></input>
                </div>
                <div class="pantry-name">
                  <p className="text-medium font-bold">
                    Beach House
                  </p>
                  <a href="#" class="pantry-btn">Enter</a>
                </div>
              </div>
              <div class="pantry-item">
                <div class="pantry-img pt-5">
                  <input type="image" src="https://i.imgur.com/KLjt9bt.png"></input>
                </div>
                <div class="pantry-name">
                  <p className="text-medium font-bold">
                    Downtown
                  </p>
                  <a href="#" class="pantry-btn">Enter</a>
                </div>
              </div>
              <div class="pantry-item">
                <div class="pantry-img pt-5">
                  <input type="image" src="https://i.imgur.com/LeAXVOG.png"></input>
                </div>
                <div class="pantry-name">
                  <p className="text-medium font-bold">
                    Madrit
                  </p>
                  <a href="#" class="pantry-btn">Enter</a>
                </div>
              </div>
            </div>
          </div>



        </div>
      </div>
    </>
  );
}
export default Dashboard;
