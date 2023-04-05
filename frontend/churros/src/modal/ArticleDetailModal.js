import ReactDOM from "react-dom";
import { Fragment } from "react";
import { api } from "../axios-instance/api";
import { IoClose } from "react-icons/io5";
import { useState, useEffect } from "react";

const ArticleDetailBackdrop = ({ hideDetail }) => {
  return (
    <div
      className="fixed top-0 left-0 w-full h-screen z-20"
      onClick={hideDetail}
    ></div>
  );
};

const ArticleDetailContent = ({ url, hideDetail, articleIdx }) => {
  const [htmlObject, setHtmlObject] = useState();

  const regex = /(?<=article\/)(.*?)(?=\?)/;
  const articleLocation = url.match(regex);

  console.log(articleLocation);
  useEffect(() => {
    fetchData(articleLocation[0]);
  }, []);
  const fetchData = async (url) => {
    try {
      const response = await api.get(`/news/call`, {
        params: {
          url: url,
        },
      });

      const htmlContent = response.data["html"];
      console.log(htmlContent);
      setHtmlObject(
        <div
          dangerouslySetInnerHTML={{
            __html: htmlContent.replace(/data-src=/g, "src="),
          }}
        />
      );
      fetchReadData();
    } catch (error) {
      console.log(error);
    }
  };
  const fetchReadData = async () => {
    try {
      const response = await api.put(`/news/read`, { articleId: articleIdx });
      const {result} = response.data;
      console.log(`Reading status updated ${result}`)
    } catch (error) {
      console.log(error);
    }
  };
  const modalHolderStyle = {
    position: "fixed",
    top: "10%",
    left: "10%",
    width: "80%",
    height: "90%",
    zIndex: 100,
    overflow: "hidden",
  };
  return (
    <>
      {htmlObject ? (
        <div style={modalHolderStyle}>
          <div className="flex flex-row justify-between bg-white">
            <span>상세 기사 내용</span>
            <div
              className="p-1 text-gray-500 rounded-lg hover:bg-red-500 transition duration-300 hover:text-white transition duration-300"
              onClick={hideDetail}
            >
              <IoClose size={30} />
            </div>
          </div>
          <div className="flex flex-col w-full h-full justify-start bg-white">
            <section className="overflow-y-auto">{htmlObject}</section>
          </div>
        </div>
      ) : (
        <div>Loading</div>
      )}
    </>
  );
};

const ArticleDetailModal = ({ url, hideDetail, articleIdx }) => {
  console.log(url);
  console.log(typeof url);
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <ArticleDetailBackdrop hideDetail={hideDetail} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ArticleDetailContent
          url={url}
          hideDetail={hideDetail}
          articleIdx={articleIdx}
        />,
        document.getElementById("overlay-root")
      )}
    </Fragment>
  );
};

export default ArticleDetailModal;
