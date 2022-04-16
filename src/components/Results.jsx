import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player';
import { useLocation } from 'react-router-dom';
import Loading from './Loading';
const Results = ({ searchTream}) => {

    const baseUrl = 'https://google-search3.p.rapidapi.com/api/v1';
    const [isloading, setIsloading] = useState(false);

    const [result, setResult] = useState([]);
    const location = useLocation();
    useEffect(() => {
        if (searchTream) {
            if (location.pathname === 'video') {
                getResult(`${location.pathname}/q=${searchTream}`);
            } else {
                getResult(`${location.pathname}/q=${searchTream}&num=30`)
            }

        }
    }, [searchTream, location.pathname]);

    const getResult = async (url) => {
        setIsloading(true);
        const res = await fetch(`${baseUrl}${url}`, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Host': 'google-search3.p.rapidapi.com',
                'X-RapidAPI-Key': '202a6329a6mshdc6d0ccd88e9856p18c79ajsn0465928f6588'
            },
        });
        const data = await res.json();
        setResult(data);
        setIsloading(false);
        console.log(data);
        console.log(location.pathname);
    }
    if (isloading) return <Loading />;
    const { results, image_results, entries: news } = result;
    switch (location.pathname) {
        case '/search':
            return (
                <div className="flex flex-wrap justify-between space-y-6 sm:px-56 " >
                    {results?.map(({ link, title }, index) => (
                        <div key={index} className="md:w-2/5 w-full">
                            <a href={link} target="_blank" rel="noreferrer">
                                <p className="text-sm">{link.length > 30 ? link.substring(0, 30) : link}</p>
                                <p className="text-lg hover:underline dark:text-blue-300 text-blue-700  ">{title}</p>
                            </a>
                        </div>
                    ))}
                </div>
            )
        case '/image':
            return (<div className="flex flex-wrap justify-center items-center">
                {result?.image_results?.map(({ image, link: { href, title } }, index) => (
                    <a href={href} target="_blank" key={index} rel="noreferrer" className="sm:p-3 p-5">
                        <img src={image?.src} alt={title} loading="lazy" />
                        <p className="sm:w-36 w-36 break-words text-sm mt-2">{title}</p>
                    </a>
                ))}
            </div>);
        case '/news':
            return (<div className="sm:px-56 flex flex-wrap justify-between items-center space-y-6">
                {console.log(news)}
                {news?.map(({ id, links, source, title }) => (
                    <div key={id} className="md:w-2/5 w-full ">
                        <a href={links?.[0].href} target="_blank" rel="noreferrer " className="hover:underline ">
                            <p className="text-lg dark:text-blue-300 text-blue-700">{title}</p>
                        </a>
                        <div className="flex gap-4">
                            <a href={source?.href} target="_blank" rel="noreferrer" className="hover:underline hover:text-blue-300"> {source?.href}</a>
                        </div>
                    </div>
                ))}
            </div>);
        case '/video':
            return (<div className="flex flex-wrap ">
                {results?.map((video, index) => (
                    <div key={index} className="p-2">
                        <ReactPlayer url={video.additional_links?.[0].href} controls width="355px" height="200px" />
                    </div>
                ))}
            </div>);
        default:
            return 'ER0OR';
    }
}

export default Results