import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getListTopic } from "../../services/topicService";
import "./topic.scss";

function Topic(): JSX.Element {
  const [topics, setTopics] = useState<any[]>([]);
  useEffect(() => {
    const fetchAPI = async (): Promise<void> => {
      const response = await getListTopic();
      setTopics(response);
    };
    fetchAPI();
  }, []);
  // console.log(topics);
  return (
    <>
      <div className="layout__topic">
        <h2 className="layout__topic-h2">Danh sách chủ đề</h2>

        <div className="layout__topic-list">
          {topics.map((item: any) => (
            <div className="layout__topic-item" key={item.id}>
              {/* <td >{item.id}</td> */}
              <Link className="layout__topic-button" to={"/quizz/" + item.id}>
                <button>{item.name}</button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
export default Topic;
