
type PROPS ={
    ipAddress: string;
    location: string;
    time: string;
    isp: string;
}

export default function CellInfo({ ipAddress, location, time, isp }:PROPS){
    return(
        <div className='absolute grid lg:grid-cols-4 gap-2 p-4 left-15 md:m-auto top-50 bg-white w-[80%] shadow-2xl rounded-lg z-40'>
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
        </div>
    )
}