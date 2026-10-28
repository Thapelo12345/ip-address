import { Oval } from 'react-loader-spinner';
{/* <Oval color="#4fa94d" height={80} width={80} /> */}

type PROPS ={
    isLoading: boolean;
    ipAddress: string;
    location: string;
    time: string;
    isp: string;
}

export default function CellInfo({ isLoading, ipAddress, location, time, isp }:PROPS){
    return(
        <div className='absolute grid lg:grid-cols-4 gap-2 p-4 inset-x-0 mx-auto top-50 bg-white w-[80%] shadow-2xl rounded-lg z-40'>
            
            {isLoading ?(
            <div className="col-span-full flex flex-row justify-center items-center ">
            <h5 className='text-gray-500 text-lg mx-8'>Loading!...</h5>
            <Oval color="gray" height={60} width={60} />
            </div>
            ) 
            
            :(<>
            <div className="border-black/30 px-4 mx-2 ">
            <label>IP ADDRESS</label>
            <h3>{ipAddress}</h3>
            </div>

            <div className="lg:border-l lg:border-black/30 mx-2 px-4">
            <label>LOCATION</label>
            <h3>{location}</h3>
            </div>

            <div className="lg:border-l lg:border-black/30 mx-2 px-4">
            <label>TIMEZONE</label>
            <h3>UTC{time}</h3>
            </div>

            <div className="lg:border-l lg:border-black/30 mx-2 px-4">
            <label>ISP</label>
            <h3>{isp}</h3>
            </div>
            </>)}
        </div>
    )
}