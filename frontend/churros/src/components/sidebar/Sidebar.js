// react
import React from "react";
// recoil
import { useRecoilValue, useSetRecoilState } from "recoil";
// constants
import { SIDEBAR_TAB_KEYS as keys } from "../../constants/sidebar-constants";
// global state
import { showScrapFolderListState, scrapFolderListState } from "../../store/sidebar-global-state";
// components
import LogoTab from "./LogoTab";
import UserProfileTab from "./UserProfileTab";
import MainArticleTab from "./MainArticleTab";
import LikedArticleTab from "./LikedArticleTab";
import ScrapFolderTab from "./ScrapFolderTab";
import ScrapFolderListItem from "./ScrapFolderListItem";
import LogoutButton from "./LogoutButton";

import {api} from "../../axios-instance/api"
import { useEffect } from "react";

const Sidebar = () => {
  const showScrapFolderList = useRecoilValue(showScrapFolderListState);
  const scrapFolderList = useRecoilValue(scrapFolderListState);
  const setScrapFolderList = useSetRecoilState(scrapFolderListState);

  const fetchScrapFolderList = async () => {
    try{
      const res = await api.get("/scrap");
      console.log(res.data);

      const { folder } = res.data;

      setScrapFolderList(folder.map(f => ({
        folderIdx: f.folderIdx,
        folderName: f.folderName
      })));
    }
    catch(error){
      console.log(error);
    }
  }

  // 컴포넌트가 마운트 될 때 데이터 fetch
  useEffect(() => {
    fetchScrapFolderList();
  }, []);

  return (
    <aside
      className="flex flex-col justify-start w-64 h-screen bg-stone-100"
    >
      <LogoTab key={keys.logoTab} />

      <UserProfileTab key={keys.userProfileTab} />

      <MainArticleTab key={keys.mainArticleTab} itemId={keys.mainArticleTab} />

      <LikedArticleTab
        key={keys.likedArticleTab}
        itemId={keys.likedArticleTab}
      />

      <ScrapFolderTab key={keys.scrapFolderTab} />

      <div className="flex-1 overflow-y-auto">
        {showScrapFolderList &&
          scrapFolderList?.map((item) => (
            <ScrapFolderListItem
              key={item.folderIdx}
              title={item.folderName}
              folderIdx={item.folderIdx}
            />
          ))}
      </div>
      
      <LogoutButton/>
    </aside>
  );
};

export default Sidebar;
