import { useEffect, useState } from "react";

export default function SeatingGrid(props){
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const fetchData = async () => {
        setLoading(true);
        try{
            const response = await fetch("http://localhost:3001/", {
            
            });
            if(!response.ok){
                throw new Error ("API probably not up");
            }
            const result = await response.json();
            console.log(result);
            setData(result);
        }catch(error){
            console.error("Fetch error:", error);

        }finally{
            setLoading(false);
        }
    };
    useEffect(() =>{
        fetchData();

        const intervalId = setInterval(() =>{
            fetchData();
        }, 1500);
        return () => clearInterval(intervalId);
    }, []);

    // if(loading && !data) return <p>Loading...</p>
    return(
        <div className="userGridContainer">
        <div className="userGrid">
        
        {data && Array.isArray(data) && data.map(item => (
            <div className="userObject">
                <p key={item.displayName} className="userName">{item.displayName}</p>

                <img className={"userPfp" + " bouncing" + item.bouncing} src={item.pfp} />
                <div class={"animation-wrapper " + (item.type == "holding"? item.holding : "") + " " + (Date.now() % 1500 > 750? "left" : "right")}>
                    <i className={"holding " + (item.type == "holding"? item.holding : "")}></i>
                </div>
            </div>
      ))}
      </div>
      </div>

    )
}