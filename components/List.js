export default function List({
    dataLoading,
    data = [],
}) {
    return (
        <>
            <div>
                {data.map((item, index) => (
                    <div key={index} className="video-responsive">
                        <iframe
                            width="560"
                            height="315"
                            src={item}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; 
                        clipboard-write; encrypted-media; 
                        gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                ))}
            </div>
        </>
    )
}