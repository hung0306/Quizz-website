import { useEffect, useState } from "react";
import { getAnswersByUserId } from "../../services/answersService";
import { getListTopic } from "../../services/topicService";
import { Link } from "react-router-dom";
import "./answer.scss";

interface Topic {
  id: number;
  name: string;
}

interface Answer {
  id: number;
  topicId: number;
}

interface CombinedData extends Topic, Answer {}

function Answers(): JSX.Element {
  const [dataAnswers, setDataAnswers] = useState<CombinedData[]>([]);
  useEffect(() => {
    const fetchAPI = async (): Promise<void> => {
      try {
        const AnswersByUserId: Answer[] = await getAnswersByUserId();
        const topics: Topic[] = await getListTopic();
        console.log(AnswersByUserId);
        console.log(topics);
        let result: CombinedData[] = [];
        for (let i = 0; i < AnswersByUserId.length; i++) {
          result.push({
            ...topics.find(
              (item: Topic) => item.id === AnswersByUserId[i].topicId
            ),
            ...AnswersByUserId[i],
          } as CombinedData); //nó chỉ lấy 1 id thôi, trong trường hợp này AnswersByUserId và topics đều có id nên nó lấy cái được rãi đầu tiên)
        }

        setDataAnswers(result.reverse());
      } catch (error) {
        console.error("Error fetching answers:", error);
      }
    };
    fetchAPI();
  }, []);
  console.log(dataAnswers);
  return (
    <>
      <div className="layout__answer">
        <h2 className="layout__answer-h2">Danh sách các bài đã làm</h2>
        <table className="layout__answer-list">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên chủ đề</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {dataAnswers.map((item) => (
              <tr key={item.id}>
                <th>{item.id}</th>
                <th>{item.name}</th>
                <th>
                  <Link to={"/result/" + item.id}>Xem chi tiết</Link>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
export default Answers;
