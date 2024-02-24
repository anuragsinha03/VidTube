import React, { useEffect, useState } from "react";
import "./PlayVideo.css";
import like from "./../../assets/like.png";
import dislike from "./../../assets/dislike.png";
import share from "./../../assets/share.png";
import save from "./../../assets/save.png";
import { value_converter } from "../../data";
import moment from "moment";
import { useParams } from "react-router-dom";

function PlayVideo() {
	const { videoId } = useParams();

	const [apiData, setApiData] = useState(null);
	const [channelData, setChannelData] = useState(null);
	const [commentData, setCommentData] = useState([]);

	const fetchVideoData = async () => {
		//fetching videos data
		const videoDetailsUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${
			import.meta.env.VITE_API_KEY
		}`;
		await fetch(videoDetailsUrl)
			.then(res => res.json())
			.then(data => setApiData(data.items[0]));
	};

	const fetchChannelData = async () => {
		if (apiData) {
			//fetching channel data
			const channelDetailsUrl = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${
				apiData.snippet.channelId
			}&key=${import.meta.env.VITE_API_KEY}`;
			await fetch(channelDetailsUrl)
				.then(res => res.json())
				.then(data => setChannelData(data.items[0]));

			//fetching comment data
			const commentUrl = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${videoId}&key=${
				import.meta.env.VITE_API_KEY
			}`;
			await fetch(commentUrl)
				.then(res => res.json())
				.then(data => setCommentData(data.items));
		}
	};

	useEffect(() => {
		fetchVideoData();
	}, [videoId]);

	useEffect(() => {
		fetchChannelData();
	}, [apiData]);

	return (
		<div className='play-video'>
			{/* <video
				src={video1}
				controls
				autoPlay
				muted></video> */}
			<iframe
				src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
				frameBorder='0'
				allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
				allowFullScreen></iframe>
			<h3>{apiData ? apiData.snippet.title : "Title here"}</h3>
			<div className='play-video-info'>
				<p>
					{apiData
						? value_converter(apiData.statistics.viewCount)
						: 0}{" "}
					Views &bull;{" "}
					{apiData
						? moment(apiData.snippet.publishedAt).fromNow()
						: ""}
				</p>
				<div>
					<span>
						<img
							src={like}
							alt=''
						/>{" "}
						{apiData
							? value_converter(apiData.statistics.likeCount)
							: 0}
					</span>
					<span>
						<img
							src={dislike}
							alt=''
						/>
					</span>
					<span>
						<img
							src={share}
							alt=''
						/>{" "}
						Share
					</span>
					<span>
						<img
							src={save}
							alt=''
						/>{" "}
						Save
					</span>
				</div>
			</div>
			<hr />

			<div className='publisher'>
				<img
					src={
						channelData
							? channelData.snippet.thumbnails.default.url
							: ""
					}
					alt=''
				/>
				<div>
					<p>{apiData ? apiData.snippet.channelTitle : ""}</p>
					<span>
						{channelData
							? value_converter(
									channelData.statistics.subscriberCount
							  )
							: 0}{" "}
						Subscribers
					</span>
				</div>
				<button>Subscribe</button>
			</div>
			<div className='vid-description'>
				<p>
					{apiData ? apiData.snippet.description.slice(0, 250) : ""}
				</p>
				<hr />
				<h4>
					{apiData
						? value_converter(apiData.statistics.commentCount)
						: 0}{" "}
					Comments
				</h4>

				{commentData.map((item, index) => {
					return (
						<div
							key={index}
							className='comment'>
							<img
								src={
									item.snippet.topLevelComment.snippet
										.authorProfileImageUrl
								}
								alt=''
							/>
							<div>
								<h3>
									{
										item.snippet.topLevelComment.snippet
											.authorDisplayName
									}{" "}
									<span>
										{moment(
											item.snippet.topLevelComment
												.publishedAt
										).fromNow()}
									</span>
								</h3>
								<p>
									{
										item.snippet.topLevelComment.snippet
											.textDisplay
									}
								</p>
								<div className='comment-action'>
									<img
										src={like}
										alt=''
									/>
									<span>
										{value_converter(
											item.snippet.topLevelComment.snippet
												.likeCount
										)}
									</span>
									<img
										src={dislike}
										alt=''
									/>
									<span>
										{" "}
										{value_converter(
											item.snippet.topLevelComment.snippet
												.dislikeCount
										)}
									</span>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default PlayVideo;
