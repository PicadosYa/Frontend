
import React from 'react';

const ReservationModal = ({show, onClose, children}) => {
    if (!show) return null;

    return (
        <>
            <div
                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
                <div className="bg-gradient-to-b from-[#1a39d2] to-[#0d1d6c] rounded-[25px] shadow border border-black/20">

                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div
                        className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-transparent outline-none focus:outline-none">
                        {/*header*/}
                        <div
                            className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                            <img className="w-52 h-[56.80px]" src="/logo-picados-ya.png" />
                            <button
                                className="text-white"
                                onClick={() => onClose()}
                            >
                                X
                            </button>
                        </div>
                        {/*body*/}
                        <div className="relative p-6 flex-auto">

                            <div className="container mx-auto p-4">
                                <form className="grid grid-cols-2 gap-4">
                                    <div className="col-span-1">
                                        <label htmlFor="firstName" className="block text-sm font-medium text-white">First Name</label>
                                        <input type="text" id="firstName" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                    </div>
                                    <div className="col-span-1">
                                        <label htmlFor="lastName" className="block text-sm font-medium text-white">Last Name</label>
                                        <input type="text" id="lastName" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                    </div>
                                    <div className="col-span-1">
                                        <label htmlFor="email" className="block text-sm font-medium text-white">Email</label>
                                        <input type="email" id="email" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                    </div>
                                   <div className="col-span-1 flex">
                                        <div className="w-1/4 mr-2">
                                            <label htmlFor="countryCode" className="block text-sm font-medium text-white">Code</label>
                                            <input type="text" id="countryCode" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                        </div>
                                        <div className="w-3/4">
                                            <label htmlFor="phone" className="block text-sm font-medium text-white">Phone</label>
                                            <input type="tel" id="phone" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                        </div>
                                    </div>
                                   <div className="col-span-1">
                                       <label htmlFor="date" className="block text-sm font-medium text-white">Date</label>
                                       <input type="date" id="date" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                   </div>
                                   <div className="col-span-1 flex">
                                        <div className="w-1/2 mr-2">
                                            <label htmlFor="startHour" className="block text-sm font-medium text-white">Start Hour</label>
                                            <input type="time" id="startHour" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" step="3600" />
                                        </div>
                                        <div className="w-1/2">
                                            <label htmlFor="endHour" className="block text-sm font-medium text-white">End Hour</label>
                                            <input type="time" id="endHour" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" step="3600" />
                                        </div>
                                    </div>

                                </form>
                            </div>

                        </div>
                        {/*footer*/}
                        <div
                            className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">

                            <button
                                type="button"
                                onClick={() => onClose()}
                            >
                                <div className="w-[331px] h-[65px] relative bg-gradient-to-r from-[#ed3c16] via-[#ff491c] to-[#ff6341] rounded-[25px] shadow border-2 border-white/0">
                                    <img className="w-[19px] h-[37px] left-[30px] top-[14px] absolute rounded-[60px] shadow" src="/rayo-picados-ya.png" />
                                    <div className="w-72 h-[65px] p-[15px] left-[25px] top-0 absolute bg-white/0 rounded-[10px] justify-center items-center gap-[15px] inline-flex">

                                        <div className="w-[234px] h-[35px] text-white text-2xl font-bold font-['Exo']">Confirmar y pagar</div>

                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>

                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    )
        ;
};

export default ReservationModal;