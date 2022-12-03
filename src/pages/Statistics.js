import React from 'react';
import Drawer from '../components/Drawer';
import { Component } from 'react';
import Transitions from '../components/Transition'

export default class Statistics extends Component {

    render() {
        return (
            <><Drawer />
                <Transitions>
                    <div className="px-4 pb-2 pt-4 lg:mx-auto md:mx-auto ml-14 sm:max-w-xl lg:max-w-screen-xl md:px-24 lg:px-8 darkthemebg">
                        <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
                            <div>
                                <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full text-black bg-white">
                                    STATISTICS
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

                        <div className="max-w-xl md:mx-auto sm:text-center lg:max-w-2xl md:mb-1">
                            <div>
                                <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full text-black bg-white">
                                    SUMMARY
                                </p>
                            </div>
                        </div>

                        <div class="grid lg:grid-cols-3 md:grid-cols-2 gap-6 relative w-full p-px mx-auto mb-4 overflow-hidden transition-shadow duration-300 border rounded lg:mb-8 group hover:shadow-xl">
                            <div class="flex items-center p-4 darkthemebg rounded">
                                <div class="flex flex-shrink-0 items-center justify-center bg-green-200 h-16 w-16 rounded">
                                    <svg class="w-6 h-6 fill-current text-green-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                                    </svg>
                                </div>
                                <div class="flex-grow flex flex-col ml-4 darkthemebg">
                                    <span class="text-xl font-bold">21.2K</span>
                                    <div class="flex items-center justify-between">
                                        <span class="text-gray-500">Visits last 30 days</span>
                                        <span class="text-green-500 text-sm font-semibold ml-2">+12.6%</span>
                                    </div>
                                </div>
                            </div>

                            <div class="flex items-center p-4 darkthemebg rounded">
                                <div class="flex flex-shrink-0 items-center justify-center bg-red-200 h-16 w-16 rounded">
                                    <svg class="w-6 h-6 fill-current text-red-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                                    </svg>
                                </div>
                                <div class="flex-grow flex flex-col ml-4 darkthemebg">
                                    <span class="text-xl font-bold">1.5K</span>
                                    <div class="flex items-center justify-between">
                                        <span class="text-gray-500">Food added last 30 days</span>
                                        <span class="text-red-500 text-sm font-semibold ml-2">-8.1%</span>
                                    </div>
                                </div>
                            </div>

                            <div class="flex items-center p-4 darkthemebg rounded">
                                <div class="flex flex-shrink-0 items-center justify-center bg-green-200 h-16 w-16 rounded">
                                    <svg class="w-6 h-6 fill-current text-green-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                                    </svg>
                                </div>
                                <div class="flex-grow flex flex-col ml-4">
                                    <span class="text-xl font-bold darkthemebg">11.5K</span>
                                    <div class="flex items-center justify-between darkthemebg">
                                        <span class="text-gray-500">Placeholder last 30 days</span>
                                        <span class="text-green-500 text-sm font-semibold ml-2">+28.4%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className="mx-auto mb-4 text-gray-600 sm:text-center lg:max-w-2xl lg:mb-6 md:px-16 text-white">
                            Keep it going, thank you for being amazing!
                        </p>
                    </div>
                </Transitions>
            </>
        );
    }
}
