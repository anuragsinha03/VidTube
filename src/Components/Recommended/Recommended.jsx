import React, { useEffect, useState } from "react";
import "./Recommended.css";
import { value_converter } from "../../data";
import { Link } from "react-router-dom";

function Recommended({ categoryId }) {
	const [apiData, setApiData] = useState([]);

	const fetchData = async () => {
		const relatedVideoUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=20&regionCode=US&videoCategoryId=${categoryId}&key=${
			import.meta.env.VITE_API_KEY
		}`;
		await fetch(relatedVideoUrl)
			.then(res => res.json())
			.then(data => setApiData(data.items));
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div className='recommended'>
			{apiData.map((item, index) => {
				return (
					<Link
						to={`/video/${item.snippet.categoryId}/${item.id}`}
						key={index}
						className='side-video-list'>
						<img
							src={
								apiData
									? item.snippet.thumbnails.medium.url
									: ""
							}
							alt=''
						/>
						<div className='vid-info'>
							<h4>{item.snippet.title}</h4>
							<p>{item.snippet.channelTitle}</p>
							<p>
								{value_converter(item.statistics.viewCount)}{" "}
								Views
							</p>
						</div>
					</Link>
				);
			})}
		</div>
	);
}

export default Recommended;
