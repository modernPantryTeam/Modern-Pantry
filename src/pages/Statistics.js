import React from 'react';
import Drawer from '../components/Drawer';
import { Component } from 'react';

export default class Statistics extends Component {

    render() {
        return (
            <><Drawer />
                <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20 darkthemebg">
                    <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
                        <div>
                            <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full text-black bg-white">
                                STATS
                            </p>
                        </div>
                        <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto text-white">
                            <span className="relative inline-block">
                                <svg
                                    viewBox="0 0 52 24"
                                    fill="currentColor"
                                    className="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-blue-gray-100 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block"
                                >
                                    <defs>
                                        <pattern
                                            id="d5589eeb-3fca-4f01-ac3e-983224745704"
                                            x="0"
                                            y="0"
                                            width=".135"
                                            height=".30"
                                        >
                                            <circle cx="1" cy="1" r=".7" />
                                        </pattern>
                                    </defs>
                                    <rect
                                        fill="url(#d5589eeb-3fca-4f01-ac3e-983224745704)"
                                        width="52"
                                        height="24"
                                    />
                                </svg>
                                <span className="relative">Welcome</span>
                            </span>{' '}
                            to your statistics and summaries page
                        </h2>
                        <p className="text-base text-gray-700 md:text-lg text-white">
                            We've prepared statistics and summaries for your amazing pantry
                        </p>
                    </div>
                    <div className="relative w-full p-px mx-auto mb-4 overflow-hidden transition-shadow duration-300 border rounded lg:mb-8 lg:max-w-4xl group hover:shadow-xl">
                        <div className="absolute bottom-0 left-0 w-full h-1 duration-300 origin-left transform scale-x-0 bg-deep-purple-accent-400 group-hover:scale-x-100" />
                        <div className="absolute bottom-0 left-0 w-1 h-full duration-300 origin-bottom transform scale-y-0 bg-deep-purple-accent-400 group-hover:scale-y-100" />
                        <div className="absolute top-0 left-0 w-full h-1 duration-300 origin-right transform scale-x-0 bg-deep-purple-accent-400 group-hover:scale-x-100" />
                        <div className="absolute bottom-0 right-0 w-1 h-full duration-300 origin-top transform scale-y-0 bg-deep-purple-accent-400 group-hover:scale-y-100" />
                        <div className="relative flex flex-col items-center h-full py-10 duration-300 rounded-sm transition-color sm:items-stretch sm:flex-row darkthemebg">
                            <div className="ml-4 px-12 py-8 text-center darkthemebg">
                                <h6 className="text-4xl font-bold sm:text-5xl">
                                    82%
                                </h6>
                                <p className="text-center md:text-base">
                                    Pantry fulfilment
                                </p>
                            </div>
                            <div className="w-56 h-1 transition duration-300 transform bg-gray-300 rounded-full group-hover:bg-deep-purple-accent-400 group-hover:scale-110 sm:h-auto sm:w-1 mr-4 ml-4" />
                            <div className="px-12 py-8 text-center darkthemebg">
                                <h6 className="text-4xl font-bold text-deep-purple-accent-400 sm:text-5xl">
                                    621.4K
                                </h6>
                                <p className="text-center md:text-base">
                                    Dashboard visits
                                </p>
                            </div>
                            <div className="w-56 h-1 transition duration-300 transform bg-gray-300 rounded-full group-hover:bg-deep-purple-accent-400 group-hover:scale-110 sm:h-auto sm:w-1 mr-4 ml-4" />
                            <div className="px-12 py-8 text-center darkthemebg">
                                <h6 className="text-4xl font-bold text-deep-purple-accent-400 sm:text-5xl">
                                    106.5K
                                </h6>
                                <p className="text-center md:text-base">
                                    Amount of products stored 
                                </p>
                            </div>
                        </div>
                    </div>
                    <p className="mx-auto mb-4 text-gray-600 sm:text-center lg:max-w-2xl lg:mb-6 md:px-16 text-white">
                        Keep it going, thank you for being amazing!
                    </p>
                </div>
            </>
        );
    }
}