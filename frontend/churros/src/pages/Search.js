import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Article from "../components/article/Article";
import { api, test } from "../axios-instance/api";

const SearchPage = () => {
  const location = useLocation();
  const searchData = location.state;
  const [searchList, setSearchList] = useState([]);

  // 시작과 함께 axios 통신으로 리스트 받아옴
  const fetchData = async () => {
    try {
      const response = await test.post(`/news/search`, {params:{text:searchData, page:1,size:10}});
      const { result, article } = response.data;
      console.log(`loading sample search reault ${searchData}: ${result}`);
      setSearchList({ ...article });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <div className="text-2xl flex item-center">
        <p className="font-bold mx-4">{searchData}</p> 에 대한 검색 결과 입니다
      </div>
      <div className="grid grid-cols-2 gap-4 p-5">
        {/* 검색결과 */}
        {searchList.slice(1).map((article, idx) => (
          <div key={idx} className="col-span-1 relative">
            <Article shape="2" articleIdx={article.idx}/>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;