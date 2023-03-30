import {FaSearch} from "react-icons/fa";

const ArticleSearchButton = (props) => {
  return (
    <div className="flex flex-row justify-start items-center w-20 text-lg">
      <FaSearch className="mr-2"/>
      <h1 className="font-bold">검색</h1>
    </div>
  );
};

export default ArticleSearchButton;
