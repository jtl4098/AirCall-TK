

import React, { useEffect , useState } from "react";
import './Tabs.css';

import Feed from "../TabFolder/Feed.jsx";
import Archive from "../TabFolder/Archive.jsx";

import axios from "axios";
import { ScrollView } from "@cantonjs/react-scroll-view";
import "intersection-observer";


const Tabs = () => {
  const url = 'https://aircall-job.herokuapp.com/activities';
  const [activeTab, setActiveTab] = useState("tab1");

  const [cellData , setCellData] = useState([]);
  const [archiveCells, setArchiveCells] = useState([]);
  const [feedCells, setFeedCells] = useState([]);
  const handleTab1 = () => {
    // update the state to tab1
    setActiveTab("tab1");
  };
  const handleTab2 = () => {
    // update the state to tab2
    setActiveTab("tab2");
  };
  useEffect(() => {
    //fetch calls from the url
    axios.get(url).then(json => {
      let archives = [];
      let feeds = [];
      json.data.forEach(item => {
        
        if(!item.is_archived){
          feeds.push(item);
        }else{
          archives.push(item);
        }
      });
      //set all calls
      setArchiveCells(archives);
      setFeedCells(feeds);
    });
    
    
  }, [])
  return (
    <div className="Tabs">
      {/* Tab nav */}
      <ul className="nav">
        <li 
          className={activeTab === "tab1" ? "active" : ""}
          onClick={handleTab1}
        >
          All Calls
        </li>
        <li 
          className={activeTab === "tab2" ? "active" : ""}
          onClick={handleTab2}
          >
            Archived
        </li>
      </ul>

      <div className="outlet">
      <ScrollView  style={{ height: '45vh' }}>
        {activeTab === "tab1" ? 
        <Feed 
        archiveCells = {archiveCells}
        setArchiveCells = {setArchiveCells}
        feedCells = {feedCells}
        setFeedCells = {setFeedCells}
         /> 
         : <Archive 
         feedCells = {feedCells}
         setFeedCells = {setFeedCells}
         archiveCells = {archiveCells}
         setArchiveCells = {setArchiveCells}
         />}
      </ScrollView>
      </div>
    </div>


  );
};

export default Tabs;