import React from 'react';
import Drawer from '../components/Drawer';
import Transitions from '../components/Transition'
import WButtonCustom from '../components/WButtonCustom.js'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';

export default function EmptyStatistics() {
    return (
        <><Drawer></Drawer>
            <Transitions>
                <section>
                    <div className='pantry-info'>
                        <p className="text-base text-gray-700 md:text-lg text-white">
                            Please enter desired pantry before visiting statistics page.
                        </p>
                        <div className='button-box'>
                            <WButtonCustom link="/dashboard" name="Dashboard" icon={<HomeOutlinedIcon />} />
                        </div>
                    </div>
                </section>
            </Transitions>
        </>
    );
}
