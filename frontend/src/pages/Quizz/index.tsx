import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTopic } from "../../services/topicService";
import { getListQuestion } from "../../services/questionService";
import { getCookie } from "../../helpers/cookies";
import { createAns } from "../../services/quizzService";
import "./quizz.scss";

function Quizz(): JSX.Element {
  const param = useParams();
  const [dataTopic, setDataTopic] = useState<any[]>([]);
  const [dataQuestions, setDataQuestion] = useState<any[]>([]);
  const navigate = useNavigate();
  // console.log(param);
  useEffect(() => {
    const fetchAPI = async (): Promise<void> => {
      const response = await getTopic(param.id || "");
      setDataTopic(response);
    };
    fetchAPI();
  }, []);

  useEffect(() => {
    const fetchAPI = async (): Promise<void> => {
      const response = await getListQuestion(param.id || "");
      setDataQuestion(response);
      // console.log(response);
    };
    fetchAPI();
  }, []);
  //  console.log(dataQuestions);
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    // console.log(e);
    e.preventDefault();
    let selected: any[] = [];
    const target = e.target as HTMLFormElement;
    for (let i = 0; i < target.elements.length; i++) {
      const element = target.elements[i] as HTMLInputElement;
      if (element.checked) {
        const name = element.name;
        const value = element.value;
        selected.push({
          questionId: parseInt(name),
          answer: parseInt(value),
        });
      }
      // console.log(e.target.elements[i].checked);
    }
    // console.log(selected);
    let options = {
      userId: parseInt(getCookie("id")),
      topicId: parseInt(param.id || "0"),
      answers: selected,
    };
    const response = await createAns(options);
    console.log(response);
    if (response) {
      navigate(`/result/${response.id}`);
    }
  };
  return (
    <>
      <div>
        <div className="form-quizz">
          <h2 className="form-quizz__title">
            Bài Quizz chủ đề:{" "}
            {dataTopic && dataTopic.length > 0 && <>{dataTopic[0].name}</>}
          </h2>
          <form onSubmit={handleSubmit}>
            {dataQuestions.map((item, index) => (
              <div className="form-quizz__item" key={item.id}>
                <p className="form-quizz__question">
                  câu {index + 1}: {item.question}
                </p>
                {item.answers.map((itemAns: any, indexAns: number) => (
                  <div className="form-quizz_answer" key={indexAns}>
                    <input
                      type="radio"
                      name={item.id}
                      value={indexAns}
                      id={`quizz-${item.id}-${indexAns}`}
                    />
                    <label htmlFor={`quizz-${item.id}-${indexAns}`}>
                      {itemAns}
                    </label>
                  </div>
                ))}
              </div>
            ))}
            <div className="form-quizz__center">
              <button className="btn form-quizz__submit" type="submit">
                Nộp bài
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
export default Quizz;
